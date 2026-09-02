import os
import re

app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"
public_legacy = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\public\legacy-assets"

pages_to_check = [
    "concealed-hinges",
    "concertina-doors",
    "impact-of-colour",
    "door-furniture",
    "door-leaf",
    "door-security-bars"
]

missing_images = []

for slug in pages_to_check:
    fpath = os.path.join(app_root, slug, "content.html")
    if not os.path.exists(fpath):
        print(f"File not found: {fpath}")
        continue
        
    with open(fpath, 'r', encoding='utf-8') as f:
        html = f.read()
        
    images = re.findall(r'src=["\']([^"\']+)["\']', html)
    for img in images:
        if img.startswith('/legacy-assets/'):
            # Check if exists in public/legacy-assets
            # Remove query params
            local_path = os.path.join(public_legacy, img.replace('/legacy-assets/', '').split('?')[0])
            if not os.path.exists(local_path):
                missing_images.append((slug, img))

if missing_images:
    print(f"Found {len(missing_images)} missing images!")
    for slug, img in missing_images:
        print(f"Missing in {slug}: {img}")
else:
    print("All legacy images are successfully downloaded and exist in the public directory for Batch 3 pages!")
