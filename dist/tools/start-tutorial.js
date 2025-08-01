/**
 * startExaTutorial MCP Tool Implementation
 *
 * Handles starting tutorials or resuming from last position.
 * Shows available tutorials if none specified.
 */
import { TutorialFormatter } from '../formatter';
import { StateManager } from '../state-manager';
import { TutorialContentLoader } from '../content-loader';
import { ProgressTracker } from '../progress-tracker';
export class StartTutorialTool {
    stateManager;
    contentLoader;
    progressTracker;
    constructor() {
        this.stateManager = new StateManager();
        this.contentLoader = new TutorialContentLoader();
        this.progressTracker = new ProgressTracker();
    }
    /**
     * MCP tool definition
     */
    static getDefinition() {
        return {
            name: 'startExaTutorial',
            description: 'Start a tutorial or resume from last position. Shows available tutorials if none specified.',
            inputSchema: {
                type: 'object',
                properties: {
                    tutorialName: {
                        type: 'string',
                        description: 'Optional: specific tutorial to start'
                    }
                }
            }
        };
    }
    /**
     * Executes the start tutorial tool
     */
    async execute(params) {
        try {
            // Load or create state
            let state = await this.stateManager.loadState();
            if (!state) {
                state = await this.initializeState();
            }
            // If no tutorial specified, show available tutorials
            if (!params.tutorialName) {
                return this.showAvailableTutorials(state);
            }
            // Find requested tutorial
            const tutorial = state.tutorials.find(t => t.name === params.tutorialName);
            if (!tutorial) {
                return this.handleTutorialNotFound(params.tutorialName, state);
            }
            // Start or resume tutorial
            return await this.startTutorial(tutorial, state);
        }
        catch (error) {
            return `❌ Error starting tutorial: ${error.message}`;
        }
    }
    /**
     * Initializes tutorial state for first-time users
     */
    async initializeState() {
        const userId = await this.stateManager.getUserId();
        const availableTutorials = await this.loadAvailableTutorials();
        const state = {
            userId,
            currentTutorial: '',
            tutorials: availableTutorials,
            lastAccessed: new Date().toISOString(),
            version: '1.0.0'
        };
        await this.stateManager.saveState(state);
        return state;
    }
    /**
     * Loads available tutorials from filesystem
     */
    async loadAvailableTutorials() {
        const tutorialNames = await this.contentLoader.listAvailableTutorials();
        const tutorials = [];
        for (const name of tutorialNames) {
            try {
                const metadata = await this.contentLoader.loadTutorialMetadata(name);
                const tutorial = {
                    name: metadata.name,
                    title: metadata.title,
                    description: metadata.description,
                    difficulty: metadata.difficulty,
                    status: 0, // not started
                    currentLesson: '',
                    lessons: metadata.lessons.map((lesson) => ({
                        name: lesson.name,
                        title: lesson.title,
                        status: 0,
                        currentStep: '',
                        steps: lesson.steps.map((step) => ({
                            name: step.name,
                            title: step.title,
                            status: 0,
                            hasCode: step.hasCode
                        }))
                    })),
                    prerequisites: metadata.prerequisites || []
                };
                tutorials.push(tutorial);
            }
            catch (error) {
                console.warn(`Failed to load tutorial ${name}: ${error.message}`);
            }
        }
        return tutorials;
    }
    /**
     * Shows available tutorials to user
     */
    showAvailableTutorials(state) {
        if (state.tutorials.length === 0) {
            return `📚 No tutorials available. Please check your tutorial directory.`;
        }
        // Check if this is a returning user
        const hasProgress = state.tutorials.some(t => t.status > 0);
        if (hasProgress) {
            return `🎓 Welcome back to Exa Tutorials!

${TutorialFormatter.formatTutorialList(state.tutorials)}

Which tutorial would you like to start or continue? Just tell me the name or number.`;
        }
        return TutorialFormatter.formatWelcomeMessage(state.tutorials);
    }
    /**
     * Handles case when requested tutorial is not found
     */
    handleTutorialNotFound(tutorialName, state) {
        const availableNames = state.tutorials.map(t => t.name);
        return TutorialFormatter.formatTutorialNotFound(tutorialName, availableNames);
    }
    /**
     * Starts or resumes a tutorial
     */
    async startTutorial(tutorial, state) {
        // If tutorial is already complete
        if (tutorial.status === 2) {
            return `✅ Tutorial "${tutorial.title}" is already complete!

🏆 You've mastered this tutorial. Would you like to:
- Start a different tutorial
- Reset this tutorial's progress
- Review specific steps

Just let me know what you'd like to do!`;
        }
        // Find the current or next step
        const currentStep = this.progressTracker.getCurrentStep(tutorial);
        if (!currentStep) {
            return `❌ No steps found in tutorial "${tutorial.title}".`;
        }
        const currentLesson = this.progressTracker.getCurrentLesson(tutorial);
        if (!currentLesson) {
            return `❌ No lessons found in tutorial "${tutorial.title}".`;
        }
        // Update state to mark tutorial as current
        await this.stateManager.updateProgress(tutorial.name, currentLesson.name, currentStep.name);
        // Load and wrap content
        const stepNumber = this.progressTracker.getStepPositionInLesson(currentLesson, currentStep);
        const totalSteps = currentLesson.steps.length;
        const wrappedContent = await this.contentLoader.loadAndWrapContent(tutorial.name, currentLesson.name, currentStep.name, currentStep, currentLesson.title, stepNumber, totalSteps);
        // Show start message
        const startMessage = tutorial.status === 0
            ? `🎓 Starting "${tutorial.title}" tutorial!`
            : `🎓 Resuming "${tutorial.title}" tutorial...`;
        return `${startMessage}

${wrappedContent}`;
    }
    /**
     * Checks if user has any tutorial progress
     */
    hasExistingProgress(state) {
        return state.tutorials.some(tutorial => tutorial.status > 0);
    }
    /**
     * Gets tutorial by name or number
     */
    getTutorialByIdentifier(identifier, state) {
        // Try by name first
        const byName = state.tutorials.find(t => t.name === identifier);
        if (byName)
            return byName;
        // Try by number
        const num = parseInt(identifier);
        if (!isNaN(num) && num > 0 && num <= state.tutorials.length) {
            return state.tutorials[num - 1];
        }
        return null;
    }
}
