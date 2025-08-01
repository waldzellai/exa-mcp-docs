import { z } from 'zod';
import { BaseTool } from './base-tool.js';
const ExaIntegrationsSchema = z.object({
    platform: z.enum(['python-sdk', 'js-sdk', 'typescript-sdk', 'langchain', 'llamaindex', 'crewai', 'openai', 'vercel', 'ibm-watsonx', 'openrouter']).optional(),
    method: z.string().optional(),
    topic: z.string().optional(),
    query: z.array(z.string()).optional()
});
export class ExaIntegrationsTool extends BaseTool {
    static schema = ExaIntegrationsSchema;
    async execute(args) {
        try {
            // If specific platform is requested
            if (args.platform) {
                let results = this.getIntegrationsByPlatform(args.platform);
                // Apply topic filter if specified
                if (args.topic) {
                    results = results.filter(doc => doc.title.toLowerCase().includes(args.topic.toLowerCase()) ||
                        doc.content.toLowerCase().includes(args.topic.toLowerCase()));
                }
                // If also have method specified
                if (args.method) {
                    const methodResults = this.filterByMethod(results, args.method);
                    return this.formatResults(methodResults);
                }
                // If also have query, search within platform
                if (args.query && args.query.length > 0) {
                    const searchResults = this.searchDocumentation(args.query);
                    const filteredResults = this.filterByPlatform(searchResults, args.platform);
                    return this.formatSearchResults(filteredResults);
                }
                return this.formatResults(results);
            }
            // If topic is specified
            if (args.topic) {
                const results = this.getIntegrationsByTopic(args.topic);
                return this.formatResults(results);
            }
            // If query is specified
            if (args.query && args.query.length > 0) {
                const searchResults = this.searchDocumentation(args.query);
                const integrationResults = this.filterIntegrationResults(searchResults);
                return this.formatSearchResults(integrationResults);
            }
            // No specific request - return overview
            return this.getIntegrationsOverview();
        }
        catch (error) {
            return `Error processing integrations request: ${error instanceof Error ? error.message : String(error)}`;
        }
    }
    getIntegrationsByPlatform(platform) {
        this.ensureDocumentationLoaded();
        const platformMap = {
            'python-sdk': ['sdks/python-sdk-specification', 'sdks/cheat-sheet'],
            'js-sdk': ['sdks/typescript-sdk-specification', 'sdks/cheat-sheet'],
            'typescript-sdk': ['sdks/typescript-sdk-specification', 'sdks/cheat-sheet'],
            'langchain': ['integrations/langchain-docs', 'reference/langchain'],
            'llamaindex': ['integrations/llamaIndex-docs', 'reference/llamaindex'],
            'crewai': ['integrations/crew-ai-docs', 'reference/crewai'],
            'openai': ['reference/openai', 'reference/openai-responses-api-with-exa'],
            'vercel': ['integrations/vercel'],
            'ibm-watsonx': ['integrations/ibm-watsonx-docs'],
            'openrouter': ['integrations/openrouter']
        };
        const paths = platformMap[platform] || [platform];
        const results = [];
        // First, get exact path matches
        for (const path of paths) {
            const doc = this.docs.get(`${path}.md`);
            if (doc) {
                results.push(doc);
            }
        }
        // Only search in specific integration/reference categories and be more restrictive
        for (const [, doc] of this.docs) {
            if ((doc.category === 'integrations' || doc.category === 'reference') &&
                doc.path.toLowerCase().includes(platform.toLowerCase()) &&
                !results.some(r => r.path === doc.path)) {
                results.push(doc);
            }
        }
        return results;
    }
    getIntegrationsByTopic(topic) {
        this.ensureDocumentationLoaded();
        const results = [];
        for (const [, doc] of this.docs) {
            if ((doc.category === 'integrations' || doc.category === 'sdks' || doc.category === 'reference') &&
                (doc.title.toLowerCase().includes(topic.toLowerCase()) ||
                    doc.content.toLowerCase().includes(topic.toLowerCase()))) {
                results.push(doc);
            }
        }
        return results;
    }
    filterByMethod(docs, method) {
        return docs.filter(doc => doc.content.toLowerCase().includes(method.toLowerCase()) ||
            doc.title.toLowerCase().includes(method.toLowerCase()));
    }
    filterByPlatform(searchResults, platform) {
        const platformKeywords = platform.split('-');
        return searchResults.filter(result => {
            const path = result.path.toLowerCase();
            const content = result.content.toLowerCase();
            return platformKeywords.some(keyword => path.includes(keyword) || content.includes(keyword)) && (path.includes('integrations') || path.includes('sdks') || path.includes('reference'));
        });
    }
    filterIntegrationResults(searchResults) {
        return searchResults.filter(result => result.path.startsWith('integrations/') ||
            result.path.startsWith('sdks/') ||
            (result.path.startsWith('reference/') &&
                (result.path.includes('langchain') || result.path.includes('llamaindex') ||
                    result.path.includes('crewai') || result.path.includes('openai'))));
    }
    formatSearchResults(results) {
        if (results.length === 0) {
            return 'No integrations found matching your search query.';
        }
        let output = `# Integration Search Results (${results.length} found)\n\n`;
        for (const result of results.slice(0, 5)) {
            output += `## ${result.title}\n`;
            output += `**Path:** ${result.path}\n`;
            output += `**Platform:** ${this.extractPlatform(result.path)}\n`;
            output += `**Relevance:** ${result.relevanceScore}\n`;
            output += `**Matches:** ${result.matches.join(', ')}\n\n`;
            output += `${result.content}\n\n`;
            output += '---\n\n';
        }
        if (results.length > 5) {
            output += `*Showing top 5 results of ${results.length} total matches*\n`;
        }
        return output.trim();
    }
    extractPlatform(path) {
        if (path.includes('python-sdk'))
            return 'Python SDK';
        if (path.includes('typescript-sdk'))
            return 'TypeScript SDK';
        if (path.includes('langchain'))
            return 'LangChain';
        if (path.includes('llamaindex'))
            return 'LlamaIndex';
        if (path.includes('crewai'))
            return 'CrewAI';
        if (path.includes('openai'))
            return 'OpenAI';
        if (path.includes('vercel'))
            return 'Vercel';
        if (path.includes('ibm-watsonx'))
            return 'IBM WatsonX';
        if (path.includes('openrouter'))
            return 'OpenRouter';
        return 'Unknown';
    }
    getIntegrationsOverview() {
        const integrations = this.getDocumentationByCategory('integrations');
        const sdks = this.getDocumentationByCategory('sdks');
        let output = '# Exa Integrations & SDKs\n\n';
        output += 'Comprehensive documentation for Exa integrations with popular frameworks and platforms.\n\n';
        output += '## Official SDKs\n\n';
        for (const sdk of sdks) {
            output += `### ${sdk.title}\n`;
            output += `**Path:** ${sdk.path}\n`;
            output += `${this.extractDescription(sdk.content)}\n\n`;
        }
        output += '## Framework Integrations\n\n';
        const frameworks = [
            { name: 'LangChain', key: 'langchain' },
            { name: 'LlamaIndex', key: 'llamaindex' },
            { name: 'CrewAI', key: 'crewai' },
            { name: 'OpenAI', key: 'openai' }
        ];
        for (const framework of frameworks) {
            const integration = integrations.find(i => i.path.includes(framework.key));
            if (integration) {
                output += `### ${framework.name}\n`;
                output += `**Path:** ${integration.path}\n`;
                output += `${this.extractDescription(integration.content)}\n\n`;
            }
        }
        output += '## Platform Integrations\n\n';
        const platforms = integrations.filter(i => i.path.includes('vercel') ||
            i.path.includes('ibm-watsonx') ||
            i.path.includes('openrouter'));
        for (const platform of platforms) {
            output += `### ${platform.title}\n`;
            output += `**Path:** ${platform.path}\n`;
            output += `${this.extractDescription(platform.content)}\n\n`;
        }
        output += '## Usage\n\n';
        output += 'To access specific integrations:\n';
        output += '- Use `platform` parameter to get documentation for a specific platform\n';
        output += '- Use `method` parameter to find specific methods or functions\n';
        output += '- Use `topic` parameter to search by integration topic\n';
        output += '- Use `query` parameter to search across all integrations\n\n';
        output += '## Available Platforms\n\n';
        const platforms_list = [
            'python-sdk', 'js-sdk', 'typescript-sdk', 'langchain', 'llamaindex',
            'crewai', 'openai', 'vercel', 'ibm-watsonx', 'openrouter'
        ];
        for (const platform of platforms_list) {
            output += `- ${platform}\n`;
        }
        return output;
    }
    extractDescription(content) {
        const lines = content.split('\n');
        let inDescription = false;
        let description = '';
        for (const line of lines) {
            if (line.startsWith('# ')) {
                inDescription = true;
                continue;
            }
            if (inDescription) {
                if (line.trim() === '')
                    continue;
                if (line.startsWith('#'))
                    break;
                description += line + '\n';
                if (description.length > 200) {
                    description = description.substring(0, 200) + '...';
                    break;
                }
            }
        }
        return description.trim() || 'No description available.';
    }
    getPythonSDK() {
        return this.getIntegrationsByPlatform('python-sdk');
    }
    getTypeScriptSDK() {
        return this.getIntegrationsByPlatform('typescript-sdk');
    }
    getLangChainIntegration() {
        return this.getIntegrationsByPlatform('langchain');
    }
    getLlamaIndexIntegration() {
        return this.getIntegrationsByPlatform('llamaindex');
    }
    getCrewAIIntegration() {
        return this.getIntegrationsByPlatform('crewai');
    }
    getOpenAIIntegration() {
        return this.getIntegrationsByPlatform('openai');
    }
}
