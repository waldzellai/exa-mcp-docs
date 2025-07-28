# Get a task - Exa

> **Source:** https://docs.exa.ai/reference/research/get-a-task  
> **Last Updated:** 2025-07-16T10:34:26.164Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Research

Get a task

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
    
    *   [POST
        
        Create a task
        
        
        
        ](/reference/research/create-a-task)
    *   [GET
        
        Get a task
        
        
        
        ](/reference/research/get-a-task)
    *   [GET
        
        List tasks
        
        
        
        ](/reference/research/list-tasks)
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

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/research/v0/tasks/{id} \
  --header 'x-api-key: <api-key>'
```

200

Copy

Ask AI

```
{
  "id": "<string>",
  "status": "running",
  "instructions": "<string>",
  "schema": {},
  "data": {},
  "citations": {}
}
```

GET

/

research

/

v0

/

tasks

/

{id}

Try it

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/research/v0/tasks/{id} \
  --header 'x-api-key: <api-key>'
```

200

Copy

Ask AI

```
{
  "id": "<string>",
  "status": "running",
  "instructions": "<string>",
  "schema": {},
  "data": {},
  "citations": {}
}
```

[

## Get your Exa API key





](https://dashboard.exa.ai/api-keys)

Assistant

Responses are generated using AI and may contain mistakes.

#### Authorizations

[​

](#authorization-x-api-key)

x-api-key

string

header

required

API key can be provided either via x-api-key header or Authorization header with Bearer scheme

#### Path Parameters

[​

](#parameter-id)

id

string

required

#### Response

200 - application/json

Research task details

The response is of type `object`.

[Create a task](/reference/research/create-a-task)[List tasks](/reference/research/list-tasks)