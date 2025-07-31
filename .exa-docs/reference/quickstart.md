# Quickstart - Exa

> **Source:** https://docs.exa.ai/reference/quickstart  
> **Last Updated:** 2025-07-31T04:44:06.997Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Getting Started

Quickstart

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

*   [Create and setup your API key](#create-and-setup-your-api-key)
*   [Create a .env file](#create-a-env-file)
*   [Make an API request](#make-an-api-request)

* * *

## 

[​

](#create-and-setup-your-api-key)

Create and setup your API key

[

## Get your Exa API key





](https://dashboard.exa.ai/api-keys)  

## 

[​

](#create-a-env-file)

Create a .env file

Create a file called `.env` in the root of your project and add the following line.

Copy

Ask AI

```
EXA_API_KEY=your api key without quotes
```

  

## 

[​

](#make-an-api-request)

Make an API request

Use our python or javascript SDKs, or call the API directly with cURL.

*   Python
*   JavaScript
*   cURL

Install the python SDKs with pip. If you want to store your API key in a `.env` file, make sure to install the dotenv library.

Copy

Ask AI

```
pip install exa-py
pip install openai
pip install python-dotenv
```

Once you’ve installed the SDKs, create a file called `exa.py` and add the code below.

*   Search and crawl
*   Answer
*   Chat Completions
*   Find similar links and get full text

Get a list of results and their full text content.

python

Copy

Ask AI

```
from exa_py import Exa
from dotenv import load_dotenv

import os

# Use .env to store your API key or paste it directly into the code
load_dotenv()
exa = Exa(os.getenv('EXA_API_KEY'))

result = exa.search_and_contents(
  "An article about the state of AGI",
  type="auto",
  text=True,
)

print(result)
```

[Overview](/reference/getting-started)[Search](/reference/search)

Assistant

Responses are generated using AI and may contain mistakes.