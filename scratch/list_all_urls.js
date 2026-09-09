const fs = require("fs");
const path = require("path");

const appDir = path.join(process.cwd(), "app");

function getRoutes(dir, base = "") {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const hasPage = entries.some(e => !e.isDirectory() && (e.name === "page.tsx" || e.name === "content.html"));
  if (hasPage && !base.includes("[")) {
    routes.push(base ? `/${base}` : "/");
  }

  for (const e of entries) {
    if (e.isDirectory() && !e.name.startsWith("_") && !e.name.startsWith(".")) {
      const nextBase = base ? `${base}/${e.name}` : e.name;
      routes = routes.concat(getRoutes(path.join(dir, e.name), nextBase));
    }
  }
  return routes;
}

const staticRoutes = getRoutes(appDir);

// Dynamic routes: check blog slugs in app/blog/[slug] or wherever blog data is defined
const blogDir = path.join(appDir, "blog/[slug]");
let blogRoutes = [];
if (fs.existsSync(blogDir)) {
  const blogPage = fs.readFileSync(path.join(blogDir, "page.tsx"), "utf8");
  const slugMatches = blogPage.matchAll(/slug:\s*["']([^"']+)["']/g);
  for (const m of slugMatches) {
    blogRoutes.push(`/blog/${m[1]}`);
  }
}

const allRoutes = Array.from(new Set([...staticRoutes, ...blogRoutes])).sort();
console.log(`Total URLs: ${allRoutes.length}`);
console.log(JSON.stringify(allRoutes, null, 2));
