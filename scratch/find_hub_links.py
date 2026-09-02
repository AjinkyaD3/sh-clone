import re
with open(r'c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app\doors\content.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("LINKS FOUND:")
for match in set(re.findall(r'href=[\"\']([^\"\']*)[\"\']', html)):
    if 'doors' in match.lower():
        print(match)
