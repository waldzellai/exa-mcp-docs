# Get a Search - Exa

> **Source:** https://docs.exa.ai/websets/api/websets/searches/get-a-search  
> **Last Updated:** 2025-07-16T10:36:22.839Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Searches

Get a Search

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
    
    
    
    ](/websets/overview)
*   [
    
    FAQ
    
    
    
    ](/websets/faq)

##### Dashboard

*   [
    
    Get started
    
    
    
    ](/websets/dashboard/get-started)
*   [
    
    Example queries
    
    
    
    ](/websets/dashboard/websets-example-queries)
*   [
    
    Import from CSV
    
    
    
    ](/websets/dashboard/import-from-csv)
*   [
    
    Exclude Results
    
    
    
    ](/websets/dashboard/exclude-results)
*   [
    
    Integrations
    
    
    
    ](/websets/dashboard/integrations)
*   Videos
    

##### API

*   [
    
    Overview
    
    
    
    ](/websets/api/overview)
*   [
    
    Get started
    
    
    
    ](/websets/api/get-started)
*   [
    
    How It Works
    
    
    
    ](/websets/api/how-it-works)
*   Core
    
    *   Websets
        
    *   Items
        
    *   Searches
        
        *   [POST
            
            Create a Search
            
            
            
            ](/websets/api/websets/searches/create-a-search)
        *   [GET
            
            Get a Search
            
            
            
            ](/websets/api/websets/searches/get-a-search)
        *   [POST
            
            Cancel a running Search
            
            
            
            ](/websets/api/websets/searches/cancel-a-running-search)
    *   Enrichments
        
*   Imports
    
*   Monitors
    
*   Webhooks
    
*   Events
    

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/websets/{webset}/searches/{id} \
  --header 'x-api-key: <api-key>'
```

200

Copy

Ask AI

```
{
  "id": "<string>",
  "object": "webset_search",
  "status": "created",
  "query": "<string>",
  "entity": {
    "type": "company"
  },
  "criteria": [
    {
      "description": "<string>",
      "successRate": 50
    }
  ],
  "count": 2,
  "behavior": "override",
  "exclude": [
    {
      "source": "import",
      "id": "<string>"
    }
  ],
  "progress": {
    "found": 123,
    "analyzed": 123,
    "completion": 50,
    "timeLeft": 123
  },
  "recall": {
    "expected": {
      "total": 123,
      "confidence": "high",
      "bounds": {
        "min": 123,
        "max": 123
      }
    },
    "reasoning": "<string>"
  },
  "metadata": {},
  "canceledAt": "2023-11-07T05:31:56Z",
  "canceledReason": "webset_deleted",
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

GET

/

v0

/

websets

/

{webset}

/

searches

/

{id}

Try it

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/websets/{webset}/searches/{id} \
  --header 'x-api-key: <api-key>'
```

200

Copy

Ask AI

```
{
  "id": "<string>",
  "object": "webset_search",
  "status": "created",
  "query": "<string>",
  "entity": {
    "type": "company"
  },
  "criteria": [
    {
      "description": "<string>",
      "successRate": 50
    }
  ],
  "count": 2,
  "behavior": "override",
  "exclude": [
    {
      "source": "import",
      "id": "<string>"
    }
  ],
  "progress": {
    "found": 123,
    "analyzed": 123,
    "completion": 50,
    "timeLeft": 123
  },
  "recall": {
    "expected": {
      "total": 123,
      "confidence": "high",
      "bounds": {
        "min": 123,
        "max": 123
      }
    },
    "reasoning": "<string>"
  },
  "metadata": {},
  "canceledAt": "2023-11-07T05:31:56Z",
  "canceledReason": "webset_deleted",
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

Assistant

Responses are generated using AI and may contain mistakes.

#### Authorizations

[​

](#authorization-x-api-key)

x-api-key

string

header

required

Your Exa API key

#### Path Parameters

[​

](#parameter-webset)

webset

string

required

The id of the Webset

[​

](#parameter-id)

id

string

required

The id of the Search

#### Response

200 - application/json

Search retrieved

The response is of type `object`.

[Create a Search](/websets/api/websets/searches/create-a-search)[Cancel a running Search](/websets/api/websets/searches/cancel-a-running-search)