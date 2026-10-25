import json,sys
from PIL import Image,ImageDraw,ImageFont
r=json.load(open('thumbs.json'))
S='/tmp/claude-0/-home-claude/913a938d-2682-5fb0-9bfb-6e01fee96ea8/scratchpad/'
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22) if __import__('os').path.exists('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf') else ImageFont.load_default()
for fn in sys.argv[1:]:
    its=[x for x in r if x['file']==fn+'.pdf']
    n=len(its); cols=6; rows=(n+cols-1)//cols; T=150
    sh=Image.new('RGB',(cols*T,rows*(T+26)),'white'); dr=ImageDraw.Draw(sh)
    for i,x in enumerate(its):
        im=Image.open('thumbs/'+x['img']); im.thumbnail((T,T))
        c,rw=i%cols,i//cols; sh.paste(im,(c*T,rw*(T+26)+26)); dr.text((c*T+4,rw*(T+26)+2),str(i),fill='red',font=font)
    sh.save(S+f'sheet_{fn}.png')
