import json,pytesseract,re,numpy as np
from PIL import Image
r=json.load(open('thumbs2.json')); out=[]
for i,x in enumerate(r):
    im=Image.open('thumbs2/'+x['txt']).convert('L'); W,H=im.size
    a=np.asarray(im)<150; rows=a.sum(1)>0; L=[];y=0
    while y<H:
        if rows[y]:
            s=y
            while y<H and rows[y]: y+=1
            L.append((s,y))
        y+=1
    sz=''; t=''
    if len(L)>=2:
        y0,y1=L[1]; line=im.crop((0,max(0,y0-3),W,min(H,y1+3))); line=line.resize((line.width*2,line.height*2))
        t=pytesseract.image_to_string(line,config='--psm 7').strip()
        m=re.search(r'\d+\s*[xX×]\s+(.*?)(?:[:;]?\s*s?n[a-z]{1,3}n\b|$)',t)
        if m:
            sz=m.group(1).strip(' :;')
            sz=re.sub(r'^S[s:]?$','S',sz)
            if 'nin' in t or 'nun' in t or 'nuin' in t:
                pass
            else: sz=''
    out.append({'i':i,'raw':t,'size':sz})
json.dump(out,open('sizes.json','w'),ensure_ascii=False)
from collections import Counter; print(Counter(o['size'] for o in out).most_common(40))
