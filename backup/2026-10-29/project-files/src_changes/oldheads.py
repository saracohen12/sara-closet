# v67: old bases (long=avatar.webp, short=avatar2.webp): head overlay = head + hair + neck only (no shoulders / arms); plus neck-only overlays for p5 bases
from PIL import Image
import numpy as np
from scipy import ndimage
def hair_mask(rgb,a,nk,x0,x1):
  L=rgb@np.array([.299,.587,.114]);dark=(L<122)&(a>0);dark[:, :x0]=False;dark[:, x1:]=False
  lab,n=ndimage.label(dark);keep=np.zeros_like(dark)
  band=np.zeros_like(dark);band[max(0,nk-200):nk+10,:]=True
  ids=np.unique(lab[dark&band]);ids=ids[ids>0]
  for i in ids:keep|=(lab==i)
  op=ndimage.binary_opening(keep,iterations=4);keep&=ndimage.binary_dilation(op,iterations=5)
  return keep
def old_head(src,dst,chin,neck_bottom,cx=200,hw=38):
  im=np.array(Image.open(src).convert('RGBA')).astype(float);rgb=im[:,:,:3];a=im[:,:,3];H,W=a.shape
  m=np.zeros((H,W),bool);m[:chin-10,:]=True
  yy,xx=np.mgrid[0:H,0:W];neck=(yy>=chin-10)&(yy<neck_bottom)&(np.abs(xx-cx)<hw);m|=neck
  m|=hair_mask(rgb,a,chin,0,W)
  out=np.zeros((H,W),float);out[m]=a[m]
  # soft bottom of the neck (hair pixels keep full alpha)
  L=rgb@np.array([.299,.587,.114])
  for i,f in enumerate(np.linspace(1,0,16)):
    y=neck_bottom-16+i
    if 0<=y<H:
      row=out[y];soft=(L[y]>=122);row[soft]=row[soft]*f
  # below the neck only hair (dark) survives – no skin patches from the shoulders
  below=(yy>=neck_bottom)&(L>=122);out[below]=0
  out=out[:450];rgb=rgb[:450]
  Image.fromarray(np.dstack([rgb,out]).astype(np.uint8),'RGBA').save(dst,quality=92,method=6);return int((out>0).sum())
def neck_only(src,dst,top,bottom,cx=200,hw=34):
  im=np.array(Image.open(src).convert('RGBA')).astype(float);rgb=im[:,:,:3];a=im[:,:,3];H,W=a.shape
  yy,xx=np.mgrid[0:H,0:W];m=(yy>=top)&(yy<bottom)&(np.abs(xx-cx)<hw)
  out=np.zeros((H,W),float);out[m]=a[m]
  for i,f in enumerate(np.linspace(0,1,8)):
    y=top+i
    if y<H:out[y]*=f
  for i,f in enumerate(np.linspace(1,0,14)):
    y=bottom-14+i
    if y<H:out[y]*=f
  # soften the sides
  side=np.clip((hw-np.abs(xx-cx))/6,0,1);out*=side
  Image.fromarray(np.dstack([rgb,out]).astype(np.uint8),'RGBA').save(dst,quality=92,method=6);return int((out>0).sum())
print('long',old_head('me/avatar.webp','me/avatar_head.webp',212,262))
print('short',old_head('me/avatar2.webp','me/avatar2_head.webp',218,268))
print('p5 neck',neck_only('me/p5_front.webp','me/p5_front_neck.webp',250,308))
print('p5c neck',neck_only('me/p5c_front.webp','me/p5c_front_neck.webp',250,308))
