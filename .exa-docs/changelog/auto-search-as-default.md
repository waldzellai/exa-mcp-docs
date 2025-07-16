# Auto search as Default - Exa

> **Source:** https://docs.exa.ai/changelog/auto-search-as-default  
> **Last Updated:** 2025-07-16T10:32:45.030Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Changelog

Auto search as Default

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

##### Changelog

*   [
    
    Markdown Contents as Default
    
    
    
    ](/changelog/markdown-contents-as-default)
*   [
    
    New Livecrawl Option: Preferred
    
    
    
    ](/changelog/livecrawl-preferred-option)
*   [
    
    Contents Endpoint Status Changes
    
    
    
    ](/changelog/contents-endpoint-status-changes)
*   [
    
    Auto search as Default
    
    
    
    ](/changelog/auto-search-as-default)

On this page

*   [What This Means for You](#what-this-means-for-you)
*   [Quick Example](#quick-example)

* * *

The change to Auto search as default leverages the best of both Exa’s proprietary neural search and industry-standard keyword search to give you the best results. Out of the box, Exa now automatically routes your queries to the best search type.

Read our documentation on Exa’s different search types [here](/reference/exas-capabilities-explained).

## 

[​

](#what-this-means-for-you)

What This Means for You

1.  **Enhanced results**: Auto search automatically routes queries to the most appropriate search type (neural or keyword), optimizing your search results without any extra effort on your part.
2.  **No Action required**: If you want to benefit from Auto search, you don’t need to change anything in your existing implementation. It’ll just work!
3.  **Maintaining current behavior**: If you prefer to keep your current search behavior, here’s how:
    *   For neural search: Just set `type="neural"` in your search requests.
    *   For keyword search: As always, add `type="keyword"` to your search requests.

## 

[​

](#quick-example)

Quick Example

Here’s what this means for your code when default switches over:

Python

Copy

Ask AI

```
# New default behavior (Auto search)
result = exa.search_and_contents("hottest AI startups")

# Explicitly use neural search
result = exa.search_and_contents("hottest AI startups", type="neural")

# Use keyword search
result = exa.search_and_contents("hottest AI startups", type="keyword")
```

We’re confident this update will significantly improve your search experience. If you have any questions or want to chat about how this might impact your specific use case, please reach out to [\[\[email protected\]\]](/cdn-cgi/l/email-protection#90f8f5fcfcffd0f5e8f1bef1f9).

We can’t wait for you to try out the new Auto search as default!

Assistant

Responses are generated using AI and may contain mistakes.

[Contents Endpoint Status Changes](/changelog/contents-endpoint-status-changes)