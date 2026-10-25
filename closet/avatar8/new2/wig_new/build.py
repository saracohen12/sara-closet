import numpy as np,cv2,json
from PIL import Image,ImageFilter
from scipy import ndimage as ndi
N='/home/claude/sara-closet/closet/avatar8/new2'
reg=json.load(open('reg.json'))
NECK={1:86,2:94,3:96,4:92,5:69,6:81,7:83,8:81}
ADJ=json.load(open('adj.json')) if __import__('os').path.exists('adj.json') else {}
rows=[]
for i in range(1,9):
    _,flip,s,dx,dy=reg[str(i)]
    a=ADJ.get(str(i),[0,0,0]); dx+=a[0];dy+=a[1];s+=a[2]
    w=np.asarray(Image.open(f'raw{i}.png').convert('RGB'))
    mw=np.load(f'm_w{i}.npy')
    if flip: w=w[:,::-1].copy(); mw=mw[:,::-1].copy()
    M=np.float32([[s,0,dx],[0,s,dy]])
    wW=cv2.warpAffine(w,M,(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
    mW=cv2.warpAffine(mw.astype(np.uint8)*255,M,(360,541),flags=cv2.INTER_LINEAR)>127
    c=np.asarray(Image.open(f'{N}/frames/c{i}.png').convert('RGB'))
    mc=np.load(f'm_c{i}.npy')
    H=541; nk=NECK[i]
    L=wW.astype(float).mean(2); hairW=mW&(L<128)
    cut=nk+10
    head=mW.copy(); head[cut:]=False
    lab,k=ndi.label(hairW|head)
    keep=np.unique(lab[head]); keep=keep[keep>0]
    hang=np.isin(lab,keep)&hairW; hang[int(H*.62):]=False
    lay=head|hang
    lay=ndi.binary_closing(lay,iterations=2); lay=ndi.binary_fill_holes(lay)
    # backdrop where the cover's head shows outside the new head
    ch=ndi.binary_dilation(mc,iterations=3); ch[nk-2:]=False
    back=ch&~lay
    back=ndi.binary_dilation(back,iterations=2)&~lay
    hole=ndi.binary_dilation(ch,iterations=4).astype(np.uint8)*255
    bgimg=cv2.inpaint(np.ascontiguousarray(c),hole,9,cv2.INPAINT_TELEA)
    # soft matte at the hair edge: distance from the wig's own backdrop
    we=np.concatenate([wW[:,:8],wW[:,-8:]],1).astype(float);wbg=np.median(we,1)
    d=np.sqrt(((wW.astype(float)-wbg[:,None,:])**2).sum(2))
    soft=np.clip((d-10)/40,0,1)
    core=ndi.binary_erosion(lay,iterations=2); band=ndi.binary_dilation(lay,iterations=3)&~core
    al=np.zeros((H,360)); al[core]=1; al[band]=soft[band]
    for r in range(cut-8,cut):
        f=(cut-r)/9; row=lay[r]&~hang[r]; al[r][row]=np.minimum(al[r][row],f)
    # below the neck only hair belongs to the wig: matte by darkness, so the beige dress around the ends drops out
    Lw=wW.astype(float).mean(2); hm=np.clip((170-Lw)/55,0,1)
    low=np.zeros((H,360),bool); low[cut:]=True
    al[low]=np.minimum(al[low],hm[low])
    al=ndi.gaussian_filter(al,0.6)
    backA=ndi.gaussian_filter(back.astype(float),0.8)
    a1=al[...,None];b1=backA[...,None]
    pre=a1*wW.astype(float)+(1-a1)*b1*bgimg.astype(float)
    A=al+(1-al)*backA
    rgb=pre/np.maximum(A,1e-3)[...,None]
    im=Image.fromarray(np.clip(rgb,0,255).astype('uint8')).convert('RGBA'); im.putalpha(Image.fromarray((A*255).astype('uint8')))
    im.save(f'lw{i}.png')
    base=Image.fromarray(c).convert('RGBA'); base.alpha_composite(im); comp=np.asarray(base.convert('RGB'))
    Image.fromarray(comp).save(f'comp{i}.png')
    rows.append(np.concatenate([c,comp,wW],1))
Image.fromarray(np.concatenate([np.concatenate(rows[:4],0),np.concatenate(rows[4:],0)],1)).save('check_full.png')
# head close-ups
cl=[np.concatenate([np.asarray(Image.open(f'{N}/frames/c{i}.png').convert('RGB'))[:260],np.asarray(Image.open(f'comp{i}.png'))[:260]],1) for i in range(1,9)]
Image.fromarray(np.concatenate([np.concatenate(cl[:4],1),np.concatenate(cl[4:],1)],0)).save('heads.png')
