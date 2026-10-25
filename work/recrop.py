import pymupdf as f, numpy as np, os, json
from PIL import Image
res=json.load(open('thumbs2.json'))
out={}
cache={}
def page(fn,pi):
    k=(fn,pi)
    if k not in cache:
        cache.clear()
        p=f.open('pdfs/'+fn)[pi]; px=p.get_pixmap(dpi=300)
        im=Image.frombytes('RGB',(px.width,px.height),px.samples); cache[k]=(im,np.asarray(im).astype(int))
    return cache[k]
info=[]
for r in res:
    im,a=page(r['file'],r['page']); W,H=im.size
    y0=r['y']*2
    # original detection region: find run again at 300dpi around y0
    x0,x1=int(0.70*W),int(0.98*W)
    nonw=a.min(axis=2)<235
    # columns of thumb
    seg=nonw[y0:y0+400,x0:x1]
    cols=np.where(seg.sum(axis=0)>20)[0]
    cx0,cx1=x0+cols[0],x0+cols[-1]+1
    # rows
    rows=np.where(nonw[max(0,y0-200):y0+500,cx0:cx1].sum(axis=1)>0)[0]+max(0,y0-200)
    # contiguous block containing y0+5
    ys=[y for y in rows]
    # text top on the left
    tx0,tx1=int(0.08*W),cx0-30
    t=np.where((a[max(0,y0-150):y0+200,tx0:tx1].min(axis=2)<120).sum(axis=1)>2)[0]
    ttop=max(0,y0-150)+t[0] if len(t) else None
    info.append((r['img'],cx0,cx1,y0,ttop))
json.dump(info,open('recrop_info.json','w'))
import collections
print(collections.Counter(c1-c0 for _,c0,c1,_,_ in info).most_common(8))
print(collections.Counter((y0-tt) if tt else None for _,_,_,y0,tt in info).most_common(10))
