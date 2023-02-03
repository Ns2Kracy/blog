import { getBlogPermalink, getAsset } from '@utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    // {
    //   text: 'Categories',
    //   href: getPermalink('categories'),
    // },
  ],
};

export const footerData = {
  socialLinks: [
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/Ns2Kracy' },
  ],
  footNote: `
    Powered by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://astro.build/"> Astro</a>,
    Template by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://github.com/onwidget/astrowind/">🚀Astrowind</a>
  `,
};
