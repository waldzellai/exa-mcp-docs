# Update a Webhook - Exa

> **Source:** https://docs.exa.ai/websets/api/webhooks/update-a-webhook  
> **Last Updated:** 2025-07-16T10:35:44.104Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Webhooks

Update a Webhook

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
curl --request PATCH \
  --url https://api.exa.ai/websets/v0/webhooks/{id} \
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

404

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

PATCH

/

v0

/

webhooks

/

{id}

Try it

cURL

cURL

Copy

Ask AI

```
curl --request PATCH \
  --url https://api.exa.ai/websets/v0/webhooks/{id} \
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

404

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

The id of the webhook

#### Body

application/json

#### Response

200

200404

application/json

Webhook

The response is of type `object`.

[Get a Webhook](/websets/api/webhooks/get-a-webhook)[Delete a Webhook](/websets/api/webhooks/delete-a-webhook)