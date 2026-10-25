# drop pale, thin pieces (outline slivers / redrawn backdrop) from a finished layer
import sys,numpy as np
from PIL import Image
from scipy import ndimage as ndi
for f in sys.argv[1:]:
    a=np.asarray(Image.open(f).convert('RGBA')).astype(float);rgb=a[...,:3]
    on=a[...,3]>40
    lab,n=ndi.label(ndi.binary_dilation(on,iterations=1))
    bg=np.median(np.concatenate([rgb[:,:6],rgb[:,-6:]],1),1)  # layer is transparent there, but the colour channels still hold the source backdrop
    dbg=np.sqrt(((rgb-bg[:,None,:])**2).sum(2))
    drop=0
    for k in range(1,n+1):
        p=(lab==k)&on
        if ndi.binary_erosion(p,iterations=2).sum()<15 or np.median(dbg[p])<40:
            a[...,3][lab==k]=0;drop+=1
    Image.fromarray(a.astype(np.uint8)).save(f);print(f,'dropped',drop,'of',n)
