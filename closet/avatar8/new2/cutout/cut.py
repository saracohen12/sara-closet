# v182: the doll without the blue photo backdrop (a8/c1-8.webp), so the studio can put her on any background.
# The backdrop is blue (B well above R); the doll is beige/skin/brown (R >= B). Largest blob, holes filled, 1px feather.
import sys,numpy as np
from PIL import Image
from scipy import ndimage as ndi
A8=sys.argv[1] if len(sys.argv)>1 else '/home/claude/sara-closet/work/a8'
for v in range(1,9):
    a=np.asarray(Image.open(f'{A8}/n{v}.webp').convert('RGB')).astype(int)
    R,G,B=a[...,0],a[...,1],a[...,2]
    lum=.299*R+.587*G+.114*B
    m=((R-B)>-4)|((lum<95)&((B-R)<22))
    m=ndi.binary_opening(m,iterations=1)
    lab,n=ndi.label(m);sz=ndi.sum(m,lab,range(1,n+1));m=lab==(np.argmax(sz)+1)
    blue=((B-R)>18)&(lum>100)
    m=ndi.binary_closing(m,iterations=2)&~blue
    # fill only the holes that are not backdrop (the loop between a hand on the hip and the body stays open)
    h=ndi.binary_fill_holes(m)&~m;hl,hn=ndi.label(h)
    for k in range(1,hn+1):
        hk=hl==k
        if ((B-R)[hk]).mean()<12:m|=hk
    al=ndi.gaussian_filter(m.astype(float),.7)
    al=np.clip((al-.32)/.6,0,1)
    # soften blue spill on the edge: pull edge pixels' blue toward red/green
    out=np.dstack([a,(al*255).astype(int)]).astype(np.uint8)
    edge=(al>0)&(al<1)
    o=out.astype(int);spill=np.clip(o[...,2]-(o[...,0]+o[...,1])/2,0,None)
    o[...,2]=np.where(edge,o[...,2]-spill*1.0,o[...,2])
    Image.fromarray(np.clip(o,0,255).astype(np.uint8)).save(f'{A8}/c{v}.webp','WEBP',quality=92,method=6)
    print(v,int(m.sum()))
