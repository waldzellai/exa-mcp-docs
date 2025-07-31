# New Livecrawl Option: Preferred - Exa

> **Source:** https://docs.exa.ai/changelog/livecrawl-preferred-option  
> **Last Updated:** 2025-07-31T04:42:38.720Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

June 2025

New Livecrawl Option: Preferred

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

##### July 2025

*   [
    
    Geolocation Filter Support
    
    
    
    ](/changelog/geolocation-filter-support)
*   [
    
    New Fast Search Type
    
    
    
    ](/changelog/new-fast-search-type)
*   [
    
    Score Deprecation in Auto and Keyword Search
    
    
    
    ](/changelog/auto-keyword-score-deprecation)

##### June 2025

*   [
    
    Markdown Contents as Default
    
    
    
    ](/changelog/markdown-contents-as-default)
*   [
    
    New Livecrawl Option: Preferred
    
    
    
    ](/changelog/livecrawl-preferred-option)

##### May 2025

*   [
    
    Contents Endpoint Status Changes
    
    
    
    ](/changelog/contents-endpoint-status-changes)
*   [
    
    Auto search as Default
    
    
    
    ](/changelog/auto-search-as-default)

On this page

*   [What’s New](#what%E2%80%99s-new)
*   [How It Differs from “Always”](#how-it-differs-from-%E2%80%9Calways%E2%80%9D)
*   [When to Use “Preferred”](#when-to-use-%E2%80%9Cpreferred%E2%80%9D)
*   [Complete Livecrawl Options Overview](#complete-livecrawl-options-overview)
*   [Migration Guide](#migration-guide)

* * *

**Date: 7 June 2025** We’ve added a new `livecrawl` option called `"preferred"` that provides a more resilient approach to content fetching. This option attempts to crawl fresh content but gracefully falls back to cached results when live crawling fails.

The `preferred` option is now available in both `/contents` and `/search_and_contents` endpoints.

## 

[​

](#what%E2%80%99s-new)

What’s New

The new `livecrawl: "preferred"` option provides intelligent fallback behavior:

*   **First**: Attempts to crawl fresh content from the live webpage
*   **If crawling succeeds**: Returns the fresh, up-to-date content
*   **If crawling fails but cached content exists**: Returns cached content instead of failing
*   **If crawling fails and no cached content exists**: Returns the crawl error

## 

[​

](#how-it-differs-from-%E2%80%9Calways%E2%80%9D)

How It Differs from “Always”

The key difference between `"preferred"` and `"always"`:

Option

Crawl Fails + Cache Available

Crawl Fails + No Cache

`"preferred"`

Returns cached content

Returns crawl error

`"always"`

Returns crawl error

Returns crawl error

This makes `"preferred"` more resilient for production applications where you want fresh content when possible, but don’t want requests to fail when websites are temporarily unavailable. If content freshness is critical and you want nothing else, then using `"always"` might be better.

## 

[​

](#when-to-use-%E2%80%9Cpreferred%E2%80%9D)

When to Use “Preferred”

The `"preferred"` option is ideal when:

*   You want the freshest content available but need reliability
*   Building production applications that can’t afford to fail on crawl errors
*   Content freshness is important but not critical enough to fail the request
*   You’re crawling websites that might be occasionally unavailable

## 

[​

](#complete-livecrawl-options-overview)

Complete Livecrawl Options Overview

Here are all four livecrawl options and their behaviors:

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

Maximum speed

## 

[​

](#migration-guide)

Migration Guide

If you’re currently using `livecrawl: "always"` but experiencing reliability issues:

Copy

Ask AI

```
# Before - fails when crawling fails
result = exa.get_contents(urls, livecrawl="always")

# After - more resilient with cache fallback
result = exa.get_contents(urls, livecrawl="preferred")
```

This change maintains your preference for fresh content while improving reliability.

[Markdown Contents as Default](/changelog/markdown-contents-as-default)[Contents Endpoint Status Changes](/changelog/contents-endpoint-status-changes)

Assistant

Responses are generated using AI and may contain mistakes.