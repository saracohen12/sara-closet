# wig v3 → live files: turn-normalize the layers (turn.json, premultiplied), make the head-less doll bases nh (backdrop photo) / ch (cut-out)
import numpy as np,cv2,json,os
from PIL import Image
N='/home/claude/sara-closet/closet/avatar8/new2';A='/home/claude/sara-closet/work/a8'
T=json.load(open(N+'/turn/turn.json'));os.makedirs('live',exist_ok=True)
def warp_rgba(l,M):
    al=l[...,3:].astype(np.float32)/255;pm=np.concatenate([l[...,:3]*al,al*255],2).astype(np.float32)
    w=cv2.warpAffine(pm,M,(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT,borderValue=0)
    a=w[...,3:]/255;rgb=np.where(a>0,w[...,:3]/np.maximum(a,1e-4),0)
    o=np.concatenate([np.clip(rgb,0,255),np.clip(w[...,3:],0,255)],2).astype(np.uint8);o[o[...,3]==0]=0;return o
for i in range(1,9):
    M=np.float32(T[str(i)])
    # check: live n = frames c through the turn
    c=np.asarray(Image.open(f'{N}/frames/c{i}.png').convert('RGB'));n=np.asarray(Image.open(f'{A}/n{i}.webp').convert('RGB'))
    cw=cv2.warpAffine(c,M,(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
    print(i,'n vs warped frame diff',round(float(np.abs(cw.astype(int)-n.astype(int))[60:480,60:300].mean()),2),flush=True)
    for nm in (['w','wb'] if i in (1,2,8) else ['w']):
        l=np.asarray(Image.open(f'out/{nm}{i}.png').convert('RGBA'));Image.fromarray(warp_rgba(l,M)).save(f'live/{nm}{i}.png')
    rm=np.load(f'out/rm{i}.npy');rmw=cv2.warpAffine(rm,M,(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT,borderValue=0)
    np.save(f'live/rm{i}.npy',rmw)
    # nh: the photo with the head painted over by the backdrop around it
    hm=(rmw>.02).astype(np.uint8)*255;hm=cv2.dilate(hm,np.ones((5,5),np.uint8))
    bd=cv2.inpaint(np.ascontiguousarray(n),hm,7,cv2.INPAINT_TELEA)
    nh=(n*(1-rmw[...,None])+bd*rmw[...,None]).astype(np.uint8);Image.fromarray(nh).save(f'live/nh{i}.png')
    # ch: the cut-out without the head
    co=np.asarray(Image.open(f'{A}/c{i}.webp').convert('RGBA')).copy();co[...,3]=(co[...,3]*(1-rmw)).astype(np.uint8);co[co[...,3]==0]=0
    Image.fromarray(co).save(f'live/ch{i}.png')
