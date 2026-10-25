# hair layer = where the hair frame differs from the aligned cap frame, and the pixel is hair-like (darker than skin/cap)
import numpy as np,glob,os
from PIL import Image,ImageFilter
from scipy import ndimage as ndi
FR=sorted(glob.glob('/mnt/project-files/closet/avatar8/frames/*.png'),key=lambda p:int(os.path.basename(p).split('-')[0]))
for i,f in enumerate(FR,1):
    h=np.asarray(Image.open(f).convert('RGB')).astype(float);c=np.asarray(Image.open(f'out/{i}.png').convert('RGB')).astype(float)
    hs=ndi.gaussian_filter(h,(1.2,1.2,0));cs=ndi.gaussian_filter(c,(1.2,1.2,0))
    d=np.sqrt(((hs-cs)**2).sum(2))
    L=hs.mean(2);sat=hs.max(2)-hs.min(2)
    m=(d>35)&(L<150)
    H=m.shape[0];m[int(H*.62):]=False
    m=ndi.binary_opening(m,iterations=1);m=ndi.binary_closing(m,iterations=3)
    lab,n=ndi.label(m)
    if n:
        sz=ndi.sum(m,lab,range(1,n+1));m=np.isin(lab,[k+1 for k in range(n) if sz[k]>=max(300,0.03*sz.max())])
    m=ndi.binary_fill_holes(m)
    a=Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.9))
    im=Image.open(f).convert('RGBA');im.putalpha(a);im.save(f'out/hair_{i}.png')
    base=Image.open(f'out/{i}.png').convert('RGBA');base.alpha_composite(im);base.save(f'out/hcomp_{i}.png')
