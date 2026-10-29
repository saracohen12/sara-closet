import numpy as np
from PIL import Image,ImageFilter
from scipy import ndimage as nd
src='src/work/me';ims=[]
for v in ['front','side','back','half','hip']:
  c=np.asarray(Image.open(f'{src}/p6c_{v}.webp').convert('RGBA'),float);w=np.asarray(Image.open(f'{src}/p6w_{v}.webp').convert('RGBA'),float)
  mc=np.asarray(Image.open(f'suit/p6c_suit_{v}.png'),float)>128;mw=np.asarray(Image.open(f'suit/ws/p6w_suit_{v}.png'),float)>128
  Lc=c[...,:3].mean(-1);Lw=w[...,:3].mean(-1)
  hair=(Lc-Lw>45)&(c[...,3]>200)&(w[...,3]>200)
  if v=='half':hair=(Lw<150)&(w[...,3]>200)&~nd.binary_erosion(mw,iterations=6)
  hair=nd.binary_dilation(nd.binary_opening(hair,iterations=1),iterations=1)
  m=((mc if v!='half' else mw)|mw)&~hair&(w[...,3]>100)
  m=nd.binary_fill_holes(nd.binary_closing(m,iterations=2))&~hair&(w[...,3]>100)
  if v!='half':m&=nd.binary_erosion(c[...,3]>128,iterations=1)
  lab,n=nd.label(m);sz=np.array(nd.sum(m,lab,range(1,n+1)));m=np.isin(lab,[i+1 for i in range(n) if sz[i]>sz.max()*.05])
  f=np.asarray(Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.7)),float);f=np.minimum(f,w[...,3])
  Image.fromarray(f.astype('uint8')).save(f'suit/p6w_suit_{v}.png')
  rgb=w[...,:3];al=w[...,3];vis=rgb.copy();vis[m]=vis[m]*0.3+np.array([60,120,255])*0.7
  al3=(al/255)[...,None];ims.append(Image.fromarray((vis*al3+255*(1-al3)).astype('uint8')))
o=Image.new('RGB',(399*5,1365))
for i,im in enumerate(ims):o.paste(im,(399*i,0))
o.resize((997,682)).save('suit/p6w_mask_vis.png')
