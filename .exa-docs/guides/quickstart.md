# Quickstart - Exa

> **Source:** https://docs.exa.ai/reference/quickstart  
> **Last Updated:** 2025-07-16T10:34:17.519Z

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

Get an answer to a question, grounded by citations from exa.

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

result = exa.stream_answer(
  "What are the latest findings on gut microbiome's influence on mental health?",
  text=True,
)

for chunk in result:
  print(chunk, end='', flush=True)
```

Get a chat completion from exa.

python

Copy

Ask AI

```
from openai import OpenAI
from dotenv import load_dotenv

import os

# Use .env to store your API key or paste it directly into the code
load_dotenv()

client = OpenAI(
  base_url="https://api.exa.ai",
  api_key=os.getenv('EXA_API_KEY'),
)

completion = client.chat.completions.create(
  model="exa",
  messages = [
  {"role": "system", "content": "You are a helpful assistant."},
  {"role": "user", "content": "What are the latest developments in quantum computing?"}
],

  extra_body={
    "text": True
  }
)
print(completion.choices[0].message.content)
```

Find similar links to a given URL and get the full text for each link.

python

Copy

Ask AI

```
from exa_py import Exa
from dotenv import load_dotenv

import os

load_dotenv()

exa = Exa(os.getenv('EXA_API_KEY'))

# get similar links to this post about AGI
result = exa.find_similar(
  "https://amistrongeryet.substack.com/p/are-we-on-the-brink-of-agi",
  exclude_domains = ["amistrongeryet.substack.com"],
  num_results = 3
)
urls = [link_data.url for link_data in result.results]

# get full text for each url
web_pages = exa.get_contents(
  urls,
  text=True
)

for web_page in web_pages.results:
  print(f"URL: {web_page.url}")
  print(f"Text snippet: {web_page.text[:500]} ...")
  print("-"*100)
```

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

Get an answer to a question, grounded by citations from exa.

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

result = exa.stream_answer(
  "What are the latest findings on gut microbiome's influence on mental health?",
  text=True,
)

for chunk in result:
  print(chunk, end='', flush=True)
```

Get a chat completion from exa.

python

Copy

Ask AI

```
from openai import OpenAI
from dotenv import load_dotenv

import os

# Use .env to store your API key or paste it directly into the code
load_dotenv()

client = OpenAI(
  base_url="https://api.exa.ai",
  api_key=os.getenv('EXA_API_KEY'),
)

completion = client.chat.completions.create(
  model="exa",
  messages = [
  {"role": "system", "content": "You are a helpful assistant."},
  {"role": "user", "content": "What are the latest developments in quantum computing?"}
],

  extra_body={
    "text": True
  }
)
print(completion.choices[0].message.content)
```

Find similar links to a given URL and get the full text for each link.

python

Copy

Ask AI

```
from exa_py import Exa
from dotenv import load_dotenv

import os

load_dotenv()

exa = Exa(os.getenv('EXA_API_KEY'))

# get similar links to this post about AGI
result = exa.find_similar(
  "https://amistrongeryet.substack.com/p/are-we-on-the-brink-of-agi",
  exclude_domains = ["amistrongeryet.substack.com"],
  num_results = 3
)
urls = [link_data.url for link_data in result.results]

# get full text for each url
web_pages = exa.get_contents(
  urls,
  text=True
)

for web_page in web_pages.results:
  print(f"URL: {web_page.url}")
  print(f"Text snippet: {web_page.text[:500]} ...")
  print("-"*100)
```

Install the javascript SDK with npm. If you want to store your API key in a `.env` file, make sure to install the dotenv library.

Copy

Ask AI

```
npm install exa-js
npm install openai
npm install dotenv
```

Once you’ve installed the SDK, create a file called `exa.ts` and add the code below.

*   Search and crawl
*   Answer
*   Chat Completions
*   Find similar links and get full text

Get a list of results and their full text content.

javascript

Copy

Ask AI

```
import dotenv from 'dotenv';
import Exa from 'exa-js';

dotenv.config();

const exa = new Exa(process.env.EXA_API_KEY);

const result = await exa.searchAndContents(
  "An article about the state of AGI",
  {
    type: "auto",
    text: true
  }
);

// print the first result
console.log(result.results[0]);
```

