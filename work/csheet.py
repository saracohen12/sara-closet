import json,sys
from PIL import Image,ImageDraw,ImageFont
r=json.load(open('items2.json')); S='/tmp/claude-0/-home-claude/913a938d-2682-5fb0-9bfb-6e01fee96ea8/scratchpad/'
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',20)
for c in sys.argv[1:]:
    its=[(i,x) for i,x in enumerate(r) if x['cat']==c]
    cols=8;T=120;rows=(len(its)+cols-1)//cols
    sh=Image.new('RGB',(cols*T,rows*(T+22)),'white');dr=ImageDraw.Draw(sh)
    for k,(i,x) in enumerate(its):
        im=Image.open('thumbs2/'+x['img']);im.thumbnail((T,T));cc,rw=k%cols,k//cols
        sh.paste(im,(cc*T,rw*(T+22)+22));dr.text((cc*T+3,rw*(T+22)+1),str(i),fill='red',font=font)
    sh.save(S+f'c_{c}.png');print(c,len(its))
