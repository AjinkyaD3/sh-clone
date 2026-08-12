import os
import re

with open("new_routes.txt", "r", encoding="utf-8") as f:
    routes = [line.strip() for line in f if line.strip()]

backup_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\securehouse-backup main backup\secure-house.co.uk"
app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"

for route in routes:
    backup_file = os.path.join(backup_root, route, "index.html")
    if not os.path.exists(backup_file):
        print(f"Missing in backup: {route}")
        continue
    
    with open(backup_file, "r", encoding="utf-8") as f:
        html = f.read()

    # Extract body class
    body_match = re.search(r'<body class="([^"]*)"', html)
    body_class = body_match.group(1) if body_match else ""

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

    # Save to app
    out_dir = os.path.join(app_root, route)
    os.makedirs(out_dir, exist_ok=True)
    
    content_file = os.path.join(out_dir, "content.html")
    with open(content_file, "w", encoding="utf-8") as f:
        f.write(html)
        
    page_tsx = f"""import fs from 'fs';
import path from 'path';

export default function Page() {{
  const filePath = path.join(process.cwd(), 'app', '{route}', 'content.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return <div className="{body_class}" suppressHydrationWarning dangerouslySetInnerHTML={{{{ __html: html }}}} />;
}}
"""
    page_file = os.path.join(out_dir, "page.tsx")
    with open(page_file, "w", encoding="utf-8") as f:
        f.write(page_tsx)
        
    print(f"Processed: {route}")

