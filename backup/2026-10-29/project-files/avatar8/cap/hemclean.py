# remove the feet / old shoes / floor shadow that GPT drew under a skirt's hem: per column, nothing below the lowest fabric pixel
# fabric = pixels whose colour is like the skirt's own (median colour of the layer's lower half), so beige feet and grey floor drop out
import sys,numpy as np
from PIL import Image
from scipy import ndimage as ndi
for f in sys.argv[1:]:
    im=Image.open(f).convert('RGBA');a=np.asarray(im).astype(float);H,W=a.shape[:2]
    al=a[...,3];rgb=a[...,:3]
    on=al>128;ys=np.where(on.any(1))[0];y0=ys[0]+(ys[-1]-ys[0])//2
    ref=np.median(rgb[y0:][on[y0:]],axis=0)
    fab=on&(np.sqrt(((rgb-ref)**2).sum(2))<70)
    fab=ndi.binary_opening(fab,iterations=1)
    lab,n=ndi.label(fab)
    if n:fab=lab==(np.argmax(ndi.sum(fab,lab,range(1,n+1)))+1)  # only the skirt itself, not dark bits of shoes/shadow below it
    low=np.full(W,-1)
    for x in range(W):
        r=np.where(fab[:,x])[0]
        if len(r):low[x]=r[-1]
    v=low>=0
    if v.any():
        sm=low.copy();sm[v]=ndi.median_filter(ndi.grey_closing(low[v],size=11),size=5)  # closing fills narrow dips (a light seam column is not the hem)
        for x in range(W):
            if sm[x]>=0:a[sm[x]+1:,x,3]=0
            elif on[:,x].any():a[y0:,x,3]=0
    Image.fromarray(a.astype(np.uint8)).save(f)
    print(f,'ref',ref.astype(int))
