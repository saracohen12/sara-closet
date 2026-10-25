import json,re,base64,io,html
from PIL import Image
r=json.load(open('items2.json'))
D=[[4,15,300],[11,14,301],[167,304],[157,241],[9,245,382],[92,334],[179,361],[34,195],[45,337],[38,368],[90,159],[50,103],[48,95],[73,82],[2,154]]
dup={}
for g in D:
    for i in g: dup[i]=len(g)
GIRLS_FILES={'acc1_13.pdf','acc1_14.pdf'}
def kid(i,x):
    if x['file'] in GIRLS_FILES or i in (129,142,143,151): return 'girls'
    return 'boys'
def fname(f):
    a,n=f[:-4].split('_'); return f'קובץ {n}' if a=='acc1' else f'חשבון נוסף {n}'
def clean(t):
    t=re.split(r'\.\.\.|…|\.\.',t)[0]
    t=re.sub(r'^[^א-ת0-9]+','',t).strip(' ,-:;|')
    for a,b in [('כנשים','לנשים'),('כבנות','לבנות'),('לכנות','לבנות'),('כצבע','בצבע'),('סבד','מבד')]: t=t.replace(a,b)
    t=re.sub(r'^\S{1,2}\s','',t) if re.match(r'^[א-ת]{1,2}\s',t) and not t.startswith(('סט','זוג')) else t
    return t
def color(v):
    c=v.split('/')[0]
    c=re.sub(r'[\[\]【】<>|]','',c).strip()
    if 'גודל' in c or len(c)<2 or len(c)>22: return ''
    return c
def ksize(v):
    m=re.search(r'(\d{1,2}-\d{1,2}|1[016]0|\b\d{1,2}\b)',v.split('גודל תווית')[-1]) if 'גודל תווית' in v else None
    return m.group(1) if m else ''
COL=[('ירוק זית','ירוק זית'),('ירוק כהה','ירוק כהה'),('ירוק שרך','ירוק'),('ירוק צבאי','ירוק'),('ירוק','ירוק'),('חום כהה','חום כהה'),('חום אדמדם','חום אדמדם'),('חום קפה','חום קפה'),('חוּם כָּהָה','חום כהה'),('קפה','קפה'),('חום','חום'),('חוּם','חום'),('נייבי','נייבי'),('ייבי','נייבי'),('כחול','כחול'),('כָחול','כחול'),('שחור','שחור'),('שָׁחוֹר','שחור'),('שחר','שחור'),('אפור','אפור'),('בז','בז\''),('חאקי','חאקי'),('חָקִי','חאקי'),('חֶקִי','חאקי'),('סגול','סגול'),('סָגוֹל','סגול'),('בורגונדי','בורגונדי'),('ורוד','ורוד'),('לבן','לבן'),('זהב','זהב'),('זֶהוּב','זהב'),('זהוב','זהב'),('כסף','כסף'),('אדום','אדום'),('משמש','משמש'),('מעורב','צבעים מעורבים'),('רב צבעוני','רב צבעוני'),('פוליכרום','רב צבעוני'),('שיבולת','בז\''),('עור','בז\'')]
def color(v):
    for a,b in COL:
        if a in v: return b
    return ''
