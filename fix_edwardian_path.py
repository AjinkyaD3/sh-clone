import os, re
root = 'app'
changes = 0
for dirpath, dirs, files in os.walk(root):
    for f in files:
        if f == 'content.html':
            path = os.path.join(dirpath, f)
            text = open(path, encoding='utf-8').read()
            new_text = text.replace('/2025/08/Edwardian-Grey', '/2025/04/Edwardian-Grey')
            if new_text != text:
                open(path, 'w', encoding='utf-8').write(new_text)
                changes += 1

print(f'Changed {changes} files')
