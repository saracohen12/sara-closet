import json,re,base64,io,html,collections
import os as _os
COLD=json.load(open('colors.json')) if _os.path.exists('colors.json') else {}
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
OVR={359:'night',223:'outer',227:'outer',229:'outer',237:'outer',306:'night',12:'hosiery',136:'hosiery',360:'hosiery',303:'jewelry',309:'hair',362:'hair',367:'makeup',177:'makeup',140:'makeup',326:'bags',79:'bags',37:'tops',201:'skirts',299:'dresses'}
items=[]
D=[[4,15,300],[11,14,301],[167,304],[157,241],[9,245,382],[92,334],[179,361],[34,195],[45,337],[38,368],[90,159],[50,103],[48,95],[73,82],[2,154]]
def timg(p):
    im=Image.open(p).convert('RGB'); im.thumbnail((300,400))
    b=io.BytesIO(); im.save(b,'WEBP',quality=68,method=4); return 'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()  # v68: WebP ≈ half the bytes of the old JPEG thumbnails
for i,(x,p) in enumerate(zip(r,P)):
    c=OVR.get(i,x['cat']); c=TCAT.get(c,c)
    if c=='kids': c=kid(i,x)
    f=x['file'][:-4]; acc='t1' if f.startswith('acc1') else 't2'
    k0=x['cat']
    ft=clean(x['title']); w=ft.split()
    nm=' '.join(w[:7]) if w else name(k0 if k0 in DEF else 'tops',x['title'])
    nm=re.sub(r'\s*(לנשים|נשים|לגברים)$','',nm).strip(' ,')
    col=color(x['var']+' '+x['title'] if c in ('jewelry','belts','scarves','bags') else x['var'])
    real=p['price']*p['qty']*NET[f]/osum[f] if osum[f] else 0
    items.append(dict(id=f'T{i}',src=acc,cat=c,short=nm,color=col,size=Z[i]['size'],full=clean(x['title']),file=fname(x['file']),order=PO.get(f,f),date=TD.get(f),
        price=p['price'],qty=p['qty'],paid=round(real,2),img=timg('thumbs3/'+x['img'])))

# v279: names the receipt OCR garbled (Latin letters read as Hebrew, lines cut in the middle) – written again from what can be read
NFIX={'T7':'תכשיטים 3 חלקים לנשים: שרשרת ועגילים','T8':'צמיד מצופה זהב 18 קראט, עם בד ניקוי','T13':'6 תחתונים בחבילה, צבעים מעורבים',
 'T23':'מטען טעינה מהירה עם תצוגה','T66':'מתאם 3 פינים','T80':'מטען לרכב 6 ב-1, טעינה מהירה לטלפון','T100':'5 קליפסים פרחוניים לשיער (קטנים)',
 'T105':'שמלת נשים אלגנטית שחורה','T119':'מטען קיר מהיר עם 2 יציאות','T155':'שמלת נשים אלגנטית שחורה עם צווארון','T162':'צעיף צוואר דק, פרחוני רטרו',
 'T246':'סט קטיפה פרימיום לנשים','T277':'סט 2 חלקים לבנים לסתיו, עם הדפס','T297':'קרדיגן רפוי ורך לסתיו/חורף','T330':'סט חצאית וחולצה לסתיו/חורף'}
for it in items:
    if it['id'] in NFIX: it['short']=it['full']=NFIX[it['id']]

exec(open('shein/inv_all.py').read().replace("'inv_4oct.py'","'shein/inv_4oct.py'"))
UA=json.load(open('shein/allurls.json')); ASG=json.load(open('shein/ship/assign.json'))
import hashlib,os
FULL={k:[o for o in UA if o.endswith(k)][0] for k in I}
NOTEO={'N4WS':'ההזמנה שולמה כולה מיתרת הארנק בשיין (₪168.19 שנצברו מהחזרים קודמים).',
 '1UVQ':'₪90.97 מההזמנה שולמו מיתרת הארנק בשיין, והשאר בכרטיס.',
 'NM5K':'בהזמנה הזו נוסף דמי משלוח של ₪47, שאינם כלולים במחיר הפריטים.',
 '1RND':'ההזמנה הגיעה בסוף, אבל קיבלת עליה החזר מלא, כך שבפועל לא שילמת עליה כלום.',
 'MU9J':'ההזמנה עדיין בעיבוד בשיין. משלוח צפוי בין 3 ל-9 בנובמבר.',
 'MU5B':'ההזמנה בהכנה בשיין. מסירה צפויה בין 4 ל-11 בנובמבר.',
 '2QB0':'ההזמנה בהכנה בשיין. מסירה צפויה בין 4 ל-11 בנובמבר.',
 '1VHG':'ההזמנה בהכנה בשיין. מסירה צפויה בין 3 ל-9 בנובמבר. שימי לב: לפי שיין חגורות אי אפשר להחזיר או להחליף.',
 '00HR':'הזמנה בקליק. שימי לב: לפי שיין חגורות אי אפשר להחזיר או להחליף.',
 '2CRC':'הזמנה בקליק. מסירה צפויה בין 3 ל-9 בנובמבר. שימי לב: לפי שיין חגורות אי אפשר להחזיר או להחליף.',
 'NB85':'ההזמנה בהכנה בשיין. מסירה צפויה בין 3 ל-10 בנובמבר. שימי לב: לפי שיין את הפריט הזה אי אפשר להחזיר או להחליף.',
 '1100':'ההזמנה בהכנה בשיין. מסירה צפויה בין 5 ל-11 בנובמבר. שימי לב: לפי שיין את 3 החגורות אי אפשר להחזיר או להחליף. השמלה, החולצה והחצאית אפשר.',
 'NGYX':'ההזמנה בעיבוד בשיין. מסירה צפויה בין 8 ל-15 בנובמבר. שימי לב: לפי שיין את התחתונים, את תחתוני הבוקסר ואת החגורה החומה אי אפשר להחזיר או להחליף.',
 '1CNR':'מסלסל השיער השני בהזמנה בוטל והוחזר, ולכן הוא לא מופיע.'}
