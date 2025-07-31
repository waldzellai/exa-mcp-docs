# Overview - Exa

> **Source:** https://docs.exa.ai/websets/api/overview  
> **Last Updated:** 2025-07-31T04:44:46.355Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

API

Overview

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

*   [Key Features](#key-features)
*   [Core Objects](#core-objects)
*   [Next Steps](#next-steps)

The Websets API helps you create your own unique slice of the web by organizing content in containers (`Webset`). These containers store structured results (`WebsetItem`) which are discovered by search agents (`WebsetSearch`) that find web pages matching your specific criteria. Once these items are added to your Webset, they can be further processed with enrichment agents to extract additional data. Whether you’re looking for companies, people, or research papers, each result becomes a structured Item with source content, verification status, and type-specific fields. These Items can be further enriched with enrichments.

## 

[​

](#key-features)

Key Features

At its core, the API is:

*   **Asynchronous**: It’s an async-first API. Searches (`Webset Search`) can take from seconds to minutes, depending on the complexity.
*   **Structured**: Every result (`Webset Item`) includes structured properties, webpage content, and verification against your criteria, with reasoning and references explaining why it matches.
*   **Event-Driven**: Events are published and delivered through webhooks to notify when items are found and when enrichments complete, allowing you to process data as it arrives.

## 

[​

](#core-objects)

Core Objects

![Core concepts diagram showing relationships between Webset, Search, Item and Enrichment objects](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/images/websets/api/core.png)

*   **Webset**: Container that organizes your unique collection of web content and its related searches
*   **Search**: An agent that searches and crawls the web to find precise entities matching your criteria, adding them to your Webset as structured WebsetItems
*   **Item**: A structured result with source content, verification status, and type-specific fields (company, person, research paper, etc.)
*   **Enrichment**: An agent that searches the web to enhance existing WebsetItems with additional structured data

## 

[​

](#next-steps)

Next Steps

*   Follow our [quickstart guide](/websets/api/get-started)
*   Learn more about [how it works](/websets/api/how-it-works)
*   Browse the [API reference](/websets/api/websets/create-a-webset)

[Downloading and Sharing Your Results](/websets/dashboard/walkthroughs/Sharing-and-Downloading-Your-Results)[Get started](/websets/api/get-started)

Assistant

Responses are generated using AI and may contain mistakes.