// v384 (Sara 13/11 "לרכז את כל מה שאני צריכה להחזיר לשיין, לטמו, לעלי אקספרס – כפתור הדפסה… לבחור לפי הזמנה את המוצרים שבחרתי להחזיר…
//  לראות את המוצר בתמונה די גדולה, המחיר וכמה אמור לחזור לי… על כל הזמנה בנפרד, כי הם פיצלו כל הזמנה לחשבונות קטנים"):
//  "🖨 הדפסת החזרות": every order that has items marked ↩ to return (and not sent yet), each order with its own checkbox and every item with its own;
//  a print page – one block per order (its own page): the picture, the name, colour and size, what it cost, what should come back, and the order's total.
//  Printing: window.print(); and "📄 לשמור קובץ להדפסה" saves the same page as an HTML file (the pictures inside) that opens and prints from any phone.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v384 '+w+': '+(e&&(e.code||e.message)||e));
const H=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast=m=>(window.toast||(()=>{}))(m);
const ACC={t1:'טמו 1',t2:'טמו 2',t3:'טמו 3',sh:'שיין',ae:'עלי אקספרס'};
const SHOP=[['','הכל'],['sh','שיין'],['t','טמו'],['ae','עלי אקספרס']];
const shopOf=s=>s=='sh'?'sh':s=='ae'?'ae':'t';
const I=id=>(typeof IT=='object'&&IT[id])||{};
const todo=id=>{const i=I(id);return i.s=='ret'&&!i.rsent&&!i.rnr&&!i.refunded};
const nis=v=>'₪'+(Math.round((+v||0)*100)/100).toFixed(2);
const back=id=>{const x=D[id]||{};return +(x.paid!=null?x.paid:x.price)||0};   // the same "צפוי לחזור" as the returns tab in the hub
const nm=id=>I(id).tname||(D[id]||{}).short||'מוצר';
const onum=(x,k)=>x.src=='sh'||x.src=='ae'?k:String(k).replace(/^P0-/,'PO-');
const dl_=x=>x.rdl?String(x.rdl).split('-').reverse().slice(0,2).join('/'):'';
const dk=d=>{const [dd,mm]=String(d||'0/0').split('/');return ((+mm||0)<6?(+mm||0)+12:(+mm||0))*40+(+dd||0)};
let shop='',dlg=null,SEL={},OFF={},MORE={},SEP=true;
try{SEP=localStorage.getItem('prt384sep')!='0'}catch(_){}
function orders(){const O={};Object.keys(D).forEach(id=>{const x=D[id];if(!x||!x.order)return;(O[x.order]=O[x.order]||[]).push(id)});
 return Object.keys(O).filter(k=>O[k].some(todo)).filter(k=>!shop||shopOf(D[O[k][0]].src)==shop).sort((a,b)=>dk(D[O[b][0]].date)-dk(D[O[a][0]].date)).map(k=>({k,ids:O[k]}))}
