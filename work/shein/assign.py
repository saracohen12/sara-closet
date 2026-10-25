import json,re
exec(open('inv_all.py').read())
U=json.load(open('allurls.json')); F=json.load(open('ship/found.json'))
def norm(s): return re.sub(r'[֑-ׇ\s]','',s or '').lower()
MULTI=('צבעים','צבעוני','ססגוני','מעורב')
def colmatch(c,v):
    c=norm(c);v=norm(v)
    if not c: return True
    if c in v: return True
    if any(m in c for m in MULTI) and ('ריבויצבעים' in v or 'סְסגוֹנִיוּת' in v or 'ססגוניות' in v): return True
    return False
def var_ok(c,s,v):
    if not v: return False
    vs=norm(v)
    if s and norm(str(s)) not in vs: return False
    return colmatch(c,v)
A={}; amb={}
for o,urls in U.items():
    k=[k for k in I if o.endswith(k)][0]; d,L=I[k]
    if len(L)<=len(urls): continue
    known=set(urls)
    pool=[(u,v) for u,v in F.get(o,[]) if u not in known]
    used=set(); key2u={}
    changed=True
    miss=list(range(len(urls),len(L)))
    while changed:
        changed=False
        for j in miss:
            if (k,j) in A: continue
            n,c,s,p,cat=L[j]; kk=(n,c,s)
            if kk in key2u: A[(k,j)]=key2u[kk]; changed=True; continue
            cand=[u for u,v in pool if u not in used and var_ok(c,s,v)]
            if len(cand)==1:
                A[(k,j)]=cand[0]; used.add(cand[0]); key2u[kk]=cand[0]; changed=True
    rest=[j for j in miss if (k,j) not in A]
    left=[(u,v) for u,v in pool if u not in used]
    if rest and left: amb[k]={'lines':[(j,)+tuple(L[j][:3]) for j in rest],'imgs':left}
json.dump({f'{k}|{j}':u for (k,j),u in A.items()},open('ship/assign.json','w'),ensure_ascii=False,indent=0)
json.dump(amb,open('ship/amb.json','w'),ensure_ascii=False,indent=0)
print(len(A),'assigned')
for k,a in amb.items():
    print('==',k)
    for l in a['lines']: print('  L',l)
    for i,(u,v) in enumerate(a['imgs']): print('  I',i,v)
