import json,base64,io
from PIL import Image
r=json.load(open('thumbs.json'))
r2=json.load(open('thumbs2.json'))
def img(f,i):
    if isinstance(i,str): p='thumbs2/'+r2[int(i)]['img']
    else: p='thumbs/'+[x for x in r if x['file']==f+'.pdf'][i]['img']
    im=Image.open(p).convert('RGB'); im.thumbnail((360,360))
    b=io.BytesIO(); im.save(b,'JPEG',quality=80); return 'data:image/jpeg;base64,'+base64.b64encode(b.getvalue()).decode()
A1,A2='חשבון 1','חשבון 2'
G=[
("שמלת קטיפה שחורה מודפסת","שחור · S",3,[("acc1_1",4,A1,"13/10","Western style custom women","81.30"),("acc1_1",15,A1,"13/10","FENL Womens fashion","79.16"),("acc2_3",4,A2,"14/10","Western style custom women","85.29")],"אותה שמלה בדיוק, משני מוכרים. 3 עותקים."),
("שמלת קטיפה כחולה מודפסת","כחול · S",3,[("acc1_1",11,A1,"13/10","REDMM","82.94"),("acc1_1",14,A1,"13/10","FENL Womens fashion","84.95"),("acc2_3",5,A2,"14/10","REDMM","84.45")],"אותה שמלה בדיוק, משני מוכרים. 3 עותקים."),
("מעיל פליז עבה YTHT","שחור · S",2,[("acc2_13",0,A2,"18/10","LTFASHION","83.12"),("acc2_3",8,A2,"14/10","LTFASHION","83.12")],""),
("חצאית ארוכה מקטיפה","קפה · S",2,[("acc2_12",1,A2,"18/10","Excellent Clothing jj","64.62"),("acc2_2",5,A2,"14/10","Excellent Clothing jj","63.73")],"בקבלה כתוב \"שמלה\", אבל לפי התמונה זו חצאית. יש לך גם את אותו דגם באפור ובשחור, שאינם כפולים."),
("חצאית מידי תחרה","קפה · S",3,[("acc2_9",6,A2,"15/10","Barb Chill","74.21"),("acc2_2",9,A2,"14/10","Barb Chill","70.84"),("acc1_1","9",A1,"13/10","Cloth LanNiEr","45.44")],"העותק השלישי, מ-Cloth LanNiEr, הוא אותה תמונה ממוכר אחר, ולכן כמעט בטוח אותה חצאית. את הגרסה השחורה שלה הזמנת בנפרד, והיא לא כפולה."),
("שמלת פליסה משובצת רטרו","חום אדמדם · S",2,[("acc1_6",11,A1,"14/10","Misty Clothing","78.26"),("acc2_6",15,A2,"15/10","Misty Clothing","90.58")],""),
("סוודר ריב קליל","נייבי · S",2,[("acc2_15",0,A2,"18/10","Fenzhiyan Sweater","85.84"),("acc2_7",22,A2,"15/10","Fenzhiyan Sweater","84.17")],"הגרסה הירוקה שהזמנת היא צבע אחר, לא כפילות."),
("סוודר פולאובר עם שכבה","קפה · S",2,[("acc1_11",0,A1,"15/10","YJ Lady Sweaters","74.80"),("acc2_16",1,A2,"18/10","YJ Lady Sweaters","82.08")],"החאקי והשחור מאותו דגם אינם כפולים."),
("חולצת גלים מודפסת","צבע מעורב · S",2,[("acc1_11",11,A1,"15/10","Raojie","40.18"),("acc2_6",18,A2,"15/10","Raojie","31.45")],""),
("טי-שירט עם שרוולי תחרה","שחור · S",2,[("acc1_11",4,A1,"15/10","Elegant world","51.82"),("acc2_8",0,A2,"15/10","Elegant world","51.82")],""),
("חולצת ריב עם כפתורים","חום כהה · S",2,[("acc1_6",9,A1,"14/10","nanafuhsi","42.78"),("acc2_12",3,A2,"18/10","nanafuhsi","43.49")],""),
("שמלה כפרית צרפתית עם חגורה","חום · S",2,[("acc1_11","48",A1,"15/10","YishengFashion","94.44"),("acc1_6","95",A1,"14/10","YishengFashion","94.44")],"אותה שמלה כמו הנייבי שלמטה, בצבע חום."),
("שמלה כפרית צרפתית עם חגורה","נייבי · S",2,[("acc1_11",16,A1,"15/10","YishengFashion","92.40"),("acc1_7",5,A1,"14/10","YishengFashion","92.40")],"גם את הגרסה החומה הזמנת פעמיים (למעלה)."),
("שמלת טי-שירט מידי רטרו","חום · S",2,[("acc1_6",1,A1,"14/10","Jianzhi Clothing","78.91"),("acc1_2",2,A1,"13/10","Jianzhi Clothing","78.91")],""),
("שמלה שחורה עם שוליים מעוטרים","שחור · S",2,[("acc1_1",2,A1,"13/10","Average","67.44"),("acc2_11",3,A2,"16/10","RUIANxa","66.97")],"אותה תמונה ממוכר אחר, ולכן כמעט בטוח אותה שמלה."),
("מטען קיר מהיר 40W","לא בגד",2,[("acc1_7",20,A1,"14/10","QUE shop","28.93"),("acc1_7",21,A1,"14/10","QUE shop","34.24")],"שני מטענים זהים באותה הזמנה."),
]
def fname(f):
    a,n=f.split('_'); return f'קובץ {n}' if a=='acc1' else f'חשבון נוסף {n}'
