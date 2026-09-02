import os
import re
import json
import urllib.request
import socket

socket.setdefaulttimeout(15)

app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"
public_legacy = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\public\legacy-assets"

pages = [
    {
        "slug": "artistic-door",
        "title": "Artistic Door Designs | Elegant & Custom Door Creations",
        "description": "Discover stunning artistic-door designs crafted for elegance and durability. Enhance your home's entrance with modern, custom-made artistic doors.",
        "schema": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/artistic-door"},
          "headline": "Artistic Door Designs | Elegant & Custom Door Creations",
          "description": "Discover stunning artistic-door designs crafted for elegance and durability. Enhance your home's entrance with modern, custom-made artistic doors.",
          "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
          "author": {"@type": "Organization", "name": ""},
          "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
          "datePublished": "2025-10-14",
          "dateModified": "2025-10-15"
        }
    },
    {
        "slug": "hide-panic-room",
        "title": "Hide Panic Room Designs | Secure & Concealed Home Solutions",
        "description": "Discover expertly crafted hide panic room designs that offer maximum security and seamless concealment, keeping your home safe and discreet.",
        "schema": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/hide-panic-room"},
          "headline": "Hide Panic Room Designs | Secure & Concealed Home Solutions",
          "description": "Discover expertly crafted hide panic room designs that offer maximum security and seamless concealment, keeping your home safe and discreet.",
          "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
          "author": {"@type": "Organization", "name": ""},
          "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
          "datePublished": "2025-10-14",
          "dateModified": "2025-10-15"
        }
    },
    {
        "slug": "bulletproof-doors",
        "title": "Bullet Proof Doors and Windows by Secure House",
        "description": "Get bullet proof safety with Secure House's Skydas Premium Plus doors—FB4 & FB6 rated for unmatched protection and elegant design.",
        "schema": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/bulletproof-doors"},
          "headline": "Bullet Proof Doors and Windows by Secure House",
          "description": "Get bullet proof safety with Secure House's Skydas Premium Plus doors—FB4 & FB6 rated for unmatched protection and elegant design.",
          "image": "",
          "author": {"@type": "Organization", "name": ""},
          "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
          "datePublished": "2025-10-14",
          "dateModified": "2025-10-15"
        }
    },
    {
        "slug": "burglar-proofing",
        "title": "Top Security Tips to Burglar-Proof Your Retail Shop",
        "description": "Protect your store with Secure House's expert tips on alarms, CCTV, shutters, and reinforced doors to keep burglars away.",
        "schema": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/burglar-proofing"},
          "headline": "Top Security Tips to Burglar-Proof Your Retail Shop",
          "description": "Protect your store with Secure House's expert tips on alarms, CCTV, shutters, and reinforced doors to keep burglars away.",
          "image": "",
          "author": {"@type": "Organization", "name": ""},
          "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
          "datePublished": "2025-10-14",
          "dateModified": "2025-10-15"
        }
    },
    {
        "slug": "extend-life-of-communal-door",
        "title": "How to Extend the Life of Your Communal Door",
        "description": "Discover expert tips from Secure House to make your communal doors last longer with durable materials, smart locks, and low-maintenance designs.",
        "schema": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/extend-life-of-communal-door"},
          "headline": "How to Extend the Life of Your Communal Door?",
          "description": "Discover expert tips from Secure House to make your communal doors last longer with durable materials, smart locks, and low-maintenance designs.",
          "image": "",
          "author": {"@type": "Organization", "name": ""},
          "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
          "datePublished": "2025-10-14",
          "dateModified": "2025-10-15"
        }
    }
]

for page in pages:
    slug = page['slug']
    html_url = f"https://secure-house.co.uk/{slug}/"
    req = urllib.request.Request(html_url, headers={'User-Agent': 'Mozilla/5.0'})
    print(f"Fetching {html_url}", flush=True)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read().decode('utf-8')
    except Exception as e:
        print(f"Failed to fetch {html_url}: {e}")
        continue

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
    import subprocess
    for asset in asset_paths:
        local_path = os.path.join(public_legacy, asset.split('?')[0])
        if not os.path.exists(local_path):
            remote_url = f"https://secure-house.co.uk/wp-content/{asset}"
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            print(f"Downloading asset: {remote_url}", flush=True)
            try:
                subprocess.run(['curl.exe', '-m', '10', '-s', '-o', local_path, remote_url], timeout=15)
            except Exception as e:
                print(f"Failed to download {remote_url}: {e}")
                pass

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
        
    print(f"Processed: {slug}")
