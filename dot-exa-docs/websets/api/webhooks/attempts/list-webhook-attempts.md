# List webhook attempts - Exa

> **Source:** https://docs.exa.ai/websets/api/webhooks/attempts/list-webhook-attempts  
> **Last Updated:** 2025-07-16T10:35:48.521Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Webhooks

List webhook attempts

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
    
    *   [POST
        
        Create a Webhook
        
        
        
        ](/websets/api/webhooks/create-a-webhook)
    *   [GET
        
        Get a Webhook
        
        
        
        ](/websets/api/webhooks/get-a-webhook)
    *   [PATCH
        
        Update a Webhook
        
        
        
        ](/websets/api/webhooks/update-a-webhook)
    *   [DEL
        
        Delete a Webhook
        
        
        
        ](/websets/api/webhooks/delete-a-webhook)
    *   [GET
        
        List webhooks
        
        
        
        ](/websets/api/webhooks/list-webhooks)
    *   [GET
        
        List webhook attempts
        
        
        
        ](/websets/api/webhooks/attempts/list-webhook-attempts)
    *   [
        
        Verifying Signatures
        
        
        
        ](/websets/api/webhooks/verifying-signatures)
*   Events
    

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/webhooks/{id}/attempts \
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
      "object": "webhook_attempt",
      "eventId": "<string>",
      "eventType": "webset.created",
      "webhookId": "<string>",
      "url": "<string>",
      "successful": true,
      "responseHeaders": {},
      "responseBody": "<string>",
      "responseStatusCode": 123,
      "attempt": 123,
      "attemptedAt": "2023-11-07T05:31:56Z"
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

webhooks

/

{id}

/

attempts

Try it

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/webhooks/{id}/attempts \
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
      "object": "webhook_attempt",
      "eventId": "<string>",
      "eventType": "webset.created",
      "webhookId": "<string>",
      "url": "<string>",
      "successful": true,
      "responseHeaders": {},
      "responseBody": "<string>",
      "responseStatusCode": 123,
      "attempt": 123,
      "attemptedAt": "2023-11-07T05:31:56Z"
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

#### Path Parameters

[​

](#parameter-id)

id

string

required

The ID of the webhook

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

](#parameter-event-type)

eventType

enum<string>

The type of event to filter by

Available options:

`webset.created`,

`webset.deleted`,

`webset.paused`,

`webset.idle`,

`webset.search.created`,

`webset.search.canceled`,

`webset.search.completed`,

`webset.search.updated`,

`import.created`,

`import.completed`,

`import.processing`,

`webset.item.created`,

`webset.item.enriched`,

`webset.export.created`,

`webset.export.completed`

[​

](#parameter-successful)

successful

boolean

Filter attempts by their success status

#### Response

200 - application/json

List of webhook attempts

The response is of type `object`.

[List webhooks](/websets/api/webhooks/list-webhooks)[Verifying Signatures](/websets/api/webhooks/verifying-signatures)