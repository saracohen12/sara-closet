import numpy as np,glob,os
from PIL import Image,ImageFilter
from scipy import ndimage as ndi
FR=[f'/mnt/project-files/closet/avatar8/cap/frames/{i}.png' for i in range(1,9)]
for i,f in enumerate(FR,1):
    b=np.asarray(Image.open(f).convert('RGB')).astype(float);d=np.asarray(Image.open(f'out/{i}.png').convert('RGB')).astype(float)
    bs=ndi.gaussian_filter(b,(1.2,1.2,0));ds=ndi.gaussian_filter(d,(1.2,1.2,0))
    diff=np.sqrt(((ds-bs)**2).sum(2))
    edge=np.concatenate([d[:,:10],d[:,-10:]],axis=1);bg=np.median(edge,axis=1)
    notbg=np.sqrt(((d-bg[:,None,:])**2).sum(2))>22
    m=(diff>40)&notbg
    H=m.shape[0];far=np.sqrt(((d-bg[:,None,:])**2).sum(2))>48
    m[int(H*.86):]&=far[int(H*.86):]  # floor shadows near the feet are not part of the garment
    m=ndi.binary_opening(m,iterations=2);m=ndi.binary_closing(m,iterations=3)
    lab,n=ndi.label(m)
    if n:
        sz=ndi.sum(m,lab,range(1,n+1));big=np.argmax(sz)+1
        rows=np.where((lab==big).any(1))[0];r0,r1=rows[0],rows[-1]
        keep=[k+1 for k in range(n) if sz[k]>=max(min(400,0.1*sz.max()),40,0.02*sz.max()) and (lambda rr:rr[0]>=r0-5 and rr[-1]<=r1+5)(np.where((lab==k+1).any(1))[0])]
        m=np.isin(lab,keep)  # the arm can split the garment in two (side views): keep every real piece inside the garment's rows
    m=ndi.binary_fill_holes(m)
    # the hem: below the last row that is still at least 35% as wide as the widest row, nothing belongs to the garment (feet, floor)
    w=m.sum(1);wide=np.where(w>=0.35*w.max())[0]
    if len(wide):m[wide[-1]+2:]=False
    a=Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8))
    lay=Image.open(f'out/{i}.png').convert('RGBA');lay.putalpha(a);lay.save(f'out/layer_{i}.png')
    comp=Image.open(f).convert('RGBA');comp.alpha_composite(lay);comp.convert('RGB').save(f'out/comp_{i}.png')
    print(i,'layer px',int(m.sum()))
