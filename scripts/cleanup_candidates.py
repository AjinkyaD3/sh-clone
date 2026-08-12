spam = set(open('spam.txt', encoding='utf-8').read().splitlines())
candidates = open('candidates.txt', encoding='utf-8').read().splitlines()

cleaned = []
for c in candidates:
    if c and c not in spam:
        cleaned.append(c)

with open('candidates_clean.txt', 'w', encoding='utf-8') as f:
    f.write("\n".join(cleaned))

print(f"Original candidates: {len(candidates)}")
print(f"Cleaned candidates: {len(cleaned)}")