KW=[('קרדיגן','קרדיגן'),('מעיל','מעיל'),("ז'קט","ז'קט"),('ג\'קט',"ז'קט"),('אפוד','אפודה'),('שאל','שאל'),('צעיף','צעיף'),('בלייזר','בלייזר'),('סריגה','סריגה'),('עגילים','עגילים'),('צמיד','צמיד'),('שרשרת מותניים','שרשרת מותן'),('אבזם','חגורה'),('שרשרת','שרשרת'),('תליון','שרשרת'),('תכשיט','סט תכשיטים'),('גרביונים','גרביונים'),('גרבי','גרביים'),('טייץ','טייץ'),('מגפ','מגפיים'),('סניקרס','סניקרס'),('נעלי ספורט','נעלי ספורט'),('נעלי','נעליים'),('ארנק','ארנק'),('תיק','תיק'),('קפוצ','קפוצ\'ון'),('סווטש','סווטשירט'),('סוודר','סוודר'),('חליפת שלג','חליפת שלג'),('סט','סט'),('שמלת','שמלה'),('שמלה','שמלה'),('חצאית','חצאית'),('טי','חולצה'),('חולצ','חולצה'),('חוכצ','חולצה'),('טופ','טופ'),('שכבת בסיס','חולצת בסיס'),('שככת בסיס','חולצת בסיס'),('גופיי','גופייה'),('בוקסר','בוקסרים'),('חגור','חגורה')]
DEF={'dresses':'שמלה','skirts':'חצאית','sets':'סט','tops':'חולצה','sweaters':'סוודר','outer':'קרדיגן','scarves':'צעיף','belts':'חגורה','jewelry':'תכשיט','shoes':'נעליים','bags':'תיק','hosiery':'גרביונים','girls':'בגד לבנות','boys':'בגד לבנים','men':'לגברים'}
FORCE={'dresses':'שמלה','skirts':'חצאית','tops':None,'sweaters':'סוודר'}
def name(k,t):
    if k in FORCE and FORCE[k]: return FORCE[k]
    for a,b in KW:
        if a in t: return b
    return DEF[k]
SEC=[('dresses','שמלות'),('skirts','חצאיות'),('sets','סטים וחליפות'),('tops','חולצות'),('sweaters','סוודרים'),('outer',"ז'קטים, קרדיגנים ומעילים"),('scarves','צעיפים ושאלים'),('belts','חגורות'),('jewelry','תכשיטים'),('shoes','נעליים'),('bags','תיקים'),('hosiery','גרביונים וגרביים'),('girls','בנות'),('boys','בנים'),('men','גברים')]
ID={'dresses':'dresses','skirts':'skirts','sets':'sets','tops':'tops','sweaters':'sweaters','outer':'outerwear','scarves':'scarves','belts':'belts','jewelry':'jewelry','shoes':'shoes','bags':'bags','hosiery':'hosiery','girls':'girls','boys':'boys','men':'men'}
groups={k:[] for k,_ in SEC}
for i,x in enumerate(r):
    c=x['cat']
    if c=='kids': c=kid(i,x)
    if c in groups: groups[c].append((i,x))
def img(x):
    im=Image.open('thumbs2/'+x['img']).convert('RGB'); im.thumbnail((300,300))
    b=io.BytesIO(); im.save(b,'JPEG',quality=72); return 'data:image/jpeg;base64,'+base64.b64encode(b.getvalue()).decode()
nav=[];secs=[];total=0
for k,label in SEC:
    its=groups[k]
    if not its: continue
    total+=len(its)
    nav.append(f'<a href="#{ID[k]}">{label}<span>{len(its)}</span></a>')
    cards=[]
    for i,x in its:
        full=html.escape(clean(x['title'])); t=html.escape(name(k,x['title'])); c=html.escape(color(x['var']+' '+x['title'] if k in ('jewelry','belts','scarves','bags') else x['var']))
        sz=ksize(x['var']) if k in('girls','boys') else ''
        meta=' · '.join(p for p in [c, (f'מידה {sz}' if sz else '')] if p)
        badge=f'<span class="dup">×{dup[i]} הוזמן {dup[i]} פעמים</span>' if i in dup else ''
        cards.append(f'<figure class="card"><div class="ph"><img src="{img(x)}" alt="{full}" loading="lazy">{badge}</div><figcaption><span class="t">{t}{(" · "+meta) if meta else ""}</span><span class="f">{fname(x["file"])}</span></figcaption></figure>')
    secs.append(f'<section id="{ID[k]}"><h2>{label} <span>{len(its)}</span></h2><div class="grid">{"".join(cards)}</div></section>')
tpl=open('book_tpl.html').read()
out=tpl.replace('%%NAV%%',''.join(nav)).replace('%%SECS%%','\n'.join(secs)).replace('%%TOTAL%%',str(total))
open('/tmp/claude-0/-home-claude/913a938d-2682-5fb0-9bfb-6e01fee96ea8/scratchpad/book.html','w').write(out)
print(total,len(out)//1024,'KB',{k:len(v) for k,v in groups.items()})
