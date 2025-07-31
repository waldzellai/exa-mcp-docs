# Websets News Monitor - Exa

> **Source:** https://docs.exa.ai/examples/demo-websets-news-monitor  
> **Last Updated:** 2025-07-16T10:33:00.155Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Live Demos

Websets News Monitor

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

##### Live Demos

*   [
    
    Exa MCP
    
    
    
    ](/examples/exa-mcp)
*   [
    
    Websets News Monitor
    
    
    
    ](/examples/demo-websets-news-monitor)
*   [
    
    Hallucination Detector
    
    
    
    ](/examples/demo-hallucination-detector)
*   [
    
    Writing Assistant
    
    
    
    ](/examples/demo-exa-powered-writing-assistant)
*   [
    
    Chat app
    
    
    
    ](https://chat.exa.ai/)
*   [
    
    Company researcher
    
    
    
    ](https://companyresearcher.exa.ai/)

##### Tutorials

*   [
    
    Hacker News Clone
    
    
    
    ](/examples/live-demo-hacker-news-clone)
*   [
    
    Building a News Summarizer
    
    
    
    ](/examples/recent-news-summarizer)
*   [
    
    Building a Hallucination Checker
    
    
    
    ](/examples/identifying-hallucinations-with-exa)
*   [
    
    RAG Q&A
    
    
    
    ](/examples/exa-rag)
*   [
    
    Company Analyst
    
    
    
    ](/examples/company-analyst)
*   [
    
    Exa Researcher - JavaScript
    
    
    
    ](/examples/exa-researcher)
*   [
    
    Exa Researcher - Python
    
    
    
    ](/examples/exa-researcher-python)
*   [
    
    Recruiting Agent
    
    
    
    ](/examples/exa-recruiting-agent)
*   [
    
    Phrase Filters: Niche Company Finder
    
    
    
    ](/examples/niche-company-finder-with-phrase-filters)
*   [
    
    Job Search with Exa
    
    
    
    ](/examples/job-search-with-exa)
*   [
    
    Build a Retrieval Agent with LangGraph
    
    
    
    ](/examples/getting-started-with-rag-in-langgraph)
*   [
    
    Structured Outputs with Instructor
    
    
    
    ](/examples/getting-started-with-exa-in-instructor)

On this page

*   [Overview](#overview)
*   [How it Works](#how-it-works)
*   [Semantic Whitelisting](#semantic-whitelisting)
*   [Storyline Deduplication](#storyline-deduplication)

* * *

[![websets-news-monitor](https://exa.imgix.net/websets-news-monitor.png)

## Click here to try it out.





](https://demo.exa.ai/websets-news-monitor)

# 

[​

](#overview)

Overview

We created a Websets News Monitor that uses the Websets API to monitor the web semantically for queries like “startup funding round announcements” or “new product launches.” Each tab uses a different Webset that updates daily using a monitor.

It demonstrates best practices for news monitoring including:

*   Deduplicating articles about the same story
*   Filtering out low-quality data sources
*   Receiving real-time updates via webhooks

[View the full source code on GitHub](https://github.com/exa-labs/websets-news-monitor).

# 

[​

](#how-it-works)

How it Works

1

Set Up a Webhook

[Webhooks](/websets/api/webhooks) allow you to subscribe to real-time updates as your Websets run. We want to know when a Webset is created and items finish enriching, so we’ll subscribe to `webset.created` and `webset.item.enriched`.

Javascript

Copy

Ask AI

```
const exa = new Exa(process.env.EXA_API_KEY);
const webhookUrl = 'https://smee.io/123abc456def'; // Replace with your webhook handler endpoint

webhook = await exa.websets.webhooks.create({
    url: webhookUrl,
    events: [
        EventType.webset_created,
        EventType.webset_item_enriched,
    ],
});

console.log(`✅ Webhook created with ID: ${webhook.id}`);
console.log(`WEBHOOK_SECRET=${webhook.secret}`);
```

Save `webhook.secret`, we’ll use it later to validate incoming webhook requests.

2

Create a Webset

Now we’ll create a Webset that searches for the types of articles we are looking for. Use `query` to direct the search and `criteria` to narrow down the results.

In this example we’re looking for articles about recent startup fundraises.

Javascript

Copy

Ask AI

```
const webset = await exa.websets.create({
    search: {
        query: "Startups that raised a funding round in the last 24 hours",
        criteria: [
            {
                description: "Article is about a startup raising a funding round of at least $1M",
            },
            {
                description: "Article published in a top 20 tech publication (TechCrunch, The Verge, Wired, etc.)",
            },
            {
                description: "Article was published in the last 24 hours",
            }
        ],
        entity: { type: "article" },
        behavior: "append",
        count: 25
    },
    enrichments: [
        {
            description: "One sentence summary of the article using content not in the title",
            format: "text",
        }
    ]
});

console.log(`✅ Webset created with ID: ${webset.id}`);
```

3

Monitor the Webset

We want our Webset to update with new articles daily, so we’ll create a monitor with the `webset.id`. We set the `cadence` parameter to run daily and the `search` behavior so it looks for new results.

By default, monitors use the last search the Webset ran. When we created the Webset we used “in the last 24 hours” so it’s always relative to when the monitor runs.

Javascript

Copy

Ask AI

```
const monitor = await exa.websets.monitors.create({
    websetId: webset.id,
    behavior: { type: "search", config: { count: 10 } },
    cadence: {
        cron: "0 0 * * *", // Every day
        timezone: "UTC"
    }
});

console.log(`✅ Monitor created with ID: ${monitor.id}`);
```

4

Handle the Webhook

Lastly, we need to create an endpoint to handle the webhook requests. We’ll setup a Next.js route to handle POST requests and parse the event data.

For security purposes, you should verify the request’s signature using the webhook secret from the first step. See the [signature verification guide](https://docs.exa.ai/websets/api/webhooks/verifying-signatures) for more info.

Javascript

Copy

Ask AI

```
// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyWebhookSignature } from '@/lib/webhook';
import { exa } from '@/lib/exa';
import { embedText } from '@/lib/openai';
import { isDuplicate } from '@/lib/dedupe';

export async function POST(request: NextRequest) {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const signatureHeader = request.headers.get('exa-signature') || '';
    const webhookSecret = process.env.WEBHOOK_SECRET;

    // Verify webhook signature 
    if (!verifyWebhookSignature(rawBody, signatureHeader, webhookSecret)) {
        console.error('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

     const body = JSON.parse(rawBody);

    switch (body.type) {
        case 'webset.created':
            // Handle new Webset
            break;
        case 'webset.item.enriched':
            // Handle new enriched item
            break;
        default:
            break;
    }

    return NextResponse.json({ 
        received: true,
        type: body.type,
        timestamp: new Date().toISOString()
    });
```

View the full route implementation [here](https://github.com/exa-labs/websets-news-monitor/blob/main/src/app/api/webhook/route.ts).

# 

[​

](#semantic-whitelisting)

Semantic Whitelisting

We want our feeds to contain high-quality links and avoid SEO spam. This would normally require manually maintaining lists of domains to include/exclude from your results, but with Websets it’s simple.

You can create criteria that function as a _semantic whitelist_, telling the LLM what kinds of articles to allow. Here’s an example:

Copy

Ask AI

```
Article published in a top 20 tech publication (TechCrunch, The Verge, Wired, etc.)
```

You can see all of the criteria used in the demo [here](https://github.com/exa-labs/websets-news-monitor/blob/main/scripts/setup-websets.js).

# 

[​

](#storyline-deduplication)

Storyline Deduplication

A common issue when monitoring news is handling multiple articles about the same storyline. Often you want to group articles by storyline or remove duplicates so users don’t see repeated content.

In our demo, we solve this using embeddings, vector search, and an LLM to classify duplicates.

1

Embed the Article Title

First, we’ll embed the article’s title using OpenAI’s embedding API. We’ll use the `text-embedding-3-small` model that produces vectors optimized for similarity comparisons.

Javascript

Copy

Ask AI

```
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: title,
    dimensions: 1536,
});

const embedding = response.data[0].embedding;
```

2

Search for Similar Articles

Next, we use PostgreSQL’s `pgvector` extension to find the 10 most similar articles from the last week.

Javascript

Copy

Ask AI

```
import { prisma } from '@/lib/prisma';

const query = `
    SELECT id, title, "publishedAt", embedding <+> $1::vector AS distance
    FROM "Articles"
    WHERE "publishedAt" >= NOW() - INTERVAL '7 days'
    ORDER BY embedding <+> $1::vector
    LIMIT 10;
`;

const similarArticles = await prisma.$queryRawUnsafe(query, embedding)
```

3

Classify Duplicates with an LLM

Finally, we’ll use an LLM with structured outputs to classify whether the article is a duplicate. The LLM will look at the titles of similar articles and determine if they are about the same event.

Javascript

Copy

Ask AI

```
const DuplicateCheck = z.object({
    is_duplicate: z.boolean(),
});

const response = await openai.responses.parse({
    model: 'gpt-4o-mini',
    input: [
        {
            role: 'system',
            content: 'You are a news deduplication assistant. Determine if stories are about the same event.'
        },
        {
            role: 'user',
            content: `Is this story a duplicate of any in the list? \nQuery story: "${title}" \nSimilar stories: ${similarArticles.map(item => item.title).join('\n')}`
        }
    ],
    text: {
        format: zodTextFormat(DuplicateCheck, "duplicate_check"),
    },
});

const isDuplicate = response.output_parsed.is_duplicate;
```

You can view the complete deduplication implementation [here](https://github.com/exa-labs/websets-news-monitor/blob/main/src/lib/dedupe.ts).

Assistant

Responses are generated using AI and may contain mistakes.

[Exa MCP](/examples/exa-mcp)[Hallucination Detector](/examples/demo-hallucination-detector)