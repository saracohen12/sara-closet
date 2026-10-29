# the cap doll's cap sticks out a little around the loose hair (crown, sides). Add the hair doll's backdrop there to the hair layer.
# usage: crownfix.py lh.png cap_frame.png hair_frame.png out.png
import sys,numpy as np
from PIL import Image
from scipy import ndimage as ndi
L,C,F,O=sys.argv[1:5]
lay=np.asarray(Image.open(L).convert('RGBA')).astype(float)
H,W=lay.shape[:2]
c=np.asarray(Image.open(C).convert('RGB').resize((W,H))).astype(float);f=np.asarray(Image.open(F).convert('RGB').resize((W,H))).astype(float)
a=lay[...,3]
ys=np.nonzero(a.max(1)>20)[0];top=ys.min()
near=ndi.binary_dilation(a>20,iterations=7)
m=(np.abs(c-f).sum(2)>40)&(a<200)&((f.max(2)-f.min(2))<16)&near
m[top+55:]=False
m=ndi.binary_dilation(m,iterations=1)&near
k=ndi.gaussian_filter(m.astype(float),0.7)
k=np.maximum(k,m*1.0)
out=lay.copy()
# backdrop under the hair: hair over it as before
ah=a/255
out[...,:3]=lay[...,:3]*ah[...,None]+f*(1-ah[...,None])*k[...,None]
na=ah+(1-ah)*k
out[...,:3]=np.where(na[...,None]>0,out[...,:3]/np.maximum(na,1e-6)[...,None],lay[...,:3])
out[...,3]=na*255
Image.fromarray(np.clip(out,0,255).astype(np.uint8)).save(O)
print(L,'crown px',int(m.sum()))
