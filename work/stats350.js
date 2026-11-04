// v350 "📊 מספרים וסיכומים" – live (Sara 4/11: the old sheet had numbers baked in when the site was built and they never moved).
// Everything here is counted now, from D (the catalog) and IT (her marks): closet, on the way, returns, money, by store / category / month, wearing, avatar.
// One colour per chart (bars = how much), the number written next to every bar (so it reads as a table too), hover/tap shows the exact value.
// The old full tables are still one tap away ("הטבלאות המלאות").
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v350st '+w+': '+(e&&e.message||e));
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const I=id=>(typeof IT=='object'&&IT&&IT[id])||{};
const ACC={t1:'טמו 1',t2:'טמו 2',t3:'טמו 3',sh:'שיין',ae:'עלי אקספרס'};
const MON=['','ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
const nis=v=>'₪'+Math.round(v||0).toLocaleString('he-IL');
const cat=id=>{try{return curCat(id)}catch(_){return (D[id]||{}).cat||''}};
let CN=null;const catName=c=>{if(!CN){CN={};document.querySelectorAll('section[id] > h2').forEach(h=>{const t=h.firstChild&&h.firstChild.textContent.trim();if(t)CN[h.parentElement.id]=t})}return CN[c]||c};
const live=id=>{const i=I(id);return !i.gen&&!i.oos&&i.s!='ret'&&i.s!='give'&&!i.out};
let ORDA={};try{ORDA=ORD}catch(_){}
const onWay=id=>{const i=I(id),x=D[id]||{};if(i.got=='y'||i.miss||i.oos)return false;if(i.got=='n')return true;return !!x.transit&&!((ORDA[x.order]||{}).arrived)};
function bars(rows,unit){const mx=Math.max(1,...rows.map(r=>r[1]));
 return `<div class="st350b" role="table">${rows.map(([n,v,sub])=>`<div class="st350r" role="row" title="${es(n)}: ${es(unit=='₪'?nis(v):v)}${sub?' · '+es(sub):''}"><span role="cell" class="n">${es(n)}</span><span role="cell" class="t"><i style="width:${Math.max(2,Math.round(v/mx*100))}%"></i></span><b role="cell">${unit=='₪'?nis(v):v}</b>${sub?`<small role="cell">${es(sub)}</small>`:''}</div>`).join('')}</div>`}
function html(){const ids=Object.keys(D),L=ids.filter(live);
 const way=ids.filter(id=>!I(id).gen&&onWay(id)).length,arr=ids.filter(id=>I(id).got=='y').length;
 const todo=ids.filter(id=>{const i=I(id);return i.s=='ret'&&!i.rsent&&!i.rnr&&!i.refunded}),sent=ids.filter(id=>{const i=I(id);return i.s=='ret'&&i.rsent&&!i.refunded});
 const paid=ids.filter(id=>!I(id).oos).reduce((s,id)=>s+(+D[id].paid||0),0),back=ids.filter(id=>I(id).refunded).reduce((s,id)=>s+(+D[id].paid||0),0),exp=todo.concat(sent).reduce((s,id)=>s+(+D[id].paid||0),0);
 const worn=L.filter(id=>(I(id).wear||0)>0||(I(id).wl||[]).length),never=L.length-worn.length;
 let ready=0;try{ready=R360.readyCount()[0]}catch(_){}
 const tile=(v,n,s)=>`<div class="st350k"><b>${v}</b><span>${n}</span>${s?`<small>${s}</small>`:''}</div>`;
 // by store
 const bySrc={};ids.forEach(id=>{const x=D[id],k=x.src||'?';if(I(id).oos)return;(bySrc[k]=bySrc[k]||{n:0,p:0,o:new Set()});bySrc[k].n++;bySrc[k].p+=+x.paid||0;if(x.order)bySrc[k].o.add(x.order)});
 const src=Object.entries(bySrc).sort((a,b)=>b[1].p-a[1].p).map(([k,v])=>[ACC[k]||k,v.p,`${v.n} מוצרים · ${v.o.size} הזמנות`]);
 // by category (what is in the closet now)
 const byC={};L.forEach(id=>{const c=cat(id);byC[c]=(byC[c]||0)+1});
 const cats=Object.entries(byC).sort((a,b)=>b[1]-a[1]).map(([c,n])=>[catName(c),n]);
 // by month (orders by date d/m – this year's months in order)
 const byM={};ids.forEach(id=>{const x=D[id];if(I(id).oos)return;const m=+String(x.date||'').split('/')[1];if(!m)return;(byM[m]=byM[m]||{p:0,n:0});byM[m].p+=+x.paid||0;byM[m].n++});
 const mons=Object.keys(byM).map(Number).sort((a,b)=>a-b).map(m=>[MON[m]||m,byM[m].p,byM[m].n+' מוצרים']);
 // most worn
 const top=L.map(id=>[id,Math.max(I(id).wear||0,(I(id).wl||[]).length)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).slice(0,5);
 const nm=id=>{const x=D[id]||{};return String(I(id).nm||x.short||x.full||id).replace(/^[A-Za-z0-9&'.\-\s]+(?=[֐-׿])/,'')};
 return `<div class="st350h"><h2 id="st350t">📊 מספרים וסיכומים</h2><button type="button" class="st350x" aria-label="סגירה">✕</button></div>
 <p class="st350s">נספר עכשיו מכל מה שסימנת · מתעדכן בכל פתיחה</p>
 <div class="st350g">${tile(L.length,'בגדים בארון',`מתוך ${ids.length} שהוזמנו`)}${tile(way,'בדרך')}${tile(arr,'הגיעו')}${tile(todo.length,'עוד להחזיר',sent.length?sent.length+' כבר נשלחו':'')}
 ${tile(nis(paid),'שילמת בסך הכול')}${tile(nis(back),'כסף שחזר',exp?'צפוי עוד '+nis(exp):'')}${tile(Math.round(worn.length/Math.max(1,L.length)*100)+'%','מהארון כבר לבשת',never+' עוד לא נלבשו')}${tile(ready,'על האווטאר 360')}</div>
 <h3>לפי חנות – כמה שילמת</h3>${bars(src,'₪')}
 <h3>מה יש בארון – לפי סוג</h3>${bars(cats)}
 ${mons.length?`<h3>לפי חודש – כמה הזמנת</h3>${bars(mons,'₪')}`:''}
 ${top.length?`<h3>הכי נלבשו</h3><ol class="st350w">${top.map(([id,n])=>`<li><button type="button" data-open="${es(id)}"><img alt="" data-th="${es(id)}" src="${es((typeof img=='function'&&img(id))||'')}"><span>${es(nm(id))}</span><b>${n}×</b></button></li>`).join('')}</ol>`:''}
 <button type="button" class="st350old">📋 הטבלאות המלאות (הישנות)</button>`}
let dlg=null,pass=false;
function open(){try{if(!dlg){dlg=document.createElement('dialog');dlg.id='st350';dlg.dir='rtl';dlg.setAttribute('aria-labelledby','st350t');document.body.append(dlg);
  dlg.addEventListener('click',e=>{if(e.target===dlg||e.target.closest('.st350x'))return dlg.close();
   if(e.target.closest('.st350old')){dlg.close();pass=true;const b=document.querySelector('.h9tiles [data-h9="more"]');if(b)b.click();pass=false;return}
   const o=e.target.closest('[data-open]');if(o){dlg.close();try{openItem(o.dataset.open)}catch(_){}}})}
 dlg.innerHTML=html();if(!dlg.open)dlg.showModal();dlg.scrollTop=0}catch(e){ERR('open',e)}}
// every way into "מספרים וסיכומים" opens the live one
document.addEventListener('click',e=>{if(pass)return;const b=e.target.closest&&e.target.closest('[data-h9="more"]');if(!b)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();open()},true);
window.STATS350={open};
})();
