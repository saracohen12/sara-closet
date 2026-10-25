import numpy as np,sys
from PIL import Image,ImageDraw
sys.path.insert(0,'/tmp/claude-0/-home-claude-sara-closet/71748e5c-3b71-573a-97eb-d7d6fafc81be/scratchpad/wigfix')
from gridcrop import grid
N='/home/claude/sara-closet/closet/avatar8/new2'
FLIP={1:0,2:1,3:1,4:1,5:0,6:1,7:1,8:1}
views=list(map(int,sys.argv[2].split(',')));box=tuple(map(int,sys.argv[3].split(','))) if len(sys.argv)>3 else (110,0,250,130)
ims=[]
for i in views:
    c=Image.open(f'{N}/frames/c{i}.png').convert('RGB')
    w=np.asarray(Image.open(f'raw{i}.png').convert('RGB'))
    if FLIP[i]: w=w[:,::-1].copy()
    ims+=[grid(c,box,4),grid(Image.fromarray(w),box,4)]
w,h=ims[0].size;G=Image.new('RGB',(w*2+10,(h+10)*len(views)),'white')
for k,im in enumerate(ims):G.paste(im,((k%2)*(w+10),(k//2)*(h+10)))
G.save(sys.argv[1])
