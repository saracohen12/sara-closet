import fitz, json, os, sys, re
out=[]; os.makedirs('imgs',exist_ok=True)
for fn in sorted(os.listdir('pdfs')):
    doc=fitz.open('pdfs/'+fn); date=None
    t0=doc[0].get_text()
    m=re.search(r'(\d+) באוקטובר 2026',t0); date=m.group(1) if m else ''
    for pi,page in enumerate(doc):
        lines=[]
        for b in page.get_text('dict')['blocks']:
            for l in b.get('lines',[]):
                s=''.join(sp['text'] for sp in l['spans']).strip()
                if s: lines.append((l['bbox'],s))
        for k,info in enumerate(page.get_image_info(xrefs=True)):
            x0,y0,x1,y1=info['bbox']
            if (x1-x0)<60 or (y1-y0)<60: continue
            near=[s for bb,s in lines if bb[1]>=y0-5 and bb[1]<=y1 and bb[2]<x0+5]
            price=[s for s in near if '₪' in s or re.match(r'^[\d.,]+$',s)]
            name=f"{fn[:-4]}_p{pi}_{k}.png"
            try:
                pix=page.get_pixmap(clip=fitz.Rect(x0,y0,x1,y1),dpi=110); pix.save('imgs/'+name)
            except Exception as e: continue
            out.append(dict(file=fn,date=date,img=name,text=near))
json.dump(out,open('items.json','w'),ensure_ascii=False,indent=0)
print(len(out))