F={'acc1_1':(788.58,1481.90),'acc1_2':(107.65,107.69),'acc1_6':(485.46,1062.81),'acc1_7':(510.03,1120.72),'acc1_11':(622.84,1233.02),
'acc2_2':(533.18,907.41),'acc2_3':(453.29,893.92),'acc2_6':(285.13,565.86),'acc2_7':(686.96,1248.52),'acc2_8':(253.86,409.16),'acc2_9':(479.03,752.78),
'acc2_11':(219.02,282.56),'acc2_12':(344.34,497.87),'acc2_13':(290.56,424.37),'acc2_15':(500.09,790.64),'acc2_16':(282.44,444.19)}
def real(f,p): n,t=F[f]; return float(p)*n/t
cards=[]
extra=0;extras=0
for t,v,n,its,note in G:
    ps=sorted(real(x[0],x[5]) for x in its); extra+=sum(ps[1:]); extras+=n-1
    cells=''.join(f'''<figure class="it"><img src="{img(f,i)}" alt="{t}" loading="lazy"><figcaption><span class="acc a{1 if a==A1 else 2}">{a}</span><span class="d">{d}</span><span class="fn">{fname(f)}</span><span class="s">{s}</span><span class="real">שילמת בפועל <b>₪{real(f,p):.2f}</b></span><span class="p">מחיר בקבלה ₪{p}</span></figcaption></figure>''' for f,i,a,d,s,p in its)
    cards.append(f'''<section class="grp"><header><h2>{t}</h2><span class="var">{v}</span><span class="cnt">×{n}</span></header><div class="row c{n}">{cells}</div>{f'<p class="note">{note}</p>' if note else ''}</section>''')
html=open('tpl.html').read().replace('%%CARDS%%','\n'.join(cards)).replace('%%EXTRA%%',f'{extra:,.0f}').replace('%%EXTRAS%%',str(extras)).replace('%%GROUPS%%',str(len(G)))
open('/tmp/claude-0/-home-claude/913a938d-2682-5fb0-9bfb-6e01fee96ea8/scratchpad/dups.html','w').write(html)
print(extra,extras,len(html)//1024,'KB')