APP=json.load(open('shein/app_imgs.json')); ORIG=json.load(open('shein/orig.json'))
def simg(k,j):
    o=FULL[k]
    if f'{k}|{j}' in APP: return timg(APP[f'{k}|{j}'])
    if j<len(UA[o]) and os.path.exists(f'shein/img/{o}_{j}.jpg'): return timg(f'shein/img/{o}_{j}.jpg')
    if j<len(UA[o]) and f'{o}_{j}' in B64: return 'data:image/jpeg;base64,'+B64[f'{o}_{j}']
    u=ASG.get(f'{k}|{j}')
    if u: return timg('shein/ship/img/'+hashlib.md5(u.encode()).hexdigest()[:12]+'.jpg')
    return None
SIDX={}
for k,(d,L) in I.items():
    seen={}
    for j,(n,c,sz,p,cat) in enumerate(L):
        key=(n,c,sz)
        if key in seen:
            x=seen[key]; x['qty']+=1; x['paid']=round(x['paid']+(0 if k=='1RND' else p),2); x['lines'].append(j); SIDX[(k,j)]=x['id']; continue
        x=dict(id=f'S{k}_{j}',src='sh',cat=cat,short=n,color=c,size=sz,full=n,file='הזמנה '+k[-4:],order=FULL[k],date=d,
               price=p,qty=1,paid=0.0 if k=='1RND' else p,ototal=TOT[k],on=len(L),onote=NOTEO.get(k,''),img=simg(k,j),lines=[j],orig=ORIG.get(f'{k}|{j}'))
        seen[key]=x; items.append(x); SIDX[(k,j)]=x['id']
# v164: AliExpress orders (ae/inv_ae.py: AE['key']=(full order no, date, total, [(name,color,size,price,cat)]), images ae/app/<key>_<j>.jpg)
AE={};AENOTE={}
if _os.path.exists('ae/inv_ae.py'): exec(open('ae/inv_ae.py').read())
for k,(full,d,tot,L) in AE.items():
    for j,(n,c,sz,p,cat) in enumerate(L):
        im=f'ae/app/{k}_{j}.jpg'
        items.append(dict(id=f'A{k}_{j}',src='ae',cat=cat,short=n,color=c,size=sz,full=n,file='הזמנה '+k[-6:],order=full,date=d,
            price=p,qty=1,paid=p,ototal=tot,on=len(L),onote=AENOTE.get(k,''),img=timg(im) if _os.path.exists(im) else None,lines=[j]))
# v176: Temu orders added later from a PDF (temu/inv_tn.py), images temu/app/<key>_<j>.jpg
TN={};TNNOTE={};TNFILE={}  # v240: TNFILE[key] = receipt label as Sara names it
if _os.path.exists('temu/inv_tn.py'): exec(open('temu/inv_tn.py').read())
TNF={'t1':15,'t2':24,'t3':1}
for k,(acc,full,d,sm,L) in TN.items():
    fno=TNF[acc];TNF[acc]+=1
    for j,(n,fl,c,sz,pr,pd,cat) in enumerate(L):
        im=f'temu/app/{k}_{j}.jpg'
        items.append(dict(id=f'T{k}_{j}',src=acc,cat=cat,short=n,color=c,size=sz,full=fl,file=TNFILE.get(k) or (f'קובץ {fno}' if acc=='t1' else f'חשבון נוסף {fno}' if acc=='t2' else f'חשבון 3 · {fno}'),order=full,date=d,
            price=pr,qty=1,paid=pd,tn=1,osub=sm['osub'],credit=sm['credit'],refund=0,onet=sm['total'],onote=TNNOTE.get(k,''),img=timg(im) if _os.path.exists(im) else None))
ID={x['id']:x for x in items}
SKUM=json.load(open('shein/sku_map.json')) if _os.path.exists('shein/sku_map.json') else {}
for x in items:
    if x['id'] in SKUM: x['sku']=SKUM[x['id']]  # v41: Shein SKU from the order e-mails, for exact search

