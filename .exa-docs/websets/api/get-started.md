# Get started - Exa

> **Source:** https://docs.exa.ai/websets/api/get-started  
> **Last Updated:** 2025-07-31T04:44:48.481Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

API

Get started

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

*   [Create and setup your API key](#create-and-setup-your-api-key)
*   [Create a .env file](#create-a-env-file)
*   [Make an API request](#make-an-api-request)
*   [What’s next?](#what%E2%80%99s-next%3F)

## 

[​

](#create-and-setup-your-api-key)

Create and setup your API key

1.  Go to the [Exa Dashboard](https://dashboard.exa.ai)
2.  Click on “API Keys” in the left sidebar
3.  Click “Create API Key”
4.  Give your key a name and click “Create”
5.  Copy your API key and store it securely - you won’t be able to see it again!

[

## Get your Exa API key





](https://dashboard.exa.ai/api-keys)  

## 

[​

](#create-a-env-file)

Create a .env file

Create a file called `.env` in the root of your project and add the following line.

Copy

Ask AI

```
EXA_API_KEY=your api key without quotes
```

  

## 

[​

](#make-an-api-request)

Make an API request

Use our Python or JavaScript SDKs, or call the API directly with cURL.

*   Python
*   JavaScript
*   cURL

Install the latest version of the python SDK with pip. If you want to store your API key in a `.env` file, make sure to install the dotenv library.

Copy

Ask AI

```
pip install exa-py
pip install python-dotenv
```

Create a file called `webset.py` and add the code below:

python

Copy

Ask AI

```
from exa_py import Exa
from dotenv import load_dotenv
from exa_py.websets.types import CreateWebsetParameters, CreateEnrichmentParameters

import os

load_dotenv()
exa = Exa(os.getenv('EXA_API_KEY'))

# Create a Webset with search and enrichments
webset = exa.websets.create(
    params=CreateWebsetParameters(
        search={
            "query": "Top AI research labs focusing on large language models",
            "count": 5
        },
        enrichments=[
            CreateEnrichmentParameters(
                description="LinkedIn profile of VP of Engineering or related role",
                format="text",
            ),
        ],
    )
)

print(f"Webset created with ID: {webset.id}")

# Wait until Webset completes processing
webset = exa.websets.wait_until_idle(webset.id)

# Retrieve Webset Items
items = exa.websets.items.list(webset_id=webset.id)
for item in items.data:
    print(f"Item: {item.model_dump_json(indent=2)}")
```

* * *

## 

[​

](#what%E2%80%99s-next%3F)

What’s next?

*   Learn [how Websets work](/websets/api/how-it-works) and understand the event-driven process
*   Configure [Monitors](/websets/api/monitors/create-a-monitor) to automatically receive continuous updates for your Websets
*   Configure [webhooks](/websets/api/webhooks) to receive real-time updates as items are added into your Websets
*   Learn about [Enrichments](/websets/api/websets/enrichments) to extract specific data points
*   See how to [Manage Items](/websets/api/websets/items) in your Webset

[Overview](/websets/api/overview)[How It Works](/websets/api/how-it-works)

Assistant

Responses are generated using AI and may contain mistakes.