# Python SDK Specification - Exa

> **Source:** https://docs.exa.ai/sdks/python-sdk-specification  
> **Last Updated:** 2025-07-31T04:44:37.677Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

SDKs

Python SDK Specification

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

##### SDKs

*   [
    
    Python SDK Specification
    
    
    
    ](/sdks/python-sdk-specification)
*   [
    
    TypeScript SDK Specification
    
    
    
    ](/sdks/typescript-sdk-specification)
*   [
    
    Python and TS Cheat Sheets
    
    
    
    ](/sdks/cheat-sheet)

On this page

*   [Getting started](#getting-started)
*   [search Method](#search-method)
*   [Input Example:](#input-example%3A)
*   [Input Parameters:](#input-parameters%3A)
*   [Returns Example:](#returns-example%3A)
*   [Return Parameters:](#return-parameters%3A)
*   [Result Object:](#result-object%3A)
*   [search\_and\_contents Method](#search-and-contents-method)
*   [Input Example:](#input-example%3A-2)
*   [Input Parameters:](#input-parameters%3A-2)
*   [Returns Example:](#returns-example%3A-2)
*   [Return Parameters:](#return-parameters%3A-2)
*   [SearchResponse\[ResultWithTextAndHighlights\]](#searchresponse%5Bresultwithtextandhighlights%5D)
*   [ResultWithTextAndHighlights Object](#resultwithtextandhighlights-object)
*   [find\_similar Method](#find-similar-method)
*   [Input Example:](#input-example%3A-3)
*   [Input Parameters:](#input-parameters%3A-3)
*   [Returns Example:](#returns-example%3A-3)
*   [Return Parameters:](#return-parameters%3A-3)
*   [SearchResponse\[Results\]](#searchresponse%5Bresults%5D)
*   [Results Object](#results-object)
*   [find\_similar\_and\_contents Method](#find-similar-and-contents-method)
*   [Input Example:](#input-example%3A-4)
*   [Input Parameters:](#input-parameters%3A-4)
*   [Returns:](#returns%3A)
*   [answer Method](#answer-method)
*   [Input Example:](#input-example%3A-5)
*   [Input Parameters:](#input-parameters%3A-5)
*   [Returns Example:](#returns-example%3A-4)
*   [Return Parameters:](#return-parameters%3A-4)
*   [AnswerResult object](#answerresult-object)
*   [stream\_answer Method](#stream-answer-method)
*   [Input Example:](#input-example%3A-6)
*   [Input Parameters:](#input-parameters%3A-6)
*   [Return Type:](#return-type%3A)
*   [StreamChunk](#streamchunk)
*   [research.create\_task Method](#research-create-task-method)
*   [Input Example:](#input-example%3A-7)
*   [Input Parameters:](#input-parameters%3A-7)
*   [Returns:](#returns%3A-2)
*   [Return Example:](#return-example%3A)
*   [research.get\_task Method](#research-get-task-method)
*   [Input Example:](#input-example%3A-8)
*   [Input Parameters:](#input-parameters%3A-8)
*   [Returns:](#returns%3A-3)
*   [Return Example:](#return-example%3A-2)
*   [research.poll\_task Method](#research-poll-task-method)
*   [Input Example:](#input-example%3A-9)
*   [Input Parameters:](#input-parameters%3A-9)
*   [Returns:](#returns%3A-4)
*   [research.list\_tasks Method](#research-list-tasks-method)
*   [Input Example:](#input-example%3A-10)
*   [Input Parameters:](#input-parameters%3A-10)
*   [Returns:](#returns%3A-5)
*   [Return Example:](#return-example%3A-3)

For ChatGPT-based [Python SDK](https://github.com/exa-labs/exa-py) assistance, [go here](https://chat.openai.com/g/g-dTeZqs0tX-exa-formerly-metaphor-python-sdk-guide).

## 

[​

](#getting-started)

Getting started

Install the [exa-py](https://github.com/exa-labs/exa-py) SDK

Bash

Copy

Ask AI

```
pip install exa_py
```

and then instantiate an Exa client

Python

Copy

Ask AI

```
from exa_py import Exa

import os

exa = Exa(os.getenv('EXA_API_KEY'))
```

[

## Get API Key

Follow this link to get your API key





](https://dashboard.exa.ai/login?redirect=/docs?path=/reference/python-sdk-specification)

## 

[​

](#search-method)

`search` Method

Perform an Exa search given an input query and retrieve a list of relevant results as links.

### 

[​

](#input-example%3A)

Input Example:

Python

Copy

Ask AI

```
`result = exa.search(
  "hottest AI startups",
  num_results=2
)
```

### 

[​

](#input-parameters%3A)

Input Parameters:

Parameter

Type

Description

Default

query

str

The input query string.

Required

num\_results

Optional\[int\]

Number of search results to return.

10

include\_domains

Optional\[List\[str\]\]

List of domains to include in the search.

None

exclude\_domains

Optional\[List\[str\]\]

List of domains to exclude in the search.

None

start\_crawl\_date

Optional\[str\]

Results will only include links **crawled** after this date.

None

end\_crawl\_date

Optional\[str\]

Results will only include links **crawled** before this date.

None

start\_published\_date

Optional\[str\]

Results will only include links with a **published** date after this date.

None

end\_published\_date

Optional\[str\]

Results will only include links with a **published** date before this date.

None

type

Optional\[str\]

[The type of search](#), keyword or neural.

”auto”

category

Optional\[str\]

A data category to focus on when searching, with higher comprehensivity and data cleanliness. Currently, the available categories are: company, research paper, news, linkedin profile, github, tweet, movie, song, personal site, pdf and financial report.

None

context

Union\[ContextContentsOptions, Literal\[True\]\]

If true, concatentates results into a context string.

None

### 

[​

](#returns-example%3A)

Returns Example:

JSON

Copy

Ask AI

```
{
  "autopromptString": "Here is a link to one of the hottest AI startups:",
  "results": [
    {
      "score": 0.17025552690029144,
      "title": "Adept: Useful General Intelligence",
      "id": "https://www.adept.ai/",
      "url": "https://www.adept.ai/",
      "publishedDate": "2000-01-01",
      "author": null
    },
    {
      "score": 0.1700288951396942,
      "title": "Home | Tenyx, Inc.",
      "id": "https://www.tenyx.com/",
      "url": "https://www.tenyx.com/",
      "publishedDate": "2019-09-10",
      "author": null
    }
  ],
  "requestId": "a78ebce717f4d712b6f8fe0d5d7753f8"
}
```

### 

[​

](#return-parameters%3A)

Return Parameters:

`SearchResponse[Result]`

Field

Type

Description

results

List\[Result\]

List of Result objects

context

Optional\[str\]

Results concatentated into a string

### 

[​

](#result-object%3A)

Result Object:

Field

Type

Description

url

str

URL of the search result

id

str

Temporary ID for the document

title

Optional\[str\]

Title of the search result

score

Optional\[float\]

Similarity score between query/url and result

published\_date

Optional\[str\]

Estimated creation date

author

Optional\[str\]

Author of the content, if available

## 

[​

](#search-and-contents-method)

`search_and_contents` Method

Perform an Exa search given an input query and retrieve a list of relevant results as links, optionally including the full text and/or highlights of the content.

### 

[​

](#input-example%3A-2)

Input Example:

Python

Copy

Ask AI

```
`# Search with full text content
result_with_text = exa.search_and_contents(
    "AI in healthcare",
    text=True,
    num_results=2
)

# Search with highlights
result_with_highlights = exa.search_and_contents(
    "AI in healthcare",
    highlights=True,
    num_results=2
)

# Search with both text and highlights
result_with_text_and_highlights = exa.search_and_contents(
    "AI in healthcare",
    text=True,
    highlights=True,
    num_results=2
)

# Search with structured summary schema
company_schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Company Information",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "The name of the company"
        },
        "industry": {
            "type": "string",
            "description": "The industry the company operates in"
        },
        "foundedYear": {
            "type": "number",
            "description": "The year the company was founded"
        },
        "keyProducts": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of key products or services offered by the company"
        },
        "competitors": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of main competitors"
        }
    },
    "required": ["name", "industry"]
}

result_with_structured_summary = exa.search_and_contents(
    "OpenAI company information",
    summary={
        "schema": company_schema
    },
    category="company",
    num_results=3
)

# Parse the structured summary (returned as a JSON string)
first_result = result_with_structured_summary.results[0]
if first_result.summary:
    import json
    structured_data = json.loads(first_result.summary)
    print(structured_data["name"])        # e.g. "OpenAI"
    print(structured_data["industry"])    # e.g. "Artificial Intelligence"
    print(structured_data["keyProducts"]) # e.g. ["GPT-4", "DALL-E", "ChatGPT"]
```

### 

[​

](#input-parameters%3A-2)

Input Parameters:

Parameter

Type

Description

Default

query

str

The input query string.

Required

text

Union\[TextContentsOptions, Literal\[True\]\]

If provided, includes the full text of the content in the results.

None

highlights

Union\[HighlightsContentsOptions, Literal\[True\]\]

If provided, includes highlights of the content in the results.

None

num\_results

Optional\[int\]

Number of search results to return.

10

include\_domains

Optional\[List\[str\]\]

List of domains to include in the search.

None

exclude\_domains

Optional\[List\[str\]\]

List of domains to exclude in the search.

None

start\_crawl\_date

Optional\[str\]

Results will only include links **crawled** after this date.

None

end\_crawl\_date

Optional\[str\]

Results will only include links **crawled** before this date.

None

start\_published\_date

Optional\[str\]

Results will only include links with a **published** date after this date.

None

end\_published\_date

Optional\[str\]

Results will only include links with a **published** date before this date.

None

type

Optional\[str\]

[The type of search](#), keyword or neural.

”auto”

category

Optional\[str\]

A data category to focus on when searching, with higher comprehensivity and data cleanliness. Currently, the available categories are: company, research paper, news, linkedin profile, github, tweet, movie, song, personal site, pdf and financial report.

None

context

Union\[ContextContentsOptions, Literal\[True\]\]

If true, concatentates results into a context string.

None

### 

[​

](#returns-example%3A-2)

Returns Example:

JSON

Copy

Ask AI

```
`{
  "results": [
    {
      "score": 0.20826785266399384,
      "title": "2023 AI Trends in Health Care",
      "id": "https://aibusiness.com/verticals/2023-ai-trends-in-health-care-",
      "url": "https://aibusiness.com/verticals/2023-ai-trends-in-health-care-",
      "publishedDate": "2022-12-29",
      "author": "Wylie Wong",
      "text": "While the health care industry was initially slow to [... TRUNCATED IN THESE DOCS FOR BREVITY ...]",
      "highlights": [
        "But to do so, many health care institutions would like to share data, so they can build a more comprehensive dataset to use to train an AI model. Traditionally, they would have to move the data to one central repository. However, with federated or swarm learning, the data does not have to move. Instead, the AI model goes to each individual health care facility and trains on the data, he said. This way, health care providers can maintain security and governance over their data."
      ],
      "highlightScores": [
        0.5566554069519043
      ]
    },
    {
      "score": 0.20796334743499756,
      "title": "AI in healthcare: Innovative use cases and applications",
      "id": "https://www.leewayhertz.com/ai-use-cases-in-healthcare",
      "url": "https://www.leewayhertz.com/ai-use-cases-in-healthcare",
      "publishedDate": "2023-02-13",
      "author": "Akash Takyar",
      "text": "The integration of AI in healthcare is not [... TRUNCATED IN THESE DOCS FOR BREVITY ...]",
      "highlights": [
        "The ability of AI to analyze large amounts of medical data and identify patterns has led to more accurate and timely diagnoses. This has been especially helpful in identifying complex medical conditions, which may be difficult to detect using traditional methods. Here are some examples of successful implementation of AI in healthcare. IBM Watson Health: IBM Watson Health is an AI-powered system used in healthcare to improve patient care and outcomes. The system uses natural language processing and machine learning to analyze large amounts of data and provide personalized treatment plans for patients."
      ],
      "highlightScores": [
        0.6563674807548523
      ]
    }
  ],
  "requestId": "d8fd59c78d34afc9da173f1fe5aa8965"
}
```

### 

[​

](#return-parameters%3A-2)

Return Parameters:

The return type depends on the combination of `text` and `highlights` parameters:

*   `SearchResponse[ResultWithText]`: When only `text` is provided.
*   `SearchResponse[ResultWithHighlights]`: When only `highlights` is provided.
*   `SearchResponse[ResultWithTextAndHighlights]`: When both `text` and `highlights` are provided.

### 

[​

](#searchresponse%5Bresultwithtextandhighlights%5D)

`SearchResponse[ResultWithTextAndHighlights]`

Field

Type

Description

results

List\[ResultWithTextAndHighlights\]

List of ResultWithTextAndHighlights objects

context

Optional\[str\]

Results concatenated into a string

### 

[​

](#resultwithtextandhighlights-object)

`ResultWithTextAndHighlights` Object

Field

Type

Description

url

str

URL of the search result

id

str

Temporary ID for the document

title

Optional\[str\]

Title of the search result

score

Optional\[float\]

Similarity score between query/url and result

published\_date

Optional\[str\]

Estimated creation date

author

Optional\[str\]

Author of the content, if available

text

str

Text of the search result page (always present)

highlights

List\[str\]

Highlights of the search result (always present)

highlight\_scores

List\[float\]

Scores of the highlights (always present)

Note: If neither `text` nor `highlights` is specified, the method defaults to including the full text content.

## 

[​

](#find-similar-method)

`find_similar` Method

Find a list of similar results based on a webpage’s URL.

### 

[​

](#input-example%3A-3)

Input Example:

Python

Copy

Ask AI

```
similar_results = exa.find_similar(
    "miniclip.com",
    num_results=2,
    exclude_source_domain=True
)
```

### 

[​

](#input-parameters%3A-3)

Input Parameters:

Parameter

Type

Description

Default

url

str

The URL of the webpage to find similar results for.

Required

num\_results

Optional\[int\]

Number of similar results to return.

None

include\_domains

Optional\[List\[str\]\]

List of domains to include in the search.

None

exclude\_domains

Optional\[List\[str\]\]

List of domains to exclude from the search.

None

start\_crawl\_date

Optional\[str\]

Results will only include links **crawled** after this date.

None

end\_crawl\_date

Optional\[str\]

Results will only include links **crawled** before this date.

None

start\_published\_date

Optional\[str\]

Results will only include links with a **published** date after this date.

None

end\_published\_date

Optional\[str\]

Results will only include links with a **published** date before this date.

None

exclude\_source\_domain

Optional\[bool\]

If true, excludes results from the same domain as the input URL.

None

category

Optional\[str\]

A data category to focus on when searching, with higher comprehensivity and data cleanliness.

None

context

Union\[ContextContentsOptions, Literal\[True\]\]

If true, concatentates results into a context string.

None

### 

[​

](#returns-example%3A-3)

Returns Example:

JSON

Copy

Ask AI

```
{
  "results": [
    {
      "score": 0.8777582049369812,
      "title": "Play New Free Online Games Every Day",
      "id": "https://www.minigames.com/new-games",
      "url": "https://www.minigames.com/new-games",
      "publishedDate": "2000-01-01",
      "author": null
    },
    {
      "score": 0.87653648853302,
      "title": "Play The best Online Games",
      "id": "https://www.minigames.com/",
      "url": "https://www.minigames.com/",
      "publishedDate": "2000-01-01",
      "author": null
    }
  ],
  "requestId": "08fdc6f20e9f3ea87f860af3f6ccc30f"
}
```

### 

[​

](#return-parameters%3A-3)

Return Parameters:

`SearchResponse[_Result]`: The response containing similar results and optional autoprompt string.

### 

[​

](#searchresponse%5Bresults%5D)

`SearchResponse[Results]`

Field

Type

Description

results

List\[ResultWithTextAndHighlights\]

List of ResultWithTextAndHighlights objects

context

Optional\[String\]

Results concatentated into a string

### 

[​

](#results-object)

`Results` Object

Field

Type

Description

url

str

URL of the search result

id

str

Temporary ID for the document

title

Optional\[str\]

Title of the search result

score

Optional\[float\]

Similarity score between query/url and result

published\_date

Optional\[str\]

Estimated creation date

author

Optional\[str\]

Author of the content, if available

## 

[​

](#find-similar-and-contents-method)

`find_similar_and_contents` Method

Find a list of similar results based on a webpage’s URL, optionally including the text content or highlights of each result.

### 

[​

](#input-example%3A-4)

Input Example:

Python

Copy

Ask AI

```
# Find similar with full text content
similar_with_text = exa.find_similar_and_contents(
    "https://example.com/article",
    text=True,
    num_results=2
)

# Find similar with highlights
similar_with_highlights = exa.find_similar_and_contents(
    "https://example.com/article",
    highlights=True,
    num_results=2
)

# Find similar with both text and highlights
similar_with_text_and_highlights = exa.find_similar_and_contents(
    "https://example.com/article",
    text=True,
    highlights=True,
    num_results=2
)
```

### 

[​

](#input-parameters%3A-4)

Input Parameters:

Parameter

Type

Description

Default

url

str

The URL of the webpage to find similar results for.

Required

text

Union\[TextContentsOptions, Literal\[True\]\]

If provided, includes the full text of the content in the results.

None

highlights

Union\[HighlightsContentsOptions, Literal\[True\]\]

If provided, includes highlights of the content in the results.

None

num\_results

Optional\[int\]

Number of similar results to return.

None

include\_domains

Optional\[List\[str\]\]

List of domains to include in the search.

None

exclude\_domains

Optional\[List\[str\]\]

List of domains to exclude from the search.

None

start\_crawl\_date

Optional\[str\]

Results will only include links **crawled** after this date.

None

end\_crawl\_date

Optional\[str\]

Results will only include links **crawled** before this date.

None

start\_published\_date

Optional\[str\]

Results will only include links with a **published** date after this date.

None

end\_published\_date

Optional\[str\]

Results will only include links with a **published** date before this date.

None

exclude\_source\_domain

Optional\[bool\]

If true, excludes results from the same domain as the input URL.

None

category

Optional\[str\]

A data category to focus on when searching, with higher comprehensivity and data cleanliness.

None

context

Union\[ContextContentsOptions, Literal\[True\]\]

If true, concatentates results into a context string.

None

### 

[​

](#returns%3A)

Returns:

The return type depends on the combination of `text` and `highlights` parameters:

*   `SearchResponse[ResultWithText]`: When only `text` is provided or when neither `text` nor `highlights` is provided (defaults to including text).
*   `SearchResponse[ResultWithHighlights]`: When only `highlights` is provided.
*   `SearchResponse[ResultWithTextAndHighlights]`: When both `text` and `highlights` are provided.

The response contains similar results and an optional autoprompt string. Note: If neither `text` nor `highlights` is specified, the method defaults to including the full text content.

## 

[​

](#answer-method)

`answer` Method

Generate an answer to a query using Exa’s search and LLM capabilities. This method returns an AnswerResponse with the answer and a list of citations. You can optionally retrieve the full text of each citation by setting text=True.

### 

[​

](#input-example%3A-5)

Input Example:

Python

Copy

Ask AI

```
response = exa.answer("What is the capital of France?")

print(response.answer)       # e.g. "Paris"
print(response.citations)    # list of citations used

# If you want the full text of the citations in the response:
response_with_text = exa.answer(
    "What is the capital of France?",
    text=True
)
print(response_with_text.citations[0].text)  # Full page text
```

### 

[​

](#input-parameters%3A-5)

Input Parameters:

Parameter

Type

Description

Default

query

str

The question to answer.

Required

text

Optional\[bool\]

If true, the full text of each citation is included in the result.

False

stream

Optional\[bool\]

Note: If true, an error is thrown. Use stream\_answer() instead for streaming responses.

None

### 

[​

](#returns-example%3A-4)

Returns Example:

JSON

Copy

Ask AI

```
{
  "answer": "The capital of France is Paris.",
  "citations": [
    {
      "id": "https://www.example.com/france",
      "url": "https://www.example.com/france",
      "title": "France - Wikipedia",
      "publishedDate": "2023-01-01",
      "author": null,
      "text": "France, officially the French Republic, is a country in... [truncated for brevity]"
    }
  ]
}
```

### 

[​

](#return-parameters%3A-4)

Return Parameters:

Returns an `AnswerResponse` object:

Field

Type

Description

answer

str

The generated answer text

citations

List\[AnswerResult\]

List of citations used to generate the answer

### 

[​

](#answerresult-object)

`AnswerResult` object

Field

Type

Description

id

str

Temporary ID for the document

url

str

URL of the citation

title

Optional\[str\]

Title of the content, if available

published\_date

Optional\[str\]

Estimated creation date

author

Optional\[str\]

The author of the content, if available

text

Optional\[str\]

The full text of the content (if text=True)

* * *

## 

[​

](#stream-answer-method)

`stream_answer` Method

Generate a streaming answer to a query with Exa’s LLM capabilities. Instead of returning a single response, this method yields chunks of text and/or citations as they become available.

### 

[​

](#input-example%3A-6)

Input Example:

Python

Copy

Ask AI

```
stream = exa.stream_answer("What is the capital of France?", text=True)

for chunk in stream:
    if chunk.content:
        print("Partial answer:", chunk.content)
    if chunk.citations:
        for citation in chunk.citations:
            print("Citation found:", citation.url)
```

### 

[​

](#input-parameters%3A-6)

Input Parameters:

Parameter

Type

Description

Default

query

str

The question to answer.

Required

text

Optional\[bool\]

If true, includes full text of each citation in the streamed response.

False

### 

[​

](#return-type%3A)

Return Type:

A `StreamAnswerResponse` object, which is iterable. Iterating over it yields `StreamChunk` objects:

### 

[​

](#streamchunk)

`StreamChunk`

Field

Type

Description

content

Optional\[str\]

Partial text content of the answer so far.

citations

Optional\[List\[AnswerResult\]\]

Citations discovered in this chunk, if any.

Use `stream.close()` to end the streaming session if needed.

## 

[​

](#research-create-task-method)

`research.create_task` Method

Create an asynchronous research task that performs multi-step web research and returns structured JSON results with citations.

### 

[​

](#input-example%3A-7)

Input Example:

Python

Copy

Ask AI

```
from exa_py import Exa
import os

exa = Exa(os.environ["EXA_API_KEY"])

# Create a simple research task
instructions = "What is the latest valuation of SpaceX?"
schema = {
    "type": "object",
    "properties": {
        "valuation": {"type": "string"},
        "date": {"type": "string"},
        "source": {"type": "string"}
    }
}

task = exa.research.create_task(
    instructions=instructions,
    output_schema=schema
)

# Or even simpler - let the model infer the schema
simple_task = exa.research.create_task(
    instructions="What are the main benefits of meditation?",
    infer_schema=True
)

print(f"Task created with ID: {task.id}")
```

### 

[​

](#input-parameters%3A-7)

Input Parameters:

Parameter

Type

Description

Default

instructions

str

Natural language instructions describing what the research task should accomplish.

Required

model

Optional\[str\]

The research model to use. Options: “exa-research” (default), “exa-research-pro”.

“exa-research”

output\_schema

Optional\[Dict\]

JSON Schema specification for the desired output structure. See json-schema.org/draft-07.

None

infer\_schema

Optional\[bool\]

When true and no output schema is provided, an LLM will generate an output schema.

None

### 

[​

](#returns%3A-2)

Returns:

Returns a `ResearchTask` object:

Field

Type

Description

id

str

The unique identifier for the task

### 

[​

](#return-example%3A)

Return Example:

JSON

Copy

Ask AI

```
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

## 

[​

](#research-get-task-method)

`research.get_task` Method

Get the current status and results of a research task by its ID.

### 

[​

](#input-example%3A-8)

Input Example:

Python

Copy

Ask AI

```
# Get a research task by ID
task_id = "your-task-id-here"
task = exa.research.get_task(task_id)

print(f"Task status: {task.status}")
if task.status == "completed":
    print(f"Results: {task.data}")
    print(f"Citations: {task.citations}")
```

### 

[​

](#input-parameters%3A-8)

Input Parameters:

Parameter

Type

Description

Default

task\_id

str

The unique identifier of the task

Required

### 

[​

](#returns%3A-3)

Returns:

Returns a `ResearchTaskDetails` object:

Field

Type

Description

id

str

The unique identifier for the task

status

str

Task status: “running”, “completed”, or “failed”

instructions

str

The original instructions provided

schema

Optional\[Dict\]

The JSON schema specification used

data

Optional\[Dict\]

The research results (when completed)

citations

Optional\[Dict\[str, List\]\]

Citations grouped by root field (when completed)

### 

[​

](#return-example%3A-2)

Return Example:

JSON

Copy

Ask AI

```
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "completed",
  "instructions": "What is the latest valuation of SpaceX?",
  "schema": {
    "type": "object",
    "properties": {
      "valuation": {"type": "string"},
      "date": {"type": "string"},
      "source": {"type": "string"}
    }
  },
  "data": {
    "valuation": "$350 billion",
    "date": "December 2024",
    "source": "Financial Times"
  },
  "citations": {
    "valuation": [
      {
        "id": "https://www.ft.com/content/...",
        "url": "https://www.ft.com/content/...",
        "title": "SpaceX valued at $350bn in employee share sale",
        "snippet": "SpaceX has been valued at $350bn..."
      }
    ]
  }
}
```

## 

[​

](#research-poll-task-method)

`research.poll_task` Method

Poll a research task until it completes or fails, returning the final result.

### 

[​

](#input-example%3A-9)

Input Example:

Python

Copy

Ask AI

```
# Create and poll a task until completion
task = exa.research.create_task(
    instructions="Get information about Paris, France",
    output_schema={
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "population": {"type": "string"},
            "founded_date": {"type": "string"}
        }
    }
)

# Poll until completion
result = exa.research.poll_task(task.id)
print(f"Research complete: {result.data}")
```

### 

[​

](#input-parameters%3A-9)

Input Parameters:

Parameter

Type

Description

Default

task\_id

str

The unique identifier of the task

Required

poll\_interval

Optional\[int\]

Seconds between polling attempts

2

max\_wait\_time

Optional\[int\]

Maximum seconds to wait before timing out

300

### 

[​

](#returns%3A-4)

Returns:

Returns a `ResearchTaskDetails` object with the completed task data (same structure as `get_task`).

## 

[​

](#research-list-tasks-method)

`research.list_tasks` Method

List all research tasks with optional pagination.

### 

[​

](#input-example%3A-10)

Input Example:

Python

Copy

Ask AI

```
# List all research tasks
response = exa.research.list_tasks()
print(f"Found {len(response['data'])} tasks")

# List with pagination
response = exa.research.list_tasks(limit=10)
if response['hasMore']:
    next_page = exa.research.list_tasks(cursor=response['nextCursor'])
```

### 

[​

](#input-parameters%3A-10)

Input Parameters:

Parameter

Type

Description

Default

cursor

Optional\[str\]

Pagination cursor from previous request

None

limit

Optional\[int\]

Number of results to return (1-200)

25

### 

[​

](#returns%3A-5)

Returns:

Returns a dictionary with:

Field

Type

Description

data

List\[ResearchTaskDetails\]

List of research task objects

hasMore

bool

Whether there are more results to paginate

nextCursor

Optional\[str\]

Cursor for the next page (if hasMore is true)

### 

[​

](#return-example%3A-3)

Return Example:

JSON

Copy

Ask AI

```
{
  "data": [
    {
      "id": "task-1",
      "status": "completed",
      "instructions": "Research SpaceX valuation",
      ...
    },
    {
      "id": "task-2",
      "status": "running",
      "instructions": "Compare GPU specifications",
      ...
    }
  ],
  "hasMore": true,
  "nextCursor": "eyJjcmVhdGVkQXQiOiIyMDI0LTAxLTE1VDE4OjMwOjAwWiIsImlkIjoidGFzay0yIn0="
}
```

[TypeScript SDK Specification](/sdks/typescript-sdk-specification)

Assistant

Responses are generated using AI and may contain mistakes.