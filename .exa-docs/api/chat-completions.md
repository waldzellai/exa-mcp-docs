# OpenAI Chat Completions - Exa

> **Source:** https://docs.exa.ai/reference/chat-completions  
> **Last Updated:** 2025-07-16T10:33:43.151Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

RAG Quick Start Guide

OpenAI Chat Completions

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

*   [Answer](#answer)
*   [Research](#research)

* * *

Exa will parse through your messages and send only the last message to `/answer` or `/research`.

## 

[​

](#answer)

Answer

To use Exa’s `/answer` endpoint via the chat completions interface:

1.  Replace base URL with `https://api.exa.ai`
2.  Replace API key with your Exa API key
3.  Replace model name with `exa`.

See the full `/answer` endpoint reference [here](/reference/answer).

Python

JavaScript

Curl

Copy

Ask AI

```
from openai import OpenAI

client = OpenAI(
  base_url="https://api.exa.ai", # use exa as the base url
  api_key="YOUR_EXA_API_KEY", # update your api key
)

completion = client.chat.completions.create(
  model="exa",
  messages = [
  {"role": "system", "content": "You are a helpful assistant."},
  {"role": "user", "content": "What are the latest developments in quantum computing?"}
],

# use extra_body to pass extra parameters to the /answer endpoint
  extra_body={
    "text": True # include full text from sources
  }
)

print(completion.choices[0].message.content)  # print the response content
print(completion.choices[0].message.citations)  # print the citations
```

## 

[​

](#research)

Research

To use Exa’s research models via the chat completions interface:

1.  Replace base URL with `https://api.exa.ai`
2.  Replace API key with your Exa API key
3.  Replace model name with `exa-research` or `exa-research-pro`

See the full `/research` endpoint reference [here](/reference/research/create-a-task).

Python

JavaScript

Curl

Copy

Ask AI

```
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.exa.ai",
    api_key=os.environ["EXA_API_KEY"],
)

completion = client.chat.completions.create(
    model="exa-research", # or exa-research-pro
    messages=[
        {"role": "user", "content": "What makes some LLMs so much better than others?"}
    ],
    stream=True,
)

for chunk in completion:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

Assistant

Responses are generated using AI and may contain mistakes.

[Tool calling with Claude](/reference/tool-calling-with-claude)[OpenAI Responses API](/reference/openai-responses-api-with-exa)