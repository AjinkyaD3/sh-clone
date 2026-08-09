import os
import re
import glob
import requests
from urllib.parse import urlparse

# Dirs to process
app_dir = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"
public_dir = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\public"
css_dir = os.path.join(public_dir, "legacy-assets", "wp-content", "uploads", "fusion-styles") # wait, where are the css files?
# Let's search all css in public
css_files = glob.glob(os.path.join(public_dir, "**", "*.css"), recursive=True)
html_files = glob.glob(os.path.join(app_dir, "**", "content.html"), recursive=True)

files_to_check = css_files + html_files

font_exts = [".woff", ".woff2", ".ttf", ".eot", ".svg"] # add eot and svg just in case for fonts

fonts_fixed = 0
fonts_downloaded = 0
scripts_removed = 0

print(f"Checking {len(css_files)} CSS files and {len(html_files)} HTML files...")

# Regex for secure-house.co.uk URLs containing font paths
font_url_pattern = re.compile(r'https?://secure-house\.co\.uk/(wp-content/[^"\'\s\)]+\.(?:woff2|woff|ttf|eot|svg)[^"\'\s\)]*)', re.IGNORECASE)
# Regex for any secure-house.co.uk fonts even without extensions like al_opt_content/FONT
font_url_pattern2 = re.compile(r'https?://secure-house\.co\.uk/(wp-content/[^"\'\s\)]+/(?:fonts?|fusion-gfonts|icomoon|fontawesome|al_opt_content/FONT)[^"\'\s\)]*)', re.IGNORECASE)

# Script tag removal regex
cloudflare_script_pattern = re.compile(r'<script[^>]*src="[^"]*(email-decode\.min\.js|rocket-loader\.min\.js)"[^>]*>.*?</script>', re.IGNORECASE | re.DOTALL)

for file_path in files_to_check:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    original_content = content

    # 1. Strip cloudflare scripts (only applies to HTML, but safe to run everywhere)
    if file_path.endswith(".html"):
        content, num_subs = cloudflare_script_pattern.subn('', content)
        if num_subs > 0:
            scripts_removed += num_subs

    # 2. Find and replace fonts
    def replace_font(match):
        global fonts_fixed, fonts_downloaded
        full_path = match.group(1) # e.g. wp-content/uploads/...
        
        # Strip query params for file checking
        file_path_only = full_path.split('?')[0].split('#')[0]
        
        local_path = os.path.join(public_dir, "legacy-assets", file_path_only.replace("wp-content/", "", 1))
        
        if not os.path.exists(local_path):
            print(f"Downloading missing font: {file_path_only}")
            url = f"https://secure-house.co.uk/{full_path}"
            try:
                resp = requests.get(url)
                if resp.status_code == 200:
                    os.makedirs(os.path.dirname(local_path), exist_ok=True)
                    with open(local_path, "wb") as f_out:
                        f_out.write(resp.content)
                    fonts_downloaded += 1
                else:
                    print(f"Failed to download {url} - Status {resp.status_code}")
            except Exception as e:
                print(f"Error downloading {url}: {e}")
                
        fonts_fixed += 1
        # Rewrite to /legacy-assets/...
        return "/legacy-assets/" + full_path.replace("wp-content/", "", 1)

    content = font_url_pattern.sub(replace_font, content)
    content = font_url_pattern2.sub(replace_font, content)

    # Note: there might be fonts referenced simply as URL("https://secure-house.co.uk/...")
    # Let's also do a blanket replace for any secure-house.co.uk/wp-content/... in CSS files
    if file_path.endswith(".css"):
        content = content.replace("https://secure-house.co.uk/wp-content/", "/legacy-assets/")
        content = content.replace("http://secure-house.co.uk/wp-content/", "/legacy-assets/")
        # Some CSS might just have url('https://secure-house.co.uk/...')
        content = content.replace("https://secure-house.co.uk/", "/")

    if content != original_content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

print(f"\nReport:")
print(f"Fonts fixed (references updated): {fonts_fixed}")
print(f"Fonts downloaded: {fonts_downloaded}")
print(f"Cloudflare scripts removed: {scripts_removed}")
