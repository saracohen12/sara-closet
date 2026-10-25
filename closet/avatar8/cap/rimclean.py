# rim colour clean-up for a layer: near the layer's edge, a pixel that looks more like the doll underneath
# (beige dress / skin / its brown shadow) than like the item right next to it gets the item's colour and less alpha.
# usage: rimclean.py layer.png base.png out.png [rim_px=4] [--all=T]
import sys,numpy as np
from PIL import Image
from scipy import ndimage as ndi
args=[x for x in sys.argv[1:] if not x.startswith('--')];ALL=[float(x[6:]) for x in sys.argv[1:] if x.startswith('--all=')];CH=[float(x[9:]) for x in sys.argv[1:] if x.startswith('--chroma=')]
L,B,O=args[:3];R=int(args[3]) if len(args)>3 else 4
lay=np.asarray(Image.open(L).convert('RGBA')).astype(float)
base=np.asarray(Image.open(B).convert('RGB').resize(lay.shape[1::-1])).astype(float)
a=lay[...,3]/255;rgb=lay[...,:3]
if ALL:                                # --all=T: anywhere in the layer, a pixel this close to the doll is the doll (beige dress left under loose hair)
    same=np.sqrt(((rgb-base)**2).sum(2))<ALL[0]
    same=ndi.binary_opening(same,iterations=1)
    a=np.where(same,0,a)
if CH:                                 # --chroma=T: same hue as the doll, even in shadow (beige dress in the hair's shadow), and not dark like hair
    ch=lambda c:c/np.maximum(c.sum(2,keepdims=True),1)
    same=(np.sqrt(((ch(rgb)-ch(base))**2).sum(2))<CH[0])&(rgb.sum(2)>270)
    same=ndi.binary_opening(same,iterations=1)
    print('chroma drop',int((same&(a>0)).sum()))
    a=np.where(same,0,a)
if ALL or CH:                          # holes these rules make inside the item are refilled with the colour around them
    hole=ndi.binary_fill_holes(a>0.5)&(a<=0.5)
    _,(hy,hx)=ndi.distance_transform_edt(hole|(a<=0.5),return_indices=True)
    rgb[hole]=rgb[hy,hx][hole];a=np.where(hole,1.0,a)
solid=a>0.6
inner=ndi.binary_erosion(solid,iterations=R)
if inner.sum()<50:inner=ndi.binary_erosion(solid,iterations=1)
_,(iy,ix)=ndi.distance_transform_edt(~inner,return_indices=True)
near=rgb[iy,ix]
rim=(a>0)&~inner
d_base=np.sqrt(((rgb-base)**2).sum(2))
d_item=np.sqrt(((rgb-near)**2).sum(2))
warm=lambda c:(c[...,0]-c[...,2])
bad=rim&((d_base+6<d_item)|((warm(rgb)>22)&(warm(near)<8)))
rgb[bad]=near[bad]                     # take the item's own colour next to it (no beige/orange tint)
a2=np.where(bad,a*0.45,a)              # and keep it thin, so the edge stays soft instead of jagged
lay[...,:3]=rgb;lay[...,3]=np.clip(a2*255,0,255)
Image.fromarray(lay.astype(np.uint8)).save(O)
print(L,'dropped',int(bad.sum()))
