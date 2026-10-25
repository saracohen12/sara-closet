import numpy as np,json,sys,os
from PIL import Image
N='/home/claude/sara-closet/closet/avatar8/new2'
offs=json.load(open(N+'/offs.json'))
SH=[(-2,2),(-3,0),(-6,-2),(0,-1),(-5,1),(-4,0),(6,0),(2,2)]
for n in sys.argv[1:]:
    A=np.pad(np.asarray(Image.open(n+'.png').convert('RGB')),((4,4),(8,8),(0,0)),mode='edge')
    os.makedirs(f'{n}/out',exist_ok=True)
    for i,(x0,y0) in enumerate(offs):
        dx,dy=SH[i]
        Image.fromarray(A[4+y0+dy:4+y0+dy+541,8+x0+dx:8+x0+dx+360]).save(f'{n}/out/{i+1}.png')
