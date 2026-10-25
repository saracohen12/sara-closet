# v51: head overlays for the pose views (side/half/hip) — head+neck (and hair, when uncovered) only; the base's beige T-shirt is stripped so the garment stays on top of the shoulders
from PIL import Image
import numpy as np
from scipy import ndimage
NK={'side':262,'half':262,'hip':437,'front':262,'back':262}
SHIRT=np.array([230,200,180],float)
def hair_mask(rgb,a,nk,x0,x1):
  L=rgb@np.array([.299,.587,.114]);dark=(L<122)&(a>0);dark[:, :x0]=False;dark[:, x1:]=False
  lab,n=ndimage.label(dark);keep=np.zeros_like(dark)
  band=np.zeros_like(dark);band[max(0,nk-200):nk+10,:]=True
  ids=np.unique(lab[dark&band]);ids=ids[ids>0]
  for i in ids:keep|=(lab==i)
  op=ndimage.binary_opening(keep,iterations=4);op2=ndimage.binary_opening(keep,iterations=8);op[nk+120:,:]=op2[nk+120:,:];keep&=ndimage.binary_dilation(op,iterations=5)
  return keep
def strip_shirt(rgb,a,nk,ymax):
  d=np.linalg.norm(rgb-SHIRT,axis=2);L=rgb@np.array([.299,.587,.114]);rg=rgb[:,:,0]-rgb[:,:,1]
  sat=rgb.max(2)-rgb.min(2);sh=((d<30)&(rg<45)&(L>150))|((L>205)&(sat<40));sh[:nk-30,:]=False;sh[ymax:,:]=False
  sh=ndimage.binary_opening(sh,iterations=1);sh=ndimage.binary_dilation(sh,iterations=3);sh[:nk-10,:]=False
  a=a.copy();a[sh]=0;return a
def make(pre,v,hair,suf='head'):
  im=np.array(Image.open(f'me/{pre}_{v}.webp').convert('RGBA')).astype(float);rgb=im[:,:,:3];a=im[:,:,3]
  nk=NK[v];H,W=a.shape;ys,xs=np.where(a>0)
  m=np.zeros((H,W),bool);m[:nk-10,:]=True
  if hair:
    hx=xs[ys<nk];m|=hair_mask(rgb,a,nk,max(0,hx.min()-15),min(W,hx.max()+15))
  out=np.zeros((H,W),float);out[m]=a[m]
  out=strip_shirt(rgb,out,nk,H if hair else nk+60)
  # soft bottom edge for the non-hair part of the band
  fade=np.linspace(1,0,14)
  for i,f in enumerate(fade):
    y=nk-24+i
    if y<H:
      row=out[y];L=rgb[y]@np.array([.299,.587,.114]);soft=(L>=122)|(not hair)
      row[soft]=row[soft]*f
  res=np.dstack([rgb,out]).astype(np.uint8);Image.fromarray(res,'RGBA').save(f'me/{pre}_{v}_{suf}.webp',quality=92,method=6)
  return int((out>0).sum())
import sys
jobs=[('p5','side',True,'head'),('p5c','side',False,'head'),('p5','half',True,'head'),('p5c','half',False,'head'),('p5','hip',True,'head'),('p5c','hip',False,'head'),
      ('p5','front',True,'head'),('p5','back',True,'head'),('p5c','front',False,'headonly'),('p5c','back',False,'headonly')]
for pre,v,hair,suf in jobs:print(pre,v,suf,make(pre,v,hair,suf))
