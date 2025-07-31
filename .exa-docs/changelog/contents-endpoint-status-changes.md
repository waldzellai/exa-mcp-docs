# Contents Endpoint Status Changes - Exa

> **Source:** https://docs.exa.ai/changelog/contents-endpoint-status-changes  
> **Last Updated:** 2025-07-31T04:42:36.567Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

May 2025

Contents Endpoint Status Changes

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

*   [What Changed](#what-changed)
*   [Response Structure](#response-structure)
*   [Status Fields Explained](#status-fields-explained)
*   [How to Update Your Code](#how-to-update-your-code)
*   [Need More Information?](#need-more-information%3F)

* * *

**Date: 22 May 2025** We’ve updated the `/contents` endpoint to provide more granular status information for each URL you request. Instead of returning HTTP error codes directly, the endpoint now includes a `statuses` field that gives you detailed information about each content fetch operation.

The `/contents` endpoint will now only return an error if there’s an internal issue on our end. All other cases are handled through the new `statuses` field.

## 

[​

](#what-changed)

What Changed

Previously, the `/contents` endpoint would return HTTP error codes when content fetching failed. This approach had limitations when multiple URLs failed for different reasons, making it unclear which specific error to return. Now, the endpoint returns a `statuses` field containing individual status information for each URL, allowing you to handle different failure scenarios appropriately.

## 

[​

](#response-structure)

Response Structure

The new response structure includes:

Copy

Ask AI

```
{
  "results": [...],
  "statuses": [
    {
      "id": "https://example.com",
      "status": "success" | "error",
      "error": {
        "tag": "CRAWL_NOT_FOUND" | "CRAWL_TIMEOUT" | "SOURCE_NOT_AVAILABLE" | "CRAWL_UNKNOWN_ERROR",
        "httpStatusCode": 404 | 408 | 403 | 500
      }
    }
  ]
}
```

### 

[​

](#status-fields-explained)

Status Fields Explained

*   **id**: The URL that was requested
*   **status**: Either `"success"` or `"error"`
*   **error** (optional): Only present when status is `"error"`
    *   **tag**: Specific error type
        *   `CRAWL_NOT_FOUND`: Content not found (404)
        *   `CRAWL_TIMEOUT`: Request timed out (408)
        *   `SOURCE_NOT_AVAILABLE`: Access forbidden or source unavailable (403)
        *   `CRAWL_UNKNOWN_ERROR`: Other errors (500+)
    *   **httpStatusCode**: The corresponding HTTP status code

## 

[​

](#how-to-update-your-code)

How to Update Your Code

Instead of catching HTTP errors, you should now check the `statuses` field:

Python

Copy

Ask AI

```
# Old approach (no longer recommended)
try:
    result = exa.get_contents(["https://example.com"])
except HTTPError as e:
    print(f"Error: {e.status_code}")

# New approach
result = exa.get_contents(["https://example.com"])
for status in result.statuses:
    if status.status == "error":
        print(f"Error for {status.id}: {status.error.tag} ({status.error.httpStatusCode})")
```

## 

[​

](#need-more-information%3F)

Need More Information?

If you’d like more information about the status of a crawl or have specific use cases that require additional status details, please contact us at [\[email protected\]](/cdn-cgi/l/email-protection#99f1fcf5f5f6d9fce1f8b7f8f0) with your use case.

[New Livecrawl Option: Preferred](/changelog/livecrawl-preferred-option)[Auto search as Default](/changelog/auto-search-as-default)

Assistant

Responses are generated using AI and may contain mistakes.