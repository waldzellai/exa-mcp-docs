# How It Works - Exa

> **Source:** https://docs.exa.ai/websets/api/how-it-works  
> **Last Updated:** 2025-07-31T04:44:50.675Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

API

How It Works

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
    

On this page

*   [Creating Your First Search](#creating-your-first-search)
*   [1\. Initial Request](#1-initial-request)
*   [2\. Webset Creation](#2-webset-creation)
*   [3\. Search Process](#3-search-process)
*   [Accessing Results](#accessing-results)
*   [Running Additional Searches](#running-additional-searches)
*   [Control Operations](#control-operations)
*   [Up-to-date Websets using Monitors](#up-to-date-websets-using-monitors)
*   [Behavior](#behavior)
*   [Scheduling](#scheduling)
*   [Example: Weekly Monitor for Series A Funded Companies](#example%3A-weekly-monitor-for-series-a-funded-companies)

The Websets API operates as an **asynchronous search system**. When you create a Webset, it automatically starts searching and verifying results based on your criteria. Let’s dive into each part of the process.

* * *

## 

[​

](#creating-your-first-search)

Creating Your First Search

The process starts when you [create a Webset](/websets/api/create-a-webset). Here’s how it flows:

### 

[​

](#1-initial-request)

1\. Initial Request

Start by providing a search configuration:

Copy

Ask AI

```
{
  "search": {
    "query": "AI companies in Europe that raised Series A funding",
    "count": 50
  }
}
```

You can optionally specify:

*   An `entity.type` to define what you’re looking for
*   Custom `criteria` for verification
*   `enrichments` to extract specific data points
*   `metadata` for your own tracking

### 

[​

](#2-webset-creation)

2\. Webset Creation

When your request is received:

1.  A new Webset is created with status `running`
2.  A `webset.created` event is emitted
3.  The search process begins automatically

### 

[​

](#3-search-process)

3\. Search Process

The search flows through several stages:

1.  **Initialization**
    *   A new WebsetSearch is created
    *   Status is set to `running`
    *   `webset.search.created` event is emitted
2.  **Discovery & Verification**
    *   The system starts retrieving results leveraging Exa Search and verifies each one
    *   Items that pass verification and match your search criteria are automatically added to your Webset
    *   Each new item triggers a `webset.item.created` event
    *   Items are immediately available through the [list endpoint](/websets/api/list-all-items-for-a-webset)
3.  **Enrichment** (if configured)
    *   Each item is processed through specified enrichments
    *   `webset.item.enriched` events are emitted as results come in
    *   Enrichment results are added to the item’s data
4.  **Completion**
    *   When the search finds all items, its status changes to `completed`
    *   A `webset.search.completed` event is emitted
    *   If no other operations are running, you’ll receive a `webset.idle` event

### 

[​

](#accessing-results)

Accessing Results

You can access your data throughout the process:

1.  **Real-time Access**
    *   Use the list endpoint to paginate through items
    *   Listen for item events (`webset.item.created` and `webset.item.enriched`) to process results as they arrive
2.  **Bulk Export**
    *   Available once the Webset becomes `idle`
    *   Includes all items with their content, verifications and enrichments
    *   Useful for processing the complete dataset

  

* * *

  

## 

[​

](#running-additional-searches)

Running Additional Searches

You can [create additional searches](/websets/api/create-a-search) on the same Webset at any time. Each new search:

*   Follows the same event flow as the initial search
*   Can run in parallel with other enrichment operations (not other searches for now)
*   Maintains its own progress tracking
*   Contributes to the overall Webset state

### 

[​

](#control-operations)

Control Operations

Manage your searches with:

*   [Cancel specific searches](/websets/api/cancel-a-running-search)
*   [Cancel all operations](/websets/api/cancel-a-running-webset)

  

* * *

  

## 

[​

](#up-to-date-websets-using-monitors)

Up-to-date Websets using Monitors

**[Monitors](/websets/api/monitors/create-a-monitor)** allow you to automatically keep your Websets updated with fresh data on a schedule, creating a continuous flow of updates without manual intervention.

### 

[​

](#behavior)

Behavior

*   **Search behavior**: Automatically run new searches to find fresh content matching your criteria. New items are added to your Webset with automatic deduplication.
*   **Refresh behavior**: Update existing items by refreshing their content from source URLs or re-running specific enrichments to capture data changes.

### 

[​

](#scheduling)

Scheduling

Set your update frequency with:

*   **Cron Expression**: A valid Unix cron expression with 5 fields that triggers at most once per day
*   **Timezone**: Any IANA timezone (defaults to `Etc/UTC`)

### 

[​

](#example%3A-weekly-monitor-for-series-a-funded-companies)

Example: Weekly Monitor for Series A Funded Companies

Copy

Ask AI

```
{
  "websetId": "ws_abc123",
  "cadence": {
    "cron": "0 9 * * 1",
    "timezone": "America/New_York"
  },
  "behavior": {
    "type": "search",
    "config": {
      "parameters": {
        "query": "AI startups that raised Series A funding in the last week",
        "count": 10,
        "criteria": [
          { "description": "Company is an AI startup" },
          {
            "description": "Company has raised Series A funding in the last week"
          }
        ],
        "entity": { "type": "company" },
        "behavior": "append"
      }
    }
  }
}
```

[Get started](/websets/api/get-started)[Create a Webset](/websets/api/websets/create-a-webset)

Assistant

Responses are generated using AI and may contain mistakes.