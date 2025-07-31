# FAQs - Exa

> **Source:** https://docs.exa.ai/reference/faqs  
> **Last Updated:** 2025-07-31T04:43:45.426Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Concepts

FAQs

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

What is Exa?

Exa is a search engine built specifically for AI applications. We’ve built our own search engine from scratch that is state of the art at finding high quality information for LLMs. Exa is used by thousands of companies to power their LLM and agentic applications.

What's different about Exa Search?

Traditional search engines like Google that are optimized for clicks and ads. Because nearly every search API wrap Google, they all have a similar problem.In contrast, Exa is optimized to return the highest quality information for LLM applications. We do not make money from ads, so we are fully incentivized to return the highest quality results to our customers. Because we’ve built our own search engine from scratch, we’re able to provide all sorts of customized features that other providers can’t.

How is Exa different from LLMs?

Exa is a new search engine built from the ground up. LLMs are models built to predict the next piece of text. Exa predicts specific links on the web given their relevance to a query. LLMs have intelligence, and are getting smarter over time as new models are trained. Exa connects these intelligences to the web.

How can Exa be used in an LLM?

Exa enhances LLMs by supplying high-quality, relevant web content, minimizing hallucination and outdated responses. An LLM can take a user’s query, use Exa to find pertinent web content, and generate answers based on reliable, up-to-date information.

How does Exa compare to other search APIs?

Exa.ai offers unique capabilities:

*   Embedding Search Technology: Uses transformers for semantic understanding, handling complex queries based on meaning.
*   Natural Language Queries: Processes and understands natural language queries for more accurate results.
*   Instant Content Retrieval: Instantly returns clean and parsed content for any page in its index.
*   Large-scale searches: Capable of returning thousands of results for automatic processing, ideal for batch use cases.
*   Content Highlights: Extracts relevant excerpts or highlights from retrieved content for targeted information.
*   Optimized for AI Applications: Specifically designed for enhancing AI models, chatbots, and research automation.
*   Auto search: Automatically selects the best search type (neural or keyword) based on the query for optimal results.

How often is the index updated?

We update our index every hour, and are constantly adding batches of new links. We target the highest quality web pages. Our clients oftentimes request specific domains to be more deeply covered - if there is a use-case we can unlock by additional domain coverage in our index, please contact us.

How does similarity search work?

When you search using a URL, Exa crawls the URL, parses the main content from the HTML, and searches the index with that parsed content.The model chooses webpages which it predicts are talked about in similar ways to the prompt URL. That means the model considers a range of factors about the page, including the text style, the domain, and the main ideas inside the text.Similarity search is natural extension for a neural search engine like Exa, and something that’s difficult with keyword search engines like google

What security measures does Exa take?

We have robust policies and everything we do is either in standard cloud services, or built in house (e.g., we have our own vector database that we serve in house, our own GPU cluster, our own query model and our own SERP solution). In addition to this, we can offer unique security arrangements like zero data retention as part of a custom enterprise agreement just chat to us!

Does Exa have a crawler?

Exa crawls pages on the web, just like any other search engine. If a webpage has the noindex tag and is therefore not crawlable by any search engine, then Exa will not crawl that page.

What's on our roadmap?

*   Super low latency search
*   Build a (much) larger index
*   Solve search. No, really.

[Exa Research](/reference/exa-research)[Setting Up and Managing Your Team](/reference/setting-up-team)

Assistant

Responses are generated using AI and may contain mistakes.