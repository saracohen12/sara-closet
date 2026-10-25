# wig v3 (25/10 22:17 sheet "Eight-View Hollywood Glamour Waves"): the whole head with the wig comes from HER sheet (face + hair, no cutting on the face);
# the doll's own head (cap + face) is taken away above the chin in a separate base (nh = backdrop photo, ch = cut-out) so no cap can peek out.
# per view: body registration (reg3.json) then a head transform from p3.json (anchor wig→doll, scale k); rm = doll rows taken away; cut = wig skin kept down to here (feathered), below only hair.
import numpy as np,cv2,json,sys,os
from PIL import Image
from scipy import ndimage as ndi
N='/home/claude/sara-closet/closet/avatar8/new2'
R=json.load(open('reg3.json'));P=json.load(open('p3.json'))
BEH=os.environ.get('BEH')=='1'
def lab(a): l=cv2.cvtColor(a,cv2.COLOR_RGB2LAB).astype(np.float32); l[...,0]*=100/255; l[...,1:]-=128; return l
os.makedirs('out',exist_ok=True)
views=list(map(int,sys.argv[1].split(','))) if len(sys.argv)>1 else range(1,9)
for i in views:
    p=P[str(i)];_,s,bx,by=R[str(i)];k=p['k'];(awx,awy),(adx,ady)=p['aw'],p['ad']
    # raw → body (s,bx,by) → head (k about the anchor)
    M=np.float32([[k*s,0,k*bx+adx-k*awx],[0,k*s,k*by+ady-k*awy]])
    raw=np.asarray(Image.open(f'raw{i}.png').convert('RGB'))
    W=cv2.warpAffine(raw,M,(360,541),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_REPLICATE)
    c=np.asarray(Image.open(f'{N}/frames/c{i}.png').convert('RGB'))
    H=541;Y=np.arange(H)[:,None].repeat(360,1).astype(np.float32)
    # wig backdrop per row (edge columns) and distance from it
    we=np.concatenate([W[:,:8],W[:,-8:]],1).astype(float);wbg=np.median(we,1);d=np.sqrt(((W.astype(float)-wbg[:,None,:])**2).sum(2))
    L=lab(W);Wi=W.astype(int)
    fig=((Wi[...,0]-Wi[...,2])>6)&(d>22);fig=ndi.binary_opening(fig,iterations=1)
    lb,n=ndi.label(fig);sz=ndi.sum(fig,lb,range(1,n+1));fig=np.isin(lb,np.where(sz>=30)[0]+1)
    # hair: dark core + caramel waves (skin is redder: a*>=19.5 or a*/b*>=0.8, so arms and the neck shadow stay out)
    A_,B_=L[...,1],L[...,2]
    core=(L[...,0]<44)&(B_>3)&fig
    lite=(L[...,0]<64)&(A_<19.5)&(A_/np.maximum(B_,1)<0.8)&(B_>10)&fig
    hair=ndi.binary_propagation(core,mask=core|lite)
    hair=(ndi.binary_closing(hair,iterations=1)&(core|lite))|hair
    hair=ndi.binary_fill_holes(hair)&fig|hair
    head=ndi.binary_fill_holes(fig&(Y<p['cut']))
    # hair continues below the cut only if it is joined to the head
    lbh,nh=ndi.label(hair|head);keep=np.unique(lbh[head]);hb=np.isin(lbh,keep[keep>0])&hair;hb&=Y>=p['cut']
    # not over the doll's neck (the wig's shadow under the chin is not hair) unless really dark
    ci=c.astype(int);dfig=ndi.binary_opening(((ci[...,0]-ci[...,2])>0),iterations=1)
    Lc=lab(c);dneck=dfig&(Lc[...,1]>=10)&(Y>=p['cut'])&(Y<p['cut']+30)
    hb&=~(dneck&(L[...,0]>=34))
    lb2,n2=ndi.label(hb);sz2=ndi.sum(hb,lb2,range(1,n2+1));hb=np.isin(lb2,np.where(sz2>=25)[0]+1)
    if BEH and i in (1,2,8):   # hair behind her neck and shoulders: no hair over the doll's body below the cut
        body=ndi.binary_dilation(dfig,iterations=1);body[:p['cut']]=False;hb&=~body
    # alpha. head: against the backdrop by colour distance; hair below: solid inside, by lightness at its edge (dress and backdrop are light)
    # matte against the blue backdrop on R-B (backdrop ≈ -45, hair/skin ≥ +15): alpha = how far the pixel moved from the backdrop towards the solid colour next to it
    RB=(Wi[...,0]-Wi[...,2]).astype(np.float32);RBb=np.median(np.concatenate([RB[:,:8],RB[:,-8:]],1),1)[:,None]
    inner=ndi.binary_erosion(fig,iterations=2);_,(jy,jx)=ndi.distance_transform_edt(~inner,return_indices=True);RBf=RB[jy,jx]
    abg=np.clip((RB-RBb)/np.maximum(RBf-RBb,20),0,1)*np.clip((d-6)/20,0,1)
    # the wig's own dress (grey-beige, paler than skin) never comes along – her clothes stay visible
    dress=(L[...,0]>58)&(L[...,1]<11.5)&(L[...,2]<16.5)&(Y>=p['rm']-2)
    head&=~ndi.binary_dilation(dress,iterations=1)&~(dress)
    al=np.where(ndi.binary_dilation(head,iterations=2),abg,0).astype(np.float32);al[ndi.binary_erosion(head,iterations=2)&(d>25)]=1   # inside the head (eyes, teeth, earrings) solid, but not the backdrop seen between face and hair
    hin=ndi.binary_erosion(hb,iterations=1);hbd=ndi.binary_dilation(hb,iterations=2)&~hin;hbd&=Y>=p['cut']
    alh=np.zeros_like(al);alh[hin]=1;alh[hbd]=np.clip((80-L[...,0])/32,0,1)[hbd]*abg[hbd]
    al=np.maximum(al,alh)
    skinfade=np.clip((p['cut']+4-Y)/4,0,1)
    neck=fig&~hair&~dress&(Y>=p['cut'])&(Y<p['cut']+5)
    al=np.maximum(al,np.where(neck,skinfade*abg,0))
    al[(Y>=p['cut'])&~(ndi.binary_dilation(hb,iterations=2)|neck)]=0
    # profile and back views: around the cut, the wig's own neck/shoulder skin may stick out past her body → only hair there
    if i in (3,4,5,6,7):
        zone=(Y>=p['cut']-5)&(Y<p['cut']+8);al[zone&~ndi.binary_dilation(hair,iterations=1)&~ndi.binary_dilation(dfig,iterations=1)]=0
    al=ndi.gaussian_filter(al,.4)
    er=(al>.97)
    # edge pixels carry the wig's backdrop: nearest solid colour
    al=np.clip((al-.12)/.86,0,1)   # a thinner rim
    # every see-through edge pixel carries some of the wig's blue backdrop: give it the colour of the nearest solid pixel 2px inside
    sol2=ndi.binary_erosion(al>.97,iterations=1)
    _,(iy,ix)=ndi.distance_transform_edt(~sol2,return_indices=True);Wd=W.copy();bd=(al>0)&~sol2;Wd[bd]=W[iy[bd],ix[bd]]
    o=np.concatenate([Wd,np.clip(al*255,0,255)[...,None]],2).astype(np.uint8);o[o[...,3]==0]=0
    nm=('wb' if BEH else 'w')+str(i)
    Image.fromarray(o).save(f'out/{nm}.png')
    # the doll without her head (rows above rm, soft over 4 rows) – mask saved for the bases
    if not BEH:
        rmv=np.clip((p['rm']-Y)/4,0,1)*ndi.binary_dilation(dfig,iterations=2)
        rmv=ndi.gaussian_filter(rmv,.6)
        np.save(f'out/rm{i}.npy',rmv.astype(np.float32))
        # preview on the blue photo: inpaint the head away, then the wig
        hm=(rmv>.02).astype(np.uint8)*255;hm=cv2.dilate(hm,np.ones((5,5),np.uint8))
        bd_=cv2.inpaint(np.ascontiguousarray(c),hm,7,cv2.INPAINT_TELEA)
        base=(c*(1-rmv[...,None])+bd_*rmv[...,None]).astype(np.uint8)
        comp=Image.fromarray(base).convert('RGBA');comp.alpha_composite(Image.fromarray(o));comp=np.asarray(comp.convert('RGB'))
        # and on a cream background with the cut-out
        cream=np.full((H,360,3),(246,239,230),np.uint8);dal=ndi.gaussian_filter(dfig.astype(np.float32),.6)*(1-rmv)
        cut=(c*dal[...,None]+cream*(1-dal[...,None])).astype(np.uint8);cc=Image.fromarray(cut).convert('RGBA');cc.alpha_composite(Image.fromarray(o));cc=np.asarray(cc.convert('RGB'))
        Image.fromarray(np.concatenate([c,comp,cc],1)).save(f'out/cmp{i}.png')
    print(i,'hair below',int(hb.sum()),'alpha px',int((al>.5).sum()),flush=True)
