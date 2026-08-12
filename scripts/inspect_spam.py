from bs4 import BeautifulSoup

with open('app/content.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

elem = soup.find(string=lambda text: text and 'Davinci Gold Casino' in text)
if elem:
    # Find the nearest container that might contain all the spam
    parent = elem.parent
    while parent and parent.name != 'div':
        parent = parent.parent
    if parent:
        print(parent.prettify()[:1000])
