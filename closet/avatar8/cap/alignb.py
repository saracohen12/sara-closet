# align the cap sheet to the hair frames by the lower body only (dress + legs + feet): the head changed and long hair hides the back
import numpy as np,os,glob,sys
from PIL import Image
from skimage.feature import match_template
SH=sys.argv[1];R0,R1=int(sys.argv[2]),int(sys.argv[3])
FR=sorted(glob.glob('/mnt/project-files/closet/avatar8/frames/*.png'),key=lambda p:int(os.path.basename(p).split('-')[0]))
X=[(0,361),(363,723),(725,1085),(1087,1448)];Y=[(0,541),(543,1086)]
boxes=[(x0,y0,x1,y1) for (y0,y1) in Y for (x0,x1) in X]
g=lambda im:np.asarray(im.convert('L')).astype(float)/255
sheet=Image.open(SH).convert('RGB');os.makedirs('out',exist_ok=True)
for i,(b,f) in enumerate(zip(boxes,FR)):
    p=sheet.crop(b);base=Image.open(f).convert('RGB');W,H=base.size;B=g(base)
    T=B[R0:R1,30:330];best=None
    for s in np.arange(0.94,1.12,0.004):
        q=p.resize((round(p.width*s),round(p.height*s)),Image.LANCZOS);Q=g(q)
        if Q.shape[0]<T.shape[0] or Q.shape[1]<T.shape[1]:continue
        r=match_template(Q,T);y,x=np.unravel_index(np.argmax(r),r.shape);v=r[y,x]
        if best is None or v>best[0]:best=(v,s,x,y)
    v,s,x,y=best
    q=p.resize((round(p.width*s),round(p.height*s)),Image.LANCZOS)
    bgc=tuple(int(c) for c in np.median(np.asarray(p)[:, :8].reshape(-1,3),axis=0))
    c=Image.new('RGB',(W,H),bgc);c.paste(q,(30-x,R0-y));c.save(f'out/{i+1}.png')
    print(i+1,'corr %.3f scale %.3f shift %d %d'%(v,s,30-x,R0-y))
