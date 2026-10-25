# turntable: every view gets the same feet line, height and body axis, so the doll doesn't jump when she turns (Sara 19:40 "לא מסתובב טוב")
import numpy as np,cv2,json,glob,os
from PIL import Image
from scipy import ndimage as ndi
N='/home/claude/sara-closet/closet/avatar8/new2/frames/';D=os.path.dirname(os.path.abspath(__file__))
HT,BOT,CX=515,528,180
T={}
for i in range(1,9):
    a=np.asarray(Image.open(f'{N}c{i}.png').convert('RGB')).copy()
    # the sheet's white divider lines at the panel edges: replace with the backdrop next to them
    L=a.mean(2);sat=a.max(2).astype(int)-a.min(2)
    for x in list(range(0,8)):
        w=(L[:,x]>215)&(sat[:,x]<30);a[w,x]=a[w,8]
    for x in list(range(352,360)):
        w=(L[:,x]>215)&(sat[:,x]<30);a[w,x]=a[w,351]
    ai=a.astype(int);m=(ai[...,0]-ai[...,2])>0;m=ndi.binary_opening(m,iterations=2);lab,k=ndi.label(m);sz=ndi.sum(m,lab,range(1,k+1));m=ndi.binary_fill_holes(lab==(np.argmax(sz)+1))
    ys=np.where(m.any(1))[0];top,bot=ys[0],ys[-1];H=bot-top
    def cx(r):xs=np.where(m[r])[0];return (xs[0]+xs[-1])/2
    c=(cx(int(top+.5*H))+cx(int(top+.75*H)))/2
    s=HT/H;M=np.float32([[s,0,CX-s*c],[0,s,BOT-s*bot]]);T[i]=M.tolist()
    o=cv2.warpAffine(a,M,(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
    # pale strips left by the dividers at the frame edges: a pixel brighter than the backdrop just inside it takes that backdrop
    oi=o.astype(int);L2=oi.mean(2);sat2=oi.max(2)-oi.min(2)
    for x in range(0,12):
        w=(L2[:,x]>L2[:,12]+5)&(sat2[:,x]<60);o[w,x]=o[w,12]
    for x in range(348,360):
        w=(L2[:,x]>L2[:,347]+5)&(sat2[:,x]<60);o[w,x]=o[w,347]
    Image.fromarray(o).save(f'{D}/p360pub/n{i}.png',optimize=True)
    for f in glob.glob(f'{D}/src_old/*{i}.png'):
        l=np.asarray(Image.open(f).convert('RGBA'))
        # premultiply so the warp does not bleed hidden colours into the edges
        al=l[...,3:].astype(np.float32)/255;pm=np.concatenate([l[...,:3]*al,al*255],2).astype(np.float32)
        w=cv2.warpAffine(pm,M,(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT,borderValue=0)
        A=w[...,3:]/255;rgb=np.where(A>0,w[...,:3]/np.maximum(A,1e-4),0)
        out=np.concatenate([np.clip(rgb,0,255),np.clip(w[...,3:],0,255)],2).astype(np.uint8);out[out[...,3]==0]=0
        Image.fromarray(out).save(f'{D}/p360pub/'+os.path.basename(f),optimize=True)
    print(i,'s',round(s,3),'dx',round(CX-s*c,1),'dy',round(BOT-s*bot,1))
json.dump(T,open(f'{D}/turn.json','w'))
