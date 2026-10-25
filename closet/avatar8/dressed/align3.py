# align each dressed panel to the bare frame using head (top) + legs/feet (bottom), skipping the torso the garment changes
import numpy as np,os,glob,sys
from PIL import Image
from skimage.feature import match_template
SH=sys.argv[1]
FR=sorted(glob.glob('/mnt/project-files/closet/avatar8/frames/*.png'),key=lambda p:int(os.path.basename(p).split('-')[0]))
X=[(0,361),(363,723),(725,1085),(1087,1448)];Y=[(0,541),(543,1086)]
boxes=[(x0,y0,x1,y1) for (y0,y1) in Y for (x0,x1) in X]
g=lambda im:np.asarray(im.convert('L')).astype(float)/255
sheet=Image.open(SH).convert('RGB');os.makedirs('out',exist_ok=True)
H0,H1,L0,L1=8,125,400,530
for i,(b,f) in enumerate(zip(boxes,FR)):
    p=sheet.crop(b);base=Image.open(f).convert('RGB');W,H=base.size;B=g(base)
    Th=B[H0:H1,40:320];Tl=B[L0:L1,40:320];best=None
    for s in np.arange(0.94,1.12,0.004):
        q=p.resize((round(p.width*s),round(p.height*s)),Image.LANCZOS);Q=g(q)
        if Q.shape[0]<L1+20:continue
        rh=match_template(Q,Th);rl=match_template(Q,Tl)
        d=L0-H0;n=min(rh.shape[0],rl.shape[0]-d)
        if n<=0:continue
        R=rh[:n]+rl[d:d+n];y,x=np.unravel_index(np.argmax(R),R.shape);v=R[y,x]/2
        if best is None or v>best[0]:best=(v,s,x,y,rh[y,x],rl[y+d,x])
    v,s,x,y,vh,vl=best
    q=p.resize((round(p.width*s),round(p.height*s)),Image.LANCZOS)
    bgc=tuple(int(c) for c in np.median(np.asarray(p)[:, :8].reshape(-1,3),axis=0))
    c=Image.new('RGB',(W,H),bgc);c.paste(q,(40-x,H0-y));c.save(f'out/{i+1}.png')
    print(i+1,'corr %.3f (head %.3f legs %.3f) scale %.3f shift %d %d'%(v,vh,vl,s,40-x,H0-y))