# duplicate groups (ids)
G=[[f'T{i}' for i in g] for g in D]
X=[(('NTMJ',4),('NAA5',12),'אותה שמלה פרחונית של Breezaya עם שרוולים נפוחים, בשחור: פעם במידה L (18/8) ופעם במידה M (31/8).'),
   (('NTMJ',3),('11QS',11),'אותה שמלה בוהמית עם טלאים וחגורה בכחול מלכותי: פעם במידה L (18/8) ופעם במידה M (31/8).'),
   (('MEX3',3),('MW6D',28),'חצאית הקפלים של Modelyn בנייבי S, הוזמנה ב-4/10 ושוב ב-17/10.'),
   (('1VSH',3),('1VSH',4),'אותה שמלת חולצה חומה, הוזמנה במידה S ובמידה M.')]
NOTE={}
for a1,b1,nt in X:
    g=[SIDX[a1],SIDX[b1]]; G.append(g); NOTE[tuple(g)]=nt
g=['T51',SIDX[('1BGU',4)]]; G.append(g); NOTE[tuple(g)]='אותה שמלת קטיפה ירוקה עם דוגמה גאומטרית: פעם מטמו (מידה S) ופעם משיין (Modelyn, מידה M).'
# v176: the floral turtleneck re-ordered in M after T37 (S) was cancelled; the velvet skirt twice in the same order
if 'T591091_3' in ID: G.append(['T37','T591091_3']); NOTE[('T37','T591091_3')]='אותה חולצת גולף שחורה עם פרחים ועלי זהב: במידה S (15/10) בוטלה כי אזלה מהמלאי, והוזמנה שוב במידה M (25/10).'
if 'T591091_15' in ID: G.append(['T591091_14','T591091_15']); NOTE[('T591091_14','T591091_15')]='אותה חצאית קטיפה חומה במידה S הופיעה פעמיים באותה הזמנה מ-25/10 (₪28.04 ו-₪46.74 אחרי הנחות).'
NOMULTI={'other'}
for x in items:
    if x['src']=='sh' and x['qty']>1 and x['cat'] not in NOMULTI and not any(x['id'] in g for g in G):
        x['dupnote']=f'השורה הזו מופיעה {x["qty"]} פעמים באותה חשבונית (אותו צבע ואותה מידה).'; x['selfdup']=1
for g in G:
    for m in g:
        ID[m]['dup']=[o for o in g if o!=m]; ID[m]['dupnote']=NOTE.get(tuple(g),'')
SRC={'t1':'טמו 1 (חשבון 8711309)','t2':'טמו 2 (חשבון 9285464)','t3':'טמו 3 (smart20.mortgage)','sh':'שיין','ae':'עלי אקספרס'}
SEC=[('dresses','שמלות'),('skirts','חצאיות'),('sets','סטים'),('pants','מכנסיים'),('tops','חולצות'),('base','חולצות בסיס'),('sweaters','סוודרים'),('outer',"ז'קטים ומעילים"),('scarves','כיסויי ראש וצעיפים'),('belts','חגורות'),('jewelry','תכשיטים'),('shoes','נעליים ואביזרים'),('bags','תיקים'),('hosiery','גרביונים וגרביים'),('night','הלבשה תחתונה ולילה'),('hair','אביזרי שיער'),('makeup','איפור וטיפוח'),('girls','בנות'),('boys','בנים'),('men','גברים'),('wedding','חתונה ואירועים'),('other','בית ושונות')]
SOVR={'S16D0_2':'wedding','S16D0_3':'wedding','S16D0_4':'wedding','S16D0_5':'wedding','S16D0_6':'wedding','SMSCW_13':'wedding','S1A5K_0':'wedding',
 'SMSCW_4':'shoes','SMSCW_6':'shoes','SMSCW_11':'shoes','SMSCW_14':'shoes'}
for x in items:
    if x['id'] in SOVR: x['cat']=SOVR[x['id']]
GR=[('clo','בגדים',['dresses','skirts','sets','tops','base','sweaters','outer']),('acc','אביזרים',['scarves','belts','jewelry','shoes','bags','hosiery','hair']),('nig','לילה',['night']),('kid','ילדים',['girls','boys']),('more','עוד',['men','makeup','wedding','other'])]
G2={c:g for g,_,cs in GR for c in cs}
groups=collections.defaultdict(list)
for x in items: groups[x['cat']].append(x)
assert set(groups)<=set(k for k,_ in SEC),set(groups)-set(k for k,_ in SEC)

FAM=[('שחור',['שחור','black']),('לבן',['לבן','שמנת','חלבי','white']),('חום',['חום','קפה','שוקולד','קאמל','brown','אדמדם']),('בז׳',['בז','חאקי','שמפניה','משמש','קרם','זהב']),('כחול',['כחול','נייבי','תכלת','blue']),('ירוק',['ירוק','זית','green']),('אדום',['אדום','בורגונדי','יין','מארון','red']),('ורוד',['ורוד','pink']),('סגול',['סגול','ארגמן','לילך']),('אפור',['אפור','כסף','grey','gray']),('צבעוני',['צבע','צבעוני','ססגוני','מעורב','רב'])]
def fam(c):
    c=(c or '').lower()
    for f,ks in FAM:
        if any(k in c for k in ks): return f
    return ''
