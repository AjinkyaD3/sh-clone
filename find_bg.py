import re
html = open('app/projects/content.html', encoding='utf-8').read()
matches = re.findall(r'data-bg-url=\"([^\"]+)\"', html)
print('\n'.join(matches[:20]))
