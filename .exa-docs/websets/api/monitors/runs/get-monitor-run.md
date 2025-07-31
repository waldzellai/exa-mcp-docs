# Get Monitor Run - Exa

> **Source:** https://docs.exa.ai/websets/api/monitors/runs/get-monitor-run  
> **Last Updated:** 2025-07-31T04:45:33.463Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Monitor Runs

Get Monitor Run

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
        
        *   [GET
            
            List Monitor Runs
            
            
            
            ](/websets/api/monitors/runs/list-monitor-runs)
        *   [GET
            
            Get Monitor Run
            
            
            
            ](/websets/api/monitors/runs/get-monitor-run)
*   Webhooks
    
*   Events
    

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/monitors/{monitor}/runs/{id} \
  --header 'x-api-key: <api-key>'
```

200

Copy

Ask AI

```
{
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
}
```

GET

/

v0

/

monitors

/

{monitor}

/

runs

/

{id}

Try it

cURL

cURL

Copy

Ask AI

```
curl --request GET \
  --url https://api.exa.ai/websets/v0/monitors/{monitor}/runs/{id} \
  --header 'x-api-key: <api-key>'
```

200

Copy

Ask AI

```
{
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

](#parameter-monitor)

monitor

string

required

The id of the Monitor to get the run for

[​

](#parameter-id)

id

string

required

#### Response

200 - application/json

Monitor run details

The response is of type `object`.

[List Monitor Runs](/websets/api/monitors/runs/list-monitor-runs)[Create a Webhook](/websets/api/webhooks/create-a-webhook)

Assistant

Responses are generated using AI and may contain mistakes.