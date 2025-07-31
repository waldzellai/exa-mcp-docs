# List Imports - Exa

> **Source:** https://docs.exa.ai/websets/api/imports/list-imports  
> **Last Updated:** 2025-07-31T04:45:08.446Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Imports

List Imports

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
    
    *   [POST
        
        Create an Import
        
        
        
        ](/websets/api/imports/create-an-import)
    *   [GET
        
        Get Import
        
        
        
        ](/websets/api/imports/get-import)
    *   [PATCH
        
        Update Import
        
        
        
        ](/websets/api/imports/update-import)
    *   [DEL
        
        Delete Import
        
        
        
        ](/websets/api/imports/delete-import)
    *   [GET
        
        List Imports
        
        
        
        ](/websets/api/imports/list-imports)
*   Monitors
    
*   Webhooks
    
*   Events
    

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/imports \
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
      "object": "import",
      "status": "pending",
      "format": "csv",
      "entity": {
        "type": "company"
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
  "hasMore": true,
  "nextCursor": "<string>"
}
```

GET

/

v0

/

imports

Try it

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/imports \
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
      "object": "import",
      "status": "pending",
      "format": "csv",
      "entity": {
        "type": "company"
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

#### Response

200 - application/json

List of imports

The response is of type `object`.

[Delete Import](/websets/api/imports/delete-import)[Create a Monitor](/websets/api/monitors/create-a-monitor)

Assistant

Responses are generated using AI and may contain mistakes.