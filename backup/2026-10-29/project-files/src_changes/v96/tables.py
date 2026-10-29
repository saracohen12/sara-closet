import json,numpy as np
from PIL import Image,ImageDraw
V=['front','side','back','half','hip']
def ext(a,y):
    xs=np.where(a[y])[0];return (int(xs[0]),int(xs[-1])) if len(xs) else None
A={k:np.array(Image.open('p6/p6c_'+k+'.png'))[:,:,3]>128 for k in V}
TOP={k:38 for k in V};TOP['hip']=240
CHIN={'front':218,'side':222,'back':215,'half':222,'hip':391}
OCHIN={'front':222,'side':236,'back':222,'half':226,'hip':411}
OTOP={k:38 for k in V};OTOP['hip']=255
OWA={'front':550,'back':550,'side':550,'half':565,'hip':700}
f=0.8434
def hipy(y):return round(1328-(1328-y)*f)
Y={'nk':252,'sh':295,'wa':512,'hp':690}
YH={k:hipy(v) for k,v in Y.items()}
NWA={'front':512,'back':505,'side':530,'half':515,'hip':638}
def ymap(v,y):
    pts=[(OTOP[v],TOP[v]),(OCHIN[v],CHIN[v]),(OWA[v],NWA[v]),(1328,1328)]
    if y<=pts[0][0]:return y-pts[0][0]+pts[0][1]
    for (a,b),(c,d) in zip(pts,pts[1:]):
        if y<=c:return b+(y-a)*(d-b)/(c-a)
    return y
# head max width rows top..chin
HM={}
for v in V:
    a=A[v];best=(0,0,0)
    for y in range(TOP[v],CHIN[v]):
        e=ext(a,y)
        if e and e[1]-e[0]>best[0]:best=(e[1]-e[0],e[0],e[1])
    HM[v]=best
OHM={'front':(147,122,269),'side':(175,113,288),'back':(142,129,271),'half':(154,121,275),'hip':(123,88,211)}
OTIE={'front':{'top':38,'hh':161,'cx':196,'w':150},'side':{'top':38,'hh':161,'cx':201,'w':177},'back':{'top':38,'hh':161,'cx':200.5,'w':145},'half':{'top':38,'hh':161,'cx':198,'w':155},'hip':{'top':255,'hh':134,'cx':151,'w':125}}
TIE={}
for v in V:
    o=OTIE[v];r=HM[v][0]/OHM[v][0];ocx=(OHM[v][1]+OHM[v][2])/2;ncx=(HM[v][1]+HM[v][2])/2
    hh=round(o['hh']*(CHIN[v]-TOP[v])/(OCHIN[v]-OTOP[v]))
    TIE[v]={'top':TOP[v],'hh':hh,'cx':round(ncx+(o['cx']-ocx)*r,1),'w':round(o['w']*r)}
def hmapx(v,x):
    r=HM[v][0]/OHM[v][0];ocx=(OHM[v][1]+OHM[v][2])/2;ncx=(HM[v][1]+HM[v][2])/2;return round(ncx+(x-ocx)*r)
def hmapy(v,y):
    return round(TOP[v]+(y-OTOP[v])*(CHIN[v]-TOP[v])/(OCHIN[v]-OTOP[v]))
P5BODY={'front':{'sh':[201,290],'wa':[201,192],'hp':[200,250],'y':Y},'back':{'sh':[199,290],'wa':[198,192],'hp':[198,250],'y':Y},
 'side':{'sh':[215,170],'wa':[183,152],'hp':[219,202],'y':Y},'half':{'sh':[180,235],'wa':[214,187],'hp':[212,262],'y':Y},
 'hip':{'sh':[166,210],'wa':[162,162],'hp':[165,215],'y':YH}}
WAIST91={'front':{'y':512,'w':192,'cx':201},'back':{'y':505,'w':192,'cx':198},'side':{'y':530,'w':152,'cx':183},'half':{'y':515,'w':187,'cx':214},'hip':{'y':638,'w':162,'cx':162}}
FIT_WAIST={k:{'w':round(w['w']*0.87),'cx':w['cx']} for k,w in WAIST91.items()}
# feet
FEET={}
for v in V:
    a=A[v];ys=np.where(a.any(1))[0];fx=np.where(a[ys[-1]-30:ys[-1]+1].any(0))[0];FEET[v]=[int(fx[0]),int(fx[-1])]
