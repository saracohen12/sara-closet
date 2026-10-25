# head registration wig sheet -> doll, by the face (template match over scales); wig sheet turns the other way: views 2-4,6-8 mirrored
import numpy as np,cv2,json
from PIL import Image
N='/home/claude/sara-closet/closet/avatar8/new2'
FLIP={1:0,2:1,3:1,4:1,5:0,6:1,7:1,8:1}
BOX={1:(158,38,202,96),2:(138,38,186,98),3:(136,30,178,98),7:(172,30,216,98),8:(172,30,218,94),
     4:(150,40,215,100),5:(150,50,215,100),6:(150,40,220,100)}
def g(a):
    a=cv2.cvtColor(a,cv2.COLOR_RGB2GRAY).astype(np.float32);return cv2.GaussianBlur(a,(0,0),1.0)
res={}
for i in range(1,9):
    c=np.asarray(Image.open(f'{N}/frames/c{i}.png').convert('RGB'))
    w=np.asarray(Image.open(f'raw{i}.png').convert('RGB'))
    if FLIP[i]: w=w[:,::-1].copy()
    x0,y0,x1,y1=BOX[i];T=g(c)[y0:y1,x0:x1]
    def fig(a):
        ai=a.astype(int);m=(ai[...,0]-ai[...,2])>0
        from scipy import ndimage as ndi
        m=ndi.binary_opening(m,iterations=2);lab,k=ndi.label(m);sz=ndi.sum(m,lab,range(1,k+1));m=lab==(np.argmax(sz)+1)
        ys=np.where(m.any(1))[0];top=ys[0];xs=np.where(m[top:top+30].any(0))[0];return top,(xs[0]+xs[-1])/2
    tc,cc=fig(c);tw,cw=fig(w)
    best=None
    for s in np.arange(.88,1.16,.01):
        gx=cc-s*cw;gy=tc-s*tw
        ws=cv2.resize(w,(int(round(360*s)),int(round(541*s))),interpolation=cv2.INTER_AREA if s<1 else cv2.INTER_LINEAR)
        r=cv2.matchTemplate(g(ws),T,cv2.TM_CCOEFF_NORMED)
        # only near the head-top guess: x0-u≈gx → u≈x0-gx
        U,V=np.meshgrid(np.arange(r.shape[1]),np.arange(r.shape[0]))
        r[(np.abs(x0-U-gx)>28)|(np.abs(y0-V-gy)>22)]=-1
        _,mx,_,loc=cv2.minMaxLoc(r)
        if best is None or mx>best[0]: best=(float(mx),round(float(s),2),int(x0-loc[0]),int(y0-loc[1]))
    res[i]=[FLIP[i]]+list(best[1:]);print(i,best,flush=True)
json.dump(res,open('reg_face.json','w'))
