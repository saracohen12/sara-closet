import json,sys
from PIL import Image,ImageDraw,ImageFont
U='/root/.claude/uploads/913a938d-2682-5fb0-9bfb-6e01fee96ea8/'
M=json.load(open(sys.argv[1])); out={}
for f,(k,L) in M.items():
    im=Image.open(U+f+'-image.jpg').convert('RGB'); s=im.size[0]/923
    for e in L:
        y,j=e[0],e[1]; hh=e[2] if len(e)>2 else 220
        n=f'shein/app/{k}_{j}.jpg'
        im.crop((round(727*s),round(y*s),round(893*s),round((y+hh)*s))).save(n,quality=92); out[f'{k}|{j}']=n
A=json.load(open('shein/app_imgs.json')); A.update(out); json.dump(A,open('shein/app_imgs.json','w'),indent=0)
keys=sorted(out); W,H=100,133;cols=11
S=Image.new('RGB',(cols*W,((len(keys)+cols-1)//cols)*(H+16)),'white');d=ImageDraw.Draw(S)
ft=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',12)
for i,kk in enumerate(keys):
    x,y=(i%cols)*W,(i//cols)*(H+16); S.paste(Image.open(out[kk]).resize((W,H)),(x,y+16)); d.text((x+2,y),kk,fill='red',font=ft)
S.save('/tmp/claude-0/-home-claude/913a938d-2682-5fb0-9bfb-6e01fee96ea8/scratchpad/app.png'); print(len(out))
