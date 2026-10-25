import json,re,sys,os
byo=json.load(open('byorder.json')) if os.path.exists('byorder.json') else {}
for f in sys.argv[1:]:
    d=json.load(open(f)); h=d.get('htmlBody','')
    o=re.search(r'GSH[0-9A-Z]{12}',h).group(0)
    toks=re.findall(r'<img src="(https?://img\.ltwebstatic\.com/[^"]+)"|מק"ט:\s*([a-z]{2}[0-9a-z]+)',h)
    lst=[];cur=None
    for u,s in toks:
        if u: cur=u
        elif s: lst.append((s,cur)); cur=None
    byo[o]=lst; print(o,len(lst),sum(1 for s,u in lst if u))
json.dump(byo,open('byorder.json','w'),indent=0)
