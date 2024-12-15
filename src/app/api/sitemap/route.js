import fs from 'fs';
import path from 'path';

export async function GET() {
    const domain = 'https://ai-textgenerator.net';
    const currentDate = new Date().toISOString().split('T')[0];
    const pages = [
      { loc: '/en', lastmod: '2024-12-14', changefreq: 'daily', priority: 1.0 },
      { loc: '/zh', lastmod: '2024-12-14', changefreq: 'daily', priority: 1.0 },
      { loc: '/fr', lastmod: '2024-12-15', changefreq: 'daily', priority: 1.0 },
      { loc: '/en/ai-text-generator', lastmod: '2024-12-14', changefreq: 'weekly', priority: 0.8 },
      { loc: '/zh/ai-text-generator', lastmod: '2024-12-14', changefreq: 'weekly', priority: 0.8 },
      { loc: '/fr/ai-text-generator', lastmod: '2024-12-15', changefreq: 'weekly', priority: 0.8 },
      { loc: '/en/blog', lastmod: currentDate, changefreq: 'daily', priority: 0.8 },
    ];

     // 动态添加博客文章
     const blogDir = path.join(process.cwd(), 'data', 'blog');
     const blogFiles = fs.readdirSync(blogDir);
 
     blogFiles.forEach(file => {
         const filePath = path.join(blogDir, file);
         const stats = fs.statSync(filePath);
         const lastModified = stats.mtime.toISOString().split('T')[0];
         const slug = path.parse(file).name;
 
         ['en'].forEach(lang => {
             pages.push({
                 loc: `/${lang}/blog/${slug}`,
                 lastmod: lastModified,
                 changefreq: 'weekly',
                 priority: 0.7
             });
         });
     });
  
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
  