def dnum(d):
    try: a,b=d.split('/'); return int(b)*100+int(a)
    except: return 0
def szn(z):
    z=str(z or '').replace('Asian','').strip()
    import re
    m=re.match(r'^(XXS|XS|S|M|L|XL|XXL)$',z)
    if m: return z
    m=re.search(r'(\d+-\d+Y|\d+Y)',z)
    if m: return m.group(1)
    return ''
def simkey(x):
    import re
    w=re.sub(r'^(SHEIN|[A-Z][A-Za-z]+(\s[A-Z]+)?)\s','',x['short']).split()
    stop={'לנשים','נשים','חדשה','חדש','אלגנטית','אלגנטי','אופנתית','סט','של','עם','1','יחידה','יחידות'}
    w=[t for t in w if t not in stop][:2]
    return ' '.join(w)

import datetime as _dt
CLO={'dresses','skirts','sets','tops','base','sweaters','outer','scarves','night'}
def tags(x):
    t=(x['short']+' '+x.get('full','')).lower(); c=x['cat']; r=set()
    if c not in CLO and c not in ('shoes','bags','belts','jewelry'): return [],[]
    if any(k in t for k in ['ערב','מסיבה','פאייט','נצנ','כלה','חתונה','aureia','anewsta','רקמה','מבריק','זוהר']): r.add('אירוע')
    if any(k in t for k in ['אלגנט','סאטן','קטיפה','תחרה','מקסי','modelyn','franclia','lady','קפלים','פנינ','שיפון','רומנט','וינטג']): r.add('שבת וחג')
    if any(k in t for k in ['משרד','בלייזר','ז\'קט','קלאס','פופלין','משובצ','מחויט','עבודה','צווארון']): r.add('עבודה')
    if any(k in t for k in ['טי','טריקו','קז\'ואל','יומיומי','סוודר','סריג','גולף','פליז','קפוצ','בסיס','ג\'ינס','ספורט','emery','ezwear','גופייה']): r.add('יומיומי')
    if c=='night': r={'בית ולילה'}
    if not r: r={'dresses':{'שבת וחג'},'skirts':{'יומיומי','שבת וחג'},'tops':{'יומיומי'},'sweaters':{'יומיומי'},'outer':{'יומיומי'},'sets':{'שבת וחג'},'scarves':{'יומיומי'}}.get(c,set())
    s=set()
    if c in ('jewelry','belts','bags'): s=set()
    elif any(k in t for k in ['סוודר','סריג','פליז','קטיפה','צמר','תרמי','מעיל','חורף','גולף','פרווה','חם','ולווט','ריב']): s.add('חורף')
    elif any(k in t for k in ['קיץ','שרוול קצר','גופייה','קצרה','רשת','שיפון']): s.add('קיץ')
    else: s.add('מעבר')
    return sorted(r),sorted(s)
TODAY=_dt.date.today()   # v267: was fixed at 20/10 – the page also recounts in the browser every day (data-rdl)
EXACT={'GSH1RR24U0017QJ':(10,25),'GSH1R824B00N4WS':(10,26),'GSH1R424X000MNA':(10,20),'GSH1RF24F002MH3':(11,3),'GSH1RR24C001A5K':(10,25)}
NORETI={'SNGYX_3','SNGYX_8','SNGYX_11'}  # v286: single items Shein won't take back
NORET={'GSH19924N00NB85','GSH199241001VHG','GSH1992410000HR','GSH199241002CRC'}  # Shein: this category can't be returned
def retdate(x):
    if x['order'] in NORET or x.get('id') in NORETI or x['src']=='ae': return None,False
    if x['src']=='sh' and x['order'] in EXACT:
        m,d=EXACT[x['order']]; return _dt.date(2026,m,d),True
    try: d,m=map(int,x['date'].split('/'))
    except: return None,False
    return _dt.date(2026,m,d)+_dt.timedelta(days=72 if x['src']=='sh' else 90),False
def retdays(x):
    if x['order'] in NORET or x.get('id') in NORETI or x['src']=='ae': return None
    try: d,m=map(int,x['date'].split('/'))
    except: return None
    od=_dt.date(2026,m,d); dl=od+_dt.timedelta(days=72 if x['src']=='sh' else 90)
    return (dl-TODAY).days
