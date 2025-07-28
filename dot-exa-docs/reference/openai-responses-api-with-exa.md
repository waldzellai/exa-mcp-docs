# OpenAI Responses API - Exa

> **Source:** https://docs.exa.ai/reference/openai-responses-api-with-exa  
> **Last Updated:** 2025-07-16T10:34:13.062Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

RAG Quick Start Guide

OpenAI Responses API

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

*   [What is Exa?](#what-is-exa%3F)
*   [Get Started](#get-started)
*   [Python Example](#python-example)
*   [JavaScript Example](#javascript-example)
*   [How Tool Calling Works](#how-tool-calling-works)

## 

[​

](#what-is-exa%3F)

What is Exa?

Exa is the search engine built for AI. It finds information from across the web and delivers both links and the actual content from pages, making it easy to use with AI models.

Exa uses neural search technology to understand the meaning of queries, not just keywords. The API works with both semantic search and traditional keyword methods.

* * *

## 

[​

](#get-started)

Get Started

First, you’ll need API keys from both OpenAI and Exa:

*   Get your Exa API key from the [Exa Dashboard](https://dashboard.exa.ai/api-keys)
*   Get your OpenAI API key from the [OpenAI Dashboard](https://platform.openai.com/api-keys)

## 

[​

](#python-example)

Python Example

Here’s a complete example using Python:

Copy

Ask AI

```
import json
from openai import OpenAI
from exa_py import Exa

OPENAI_API_KEY = ""  # Add your OpenAI API key here
EXA_API_KEY = ""     # Add your Exa API key here

# Define the tool for Exa web search
tools = [{
    "type": "function",
    "name": "exa_websearch",
    "description": "Search the web using Exa. Provide relevant links in your answer.",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "Search query for Exa."
            }
        },
        "required": ["query"],
        "additionalProperties": False
    },
    "strict": True
}]

# Define the system message
system_message = {"role": "system", "content": "You are a helpful assistant. Use exa_websearch to find info when relevant. Always list sources."}

def run_exa_search(user_query):
    """Run an Exa web search with a dynamic user query."""
    openai_client = OpenAI(api_key=OPENAI_API_KEY)
    exa = Exa(api_key=EXA_API_KEY)
    
    # Create messages with the dynamic user query
    messages = [
        system_message,
        {"role": "user", "content": user_query}
    ]

    # Send initial request
    print("Sending initial request to OpenAI...")
    response = openai_client.responses.create(
        model="gpt-4o",
        input=messages,
        tools=tools
    )
    print("Initial OpenAI response:", response.output)

    # Check if the model returned a function call
    function_call = None
    for item in response.output:
        if item.type == "function_call" and item.name == "exa_websearch":
            function_call = item
            break

    # If exa_websearch was called
    if function_call:
        call_id = function_call.call_id
        args = json.loads(function_call.arguments)
        query = args.get("query", "")

        print(f"\nOpenAI requested a web search for: {query}")
        search_results = exa.search_and_contents(
            query=query,
            text = {
              "max_characters": 4000
            }
            type="auto"
        )
        
        # Store citations for later use in formatting
        citations = [{"url": result.url, "title": result.title} for result in search_results.results]

        search_results_str = str(search_results)

        # Provide the function call + function_call_output to the conversation
        messages.append({
            "type": "function_call",
            "name": function_call.name,
            "arguments": function_call.arguments,
            "call_id": call_id
        })
        messages.append({
            "type": "function_call_output",
            "call_id": call_id,
            "output": search_results_str
        })

        print("\nSending search results back to OpenAI for a final answer...")
        response = openai_client.responses.create(
            model="gpt-4o",
            input=messages,
            tools=tools
        )
        
        # Format the final response to include citations
        if hasattr(response, 'output_text') and response.output_text:
            # Add citations to the final output
            formatted_response = format_response_with_citations(response.output_text, citations)
            
            # Create a custom response object with citations
            if hasattr(response, 'model_dump'):
                # For newer versions of the OpenAI library that use Pydantic
                response_dict = response.model_dump()
            else:
                # For older versions or if model_dump is not available
                response_dict = response.dict() if hasattr(response, 'dict') else response.__dict__
            
            # Update the output with annotations
            if response.output and len(response.output) > 0:
                response_dict['output'] = [{
                    "type": "message",
                    "id": response.output[0].id if hasattr(response.output[0], 'id') else "msg_custom",
                    "status": "completed",
                    "role": "assistant",
                    "content": [{
                        "type": "output_text",
                        "text": formatted_response["text"],
                        "annotations": formatted_response["annotations"]
                    }]
                }]
                
                # Update the output_text property
                response_dict['output_text'] = formatted_response["text"]
                
                # Create a new response object (implementation may vary based on the OpenAI SDK version)
                try:
                    response = type(response)(**response_dict)
                except:
                    # If we can't create a new instance, we'll just print the difference
                    print("\nFormatted response with citations would be:", formatted_response)

    # Print final answer text
    print("\nFinal Answer:\n", response.output_text)
    print("\nAnnotations:", json.dumps(response.output[0].content[0].annotations if hasattr(response, 'output') and response.output and hasattr(response.output[0], 'content') else [], indent=2))
    print("\nFull Response with Citations:", response)
    
    return response

def format_response_with_citations(text, citations):
    """Format the response to include citations as annotations."""
    annotations = []
    formatted_text = text
    
    # For each citation, append a numbered reference to the text
    for i, citation in enumerate(citations):
        # Create annotation object
        start_index = len(formatted_text)
        citation_text = f"\n\n[{i+1}] {citation['url']}"
        end_index = start_index + len(citation_text)
        
        annotation = {
            "type": "url_citation",
            "start_index": start_index,
            "end_index": end_index,
            "url": citation["url"],
            "title": citation["title"]
        }
        
        # Add annotation to the array
        annotations.append(annotation)
        
        # Append citation to text
        formatted_text += citation_text
    
    return {
        "text": formatted_text,
        "annotations": annotations
    }


if __name__ == "__main__":
    # Example of how to use with a dynamic query
    user_query = input("Enter your question: ")
    run_exa_search(user_query)
```

## 

[​

](#javascript-example)

JavaScript Example

Here’s the same example using JavaScript:

Copy

Ask AI

```
const OpenAI = require('openai');
const exaModule = require('exa-js');
const Exa = exaModule.default;

// Initialize API clients with API keys
const openai = new OpenAI({ apiKey: '' });  // Add your OpenAI API key here
const exa = new Exa('');                    // Add your Exa API key here

// Define websearch tool
const tools = [{
  type: 'function',
  name: 'exa_websearch',
  description: 'Search the web using Exa. Provide relevant links in your answer.',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query for Exa.'
      }
    },
    required: ['query'],
    additionalProperties: false
  },
  strict: true,
}];

// Define the system message
const systemMessage = { role: 'system', content: 'You are a helpful assistant. Use exa_websearch to find info when relevant. Always list sources.' };

async function run_exa_search(userQuery) {
  // Create messages with the dynamic user query
  const messages = [
    systemMessage,
    { role: 'user', content: userQuery }
  ];

  // Initial request to OpenAI
  console.log('Sending initial request to OpenAI...');
  let response = await openai.responses.create({
    model: 'gpt-4o',
    input: messages,
    tools
  });

  console.log('Initial OpenAI Response:', JSON.stringify(response, null, 2));

  // Check if the model wants to use the search function
  const functionCall = response.output.find(item => 
    item.type === 'function_call' && item.name === 'exa_websearch');

  if (functionCall) {
    const query = JSON.parse(functionCall.arguments).query;

    // Execute search with Exa API
    const searchResults = await exa.searchAndContents(query, {
      type: 'auto',
      text: {
        maxCharacters: 4000
      }
    });

    // Store search results for later use in formatting
    const citations = searchResults.results.map(result => ({
      url: result.url,
      title: result.title
    }));

    // Add function call and search results to the conversation
    messages.push(functionCall);
    messages.push({
      type: 'function_call_output',
      call_id: functionCall.call_id,
      output: JSON.stringify(searchResults)
    });

    // Send follow-up request to OpenAI with search results
    console.log('Sending follow-up request with search results to OpenAI...');
    response = await openai.responses.create({
      model: 'gpt-4o',
      input: messages,
      tools
    });
    
    // Format the final response to include citations
    if (response.output_text) {
      // Add citations to the final output
      const formattedResponse = formatResponseWithCitations(response.output_text, citations);
      
      // Create a custom response object with citations
      const customResponse = {
        ...response,
        output: [
          {
            type: "message",
            id: response.output[0].id,
            status: "completed",
            role: "assistant",
            content: [
              {
                type: "output_text",
                text: formattedResponse.text,
                annotations: formattedResponse.annotations
              }
            ]
          }
        ],
        output_text: formattedResponse.text
      };
      
      // Replace the original response with our custom one
      response = customResponse;
    }
  }
  console.log('Final Answer:\n', response.output_text);
  console.log('Annotations:', JSON.stringify(response.output[0]?.content[0]?.annotations || [], null, 2));
  console.log('Response with Citations:', JSON.stringify(response, null, 2));
  
  return response;
}

// Helper function to format response with citations
function formatResponseWithCitations(text, citations) {
  // Create empty annotations array
  const annotations = [];
  let formattedText = text;
  
  // For each citation, append a numbered reference to the text
  citations.forEach((citation, index) => {
    // Create annotation object
    const annotation = {
      type: "url_citation",
      start_index: formattedText.length,
      end_index: formattedText.length + citation.url.length + 3, // +3 for '[', ']' and space
      url: citation.url,
      title: citation.title
    };
    
    // Add annotation to the array
    annotations.push(annotation);
    
    // Append citation to text
    formattedText += `\n\n[${index + 1}] ${citation.url}`;
  });
  
  return { 
    text: formattedText, 
    annotations 
  };
}

// Example of how to use with a dynamic query
// For Node.js environments, you can use readline or process.argv
// For browser environments, you can use this function with user input from a form
// This is just a simple example:

async function runExaSearchExample() {
  const userQuery = process.argv[2] || "What's the latest news about AI?";
  const result = await run_exa_search(userQuery);
  return result;
}

// Run the function if directly executed
if (require.main === module) {
  runExaSearchExample().catch(console.error);
}

// Export the function for use in other modules
module.exports = { run_exa_search };
```

Both examples show how to:

1.  Set up the OpenAI Response API with Exa as a tool
2.  Make a request to OpenAI
3.  Handle the search function call
4.  Send the search results back to OpenAI
5.  Get the final response

Remember to replace the empty API key strings with your actual API keys when trying these examples.

## 

[​

](#how-tool-calling-works)

How Tool Calling Works

Let’s break down how the Exa web search tool works with OpenAI’s Response API:

1.  **Tool Definition**: First, we define our Exa search as a tool that OpenAI can use:
    
    Copy
    
    Ask AI
    
    ```
    {
      "type": "function",
      "name": "exa_websearch",
      "description": "Search the web using Exa...",
      "parameters": {
        "query": "string"  // The search query parameter
      }
    }
    ```
    
2.  **Initial Request**: When you send a message to OpenAI, the API looks at your message and decides if it needs to search the web. If it does, instead of giving a direct answer, it will return a “function call” in its output.
    
3.  **Function Call**: If OpenAI decides to search, it returns something like:
    
    Copy
    
    Ask AI
    
    ```
    {
      "type": "function_call",
      "name": "exa_websearch",
      "arguments": { "query": "your search query" }
    }
    ```
    
4.  **Search Execution**: Your code then:
    
    *   Takes this search query
    *   Calls Exa’s API to perform the actual web search
    *   Gets real web results back
5.  **Final Response**: You send these web results back to OpenAI, and it gives you a final answer using the fresh information from the web.
    

This back-and-forth process happens automatically in the code above, letting OpenAI use Exa’s web search when it needs to find current information.

Assistant

Responses are generated using AI and may contain mistakes.

[OpenAI Chat Completions](/reference/chat-completions)[How Exa Search Works](/reference/how-exa-search-works)