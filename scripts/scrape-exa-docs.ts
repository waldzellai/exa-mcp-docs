import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

const sleep = promisify(setTimeout);

interface RouteConfig {
  path: string;
  type: 'page';
}

interface ScrapingConfig {
  baseUrl: string;
  outputDir: string;
  routes: RouteConfig[];
  rateLimit: number;
  maxRetries: number;
}

const config: ScrapingConfig = {
  baseUrl: 'https://docs.exa.ai',
  outputDir: '.exa-docs',
  rateLimit: 2000, // ms between requests
  maxRetries: 3,
  routes: [
    // Changelog
    { path: '/changelog/auto-search-as-default', type: 'page' },
    { path: '/changelog/contents-endpoint-status-changes', type: 'page' },
    { path: '/changelog/livecrawl-preferred-option', type: 'page' },
    { path: '/changelog/markdown-contents-as-default', type: 'page' },
    
    // Examples
    { path: '/examples/company-analyst', type: 'page' },
    { path: '/examples/demo-exa-powered-writing-assistant', type: 'page' },
    { path: '/examples/demo-hallucination-detector', type: 'page' },
    { path: '/examples/demo-websets-news-monitor', type: 'page' },
    { path: '/examples/exa-mcp', type: 'page' },
    { path: '/examples/exa-rag', type: 'page' },
    { path: '/examples/exa-recruiting-agent', type: 'page' },
    { path: '/examples/exa-researcher', type: 'page' },
    { path: '/examples/exa-researcher-python', type: 'page' },
    { path: '/examples/getting-started-with-exa-in-instructor', type: 'page' },
    { path: '/examples/getting-started-with-rag-in-langgraph', type: 'page' },
    { path: '/examples/identifying-hallucinations-with-exa', type: 'page' },
    { path: '/examples/job-search-with-exa', type: 'page' },
    { path: '/examples/live-demo-hacker-news-clone', type: 'page' },
    { path: '/examples/niche-company-finder-with-phrase-filters', type: 'page' },
    { path: '/examples/recent-news-summarizer', type: 'page' },
    
    // Integrations
    { path: '/integrations/crew-ai-docs', type: 'page' },
    { path: '/integrations/ibm-watsonx-docs', type: 'page' },
    { path: '/integrations/langchain-docs', type: 'page' },
    { path: '/integrations/llamaIndex-docs', type: 'page' },
    { path: '/integrations/openrouter', type: 'page' },
    { path: '/integrations/vercel', type: 'page' },
    
    // API Reference
    { path: '/reference/answer', type: 'page' },
    { path: '/reference/chat-completions', type: 'page' },
    { path: '/reference/contents-retrieval-with-exa-api', type: 'page' },
    { path: '/reference/crawling-subpages-with-exa', type: 'page' },
    { path: '/reference/crewai', type: 'page' },
    { path: '/reference/exa-research', type: 'page' },
    { path: '/reference/exas-capabilities-explained', type: 'page' },
    { path: '/reference/faqs', type: 'page' },
    { path: '/reference/find-similar-links', type: 'page' },
    { path: '/reference/get-contents', type: 'page' },
    { path: '/reference/getting-started', type: 'page' },
    { path: '/reference/how-exa-search-works', type: 'page' },
    { path: '/reference/langchain', type: 'page' },
    { path: '/reference/llamaindex', type: 'page' },
    { path: '/reference/openai', type: 'page' },
    { path: '/reference/openai-responses-api-with-exa', type: 'page' },
    { path: '/reference/openapi-spec', type: 'page' },
    { path: '/reference/quickstart', type: 'page' },
    { path: '/reference/rag-quickstart', type: 'page' },
    { path: '/reference/rate-limits', type: 'page' },
    { path: '/reference/research/create-a-task', type: 'page' },
    { path: '/reference/research/get-a-task', type: 'page' },
    { path: '/reference/research/list-tasks', type: 'page' },
    { path: '/reference/search', type: 'page' },
    { path: '/reference/security', type: 'page' },
    { path: '/reference/setting-up-team', type: 'page' },
    { path: '/reference/should-we-use-livecrawl', type: 'page' },
    { path: '/reference/the-exa-index', type: 'page' },
    { path: '/reference/tool-calling-with-claude', type: 'page' },
    { path: '/reference/tool-calling-with-gpt4o', type: 'page' },
    
    // SDKs
    { path: '/sdks/cheat-sheet', type: 'page' },
    { path: '/sdks/python-sdk-specification', type: 'page' },
    { path: '/sdks/typescript-sdk-specification', type: 'page' },
    
    // Websets
    { path: '/websets/overview', type: 'page' },
    { path: '/websets/faq', type: 'page' },
    { path: '/websets/api/overview', type: 'page' },
    { path: '/websets/api/get-started', type: 'page' },
    { path: '/websets/api/how-it-works', type: 'page' },
    { path: '/websets/api/events/get-an-event', type: 'page' },
    { path: '/websets/api/events/list-all-events', type: 'page' },
    { path: '/websets/api/events/types', type: 'page' },
    { path: '/websets/api/imports/create-an-import', type: 'page' },
    { path: '/websets/api/imports/delete-import', type: 'page' },
    { path: '/websets/api/imports/get-import', type: 'page' },
    { path: '/websets/api/imports/list-imports', type: 'page' },
    { path: '/websets/api/imports/update-import', type: 'page' },
    { path: '/websets/api/monitors/create-a-monitor', type: 'page' },
    { path: '/websets/api/monitors/delete-monitor', type: 'page' },
    { path: '/websets/api/monitors/get-monitor', type: 'page' },
    { path: '/websets/api/monitors/list-monitors', type: 'page' },
    { path: '/websets/api/monitors/update-monitor', type: 'page' },
    { path: '/websets/api/monitors/runs/get-monitor-run', type: 'page' },
    { path: '/websets/api/monitors/runs/list-monitor-runs', type: 'page' },
    { path: '/websets/api/webhooks/create-a-webhook', type: 'page' },
    { path: '/websets/api/webhooks/delete-a-webhook', type: 'page' },
    { path: '/websets/api/webhooks/get-a-webhook', type: 'page' },
    { path: '/websets/api/webhooks/list-webhooks', type: 'page' },
    { path: '/websets/api/webhooks/update-a-webhook', type: 'page' },
    { path: '/websets/api/webhooks/verifying-signatures', type: 'page' },
    { path: '/websets/api/webhooks/attempts/list-webhook-attempts', type: 'page' },
    { path: '/websets/api/websets/cancel-a-running-webset', type: 'page' },
    { path: '/websets/api/websets/create-a-webset', type: 'page' },
    { path: '/websets/api/websets/delete-a-webset', type: 'page' },
    { path: '/websets/api/websets/get-a-webset', type: 'page' },
    { path: '/websets/api/websets/list-all-websets', type: 'page' },
    { path: '/websets/api/websets/update-a-webset', type: 'page' },
    { path: '/websets/api/websets/enrichments/cancel-a-running-enrichment', type: 'page' },
    { path: '/websets/api/websets/enrichments/create-an-enrichment', type: 'page' },
    { path: '/websets/api/websets/enrichments/delete-an-enrichment', type: 'page' },
    { path: '/websets/api/websets/enrichments/get-an-enrichment', type: 'page' },
    { path: '/websets/api/websets/items/delete-an-item', type: 'page' },
    { path: '/websets/api/websets/items/get-an-item', type: 'page' },
    { path: '/websets/api/websets/items/list-all-items-for-a-webset', type: 'page' },
    { path: '/websets/api/websets/searches/cancel-a-running-search', type: 'page' },
    { path: '/websets/api/websets/searches/create-a-search', type: 'page' },
    { path: '/websets/api/websets/searches/get-a-search', type: 'page' },
    { path: '/websets/dashboard/exclude-results', type: 'page' },
    { path: '/websets/dashboard/get-started', type: 'page' },
    { path: '/websets/dashboard/import-from-csv', type: 'page' },
    { path: '/websets/dashboard/integrations', type: 'page' },
    { path: '/websets/dashboard/websets-example-queries', type: 'page' },
    { path: '/websets/dashboard/walkthroughs/Creating-enrichments', type: 'page' },
    { path: '/websets/dashboard/walkthroughs/Exploring-your-results', type: 'page' },
    { path: '/websets/dashboard/walkthroughs/Managing-Team-Members', type: 'page' },
    { path: '/websets/dashboard/walkthroughs/Prompting', type: 'page' },
    { path: '/websets/dashboard/walkthroughs/Sharing-and-Downloading-Your-Results', type: 'page' }
  ]
};

