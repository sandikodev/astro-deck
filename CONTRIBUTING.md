# Contributing to Astro Deck

Terima kasih sudah tertarik berkontribusi! 🚀

## Quick Start

```bash
# Clone repo
git clone https://github.com/sandikodev/astro-deck.git
cd astro-deck

# Test di project Astro lokal
npm link
cd ../your-astro-project
npm link @sandikodev/astro-deck
```

## Struktur Project

```
astro-deck/
├── index.js          # Astro integration entry point
├── index.d.ts        # TypeScript declarations
├── package.json
├── README.md
├── SECURITY.md
├── CONTRIBUTING.md
└── src/
    └── pages/
        ├── admin.astro           # Hub dashboard
        └── admin/
            ├── cms.astro         # Decap CMS
            ├── prompt.astro      # AI Prompt Generator
            ├── settings.astro    # API configuration
            └── images.astro      # Image Optimizer
```

## Cara Kerja

Astro Deck adalah **Astro Integration** yang inject routes ke project user:

```js
// index.js
export default function astroDeck(options) {
  return {
    name: 'astro-deck',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/admin',
          entrypoint: 'src/pages/admin.astro'
        });
      }
    }
  };
}
```

## Menambah Tool Baru

1. Buat file di `src/pages/admin/[tool-name].astro`
2. Update `src/pages/admin.astro` - tambah card link
3. Update `index.js` - tambah `injectRoute()`
4. Update `README.md` - dokumentasi

### Template Tool Baru

```astro
---
// src/pages/admin/my-tool.astro
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>My Tool - Admin Hub</title>
  <style>
    /* Copy base styles dari tool lain */
  </style>
</head>
<body>
  <div class="container">
    <a href="/admin" class="back">← Back to Admin Hub</a>
    <h1>My Tool</h1>
    <!-- Tool content -->
  </div>
</body>
</html>
```

## Code Style

- Vanilla JS (no framework di admin pages)
- CSS inline di `<style>` tag
- Dark theme (#0a0a0a background)
- Consistent spacing dan typography

## Testing

```bash
# Di folder astro-deck
npm link

# Di project Astro test
npm link @sandikodev/astro-deck
npm run dev

# Buka http://localhost:4321/admin
```

## Pull Request

1. Fork repo
2. Buat branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m "feat: add my feature"`
4. Push: `git push origin feat/my-feature`
5. Buka PR ke `main`

### Commit Convention

```
feat: fitur baru
fix: bug fix
docs: dokumentasi
style: formatting
refactor: refactor code
ci: CI/CD changes
chore: maintenance
```

## Versioning

Kami pakai [Semantic Versioning](https://semver.org/):

- `patch` (0.2.0 → 0.2.1): Bug fixes
- `minor` (0.2.0 → 0.3.0): Fitur baru
- `major` (0.2.0 → 1.0.0): Breaking changes

## Ideas & Roadmap

Tools yang bisa ditambahkan:

- [ ] SEO Checker
- [ ] Analytics Dashboard
- [ ] Markdown Preview
- [ ] Link Checker
- [ ] Performance Audit
- [ ] Sitemap Generator
- [ ] RSS Feed Manager

Punya ide lain? Buka [issue](https://github.com/sandikodev/astro-deck/issues)!

## Questions?

- Buka [issue](https://github.com/sandikodev/astro-deck/issues)
- Diskusi di [GitHub Discussions](https://github.com/sandikodev/astro-deck/discussions)

---

Made with ☕ by [Sandiko Dev](https://github.com/sandikodev)
