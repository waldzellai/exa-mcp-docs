import { z } from 'zod';
import { BaseTool, DocumentationFile, SearchResult } from './base-tool.js';

const ExaChangelogSchema = z.object({
  version: z.string().optional(),
  changeType: z.enum(['breaking', 'feature', 'fix', 'deprecation', 'enhancement']).optional(),
  dateRange: z.object({
    start: z.string().optional(),
    end: z.string().optional()
  }).optional()
});

export type ExaChangelogArgs = z.infer<typeof ExaChangelogSchema>;

export class ExaChangelogTool extends BaseTool {
  static readonly schema = ExaChangelogSchema;

  async execute(args: ExaChangelogArgs): Promise<string> {
    try {
      // If specific version is requested
      if (args.version) {
        if (args.version.toLowerCase() === 'latest') {
          const latest = this.getLatestChanges();
          return this.formatResults(latest);
        } else {
          const versionResults = this.getChangesByVersion(args.version);
          return this.formatResults(versionResults);
        }
      }

      // If change type is specified
      if (args.changeType) {
        const typeResults = this.getChangesByType(args.changeType);
        return this.formatResults(typeResults);
      }

      // If date range is specified
      if (args.dateRange) {
        const dateResults = this.getChangesByDateRange(args.dateRange);
        return this.formatResults(dateResults);
      }

      // No specific request - return overview
      return this.getChangelogOverview();
    } catch (error) {
      return `Error processing changelog request: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  private getChangesByVersion(version: string): DocumentationFile[] {
    const results: DocumentationFile[] = [];
    
    for (const [, doc] of this.docs) {
      if (doc.category === 'changelog' && 
          (doc.content.toLowerCase().includes(version.toLowerCase()) || 
           doc.title.toLowerCase().includes(version.toLowerCase()))) {
        results.push(doc);
      }
    }

    return results.sort((a, b) => this.extractDate(b.content).localeCompare(this.extractDate(a.content)));
  }

  private getChangesByType(changeType: string): DocumentationFile[] {
    const typeKeywords: Record<string, string[]> = {
      'breaking': ['breaking', 'break', 'removed', 'deprecated', 'incompatible'],
      'feature': ['feature', 'new', 'added', 'enhancement', 'improved'],
      'fix': ['fix', 'bug', 'issue', 'resolved', 'corrected'],
      'deprecation': ['deprecated', 'deprecation', 'legacy', 'obsolete'],
      'enhancement': ['enhancement', 'improved', 'optimization', 'performance']
    };

    const keywords = typeKeywords[changeType] || [changeType];
    const results: DocumentationFile[] = [];
    
    for (const [, doc] of this.docs) {
      if (doc.category === 'changelog') {
        const content = doc.content.toLowerCase();
        const title = doc.title.toLowerCase();
        
        for (const keyword of keywords) {
          if (content.includes(keyword) || title.includes(keyword)) {
            results.push(doc);
            break;
          }
        }
      }
    }

    return results.sort((a, b) => this.extractDate(b.content).localeCompare(this.extractDate(a.content)));
  }

  private getChangesByDateRange(dateRange: { start?: string; end?: string }): DocumentationFile[] {
    const results: DocumentationFile[] = [];
    const start = dateRange.start ? new Date(dateRange.start) : null;
    const end = dateRange.end ? new Date(dateRange.end) : null;
    
    for (const [, doc] of this.docs) {
      if (doc.category === 'changelog') {
        const docDate = new Date(this.extractDate(doc.content) || doc.lastModified);
        
        let includeDoc = true;
        
        if (start && docDate < start) {
          includeDoc = false;
        }
        
        if (end && docDate > end) {
          includeDoc = false;
        }
        
        if (includeDoc) {
          results.push(doc);
        }
      }
    }

    return results.sort((a, b) => this.extractDate(b.content).localeCompare(this.extractDate(a.content)));
  }

  private getLatestChanges(): DocumentationFile[] {
    const allChanges = this.getDocumentationByCategory('changelog');
    
    // Sort by date (most recent first)
    const sorted = allChanges.sort((a, b) => {
      const dateA = this.extractDate(a.content) || a.lastModified;
      const dateB = this.extractDate(b.content) || b.lastModified;
      return dateB.localeCompare(dateA);
    });

    // Return top 3 most recent
    return sorted.slice(0, 3);
  }

  private extractDate(content: string): string {
    // Look for date patterns in the content
    const datePatterns = [
      /(\d{4}-\d{2}-\d{2})/,  // YYYY-MM-DD
      /(\d{2}\/\d{2}\/\d{4})/, // MM/DD/YYYY
      /(\d{1,2} \w+ \d{4})/,   // DD Month YYYY
      /(\w+ \d{1,2}, \d{4})/   // Month DD, YYYY
    ];

    const lines = content.split('\n');
    for (const line of lines) {
      for (const pattern of datePatterns) {
        const match = line.match(pattern);
        if (match) {
          return match[1];
        }
      }
    }

    return '';
  }

  private extractChangeType(content: string): string[] {
    const types: string[] = [];
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('breaking') || contentLower.includes('removed')) {
      types.push('breaking');
    }
    if (contentLower.includes('feature') || contentLower.includes('new') || contentLower.includes('added')) {
      types.push('feature');
    }
    if (contentLower.includes('fix') || contentLower.includes('bug')) {
      types.push('fix');
    }
    if (contentLower.includes('deprecated') || contentLower.includes('deprecation')) {
      types.push('deprecation');
    }
    if (contentLower.includes('enhancement') || contentLower.includes('improved')) {
      types.push('enhancement');
    }

    return types;
  }

  private formatResults(results: DocumentationFile[]): string {
    if (results.length === 0) {
      return 'No changelog entries found matching your query.';
    }

    let output = '# Exa API Changelog\n\n';
    
    for (const result of results) {
      output += `## ${result.title}\n`;
      output += `**Date:** ${this.extractDate(result.content) || 'Unknown'}\n`;
      
      const changeTypes = this.extractChangeType(result.content);
      if (changeTypes.length > 0) {
        output += `**Change Types:** ${changeTypes.join(', ')}\n`;
      }
      
      output += `**Path:** ${result.path}\n\n`;
      output += `${result.content}\n\n`;
      output += '---\n\n';
    }
    
    return output.trim();
  }

