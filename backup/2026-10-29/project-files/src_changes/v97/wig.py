import sys;sys.path.insert(0,'tools')
from cut import cut
from PIL import Image;import numpy as np
from scipy import ndimage
S='/tmp/claude-0/-home-user/6b76d0a4-42d5-5937-a979-ea023e0fdb25/scratchpad/av95/'
PAN={'front':('f1a.png','w3f1.png',3,0),'side':('f1a.png','w3f1.png',3,1),'back':('f1a.png','w3f1.png',3,2),'half':('f2b.png','w3f2.png',2,0),'hip':('f2b.png','w3f2.png',2,1)}
def panel(f,n,i):
    a=np.array(Image.open(S+f).convert('RGB'));W=a.shape[1];pw=W//n;return a[:,i*pw:(i+1)*pw]
def align(mc,mw):
    # best shift of wig mask to cap mask using the lower 55% of the body (no hair there)
    ys=np.where(mc.any(1))[0];y0=int(ys[0]+(ys[-1]-ys[0])*.45)
    best=None
    for dy in range(-12,13,1):
        for dx in range(-60,61,1):
            a=mc[y0:ys[-1]];b=np.roll(np.roll(mw,dy,0),dx,1)[y0:ys[-1]]
            sc=(a&b).sum()/max(1,(a|b).sum())
            if best is None or sc>best[0]:best=(sc,dx,dy)
    return best
if __name__=='__main__':
    for k,(fc,fw,n,i) in PAN.items():
        pc=panel(fc,n,i);pwg=panel(fw,n,i)
        if pwg.shape!=pc.shape: print(k,'shape',pc.shape,pwg.shape)
        rc=cut(pc);rw=cut(pwg);mc=rc[:,:,3]>128;mw=rw[:,:,3]>128
        b=align(mc[::2,::2],mw[::2,::2]);print(k,'IoU %.3f dx %d dy %d'%(b[0],b[1]*2,b[2]*2))
        np.save(S+'p6/wcut_'+k+'.npy',rw);np.save(S+'p6/ccut_'+k+'.npy',rc)
        open(S+'p6/wshift_'+k+'.txt','w').write('%d %d'%(b[1]*2,b[2]*2))
