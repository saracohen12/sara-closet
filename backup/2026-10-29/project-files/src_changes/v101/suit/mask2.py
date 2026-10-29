import sys,numpy as np
from PIL import Image,ImageFilter
from scipy import ndimage as nd
from skimage.segmentation import watershed
from skimage.filters import sobel
from skimage.color import rgb2lab
src=sys.argv[1];out=sys.argv[2];pre=sys.argv[3] if len(sys.argv)>3 else 'p6c'
ims=[]
for v in ['front','side','back','half','hip']:
  a=np.asarray(Image.open(f'{src}/{pre}_{v}.webp').convert('RGBA'),float)
  rgb=a[...,:3];al=a[...,3];mx=rgb.max(-1);mn=rgb.min(-1);S=nd.gaussian_filter((mx-mn)/np.maximum(mx,1),1.0)
  low=(S<0.29)&(al>128);low=nd.binary_opening(low,iterations=2)
  lab,n=nd.label(low);sz=np.array(nd.sum(low,lab,range(1,n+1)));big=[i+1 for i in range(n) if sz[i]>sz.max()*.05]
  ys=nd.center_of_mass(low,lab,big);H0=np.where(al.max(1)>128)[0];top,bot=H0[0],H0[-1];big=[b for b,(cy,cx) in zip(big,ys) if top+(bot-top)*.13<cy<top+(bot-top)*.8]
  keep=np.isin(lab,big)
  mk=np.zeros(al.shape,int)
  mk[nd.binary_erosion(keep,iterations=2)]=1
  mk[(lab>0)&~keep]=4
  mk[(S>0.37)&(al>128)]=2
  mk[al<60]=3
  L=rgb2lab(rgb/255.0);g=sobel(L[...,0])+0.6*(sobel(L[...,1])+sobel(L[...,2]))
  w=watershed(g,mk)
  m=(w==1)&(al>100);m=nd.binary_fill_holes(nd.binary_closing(nd.binary_opening(m,iterations=1),iterations=3))&(al>100)
  lab2,n2=nd.label(m);sz2=np.array(nd.sum(m,lab2,range(1,n2+1)));m=np.isin(lab2,[i+1 for i in range(n2) if sz2[i]>sz2.max()*.05])
  f=np.asarray(Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.7)),float);f=np.minimum(f,al)
  Image.fromarray(f.astype('uint8')).save(f'{out}/{pre}_suit_{v}.png')
  vis=rgb.copy();vis[m]=vis[m]*0.3+np.array([60,120,255])*0.7
  bgw=np.ones_like(vis)*255;al3=(al/255)[...,None];ims.append(Image.fromarray((vis*al3+bgw*(1-al3)).astype('uint8')))
W=399*5;o=Image.new('RGB',(W,1365))
for i,im in enumerate(ims):o.paste(im,(399*i,0))
o.resize((W//2,682)).save(f'{out}/{pre}_mask_vis.png')
