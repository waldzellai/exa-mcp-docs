/**
 * resetExaTutorialProgress MCP Tool Implementation
 *
 * Resets all tutorial progress with confirmation dialog.
 * Shows progress summary before reset.
 */
import { ResetProgressParams } from '../../types/tutorial-types';
export declare class ResetProgressTool {
    private stateManager;
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
                confirm: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
    };
    /**
     * Executes the reset progress tool
     */
    execute(params: ResetProgressParams): Promise<string>;
    /**
     * Shows progress summary and asks for confirmation
     */
    private showProgressSummaryAndConfirmation;
    /**
     * Performs the actual reset operation
     */
    private performReset;
    /**
     * Shows available tutorials after reset
     */
    private showAvailableTutorialsAfterReset;
    /**
     * Validates reset parameters
     */
    private validateResetParams;
    /**
     * Gets reset warning message
     */
    static getResetWarning(): string;
    /**
     * Checks if user has any progress to reset
     */
    hasProgressToReset(): Promise<boolean>;
    /**
     * Gets backup data before reset (for potential recovery)
     */
    getBackupData(): Promise<string>;
}
