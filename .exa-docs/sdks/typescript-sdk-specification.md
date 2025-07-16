# TypeScript SDK Specification - Exa

> **Source:** https://docs.exa.ai/sdks/typescript-sdk-specification  
> **Last Updated:** 2025-07-16T10:34:50.456Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

SDKs

TypeScript SDK Specification

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
*   [Input Example](#input-example)
*   [Input Parameters](#input-parameters)
*   [Returns Example](#returns-example)
*   [Return Parameters](#return-parameters)
*   [SearchResponse](#searchresponse)
*   [Result Object](#result-object)
*   [searchAndContents Method](#searchandcontents-method)
*   [Input Example](#input-example-2)
*   [Input Parameters](#input-parameters-2)
*   [Returns Example](#returns-example-2)
*   [Return Parameters](#return-parameters-2)
*   [SearchResponse](#searchresponse-2)
*   [SearchResult](#searchresult)
*   [findSimilar Method](#findsimilar-method)
*   [Input Example](#input-example-3)
*   [Input Parameters](#input-parameters-3)
*   [Returns Example](#returns-example-3)
*   [Return Parameters](#return-parameters-3)
*   [SearchResponse](#searchresponse-3)
*   [Result Object](#result-object-2)
*   [findSimilarAndContents Method](#findsimilarandcontents-method)
*   [Input Example](#input-example-4)
*   [Input Parameters](#input-parameters-4)
*   [Returns Example](#returns-example-4)
*   [Return Parameters](#return-parameters-4)
*   [SearchResponse](#searchresponse-4)
*   [SearchResult](#searchresult-2)
*   [getContents Method](#getcontents-method)
*   [Input Example](#input-example-5)
*   [Input Parameters](#input-parameters-5)
*   [Returns Example](#returns-example-5)
*   [Return Parameters](#return-parameters-5)
*   [SearchResponse](#searchresponse-5)
*   [SearchResult](#searchresult-3)
*   [answer Method](#answer-method)
*   [Input Example](#input-example-6)
*   [Input Parameters](#input-parameters-6)
*   [Returns Example](#returns-example-6)
*   [Return Parameters](#return-parameters-6)
*   [AnswerResponse](#answerresponse)
*   [streamAnswer Method](#streamanswer-method)
*   [Input Example](#input-example-7)
*   [Input Parameters](#input-parameters-7)
*   [Return Type](#return-type)
*   [research.createTask Method](#research-createtask-method)
*   [Input Example](#input-example-8)
*   [Input Parameters](#input-parameters-8)
*   [Returns Example](#returns-example-7)
*   [Return Type](#return-type-2)
*   [research.getTask Method](#research-gettask-method)
*   [Input Example](#input-example-9)
*   [Input Parameters](#input-parameters-9)
*   [Returns Example](#returns-example-8)
*   [Return Type](#return-type-3)
*   [research.pollTask Method](#research-polltask-method)
*   [Input Example](#input-example-10)
*   [Input Parameters](#input-parameters-10)
*   [Returns](#returns)
*   [research.listTasks Method](#research-listtasks-method)
*   [Input Example](#input-example-11)
*   [Input Parameters](#input-parameters-11)
*   [Returns Example](#returns-example-9)
*   [Return Type](#return-type-4)

For ChatGPT-based [TypeScript SDK](https://github.com/exa-labs/exa-js) assistance, [go here](https://chat.openai.com/g/g-Xx4N36Q8Y-exa-formerly-metaphor-ts-js-guide).

## 

[​

](#getting-started)

Getting started

Installing the [exa-js](https://github.com/exa-labs/exa-js) SDK

*   npm
*   pnpm

Copy

Ask AI

```

npm install exa-js
```

Copy

Ask AI

```

npm install exa-js
```

Copy

Ask AI

```
pnpm install exa-js
```

and then instantiate an Exa client

TypeScript

Copy

Ask AI

```

import Exa from 'exa-js';

const exa = new Exa(process.env.EXA_API_KEY);
```

[

## Get API Key

Follow this link to get your API key







](https://dashboard.exa.ai/login?redirect=/docs?path=/reference/typescript-sdk-specification)  

* * *

## 

[​

](#search-method)

`search` Method

Perform an Exa search given an input query and retrieve a list of relevant results as links.

  

### 

[​

](#input-example)

Input Example

Copy

Ask AI

```

const result = await exa.search(
  "hottest AI startups",
  {
    numResults: 2
  }
);
```

  

### 

[​

](#input-parameters)

Input Parameters

Parameter

Type

Description

Default

query

string

The input query string.

Required

numResults

number

Number of search results to return.

10

includeDomains

string\[\]

List of domains to include in the search.

undefined

excludeDomains

string\[\]

List of domains to exclude in the search.

undefined

startCrawlDate

string

Results will only include links **crawled** after this date.

undefined

endCrawlDate

string

Results will only include links **crawled** before this date.

undefined

startPublishedDate

string

Results will only include links with a **published** date after this date.

undefined

endPublishedDate

string

Results will only include links with a **published** date before this date.

undefined

type

string

The type of search, “keyword” or “neural”.

“auto”

category

string

data category to focus on when searching, with higher comprehensivity and data cleanliness. Available categories: “company”, “research paper”, “news”, “linkedin profile”, “github”, “tweet”, “movie”, “song”, “personal site”, “pdf”, “financial report”.

undefined

  

### 

[​

](#returns-example)

Returns Example

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
  ]
}
```

  

### 

[​

](#return-parameters)

Return Parameters

### 

[​

](#searchresponse)

`SearchResponse`

Field

Type

Description

results

Result\[\]

List of Result objects

  

### 

[​

](#result-object)

`Result` Object

Field

Type

Description

url

string

URL of the search result

id

string

Temporary ID for the document

title

string | null

Title of the search result

score?

number

Similarity score between query/url and result

publishedDate?

string

Estimated creation date

author?

string

Author of the content, if available

  

## 

[​

](#searchandcontents-method)

`searchAndContents` Method

Perform an Exa search given an input query and retrieve a list of relevant results as links, optionally including the full text and/or highlights of the content.

  

### 

[​

](#input-example-2)

Input Example

TypeScript

Copy

Ask AI

```

// Search with full text content
const resultWithText = await exa.searchAndContents(
  "AI in healthcare",
  {
    text: true,
    numResults: 2
  }
);

// Search with highlights
const resultWithHighlights = await exa.searchAndContents(
  "AI in healthcare",
  {
    highlights: true,
    numResults: 2
  }
);

// Search with both text and highlights
const resultWithTextAndHighlights = await exa.searchAndContents(
  "AI in healthcare",
  {
    text: true,
    highlights: true,
    numResults: 2
  }
);

// Search with structured summary schema
const companySchema = {
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
};

const resultWithStructuredSummary = await exa.searchAndContents(
  "OpenAI company information",
  {
    summary: {
      schema: companySchema
    },
    category: "company",
    numResults: 3
  }
);

// Parse the structured summary (returned as a JSON string)
const firstResult = resultWithStructuredSummary.results[0];
if (firstResult.summary) {
  const structuredData = JSON.parse(firstResult.summary);
  console.log(structuredData.name);        // e.g. "OpenAI"
  console.log(structuredData.industry);    // e.g. "Artificial Intelligence"
  console.log(structuredData.keyProducts); // e.g. ["GPT-4", "DALL-E", "ChatGPT"]
}
```

  

### 

[​

](#input-parameters-2)

Input Parameters

Parameter

Type

Description

Default

query

string

The input query string.

Required

text

boolean | { maxCharacters?: number, includeHtmlTags?: boolean }

If provided, includes the full text of the content in the results.

undefined

highlights

boolean | { query?: string, numSentences?: number, highlightsPerUrl?: number }

If provided, includes highlights of the content in the results.

undefined

numResults

number

Number of search results to return.

10

includeDomains

string\[\]

List of domains to include in the search.

undefined

excludeDomains

string\[\]

List of domains to exclude in the search.

undefined

startCrawlDate

string

Results will only include links **crawled** after this date.

undefined

endCrawlDate

string

Results will only include links **crawled** before this date.

undefined

startPublishedDate

string

Results will only include links with a **published** date after this date.

undefined

endPublishedDate

string

Results will only include links with a **published** date before this date.

undefined

type

string

The type of search, “keyword” or “neural”.

“auto”

category

string

A data category to focus on when searching, with higher comprehensivity and data cleanliness. Available categories: “company”, “research paper”, “news”, “linkedin profile”, “github”, “tweet”, “movie”, “song”, “personal site”, “pdf” and “financial report”.

undefined

  

### 

[​

](#returns-example-2)

Returns Example

JSON

Copy

Ask AI

```

{
  "results": [
    {
      "score": 0.20826785266399384,
      "title": "2023 AI Trends in Health Care",
      "id": "https://aibusiness.com/verticals/2023-ai-trends-in-health-care-",
      "url": "https://aibusiness.com/verticals/2023-ai-trends-in-health-care-",
      "publishedDate": "2022-12-29",
      "author": "Wylie Wong",
      "text": "While the health care industry was initially slow to [... TRUNCATED FOR BREVITY ...]",
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
      "text": "The integration of AI in healthcare is not [... TRUNCATED FOR BREVITY ...]",
      "highlights": [
        "The ability of AI to analyze large amounts of medical data and identify patterns has led to more accurate and timely diagnoses. This has been especially helpful in identifying complex medical conditions, which may be difficult to detect using traditional methods. Here are some examples of successful implementation of AI in healthcare. IBM Watson Health: IBM Watson Health is an AI-powered system used in healthcare to improve patient care and outcomes. The system uses natural language processing and machine learning to analyze large amounts of data and provide personalized treatment plans for patients."
      ],
      "highlightScores": [
        0.6563674807548523
      ]
    }
  ]
}
```

  

### 

[​

](#return-parameters-2)

Return Parameters

  

### 

[​

](#searchresponse-2)

`SearchResponse`

Field

Type

Description

results

SearchResult<T>\[\]

List of SearchResult objects

  

### 

[​

](#searchresult)

`SearchResult`

Extends the `Result` object from the `search` method with additional fields based on `T`:

Field

Type

Description

text?

string

Text of the search result page (if requested)

highlights?

string\[\]

Highlights of the search result (if requested)

highlightScores?

number\[\]

Scores of the highlights (if requested)

Note: The actual fields present in the `SearchResult<T>` object depend on the options provided in the `searchAndContents` call.

  

## 

[​

](#findsimilar-method)

`findSimilar` Method

Find a list of similar results based on a webpage’s URL.

  

### 

[​

](#input-example-3)

Input Example

Copy

Ask AI

```

const similarResults = await exa.findSimilar(
  "https://www.example.com",
  {
    numResults: 2,
    excludeSourceDomain: true
  }
);
```

  

### 

[​

](#input-parameters-3)

Input Parameters

Parameter

Type

Description

Default

url

string

The URL of the webpage to find similar results for.

Required

numResults

number

Number of similar results to return.

undefined

includeDomains

string\[\]

List of domains to include in the search.

undefined

excludeDomains

string\[\]

List of domains to exclude from the search.

undefined

startCrawlDate

string

Results will only include links **crawled** after this date.

undefined

endCrawlDate

string

Results will only include links **crawled** before this date.

undefined

startPublishedDate

string

Results will only include links with a **published** date after this date.

undefined

endPublishedDate

string

Results will only include links with a **published** date before this date.

undefined

excludeSourceDomain

boolean

If true, excludes results from the same domain as the input URL.

undefined

category

string

A data category to focus on when searching, with higher comprehensivity and data cleanliness.

undefined

  

### 

[​

](#returns-example-3)

Returns Example

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
  ]
}
```

  

### 

[​

](#return-parameters-3)

Return Parameters

  

### 

[​

](#searchresponse-3)

`SearchResponse`

Field

Type

Description

results

Result\[\]

List of Result objects

  

### 

[​

](#result-object-2)

`Result` Object

Field

Type

Description

url

string

URL of the search result

id

string

Temporary ID for the document

title

string | null

Title of the search result

score?

number

Similarity score between query/url and result

publishedDate?

string

Estimated creation date

author?

string

Author of the content, if available

  

* * *

## 

[​

](#findsimilarandcontents-method)

`findSimilarAndContents` Method

Find a list of similar results based on a webpage’s URL, optionally including the text content or highlights of each result.

  

### 

[​

](#input-example-4)

Input Example

TypeScript

Copy

Ask AI

```

// Find similar with full text content
const similarWithText = await exa.findSimilarAndContents(
  "https://www.example.com/article",
  {
    text: true,
    numResults: 2
  }
);

// Find similar with highlights
const similarWithHighlights = await exa.findSimilarAndContents(
  "https://www.example.com/article",
  {
    highlights: true,
    numResults: 2
  }
);

// Find similar with both text and highlights
const similarWithTextAndHighlights = await exa.findSimilarAndContents(
  "https://www.example.com/article",
  {
    text: true,
    highlights: true,
    numResults: 2,
    excludeSourceDomain: true
  }
);
```

  

### 

[​

](#input-parameters-4)

Input Parameters

Parameter

Type

Description

Default

url

string

The URL of the webpage to find similar results for.

Required

text

boolean | { maxCharacters?: number, includeHtmlTags?: boolean }

If provided, includes the full text of the content in the results.

undefined

highlights

boolean | { query?: string, numSentences?: number, highlightsPerUrl?: number }

If provided, includes highlights of the content in the results.

undefined

numResults

number

Number of similar results to return.

undefined

includeDomains

string\[\]

List of domains to include in the search.

undefined

excludeDomains

string\[\]

List of domains to exclude from the search.

undefined

startCrawlDate

string

Results will only include links **crawled** after this date.

undefined

endCrawlDate

string

Results will only include links **crawled** before this date.

undefined

startPublishedDate

string

Results will only include links with a **published** date after this date.

undefined

endPublishedDate

string

Results will only include links with a **published** date before this date.

undefined

excludeSourceDomain

boolean

If true, excludes results from the same domain as the input URL.

undefined

category

string

A data category to focus on when searching, with higher comprehensivity and data cleanliness.

undefined

  

### 

[​

](#returns-example-4)

Returns Example

JSON

Copy

Ask AI

```

{
  "results": [
    {
      "score": 0.8777582049369812,
      "title": "Similar Article: AI and Machine Learning",
      "id": "https://www.similarsite.com/ai-ml-article",
      "url": "https://www.similarsite.com/ai-ml-article",
      "publishedDate": "2023-05-15",
      "author": "Jane Doe",
      "text": "Artificial Intelligence (AI) and Machine Learning (ML) are revolutionizing various industries. [... TRUNCATED FOR BREVITY ...]",
      "highlights": [
        "AI and ML are transforming how businesses operate, enabling more efficient processes and data-driven decision making.",
        "The future of AI looks promising, with potential applications in healthcare, finance, and autonomous vehicles."
      ],
      "highlightScores": [
        0.95,
        0.89
      ]
    },
    {
      "score": 0.87653648853302,
      "title": "The Impact of AI on Modern Technology",
      "id": "https://www.techblog.com/ai-impact",
      "url": "https://www.techblog.com/ai-impact",
      "publishedDate": "2023-06-01",
      "author": "John Smith",
      "text": "In recent years, artificial intelligence has made significant strides in various technological domains. [... TRUNCATED FOR BREVITY ...]",
      "highlights": [
        "AI is not just a buzzword; it's a transformative technology that's reshaping industries and creating new opportunities.",
        "As AI continues to evolve, ethical considerations and responsible development become increasingly important."
      ],
      "highlightScores": [
        0.92,
        0.88
      ]
    }
  ]
}
```

  

### 

[​

](#return-parameters-4)

Return Parameters

  

### 

[​

](#searchresponse-4)

`SearchResponse`

Field

Type

Description

results

SearchResult<T>\[\]

List of SearchResult objects

## 

[​

](#searchresult-2)

SearchResult

Extends the `Result` object with additional fields based on the requested content:

Field

Type

Description

url

string

URL of the search result

id

string

Temporary ID for the document

title

\`string

null\`

Title of the search result

score?

number

Similarity score between query/url and result

publishedDate?

string

Estimated creation date

author?

string

Author of the content, if available

text?

string

Text of the search result page (if requested)

highlights?

string\[\]

Highlights of the search result (if requested)

highlightScores?

number\[\]

Scores of the highlights (if requested)

Note: The actual fields present in the `SearchResult<T>` object depend on the options provided in the `findSimilarAndContents` call.

  

* * *

## 

[​

](#getcontents-method)

`getContents` Method

Retrieves contents of documents based on a list of document IDs.

  

### 

[​

](#input-example-5)

Input Example

TypeScript

Copy

Ask AI

```

// Get contents for a single ID
const singleContent = await exa.getContents("https://www.example.com/article");

// Get contents for multiple IDs
const multipleContents = await exa.getContents([
  "https://www.example.com/article1",
  "https://www.example.com/article2"
]);

// Get contents with specific options
const contentsWithOptions = await exa.getContents(
  ["https://www.example.com/article1", "https://www.example.com/article2"],
  {
    text: { maxCharacters: 1000 },
    highlights: { query: "AI", numSentences: 2 }
  }
);
```

  

### 

[​

](#input-parameters-5)

Input Parameters

Parameter

Type

Description

Default

ids

string | string\[\] | SearchResult\[\]\`

A single ID, an array of IDs, or an array of SearchResults.

Required

text

boolean | { maxCharacters?: number, includeHtmlTags?: boolean }

If provided, includes the full text of the content in the results.

undefined

highlights

boolean | { query?: string, numSentences?: number, highlightsPerUrl?: number }

If provided, includes highlights of the content in the results.

undefined

  

### 

[​

](#returns-example-5)

Returns Example

JSON

Copy

Ask AI

```

{
  "results": [
    {
      "id": "https://www.example.com/article1",
      "url": "https://www.example.com/article1",
      "title": "The Future of Artificial Intelligence",
      "publishedDate": "2023-06-15",
      "author": "Jane Doe",
      "text": "Artificial Intelligence (AI) has made significant strides in recent years. [... TRUNCATED FOR BREVITY ...]",
      "highlights": [
        "AI is revolutionizing industries from healthcare to finance, enabling more efficient processes and data-driven decision making.",
        "As AI continues to evolve, ethical considerations and responsible development become increasingly important."
      ],
      "highlightScores": [
        0.95,
        0.92
      ]
    },
    {
      "id": "https://www.example.com/article2",
      "url": "https://www.example.com/article2",
      "title": "Machine Learning Applications in Business",
      "publishedDate": "2023-06-20",
      "author": "John Smith",
      "text": "Machine Learning (ML) is transforming how businesses operate and make decisions. [... TRUNCATED FOR BREVITY ...]",
      "highlights": [
        "Machine Learning algorithms can analyze vast amounts of data to identify patterns and make predictions.",
        "Businesses are leveraging ML for customer segmentation, demand forecasting, and fraud detection."
      ],
      "highlightScores": [
        0.93,
        0.90
      ]
    }
  ]
}
```

  

### 

[​

](#return-parameters-5)

Return Parameters

  

### 

[​

](#searchresponse-5)

`SearchResponse`

Field

Type

Description

results

SearchResult<T>\[\]

List of SearchResult objects

  

### 

[​

](#searchresult-3)

`SearchResult`

The fields in the `SearchResult<T>` object depend on the options provided in the `getContents` call:

Field

Type

Description

id

string

Temporary ID for the document

url

string

URL of the search result

title

\`string

null\`

Title of the search result

publishedDate?

string

Estimated creation date

author?

string

Author of the content, if available

text?

string

Text of the search result page (if requested)

highlights?

string\[\]

Highlights of the search result (if requested)

highlightScores?

number\[\]

Scores of the highlights (if requested)

Note: The actual fields present in the `SearchResult<T>` object depend on the options provided in the `getContents` call. If neither `text` nor `highlights` is specified, the method defaults to including the full text content.

  

* * *

## 

[​

](#answer-method)

`answer` Method

Generate an answer to a query using Exa’s search and LLM capabilities. This returns an AnswerResponse object with the answer text and citations used. You may optionally retrieve the full text of each source by setting `text: true`.

  

### 

[​

](#input-example-6)

Input Example

TypeScript

Copy

Ask AI

```
// Basic usage
const answerResponse = await exa.answer("What is the capital of France?");
console.log(answerResponse);

// If you want the full text of each citation in the result
const answerWithText = await exa.answer("What is the capital of France?", { text: true });
console.log(answerWithText);
```

  

### 

[​

](#input-parameters-6)

Input Parameters

Parameter

Type

Description

Default

query

string

The question or query to answer.

Required

options

{text?: boolean}

If text is true, each source in the result includes its full text.

  

### 

[​

](#returns-example-6)

Returns Example

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
  ],
  "requestId": "abc123"
}
```

  

### 

[​

](#return-parameters-6)

Return Parameters

#### 

[​

](#answerresponse)

`AnswerResponse`

TypeScript

Copy

Ask AI

```
interface AnswerResponse {
  answer: string;
  citations: SearchResult<{}>[];
  requestId?: string;
}
```

Field

Type

Description

answer

string

The generated answer text

citations

SearchResult<{ }>\[\]

The citations used to generate the answer

requestId?

string

Optional request ID for reference

Each citation is a `SearchResult<{}>` — a basic result object that can include text if options.text was set to true.

  

* * *

## 

[​

](#streamanswer-method)

`streamAnswer` Method

Generate a streaming answer to a query with Exa’s LLM capabilities. This returns an async generator yielding chunks of text and/or citations as they become available.

  

### 

[​

](#input-example-7)

Input Example

TypeScript

Copy

Ask AI

```
for await (const chunk of exa.streamAnswer("Explain quantum entanglement in simple terms.", { text: true })) {
  if (chunk.content) {
    process.stdout.write(chunk.content); // partial text
  }
  if (chunk.citations) {
    console.log("\nCitations:");
    console.log(chunk.citations);
  }
}
```

  

### 

[​

](#input-parameters-7)

Input Parameters

Parameter

Type

Description

Default

query

string

The question to answer.

Required

options

{ text?: boolean }

If text is true, each citation chunk includes its full text.

  

### 

[​

](#return-type)

Return Type

An async generator of objects with the type:

TypeScript

Copy

Ask AI

```
interface AnswerStreamChunk {
  content?: string;
  citations?: Array<{
    id: string;
    url: string;
    title?: string;
    publishedDate?: string;
    author?: string;
    text?: string;
  }>;
}
```

*   `content` is the partial text content of the answer so far (streamed in chunks).
*   `citations` is an array of citation objects that appear at this chunk in the response.

You can end iteration by using a break or by letting the loop finish naturally.

  

* * *

## 

[​

](#research-createtask-method)

`research.createTask` Method

Create an asynchronous research task that performs multi-step web research and returns structured JSON results with citations.

  

### 

[​

](#input-example-8)

Input Example

TypeScript

Copy

Ask AI

```
import Exa, { ResearchModel } from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY);

// Simple research task
const instructions = "What is the latest valuation of SpaceX?";
const schema = {
  type: "object",
  properties: {
    valuation: { type: "string" },
    date: { type: "string" },
    source: { type: "string" }
  }
};

const task = await exa.research.createTask({
  instructions: instructions,
  output: { schema: schema }
});

// Or even simpler - let the model infer the schema
const simpleTask = await exa.research.createTask({
  instructions: "What are the main benefits of meditation?",
  output: { inferSchema: true }
});

console.log(`Task created with ID: ${task.id}`);
```

  

### 

[​

](#input-parameters-8)

Input Parameters

Parameter

Type

Description

Default

instructions

string

Natural language instructions describing what the research task should accomplish.

Required

model

ResearchModel

The research model to use. Options: ResearchModel.exa\_research, ResearchModel.exa\_research\_pro

exa\_research

output

{ schema?: object, inferSchema?: boolean }

Output configuration with optional JSON schema or automatic schema inference.

undefined

  

### 

[​

](#returns-example-7)

Returns Example

JSON

Copy

Ask AI

```
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

  

### 

[​

](#return-type-2)

Return Type

TypeScript

Copy

Ask AI

```
interface CreateTaskResponse {
  id: string;
}
```

Field

Type

Description

id

string

The unique identifier for the task

  

## 

[​

](#research-gettask-method)

`research.getTask` Method

Get the current status and results of a research task by its ID.

  

### 

[​

](#input-example-9)

Input Example

TypeScript

Copy

Ask AI

```
// Get a research task by ID
const taskId = "your-task-id-here";
const task = await exa.research.getTask(taskId);

console.log(`Task status: ${task.status}`);
if (task.status === "completed") {
  console.log(`Results: ${JSON.stringify(task.data)}`);
  console.log(`Citations: ${JSON.stringify(task.citations)}`);
}
```

  

### 

[​

](#input-parameters-9)

Input Parameters

Parameter

Type

Description

Default

id

string

The unique identifier of the task

Required

  

### 

[​

](#returns-example-8)

Returns Example

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

  

### 

[​

](#return-type-3)

Return Type

TypeScript

Copy

Ask AI

```
interface ResearchTask {
  id: string;
  status: "running" | "completed" | "failed";
  instructions: string;
  schema?: object;
  data?: object;
  citations?: Record<string, Citation[]>;
}

interface Citation {
  id: string;
  url: string;
  title?: string;
  snippet: string;
}
```

Field

Type

Description

id

string

The unique identifier for the task

status

string

Task status: “running”, “completed”, or “failed”

instructions

string

The original instructions provided

schema

object (optional)

The JSON schema specification used

data

object (optional)

The research results (when completed)

citations

Record<string, Citation\[\]> (optional)

Citations grouped by root field (when completed)

  

## 

[​

](#research-polltask-method)

`research.pollTask` Method

Poll a research task until it completes or fails, returning the final result.

  

### 

[​

](#input-example-10)

Input Example

TypeScript

Copy

Ask AI

```
// Create and poll a task until completion
const task = await exa.research.createTask({
  instructions: "Get information about Paris, France",
  output: {
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        population: { type: "string" },
        founded_date: { type: "string" }
      }
    }
  }
});

// Poll until completion
const result = await exa.research.pollTask(task.id);
console.log(`Research complete: ${JSON.stringify(result.data)}`);
```

  

### 

[​

](#input-parameters-10)

Input Parameters

Parameter

Type

Description

Default

id

string

The unique identifier of the task

Required

Note: The pollTask method automatically polls every 1 second with a timeout of 10 minutes.

  

### 

[​

](#returns)

Returns

Returns a `ResearchTask` object with the completed task data (same structure as `getTask`).

  

## 

[​

](#research-listtasks-method)

`research.listTasks` Method

List all research tasks with optional pagination.

  

### 

[​

](#input-example-11)

Input Example

TypeScript

Copy

Ask AI

```
// List all research tasks
const response = await exa.research.listTasks();
console.log(`Found ${response.data.length} tasks`);

// List with pagination
const paginatedResponse = await exa.research.listTasks({ limit: 10 });
if (paginatedResponse.hasMore) {
  const nextPage = await exa.research.listTasks({
    cursor: paginatedResponse.nextCursor
  });
}
```

  

### 

[​

](#input-parameters-11)

Input Parameters

Parameter

Type

Description

Default

cursor

string

Pagination cursor from previous request

undefined

limit

number

Number of results to return (1-200)

25

  

### 

[​

](#returns-example-9)

Returns Example

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

  

### 

[​

](#return-type-4)

Return Type

TypeScript

Copy

Ask AI

```
interface ListTasksResponse {
  data: ResearchTask[];
  hasMore: boolean;
  nextCursor?: string;
}
```

Field

Type

Description

data

ResearchTask\[\]

List of research task objects

hasMore

boolean

Whether there are more results to paginate

nextCursor

string (optional)

Cursor for the next page (if hasMore is true)

Assistant

Responses are generated using AI and may contain mistakes.

[Python SDK Specification](/sdks/python-sdk-specification)[Python and TS Cheat Sheets](/sdks/cheat-sheet)