import numpy as np,cv2,json,sys
from PIL import Image
N='/home/claude/sara-closet/closet/avatar8/new2'
R=json.load(open('reg3.json'))
def W0(i):
    _,s,dx,dy=R[str(i)];w=np.asarray(Image.open(f'raw{i}.png').convert('RGB'))
    return cv2.warpAffine(w,np.float32([[s,0,dx],[0,s,dy]]),(360,541),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
rows=[]
for i in range(1,9):
    c=np.asarray(Image.open(f'{N}/frames/c{i}.png').convert('RGB'));W=W0(i)
    bl=(c.astype(int)//2+W.astype(int)//2).astype(np.uint8)
    rows.append(np.concatenate([c[:300],W[:300],bl[:300]],1))
G=np.concatenate([np.concatenate(rows[:4],0),np.concatenate(rows[4:],0)],1)
Image.fromarray(G).resize((G.shape[1]//2,G.shape[0]//2)).save('look.png')
