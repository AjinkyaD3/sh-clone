import os
import re

app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"

# Issue #4 URLs
social_html = """<div class="fusion-social-networks-wrapper">
    <a class="fusion-social-network-icon fusion-tooltip fusion-facebook awb-icon-facebook" style="color:var(--awb-color1);font-size:19px;width:19px;background-color:var(--awb-color5);border-color:var(--awb-color5);border-radius:4px;" href="https://www.facebook.com/securehouseuk" target="_blank" rel="noopener noreferrer"></a>
    <a class="fusion-social-network-icon fusion-tooltip fusion-instagram awb-icon-instagram" style="color:var(--awb-color1);font-size:19px;width:19px;background-color:var(--awb-color5);border-color:var(--awb-color5);border-radius:4px;" href="https://www.instagram.com/securehouseuk/" target="_blank" rel="noopener noreferrer"></a>
    <a class="fusion-social-network-icon fusion-tooltip fusion-youtube awb-icon-youtube" style="color:var(--awb-color1);font-size:19px;width:19px;background-color:var(--awb-color5);border-color:var(--awb-color5);border-radius:4px;" href="https://www.youtube.com/@securehouse8711/videos" target="_blank" rel="noopener noreferrer"></a>
    <a class="fusion-social-network-icon fusion-tooltip fusion-pinterest awb-icon-pinterest" style="color:var(--awb-color1);font-size:19px;width:19px;background-color:var(--awb-color5);border-color:var(--awb-color5);border-radius:4px;" href="https://www.pinterest.com/securehouseltd/" target="_blank" rel="noopener noreferrer"></a>
</div>"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    original_html = html

    # Issue #1: Nav Submenu Links
    # Fix 'Profile doors'
    html = re.sub(
        r'(id="menu-item-2847"[^>]*>)\s*<span>Profile doors</span>',
        r'\1<a class="awb-menu__sub-a" href="/doors/profile-doors/"><span>Profile doors</span></a>',
        html
    )
    # Fix UNICO SLIM LINE
    html = re.sub(
        r'(id="menu-item-5399"[^>]*>)\s*<span>UNICO SLIM LINE</span>',
        r'\1<a class="awb-menu__sub-a" href="/doors/profile-doors/unico-slim-line/"><span>UNICO SLIM LINE</span></a>',
        html
    )
    # Fix FUEGO FIRE
    html = re.sub(
        r'(id="menu-item-5436"[^>]*>)\s*<span>FUEGO FIRE</span>',
        r'\1<a class="awb-menu__sub-a" href="/doors/profile-doors/fuego-fire/"><span>FUEGO FIRE</span></a>',
        html
    )
    # Fix PRESTO BULLET PROOF
    html = re.sub(
        r'(id="menu-item-5460"[^>]*>)\s*<span>PRESTO BULLET PROOF</span>',
        r'\1<a class="awb-menu__sub-a" href="/doors/profile-doors/presto-bullet-proof/"><span>PRESTO BULLET PROOF</span></a>',
        html
    )
    # Fix STAINLESS STEEL
    html = re.sub(
        r'(id="menu-item-5483"[^>]*>)\s*<span>STAINLESS STEEL</span>',
        r'\1<a class="awb-menu__sub-a" href="/doors/profile-doors/stainless-steel/"><span>STAINLESS STEEL</span></a>',
        html
    )

    # Issue #3: Footer Email
    # Matches [email protected] with a non-breaking space (char 160) or regular space
    html = re.sub(
        r'\[email(?:&#160;|\u00A0|\s)protected\]',
        r'<a href="mailto:info@secure-house.co.uk" style="color: inherit; text-decoration: none;">info@secure-house.co.uk</a>',
        html
    )

    # Issue #4: Social Icons
    html = re.sub(
        r'<div class="fusion-social-networks-wrapper">\s*</div>',
        social_html,
        html
    )

    # Issue #6: Projects Page "Your Content Goes Here"
    if "Your Content Goes Here" in html:
        html = html.replace("Your Content Goes Here", "Residential projects + building regulation compliance = SECURE HOUSE")

    if html != original_html:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True
    return False

def main():
    changed = 0
    for root, dirs, files in os.walk(app_root):
        for file in files:
            if file == "content.html":
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    changed += 1
    
    print(f"Updated {changed} content.html files.")

if __name__ == "__main__":
    main()
