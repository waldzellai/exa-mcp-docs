# Exa LiveCrawl - Exa

> **Source:** https://docs.exa.ai/reference/should-we-use-livecrawl  
> **Last Updated:** 2025-07-31T04:44:26.692Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Concepts

Exa LiveCrawl

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
    
    
    
    ](/reference/getting-started)
*   [
    
    Quickstart
    
    
    
    ](/reference/quickstart)

##### API Reference

*   [POST
    
    Search
    
    
    
    ](/reference/search)
*   [POST
    
    Get contents
    
    
    
    ](/reference/get-contents)
*   [POST
    
    Find similar links
    
    
    
    ](/reference/find-similar-links)
*   [POST
    
    Answer
    
    
    
    ](/reference/answer)
*   Research
    
*   [
    
    Websets
    
    
    
    ](/websets/api/overview)
*   [
    
    OpenAPI Specification
    
    
    
    ](/reference/openapi-spec)

##### RAG Quick Start Guide

*   [
    
    RAG with Exa and OpenAI
    
    
    
    ](/reference/rag-quickstart)
*   [
    
    RAG with LangChain
    
    
    
    ](/reference/langchain)
*   [
    
    OpenAI Exa Wrapper
    
    
    
    ](/reference/openai)
*   [
    
    CrewAI agents with Exa
    
    
    
    ](/reference/crewai)
*   [
    
    RAG with LlamaIndex
    
    
    
    ](/reference/llamaindex)
*   [
    
    Tool calling with GPT
    
    
    
    ](/reference/tool-calling-with-gpt4o)
*   [
    
    Tool calling with Claude
    
    
    
    ](/reference/tool-calling-with-claude)
*   [
    
    OpenAI Chat Completions
    
    
    
    ](/reference/chat-completions)
*   [
    
    OpenAI Responses API
    
    
    
    ](/reference/openai-responses-api-with-exa)

##### Concepts

*   [
    
    How Exa Search Works
    
    
    
    ](/reference/how-exa-search-works)
*   [
    
    The Exa Index
    
    
    
    ](/reference/the-exa-index)
*   [
    
    Contents retrieval with Exa API
    
    
    
    ](/reference/contents-retrieval-with-exa-api)
*   [
    
    Exa's Capabilities Explained
    
    
    
    ](/reference/exas-capabilities-explained)
*   [
    
    Crawling Subpages with Exa
    
    
    
    ](/reference/crawling-subpages-with-exa)
*   [
    
    Exa LiveCrawl
    
    
    
    ](/reference/should-we-use-livecrawl)
*   [
    
    Exa Research
    
    
    
    ](/reference/exa-research)
*   [
    
    FAQs
    
    
    
    ](/reference/faqs)

##### Admin

*   [
    
    Setting Up and Managing Your Team
    
    
    
    ](/reference/setting-up-team)
*   [
    
    Rate Limits
    
    
    
    ](/reference/rate-limits)
*   [
    
    Enterprise Documentation & Security
    
    
    
    ](/reference/security)

On this page

