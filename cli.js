#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { execSync } from 'node:child_process';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, r));

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m'
};

const log = (msg) => console.log(msg);
const success = (msg) => log(`${colors.green}✓${colors.reset} ${msg}`);
const info = (msg) => log(`${colors.cyan}ℹ${colors.reset} ${msg}`);

async function main() {
  log('');
  log(`${colors.cyan}🚀 Astro Deck Setup${colors.reset}`);
  log(`${colors.dim}   Command deck for your Astro site${colors.reset}`);
  log('');

  // Check package.json exists
  if (!existsSync('package.json')) {
    log('❌ package.json not found. Run this from your Astro project root.');
    process.exit(1);
  }

  const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

  // 1. Ask about CMS
  const useCms = (await ask('Install Decap CMS for content management? (Y/n) ')).toLowerCase() !== 'n';
  
  if (useCms) {
    info('Installing decap-server...');
    try {
      execSync('npm install -D decap-server', { stdio: 'inherit' });
      success('decap-server installed');
    } catch {
      log('⚠️  Failed to install decap-server. Install manually: npm i -D decap-server');
    }

    // Create CMS config
    if (!existsSync('public/admin')) {
      mkdirSync('public/admin', { recursive: true });
    }
    
    if (!existsSync('public/admin/config.yml')) {
      writeFileSync('public/admin/config.yml', `local_backend: true
backend:
  name: git-gateway
  branch: main

media_folder: "public/images/posts"
public_folder: "/images/posts"

collections:
  - name: "posts"
    label: "Blog Posts"
    folder: "src/content/posts"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Description", name: "description", widget: "text" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Image", name: "image", widget: "image", required: false }
      - { label: "Draft", name: "draft", widget: "boolean", default: false }
      - { label: "Body", name: "body", widget: "markdown" }
`);
      success('Created public/admin/config.yml');
    }
  }

  // 2. Ask about dev:all script
  const useDevAll = (await ask('Add "dev:all" script to run Astro + CMS together? (Y/n) ')).toLowerCase() !== 'n';

  if (useDevAll) {
    info('Installing concurrently...');
    try {
      execSync('npm install -D concurrently', { stdio: 'inherit' });
      success('concurrently installed');
    } catch {
      log('⚠️  Failed to install concurrently');
    }

    // Update package.json scripts
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.cms = 'decap-server';
    pkg.scripts['dev:all'] = 'concurrently "npm run dev" "npm run cms"';
    
    writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
    success('Added "cms" and "dev:all" scripts to package.json');
  }

  // 3. Check astro.config
  log('');
  info('Add to your astro.config.mjs:');
  log('');
  log(`${colors.dim}  import astroDeck from '@sandikodev/astro-deck';${colors.reset}`);
  log('');
  log(`${colors.dim}  export default defineConfig({${colors.reset}`);
  log(`${colors.dim}    integrations: [astroDeck()]${colors.reset}`);
  log(`${colors.dim}  });${colors.reset}`);
  log('');

  // Done
  log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log('');
  success('Setup complete!');
  log('');
  log('  Run your dev server:');
  log(`  ${colors.cyan}${useDevAll ? 'npm run dev:all' : 'npm run dev'}${colors.reset}`);
  log('');
  log(`  Open ${colors.cyan}http://localhost:4321/admin${colors.reset}`);
  log('');

  rl.close();
}

main().catch(console.error);
