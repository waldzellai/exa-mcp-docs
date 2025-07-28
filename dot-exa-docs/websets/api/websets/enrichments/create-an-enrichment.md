# Create an Enrichment - Exa

> **Source:** https://docs.exa.ai/websets/api/websets/enrichments/create-an-enrichment  
> **Last Updated:** 2025-07-16T10:36:05.779Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Enrichments

Create an Enrichment

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
        
    *   Enrichments
        
        *   [POST
            
            Create an Enrichment
            
            
            
            ](/websets/api/websets/enrichments/create-an-enrichment)
        *   [GET
            
            Get an Enrichment
            
            
            
            ](/websets/api/websets/enrichments/get-an-enrichment)
        *   [DEL
            
            Delete an Enrichment
            
            
            
            ](/websets/api/websets/enrichments/delete-an-enrichment)
        *   [POST
            
            Cancel a running Enrichment
            
            
            
            ](/websets/api/websets/enrichments/cancel-a-running-enrichment)
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
  --url https://api.exa.ai/websets/v0/websets/{webset}/enrichments \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "description": "<string>",
  "format": "text",
  "options": [
    {
      "label": "<string>"
    }
  ],
  "metadata": {}
}'
```

200

Copy

Ask AI

```
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
```

POST

/

v0

/

websets

/

{webset}

/

enrichments

Try it

cURL

cURL

Copy

Ask AI

```
curl --request POST \
  --url https://api.exa.ai/websets/v0/websets/{webset}/enrichments \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "description": "<string>",
  "format": "text",
  "options": [
    {
      "label": "<string>"
    }
  ],
  "metadata": {}
}'
```

200

Copy

Ask AI

```
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

The id or externalId of the Webset

#### Body

application/json

#### Response

200 - application/json

Enrichment created

The response is of type `object`.

[Cancel a running Search](/websets/api/websets/searches/cancel-a-running-search)[Get an Enrichment](/websets/api/websets/enrichments/get-an-enrichment)