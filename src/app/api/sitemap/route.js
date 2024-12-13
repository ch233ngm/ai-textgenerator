export async function GET() {
    const domain = 'https://ai-textgenerator.net';
  
    const pages = [
      { loc: '/en', lastmod: '2024-12-14', changefreq: 'daily', priority: 1.0 },
      { loc: '/zh', lastmod: '2024-12-14', changefreq: 'daily', priority: 1.0 },
      { loc: '/en/ai-text-generator', lastmod: '2024-12-14', changefreq: 'weekly', priority: 0.8 },
      { loc: '/zh/ai-text-generator', lastmod: '2024-12-14', changefreq: 'weekly', priority: 0.8 },
    ];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${pages.map((page) => `
          <url>
            <loc>${domain}${page.loc}</loc>
            <lastmod>${page.lastmod}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
            <xhtml:link rel="alternate" hreflang="en" href="${domain}/en${page.loc.replace('/en', '')}" />
            <xhtml:link rel="alternate" hreflang="zh" href="${domain}/zh${page.loc.replace('/zh', '')}" />
          </url>
        `).join('')}
      </urlset>`;
  
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
  