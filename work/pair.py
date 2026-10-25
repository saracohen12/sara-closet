import json,sys
from PIL import Image
r=json.load(open('items2.json')); S=json.load(open('shein/shein_items.json'))
def load(k):
    return Image.open('thumbs2/'+r[int(k[1:])]['img'] if k[0]=='T' else 'shein/img/'+S[int(k[1:])]['img']+'.jpg').convert('RGB')
pairs=[p.split('-') for p in sys.argv[1:]]
ims=[]
for pr in pairs:
    L=[load(k) for k in pr]; L=[i.resize((int(i.width*280/i.height),280)) for i in L]
    c=Image.new('RGB',(sum(i.width for i in L)+10*len(L),280),'white'); x=0
    for i in L: c.paste(i,(x,0)); x+=i.width+10
    ims.append(c)
W=max(i.width for i in ims); out=Image.new('RGB',(W,290*len(ims)),'white')
for k,i in enumerate(ims): out.paste(i,(0,k*290))
out.save('/tmp/claude-0/-home-claude/913a938d-2682-5fb0-9bfb-6e01fee96ea8/scratchpad/pairs.png')
for pr in pairs:
    for k in pr: print(k, r[int(k[1:])]['title'][:50]+' | '+r[int(k[1:])]['var'][:20] if k[0]=='T' else S[int(k[1:])]['name']+' | '+S[int(k[1:])]['var'])
