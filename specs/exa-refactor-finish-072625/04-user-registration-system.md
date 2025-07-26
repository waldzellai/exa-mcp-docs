# User Registration System Specification

## Executive Summary

This specification defines an optional user registration and authentication system for the EXA Documentation Server, enabling persistent progress tracking, personalized experiences, and usage analytics while maintaining the current anonymous functionality.

## Design Philosophy

### Progressive Enhancement
- **Anonymous First**: Full functionality without registration
- **Optional Registration**: Enhanced features for registered users
- **Privacy Focused**: Minimal data collection, local-first approach
- **Graceful Degradation**: System works without backend services

## Architecture Overview

### System Components

```
┌─────────────────────────────────────────┐
│          EXA MCP Server                 │
├─────────────────────────────────────────┤
│  ┌─────────────────┐ ┌───────────────┐ │
│  │  Auth Manager   │ │ User Service  │ │
│  └─────────────────┘ └───────────────┘ │
│  ┌─────────────────┐ ┌───────────────┐ │
│  │ Session Manager │ │ Progress Sync │ │
│  └─────────────────┘ └───────────────┘ │
└─────────────────────────────────────────┘
            │                 │
            ▼                 ▼
    ┌──────────────┐  ┌──────────────┐
    │ Local State  │  │Backend (Opt) │
    └──────────────┘  └──────────────┘
```

## Implementation Approaches

### Option 1: Local-Only Registration (Recommended for MVP)

Simple device-based identification without external dependencies.

```typescript
interface LocalUser {
  userId: string;        // UUID v4
  email?: string;        // Optional, for display only
  displayName?: string;  // Optional alias
  createdAt: string;     // ISO timestamp
  preferences: UserPreferences;
}

interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  verbosity?: 'concise' | 'detailed';
  trackProgress?: boolean;
}
```

**Implementation:**
```typescript
class LocalAuthManager {
  private userFile = path.join(os.homedir(), '.exa-mcp', 'user.json');

  async register(email?: string): Promise<LocalUser> {
    const user: LocalUser = {
      userId: crypto.randomUUID(),
      email,
      displayName: email?.split('@')[0],
      createdAt: new Date().toISOString(),
      preferences: {
        trackProgress: true
      }
    };

    await this.saveUser(user);
    return user;
  }

  async getCurrentUser(): Promise<LocalUser | null> {
    try {
      const data = await fs.readFile(this.userFile, 'utf-8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
}
```

### Option 2: Backend-Enabled Registration

Full registration with cloud sync capabilities.

```typescript
interface CloudUser extends LocalUser {
  authToken: string;
  refreshToken: string;
  syncEnabled: boolean;
  lastSyncAt?: string;
}

class CloudAuthManager extends LocalAuthManager {
  private apiClient: ExaAuthAPI;

  async register(email: string, password?: string): Promise<CloudUser> {
    // Create local user first
    const localUser = await super.register(email);

    // Register with backend
    const { authToken, refreshToken } = await this.apiClient.register({
      email,
      password: password || this.generateSecurePassword(),
      deviceId: localUser.userId
    });

    const cloudUser: CloudUser = {
      ...localUser,
      authToken,
      refreshToken,
      syncEnabled: true
    };

    await this.saveUser(cloudUser);
    return cloudUser;
  }

  async syncProgress(): Promise<void> {
    const user = await this.getCurrentUser() as CloudUser;
    if (!user?.syncEnabled) return;

    const localProgress = await this.loadLocalProgress();
    await this.apiClient.syncProgress(user.authToken, localProgress);
  }
}
```

## User Registration Flow

### Registration Tool

```typescript
{
  name: 'exaRegister',
  description: 'Register for an Exa account to enable progress syncing and personalized features',
  inputSchema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Email address for registration'
      },
      displayName: {
        type: 'string',
        description: 'Optional display name'
      },
      enableSync: {
        type: 'boolean',
        description: 'Enable cloud sync (requires backend)',
        default: false
      }
    }
  }
}
```

### Registration Process

1. **Check Existing Registration**
   ```
   🔍 Checking registration status...
   ✅ Already registered as: user@example.com
   ```

2. **New Registration**
   ```
   📝 Registering new account...
   
   Email: user@example.com
   Display Name: User
   
   ✅ Registration complete!
   🎉 Your progress will now be saved locally.
   
   💡 Benefits of registration:
   • Progress tracking across sessions
   • Personalized recommendations
   • Access to advanced features
   ```

