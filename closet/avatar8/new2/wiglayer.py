# wig layer for the new doll: the wig sheet is a GPT edit of new8 (aligned within 1px).
# head zone: everything that changed (hair, the backdrop where the cover was, forehead); below it only hair-coloured pixels joined to the head
import numpy as np,json
from PIL import Image,ImageFilter
from scipy import ndimage as ndi
W=np.pad(np.asarray(Image.open('wig_sheet.png').convert('RGB')).astype(float),((4,4),(4,4),(0,0)),mode='edge')
offs=json.load(open('offs.json'))
SH=[(0,-1),(0,-1),(0,-1),(0,-1),(0,0),(0,0),(-1,0),(-1,0)]
for i in range(1,9):
    x0,y0=offs[i-1];dx,dy=SH[i-1]
    w=W[4+y0+dy:4+y0+dy+541,4+x0+dx:4+x0+dx+360];n=np.asarray(Image.open(f'../a8page/n{i}.png').convert('RGB')).astype(float)
    Image.fromarray(w.astype('uint8')).save(f'w{i}.png')
    ws=ndi.gaussian_filter(w,(1.2,1.2,0));ns=ndi.gaussian_filter(n,(1.2,1.2,0))
    diff=np.sqrt(((ws-ns)**2).sum(2))
    H=541
    # head zone = rows down to the chin/neck of the cover doll: find the cover's lowest row + a bit (cover = top of figure)
    edge=np.concatenate([n[:,:8],n[:,-8:]],1);bg=np.median(edge,1)
    fig=np.sqrt(((n-bg[:,None])**2).sum(2))>30
    top=np.where(fig.any(1))[0][0]
    hz=top+int(0.17*H)   # head height ~ 1/6 of the figure
    L=ws.mean(2);warm=ws[...,0]-ws[...,2]
    hairlike=(L<135)&(warm>8)
    m=np.zeros((H,360),bool)
    m[:hz]=diff[:hz]>28
    lower=(diff>30)&hairlike;lower[:hz]=False
    m|=lower
    m[int(H*.62):]=False
    m=ndi.binary_opening(m,iterations=1);m=ndi.binary_closing(m,iterations=3)
    lab,k=ndi.label(m)
    if k:
        sz=ndi.sum(m,lab,range(1,k+1));big=np.argmax(sz)+1
        keep=[j+1 for j in range(k) if sz[j]>=200 and (lab==j+1)[:hz+5].any()] or [big]
        m=np.isin(lab,keep)
    m=ndi.binary_fill_holes(m)
    a=Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.9))
    im=Image.fromarray(w.astype('uint8')).convert('RGBA');im.putalpha(a);im.save(f'lw{i}.png')
    base=Image.open(f'../a8page/n{i}.png').convert('RGBA');base.alpha_composite(im);base.convert('RGB').save(f'comp{i}.png')
    print(i,'hz',hz,'px',int(m.sum()))
# contact sheet: n | comp | w  per view
rows=[]
for i in range(1,9):
    rows.append(np.concatenate([np.asarray(Image.open(p).convert('RGB')) for p in (f'../a8page/n{i}.png',f'comp{i}.png',f'w{i}.png')],1))
top=np.concatenate(rows[:4],0);bot=np.concatenate(rows[4:],0)
Image.fromarray(np.concatenate([top,bot],1)).resize((2160//2,2164//2)).save('check.png')
