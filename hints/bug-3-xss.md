# Bug 3: XSS Vulnerability

## The Problem
marked() converts markdown to HTML, but doesn't sanitize it.
Malicious markdown can inject scripts:

- `![x](x onerror=alert(1))` → Creates img tag that executes JS
- `<script>alert(1)</script>` → Direct script injection
- `[click me](javascript:alert(1))` → JS in links

dangerouslySetInnerHTML renders this HTML directly into the DOM.

## The Fix
Sanitize the HTML after marked() processes it, but before rendering.

### Option 1: DOMPurify (recommended)
```typescript
import DOMPurify from 'dompurify';

const html = DOMPurify.sanitize(marked(content));
```

### Option 2: marked with sanitize options
Configure marked to disable dangerous features:
```typescript
marked.setOptions({
  headerIds: false,
  mangle: false,
});
```
Then also use DOMPurify - marked alone isn't enough.

### Option 3: Don't use dangerouslySetInnerHTML
Use a React markdown component that handles sanitization:
- react-markdown
- @mdx-js/react

## Important
Don't just escape everything - you need to preserve legitimate 
markdown features (bold, italic, code blocks, links to https URLs).


