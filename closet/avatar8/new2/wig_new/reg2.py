import numpy as np,cv2,json,sys
from PIL import Image
reg=json.load(open('reg_body.json'))
for i in map(int,sys.argv[1:]):
    w=np.asarray(Image.open(f'raw{i}.png').convert('RGB')).astype(float)
    mw=np.load(f'm_w{i}.npy'); mc=np.load(f'm_c{i}.npy')
    flip=reg[str(i)][1]
    hair=mw&(w.mean(2)<128)
    W=mw[:,::-1] if flip else mw; Hm=hair[:,::-1] if flip else hair
    ys=np.where(mc.any(1))[0];top,bot=ys[0],ys[-1]
    r0=top+int(.16*(bot-top)); r1=top+int(.45*(bot-top))
    tgt=mc.copy();tgt[:r0]=False;tgt[r1:]=False
    best=None
    for s in np.arange(.97,1.09,.01):
        for dy in range(-24,25,2):
            for dx in range(-60,61,2):
                M=np.float32([[s,0,dx],[0,s,dy]])
                wm=cv2.warpAffine(W.astype(np.uint8),M,(360,541),flags=cv2.INTER_NEAREST)>0
                hm=cv2.warpAffine(Hm.astype(np.uint8),M,(360,541),flags=cv2.INTER_NEAREST)>0
                wm[:r0]=False;wm[r1:]=False;care=~hm
                iou=(wm&tgt&care).sum()/((wm|tgt)&care).sum()
                if best is None or iou>best[0]: best=(float(iou),flip,round(float(s),2),dx,dy)
    print(i,best,flush=True); reg[str(i)]=best
    json.dump(reg,open('reg.json','w'))
    reg=json.load(open('reg.json'))
