/**
 * getExaTutorialStatus MCP Tool Implementation
 *
 * Shows current tutorial progress and available navigation options.
 */
export declare class GetStatusTool {
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
            properties: {};
        };
    };
    /**
     * Executes the get status tool
     */
    execute(): Promise<string>;
    /**
     * Generates comprehensive status overview
     */
    private generateStatusOverview;
    /**
     * Gets tutorial status as human-readable text
     */
    private getTutorialStatusText;
    /**
     * Gets total steps across all tutorials
     */
    private getTotalSteps;
    /**
     * Generates navigation suggestions based on current state
     */
    private generateNavigationSuggestions;
    /**
     * Gets detailed statistics for a specific tutorial
     */
    getTutorialDetails(tutorialName: string): Promise<string>;
    /**
     * Gets quick status summary
     */
    getQuickStatus(): Promise<string>;
}
