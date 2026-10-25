# where GPT moved a limb when it dressed her (the lace sleeve sits higher than the doll's bare arm), the doll's own arm sticks out
# from under the garment. Those pixels are backdrop in the GPT frame but body on the doll: copy the GPT backdrop into the layer, so the old arm is hidden.
# usage: cd <item>; python3 ../uncover.py   (edits work/d<i>.png in place; run after hemclean, before lace.py / rimclean)
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
FR='/home/claude/sara-closet/closet/avatar8/new2/frames/'
for i in range(1,9):
    b=np.asarray(Image.open(f'{FR}c{i}.png').convert('RGB')).astype(float);g=np.asarray(Image.open(f'out/{i}.png').convert('RGB')).astype(float)
    L=np.asarray(Image.open(f'work/d{i}.png').convert('RGBA')).copy()
    edge=np.concatenate([g[:,:10],g[:,-10:]],axis=1);bg=np.median(edge,axis=1)
    gbg=np.sqrt(((g-bg[:,None,:])**2).sum(2))<=22;bbody=np.sqrt(((b-bg[:,None,:])**2).sum(2))>30
    diff=np.sqrt(((ndi.gaussian_filter(g,(1,1,0))-ndi.gaussian_filter(b,(1,1,0)))**2).sum(2))
    near=ndi.binary_dilation(L[...,3]>128,iterations=24)
    m=(diff>40)&gbg&bbody&near&(L[...,3]<128)
    m=ndi.binary_opening(m,iterations=1);lab,n=ndi.label(m)
    if n:sz=ndi.sum(m,lab,range(1,n+1));m=np.isin(lab,1+np.where(sz>=15)[0])
    m[:,:8]=False;m[:,-8:]=False;H=m.shape[0];m[int(H*.86):]=False  # not the floor/feet
    m=ndi.binary_dilation(m,iterations=1)&(L[...,3]<128)
    soft=np.clip(ndi.gaussian_filter(m.astype(float),.7)*1.6,0,1)
    a=np.maximum(L[...,3]/255,soft)
    L[...,:3]=np.where((soft>0)[...,None]&(L[...,3:]<128),g,L[...,:3]).astype(np.uint8);L[...,3]=(a*255).astype(np.uint8)
    Image.fromarray(L).save(f'work/d{i}.png');print(i,'uncovered px',int(m.sum()))
