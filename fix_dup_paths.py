import os, re
root = 'app'
changes = 0
for dirpath, dirs, files in os.walk(root):
    for f in files:
        if f == 'content.html':
            path = os.path.join(dirpath, f)
            text = open(path, encoding='utf-8').read()
            # The regex handles the al_opt_content path
            new_text = re.sub(r'/legacy-assets/uploads/al_opt_content/IMAGE/secure-house\.co\.uk/legacy-assets/', '/legacy-assets/', text)
            if new_text != text:
                open(path, 'w', encoding='utf-8').write(new_text)
                changes += 1

print(f'Changed {changes} files')
