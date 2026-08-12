import os, shutil
root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\securehouse-backup main backup\secure-house.co.uk\wp-content\uploads\al_opt_content\IMAGE\secure-house.co.uk\wp-content\uploads\2024\11"
dst = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\public\legacy-assets\uploads\2024\11\Group-84-1.png"
if os.path.exists(root):
    for f in os.listdir(root):
        if f.startswith("Group-84-1.png"):
            src = os.path.join(root, f)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copy2(src, dst)
            print("Copied", src)
            break
else:
    print("Root not found")
