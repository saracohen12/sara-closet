import numpy as np, sys
from PIL import Image, ImageFilter
from collections import deque
S='/tmp/claude-0/-home-user/6b76d0a4-42d5-5937-a979-ea023e0fdb25/scratchpad/av95/'
def cut(arr,thr=26):
    H,W,_=arr.shape;a=arr.astype(np.int32)
    # per-row background from left/right 8px strips
    strips=np.concatenate([a[:,:8],a[:,-8:]],1)
    bg=np.median(strips,1)  # H x 3
    d=np.abs(a-bg[:,None,:]).sum(2)
    near=d<thr
    # floor shadow under the shoes: neutral/bluish grey (not skin or nude shoe), bottom 9% of the panel
    R,G,B=a[:,:,0],a[:,:,1],a[:,:,2]
    rows=np.arange(H)[:,None]
    fig=np.where((~near).any(1))[0]; fb=fig[-1] if len(fig) else H
    zone=(rows>fb-0.09*H)&(rows<=H)
    near=near|(zone&((R-B)<12)&(d<110))
    isbg=np.zeros((H,W),bool);q=deque()
    for x in range(W):
        for y in (0,H-1):
            if near[y,x] and not isbg[y,x]: isbg[y,x]=1;q.append((y,x))
    for y in range(H):
        for x in (0,W-1):
            if near[y,x] and not isbg[y,x]: isbg[y,x]=1;q.append((y,x))
    while q:
        y,x=q.popleft()
        for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
            yy,xx=y+dy,x+dx
            if 0<=yy<H and 0<=xx<W and near[yy,xx] and not isbg[yy,xx]:
                isbg[yy,xx]=1;q.append((yy,xx))
    # enclosed background (between the legs / arm and body): near-bg components not touching the border
    from scipy import ndimage
    lab,n=ndimage.label(near&~isbg)
    if n:
        sizes=ndimage.sum(np.ones_like(lab),lab,range(1,n+1))
        for i,sz in enumerate(sizes,1):
            if sz>40: isbg|=(lab==i)
    alpha=np.where(isbg,0,255).astype(np.uint8)
    # soft edge: pixels of the figure next to bg with small diff get partial alpha
    al=Image.fromarray(alpha).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.8))
    al=np.maximum(np.array(al),0)
    edge=(alpha==255)&(np.array(al)<255)
    soft=np.clip((d-thr*0.5)/(thr*1.5),0,1)*255
    out=np.where(edge,np.maximum(np.array(al),soft).astype(np.uint8),alpha)
    rgba=np.dstack([arr,out.astype(np.uint8)])
    return rgba
if __name__=='__main__':
    f1=np.array(Image.open(S+'f1a.png').convert('RGB'));f2=np.array(Image.open(S+'f2b.png').convert('RGB'))
    panels={'front':f1[:,0:512],'side':f1[:,512:1024],'back':f1[:,1024:1536],'half':f2[:,0:627],'hip':f2[:,627:1254]}
    for k,p in panels.items():
        r=cut(p);Image.fromarray(r).save(S+'cut_'+k+'.png')
        a=r[:,:,3]>128;ys=np.where(a.any(1))[0];xs=np.where(a.any(0))[0]
        print(k,p.shape,'y',ys[0],ys[-1],'x',xs[0],xs[-1],'h',ys[-1]-ys[0],'w',xs[-1]-xs[0])
