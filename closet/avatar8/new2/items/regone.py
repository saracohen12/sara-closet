# align one cropped panel to the base frame by the figure outline (upper body), for sheets GPT redrew a little off
import sys,numpy as np,cv2
from PIL import Image
from scipy import ndimage as ndi
f,i=sys.argv[1],int(sys.argv[2])
def fig(a):
    a=a.astype(int);m=(a[...,0]-a[...,2])>0;m=ndi.binary_opening(m,iterations=2);lab,k=ndi.label(m);sz=ndi.sum(m,lab,range(1,k+1));return ndi.binary_fill_holes(lab==(np.argmax(sz)+1))
o=np.asarray(Image.open(f).convert('RGB'));c=np.asarray(Image.open(f'/home/claude/sara-closet/closet/avatar8/new2/frames/c{i}.png').convert('RGB'))
mo=fig(o).astype(np.uint8);mc=fig(c);r0,r1=int(.12*541),int(.55*541)
best=None
for s in np.arange(.95,1.051,.01):
    for dy in range(-16,17):
        for dx in range(-16,17):
            M=np.float32([[s,0,180-s*180+dx],[0,s,270-s*270+dy]])
            w=cv2.warpAffine(mo,M,(360,541),flags=cv2.INTER_NEAREST)>0
            a=w[r0:r1];b=mc[r0:r1];iou=(a&b).sum()/(a|b).sum()
            if best is None or iou>best[0]:best=(iou,s,dx,dy,M)
print(f,best[:4])
w=cv2.warpAffine(o,best[4],(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
Image.fromarray(w).save(f)
