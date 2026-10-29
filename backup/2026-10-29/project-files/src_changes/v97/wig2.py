import sys;sys.path.insert(0,'tools')
from PIL import Image, ImageFilter;import numpy as np
from scipy import ndimage
S='/tmp/claude-0/-home-user/6b76d0a4-42d5-5937-a979-ea023e0fdb25/scratchpad/av95/'
O=S+'../src/work/me/'
TOP,FEET,W,H=38,1328,399,1365
OLDC={'front':199,'side':199,'back':198.5,'half':199.5,'hip':199.5}
def bbox(m):
    ys=np.where(m.any(1))[0];xs=np.where(m.any(0))[0];return ys[0],ys[-1],xs[0],xs[-1]
def xform(k):
    c=np.load(S+'p6/ccut_'+k+'.npy');y0,y1,x0,x1=bbox(c[:,:,3]>128)
    fh=y1-y0+1;fw=x1-x0+1;s=(FEET-TOP+1)/fh
    if fw*s>391:s=391/fw
    cw,ch=round(fw*s),round(fh*s)
    old=np.array(Image.open(O+'p5c_'+k+'.webp'))[:,:,3]>20;oy0,oy1,ox0,ox1=bbox(old);cx=(ox0+ox1)/2
    ox=round(cx-cw/2);ox=max(4,min(W-4-cw,ox));oy=FEET+1-ch
    return s,x0,y0,ox,oy,cw/fw,ch/fh
def place(arr,k,sx=None):
    s,x0,y0,ox,oy,ax,ay=xform(k)
    im=Image.fromarray(arr);big=im.resize((round(im.width*ax),round(im.height*ay)),Image.LANCZOS)
    out=Image.new('RGBA',(W,H),(0,0,0,0));out.alpha_composite(big,(0,0)) if False else None
    out.paste(big,(round(ox-x0*ax),round(oy-y0*ay)),big);return out
if __name__=='__main__':
    for k in ['front','side','back','half','hip']:
        w=np.load(S+'p6/wcut_'+k+'.npy')
        if k=='half':
            w=w[:,::-1].copy();w=np.roll(w,78,1)
        else:
            dx,dy=map(int,open(S+'p6/wshift_'+k+'.txt').read().split());w=np.roll(np.roll(w,dy,0),dx,1)
        out=place(w,k);out.save(S+'p6/p6w_'+k+'.png')
        a=np.array(out)[:,:,3]>128;print(k,bbox(a))
