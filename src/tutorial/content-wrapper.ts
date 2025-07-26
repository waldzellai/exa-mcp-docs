/**
 * Content Wrapping System for Exa Interactive Tutorials
 * 
 * Transforms raw tutorial content into tutoring prompts that instruct
 * the AI to behave as an interactive tutor rather than a documentation reader.
 * 
 * This is the core innovation of the v2.0 system based on Mastra's approach.
 */

import { TUTORING_PROMPT, Step } from '../types/tutorial-types';

/**
 * Wraps tutorial step content in a tutoring prompt that transforms AI behavior
 * 
 * @param content Raw markdown content from tutorial step
 * @param stepInfo Step metadata including title and hasCode flag
 * @returns Wrapped content that instructs AI to act as tutor
 */
export function wrapContentInTutoringPrompt(content: string, stepInfo: Step): string {
  return `${TUTORING_PROMPT}

## Current Step: ${stepInfo.title}
${stepInfo.hasCode ? '💻 **Includes Code Examples**' : '📖 **Conceptual Step**'}

### Step Content:
${content}

---

When you've completed this step, ask me to "move to the next step" and I'll use the \`nextExaTutorialStep\` tool to continue.`;
}

/**
 * Generates navigation hints for the current tutorial state
 * 
 * @param isLastStep Whether this is the last step in the tutorial
 * @param isLastLesson Whether this is the last lesson in the tutorial
 * @returns Formatted navigation hints
 */
export function generateNavigationHints(isLastStep: boolean, isLastLesson: boolean): string {
  if (isLastStep && isLastLesson) {
    return "🎉 You're on the final step! Complete this to finish the tutorial.";
  }
  
  if (isLastStep) {
    return "📚 This is the last step of this lesson. Ready to move to the next lesson?";
  }
  
  return "Ready to continue? Ask me to 'move to the next step'";
}

/**
 * Extracts frontmatter and content from markdown files
 * 
 * @param markdownContent Raw markdown content with frontmatter
 * @returns Parsed frontmatter and content
 */
export function parseMarkdownContent(markdownContent: string): {
  frontmatter: Record<string, any>;
  content: string;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdownContent.match(frontmatterRegex);
  
  if (!match) {
    return {
      frontmatter: {},
      content: markdownContent
    };
  }
  
  const frontmatterLines = match[1].split('\n');
  const frontmatter: Record<string, any> = {};
  
  for (const line of frontmatterLines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      // Remove quotes if present
      const cleanValue = value.replace(/^["']|["']$/g, '');
      
      // Parse boolean values
      if (cleanValue === 'true') {
        frontmatter[key.trim()] = true;
      } else if (cleanValue === 'false') {
        frontmatter[key.trim()] = false;
      } else {
        frontmatter[key.trim()] = cleanValue;
      }
    }
  }
  
  return {
    frontmatter,
    content: match[2]
  };
}

/**
 * Validates that step content is properly formatted
 * 
 * @param content Step content to validate
 * @returns Validation result with any issues found
 */
export function validateStepContent(content: string): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  // Check for empty content
  if (!content.trim()) {
    issues.push('Step content is empty');
  }
  
  // Check for proper markdown structure
  if (!content.includes('#')) {
    issues.push('Step content should include at least one heading');
  }
  
  // Check for code blocks if step claims to have code
  const hasCodeBlocks = content.includes('```');
  const hasCodeIndicators = content.includes('💻') || content.includes('Code');
  
  if (hasCodeIndicators && !hasCodeBlocks) {
    issues.push('Step indicates code examples but no code blocks found');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}

/**
 * Processes tutorial content for terminal display
 * 
 * @param content Raw content
 * @returns Content optimized for terminal display
 */
export function optimizeForTerminal(content: string): string {
  // Replace multiple newlines with double newlines
  let processed = content.replace(/\n{3,}/g, '\n\n');
  
  // Ensure proper spacing around code blocks
  processed = processed.replace(/```/g, '\n```\n');
  
  // Add proper spacing around headers
  processed = processed.replace(/^(#{1,6})\s*(.+)$/gm, '\n$1 $2\n');
  
  // Clean up extra whitespace
  processed = processed.replace(/\n{3,}/g, '\n\n');
  
  return processed.trim();
}

/**
 * Adds celebration message for step completion
 * 
 * @param stepTitle Title of completed step
 * @param isLastStep Whether this was the last step
 * @returns Formatted celebration message
 */
export function generateCelebrationMessage(stepTitle: string, isLastStep: boolean): string {
  if (isLastStep) {
    return `🎉 Congratulations! You've completed "${stepTitle}" and finished the tutorial!`;
  }
  
  return `🎉 Great job completing "${stepTitle}"!`;
}

/**
 * Generates step header with emoji formatting
 * 
 * @param lessonTitle Title of current lesson
 * @param stepTitle Title of current step
 * @param stepNumber Current step number
 * @param totalSteps Total steps in lesson
 * @returns Formatted step header
 */
export function generateStepHeader(
  lessonTitle: string,
  stepTitle: string,
  stepNumber: number,
  totalSteps: number
): string {
  return `📘 Lesson: ${lessonTitle}
📝 Step: ${stepTitle} (${stepNumber}/${totalSteps})`;
}

/**
 * Wraps content with tutorial context for better AI behavior
 * 
 * @param content Step content
 * @param stepInfo Step metadata
 * @param lessonTitle Current lesson title
 * @param stepNumber Current step number
 * @param totalSteps Total steps in lesson
 * @returns Fully wrapped content ready for AI consumption
 */
export function wrapWithFullContext(
  content: string,
  stepInfo: Step,
  lessonTitle: string,
  stepNumber: number,
  totalSteps: number
): string {
  const header = generateStepHeader(lessonTitle, stepInfo.title, stepNumber, totalSteps);
  const optimizedContent = optimizeForTerminal(content);
  const navigationHints = generateNavigationHints(
    stepNumber === totalSteps,
    false // We'll determine this at the lesson level
  );
  
  return `${TUTORING_PROMPT}

${header}
${stepInfo.hasCode ? '💻 **Includes Code Examples**' : '📖 **Conceptual Step**'}

### Step Content:
${optimizedContent}

---

${navigationHints}`;
}