import pymupdf as f, json, re, pytesseract, numpy as np
from PIL import Image
r=json.load(open('thumbs2.json'))
cache={}
def page(fn,pi):
    k=(fn,pi)
    if k not in cache:
        cache.clear()
        p=f.open('pdfs/'+fn)[pi].get_pixmap(dpi=300)
        cache[k]=Image.frombytes('RGB',(p.width,p.height),p.samples)
    return cache[k]
def lines(g):
    a=np.asarray(g)<160; rows=a.sum(1)>0; L=[];y=0
    while y<len(rows):
        if rows[y]:
            s=y
            while y<len(rows) and rows[y]: y+=1
            L.append((s,y))
        y+=1
    return a,L
out=[]
for i,x in enumerate(r):
    im=page(x['file'],x['page']); W,H=im.size
    th=Image.open('thumbs2/'+x['img']); h=th.size[1]*2
    s=x['y']*2
    g=im.crop((int(0.06*W),max(0,s-20),int(0.30*W),min(H,s+int(h*0.55)))).convert('L')
    a,L=lines(g)
    price=None;qty=1;raw=[]
    for k,(y0,y1) in enumerate(L[:3]):
        seg=a[y0:y1]; cols=seg.sum(0)>0; xs=np.where(cols)[0]
        if len(xs)==0: continue
        # first glyph run
        x=xs[0]
        while x<len(cols) and cols[x]: x+=1
        line=g.crop((0,max(0,y0-4),g.width,min(g.height,y1+4)))
        full=pytesseract.image_to_string(line,config='--psm 7 -c tessedit_char_whitelist=0123456789.x×').strip()
        raw.append(full)
        if price is None and re.search(r'\d+\.\d{2}',full):
            cut=g.crop((x+2,max(0,y0-4),g.width,min(g.height,y1+4)))
            t=pytesseract.image_to_string(cut,config='--psm 7 -c tessedit_char_whitelist=0123456789.').strip()
            m=re.search(r'\d+\.\d{2}',t)
            if m: price=float(m.group(0))
        mq=re.search(r'(\d+)\s*[x×]',full)
        if mq and price is not None and not re.search(r'\.\d{2}',full): qty=int(mq.group(1))
    out.append({'i':i,'raw':raw,'price':price,'qty':qty})
json.dump(out,open('prices.json','w'),ensure_ascii=False)
print(sum(1 for o in out if o['price'] is None),'missing')
