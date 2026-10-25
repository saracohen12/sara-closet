# for items with no warm colours (silver/blue belt, stones): drop beige dress / skin / its shadow pixels that came along at the rim
import sys,numpy as np
from PIL import Image
from scipy import ndimage as ndi
for f in sys.argv[1:]:
    a=np.asarray(Image.open(f).convert('RGBA')).astype(float)
    warm=(a[...,0]-a[...,2])>20
    al=a[...,3]*(~warm);al=ndi.gaussian_filter(al,0.5)*(al>0)
    a[...,3]=al;Image.fromarray(a.astype(np.uint8)).save(f)
