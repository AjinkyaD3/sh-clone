import os
import glob

def fix_files():
    public_dir = os.path.join(os.getcwd(), "public", "legacy-assets")
    app_dir = os.path.join(os.getcwd(), "app")
    
    css_files = glob.glob(os.path.join(public_dir, "**", "*.css"), recursive=True)
    html_files = glob.glob(os.path.join(app_dir, "**", "content.html"), recursive=True)
    
    all_files = css_files + html_files
    
    fixed_count = 0
    for file_path in all_files:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            original_content = content
            
            # Catch //secure-house.co.uk/wp-content/
            content = content.replace("//secure-house.co.uk/wp-content/", "/legacy-assets/")
            
            # Catch secure-house.co.uk/wp-content/ (without any slashes)
            content = content.replace("secure-house.co.uk/wp-content/", "/legacy-assets/")
            
            # Also catch any https?:// that was missed because it wasn't wp-content
            # Actually, just run replace on the domain for good measure if it precedes wp-content
            content = content.replace("https://secure-house.co.uk/wp-content/", "/legacy-assets/")
            content = content.replace("http://secure-house.co.uk/wp-content/", "/legacy-assets/")

            if content != original_content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Fixed fonts in: {file_path}")
                fixed_count += 1
                
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            
    print(f"Done. Fixed {fixed_count} files.")

if __name__ == "__main__":
    fix_files()
