# clean the rim of a layer: near its edge, a pixel that is (almost) the same as the bare doll underneath is the doll's dress, not the item.
# usage: defringe.py layer.png dressed_aligned.png bare.png out.png
import sys,numpy as np
from PIL import Image
from scipy import ndimage as ndi
L,Dp,Bp,O=sys.argv[1:5]
lay=np.asarray(Image.open(L).convert('RGBA')).astype(float)
d=np.asarray(Image.open(Dp).convert('RGB')).astype(float);b=np.asarray(Image.open(Bp).convert('RGB')).astype(float)
diff=np.sqrt(((d-b)**2).sum(2))
a=lay[...,3]/255;solid=a>0.5
inner=ndi.binary_erosion(solid,iterations=3)
rim=(a>0)&~inner
k=np.clip((diff-18)/30,0,1)            # 18 or less: same as the doll -> gone; 48 or more: fully the item
a2=np.where(rim,a*k,a)
a2=ndi.gaussian_filter(a2,0.5)*(a2>0)  # soften the new edge a little
lay[...,3]=np.clip(a2*255,0,255)
Image.fromarray(lay.astype(np.uint8)).save(O)
