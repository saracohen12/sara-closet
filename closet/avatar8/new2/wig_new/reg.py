import numpy as np,cv2,json,sys
from PIL import Image
N='/home/claude/sara-closet/closet/avatar8/new2'
def lum(a): return a.mean(2)
res={}
FL={1:(0,),2:(0,),3:(0,),4:(0,),5:(0,),6:(1,),7:(1,),8:(0,1)}
for i in range(1,9):
    w=np.asarray(Image.open(f'raw{i}.png').convert('RGB')).astype(float)
    mw=np.load(f'm_w{i}.npy'); mc=np.load(f'm_c{i}.npy')
    hair=mw&(lum(w)<125)
    best=None
    for flip in FL[i]:
        W=mw[:,::-1] if flip else mw; Hm=hair[:,::-1] if flip else hair
        ys=np.where(mc.any(1))[0];top,bot=ys[0],ys[-1]
        cut=top+int(.2*(bot-top))
        tgt=mc.copy();tgt[:cut]=False
        for s in np.arange(.9,1.13,.01):
            for dy in range(-30,31,2):
                for dx in range(-60,61,2):
                    M=np.float32([[s,0,dx],[0,s,dy]])
                    wm=cv2.warpAffine(W.astype(np.uint8),M,(360,541),flags=cv2.INTER_NEAREST)>0
                    hm=cv2.warpAffine(Hm.astype(np.uint8),M,(360,541),flags=cv2.INTER_NEAREST)>0
                    wm2=wm.copy();wm2[:cut]=False;care=~hm
                    inter=(wm2&tgt&care).sum();uni=((wm2|tgt)&care).sum()
                    iou=inter/uni
                    if best is None or iou>best[0]: best=(iou,flip,round(float(s),2),dx,dy)
    print(i,best,flush=True); res[i]=best
json.dump(res,open('reg.json','w'))
