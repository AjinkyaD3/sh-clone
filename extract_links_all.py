import re

with open('app/content.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all href attributes
hrefs = re.findall(r'href=[\'\"]([^\'\"]+)[\'\"]', content)
internal = set()
for h in hrefs:
    # ignore absolute external URLs except secure-house.co.uk
    if h.startswith('http') and 'secure-house.co.uk' not in h:
        continue
    if h.startswith('mailto:') or h.startswith('tel:'):
        continue
    if h.startswith('#'):
        continue
    
    # clean it up
    h_clean = h.replace('https://secure-house.co.uk', '').replace('http://secure-house.co.uk', '')
    if not h_clean:
        h_clean = '/'
    
    if not h_clean.startswith(('/', '.')):
        # relative link? let's just add it with /
        h_clean = '/' + h_clean
        
    internal.add(h_clean)

print("Target Links Found:")
for h in sorted(internal):
    if not h.startswith(('/wp-', '/legacy-', '/feed', '/comments')):
        print(h)
