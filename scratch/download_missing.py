import os
import subprocess

public_legacy = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\public\legacy-assets"

missing_urls = [
    "/legacy-assets/uploads/al_opt_content/IMAGE/secure-house.co.uk/legacy-assets/uploads/2025/01/Group-60-2.png",
    "/legacy-assets/uploads/al_opt_content/IMAGE/secure-house.co.uk/legacy-assets/uploads/2025/01/Group-60-1.png",
    "/legacy-assets/uploads/al_opt_content/IMAGE/secure-house.co.uk/legacy-assets/uploads/2024/11/Group-84-1.png"
]

for url in missing_urls:
    local_path = os.path.join(public_legacy, url.replace('/legacy-assets/', '').split('?')[0])
    remote_url = f"https://secure-house.co.uk/wp-content/{url.replace('/legacy-assets/', '')}"
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    print(f"Downloading {remote_url}")
    try:
        subprocess.run(['curl.exe', '-m', '10', '-s', '-o', local_path, remote_url], timeout=15)
    except Exception as e:
        print(f"Failed to download {remote_url}: {e}")
