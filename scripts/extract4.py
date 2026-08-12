import re

lines = open('candidates.txt', encoding='utf-8').read().splitlines()

spam_kw = [
    'chicken', 'aviator', 'fortune', 'sultan', 'queen-of-spades', 'vavada', 'winspirit', 'plinko', 
    'fridayroll', 'onedun', 'pinco', 'bingo', 'spin', 'kaz', 'kasin', 'kazin', 'igralnice', 'spletne', 
    'glucksspiel', 'freispielen', 'einzahlung', 'juego', 'juega', 'babochki', 'voprosy', 'grobnicy', 
    'tajny', 'vyigrysha', 'revoluce', 'zabavu', 'vyhry', 'varazsa', 'lehetosegei', 'strategie', 
    'estrategias', 'revolucao', 'criativa', 'inovadoras', 'utmanar', 'fantasi', 'forandrar', 'varld', 
    'percorso', 'superare', 'sfida', 'maestri', 'passione', 'indigena', 'werkzeuge', 'optimierung', 
    'spielerlebnis', 'oportunidades', 'aventurero', 'magico', 'observaciones', 'comportamiento', 
    'revela', 'vincenti', 'probabilita', 'zugang', 'vertrauenswurdige', 'anleitung', 'kiprobalni', 
    'online', 'platforma', 'oferuje', 'niezapomniane', 'zastosowania', 'kuchni', 'odkrywa', 'tajemnice', 
    'emocji', 'svt', 'dosah', 'vyuijte', 'maximum', 'sostenible', 'innovacion', 'verde', 'hetvegi', 
    'kalandok', 'vilagaban', 'capitale', 'istorii', 'otkrojut', 'dveri', 'zasady', 'gry', 'droga', 
    'kurczaka', 'potreba', 'usponu', 'gorilla', 'methmeth', 'wildrobin', 'boomerang', 'lucky-admiral', 
    'crossy', 'rush-hour', 'youtube', 'software-providers', 'jetx', 'teams-2026', 'maliny'
]

legit = []
spam = []
ambig = []

for l in lines:
    if not re.match(r'^[a-zA-Z0-9\-\/]+$', l):
        spam.append(l)
        continue
    is_sp = False
    for k in spam_kw:
        if k in l:
            is_sp = True
            break
    if is_sp:
        spam.append(l)
    elif l.startswith('inspiration/'):
        legit.append(l)
    elif 'door' in l or 'window' in l or 'shutter' in l or 'grille' in l or 'security' in l or 'fire' in l or 'lock' in l:
        legit.append(l)
    else:
        ambig.append(l)

# Combine with earlier spam and system
original_spam = open('spam.txt', encoding='utf-8').read().splitlines()
all_spam = original_spam + spam
system_count = 328

out = []
out.append("# Page Discovery Report")
out.append(f"\n**Total Backup Folders with index.html:** 727")
out.append(f"**Existing Built Pages Filtered Out:** 38")
out.append(f"**System Paths Filtered Out:** {system_count}")
out.append(f"**Spam/Hacked Pages Filtered Out:** {len(all_spam)}")
out.append(f"**Remaining Candidates for Review:** {len(legit) + len(ambig)}")
out.append(f"  - **Legitimate:** {len(legit)}")
out.append(f"  - **Ambiguous:** {len(ambig)}")

out.append("\n## Candidate Legitimate Pages")
out.append("These look like real content pages belonging to Secure House:")
for p in legit:
    out.append(f"- `/{p}`")

out.append("\n## Ambiguous Pages (Please Review)")
out.append("These paths don't contain obvious spam keywords but also lack clear Secure House keywords (door, window, security, etc):")
if len(ambig) == 0:
    out.append("- *None*")
for p in ambig:
    out.append(f"- `/{p}`")

open('C:/Users/AJINKYA/.gemini/antigravity-ide/brain/469ff606-391d-41d5-871c-e79b9cb36f33/page_discovery_report.md', 'w', encoding='utf-8').write('\n'.join(out))
