import numpy as np,cv2,json,sys
from PIL import Image,ImageDraw
N='/home/claude/sara-closet/closet/avatar8/new2'
R=json.load(open('reg3.json'))
def W0(i):
    _,s,dx,dy=R[str(i)];w=np.asarray(Image.open(f'raw{i}.png').convert('RGB'))
    return cv2.warpAffine(w,np.float32([[s,0,dx],[0,s,dy]]),(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
def grid(a,box,z=3):
    im=Image.fromarray(a);x0,y0,x1,y1=box;im=im.crop(box).resize(((x1-x0)*z,(y1-y0)*z),Image.LANCZOS);d=ImageDraw.Draw(im)
    for k in range(x0-x0%10,x1,10):
        X=(k-x0)*z;d.line([(X,0),(X,im.height)],fill=(255,0,0) if k%50==0 else (255,170,170),width=1)
        if k%50==0:d.text((X+2,2),str(k),fill=(255,0,0))
    for k in range(y0-y0%10,y1,10):
        Y=(k-y0)*z;d.line([(0,Y),(im.width,Y)],fill=(255,0,0) if k%50==0 else (255,170,170),width=1)
        if k%50==0:d.text((2,Y+2),str(k),fill=(255,0,0))
    return np.asarray(im)
views=list(map(int,sys.argv[1].split(',')));box=tuple(map(int,sys.argv[2].split(',')))
rows=[]
for i in views:
    c=np.asarray(Image.open(f'{N}/frames/c{i}.png').convert('RGB'))
    rows.append(np.concatenate([grid(c,box),np.full((((box[3]-box[1])*3),8,3),255,np.uint8),grid(W0(i),box)],1))
Image.fromarray(np.concatenate(rows,0)).save(sys.argv[3])
