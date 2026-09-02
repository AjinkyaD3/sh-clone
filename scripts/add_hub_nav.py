import os
import re

html_path = r'c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app\doors\content.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# The mega menu usually has a list like <li><a href="/doors/high-security-doors/">High security doors</a></li>
# Let's find High security doors and append Bespoke doors right after it.
new_item_menu = r'\g<0><li class="menu-item"><a href="/doors/bespoke-doors/"><span class="menu-text">Bespoke doors</span></a></li>'

# Use a generic approach that captures however the other doors are formatted
html = re.sub(r'(<li[^>]*><a[^>]*href="/doors/high-security-doors/"[^>]*>.*?</a></li>)', r'\1<li class="menu-item"><a href="/doors/bespoke-doors/" class="fusion-bar-highlight"><span class="menu-text">Bespoke doors</span></a></li>', html)

# If it's a grid of images
html = re.sub(r'(<a[^>]*href="/doors/high-security-doors/"[^>]*>.*?</a>)', r'\1 <a href="/doors/bespoke-doors/" style="display:inline-block; margin-top:20px; text-decoration:underline;">Bespoke doors</a>', html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated doors hub page.")
