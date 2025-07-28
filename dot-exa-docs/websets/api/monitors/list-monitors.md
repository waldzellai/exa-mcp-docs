# List Monitors - Exa

> **Source:** https://docs.exa.ai/websets/api/monitors/list-monitors  
> **Last Updated:** 2025-07-16T10:35:27.120Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Monitors

List Monitors

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
    
    *   [POST
        
        Create a Monitor
        
        
        
        ](/websets/api/monitors/create-a-monitor)
    *   [GET
        
        Get Monitor
        
        
        
        ](/websets/api/monitors/get-monitor)
    *   [PATCH
        
        Update Monitor
        
        
        
        ](/websets/api/monitors/update-monitor)
    *   [DEL
        
        Delete Monitor
        
        
        
        ](/websets/api/monitors/delete-monitor)
    *   [GET
        
        List Monitors
        
        
        
        ](/websets/api/monitors/list-monitors)
    *   Monitor Runs
        
*   Webhooks
    
*   Events
    

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/monitors \
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
            "type": "company"
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
  "hasMore": true,
  "nextCursor": "<string>"
}
```

GET

/

v0

/

monitors

Try it

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/monitors \
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
            "type": "company"
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

](#parameter-webset-id)

websetId

string

The id of the Webset to list monitors for

#### Response

200 - application/json

List of monitors

The response is of type `object`.

[Delete Monitor](/websets/api/monitors/delete-monitor)[List Monitor Runs](/websets/api/monitors/runs/list-monitor-runs)