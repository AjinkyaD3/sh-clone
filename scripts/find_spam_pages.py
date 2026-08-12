import os
import re

app_dir = 'app'
# Use word boundaries for common English words that might be substrings
english_spam_pattern = re.compile(r'\b(spin|bonus|bet)\b', re.IGNORECASE)
# Do not use word boundaries for distinct spam words
distinct_spam_pattern = re.compile(r'(casino|bukmacher|kasyno|jackpot|kod promocyjny|betclic|888starz|energy casino|ice casino|hazard)', re.IGNORECASE)

deleted_pages = []

for root, dirs, files in os.walk(app_dir):
    if 'content.html' in files:
        if root == 'app':  # Skip the main homepage
            continue
        
        filepath = os.path.join(root, 'content.html')
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        eng_matches = english_spam_pattern.findall(content)
        dist_matches = distinct_spam_pattern.findall(content)
        
        total_matches = len(eng_matches) + len(dist_matches)
        
        # If we find distinct spam keywords, it's definitely spam
        # If we find spin/bonus/bet, we require a higher threshold or presence of distinct spam keywords
        is_spam = False
        if len(dist_matches) >= 1:
            is_spam = True
        elif len(eng_matches) >= 5: # If there's 5+ mentions of bet/spin/bonus
            is_spam = True
            
        if is_spam:
            print(f"Spam found in {root}: {total_matches} matches. (Dist: {len(dist_matches)}, Eng: {len(eng_matches)})")
            deleted_pages.append(root)

print(f"Total spam pages to delete: {len(deleted_pages)}")
with open('spam_pages_to_delete.txt', 'w', encoding='utf-8') as f:
    for page in deleted_pages:
        f.write(page + '\n')
