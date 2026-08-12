import re
from bs4 import BeautifulSoup

html = open('app/doors/content.html', encoding='utf-8').read()
soup = BeautifulSoup(html, 'html.parser')
a = soup.find('a', href=re.compile(r'/doors/panic-room-doors/?'))
if a:
    print(str(a.parent.parent)[:1000])
else:
    print("Not found")
