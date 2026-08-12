import os
import re
import requests
from bs4 import BeautifulSoup

def sanitize_content(soup):
    # Remove hidden spam divs
    spam_divs = soup.find_all('div', style=re.compile(r'position:\s*absolute;\s*left:\s*-\d+px'))
    for div in spam_divs:
        div.decompose()
        
    # Remove any fusion-titles containing 'Your Content Goes Here'
    placeholders = soup.find_all(string=re.compile('Your Content Goes Here', re.IGNORECASE))
    for ph in placeholders:
        parent = ph.parent
        while parent and not (parent.name == 'div' and parent.get('class') and 'fusion-title' in parent.get('class')):
            parent = parent.parent
        if parent:
            parent.decompose()
            
    return soup

def process_route(route):
    if not route or route == '/':
        return
        
    local_path = os.path.join('app', route.strip('/'), 'content.html')
    if not os.path.exists(local_path):
        print(f"Skipping {route}, local file not found.")
        return
        
    with open(local_path, 'r', encoding='utf-8') as f:
        local_html = f.read()
    local_soup = BeautifulSoup(local_html, 'html.parser')
    local_content = local_soup.find('div', class_='post-content')
    
    if not local_content:
        #print(f"Skipping {route}, no post-content locally.")
        # But we still need to sanitize the whole page just in case
        sanitize_content(local_soup)
        with open(local_path, 'w', encoding='utf-8') as f:
            f.write(str(local_soup))
        return
        
    local_text_len = len(local_content.get_text(strip=True))
    
    # Fetch live
    url = f"https://secure-house.co.uk/{route.strip('/')}/"
    try:
        r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=10)
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return
        
    if r.status_code != 200:
        print(f"Failed to fetch {url}, status {r.status_code}")
        return
        
    live_soup = BeautifulSoup(r.text, 'html.parser')
    live_content = live_soup.find('div', class_='post-content')
    
    if not live_content:
        print(f"No post-content found on live site for {route}.")
        return
        
    live_text_len = len(live_content.get_text(strip=True))
    
    # Only replace if the live text is significantly larger or we just want to replace all
    # The prompt said some articles were just shells, so let's replace if live has >2x content,
    # OR if local is suspiciously small (< 500 chars) and live is larger.
    # Actually, why not just replace if live is strictly larger?
    if live_text_len > local_text_len + 100:
        print(f"Restoring {route}: local={local_text_len}, live={live_text_len}")
        live_content = sanitize_content(live_content)
        local_content.replace_with(live_content)
    
    # Sanitize the rest of the local document as well
    sanitize_content(local_soup)
    
    with open(local_path, 'w', encoding='utf-8') as f:
        f.write(str(local_soup))

def main():
    with open('all_urls.md', 'r', encoding='utf-8') as f:
        lines = f.read().splitlines()
        
    routes = []
    for line in lines:
        if line.startswith('- https://secure-house-next-js.vercel.app/'):
            route = line.replace('- https://secure-house-next-js.vercel.app/', '')
            routes.append(route)
            
    print(f"Found {len(routes)} routes.")
    for i, route in enumerate(routes):
        if i % 10 == 0:
            print(f"Processing {i}/{len(routes)}")
        process_route(route)
        
if __name__ == '__main__':
    main()
