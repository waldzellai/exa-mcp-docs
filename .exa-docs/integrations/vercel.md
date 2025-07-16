# Vercel AI SDK - Exa

> **Source:** https://docs.exa.ai/integrations/vercel  
> **Last Updated:** 2025-07-16T10:33:38.920Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

Integrations External Docs

Vercel AI SDK

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

##### Integrations External Docs

*   [
    
    Vercel AI SDK
    
    
    
    ](/integrations/vercel)
*   [
    
    OpenRouter
    
    
    
    ](/integrations/openrouter)
*   [
    
    LangChain Docs
    
    
    
    ](/integrations/langchain-docs)
*   [
    
    LlamaIndex Docs
    
    
    
    ](/integrations/llamaIndex-docs)
*   [
    
    CrewAI Docs
    
    
    
    ](/integrations/crew-ai-docs)
*   [
    
    IBM WatsonX
    
    
    
    ](/integrations/ibm-watsonx-docs)

On this page

*   [Web Search Tool Implementation](#web-search-tool-implementation)

Learn how to build a web agent with Vercel AI SDK and Exa. Create intelligent agents that can search the web for up-to-date information and provide contextual responses.

**[View the guide in Vercel AI SDK docs →](https://ai-sdk.dev/cookbook/node/web-search-agent#exa)**

## 

[​

](#web-search-tool-implementation)

Web Search Tool Implementation

Here’s how to create a web search tool using Exa with Vercel AI SDK:

Copy

Ask AI

```
import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import Exa from 'exa-js';

export const exa = new Exa(process.env.EXA_API_KEY);

export const webSearch = tool({
  description: 'Search the web for up-to-date information',
  parameters: z.object({
    query: z.string().min(1).max(100).describe('The search query'),
  }),
  execute: async ({ query }) => {
    const { results } = await exa.searchAndContents(query, {
      livecrawl: 'always',
      numResults: 3,
    });
    return results.map(result => ({
      title: result.title,
      url: result.url,
      content: result.text.slice(0, 1000), // take just the first 1000 characters
      publishedDate: result.publishedDate,
    }));
  },
});

const { text } = await generateText({
  model: openai('gpt-4o-mini'), // can be any model that supports tools
  prompt: 'What happened in San Francisco last week?',
  tools: {
    webSearch,
  },
  maxSteps: 2,
});
```

For detailed instructions on building web agents with Vercel AI SDK and Exa, visit the [Vercel AI SDK documentation](https://ai-sdk.dev/cookbook/node/web-search-agent#exa).

Assistant

Responses are generated using AI and may contain mistakes.

[OpenRouter](/integrations/openrouter)