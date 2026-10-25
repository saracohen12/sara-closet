import numpy as np,cv2,json,sys
from PIL import Image,ImageDraw
N='/home/claude/sara-closet/closet/avatar8/new2'
reg=json.load(open('reg.json'))
def W0(i):
    _,flip,s,dx,dy=reg[str(i)]
    w=np.asarray(Image.open(f'raw{i}.png').convert('RGB'))
    if flip: w=w[:,::-1].copy()
    M=np.float32([[s,0,dx],[0,s,dy]]);return cv2.warpAffine(w,M,(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
def grid(im,box,z=3):
    im=Image.fromarray(im) if not isinstance(im,Image.Image) else im
    x0,y0,x1,y1=box;im=im.crop(box).resize(((x1-x0)*z,(y1-y0)*z),Image.LANCZOS);d=ImageDraw.Draw(im)
    for k in range(x0,x1,10):
        X=(k-x0)*z;d.line([(X,0),(X,im.height)],fill=(255,0,0) if k%50==0 else (255,190,190),width=1)
        if k%50==0:d.text((X+2,2),str(k),fill=(255,0,0))
    for k in range(y0,y1,10):
        Y=(k-y0)*z;d.line([(0,Y),(im.width,Y)],fill=(255,0,0) if k%50==0 else (255,190,190),width=1)
        if k%50==0:d.text((2,Y+2),str(k),fill=(255,0,0))
    return im
if __name__=='__main__':
    views=list(map(int,sys.argv[2].split(',')));box=(90,0,270,200)
    ims=[]
    for i in views:
        c=Image.open(f'{N}/frames/c{i}.png').convert('RGB');ims+= [grid(c,box),grid(W0(i),box)]
    w,h=ims[0].size;G=Image.new('RGB',(w*2+10,(h+10)*len(views)),'white')
    for k,im in enumerate(ims):G.paste(im,((k%2)*(w+10),(k//2)*(h+10)))
    G.save(sys.argv[1])
