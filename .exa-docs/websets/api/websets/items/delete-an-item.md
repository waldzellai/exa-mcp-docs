# Delete an Item - Exa

> **Source:** https://docs.exa.ai/websets/api/websets/items/delete-an-item  
> **Last Updated:** 2025-07-16T10:36:12.109Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Items

Delete an Item

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
        
        *   [GET
            
            Get an Item
            
            
            
            ](/websets/api/websets/items/get-an-item)
        *   [DEL
            
            Delete an Item
            
            
            
            ](/websets/api/websets/items/delete-an-item)
        *   [GET
            
            List all Items for a Webset
            
            
            
            ](/websets/api/websets/items/list-all-items-for-a-webset)
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
curl --request DELETE \
  --url https://api.exa.ai/websets/v0/websets/{webset}/items/{id} \
  --header 'x-api-key: <api-key>'
```

200

Copy

Ask AI

```
{
  "id": "<string>",
  "object": "webset_item",
  "source": "search",
  "sourceId": "<string>",
  "websetId": "<string>",
  "properties": {
    "type": "person",
    "url": "<string>",
    "description": "<string>",
    "person": {
      "name": "<string>",
      "location": "<string>",
      "position": "<string>",
      "company": {
        "name": "<string>",
        "location": "<string>"
      },
      "pictureUrl": "<string>"
    }
  },
  "evaluations": [
    {
      "criterion": "<string>",
      "reasoning": "<string>",
      "satisfied": "yes",
      "references": []
    }
  ],
  "enrichments": [
    {
      "object": "enrichment_result",
      "status": "pending",
      "format": "text",
      "result": [
        "<string>"
      ],
      "reasoning": "<string>",
      "references": [
        {
          "title": "<string>",
          "snippet": "<string>",
          "url": "<string>"
        }
      ],
      "enrichmentId": "<string>"
    }
  ],
  "createdAt": "2023-11-07T05:31:56Z",
  "updatedAt": "2023-11-07T05:31:56Z"
}
```

DELETE

/

v0

/

websets

/

{webset}

/

items

/

{id}

Try it

cURL

cURL

Copy

Ask AI

```
curl --request DELETE \
  --url https://api.exa.ai/websets/v0/websets/{webset}/items/{id} \
  --header 'x-api-key: <api-key>'
```

200

Copy

Ask AI

```
{
  "id": "<string>",
  "object": "webset_item",
  "source": "search",
  "sourceId": "<string>",
  "websetId": "<string>",
  "properties": {
    "type": "person",
    "url": "<string>",
    "description": "<string>",
    "person": {
      "name": "<string>",
      "location": "<string>",
      "position": "<string>",
      "company": {
        "name": "<string>",
        "location": "<string>"
      },
      "pictureUrl": "<string>"
    }
  },
  "evaluations": [
    {
      "criterion": "<string>",
      "reasoning": "<string>",
      "satisfied": "yes",
      "references": []
    }
  ],
  "enrichments": [
    {
      "object": "enrichment_result",
      "status": "pending",
      "format": "text",
      "result": [
        "<string>"
      ],
      "reasoning": "<string>",
      "references": [
        {
          "title": "<string>",
          "snippet": "<string>",
          "url": "<string>"
        }
      ],
      "enrichmentId": "<string>"
    }
  ],
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

[​

](#parameter-id)

id

string

required

The id of the Webset item

#### Response

200 - application/json

Webset Item deleted

The response is of type `object`.

[Get an Item](/websets/api/websets/items/get-an-item)[List all Items for a Webset](/websets/api/websets/items/list-all-items-for-a-webset)