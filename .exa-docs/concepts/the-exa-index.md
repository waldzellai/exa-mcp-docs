# The Exa Index - Exa

> **Source:** https://docs.exa.ai/reference/the-exa-index  
> **Last Updated:** 2025-07-16T10:34:39.331Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Concepts

The Exa Index

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

* * *

There are many types of content, and we’re constantly discovering new things to search for as well. If there’s anything you want to be more highly covered, just reach out to [\[email protected\]](/cdn-cgi/l/email-protection#93fbf6fffffcd3f6ebf2bdf2fa). See the following table for a high level overview of what is available in our index:

Category

Availability in Exa Index

Description

Example prompt link

Research papers

Very High

Offer semantic search over a very vast index of papers, enabling sophisticated, multi-layer and complex filtering for use cases

[If you’re looking for the most helpful academic paper on “embeddings for document retrieval”, check this out (pdf:](https://search.exa.ai/search?q=If+you%27re+looking+for+the+most+helpful+academic+paper+on+%22embeddings+for+document+retrieval%22&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22resolvedSearchType%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%7D&resolvedSearchType=neural)

Personal pages

Very High

Excels at finding personal pages, which are often extremely hard/impossible to find on services like Google

[Here is a link to the best life coach for when you’re unhappy at work:](https://exa.ai/search?q=Here%20is%20a%20link%20to%20the%20best%20life%20coach%20for%20when%20you%27re%20unhappy%20at%20work%3A&c=personal%20site&filters=%7B%22numResults%22%3A30%2C%22useAutoprompt%22%3Afalse%2C%22domainFilterType%22%3A%22include%22%7D)

Wikipedia

Very High

Covers all of Wikipedia, providing comprehensive access to this vast knowledge base via semantic search

[Here is a Wikipedia page about a Roman emperor:](https://search.exa.ai/search?q=Here+is+a+Wikipedia+page+about+a+Roman+emperor%3A&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D&resolvedSearchType=neurall)

News

Very High

Includes a wide, robust index of web news sources, providing coverage of current events

[Here is news about war in the Middle East:](https://exa.ai/search?q=Here+is+news+about+war+in+the+Middle+East%3A&c=personal+site&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22auto%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%2C%22startPublishedDate%22%3A%222024-10-29T01%3A45%3A46.055Z%22%7D&resolvedSearchType=keyword)

LinkedIn profiles

_Very High (US+EU)_

Will provide extensive coverage of LinkedIn personal profiles, allowing for detailed professional information searches

b[est theoretical computer scientist at uc berkeley](https://exa.ai/search?q=best+theoretical+computer+scientist+at+uc+berkeley&c=linkedin+profile&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Atrue%2C%22resolvedSearchType%22%3A%22neural%22%7D&autopromptString=A+leading+theoretical+computer+scientist+at+UC+Berkeley.&resolvedSearchType=neural)

LinkedIn company pages

_Coming Soon_

Will offer comprehensive access to LinkedIn company pages, enabling in-depth research on businesses and organization

(Best-practice example TBC)

Company home-pages

Very High

Wide index of companies covered; also available are curated, customized company datasets - reach out to learn more

[Here is the homepage of a company working on making space travel cheaper:](https://search.exa.ai/search?q=Here+is+the+homepage+of+a+company+working+on+making+space+travel+cheaper%3A&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D&resolvedSearchType=neural)

Financial Reports

Very High

Includes SEC 10k financial reports and information from other finance sources like Yahoo Finance.

[Here is a source on Apple’s revenue growth rate over the past years:](https://exa.ai/search?q=Here+is+a+source+on+Apple%27s+revenue+growth+rate+over+the+past+years%3A&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22startPublishedDate%22%3A%222023-11-18T22%3A35%3A50.022Z%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D&resolvedSearchType=neural)

GitHub repos

High

Indexes open source code (which the Exa team use frequently!)

[Here’s a Github repo if you want to convert OpenAPI specs to Rust code:](https://exa.ai/search?q=Here%27s+a+Github+repo+if+you+want+to+convert+OpenAPI+specs+to+Rust+code%3A&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D&resolvedSearchType=neural)

Blogs

High

Excels at finding high quality reading material, particularly useful for niche topics

[If you’re a huge fan of Japandi decor, you’d love this blog:](https://exa.ai/search?q=If+you%27re+a+huge+fan+of+Japandi+decor%2C+you%27d+love+this+blog%3A&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D&resolvedSearchType=neural)

Places and things

High

Covers a wide range of entities including hospitals, schools, restaurants, appliances, and electronics

[Here is a high-rated Italian restaurant in downtown Chicago:](https://exa.ai/search?q=Here+is+a+high-rated+Italian+restaurant+in+downtown+Chicago%3A&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D&resolvedSearchType=neural)

Legal and policy sources

High

Strong coverage of legal and policy information, (e.g., including sources like CPUC, Justia, Findlaw, etc.)

[Here is a common law case in california on marital property rights:](https://search.exa.ai/search?q=Here+is+a+common+law+case+in+california+on+marital+property+rights%3A&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22includeDomains%22%3A%5B%22law.justia.com%22%5D%2C%22resolvedSearchType%22%3A%22neural%22%7D&resolvedSearchType=neural)

Government and international organization sources

High

Includes content from sources like the IMF and CDC amongst others

[Here is a recent World Health Organization site on global vaccination rates:](https://exa.ai/search?q=Here+is+a+recent+World+Health+Organization+site+on+global+vaccination+rates%3A&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22startPublishedDate%22%3A%222023-11-18T22%3A35%3A50.022Z%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D&resolvedSearchType=neural)

Events

Moderate

Reasonable coverage of events in major municipalities, suggesting room for improvement

[Here is an AI hackathon in SF:](https://search.exa.ai/search?q=Here+is+an+AI+hackathon+in+SF&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22exclude%22%2C%22type%22%3A%22neural%22%2C%22startPublishedDate%22%3A%222024-07-02T23%3A36%3A15.511Z%22%2C%22useAutoprompt%22%3Afalse%2C%22endPublishedDate%22%3A%222024-07-09T23%3A36%3A15.511Z%22%2C%22excludeDomains%22%3A%5B%22twitter.com%22%5D%2C%22resolvedSearchType%22%3A%22neural%22%7D&resolvedSearchType=neural)

Jobs

Moderate

Can find some job listings

[If you’re looking for a software engineering job at a small startup working on an important mission, check out](https://search.exa.ai/search?q=If+you%27re+looking+for+a+software+engineering+job+at+a+small+startup+working+on+an+important+mission%2C+check+out&filters=%7B%22numResults%22%3A30%2C%22domainFilterType%22%3A%22include%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Afalse%2C%22resolvedSearchType%22%3A%22neural%22%7D&resolvedSearchType=neural)

Assistant

Responses are generated using AI and may contain mistakes.

[How Exa Search Works](/reference/how-exa-search-works)[Contents retrieval with Exa API](/reference/contents-retrieval-with-exa-api)