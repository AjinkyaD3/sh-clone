import re
from bs4 import BeautifulSoup

def clean_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')

    # Remove hidden spam divs
    spam_divs = soup.find_all('div', style=re.compile(r'position:\s*absolute;\s*left:\s*-\d+px'))
    count_spam = len(spam_divs)
    for div in spam_divs:
        div.decompose()

    # Remove placeholders "Your Content Goes Here"
    placeholders = soup.find_all(string=re.compile('Your Content Goes Here', re.IGNORECASE))
    count_placeholders = 0
    for ph in placeholders:
        parent = ph.parent
        # Go up to the fusion-title container
        while parent and not (parent.name == 'div' and parent.get('class') and 'fusion-title' in parent.get('class')):
            parent = parent.parent
        if parent:
            parent.decompose()
            count_placeholders += 1

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    print(f"Removed {count_spam} hidden spam divs.")
    print(f"Removed {count_placeholders} placeholders.")

clean_html('app/content.html')
