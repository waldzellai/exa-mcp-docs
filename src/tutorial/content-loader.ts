/**
 * Content Loading System for Exa Interactive Tutorials
 * 
 * Handles loading tutorial content from filesystem, caching, and content
 * wrapping for the assistant-as-tutor experience.
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { 
  Step, 
  TutorialContentLoader as IContentLoader, 
  TutorialMemoryManager,
  MAX_CACHED_STEPS,
  ContentNotFoundError,
  TutorialError
} from '../types/tutorial-types';
import { parseMarkdownContent, wrapWithFullContext } from './content-wrapper';

/**
 * Loads and caches tutorial content from filesystem
 */
export class TutorialContentLoader implements IContentLoader {
  private contentCache: Map<string, string> = new Map();
  private readonly tutorialDir: string;
  private readonly memoryManager: TutorialMemoryManager;

  constructor(tutorialDir: string = 'tutorials') {
    this.tutorialDir = tutorialDir;
    this.memoryManager = new TutorialMemoryManager();
  }

  /**
   * Loads content for a specific tutorial step
   */
  async loadStepContent(tutorialName: string, lessonName: string, stepName: string): Promise<string> {
    const cacheKey = `${tutorialName}/${lessonName}/${stepName}`;
    
    // Check memory cache first
    const cachedContent = this.memoryManager.getCachedStep(cacheKey);
    if (cachedContent) {
      return cachedContent;
    }

    // Load from disk
    const content = await this.loadFromDisk(tutorialName, lessonName, stepName);
    
    // Cache the content
    this.memoryManager.setCachedStep(cacheKey, content);
    
    return content;
  }

  /**
   * Loads content from filesystem
   */
  async loadFromDisk(tutorialName: string, lessonName: string, stepName: string): Promise<string> {
    try {
      // Construct file path
      const stepPath = join(this.tutorialDir, tutorialName, lessonName, `${stepName}.md`);
      
      // Check if file exists
      if (!(await this.fileExists(stepPath))) {
        throw new ContentNotFoundError(`Step content not found: ${stepPath}`);
      }

      // Read file content
      const rawContent = await fs.readFile(stepPath, 'utf8');
      
      // Parse markdown frontmatter
      const { content } = parseMarkdownContent(rawContent);
      
      return content;
    } catch (error) {
      if (error instanceof ContentNotFoundError) {
        throw error;
      }
      throw new TutorialError(`Failed to load content: ${error.message}`, 'CONTENT_LOAD_ERROR');
    }
  }

  /**
   * Wraps content with tutoring prompt and context
   */
  async wrapForTutoring(content: string, stepInfo: Step): Promise<string> {
    // For now, we'll use a simplified wrapper
    // In a full implementation, this would get lesson context
    return wrapWithFullContext(content, stepInfo, 'Current Lesson', 1, 1);
  }

  /**
   * Loads and wraps content with full tutorial context
   */
  async loadAndWrapContent(
    tutorialName: string, 
    lessonName: string, 
    stepName: string,
    stepInfo: Step,
    lessonTitle: string,
    stepNumber: number,
    totalSteps: number
  ): Promise<string> {
    const content = await this.loadStepContent(tutorialName, lessonName, stepName);
    return wrapWithFullContext(content, stepInfo, lessonTitle, stepNumber, totalSteps);
  }

  /**
   * Preloads content for better performance
   */
  async preloadContent(tutorialName: string, lessonName: string, stepName: string): Promise<void> {
    try {
      await this.loadStepContent(tutorialName, lessonName, stepName);
    } catch (error) {
      // Silently fail for preloading
      console.warn(`Failed to preload content: ${error.message}`);
    }
  }

  /**
   * Clears content cache
   */
  clearCache(): void {
    this.contentCache.clear();
    this.memoryManager.clearCache();
  }

  /**
   * Gets cache statistics
   */
  getCacheStats(): {
    totalCached: number;
    maxCacheSize: number;
    cacheHitRate: number;
  } {
    return {
      totalCached: this.contentCache.size,
      maxCacheSize: MAX_CACHED_STEPS,
      cacheHitRate: 0 // Would need to track hits/misses for real implementation
    };
  }

