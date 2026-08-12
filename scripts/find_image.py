import os
root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\securehouse-backup main backup\secure-house.co.uk"
matches = []
for dirpath, dirs, files in os.walk(root):
    for f in files:
        if "Edwardian-Grey" in f:
            matches.append(os.path.join(dirpath, f))
print("Matches:")
for m in matches:
    print(m)