Get a list of results and their full text content.

javascript

Copy

Ask AI

```
import dotenv from 'dotenv';
import Exa from 'exa-js';

dotenv.config();

const exa = new Exa(process.env.EXA_API_KEY);

const result = await exa.searchAndContents(
  "An article about the state of AGI",
  {
    type: "auto",
    text: true
  }
);

// print the first result
console.log(result.results[0]);
```

Get an answer to a question, grounded by citations from exa.

javascript

Copy

Ask AI

```
import dotenv from 'dotenv';
import Exa from 'exa-js';

dotenv.config();

const exa = new Exa(process.env.EXA_API_KEY);
for await (const chunk of exa.streamAnswer(
  "What is the population of New York City?",
  {
    text: true
  }
)) {
  if (chunk.content) {
    process.stdout.write(chunk.content);
  }
  if (chunk.citations) {
    console.log("\nCitations:", chunk.citations);
  }
}
```

Get a chat completion from exa.

javascript

Copy

Ask AI

```
import OpenAI from "openai";
import dotenv from 'dotenv';
import Exa from 'exa-js';

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://api.exa.ai",
  apiKey: process.env.EXA_API_KEY,
});

async function main() {
const completion = await openai.chat.completions.create({
  model: "exa",
  messages: [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What are the latest developments in quantum computing?"}
  ],
  store: true,
  stream: true,
  extra_body: {
    text: true // include full text from sources
  }
});

for await (const chunk of completion) {
  console.log(chunk.choices[0].delta.content);
  }
}

main();
```

Find similar links to a given URL and get the full text for each link.

javascript

Copy

Ask AI

```
import Exa from 'exa-js';
import dotenv from 'dotenv';

dotenv.config();

const exa = new Exa(process.env.EXA_API_KEY);

// Find similar links to this post about AGI
const result = await exa.findSimilar(
  "https://amistrongeryet.substack.com/p/are-we-on-the-brink-of-agi",
  {
    excludeDomains: ["amistrongeryet.substack.com"],
    numResults: 3
  }
);

const urls = result.results.map(linkData => linkData.url);

// Get full text for each URL
const webPages = await exa.getContents(urls, { text: true });

webPages.results.forEach(webPage => {
  console.log(`URL: ${webPage.url}`);
  console.log(`Text snippet: ${webPage.text.slice(0, 500)} ...`);
  console.log("-".repeat(100));
});
```

Pass one of the following commands to your terminal to make an API request.

*   Search and crawl
*   Answer
*   Chat Completions

Get a list of results and their full text content.

bash

Copy

Ask AI

```
curl --request POST \
    --url https://api.exa.ai/search \
    --header 'accept: application/json' \
    --header 'content-type: application/json' \
    --header "x-api-key: ${EXA_API_KEY}" \
    --data '
{
    "query": "An article about the state of AGI",
    "type": "auto",
    "contents": {
      "text": true
    }
}'
```

Get a list of results and their full text content.

bash

Copy

Ask AI

```
curl --request POST \
    --url https://api.exa.ai/search \
    --header 'accept: application/json' \
    --header 'content-type: application/json' \
    --header "x-api-key: ${EXA_API_KEY}" \
    --data '
{
    "query": "An article about the state of AGI",
    "type": "auto",
    "contents": {
      "text": true
    }
}'
```

Get an answer to a question, grounded by citations from exa.

bash

Copy

Ask AI

```
curl --request POST \
  --url https://api.exa.ai/answer \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header "x-api-key: ${EXA_API_KEY}" \
  --data "{
    \"query\": \"What are the latest findings on gut microbiome's influence on mental health?\",
    \"text\": true
  }"
```

Get a chat completion from exa.

bash

Copy

Ask AI

```
curl https://api.exa.ai/chat/completions \
  -H "Content-Type: application/json" \
  -H "x-api-key: ${EXA_API_KEY}" \
  -d '{
    "model": "exa", 
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "What are the latest developments in quantum computing?"
      }
    ],
    "extra_body": {
      "text": true
    }
  }'
```

Assistant

Responses are generated using AI and may contain mistakes.

[Overview](/reference/getting-started)[Search](/reference/search)