# EXA Blog Tool Implementation Specification

## Executive Summary

This specification defines the implementation of a blog tool for the EXA Documentation Server, enabling access to EXA-related blog posts, tutorials, case studies, and technical articles through the MCP interface.

## Motivation

The Mastra MCP server includes a blog tool that provides access to technical content beyond API documentation. The EXA server would benefit from similar functionality to:

- Share use case examples and success stories
- Provide in-depth technical tutorials
- Announce new features and updates
- Share best practices and patterns

## Blog Content Structure

### Expected Directory Layout
```
exa-mcp-docs/
├── blog/
│   ├── posts/
│   │   ├── 2024-01-15-introduction-to-websets.md
│   │   ├── 2024-02-20-research-endpoint-patterns.md
│   │   └── 2024-03-10-building-rag-with-exa.md
│   └── metadata.json
```

### Post Format
```markdown
---
title: "Introduction to Websets: Curated Search Collections"
date: "2024-01-15"
author: "Exa Team"
tags: ["websets", "tutorial", "search"]
summary: "Learn how to create and manage curated search collections with Exa Websets"
readingTime: 8
---

# Introduction to Websets

Content here...
```

### Metadata Schema
```typescript
interface BlogMetadata {
  posts: BlogPostMeta[];
  categories: string[];
  tags: string[];
}

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  summary: string;
  readingTime?: number;
  featured?: boolean;
}
```

## Tool Implementation

### Blog Tool Class

```typescript
// src/tools/blog-tool.ts
import { BaseTool } from './base-tool.js';
import { BlogPost, BlogListParams, BlogContentParams } from '../types/blog-types.js';

export class ExaBlogTool extends BaseTool {
  private blogCache: Map<string, BlogPost> = new Map();
  private metadata: BlogMetadata | null = null;

  async execute(params: BlogListParams | BlogContentParams): Promise<string> {
    // Determine operation type
    if ('slug' in params && params.slug) {
      return await this.getBlogPost(params);
    } else {
      return await this.listBlogPosts(params);
    }
  }

  private async listBlogPosts(params: BlogListParams): Promise<string> {
    const metadata = await this.loadMetadata();
    let posts = [...metadata.posts];

    // Apply filters
    if (params.tag) {
      posts = posts.filter(p => p.tags.includes(params.tag));
    }
    if (params.author) {
      posts = posts.filter(p => p.author === params.author);
    }
    if (params.featured) {
      posts = posts.filter(p => p.featured === true);
    }

    // Sort posts
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Limit results
    const limit = params.limit || 10;
    posts = posts.slice(0, limit);

    return this.formatBlogList(posts);
  }

  private async getBlogPost(params: BlogContentParams): Promise<string> {
    const { slug } = params;
    
    // Check cache
    if (this.blogCache.has(slug)) {
      return this.blogCache.get(slug)!.content;
    }

    // Load post
    const post = await this.loadBlogPost(slug);
    this.blogCache.set(slug, post);

    return this.formatBlogPost(post, params.includeMetadata);
  }

  private formatBlogList(posts: BlogPostMeta[]): string {
    if (posts.length === 0) {
      return 'No blog posts found matching your criteria.';
    }

    let output = `# Exa Blog Posts\n\n`;
    output += `Found ${posts.length} post${posts.length !== 1 ? 's' : ''}:\n\n`;

    posts.forEach((post, index) => {
      output += `## ${index + 1}. ${post.title}\n`;
      output += `📅 ${post.date} | ✍️ ${post.author}`;
      if (post.readingTime) {
        output += ` | ⏱️ ${post.readingTime} min read`;
      }
      output += `\n\n`;
      output += `${post.summary}\n\n`;
      output += `🏷️ Tags: ${post.tags.join(', ')}\n`;
      output += `🔗 Read more: Use \`exaBlog({ slug: "${post.slug}" })\`\n\n`;
      output += `---\n\n`;
    });

    return output;
  }

  private formatBlogPost(post: BlogPost, includeMetadata: boolean = false): string {
    let output = '';

    if (includeMetadata) {
      output += `---\n`;
      output += `title: ${post.title}\n`;
      output += `date: ${post.date}\n`;
      output += `author: ${post.author}\n`;
      output += `tags: ${post.tags.join(', ')}\n`;
      output += `---\n\n`;
    }

    output += post.content;

    return output;
  }
}
```

### Tool Registration

Add to `index.ts`:

```typescript
import { ExaBlogTool } from './tools/blog-tool.js';

