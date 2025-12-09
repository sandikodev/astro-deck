# 🚀 Astro Deck

Command deck for your Astro site - Admin hub with CMS integration, AI prompt generator, and more.

## Installation

```bash
pnpm astro add astro-deck
```

Or manually:

```bash
pnpm add @sandikodev/astro-deck
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import astroDeck from '@sandikodev/astro-deck';

export default defineConfig({
  integrations: [astroDeck()]
});
```

## Features

### 📝 CMS Integration
Decap CMS integration for content management. Requires `decap-server` for local development:

```bash
pnpm add -D decap-server
```

Add to `package.json`:
```json
{
  "scripts": {
    "cms": "decap-server"
  }
}
```

### ✨ AI Prompt Generator
Generate article prompts or full articles using AI (Gemini API).

- Template-based prompt generation for Kiro CLI
- Direct AI generation with Gemini API
- Auto-formatted markdown with frontmatter

### ⚙️ Settings
Configure API keys and preferences via browser UI.

## Configuration

```js
astroDeck({
  cms: true,              // Enable CMS (default: true)
  promptGenerator: true,  // Enable Prompt Generator (default: true)
  basePath: '/admin'      // Admin route path (default: '/admin')
})
```

## Routes

| Route | Description |
|-------|-------------|
| `/admin` | Admin hub dashboard |
| `/admin/cms` | Decap CMS interface |
| `/admin/prompt` | AI Prompt Generator |
| `/admin/settings` | API configuration |

## Usage

### Local Development

```bash
# Terminal 1 - Astro dev server
pnpm dev

# Terminal 2 - CMS backend (if using CMS)
pnpm cms
```

Then open `http://localhost:4321/admin`

### AI Prompt Generator

1. Configure Gemini API key in Settings
2. Fill article form in Prompt Generator
3. Click "Generate Prompt" (for Kiro CLI) or "Generate with AI" (direct)
4. Copy result to CMS

---

## ⚠️ Security Awareness

### API Key Storage

API keys are stored in **browser localStorage**. This means:

✅ **Safe from:**
- Server-side exposure
- Git commits
- Cross-origin access

⚠️ **Vulnerable to:**
- Malicious browser extensions
- XSS attacks (if your site is compromised)
- Physical access to your device

### Recommendations

1. **Review your browser extensions** - Remove any you don't trust
2. **Use separate browser profile** for development
3. **Rotate API keys** periodically
4. **Use restricted API keys** with minimal permissions
5. **Don't use on shared/public computers**

### For Production

If deploying admin publicly, consider:
- Adding authentication layer
- Moving API calls to server-side
- Using environment variables

### Gemini API Key Best Practices

1. Get key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Set API restrictions (HTTP referrers)
3. Set quota limits
4. Monitor usage regularly

---

## License

MIT © [Sandiko Dev](https://github.com/sandikodev)
