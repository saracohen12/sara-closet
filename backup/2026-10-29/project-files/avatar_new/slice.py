import sys
from PIL import Image
import numpy as np
from scipy import ndimage
im=Image.open(sys.argv[1]).convert('RGB');a=np.asarray(im).astype(int)
P=[(0,332,'front'),(335,658,'side'),(661,1004,'back'),(1007,1306,'half'),(1309,1672,'hip')]
for x0,x1,n in P:
    c=a[0:852,x0+2:x1-1]
    h,w,_=c.shape
    edge=np.concatenate([c[:,:12],c[:,-12:]],axis=1)
    bg=np.median(edge,axis=1)[:,None,:]
    d=np.abs(c-bg).sum(axis=2)
    cand=d<34
    lab,_=ndimage.label(cand)
    border=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    fg=~np.isin(lab,list(border))
    fg=ndimage.binary_opening(fg,iterations=1);fg=ndimage.binary_fill_holes(fg)
    # enclosed gaps (between legs/arm) and floor shadow: bg-coloured, low-saturation, sizeable
    sat=c.max(axis=2)-c.min(axis=2)
    gap=(d<26)&(sat<14)
    lg,ng=ndimage.label(gap)
    if ng:
        szg=ndimage.sum(gap,lg,range(1,ng+1))
        big=[i+1 for i,v in enumerate(szg) if v>120]
        fg&=~np.isin(lg,big)
    lo=int(h*.88);sh=(sat[lo:]<16)&(np.abs(c[lo:]-bg[lo:]).sum(axis=2)<70)&(c[lo:].mean(axis=2)<bg[lo:].mean(axis=2)+5)
    fg[lo:]&=~sh
    fg=ndimage.binary_opening(fg,iterations=1)
    lab2,nn=ndimage.label(fg);sz=ndimage.sum(fg,lab2,range(1,nn+1));fg=lab2==1+int(np.argmax(sz))
    alpha=ndimage.gaussian_filter(fg.astype(float),0.8)
    ys,xs=np.where(fg);print(n,w,h,ys.min(),ys.max(),xs.min(),xs.max())
    Image.fromarray(np.dstack([c,(alpha*255)]).astype(np.uint8)).save(f'{sys.argv[2]}/{n}.png')
ims=[Image.open(f'{sys.argv[2]}/{n}.png') for *_,n in P]
pv=Image.new('RGB',(sum(i.width for i in ims),852),(255,0,255));x=0
for i in ims: pv.paste(i,(x,0),i);x+=i.width
pv.save(f'{sys.argv[2]}/preview.jpg')
