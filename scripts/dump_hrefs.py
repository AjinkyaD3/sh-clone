import re
import json

with open('app/content.html', 'r', encoding='utf-8') as f:
    content = f.read()

hrefs = re.findall(r'href=[\'\"]([^\'\"]+)[\'\"]', content)
unique_hrefs = sorted(set(hrefs))

for h in unique_hrefs:
    print(h)
