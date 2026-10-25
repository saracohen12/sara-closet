import pymupdf as f, numpy as np, os, json
from PIL import Image
os.makedirs('thumbs',exist_ok=True); res=[]
for fn in sorted(os.listdir('pdfs')):
    d=f.open('pdfs/'+fn)
    for pi,p in enumerate(d):
        pix=p.get_pixmap(dpi=150); im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
        a=np.asarray(im).astype(int); W,H=im.size
        nonw=(a.min(axis=2)<235)
        # columns: find region on right with thumbnails: x between 0.70W and 0.98W
        x0,x1=int(0.70*W),int(0.98*W)
        rows=nonw[:,x0:x1].sum(axis=1)
        dense=rows>0.08*(x1-x0)
        y=0; runs=[]
        while y<H:
            if dense[y]:
                s=y
                while y<H and dense[y]: y+=1
                runs.append((s,y))
            y+=1
        for s,e in runs:
            h=e-s
            if h<0.09*W: continue
            cols=nonw[s:e,x0:x1].sum(axis=0)>0.3*h
            xs=np.where(cols)[0]
            if len(xs)==0: continue
            cx0,cx1=x0+xs[0],x0+xs[-1]+1
            if (cx1-cx0)<0.6*h: continue
            name=f"{fn[:-4]}_p{pi}_{s}.jpg"
            im.crop((cx0,s,cx1,e)).save('thumbs/'+name,quality=85)
            # text strip to the left for later
            im.crop((int(0.08*W),s,cx0,e)).save('thumbs/T_'+name,quality=70)
            res.append(dict(file=fn,page=pi,y=s,img=name,txt='T_'+name))
json.dump(res,open('thumbs.json','w'),indent=0)
from collections import Counter
print(len(res)); print(Counter(r['file'] for r in res))
