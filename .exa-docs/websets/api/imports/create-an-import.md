# Create an Import - Exa

> **Source:** https://docs.exa.ai/websets/api/imports/create-an-import  
> **Last Updated:** 2025-07-31T04:45:01.029Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Imports

Create an Import

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
curl --request POST \
  --url https://api.exa.ai/websets/v0/imports \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "size": 123,
  "count": 123,
  "title": "<string>",
  "format": "csv",
  "metadata": {},
  "entity": {
    "type": "company"
  },
  "csv": {
    "identifier": 1
  }
}'
```

201

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
  "updatedAt": "2023-11-07T05:31:56Z",
  "uploadUrl": "<string>",
  "uploadValidUntil": "<string>"
}
```

POST

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
curl --request POST \
  --url https://api.exa.ai/websets/v0/imports \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '{
  "size": 123,
  "count": 123,
  "title": "<string>",
  "format": "csv",
  "metadata": {},
  "entity": {
    "type": "company"
  },
  "csv": {
    "identifier": 1
  }
}'
```

201

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
  "updatedAt": "2023-11-07T05:31:56Z",
  "uploadUrl": "<string>",
  "uploadValidUntil": "<string>"
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

201 - application/json

Import created successfully

The response to a successful import. Includes the upload URL and the upload valid until date.

[Cancel a running Enrichment](/websets/api/websets/enrichments/cancel-a-running-enrichment)[Get Import](/websets/api/imports/get-import)

Assistant

Responses are generated using AI and may contain mistakes.