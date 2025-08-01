import { z } from 'zod';
import { BaseTool } from './base-tool.js';
const ExaWebsetsSchema = z.object({
    feature: z.enum(['monitors', 'webhooks', 'enrichments', 'imports', 'websets', 'events', 'searches', 'items']).optional(),
    operation: z.enum(['create', 'update', 'delete', 'list', 'get', 'cancel']).optional(),
    includeExamples: z.boolean().default(false)
});
export class ExaWebsetsTool extends BaseTool {
    static schema = ExaWebsetsSchema;
    async execute(args) {
        try {
            // If specific feature is requested
            if (args.feature) {
                const results = this.getWebsetsByFeature(args.feature);
                // If also have operation specified
                if (args.operation) {
                    const operationResults = this.filterByOperation(results, args.operation);
                    return this.formatResults(operationResults, args.includeExamples);
                }
                return this.formatResults(results, args.includeExamples);
            }
            // If only operation is specified
            if (args.operation) {
                const results = this.getWebsetsByOperation(args.operation);
                return this.formatResults(results, args.includeExamples);
            }
            // No specific request - return overview
            return this.getWebsetsOverview();
        }
        catch (error) {
            return `Error processing Websets request: ${error instanceof Error ? error.message : String(error)}`;
        }
    }
    getWebsetsByFeature(feature) {
        this.ensureDocumentationLoaded();
        const results = [];
        for (const [, doc] of this.docs) {
            if (doc.category.startsWith('websets') &&
                (doc.path.includes(`/${feature}/`) || doc.path.includes(`${feature}.md`))) {
                results.push(doc);
            }
        }
        return results.sort((a, b) => a.path.localeCompare(b.path));
    }
    getWebsetsByOperation(operation) {
        this.ensureDocumentationLoaded();
        const results = [];
        for (const [, doc] of this.docs) {
            if (doc.category.startsWith('websets') &&
                (doc.path.includes(`${operation}-`) || doc.title.toLowerCase().includes(operation))) {
                results.push(doc);
            }
        }
        return results.sort((a, b) => a.path.localeCompare(b.path));
    }
    filterByOperation(docs, operation) {
        return docs.filter(doc => doc.path.includes(`${operation}-`) ||
            doc.title.toLowerCase().includes(operation) ||
            doc.content.toLowerCase().includes(`${operation} `));
    }
    formatResults(results, includeExamples = false) {
        if (results.length === 0) {
            return 'No Websets documentation found matching your query.';
        }
        let output = '';
        for (const result of results) {
            output += `## ${result.title}\n`;
            output += `**Path:** ${result.path}\n`;
            output += `**Feature:** ${this.extractFeature(result.path)}\n\n`;
            if (includeExamples) {
                output += `${result.content}\n\n`;
            }
            else {
                output += `${this.extractDescription(result.content)}\n\n`;
                output += `*Use \`includeExamples: true\` to see full documentation with code examples*\n\n`;
            }
            output += '---\n\n';
        }
        return output.trim();
    }
    extractFeature(path) {
        if (path.includes('/monitors/'))
            return 'Monitors';
        if (path.includes('/webhooks/'))
            return 'Webhooks';
        if (path.includes('/enrichments/'))
            return 'Enrichments';
        if (path.includes('/imports/'))
            return 'Imports';
        if (path.includes('/websets/'))
            return 'Websets';
        if (path.includes('/events/'))
            return 'Events';
        if (path.includes('/searches/'))
            return 'Searches';
        if (path.includes('/items/'))
            return 'Items';
        if (path.includes('/dashboard/'))
            return 'Dashboard';
        return 'General';
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
                if (description.length > 300) {
                    description = description.substring(0, 300) + '...';
                    break;
                }
            }
        }
        return description.trim() || 'No description available.';
    }
    getWebsetsOverview() {
        const websets = this.getDocumentationByCategory('websets');
        let output = '# Exa Websets API Documentation\n\n';
        output += '> **Note**: Websets features require an active Websets subscription to use in production.\n\n';
        output += 'Comprehensive documentation for Exa Websets API - monitors, webhooks, enrichments, and more.\n\n';
        // Group by feature
        const features = new Map();
        for (const doc of websets) {
            const feature = this.extractFeature(doc.path);
            if (!features.has(feature)) {
                features.set(feature, []);
            }
            features.get(feature).push(doc);
        }
        output += '## Available Features\n\n';
        for (const [feature, docs] of features) {
            output += `### ${feature}\n`;
            output += `${docs.length} documentation pages available\n\n`;
            // Show key operations
            const operations = new Set();
            for (const doc of docs) {
                if (doc.path.includes('create-'))
                    operations.add('create');
                if (doc.path.includes('update-'))
                    operations.add('update');
                if (doc.path.includes('delete-'))
                    operations.add('delete');
                if (doc.path.includes('list-'))
                    operations.add('list');
                if (doc.path.includes('get-'))
                    operations.add('get');
                if (doc.path.includes('cancel-'))
                    operations.add('cancel');
            }
            if (operations.size > 0) {
                output += `**Operations:** ${Array.from(operations).join(', ')}\n\n`;
            }
            // Show sample docs
            const sampleDocs = docs.slice(0, 3);
            for (const doc of sampleDocs) {
                output += `- [${doc.title}](${doc.path})\n`;
            }
            if (docs.length > 3) {
                output += `- ... and ${docs.length - 3} more\n`;
            }
            output += '\n';
        }
        output += '## Quick Start\n\n';
        const quickStart = websets.find(d => d.path.includes('get-started'));
        if (quickStart) {
            output += `Start with: [${quickStart.title}](${quickStart.path})\n\n`;
        }
        output += '## Usage\n\n';
        output += 'To access specific Websets documentation:\n';
        output += '- Use `feature` parameter to get docs for a specific feature (monitors, webhooks, etc.)\n';
        output += '- Use `operation` parameter to filter by operation (create, update, delete, etc.)\n';
        output += '- Use `includeExamples: true` to get full documentation with code examples\n\n';
        output += '## Available Features\n\n';
        const featuresList = [
            'monitors', 'webhooks', 'enrichments', 'imports',
            'websets', 'events', 'searches', 'items'
        ];
        for (const feature of featuresList) {
            output += `- ${feature}\n`;
        }
        output += '\n## Available Operations\n\n';
        const operationsList = ['create', 'update', 'delete', 'list', 'get', 'cancel'];
        for (const operation of operationsList) {
            output += `- ${operation}\n`;
        }
        return output;
    }
    // Specific feature methods
    getMonitors() {
        return this.getWebsetsByFeature('monitors');
    }
    getWebhooks() {
        return this.getWebsetsByFeature('webhooks');
    }
    getEnrichments() {
        return this.getWebsetsByFeature('enrichments');
    }
    getImports() {
        return this.getWebsetsByFeature('imports');
    }
    getWebsets() {
        return this.getWebsetsByFeature('websets');
    }
    getEvents() {
        return this.getWebsetsByFeature('events');
    }
    // Operation-specific methods
    getCreateOperations() {
        return this.getWebsetsByOperation('create');
    }
    getUpdateOperations() {
        return this.getWebsetsByOperation('update');
    }
    getDeleteOperations() {
        return this.getWebsetsByOperation('delete');
    }
    getListOperations() {
        return this.getWebsetsByOperation('list');
    }
    getGetOperations() {
        return this.getWebsetsByOperation('get');
    }
    // Combined methods
    getMonitorOperations(operation) {
        const monitors = this.getMonitors();
        return this.filterByOperation(monitors, operation);
    }
    getWebhookOperations(operation) {
        const webhooks = this.getWebhooks();
        return this.filterByOperation(webhooks, operation);
    }
    getWebsetOperations(operation) {
        const websets = this.getWebsets();
        return this.filterByOperation(websets, operation);
    }
}
