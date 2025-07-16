# Exa MCP - Exa

> **Source:** https://docs.exa.ai/examples/exa-mcp  
> **Last Updated:** 2025-07-16T10:33:02.301Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Live Demos

Exa MCP

[Documentation

](/reference/getting-started)[Examples

](/examples/exa-mcp)[Integrations

](/integrations/vercel)[SDKs

](/sdks/python-sdk-specification)[Websets

](/websets/overview)[Changelog

](/changelog/markdown-contents-as-default)

*   [
    
    Discord](https://discord.com/invite/HCShtBqbfV)
*   [
    
    Blog](https://exa.ai/blog)

##### Live Demos

*   [
    
    Exa MCP
    
    
    
    ](/examples/exa-mcp)
*   [
    
    Websets News Monitor
    
    
    
    ](/examples/demo-websets-news-monitor)
*   [
    
    Hallucination Detector
    
    
    
    ](/examples/demo-hallucination-detector)
*   [
    
    Writing Assistant
    
    
    
    ](/examples/demo-exa-powered-writing-assistant)
*   [
    
    Chat app
    
    
    
    ](https://chat.exa.ai/)
*   [
    
    Company researcher
    
    
    
    ](https://companyresearcher.exa.ai/)

##### Tutorials

*   [
    
    Hacker News Clone
    
    
    
    ](/examples/live-demo-hacker-news-clone)
*   [
    
    Building a News Summarizer
    
    
    
    ](/examples/recent-news-summarizer)
*   [
    
    Building a Hallucination Checker
    
    
    
    ](/examples/identifying-hallucinations-with-exa)
*   [
    
    RAG Q&A
    
    
    
    ](/examples/exa-rag)
*   [
    
    Company Analyst
    
    
    
    ](/examples/company-analyst)
*   [
    
    Exa Researcher - JavaScript
    
    
    
    ](/examples/exa-researcher)
*   [
    
    Exa Researcher - Python
    
    
    
    ](/examples/exa-researcher-python)
*   [
    
    Recruiting Agent
    
    
    
    ](/examples/exa-recruiting-agent)
*   [
    
    Phrase Filters: Niche Company Finder
    
    
    
    ](/examples/niche-company-finder-with-phrase-filters)
*   [
    
    Job Search with Exa
    
    
    
    ](/examples/job-search-with-exa)
*   [
    
    Build a Retrieval Agent with LangGraph
    
    
    
    ](/examples/getting-started-with-rag-in-langgraph)
*   [
    
    Structured Outputs with Instructor
    
    
    
    ](/examples/getting-started-with-exa-in-instructor)

On this page

*   [Remote Exa MCP](#remote-exa-mcp)
*   [Remote Exa MCP URL](#remote-exa-mcp-url)
*   [Claude Desktop Configuration](#claude-desktop-configuration)
*   [Available Tools](#available-tools)
*   [Usage Examples](#usage-examples)
*   [Local Installation](#local-installation)
*   [Prerequisites](#prerequisites)
*   [Using NPX](#using-npx)
*   [Configuring Claude Desktop](#configuring-claude-desktop)
*   [Troubleshooting](#troubleshooting)
*   [Common Issues](#common-issues)
*   [Additional Resources](#additional-resources)

Exa MCP Server enables AI assistants like Claude to perform real-time web searches through the Exa Search API, allowing them to access up-to-date information from the internet. It is open-source, checkout [GitHub](https://github.com/exa-labs/exa-mcp-server/).

## 

[​

](#remote-exa-mcp)

Remote Exa MCP

Connect directly to Exa’s hosted MCP server (instead of running it locally).

### 

[​

](#remote-exa-mcp-url)

Remote Exa MCP URL

Copy

Ask AI

```
https://mcp.exa.ai/mcp?exaApiKey=your-exa-api-key
```

Get your API key from [dashboard.exa.ai/api-keys](https://dashboard.exa.ai/api-keys).

### 

[​

](#claude-desktop-configuration)

Claude Desktop Configuration

Add this to your Claude Desktop configuration file:

Copy

Ask AI

```
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.exa.ai/mcp?exaApiKey=your-exa-api-key"
      ]
    }
  }
}
```

## 

[​

](#available-tools)

Available Tools

Exa MCP includes several specialized search tools:

Tool

Description

`web_search_exa`

Performs real-time web searches with optimized results and content extraction

`research_paper_search`

Specialized search focused on academic papers and research content

`company_research`

Comprehensive company research tool that crawls company websites to gather detailed information about businesses

`crawling`

Extracts content from specific URLs, useful for reading articles, PDFs, or any web page when you have the exact URL

`competitor_finder`

Identifies competitors of a company by searching for businesses offering similar products or services

`linkedin_search`

Search LinkedIn for companies and people using Exa AI. Simply include company names, person names, or specific LinkedIn URLs in your query

`wikipedia_search_exa`

Search and retrieve information from Wikipedia articles on specific topics, giving you accurate, structured knowledge from the world’s largest encyclopedia

`github_search`

Search GitHub repositories using Exa AI - performs real-time searches on GitHub.com to find relevant repositories, issues, and GitHub accounts

## 

[​

](#usage-examples)

Usage Examples

Once configured, you can ask Claude to perform searches:

*   “Find and analyze recent research papers about climate change solutions”
*   “Research the company exa.ai and find information about their pricing”
*   “Find competitors for a company that provides web search API services”

## 

[​

](#local-installation)

Local Installation

### 

[​

](#prerequisites)

Prerequisites

*   [Node.js](https://nodejs.org/) v18 or higher.
*   [Claude Desktop](https://claude.ai/download) installed (optional). Exa MCP also works with other MCP-compatible clients like Cursor, Windsurf, and more).
*   An [Exa API key](https://dashboard.exa.ai/api-keys).

### 

[​

](#using-npx)

Using NPX

The simplest way to install and run Exa MCP is via NPX:

Copy

Ask AI

```
# Install globally
npm install -g exa-mcp-server

# Or run directly with npx
npx exa-mcp-server
```

To specify which tools to enable:

Copy

Ask AI

```
# Enable only web search
npx exa-mcp-server --tools=web_search

# Enable multiple tools
npx exa-mcp-server --tools=web_search,research_paper_search,twitter_search

# List all available tools
npx exa-mcp-server --list-tools
```

## 

[​

](#configuring-claude-desktop)

Configuring Claude Desktop

To configure Claude Desktop to use Exa MCP:

1.  **Enable Developer Mode in Claude Desktop**
    
    *   Open Claude Desktop
    *   Click on the top-left menu
    *   Enable Developer Mode
2.  **Open the Configuration File**
    
    *   After enabling Developer Mode, go to Settings
    *   Navigate to the Developer Option
    *   Click “Edit Config” to open the configuration file
    
    Alternatively, you can open it directly:
    
    **macOS:**
    
    Copy
    
    Ask AI
    
    ```
    code ~/Library/Application\ Support/Claude/claude_desktop_config.json
    ```
    
    **Windows:**
    
    Copy
    
    Ask AI
    
    ```
    code %APPDATA%\Claude\claude_desktop_config.json
    ```
    
3.  **Add Exa MCP Configuration**
    
    Add the following to your configuration:
    
    Copy
    
    Ask AI
    
    ```
    {
      "mcpServers": {
        "exa": {
          "command": "npx",
          "args": [
            "-y",
           "exa-mcp-server"
           ],
          "env": {
            "EXA_API_KEY": "your-api-key-here"
          }
        }
      }
    }
    ```
    
    Replace `your-api-key-here` with your actual Exa API key. You can get your (Exa API here)\[[https://dashboard.exa.ai/api-keys](https://dashboard.exa.ai/api-keys)\].
    
4.  **Enabling Specific Tools**
    
    To enable only specific tools:
    
    Copy
    
    Ask AI
    
    ```
    {
      "mcpServers": {
        "exa": {
          "command": "npx",
          "args": [
            "-y",
            "exa-mcp-server",
            "--tools=web_search,research_paper_search"
          ],
          "env": {
            "EXA_API_KEY": "your-api-key-here"
          }
        }
      }
    }
    ```
    
5.  **Restart Claude Desktop**
    
    *   Completely quit Claude Desktop (not just close the window)
    *   Start Claude Desktop again
    *   Look for the 🔌 icon to verify the Exa server is connected

## 

[​

](#troubleshooting)

Troubleshooting

### 

[​

](#common-issues)

Common Issues

1.  **Server Not Found**
    
    *   Ensure the npm package is correctly installed
2.  **API Key Issues**
    
    *   Confirm your EXA\_API\_KEY is valid
    *   Make sure there are no spaces or quotes around the API key
3.  **Connection Problems**
    
    *   Restart Claude Desktop completely

## 

[​

](#additional-resources)

Additional Resources

For more information, visit the [Exa MCP Server GitHub repository](https://github.com/exa-labs/exa-mcp-server/).

Assistant

Responses are generated using AI and may contain mistakes.

[Websets News Monitor](/examples/demo-websets-news-monitor)