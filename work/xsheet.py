import json,sys
from PIL import Image,ImageDraw,ImageFont
r=json.load(open('items2.json')); S=json.load(open('shein/shein_items.json'))
cat=sys.argv[1]; tc=sys.argv[2].split(',')
T=[(f'T{i}','thumbs2/'+x['img']) for i,x in enumerate(r) if x['cat'] in tc]
H=[(f'S{k}','shein/img/'+s['img']+'.jpg') for k,s in enumerate(S) if s['cat'] in cat.split('+') and s['img']]
items=T+H; cw,ch=130,170; cols=10
rows=(len(items)+cols-1)//cols
c=Image.new('RGB',(cols*cw,rows*ch),'white'); d=ImageDraw.Draw(c)
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',14)
for n,(lab,p) in enumerate(items):
    im=Image.open(p).convert('RGB'); im.thumbnail((cw-6,ch-24))
    x,y=(n%cols)*cw,(n//cols)*ch
    c.paste(im,(x+3,y+20)); d.text((x+3,y+2),lab,fill='red' if lab[0]=='S' else 'blue',font=f)
c.save(f'/tmp/claude-0/-home-claude/913a938d-2682-5fb0-9bfb-6e01fee96ea8/scratchpad/x_{cat}.png'); print(len(T),len(H))
