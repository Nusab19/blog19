import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('Missing site configuration', { status: 500 })
  }

  // Get all blog posts
  const posts = await getCollection('blog', ({ data }) => !data.draft && !data.hidden)
  
  // Generate sitemap entries
  const pages = posts.map(post => ({
    url: `${site.toString()}blog/${post.id}/`,
    lastmod: post.data.date.toISOString().split('T')[0]
  }))

  // Add static pages
  const staticPages = [
    '',
    'about',
    'blog',
    'tags',
  ].map(page => ({
    url: `${site.toString()}${page}`,
    // You can add lastmod if you track page modifications
    lastmod: new Date().toISOString().split('T')[0]
  }))

  const allPages = [...staticPages, ...pages]

  // Return sitemap XML
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages.map(page => `
        <url>
          <loc>${page.url}</loc>
          <lastmod>${page.lastmod}</lastmod>
        </url>
      `).join('')}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  )
}