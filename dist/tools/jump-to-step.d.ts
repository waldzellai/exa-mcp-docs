/**
 * jumpToExaTutorialStep MCP Tool Implementation
 *
 * Jumps to a specific tutorial, lesson, or step with flexible navigation.
 */
import { JumpToStepParams } from '../../types/tutorial-types';
export declare class JumpToStepTool {
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
                lessonName: {
                    type: string;
                    description: string;
                };
                stepName: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
    };
    /**
     * Executes the jump to step tool
     */
    execute(params: JumpToStepParams): Promise<string>;
    /**
     * Jumps to a specific step within a lesson
     */
    private jumpToSpecificStep;
    /**
     * Jumps to the first step of a lesson
     */
    private jumpToLesson;
    /**
     * Jumps to tutorial (first step of first lesson)
     */
    private jumpToTutorial;
    /**
     * Marks progress up to the target step as completed
     */
    private markProgressToStep;
    /**
     * Generates context message for jump navigation
     */
    private generateJumpContext;
    /**
     * Validates jump parameters
     */
    private validateJumpParams;
    /**
     * Shows available jump targets
     */
    showAvailableTargets(tutorialName?: string): Promise<string>;
    /**
     * Gets jump suggestions based on current position
     */
    getJumpSuggestions(): Promise<string>;
}
