import numpy as np
from PIL import Image
S='/tmp/claude-0/-home-user/6b76d0a4-42d5-5937-a979-ea023e0fdb25/scratchpad/'
OLD=S+'src/work/me/'
TOP,FEET,W,H=38,1328,399,1365
def bbox(a):
    m=a[:,:,3]>128;ys=np.where(m.any(1))[0];xs=np.where(m.any(0))[0];return ys[0],ys[-1],xs[0],xs[-1]
def norm(k,cx=None,maxw=391):
    im=Image.open(S+'av95/cut_'+k+'.png');a=np.array(im);y0,y1,x0,x1=bbox(a)
    fh=y1-y0+1;fw=x1-x0+1;s=(FEET-TOP+1)/fh
    if fw*s>maxw:s=maxw/fw
    crop=im.crop((x0,y0,x1+1,y1+1)).resize((round(fw*s),round(fh*s)),Image.LANCZOS)
    out=Image.new('RGBA',(W,H),(0,0,0,0))
    ox=round((cx if cx is not None else W/2)-crop.width/2);ox=max(4,min(W-4-crop.width,ox))
    out.alpha_composite(crop,(ox,FEET+1-crop.height));return out,s
def rows(a,ys):
    m=a[:,:,3]>128;r={}
    for y in ys:
        xs=np.where(m[y])[0];r[y]=(xs[0],xs[-1]) if len(xs) else None
    return r
if __name__=='__main__':
    for k in ['front','side','back','half','hip']:
        o=np.array(Image.open(OLD+'p5c_'+k+'.webp'));oy0,oy1,ox0,ox1=bbox(o)
        n,s=norm(k,cx=(ox0+ox1)/2);n=np.array(n);ny0,ny1,nx0,nx1=bbox(n)
        print(k,'old',(oy0,oy1,ox0,ox1),'new',(ny0,ny1,nx0,nx1),'s',round(s,3))
        ys=list(range(200,1330,40))
        ro,rn=rows(o,ys),rows(n,ys)
        print('  '+' '.join(f"{y}:{ro[y][1]-ro[y][0] if ro[y] else 0}/{rn[y][1]-rn[y][0] if rn[y] else 0}" for y in ys))