const blogTool = new ExaBlogTool();

// In ListToolsRequestSchema handler:
{
  name: 'exaBlog',
  description: 'Access Exa blog posts, tutorials, and technical articles',
  inputSchema: {
    type: 'object',
    properties: {
      slug: {
        type: 'string',
        description: 'Specific blog post slug to retrieve'
      },
      tag: {
        type: 'string',
        description: 'Filter posts by tag'
      },
      author: {
        type: 'string',
        description: 'Filter posts by author'
      },
      featured: {
        type: 'boolean',
        description: 'Show only featured posts'
      },
      limit: {
        type: 'number',
        description: 'Maximum number of posts to return (default: 10)'
      },
      includeMetadata: {
        type: 'boolean',
        description: 'Include post metadata in response'
      }
    }
  }
}

// In CallToolRequestSchema handler:
case 'exaBlog':
  result = await blogTool.execute(toolArgs as Parameters<typeof blogTool.execute>[0]);
  break;
```

## Content Management

### Blog Post Creation

1. Create markdown file in `blog/posts/` with frontmatter
2. Update `blog/metadata.json` with post metadata
3. Optionally run build script to validate

### Build Script

```typescript
// scripts/build-blog-metadata.ts
import { glob } from 'glob';
import { readFile, writeFile } from 'fs/promises';
import matter from 'gray-matter';

async function buildBlogMetadata() {
  const posts = await glob('blog/posts/*.md');
  const metadata: BlogMetadata = {
    posts: [],
    categories: new Set<string>(),
    tags: new Set<string>()
  };

  for (const postPath of posts) {
    const content = await readFile(postPath, 'utf-8');
    const { data } = matter(content);
    
    const slug = path.basename(postPath, '.md');
    metadata.posts.push({
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
      summary: data.summary,
      readingTime: data.readingTime,
      featured: data.featured || false
    });

    data.tags?.forEach(tag => metadata.tags.add(tag));
  }

  await writeFile(
    'blog/metadata.json',
    JSON.stringify(metadata, null, 2)
  );
}
```

## Sample Blog Content

### Example Post: Introduction to Websets

```markdown
---
title: "Introduction to Websets: Curated Search Collections"
date: "2024-01-15"
author: "Exa Team"
tags: ["websets", "tutorial", "search"]
summary: "Learn how to create and manage curated search collections with Exa Websets"
readingTime: 8
featured: true
---

# Introduction to Websets: Curated Search Collections

Websets are one of Exa's most powerful features for creating curated, high-quality search collections. In this tutorial, we'll explore what websets are, how they work, and how you can use them to build better search experiences.

## What are Websets?

A webset is a curated collection of web pages that you can search within. Think of it as your own custom search index...

[Content continues...]
```

## Testing Strategy

### Unit Tests
```typescript
describe('ExaBlogTool', () => {
  it('should list all blog posts', async () => {
    const result = await blogTool.execute({});
    expect(result).toContain('Exa Blog Posts');
  });

  it('should filter posts by tag', async () => {
    const result = await blogTool.execute({ tag: 'websets' });
    expect(result).toContain('websets');
  });

  it('should retrieve specific post', async () => {
    const result = await blogTool.execute({ 
      slug: '2024-01-15-introduction-to-websets' 
    });
    expect(result).toContain('Introduction to Websets');
  });
});
```

### Manual Testing
1. List all blog posts
2. Filter by various tags
3. Retrieve individual posts
4. Test with missing posts
5. Verify caching behavior

## Migration from Documentation

Some existing documentation could be converted to blog posts:
- Getting started guides → Tutorial posts
- Use case examples → Case study posts
- Feature announcements → Release posts

## Success Metrics

1. **Content Discovery**: Users can find relevant blog posts
2. **Content Quality**: Posts provide value beyond API docs
3. **Performance**: Fast retrieval with caching
4. **Maintenance**: Easy to add new posts
5. **Integration**: Seamless experience with other tools

## Future Enhancements

1. **RSS Feed Generation**: Auto-generate RSS from blog posts
2. **Search Integration**: Full-text search within blog content
3. **Related Posts**: Suggest related content
4. **Series Support**: Group related posts into series
5. **Multilingual**: Support for multiple languages

## Timeline

- **Implementation**: 2 hours
- **Content Creation**: 4 hours (initial posts)
- **Testing**: 1 hour
- **Documentation**: 30 minutes

Total: ~1 day