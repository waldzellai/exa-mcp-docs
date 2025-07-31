# Event Types - Exa

> **Source:** https://docs.exa.ai/websets/api/events/types  
> **Last Updated:** 2025-07-31T04:44:57.681Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Events

Event Types

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
    
*   Events
    
    *   [
        
        Types
        
        
        
        ](/websets/api/events/types)
    *   [GET
        
        List all Events
        
        
        
        ](/websets/api/events/list-all-events)
    *   [GET
        
        Get an Event
        
        
        
        ](/websets/api/events/get-an-event)

On this page

*   [Webset](#webset)
*   [Search](#search)
*   [Item](#item)
*   [Import](#import)

The Websets API uses events to notify you about changes in your Websets. You can monitor these events through our [events endpoint](/websets/api/events/list-all-events) or by setting up [webhooks](/websets/api/webhooks/create-a-webhook).

## 

[​

](#webset)

Webset

*   `webset.created` - Emitted when a new Webset is created.
*   `webset.deleted` - Emitted when a Webset is deleted.
*   `webset.paused` - Emitted when a Webset’s operations are paused.
*   `webset.idle` - Emitted when a Webset has no running operations.

## 

[​

](#search)

Search

*   `webset.search.created` - Emitted when a new search is initiated.
*   `webset.search.updated` - Emitted when search progress is updated.
*   `webset.search.completed` - Emitted when a search finishes finding all items.
*   `webset.search.canceled` - Emitted when a search is manually canceled.

## 

[​

](#item)

Item

*   `webset.item.created` - Emitted when a new item has been added to the Webset.
*   `webset.item.enriched` - Emitted when an item’s enrichment is completed.

## 

[​

](#import)

Import

*   `import.created` - Emitted when a new import is initiated.
*   `import.completed` - Emitted when an import has been completed.

Each event includes:

*   A unique `id`
*   The event `type`
*   A `data` object containing the full resource that triggered the event
*   A `createdAt` timestamp

You can use these events to:

*   Track the progress of searches and enrichments
*   Build real-time dashboards
*   Trigger workflows when new items are found
*   Monitor the status of your exports

[Verifying Signatures](/websets/api/webhooks/verifying-signatures)[List all Events](/websets/api/events/list-all-events)

Assistant

Responses are generated using AI and may contain mistakes.