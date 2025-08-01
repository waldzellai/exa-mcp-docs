/**
 * nextExaTutorialStep MCP Tool Implementation
 *
 * Advances to the next step in the current tutorial.
 * Marks current step as completed and loads next step content.
 */
export declare class NextStepTool {
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
            properties: {};
        };
    };
    /**
     * Executes the next step tool
     */
    execute(): Promise<string>;
    /**
     * Checks if there's a next step available
     */
    private hasNextStep;
    /**
     * Gets preview of next step without advancing
     */
    getNextStepPreview(): Promise<string>;
    /**
     * Validates that tutorial progression is valid
     */
    private validateProgression;
}
