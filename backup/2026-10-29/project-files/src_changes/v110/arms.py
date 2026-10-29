import sys,numpy as np
from PIL import Image,ImageFilter
from scipy import ndimage as nd
me=sys.argv[1];out=sys.argv[2]
for p in ['p6c','p6w']:
 for v in ['front','side','back','half','hip']:
  im=Image.open(f'{me}/{p}_{v}.webp').convert('RGBA');a=np.array(im)
  al=a[:,:,3]>100;su=np.array(Image.open(f'{me}/{p}_suit_{v}.png'))>110
  rows=np.where(al.any(1))[0];top,bot=rows[0],rows[-1];H=bot-top
  sr=np.where(su.any(1))[0];s0,s1=sr[0],sr[-1]
  su_d=nd.binary_dilation(su,iterations=3)  # keep away from the bodysuit edge (no beige slivers)
  m=al&~su_d
  m[:int(s0+0.09*H)]=False;m[s1-5:]=False
  m=nd.binary_opening(m,iterations=2)
  lab,n=nd.label(m);sz=nd.sum(m,lab,range(1,n+1))
  sl=nd.find_objects(lab)
  keep=np.isin(lab,[i+1 for i,s in enumerate(sz) if s>=600 and sl[i][0].stop-sl[i][0].start>=120])
  am=Image.fromarray((keep*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8))
  o=a.copy();o[:,:,3]=np.minimum(a[:,:,3],np.array(am))
  Image.fromarray(o).save(f'{out}/{p}_arms_{v}.webp',quality=90)
  print(p,v,n,sorted(sz.astype(int))[-4:],keep.sum())
