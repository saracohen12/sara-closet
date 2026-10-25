import json
exec(open('inv_all.py').read())
U=json.load(open('allurls.json')); F=json.load(open('ship/found.json'))
def norm(s): return s.replace('ָ','').replace('ָ','').replace(' ','').lower()
res={}
for o,urls in U.items():
    k=[k for k in I if o.endswith(k)][0]; d,L=I[k]
    known=set(urls)
    new=[(u,v) for u,v in F.get(o,[]) if u not in known]
    if len(L)<=len(urls): continue
    print('==',k,len(L),'have',len(urls),'new',len(new))
    for j in range(len(urls),len(L)):
        n,c,s,p,cat=L[j]
        cand=[(u,v) for u,v in new if norm(c or '') in norm(v) and (not s or norm(str(s)) in norm(v))]
        print(' ',j,n[:40],'|',c,s,'->',[v for u,v in cand])
    for u,v in new: print('   new:',v,u[-50:])
