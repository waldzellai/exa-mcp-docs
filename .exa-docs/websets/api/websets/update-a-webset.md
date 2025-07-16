# Update a Webset - Exa

> **Source:** https://docs.exa.ai/websets/api/websets/update-a-webset  
> **Last Updated:** 2025-07-16T10:36:01.432Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Websets

Update a Webset

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
        
        *   [POST
            
            Create a Webset
            
            
            
            ](/websets/api/websets/create-a-webset)
        *   [GET
            
            Get a Webset
            
            
            
            ](/websets/api/websets/get-a-webset)
        *   [POST
            
            Update a Webset
            
            
            
            ](/websets/api/websets/update-a-webset)
        *   [DEL
            
            Delete a Webset
            
            
            
            ](/websets/api/websets/delete-a-webset)
        *   [POST
            
            Cancel a running Webset
            
            
            
            ](/websets/api/websets/cancel-a-running-webset)
        *   [GET
            
            List all Websets
            
            
            
            ](/websets/api/websets/list-all-websets)
    *   Items
        
    *   Searches
        
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
  --url https://api.exa.ai/websets/v0/websets/{id} \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "metadata": {}
}'
```

200

404

Copy

Ask AI

```
{
  "id": "<string>",
  "object": "webset",
  "status": "idle",
  "externalId": "<string>",
  "title": "<string>",
  "searches": [
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
  ],
  "imports": [
    {
      "id": "<string>",
      "object": "import",
      "status": "pending",
      "format": "csv",
      "entity": {
        "type": "<string>"
      },
      "title": "<string>",
      "count": 123,
      "metadata": {},
      "failedReason": "invalid_format",
      "failedAt": "2023-11-07T05:31:56Z",
      "failedMessage": "<string>",
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "enrichments": [
    {
      "id": "<string>",
      "object": "webset_enrichment",
      "status": "pending",
      "websetId": "<string>",
      "title": "<string>",
      "description": "<string>",
      "format": "text",
      "options": [
        {
          "label": "<string>"
        }
      ],
      "instructions": "<string>",
      "metadata": {},
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "monitors": [
    {
      "id": "<string>",
      "object": "monitor",
      "status": "enabled",
      "websetId": "<string>",
      "cadence": {
        "cron": "<string>",
        "timezone": "Etc/UTC"
      },
      "behavior": {
        "type": "search",
        "config": {
          "query": "<string>",
          "criteria": [
            {
              "description": "<string>"
            }
          ],
          "entity": {
            "type": "<string>"
          },
          "count": 123,
          "behavior": "append"
        }
      },
      "lastRun": {
        "id": "<string>",
        "object": "monitor_run",
        "status": "created",
        "monitorId": "<string>",
        "type": "search",
        "completedAt": "2023-11-07T05:31:56Z",
        "failedAt": "2023-11-07T05:31:56Z",
        "failedReason": "<string>",
        "canceledAt": "2023-11-07T05:31:56Z",
        "createdAt": "2023-11-07T05:31:56Z",
        "updatedAt": "2023-11-07T05:31:56Z"
      },
      "nextRunAt": "2023-11-07T05:31:56Z",
      "metadata": {},
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "streams": [
    "<any>"
  ],
  "metadata": {},
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

{id}

Try it

cURL

cURL

Copy

Ask AI

```
curl --request POST \
  --url https://api.exa.ai/websets/v0/websets/{id} \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "metadata": {}
}'
```

200

404

Copy

Ask AI

```
{
  "id": "<string>",
  "object": "webset",
  "status": "idle",
  "externalId": "<string>",
  "title": "<string>",
  "searches": [
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
  ],
  "imports": [
    {
      "id": "<string>",
      "object": "import",
      "status": "pending",
      "format": "csv",
      "entity": {
        "type": "<string>"
      },
      "title": "<string>",
      "count": 123,
      "metadata": {},
      "failedReason": "invalid_format",
      "failedAt": "2023-11-07T05:31:56Z",
      "failedMessage": "<string>",
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "enrichments": [
    {
      "id": "<string>",
      "object": "webset_enrichment",
      "status": "pending",
      "websetId": "<string>",
      "title": "<string>",
      "description": "<string>",
      "format": "text",
      "options": [
        {
          "label": "<string>"
        }
      ],
      "instructions": "<string>",
      "metadata": {},
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "monitors": [
    {
      "id": "<string>",
      "object": "monitor",
      "status": "enabled",
      "websetId": "<string>",
      "cadence": {
        "cron": "<string>",
        "timezone": "Etc/UTC"
      },
      "behavior": {
        "type": "search",
        "config": {
          "query": "<string>",
          "criteria": [
            {
              "description": "<string>"
            }
          ],
          "entity": {
            "type": "<string>"
          },
          "count": 123,
          "behavior": "append"
        }
      },
      "lastRun": {
        "id": "<string>",
        "object": "monitor_run",
        "status": "created",
        "monitorId": "<string>",
        "type": "search",
        "completedAt": "2023-11-07T05:31:56Z",
        "failedAt": "2023-11-07T05:31:56Z",
        "failedReason": "<string>",
        "canceledAt": "2023-11-07T05:31:56Z",
        "createdAt": "2023-11-07T05:31:56Z",
        "updatedAt": "2023-11-07T05:31:56Z"
      },
      "nextRunAt": "2023-11-07T05:31:56Z",
      "metadata": {},
      "createdAt": "2023-11-07T05:31:56Z",
      "updatedAt": "2023-11-07T05:31:56Z"
    }
  ],
  "streams": [
    "<any>"
  ],
  "metadata": {},
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

](#parameter-id)

id

string

required

The id or externalId of the Webset

#### Body

application/json

#### Response

200

200404

application/json

Webset updated

The response is of type `object`.

[Get a Webset](/websets/api/websets/get-a-webset)[Delete a Webset](/websets/api/websets/delete-a-webset)