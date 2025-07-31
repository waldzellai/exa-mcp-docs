# Contents retrieval with Exa API - Exa

> **Source:** https://docs.exa.ai/reference/contents-retrieval-with-exa-api  
> **Last Updated:** 2025-07-31T04:43:34.785Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Concepts

Contents retrieval with Exa API

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

##### Getting Started

*   [
    
    Overview
    
    
    
    ](/reference/getting-started)
*   [
    
    Quickstart
    
    
    
    ](/reference/quickstart)

##### API Reference

*   [POST
    
    Search
    
    
    
    ](/reference/search)
*   [POST
    
    Get contents
    
    
    
    ](/reference/get-contents)
*   [POST
    
    Find similar links
    
    
    
    ](/reference/find-similar-links)
*   [POST
    
    Answer
    
    
    
    ](/reference/answer)
*   Research
    
*   [
    
    Websets
    
    
    
    ](/websets/api/overview)
*   [
    
    OpenAPI Specification
    
    
    
    ](/reference/openapi-spec)

##### RAG Quick Start Guide

*   [
    
    RAG with Exa and OpenAI
    
    
    
    ](/reference/rag-quickstart)
*   [
    
    RAG with LangChain
    
    
    
    ](/reference/langchain)
*   [
    
    OpenAI Exa Wrapper
    
    
    
    ](/reference/openai)
*   [
    
    CrewAI agents with Exa
    
    
    
    ](/reference/crewai)
*   [
    
    RAG with LlamaIndex
    
    
    
    ](/reference/llamaindex)
*   [
    
    Tool calling with GPT
    
    
    
    ](/reference/tool-calling-with-gpt4o)
*   [
    
    Tool calling with Claude
    
    
    
    ](/reference/tool-calling-with-claude)
*   [
    
    OpenAI Chat Completions
    
    
    
    ](/reference/chat-completions)
*   [
    
    OpenAI Responses API
    
    
    
    ](/reference/openai-responses-api-with-exa)

##### Concepts

*   [
    
    How Exa Search Works
    
    
    
    ](/reference/how-exa-search-works)
*   [
    
    The Exa Index
    
    
    
    ](/reference/the-exa-index)
*   [
    
    Contents retrieval with Exa API
    
    
    
    ](/reference/contents-retrieval-with-exa-api)
*   [
    
    Exa's Capabilities Explained
    
    
    
    ](/reference/exas-capabilities-explained)
*   [
    
    Crawling Subpages with Exa
    
    
    
    ](/reference/crawling-subpages-with-exa)
*   [
    
    Exa LiveCrawl
    
    
    
    ](/reference/should-we-use-livecrawl)
*   [
    
    Exa Research
    
    
    
    ](/reference/exa-research)
*   [
    
    FAQs
    
    
    
    ](/reference/faqs)

##### Admin

*   [
    
    Setting Up and Managing Your Team
    
    
    
    ](/reference/setting-up-team)
*   [
    
    Rate Limits
    
    
    
    ](/reference/rate-limits)
*   [
    
    Enterprise Documentation & Security
    
    
    
    ](/reference/security)

On this page

*   [Text (text=True):](#text-text%3Dtrue-%3A)
*   [Highlights:](#highlights%3A)
*   [Summary (summary=True):](#summary-summary%3Dtrue-%3A)
*   [Structured Summaries](#structured-summaries)
*   [Images and favicons](#images-and-favicons)
*   [Crawl Errors](#crawl-errors)

* * *

When using the Exa API, you can request different types of content to be returned for each search result. The three content return types are:

## 

[​

](#text-text%3Dtrue-%3A)

Text (text=True):

Returns the full text content of the result, such as the main body of an article or webpage. This is extractive content directly taken from the source.

## 

[​

](#highlights%3A)

Highlights:

Delivers key excerpts from the text that are most relevant to your search query, emphasizing important information within the content. This is also extractive content from the source. You can configure highlights in two ways:

1.  **Simple boolean** (`highlights=True`): Returns default highlights based on the search query
2.  **Detailed configuration** (pass as an object):
    
    Copy
    
    Ask AI
    
    ```
    {
      "highlights": {
        "query": "Your specific highlight query",
        "numSentences": 3,
        "highlightsPerUrl": 5
      }
    }
    ```
    
    *   `query`: The specific query to use for generating highlights (if different from search query)
    *   `numSentences`: Number of sentences per highlight
    *   `highlightsPerUrl`: Maximum number of highlights to return per URL

## 

[​

](#summary-summary%3Dtrue-%3A)

Summary (summary=True):

Provides a concise summary generated from the text, tailored to a specific query you provide. This is abstractive content created by processing the source text using Gemini Flash.

### 

[​

](#structured-summaries)

Structured Summaries

You can also request structured summaries by providing a JSON schema:

Copy

Ask AI

```
{
  "summary": {
    "query": "Provide company information",
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Company Information",
      "type": "object",
      "properties": {
        "name": { "type": "string", "description": "The name of the company" },
        "industry": { "type": "string", "description": "The industry the company operates in" },
        "foundedYear": { "type": "number", "description": "The year the company was founded" }
      },
      "required": ["name", "industry"]
    }
  }
}
```

The API will return the summary as a JSON string that matches your schema structure, which you can parse to access the structured data. By specifying these options in your API call, you can control the depth and focus of the information returned, making your search results more actionable and relevant. To see the full configurability of the contents returns, [check out our Dashboard](https://dashboard.exa.ai/) and sample queries.

## 

[​

](#images-and-favicons)

Images and favicons

When making API requests, Exa can return:

*   Image URLs from the source content (you can specify how many images you want returned)
*   Website favicons associated with each search result (when available)

## 

[​

](#crawl-errors)

Crawl Errors

The contents endpoint provides detailed status information for each URL through the `statuses` field in the response. The endpoint only returns an error if there’s an internal issue on Exa’s end - all other cases are reported through individual URL statuses. Each response includes a `statuses` array with status information for each requested URL:

Copy

Ask AI

```
{
  "results": [...],
  "statuses": [
    {
      "id": "https://example.com",
      "status": "success" | "error",
      "error": {
        "tag": "CRAWL_NOT_FOUND" | "CRAWL_TIMEOUT" | "CRAWL_LIVECRAWL_TIMEOUT" | "SOURCE_NOT_AVAILABLE" | "CRAWL_UNKNOWN_ERROR",
        "httpStatusCode": 404 | 408 | 403 | 500
      }
    }
  ]
}
```

The error tags correspond to different failure scenarios:

*   `CRAWL_NOT_FOUND`: Content not found (HTTP 404)
*   `CRAWL_TIMEOUT`: The target page returned a timeout error (HTTP 408)
*   `CRAWL_LIVECRAWL_TIMEOUT`: The `livecrawlTimeout` parameter limit was reached during crawling
*   `SOURCE_NOT_AVAILABLE`: Access forbidden or source unavailable (HTTP 403)
*   `CRAWL_UNKNOWN_ERROR`: Other errors (HTTP 500+)

To handle errors, check the `statuses` field for each URL:

Copy

Ask AI

```
result = exa.get_contents(["https://example.com"])
for status in result.statuses:
    if status.status == "error":
        print(f"Error for {status.id}: {status.error.tag} ({status.error.httpStatusCode})")
```

This allows you to handle different failure scenarios appropriately for each URL in your request.

[The Exa Index](/reference/the-exa-index)[Exa's Capabilities Explained](/reference/exas-capabilities-explained)

Assistant

Responses are generated using AI and may contain mistakes.