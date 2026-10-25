import json,re,base64,io,html,collections
from PIL import Image
src=open('book.py').read()
helpers=src[src.index('GIRLS_FILES'):src.index('SEC=[')]
exec(helpers)
r=json.load(open('items2.json')); P=json.load(open('prices.json')); Z=json.load(open('sizes.json'))
OS=json.load(open('ordsum.json')); TD=json.load(open('tdates.json')); S=json.load(open('shein/shein_items.json'))
B64=json.load(open('shein/b64.json'))
FIX={22:4.36,66:8.03,74:0.0,77:13.77,79:0.0,140:45.69}
for i,v in FIX.items(): P[i]['price']=v
# order nets
def refunds(s):
    return sum(float(x) for x in re.findall(r'₪([\d.]+)',s))
osum=collections.defaultdict(float)
for x,p in zip(r,P): osum[x['file'][:-4]]+=p['price']*p['qty']
R2=json.load(open('summ2.json'))
PO={k:'P'+[v for l,v,_ in R2[k] if 'מזהה' in l][0] for k in R2}
NET={k:(v[0]-refunds(v[2])) for k,v in OS.items()}
CREDIT={k:round(v[0]-v[1],2) for k,v in OS.items() if v[0] and v[1] and v[0]-v[1]>0.01}
# categories
TCAT={'under':'night','makeup':'makeup'}
OVR={306:'night'}
items=[]
D=[[4,15,300],[11,14,301],[167,304],[157,241],[9,245,382],[92,334],[179,361],[34,195],[45,337],[38,368],[90,159],[50,103],[48,95],[73,82],[2,154]]
def timg(p):
    im=Image.open(p).convert('RGB'); im.thumbnail((260,346))
    b=io.BytesIO(); im.save(b,'JPEG',quality=70); return 'data:image/jpeg;base64,'+base64.b64encode(b.getvalue()).decode()
for i,(x,p) in enumerate(zip(r,P)):
    c=OVR.get(i,x['cat']); c=TCAT.get(c,c)
    if c=='kids': c=kid(i,x)
    f=x['file'][:-4]; acc='t1' if f.startswith('acc1') else 't2'
    k0=x['cat']
    ft=clean(x['title']); w=ft.split()
    nm=' '.join(w[:4]) if w else name(k0 if k0 in DEF else 'tops',x['title'])
    nm=re.sub(r'\s*(לנשים|נשים|לגברים)$','',nm).strip(' ,')
    col=color(x['var']+' '+x['title'] if c in ('jewelry','belts','scarves','bags') else x['var'])
    real=p['price']*p['qty']*NET[f]/osum[f] if osum[f] else 0
    items.append(dict(id=f'T{i}',src=acc,cat=c,short=nm,color=col,size=Z[i]['size'],full=clean(x['title']),file=fname(x['file']),order=PO.get(f,f),date=TD.get(f),
        price=p['price'],qty=p['qty'],paid=round(real,2),img=timg('thumbs2/'+x['img'])))
for k,s in enumerate(S):
    cv=s['var'].rsplit('-',1); col,sz=(cv[0],cv[1]) if len(cv)==2 and len(cv[1])<=8 else (s['var'],'')
    items.append(dict(id=f'S{k}',src='sh',cat=s['cat'],short=s['name'],color=col,size=sz,full=s['name'],file='הזמנה '+s['order'][-4:],order=s['order'],date=s['date'],
        price=None,qty=1,paid=s['price'],ototal=s['total'],on=s['n'],img=('data:image/jpeg;base64,'+B64[s['img']]) if s['img'] else None))
ID={x['id']:x for x in items}

# duplicate groups (ids)
G=[[f'T{i}' for i in g] for g in D]
Sid={(s['order'][-4:],s['j']):f'S{k}' for k,s in enumerate(S)}
G+= [[Sid[('MEX3',3)],Sid[('MW6D',28)]],[Sid[('1VSH',3)],Sid[('1VSH',4)]],['T51',Sid[('1BGU',4)]]]
NOTE={tuple(G[-1]):'אותה שמלת קטיפה ירוקה עם דוגמה גאומטרית: פעם מטמו (מידה S) ופעם משיין (Modelyn, מידה M).',
      tuple(G[-2]):'אותה שמלת חולצה חומה, הוזמנה במידה S ובמידה M.',
      tuple(G[-3]):'חצאית הקפלים של Modelyn בנייבי S, הוזמנה ב-4/10 ושוב ב-17/10.'}
