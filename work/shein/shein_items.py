import io,contextlib,json
exec(open('orders.py').read())
with contextlib.redirect_stdout(io.StringIO()): exec(open('summ.py').read())
exec(open('inv_4oct.py').read())
O=[(d,n,t,(INV if n=='GSH1SP24Y00MW6D' else it),tr) for d,n,t,it,tr in O]
C={
'0VSY':['boys','boys','boys','girls'],
'NM5K':['outer']*4+['tops']*2,
'MEX3':['tops','girls','tops','skirts','dresses','tops'],
'MS2G':['men','men'],
'NN8H':['tops','outer','skirts'],
'1CNR':['skirts','dresses','hair','dresses','dresses',None],
'1BGU':['hosiery','skirts','dresses','dresses','dresses','dresses'],
'MW6D':['night','night','night','dresses','skirts','skirts','tops','tops','tops','tops','tops','outer','belts','outer','tops','sweaters','night','night','night','night','night','belts','dresses','scarves','scarves','scarves','other','outer','skirts','sweaters','dresses','other','skirts','dresses','skirts','tops','tops','dresses','night'],
'N4WS':['sets'],
'1UVQ':['dresses']*5,
'1YVN':['tops','scarves','scarves','dresses','sets','skirts'],
'172G':['skirts']*3,
'17QJ':['other','scarves','scarves','belts','scarves','scarves'],
'0UKP':['girls','girls'],
'MSCW':['tops','skirts','scarves','scarves','other','girls'],
'1A5K':['other'],
'N4NA':['scarves']*4,
'NTMJ':['dresses','dresses','sets','dresses','dresses'],
'MX0C':['boys']+['scarves']*5,
'MLL1':['night']*6,
'M39K':['hair']*6,
'M3PB':['boys','belts','boys','boys','boys'],
'1RND':[None]*6,
'NAA5':['scarves','scarves','tops','belts','scarves','skirts'],
'11QS':['tops','tops','tops','scarves','scarves','scarves'],
'MLFE':['scarves','scarves','scarves','dresses','scarves','scarves'],
'1VSH':['night','dresses','dresses','dresses','dresses'],
'2MH3':['dresses'],
'M7C1':['shoes','boys','boys','girls','girls','girls'],
'16D0':['bags','hair','other','other','other','other'],
'0Y74':['dresses','dresses','dresses','hair','scarves','belts'],
'0MNA':['dresses'],
}
B64=set(json.load(open('b64.json')))
out=[]
for d,n,t,it,tr in O:
    cs=C[n[-4:]]; assert len(cs)==len(it),(n,len(cs),len(it))
    for j,x in enumerate(it):
        if cs[j] is None: continue
        out.append(dict(order=n,date=d,total=t,n=len(it),trunc=tr,j=j,name=x[0],var=x[1],price=(x[2] if len(x)>2 else None),cat=cs[j],img=(f'{n}_{j}' if f'{n}_{j}' in B64 else None)))
json.dump(out,open('shein_items.json','w'),ensure_ascii=False,indent=0)
from collections import Counter; print(len(out),Counter(o['cat'] for o in out))