INTRANSIT={'P0-097-09112063498871206','P0-097-09112096036471206','GSH19F24800NGYX','P0-097-14609737083511206','P0-097-14609699308151206','P0-097-14609733274231206','P0-097-14609727468151206','P0-097-03584171136631005','GSH199249001100','P0-097-18076072617591091','GSH19X248000VSY','GSH19X24N00NM5K','GSH19624C00MEX3','GSH19T24900MS2G','GSH19Q24600NN8H','GSH19424S001CNR','GSH19C246001BGU','GSH19R24700MU9J','GSH19924N00MU5B','GSH19924N002QB0','GSH19924N00NB85','GSH199241001VHG','GSH1992410000HR','GSH199241002CRC'}
def money(v): return f'₪{v:,.2f}'
nav=[];secs=[];meta={};opts=[]
ALWAYS={'base'}   # v210 (Sara 14:24): her new category, there even before she moves shirts into it
for k,label in SEC:
    its=groups.get(k,[])
    if not its and k not in ALWAYS: continue
    its.sort(key=lambda x:(x['src']=='sh',x['id']))
    nav.append(f'<a href="#{k}" data-g="{G2[k]}">{label}<span>{len(its)}</span></a>'); opts.append(f'<option value="{k}">{label} ({len(its)})</option>')
    cards=[]
    for x in its:
        x['tags'],x['season']=tags(x); x['retd']=retdays(x); _rd,_ex=retdate(x); x['rdl']=_rd.isoformat() if _rd else None; x['rex']=_ex; x['transit']=x['order'] in INTRANSIT
        isd=x.get('dup') or x.get('selfdup')
        dup=(f'<span class="dup">כפול</span>' if isd else '')+('<span class="mode"><span class="dayb" role="button">חול</span><span class="shb" role="button">שבת</span></span>' if G2.get(x['cat'])=='clo' else '')+'<span class="fav" role="button" aria-label="מועדף">♡</span><span class="tr hide">בדרך</span>'
        im=f'<img data-th="{x["id"]}" alt="" loading="lazy">' if x['img'] else '<span class="noimg">אין תמונה במייל</span>'
        SL={'t1':'טמו 1','t2':'טמו 2','t3':'טמו 3','sh':'שיין','ae':'עלי אקספרס AliExpress'}[x['src']]
        sub=' · '.join(p for p in [x['color'] or '',str(x['size'] or ''),(f'×{x["qty"]}' if x['src']=='sh' and x['qty']>1 else '')] if p)
        orig=(x['price']*x['qty']) if x['src'] in ('t1','t2','t3') else (x['orig']*x['qty'] if x.get('orig') else None)
        was=f'<span class="was">מקורי <s>{money(orig)}</s></span>' if orig else (f'<span class="was">{x["qty"]} × {money(x["price"])}</span>' if x['qty']>1 else '')
        q=html.escape(' '.join(str(v) for v in [x['id'],label,x['short'],x['full'],x['color'],x['size'],SL,x['order'],x['order'].replace('P0-','PO-') if x['order'].startswith('P0-') else '',x.get('date') or '',fam(x['color']),x.get('file','')]))
        ov=orig if orig else 0
        cards.append(f'<button class="card" data-id="{x["id"]}" data-src="{x["src"]}" data-q="{q}" data-d="{dnum(x.get("date") or "")}" data-p="{x["paid"]}" data-o="{ov}" data-c="{fam(x["color"])}" data-ck="{[f for f,_ in FAM].index(fam(x["color"])) if fam(x["color"]) else 99}" data-sk="{html.escape(simkey(x))}" data-z="{szn(x["size"])}" data-i="{len(cards)}" data-tg="{"|".join(x["tags"])}" data-ss="{"|".join(x["season"])}" data-ord="{x["order"]}" data-rdl="{x["rdl"] or ""}"{" data-dup=1" if isd else ""}><span class="ph">{im}{dup}<span class="sb {x["src"]}">{SL}</span>{f'<span class="dt">{x["date"]}</span>' if x.get("date") else ''}</span><span class="t">{html.escape(x["short"])}</span><span class="m">{html.escape(sub)}</span><span class="pr"><b>{money(x["paid"])}</b>{was}</span><span class="ret"></span><span class="st"></span></button>')
        x['origt']=ov
        meta[x['id']]={k2:v for k2,v in x.items() if k2 not in ('img','lines')};meta[x['id']]['hi']=1 if x['img'] else 0
        if x['id'] in COLD: meta[x['id']]['col']={k3:COLD[x['id']][k3] for k3 in ('fc','c','sp','metal','mixed') if k3 in COLD[x['id']]}
    secs.append(f'<section id="{k}" data-g="{G2[k]}"><h2>{label} <span>{len(its)}</span></h2><div class="grid">{"".join(cards)}</div></section>')
for x in meta.values():
    x['srcl']=SRC[x['src']]
    if x['src'] in ('t1','t2','t3') and not x.get('tn'):
        o=[k for k,v in PO.items() if v==x['order']][0]; x['refund']=refunds(OS[o][2]); x['credit']=CREDIT.get(o,0); x['onet']=round(NET[o],2); x['osub']=OS[o][0]

dg=[]
for g in G:
    xs=[ID[m] for m in g]
    dg.append((xs,'בין הזמנות'))
for x in items:
    if x.get('selfdup') and not x.get('dup'): dg.append(([x],'באותה הזמנה'))
