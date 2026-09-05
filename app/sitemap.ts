import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://secure-house-next-js.vercel.app';

function getPages(dir: string, basePath: string = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const urls: string[] = [];

  for (const entry of entries) {
    // Skip non-route directories
    if (entry.name.startsWith('.') || entry.name.startsWith('_') || entry.name === 'api') {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recurse into subdirectories
      urls.push(...getPages(fullPath, `${basePath}/${entry.name}`));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts' || entry.name === 'page.jsx' || entry.name === 'page.js' || entry.name === 'content.html') {
      // Found a page — add the route
      urls.push(basePath || '/');
    }
  }

  return urls;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), 'app');
  const pages = getPages(appDir);

  return pages.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : route.split('/').length <= 2 ? 0.8 : 0.6,
  }));
}
