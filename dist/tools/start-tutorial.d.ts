/**
 * startExaTutorial MCP Tool Implementation
 *
 * Handles starting tutorials or resuming from last position.
 * Shows available tutorials if none specified.
 */
import { StartTutorialParams } from '../../types/tutorial-types';
export declare class StartTutorialTool {
    private stateManager;
    private contentLoader;
    private progressTracker;
    constructor();
    /**
     * MCP tool definition
     */
    static getDefinition(): {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                tutorialName: {
                    type: string;
                    description: string;
                };
            };
        };
    };
    /**
     * Executes the start tutorial tool
     */
    execute(params: StartTutorialParams): Promise<string>;
    /**
     * Initializes tutorial state for first-time users
     */
    private initializeState;
    /**
     * Loads available tutorials from filesystem
     */
    private loadAvailableTutorials;
    /**
     * Shows available tutorials to user
     */
    private showAvailableTutorials;
    /**
     * Handles case when requested tutorial is not found
     */
    private handleTutorialNotFound;
    /**
     * Starts or resumes a tutorial
     */
    private startTutorial;
    /**
     * Checks if user has any tutorial progress
     */
    private hasExistingProgress;
    /**
     * Gets tutorial by name or number
     */
    private getTutorialByIdentifier;
}
