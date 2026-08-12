import requests
from bs4 import BeautifulSoup
import time
from urllib.parse import urljoin, urlparse

# Wait for server to be responsive
for _ in range(30):
    try:
        if requests.get("http://localhost:3000/").status_code == 200:
            break
    except:
        time.sleep(1)

import os
routes = ["/"]
for root, dirs, files in os.walk(r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"):
    if "page.tsx" in files:
        rel = os.path.relpath(root, r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app")
        if rel != ".":
            routes.append("/" + rel.replace('\\', '/'))

base_url = "http://localhost:3000"

results = []

print("Starting verification pass...")

for route in routes:
    page_url = urljoin(base_url, route)
    print(f"Checking {page_url}...")
    try:
        resp = requests.get(page_url)
        if resp.status_code != 200:
            results.append((route, "FAIL", f"Page returned {resp.status_code}"))
            continue
            
        soup = BeautifulSoup(resp.text, "html.parser")
        
        # Check images
        images = soup.find_all("img")
        broken_assets = set()
        
        for img in images:
            src = img.get("src")
            if not src or src.startswith("data:"):
                # fallback to bv-srcset or other lazy load attributes if src is missing/placeholder
                src = img.get("bv-srcset") or img.get("data-src")
                if src:
                    # bv-srcset might have multiple URLs, get the first one
                    src = src.split(",")[0].strip().split(" ")[0]
                else:
                    continue
            
            if src and not src.startswith("data:"):
                # Head request to check if asset exists
                asset_url = urljoin(base_url, src)
                if not asset_url.startswith(base_url):
                    continue
                try:
                    asset_resp = requests.head(asset_url)
                    if asset_resp.status_code >= 400:
                        broken_assets.add(f"IMG {src} (HTTP {asset_resp.status_code})")
                except:
                    pass
        
        # Check videos
        videos = soup.find_all("video")
        for video in videos:
            src = video.get("src")
            if src:
                asset_url = urljoin(base_url, src)
                if asset_url.startswith(base_url):
                    try:
                        asset_resp = requests.head(asset_url)
                        if asset_resp.status_code >= 400:
                            broken_assets.add(f"VIDEO {src} (HTTP {asset_resp.status_code})")
                    except:
                        pass
                        
            # Check source tags inside video
            sources = video.find_all("source")
            for source in sources:
                src = source.get("src")
                if src:
                    asset_url = urljoin(base_url, src)
                    if asset_url.startswith(base_url):
                        try:
                            asset_resp = requests.head(asset_url)
                            if asset_resp.status_code >= 400:
                                broken_assets.add(f"VIDEO SRC {src} (HTTP {asset_resp.status_code})")
                        except:
                            pass

        if broken_assets:
            results.append((route, "PARTIAL", ", ".join(list(broken_assets)[:5]) + ("..." if len(broken_assets) > 5 else "")))
        else:
            results.append((route, "PASS", "All images and videos loaded correctly."))
            
    except Exception as e:
        results.append((route, "FAIL", f"Error: {str(e)}"))

print("\n\n--- FINAL REPORT ---")
print(f"{'ROUTE':<45} | {'STATUS':<10} | {'DETAILS'}")
print("-" * 100)
for r in results:
    print(f"{r[0]:<45} | {r[1]:<10} | {r[2]}")
