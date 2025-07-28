# Python and TS Cheat Sheets - Exa

> **Source:** https://docs.exa.ai/sdks/cheat-sheet  
> **Last Updated:** 2025-07-16T10:34:45.890Z

---

[Exa home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/light.png)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/exa-52/logo/dark.png)](/)

Search...

⌘KAsk AI

Search...

Navigation

SDKs

Python and TS Cheat Sheets

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

##### SDKs

*   [
    
    Python SDK Specification
    
    
    
    ](/sdks/python-sdk-specification)
*   [
    
    TypeScript SDK Specification
    
    
    
    ](/sdks/typescript-sdk-specification)
*   [
    
    Python and TS Cheat Sheets
    
    
    
    ](/sdks/cheat-sheet)

* * *

*   Python
*   typeScript

Python

Copy

Ask AI

```
from exa_py import Exa

# instantiate the Exa client
exa = Exa("YOUR API KEY")

# basic search
results = exa.search("This is a Exa query:")

# search with date filters
results = exa.search("This is a Exa query:", start_published_date="2019-01-01", end_published_date="2019-01-31")

# search with domain filters
results = exa.search("This is a Exa query:", include_domains=["www.cnn.com", "www.nytimes.com"])


# search and get text contents
results = exa.search_and_contents("This is a Exa query:")

# search and get highlights
results = exa.search_and_contents("This is a Exa query:", highlights=True)

# search and get contents with contents options
results = exa.search_and_contents("This is a Exa query:",
                                text={"include_html_tags": True, "max_characters": 1000},
                                highlights={"highlights_per_url": 2, "num_sentences": 1, "query": "This is the highlight query:"})


# find similar documents
results = exa.find_similar("https://example.com")

# find similar excluding source domain
results = exa.find_similar("https://example.com", exclude_source_domain=True)

# find similar with contents
results = exa.find_similar_and_contents("https://example.com", text=True, highlights=True)


# get text contents
results = exa.get_contents(["ids"])

# get highlights
results = exa.get_contents(["ids"], highlights=True)

# get contents with contents options
results = exa.get_contents(["ids"],
                         text={"include_html_tags": True, "max_characters": 1000},
                         highlights={"highlights_per_url": 2, "num_sentences": 1, "query": "This is the highlight query:"})

# basic answer
response = exa.answer("This is a query to answer a question")

# answer with full text
response = exa.answer("This is a query to answer a question", text=True)

# answer with streaming
response = exa.stream_answer("This is a query to answer:")

# Print each chunk as it arrives when using the stream_answer method
for chunk in response:
print(chunk, end='', flush=True)


```

Python

Copy

Ask AI

```
from exa_py import Exa

# instantiate the Exa client
exa = Exa("YOUR API KEY")

# basic search
results = exa.search("This is a Exa query:")

# search with date filters
results = exa.search("This is a Exa query:", start_published_date="2019-01-01", end_published_date="2019-01-31")

# search with domain filters
results = exa.search("This is a Exa query:", include_domains=["www.cnn.com", "www.nytimes.com"])


# search and get text contents
results = exa.search_and_contents("This is a Exa query:")

# search and get highlights
results = exa.search_and_contents("This is a Exa query:", highlights=True)

# search and get contents with contents options
results = exa.search_and_contents("This is a Exa query:",
                                text={"include_html_tags": True, "max_characters": 1000},
                                highlights={"highlights_per_url": 2, "num_sentences": 1, "query": "This is the highlight query:"})


# find similar documents
results = exa.find_similar("https://example.com")

# find similar excluding source domain
results = exa.find_similar("https://example.com", exclude_source_domain=True)

# find similar with contents
results = exa.find_similar_and_contents("https://example.com", text=True, highlights=True)


# get text contents
results = exa.get_contents(["ids"])

# get highlights
results = exa.get_contents(["ids"], highlights=True)

# get contents with contents options
results = exa.get_contents(["ids"],
                         text={"include_html_tags": True, "max_characters": 1000},
                         highlights={"highlights_per_url": 2, "num_sentences": 1, "query": "This is the highlight query:"})

# basic answer
response = exa.answer("This is a query to answer a question")

# answer with full text
response = exa.answer("This is a query to answer a question", text=True)

# answer with streaming
response = exa.stream_answer("This is a query to answer:")

# Print each chunk as it arrives when using the stream_answer method
for chunk in response:
print(chunk, end='', flush=True)


```

Copy

Ask AI

```
import Exa from 'exa-js';

// Instantiate the Exa client
const exa = new Exa("YOUR API KEY");

// Basic search
const basicResults = await exa.search("This is a Exa query:");

// Search with date filters
const dateFilteredResults = await exa.search("This is a Exa query:", {
startPublishedDate: "2019-01-01",
endPublishedDate: "2019-01-31"
});

// Search with domain filters
const domainFilteredResults = await exa.search("This is a Exa query:", {
includeDomains: ["www.cnn.com", "www.nytimes.com"]
});

// Search and get text contents
const searchAndTextResults = await exa.searchAndContents("This is a Exa query:");

// Search and get highlights
const searchAndHighlightsResults = await exa.searchAndContents("This is a Exa query:", { highlights: true });

// Search and get contents with contents options
const searchAndCustomContentsResults = await exa.searchAndContents("This is a Exa query:", {
text: { includeHtmlTags: true, maxCharacters: 1000 },
highlights: { highlightsPerUrl: 2, numSentences: 1, query: "This is the highlight query:" }
});

// Find similar documents
const similarResults = await exa.findSimilar("https://example.com");

// Find similar excluding source domain
const similarExcludingSourceResults = await exa.findSimilar("https://example.com", { excludeSourceDomain: true });

// Find similar with contents
const similarWithContentsResults = await exa.findSimilarAndContents("https://example.com", { text: true, highlights: true });

// Get text contents
const textContentsResults = await exa.getContents(["ids"]);

// Get highlights
const highlightsContentsResults = await exa.getContents(["ids"], { highlights: true });

// Get contents with contents options
const customContentsResults = await exa.getContents(["ids"], {
text: { includeHtmlTags: true, maxCharacters: 1000 },
highlights: { highlightsPerUrl: 2, numSentences: 1, query: "This is the highlight query:" }
});

// Get answer to a question with citation contents
const answerWithTextResults = await exa.answer("What is the population of New York City?", {
text: true
});

// Get answer to a question with streaming
for await (const chunk of exa.streamAnswer("What is the population of New York City?")) {
if (chunk.content) {
process.stdout.write(chunk.content);
}
if (chunk.citations) {
console.log("\nCitations:", chunk.citations);
}
}

```

Assistant

Responses are generated using AI and may contain mistakes.

[TypeScript SDK Specification](/sdks/typescript-sdk-specification)