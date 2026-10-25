import json,pytesseract,os
from PIL import Image
from concurrent.futures import ThreadPoolExecutor
r=json.load(open('thumbs2.json'))
def go(x):
    im=Image.open('thumbs2/'+x['txt']).convert('L')
    w,h=im.size; im=im.resize((w*2,h*2))
    return pytesseract.image_to_string(im,lang='heb+eng',config='--tessdata-dir /root/td --psm 6') if False else pytesseract.image_to_string(im,lang='heb',config='--tessdata-dir /root/td --psm 6')
with ThreadPoolExecutor(8) as ex: res=list(ex.map(go,r))
for x,t in zip(r,res): x['ocr']=t
json.dump(r,open('thumbs2_ocr.json','w'),ensure_ascii=False,indent=0)
for x in r[:8]: print(x['img'],'|',x['ocr'].replace('\n',' / ')[:150])
