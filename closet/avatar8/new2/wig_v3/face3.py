# find the doll's face inside each (body-registered) wig panel: multi-scale template match → head transform (scale k about the face, shift)
import numpy as np,cv2,json
from PIL import Image
from scipy import ndimage as ndi
N='/home/claude/sara-closet/closet/avatar8/new2'
R=json.load(open('reg3.json'))
def W0(i):
    _,s,dx,dy=R[str(i)];w=np.asarray(Image.open(f'raw{i}.png').convert('RGB'))
    return cv2.warpAffine(w,np.float32([[s,0,dx],[0,s,dy]]),(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
def lab(a): l=cv2.cvtColor(a,cv2.COLOR_RGB2LAB).astype(np.float32); l[...,0]*=100/255; l[...,1:]-=128; return l
out={}
for i in [1,2,3,7,8]:
    c=np.asarray(Image.open(f'{N}/frames/c{i}.png').convert('RGB'));W=W0(i)
    L=lab(c);sk=(L[...,0]>45)&((L[...,2]>=15.5)|(L[...,1]>=11.5))&((c[...,0].astype(int)-c[...,2])>20)
    sk[:20]=0;sk[100:]=0;sk=ndi.binary_opening(sk,iterations=1);lb,k=ndi.label(sk);sz=ndi.sum(sk,lb,range(1,k+1));f=lb==(np.argmax(sz)+1)
    ys,xs=np.where(f);y0,y1,x0,x1=ys.min(),ys.max(),xs.min(),xs.max()
    # eyes..mouth band of the face, away from the cap and the chin
    h=y1-y0;by0=int(y0+.18*h);by1=int(y0+.80*h);bx0=x0+2;bx1=x1-2
    T=cv2.cvtColor(c[by0:by1,bx0:bx1],cv2.COLOR_RGB2GRAY).astype(np.float32)
    G=cv2.cvtColor(W,cv2.COLOR_RGB2GRAY).astype(np.float32)
    best=(-1,)
    for k_ in np.arange(1.0,1.30,.01):   # the wig face is bigger: scale the TEMPLATE up
        t=cv2.resize(T,None,fx=k_,fy=k_,interpolation=cv2.INTER_LINEAR)
        r=cv2.matchTemplate(G[:160],t,cv2.TM_CCOEFF_NORMED);_,mv,_,ml=cv2.minMaxLoc(r)
        if mv>best[0]:best=(mv,float(k_),ml)
    mv,k_,(mx,my)=best
    # template box (bx0,by0) in the doll  ↔  (mx,my) in the wig at scale k_  → wig→doll head transform: x_d = (x_w - mx)/k_ + bx0
    out[i]={'corr':round(mv,3),'k':k_,'wbox':[mx,my],'dbox':[int(bx0),int(by0)],'face':[int(x0),int(y0),int(x1),int(y1)]}
    print(i,out[i],flush=True)
json.dump(out,open('face3.json','w'))
