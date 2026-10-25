import pymupdf as f, json, re, pytesseract, glob
from PIL import Image
S={}
for fn in sorted(glob.glob('pdfs/*.pdf')):
    d=f.open(fn); txt=''
    for pi in range(min(2,len(d))):
        p=d[pi].get_pixmap(dpi=200); im=Image.frombytes('RGB',(p.width,p.height),p.samples)
        txt+=pytesseract.image_to_string(im,lang='heb',config='--tessdata-dir /root/td --psm 6')+'\n'
    S[fn.split('/')[1][:-4]]=txt
json.dump(S,open('summ_temu.json','w'),ensure_ascii=False)
