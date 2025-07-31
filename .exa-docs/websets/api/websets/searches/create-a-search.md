# Create a Search - Exa

> **Source:** https://docs.exa.ai/websets/api/websets/searches/create-a-search  
> **Last Updated:** 2025-07-31T04:46:26.236Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Searches

Create a Search

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
curl --request POST \
  --url https://api.exa.ai/websets/v0/websets/{webset}/searches \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "count": 2,
  "query": "Marketing agencies based in the US, that focus on consumer products. Get brands worked with and city",
  "entity": {
    "type": "company"
  },
  "criteria": [
    {
      "description": "<string>"
    }
  ],
  "exclude": [
    {
      "source": "import",
      "id": "<string>"
    }
  ],
  "scope": [
    {
      "source": "import",
      "id": "<string>",
      "relationship": {
        "definition": "<string>",
        "limit": 5.5
      }
    }
  ],
  "recall": true,
  "behavior": "override",
  "metadata": {}
}'
```

200

Copy

Ask AI

```
{
  "id": "<string>",
  "object": "webset_search",
  "status": "created",
  "websetId": "<string>",
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
  "scope": [
    {
      "source": "import",
      "id": "<string>",
      "relationship": {
        "definition": "<string>",
        "limit": 5.5
      }
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

POST

/

v0

/

websets

/

{webset}

/

searches

Try it

cURL

cURL

Copy

Ask AI

```
curl --request POST \
  --url https://api.exa.ai/websets/v0/websets/{webset}/searches \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "count": 2,
  "query": "Marketing agencies based in the US, that focus on consumer products. Get brands worked with and city",
  "entity": {
    "type": "company"
  },
  "criteria": [
    {
      "description": "<string>"
    }
  ],
  "exclude": [
    {
      "source": "import",
      "id": "<string>"
    }
  ],
  "scope": [
    {
      "source": "import",
      "id": "<string>",
      "relationship": {
        "definition": "<string>",
        "limit": 5.5
      }
    }
  ],
  "recall": true,
  "behavior": "override",
  "metadata": {}
}'
```

200

Copy

Ask AI

```
{
  "id": "<string>",
  "object": "webset_search",
  "status": "created",
  "websetId": "<string>",
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
  "scope": [
    {
      "source": "import",
      "id": "<string>",
      "relationship": {
        "definition": "<string>",
        "limit": 5.5
      }
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

#### Body

application/json

#### Response

200 - application/json

Webset Search created

The response is of type `object`.

[List all Items for a Webset](/websets/api/websets/items/list-all-items-for-a-webset)[Get a Search](/websets/api/websets/searches/get-a-search)

Assistant

Responses are generated using AI and may contain mistakes.