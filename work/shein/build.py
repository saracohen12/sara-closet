import html,json
B64=json.load(open('b64.json'))
exec(open('orders.py').read())

import io,contextlib
with contextlib.redirect_stdout(io.StringIO()): exec(open('summ.py').read())
exec(open('inv_4oct.py').read())
O=[(d,n,t,(INV if n=='GSH1SP24Y00MW6D' else it),(False if n=='GSH1SP24Y00MW6D' else tr)) for d,n,t,it,tr in O]
from collections import Counter
REF={"GSH19424S001CNR":("הוחזרו ₪142.50 על מסלסל השיער הכפול. ההחזר הוקטן כי ההזמנה ירדה מתחת למינימום של הקופון.",142.50),
     "GSH1SM249001RND":("ההזמנה חזרה לשיין (לא נאספה) והוחזר הסכום המלא, ₪288.32. הפריטים האלה לא אצלך.",288.32)}
NOTE={"GSH1R824B00N4WS":"שולם ₪0, כנראה מתנה או קרדיט.",
      "GSH1RL24A001VSH":"אותה שמלת חולצה חומה הוזמנה פעמיים: במידה S ובמידה M.",
      "GSH19T24900MS2G":"סוודרים לגברים.","GSH1SP24Y00MW6D":"הרשימה המלאה, 39 פריטים עם המחיר ששולם בפועל, לקוחה מהחשבונית. חצאית הקפלים Modelyn בנייבי S הוזמנה שוב ב-17/10.","GSH19624C00MEX3":"חצאית הקפלים Modelyn בנייבי S כבר הוזמנה ב-4/10. זו כפילות."}
MON={'8':'אוגוסט','9':'ספטמבר','10':'אוקטובר'}
def size(v):
    p=v.rsplit('-',1)
    return (p[0],p[1]) if len(p)==2 and len(p[1])<=8 else (v,'')
c=Counter()
for d,n,t,it,tr in O:
    for x in it: c[cat(x[0]+' '+x[1])]+=1
refund=sum(r[1] for r in REF.values()); items=sum(len(o[3]) for o in O)
secs=[]
for mo in ['10','9','8']:
    os_=[o for o in O if o[0].split('/')[1]==mo]
    rows=[]
    for d,n,t,it,tr in os_:
        lis=''.join(f'<li>{("<img class=th loading=lazy alt=\"\" src=\"data:image/jpeg;base64,"+B64[n+"_"+str(j)]+"\">") if (n+"_"+str(j)) in B64 else "<span class=th></span>"}<div class=tx><span class="nm">{html.escape(x[0])}</span><span class="cl">{html.escape(size(x[1])[0])}</span>{f"<span class=sz>{html.escape(size(x[1])[1])}</span>" if size(x[1])[1] else ""}{f"<span class=pr>₪{x[2]:.2f}</span>" if len(x)>2 else ""}</div></li>' for j,x in enumerate(it))
        flags=''
        if tr: flags+='<span class="flag warn">ייתכן שחסרים פריטים</span>'
        if any(len(x)>2 for x in it): flags+='<span class="flag ok">מלא, עם מחירים</span>'
        if n in REF: flags+='<span class="flag ok">קיבלת החזר</span>'
        note=' '.join(x for x in [REF.get(n,("",0))[0],NOTE.get(n,"")] if x)
        rows.append(f'''<article class="ord"><header><div class="dt">{d}</div><div class="no">{n}</div><div class="amt">₪{t:,.2f}</div></header>{f'<div class="flags">{flags}</div>' if flags else ''}{f'<p class="note">{html.escape(note)}</p>' if note else ''}<ul>{lis}</ul></article>''')
    secs.append(f'<section><h2>{MON[mo]} <span>{len(os_)} הזמנות · ₪{sum(o[2] for o in os_):,.2f}</span></h2><div class="list">{"".join(rows)}</div></section>')
cats=''.join(f'<li><b>{v}</b>{html.escape(k)}</li>' for k,v in c.most_common() if k!='אחר')
tpl=open('tpl.html').read()
out=(tpl.replace('%%SECS%%','\n'.join(secs)).replace('%%N%%',str(len(O))).replace('%%TOT%%',f'{tot:,.2f}')
     .replace('%%REF%%',f'{refund:,.2f}').replace('%%NET%%',f'{tot-refund:,.2f}').replace('%%ITEMS%%',str(items)).replace('%%CATS%%',cats))
open('/tmp/claude-0/-home-claude/913a938d-2682-5fb0-9bfb-6e01fee96ea8/scratchpad/shein.html','w').write(out); print(tot,refund,items)