# jewelry
OJ={'front':{'ear':[[148,185],[255,185]],'neck':[200,276,96],'wrist':[[52,688],[348,688]]},'side':{'ear':[[215,185]],'neck':[142,278,96,1],'wrist':[[76,802]]},'half':{'ear':[[280,185]],'neck':[215,278,80],'wrist':[[102,792]]},'hip':{'ear':[[127,395],[202,395]],'neck':[161,458,70],'wrist':[[203,714]]},'back':{'neck':[200,256,90,0,1]}}
JWL={}
for v,o in OJ.items():
    n={}
    if 'ear' in o:n['ear']=[[hmapx(v,x),hmapy(v,y)] for x,y in o['ear']]
    nk=list(o['neck']);nk[1]=round(ymap(v,nk[1]));n['neck']=nk
    if 'wrist' in o:n['wrist']=[[x,round(ymap(v,y))] for x,y in o['wrist']]
    JWL[v]=n
JWL={'front':{'ear':[[141,170],[263,170]],'neck':[201,264,96],'wrist':[[45,735],[357,735]]},'side':{'ear':[[213,178]],'neck':[127,263,96,1],'wrist':[[140,742]]},
 'half':{'ear':[[246,170]],'neck':[190,265,80],'wrist':[[137,748]]},'hip':{'ear':[[116,345],[222,345]],'neck':[166,428,70],'wrist':[[268,682]]},'back':{'neck':[197,248,90,0,1]}}
# BODYW
BODYW={}
for v in V:
    r=[]
    for i in range(191):
        e=ext(A[v],240+i*4);r.append(list(e) if e else 0)
    BODYW[v]={'y0':240,'s':4,'r':r}
OB={'neck':.214,'sh':[.228,.76],'waist':[.395,.5],'knee':.72,'ankle':.93}
B={'neck':round(ymap('front',.214*1365)/1365,3),'sh':[round(ymap('front',.228*1365)/1365,3),.76],'waist':[round(ymap('front',.395*1365)/1365,3),.5],'knee':round(ymap('front',.72*1365)/1365,3),'ankle':.93}
out=dict(P5BODY=P5BODY,WAIST91=WAIST91,FIT_WAIST=FIT_WAIST,FEET85=FEET,TIEHEAD=TIE,JWL=JWL,BODYW=BODYW,BASE=B)
json.dump(out,open('p6/tables.json','w'))
for k,v in out.items():
    if k!='BODYW':print(k,json.dumps(v))
# debug overlay
ims=[]
for v in V:
    im=Image.open('p6/p6c_'+v+'.png');g=Image.new('RGBA',im.size,(235,232,226,255));g.alpha_composite(im);d=ImageDraw.Draw(g)
    b=P5BODY[v];yy=b['y']
    for key,col in (('sh','red'),('wa','blue'),('hp','green')):
        cx,w=b[key];y=yy[key];d.line((cx-w/2,y,cx+w/2,y),fill=col,width=3)
    d.line((0,yy['nk'],399,yy['nk']),fill='orange',width=1)
    w9=WAIST91[v];d.line((w9['cx']-w9['w']/2,w9['y']+6,w9['cx']+w9['w']/2,w9['y']+6),fill='cyan',width=2)
    t=TIE[v];d.rectangle((t['cx']-t['w']/2,t['top'],t['cx']+t['w']/2,t['top']+t['hh']),outline='magenta',width=2)
    j=JWL.get(v,{})
    for x,y in j.get('ear',[]):d.ellipse((x-5,y-5,x+5,y+5),fill='gold')
    for x,y in j.get('wrist',[]):d.ellipse((x-6,y-6,x+6,y+6),fill='purple')
    n=j.get('neck');
    if n:d.line((n[0]-n[2]/2,n[1],n[0]+n[2]/2,n[1]),fill='gold',width=3)
    fx=FEET[v];d.line((fx[0],1332,fx[1],1332),fill='black',width=4)
    ims.append(g)
W=Image.new('RGB',(399*5,1365),'white')
for i,g in enumerate(ims):W.paste(g.convert('RGB'),(399*i,0))
W.resize((399*5*2//3,910)).save('p6/landmarks.jpg')
W.crop((0,0,399*5,560)).save('p6/landmarks_top.jpg')
