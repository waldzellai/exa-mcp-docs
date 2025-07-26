import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { randomUUID } from 'crypto';
import { UserIdentity, TutorialError } from './types.js';

/**
 * UserManager handles user identity creation and persistence
 * Uses ~/.cache/exa-tutorials/ for storage
 */
export class UserManager {
  private readonly cacheDir: string;
  private readonly userIdFile: string;
  private userIdentity: UserIdentity | null = null;

  constructor() {
    this.cacheDir = path.join(os.homedir(), '.cache', 'exa-tutorials');
    this.userIdFile = path.join(this.cacheDir, 'user-id');
    this.ensureCacheDirectory();
  }

  /**
   * Get or create user identity
   * Generates UUID on first access and persists across sessions
   */
  async getUserIdentity(): Promise<UserIdentity> {
    if (this.userIdentity) {
      // Update last seen timestamp
      this.userIdentity.lastSeen = new Date().toISOString();
      await this.saveUserIdentity(this.userIdentity);
      return this.userIdentity;
    }

    try {
      // Try to load existing user identity
      if (fs.existsSync(this.userIdFile)) {
        const data = fs.readFileSync(this.userIdFile, 'utf-8');
        this.userIdentity = JSON.parse(data);
        
        if (this.userIdentity) {
          // Update last seen timestamp
          this.userIdentity.lastSeen = new Date().toISOString();
          await this.saveUserIdentity(this.userIdentity);
          return this.userIdentity;
        }
      }

      // Create new user identity
      this.userIdentity = await this.createNewUserIdentity();
      return this.userIdentity;
    } catch (error) {
      throw new TutorialError(
        `Failed to get user identity: ${error instanceof Error ? error.message : String(error)}`,
        { code: 'USER_IDENTITY_ERROR', context: { error } }
      );
    }
  }

  /**
   * Create new user identity with UUID
   */
  private async createNewUserIdentity(): Promise<UserIdentity> {
    const now = new Date().toISOString();
    const userIdentity: UserIdentity = {
      userId: randomUUID(),
      createdAt: now,
      lastSeen: now
    };

    await this.saveUserIdentity(userIdentity);
    return userIdentity;
  }

  /**
   * Save user identity to filesystem
   */
  private async saveUserIdentity(identity: UserIdentity): Promise<void> {
    try {
      const data = JSON.stringify(identity, null, 2);
      await this.writeFileAtomic(this.userIdFile, data);
    } catch (error) {
      throw new TutorialError(
        `Failed to save user identity: ${error instanceof Error ? error.message : String(error)}`,
        { code: 'USER_SAVE_ERROR', context: { error } }
      );
    }
  }

  /**
   * Get cache directory path
   */
  getCacheDirectory(): string {
    return this.cacheDir;
  }

  /**
   * Get user ID file path
   */
  getUserIdFile(): string {
    return this.userIdFile;
  }

  /**
   * Reset user identity (creates new UUID)
   */
  async resetUserIdentity(): Promise<UserIdentity> {
    this.userIdentity = null;
    
    // Remove existing user ID file
    if (fs.existsSync(this.userIdFile)) {
      fs.unlinkSync(this.userIdFile);
    }

    // Create new identity
    return await this.getUserIdentity();
  }

  /**
   * Ensure cache directory exists
   */
  private ensureCacheDirectory(): void {
    try {
      if (!fs.existsSync(this.cacheDir)) {
        fs.mkdirSync(this.cacheDir, { recursive: true });
      }
    } catch (error) {
      throw new TutorialError(
        `Failed to create cache directory: ${error instanceof Error ? error.message : String(error)}`,
        { code: 'CACHE_DIR_ERROR', context: { cacheDir: this.cacheDir, error } }
      );
    }
  }

  /**
   * Atomic file write to prevent corruption
   */
  private async writeFileAtomic(filePath: string, data: string): Promise<void> {
    const tempFile = `${filePath}.tmp`;
    
    try {
      // Write to temporary file
      fs.writeFileSync(tempFile, data, 'utf-8');
      
      // Atomic rename
      fs.renameSync(tempFile, filePath);
    } catch (error) {
      // Clean up temp file if it exists
      if (fs.existsSync(tempFile)) {
        try {
          fs.unlinkSync(tempFile);
        } catch (unlinkError) {
          // Ignore cleanup errors
        }
      }
      throw error;
    }
  }

  /**
   * Validate user identity structure
   */
  private validateUserIdentity(identity: any): identity is UserIdentity {
    return (
      typeof identity === 'object' &&
      identity !== null &&
      typeof identity.userId === 'string' &&
      typeof identity.createdAt === 'string' &&
      typeof identity.lastSeen === 'string' &&
      identity.userId.length > 0
    );
  }
}