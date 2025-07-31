# Tool calling with GPT - Exa

> **Source:** https://docs.exa.ai/reference/tool-calling-with-gpt4o  
> **Last Updated:** 2025-07-31T04:44:33.199Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

RAG Quick Start Guide

Tool calling with GPT

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
*   [Full code](#full-code)

* * *

OpenAI’s [tool calling](https://platform.openai.com/docs/guides/function-calling?lang=python) allows LLMs to call functions that are defined in your code. This guide will show you how to utilise “tool calling” to call Exa’s search, with the following steps:

1.  Install prerequisite packages and set up the environment
2.  Overview of how OpenAI’s tool calling feature works
3.  Use Exa within an OpenAI tool call

* * *

## 

[​

](#get-started)

Get Started

1

Pre-requisites and installation

Install the:

*   `openai` library to perform OpenAI API calls and completions
*   `exa_py` library to perform Exa search
*   `rich` library to make the output more readable

Python

Copy

Ask AI

```
pip install openai exa_py rich
```

2

Set up the environment variables

Create an `.env` file in the root of your project and set the `EXA_API_KEY` and `OPENAI_API_KEY` environment variable to your API keys respectively. Visit the [OpenAI playground](https://platform.openai.com/api-keys) and the [Exa dashboard](https://dashboard.exa.ai/api-keys) to generate your API keys.  
[

## Get your Exa API key





](https://dashboard.exa.ai/api-keys)

Shell

Copy

Ask AI

```
OPENAI_API_KEY=insert your Exa API key here, without quotes
EXA_API_KEY=insert your Exa API key here, without quotes
```

3

What is OpenAI tool calling?

OpenAI LLMs can call a function you have defined in your code, this is called [tool calling](https://platform.openai.com/docs/guides/function-calling?lang=python). To do this you first need to describe the function you want to call to OpenAI’s LLM. You can do this by defining a description object of the format:

JSON

Copy

Ask AI

```
{
    "name": "my_function_name", # The name of the function
    "description": "The description of my function", # Describe the function so OpenAI knows when and how to use it.
    "input_schema": { # input schema describes the format and the type of parameters OpenAI needs to generate to use the function
        "type": "object", # format of the generated OpenAI response
        "properties": { # properties defines the input parameters of the function
            "query": { # the function expects a query parameter
                "type": "string", # of type string
                "description": "The search query to perform.", # describes the paramteres to OpenAI
            },
        },
        "required": ["query"], # define which parameters are required
    },
}
```

When this description is sent to OpenAI’s LLM, it returns an object with a string, which is the function name defined in _your_ code, and the arguments that the function takes. This does not execute or _call_ functions on OpenAI’s side; it only returns the function name and arguments which you will have to parse and call yourself in your code.

Python

Copy

Ask AI

```
...
id='call_62136123',
function=Function(
    arguments='{"query":"Latest developments in quantum computing"}',
    name='exa_search',),
type='function'
...
```

We will use this object to - in this case - call the `exa_search` function we define with the arguments provided.

4

Use Exa Search as an OpenAI tool

First, we import and initialise the OpenAI and Exa libraries and load the stored API keys.

Python

Copy

Ask AI

```
from dotenv import load_dotenv
from exa_py import Exa
from openai import OpenAI

load_dotenv()

openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
exa = Exa(api_key=os.getenv("EXA_API_KEY"))
```

Next, we define the function and the function schema so that OpenAI knows how to use it and what arguments our local function takes:

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

Finally, we’ll define the primer `SYSTEM_MESSAGE`, which explains to OpenAI what it is supposed to do:

Python

Copy

Ask AI

```
SYSTEM_MESSAGE = {
    "role": "system",
    "content": "You are an agent that has access to an advanced search engine. Please provide the user with the information they are looking for by using the search tool provided.",
}
```

We can now start writing the code needed to perform the LLM calls and the search. We’ll create the `exa_search` function that will call Exa’s `search_and_contents` function with the query:

Python

Copy

Ask AI

```
def exa_search(query: str) -> Dict[str, Any]:
    return exa.search_and_contents(query=query, type='auto', highlights=True)
```

Next, we create a function to process the tool calls:

Python

Copy

Ask AI

```
def process_tool_calls(tool_calls, messages):
    for tool_call in tool_calls:
        function_name = tool_call.function.name
        function_args = json.loads(tool_call.function.arguments)
        if function_name == "exa_search":
            search_results = exa_search(**function_args)
            messages.append(
                {
                    "role": "tool",
                    "content": str(search_results),
                    "tool_call_id": tool_call.id,
                }
            )
            console.print(
                f"[bold cyan]Context updated[/bold cyan] [i]with[/i] "
                f"[bold green]exa_search ({function_args.get('mode')})[/bold green]: ",
                function_args.get("query"),
            )
    return messages
```

Lastly, we’ll create a `main` function to bring it all together, and handle the user input and interaction with OpenAI:

Python

Copy

Ask AI

```
def main():
    messages = [SYSTEM_MESSAGE]
    while True:
        try:
            user_query = Prompt.ask(
                "[bold yellow]What do you want to search for?[/bold yellow]",
            )
            messages.append({"role": "user", "content": user_query})
            completion = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                tools=TOOLS,
            )
            message = completion.choices[0].message
            tool_calls = message.tool_calls
            if tool_calls:
                messages.append(message)
                messages = process_tool_calls(tool_calls, messages)
                messages.append(
                    {
                        "role": "user",
                        "content": "Answer my previous query based on the search results.",
                    }
                )
                completion = openai.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=messages,
                )
                console.print(Markdown(completion.choices[0].message.content))
            else:
                console.print(Markdown(message.content))
        except Exception as e:
            console.print(f"[bold red]An error occurred:[/bold red] {str(e)}")
if __name__ == "__main__":
    main()
```

The implementation creates a loop that continually prompts the user for search queries, uses OpenAI’s tool calling feature to determine when to perform a search, and then uses the Exa search results to provide an informed response to the user’s query.We also use the rich library to provide a more visually appealing console interface, including coloured output and markdown rendering for the responses.

5

Running the code

Save the code in a file, e.g. `openai_search.py`, and make sure the `.env` file containing the API keys we previously created is in the same directory as the script.Then run the script using the following command from your terminal:

Bash

Copy

Ask AI

```
python openai_search.py
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
What do you want to search for?: Who is Tony Stark?
Context updated with exa_search (None):  Tony Stark
Tony Stark, also known as Iron Man, is a fictional superhero from Marvel Comics. He is a wealthy inventor and businessman, known for creating a powered suit of armor that gives him superhuman abilities. Tony Stark is a founding member of the Avengers and has appeared in various comic book series, animated
television shows, and films within the Marvel Cinematic Universe.

If you're interested in more detailed information, you can visit Tony Stark (Marvel Cinematic Universe) - Wikipedia.
```

That’s it, enjoy your search agent!

## 

[​

](#full-code)

Full code

Python

Copy

Ask AI

```
import json
import os

from dotenv import load_dotenv
from typing import Any, Dict
from exa_py import Exa
from openai import OpenAI
from rich.console import Console
from rich.markdown import Markdown
from rich.prompt import Prompt

# Load environment variables from .env file
load_dotenv()

# create the openai client
openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# create the exa client
exa = Exa(api_key=os.getenv("EXA_API_KEY"))

# create the rich console
console = Console()

# define the system message (primer) of your agent
SYSTEM_MESSAGE = {
    "role": "system",
    "content": "You are the world's most advanced search engine. Please provide the user with the information they are looking for by using the tools provided.",
}

# define the tools available to the agent - we're defining a single tool, exa_search
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "exa_search",
            "description": "Perform a search query on the web, and retrieve the world's most relevant information.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The search query to perform.",
                    },
                },
                "required": ["query"],
            },
        },
    }
]

# define the function that will be called when the tool is used and perform the search
# and the retrieval of the result highlights.
# https://docs.exa.ai/reference/python-sdk-specification#search_and_contents-method
def exa_search(query: str) -> Dict[str, Any]:
    return exa.search_and_contents(query=query, type='auto', highlights=True)

# define the function that will process the tool call and perform the exa search
def process_tool_calls(tool_calls, messages):
    
    for tool_call in tool_calls:
        function_name = tool_call.function.name
        function_args = json.loads(tool_call.function.arguments)
        
        if function_name == "exa_search":
            search_results = exa_search(**function_args)
            messages.append(
                {
                    "role": "tool",
                    "content": str(search_results),
                    "tool_call_id": tool_call.id,
                }
            )
            console.print(
                f"[bold cyan]Context updated[/bold cyan] [i]with[/i] "
                f"[bold green]exa_search ({function_args.get('mode')})[/bold green]: ",
                function_args.get("query"),
            )
            
    return messages

def main():
    messages = [SYSTEM_MESSAGE]
    
    while True:
        try:
            # create the user input prompt using rich
            user_query = Prompt.ask(
                "[bold yellow]What do you want to search for?[/bold yellow]",
            )
            messages.append({"role": "user", "content": user_query})
            
            # call openai llm by creating a completion which calls the defined exa tool
            completion = openai.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                tools=TOOLS,
                tool_choice="auto",
            )
            
            # completion will contain the object needed to invoke your tool and perform the search
            message = completion.choices[0].message
            tool_calls = message.tool_calls
            
            if tool_calls:

                messages.append(message)

                # process the tool object created by OpenAI llm and store the search results
                messages = process_tool_calls(tool_calls, messages)
                messages.append(
                    {
                        "role": "user",
                        "content": "Answer my previous query based on the search results.",
                    }
                )
                
                # call OpenAI llm again to process the search results and yield the final answer
                completion = openai.chat.completions.create(
                    model="gpt-4o",
                    messages=messages,
                )
                
                # parse the agents final answer and print it
                console.print(Markdown(completion.choices[0].message.content))
            else:
                console.print(Markdown(message.content))
        except Exception as e:
            console.print(f"[bold red]An error occurred:[/bold red] {str(e)}")
            
            
if __name__ == "__main__":
    main()
```

[RAG with LlamaIndex](/reference/llamaindex)[Tool calling with Claude](/reference/tool-calling-with-claude)

Assistant

Responses are generated using AI and may contain mistakes.