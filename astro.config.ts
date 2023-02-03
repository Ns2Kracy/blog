import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';

import { SITE } from './src/config';
import NetlifyCMS from 'astro-netlify-cms';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',

  output: 'static',

  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    mdx(),
    compress({
      css: true,
      html: {
        removeAttributeQuotes: false,
      },
      img: false,
      js: true,
      svg: false,

      logger: 1,
    }),
    NetlifyCMS({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'main',
        },
        publish_mode: 'editorial_workflow',
        media_folder: 'src/assets/uploads',
        public_folder: 'src/assets/uploads',
        site_url: 'https://ns2kracy.icu',
        display_url: 'https://ns2kracy.icu',
        logo_url: 'https://ns2kracy.icu/logo.svg',
        collections: [
					{
						name: 'blog',
						label: 'Blog',
						label_singular: 'Blog',
						folder: 'src/content/post',
						create: true,
						slug: '{{slug}}',
						fields: [
							{ label: '标题', name: 'title', widget: 'string', required: false },
							{ label: '作者', name: 'author', widget: 'string', required: false },
							{ label: '描述', name: 'description', widget: 'string', required: false },
							{ label: '日期', name: 'date', widget: 'datetime', required: false },
							{ label: '封面', name: 'cover', widget: 'image', required: false },
							{ label: '标签', name: 'tags', widget: 'list', required: false, allow_add: true },
							{ label: '分类', name: 'categories', widget: 'string', required: false, allow_add: true },
							{ label: '草稿', name: 'draft', widget: 'boolean', required: false },
							{ label: '内容', name: 'body', widget: 'markdown'},
						],
					},
        ],
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
    },
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
