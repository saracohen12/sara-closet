import numpy as np,glob,os
import sys;HEAD="--head" in sys.argv or "--small" in sys.argv;SMALL="--small" in sys.argv;ROWS=[tuple(map(float,a.split("=")[1].split(":"))) for a in sys.argv if a.startswith("--rows=")];WARM="--warm" in sys.argv  # --small: jewelry – thin, tiny pieces, keep holes (skin inside a necklace loop)  # head items (scarves, hats, wigs): no hem rule, keep only the upper part
from PIL import Image,ImageFilter
from scipy import ndimage as ndi
FR=[f'/home/claude/sara-closet/closet/avatar8/new2/frames/c{i}.png' for i in range(1,9)]
for i,f in enumerate(FR,1):
    b=np.asarray(Image.open(f).convert('RGB')).astype(float);d=np.asarray(Image.open(f'out/{i}.png').convert('RGB')).astype(float)
    sg=0.7 if SMALL else 1.2;bs=ndi.gaussian_filter(b,(sg,sg,0));ds=ndi.gaussian_filter(d,(sg,sg,0))
    diff=np.sqrt(((ds-bs)**2).sum(2))
    edge=np.concatenate([d[:,:10],d[:,-10:]],axis=1);bg=np.median(edge,axis=1)
    notbg=np.sqrt(((d-bg[:,None,:])**2).sum(2))>22
    m=(diff>(30 if SMALL else 40))&notbg
    if SMALL:  # silver / pale stones look like the grey backdrop: on the body trust the difference alone, over the backdrop a smaller one is enough (it is smooth there)
        bbg=np.sqrt(((b-bg[:,None,:])**2).sum(2))<=22
        m=((diff>30)&~bbg)|((diff>16)&bbg)
        if not WARM:m&=~((d[...,0]-d[...,2])>18)  # skin / skin-and-backdrop edge pixels are warm; silver, stones and dark metal are not (gold jewelry would need another rule)
    H=m.shape[0];far=np.sqrt(((d-bg[:,None,:])**2).sum(2))>48
    m[int(H*.86):]&=far[int(H*.86):]  # floor shadows near the feet are not part of the garment
    m=m if SMALL else ndi.binary_opening(m,iterations=2);m=ndi.binary_closing(m,iterations=1 if SMALL else 3)
    m[:,:8]=False;m[:,-8:]=False  # the sheet's white divider lines at the panel edges
    if ROWS:r=np.zeros(H,bool);r[int(H*ROWS[0][0]):int(H*ROWS[0][1])]=True;m&=r[:,None]  # where this kind of item can be (necklace: neck and chest)
    if HEAD:m[int(H*.45):]=False  # before picking pieces, so a big blob lower down can't win
    lab,n=ndi.label(m)
    if n and SMALL:
        # outline slivers (tiny alignment shifts) have a weak difference; a jewel always has a strong spot.
        # keep pieces with a strong spot, plus weak pieces touching them (a pale drop under a dark stud, a thin chain)
        mx=ndi.maximum(diff,lab,range(1,n+1));sz=ndi.sum(m,lab,range(1,n+1))
        strong=np.isin(lab,[k+1 for k in range(n) if mx[k]>32 and sz[k]>=4])
        near=ndi.binary_dilation(strong,iterations=6)
        m=np.isin(lab,[k+1 for k in range(n) if (near&(lab==k+1)).any() and sz[k]>=3])
        if "--one" in sys.argv and m.any():  # one piece (a necklace): only what sits next to the biggest piece
            l2,n2=ndi.label(ndi.binary_dilation(m,iterations=8));big=np.argmax(ndi.sum(m,l2,range(1,n2+1)))+1;m&=(l2==big)
    elif n:
        sz=ndi.sum(m,lab,range(1,n+1));big=np.argmax(sz)+1
        rows=np.where((lab==big).any(1))[0];r0,r1=rows[0],rows[-1]
        keep=[k+1 for k in range(n) if sz[k]>=(6 if SMALL else max(min(400,0.1*sz.max()),40,0.02*sz.max())) and (lambda rr:rr[0]>=r0-5 and rr[-1]<=r1+5)(np.where((lab==k+1).any(1))[0])]
        dbg=np.sqrt(((d-bg[:,None,:])**2).sum(2))
        if HEAD:keep=[k+1 for k in range(n) if sz[k]>=40 and np.median(dbg[lab==k+1])>45 and ndi.binary_erosion(lab==k+1,iterations=3).sum()>=30]  # outline slivers from a 1-2px shift are thin  # pale patches of redrawn backdrop are not the cover  # head cover: the top and the tails are separate pieces at different heights
        m=np.isin(lab,keep)  # the arm can split the garment in two (side views): keep every real piece inside the garment's rows
    if not SMALL:m=ndi.binary_fill_holes(m)
    # the hem: below the last row that is still at least 35% as wide as the widest row, nothing belongs to the garment (feet, floor)
    if HEAD:m[int(H*.45):]=False
    elif 1:
     w=m.sum(1);wide=np.where(w>=0.35*w.max())[0]
     if len(wide):m[wide[-1]+2:]=False
    a=Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8))
    lay=Image.open(f'out/{i}.png').convert('RGBA');lay.putalpha(a);lay.save(f'out/layer_{i}.png')
    comp=Image.open(f).convert('RGBA');comp.alpha_composite(lay);comp.convert('RGB').save(f'out/comp_{i}.png')
    print(i,'layer px',int(m.sum()))
