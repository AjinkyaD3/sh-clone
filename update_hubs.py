import os
import glob
from bs4 import BeautifulSoup

app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"
hubs = ["doors", "door-styles", "garage-doors", "grilles-shutters", "windows"]

for hub in hubs:
    hub_dir = os.path.join(app_root, hub)
    content_file = os.path.join(hub_dir, "content.html")
    if not os.path.exists(content_file):
        continue
    
    # Find all sub-pages
    sub_pages = []
    for root, dirs, files in os.walk(hub_dir):
        if "page.tsx" in files and root != hub_dir:
            # relative path from app_root
            rel_path = os.path.relpath(root, app_root).replace('\\', '/')
            # Format title from path
            title = rel_path.split('/')[-1].replace('-', ' ').title()
            sub_pages.append((rel_path, title))
            
    if not sub_pages:
        continue
        
    # Build HTML
    sub_pages.sort()
    links_html = "\n".join([f'<li><a href="/{path}/" style="color: #333; text-decoration: none; padding: 10px 20px; background: #fff; border: 1px solid #ccc; border-radius: 4px; display: block; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">{title}</a></li>' for path, title in sub_pages])
    
    section_html = f"""
    <div class="hub-additional-links" style="padding: 60px 20px; background: #f7f7f7; text-align: center; font-family: sans-serif;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <h2 style="font-size: 28px; margin-bottom: 30px; color: #333; text-transform: uppercase; font-weight: 800;">Explore All {hub.replace('-', ' ').title()}</h2>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;">
                {links_html}
            </ul>
        </div>
    </div>
    """
    
    with open(content_file, "r", encoding="utf-8") as f:
        html = f.read()
        
    # Check if we already injected it and remove it so we can refresh
    if '<div class="hub-additional-links"' in html:
        import re
        html = re.sub(r'<div class="hub-additional-links".*?</div>\s*</div>\s*</div>', '', html, flags=re.DOTALL)

        
    # Inject before footer or at end of main content
    # Look for <main id="main"> or <div id="main"> or fusion-footer
    if 'id="main"' in html:
        # replace closing of main
        html = html.replace('</main>', f'{section_html}\n</main>', 1)
        if 'id="main"' in html and '</main>' not in html:
             html = html.replace('<div class="fusion-footer">', f'{section_html}\n<div class="fusion-footer">', 1)
    else:
        # Just append at end
        html += section_html
        
    with open(content_file, "w", encoding="utf-8") as f:
        f.write(html)
        
    print(f"Updated hub: {hub} with {len(sub_pages)} links")
