# Update Import - Exa

> **Source:** https://docs.exa.ai/websets/api/imports/update-import  
> **Last Updated:** 2025-07-31T04:45:13.834Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Imports

Update Import

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
curl --request PATCH \
  --url https://api.exa.ai/websets/v0/imports/{id} \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "metadata": {},
  "title": "<string>"
}'
```

200

Copy

Ask AI

```
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
```

PATCH

/

v0

/

imports

/

{id}

Try it

cURL

cURL

Copy

Ask AI

```
curl --request PATCH \
  --url https://api.exa.ai/websets/v0/imports/{id} \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "metadata": {},
  "title": "<string>"
}'
```

200

Copy

Ask AI

```
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

](#parameter-id)

id

string

required

The id of the Import

#### Body

application/json

#### Response

200 - application/json

Import updated successfully

The response is of type `object`.

[Get Import](/websets/api/imports/get-import)[Delete Import](/websets/api/imports/delete-import)

Assistant

Responses are generated using AI and may contain mistakes.