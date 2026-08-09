import os
import glob

def fix_images():
    app_dir = os.path.join(os.getcwd(), "app")
    html_files = glob.glob(os.path.join(app_dir, "**", "content.html"), recursive=True)
    
    fixed_count = 0
    for file_path in html_files:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            original_content = content
            
            # The corrupted path is: /legacy-assets/uploads/al_opt_content/IMAGE/legacy-assets/
            # The correct path is: /legacy-assets/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/
            
            # Also catch if there is a double slash like //legacy-assets/
            content = content.replace("al_opt_content/IMAGE/legacy-assets/", "al_opt_content/IMAGE/secure-house.co.uk/wp-content/")
            content = content.replace("al_opt_content/IMAGE//legacy-assets/", "al_opt_content/IMAGE/secure-house.co.uk/wp-content/")
            
            # There is also a script in the console error:
            # Group-155.png:1 GET https://secure-house-next-js.vercel.app/legacy-assets/uploads/al_opt_content/IMAGE/legacy-assets/uploads/2024/11/Group-155.png 404
            
            if content != original_content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Fixed images in: {file_path}")
                fixed_count += 1
                
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            
    print(f"Done. Fixed images in {fixed_count} HTML files.")

if __name__ == "__main__":
    fix_images()
