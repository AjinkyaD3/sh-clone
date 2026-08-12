import os, re
import urllib.parse

backup_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\securehouse-backup main backup\secure-house.co.uk"
app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"

spam_keywords = [
    "casino", "bet", "kasyno", "zaklady", "bonus", "slot", "poker", "baccarat", "roulette", 
    "spins", "judi", "togel", "toto", "bola", "gacor", "rtp", "deposit", "pulsa", "sbobet", 
    "maxwin", "pragmatic", "olymp", "bocoran", "hari", "ini"
]

system_keywords = [
    "cart", "checkout", "checkout-2", "my-account", "wp-json", "wp-admin", "wp-content", "wp-includes",
    "feed", "comments", "author", "tag", "category", "page", "search", "configurator-01"
]

def is_spam(path):
    path_lower = path.lower()
    for kw in spam_keywords:
        if kw in path_lower:
            return True
    if re.search(r'\d{5,}', path_lower) and not re.search(r'20\d\d', path_lower):
        return True
    return False

def is_system(path):
    path_parts = path.split('/')
    for kw in system_keywords:
        if kw in path_parts:
            return True
    return False

existing = set()
for root, dirs, files in os.walk(app_root):
    if "page.tsx" in files:
        rel = os.path.relpath(root, app_root).replace('\\', '/')
        if rel != ".":
            existing.add(rel)

all_paths = []
for root, dirs, files in os.walk(backup_root):
    if 'index.html' in files:
        rel_path = os.path.relpath(root, backup_root).replace('\\', '/')
        if rel_path == ".":
            continue
        rel_path = urllib.parse.unquote(rel_path)
        all_paths.append(rel_path)

results = {
    'existing': [],
    'system': [],
    'spam': [],
    'ambiguous': [],
    'legitimate': []
}

for path in all_paths:
    if path in existing:
        results['existing'].append(path)
        continue
    
    if is_system(path):
        results['system'].append(path)
        continue
        
    if is_spam(path):
        results['spam'].append(path)
        continue
        
    if len(path) > 100:
        results['ambiguous'].append(path)
        continue
        
    results['legitimate'].append(path)

print(f"Total folders with index.html: {len(all_paths)}")
print(f"Filtered out - Existing: {len(results['existing'])}")
print(f"Filtered out - System: {len(results['system'])}")
print(f"Filtered out - Spam: {len(results['spam'])}")
print(f"Ambiguous: {len(results['ambiguous'])}")
print(f"Candidate Legitimate: {len(results['legitimate'])}")

with open('candidates.txt', 'w', encoding='utf-8') as f:
    f.write("\n".join(sorted(results['legitimate'])))
with open('ambiguous.txt', 'w', encoding='utf-8') as f:
    f.write("\n".join(sorted(results['ambiguous'])))
with open('spam.txt', 'w', encoding='utf-8') as f:
    f.write("\n".join(sorted(results['spam'])))
