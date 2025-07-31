# Markdown Contents as Default - Exa

> **Source:** https://docs.exa.ai/changelog/markdown-contents-as-default  
> **Last Updated:** 2025-07-31T04:42:40.924Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

June 2025

Markdown Contents as Default

[Documentation

](/reference/getting-started)[Examples

](/examples/exa-mcp)[Integrations

](/integrations/vercel)[SDKs

](/sdks/python-sdk-specification)[Websets

](/websets/overview)[Changelog

](/changelog/geolocation-filter-support)

*   [
    
    Discord](https://discord.com/invite/HCShtBqbfV)
*   [
    
    Blog](https://exa.ai/blog)

##### July 2025

*   [
    
    Geolocation Filter Support
    
    
    
    ](/changelog/geolocation-filter-support)
*   [
    
    New Fast Search Type
    
    
    
    ](/changelog/new-fast-search-type)
*   [
    
    Score Deprecation in Auto and Keyword Search
    
    
    
    ](/changelog/auto-keyword-score-deprecation)

##### June 2025

*   [
    
    Markdown Contents as Default
    
    
    
    ](/changelog/markdown-contents-as-default)
*   [
    
    New Livecrawl Option: Preferred
    
    
    
    ](/changelog/livecrawl-preferred-option)

##### May 2025

*   [
    
    Contents Endpoint Status Changes
    
    
    
    ](/changelog/contents-endpoint-status-changes)
*   [
    
    Auto search as Default
    
    
    
    ](/changelog/auto-search-as-default)

On this page

*   [What Changed](#what-changed)
*   [Content Processing Behavior](#content-processing-behavior)
*   [Benefits of Markdown Default](#benefits-of-markdown-default)

* * *

**Date: 23 June 2025** We’ve updated all Exa API endpoints to return content in markdown format by default. This change provides cleaner, more structured content that’s optimized for AI applications, RAG systems, and general text processing workflows.

All endpoints now process webpage content into clean markdown format by default. Use the `includeHtmlTags` parameter to control content formatting.

## 

[​

](#what-changed)

What Changed

Previously, our endpoints returned content in various formats depending on the specific endpoint configuration. Now, all endpoints consistently return content processed into clean markdown format, making it easier to work with the data across different use cases.

## 

[​

](#content-processing-behavior)

Content Processing Behavior

The `includeHtmlTags` parameter now controls how we process webpage content:

*   **`includeHtmlTags=false` (default)**: We process webpage content into clean markdown format
*   **`includeHtmlTags=true`**: We return content as HTML without processing to markdown

In all cases, we remove extraneous data, advertisements, navigation elements, and other boilerplate content, keeping only what we detect as the main content of the page. **No action required** if you want the new markdown format - it’s now the default! If you need HTML content instead:

## 

[​

](#benefits-of-markdown-default)

Benefits of Markdown Default

1.  **Better for AI applications**: Markdown format is more structured and easier for LLMs to process
2.  **Improved readability**: Clean formatting without HTML tags makes content more readable
3.  **RAG optimization**: Markdown content chunks more naturally for retrieval systems

If you have any questions about this change or need help adapting your implementation, please reach out to [\[email protected\]](/cdn-cgi/l/email-protection#9bf3fef7f7f4dbfee3fab5faf2). We’re excited for you to experience the improved content quality with markdown as the default!

[Score Deprecation in Auto and Keyword Search](/changelog/auto-keyword-score-deprecation)[New Livecrawl Option: Preferred](/changelog/livecrawl-preferred-option)

Assistant

Responses are generated using AI and may contain mistakes.