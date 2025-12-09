import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

/**
 * @typedef {Object} AstroDeckOptions
 * @property {boolean} [cms=true] - Enable Decap CMS integration
 * @property {boolean} [promptGenerator=true] - Enable AI Prompt Generator
 * @property {string} [basePath='/admin'] - Base path for admin routes
 */

/**
 * Astro Deck - Command deck for your Astro site
 * @param {AstroDeckOptions} options
 * @returns {import('astro').AstroIntegration}
 */
export default function astroDeck(options = {}) {
  const {
    cms = true,
    promptGenerator = true,
    basePath = '/admin'
  } = options;

  return {
    name: 'astro-deck',
    hooks: {
      'astro:config:setup': ({ injectRoute, logger }) => {
        const currentDir = dirname(fileURLToPath(import.meta.url));
        
        logger.info('🚀 Astro Deck initializing...');

        // Inject admin hub
        injectRoute({
          pattern: basePath,
          entrypoint: join(currentDir, 'src/pages/admin.astro')
        });

        // Inject settings
        injectRoute({
          pattern: `${basePath}/settings`,
          entrypoint: join(currentDir, 'src/pages/admin/settings.astro')
        });

        // CMS routes
        if (cms) {
          injectRoute({
            pattern: `${basePath}/cms`,
            entrypoint: join(currentDir, 'src/pages/admin/cms.astro')
          });
          logger.info('  ├─ CMS enabled');
        }

        // Prompt Generator routes
        if (promptGenerator) {
          injectRoute({
            pattern: `${basePath}/prompt`,
            entrypoint: join(currentDir, 'src/pages/admin/prompt.astro')
          });
          logger.info('  ├─ Prompt Generator enabled');
        }

        // Image Optimizer
        injectRoute({
          pattern: `${basePath}/images`,
          entrypoint: join(currentDir, 'src/pages/admin/images.astro')
        });
        logger.info('  ├─ Image Optimizer enabled');

        logger.info(`  └─ Admin available at ${basePath}`);
      }
    }
  };
}
