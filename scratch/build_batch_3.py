import os
import re
import json
import urllib.request
import subprocess
import socket

socket.setdefaulttimeout(15)

app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"
public_legacy = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\public\legacy-assets"

pages = [
    {
        "slug": "concealed-hinges",
        "title": "High-Quality Concealed Hinges for Seamless Door Design",
        "description": "Discover Secure House's concealed hinges—durable, discreet, and perfect for modern interiors. Enhance aesthetics without compromising functionality.",
        "schema": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/concealed-hinges"},
          "headline": "High-Quality Concealed Hinges for Seamless Door Design",
          "description": "Discover Secure House's concealed hinges—durable, discreet, and perfect for modern interiors. Enhance aesthetics without compromising functionality.",
          "image": "",
          "author": {"@type": "Organization", "name": ""},
          "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
          "datePublished": "2025-10-14",
          "dateModified": "2025-10-15"
        }
    },
    {
        "slug": "concertina-doors",
        "title": "Transform Your Home with Stylish Concertina Doors",
        "description": "Upgrade your space with Secure House concertina-doors—foldable, stylish, and perfect for saving space while enhancing your home's look.",
        "schema": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/concertina-doors"},
          "headline": "Transform Your Home with Stylish Concertina Doors",
          "description": "Upgrade your space with Secure House concertina-doors—foldable, stylish, and perfect for saving space while enhancing your home's look.",
          "image": "",
          "author": {"@type": "Organization", "name": ""},
          "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
          "datePublished": "2025-10-14",
          "dateModified": "2025-10-15"
        }
    },
    {
        "slug": "impact-of-colour",
        "title": "Impact of Colour | Transform Your Space with Strategic Hues",
        "description": "Discover how color influences mood and perception. Use strategic color choices to enhance your home's ambiance and reflect your personal style.",
        "schema": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/impact-of-colour"},
          "headline": "Impact of Colour | Transform Your Space with Strategic Hues",
          "description": "Discover how color influences mood and perception. Use strategic color choices to enhance your home's ambiance and reflect your personal style.",
          "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
          "author": {"@type": "Organization", "name": ""},
          "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
          "datePublished": "2025-10-14",
          "dateModified": "2025-10-15"
        }
    },
    {
        "slug": "door-furniture",
        "title": "Door Furniture | Stylish Handles, Hinges & Accessories",
        "description": "Elevate your doors with premium door furniture. From elegant handles to sturdy hinges, find the perfect accessories to complement your interior design.",
        "schema": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/door-furniture"},
          "headline": "Door Furniture | Stylish Handles, Hinges & Accessories",
          "description": "Elevate your doors with premium door furniture. From elegant handles to sturdy hinges, find the perfect accessories to complement your interior design.",
          "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
          "author": {"@type": "Organization", "name": ""},
          "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
          "datePublished": "2025-10-14",
          "dateModified": "2025-10-15"
        }
    },
    {
        "slug": "door-leaf",
        "title": "Door Leaf | Customizable Panels for Every Style",
        "description": "Choose from a variety of door leaf designs to match your aesthetic. Customizable options available to suit both modern and traditional interiors.",
        "schema": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/door-leaf"},
          "headline": "Door Leaf | Customizable Panels for Every Style",
          "description": "Choose from a variety of door leaf designs to match your aesthetic. Customizable options available to suit both modern and traditional interiors.",
          "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
          "author": {"@type": "Organization", "name": ""},
          "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
          "datePublished": "2025-10-14",
          "dateModified": "2025-10-15"
        }
    },
    {
        "slug": "door-security-bars",
        "title": "Door Security Bars | Enhanced Protection for Your Entryways",
        "description": "Install door security bars for added safety. Robust and reliable, they deter intruders and provide peace of mind for homeowners.",
        "schema": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/door-security-bars"},
          "headline": "Door Security Bars | Enhanced Protection for Your Entryways",
          "description": "Install door security bars for added safety. Robust and reliable, they deter intruders and provide peace of mind for homeowners.",
          "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
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
