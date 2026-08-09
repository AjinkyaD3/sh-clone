import re
with open('app/content.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract links
links = re.findall(r'href=[\'\"](/[^\'\"]*|https://secure-house\.co\.uk/[^\'\"]*)[\'\"]', content)
links = set(links)

# Clean and normalize links
clean_links = set()
for link in links:
    if link.startswith('https://secure-house.co.uk'):
        link = link.replace('https://secure-house.co.uk', '')
    if not link:
        link = '/'
    if not link.startswith(('#', '/wp-content', '/legacy-assets', '/category', '/tag', '/author')):
        clean_links.add(link)

print("Target Links Found:")
for link in sorted(clean_links):
    print(link)