const picked=(k,id)=>SEL[k+'|'+id]!=null?SEL[k+'|'+id]:todo(id);
const chosen=o=>OFF[o.k]?[]:o.ids.filter(id=>picked(o.k,id));
const src=id=>{try{return (typeof img=='function'&&img(id))||(typeof TH=='object'&&TH[id])||''}catch(_){return ''}};
async function needThumbs(L){try{if(typeof thLoad!='function')return;const cats=new Set(L.flatMap(o=>o.ids).map(id=>D[id]&&D[id].cat).filter(Boolean));await Promise.all([...cats].map(c=>thLoad(c).catch(()=>{})))}catch(e){ERR('th',e)}}
function paint(){if(!dlg)return;const L=orders();const all=L.map(o=>({o,ids:chosen(o)})).filter(r=>r.ids.length);const sum=all.reduce((t,r)=>t+r.ids.reduce((s,id)=>s+back(id),0),0),n=all.reduce((t,r)=>t+r.ids.length,0);
 const cnt=k=>Object.keys(D).filter(id=>todo(id)&&(!k||shopOf(D[id].src)==k)).length;
 dlg.querySelector('.p384b').innerHTML=`
 <div class="p384f" role="group" aria-label="חנות">${SHOP.map(([k,t])=>`<button type="button" data-p384shop="${k}" aria-pressed="${shop==k}">${t} <small>${cnt(k)}</small></button>`).join('')}</div>
 <p class="p384s">כאן כל מה שסימנת "↩ מחזירה" ועוד לא נשלח, מסודר לפי הזמנה. מסמנים מה להדפיס – כל הזמנה יוצאת בנפרד, עם התמונות, המחיר וכמה אמור לחזור.</p>
 ${L.length?L.map(o=>{const x=D[o.ids[0]],ret=o.ids.filter(todo),rest=o.ids.filter(id=>!todo(id)),on=!OFF[o.k],ch=chosen(o),tot=ch.reduce((s,id)=>s+back(id),0);
  const row=id=>`<label class="p384i"><input type="checkbox" data-p384i="${H(o.k)}|${H(id)}"${picked(o.k,id)?' checked':''}${on?'':' disabled'}><span class="ph">${src(id)?`<img src="${H(src(id))}" alt="">`:'📦'}</span><span class="tx"><b>${H(nm(id))}</b><small>${H([x.src&&D[id].color,D[id].size].filter(Boolean).join(' · '))}</small><small>שולם ${nis(back(id))}${todo(id)?'':' · לא סומן להחזרה'}</small></span></label>`;
  return `<section class="p384o${on?'':' off'}"><label class="p384oh"><input type="checkbox" data-p384o="${H(o.k)}"${on?' checked':''}><span><b>${H(ACC[x.src]||'')} · ${H(x.date||'')}</b><small>מספר הזמנה: <bdi dir="ltr">${H(onum(x,o.k))}</bdi>${dl_(x)?' · להחזרה עד '+H(dl_(x)):''}</small></span><em>${ch.length} · ${nis(tot)}</em></label>
   <div class="p384l">${ret.map(row).join('')}${MORE[o.k]?rest.map(row).join(''):''}</div>${rest.length?`<button type="button" class="p384m" data-p384more="${H(o.k)}">${MORE[o.k]?'− להסתיר את שאר המוצרים':'➕ עוד מוצר מההזמנה הזו ('+rest.length+')'}</button>`:''}</section>`}).join(''):'<p class="p384e">אין כרגע מוצרים שסימנת להחזרה'+(shop?' בחנות הזו':'')+'. מסמנים "↩ מחזירה" במוצר, והוא מופיע כאן.</p>'}
 <label class="p384sep"><input type="checkbox" data-p384sep${SEP?' checked':''}> כל הזמנה בעמוד נפרד</label>`;
 dlg.querySelector('.p384t').innerHTML=`<span>${all.length} הזמנות · ${n} מוצרים<br><b>צפוי לחזור: ${nis(sum)}</b></span><span class="p384a"><button type="button" class="p384go" data-p384print${n?'':' disabled'}>🖨 להדפיס</button><button type="button" class="p384sv" data-p384save${n?'':' disabled'}>📄 לשמור קובץ</button></span>`}
