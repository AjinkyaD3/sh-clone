import os
import glob

app_dir = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"

for content_file in glob.glob(os.path.join(app_dir, "**", "content.html"), recursive=True):
    with open(content_file, "r", encoding="utf-8") as f:
        html = f.read()
        
    # Fix the double replacement issue
    fixed_html = html.replace("/legacy-assets/uploads/al_opt_content/IMAGE/secure-house.co.uk/legacy-assets/", "/legacy-assets/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/")
    
    if fixed_html != html:
        with open(content_file, "w", encoding="utf-8") as f:
            f.write(fixed_html)
        print(f"Fixed image paths in: {content_file}")
