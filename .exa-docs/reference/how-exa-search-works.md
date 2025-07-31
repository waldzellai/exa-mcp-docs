# How Exa Search Works - Exa

> **Source:** https://docs.exa.ai/reference/how-exa-search-works  
> **Last Updated:** 2025-07-31T04:43:53.856Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Concepts

How Exa Search Works

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

*   [Neural search via ‘next-link prediction’](#neural-search-via-%E2%80%98next-link-prediction%E2%80%99)
*   [Auto search combines keyword and neural](#auto-search-combines-keyword-and-neural)
*   [Fast search is the world’s fastest search API](#fast-search-is-the-world%E2%80%99s-fastest-search-api)

* * *

We offer four search types:

*   **Auto (Default)** - Our best search, intelligently combines keyword and neural
*   **Fast** - A streamlined implementation of keyword and neural search for faster results
*   **Keyword** - Uses google-like search to find results with matching keywords
*   **Neural** - Our AI search model, predicts relevant links based on query meaning

## 

[​

](#neural-search-via-%E2%80%98next-link-prediction%E2%80%99)

Neural search via ‘next-link prediction’

At Exa, we’ve built our very own index of high quality web content, and have trained a model to query this index powered by the same embeddings-based technology that makes modern LLMs so powerful. By using embeddings, we move beyond keyword searches to use ‘next-link prediction’, understanding the semantic content of queries and indexed documents. This method predicts which web links are most relevant based on the semantic meaning, not just direct word matches. By doing this, our model anticipates the most relevant links by understanding complex queries, including indirect or thematic relationships. This approach is especially effective for exploratory searches, where precise terms may be unknown, or where queries demand many, often semantically dense, layered filters. You can query our search model directly with search type `neural`. It is also incorporated into the `auto` and `fast` search types.

## 

[​

](#auto-search-combines-keyword-and-neural)

Auto search combines keyword and neural

Sometimes keyword search is the best way to query the web - for instance, you may have a specific word or piece of jargon that you want to match explicitly with results (often the case with proper nouns like place-names). In these cases, semantic searches are not the most useful. To ensure our engine is comprehensive, we have built keyword search in parallel to our novel neural search capability. This means Exa is an ‘all-in-one’ search solution, no matter what your query needs are. We surface both query archetypes through search type `auto`, to give users the best of both worlds. It uses a reranker model that understands your query and ranks results from keyword and neural search according to relevance.

## 

[​

](#fast-search-is-the-world%E2%80%99s-fastest-search-api)

Fast search is the world’s fastest search API

We built Fast search for when latency matters most. It trades off a small amount of performance for significant speed improvements. Fast search is best for applications where saving milliseconds matters. For real-time applications like interactive voice agents and autocomplete, faster search means a better user experience. Long running agents, like deep research, might use dozens or hundreds of search calls to complete their task so speed improvements add up. We achieved these latency improvements by making streamlined versions of our keyword, neural, and reranker models. You can expect Fast search to run in less than 400 milliseconds, not accounting for network latency or live crawling contents.

[OpenAI Responses API](/reference/openai-responses-api-with-exa)[The Exa Index](/reference/the-exa-index)

Assistant

Responses are generated using AI and may contain mistakes.