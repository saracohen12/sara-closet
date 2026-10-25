import json,re,sys,glob,os
TR='/root/.claude/projects/-home-claude/913a938d-2682-5fb0-9bfb-6e01fee96ea8/tool-results/'
out=json.load(open('ship/found.json')) if os.path.exists('ship/found.json') else {}
for f in sys.argv[1:]:
    d=json.load(open(f))
    if 'raw' in d:
        import base64,email
        r=d['raw']; r+='='*(-len(r)%4)
        m=email.message_from_bytes(base64.urlsafe_b64decode(r))
        h=''.join(p.get_payload(decode=True).decode(p.get_content_charset() or 'utf-8','replace') for p in m.walk() if p.get_content_type()=='text/html')
        d['subject']=str(m['subject'])
    else: h=d['htmlBody']
    toks=re.finditer(r'(GSH[0-9A-Z]{12})|src="(https?://img\.ltwebstatic\.com/v4/[^"]+)"|גודל:\s*([^<]+?)\s*<',h)
    cur=None;pend=None
    for m in toks:
        if m.group(1): cur=m.group(1)
        elif m.group(2):
            if pend:
                L=out.setdefault(cur,[])
                if not any(x[0]==pend for x in L): L.append([pend,''])
            pend=m.group(2).replace('http://','https://')
        elif m.group(3) and pend:
            L=out.setdefault(cur,[])
            if [pend,m.group(3)] not in L: L.append([pend,m.group(3)])
            pend=None
    if pend:
        L=out.setdefault(cur,[])
        if not any(x[0]==pend for x in L): L.append([pend,''])
    print(os.path.basename(f),d['subject'][:20],{k:len(v) for k,v in out.items()})
json.dump(out,open('ship/found.json','w'),ensure_ascii=False,indent=0)
