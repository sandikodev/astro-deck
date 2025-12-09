import type { AstroIntegration } from 'astro';

export interface AstroDeckOptions {
  /** Enable Decap CMS integration (default: true) */
  cms?: boolean;
  /** Enable AI Prompt Generator (default: true) */
  promptGenerator?: boolean;
  /** Base path for admin routes (default: '/admin') */
  basePath?: string;
}

export default function astroDeck(options?: AstroDeckOptions): AstroIntegration;
