export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  POSTS_PER_PAGE: number
  SITEURL: string
}

export type Link = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: 'Nusab19',
  DESCRIPTION: 'Personal blog of Nusab Taha aka Nusab19',
  EMAIL: 'nusabtaha33@gmail.com',
  NUM_POSTS_ON_HOMEPAGE: 2,
  POSTS_PER_PAGE: 4,
  SITEURL: 'https://blog19.pages.dev',
}

export const NAV_LINKS: Link[] = [
  { href: '/about', label: 'about' },
  { href: '/tags', label: 'tags' },
  { href: '/blog', label: 'blog' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://nusab19.pages.dev', label: 'Website' },
  { href: 'https://github.com/Nusab19', label: 'GitHub' },
  { href: 'https://twitter.com/Nusab19', label: 'Twitter' },
  { href: 'nusab19@duck.com', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
