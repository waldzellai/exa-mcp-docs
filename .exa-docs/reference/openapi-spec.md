# OpenAPI Specification - Exa

> **Source:** https://docs.exa.ai/reference/openapi-spec  
> **Last Updated:** 2025-07-31T04:44:04.794Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

API Reference

OpenAPI Specification

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

* * *

Raw openAPI spec [here](https://raw.githubusercontent.com/exa-labs/openapi-spec/refs/heads/master/exa-openapi-spec.yaml).

Copy

Ask AI

```
openapi: 3.1.0
info:
  version: 1.2.0
  title: Exa Search API
  description: A comprehensive API for internet-scale search, allowing users to perform queries and retrieve results from a wide variety of sources using embeddings-based and traditional search.
servers:
  - url: https://api.exa.ai
security:
  - apikey: []
paths:
  /search:
    post:
      operationId: search
      summary: Search
      description: Perform a search with a Exa prompt-engineered query and retrieve a list of relevant results. Optionally get contents.
      x-codeSamples:
        - lang: bash
          label: Simple search and contents
          source: |
            curl -X POST 'https://api.exa.ai/search' \
              -H 'x-api-key: YOUR-EXA-API-KEY' \
              -H 'Content-Type: application/json' \
              -d '{
                "query": "Latest research in LLMs",
                "text": true
              }'
        - lang: python
          label: Simple search and contents
          source: |
            # pip install exa-py
            from exa_py import Exa
            exa = Exa('YOUR_EXA_API_KEY')

            results = exa.search_and_contents(
                "Latest research in LLMs",
                text=True
            )

            print(results)
        - lang: javascript
          label: Simple search and contents
          source: |
            // npm install exa-js
            import Exa from 'exa-js';
            const exa = new Exa('YOUR_EXA_API_KEY');

            const results = await exa.searchAndContents(
                'Latest research in LLMs',
                { text: true }
            );

            console.log(results);
        - lang: php
          label: Simple search and contents
          source: ""
        - lang: go
          label: Simple search and contents
          source: ""
        - lang: java
          label: Simple search and contents
          source: ""
        - lang: bash
          label: Advanced search with filters
          source: |
            curl --request POST \
              --url https://api.exa.ai/search \
              --header 'x-api-key: <token>' \
              --header 'Content-Type: application/json' \
              --data '{
              "query": "Latest research in LLMs",
              "type": "auto",
              "category": "research paper",
              "numResults": 10,
              "contents": {
                "text": true,
                "summary": {
                  "query": "Main developments"
                },
                "subpages": 1,
                "subpageTarget": "sources",
                "extras": {
                  "links": 1,
                  "imageLinks": 1
                }
              }
            }'
        - lang: python
          label: Advanced search with filters
          source: |
            # pip install exa-py
            from exa_py import Exa
            exa = Exa('YOUR_EXA_API_KEY')

            results = exa.search_and_contents(
                "Latest research in LLMs",
                type="auto",
                category="research paper",
                num_results=10,
                text=True,
                summary={
                    "query": "Main developments"
                },
                subpages=1,
                subpage_target="sources",
                extras={
                    "links": 1,
                    "image_links": 1
                }
            )

            print(results)
        - lang: javascript
          label: Advanced search with filters
          source: |
            // npm install exa-js
            import Exa from 'exa-js';
            const exa = new Exa('YOUR_EXA_API_KEY');

            const results = await exa.searchAndContents('Latest research in LLMs', {
                type: 'auto',
                category: 'research paper',
                numResults: 10,
                contents: {
                    text: true,
                    summary: {
                        query: 'Main developments'
                    },
                    subpages: 1,
                    subpageTarget: 'sources',
                    extras: {
                        links: 1,
                        imageLinks: 1
                    }
                }
            });

            console.log(results);
        - lang: php
          label: Advanced search with filters
          source: ""
        - lang: go
          label: Advanced search with filters
          source: ""
        - lang: java
          label: Advanced search with filters
          source: ""
      requestBody:
        required: true
        content:
          application/json:
            schema:
              allOf:
                - type: object
                  properties:
                    query:
                      type: string
                      example: "Latest developments in LLM capabilities"
                      description: The query string for the search.
                    type:
                      type: string
                      enum:
                        - keyword
                        - neural
                        - auto
                      description: The type of search. Neural uses an embeddings-based model, keyword is google-like SERP. Default is auto, which automatically decides between keyword and neural.
                      example: "auto"
                      default: "auto"
                    category:
                      type: string
                      enum:
                        - company
                        - research paper
                        - news
                        - pdf
                        - github
                        - tweet
                        - personal site
                        - linkedin profile
                        - financial report
                      description: A data category to focus on.
                      example: "research paper"
                  required:
                    - query
                - $ref: "#/components/schemas/CommonRequest"
      responses:
        "200":
          $ref: "#/components/responses/SearchResponse"
  /findSimilar:
    post:
      operationId: findSimilar
      summary: Find similar links
      description: Find similar links to the link provided. Optionally get contents.
      x-codeSamples:
        - lang: bash
          label: Find similar links
          source: |
            curl -X POST 'https://api.exa.ai/findSimilar' \
              -H 'x-api-key: YOUR-EXA-API-KEY' \
              -H 'Content-Type: application/json' \
              -d '{
                "url": "https://arxiv.org/abs/2307.06435",
                "text": true
              }'
        - lang: python
          label: Find similar links
          source: |
            # pip install exa-py
            from exa_py import Exa
            exa = Exa('YOUR_EXA_API_KEY')

            results = exa.find_similar_and_contents(
                url="https://arxiv.org/abs/2307.06435",
                text=True
            )

            print(results)
        - lang: javascript
          label: Find similar links
          source: |
            // npm install exa-js
            import Exa from 'exa-js';
            const exa = new Exa('YOUR_EXA_API_KEY');

            const results = await exa.findSimilarAndContents(
                'https://arxiv.org/abs/2307.06435',
                { text: true }
            );

            console.log(results);
        - lang: php
          label: Find similar links
          source: ""
        - lang: go
          label: Find similar links
          source: ""
        - lang: java
          label: Find similar links
          source: ""
      requestBody:
        required: true
        content:
          application/json:
            schema:
              allOf:
                - type: object
                  properties:
                    url:
                      type: string
                      example: "https://arxiv.org/abs/2307.06435"
                      description: The url for which you would like to find similar links.
                  required:
                    - url
                - $ref: "#/components/schemas/CommonRequest"
      responses:
        "200":
          $ref: "#/components/responses/FindSimilarResponse"
  /contents:
    post:
      summary: Get Contents
      operationId: "getContents"
      x-codeSamples:
        - lang: bash
          label: Simple contents retrieval
          source: |
            curl -X POST 'https://api.exa.ai/contents' \
              -H 'x-api-key: YOUR-EXA-API-KEY' \
              -H 'Content-Type: application/json' \
              -d '{
                "urls": ["https://arxiv.org/abs/2307.06435"],
                "text": true
              }'
        - lang: python
          label: Simple contents retrieval
          source: |
            # pip install exa-py
            from exa_py import Exa
            exa = Exa('YOUR_EXA_API_KEY')

            results = exa.get_contents(
                urls=["https://arxiv.org/abs/2307.06435"],
                text=True
            )

            print(results)
        - lang: javascript
          label: Simple contents retrieval
          source: |
            // npm install exa-js
            import Exa from 'exa-js';
            const exa = new Exa('YOUR_EXA_API_KEY');

            const results = await exa.getContents(
                ["https://arxiv.org/abs/2307.06435"],
                { text: true }
            );

            console.log(results);
        - lang: php
          label: Simple contents retrieval
          source: ""
        - lang: go
          label: Simple contents retrieval
          source: ""
        - lang: java
          label: Simple contents retrieval
          source: ""
        - lang: bash
          label: Advanced contents retrieval
          source: |
            curl --request POST \
              --url https://api.exa.ai/contents \
              --header 'x-api-key: YOUR-EXA-API-KEY' \
              --header 'Content-Type: application/json' \
              --data '{
                "urls": ["https://arxiv.org/abs/2307.06435"],
                "text": {
                  "maxCharacters": 1000,
                  "includeHtmlTags": false
                },
                "highlights": {
                  "numSentences": 3,
                  "highlightsPerUrl": 2,
                  "query": "Key findings"
                },
                "summary": {
                  "query": "Main research contributions"
                },
                "subpages": 1,
                "subpageTarget": "references",
                "extras": {
                  "links": 2,
                  "imageLinks": 1
                }
              }'
        - lang: python
          label: Advanced contents retrieval
          source: |
            # pip install exa-py
            from exa_py import Exa
            exa = Exa('YOUR_EXA_API_KEY')

            results = exa.get_contents(
                urls=["https://arxiv.org/abs/2307.06435"],
                text={
                    "maxCharacters": 1000,
                    "includeHtmlTags": False
                },
                highlights={
                    "numSentences": 3,
                    "highlightsPerUrl": 2,
                    "query": "Key findings"
                },
                summary={
                    "query": "Main research contributions"
                },
                subpages=1,
                subpage_target="references",
                extras={
                    "links": 2,
                    "image_links": 1
                }
            )

            print(results)
        - lang: javascript
          label: Advanced contents retrieval
          source: |
            // npm install exa-js
            import Exa from 'exa-js';
            const exa = new Exa('YOUR_EXA_API_KEY');

            const results = await exa.getContents(
                ["https://arxiv.org/abs/2307.06435"],
                {
                    text: {
                        maxCharacters: 1000,
                        includeHtmlTags: false
                    },
                    highlights: {
                        numSentences: 3,
                        highlightsPerUrl: 2,
                        query: "Key findings"
                    },
                    summary: {
                        query: "Main research contributions"
                    },
                    subpages: 1,
                    subpageTarget: "references",
                    extras: {
                        links: 2,
                        imageLinks: 1
                    }
                }
            );

            console.log(results);
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              allOf:
                - type: object
                  properties:
                    urls:
                      type: array
                      description: Array of URLs to crawl (backwards compatible with 'ids' parameter).
                      items:
                        type: string
                      example: ["https://arxiv.org/pdf/2307.06435"]
                    ids:
                      type: array
                      deprecated: true
                      description: Deprecated - use 'urls' instead. Array of document IDs obtained from searches.
                      items:
                        type: string
                      example: ["https://arxiv.org/pdf/2307.06435"]
                  required:
                    - urls
                - $ref: "#/components/schemas/ContentsRequest"
      responses:
        "200":
          $ref: "#/components/responses/ContentsResponse"
  /answer:
    post:
      operationId: answer
      summary: Generate an answer from search results
      description: |
        Performs a search based on the query and generates either a direct answer or a detailed summary with citations, depending on the query type.
      x-codeSamples:
        - lang: bash
          label: Simple answer
          source: |
            curl -X POST 'https://api.exa.ai/answer' \
              -H 'x-api-key: YOUR-EXA-API-KEY' \
              -H 'Content-Type: application/json' \
              -d '{
                "query": "What is the latest valuation of SpaceX?",
                "text": true
              }'
        - lang: python
          label: Simple answer
          source: |
            # pip install exa-py
            from exa_py import Exa
            exa = Exa('YOUR_EXA_API_KEY')

            result = exa.answer(
                "What is the latest valuation of SpaceX?",
                text=True
            )

            print(result)
        - lang: javascript
          label: Simple answer
          source: |
            // npm install exa-js
            import Exa from 'exa-js';
            const exa = new Exa('YOUR_EXA_API_KEY');

            const result = await exa.answer(
                'What is the latest valuation of SpaceX?',
                { text: true }
            );

            console.log(result);
        - lang: php
          label: Simple answer
          source: ""
        - lang: go
          label: Simple answer
          source: ""
        - lang: java
          label: Simple answer
          source: ""
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - query
              properties:
                query:
                  type: string
                  description: The question or query to answer.
                  example: "What is the latest valuation of SpaceX?"
                  minLength: 1
                stream:
                  type: boolean
                  default: false
                  description: If true, the response is returned as a server-sent events (SSS) stream.
                text:
                  type: boolean
                  default: false
                  description: If true, the response includes full text content in the search results
                model:
                  type: string
                  enum:
                    - exa
                  description: The search model to use for the answer.
                  default: "exa"
      responses:
        "200":
          $ref: "#/components/responses/AnswerResponse"
  /research/v0/tasks:
    post:
      operationId: research-tasks-create
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                instructions:
                  type: string
                  maxLength: 4096
                  description: Instructions for what the research task should accomplish
                model:
                  type: string
                  enum:
                    - exa-research
                    - exa-research-pro
                  default: exa-research
                output:
                  type: object
                  properties:
                    schema:
                      description: >-
                        A JsonSchema specification of the desired output. See
                        https://json-schema.org/draft-07.
              required:
                - instructions
              example:
                instructions: "What species of ant are similar to honeypot ants?"
                model: "exa-research"
                output:
                  schema:
                    type: "object"
                    properties:
                      answer:
                        type: "string"
      responses:
        "201":
          $ref: "#/components/responses/ResearchCreateTaskResponse"
      summary: Create a research task with instructions and an output schema
      x-codeSamples:
        - lang: python
          label: Advanced search with filters
          source: |
            # pip install exa-py
            import os
            from exa_py import Exa

            exa = Exa(os.environ["EXA_API_KEY"])

            # Create a research task
            instructions = "Summarize the history of San Francisco highlighting one or two major events for each decade from 1850 to 1950"
            schema = {
                "type": "object",
                "required": ["timeline"],
                "properties": {
                    "timeline": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": ["decade", "notableEvents"],
                            "properties": {
                                "decade": {"type": "string"},
                                "notableEvents": {"type": "string"},
                            },
                        },
                    },
                },
                "additionalProperties": False,
            }

            task = exa.research.create_task(
                model="exa_research",
                instructions=instructions,
                output_schema=schema,
            )
            # Poll until completion
            result = exa.research.poll_task(task.id)
            print(result)
        - lang: javascript
          label: Advanced search with filters
          source: |
            // npm install exa-js
            import Exa, { ResearchModel } from "exa-js";

            const exa = new Exa(process.env.EXA_API_KEY);

            async function simpleResearchExample() {
              // Create a research task
              const task = await exa.research.createTask({
                model: ResearchModel.exa_research,
                instructions: "Summarize the history of San Francisco in 3 sentences.",
                output: {
                  schema: {
                    type: "object",
                    required: ["summary"],
                    properties: {
                      summary: { type: "string" },
                    },
                    additionalProperties: false,
                  },
                },
              });

              // Poll until completion
              const result = await exa.research.pollTask(task.id);
              console.log("Research result:", result);
            }

            simpleResearchExample().catch(console.error);
    get:
      operationId: research-tasks-list
      parameters:
        - name: cursor
          required: false
          in: query
          description: The cursor to paginate through the results
          schema:
            minLength: 1
            type: string
        - name: limit
          required: false
          in: query
          description: The number of results to return
          schema:
            minimum: 1
            maximum: 200
            default: 25
            type: number
      responses:
        "200":
          $ref: "#/components/responses/ListResearchTasksResponse"
      summary: List research tasks
      x-codeSamples:
        - lang: python
          label: Advanced search with filters
          source: |
            # pip install exa
            import os
            from exa import Exa

            exa = Exa(os.environ["EXA_API_KEY"])

            response = exa.research.list_tasks()
            print("All research tasks:", response["data"])
        - lang: javascript
          label: Advanced search with filters
          source: |
            // npm install exa-js
            import Exa from "exa-js";
            const exa = new Exa(process.env.EXA_API_KEY);

            async function listAllResearchTasks() {
              const response = await exa.research.listTasks();
              console.log("All research tasks:", response.data);
            }

            listAllResearchTasks().catch(console.error);
  /research/v0/tasks/{id}:
    get:
      operationId: ResearchControllerV0_getResearchTask
      parameters:
        - name: id
          required: true
          in: path
          schema:
            type: string
      responses:
        "200":
          $ref: "#/components/responses/ResearchTaskResponse"
      summary: Get a research task by id
      x-codeSamples:
        - lang: python
          label: Get research task
          source: |
            # pip install exa-py
            import os
            from exa_py import Exa

            exa = Exa(os.environ["EXA_API_KEY"])

            # Get a research task by ID (single check)
            task_id = "your-task-id-here"
            task = exa.research.get_task(task_id)
            print(f"Task status: {task.status}")

            # Poll until completion
            result = exa.research.poll_task(task_id)
            print(f"Final result: {result.data}")
        - lang: javascript
          label: Get research task
          source: |
            // npm install exa-js
            import Exa from "exa-js";

            const exa = new Exa(process.env.EXA_API_KEY);

            async function getResearchTask() {
              const taskId = "your-task-id-here";

              // Get a research task by ID (single check)
              const task = await exa.research.getTask(taskId);
              console.log("Task status:", task.status);

              // Poll until completion
              const result = await exa.research.pollTask(taskId);
              console.log("Final result:", result.data);
            }

            getResearchTask().catch(console.error);
components:
  securitySchemes:
    apikey:
      type: apiKey
      name: x-api-key
      in: header
      description: API key can be provided either via x-api-key header or Authorization header with Bearer scheme
    bearer:
      type: http
      scheme: bearer
      description: API key can be provided either via x-api-key header or Authorization header with Bearer scheme
  schemas:
    AnswerCitation:
      type: object
      properties:
        id:
          type: string
          description: The temporary ID for the document.
          example: "https://www.theguardian.com/science/2024/dec/11/spacex-valued-at-350bn-as-company-agrees-to-buy-shares-from-employees"
        url:
          type: string
          format: uri
          description: The URL of the search result.
          example: "https://www.theguardian.com/science/2024/dec/11/spacex-valued-at-350bn-as-company-agrees-to-buy-shares-from-employees"
        title:
          type: string
          description: The title of the search result.
          example: "SpaceX valued at $350bn as company agrees to buy shares from ..."
        author:
          type: string
          nullable: true
          description: If available, the author of the content.
          example: "Dan Milmon"
        publishedDate:
          type: string
          nullable: true
          description: An estimate of the creation date, from parsing HTML content. Format is YYYY-MM-DD.
          example: "2023-11-16T01:36:32.547Z"
        text:
          type: string
          description: The full text content of each source. Only present when includeText is enabled.
          example: "SpaceX valued at $350bn as company agrees to buy shares from ..."
        image:
          type: string
          format: uri
          description: The URL of the image associated with the search result, if available.
          example: "https://i.guim.co.uk/img/media/7cfee7e84b24b73c97a079c402642a333ad31e77/0_380_6176_3706/master/6176.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=71ebb2fbf458c185229d02d380c01530"
        favicon:
          type: string
          format: uri
          description: The URL of the favicon for the search result's domain, if available.
          example: "https://assets.guim.co.uk/static/frontend/icons/homescreen/apple-touch-icon.svg"
    AnswerResult:
      type: object
      properties:
        answer:
          type: string
          description: The generated answer based on search results.
          example: "$350 billion."
        citations:
          type: array
          description: Search results used to generate the answer.
          items:
            $ref: "#/components/schemas/AnswerCitation"
    ContentsRequest:
      type: object
      properties:
        text:
          oneOf:
            - type: boolean
              title: "Simple text retrieval"
              description: If true, returns full page text with default settings. If false, disables text return.
            - type: object
              title: "Advanced text options"
              description: Advanced options for controlling text extraction. Use this when you need to limit text length or include HTML structure.
              properties:
                maxCharacters:
                  type: integer
                  description: Maximum character limit for the full page text. Useful for controlling response size and API costs.
                  example: 1000
                includeHtmlTags:
                  type: boolean
                  default: false
                  description: Include HTML tags in the response, which can help LLMs understand text structure and formatting.
                  example: false
        highlights:
          type: object
          description: Text snippets the LLM identifies as most relevant from each page.
          properties:
            numSentences:
              type: integer
              default: 5
              description: The number of sentences to return for each snippet.
              example: 1
            highlightsPerUrl:
              type: integer
              default: 1
              description: The number of snippets to return for each result.
              example: 1
            query:
              type: string
              description: Custom query to direct the LLM's selection of highlights.
              example: "Key advancements"
        summary:
          type: object
          description: Summary of the webpage
          properties:
            query:
              type: string
              description: Custom query for the LLM-generated summary.
              example: "Main developments"
            schema:
              type: object
              description: |
                JSON schema for structured output from summary.
                See https://json-schema.org/overview/what-is-jsonschema for JSON Schema documentation.
              example:
                {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Title",
                  "type": "object",
                  "properties":
                    {
                      "Property 1":
                        { "type": "string", "description": "Description" },
                      "Property 2":
                        {
                          "type": "string",
                          "enum": ["option 1", "option 2", "option 3"],
                          "description": "Description",
                        },
                    },
                  "required": ["Property 1"],
                }
        livecrawl:
          type: string
          enum: [never, fallback, always, preferred]
          description: |
            Options for livecrawling pages.
            'never': Disable livecrawling (default for neural search).
            'fallback': Livecrawl when cache is empty (default for keyword search).
            'always': Always livecrawl.
            'preferred': Always try to livecrawl, but fall back to cache if crawling fails.
          example: "always"
        livecrawlTimeout:
          type: integer
          default: 10000
          description: The timeout for livecrawling in milliseconds.
          example: 1000
        subpages:
          type: integer
          default: 0
          description: The number of subpages to crawl. The actual number crawled may be limited by system constraints.
          example: 1
        subpageTarget:
          oneOf:
            - type: string
            - type: array
              items:
                type: string
          description: Keyword to find specific subpages of search results. Can be a single string or an array of strings, comma delimited.
          example: "sources"
        extras:
          type: object
          description: Extra parameters to pass.
          properties:
            links:
              type: integer
              default: 0
              description: Number of URLs to return from each webpage.
              example: 1
            imageLinks:
              type: integer
              default: 0
              description: Number of images to return for each result.
              example: 1

    CommonRequest:
      type: object
      properties:
        numResults:
          type: integer
          maximum: 100
          default: 10
          description: Number of results to return (up to thousands of results available for custom plans)
          example: 10
        includeDomains:
          type: array
          items:
            type: string
          description: List of domains to include in the search. If specified, results will only come from these domains.
          example:
            - arxiv.org
            - paperswithcode.com
        excludeDomains:
          type: array
          items:
            type: string
          description: List of domains to exclude from search results. If specified, no results will be returned from these domains.
        startCrawlDate:
          type: string
          format: date-time
          description: Crawl date refers to the date that Exa discovered a link. Results will include links that were crawled after this date. Must be specified in ISO 8601 format.
          example: 2023-01-01
        endCrawlDate:
          type: string
          format: date-time
          description: Crawl date refers to the date that Exa discovered a link. Results will include links that were crawled before this date. Must be specified in ISO 8601 format.
          example: 2023-12-31
        startPublishedDate:
          type: string
          format: date-time
          description: Only links with a published date after this will be returned. Must be specified in ISO 8601 format.
          example: 2023-01-01
        endPublishedDate:
          type: string
          format: date-time
          description: Only links with a published date before this will be returned. Must be specified in ISO 8601 format.
          example: 2023-12-31
        includeText:
          type: array
          items:
            type: string
          description: List of strings that must be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words.
          example:
            - large language model
        excludeText:
          type: array
          items:
            type: string
          description: List of strings that must not be present in webpage text of results. Currently, only 1 string is supported, of up to 5 words. Checks from the first 1000 words of the webpage text.
          example:
            - course
        contents:
          $ref: "#/components/schemas/ContentsRequest"

    Result:
      type: object
      properties:
        title:
          type: string
          description: The title of the search result.
          example: "A Comprehensive Overview of Large Language Models"
        url:
          type: string
          format: uri
          description: The URL of the search result.
          example: "https://arxiv.org/pdf/2307.06435.pdf"
        publishedDate:
          type: string
          nullable: true
          description: An estimate of the creation date, from parsing HTML content. Format is YYYY-MM-DD.
          example: "2023-11-16T01:36:32.547Z"
        author:
          type: string
          nullable: true
          description: If available, the author of the content.
          example: "Humza  Naveed, University of Engineering and Technology (UET), Lahore, Pakistan"
        score:
          type: number
          nullable: true
          description: A number from 0 to 1 representing similarity between the query/url and the result.
          example: 0.4600165784358978
        id:
          type: string
          description: The temporary ID for the document. Useful for /contents endpoint.
          example: "https://arxiv.org/abs/2307.06435"
        image:
          type: string
          format: uri
          description: The URL of an image associated with the search result, if available.
          example: "https://arxiv.org/pdf/2307.06435.pdf/page_1.png"
        favicon:
          type: string
          format: uri
          description: The URL of the favicon for the search result's domain.
          example: "https://arxiv.org/favicon.ico"

    ResultWithContent:
      allOf:
        - $ref: "#/components/schemas/Result"
        - type: object
          properties:
            text:
              type: string
              description: The full content text of the search result.
              example: "Abstract Large Language Models (LLMs) have recently demonstrated remarkable capabilities..."
            highlights:
              type: array
              items:
                type: string
              description: Array of highlights extracted from the search result content.
              example:
                - "Such requirements have limited their adoption..."
            highlightScores:
              type: array
              items:
                type: number
                format: float
              description: Array of cosine similarity scores for each highlighted
              example: [0.4600165784358978]
            summary:
              type: string
              description: Summary of the webpage
              example: "This overview paper on Large Language Models (LLMs) highlights key developments..."
            subpages:
              type: array
              items:
                $ref: "#/components/schemas/ResultWithContent"
              description: Array of subpages for the search result.
              example:
                [
                  {
                    "id": "https://arxiv.org/abs/2303.17580",
                    "url": "https://arxiv.org/pdf/2303.17580.pdf",
                    "title": "HuggingGPT: Solving AI Tasks with ChatGPT and its Friends in Hugging Face",
                    "author": "Yongliang  Shen, Microsoft Research Asia, Kaitao  Song, Microsoft Research Asia, Xu  Tan, Microsoft Research Asia, Dongsheng  Li, Microsoft Research Asia, Weiming  Lu, Microsoft Research Asia, Yueting  Zhuang, Microsoft Research Asia, [email protected], Zhejiang  University, Microsoft Research Asia, Microsoft  Research, Microsoft Research Asia",
                    "publishedDate": "2023-11-16T01:36:20.486Z",
                    "text": "HuggingGPT: Solving AI Tasks with ChatGPT and its Friends in Hugging Face Date Published: 2023-05-25 Authors: Yongliang Shen, Microsoft Research Asia Kaitao Song, Microsoft Research Asia Xu Tan, Microsoft Research Asia Dongsheng Li, Microsoft Research Asia Weiming Lu, Microsoft Research Asia Yueting Zhuang, Microsoft Research Asia, [email protected] Zhejiang University, Microsoft Research Asia Microsoft Research, Microsoft Research Asia Abstract Solving complicated AI tasks with different domains and modalities is a key step toward artificial general intelligence. While there are abundant AI models available for different domains and modalities, they cannot handle complicated AI tasks. Considering large language models (LLMs) have exhibited exceptional ability in language understanding, generation, interaction, and reasoning, we advocate that LLMs could act as a controller to manage existing AI models to solve complicated AI tasks and language could be a generic interface to empower t",
                    "summary": "HuggingGPT is a framework using ChatGPT as a central controller to orchestrate various AI models from Hugging Face to solve complex tasks. ChatGPT plans the task, selects appropriate models based on their descriptions, executes subtasks, and summarizes the results. This approach addresses limitations of LLMs by allowing them to handle multimodal data (vision, speech) and coordinate multiple models for complex tasks, paving the way for more advanced AI systems.",
                    "highlights":
                      [
                        "2) Recently, some researchers started to investigate the integration of using tools or models in LLMs  .",
                      ],
                    "highlightScores": [0.32679107785224915],
                  },
                ]
            extras:
              type: object
              description: Results from extras.
              properties:
                links:
                  type: array
                  items:
                    type: string
                  description: Array of links from the search result.
                  example: []

    CostDollars:
      type: object
      properties:
        total:
          type: number
          format: float
          description: Total dollar cost for your request
          example: 0.005
        breakDown:
          type: array
          description: Breakdown of costs by operation type
          items:
            type: object
            properties:
              search:
                type: number
                format: float
                description: Cost of your search operations
                example: 0.005
              contents:
                type: number
                format: float
                description: Cost of your content operations
                example: 0
              breakdown:
                type: object
                properties:
                  keywordSearch:
                    type: number
                    format: float
                    description: Cost of your keyword search operations
                    example: 0
                  neuralSearch:
                    type: number
                    format: float
                    description: Cost of your neural search operations
                    example: 0.005
                  contentText:
                    type: number
                    format: float
                    description: Cost of your text content retrieval
                    example: 0
                  contentHighlight:
                    type: number
                    format: float
                    description: Cost of your highlight generation
                    example: 0
                  contentSummary:
                    type: number
                    format: float
                    description: Cost of your summary generation
                    example: 0
        perRequestPrices:
          type: object
          description: Standard price per request for different operations
          properties:
            neuralSearch_1_25_results:
              type: number
              format: float
              description: Standard price for neural search with 1-25 results
              example: 0.005
            neuralSearch_26_100_results:
              type: number
              format: float
              description: Standard price for neural search with 26-100 results
              example: 0.025
            neuralSearch_100_plus_results:
              type: number
              format: float
              description: Standard price for neural search with 100+ results
              example: 1
            keywordSearch_1_100_results:
              type: number
              format: float
              description: Standard price for keyword search with 1-100 results
              example: 0.0025
            keywordSearch_100_plus_results:
              type: number
              format: float
              description: Standard price for keyword search with 100+ results
              example: 3
        perPagePrices:
          type: object
          description: Standard price per page for different content operations
          properties:
            contentText:
              type: number
              format: float
              description: Standard price per page for text content
              example: 0.001
            contentHighlight:
              type: number
              format: float
              description: Standard price per page for highlights
              example: 0.001
            contentSummary:
              type: number
              format: float
              description: Standard price per page for summaries
              example: 0.001

    ResearchTaskDto:
      type:
        - object
      properties:
        id:
          type:
            - string
          description: The unique identifier for the research task
        status:
          type:
            - string
          enum:
            - running
            - completed
            - failed
          description: The current status of the research task
        instructions:
          type:
            - string
          description: The instructions or query for the research task
        schema:
          type:
            - object
          additionalProperties: {}
          description: The JSON schema specification for the expected output format
        data:
          type:
            - object
          additionalProperties: {}
          description: The research results data conforming to the specified schema
        citations:
          type:
            - object
          additionalProperties:
            type:
              - array
            items:
              type:
                - object
              properties:
                id:
                  type:
                    - string
                url:
                  type:
                    - string
                title:
                  type:
                    - string
                snippet:
                  type:
                    - string
              required:
                - id
                - url
                - snippet
          description: Citations grouped by the root field they were used in
      required:
        - id
        - status
        - instructions
  responses:
    SearchResponse:
      description: OK
      content:
        application/json:
          schema:
            type: object
            properties:
              requestId:
                type: string
                description: Unique identifier for the request
                example: "b5947044c4b78efa9552a7c89b306d95"
              resolvedSearchType:
                type: string
                enum: [neural, keyword]
                description: The search type that was actually used for this request
                example: "neural"
              results:
                type: array
                description: A list of search results containing title, URL, published date, author, and score.
                items:
                  $ref: "#/components/schemas/ResultWithContent"
              searchType:
                type: string
                enum: [neural, keyword]
                description: For auto searches, indicates which search type was selected.
                example: "auto"
              costDollars:
                $ref: "#/components/schemas/CostDollars"

    FindSimilarResponse:
      description: OK
      content:
        application/json:
          schema:
            type: object
            properties:
              requestId:
                type: string
                description: Unique identifier for the request
                example: "c6958155d5c89ffa0663b7c90c407396"
              results:
                type: array
                description: A list of search results containing title, URL, published date, author, and score.
                items:
                  $ref: "#/components/schemas/ResultWithContent"
              costDollars:
                $ref: "#/components/schemas/CostDollars"

    ContentsResponse:
      description: OK
      content:
        application/json:
          schema:
            type: object
            properties:
              requestId:
                type: string
                description: Unique identifier for the request
                example: "e492118ccdedcba5088bfc4357a8a125"
              results:
                type: array
                items:
                  $ref: "#/components/schemas/ResultWithContent"
              costDollars:
                $ref: "#/components/schemas/CostDollars"

    AnswerResponse:
      description: OK
      content:
        application/json:
          schema:
            allOf:
              - $ref: "#/components/schemas/AnswerResult"
              - type: object
                properties:
                  costDollars:
                    $ref: "#/components/schemas/CostDollars"
        text/event-stream:
          schema:
            type: object
            properties:
              answer:
                type: string
                description: Partial answer chunk when streaming is enabled.
              citations:
                type: array
                items:
                  $ref: "#/components/schemas/AnswerCitation"
    ResearchCreateTaskResponse:
      description: Research task created
      content:
        application/json:
          schema:
            type: object
            properties:
              requestId:
                type: string
                description: Unique identifier for the request
                example: "b5947044c4b78efa9552a7c89b306d95"
              id:
                type: string
                description: The unique identifier for the research task
                example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    ListResearchTasksResponse:
      description: List of research tasks
      content:
        application/json:
          schema:
            type: object
            properties:
              requestId:
                type: string
                description: Unique identifier for the request
                example: "b5947044c4b78efa9552a7c89b306d95"
              data:
                type: array
                items:
                  $ref: "#/components/schemas/ResearchTaskDto"
                description: The list of research tasks
              hasMore:
                type: boolean
                description: Whether there are more results to paginate through
              nextCursor:
                type: string
                nullable: true
                description: The cursor to paginate through the next set of results
    ResearchTaskResponse:
      description: Research task details
      content:
        application/json:
          schema:
            allOf:
              - $ref: "#/components/schemas/ResearchTaskDto"
              - type: object
                properties:
                  requestId:
                    type: string
                    description: Unique identifier for the request
                    example: "b5947044c4b78efa9552a7c89b306d95"
```

[Websets](/reference/websets-api)[RAG with Exa and OpenAI](/reference/rag-quickstart)

Assistant

Responses are generated using AI and may contain mistakes.