3. **Anonymous Continuation**
   ```
   ℹ️ Continuing without registration...
   
   Note: Your progress will only be saved for this session.
   Consider registering to save progress permanently.
   ```

## Progress Synchronization

### Local Progress Storage

```typescript
interface UserProgress {
  userId: string;
  tutorials: TutorialProgress[];
  lastUpdated: string;
  stats: ProgressStats;
}

interface TutorialProgress {
  tutorialId: string;
  startedAt: string;
  completedAt?: string;
  currentStep: string;
  completedSteps: string[];
  timeSpent: number; // seconds
}

interface ProgressStats {
  tutorialsStarted: number;
  tutorialsCompleted: number;
  totalTimeSpent: number;
  favoriteTopics: string[];
}
```

### Sync Strategy

1. **Optimistic Local Updates**: Save progress locally first
2. **Background Sync**: Sync to cloud when online
3. **Conflict Resolution**: Last-write-wins with merge support
4. **Offline Support**: Full functionality without internet

## Privacy and Security

### Data Collection Policy

**Minimal Data Collection:**
- Email (optional, for identification only)
- Progress data (tutorials, steps, time)
- No personal content or queries logged

**User Control:**
- Export all data: `exaExportData`
- Delete account: `exaDeleteAccount`
- Disable tracking: `exaToggleTracking`

### Security Measures

1. **Local Encryption**: Sensitive data encrypted at rest
2. **Token Rotation**: Auth tokens expire and refresh
3. **Device Binding**: Optional device-specific keys
4. **Data Isolation**: User data strictly separated

## Integration with Existing Tools

### Enhanced Tutorial Experience

```typescript
// Before registration
startExaTutorial() 
// → "Starting tutorial (progress not saved)..."

// After registration
startExaTutorial()
// → "Welcome back, User! Resuming 'Websets' tutorial..."
```

### Progress Dashboard

```typescript
{
  name: 'exaProgress',
  description: 'View your learning progress and achievements',
  execute: async () => {
    const user = await authManager.getCurrentUser();
    if (!user) {
      return 'Register to track your progress! Use exaRegister.';
    }

    const progress = await progressManager.getUserProgress(user.userId);
    return formatProgressDashboard(progress);
  }
}
```

## Migration Path

### Phase 1: Local Registration (Week 1)
- Implement LocalAuthManager
- Add registration tool
- Update tutorial system for user awareness
- Store progress with user ID

### Phase 2: Enhanced Features (Week 2-3)
- Progress dashboard
- Learning recommendations
- Time tracking
- Achievement system

### Phase 3: Cloud Sync (Month 2+)
- Backend API development
- Sync implementation
- Multi-device support
- Social features (optional)

## Backward Compatibility

### Anonymous Mode Preservation
```typescript
class TutorialSystem {
  async startTutorial(name: string) {
    const user = await this.authManager.getCurrentUser();
    
    if (user) {
      // Load user-specific progress
      return await this.startWithProgress(name, user.userId);
    } else {
      // Use session-based progress
      return await this.startAnonymous(name);
    }
  }
}
```

### Gradual Adoption
- Existing users continue anonymously
- Registration prompts at natural points
- No forced registration
- Import anonymous progress on registration

## Success Metrics

1. **Adoption Rate**: % of users who register
2. **Retention**: Users returning after registration
3. **Engagement**: Tutorial completion rates
4. **Satisfaction**: User feedback on features
5. **Performance**: No impact on anonymous users

## Configuration

```typescript
interface RegistrationConfig {
  enabled: boolean;
  features: {
    localOnly: boolean;
    cloudSync: boolean;
    achievements: boolean;
    analytics: boolean;
  };
  prompts: {
    onStart: boolean;
    onComplete: boolean;
    frequency: 'never' | 'once' | 'periodic';
  };
}
```

## Future Enhancements

1. **OAuth Integration**: GitHub, Google sign-in
2. **Team Accounts**: Shared progress for organizations
3. **Certificates**: Completion certificates
4. **Leaderboards**: Optional competitive elements
5. **API Access**: Personal API for progress data

## Timeline

### MVP (Local Registration Only)
- Design: 2 days
- Implementation: 3 days
- Testing: 2 days
- Documentation: 1 day

Total: ~1.5 weeks

### Full Implementation (With Cloud)
- Backend design: 1 week
- API development: 2 weeks
- Frontend integration: 1 week
- Testing & deployment: 1 week

Total: ~5 weeks