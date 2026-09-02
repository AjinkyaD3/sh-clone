import os
import re
import json
import urllib.request

app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"
public_legacy = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\public\legacy-assets"

page = {
    "slug": "3-point-locking",
    "title": "Secure 3-Point Locking | Reliable Security Door Systems",
    "description": "Explore secure 3-point locking systems for doors. Our advanced 3 point locking solutions ensure maximum safety for your home or office's entrance.",
    "schema": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/3-point-locking"},
      "headline": "Secure 3-Point Locking | Reliable Security Door Systems",
      "description": "Explore secure 3-point locking systems for doors. Our advanced 3 point locking solutions ensure maximum safety for your home or office's entrance.",
      "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
      "author": {"@type": "Organization", "name": ""},
      "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
      "datePublished": "2025-10-14",
      "dateModified": "2025-10-15"
    }
}

slug = page['slug']
html_url = f"https://secure-house.co.uk/{slug}/"
print(f"Fetching {html_url}...", flush=True)
req = urllib.request.Request(html_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as response:
        html = response.read().decode('utf-8')
except Exception as e:
    print(f"Failed to fetch {html_url}: {e}", flush=True)
    exit(1)

# Extract body class
body_match = re.search(r'<body class="([^"]*)"', html)
body_class = body_match.group(1) if body_match else "wp-singular page-template page-template-100-width page-template-100-width-php"

# Path rewriting
html = html.replace("https://secure-house.co.uk/wp-content/", "/legacy-assets/")
html = html.replace("/wp-content/", "/legacy-assets/")
html = html.replace("https://secure-house.co.uk/", "/")

# Remove bv_host query params
html = re.sub(r'\?bv_host=[^"\s\']*', '', html)

# Lazy-load renames
html = html.replace('bv-data-src=', 'src=')
html = html.replace('bv-data-srcset=', 'bv-srcset=')

# Spam stripping (cfemail)
html = re.sub(r'<a[^>]*cf_email[^>]*>.*?</a>', 'info@secure-house.co.uk', html)

# Remove Cloudflare scripts (email decode script)
html = re.sub(r'<script[^>]*cdn-cgi/scripts[^>]*>.*?</script>', '', html, flags=re.DOTALL)

# Find missing legacy-assets
asset_paths = re.findall(r'/legacy-assets/([^"\'\s>]+)', html)
for asset in asset_paths:
    local_path = os.path.join(public_legacy, asset.split('?')[0])
    if not os.path.exists(local_path):
        remote_url = f"https://secure-house.co.uk/wp-content/{asset}"
        print(f"Downloading missing asset: {asset}", flush=True)
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        try:
            req_asset = urllib.request.Request(remote_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req_asset, timeout=5) as response, open(local_path, 'wb') as out_file:
                out_file.write(response.read())
        except Exception as e:
            print(f"Failed to download {remote_url}: {e}", flush=True)

# Save to app
out_dir = os.path.join(app_root, slug)
os.makedirs(out_dir, exist_ok=True)

content_file = os.path.join(out_dir, "content.html")
with open(content_file, "w", encoding="utf-8") as f:
    f.write(html)
    
schema_str = json.dumps(page['schema'], separators=(',', ':'))

# Escape quotes and backslashes for TSX template literal
title_escaped = page['title'].replace("'", "\\'")
desc_escaped = page['description'].replace("'", "\\'")
    
page_tsx = f"""import fs from 'fs';
import path from 'path';

import type {{ Metadata }} from 'next';

export const metadata: Metadata = {{
  title: '{title_escaped}',
  description: '{desc_escaped}',
  alternates: {{
    canonical: 'https://secure-house-next-js.vercel.app/{slug}',
  }},
}};

export default function Page() {{
  const filePath = path.join(process.cwd(), 'app', '{slug}', 'content.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return (
    <>
      <div className="{body_class}" suppressHydrationWarning dangerouslySetInnerHTML={{{{ __html: html }}}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify({schema_str}) }}}} />
    </>
  );
}}
"""
page_file = os.path.join(out_dir, "page.tsx")
with open(page_file, "w", encoding="utf-8") as f:
    f.write(page_tsx)
    
print(f"Processed: {slug}", flush=True)
