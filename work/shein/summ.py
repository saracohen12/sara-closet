exec(open('orders.py').read())
from collections import Counter
tot=sum(o[2] for o in O); print(len(O),'orders',round(tot,2))
m=Counter()
for d,n,t,it,tr in O: m[d.split('/')[1]]+=t
print({k:round(v,2) for k,v in m.items()})
def cat(s):
    k=lambda *w:any(x in s for x in w)
    if k('תינוק','לבנות','לילד','ילדים','לבנים','בייבי','Baby','4Y','10Y','2-3Y','3-8Y','4-7Y','EUR25','EUR24','EUR33'): return 'ילדים'
    if k('גברים'): return 'גברים'
    if k('כלה','חתונה','שקיות','כיסאות','רכב'): return 'חתונה/אירוע'
    if k('צעיף','מטפחת','חיג','כיסוי ראש','צעפת'): return 'צעיפים ומטפחות'
    if k('שיער','סקראנצ','גומי','מסלסל','סרט ראש'): return 'שיער'
    if k('כתונת','פיג','שמלת לילה','תחתונים','ג\'מפסוט','שמלת גוף'): return 'הלבשה תחתונה ולילה'
    if k('נעלי','מדרסים'): return 'נעליים'
    if k('חגורת','חגורה','רצועות מותן','קליפס'): return 'חגורות'
    if k('חליפה','סט','בלייזר','ז\'קט','מעיל','וסט'): return 'ז\'קטים, בלייזרים וסטים'
    if k('שמלה','שמלת'): return 'שמלות'
    if k('חצאית'): return 'חצאיות'
    if k('חולצ','טי'): return 'חולצות'
    if k('סוודר'): return 'סוודרים'
    if k('גרביונים','טייטס','גרבי'): return 'גרביונים'
    return 'אחר'
c=Counter()
for d,n,t,it,tr in O:
    for nm,v in it: c[cat(nm+' '+v)]+=1
print(c, sum(c.values()))
for d,n,t,it,tr in O:
    for nm,v in it:
        if cat(nm+' '+v)=='אחר': print(nm,v)