drows=[]
DT=0
for xs,kind in dg:
    n=sum(x['qty'] for x in xs); paid=sum(x['paid'] for x in xs); extra=paid-max(x['paid']/x['qty'] for x in xs)
    DT+=extra
    rd=[x['retd'] for x in xs if x.get('retd') is not None]
    r=max(rd) if rd else None
    rtxt='—' if r is None else (f'עוד {r} ימים' if r>=0 else 'עבר')
    rl=[x['rdl'] for x in xs if x.get('rdl') and x.get('retd') is not None]; rla=f' data-rdl="{max(rl)}"' if rl else ''
    drows.append(f'<tr data-ids="{" ".join(x["id"] for x in xs)}"><th><a href="#" class="dlink" data-id="{xs[0]["id"]}">{html.escape(xs[0]["short"][:38])}</a><small>{kind}</small></th><td>{n}</td><td>{money(extra)}</td><td{rla}>{rtxt}</td></tr>')
dupt=f'<p class="dnote">אם תחזירי עותק אחד מכל כפילות, אפשר לקבל חזרה עד <b>{money(DT)}</b>. זמני ההחזרה משוערים: בשיין בערך 72 יום מההזמנה, ובטמו 90 יום.</p><table class="sumt"><colgroup><col style="width:52%"><col style="width:10%"><col><col></colgroup><thead><tr><th>פריט</th><th>כמה</th><th>אפשר לקבל</th><th>החזרה</th></tr></thead><tbody>{"".join(drows)}</tbody></table>'
tT=sum(NET.values());
rows=[]
for k,label in SEC:
    its=groups.get(k,[])
    if not its: continue
    p=sum(x['paid'] for x in its); o=sum(x.get('origt',0) for x in its)
    rows.append((label,len(its),p,o))
mx=max(r[2] for r in rows)
summ=''.join(f'<tr><th>{l}</th><td>{n}</td><td>{money(p)}</td><td>{money(o-p) if o else "—"}</td></tr>' for l,n,p,o in sorted(rows,key=lambda r:-r[2]))
TO=sum(r[3] for r in rows); TP=sum(r[2] for r in rows)
summ=f'<table class="sumt"><colgroup><col style="width:36%"><col style="width:14%"><col><col></colgroup><thead><tr><th>סוג</th><th>פריטים</th><th>שולם</th><th>חסכת</th></tr></thead><tbody>{summ}</tbody><tfoot><tr><th>סה״כ</th><td>{len(items)}</td><td>{money(TP)}</td><td>{money(TO-TP)}</td></tr></tfoot></table>'
SZS=sorted({szn(x['size']) for x in items}-{''},key=lambda z:(z[-1]=='Y',['XXS','XS','S','M','L','XL','XXL'].index(z) if z in ['XXS','XS','S','M','L','XL','XXL'] else int(z.split('-')[0].rstrip('Y')))) 
cnt=collections.Counter()
for x in items: cnt[x['src']]+=x['qty'] if x['src']=='sh' else 1
tpl=open('book4_tpl.html').read()
import gentasks;gentasks.gen()
out=(tpl.replace('%%HUB%%',open('perf273.js').read()+'\n'+open('slim272.js').read()+'\n'+open('sp262.js').read()+'\n'+open('hub.js').read()+'\n'+open('hub2.js').read()+'\n'+open('studio.js').read()+'\n'+open('studio2.js').read()+'\n'+open('imgup.js').read()+'\n'+open('p5.js').read()+'\n'+open('looks2.js').read()+'\n'+open('studio3.js').read()+'\n'+open('ties.js').read()+'\n'+open('p5g.js').read()+'\n'+open('ui.js').read()+'\n'+open('v52.js').read()+'\n'+open('jw.js').read()+'\n'+open('layers68_74.js').read()+'\n'+open('layers77_84.js').read()+'\n'+open('fix85.js').read()+'\n'+open('cut89.js').read()+'\n'+open('fix91.js').read()+'\n'+open('lay91.js').read()+'\n'+open('fix93.js').read()+'\n'+open('fix96.js').read()+'\n'+open('fix99.js').read()+'\n'+open('fix100.js').read()+'\n'+open('fix102.js').read()+'\n'+open('fix114.js').read()+open('fix120.js').read()+open('fix121.js').read()+'\n'+open('orders123.js').read()+'\n'+open('fix127.js').read()+'\n'+open('fix144.js').read()+'\n'+open('fix157.js').read()+'\n'+open('fix161.js').read()+'\n'+open('fix163.js').read()+'\n'+open('fix179.js').read()+'\n'+open('tasks172.js').read()+'\n'+open('fix172.js').read()+'\n'+open('r360.js').read()+'\n'+open('d180.js').read()+'\n'+open('cat180.js').read()+'\n'+open('a11y182.js').read()+'\n'+open('search183.js').read()+'\n'+open('col184.js').read()+'\n'+open('sc185.js').read()+'\n'+open('adv187.js').read()+'\n'+open('cut8.js').read()+'\n'+open('av188.js').read()+'\n'+open('tidy198.js').read()+'\n'+open('sty199p.js').read()+'\n'+open('sty199.js').read()+'\n'+open('tie202.js').read()+'\n'+open('gpt250.js').read()+'\n'+open('pack256.js').read()+'\n'+open('nm209.js').read()+'\n'+open('base210.js').read()+'\n'+open('wore234.js').read()+'\n'+open('fix237.js').read()+'\n'+open('zip259.js').read()+'\n'+open('clean262.js').read()+'\n'+open('z277.js').read()+'\n'+open('tell282.js').read()+'\n'+open('z283.js').read()+'\n'+open('z284.js').read()+'\n'+open('z288.js').read()+'\nwindow.__perf273end&&__perf273end();').replace('%%NAV%%',''.join(nav)).replace('%%OPTS%%',''.join(opts)).replace('%%GROUPS%%','<button data-g="day">בגדי חול</button><button data-g="shab">✨ בגדי שבת</button>'+''.join(f'<button data-g="{g}">{n}</button>' for g,n,_ in GR if g!='clo')).replace('%%SECS%%','\n'.join(secs)).replace('%%DATA%%',json.dumps(meta,ensure_ascii=False,separators=(',',':')))
   .replace('%%N%%',str(len(items))).replace('%%NT1%%',str(cnt['t1'])).replace('%%NT2%%',str(cnt['t2'])).replace('%%NT3%%',str(cnt['t3'])).replace('%%NSH%%',str(cnt['sh']))
   .replace('%%NDUP%%',str(sum(1 for x in items if x.get('dup') or x.get('selfdup'))))
   .replace('%%TT%%',money(tT)).replace('%%SUMM%%',summ).replace('%%DUPT%%',dupt).replace('%%SZ%%',''.join(f'<option value="{z}">{z}</option>' for z in SZS)).replace('%%COL%%',''.join(f'<button data-c="{f}">{f}</button>' for f,_ in FAM)).replace('%%TS%%',money(sum(x['paid'] for x in items if x['src']=='sh'))).replace('%%NG%%',str(len(G))))