function sheet(dataSrc){const L=orders().map(o=>({o,ids:chosen(o)})).filter(r=>r.ids.length);const grand=L.reduce((t,r)=>t+r.ids.reduce((s,id)=>s+back(id),0),0);
 const today=new Date().toLocaleDateString('he-IL');
 const blocks=L.map(({o,ids},i)=>{const x=D[o.ids[0]],tot=ids.reduce((s,id)=>s+back(id),0),cost=ids.reduce((s,id)=>s+(+D[id].price||0),0);
  return `<section class="pg${SEP&&i?' br':''}"><header><h2>${H(ACC[x.src]||'')} – החזרה</h2><p>מספר הזמנה: <bdi dir="ltr">${H(onum(x,o.k))}</bdi></p><p>תאריך הזמנה: ${H(x.date||'')}${dl_(x)?' · להחזרה עד '+H(dl_(x)):''} · ${ids.length} מוצרים להחזרה</p></header>
  <table><thead><tr><th>תמונה</th><th>מוצר</th><th>מחיר</th><th>צפוי לחזור</th></tr></thead><tbody>${ids.map(id=>{const d=D[id],s=dataSrc(id);return `<tr><td class="im">${s?`<img src="${H(s)}" alt="">`:''}</td><td><b>${H(nm(id))}</b><br><span>${H([d.color,d.size].filter(Boolean).join(' · '))}</span>${d.qty>1?'<br><span>כמות: '+d.qty+'</span>':''}</td><td>${nis(d.price)}</td><td><b>${nis(back(id))}</b></td></tr>`}).join('')}</tbody>
  <tfoot><tr><td colspan="2">סה"כ להזמנה הזו</td><td>${nis(cost)}</td><td><b>${nis(tot)}</b></td></tr></tfoot></table></section>`}).join('');
 return `<div class="p384sheet" dir="rtl"><div class="top"><h1>רשימת החזרות</h1><p>הודפס ${H(today)} · ${L.length} הזמנות · ${L.reduce((t,r)=>t+r.ids.length,0)} מוצרים · צפוי לחזור בסך הכל: <b>${nis(grand)}</b></p><p class="nt">"צפוי לחזור" = מה ששילמת על המוצר אחרי הנחות. חלק מההחזר יכול לחזור כקרדיט בחנות.</p></div>${blocks}</div>`}
const CSS=`.p384sheet{font-family:Arial,"Segoe UI",sans-serif;color:#222;direction:rtl}.p384sheet h1{font-size:22px;margin:0 0 4px}.p384sheet .top p{margin:2px 0;font-size:13px}.p384sheet .nt{color:#666;font-size:11px}
.p384sheet .pg{margin-top:18px;break-inside:auto}.p384sheet .pg.br{break-before:page;page-break-before:always}.p384sheet header{border-bottom:2px solid #333;margin-bottom:8px;padding-bottom:4px}.p384sheet h2{font-size:18px;margin:0}.p384sheet header p{margin:2px 0;font-size:13px}
.p384sheet table{width:100%;border-collapse:collapse;font-size:13px}.p384sheet th{background:#eee;text-align:right;padding:6px;border:1px solid #bbb}.p384sheet td{padding:6px;border:1px solid #bbb;vertical-align:middle}.p384sheet tr{break-inside:avoid;page-break-inside:avoid}
.p384sheet td.im{width:3.6cm;text-align:center}.p384sheet td.im img{width:3.4cm;height:4.2cm;object-fit:contain;display:block;margin:auto}.p384sheet td span{color:#555;font-size:12px}.p384sheet tfoot td{background:#f6f6f6;font-weight:700}`;
async function dataUrl(u){if(!u||/^data:/.test(u))return u;try{const b=await (await fetch(u)).blob();return await new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.onerror=()=>r('');f.readAsDataURL(b)})}catch(_){return ''}}
async function doPrint(){try{let p=document.getElementById('prt384p');if(!p){p=document.createElement('div');p.id='prt384p';document.body.append(p)}
 p.innerHTML='<style>'+CSS+'</style>'+sheet(src);document.body.classList.add('prt384');const done=()=>{document.body.classList.remove('prt384');window.removeEventListener('afterprint',done)};window.addEventListener('afterprint',done);
 const wasOpen=dlg&&dlg.open;if(wasOpen)dlg.close();await Promise.all([...p.querySelectorAll('img')].map(im=>im.complete?0:new Promise(r=>{im.onload=im.onerror=r;setTimeout(r,3000)})));
 try{window.print()}catch(e){toast('ההדפסה לא נפתחה כאן – לחצי "📄 לשמור קובץ" ותדפיסי ממנו')}setTimeout(()=>{done();if(wasOpen&&dlg&&!dlg.open)dlg.showModal()},800)}catch(e){ERR('print',e);toast('לא הצלחתי להדפיס – נסי "📄 לשמור קובץ"')}}
