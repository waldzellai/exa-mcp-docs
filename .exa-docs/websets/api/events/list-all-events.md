# List all Events - Exa

> **Source:** https://docs.exa.ai/websets/api/events/list-all-events  
> **Last Updated:** 2025-07-16T10:35:05.548Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Events

List all Events

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
    
*   Imports
    
*   Monitors
    
*   Webhooks
    
*   Events
    
    *   [
        
        Types
        
        
        
        ](/websets/api/events/types)
    *   [GET
        
        List all Events
        
        
        
        ](/websets/api/events/list-all-events)
    *   [GET
        
        Get an Event
        
        
        
        ](/websets/api/events/get-an-event)

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/events \
  --header 'x-api-key: <api-key>'
```

200

Copy

Ask AI

```
{
  "data": [
    {
      "id": "<string>",
      "object": "event",
      "type": "webset.created",
      "data": {
        "id": "<string>",
        "object": "<string>",
        "status": "idle",
        "externalId": "<string>",
        "title": "<string>",
        "searches": [
          {
            "id": "<string>",
            "object": "<string>",
            "status": "created",
            "query": "<string>",
            "entity": {
              "type": "<string>"
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
            "object": "<string>",
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
              "timezone": "<string>"
            },
            "behavior": {
              "type": "<string>",
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
                "count": 1,
                "behavior": "override"
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
      },
      "createdAt": "2023-11-07T05:31:56Z"
    }
  ],
  "hasMore": true,
  "nextCursor": "<string>"
}
```

GET

/

v0

/

events

Try it

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/events \
  --header 'x-api-key: <api-key>'
```

200

Copy

Ask AI

```
{
  "data": [
    {
      "id": "<string>",
      "object": "event",
      "type": "webset.created",
      "data": {
        "id": "<string>",
        "object": "<string>",
        "status": "idle",
        "externalId": "<string>",
        "title": "<string>",
        "searches": [
          {
            "id": "<string>",
            "object": "<string>",
            "status": "created",
            "query": "<string>",
            "entity": {
              "type": "<string>"
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
            "object": "<string>",
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
              "timezone": "<string>"
            },
            "behavior": {
              "type": "<string>",
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
                "count": 1,
                "behavior": "override"
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
      },
      "createdAt": "2023-11-07T05:31:56Z"
    }
  ],
  "hasMore": true,
  "nextCursor": "<string>"
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

#### Query Parameters

[​

](#parameter-cursor)

cursor

string

The cursor to paginate through the results

Minimum length: `1`

[​

](#parameter-limit)

limit

number

default:25

The number of results to return

Required range: `1 <= x <= 200`

[​

](#parameter-types)

types

enum<string>\[\]

The types of events to filter by

Show child attributes

[​

](#parameter-created-before)

createdBefore

string

Filter events created before or at this timestamp (inclusive). Must be a valid ISO 8601 datetime string. All times are in UTC.

[​

](#parameter-created-after)

createdAfter

string

Filter events created after or at this timestamp (inclusive). Must be a valid ISO 8601 datetime string. All times are in UTC.

#### Response

200 - application/json

List of events

The response is of type `object`.

[Types](/websets/api/events/types)[Get an Event](/websets/api/events/get-an-event)