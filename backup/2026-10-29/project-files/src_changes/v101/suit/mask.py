import sys,numpy as np
from PIL import Image,ImageFilter
from scipy import ndimage as nd
src=sys.argv[1];out=sys.argv[2]
ims=[]
for v in ['front','side','back','half','hip']:
  a=np.asarray(Image.open(f'{src}/p6c_{v}.webp').convert('RGBA'),float)
  rgb=a[...,:3];al=a[...,3];mx=rgb.max(-1);mn=rgb.min(-1);S=(mx-mn)/np.maximum(mx,1)
  S=nd.gaussian_filter(S,1.2)
  m=(S<0.31)&(al>128)
  m=nd.binary_opening(m,iterations=2)
  lab,n=nd.label(m);sz=nd.sum(m,lab,range(1,n+1));k=1+int(np.argmax(sz));m=lab==k
  m=nd.binary_closing(m,iterations=3);m=nd.binary_fill_holes(m)
  m=m&(al>128)
  f=np.asarray(Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8)),float)
  f=np.minimum(f,al)
  Image.fromarray(f.astype('uint8')).save(f'{out}/p6_suit_{v}.png')
  print(v,m.sum(),n)
  vis=rgb.copy();vis[m]=vis[m]*0.3+np.array([60,120,255])*0.7
  ims.append(Image.fromarray(vis.astype('uint8')))
W=399*5;o=Image.new('RGB',(W,1365));
for i,im in enumerate(ims):o.paste(im,(399*i,0))
o.resize((W//2,682)).save(f'{out}/mask_vis.png')