async function doSave(){try{toast('מכינה את הקובץ…');const L=orders().flatMap(o=>chosen(o));const M={};await Promise.all(L.map(async id=>{M[id]=await dataUrl(src(id))}));
 const html='<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>רשימת החזרות</title><style>body{margin:16px;background:#fff}@page{margin:12mm}'+CSS+'</style></head><body>'+sheet(id=>M[id]||'')+'</body></html>';
 const blob=new Blob([html],{type:'text/html'});const dl=await window.claude?.use?.('downloads');const fn='החזרות-'+new Date().toISOString().slice(0,10)+'.html';
 if(dl){await dl.save({filename:fn,data:blob});toast('📄 הקובץ נשמר – פותחים אותו ומדפיסים')}else{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;document.body.append(a);a.click();a.remove()}}catch(e){toast(e&&e.code=='declined'?'בוטל':'לא הצלחתי לשמור');ERR('save',e)}}
async function open(sh){try{if(sh!=null)shop=sh;if(!dlg){dlg=document.createElement('dialog');dlg.id='prt384';dlg.dir='rtl';dlg.setAttribute('aria-labelledby','p384h');document.body.append(dlg);
  dlg.innerHTML=`<div class="p384hd"><h2 id="p384h">🖨 הדפסת החזרות</h2><button type="button" class="p384x" aria-label="סגירה">✕</button></div><div class="p384b"></div><div class="p384t"></div>`;
  dlg.addEventListener('click',e=>{if(e.target===dlg||e.target.closest('.p384x'))return dlg.close();const b=e.target.closest('button');if(!b)return;
   if(b.dataset.p384shop!=null){shop=b.dataset.p384shop;paint();needThumbs(orders()).then(paint);return}
   if(b.dataset.p384more){MORE[b.dataset.p384more]=!MORE[b.dataset.p384more];paint();return}
   if(b.hasAttribute('data-p384print'))return doPrint();if(b.hasAttribute('data-p384save'))return doSave()});
  dlg.addEventListener('change',e=>{const t=e.target;if(t.dataset.p384o){OFF[t.dataset.p384o]=!t.checked}else if(t.dataset.p384i){SEL[t.dataset.p384i]=t.checked}else if(t.hasAttribute('data-p384sep')){SEP=t.checked;try{localStorage.setItem('prt384sep',SEP?'1':'0')}catch(_){}}paint()})}
 paint();if(!dlg.open)dlg.showModal();await needThumbs(orders());paint()}catch(e){ERR('open',e)}}
// the button: in the hub's returns ("החזרות") and in the orders window list
function btn(cls){const b=document.createElement('button');b.type='button';b.className='p384btn '+cls;b.innerHTML='<span>🖨 הדפסת החזרות – לפי הזמנה</span><i aria-hidden="true">‹</i>';b.onclick=()=>open((typeof R340!='undefined'&&R340.acc)?shopOf(R340.acc):'');return b}
setInterval(()=>{try{document.querySelectorAll('h3').forEach(h=>{if(h.textContent.trim()!='החזרות'||h.nextElementSibling&&h.nextElementSibling.classList.contains('p384btn'))return;const p=h.nextElementSibling;(p&&p.tagName=='P'?p:h).after(btn('hub'))});
 const d=document.getElementById('ord123');if(d&&d.open){const b0=d.querySelector('.o3b');if(b0&&!b0.querySelector('.o3oh')&&!b0.querySelector(':scope>.p384btn')){const at=b0.querySelector(':scope>.s358o')||b0.querySelector(':scope>.c349')||b0.querySelector(':scope>.o3q');const b=btn('ord');if(at)at.after(b);else b0.prepend(b)}}}catch(e){ERR('btn',e)}},800);
window.PRT384={open};
})();
