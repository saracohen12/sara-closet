import json,sys
from PIL import Image,ImageDraw,ImageFont
U='/root/.claude/uploads/913a938d-2682-5fb0-9bfb-6e01fee96ea8/'
M=json.load(open(sys.argv[1])); tag=sys.argv[2]
out={}
for f,L in M.items():
    im=Image.open(U+f+'-image.jpg').convert('RGB'); k=im.size[0]/923
    for e in L:
        y,j=e[0],e[1]; hh=e[2] if len(e)>2 else 220
        n=f'shein/app/{tag}_{j}.jpg'
        im.crop((round(727*k),round(y*k),round(893*k),round((y+hh)*k))).save(n,quality=92); out[j]=n
W,H=110,146;cols=10
S=Image.new('RGB',(cols*W,((len(out)+cols-1)//cols)*(H+18)),'white');d=ImageDraw.Draw(S)
ft=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',14)
for i,j in enumerate(sorted(out,key=int)):
    x,y=(i%cols)*W,(i//cols)*(H+18); S.paste(Image.open(out[j]).resize((W,H)),(x,y+18)); d.text((x+3,y),str(j),fill='red',font=ft)
S.save('/tmp/claude-0/-home-claude/913a938d-2682-5fb0-9bfb-6e01fee96ea8/scratchpad/app.png'); print(len(out))
