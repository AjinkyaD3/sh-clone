import os
import re
import urllib.request

html_url = "https://secure-house.co.uk/doors/stained-glass-doors/"
req = urllib.request.Request(html_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
except Exception as e:
    print(f"Failed to fetch {html_url}: {e}")
    exit(1)

route = "doors/stained-glass-doors"
app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"
public_legacy = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\public\legacy-assets"

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
        print(f"Downloading missing asset: {asset}")
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        try:
            req_asset = urllib.request.Request(remote_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req_asset) as response, open(local_path, 'wb') as out_file:
                out_file.write(response.read())
        except Exception as e:
            print(f"Failed to download {remote_url}: {e}")

# Save to app
out_dir = os.path.join(app_root, route)
os.makedirs(out_dir, exist_ok=True)

content_file = os.path.join(out_dir, "content.html")
with open(content_file, "w", encoding="utf-8") as f:
    f.write(html)
    
page_tsx = f"""import fs from 'fs';
import path from 'path';

import type {{ Metadata }} from 'next';

export const metadata: Metadata = {{
  title: 'Stained Glass Doors | Victorian, Edwardian & Modern UK',
  description: 'Hand-designed stained glass doors for period and modern UK homes. Victorian, Edwardian and custom designs. Full security certified. Free consultation.',
  alternates: {{
    canonical: 'https://secure-house-next-js.vercel.app/doors/stained-glass-doors',
  }},
}};

export default function Page() {{
  const filePath = path.join(process.cwd(), 'app', '{route}', 'content.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return (
    <div className="{body_class}" suppressHydrationWarning dangerouslySetInnerHTML={{{{ __html: html }}}} />
  );
}}
"""
page_file = os.path.join(out_dir, "page.tsx")
with open(page_file, "w", encoding="utf-8") as f:
    f.write(page_tsx)
    
print(f"Processed: {route}")
