# wig v2: keep the DOLL's own face; take only the hair from the wig sheet, aligned to her head; hide the cap (backdrop behind, skin inside)
import numpy as np,cv2,json,sys
from PIL import Image
from scipy import ndimage as ndi
N='/home/claude/sara-closet/closet/avatar8/new2'
D='/tmp/claude-0/-home-claude-sara-closet/71748e5c-3b71-573a-97eb-d7d6fafc81be/scratchpad/wigfix'
# flip (the wig sheet turns the other way), scale, dx, dy  – measured on eyes/nose/chin (front views) and head centre/ear (back views)
R={1:(0,.97,-9,1),2:(1,1.0,2,2),3:(1,.975,1,7.5),4:(1,1.0,13,4),5:(0,1.0,-6,-4),6:(1,1.0,0,-1),7:(1,1.03,-16.5,-6),8:(1,.95,9.5,-2.5)}
R.update({int(k):tuple(v) for k,v in (json.load(open(D+'/adj2.json')).items() if __import__('os').path.exists(D+'/adj2.json') else [])})
FRONT={3:176,4:172,6:-196,7:-173}  # profiles/back views: protect only the face in front of the ear (x<v, or x>-v)
NECK={1:86,2:94,3:96,4:92,5:69,6:81,7:83,8:81}
SK={1:[(170,72),(186,72),(178,96)],2:[(150,70),(166,70),(160,96)],3:[(160,72),(168,96)],4:[(166,76),(176,92)],5:[(178,74),(178,80)],6:[(200,70),(196,90)],7:[(192,66),(186,90)],8:[(196,62),(186,90)]}
def lab(a): l=cv2.cvtColor(a,cv2.COLOR_RGB2LAB).astype(np.float32); l[...,0]*=100/255; l[...,1:]-=128; return l
import os
BEH=os.environ.get('BEH')=='1';NM='lwb' if BEH else 'lw'
views=list(map(int,sys.argv[1].split(','))) if len(sys.argv)>1 else range(1,9)
for i in views:
    f,s,dx,dy=R[i]
    c=np.asarray(Image.open(f'{N}/frames/c{i}.png').convert('RGB'))
    w=np.asarray(Image.open(f'raw{i}.png').convert('RGB'))
    if f: w=w[:,::-1].copy()
    W=cv2.warpAffine(w,np.float32([[s,0,dx],[0,s,dy]]),(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
    H=541;nk=NECK[i]
    # wig backdrop per row (edge columns), distance from it
    we=np.concatenate([W[:,:10],W[:,-10:]],1).astype(float);wbg=np.median(we,1)
    d=np.sqrt(((W.astype(float)-wbg[:,None,:])**2).sum(2))
    Lw=lab(W)
    L=Lw[...,0]
    core=(L<50)&(d>35)
    Rg=ndi.binary_closing(core,iterations=2)|core
    lb,k=ndi.label(Rg);sz=ndi.sum(Rg,lb,range(1,k+1));Rg=np.isin(lb,np.where(sz>=40)[0]+1)
    # hair continues only from the head: drop pieces that do not touch the head zone
    lb,k=ndi.label(Rg);keep=np.unique(lb[:nk+20][Rg[:nk+20]]);Rg=np.isin(lb,keep[keep>0])
    # nothing from the wig's own face (its eyes/brows would land on hers)
    Wl=Lw;wsk=(Wl[...,0]>45)&((Wl[...,2]>=15.5)|(Wl[...,1]>=11.5))&(d>30);wsk[nk+4:]=False
    wface=ndi.binary_fill_holes(ndi.binary_closing(wsk,iterations=3));lb,k=ndi.label(wface)
    if k: sz=ndi.sum(wface,lb,range(1,k+1));wface=lb==(np.argmax(sz)+1)
    Rg&=~ndi.binary_erosion(wface,iterations=2)
    er=ndi.binary_erosion(Rg,iterations=1);band=ndi.binary_dilation(Rg,iterations=2)&~er
    soft=np.clip((d-10)/45,0,1)*np.clip((70-L)/16,0,1)
    al=np.zeros((H,360),np.float32);al[er]=1;al[band]=soft[band]
    al=ndi.gaussian_filter(al,.5);al[er]=np.maximum(al[er],.97)
    # edge pixels carry the wig's own backdrop: give them the colour of the nearest solid hair pixel
    _,(iy,ix)=ndi.distance_transform_edt(~er,return_indices=True)
    Wd=W.copy();bd=band&~er;Wd[bd]=W[iy[bd],ix[bd]]
    # doll: head silhouette, skin model, cap
    Lc=lab(c);ci=c.astype(int)
    fig=(ci[...,0]-ci[...,2])>0;fig=ndi.binary_opening(fig,iterations=1)
    # the cap is a grey-beige (a*≈8, b*≈11), her skin is warmer (a*≥12 or b*≥16)
    capc=(Lc[...,2]<15.5)&(Lc[...,1]<11.5)&(Lc[...,0]>50)&fig
    skin=fig&~capc&(Lc[...,0]>45)&((Lc[...,2]>=15.5)|(Lc[...,1]>=11.5));skin=ndi.binary_opening(skin,iterations=1)
    dark=(Lc[...,0]<45)&fig   # her own front hair strip / eyebrows
    zone=np.zeros((H,360),bool);zone[:nk+2]=True
    cap=capc&zone
    cap=ndi.binary_opening(cap,iterations=1)
    # keep only big cap pieces that reach the upper head (eyes/teeth/lips are inside the face, lower)
    ys=np.where(fig[:nk].any(1))[0];top=ys[0];lim=top+.42*(nk-top)
    lb,k=ndi.label(cap);ok=[j+1 for j,sl in enumerate(ndi.find_objects(lb)) if sl[0].start<lim and (lb[sl]==j+1).sum()>=60];cap=np.isin(lb,ok)
    cap=ndi.binary_dilation(cap,iterations=3)&zone
    # her face stays hers: no wig hair over the inside of her face
    fc=ndi.binary_erosion(ndi.binary_fill_holes(ndi.binary_closing(skin&zone,iterations=3)),iterations=3);fc[nk-4:]=False
    X=np.arange(360)[None,:].repeat(H,0)
    if i in FRONT: fc&=(X<FRONT[i]) if FRONT[i]>0 else (X>-FRONT[i])
    if i==5: fc[:]=False
    al*=1-ndi.gaussian_filter(fc.astype(np.float32),1.2)
    # front views: the hair goes BEHIND her neck and shoulders, so necklines and necklaces stay visible (Sara 25/10 15:38)
    if BEH and i in (1,2,8):
        body=ndi.binary_dilation(fig,iterations=1);body[:nk-2]=False
        al*=1-np.clip(ndi.gaussian_filter(body.astype(np.float32),.9)*1.3,0,1)
    # the new head = per row, from the leftmost to the rightmost of (her face | the hair); inside it every cap pixel becomes hair, outside it backdrop
    face=ndi.binary_fill_holes(skin|dark)&zone
    hh=face|(al>.5);newhead=np.zeros_like(hh)
    for y in range(nk):
        xs=np.where(hh[y])[0]
        if len(xs):newhead[y,xs[0]:xs[-1]+1]=True
    newhead=ndi.binary_closing(newhead,iterations=2)
    show=cap&(al<.9)
    in_sk=show&newhead
    out_bg=ndi.binary_dilation(fig&zone,iterations=3)&~ndi.binary_dilation(newhead,iterations=1)&(al<.9);out_bg[nk-2:]=False
    figm=(ndi.binary_dilation(fig&zone,iterations=5)).astype(np.uint8)*255
    bdrop=cv2.inpaint(np.ascontiguousarray(c),figm,7,cv2.INPAINT_TELEA)
    fill=bdrop.astype(np.float32);fa=np.zeros((H,360),np.float32);fa[out_bg]=1
    ins2=ndi.binary_dilation(in_sk,iterations=2)&~out_bg;fill[ins2]=Wd[iy[ins2],ix[ins2]];fa[in_sk]=1   # the nearest hair colour: hair grows over the gap (ears, temples, hairline)
    fa=np.maximum(ndi.gaussian_filter(fa,.8),fa*.0)*(ndi.binary_dilation(out_bg|in_sk,iterations=1))
    # compose: fill under hair
    A=al+(1-al)*fa
    rgb=(al[...,None]*Wd.astype(np.float32)+(1-al[...,None])*fa[...,None]*fill)/np.maximum(A,1e-4)[...,None]
    A=ndi.gaussian_filter(A,.45)
    o=np.concatenate([np.clip(rgb,0,255),np.clip(A*255,0,255)[...,None]],2).astype(np.uint8);o[o[...,3]==0]=0
    Image.fromarray(o).save(f'{D}/{NM}{i}.png')
    base=Image.fromarray(c).convert('RGBA');base.alpha_composite(Image.fromarray(o));comp=np.asarray(base.convert('RGB'))
    dbg=np.zeros((H,360,3),np.uint8);dbg[cap]=(200,170,140);dbg[skin]=(255,200,200);dbg[al>.5]=(90,60,30);dbg[out_bg]=(0,0,255);dbg[in_sk]=(255,0,0)
    Image.fromarray(np.concatenate([c,comp,dbg],1)[:260]).save(f'{D}/b2_{NM}{i}.png')
    print(i,'cap',cap.sum(),'show',show.sum(),'out',out_bg.sum(),'in',in_sk.sum(),flush=True)
