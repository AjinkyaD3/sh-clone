import os
import re

app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app\doors"

def add_links_to_stained():
    fpath = os.path.join(app_root, "stained-glass-doors", "content.html")
    with open(fpath, "r", encoding="utf-8") as f:
        html = f.write = f.read()

    # The instruction says to add these links to stained-glass-doors. 
    # We will find the text "What Are Stained Glass Doors?" section or just before the closing </div> of fusion-text-2
    # Let's insert it at the end of the first paragraph, or as a new paragraph after it.
    
    links_html = """<p style="margin-top:20px;">You can also <a href="/doors/arch-doors/">add stained glass to your arch door</a>, <a href="/doors/bespoke-doors/">explore our full range</a>, or learn about <a href="/doors/high-security-doors/">our security standards</a>.</p>"""
    
    # We'll inject it right before the last closing </div> that matches the fusion-text-2 or fusion-text-4
    # Since it's a massive HTML, we can find a good spot: e.g. "A stained glass front door is one of the most personal and characterful choices a homeowner can make for their property."
    
    # Let's just append it to the end of the main content column.
    
    if 'A stained glass front door is one of the most personal' in html:
        html = html.replace('their property.</span></p>', 'their property.</span></p>' + links_html)
    else:
        # Fallback to appending just before closing the content area
        html = html.replace('<!-- Main Content Body -->', links_html + '<!-- Main Content Body -->')
    
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(html)
        
def add_links_to_custom():
    for slug in ["curved-glass-doors", "arch-doors"]:
        fpath = os.path.join(app_root, slug, "content.html")
        with open(fpath, "r", encoding="utf-8") as f:
            html = f.read()
            
        links_html = """<p style="margin-top:20px;">Learn more about <a href="/doors/high-security-doors/">our security standards</a>.</p>"""
        
        # Inject before the final closing div of fusion-text
        html = html.replace('</div>\n                    </div>\n                </div>', links_html + '\n</div>\n                    </div>\n                </div>')
        
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(html)

add_links_to_stained()
add_links_to_custom()
print("Links added successfully.")
