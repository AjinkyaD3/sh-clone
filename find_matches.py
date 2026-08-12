import os, re
root = 'app'
matches = set()
for dirpath, dirs, files in os.walk(root):
    for f in files:
        if f == 'content.html':
            path = os.path.join(dirpath, f)
            text = open(path, encoding='utf-8').read()
            found = re.findall(r'/[^"\']*?secure-house\.co\.uk/legacy-assets[^"\']*', text)
            for m in found:
                matches.add(m)

print("Matches found:")
for m in sorted(matches):
    print(m)
