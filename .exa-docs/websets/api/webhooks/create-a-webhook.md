# Create a Webhook - Exa

> **Source:** https://docs.exa.ai/websets/api/webhooks/create-a-webhook  
> **Last Updated:** 2025-07-31T04:45:38.288Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Webhooks

Create a Webhook

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
curl --request POST \
  --url https://api.exa.ai/websets/v0/webhooks \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "events": [
    "webset.created"
  ],
  "url": "<string>",
  "metadata": {}
}'
```

200

Copy

Ask AI

```
{
  "id": "<string>",
  "object": "webhook",
  "status": "active",
  "events": [
    "webset.created"
  ],
  "url": "<string>",
  "secret": "<string>",
  "metadata": {},
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

POST

/

v0

/

webhooks

Try it

cURL

cURL

Copy

Ask AI

```
curl --request POST \
  --url https://api.exa.ai/websets/v0/webhooks \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "events": [
    "webset.created"
  ],
  "url": "<string>",
  "metadata": {}
}'
```

200

Copy

Ask AI

```
{
  "id": "<string>",
  "object": "webhook",
  "status": "active",
  "events": [
    "webset.created"
  ],
  "url": "<string>",
  "secret": "<string>",
  "metadata": {},
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

#### Body

application/json

#### Response

200 - application/json

Webhook

The response is of type `object`.

[Get Monitor Run](/websets/api/monitors/runs/get-monitor-run)[Get a Webhook](/websets/api/webhooks/get-a-webhook)

Assistant

Responses are generated using AI and may contain mistakes.