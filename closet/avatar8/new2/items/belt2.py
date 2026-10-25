# belt cut v2 (Sara 19:38 "החגורה לא גזורה טוב"): the silver buckle and pale stones look like the backdrop, so the generic cutter
# dropped them. Inside the belt's band any real change from the doll is belt; holes between stones are filled; the hand (unchanged) stays out.
import sys,numpy as np
from PIL import Image,ImageFilter
from scipy import ndimage as ndi
N='/home/claude/sara-closet/closet/avatar8/new2/frames'
for i in range(1,9):
    d=np.asarray(Image.open(f'belt/out/{i}.png').convert('RGB')).astype(float)
    b=np.asarray(Image.open(f'{N}/c{i}.png').convert('RGB')).astype(float)
    old=np.asarray(Image.open(f'belt/out/layer_{i}.png'))[...,3]>100   # first cut: tells where the band is
    w=old.sum(1);rows=np.where(w>=0.3*w.max())[0];r0,r1=max(rows[0]-9,0),rows[-1]+10
    diff=np.sqrt(((ndi.gaussian_filter(d,(1,1,0))-ndi.gaussian_filter(b,(1,1,0)))**2).sum(2))
    m=diff>24;m[:r0]=False;m[r1:]=False;m[:,:8]=False;m[:,-8:]=False
    m&=~((d[...,0]-d[...,2])>24)  # skin (an arm GPT moved a little) is never belt: the belt is blue stones and silver
    m=ndi.binary_opening(m,iterations=1)
    m=ndi.binary_closing(m,structure=np.ones((5,11)),iterations=1)
    m=ndi.binary_fill_holes(m)
    lab,n=ndi.label(m)
    if n:
        sz=ndi.sum(m,lab,range(1,n+1))
        # real pieces are thick (the strap is >= 6px tall); outline slivers from a 1px shift are thin
        keep=[k+1 for k in range(n) if sz[k]>=40 and ndi.binary_erosion(lab==k+1,iterations=2).sum()>=12]
        m=np.isin(lab,keep)
    m&=~((diff<14))  # never cover what did not change (the hand on the belt, the dress)
    m=ndi.binary_closing(m,iterations=1)
    a=Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.7))
    lay=Image.fromarray(d.astype('uint8')).convert('RGBA');lay.putalpha(a);lay.save(f'belt/out/rl_{i}.png')
    print(i,r0,r1,int(m.sum()))
