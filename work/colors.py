# dominant colours per item: cut/<id>.webp (background removed) first, else the thumbnail (centre crop)
import json,os,base64,io,colorsys,re
from PIL import Image
import numpy as np
items=json.load(open('items_all.json')); items=list(items.values()) if isinstance(items,dict) else items
TH={}
for f in os.listdir('../../build/pub/th'):
    if f.endswith('.json'): TH.update(json.load(open('../../build/pub/th/'+f)))
def load(id):
    p=f'cut/{id}.webp'
    if os.path.exists(p):
        im=Image.open(p).convert('RGBA'); a=np.asarray(im); m=a[...,3]>200
        px=a[m][:,:3]
        if len(px)>400: return px,'cut'
    u=TH.get(id)
    if not u: return None,None
    im=Image.open(io.BytesIO(base64.b64decode(u.split(',',1)[1]))).convert('RGB'); w,h=im.size
    im=im.crop((int(w*.2),int(h*.15),int(w*.8),int(h*.85))); a=np.asarray(im).reshape(-1,3)
    # drop near-white / near-gray background pixels
    mx=a.max(1); mn=a.min(1); keep=~((mx>225)&(mx-mn<18))
    px=a[keep] if keep.sum()>200 else a
    return px,'th'
def hsl(rgb):
    r,g,b=[v/255 for v in rgb]; h,l,s=colorsys.rgb_to_hls(r,g,b); return round(h*360),round(s,3),round(l,3)
out={}
for x in items:
    id=x['id']; px,src=load(id)
    if px is None: continue
    if len(px)>60000: px=px[np.random.RandomState(1).choice(len(px),60000,replace=False)]
    im=Image.fromarray(px.reshape(-1,1,3).astype(np.uint8))
    q=im.quantize(colors=6,method=Image.Quantize.MEDIANCUT); pal=q.getpalette()[:18]; cnt=np.bincount(np.asarray(q).ravel(),minlength=6)
    cl=sorted([(cnt[i]/cnt.sum(),tuple(pal[i*3:i*3+3])) for i in range(6) if cnt[i]>0],reverse=True)
    main=[(p,)+hsl(c) for p,c in cl]
    # product photos contain a model: drop skin-coloured clusters when anything else remains
    skin=lambda c: 8<=c[1]<=42 and .18<=c[2]<=.62 and .38<=c[3]<=.9
    ns=[c for c in main if not skin(c)]
    if ns and sum(c[0] for c in ns)>.25: main=ns
    # pattern-ness: how many clusters are big and how far apart their hues are (only for saturated clusters)
    big=[c for c in main if c[0]>.12]
    hues=[c[1] for c in big if c[2]>.18 and .12<c[3]<.9]
    spread=0
    if len(hues)>1:
        d=[min(abs(a-b),360-abs(a-b)) for i,a in enumerate(hues) for b in hues[i+1:]]; spread=max(d)
    lum=[c[3] for c in big]; lspread=(max(lum)-min(lum)) if len(lum)>1 else 0
    txt=(x.get('color') or '')
    metal='gold' if re.search('זהב',txt) else 'silver' if re.search('כסף',txt) else ''
    mixed=bool(re.search('צבעוני|צבעים|מעורב|ססגוני|רב',txt))
    def famc(c):
        h,sa,l=c[1],c[2],c[3]
        if l<.08 or (l<.17 and sa<.3): return 'שחור'
        if l>.88 and sa<.25: return 'לבן'
        if sa<.13: return 'אפור' if l<.8 else 'לבן'
        if 10<=h<50: return 'חום' if l<.42 else 'בז׳'
        if 50<=h<75: return 'בז׳' if l>.5 else 'ירוק'
        if 75<=h<175: return 'ירוק'
        if 175<=h<265: return 'כחול'
        if 265<=h<315: return 'סגול'
        if 315<=h or h<10: return 'אדום' if l<.45 else 'ורוד'
        return ''
    out[id]={'fc':famc(main[0]),'c':[[float(round(c[0],2)),int(c[1]),float(c[2]),float(c[3])] for c in main[:3]],'sp':int(spread),'ls':round(lspread,2),'src':src,'metal':metal,'mixed':mixed}
json.dump(out,open('colors.json','w'),ensure_ascii=False)
import collections
print(len(out),'items with colours;',collections.Counter(v['src'] for v in out.values()))
for id in ['T103','T183','T50','S1BGU_4','T0','T14']:
    if id in out: print(id,[x for x in items if x['id']==id][0]['color'],out[id])
