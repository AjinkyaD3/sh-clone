import re
html = open('app/doors/content.html', encoding='utf-8').read()
m = re.search(r'<a[^>]*href=\"/doors/panic-room-doors/\"[^>]*>.*?</a>', html, re.DOTALL)
if m:
    print(m.group(0)[:500])
else:
    print("Not found")
