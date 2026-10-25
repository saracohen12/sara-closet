# v182: garment layers carried bits of the blue photo backdrop (e.g. inside the loop of the hand on the hip).
# On the original backdrop they were invisible; on a new background they show. Where the doll itself is backdrop
# (cutout c<v> transparent) and the layer pixel is the backdrop colour of n<v> at that spot, the pixel goes.
import sys,glob,os,shutil,re,numpy as np
from PIL import Image
from scipy import ndimage as ndi
A8='/home/claude/sara-closet/work/a8';BK='/home/claude/sara-closet/closet/avatar8/new2/items/before_v182'
for f in sorted(glob.glob(A8+'/x*.webp')+glob.glob(A8+'/w*.webp')):
    v=int(re.search(r'(\d)\.webp$',f).group(1))
    L=np.asarray(Image.open(f).convert('RGBA')).astype(float)
    n=np.asarray(Image.open(f'{A8}/n{v}.webp').convert('RGB')).astype(float)
    c=np.asarray(Image.open(f'{A8}/c{v}.webp'))[...,3]
    bgarea=c<20;al=L[...,3]>0
    d=np.sqrt(((L[...,:3]-n)**2).sum(-1))
    rm=bgarea&al&(d<34)
    if rm.sum()<15:continue
    if not os.path.exists(BK+'/'+os.path.basename(f)):shutil.copy(f,BK+'/'+os.path.basename(f))
    a=L[...,3].copy();a[rm]=0
    soft=bgarea&al&~rm&(d<64);a[soft]*=np.clip((d[soft]-34)/30,0,1)
    ring=ndi.binary_dilation(rm,iterations=1)&~rm&bgarea&(a>0);a[ring]*=.55
    L[...,3]=a
    Image.fromarray(np.clip(L,0,255).astype(np.uint8)).save(f,'WEBP',quality=90,method=6)
    print(os.path.basename(f),int(rm.sum()))