  private getChangelogOverview(): string {
    const changelog = this.getDocumentationByCategory('changelog');
    
    let output = '# Exa API Changelog Overview\n\n';
    output += 'Track the latest changes, updates, and improvements to the Exa API.\n\n';
    
    output += '## Recent Changes\n\n';
    const latest = this.getLatestChanges();
    
    for (const change of latest) {
      output += `### ${change.title}\n`;
      output += `**Date:** ${this.extractDate(change.content) || 'Unknown'}\n`;
      
      const changeTypes = this.extractChangeType(change.content);
      if (changeTypes.length > 0) {
        output += `**Types:** ${changeTypes.join(', ')}\n`;
      }
      
      output += `${this.extractSummary(change.content)}\n\n`;
    }

    output += '## All Changes\n\n';
    const sortedChanges = changelog.sort((a, b) => {
      const dateA = this.extractDate(a.content) || a.lastModified;
      const dateB = this.extractDate(b.content) || b.lastModified;
      return dateB.localeCompare(dateA);
    });

    for (const change of sortedChanges) {
      const date = this.extractDate(change.content) || 'Unknown';
      output += `- [${change.title}](${change.path}) - ${date}\n`;
    }

    output += '\n## Usage\n\n';
    output += 'To access specific changelog information:\n';
    output += '- Use `version: "latest"` to get the most recent changes\n';
    output += '- Use `version` parameter to find changes for a specific version\n';
    output += '- Use `changeType` to filter by change type (breaking, feature, fix, etc.)\n';
    output += '- Use `dateRange` to get changes within a specific time period\n\n';

    output += '## Change Types\n\n';
    const changeTypes = [
      'breaking', 'feature', 'fix', 'deprecation', 'enhancement'
    ];
    
    for (const type of changeTypes) {
      output += `- ${type}\n`;
    }

    output += '\n## Migration Guides\n\n';
    const migrationGuides = changelog.filter(c => 
      c.content.toLowerCase().includes('migration') || 
      c.content.toLowerCase().includes('breaking')
    );

    if (migrationGuides.length > 0) {
      for (const guide of migrationGuides) {
        output += `- [${guide.title}](${guide.path})\n`;
      }
    } else {
      output += 'No migration guides found in current changelog.\n';
    }

    return output;
  }

  private extractSummary(content: string): string {
    const lines = content.split('\n');
    let inSummary = false;
    let summary = '';
    
    for (const line of lines) {
      if (line.startsWith('# ')) {
        inSummary = true;
        continue;
      }
      
      if (inSummary) {
        if (line.trim() === '') continue;
        if (line.startsWith('#')) break;
        
        summary += line + '\n';
        if (summary.length > 200) {
          summary = summary.substring(0, 200) + '...';
          break;
        }
      }
    }
    
    return summary.trim() || 'No summary available.';
  }

  // Specific methods
  getBreakingChanges(): DocumentationFile[] {
    return this.getChangesByType('breaking');
  }

  getNewFeatures(): DocumentationFile[] {
    return this.getChangesByType('feature');
  }

  getBugFixes(): DocumentationFile[] {
    return this.getChangesByType('fix');
  }

  getDeprecations(): DocumentationFile[] {
    return this.getChangesByType('deprecation');
  }

  getEnhancements(): DocumentationFile[] {
    return this.getChangesByType('enhancement');
  }

  getRecentChanges(days: number = 30): DocumentationFile[] {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return this.getChangesByDateRange({
      start: startDate.toISOString(),
      end: endDate.toISOString()
    });
  }
}