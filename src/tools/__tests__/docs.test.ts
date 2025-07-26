import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { callTool, mcp } from './test-setup';

describe('docsTool', () => {
  let tools: any;

  beforeAll(async () => {
    tools = await mcp.getTools();
  });

  afterAll(async () => {
    await mcp.disconnect();
  });

  describe('execute', () => {
    it('should list directory contents when no specific path is requested', async () => {
      const result = await callTool(tools.mastra_mastraDocs, { paths: [''] });
      expect(result).toContain('Directory contents of :');
      expect(result).toContain('Subdirectories:');
      expect(result).toContain('Files in this directory:');
      expect(result).toContain('index.mdx');
    });

    it('should return content for index.mdx', async () => {
      const result = await callTool(tools.mastra_mastraDocs, { paths: ['index.mdx'] });
      expect(result).toContain('## index.mdx');
      expect(result).toContain('# About Mastra');
    });

    it('should handle directory listings', async () => {
      const result = await callTool(tools.mastra_mastraDocs, { paths: ['reference'] });
      expect(result).toContain('Directory contents of reference');
      expect(result).toContain('Subdirectories:');
      expect(result).toContain('Files in this directory:');
    });

    it('should handle non-existent paths gracefully', async () => {
      const result = await callTool(tools.mastra_mastraDocs, { paths: ['non-existent-path'] });
      expect(result).toContain('Path "non-existent-path" not found');
      expect(result).toContain('Here are all available paths');
    });

    it('should handle multiple paths in a single request', async () => {
      const result = await callTool(tools.mastra_mastraDocs, {
        paths: ['index.mdx', 'reference/tools'],
      });

      expect(result).toContain('## index.mdx');
      expect(result).toContain('## reference/tools');
    });

    it('should find nearest directory when path is partially correct', async () => {
      const result = await callTool(tools.mastra_mastraDocs, { paths: ['reference/tools/non-existent'] });
      expect(result).toContain('Path "reference/tools/non-existent" not found');
      expect(result).toContain('Here are the available paths in "reference/tools"');
    });

    it('should handle paths with special characters', async () => {
      const result = await callTool(tools.mastra_mastraDocs, { paths: ['reference/tools/'] });
      expect(result).toContain('Directory contents of reference/tools');
    });

    it('should handle MDX files with frontmatter', async () => {
      const result = await callTool(tools.mastra_mastraDocs, { paths: ['reference/rag/document.mdx'] });
      expect(result).toContain('title: "Reference: MDocument | Document Processing | RAG | Mastra Docs"');
      expect(result).toContain('description: Documentation for the MDocument class in Mastra');
      expect(result).toContain('# MDocument');
    });

    it('should handle MDX files with custom components', async () => {
      const result = await callTool(tools.mastra_mastraDocs, { paths: ['reference/rag/document.mdx'] });
      expect(result).toContain('<PropertiesTable');
      expect(result).toContain('content={[');
      expect(result).toContain('name:');
      expect(result).toContain('type:');
      expect(result).toContain('description:');
    });
    it('should work when queryKeywords is an empty array', async () => {
      const result = await callTool(tools.mastra_mastraDocs, { paths: ['reference'], queryKeywords: [] });
      expect(result).toContain('Directory contents of reference');
    });

    it('should normalize whitespace and case in queryKeywords', async () => {
      const result = await callTool(tools.mastra_mastraDocs, {
        paths: ['reference'],
        queryKeywords: ['  Rag ', '  meMory   ', 'rag'], // intentional spaces and case
      });
      // Should not throw, and should dedupe/normalize keywords
      expect(result).toContain('Directory contents of reference');
    });

    it('should return directory contents when given a valid path', async () => {
      const result = await callTool(tools.mastra_mastraDocs, { paths: ['reference'], queryKeywords: ['rag'] });
      expect(result).toContain('Directory contents of reference');
    });

    it('should use queryKeywords to find relevant content when path is invalid', async () => {
      const result = await callTool(tools.mastra_mastraDocs, {
        paths: ['non-existent-path'],
        queryKeywords: ['memory'],
      });
      // Should not throw, and should suggest or return content related to 'memory'
      expect(result.toLowerCase()).toMatch(/memory/);
    });
  });
});
