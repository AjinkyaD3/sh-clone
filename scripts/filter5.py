lines = open('candidates.txt', encoding='utf-8').read().splitlines()
legit = []
spam = []
keywords = ['door', 'window', 'shutter', 'grille', 'fire', 'securit', 'lock', 'home', 'house', 'architectur', 'building', 'inspiration', 'trade', 'glass', 'banham', 'rain-deflector', 'rain', 'deflectors']

for l in lines:
    if not l: continue
    if 'youtube' in l or 'revolution' in l or 'splendor' in l or 'tension' in l or 'gorilla' in l or 'methmeth' in l or 'wildrobin' in l or 'chicken' in l or 'aviator' in l or 'fortune' in l or 'vavada' in l or 'pinco' in l or 'sultan' in l or 'winspirit' in l or 'plinko' in l or 'fridayroll' in l or 'onedun' in l or 'bingo' in l or 'spin' in l or 'kaz' in l or 'kasin' in l or 'kazin' in l or 'igralnice' in l or 'spletne' in l or 'glucksspiel' in l or 'freispielen' in l or 'einzahlung' in l or 'juego' in l or 'juega' in l or 'babochki' in l or 'voprosy' in l or 'grobnicy' in l or 'tajny' in l or 'vyigrysha' in l or 'revoluce' in l or 'zabavu' in l or 'vyhry' in l or 'varazsa' in l or 'lehetosegei' in l or 'strategie' in l or 'estrategias' in l or 'revolucao' in l or 'criativa' in l or 'inovadoras' in l or 'utmanar' in l or 'fantasi' in l or 'forandrar' in l or 'varld' in l or 'percorso' in l or 'superare' in l or 'sfida' in l or 'maestri' in l or 'passione' in l or 'indigena' in l or 'werkzeuge' in l or 'optimierung' in l or 'spielerlebnis' in l or 'oportunidades' in l or 'aventurero' in l or 'magico' in l or 'observaciones' in l or 'comportamiento' in l or 'revela' in l or 'vincenti' in l or 'probabilita' in l or 'zugang' in l or 'vertrauenswurdige' in l or 'anleitung' in l or 'kiprobalni' in l or 'online' in l or 'platforma' in l or 'oferuje' in l or 'niezapomniane' in l or 'zastosowania' in l or 'kuchni' in l or 'odkrywa' in l or 'tajemnice' in l or 'emocji' in l or 'svt' in l or 'dosah' in l or 'vyuijte' in l or 'maximum' in l or 'sostenible' in l or 'innovacion' in l or 'verde' in l or 'hetvegi' in l or 'kalandok' in l or 'vilagaban' in l or 'capitale' in l or 'istorii' in l or 'otkrojut' in l or 'dveri' in l or 'zasady' in l or 'gry' in l or 'droga' in l or 'kurczaka' in l or 'potreba' in l or 'usponu' in l or 'ανακαλύψτε' in l or 'δύναμη' in l or 'απρόσ' in l or 'κατεβάστε' in l or 'εφαρμογή' in l or 'χρυσών' in l or 'κεράτω' in l or 'lehetosei' in l or 'zastosowania-v-kuchni' in l or 'caisno' in l or 'kartosana' in l or 'winstgevend' in l or 'spielautomaten' in l or 'spielbank' in l:
        spam.append(l)
        continue
    
    is_legit = False
    for k in keywords:
        if k in l:
            is_legit = True
            break
            
    if is_legit:
        legit.append(l)
    else:
        spam.append(l)

open('final_candidates.txt', 'w', encoding='utf-8').write('\n'.join(legit))
open('remaining_spam.txt', 'w', encoding='utf-8').write('\n'.join(spam))
print(f'Final legit: {len(legit)}')