class DocumentationScraper {
  private turndownService: TurndownService;
  private metadata: any = {
    scrapedAt: new Date().toISOString(),
    baseUrl: config.baseUrl,
    totalPages: 0,
    successfulPages: 0,
    failedPages: []
  };

  constructor() {
    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced'
    });
  }

  async scrapeAll(): Promise<void> {
    console.log(`Starting documentation scraping from ${config.baseUrl}`);
    
    // Create output directory
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir, { recursive: true });
    }

    this.metadata.totalPages = config.routes.length;
    let processedCount = 0;

    for (const route of config.routes) {
      try {
        console.log(`[${processedCount + 1}/${config.routes.length}] Scraping ${route.path}...`);
        await this.scrapePage(route);
        this.metadata.successfulPages++;
        processedCount++;
        
        // Rate limiting
        if (processedCount < config.routes.length) {
          await sleep(config.rateLimit);
        }
      } catch (error) {
        console.error(`Failed to scrape ${route.path}:`, error);
        this.metadata.failedPages.push({
          path: route.path,
          error: error instanceof Error ? error.message : String(error)
        });
        processedCount++;
      }
    }

    // Save metadata
    const metadataPath = path.join(config.outputDir, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(this.metadata, null, 2));

    console.log(`\\nScraping complete!`);
    console.log(`- Total pages: ${this.metadata.totalPages}`);
    console.log(`- Successful: ${this.metadata.successfulPages}`);
    console.log(`- Failed: ${this.metadata.failedPages.length}`);
    
    if (this.metadata.failedPages.length > 0) {
      console.log('\\nFailed pages:');
      this.metadata.failedPages.forEach((failure: any) => {
        console.log(`  - ${failure.path}: ${failure.error}`);
      });
    }
  }

  private async scrapePage(route: RouteConfig): Promise<void> {
    const url = `${config.baseUrl}${route.path}`;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Exa-MCP-Scraper/1.0)'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        const markdown = this.convertToMarkdown(html, route.path);
        
        // Save to file
        const filePath = this.getFilePath(route.path);
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(filePath, markdown);
        return; // Success!
        
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (attempt < config.maxRetries) {
          console.log(`  Attempt ${attempt} failed, retrying...`);
          await sleep(1000 * attempt); // Exponential backoff
        }
      }
    }

    throw lastError || new Error('Unknown error');
  }

  private convertToMarkdown(html: string, path: string): string {
    const $ = cheerio.load(html);
    
    // Try to find the main content area
    let contentHtml = '';
    
    // Common content selectors for documentation sites
    const contentSelectors = [
      'main',
      '[role="main"]',
      '.content',
      '.documentation',
      '.docs-content',
      '.main-content',
      'article',
      '.container .row .col'
    ];
    
    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        contentHtml = element.html() || '';
        break;
      }
    }
    
    // Fallback to body if no main content found
    if (!contentHtml) {
      // Remove script and style tags
      $('script, style, nav, header, footer, .sidebar, .navigation').remove();
      contentHtml = $('body').html() || '';
    }
    
    // Convert to markdown
    const markdown = this.turndownService.turndown(contentHtml);
    
    // Add metadata header
    const header = `# ${this.extractTitle($, path)}

> **Source:** ${config.baseUrl}${path}  
> **Last Updated:** ${new Date().toISOString()}

---

`;
    
    return header + markdown;
  }

  private extractTitle($: cheerio.CheerioAPI, path: string): string {
    // Try to extract title from various sources
    const title = $('title').text() || 
                 $('h1').first().text() || 
                 $('h2').first().text() ||
                 path.split('/').pop()?.replace(/[-_]/g, ' ') || 
                 'Documentation';
    
    return title.trim().replace(/\s+/g, ' ');
  }

  private getFilePath(route: string): string {
    // Convert route path to file path
    let filePath = route;
    
    // Remove leading slash
    if (filePath.startsWith('/')) {
      filePath = filePath.slice(1);
    }
    
    // Add .md extension
    if (!filePath.endsWith('.md')) {
      filePath += '.md';
    }
    
    return path.join(config.outputDir, filePath);
  }
}

// Main execution
async function main() {
  const scraper = new DocumentationScraper();
  await scraper.scrapeAll();
}

if (require.main === module) {
  main().catch(console.error);
}