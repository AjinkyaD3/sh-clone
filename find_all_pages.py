import os
import re
import xml.etree.ElementTree as ET

backup_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\securehouse-backup main backup\secure-house.co.uk"
app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"
sitemap_path = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\securehouse-backup main backup\page-sitemap.xml"

# 1. Parse sitemap
ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
tree = ET.parse(sitemap_path)
root = tree.getroot()

urls = set()
for url in root.findall('sm:url/sm:loc', ns):
    loc = url.text
    # strip https://secure-house.co.uk/
    path = loc.replace('https://secure-house.co.uk/', '').strip('/')
    if path:
        urls.add(path)

# 2. Add subdirectories
hubs = ["doors", "door-styles", "garage-doors", "grilles-shutters", "windows"]
for hub in hubs:
    hub_path = os.path.join(backup_root, hub)
    if os.path.exists(hub_path):
        for item in os.listdir(hub_path):
            item_path = os.path.join(hub_path, item)
            if os.path.isdir(item_path):
                index_path = os.path.join(item_path, "index.html")
                if os.path.exists(index_path):
                    urls.add(f"{hub}/{item}")

# 3. Filter URLs
excludes = ["cart", "checkout", "checkout-2", "my-account", "gallery-demo-v19", "configurator-01"]
def is_valid(path):
    # Exclude basic ones
    for ex in excludes:
        if path == ex or path.startswith(ex + '/'):
            return False
    # Exclude WooCommerce/EDD
    sys_pages = ["order-history", "receipt", "transaction-failed", "confirmation"]
    for sys_page in sys_pages:
        if path == sys_page or path.startswith(sys_page + '/'):
            return False
    # Exclude casino/spam (they typically have numbers/weird chars or are not related to doors/windows)
    # Actually, a lot of casino pages are in the root or have weird names.
    # To be safe, we can exclude pages that have spam keywords. Let's just look at the list of pages.
    return True

valid_urls = [u for u in urls if is_valid(u)]

# 4. Exclude existing pages and filter missing index.html
new_routes = []
skipped = []

for route in sorted(valid_urls):
    # check if already processed
    app_page_dir = os.path.join(app_root, route)
    if os.path.exists(os.path.join(app_page_dir, "page.tsx")):
        # already built
        continue
    
    # check if in backup
    backup_file = os.path.join(backup_root, route, "index.html")
    if not os.path.exists(backup_file):
        skipped.append((route, "Missing index.html in backup"))
        continue
        
    new_routes.append(route)

print(f"Found {len(new_routes)} NEW routes to process.")
print("Skipped:")
for s in skipped:
    print(f"  {s[0]} - {s[1]}")

print("\nNew Routes:")
for r in new_routes:
    print(f"  {r}")

# Dump to file
with open("new_routes.txt", "w", encoding="utf-8") as f:
    for r in new_routes:
        f.write(r + "\n")
