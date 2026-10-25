# wig v3: crop the 8 panels of Sara's new wig sheet and register each to the doll frame (scale+shift on the body below the hair)
import numpy as np,cv2,json
from PIL import Image
from scipy import ndimage as ndi
N='/home/claude/sara-closet/closet/avatar8/new2'
w=np.asarray(Image.open('sheet_wig3.png').convert('RGB'))
X=[(0,359),(361,722),(725,1084),(1086,1448)];Y=[(0,539),(541,1086)]
def fig(a):a=a.astype(int);m=(a[...,0]-a[...,2])>4;return ndi.binary_opening(m,iterations=1)
R={}
for i in range(1,9):
    r,cc=(i-1)//4,(i-1)%4
    raw=w[Y[r][0]:Y[r][1],X[cc][0]:X[cc][1]];Image.fromarray(raw).save(f'raw{i}.png')
    c=np.asarray(Image.open(f'{N}/frames/c{i}.png').convert('RGB'))
    fc=fig(c);fw=fig(raw)
    y0=270
    best=(-1,)
    for s in np.arange(.94,1.08,.01):
        for dy in range(-30,31,2):
            for dx in range(-30,31,2):
                M=np.float32([[s,0,dx],[0,s,dy]]);W=cv2.warpAffine(fw.astype(np.uint8),M,(360,541),flags=cv2.INTER_NEAREST)>0
                a=fc[y0:];b=W[y0:];iou=(a&b).sum()/max(1,(a|b).sum())
                if iou>best[0]:best=(iou,s,dx,dy)
    # refine
    iou,s,dx,dy=best
    for s2 in np.arange(s-.01,s+.011,.0025):
        for dy2 in np.arange(dy-2,dy+2.1,.5):
            for dx2 in np.arange(dx-2,dx+2.1,.5):
                M=np.float32([[s2,0,dx2],[0,s2,dy2]]);W=cv2.warpAffine(fw.astype(np.uint8)*255,M,(360,541),flags=cv2.INTER_LINEAR)>127
                a=fc[y0:];b=W[y0:];v=(a&b).sum()/max(1,(a|b).sum())
                if v>best[0]:best=(v,float(s2),float(dx2),float(dy2))
    R[i]=best;print(i,[round(x,4) for x in best],flush=True)
json.dump({k:list(v) for k,v in R.items()},open('reg3.json','w'))