# ---- try-on cutouts
import glob,shutil
PUB='<SCRATCH>/build/pub'
os.makedirs(PUB+'/cut',exist_ok=True);os.makedirs(PUB+'/av',exist_ok=True)
for f in ['avatar.webp','avatar_head.webp','mask_top.png','mask_skirt.png','back.webp','back_head.webp','avatar2.webp','avatar2_head.webp']+[f+'.webp' for f in ['p5_front', 'p5_side', 'p5_back', 'p5_half', 'p5_hip', 'p5_front_head', 'p5_front_headonly', 'p5_back_head', 'p5_back_headonly','p5c_front','p5c_side','p5c_back','p5c_half','p5c_hip','p5c_front_headonly','p5c_back_headonly','p5_side_head','p5_half_head','p5_hip_head','p5c_side_head','p5c_half_head','p5c_hip_head']+['p6c_'+v for v in ['front','side','back','half','hip','front_headonly','back_headonly','side_head','half_head','hip_head','front_neck']]+['p6w_'+v for v in ['front','side','back','half','hip','front_head','back_head','front_headonly','back_headonly','side_head','half_head','hip_head','front_neck']]]+['p5_sheet.jpg','p6c_sheet1.jpg','p6c_sheet2.jpg','p6w_sheet1.jpg','p6w_sheet2.jpg']+[f'{a}_suit_{v}.png' for a in ['p6c','p6w'] for v in ['front','side','back','half','hip']]+[f'{a}_arms_{v}.webp' for a in ['p6c','p6w'] for v in ['front','side','back','half','hip']]: shutil.copy('me/'+f,PUB+'/av/'+f)
cm=json.load(open('cut/meta_part.json')) if os.path.exists('cut/meta_part.json') else {}
if os.path.exists('cut/meta.json'): cm.update(json.load(open('cut/meta.json')))
catof={x['id']:x['cat'] for x in items}
packs=collections.defaultdict(dict);CUTMETA={}
GEO=json.load(open('cut/geo.json')) if os.path.exists('cut/geo.json') else {}
for i,(w,h,mode) in cm.items():
    if i not in catof or not os.path.exists(f'cut/{i}.webp'): continue
    c=catof[i];CUTMETA[i]=[w,h,mode,c,GEO.get(i)]
    packs[c][i]='data:image/webp;base64,'+base64.b64encode(open(f'cut/{i}.webp','rb').read()).decode()
