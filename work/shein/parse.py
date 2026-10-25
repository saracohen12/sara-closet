import json,re,sys,os
store=json.load(open('skuimg.json')) if os.path.exists('skuimg.json') else {}
byo=json.load(open('byorder.json')) if os.path.exists('byorder.json') else {}
for f in sys.argv[1:]:
    d=json.load(open(f)); h=d.get('htmlBody','')
    order=re.search(r'GSH[0-9A-Z]{12}',h)
    # pair each product img with following SKU
    for m in re.finditer(r'<img src="(https?://img\.ltwebstatic\.com/[^"]+)"(.*?)מק"ט:\s*([a-z]{2}[0-9a-z]+)',h,re.S):
        url,mid,sku=m.groups()
        if '<img src=' in mid: # closer img inside: take last
            url=re.findall(r'<img src="(https?://img\.ltwebstatic\.com/[^"]+)"',m.group(0))[-1]
        store[sku]=url
    lst=[]
    for m in re.finditer(r'<img src="(https?://img\.ltwebstatic\.com/[^"]+)"',h):
        pass
    print(f[-30:],order.group(0) if order else None,len(re.findall('מק"ט:',h)))
json.dump(store,open('skuimg.json','w'),indent=0); print(len(store))
