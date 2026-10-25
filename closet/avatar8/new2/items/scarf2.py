# head cover cut v2 (Sara 19:40 "הכיסוי לא גזור טוב במצח ובצדדים"): in the head zone take EVERYTHING the sheet changed
# (scarf, the hair line and forehead under it, backdrop where the doll's cover was) so no beige cover peeks out;
# below the neck only the scarf's own navy, never the beige dress between a tail and the body.
import sys,numpy as np
from PIL import Image,ImageFilter
from scipy import ndimage as ndi
N='/home/claude/sara-closet/closet/avatar8/new2/frames'
NECK={1:86,2:94,3:96,4:92,5:69,6:81,7:83,8:81}
name=sys.argv[1] if len(sys.argv)>1 else 'scarf'
for i in range(1,9):
    d=np.asarray(Image.open(f'{name}/out/{i}.png').convert('RGB')).astype(float)
    b=np.asarray(Image.open(f'{N}/c{i}.png').convert('RGB')).astype(float)
    H=d.shape[0];nk=NECK[i]
    diff=np.sqrt(((ndi.gaussian_filter(d,(1,1,0))-ndi.gaussian_filter(b,(1,1,0)))**2).sum(2))
    edge=np.zeros_like(diff,bool);edge[:,:8]=edge[:,-8:]=True
    head=(diff>20)&~edge;head[nk+6:]=False
    head=ndi.binary_opening(head,iterations=1)
    lab,n=ndi.label(head)
    if n:
        sz=ndi.sum(head,lab,range(1,n+1));head=np.isin(lab,[k+1 for k in range(n) if sz[k]>=60])
    head=ndi.binary_closing(head,iterations=3);head=ndi.binary_fill_holes(head)
    head=ndi.binary_dilation(head,iterations=2);head[nk+6:]=False;head&=~edge
    navy=(d[...,2]-d[...,0])>12
    body=(diff>32)&navy&~edge;body[:nk-10]=False;body[int(H*.6):]=False
    body=ndi.binary_opening(body,iterations=1);body=ndi.binary_closing(body,iterations=2)
    body&=ndi.binary_dilation(navy,iterations=1)  # closing must not bridge the dress between two tails
    lab,n=ndi.label(body|head)
    keep=np.unique(lab[head]);keep=keep[keep>0]
    body&=np.isin(lab,keep)
    lab2,n2=ndi.label(body)
    if n2:
        sz=ndi.sum(body,lab2,range(1,n2+1));body=np.isin(lab2,[k+1 for k in range(n2) if sz[k]>=40])
    m=head|body
    a=Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.7))
    lay=Image.fromarray(d.astype('uint8')).convert('RGBA');lay.putalpha(a);lay.save(f'{name}/out/rl_{i}.png')
    print(i,int(head.sum()),int(body.sum()))
