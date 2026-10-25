# hem clean for a long dress whose hem is lace in the dress colour (hemclean.py drops the lighter lace and cuts stairs into it):
# below the knees, per column nothing under the lowest pixel in the dress's own hue family (green: G above R and not bluer than the backdrop)
# usage: cd <item>; python3 ../hemgreen.py  (out/layer_<i>.png -> work/d<i>.png)
import numpy as np,os
from PIL import Image
from scipy import ndimage as ndi
os.makedirs('work',exist_ok=True)
for i in range(1,9):
    a=np.asarray(Image.open(f'out/layer_{i}.png').convert('RGBA')).copy();H,W=a.shape[:2];y0=int(H*.66)
    r,g,b=[a[...,k].astype(int) for k in range(3)];on=a[...,3]>128
    fab=on&(g>r+4)&(g>=b-2);fab=ndi.binary_opening(fab,iterations=1)
    low=np.full(W,-1)
    for x in range(W):
        ys=np.where(fab[y0:,x])[0]
        if len(ys):low[x]=y0+ys[-1]
    v=low>=0
    if v.any():
        sm=low.copy();sm[v]=ndi.median_filter(ndi.grey_closing(low[v],size=7),size=3)
        for x in range(W):
            if sm[x]>=0:a[sm[x]+2:,x,3]=0
            else:a[y0:,x,3]=0
    Image.fromarray(a).save(f'work/d{i}.png')