  /**
   * Validates that tutorial directory structure exists
   */
  async validateTutorialStructure(tutorialName: string): Promise<{
    exists: boolean;
    missingPaths: string[];
  }> {
    const missingPaths: string[] = [];
    const tutorialPath = join(this.tutorialDir, tutorialName);
    
    if (!(await this.fileExists(tutorialPath))) {
      missingPaths.push(tutorialPath);
      return { exists: false, missingPaths };
    }

    // Check for tutorial.json
    const metadataPath = join(tutorialPath, 'tutorial.json');
    if (!(await this.fileExists(metadataPath))) {
      missingPaths.push(metadataPath);
    }

    return {
      exists: missingPaths.length === 0,
      missingPaths
    };
  }

  /**
   * Loads tutorial metadata from tutorial.json
   */
  async loadTutorialMetadata(tutorialName: string): Promise<any> {
    try {
      const metadataPath = join(this.tutorialDir, tutorialName, 'tutorial.json');
      const rawMetadata = await fs.readFile(metadataPath, 'utf8');
      return JSON.parse(rawMetadata);
    } catch (error) {
      throw new TutorialError(`Failed to load tutorial metadata: ${error.message}`, 'METADATA_ERROR');
    }
  }

  /**
   * Lists available tutorials
   */
  async listAvailableTutorials(): Promise<string[]> {
    try {
      if (!(await this.fileExists(this.tutorialDir))) {
        return [];
      }

      const entries = await fs.readdir(this.tutorialDir, { withFileTypes: true });
      const tutorials: string[] = [];

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const tutorialPath = join(this.tutorialDir, entry.name);
          const metadataPath = join(tutorialPath, 'tutorial.json');
          
          if (await this.fileExists(metadataPath)) {
            tutorials.push(entry.name);
          }
        }
      }

      return tutorials;
    } catch (error) {
      throw new TutorialError(`Failed to list tutorials: ${error.message}`, 'LIST_ERROR');
    }
  }

  /**
   * Checks if file exists
   */
  private async fileExists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Memory manager for tutorial content caching
 */
export class TutorialMemoryManager implements TutorialMemoryManager {
  readonly MAX_CACHED_STEPS = MAX_CACHED_STEPS;
  stepCache: Map<string, string> = new Map();

  /**
   * Gets cached step content
   */
  getCachedStep(key: string): string | undefined {
    return this.stepCache.get(key);
  }

  /**
   * Sets cached step content with LRU eviction
   */
  setCachedStep(key: string, content: string): void {
    // If cache is full, remove least recently used
    if (this.stepCache.size >= this.MAX_CACHED_STEPS) {
      const firstKey = this.stepCache.keys().next().value;
      this.stepCache.delete(firstKey);
    }

    // Remove existing entry if it exists (to move to end)
    if (this.stepCache.has(key)) {
      this.stepCache.delete(key);
    }

    // Add to end (most recently used)
    this.stepCache.set(key, content);
  }

  /**
   * Clears all cached content
   */
  clearCache(): void {
    this.stepCache.clear();
  }

  /**
   * Gets cache size
   */
  getCacheSize(): number {
    return this.stepCache.size;
  }

  /**
   * Checks if cache is at capacity
   */
  isAtCapacity(): boolean {
    return this.stepCache.size >= this.MAX_CACHED_STEPS;
  }
}

/**
 * Lazy loading utility for tutorial content
 */
export class LazyTutorialLoader {
  private contentLoader: TutorialContentLoader;

  constructor(contentLoader: TutorialContentLoader) {
    this.contentLoader = contentLoader;
  }

  /**
   * Loads current step content only
   */
  async loadCurrentStep(tutorialName: string, lessonName: string, stepName: string): Promise<string> {
    return await this.contentLoader.loadStepContent(tutorialName, lessonName, stepName);
  }

  /**
   * Preloads next step in background
   */
  async preloadNextStep(tutorialName: string, lessonName: string, stepName: string): Promise<void> {
    // This would need lesson structure knowledge to find next step
    // For now, just preload the current step
    await this.contentLoader.preloadContent(tutorialName, lessonName, stepName);
  }

  /**
   * Batch preloads multiple steps
   */
  async batchPreload(steps: Array<{ tutorialName: string; lessonName: string; stepName: string }>): Promise<void> {
    const preloadPromises = steps.map(({ tutorialName, lessonName, stepName }) =>
      this.contentLoader.preloadContent(tutorialName, lessonName, stepName)
    );

    await Promise.allSettled(preloadPromises);
  }
}