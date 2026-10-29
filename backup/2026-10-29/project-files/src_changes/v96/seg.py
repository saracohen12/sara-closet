from PIL import Image;import numpy as np,sys
def segs(m,y,minw=3):
    r=m[y].astype(int);d=np.diff(np.r_[0,r,0]);s=np.where(d==1)[0];e=np.where(d==-1)[0]-1
    return [(a,b) for a,b in zip(s,e) if b-a>=minw]
if __name__=='__main__':
    k=sys.argv[1];y0,y1,st=int(sys.argv[2]),int(sys.argv[3]),int(sys.argv[4])
    pre=sys.argv[5] if len(sys.argv)>5 else 'p6/p6c_'
    a=np.array(Image.open(pre+k+('.png' if 'p6' in pre else '.webp')))[:,:,3]>128
    for y in range(y0,y1,st): print(y,[(int(p),int(q)) for p,q in segs(a,y)])