*   [Using LiveCrawl](#using-livecrawl)
*   [Complete LiveCrawl Options Overview](#complete-livecrawl-options-overview)
*   [When LiveCrawl Isn’t Necessary](#when-livecrawl-isn%E2%80%99t-necessary)

* * *

With Exa, we can already search the web using LLMs. However, by default, we cache all of our links to bias for the fastest response possible. You may be interested in the live version of the page, which our `livecrawl` parameter can help with.

## 

[​

](#using-livecrawl)

Using LiveCrawl

LiveCrawl becomes essential when you need the most up-to-date contents from a URL. Here are some examples:

1.  **Company News**: If you’re tracking Apple’s latest releases, you may be looking for a live view of their homepage’s contentes:

Python

Copy

Ask AI

```
result = exa.get_contents(
  ["https://www.apple.com"],
  livecrawl="always"
)
```

Output without LiveCrawl: Results here are slightly dated, mentioning a fall release (later in the year)

Shell

Copy

Ask AI

```
{
  "results": [
    {
      "id": "https://www.apple.com",
      "url": "https://www.apple.com/",
      "title": "Apple",
      "author": "",
      "text": "Apple Footer\n 1. Apple Intelligence will be available in beta on iPhone 15 Pro, iPhone 15 Pro Max, and iPad and Mac with M1 and later, with Siri and device language set to U.S. English, as part of iOS 18, iPadOS 18, and macOS Sequoia this fall.\n 2. Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit. You must be at least 18 years old to be eligible to trade in for credit or for an Apple Gift Card. Trade-in value may be applied toward qualifying new device purchase, or added to an Apple Gift Card. Actual value awarded is based on receipt of a qualifying device matching the description provided when estimate was made. Sales tax may be assessed on full value of a new device purchase. In-store trade-in requires presentation of a valid photo ID (local law may require saving this information). Offer may not be available in all stores, and may vary between in-store and online trade-in. Some stores may have additional requirements. Apple or its trade-in partners reserve the right to refuse or limit quantity of any trade-in transaction for any reason. More details are available from Apple's trade-in partner for trade-in and recycling of eligible devices. Restrictions and limitations may apply. \nA subscription is required for Apple TV+.\nAvailable in the U.S. on apple.com, in the Apple Store app, and at Apple Stores.\nTo access and use all Apple Card features and products available only to Apple Card users, you must add Apple Card to Wallet on an iPhone or iPad that supports and has the latest version of iOS or iPadOS. Apple Card is subject to credit approval, available only for qualifying applicants in the United States, and issued by Goldman Sachs Bank USA, Salt Lake City Branch. \nIf you reside in the U.S. territories, please call Goldman Sachs at 877-255-5923 with questions about Apple Card.\nLearn more about how Apple Card applications are evaluated at support.apple.com/kb/HT209218.\n A subscription is required for Apple TV+. \n Major League Baseball trademarks and copyrights are used with permission of MLB Advanced Media, L.P. All rights reserved. \n A subscription is required for Apple Arcade, Apple Fitness+, and Apple Music. \nApple Store\n Find a Store \n Genius Bar \n Today at Apple \n Group Reservations \n Apple Camp \n Apple Store App \n Certified Refurbished \n Apple Trade In \n Financing \n Carrier Deals at Apple \n Order Status \n Shopping Help",
      "image": "https://www.apple.com/ac/structured-data/images/open_graph_logo.png?202110180743"
    }
  ],
  "requestId": "f60d0828916fb43401ed90cd3c11dd59"
}
```

Output with LiveCrawl (as at Oct 30 2024): Now we see contents talking about Apple’s upcoming specific release on November 11th

Shell

Copy

Ask AI

```
{
  "results": [
    {
      "id": "https://www.apple.com",
      "url": "https://www.apple.com",
      "title": "Apple",
      "author": "",
      "publishedDate": "2024-10-30T16:34:14.000Z",
      "text": "Apple Intelligence is here.\nExperience it now on the latest iPhone, iPad, and Mac models with a free software update.1 \nMacBook Pro\nA work of smart.\nAvailable starting 11.8\n Hello, Apple Intelligence. \nApple Intelligence is here.\nExperience it now on the latest iPhone, iPad, and Mac models with a free software update.1 \nMac mini\nSize down. Power up.\nAvailable starting 11.8\n Hello, Apple Intelligence. \nApple Intelligence is here.\nExperience it now on the latest iPhone, iPad, and Mac models with a free software update.1 \niMac\nBril l l l l liant.\nAvailable starting 11.8\n Hello, Apple Intelligence. \niPhone 16 Pro\nHello, Apple Intelligence.\niPhone 16\nHello, Apple Intelligence.\nAirPods Pro 2\nHearing Test, Hearing Aid, and Hearing Protection features in a free software update.2\n Apple Intelligence \nAI for the rest of us.\n Apple Trade In \nGet $180-$650 in credit when you trade in iPhone 12 or higher.3 \n Apple Card \nGet up to 3% Daily Cash back with every purchase.\nApple TV+\nFAM Gallery",
      "image": "https://www.apple.com/ac/structured-data/images/open_graph_logo.png?202110180743"
    }
  ],
  "requestId": "fdb7df2ef400b5994b0c5a855875cdce"
}
```

2.  **Preferred LiveCrawl**: For production applications that need fresh content but require reliability:

Python

Copy

Ask AI

```
result = exa.get_contents(
  ["https://www.apple.com"],
  livecrawl="preferred"
)
```

This will try to get the freshest content available, but if live crawling fails (due to website downtime, network issues, etc.), it falls back to cached content instead of failing entirely. This makes it ideal for production applications.

3.  **Product Launches**: Tracking new releases or price changes
4.  **Event Coverage**: Live events like conferences or sports
5.  **Social Media Trends**: To stay updated on the latest trends or viral content

`livecrawl:'always'` ensures you’re working with the freshest data available, though it may take slightly longer than using cached results. `livecrawl:'preferred'` tries to crawl fresh content first, but falls back to cached content if crawling fails. This provides the best balance of freshness and reliability. `livecrawl:'never'` means that you will always get cached results. `livecrawl:'fallback'` means that Exa will livecrawl results if its not available in cache (for keyword search).

## 

[​

](#complete-livecrawl-options-overview)

Complete LiveCrawl Options Overview

Here are all livecrawl options and their behaviors:

Option

Crawl Behavior

Cache Fallback

Best For

`"always"`

Always crawls

Never falls back

Critical real-time data, willing to accept failures

`"preferred"`

Always crawls

Falls back on crawl failure

Fresh content with reliability

`"fallback"`

Only if no cache

Uses cache first

Balanced speed and freshness

`"never"`

Never crawls

Always uses cache

Maximum speed, static content

## 

[​

](#when-livecrawl-isn%E2%80%99t-necessary)

When LiveCrawl Isn’t Necessary

Cached data is sufficient for many queries, especially for historical topics like “What were the major causes of World War II?” or educational content such as “How does photosynthesis work?” These subjects rarely change, so reliable cached results can provide accurate information quickly. \`

[Crawling Subpages with Exa](/reference/crawling-subpages-with-exa)[Exa Research](/reference/exa-research)

Assistant

Responses are generated using AI and may contain mistakes.