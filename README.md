# 🚀 Astro Deck

> Command deck for your Astro site

Admin hub with CMS integration, AI prompt generator, image optimizer, and more.

[![npm version](https://img.shields.io/npm/v/@sandikodev/astro-deck.svg)](https://www.npmjs.com/package/@sandikodev/astro-deck)
[![license](https://img.shields.io/npm/l/@sandikodev/astro-deck.svg)](https://github.com/sandikodev/astro-deck/blob/main/LICENSE)

## Installation

```bash
npm install @sandikodev/astro-deck
# or
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

Decap CMS integration for content management.

**Setup:**
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

Create `public/admin/config.yml`:
```yaml
local_backend: true
backend:
  name: git-gateway
  branch: main

media_folder: "public/images"
public_folder: "/images"

collections:
  - name: "posts"
    label: "Posts"
    folder: "src/content/posts"
    create: true
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Body", name: "body", widget: "markdown" }
```

Run both servers:
```bash
pnpm dev   # Terminal 1
pnpm cms   # Terminal 2
```

### ✨ AI Prompt Generator

Generate article prompts or full articles using AI.

**Modes:**
- **Template mode**: Generate prompts for Kiro CLI / ChatGPT / Claude
- **AI mode**: Direct generation with Gemini API

**Setup Gemini:**
1. Get API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Go to `/admin/settings`
3. Enter API key and save

### 🖼️ Image Optimizer

Client-side image compression. No upload to server.

**Features:**
- Drag & drop interface
- Convert to WebP/JPEG/PNG
- Resize dimensions
- Quality control
- Instant download

### ⚙️ Settings

Configure API keys and preferences. Stored in browser localStorage (never sent to server).

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
| `/admin` | Hub dashboard |
| `/admin/cms` | Decap CMS interface |
| `/admin/prompt` | AI Prompt Generator |
| `/admin/images` | Image Optimizer |
| `/admin/settings` | API configuration |

## Security

API keys are stored in **browser localStorage**:

✅ Never sent to your server  
✅ Never committed to git  
⚠️ Accessible to browser extensions  

**Recommendations:**
- Use dedicated browser profile for development
- Review installed extensions
- Rotate API keys periodically

See [SECURITY.md](./SECURITY.md) for details.

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

**Ideas for new tools:**
- SEO Checker
- Analytics Dashboard
- Link Checker
- Performance Audit

## Roadmap

- [x] CMS Integration
- [x] AI Prompt Generator
- [x] Image Optimizer
- [x] Settings page
- [ ] SEO Checker
- [ ] Analytics Dashboard
- [ ] Plugin system for custom tools

## License

MIT © [Sandiko Dev](https://github.com/sandikodev)

---

<p align="center">
  <sub>Built with ☕ for the Astro community</sub>
</p>
