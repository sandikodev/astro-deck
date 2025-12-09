#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const args = process.argv.slice(2);
const autoYes = args.includes('-y') || args.includes('--yes');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m'
};

const log = (msg) => console.log(msg);
const success = (msg) => log(`${colors.green}✓${colors.reset} ${msg}`);
const info = (msg) => log(`${colors.cyan}ℹ${colors.reset} ${msg}`);

function detectPM() {
  if (existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (existsSync('yarn.lock')) return 'yarn';
  if (existsSync('bun.lockb')) return 'bun';
  return 'npm';
}

function installCmd(pm, pkg) {
  const flag = pm === 'npm' ? '--save-dev' : '-D';
  return `${pm} ${pm === 'npm' ? 'install' : 'add'} ${flag} ${pkg}`;
}

function runCmd(pm) {
  return pm === 'npm' ? 'npm run' : pm;
}

async function main() {
  log('');
  log(`${colors.cyan}🚀 Astro Deck Setup${colors.reset}`);
  log(`${colors.dim}   Command deck for your Astro site${colors.reset}`);
  log('');

  if (!existsSync('package.json')) {
    log('❌ package.json not found. Run from your Astro project root.');
    process.exit(1);
  }

  const pm = detectPM();
  info(`Detected package manager: ${pm}`);
  log('');

  const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
  
  let useCms = autoYes;
  let useDevAll = autoYes;

  if (!autoYes) {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    const cmsAnswer = await rl.question('Install Decap CMS? (Y/n) ');
    useCms = cmsAnswer.toLowerCase() !== 'n';
    const devAllAnswer = await rl.question('Add "dev:all" script? (Y/n) ');
    useDevAll = devAllAnswer.toLowerCase() !== 'n';
    rl.close();
  }

  // 1. CMS
  if (useCms) {
    info('Installing decap-server...');
    try {
      execSync(installCmd(pm, 'decap-server'), { stdio: 'inherit' });
      success('decap-server installed');
    } catch {
      log(`⚠️  Run manually: ${installCmd(pm, 'decap-server')}`);
    }

    if (!existsSync('public/admin')) mkdirSync('public/admin', { recursive: true });
    
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
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Body", name: "body", widget: "markdown" }
`);
      success('Created public/admin/config.yml');
    }

    pkg.scripts = pkg.scripts || {};
    pkg.scripts.cms = 'decap-server';
  }

  // 2. dev:all
  if (useDevAll) {
    info('Installing concurrently...');
    try {
      execSync(installCmd(pm, 'concurrently'), { stdio: 'inherit' });
      success('concurrently installed');
    } catch {
      log(`⚠️  Run manually: ${installCmd(pm, 'concurrently')}`);
    }

    pkg.scripts = pkg.scripts || {};
    pkg.scripts['dev:all'] = `concurrently "${runCmd(pm)} dev" "${runCmd(pm)} cms"`;
  }

  // Save
  if (useCms || useDevAll) {
    writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
    success('Updated package.json');
  }

  log('');
  info('Add to astro.config.mjs:');
  log(`${colors.dim}  import astroDeck from '@sandikodev/astro-deck';${colors.reset}`);
  log(`${colors.dim}  integrations: [astroDeck()]${colors.reset}`);
  log('');
  log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  success('Done! Run:');
  log(`  ${colors.cyan}${runCmd(pm)} dev:all${colors.reset}`);
  log('');
}

main().catch(console.error);