for g in G:
    for m in g:
        ID[m]['dup']=[o for o in g if o!=m]; ID[m]['dupnote']=NOTE.get(tuple(g),'')
SRC={'t1':'טמו · חשבון 1','t2':'טמו · חשבון נוסף','sh':'שיין'}
SEC=[('dresses','שמלות'),('skirts','חצאיות'),('sets','סטים וחליפות'),('tops','חולצות'),('sweaters','סוודרים'),('outer',"ז'קטים, קרדיגנים ומעילים"),('scarves','כיסויי ראש וצעיפים'),('belts','חגורות'),('jewelry','תכשיטים'),('shoes','נעליים'),('bags','תיקים'),('hosiery','גרביונים וגרביים'),('night','הלבשה תחתונה ולילה'),('hair','אביזרי שיער'),('makeup','איפור וטיפוח'),('girls','בנות'),('boys','בנים'),('men','גברים'),('other','שונות')]
groups=collections.defaultdict(list)
for x in items: groups[x['cat']].append(x)
assert set(groups)<=set(k for k,_ in SEC),set(groups)-set(k for k,_ in SEC)
def money(v): return f'₪{v:,.2f}'
nav=[];secs=[];meta={}
for k,label in SEC:
    its=groups.get(k,[])
    if not its: continue
    its.sort(key=lambda x:(x['src']=='sh',x['id']))
    nav.append(f'<a href="#{k}">{label}<span>{len(its)}</span></a>')
    cards=[]
    for x in its:
        price=(money(x['paid']) if x['paid'] is not None else '—')
        dup=f'<span class="dup">כפול</span>' if x.get('dup') else ''
        im=f'<img src="{x["img"]}" alt="" loading="lazy">' if x['img'] else '<span class="noimg">אין תמונה במייל</span>'
        sub=' · '.join(p for p in [x['color'],x['size']] if p)
        cards.append(f'<button class="card" data-id="{x["id"]}" data-src="{x["src"]}"{" data-dup=1" if x.get("dup") else ""}><span class="ph">{im}{dup}<span class="sb {x["src"]}">{"שיין" if x["src"]=="sh" else "טמו"}</span></span><span class="t">{html.escape(x["short"])}</span><span class="m">{html.escape(sub)}</span><span class="pp">{price}</span></button>')
        meta[x['id']]={k2:v for k2,v in x.items() if k2!='img'}
    secs.append(f'<section id="{k}"><h2>{label} <span>{len(its)}</span></h2><div class="grid">{"".join(cards)}</div></section>')
for x in meta.values():
    x['srcl']=SRC[x['src']]
    if x['src']!='sh':
        o=[k for k,v in PO.items() if v==x['order']][0]; x['refund']=refunds(OS[o][2]); x['credit']=CREDIT.get(o,0); x['onet']=round(NET[o],2); x['osub']=OS[o][0]
tT=sum(NET.values()); 
cnt=collections.Counter(x['src'] for x in items)
tpl=open('book2_tpl.html').read()
out=(tpl.replace('%%NAV%%',''.join(nav)).replace('%%SECS%%','\n'.join(secs)).replace('%%DATA%%',json.dumps(meta,ensure_ascii=False))
   .replace('%%N%%',str(len(items))).replace('%%NT1%%',str(cnt['t1'])).replace('%%NT2%%',str(cnt['t2'])).replace('%%NSH%%',str(cnt['sh']))
   .replace('%%NDUP%%',str(sum(1 for x in items if x.get('dup')))).replace('%%NG%%',str(len(G))))
open('/tmp/claude-0/-home-claude/913a938d-2682-5fb0-9bfb-6e01fee96ea8/scratchpad/book.html','w').write(out)
print(len(items),cnt,len(out)//1024,'KB',{k:len(v) for k,v in groups.items()}, round(tT,2))
