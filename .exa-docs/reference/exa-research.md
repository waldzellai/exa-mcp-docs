# Exa Research - Exa

> **Source:** https://docs.exa.ai/reference/exa-research  
> **Last Updated:** 2025-07-31T04:43:41.225Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Concepts

Exa Research

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

*   [How It Works](#how-it-works)
*   [Best Practices](#best-practices)
*   [Models](#models)
*   [Pricing](#pricing)
*   [Examples](#examples)
*   [FAQs](#faqs)

## 

[​

](#how-it-works)

How It Works

The Research API is an **asynchronous, multi-step pipeline** that transforms open-ended questions into structured JSON answers backed by citations. You provide natural-language instructions (e.g. _“Compare the hardware roadmaps of the top GPU manufacturers”_) and an optional JSON Schema describing the output you want. Under the hood, Exa agents perform multiple steps:

1.  **Planning** – Your natural-language `instructions` are parsed by an LLM that decomposes the task into one or more research steps.
2.  **Searching** – Specialized search agents issue semantic and keyword queries to Exa’s search engine, continuously expanding and refining the result set until they can fulfil the request.
3.  **Reasoning & synthesis** – Reasoning models combine facts across sources and return structured JSON (if you provide `output.schema`) or a detailed markdown report.
4.  **Citations** – Generates a `citations` object mapping each root-level field to its supporting source passages so you can surface inline sources to your users.

Because tasks are **asynchronous**, you submit a request and immediately receive a `task_id`. You can [poll the task](/reference/research/get-a-task) until it is complete or failed, or [list all tasks](/reference/research/list-tasks) to monitor progress in bulk.

## 

[​

](#best-practices)

Best Practices

*   **Be explicit** – Clear, scoped instructions lead to faster tasks and higher-quality answers.
*   **Keep schemas small** – 1-5 root fields is the sweet spot. If you need more, create multiple tasks.
*   **Use enums** – Tight schema constraints improve accuracy and reduce hallucinations.

## 

[​

](#models)

Models

The Research API offers two advanced agentic researcher models that break down your instructions, search the web, extract and reason over facts, and return structured answers with citations.

*   **exa-research** (default) adapts to the difficulty of the task, using more or less compute for individual steps. Recommended for most use cases.
*   **exa-research-pro** maximizes quality by using the highest reasoning capability for every step. Recommended for the most complex, multi-step research tasks.

**Typical completion times:**

Model

p50 Time (seconds)

p90 Time (seconds)

exa-research

20

40

exa-research-pro

60

90

## 

[​

](#pricing)

Pricing

The Research API now uses **variable usage-based pricing**. You are billed based on how much work and reasoning the research agent does. NOTE: You are ONLY charged for tasks that complete successfully.

Operation

exa-research

exa-research-pro

Notes

**Search**

$5/1,000 searches

$5/1,000 searches

Each unique search query issued by the agent

**Page read**

$5/1,000 pages read

$10/1,000 pages read

One “page” = 1,000 tokens from the web

**Reasoning tokens**

$5/1M tokens

$5/1M tokens

Specific LLM tokens used for reasoning and synthesis

**Example:**  
A research task with `exa-research` that performs 6 searches, reads 20 pages of content, and uses 1,000 reasoning tokens would cost: $0.03 (6 searches × $5/1000)+$0.10 (20 pages × $5/1000)+$0.005 (1,000 reasoning tokens × $5/1,000,000)$0.135\\begin{array}{rl} & \\$0.03 \\text{ (6 searches × \\$5/1000)} \\\\ + & \\$0.10 \\text{ (20 pages × \\$5/1000)} \\\\ + & \\$0.005 \\text{ (1{,}000 reasoning tokens × \\$5/1{,}000{,}000)} \\\\ \\hline & \\$0.135 \\end{array}++​$0.03 (6 searches × $5/1000)$0.10 (20 pages × $5/1000)$0.005 (1,000 reasoning tokens × $5/1,000,000)$0.135​​ For `exa-research-pro`, the same task would cost: $0.03 (6 searches × $5/1000)+$0.20 (20 pages × $10/1000)+$0.005 (1,000 reasoning tokens × $5/1,000,000)$0.235\\begin{array}{rl} & \\$0.03 \\text{ (6 searches × \\$5/1000)} \\\\ + & \\$0.20 \\text{ (20 pages × \\$10/1000)} \\\\ + & \\$0.005 \\text{ (1{,}000 reasoning tokens × \\$5/1{,}000{,}000)} \\\\ \\hline & \\$0.235 \\end{array}++​$0.03 (6 searches × $5/1000)$0.20 (20 pages × $10/1000)$0.005 (1,000 reasoning tokens × $5/1,000,000)$0.235​​

## 

[​

](#examples)

Examples

**1\. Competitive Landscape Table** **Goal:** Compare the current flagship GPUs from NVIDIA, AMD, and Intel and extract pricing, TDP, and release date.

Python

JavaScript

Curl

Copy

Ask AI

```
import os
from exa_py import Exa

exa = Exa(os.environ["EXA_API_KEY"])

instructions = "Compare the current flagship GPUs from NVIDIA, AMD and Intel. Return a table of model name, MSRP USD, TDP watts, and launch date. Include citations for each cell."
schema = {
    "type": "object",
    "required": ["gpus"],
    "properties": {
        "gpus": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["manufacturer", "model", "msrpUsd", "tdpWatts", "launchDate"],
                "properties": {
                    "manufacturer": {"type": "string"},
                    "model": {"type": "string"},
                    "msrpUsd": {"type": "number"},
                    "tdpWatts": {"type": "integer"},
                    "launchDate": {"type": "string"}
                }
            }
        }
    },
    "additionalProperties": False
}

task = exa.research.create_task(
    model="exa-research",
    instructions=instructions,
    output_schema=schema
)

# Poll until completion
result = exa.research.poll_task(task.id)
print(result)
```

**2\. Market Size Estimate** **Goal:** Estimate the total global market size (USD) for battery recycling in 2030 with a clear methodology.

Python

JavaScript

Curl

Copy

Ask AI

```
import os
from exa_py import Exa

exa = Exa(os.environ["EXA_API_KEY"])

instructions = "Estimate the global market size for battery recycling in 2030. Provide reasoning steps and cite sources."
schema = {
    "type": "object",
    "required": ["estimateUsd", "methodology"],
    "properties": {
        "estimateUsd": {"type": "number"},
        "methodology": {"type": "string"}
    },
    "additionalProperties": False
}

task = exa.research.create_task(
    model="exa-research",
    instructions=instructions,
    output_schema=schema
)

# Poll until completion
result = exa.research.poll_task(task.id)
print(result)
```

**3\. Timeline of Key Events** **Goal:** Build a timeline of major OpenAI product releases from 2015 – 2023.

Python

JavaScript

Curl

Copy

Ask AI

```
import os
from exa_py import Exa

exa = Exa(os.environ["EXA_API_KEY"])

instructions = "Create a chronological timeline (year, month, brief description) of major OpenAI product releases from 2015 to 2023."
schema = {
    "type": "object",
    "required": ["events"],
    "properties": {
        "events": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["date", "description"],
                "properties": {
                    "date": {"type": "string"},
                    "description": {"type": "string"}
                }
            }
        }
    },
    "additionalProperties": False
}

task = exa.research.create_task(
    model="exa-research",
    instructions=instructions,
    output_schema=schema
)

# Poll until completion
result = exa.research.poll_task(task.id)
print(result)
```

## 

[​

](#faqs)

FAQs

Who is the Research API for?

Product teams, analysts, researchers, and anyone who needs **structured answers** that require reading multiple web sources — without having to build their own search + scraping + LLM pipeline.

How is this different from the /answer endpoint?

`/answer` is designed for **single-shot Q&A**. The Research API handles **long-running, multi-step investigations**. It’s suitable for tasks that require complex reasoning over web data.

How long do tasks take?

Tasks generally complete in 20–40 seconds. Simple tasks that can be solved with few searches complete faster, while complex schema’s targeting niche subjects may take longer.

What are best practices for writing instructions?

*   Be explicit about the objective and any constraints
*   Specify the **time range** or **types of sources** to consult if important
*   Use imperative verbs (“Compare”, “List”, “Summarize”)
*   Keep it under 4096 characters

Are citations guaranteed?

Yes. Every root-level field in your `data` object has a corresponding array of citation URLs in the `citations` object.

How large can my output schema be?

You must have ≤ 8 root fields. It must not be more than 5 fields deep.

What happens if my schema validation fails?

If your schema is not valid, an error will surface _before the task is created_ with a message about what is invalid. You will not be charged for such requests.

[Exa LiveCrawl](/reference/should-we-use-livecrawl)[FAQs](/reference/faqs)

Assistant

Responses are generated using AI and may contain mistakes.