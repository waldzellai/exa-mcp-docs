# Tool calling with Claude - Exa

> **Source:** https://docs.exa.ai/reference/tool-calling-with-claude  
> **Last Updated:** 2025-07-16T10:34:41.505Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

RAG Quick Start Guide

Tool calling with Claude

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

On this page

*   [Get Started](#get-started)

* * *

This guide will show you how to properly set up and use Anthropic’s and Exa’s API client, and utilise Claude’s function calling or “tool use” feature to perform Exa search integration. Here are the steps:

1.  Install the prerequisite packages and set up API keys as environment variables
2.  Understand how Claude’s “tool use” feature works
3.  Use Exa within the tool use feature

## 

[​

](#get-started)

Get Started

1

Prerequisites and installation

Before you can use this guide you will need to have [python3](https://www.python.org/doc/) and [pip](https://pip.pypa.io/en/stable/installation/) installed on your machine.

For the purpose of this guide we will need to install:

*   `anthropic` library to perform Claude API calls and completions
*   `exa_py` library to perform Exa search
*   `rich` library to make the output more readable

Install the libraries.

Python

Copy

Ask AI

```
pip install anthropic exa_py rich
```

To successfully use the Exa search client and Anthropic client you will need to have your `ANTHROPIC_API_KEY` and `EXA_API_KEY`  
set as environment variables.

To get an Anthropic API key, you will first need an Anthropic account, visit the [Anthropic console](https://console.anthropic.com/settings/keys) to generate your API key.

Similarly, to get the Exa API key, you will first need an Exa account, visit the Exa dashboard to generate your API key.

[

## Get your Exa API key





](https://dashboard.exa.ai/api-keys)

> Be safe with your API keys. Make sure they are not hardcoded in your code or added to a git repository to prevent leaking them to the public.

You can create an `.env` file in the root of your project and add the following to it:

Bash

Copy

Ask AI

```
API_KEY=insert your Anthropic API key here, without the quotes
EXA_API_KEY=insert your Exa API key here, without the quotes
```

Make sure to add your `.env` file to your `.gitignore` file if you have one.

2

Understanding Claude's Tool Use Feature

Claude LLMs can call a function you have defined in your code; this is called [tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use). To do this, you first need to describe the function you want to call to Claude’s LLM. You can do this by defining a description object of the format:

JSON

Copy

Ask AI

```
{
    "name": "my_function_name", # The name of the function
    "description": "The description of my function", # Describe the function so Claude knows when and how to use it.
    "input_schema": { # input schema describes the format and the type of parameters Claude needs to generate to use the function
        "type": "object", # format of the generated Claude response
        "properties": { # properties defines the input parameters of the function
            "query": { # the function expects a query parameter
                "description": "The search query to perform.", # describes the parameter to Claude
            },
        },
        "required": ["query"], # define which parameters are required
    },
}
```

When this description is sent to Claude’s LLM, it returns an object with a string, which is the function name defined in _your_ code, and the arguments that the function takes. This does not execute or _call_ functions on Anthropic’s side; it only returns the function name and arguments which you will have to parse and call yourself in your code.

Python

Copy

Ask AI

```
{
  "type": "tool_use",
  "id": "toolu_01A09q90qw90lq917835123",
  "name": "my_function_name",
  "input": {"query": "Latest developments in quantum computing"}
}
```

We will use the object of this format to call the `exa_search` function we define.

3

Use Exa Search as Claude tool

First, we import and initialise the Anthropic and Exa libraries and load the stored API keys.

Python

Copy

Ask AI

```
import anthropic

from dotenv import load_dotenv
from exa_py import Exa

load_dotenv()

claude = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
exa = Exa(api_key=os.getenv("EXA_API_KEY"))
```

Next, we define the function and the function schema so that Claude knows how to use it and what arguments our local function takes:

Python

Copy

Ask AI

```
TOOLS = [
    {
        "name": "exa_search",
        "description": "Perform a search query on the web, and retrieve the most relevant URLs/web data.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search query to perform.",
                },
            },
            "required": ["query"],
        },
    }
]
```

Finally, we’ll define the primer `SYSTEM_MESSAGE`, which explains to Claude what it is supposed to do:

Python

Copy

Ask AI

```
SYSTEM_MESSAGE = "You are an agent that has access to an advanced search engine. Please provide the user with the information they are looking for by using the search tool provided."
```

We can now start writing the code needed to perform the LLM calls and the search. We’ll create the `exa_search` function that will call Exa’s `search_and_contents` function with the query:

Python

Copy

Ask AI

```
def exa_search(query: str) -> Dict[str, Any]:
    return exa.search_and_contents(query=query, type='auto', highlights=True)
```

Next, we create a function to process the tool use:

Python

Copy

Ask AI

```
def process_tool_calls(tool_calls):
    search_results = []
    for tool_call in tool_calls:
        function_name = tool_call.name
        function_args = tool_call.input
        if function_name == "exa_search":
            results = exa_search(**function_args)
            search_results.append(results)
            console.print(
                f"[bold cyan]Context updated[/bold cyan] [i]with[/i] "
                f"[bold green]exa_search[/bold green]: ",
                function_args.get("query"),
            )
    return search_results
```

Lastly, we’ll create a `main` function to bring it all together, and handle the user input and interaction with Claude:

Python

Copy

Ask AI

```
def main():
    messages = []
    while True:
        try:
            user_query = Prompt.ask(
                "[bold yellow]What do you want to search for?[/bold yellow]",
            )
            messages.append({"role": "user", "content": user_query})
            completion = claude.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=1024,
                system=SYSTEM_MESSAGE,
                messages=messages,
                tools=TOOLS,
            )
            message = completion.content[0]
            tool_calls = [content for content in completion.content if content.type == "tool_use"]
            if tool_calls:
                search_results = process_tool_calls(tool_calls)
                messages.append({"role": "assistant", "content": f"I've performed a search and found the following results: {search_results}"})
                messages.append({"role": "user", "content": "Please summarise this information and answer my previous query based on these results."})
                completion = claude.messages.create(
                    model="claude-3-sonnet-20240229",
                    max_tokens=1024,
                    system=SYSTEM_MESSAGE,
                    messages=messages,
                )
                response = completion.content[0].text
                console.print(Markdown(response))
                messages.append({"role": "assistant", "content": response})
            else:
                console.print(Markdown(message.text))
                messages.append({"role": "assistant", "content": message.text})
        except Exception as e:
            console.print(f"[bold red]An error occurred:[/bold red] {str(e)}")
if __name__ == "__main__":
    main()
```

The implementation creates a loop that continually prompts the user for search queries, uses Claude’s tool use feature to determine when to perform a search, and then uses the Exa search results to provide an informed response to the user’s query.

We also use the rich library to provide a more visually appealing console interface, including coloured output and markdown rendering for the responses.

4

Full code

Python

Copy

Ask AI

```
# import all required packages
import os
import anthropic

from dotenv import load_dotenv
from typing import Any, Dict
from exa_py import Exa
from rich.console import Console
from rich.markdown import Markdown
from rich.prompt import Prompt

# Load environment variables from .env file
load_dotenv()

# create the anthropic client
claude = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

# create the exa client
exa = Exa(api_key=os.getenv("EXA_API_KEY"))

# create the rich console
console = Console()

# define the system message (primer) of your agent
SYSTEM_MESSAGE = "You are an agent that has access to an advanced search engine. Please provide the user with the information they are looking for by using the search tool provided."

# define the tools available to the agent - we're defining a single tool, exa_search
TOOLS = [
    {
        "name": "exa_search",
        "description": "Perform a search query on the web, and retrieve the most relevant URLs/web data.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search query to perform.",
                },
            },
            "required": ["query"],
        },
    }
]

# define the function that will be called when the tool is used and perform the search
# and the retrieval of the result highlights.
# https://docs.exa.ai/reference/python-sdk-specification#search_and_contents-method
def exa_search(query: str) -> Dict[str, Any]:
    return exa.search_and_contents(query=query, type='auto', highlights=True)

# define the function that will process the tool use and perform the exa search
def process_tool_calls(tool_calls):
    search_results = []
    
    for tool_call in tool_calls:
        function_name = tool_call.name
        function_args = tool_call.input
        
        if function_name == "exa_search":
            results = exa_search(**function_args)
            search_results.append(results)
            
            console.print(
                f"[bold cyan]Context updated[/bold cyan] [i]with[/i] "
                f"[bold green]exa_search[/bold green]: ",
                function_args.get("query"),
            )
            
    return search_results


def main():
    messages = []
    
    while True:
        try:
            # create the user input prompt using rich
            user_query = Prompt.ask(
                "[bold yellow]What do you want to search for?[/bold yellow]",
            )
            messages.append({"role": "user", "content": user_query})
            
            # call claude llm by creating a completion which calls the defined exa tool
            completion = claude.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=1024,
                system=SYSTEM_MESSAGE,
                messages=messages,
                tools=TOOLS,
            )
            
            # completion will contain the object needed to invoke your tool and perform the search
            message = completion.content[0]
            tool_calls = [content for content in completion.content if content.type == "tool_use"]
            
            if tool_calls:
                
                # process the tool object created by Calude llm and store the search results
                search_results = process_tool_calls(tool_calls)
                
                # create new message conating the search results and request the Claude llm to process the results
                messages.append({"role": "assistant", "content": f"I've performed a search and found the following results: {search_results}"})
                messages.append({"role": "user", "content": "Please summarize this information and answer my previous query based on these results."})
                
                # call Claude llm again to process the search results and yield the final answer
                completion = claude.messages.create(
                    model="claude-3-sonnet-20240229",
                    max_tokens=1024,
                    system=SYSTEM_MESSAGE,
                    messages=messages,
                )
                
                # parse the agents final answer and print it
                response = completion.content[0].text
                console.print(Markdown(response))
                messages.append({"role": "assistant", "content": response})

            else:
                # in case tool hasn't been used, print the standard agent reponse
                console.print(Markdown(message.text))
                messages.append({"role": "assistant", "content": message.text})
                
        except Exception as e:
            console.print(f"[bold red]An error occurred:[/bold red] {str(e)}")
            
if __name__ == "__main__":
    main()
```

We have now written an advanced search tool that combines the power of Claude’s language models with Exa’s semantic search capabilities, providing users with informative and context-aware responses to their queries.

5

Running the code

Save the code in a file, e.g. `claude_search.py`, and make sure the `.env` file containing the API keys we previously created is in the same directory as the script.

Then run the script using the following command from your terminal:

Bash

Copy

Ask AI

```
python claude_search.py
```

You should see a prompt:

Bash

Copy

Ask AI

```
What do you want to search for?
```

Let’s test it out.

Bash

Copy

Ask AI

```
What do you want to search for?: Who is Steve Rogers?
Context updated with exa_search:  Steve Rogers
Based on the search results, Steve Rogers is a fictional superhero character appearing in American comic books published by Marvel Comics. He is better known as Captain America.

The key points about Steve Rogers are:

 • He was born in the 1920s to a poor family in New York City. As a frail young man, he was rejected from military service during World War II.
 • He was recruited into a secret government program called Project Rebirth where he was transformed into a super-soldier through an experimental serum, gaining enhanced strength, agility and other abilities.
 • After the serum treatment, he became Captain America and fought against the Nazis alongside other heroes like Bucky Barnes and the Invaders during WWII.
 • He was frozen in ice towards the end of the war and remained that way for decades until being revived in modern times.
 • As Captain America, he continued his heroic adventures, becoming a core member and leader of the superhero team the Avengers.
 • Steve Rogers embodies the ideals of patriotism, freedom and serving one's country as a symbol of liberty and justice.

So in summary, Steve Rogers is the original and most well-known character to take on the superhero mantle of Captain America within the Marvel universe.
```

That’s it, enjoy your search agent!

Assistant

Responses are generated using AI and may contain mistakes.

[Tool calling with GPT](/reference/tool-calling-with-gpt4o)[OpenAI Chat Completions](/reference/chat-completions)