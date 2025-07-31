# List all Items for a Webset - Exa

> **Source:** https://docs.exa.ai/websets/api/websets/items/list-all-items-for-a-webset  
> **Last Updated:** 2025-07-31T04:46:21.862Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Items

List all Items for a Webset

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
curl --request GET \
  --url https://api.exa.ai/websets/v0/websets/{webset}/items \
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
  ],
  "hasMore": true,
  "nextCursor": "<string>"
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

items

Try it

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/websets/{webset}/items \
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
  ],
  "hasMore": true,
  "nextCursor": "<string>"
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

The id or externalId of the Webset

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

default:20

The number of results to return

Required range: `1 <= x <= 100`

[​

](#parameter-source-id)

sourceId

string

The id of the source

#### Response

200 - application/json

Webset Items

The response is of type `object`.

[Delete an Item](/websets/api/websets/items/delete-an-item)[Create a Search](/websets/api/websets/searches/create-a-search)

Assistant

Responses are generated using AI and may contain mistakes.