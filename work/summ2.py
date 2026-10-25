import pymupdf as f, json, re, pytesseract, glob, numpy as np
from PIL import Image
R={}
def rows(a):
    r=a.sum(1)>0; L=[];y=0
    while y<len(r):
        if r[y]:
            s=y
            while y<len(r) and r[y]: y+=1
            L.append((s,y))
        y+=1
    return L
for fn in sorted(glob.glob('pdfs/*.pdf')):
    k=fn.split('/')[1][:-4]
    p=f.open(fn)[0].get_pixmap(dpi=300); im=Image.frombytes('RGB',(p.width,p.height),p.samples).convert('L')
    W,H=im.size; a=np.asarray(im)<170
    lab_x0=int(0.45*W); val_x1=int(0.40*W)
    res=[]
    for y0,y1 in rows(a[:, :]):
        if y1-y0<15: continue
        lab=im.crop((lab_x0,y0-5,W,y1+5)); val=im.crop((int(0.05*W),y0-5,val_x1,y1+5))
        va=np.asarray(val)<170
        if va.sum()==0: continue
        l=pytesseract.image_to_string(lab,lang='heb',config='--tessdata-dir /root/td --psm 7').strip()
        cols=va.sum(0)>0; xs=np.where(cols)[0]; x=xs[0]
        while x<len(cols) and cols[x]: x+=1
        if x+10>=val.width: x=-2
        v=pytesseract.image_to_string(val.crop((x+2,0,val.width,val.height)),config='--psm 7 -c tessedit_char_whitelist=0123456789.,-').strip()
        vfull=pytesseract.image_to_string(val,config='--psm 7').strip()
        res.append((l,v,vfull))
    R[k]=res

json.dump(R,open('summ2.json','w'),ensure_ascii=False)
