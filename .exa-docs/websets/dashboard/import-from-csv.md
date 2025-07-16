# Import from CSV - Exa

> **Source:** https://docs.exa.ai/websets/dashboard/import-from-csv  
> **Last Updated:** 2025-07-16T10:36:29.192Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Dashboard

Import from CSV

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
    
*   Imports
    
*   Monitors
    
*   Webhooks
    
*   Events
    

On this page

*   [Overview](#overview)
*   [How it works](#how-it-works)
*   [CSV preparation](#csv-preparation)
*   [What happens next?](#what-happens-next%3F)
*   [Enrich with custom columns](#enrich-with-custom-columns)
*   [Apply search criteria](#apply-search-criteria)

  

## 

[​

](#overview)

Overview

The Import from CSV feature allows you to transform your existing CSV files containing URLs into fully-functional Websets. This is perfect when you already have a list of websites, companies, or resources that you want to enrich with additional data or apply search criteria to filter.

  

## 

[​

](#how-it-works)

How it works

![](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/images/websets/import-flow.png)

1.  Click “Start from CSV” to select your CSV file
2.  Select which column contains the URLs you want to analyze
3.  Review how your data will be imported before proceeding
4.  Your URLs are transformed into a Webset with enrichments and metadata

  

## 

[​

](#csv-preparation)

CSV preparation

Ensure your CSV file has a URL column

*   For People searches: URLs must be LinkedIn profile URLs (e.g., [https://linkedin.com/in/username](https://linkedin.com/in/username))
*   For Company search: URLs must be company homepage URLs (e.g., [https://example.com](https://example.com))
*   For other searches: use any type of URL

If you do not have URLs, Websets will attempt to infer URLs based on the information in each CSV row and any extra info you provide.

The maximum number of results you can import is determined by your plan.

## 

[​

](#what-happens-next%3F)

What happens next?

Once imported, your CSV becomes a full Webset where you can:

### 

[​

](#enrich-with-custom-columns)

Enrich with custom columns

Add any information you want about each URL:

*   Contact information (emails, phone numbers)
*   Company metrics (revenue, employee count)
*   Content analysis (sentiment, topics, summaries)
*   Custom data specific to your use case

### 

[​

](#apply-search-criteria)

Apply search criteria

Filter your imported URLs based on specific criteria:

*   Company stage or size
*   Industry or sector
*   Geographic location
*   Content type or topic

Assistant

Responses are generated using AI and may contain mistakes.

[Example queries](/websets/dashboard/websets-example-queries)[Exclude Results](/websets/dashboard/exclude-results)