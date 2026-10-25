# the item sheet was made by editing the cap sheet (same pixels apart from the item), so reuse the cap sheet's exact alignment
import sys,numpy as np
from PIL import Image
CAP={1:(0.992,2,4),2:(0.996,7,3),3:(1.004,8,1),4:(1.012,0,-5),5:(1.052,-9,-3),6:(1.048,-7,-2),7:(1.048,8,-2),8:(1.024,-7,7)}
X=[(0,361),(363,723),(725,1085),(1087,1448)];Y=[(0,541),(543,1086)]
boxes=[(x0,y0,x1,y1) for (y0,y1) in Y for (x0,x1) in X]
sh=Image.open(sys.argv[1]).convert('RGB');ref=np.asarray(Image.open('/mnt/project-files/closet/avatar8/cap/sheet.png').convert('RGB')).astype(float)
print('mean diff vs cap sheet %.1f'%np.abs(np.asarray(sh).astype(float)-ref).mean())
for i,b in enumerate(boxes,1):
    s,dx,dy=CAP[i];p=sh.crop(b);q=p.resize((round(p.width*s),round(p.height*s)),Image.LANCZOS)
    bgc=tuple(int(c) for c in np.median(np.asarray(p)[:, :8].reshape(-1,3),axis=0))
    c=Image.new('RGB',(360,541),bgc);c.paste(q,(dx,dy));c.save(f'out/{i}.png')
