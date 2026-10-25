import numpy as np,cv2,json,sys
from PIL import Image
N='/home/claude/sara-closet/closet/avatar8/new2'
R=json.load(open(sys.argv[2] if len(sys.argv)>2 else 'reg3.json'))
views=list(map(int,sys.argv[1].split(',')))
def W0(i):
    _,s,dx,dy=R[str(i)][:4];w=np.asarray(Image.open(f'raw{i}.png').convert('RGB'))
    return cv2.warpAffine(w,np.float32([[s,0,dx],[0,s,dy]]),(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
rows=[]
for i in views:
    c=np.asarray(Image.open(f'{N}/frames/c{i}.png').convert('RGB'));W=W0(i)
    bl=(c.astype(int)//2+W.astype(int)//2).astype(np.uint8)
    y0,y1,x0,x1=0,150,95,265
    r=np.concatenate([c[y0:y1,x0:x1],W[y0:y1,x0:x1],bl[y0:y1,x0:x1]],1)
    for k in range(0,r.shape[0],25):r[k,:,:]=(255,0,0)
    rows.append(r)
G=np.concatenate(rows,0);Image.fromarray(G).resize((G.shape[1]*2,G.shape[0]*2),Image.LANCZOS).save(sys.argv[3] if len(sys.argv)>3 else 'zoom.png')
