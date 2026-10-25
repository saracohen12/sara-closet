import json,re
r=json.load(open('thumbs2_ocr.json'))
def cat(t):
    k=lambda *w: any(x in t for x in w)
    if k('לגבר','לגברים','גברית','בוקסר'): return 'men'
    if k('לבנות','לכנות','לילדות','לבנים','לכנים','לילדים','לתינוק','לנערים','לנערות','תינוק','ילדים','נערים','לתינוקות'): return 'kids'
    if k('מטען','כבל','מקרן','מפוח','מחזיק טלפון','מעמד טלפון','מאזני','חוט תפירה','סיכות','מספריים','תפירה','מחט','כריכת','ספר צביעה','כיסויי דרכון','נחש','מכבש','כף ','מתלה','סרט הדבקה','סרט מדידה','קופסת','תיק אחסון','מפתחות','שעווה','גוזז','פינצטות','מצביט','ציפורניים','קרם'): return 'other'
    if k('שפתיים','שפתון','איפור','מסקרה','אייליינר','צלליות','ריסים','קונסילר','מברשות','גלוס','עפרונות','קוסמטיקה'): return 'makeup'
    if k('שיער','קליפס','גומיות','סרטי ראש','מסרק'): return 'hair'
    if k('חגורה','חגורת','חגורות','מותניים'): return 'belts'
    if k('שרשרת','עגילים','צמיד','תליון','תכשיט','נכשיט','מצופה זהב'): return 'jewelry'
    if k('נעלי','מגפ','סניקרס'): return 'shoes'
    if k('גרביונים','גרבי','טייץ','גרביים','גרכיונים','גרכי','כיונים'): return 'hosiery'
    if k('תחתונ','חזיי','חזיית','בטן','ביגוד נשים איכותי','בוקסר'): return 'under'
    if k('תיק','ארנק'): return 'bags'
    if k('צעיף','שאל','צניף'): return 'scarves'
    if k('מעיל','ז\'קט','קרדיגן','אפודה','אפוד','ביגוד חורף','סריגת תחרה','בלייזר','גופיית','סווטשרט','סווטשירט','קפוצ\'ון','בגדי אם','חליפת'): return 'outer'
    if k('סט ',' סט'): return 'sets'
    if k('שמלת','שמלה','שמלות'): return 'dresses'
    if k('חצאית'): return 'skirts'
    if k('סוודר','פולאובר','סריג'): return 'sweaters'
    if k('חולצ','טי-שירט','טי שירט','טופ','שכבת בסיס','שכבה','ביגוד','טריקו'): return 'tops'
    return '?'
for i,x in enumerate(r):
    L=[l for l in x['ocr'].split('\n') if l.strip()]
    x['title']=L[0] if L else ''; x['var']=L[1] if len(L)>1 else ''
    x['cat']=cat(x['title'])
json.dump(r,open('items2.json','w'),ensure_ascii=False,indent=0)
from collections import Counter; print(Counter(x['cat'] for x in r))
for i,x in enumerate(r):
    if x['cat']=='?': print(i,x['file'],x['title'][:60])
O={0:'shoes',13:'under',18:'dresses',23:'other',24:'other',27:'other',43:'tops',59:'skirts',66:'other',80:'other',86:'tops',118:'other',140:'other',144:'other',175:'bags',204:'sweaters',228:'jewelry',244:'outer',293:'outer',335:'tops',341:'belts',355:'belts',361:'sweaters',364:'tops',375:'other'}
import os
if os.path.exists('over.json'): O.update({int(k):v for k,v in json.load(open('over.json')).items()})
for i,v in O.items(): r[i]['cat']=v
json.dump(r,open('items2.json','w'),ensure_ascii=False,indent=0)
