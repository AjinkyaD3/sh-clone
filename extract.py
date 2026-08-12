import re
html = open('app/doors/content.html', encoding='utf-8').read()
links = set(re.findall(r'href=[\'\"](/doors/[^\'\"]+)[\'\"]', html))
for l in sorted(links):
    print(l)
