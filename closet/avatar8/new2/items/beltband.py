# a belt is a horizontal band: keep only the rows around it, and only real (thick) pieces
import sys,numpy as np
from PIL import Image
from scipy import ndimage as ndi
for f in sys.argv[1:]:
    a=np.asarray(Image.open(f).convert('RGBA')).copy();on=a[...,3]>60
    w=on.sum(1);rows=np.where(w>=0.3*w.max())[0];r0,r1=rows[0]-4,rows[-1]+5
    keep=np.zeros_like(on);keep[r0:r1]=True
    lab,n=ndi.label(on&keep)
    good=[k for k in range(1,n+1) if ndi.binary_erosion(lab==k,iterations=3).sum()>=10]
    m=ndi.binary_dilation(np.isin(lab,good),iterations=2)&keep
    a[...,3]=np.where(m,a[...,3],0);Image.fromarray(a).save(f);print(f,r0,r1,n,len(good))
