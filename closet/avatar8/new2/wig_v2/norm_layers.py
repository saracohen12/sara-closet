# apply the turn normalization (turn.json) to layers made against new2/frames: norm_layers.py <prefix_in_dir> <out_dir> name...
import numpy as np,cv2,json,sys,os
from PIL import Image
D='/tmp/claude-0/-home-claude-sara-closet/71748e5c-3b71-573a-97eb-d7d6fafc81be/scratchpad'
T=json.load(open(D+'/turn.json'));src,out=sys.argv[1],sys.argv[2]
for nm in sys.argv[3:]:
    for i in range(1,9):
        l=np.asarray(Image.open(f'{src}/{nm}{i}.png').convert('RGBA'));M=np.float32(T[str(i)])
        al=l[...,3:].astype(np.float32)/255;pm=np.concatenate([l[...,:3]*al,al*255],2).astype(np.float32)
        w=cv2.warpAffine(pm,M,(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT,borderValue=0)
        A=w[...,3:]/255;rgb=np.where(A>0,w[...,:3]/np.maximum(A,1e-4),0)
        o=np.concatenate([np.clip(rgb,0,255),np.clip(w[...,3:],0,255)],2).astype(np.uint8);o[o[...,3]==0]=0
        Image.fromarray(o).save(f'{out}/{nm}{i}.png',optimize=True)
