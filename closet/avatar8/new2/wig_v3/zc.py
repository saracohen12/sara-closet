import sys
from PIL import Image
vs=list(map(int,sys.argv[1].split(',')));box=(90,0,270,230)
ims=[]
for i in vs:
    im=Image.open(f'out/cmp{i}.png')
    for k in (1,2):ims.append(im.crop((360*k+box[0],box[1],360*k+box[2],box[3])).resize(((box[2]-box[0])*2,(box[3]-box[1])*2),Image.LANCZOS))
w,h=ims[0].size;G=Image.new('RGB',(w*len(ims),h),'white')
for k,im in enumerate(ims):G.paste(im,(k*w,0))
G.save(sys.argv[2])
