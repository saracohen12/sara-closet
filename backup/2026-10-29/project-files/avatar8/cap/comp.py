import sys
from PIL import Image
D='a8page/'
def comp(i,tuck=False,layers=None):
    im=Image.open(D+f'c{i}.png').convert('RGBA')
    seq=['ln']+(['lb','ls'] if tuck else ['ls','lb'])+(['lt','lj','le','lh'] if i in (4,5,6) else ['lt','lj','lh','le'])
    for l in seq:
        try: L=Image.open(D+f'{l}{i}.png').convert('RGBA').resize(im.size)
        except FileNotFoundError: continue
        im.alpha_composite(L)
    return im
if __name__=='__main__':
    out=[]
    for i,t in [(1,False),(5,False),(1,True),(2,False)]:
        out.append(comp(i,t))
    W=sum(o.width for o in out);s=Image.new('RGBA',(W,out[0].height));x=0
    for o in out:s.paste(o,(x,0));x+=o.width
    s=s.resize((s.width*2,s.height*2),Image.LANCZOS);s.convert('RGB').save('compA.png')
