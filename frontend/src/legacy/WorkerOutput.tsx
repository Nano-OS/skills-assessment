import { marked } from 'marked';

interface WorkerOutputProps {
  content: string;
  className?: string;
}

/**
 * Renders worker/LLM output with markdown support.
 * Supports: bold, italic, code blocks, links, lists.
 * 
 * NOTE: There's a security issue with the current implementation.
 */
export function WorkerOutput({ content, className = '' }: WorkerOutputProps) {

  // Malicious content like ![x](x onerror=alert(1)) will execute JS
  const html = marked(content);
  
  return (
    <div 
      className={`worker-output prose prose-sm ${className}`}

      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}

// Example of malicious content that exploits this:
// "Here's the result: ![x](x onerror=alert('XSS'))"
// "Check this <img src=x onerror=alert(document.cookie)>"


