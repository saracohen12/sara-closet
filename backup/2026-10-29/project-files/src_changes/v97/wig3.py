from PIL import Image, ImageFilter;import numpy as np
from scipy import ndimage
S='/tmp/claude-0/-home-user/6b76d0a4-42d5-5937-a979-ea023e0fdb25/scratchpad/av95/'
O=S+'../src/work/me/'
CUT={'front':242,'side':247,'back':237,'half':247,'hip':410}
def hair(k):
    w=np.array(Image.open(S+'p6/p6w_'+k+'.png')).astype(int);c=np.array(Image.open(S+'p6/p6c_'+k+'.png')).astype(int)
    aw=w[:,:,3]>128;ac=c[:,:,3]>128
    L=(w[:,:,0]*.3+w[:,:,1]*.59+w[:,:,2]*.11)
    if k=='half':
        h=aw&(L<150)
    else:
        d=np.abs(w[:,:,:3]-c[:,:,:3]).sum(2)
        h=aw&((~ac)|(d>70))&(L<175)
    h[CUT[k]+200 if k!='hip' else CUT[k]+160:]=False if k in('front','half','hip') else h[CUT[k]+200 if k!='hip' else CUT[k]+160:]
    # keep only components connected to the head area
    h=ndimage.binary_closing(h,iterations=2);h=ndimage.binary_opening(h,iterations=1)
    lab,n=ndimage.label(h);keep=np.zeros_like(h)
    top=CUT[k]
    for i in range(1,n+1):
        m=lab==i;ys=np.where(m.any(1))[0]
        if ys[0]<top and m.sum()>150:keep|=m
    keep=ndimage.binary_fill_holes(keep)&aw
    return w.astype(np.uint8),keep,aw
def build(k):
    w,hm,aw=hair(k);H=w.shape[0];ys=np.arange(H)[:,None]
    head=aw&(ys<=CUT[k])
    m=(head|hm).astype(float)
    # soft fade of the head part below the cut, hair keeps its own edge
    m=np.array(Image.fromarray((m*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(float)/255
    m=np.minimum(m,w[:,:,3]/255.)
    out=w.copy();out[:,:,3]=(m*255).astype(np.uint8);return Image.fromarray(out)
if __name__=='__main__':
    prev=[]
    for k in ['front','side','back','half','hip']:
        Image.open(S+'p6/p6w_'+k+'.png').save(O+'p6w_'+k+'.webp',quality=92,method=6)
        ov=build(k);ov.save(O+'p6w_'+k+'_head.webp',quality=92,method=6)
        g=Image.new('RGBA',(399,1365),(235,232,226,255));g.alpha_composite(Image.open(S+'p6/p6w_'+k+'.png'))
        gar=Image.new('RGBA',(399,1365),(0,0,0,0));top=300 if k!='hip' else 470
        gar.paste((40,70,140,255),(30,top-30,370,top+400))
        g.alpha_composite(gar);g.alpha_composite(ov);prev.append(g.convert('RGB').crop((0,0,399,800)))
    # neck for open necklines (front)
    w=np.array(Image.open(S+'p6/p6w_front.png'));ys=np.arange(w.shape[0])
    m=np.clip((302-ys)/6,0,1)*np.clip((ys-236)/6,0,1);w[:,:,3]=(w[:,:,3]*m[:,None]).astype(np.uint8);Image.fromarray(w).save(O+'p6w_front_neck.webp',quality=92,method=6)
    Wd=Image.new('RGB',(399*5,800));[Wd.paste(p,(399*i,0)) for i,p in enumerate(prev)];Wd.resize((399*5//2,400)).save(S+'p6/wig_ovl.jpg')
    Image.open(S+'w3f1.png').convert('RGB').save(O+'p6w_sheet1.jpg',quality=90);Image.open(S+'w3f2.png').convert('RGB').save(O+'p6w_sheet2.jpg',quality=90)
