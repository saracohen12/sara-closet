# see-through lace (Sara 25/10 20:53 "צריך גופיה בסיס"): split a lace garment layer into
#   x<k>  = the garment, lace made semi-transparent (skin unmixed out of every lace pixel)
#   x<k>u = what shows through the lace (the arm as GPT drew it, smoothed); the site draws it as skin, or tinted as a base shirt
# lace zone = closed+filled area of the lighter grey-green lace threads; holes = skin-coloured pixels inside it (hands touch only dark velvet, so they stay out)
# usage: cd <item>; python3 ../lace.py <key> [--maxy=0.66]   (reads work/d<i>.png after hemclean, writes fin/x<key><i>.png + fin/x<key>u<i>.png)
import numpy as np,sys,os,subprocess
from PIL import Image
from scipy import ndimage as ndi
K=sys.argv[1];os.makedirs('fin',exist_ok=True)
MAXY=float(next((a[7:] for a in sys.argv if a.startswith('--maxy=')),'1'))  # lace only above this height (a lace hem over the legs stays as drawn)
FR='/home/claude/sara-closet/closet/avatar8/new2/frames/';RIM='/home/claude/sara-closet/closet/avatar8/cap/rimclean.py'
def disk(r):y,x=np.ogrid[-r:r+1,-r:r+1];return x*x+y*y<=r*r
def nconv(val,m,s):w=ndi.gaussian_filter(m.astype(float),s);return np.stack([ndi.gaussian_filter(val[...,c]*m,s) for c in range(3)],-1)/np.maximum(w,1e-6)[...,None],w
lum=lambda c:.299*c[...,0]+.587*c[...,1]+.114*c[...,2]
refs=[]
for i in range(1,9):
    a=np.asarray(Image.open(f'work/d{i}.png').convert('RGBA')).astype(float);rgb=a[...,:3];al=a[...,3]
    Rr,G,B=rgb[...,0],rgb[...,1],rgb[...,2];L=rgb.mean(2)
    skin=(al>60)&(Rr-B>12)&(Rr>=G)&(L>50)
    thread=(al>60)&~skin&(L>45)&(L<140)&(G>=Rr-4)
    thread=ndi.binary_opening(thread,iterations=1)|thread&ndi.binary_dilation(skin,iterations=2)
    R=4;zone=ndi.binary_closing(np.pad(thread,R+2),structure=disk(R))[R+2:-R-2,R+2:-R-2]
    zone=ndi.binary_fill_holes(zone);lab,n=ndi.label(zone);sz=ndi.sum(zone,lab,range(1,n+1));zone=np.isin(lab,1+np.where(sz>300)[0])
    ys=np.where(al.max(1)>0)[0];zone[:ys[0]+14]=False;zone[int(al.shape[0]*MAXY):]=False
    hole=skin&zone
    Z=zone&ndi.binary_dilation(hole,iterations=2)&(al>0)
    # local colours: the arm behind the lace, and the lace thread
    pure=hole&ndi.binary_erosion(skin,iterations=1)
    S,ws=nconv(rgb,pure if pure.sum()>50 else hole,3);Sg=rgb[hole].mean(0);S=np.where(ws[...,None]>.02,S,Sg)
    dk=zone&~skin&(al>200);T,wt=nconv(rgb,dk,3);T=np.where(wt[...,None]>.02,T,rgb[dk].mean(0))
    d=S-T;f=((rgb-T)*d).sum(-1)/np.maximum((d*d).sum(-1),1);f=np.clip(f,0,1)*Z
    f[hole&ndi.binary_erosion(hole,iterations=1)]=1.0
    # garment: rim clean first (outside the lace), then the lace gets its skin taken out
    Image.fromarray(a.astype(np.uint8)).save(f'fin/_t{i}.png')
    subprocess.run(['python3',RIM,f'fin/_t{i}.png',f'{FR}c{i}.png',f'fin/_r{i}.png'],check=True,capture_output=True)
    r=np.asarray(Image.open(f'fin/_r{i}.png').convert('RGBA')).astype(float)
    keep=ndi.binary_dilation(zone,iterations=2);r[keep]=a[keep]
    fa=f[...,None];un=np.where(fa<.98,(rgb-fa*S)/np.maximum(1-fa,.02),T);un=np.clip(un,0,255)
    o=r.copy();o[...,:3]=np.where(Z[...,None],un,r[...,:3]);o[...,3]=np.where(Z,al*(1-f),r[...,3])
    o[o[...,3]<1]=0
    Image.fromarray(o.astype(np.uint8)).save(f'fin/x{K}{i}.png')
    # under the lace: the arm, over the whole lace zone (a bit wider so no edge gap)
    U=np.zeros((*al.shape,4));uz=ndi.binary_dilation(Z,iterations=1)&(al>0)
    U[...,:3]=np.where(uz[...,None],S,0);U[...,3]=uz*255
    Image.fromarray(U.astype(np.uint8)).save(f'fin/x{K}u{i}.png')
    refs.append(float(lum(S[hole]).mean()))
    for t in ('_t','_r'):os.remove(f'fin/{t}{i}.png')
    print(i,'lace px',int(Z.sum()),'holes',int(hole.sum()),'skin lum',round(refs[-1],1))
print('REF',round(float(np.mean(refs)),1))
