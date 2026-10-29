import json,sys
from PIL import Image
import numpy as np
from scipy import ndimage
S='/tmp/claude-0/-home-user/6b76d0a4-42d5-5937-a979-ea023e0fdb25/scratchpad'
P=[(0,332,'front'),(335,658,'side'),(661,1004,'back'),(1007,1306,'half'),(1309,1672,'hip')]
W,H=399,1365;TOP=38;FH=1291;CX=199.5
def cut_panel(a,x0,x1):
    c=a[0:852,x0+2:x1-1];h,w,_=c.shape
    edge=np.concatenate([c[:,:12],c[:,-12:]],axis=1);bg=np.median(edge,axis=1)[:,None,:]
    d=np.abs(c-bg).sum(axis=2);cand=d<34
    lab,_=ndimage.label(cand);border=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    fg=~np.isin(lab,list(border));fg=ndimage.binary_opening(fg,iterations=1);fg=ndimage.binary_fill_holes(fg)
    sat=c.max(axis=2)-c.min(axis=2);gap=(d<26)&(sat<14);lg,ng=ndimage.label(gap)
    if ng:
        szg=ndimage.sum(gap,lg,range(1,ng+1));big=[i+1 for i,v in enumerate(szg) if v>120];fg&=~np.isin(lg,big)
    lo=int(h*.86);sh=(sat[lo:]<20)&(np.abs(c[lo:]-bg[lo:]).sum(axis=2)<120);fg[lo:]&=~sh
    fg=ndimage.binary_opening(fg,iterations=1);lab2,nn=ndimage.label(fg);sz=ndimage.sum(fg,lab2,range(1,nn+1));fg=lab2==1+int(np.argmax(sz))
    alpha=ndimage.gaussian_filter(fg.astype(float),0.8)
    rgba=np.dstack([c,alpha*255]).astype(np.uint8);ys,xs=np.where(fg)
    return Image.fromarray(rgba,'RGBA').crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1))
def to_stage(im):
    s=FH/im.height;nw=round(im.width*s);nh=FH;top=TOP
    if nw>392:
        s=392/im.width;nw=392;nh=round(im.height*s);top=TOP+(FH-nh)
    im2=im.resize((nw,nh),Image.LANCZOS)
    cv=Image.new('RGBA',(W,H),(0,0,0,0));cv.alpha_composite(im2,(round(CX-nw/2),top));return cv
def headmask(st,hair=True,limit=290,hair_rows=650):
    a=np.array(st);al=a[:,:,3]>40;L=a[:,:,:3].astype(int).mean(2)
    head=al.copy();head[limit:]=False
    if hair:
        hr=al&(L<112);hr[hair_rows:]=False;hr=ndimage.binary_closing(hr,iterations=3)
        lab,n=ndimage.label(hr|head);keep=set(np.unique(lab[head]))-{0};m=np.isin(lab,list(keep))
        m=ndimage.binary_fill_holes(m)
    else:m=head
    m=ndimage.binary_opening(m,iterations=1)
    mf=m.astype(float)
    if not hair:
        # feather the bottom edge so the overlay blends into the body
        for i,r in enumerate(range(limit-16,limit)):mf[r]*= (16-i)/16.0
    out=a.copy();out[:,:,3]=(a[:,:,3]*mf).astype(np.uint8);return Image.fromarray(out,'RGBA')
OUT={}
for sheet,tag in [('wig','p5'),('cov','p5c')]:
    a=np.asarray(Image.open(f'in/{sheet}.png').convert('RGB')).astype(int)
    for x0,x1,n in P:
        st=to_stage(cut_panel(a,x0,x1));st.save(f'out/{tag}_{n}.webp',quality=92);st.save(f'out/{tag}_{n}.png')
        al=np.array(st)[:,:,3]>40;ys,xs=np.where(al);OUT[f'{tag}_{n}']=[int(xs.min()),int(ys.min()),int(xs.max()),int(ys.max())]
    fr=Image.open(f'out/{tag}_front.png');bk=Image.open(f'out/{tag}_back.png')
    if tag=='p5':
        headmask(fr,True).save('out/p5_front_head.webp',quality=92);headmask(bk,True).save('out/p5_back_head.webp',quality=92)
    headmask(fr,False).save(f'out/{tag}_front_headonly.webp',quality=92);headmask(bk,False).save(f'out/{tag}_back_headonly.webp',quality=92)
# TIEHEAD from covered set
def headbox(path):
    al=np.array(Image.open(path).convert('RGBA'))[:,:,3]>40;rows=np.where(al.any(1))[0];top=rows[0];bot=rows[-1];Hf=bot-top;hh=int(Hf*0.125)
    sub=al[top:top+hh];cols=np.where(sub.any(0))[0];widths=[(np.where(r)[0][-1]-np.where(r)[0][0]) if r.any() else 0 for r in sub[:int(hh*.75)]]
    return dict(top=int(top),hh=hh,cx=float((cols[0]+cols[-1])/2),w=int(max(widths)))
TH={n:headbox(f'out/p5c_{n}.webp') for *_,n in P};OUT['TIEHEAD']=TH
print(json.dumps(OUT))
json.dump(OUT,open('out/meta.json','w'))
# preview
names=['p5_front','p5_side','p5_back','p5_half','p5_hip','p5_front_head','p5_front_headonly','p5_back_head','p5c_front','p5c_side','p5c_back','p5c_half','p5c_hip','p5c_front_headonly','p5c_back_headonly']
ims=[Image.open(f'out/{n}.webp').convert('RGBA') for n in names]
pv=Image.new('RGB',(len(ims)*205,1365),(235,225,215));x=0
for im in ims:pv.paste(im.resize((199,682)),(x+3,0),im.resize((199,682)));x+=205
pv.save('out/preview.jpg',quality=85);print('preview',pv.size)
