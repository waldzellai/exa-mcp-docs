# RAG with Exa and OpenAI - Exa

> **Source:** https://docs.exa.ai/reference/rag-quickstart  
> **Last Updated:** 2025-07-31T04:44:09.230Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

RAG Quick Start Guide

RAG with Exa and OpenAI

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

*   [Get Started](#get-started)

* * *

By combining Exa’s search capabilities with OpenAI’s language models, you can build a system that retrieves relevant, up-to-date information and generates insightful summaries. Here is the workflow: **1\. Retrieval (Exa):** Searches the web to find relevant and up-to-date results based on your query. **2\. Processing:** Combines the retrieved Exa search results with your LLM query. **3\. Generation (OpenAI):** Uses OpenAI’s LLM to generate an informed response using both your query and Exa’s search results.

* * *

## 

[​

](#get-started)

Get Started

First, create an account and grab a free API key.[

## Get your Exa API key





](https://dashboard.exa.ai/api-keys)Next, choose to use our Python or TypeScript SDK to set up your RAG system.

*   Python
*   TypeScript

1

Install the python SDK

Shell

Copy

Ask AI

```
pip install exa_py
```

2

Instantiate the client

Python

Copy

Ask AI

```
exa = Exa('EXA_API_KEY') # Replace EXA_API_KEY with your actual API key
```

3

Make a search using the search\_and\_contents method

The `search_and_contents` method returns a list of search results with the contents and/or highlights of the webpages.

You can find a more detailed explanation of the methods [here](/exa-s-capabilities-explained).

Python

Copy

Ask AI

```
result = exa.search_and_contents(
  "hottest AI startups",
  text=True
)

print(result)
```

4

Output

Shell

Copy

Ask AI

```
Title: Paradox: The AI assistant for recruiting, Olivia
URL: https://www.paradox.ai/
ID: https://www.paradox.ai/
Score: 0.17563548684120178
Published Date: 2023-01-01
Author: None
Text: Say hello to the world's fastest, simplest hiring experience. See Olivia in action Say hello to your team's next best hire. Olivia is the simple, conversational recruiting solution that does work for you. She automates, answers, screens, schedules, and onboards ... to help you hire faster. What can Olivia do? See Olivia in action Sheâs your next best hire. Olivia is the simple, conversational recruiting solution that does work for you. She automates, answers, screens, schedules and onboards ... to help you hire faster. See Olivia in action. See Olivia in action Sheâs your next best hire. Olivia is the simple, conversational recruiting solution that does work for you. She automates, answers, screens, schedules and onboards ... to help you hire faster. See Olivia in action. See Olivia in action Sheâs your next best hire. Olivia is the simple, conversational recruiting solution that does work for you. She automates, answers, screens, schedules and onboards ... to help you hire faster. See Olivia in action. If you hire people, you deserve an assistant. Meet Olivia, the simple, conversational recruiting solution that does work for you. She automates, answers, screens, schedules and onboards ... to help you hire faster. We measure success in client hugs. From high-volume hourly roles to highly technical engineering openings to hard-to-find healthcare professionals âÂ Olivia's assisting companies in every industry, all over the world. The epiphany came after we turned Paradox on. It was so much better than we ever thought it would be. Josh SwemmTA ManagerMeritage Hospitality Group Adam ChenChief Marketing OfficerAmerican Pool Paradox removes time stealers from our HR and Ops teams. It's our best recruiting investment of the last 2 years. Rachel O'ConnellVP of TalentGreat Wolf Lodge Rebecca VolpanoDirector of Client SuccessCielo Our ability to engage candidates in 47 countries and 18 languages 24/7 has been critical to achieving our hiring goals. Gui NevesTA Sourcing & Solutions LeadNestle Speed and experience are critical. Paradox checks both boxes â providing a fast, frictionless hiring experience that works. Michael FerrantiChief People OfficerRegis Corporation Derek BraunRecruiting ManagerGoWireless Paradox exceeded my expectations wildly in all ways â always tailoring solutions to meet our use cases. Christina CoyleSVP of Talent AcquisitionAdvantage Solutions I've partnered with Paradox at two companies and they always deliver above and beyond my expectations. Jacob KramerSVPÂ of Talent AcquisitionU.S. Xpress Olivia's helping us streamline candidates that we would have lost if we didn't have this technology in place. Leah ButtersRecruitment Strategy ConsultantMultiCare Health System Paradox was completely transformational, almost instantly. Our team was saving an enormous amount of time. Jay Chan SVPÂ of Talent AcquisitionUnited Overseas Bank We're proud to partner with Paradox to drive innovation around the experiences we create for candidates and our team. Tom DaewaleHead of Employee ExperienceUnilever Recruiting teams and hiring managers spend 80% of their time on manual tasks. Olivia can do that work for them. Request a demo Meet the world's easiest job search. Candidates shouldnât have to dig to find a relevant job. Olivia can instantly match jobs to each personâs location, resume, or keywords they use in a conversation â making it easy to find the perfect fit. More on experience assistant î  And text-to-apply experiences that are even easier. Nothing increases drop-off more than logins, passwords, and clunky applications. Olivia shortens time-to-apply to minutes, with a quick, lightweight text-to-apply experience. More on text to apply î  Unlock your candidate's true personality and unique skills. The Big 5 assessment measures a personâs Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. Normally taking nearly 10 minutes, our visual-based assessment takes less than 2 minutes. More on assessments î  Schedule any type of interview in seconds, 24 hours a day. From scheduling to rescheduling to reminders, Olivia ensures you never have to worry about endless back and forth, double booking, or interview no-shows again. More on scheduling î  And answer questions instantly â in 100+ languages. From FAQs about 401k match or benefits, to what to wear to an interview or where to park, Olivia can answer thousands of questions, 24/7, in whatever language the candidate prefers. Make offers and onboarding a breeze. When youâre ready to offer, Olivia can share the good news. She can also automate sending and reminding new hires to complete onboarding steps â like completing I-9, tax, or WOTC paperwork. More on onboarding î  Don't want to replace your current systems? No worries. Olivia makes them better. Olivia's saving recruiters and managers millions of hours every year. From dramatic reductions in time-to-hire to nearly perfect feedback from candidates, Olivia's changing the expectation for what hiring software can do for companies all over the world. decrease in job advertising Increase in hard-to-fill roles candidate satisfaction rating Change is hard. We get it. But our job is to make your job easier. A+ Implementation Change doesnât have to be hard. Our team of pros makes it even easier. Countless Integrations From Workday to SAP to Indeed, Olivia can work alongside the world's best. See integrations î  Global & Secure SOC-2, Type 2 and GDPR certified. 30+ languages. Built for local, built for global. Learn more î  âFor hiring managers, it's giving them all that administrative time back and alleviating frustrations that come with scheduling.â Alexa Morse, Director of HR Operations Read Full Report î  60 reduction in time to hire 95 positive candidate experience
Highlights: None
Highlight Scores: None


Title: Harvey | Generative AI for Elite Law Firms
URL: https://www.harvey.ai/
ID: https://www.harvey.ai/
Score: 0.17165924608707428
Published Date: None
Author: None
Text: Contact Sales. Unprecedented. legal AI. Join the Waitlist. * Careers. * Privacy Policy
Highlights: None
Highlight Scores: None
... 
```

Run in dashboard to see the full result [here](https://dashboard.exa.ai/playground/search?q=hottest%20ai%20startups&filters=%7B%22text%22%3A%22true%22%7D)

5

Set up OpenAI to perform RAG

Create a RAG system by setting up the OpenAI client to summarize the Exa search results.

Make sure to set the `OPENAI_API_KEY` environment variable with your API key in the `.env` file.

Python

Copy

Ask AI

```
# Install OpenAI library
!pip install openai

# Import and set up OpenAI client
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
```

6

Call the OpenAI client

Now, call the OpenAI client, passing:

1.  A system prompt that defines the AI’s role.
2.  A user message that describes the task you want the AI to perform.

Python

Copy

Ask AI

```
system_prompt = "You are a helpful AI assistant. Summarize the given search results about AI startups."
user_message = "Please provide a brief summary of the top AI startups based on the search results."

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Search results: {result}\n\n{user_message}"}
    ]
)

print(response.choices[0].message.content)
```

7

Output

Copy

Ask AI

```
Based on the search results, here's a brief summary of some of the top AI startups:

1. Paradox: Offers an AI assistant named Olivia for recruiting, which automates various aspects of the hiring process including screening, scheduling, and onboarding.

2. Harvey: Provides generative AI solutions specifically for elite law firms, though details are limited in the search results.

3. Adept: Building a machine learning model that can interact with everything on a computer, aiming to create an AI teammate for everyone.

4. Brain.ai: Developing Natural, a generative interface that allows software to sync with user intentions, reimagining how we interact with our phones.

5. Tenyx: Working on next-generation intelligent machines using neuroscience-inspired AI technology, focusing on voice-based conversational agents.

6. DirectAI: Offers a platform to build and deploy computer vision models using plain language, without coding or training required.

7. Ghost AI: Provides AI-driven solutions for B2B sales outreach and revenue growth, using advanced machine learning for personalized communication.

8. 11x: Offers digital AI workers designed to automate workflows across various parts of a company.

9. Norn: Developing a software system with independent motivation based on human-like emotions, aiming to reduce cognitive bias in decision-making.

10. Helm.ai: Pioneering unsupervised learning for AI and autonomous technologies, with applications in autonomous driving and computer vision.

These startups are working on diverse applications of AI, from recruiting and legal services to general-purpose AI assistants and autonomous systems.
```

[OpenAPI Specification](/reference/openapi-spec)[RAG with LangChain](/reference/langchain)

Assistant

Responses are generated using AI and may contain mistakes.