for c,p in packs.items(): json.dump(p,open(f'{PUB}/cut/{c}.json','w'))
out=out.replace('%%CUTMETA%%',json.dumps(CUTMETA)).replace('</style>',open('ui.css').read()+'\n'+open('look68_73.css').read()+'\n'+open('look77_84.css').read()+'\n'+open('fix85.css').read()+'\n'+open('fix91.css').read()+'\n'+open('lay91.css').read()+'\n'+open('fix93.css').read()+'\n'+open('orders123.css').read()+'\n'+open('r360.css').read()+'\n'+open('d180.css').read()+'\n'+open('a11y182.css').read()+'\n'+open('search183.css').read()+'\n'+open('col184.css').read()+'\n'+open('sc185.css').read()+'\n'+open('adv187.css').read()+'\n'+open('av188.css').read()+'\n'+open('tidy198.css').read()+'\n'+open('sty199.css').read()+'\n'+open('wore234.css').read()+'\n'+open('clean262.css').read()+'\n'+open('z277.css').read()+'\n'+open('tell282.css').read()+'\n'+open('z283.css').read()+'\n'+open('z284.css').read()+'\n'+open('z288.css').read()+'\n</style>',1)
shutil.copytree('a8',PUB+'/a8',dirs_exist_ok=True)
shutil.copytree('bg',PUB+'/bg',dirs_exist_ok=True)
os.makedirs(PUB+'/th',exist_ok=True)
thp=collections.defaultdict(dict)
for x in items:
    if x['img']: thp[x['cat'] or 'other'][x['id']]=x['img']
for c,p in thp.items():
    json.dump(p,open(f'{PUB}/th/{c}.json','w'),separators=(',',':'))
    open(f'{PUB}/th/{c}.js','w').write('thGot('+json.dumps(c)+','+json.dumps(p,separators=(',',':'))+')')
print('thumbs',{c:len(p) for c,p in thp.items()})
os.makedirs(PUB+'/gpt',exist_ok=True);GPTM={}
for f in sorted(os.listdir('gpt')):
    shutil.copy('gpt/'+f,PUB+'/gpt/'+f);i=f[:-5];bk=i.endswith('_back');i=i[:-5] if bk else i
    GPTM.setdefault(i,{})['b' if bk else 'f']='gpt/'+f
out=out.replace('%%GPTM%%',json.dumps(GPTM))
import datetime as _dt
VER=open('version.txt').read().strip();VDATE=_dt.date.today().strftime('%d.%m.%Y')
# v245: a8 pictures get their own version (a hash of the files) so a new site version doesn't make her phone download and redraw the avatar again
import hashlib as _hl
_h=_hl.sha1()
for _p in sorted(['a8/'+f for f in _os.listdir('a8')]+(['bg/'+f for f in _os.listdir('bg')] if _os.path.isdir('bg') else [])):
    _f=_p
    if _os.path.isfile(_p): _h.update(_f.encode()); _h.update(open(_p,'rb').read())
A8V=_h.hexdigest()[:10]
out=out.replace('%%VER%%',VER).replace('%%VDATE%%',VDATE).replace('%%A8V%%',A8V)
# v74: cache-bust avatar files – a browser that cached an older av/*_head.webp showed a double face in the side pose
import re as _re74
_AVV=open('version.txt').read().strip()
out=_re74.sub(r'(av/[A-Za-z0-9_${}.\-]*?\.(?:webp|png|jpg))(?=[\'"`])',lambda m:m.group(1)+'?v='+_AVV,out)
out=_re74.sub(r'(av/\$\{[^`\n]{0,140}?\.webp)(?=["`])',lambda m:m.group(1)+('' if '?v=' in m.group(1) else '?v='+_AVV),out)
out=out.replace("+'_front_neck.webp'","+'_front_neck.webp?v="+_AVV+"'")
# v68: minify the big script with terser (whitespace + compress, no mangling – the files patch each other's globals)
import subprocess,re as _re,os as _os
TERSER=_os.path.join(_os.path.dirname(_os.path.abspath(__file__)),'..','..','tools','node_modules','.bin','terser')
if _os.path.exists(TERSER) and _os.environ.get('NOMIN')!='1':
    m=_re.search(r'<script>\n(const D=.*?)</script>',out,_re.S)
    if m:
        js=m.group(1)
        try:
            r=subprocess.run([TERSER,'--compress','passes=2,toplevel=false,unused=false,keep_fargs=true','--mangle','toplevel=false,keep_fnames=true','--format','ascii_only=false,comments=false','--'],input=js.encode(),capture_output=True,timeout=120)
            if r.returncode==0 and len(r.stdout)>1000:
                out=out[:m.start(1)]+r.stdout.decode()+out[m.end(1):]
                print('terser ok',len(js),'->',len(r.stdout))
            else: print('terser failed',r.stderr[:300])
        except Exception as e: print('terser err',e)
print('cuts',len(CUTMETA),{c:len(p) for c,p in packs.items()})
open('<SCRATCH>/build/book.html','w').write(out)
json.dump([{k:v for k,v in x.items() if k!='img'} for x in items],open('items_all.json','w'),ensure_ascii=False)
print(sum(cnt.values()),len(items),cnt,len(out)//1024,'KB',{k:len(v) for k,v in groups.items()}, round(tT,2))

miss=collections.defaultdict(list)
for x in items:
    if x['src']=='sh' and not x['img']: miss[(x['date'],x['order'])].append(x)
json.dump({o:[(x['short'],x['color'],x['size'],x['qty']) for x in v] for (d,o),v in miss.items()},open('missing.json','w'),ensure_ascii=False)
