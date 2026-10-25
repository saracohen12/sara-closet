# forearms + hands of the new avatar as a separate layer, drawn above the garments (nearest-colour: skin vs base dress)
from PIL import Image
import numpy as np
from scipy import ndimage
for name,band in [('p5_front',(.27,.59)),('p5_back',(.27,.59))]:
    im=Image.open(f'../../build/pub/av/{name}.webp').convert('RGBA'); a=np.asarray(im).astype(float); H,W=a.shape[:2]; rgb=a[...,:3]; alpha=a[...,3]>120
    def seed(y0,y1,x0,x1):
        r=rgb[int(H*y0):int(H*y1),int(W*x0):int(W*x1)]; m=alpha[int(H*y0):int(H*y1),int(W*x0):int(W*x1)]; return np.median(r[m],axis=0)
    dress=seed(.42,.46,.42,.58); skin=seed(.70,.76,.40,.60)
    dd=np.linalg.norm(rgb-dress,axis=2); ds=np.linalg.norm(rgb-skin,axis=2)
    sk=alpha&(ds<dd-6)
    y0,y1=int(H*band[0]),int(H*band[1]); mask=np.zeros_like(sk); mask[y0:y1]=sk[y0:y1]
    mask=ndimage.binary_opening(mask,iterations=2); lab,n=ndimage.label(mask); keep=[]
    for i in range(1,n+1):
        ys,xs=np.where(lab==i)
        if len(xs)<300: continue
        cx=xs.mean()/W
        if cx<.36 or cx>.64: keep.append(i)
    mask=np.isin(lab,keep); mask=ndimage.binary_closing(mask,iterations=3); mask=ndimage.binary_fill_holes(mask)
    al=ndimage.gaussian_filter(mask.astype(float),0.9)*255
    out=np.dstack([a[...,:3],np.minimum(al,a[...,3])]).astype(np.uint8)
    Image.fromarray(out).save(f'../../build/pub/av/{name}_arms.webp',quality=92,method=6)
    ys,xs=np.where(mask)
    if not len(ys): print(name,'NO ARMS FOUND'); continue
    print(name,'dress',dress.round(),'skin',skin.round(),'arm px',int(mask.sum()),'comps',len(keep),'y',ys.min(),ys.max(),'x',xs.min(),xs.max())
    pv=Image.open(f'../../build/pub/av/{name}.webp').convert('RGBA'); dim=Image.new('RGBA',pv.size,(255,255,255,140)); pv=Image.alpha_composite(pv,dim)
    tint=Image.new('RGBA',pv.size,(220,30,30,0)); tint.putalpha(Image.fromarray(al.astype(np.uint8))); pv=Image.alpha_composite(pv,tint); pv.save(f'../../tests/audit/{name}_arms_preview.png')
