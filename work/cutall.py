import json,sys
from rembg import new_session,remove
from PIL import Image,ImageChops,ImageFilter
import numpy as np
from scipy import ndimage
d=json.load(open('items_all.json'))
W={'dresses','skirts','tops','sweaters','sets','outer','scarves','belts','shoes','jewelry','bags','wedding','girls','boys'}
cs=new_session('u2net_cloth_seg');gs=new_session('u2net')
def clean(a,minfrac=.04):
    m=np.array(a)>100;lab,n=ndimage.label(m)
    if n==0:return None
    sz=ndimage.sum(m,lab,range(1,n+1));keep=[i+1 for i,s in enumerate(sz) if s>=minfrac*sz.max()]
    k=np.isin(lab,keep);return k,np.array(a)*k
import os
meta=json.load(open('cut/meta_part.json')) if os.path.exists('cut/meta_part.json') else {}
for x in d:
    if x['cat'] not in W: continue
    i=x['id']
    if i in meta: continue
    try: im=Image.open(f'srcimg/{i}.jpg').convert('RGB')
    except: continue
    big=im.resize((im.width*2,im.height*2),Image.LANCZOS)
    g=remove(big,session=gs,only_mask=True)
    rg=clean(g)
    if rg is None: continue
    gm,ga=rg; mode='full'; alpha=ga
    if x['cat'] in {'dresses','skirts','tops','sweaters','sets','outer','wedding','girls','boys'}:
        ms=cs.predict(big);u=ms[0]
        for m_ in ms[1:]:u=ImageChops.lighter(u,m_)
        u=u.resize(big.size)
        rc=clean(u,.08)
        if rc is not None:
            cm,ca=rc; r=cm.sum()/max(gm.sum(),1)
            # coherence: largest component share
            lab,n=ndimage.label(cm); sz=ndimage.sum(cm,lab,range(1,n+1)) if n else [0]
            share=max(sz)/max(cm.sum(),1)
            if .3<r<.97 and share>.85:
                alpha=np.minimum(ca,ga);mode='cloth'
    o=big.convert('RGBA');o.putalpha(Image.fromarray(alpha.astype('uint8')).filter(ImageFilter.GaussianBlur(.7)))
    bb=o.getbbox()
    if not bb: continue
    o=o.crop(bb);o.thumbnail((360,540))
    o.save(f'cut/{i}.webp','WEBP',quality=80)
    # also full (isnet) version for cloth ones
    if mode=='cloth':
        f=big.convert('RGBA');f.putalpha(Image.fromarray(ga.astype('uint8')));f=f.crop(f.getbbox());f.thumbnail((360,540));f.save(f'cut/{i}_f.webp','WEBP',quality=80)
    meta[i]=[o.width,o.height,mode]
    print(i,mode,flush=True)
    if len(meta)%20==0: json.dump(meta,open('cut/meta_part.json','w'))
json.dump(meta,open('cut/meta.json','w'))
