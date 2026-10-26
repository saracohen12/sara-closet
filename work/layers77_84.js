// v77–v84 layers: merged in v84 from fix77.js, design78.js, fix79.js, fix80.js, fix83.js, fix84.js – same order, same content. New changes go in a new file at the end.
// ===== v77 (2026-10-21): upgrades round – look of the day on the home screen, "מה חסר לאווטאר" list (sorted by wear),
// item window: "לנסות עליי" + ✓/✗ per pose, quick colour circles + view size above the grid, studio: swipe on the avatar
// to change pose, a fixed row of ready head coverings, first-time tips, and a "משהו לא עובד" report saved to db 'feedback'.
(()=>{
const P77=[['front','חזית'],['side','צד'],['back','גב'],['half','חצי'],['hip','מותן']];
const lsG=k=>{try{return localStorage.getItem(k)}catch(_){return null}},lsS=(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}};
const thumb=id=>{let u='';try{u=img(id)}catch(_){}return `<img data-th="${id}" src="${u||TPH}" alt="" loading="lazy">`};
const lz=root=>{try{thCats(root).forEach(c=>thLoad(c).then(()=>thApply(TH)))}catch(_){}};
const wearable=id=>{if(!D[id])return false;const s=slotOf(id);if(s=='extra'||s=='kid')return false;const it=IT[id]||{};return it.s!='ret'&&it.s!='give'};
// which of the 5 poses have avatar pictures (main set or any colour variant)
function poseHas(id,k){const it=IT[id]||{};if(it.p5g&&it.p5g[k])return true;return (it.p5gv||[]).some(g=>g&&g[k])}
const usesPoses=id=>(typeof P5G_SLOTS!='undefined'?P5G_SLOTS:[]).includes(slotOf(id));

// ---------- 1. "מה חסר לאווטאר"
function missList(){return Object.keys(D).filter(id=>wearable(id)&&!avReady(id)).sort((a,b)=>{const A=IT[a]||{},B=IT[b]||{};return (B.wear||0)-(A.wear||0)||(B.fav?1:0)-(A.fav?1:0)||String(B.lastWorn||'').localeCompare(String(A.lastWorn||''))})}
function readyCount(){const all=Object.keys(D).filter(wearable);return [all.filter(id=>avReady(id)).length,all.length]}
let MF='';
function openMiss(){let d=$('#miss77');if(!d){d=document.createElement('dialog');d.id='miss77';d.className='sheet9 m77';d.dir='rtl';document.querySelector('[dir=rtl]')?.appendChild(d)||document.body.appendChild(d)}
 const [r,n]=readyCount();const all=missList();const cats=[...new Set(all.map(slotOf))];const L=MF?all.filter(id=>slotOf(id)==MF):all;
 const sn=s=>((SLOTS.find(x=>x[0]==s)||[])[1]||s);
 d.innerHTML=`<div class="sh9h"><h3>מה חסר לאווטאר</h3><button class="x" data-m77="x" aria-label="סגירה">✕</button></div><div class="m77b">
 <p class="m77s">מוכנים על הדמות: <b>${r}</b> מתוך ${n}</p><div class="m77bar"><i style="width:${n?Math.round(r*100/n):0}%"></i></div>
 <p class="m77h">למעלה מה שאת לובשת הכי הרבה. לוחצים "להעלות" ונפתח החלון של הבגד במקום של תמונות האווטאר.</p>
 <div class="m77f"><button data-m77f="" aria-pressed="${!MF}">הכל ${all.length}</button>${cats.map(s=>`<button data-m77f="${s}" aria-pressed="${MF==s}">${esc(sn(s))} ${all.filter(id=>slotOf(id)==s).length}</button>`).join('')}</div>
 <ul class="m77l">${L.slice(0,150).map(id=>{const it=IT[id]||{};return `<li>${thumb(id)}<div><b>${esc((D[id].short||'').slice(0,46))}</b><small>${it.wear?`לבשתי ${it.wear} פעמים`:'עוד לא סימנתי לבישה'}${it.fav?' · ♥':''}</small></div><button class="go" data-m77up="${id}">להעלות</button></li>`}).join('')}</ul>
 ${L.length>150?`<p class="m77h">מוצגים 150 הראשונים מתוך ${L.length}.</p>`:''}${!L.length?'<p class="m77h">אין כאן בגדים שחסרים. 🎉</p>':''}</div>`;
 if(!d.open)d.showModal();lz(d);}
window.openMiss77=openMiss;
function goUpload(id){$$('dialog[open]').forEach(x=>{if(x.id!='dlg')x.close()});openItem(id);let n=0;const t=setInterval(()=>{const row=document.querySelector(`#dlbody [data-imgrow="${id}"]`);if(row||++n>20){clearInterval(t);if(!row)return;const box=row.querySelector('.p5gbox')||row;if(box.tagName=='DETAILS')box.open=true;row.querySelectorAll('details').forEach(x=>{if(x.classList.contains('p5gbox'))x.open=true});box.scrollIntoView({behavior:'smooth',block:'start'});box.classList.add('flash77');setTimeout(()=>box.classList.remove('flash77'),1800)}},150)}
window.goUpload77=goUpload;
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;
 const m=t.closest('[data-m77]');if(m){$('#miss77')?.close();return}
 const f=t.closest('[data-m77f]');if(f){MF=f.dataset.m77f;openMiss();return}
 const u=t.closest('[data-m77up]');if(u){goUpload(u.dataset.m77up);return}
 if(t.closest('[data-open77miss]')){e.preventDefault();openMiss();return}
});

// ---------- 2. home: look of the day + avatar readiness strip
const today=()=>new Date().toISOString().slice(0,10);
function lotdPick(fresh){const oc=window.occToday83?window.occToday83():null;const occ=oc?oc[0]:([5,6].includes(new Date().getDay())?'shab':'day');
 let c=null;try{c=JSON.parse(lsG('lotd77')||'null')}catch(_){}
 if(!fresh&&c&&c.d==today()&&(c.o||'')==occ&&c.items&&Object.values(c.items).every(id=>D[id]))return c;
 let saved=Object.values(LOOKS||{}).filter(l=>l&&l.items&&Object.values(l.items).some(id=>D[id]));
 {const so=saved.filter(l=>!l.occ||l.occ==occ);if(so.length)saved=so}
 let L=null,look=null;
 if(saved.length&&!fresh){const seed=+today().replace(/-/g,'');look=saved[seed%saved.length];L=look.items}
 else{try{L=genLook({occ,sea:curSeason(),fav:false,kids:false})}catch(_){L=null}}
 if(!L||!Object.keys(L).length)return null;c={d:today(),o:occ,items:L,look:look&&look.id||'',name:look&&look.name||(oc&&oc[1])||''};lsS('lotd77',JSON.stringify(c));return c}
function paintLotd(fresh){const hero=document.querySelector('.h9hero');if(!hero||typeof D=='undefined')return;let box=$('#lotd77');
 const c=lotdPick(fresh);if(!c){if(box)box.remove();return}
 if(!box){box=document.createElement('div');box.id='lotd77';const tl=document.querySelector('.h9tiles');(tl||hero).after(box)}
 const ids=Object.values(c.items).filter(id=>D[id]).slice(0,5);
 box.innerHTML=`<div class="l77h"><p class="l77k">לוק היום</p><h3>${esc(c.name||'הצעה שלי להיום')}</h3></div><div class="l77r">${ids.map(id=>`<button data-open="${id}" class="l77i" aria-label="${esc(D[id].short||'')}">${thumb(id)}</button>`).join('')}</div>
 <div class="l77a"><button class="go" data-l77="try">לנסות על הדמות</button><button data-l77="new">הצעה אחרת</button></div>`;
 lz(box);}
function paintReady(){const tiles=document.querySelector('.h9tiles')||document.querySelector('.h9hero');if(!tiles)return;let s=$('#rdy77');
 const [r,n]=readyCount();if(!s){s=document.createElement('button');s.id='rdy77';s.dataset.open77miss=1;const l=$('#lotd77');(l||tiles).after(s)}
 const m=missList().slice(0,4);
 s.innerHTML=`<span class="r77t"><b>${r} מתוך ${n}</b> בגדים מוכנים על הדמות</span><span class="r77th">${m.map(thumb).join('')}</span><span class="r77go">מה חסר ←</span>`;
 lz(s);}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-l77]');if(!b)return;
 if(b.dataset.l77=='new'){paintLotd(true);paintReady();return}
 let c=null;try{c=JSON.parse(lsG('lotd77')||'null')}catch(_){}if(!c)return;
 if(c.look&&LOOKS[c.look])openStudio(LOOKS[c.look]);else openStudio(null,c.items)});
let _hT=0;const homeRefresh=()=>{clearTimeout(_hT);_hT=setTimeout(()=>{try{paintLotd();paintReady()}catch(err){(window.ERRS=window.ERRS||[]).push('v77home '+err.message)}},400)};
setTimeout(homeRefresh,1200);setTimeout(homeRefresh,4000);
{const _pa=window.paintAll;if(typeof _pa=='function')paintAll=function(){const r=_pa.apply(this,arguments);homeRefresh();return r}}

// ---------- 3. item window: try on + pose status
{const _ao=window.afterOpen;window.afterOpen=function(id){try{if(_ao)_ao.apply(this,arguments)}catch(_){}try{itemBar(id)}catch(err){(window.ERRS=window.ERRS||[]).push('v77item '+err.message)}}}
function itemBar(id){const body=$('#dlbody');if(!body||!D[id])return;body.querySelector('.it77')?.remove();const s=slotOf(id);if(s=='extra'||s=='kid')return;
 // v188: only the new 360 avatar (av188.js); the 5-pose upload is no longer offered
 let st='';try{st=window.bar188?bar188(id):''}catch(_){}
 const bar=document.createElement('div');bar.className='it77';bar.innerHTML=`<button class="go it77t" data-studio="${id}">לנסות עליי</button>${st}`;
 const h3=body.querySelector('h3');const after=body.querySelector('.edtop')||(h3&&h3.nextElementSibling&&h3.nextElementSibling.classList.contains('full')?h3.nextElementSibling:h3);
 if(after)after.after(bar);else body.prepend(bar)}

// ---------- 4. grid: quick colour circles + view size
function paintQuick(){const g=document.querySelector('.ctrl .groups');if(!g||$('#q77'))return;const cols=$$('#cols button[data-c]');if(!cols.length)return;
 const w=document.createElement('div');w.id='q77';w.innerHTML=`<div class="q77c" role="group" aria-label="צבע">${cols.map(b=>`<button data-q77c="${esc(b.dataset.c)}" title="${esc(b.dataset.c)}" aria-label="${esc(b.dataset.c)}" aria-pressed="${b.getAttribute('aria-pressed')=='true'}"><i style="background:${(typeof SW!='undefined'&&SW[b.dataset.c])||'#ccc'}"></i></button>`).join('')}</div>
 <div class="q77s" role="group" aria-label="גודל תצוגה"><button data-q77s="s" title="קטן">▦</button><button data-q77s="" title="רגיל">▤</button><button data-q77s="l" title="גדול">▢</button></div>`;
 g.after(w);syncQuick()}
function syncQuick(){const cur=$$('#cols button[aria-pressed="true"]')[0];$$('[data-q77c]').forEach(b=>b.setAttribute('aria-pressed',!!cur&&cur.dataset.c==b.dataset.q77c));const sz=document.body.dataset.size||'';$$('[data-q77s]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.q77s==sz))}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-q77c],[data-q77s]');if(!t)return;
 if(t.dataset.q77c!=null){const b=$$('#cols button[data-c]').find(x=>x.dataset.c==t.dataset.q77c);if(b)b.click()}
 else{try{setSize(t.dataset.q77s)}catch(_){document.body.dataset.size=t.dataset.q77s}}
 syncQuick()});
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#cols,.sizes,#panel'))setTimeout(syncQuick,50)});
setTimeout(paintQuick,900);

// ---------- 5. studio: swipe on the avatar, head-covering row, first-time tips
let sw=null;
document.addEventListener('touchstart',e=>{const st=e.target.closest&&e.target.closest('#sstage');if(!st||e.touches.length!=1||document.body.classList.contains('er74on')){sw=null;return}
 // only from the body/background – a touch on a garment keeps dragging it
 const lay=e.target.closest('img[data-slot],.jwl,.ap');sw=lay?null:{x:e.touches[0].clientX,y:e.touches[0].clientY,t:Date.now()}},{passive:true,capture:true});
document.addEventListener('touchmove',e=>{if(sw&&e.touches.length>1)sw=null},{passive:true,capture:true});
document.addEventListener('touchend',e=>{if(!sw)return;const p=e.changedTouches[0];const dx=p.clientX-sw.x,dy=p.clientY-sw.y,dt=Date.now()-sw.t;sw=null;
 if(dt>700||Math.abs(dx)<55||Math.abs(dy)>Math.abs(dx)*.6)return;try{if(stageZ()>1.05)return}catch(_){}
 poseStep(dx<0?1:-1)},{passive:true,capture:true});
function poseStep(d){const bs=$$('#studio [data-sview]').filter(b=>b.getClientRects().length);if(bs.length){let i=bs.findIndex(b=>b.getAttribute('aria-pressed')=='true');i=((i<0?0:i)+d+bs.length)%bs.length;bs[i].click();const n=bs[i].textContent.trim();if(n)toast(n)}else{const b=document.querySelector(`#spin [data-spin="${d}"]`);if(b)b.click()}}
window.poseStep77=poseStep;
function readyScarves(){return Object.keys(D).filter(id=>curCat(id)=='scarves'&&avReady(id)&&(IT[id]||{}).s!='ret'&&(IT[id]||{}).s!='give')}
function paintHeads(){const sm=document.querySelector('#studio .smain');if(!sm||!ST)return;let r=$('#hd77');const L=readyScarves();
 if(!L.length){if(r)r.remove();return}
 if(!r){r=document.createElement('div');r.id='hd77';r.dir='rtl';sm.after(r)}
 const cur=ST.items.scarf;
 r.innerHTML=`<span class="hd77l">🧕 כיסוי ראש</span><button data-hd77="" aria-pressed="${!cur}" class="hd77n">בלי</button>${L.map(id=>`<button data-hd77="${id}" aria-pressed="${cur==id}" aria-label="${esc(D[id].short||'')}">${thumb(id)}</button>`).join('')}<button class="hd77m" data-open77miss="1">עוד ›</button>`;
 lz(r);}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-hd77]');if(!b)return;e.preventDefault();const id=b.dataset.hd77;await setItem('scarf',id||null);paintHeads()});
{const _ds=drawStudio;drawStudio=async function(){const r=await _ds.apply(this,arguments);try{paintHeads()}catch(_){}return r}}
function tips(){if(lsG('tips77'))return;const s=$('#studio');if(!s||!s.open||$('#tip77'))return;const t=document.createElement('div');t.id='tip77';t.dir='rtl';
 t.innerHTML=`<div class="t77c"><h4>ברוכה הבאה לבניית הלוק</h4><ol><li>בוחרים בגד מה<b>משבצות</b> (שמלה, חולצה, חצאית…).</li><li><b>מחליקים</b> על הדמות ימינה או שמאלה כדי לראות אותה מהצד ומהגב.</li><li>נוגעים <b>בבגד</b> כדי להזיז, להגדיל או למחוק ממנו מעט.</li><li>כיסוי ראש בוחרים מ<b>השורה</b> שמתחת לדמות.</li></ol><button class="go" data-t77>הבנתי</button></div>`;
 s.appendChild(t)}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-t77]')){lsS('tips77','1');$('#tip77')?.remove()}});
{const _os=openStudio;openStudio=async function(){const r=await _os.apply(this,arguments);try{paintHeads();setTimeout(tips,500)}catch(_){}return r}}

// ---------- 6. "משהו לא עובד"
function openBug(){let d=$('#bug77');if(!d){d=document.createElement('dialog');d.id='bug77';d.className='sheet9';d.dir='rtl';document.body.appendChild(d)}
 d.innerHTML=`<div class="sh9h"><h3>משהו לא עובד?</h3><button class="x" data-b77="x" aria-label="סגירה">✕</button></div><div class="b77b"><p>כתבי במילים פשוטות מה ניסית לעשות ומה קרה. אני אקבל את זה יחד עם פרטים טכניים על המסך, ואתקן.</p><textarea id="b77t" rows="5" placeholder="לדוגמה: לחצתי על חצאית בבניית לוק והמגירה נשארה ריקה"></textarea><button class="go" data-b77="send">לשלוח</button><p class="b77s" id="b77s"></p></div>`;
 d.showModal();setTimeout(()=>$('#b77t')?.focus(),50)}
window.openBug77=openBug;
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-b77],[data-bug77]');if(!b)return;e.preventDefault();
 if(b.dataset.bug77!=null){openBug();return}
 if(b.dataset.b77=='x'){$('#bug77').close();return}
 const note=($('#b77t').value||'').trim();if(!note){$('#b77s').textContent='כתבי כמה מילים קודם';return}
 const where=$$('dialog[open]').map(x=>x.id).filter(Boolean).join(',')||'home';
 const doc={t:Date.now(),kind:'bug',note,where,ver:(document.querySelector('.ver73,.ver')?.textContent||'').trim(),w:innerWidth,h:innerHeight,ua:navigator.userAgent.slice(0,160),errs:(window.ERRS||[]).slice(-12).map(x=>String(typeof x=='string'?x:JSON.stringify(x)).slice(0,300)),view:ST&&$('#studio')?.open?{v:ST.view,items:ST.items}:null};
 let ok=false;if(typeof DB!='undefined'&&DB){try{await DB.collection('feedback').doc('b'+Date.now().toString(36)).set(doc);ok=true}catch(_){}}
 if(!ok){try{const a=JSON.parse(lsG('bugs77')||'[]');a.push(doc);lsS('bugs77',JSON.stringify(a.slice(-20)))}catch(_){}}
 $('#bug77').close();toast(ok?'נשלח, תודה! אני אסתכל על זה':'נשמר במכשיר. כשיהיה חיבור, ספרי לי בצ׳אט')});
// entry points: the "פרטים נוספים" sheet and the studio "⋯ עוד" menu
function addEntries(){const sb=document.querySelector('#more9 .sh9b');if(sb&&!sb.querySelector('.e77')){sb.insertAdjacentHTML('afterbegin',`<div class="e77"><button data-open77miss="1">🧍‍♀️ מה חסר לאווטאר</button><button data-bug77="1">🛠 משהו לא עובד</button></div>`)}
 const sm=document.querySelector('#studio .smenu');if(sm&&!sm.querySelector('[data-bug77]')){sm.insertAdjacentHTML('beforeend',`<button data-open77miss="1">🧍‍♀️ מה חסר לאווטאר</button><button data-bug77="1">🛠 משהו לא עובד</button>`)}}
new MutationObserver(()=>addEntries()).observe(document.body,{childList:true,subtree:false});
document.addEventListener('click',()=>setTimeout(addEntries,30),true);setTimeout(addEntries,1500);
})();

// ===== v78 (2026-10-21): "2050 soft" look – turns on design78.css (rounded, glassy, smaller hero title)
document.documentElement.classList.add('d78');

// ===== v79 (2026-10-21): "50 upgrades" round 1 – Hebrew date in the greeting, "ראיתי לאחרונה" + "מזמן לא לבשת" strips,
// "לבשתי היום" (item bar and look of the day), loading shimmer, search ✕ + recent searches, live result count on the filter
// sheet, haptic tap, hub opens with 3 ready looks.
(()=>{
const lsG=k=>{try{return localStorage.getItem(k)}catch(_){return null}},lsS=(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}};
const lsJ=(k,d)=>{try{return JSON.parse(lsG(k)||'null')??d}catch(_){return d}};
const thumb=id=>{let u='';try{u=img(id)}catch(_){}return `<img data-th="${id}" src="${u||TPH}" alt="" loading="lazy">`};
const lz=root=>{try{thCats(root).forEach(c=>thLoad(c).then(()=>thApply(TH)))}catch(_){}};
const live=id=>D[id]&&(IT[id]||{}).s!='ret'&&(IT[id]||{}).s!='give';

// ---------- 1. greeting with weekday + Hebrew date
const GL=['','א','ב','ג','ד','ה','ו','ז','ח','ט'],GT=['','י','כ','ל'];
function gem(n){if(n==15)return 'ט״ו';if(n==16)return 'ט״ז';const s=GT[Math.floor(n/10)]+GL[n%10];return s.length>1?s.slice(0,-1)+'״'+s.slice(-1):s+'׳'}
function hebDate(){try{const p=new Intl.DateTimeFormat('he-IL-u-ca-hebrew',{day:'numeric',month:'long'}).formatToParts(new Date());const d=+(p.find(x=>x.type=='day')||{}).value;const m=(p.find(x=>x.type=='month')||{}).value||'';return d?gem(d)+' '+m.replace(/^ב?/,'ב'):''}catch(_){return ''}}
function greet(){const h=document.querySelector('.h9hi');if(!h||h.dataset.d79)return;let wd='';try{wd=new Intl.DateTimeFormat('he-IL',{weekday:'long'}).format(new Date())}catch(_){}
 const hd=hebDate();h.dataset.d79=1;if(wd||hd)h.insertAdjacentHTML('beforeend',`<span class="d79"> · ${[wd,hd].filter(Boolean).join(' · ')}</span>`)}

// ---------- 2. recently viewed + 3. not worn for a while
{const _oi=openItem;openItem=function(id){try{if(D[id]){const a=lsJ('rv79',[]).filter(x=>x!=id);a.unshift(id);lsS('rv79',JSON.stringify(a.slice(0,14)))}}catch(_){}return _oi.apply(this,arguments)}}
function strip(id,title,ids,more){const top=document.querySelector('header.top')||document.querySelector('#top');let s=document.getElementById(id);
 if(ids.length<3){if(s)s.remove();return}
 if(!s){s=document.createElement('div');s.id=id;s.className='s79';top.appendChild(s)}
 s.innerHTML=`<div class="s79h"><h3>${title}</h3>${more||''}</div><div class="s79r">${ids.map(i=>`<button data-open="${i}" aria-label="${esc((D[i].short||'').slice(0,40))}">${thumb(i)}${(IT[i]||{}).wear?`<small>${IT[i].wear}×</small>`:''}</button>`).join('')}</div>`;lz(s)}
function oldWorn(){const now=Date.now(),day=864e5;const L=Object.keys(D).filter(id=>{if(!live(id))return false;const it=IT[id]||{};const s=slotOf(id);if(s=='extra'||s=='kid')return false;
  if(it.lastWorn)return now-new Date(it.lastWorn).getTime()>45*day;return !!it.fav&&!it.wear});
 return L.sort((a,b)=>String((IT[a]||{}).lastWorn||'').localeCompare(String((IT[b]||{}).lastWorn||''))).slice(0,14)}
function paintStrips(){strip('rv79','ראיתי לאחרונה',lsJ('rv79',[]).filter(id=>D[id]).slice(0,12));strip('old79','מזמן לא לבשת',oldWorn(),'<small>מועדפים ובגדים שלא נלבשו 45 יום</small>')}

// ---------- 4/19. "לבשתי היום"
async function wore(ids){const before={};for(const id of ids){const it=IT[id]||{};before[id]={wear:it.wear||0,lastWorn:it.lastWorn||''};await putItem(id,{wear:(it.wear||0)+1})}
 if(navigator.vibrate)try{navigator.vibrate(15)}catch(_){}
 setTimeout(()=>toast(ids.length>1?`סומן: לבשת ${ids.length} בגדים היום`:'סומן: לבשת היום',async()=>{for(const id of ids)await putItem(id,before[id]);refresh()}),60);refresh()}
function refresh(){try{if($('#dlg')?.open&&CUR)wearBtn(CUR)}catch(_){}try{paintStrips()}catch(_){}}
function wearBtn(id){const bar=document.querySelector('#dlbody .it77');if(!bar)return;bar.querySelector('.w79')?.remove();const it=IT[id]||{};const today=(it.lastWorn||'')==new Date().toISOString().slice(0,10);
 bar.querySelector('.it77t')?.insertAdjacentHTML('afterend',`<button class="w79${today?' on':''}" data-w79="${id}">${today?'✓ לבשתי היום':'👗 לבשתי היום'}<small>${it.wear?` · ${it.wear==1?'פעם אחת':it.wear+' פעמים'}`:''}</small></button>`)}
{const _ao=window.afterOpen;window.afterOpen=function(id){try{if(_ao)_ao.apply(this,arguments)}catch(_){}try{wearBtn(id)}catch(_){}}}
function lotdWear(){const box=$('#lotd77');if(!box||box.querySelector('[data-l79]'))return;const a=box.querySelector('.l77a');if(a)a.insertAdjacentHTML('beforeend','<button data-l79="1">✓ לבשתי את זה</button>')}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-l77]'))setTimeout(lotdWear,80);const t=e.target.closest&&e.target.closest('[data-w79],[data-l79]');if(!t)return;e.preventDefault();
 if(t.dataset.w79)return wore([t.dataset.w79]);
 const c=lsJ('lotd77',null);if(c&&c.items)wore(Object.values(c.items).filter(id=>D[id]))});

// ---------- 9. loading shimmer on card photos
function shimmer(root){(root||document).querySelectorAll('.card .ph>img:not([data-s79])').forEach(im=>{im.dataset.s79=1;const ph=im.parentElement;const ok=()=>im.complete&&im.naturalWidth>2&&im.getAttribute('src')!=TPH;
 if(!ok())ph.classList.add('ld79');const done=()=>{if(ok())ph.classList.remove('ld79')};im.addEventListener('load',done);im.addEventListener('error',()=>ph.classList.remove('ld79'))})}

// ---------- 10. search ✕ + recent searches
function searchUi(){const q=$('#q');if(!q||q.dataset.s79)return;q.dataset.s79=1;const w=q.parentElement;w.classList.add('qw79');
 w.insertAdjacentHTML('beforeend','<button type="button" class="qx79" aria-label="ניקוי החיפוש" hidden>✕</button>');const x=w.querySelector('.qx79');
 const rec=document.createElement('div');rec.className='rs79';rec.hidden=true;(w.closest('.tools')||w).after(rec);
 const sync=()=>{x.hidden=!q.value};const show=()=>{const a=lsJ('rs79',[]);rec.hidden=!!q.value||!a.length;rec.innerHTML=a.length?`<span>חיפושים אחרונים:</span>${a.map(s=>`<button type="button" data-rs79="${esc(s)}">${esc(s)}</button>`).join('')}<button type="button" class="rsx" data-rs79x>ניקוי</button>`:''};
 const save=()=>{const v=q.value.trim();if(v.length<2)return;const a=lsJ('rs79',[]).filter(s=>s!=v);a.unshift(v);lsS('rs79',JSON.stringify(a.slice(0,6)))};
 q.addEventListener('input',()=>{sync();if(q.value)rec.hidden=true;else show()});q.addEventListener('focus',show);q.addEventListener('change',save);q.addEventListener('blur',()=>{save();setTimeout(()=>rec.hidden=true,200)});
 q.addEventListener('keydown',e=>{if(e.key=='Enter'){save();q.blur()}});
 x.addEventListener('click',()=>{q.value='';q.dispatchEvent(new Event('input',{bubbles:true}));sync();q.focus()});
 rec.addEventListener('mousedown',e=>e.preventDefault());
 rec.addEventListener('click',e=>{const b=e.target.closest('[data-rs79]');if(b){q.value=b.dataset.rs79;q.dispatchEvent(new Event('input',{bubbles:true}));sync();rec.hidden=true;return}if(e.target.closest('[data-rs79x]')){lsS('rs79','[]');rec.hidden=true}});sync()}

// ---------- 11. filter sheet: live result count on the close button
function countBtn(){const b=$('#pdone');if(!b)return;const n=(($('#cnt')||{}).textContent||'').match(/[\d,]+/);if(n)b.textContent=`הצגת ${n[0]} פריטים`}
{const _ap=apply;apply=function(){const r=_ap.apply(this,arguments);try{countBtn()}catch(_){}return r}}

// ---------- 25. small haptic tap on the main buttons (Android)
document.addEventListener('click',e=>{if(!navigator.vibrate)return;if(e.target.closest&&e.target.closest('button.go,.bnav button,.h9tiles button,[data-q77c],[data-hd77],#lotd77 button'))try{navigator.vibrate(8)}catch(_){}},true);

// ---------- 39. "לוקים" opens with 3 ready suggestions
{const _oh=openHub;openHub=function(tab,anchor){const r=_oh.apply(this,arguments);try{if(!anchor&&TAB=='looks'&&!GEN.length&&$('#hocc'))runGen()}catch(_){}return r}}

// ---------- boot + keep the home extras fresh
let _t=0;const go=()=>{clearTimeout(_t);_t=setTimeout(()=>{try{greet();paintStrips();lotdWear();shimmer();searchUi();countBtn()}catch(err){(window.ERRS=window.ERRS||[]).push('v79 '+err.message)}},500)};
setTimeout(go,1300);setTimeout(go,4200);
{const _pa=paintAll;paintAll=function(){const r=_pa.apply(this,arguments);go();return r}}
document.addEventListener('thumbs',()=>shimmer());
})();

// ===== v80 (2026-10-21): "פרומטים ל-GPT" – one place with a ready prompt per garment type (5 poses like P5GPROMPT),
// jewelry and head-covering prompts, copy button, avatar sheet, and a 📋 per row in "מה חסר לאווטאר" that fills in the item.
(()=>{
const HEAD=`מצורפות שתי תמונות: (1) גיליון האווטר שלי ב-5 תנוחות (חזית, צד, גב, חצי צד, יד על המותן). (2) תמונה של בגד שקניתי.
צרי תמונה אחת רחבה באותו סידור בדיוק כמו גיליון האווטר: 5 חלקים שווים זה לצד זה, מופרדים בקו לבן דק, על רקע אפור בהיר חלק ואחיד, באותו סדר: חזית, צד, גב, חצי צד, יד על המותן.
בכל חלק מופיע רק הבגד מתמונה 2, לבוש על גוף בלתי נראה (ghost mannequin): בלי גוף, בלי ראש, בלי ידיים, בלי רגליים, בלי נעליים, בלי בגדים אחרים.
אם בתמונה 2 יש בגדים נוספים או אביזרים – להתעלם מהם לגמרי.`;
const TAIL=`בכל חלק הבגד בזווית ובתנוחה המדויקת של האווטר באותו חלק (כולל חצי צד ויד על המותן), באותו גודל ובאותו גובה בדיוק כמו שהיה יושב על גוף האווטר: כתפיים / מותן / מכפלת באותם גבהים, רוחב לפי הגוף באותה תנוחה.
לא לשנות את הבגד: צבע, דוגמה, בד, אורך, גזרה, שרוולים, צווארון, קפלים, קישוטים. בגב ובצד להראות איך הבגד נראה באמת מאחור ומהצד.
אותו קנה מידה בכל 5 החלקים: המותן (או הכתפיים) באותו גובה בדיוק בכל החלקים, והבגד גדול וברור בחלק שלו.
כל הבגד בתוך החלק שלו, לא חתוך: שרוולים, ידיות, כתפיים, מכפלת וקצוות החצאית בפנים, עם רווח אפור קטן מכל צד ומלמעלה ומלמטה. שום דבר לא נוגע בקצה של החלק ולא עובר לחלק השכן.
בלי טקסט, בלי כותרות, בלי קולבים, בלי צל על הרקע, בלי חפצים נוספים.
אם הבגד אפור או כסוף – רקע ירוק בהיר חלק במקום אפור. בגד לבן או שמנת נשאר לבן, על רקע אפור.`;
const NECK='בחזית ובחצי צד לא לראות את החלק הפנימי של הצווארון האחורי – רק את חזית הבגד, כמו שרואים כשהבגד על אישה.';
const T=[
 ['top','👚','חולצה',`רק החולצה. היא מתחילה בכתפיים ונגמרת באורך האמיתי שלה. שרוולים באורך האמיתי; בתנוחת יד על המותן השרוול מתכופף יחד עם היד. ${NECK}`],
 ['sweater','🧶','סוודר / קרדיגן',`רק הסוודר או הקרדיגן, עם מרקם הסריגה האמיתי. קרדיגן – פתוח או סגור בדיוק כמו בתמונה 2. שרוולים באורך האמיתי. ${NECK}`],
 ['skirt','🩱','חצאית',`רק החצאית. היא מתחילה במותן ותלויה טבעי כלפי מטה כמו על גוף עומד, לא פרושה לצדדים ולא מסתובבת. רוחב המכפלת לא יותר מפי 1.5 מרוחב המותן. האורך האמיתי (חצאית מקסי מגיעה עד הקרסול).`],
 ['dress','👗','שמלה',`רק השמלה, מהכתפיים ועד המכפלת. החצאית של השמלה תלויה טבעי כלפי מטה, לא פרושה לצדדים; רוחב המכפלת לא יותר מפי 1.5 מרוחב המותן; האורך האמיתי. שרוולים באורך האמיתי. ${NECK}`],
 ['set','🎽','סט (חולצה + חצאית)',`שני החלקים של הסט יחד, כמו שלובשים אותם: החולצה למעלה (בחוץ או בפנים כמו בתמונה 2) והחצאית מהמותן למטה, תלויה טבעי. ${NECK}`],
 ['coat','🧥','מעיל',`רק המעיל, סגור כמו בתמונה 2 (אם בתמונה הוא פתוח – פתוח, ובפנים רואים רקע אפור ולא בגדים). אורך המעיל האמיתי, שרוולים באורך האמיתי, כתפיים ברוחב הכתפיים של האווטר.`],
 ['jacket','🧥','ז׳קט / בלייזר',`רק הז׳קט, פתוח או סגור בדיוק כמו בתמונה 2 (אם פתוח – בפנים רק רקע אפור). אורך ושרוולים אמיתיים, כתפיים ברוחב הכתפיים של האווטר. ${NECK}`],
 ['vest','🦺','אפודה / וסט',`רק האפודה, בלי שרוולים: פתחי הזרועות ריקים (רקע אפור), בלי חולצה מתחת. פתוחה או סגורה כמו בתמונה 2, באורך האמיתי.`],
 ['belt','➰','חגורה',`רק החגורה, סגורה סביב המותן של הגוף הבלתי נראה, בגובה המותן של האווטר, עם האבזם במקום שלו (בחזית – באמצע). בכל תנוחה רק החצי של החגורה שפונה למצלמה: בחזית – החצי הקדמי, מקצה המותן עד הקצה השני, ברוחב המותן המלא של האווטר ומתעגל קצת לצדדים; בגב – החצי האחורי; בצד – החלק שבצד. החצי שמאחורי הגוף לא מופיע. החגורה לא צרה מהגוף. בלי מכנסיים, בלי שמלה.`,1],
 ['shoes','👠','נעליים',`רק זוג הנעליים, על כפות רגליים בלתי נראות, בגובה ובמקום של כפות הרגליים של האווטר בכל תנוחה (למטה בחלק). בלי רגליים, בלי גרביים.`,1],
 ['bag','👜','תיק',`רק התיק, תלוי מהכתף או מהיד כמו שמחזיקים אותו בתמונה 2, במקום שבו היד או הכתף של האווטר בכל תנוחה. בלי יד, בלי גוף.`,1],
];
const XTRA=[['jw','📿','תכשיטים – 3 חלקים',()=>typeof JWPROMPT!='undefined'?JWPROMPT:''],['jwn','📿','שרשרת – 5 זוויות',()=>typeof jwPromptFor=='function'?jwPromptFor('neck'):''],['jwe','💎','עגיל – 5 זוויות',()=>typeof jwPromptFor=='function'?jwPromptFor('ear'):''],['jwb','⌚','צמיד – 5 זוויות',()=>typeof jwPromptFor=='function'?jwPromptFor('brac'):''],
 ['tie5','🧕','כיסוי ראש – 5 קשירות',()=>typeof TIEPROMPT5!='undefined'?TIEPROMPT5:''],['tie4','🧕','כיסוי ראש – 4 זוויות',()=>typeof TIEPROMPT!='undefined'?TIEPROMPT:'']];
function promptOf(k,id){const g=T.find(x=>x[0]==k);let txt;
 if(g){const what=id&&D[id]?`הבגד: ${D[id].short||''}${D[id].color?` בצבע ${D[id].color}`:''}.\n`:'';txt=HEAD+'\n'+what+g[3]+'\n'+TAIL}else{const x=XTRA.find(x=>x[0]==k);txt=x?x[3]():''}
 return txt}
function typeOf(id){const c=curCat(id),s=slotOf(id),n=(D[id]&&D[id].short)||'';
 if(c=='sweaters')return 'sweater';if(c=='scarves')return 'tie5';if(c=='jewelry')return 'jw';if(c=='belts')return 'belt';if(c=='shoes')return 'shoes';if(c=='bags')return 'bag';
 if(s=='outer')return /אפוד|וסט|vest/i.test(n)?'vest':/מעיל|coat/i.test(n)?'coat':'jacket';return ['top','skirt','dress','set'].includes(s)?s:'top'}
const STEPS={g:'<ol><li>שמרי את <b>גיליון האווטאר</b> (כפתור למטה) ואת תמונת הבגד.</li><li>ב-GPT מצרפים את שתי התמונות ומדביקים את הפרומט.</li><li>את התמונה שיוצאת מעלים בחלון הבגד, ב"הבגד על האווטר ב-5 תנוחות".</li></ol>',
 x:'<ol><li>ב-GPT מצרפים רק את תמונת המוצר ומדביקים את הפרומט.</li><li>את התמונה שיוצאת מעלים בחלון של הפריט, במקום של תמונות האווטאר.</li></ol>'};
let CUR80='top',ID80='';
function openPr(k,id){CUR80=k||CUR80;ID80=id||'';let d=$('#pr80');if(!d){d=document.createElement('dialog');d.id='pr80';d.className='sheet9 pr80';d.dir='rtl';document.body.appendChild(d)}
 const g=T.find(x=>x[0]==CUR80);const all=[...T.map(x=>[x[0],x[1],x[2]]),...XTRA.map(x=>[x[0],x[1],x[2]])];
 d.innerHTML=`<div class="sh9h"><h3>📋 פרומטים ל-GPT</h3><button class="x" data-p80x aria-label="סגירה">✕</button></div><div class="p80b">
 <p class="p80h">בוחרים סוג בגד, מעתיקים, ומדביקים ב-GPT.</p>
 <div class="p80t">${all.map(([k,i,n])=>`<button data-p80="${k}" aria-pressed="${k==CUR80}"><span>${i}</span>${n}</button>`).join('')}</div>
 ${ID80&&D[ID80]?`<p class="p80i">לבגד: <b>${esc((D[ID80].short||'').slice(0,50))}</b></p>`:''}
 ${g&&g[4]?'<p class="p80w">שימי לב: לסוג הזה עוד אין באתר מקום להעלות 5 תנוחות. אפשר כבר להכין את התמונות, ואני מוסיפה את ההעלאה בשלב הבא.</p>':''}
 <textarea readonly rows="9" id="p80txt">${esc(promptOf(CUR80,ID80))}</textarea>
 <div class="p80a"><button class="go" data-p80c>📋 העתיקי את הפרומט</button>${g?'<button data-zoom="av/p5_sheet.jpg">🧍 גיליון האווטאר</button>':''}</div>
 ${g?STEPS.g:STEPS.x}</div>`;
 if(!d.open)d.showModal()}
window.openPrompts80=openPr;
function copy(txt){const ok=()=>toast('✓ הפרומט הועתק – הדביקי ב-GPT');(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(txt):Promise.reject()).then(ok).catch(()=>{const ta=$('#p80txt');try{ta.removeAttribute('readonly');ta.focus();ta.select();ta.setSelectionRange(0,ta.value.length);const r=document.execCommand('copy');ta.setAttribute('readonly','');if(r)ok();else toast('סמני את הטקסט והעתיקי ידנית')}catch(_){toast('סמני את הטקסט והעתיקי ידנית')}})}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-p80],[data-p80c],[data-p80x],[data-pr80],[data-p80open]');if(!t)return;e.preventDefault();
 if(t.dataset.p80x!=null)return $('#pr80').close();
 if(t.dataset.p80c!=null)return copy($('#p80txt').value);
 if(t.dataset.pr80!=null){const id=t.dataset.pr80;return openPr(typeOf(id),id)}
 if(t.dataset.p80open!=null)return openPr();
 openPr(t.dataset.p80,ID80)});
// entry points: the "מה חסר" sheet (header button + a 📋 on every row), the "פרטים נוספים" sheet and the studio menu
function addBtns(){const m=$('#miss77');if(m&&m.open){const b=m.querySelector('.m77b');if(b&&!b.querySelector('.p80open'))b.insertAdjacentHTML('afterbegin','<button class="p80open go" data-p80open>📋 פרומטים ל-GPT לפי סוג בגד</button>');
  m.querySelectorAll('[data-m77up]').forEach(u=>{if(u.previousElementSibling&&u.previousElementSibling.dataset&&u.previousElementSibling.dataset.pr80)return;u.insertAdjacentHTML('beforebegin',`<button class="p80r" data-pr80="${u.dataset.m77up}" aria-label="פרומט לבגד הזה">📋</button>`)})}
 const e7=document.querySelector('#more9 .e77');if(e7&&!e7.querySelector('[data-p80open]'))e7.insertAdjacentHTML('beforeend','<button data-p80open>📋 פרומטים ל-GPT</button>');
 const sm=document.querySelector('#studio .smenu');if(sm&&!sm.querySelector('[data-p80open]'))sm.insertAdjacentHTML('beforeend','<button data-p80open>📋 פרומטים ל-GPT</button>')}
{const _om=window.openMiss77;if(_om)window.openMiss77=function(){const r=_om.apply(this,arguments);addBtns();return r}}
document.addEventListener('click',()=>setTimeout(addBtns,40));setTimeout(addBtns,1600);
})();

// ===== v83 (2026-10-22): the rest of the "50 upgrades" list – holidays and a wear diary on the home screen, closet tools
// (worn-most sort, "חדש", wall view, multi-select, side index, voice search), item window (swipe photos, "עם מה זה הולך",
// wear dates, share, voice notes), studio (next garment, double-tap zoom, street background, hip check, QA page),
// batch upload of GPT sheets, pose count on cards, weekly upload reminder, return-tomorrow alert, look board by drag,
// album by event + stars, closet gaps, shopping list, daily backup.
(()=>{
const lsG=k=>{try{return localStorage.getItem(k)}catch(_){return null}},lsS=(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}};
const thumb=id=>{let u='';try{u=img(id)}catch(_){}return `<img data-th="${id}" src="${u||TPH}" alt="" loading="lazy">`};
const lz=root=>{try{thCats(root).forEach(c=>thLoad(c).then(()=>thApply(TH)))}catch(_){}};
const live=id=>D[id]&&(IT[id]||{}).s!='ret'&&(IT[id]||{}).s!='give';
const iso=d=>{const x=new Date(d);x.setMinutes(x.getMinutes()-x.getTimezoneOffset());return x.toISOString().slice(0,10)};
const tIso=()=>iso(new Date());
const fmt=s=>{const [y,m,d]=s.split('-');return `${+d}/${+m}`};
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v83 '+w+': '+(e&&e.message||e));
const sheet=(id,cls)=>{let d=$('#'+id);if(!d){d=document.createElement('dialog');d.id=id;d.className='sheet9 '+(cls||'');d.dir='rtl';document.body.appendChild(d)}return d};
const sname=s=>((typeof SLOTS!='undefined'&&SLOTS.find(x=>x[0]==s))||[])[1]||s;
const poses=id=>{const it=IT[id]||{};return ['front','side','back','half','hip'].filter(k=>(it.p5g&&it.p5g[k])||(it.p5gv||[]).some(g=>g&&g[k])).length};
const usesPoses=id=>(typeof P5G_SLOTS!='undefined'?P5G_SLOTS:[]).includes(slotOf(id));

// ================= HOME =================
// ---- 5/6. Jewish holidays from the Hebrew calendar (no fixed dates), look of the day by weekday / holiday
const HOL=[['תשרי',1,'ראש השנה',1,'🍎'],['תשרי',10,'יום כיפור',1,'🤍'],['תשרי',15,'סוכות',1,'🌿'],['תשרי',22,'שמחת תורה',1,'📜'],['כסלו',25,'חנוכה',0,'🕎'],
 ['שבט',15,'ט״ו בשבט',0,'🌳'],['אדר',14,'פורים',0,'🎭'],['אדר ב׳',14,'פורים',0,'🎭'],['ניסן',15,'פסח',1,'🍷'],['סיוון',6,'שבועות',1,'🌾']];
let HF=null;try{HF=new Intl.DateTimeFormat('he-IL-u-ca-hebrew',{day:'numeric',month:'long'})}catch(_){}
function holOn(d){if(!HF)return null;try{const p=HF.formatToParts(d);const dd=+(p.find(x=>x.type=='day')||{}).value;const mm=(p.find(x=>x.type=='month')||{}).value;return HOL.find(h=>h[0]==mm&&h[1]==dd)||null}catch(_){return null}}
function nextHol(){const t=new Date();t.setHours(12,0,0,0);for(let i=0;i<400;i++){const d=new Date(t.getTime()+i*864e5);const h=holOn(d);if(h)return {name:h[2],chag:h[3],ic:h[4],days:i,date:d}}return null}
window.nextHol83=nextHol;
// used by the look of the day (fix77): which occasion today is, and its title
window.occToday83=()=>{const t=new Date();const wd=t.getDay();const h=holOn(t),h2=holOn(new Date(t.getTime()+864e5));
 if(h&&h[3])return ['shab','לוק ל'+h[2]];if(h2&&h2[3]&&t.getHours()>=12)return ['shab','לוק ל'+h2[2]];
 if(wd==6||wd==5)return ['shab','לוק לשבת'];if(h)return ['day','לוק ל'+h[2]];return ['day','']};
function paintHol(){const top=document.querySelector('header.top');if(!top)return;let b=$('#hol83');const n=nextHol();
 if(!n||n.days>45){if(b)b.remove();return}
 if(!b){b=document.createElement('div');b.id='hol83';top.appendChild(b)}
 const when=n.days==0?'היום':n.days==1?'מחר':`עוד ${n.days} ימים`;
 b.innerHTML=`<span class="h83i">${n.ic}</span><span class="h83t"><b>${when} ${n.days>1?'ל':''}${n.name}</b><small>${n.date.toLocaleDateString('he-IL',{weekday:'long',day:'numeric',month:'numeric'})}</small></span><button data-hol83="${n.chag?'shab':'day'}">הצעת לוק ל${n.name}</button>`}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-hol83]');if(!b)return;
 let L=null;try{L=genLook({occ:b.dataset.hol83,sea:curSeason(),fav:false,kids:false})}catch(_){}
 if(L&&Object.keys(L).length)openStudio(null,L);else toast('לא מצאתי מספיק בגדים ללוק')});

// ---- 7/22. wear diary: every "לבשתי היום" also keeps the date (IT[id].wl), undo removes it
{const _p=putItem;putItem=function(id,patch){try{if(patch&&'wear' in patch){const it=IT[id]||{};const old=it.wear||0;const wl=(it.wl||[]).slice();
  if(patch.wear>old)wl.push(tIso());else if(patch.wear<old){const i=wl.lastIndexOf(tIso());if(i>=0)wl.splice(i,1);else wl.pop()}
  patch=Object.assign({},patch,{wl:wl.slice(-120)})}}catch(e){ERR('wl',e)}return _p.call(this,id,patch)}}
function weekDays(){const now=new Date();const s=new Date(now);s.setDate(now.getDate()-now.getDay());const a=[];for(let i=0;i<7;i++){const d=new Date(s);d.setDate(s.getDate()+i);a.push(iso(d))}return a}
function paintWeek(){const top=document.querySelector('header.top');if(!top||typeof D=='undefined')return;let b=$('#wk83');
 const days=weekDays(),td=tIso();const by={};Object.keys(D).forEach(id=>{((IT[id]||{}).wl||[]).forEach(x=>{if(days.includes(x))(by[x]=by[x]||[]).includes(id)||(by[x]=by[x]||[]).push(id)})});
 if(!b){b=document.createElement('div');b.id='wk83';top.appendChild(b)}
 const n=Object.values(by).reduce((s,a)=>s+a.length,0);const L='אבגדהוש';
 b.innerHTML=`<div class="w83h"><h3>השבוע שלי</h3><small>${n?`${n} בגדים סומנו השבוע`:'לוחצים "לבשתי היום" ומתמלא כאן'}</small></div><div class="w83r">${days.map((d,i)=>{const ids=by[d]||[];
  return `<button class="w83d${d==td?' td':''}${ids.length?' on':''}" ${ids.length?`data-open="${ids[0]}"`:'disabled'} aria-label="יום ${L[i]}${ids.length?': '+ids.length+' בגדים':''}"><span class="w83c">${ids.length?thumb(ids[0]):''}${ids.length>1?`<i>+${ids.length-1}</i>`:''}</span><span class="w83l">${L[i]}׳</span></button>`}).join('')}</div>`;
 lz(b)}

// ---- 45. return deadline tomorrow / today – banner on the home screen (and in the bell, below)
const lastDay=()=>Object.keys(D).filter(id=>{const it=IT[id]||{};if(it.s=='ret'||it.s=='kept'||it.s=='give')return false;const n=daysLeft(D[id].rdl);return n===0||n===1});
function paintRet(){const top=document.querySelector('header.top');if(!top)return;let b=$('#rt83');const L=lastDay();
 if(!L.length){if(b)b.remove();return}
 if(!b){b=document.createElement('button');b.id='rt83';b.dataset.rt83=1;top.appendChild(b)}
 const t0=L.filter(id=>daysLeft(D[id].rdl)===0).length;
 b.innerHTML=`<span>⏰</span><span><b>${t0?`היום אחרון להחזרה של ${t0} פריטים`:`מחר אחרון להחזרה של ${L.length} פריטים`}</b><small>לא סימנת אם להשאיר או להחזיר. לחצי לראות אותם</small></span><span class="r83th">${L.slice(0,3).map(thumb).join('')}</span>`;lz(b)}
document.addEventListener('click',e=>{if(!(e.target.closest&&e.target.closest('[data-rt83]')))return;try{$('#sort').value='ret';SORT='ret';sortAll();apply();const g=document.querySelector('section:not(.hide)');if(g)g.scrollIntoView({behavior:'smooth'})}catch(err){ERR('rt',err)}});

// ---- 38 + 45 in the bell: the weekly "5 to upload", and return-tomorrow
function upWeek(){return Object.keys(D).filter(id=>live(id)&&usesPoses(id)&&!(window.avReady&&avReady(id))).sort((a,b)=>((IT[b]||{}).wear||0)-((IT[a]||{}).wear||0)||((IT[b]||{}).fav?1:0)-((IT[a]||{}).fav?1:0)).slice(0,5)}
if(typeof getAlerts=='function'){const _ga=getAlerts;getAlerts=function(){const A=_ga.apply(this,arguments)||[];try{
 const L=lastDay();if(L.length){const t0=L.filter(id=>daysLeft(D[id].rdl)===0);A.unshift({lvl:3,txt:t0.length?`היום היום האחרון להחזרה של ${t0.length} פריטים!`:`מחר היום האחרון להחזרה של ${L.length} פריטים.`,ids:L})}
 const u=upWeek();if(u.length)A.push({lvl:1,txt:`השבוע כדאי להעלות לאווטאר ${u.length} בגדים שאת לובשת הרבה. ב"מה חסר לאווטאר" יש פרומט לכל אחד.`,ids:u})}catch(e){ERR('alerts',e)}return A}}

// ================= CLOSET =================
// ---- 13. sort by wear
function addSorts(){const s=$('#sort');if(!s||s.querySelector('[value=wm]'))return;s.insertAdjacentHTML('beforeend','<option value="wm">👗 הכי לבשתי</option><option value="wf">💤 הכי פחות לבשתי</option>')}
if(typeof key=='function'){const _k=key;key=function(c){const it=IT[c.dataset.id]||{};if(SORT=='wm')return -(it.wear||0)*1e4-(it.lastWorn?+it.lastWorn.replace(/-/g,'')%1e4:0);
 if(SORT=='wf')return (it.wear||0)*1e9+(it.lastWorn?+it.lastWorn.replace(/-/g,''):0);return _k(c)}}

// ---- 18. "חדש" on items ordered in the last 14 days
function ageDays(c){const d=+c.dataset.d;if(!d)return 999;const m=Math.floor(d/100),dd=d%100;const now=new Date();let t=new Date(now.getFullYear(),m-1,dd);if(t>now)t=new Date(now.getFullYear()-1,m-1,dd);return Math.floor((now-t)/864e5)}
// ---- 37. pose count on clothing cards
// "חדש" goes away once the item was opened
const SEEN=new Set((()=>{try{return JSON.parse(lsG('seen83')||'[]')}catch(_){return []}})());
const seen=id=>{if(SEEN.has(id))return;SEEN.add(id);lsS('seen83',JSON.stringify([...SEEN].slice(-1500)));document.querySelectorAll(`.card[data-id="${id}"] .new83`).forEach(e=>e.remove())};
function paintCards(){document.querySelectorAll('.grid .card').forEach(c=>{const ph=c.querySelector('.ph');if(!ph)return;const id=c.dataset.id;
 const it=IT[id]||{};const nw=ageDays(c)<=14&&it.s!='ret'&&!it.wear&&!SEEN.has(id);let e=ph.querySelector('.new83');if(nw&&!e)ph.insertAdjacentHTML('beforeend','<span class="new83">חדש</span>');else if(!nw&&e)e.remove();
 let a=ph.querySelector('.av83');const n=D[id]&&usesPoses(id)?poses(id):0;
 if(!n){if(a)a.remove();return}const t=n==5?'✓ 5/5':`${n}/5`;if(!a){ph.insertAdjacentHTML('beforeend',`<span class="av83${n==5?' ok':''}" title="תנוחות מוכנות על הדמות">${t}</span>`)}else if(a.textContent!=t){a.textContent=t;a.classList.toggle('ok',n==5)}})}

// ---- 14/17. tools row: multi-select and wall view
function toolsRow(){const r=$('#q77');if(!r||r.querySelector('.t83'))return;r.insertAdjacentHTML('afterbegin',`<span class="t83"><button data-sel83 aria-pressed="false">☑ בחירה</button><button data-wall83 aria-pressed="${document.body.classList.contains('wall83')}">▦ קיר</button></span>`)}
if(lsG('wall83')=='1')document.body.classList.add('wall83');
const SEL=new Set();
function selBar(){let b=$('#sb83');if(!document.body.classList.contains('sel83')){if(b)b.remove();return}
 if(!b){b=document.createElement('div');b.id='sb83';b.dir='rtl';document.body.appendChild(b)}
 const LOC=['ארון','מגירה','מחסן','כביסה','אצל התופרת'];
 b.innerHTML=`<b>${SEL.size?`נבחרו ${SEL.size}`:'לחצי על בגדים לבחירה'}</b><div class="sb83a"><button data-sb83="day" ${SEL.size?'':'disabled'}>חול</button><button data-sb83="shab" ${SEL.size?'':'disabled'}>שבת</button><button data-sb83="both" ${SEL.size?'':'disabled'}>חול + שבת</button>
 <select data-sb83loc ${SEL.size?'':'disabled'} aria-label="מיקום"><option value="">📍 מיקום…</option>${LOC.map(l=>`<option>${l}</option>`).join('')}</select><button data-sb83="fav" ${SEL.size?'':'disabled'}>♥ מועדף</button><button data-sb83="gen" ${SEL.size?'':'disabled'}>🗃 לרשימה הכללית</button><button data-sb83="x" class="x83">סיום</button></div>`}
function selMode(on){document.body.classList.toggle('sel83',on);if(!on){SEL.clear();document.querySelectorAll('.card.s83').forEach(c=>c.classList.remove('s83'))}
 document.querySelectorAll('[data-sel83]').forEach(b=>b.setAttribute('aria-pressed',on));selBar()}
document.addEventListener('click',e=>{if(!document.body.classList.contains('sel83'))return;const c=e.target.closest&&e.target.closest('.grid .card');if(!c)return;e.preventDefault();e.stopPropagation();
 const id=c.dataset.id;if(SEL.has(id)){SEL.delete(id);c.classList.remove('s83')}else{SEL.add(id);c.classList.add('s83')}selBar()},true);
async function bulk(fn,msg){const ids=[...SEL];for(const id of ids){try{await putItem(id,fn(id))}catch(e){ERR('bulk',e)}}try{paintAll();apply()}catch(_){}setTimeout(()=>toast(`${msg} · ${ids.length} בגדים`),80);selMode(false)}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sel83],[data-wall83],[data-sb83]');if(!t)return;
 if(t.dataset.sel83!==undefined){selMode(!document.body.classList.contains('sel83'));if(document.body.classList.contains('sel83'))toast('לחצי על הבגדים שרוצים לשנות');return}
 if(t.dataset.wall83!==undefined){const on=!document.body.classList.contains('wall83');document.body.classList.toggle('wall83',on);lsS('wall83',on?'1':'0');t.setAttribute('aria-pressed',on);return}
 const k=t.dataset.sb83;if(k=='x'){selMode(false);return}
 const D_=['יומיומי','עבודה'],S_=['שבת וחג','אירוע'];const tg=id=>{const c=card(id);return (IT[id]||{}).tg||(c?tgs(c).filter(Boolean):[])};
 if(k=='day')bulk(id=>({tg:[...tg(id).filter(x=>!S_.includes(x)&&!D_.includes(x)),'יומיומי']}),'סומנו חול');
 if(k=='shab')bulk(id=>({tg:[...tg(id).filter(x=>!S_.includes(x)&&!D_.includes(x)),'שבת וחג']}),'סומנו שבת');
 if(k=='both')bulk(id=>({tg:[...tg(id).filter(x=>!S_.includes(x)&&!D_.includes(x)),'יומיומי','שבת וחג']}),'סומנו חול + שבת');
 if(k=='fav')bulk(()=>({fav:true}),'נוספו למועדפים');
 if(k=='gen')bulk(()=>({gen:Date.now()}),'🗃 הועברו לרשימה הכללית')});
document.addEventListener('change',e=>{const s=e.target.closest&&e.target.closest('[data-sb83loc]');if(!s||!s.value)return;const v=s.value;bulk(()=>({loc:v}),'המיקום עודכן: '+v)});

// ---- 16. side index: jump between categories
function paintIdx(){let r=$('#ix83');const secs=[...document.querySelectorAll('main section[id], section[id]')].filter(s=>!s.classList.contains('hide')&&s.querySelector('.grid'));
 if(secs.length<3){if(r)r.remove();return}
 if(!r){r=document.createElement('nav');r.id='ix83';r.setAttribute('aria-label','קפיצה לקטגוריה');document.body.appendChild(r)}
 const nm=s=>{const h=s.querySelector('h2');return ((h&&h.firstChild&&h.firstChild.textContent)||s.id).trim().split(/\s+/)[0].slice(0,6)};
 const html=secs.map(s=>`<button data-ix83="${s.id}">${esc(nm(s))}</button>`).join('');if(r.dataset.h!=html){r.innerHTML=html;r.dataset.h=html}}
function ixShow(){const r=$('#ix83');if(!r)return;const g=document.querySelector('section:not(.hide) .grid');const y=g?g.getBoundingClientRect().top:9999;r.classList.toggle('on',y<window.innerHeight*.5&&!document.querySelector('dialog[open]'))}
window.addEventListener('scroll',()=>{ixShow()},{passive:true});
const ixGo=id=>{const s=document.getElementById(id);if(s){const bar=document.querySelector('.ctrl');const off=(bar?bar.getBoundingClientRect().height:0)+8;window.scrollTo({top:s.getBoundingClientRect().top+window.scrollY-off})}};
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-ix83]');if(b)ixGo(b.dataset.ix83)});
document.addEventListener('touchmove',e=>{const r=$('#ix83');if(!r||!r.contains(e.target))return;e.preventDefault();const t=e.touches[0];const el=document.elementFromPoint(t.clientX,t.clientY);const b=el&&el.closest&&el.closest('[data-ix83]');if(b&&b.dataset.ix83!=r.dataset.cur){r.dataset.cur=b.dataset.ix83;ixGo(b.dataset.ix83);r.querySelectorAll('button').forEach(x=>x.classList.toggle('cur',x==b))}},{passive:false});

// ---- 12. voice search (works where the browser allows the microphone)
function voiceBtn(){const q=$('#q');const w=q&&q.parentElement;if(!w||w.querySelector('.mic83'))return;const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;
 w.insertAdjacentHTML('beforeend','<button type="button" class="mic83" aria-label="חיפוש קולי">🎤</button>');
 w.querySelector('.mic83').addEventListener('click',ev=>{ev.preventDefault();const b=ev.currentTarget;let r;try{r=new SR()}catch(_){toast('חיפוש קולי לא זמין כאן');return}r.lang='he-IL';r.interimResults=false;r.maxAlternatives=1;
  b.classList.add('on');toast('מקשיבה… תגידי למשל "חצאית שחורה"');
  r.onresult=e=>{const t=(e.results[0][0].transcript||'').trim();q.value=t;q.dispatchEvent(new Event('input',{bubbles:true}));q.dispatchEvent(new Event('change',{bubbles:true}))};
  r.onerror=e=>{b.classList.remove('on');toast(e.error=='not-allowed'||e.error=='service-not-allowed'?'המיקרופון חסום בתוך האתר. אפשר ללחוץ על המיקרופון שבמקלדת של הטלפון':'לא שמעתי, נסי שוב')};
  r.onend=()=>b.classList.remove('on');try{r.start()}catch(_){b.classList.remove('on')}})}

// ================= ITEM WINDOW =================
// ---- 20. swipe between photos + dots
if(typeof paintGal=='function'){const _pg=paintGal;paintGal=function(id){const r=_pg.apply(this,arguments);try{const w=$('#dlbody .mwrap');if(!w)return r;w.querySelector('.gd83')?.remove();const L=galList(id);if(L.length<2)return r;const i=GI[id]||0;
 w.insertAdjacentHTML('beforeend',`<span class="gd83">${L.map((_,k)=>`<i class="${k==i?'on':''}"></i>`).join('')}</span>`);
 if(!w.dataset.sw83){w.dataset.sw83=1;let x0=null,y0=null;w.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  w.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(galList(CUR).length<2)return;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3){e.stopPropagation();galStep(CUR,dx<0?1:-1)}})}}catch(e){ERR('gal',e)}return r}}

// ---- 21. "עם מה זה הולך?"
const PAIR={dress:['scarf','shoes','belt','outer','bag','jewelry'],skirt:['top','scarf','shoes','belt','outer','bag'],top:['skirt','scarf','shoes','belt','outer','jewelry'],
 set:['scarf','shoes','belt','outer','bag','jewelry'],outer:['dress','skirt','top','scarf','shoes','bag'],scarf:['dress','skirt','top','outer','shoes','jewelry'],
 shoes:['dress','skirt','top','scarf','bag','outer'],belt:['dress','skirt','top','scarf','shoes','bag'],bag:['dress','skirt','top','scarf','shoes','outer'],jewelry:['dress','skirt','top','scarf','set','outer']};
function goesWith(id){const s=slotOf(id);const want=PAIR[s];if(!want)return [];const f=famOf(id);const by={};
 Object.keys(D).forEach(o=>{if(o==id||!live(o))return;const so=slotOf(o);if(!want.includes(so))return;const fo=famOf(o);if(f&&fo&&!goes(f,fo))return;(by[so]=by[so]||[]).push(o)});
 const sc=o=>{const it=IT[o]||{};return (window.avReady&&avReady(o)?100:0)+(it.fav?30:0)+Math.min(30,(it.wear||0)*3)+(famOf(o)==f?5:0)};
 Object.values(by).forEach(a=>a.sort((p,q)=>sc(q)-sc(p)));const out=[];for(let r=0;out.length<6&&r<6;r++)for(const s2 of want){const a=by[s2]||[];if(a[r]&&out.length<6)out.push(a[r])}return out}
// ---- 22. wear dates, 23. share, 24. voice notes – all in the item window
function itemExtras(id){const body=$('#dlbody');if(!body||!D[id])return;body.querySelectorAll('.x83').forEach(x=>x.remove());const it=IT[id]||{};
 seen(id);let bar=body.querySelector('.it77');if(!bar){bar=document.createElement('div');bar.className='it77 x83';const h3=body.querySelector('h3');if(h3)h3.after(bar);else body.prepend(bar)}
 if(!bar.querySelector('[data-sh83]'))bar.insertAdjacentHTML('beforeend','<button data-sh83="1">📤 שיתוף</button><button data-vn83="rec">🎙 הערה קולית</button>');
 const g=goesWith(id);const wl=(it.wl||[]).slice().reverse();const extra=Math.max(0,(it.wear||0)-wl.length);
 const vn=it.vn||[];
 const html=`<div class="x83 gw83">${g.length?`<div class="g83h"><h4>עם מה זה הולך?</h4><button class="go" data-gw83="${id}">👗 לוק עם הבגד הזה</button></div><div class="g83r">${g.map(o=>`<button data-open="${o}" aria-label="${esc((D[o].short||'').slice(0,40))}">${thumb(o)}<small>${esc(sname(slotOf(o)))}</small></button>`).join('')}</div>`:''}
 <div class="wh83"><b>נלבש:</b> ${wl.length?wl.slice(0,12).map(fmt).join(' · ')+(wl.length>12?` ועוד ${wl.length-12}`:''):'עוד אין תאריכים'}${extra?` <small>(ועוד ${extra} ${extra==1?'פעם':'פעמים'} מלפני שהתחלנו לשמור תאריכים)</small>`:''}</div>
 ${vn.length?`<div class="vn83"><b>הערות קוליות</b>${vn.map((v,i)=>`<div class="vn83i"><audio controls preload="none" src="/_blob/${v.id}"></audio><small>${new Date(v.t).toLocaleDateString('he-IL')}</small><button data-vn83="del" data-i="${i}" aria-label="מחיקה">🗑</button></div>`).join('')}</div>`:''}</div>`;
 (bar||body.querySelector('.mwrap')||body.firstElementChild).insertAdjacentHTML('afterend',html);lz(body.querySelector('.gw83'))}
{const _ao=window.afterOpen;window.afterOpen=function(id){try{if(_ao)_ao.apply(this,arguments)}catch(_){}try{itemExtras(id)}catch(e){ERR('item',e)}}}
async function share(id){const x=D[id];const txt=(x.short||x.full||'')+(x.color?' · '+x.color:'');try{let u='';try{const L=galList(id);u=L[GI[id]||0]&&L[GI[id]||0].u}catch(_){}u=u||img(id);
  if(u&&navigator.canShare){const bl=await (await fetch(u)).blob();const f=new File([bl],(x.short||'בגד').slice(0,30)+'.jpg',{type:bl.type||'image/jpeg'});if(navigator.canShare({files:[f]})){await navigator.share({files:[f],text:txt});return}}
  if(navigator.share){await navigator.share({text:txt});return}}catch(e){if(e&&e.name=='AbortError')return}
 try{window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank')}catch(_){toast('השיתוף לא זמין כאן')}}
let REC=null;
async function voice(id,btn){if(REC){try{REC.r.stop()}catch(_){}return}
 let st;try{st=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){toast('המיקרופון חסום בתוך האתר. אפשר לכתוב הערה בשדה ההערות');return}
 const ch=[];let r;try{r=new MediaRecorder(st)}catch(_){st.getTracks().forEach(t=>t.stop());toast('הקלטה לא נתמכת בדפדפן הזה');return}
 REC={r,id};const t0=Date.now();btn.textContent='⏹ עצירה';btn.classList.add('on');const lim=setTimeout(()=>{try{r.stop()}catch(_){}},60000);
 r.ondataavailable=e=>{if(e.data&&e.data.size)ch.push(e.data)};
 r.onstop=async()=>{clearTimeout(lim);st.getTracks().forEach(t=>t.stop());REC=null;btn.textContent='🎙 הערה קולית';btn.classList.remove('on');
  const bl=new Blob(ch,{type:'video/webm'});if(bl.size<500){toast('ההקלטה קצרה מדי');return}
  let a=null;try{a=await claude.use('assets')}catch(_){}if(!a){toast('שמירת הקלטות לא זמינה כאן');return}
  try{toast('שומרת את ההקלטה…');const res=await a.upload(bl);const vn=((IT[id]||{}).vn||[]).concat([{id:res.id,t:Date.now(),s:Math.round((Date.now()-t0)/1000)}]);await putItem(id,{vn});if(CUR==id)itemExtras(id);setTimeout(()=>toast('✓ ההערה הקולית נשמרה'),80)}catch(e){toast('לא הצלחתי לשמור את ההקלטה')}};
 r.start();toast('מקליטה… לחצי שוב לעצירה (עד דקה)')}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sh83],[data-vn83],[data-gw83]');if(!t)return;e.preventDefault();
 if(t.dataset.sh83)return share(CUR);
 if(t.dataset.gw83){const id=t.dataset.gw83;let L=null;try{L=genLook({occ:isShab(card(id))&&!isDay(card(id))?'shab':'day',sea:curSeason(),fav:false,kids:false},new Set(),id)}catch(_){}if(!L||!Object.keys(L).length){L={};L[slotOf(id)]=id}try{$('#dlg').close()}catch(_){}openStudio(null,L);return}
 if(t.dataset.vn83=='rec')return voice(CUR,t);
 if(t.dataset.vn83=='del'){const vn=((IT[CUR]||{}).vn||[]).slice();vn.splice(+t.dataset.i,1);putItem(CUR,{vn}).then(()=>itemExtras(CUR))}});

// ================= STUDIO =================
// ---- 8. soft fade when the head covering / hair changes
{const _ds=drawStudio;let prev=null;drawStudio=async function(...a){const r=await _ds.apply(this,a);try{if(ST){const k=[ST.items.scarf||'',ST.head||'',ST.items.hairacc||''].join('|');const st=$('#sstage');
 if(prev!=null&&k!=prev&&st){st.classList.remove('hd83');void st.offsetWidth;st.classList.add('hd83');setTimeout(()=>st.classList.remove('hd83'),600)}prev=k}}catch(_){}return r}}
// ---- 27. next / previous garment of the same kind (buttons + swipe on the selection bar)
function nextItem(d){if(!ST||!SSEL||!ST.items[SSEL])return;let ids=[];try{ids=drawerItems(SSEL)}catch(_){}const R=ids.filter(id=>window.avReady&&avReady(id));const L=R.length>1?R:ids;if(L.length<2){toast('אין עוד בגדים מהסוג הזה');return}
 const i=L.indexOf(ST.items[SSEL]);const n=L[((i<0?0:i+d)+L.length)%L.length];const s=SSEL;setItem(s,n);try{SSEL=s;paintSel()}catch(_){}}
if(typeof paintSel=='function'){const _ps=paintSel;paintSel=function(){const r=_ps.apply(this,arguments);try{const c=$('#ssel');if(c&&ST&&SSEL&&ST.items[SSEL]&&!c.querySelector('.nx83'))c.insertAdjacentHTML('afterbegin',`<span class="nx83"><button data-nx83="-1" aria-label="הבגד הקודם">‹ הקודם</button><button data-nx83="1" aria-label="הבגד הבא">הבא ›</button></span>`)}catch(_){}return r}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-nx83]');if(b){e.preventDefault();nextItem(+b.dataset.nx83)}});
{let x0=null,y0=null;const scrollsX=el=>{for(let n=el;n&&n.id!='ssel';n=n.parentElement)if(n.scrollWidth>n.clientWidth+4&&/auto|scroll/.test(getComputedStyle(n).overflowX))return true;return false};
 document.addEventListener('touchstart',e=>{const s=e.target.closest&&e.target.closest('#ssel');const ok=s&&!scrollsX(e.target)&&!(e.target.closest('input,select'));x0=ok?e.touches[0].clientX:null;y0=ok?e.touches[0].clientY:null},{passive:true});
 document.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5&&!(e.target.closest&&e.target.closest('input[type=range]')))nextItem(dx<0?1:-1)},{passive:true})}
// ---- 28. double tap on the avatar = zoom on the face, again = back
{let last=0,lx=0,ly=0;const tog=()=>{const st=$('#sstage');if(!st)return;st.classList.toggle('fz83')};
 document.addEventListener('dblclick',e=>{if(e.target.closest&&e.target.closest('#sstage'))tog()});
 document.addEventListener('touchend',e=>{if(!(e.target.closest&&e.target.closest('#sstage'))||e.changedTouches.length!=1)return;const t=e.changedTouches[0],now=Date.now();
  if(now-last<320&&Math.hypot(t.clientX-lx,t.clientY-ly)<30){last=0;e.preventDefault();tog();return}last=now;lx=t.clientX;ly=t.clientY},{passive:false})}
// ---- 31. one more background: street (event hall and garden were already there)
try{if(typeof BGS=='object'){
 BGS.street=['רחוב','linear-gradient(180deg,#dfeaf2 0 30%,transparent 30%),repeating-linear-gradient(90deg,#e8ddd0 0 34px,#d9cbb9 34px 36px,#efe5d8 36px 70px,#d9cbb9 70px 72px),linear-gradient(180deg,transparent 0 76%,#bfb4a8 76% 77%,#cfc6bb 77% 100%)',['#dfeaf2','#cfc6bb']];
}}catch(e){ERR('bgs',e)}

// ---- 33. dresses / skirts: also check the hips, not only the waist / shoulders
async function hipGuard(slot,ctx){if(!['skirt','dress','set'].includes(slot))return false;let id,tf,v,g;
 if(ctx){({id,tf,v,g}=ctx)}else{if(!ST||(ST.avbase||'long')!='p5')return false;id=ST.items[slot];tf=ST.tf[slot];if(!id||!tf)return false;g=p5gOfT(id,tf);v=ST.view||'front'}
 if(!g||!g[v]||!tf||(tf.pvman&&tf.pvman[v]))return false;const B=(typeof P5BODY!='undefined'&&(P5BODY[v]||P5BODY.front));if(!B||!B.hp)return false;
 const url=p5gUrl(g,v);let use=url;try{const cl=await cleanP5(url,false);use=cl&&cl.url||url}catch(_){}
 const ro=await rowsOf(use,tf.w/100*399);if(!ro)return false;const sx=tf.sx||1,sy=tf.sy||1;const cy=tf.y/100*1365,cx=tf.x/100*399,top=cy-ro.H*sy/2;
 const ws=[];for(let dy=-16;dy<=16;dy+=8){const r=Math.round((B.y.hp+dy-top)/sy);const q=r>=0&&r<ro.H?ro.R[r]:null;if(q)ws.push((q[1]-q[0])*sx)}if(ws.length<3)return false;ws.sort((a,b)=>a-b);
 const gw=ws[ws.length>>1],need=B.hp[1]*1.03;if(gw>=need)return false;const cap=slot=='skirt'?1.45:1.15;const nsx=Math.min(cap,sx*need/gw);if(nsx-sx<.02)return false;tf.sx=Math.round(nsx*100)/100;return true}
if(typeof smartFit=='function'){const _sf=smartFit;smartFit=async function(slot,force,ctx){const r=await _sf.apply(this,arguments);let h=false;try{h=await hipGuard(slot,ctx)}catch(e){ERR('hip',e)}return r||h};window.smartFit=smartFit}

// ---- 34. check page: every garment with avatar pictures, in all 5 poses
const PZ=[['front','חזית'],['side','צד'],['back','גב'],['half','חצי'],['hip','מותן']];let QF='';
async function qaRender(fig){const id=fig.dataset.qa,v=fig.dataset.v;const slot=slotOf(id);try{const S=Object.assign(newST(),{avbase:'p5',items:{[slot]:id},tf:{},view:v,head:'hair'});
 let tf={x:50,y:50,w:60,r:0};try{tf=await autoTf(slot,id)}catch(_){}try{await smartFit(slot,true,{id,tf,v,g:p5gOfT(id,tf)})}catch(_){}S.tf[slot]=tf;
 fig.querySelector('.mst').innerHTML=await stageInner(S,{})}catch(e){fig.querySelector('.mst').innerHTML='<small>לא הצלחתי לצייר</small>'}}
function openQA(){const d=sheet('qa83','qa83');const all=Object.keys(D).filter(id=>live(id)&&usesPoses(id)&&poses(id)>0);const cats=[...new Set(all.map(slotOf))];const L=QF?all.filter(id=>slotOf(id)==QF):all;
 d.innerHTML=`<div class="sh9h"><h3>בדיקה: כל בגד בכל תנוחה</h3><button class="x" data-qa83x aria-label="סגירה">✕</button></div><div class="qa83b"><p class="m77h">${all.length} בגדים עם תמונות אווטאר. גוללים ובודקים שכל תנוחה יושבת טוב. "לסטודיו" פותח את הבגד לתיקון.</p>
 <div class="m77f"><button data-qa83f="" aria-pressed="${!QF}">הכל ${all.length}</button>${cats.map(s=>`<button data-qa83f="${s}" aria-pressed="${QF==s}">${esc(sname(s))} ${all.filter(id=>slotOf(id)==s).length}</button>`).join('')}</div>
 ${L.map(id=>`<div class="qa83r"><div class="qa83t">${thumb(id)}<b>${esc((D[id].short||'').slice(0,40))}</b><small>${poses(id)}/5 תנוחות</small><button data-qa83s="${id}">לסטודיו</button></div><div class="qa83p">${PZ.map(([k,n])=>`<figure data-qa="${id}" data-v="${k}"><div class="mst"></div><figcaption>${n}</figcaption></figure>`).join('')}</div></div>`).join('')}</div>`;
 if(!d.open)d.showModal();lz(d);
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);qaRender(e.target)}}),{root:d,rootMargin:'300px 0px'});d.querySelectorAll('figure[data-qa]').forEach(f=>io.observe(f))}
window.openQA83=openQA;
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-qa83],[data-qa83x],[data-qa83f],[data-qa83s]');if(!t)return;
 if(t.dataset.qa83x!==undefined){$('#qa83').close();return}if(t.dataset.qa83f!==undefined){QF=t.dataset.qa83f;openQA();return}
 if(t.dataset.qa83s){const id=t.dataset.qa83s;$('#qa83').close();openStudio(null,{[slotOf(id)]:id});return}openQA()});

// ---- 48. studio: once it is open, quietly fetch the other poses so turning the avatar is instant
{const _os=openStudio;let done=false;openStudio=async function(){const r=await _os.apply(this,arguments);if(!done){done=true;setTimeout(()=>{['side','back','half','hip'].forEach(v=>['p5_','p5c_'].forEach(p=>{const i=new Image();i.src=`av/${p}${v}.webp?v=${window.VER||''}`;const j=new Image();j.src=`av/${p}${v}_head.webp?v=${window.VER||''}`}))},1500)}return r}}

// ================= AVATAR =================
// ---- 35. upload several GPT sheets at once
let BU=[];let BUPICK=-1;let BUF='';
function missP(){return Object.keys(D).filter(id=>live(id)&&usesPoses(id)&&!(window.avReady&&avReady(id))).sort((a,b)=>((IT[b]||{}).wear||0)-((IT[a]||{}).wear||0))}
function openBU(){const d=sheet('bu83','bu83');const M=missP();
 const pick=BUPICK>=0?`<div class="bu83pk"><p><b>לאיזה בגד הגיליון הזה?</b></p><div class="m77f">${['',...new Set(M.map(slotOf))].map(s=>`<button data-bu83f="${s}" aria-pressed="${BUF==s}">${s?esc(sname(s)):'הכל'}</button>`).join('')}</div><div class="bu83g">${M.filter(id=>!BUF||slotOf(id)==BUF).slice(0,120).map(id=>`<button data-bu83id="${id}" aria-label="${esc((D[id].short||'').slice(0,40))}">${thumb(id)}<small>${esc((D[id].short||'').slice(0,22))}</small></button>`).join('')}</div><button data-bu83pk="x">ביטול</button></div>`:'';
 d.innerHTML=`<div class="sh9h"><h3>העלאת כמה גיליונות GPT</h3><button class="x" data-bu83x aria-label="סגירה">✕</button></div><div class="bu83b">
 <p class="m77h">1. בוחרים כמה גיליונות מהגלריה. 2. ליד כל גיליון בוחרים לאיזה בגד הוא. 3. "להעלות הכל".</p>
 <label class="go bu83in">🖼 בחירת גיליונות<input type="file" accept="image/*" multiple hidden data-bu83in></label>
 ${BU.map((b,i)=>`<div class="bu83r"><img src="${b.u}" alt=""><div><b>${b.id?esc((D[b.id].short||'').slice(0,40)):'עוד לא נבחר בגד'}</b><small>${b.st||''}</small><div class="bu83a"><button data-bu83p="${i}">${b.id?'להחליף בגד':'לבחור בגד'}</button><button data-bu83del="${i}" aria-label="הסרה">🗑</button></div></div>${b.id?thumb(b.id):''}</div>`).join('')}
 ${BU.length?`<button class="go" data-bu83go ${BU.some(b=>b.id&&!b.ok)?'':'disabled'}>⬆ להעלות הכל (${BU.filter(b=>b.id&&!b.ok).length})</button>`:''}${pick}</div>`;
 if(!d.open)d.showModal();lz(d);if(BUPICK>=0)d.querySelector('.bu83pk')?.scrollIntoView({block:'start'})}
window.openBU83=openBU;
document.addEventListener('change',e=>{const i=e.target.closest&&e.target.closest('[data-bu83in]');if(!i)return;[...i.files].forEach(f=>BU.push({f,u:URL.createObjectURL(f),id:''}));openBU()});
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-bu83],[data-bu83x],[data-bu83p],[data-bu83del],[data-bu83id],[data-bu83f],[data-bu83pk],[data-bu83go]');if(!t)return;
 if(t.dataset.bu83x!==undefined){$('#bu83').close();return}
 if(t.dataset.bu83p){BUPICK=+t.dataset.bu83p;openBU();return}
 if(t.dataset.bu83pk){BUPICK=-1;openBU();return}
 if(t.dataset.bu83f!==undefined){BUF=t.dataset.bu83f;openBU();return}
 if(t.dataset.bu83id){if(BU[BUPICK])BU[BUPICK].id=t.dataset.bu83id;BUPICK=-1;openBU();return}
 if(t.dataset.bu83del){BU.splice(+t.dataset.bu83del,1);openBU();return}
 if(t.dataset.bu83go!==undefined){t.disabled=true;for(const b of BU){if(!b.id||b.ok)continue;b.st='מעלה…';openBU();try{await upP5g(b.id,b.f,'replace');b.ok=true;b.st='✓ הועלה'}catch(err){b.st='✗ לא הצליח'}openBU()}
  const n=BU.filter(b=>b.ok).length;setTimeout(()=>toast(`✓ הועלו ${n} גיליונות`),80);BU=BU.filter(b=>!b.ok);openBU();return}
 openBU()});

// ================= LOOKS =================
// ---- 41. weekly board: drag a look onto a day (or tap a look, then a day)
let WPICK='';
function weekBoard(){const b=$('#hbody');if(!b||!b.querySelector('.week')||b.querySelector('.wl83'))return;const ls=Object.values(LOOKS||{}).filter(l=>l&&l.items);
 b.querySelector('.week').insertAdjacentHTML('beforebegin',`<div class="wl83"><p class="m" style="padding:0">${ls.length?'גוררים לוק ליום (או לוחצים על לוק ואז על יום):':'שומרים לוקים באלבום, והם יופיעו כאן לגרירה.'}</p><div class="wl83r">${ls.map(l=>`<button class="wl83c${WPICK==l.id?' on':''}" data-wl83="${l.id}">${Object.values(l.items).filter(id=>D[id]).slice(0,3).map(thumb).join('')}<small>${esc((l.name||'לוק').slice(0,18))}</small></button>`).join('')}</div></div>`);
 [...b.querySelectorAll('.week .wd')].forEach((w,i)=>w.dataset.wd83=i);lz(b)}
async function setDay(i,lid){PLAN.days=PLAN.days||{};PLAN.days[i]=lid;WPICK='';try{await savePlan()}catch(_){}renderHub();setTimeout(()=>toast(`✓ ${(LOOKS[lid]||{}).name||'הלוק'} ל${DAYS[i]}`),60)}
{let drag=null;document.addEventListener('pointerdown',e=>{const c=e.target.closest&&e.target.closest('[data-wl83]');if(!c)return;drag={id:c.dataset.wl83,x:e.clientX,y:e.clientY,g:null,c}});
 document.addEventListener('pointermove',e=>{if(!drag)return;if(!drag.g){if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<12)return;drag.g=drag.c.cloneNode(true);drag.g.className='wl83g';document.body.appendChild(drag.g)}
  drag.g.style.left=e.clientX+'px';drag.g.style.top=e.clientY+'px';document.querySelectorAll('.wd.ov83').forEach(x=>x.classList.remove('ov83'));const el=document.elementFromPoint(e.clientX,e.clientY);const w=el&&el.closest&&el.closest('[data-wd83]');if(w)w.classList.add('ov83')});
 document.addEventListener('pointerup',e=>{if(!drag)return;const d=drag;drag=null;if(!d.g)return;d.g.remove();document.querySelectorAll('.wd.ov83').forEach(x=>x.classList.remove('ov83'));const el=document.elementFromPoint(e.clientX,e.clientY);const w=el&&el.closest&&el.closest('[data-wd83]');if(w)setDay(+w.dataset.wd83,d.id);d.c.dataset.nc83=1;setTimeout(()=>delete d.c.dataset.nc83,50)});
 document.addEventListener('pointercancel',()=>{if(drag&&drag.g)drag.g.remove();drag=null})}
document.addEventListener('click',e=>{const c=e.target.closest&&e.target.closest('[data-wl83]');if(c){if(c.dataset.nc83)return;WPICK=WPICK==c.dataset.wl83?'':c.dataset.wl83;document.querySelectorAll('[data-wl83]').forEach(x=>x.classList.toggle('on',x.dataset.wl83==WPICK));if(WPICK)toast('עכשיו לחצי על יום');return}
 const w=WPICK&&e.target.closest&&e.target.closest('[data-wd83]');if(w&&!e.target.closest('button[data-wdel],[data-open]')){setDay(+w.dataset.wd83,WPICK)}});

// ---- 42/43. album (occasion filter was already there): filter by event name, sort by stars, rate with a tap, give a look an event name
let AF='',AS=lsG('as83')||'new';const OCCN={day:'חול',shab:'שבת',event:'אירוע',work:'עבודה'};
function albumTools(){const b=$('#hbody');if(!b||TAB!='album')return;const cards=[...b.querySelectorAll('.ac')];if(!cards.length)return;const lid=c=>(c.querySelector('[data-sedit]')||{}).dataset?.sedit;
 const evs=[...new Set(Object.values(LOOKS).map(l=>l.ev).filter(Boolean))];const occs=[...new Set(Object.values(LOOKS).map(l=>l.occ).filter(Boolean))];
 let bar=b.querySelector('.af83');if(!bar){bar=document.createElement('div');bar.className='af83';cards[0].parentElement.insertBefore(bar,cards[0].parentElement.firstChild==cards[0]?cards[0]:cards[0].parentElement.firstChild);if(!bar.isConnected)b.prepend(bar)}
 bar.innerHTML=`${evs.length?`<div class="m77f"><button data-af83="" aria-pressed="${!AF}">כל האירועים שלי</button>`:''}${evs.map(v=>`<button data-af83="e:${esc(v)}" aria-pressed="${AF=='e:'+v}">🏷 ${esc(v)}</button>`).join('')}${evs.length?'</div>':''}
 <label class="as83">מיון <select data-as83><option value="new" ${AS=='new'?'selected':''}>חדש קודם</option><option value="star" ${AS=='star'?'selected':''}>★ הכי אהבתי</option><option value="name" ${AS=='name'?'selected':''}>לפי שם</option></select></label>`;
 cards.forEach(c=>{const id=lid(c);const l=LOOKS[id];if(!l)return;let ok=true;if(AF.startsWith('o:'))ok=l.occ==AF.slice(2);if(AF.startsWith('e:'))ok=l.ev==AF.slice(2);c.classList.toggle('hide',!ok);
  if(!c.querySelector('.st83'))c.insertAdjacentHTML('beforeend',`<div class="st83" data-lid="${id}">${[1,2,3,4,5].map(n=>`<button data-st83="${n}" aria-label="${n} כוכבים" class="mini ${(l.rating||0)>=n?'on':''}">★</button>`).join('')}<button data-ev83="${id}" class="mini ev83">🏷 ${esc(l.ev||'אירוע')}</button></div>`)});
 const k=c=>{const l=LOOKS[lid(c)]||{};return AS=='star'?-(l.rating||0):AS=='name'?0:-(+new Date(l.created||l.date||0))};
 const par=cards[0].parentElement;cards.slice().sort((a,b)=>AS=='name'?String((LOOKS[lid(a)]||{}).name||'').localeCompare(String((LOOKS[lid(b)]||{}).name||''),'he'):k(a)-k(b)).forEach(c=>par.appendChild(c))}
async function saveL(id){try{await saveDoc('looks',id,LOOKS[id])}catch(e){ERR('look',e)}}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-af83],[data-st83],[data-ev83]');if(!t)return;e.preventDefault();e.stopPropagation();
 if(t.dataset.af83!==undefined){AF=t.dataset.af83;albumTools();return}
 const box=t.closest('.st83');const id=box&&box.dataset.lid;if(!id||!LOOKS[id])return;
 if(t.dataset.st83){const n=+t.dataset.st83;LOOKS[id].rating=LOOKS[id].rating==n?0:n;box.querySelectorAll('[data-st83]').forEach(s=>s.classList.toggle('on',+s.dataset.st83<=LOOKS[id].rating));await saveL(id);return}
 if(t.dataset.ev83){if(box.querySelector('input'))return;t.insertAdjacentHTML('afterend',`<span class="ev83e"><input placeholder="חתונה, בר מצווה, שבת חתן…" value="${esc(LOOKS[id].ev||'')}" list="ev83l"><datalist id="ev83l">${[...new Set(Object.values(LOOKS).map(l=>l.ev).filter(Boolean))].map(v=>`<option value="${esc(v)}">`).join('')}</datalist><button class="mini" data-ev83ok>שמירה</button></span>`);box.querySelector('input').focus()}},true);
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-ev83ok]');if(!t)return;e.preventDefault();e.stopPropagation();const box=t.closest('.st83');const id=box.dataset.lid;const v=box.querySelector('input').value.trim().slice(0,30);
 LOOKS[id].ev=v||undefined;if(!v)delete LOOKS[id].ev;await saveL(id);box.querySelector('.ev83').textContent='🏷 '+(v||'אירוע');box.querySelector('.ev83e').remove();albumTools()},true);
document.addEventListener('change',e=>{const s=e.target.closest&&e.target.closest('[data-as83]');if(!s)return;AS=s.value;lsS('as83',AS);albumTools()});

// ---- 44. closet gaps: colours you love that are missing in a type
function gaps(){const ids=Object.keys(D).filter(live);const fams=['שחור','לבן','חום','בז׳','כחול','ירוק','אדום','ורוד','סגול','אפור'];
 const T=[['skirts','חצאית'],['tops','חולצה'],['sweaters','סוודר'],['dresses','שמלה'],['scarves','כיסוי ראש'],['shoes','נעליים'],['outer','ז׳קט']];
 const cnt={};ids.forEach(id=>{const c=curCat(id),f=famOf(id);if(!f)return;cnt[c]=cnt[c]||{};cnt[c][f]=(cnt[c][f]||0)+1});const tot=f=>T.reduce((s,[c])=>s+((cnt[c]||{})[f]||0),0);
 const tips=[];fams.forEach(f=>{const n=tot(f);if(n<5)return;T.forEach(([c,nm])=>{if(!((cnt[c]||{})[f])&&['skirts','tops','scarves','shoes'].includes(c))tips.push([n,`יש לך ${n} בגדים ב${f}, אבל אין ${nm} ב${f}.`])})});tips.sort((a,b)=>b[0]-a[0]);
 return `<h3>צבעים וסוגים שחסרים</h3>${tips.length?'<ul>'+tips.slice(0,8).map(t=>`<li>${esc(t[1])}</li>`).join('')+'</ul>':'<p>אין חורים בולטים.</p>'}
 <div class="gp83"><table class="storet"><tr><th></th>${T.map(t=>`<th>${t[1]}</th>`).join('')}</tr>${fams.map(f=>`<tr><th>${f}</th>${T.map(([c])=>{const n=(cnt[c]||{})[f]||0;return `<td class="${n?'':'z'}">${n||'–'}</td>`}).join('')}</tr>`).join('')}</table></div>`}
if(typeof insights=='function'){const _in=insights;insights=function(){let h=_in.apply(this,arguments);try{const g=gaps();const i=h.indexOf('<h3>תקציב חודשי');h=i>0?h.slice(0,i)+g+h.slice(i):g+h}catch(e){ERR('gaps',e)}return h}}

// ---- 46. shopping list that checks "already have something similar"
const shop=()=>((typeof SET!='undefined'&&SET.shop83)||[]);
function shopHTML(){const L=shop();const sim=t=>{try{return (checkSimilar(t).match(/data-open=/g)||[]).length}catch(_){return 0}};
 return `<div class="sp83"><h3>🛒 רשימת קניות</h3><p class="m" style="padding:0">כותבים מה רוצים לקנות, ואני בודקת אם כבר יש משהו דומה בארון.</p><div class="hrow"><input id="sp83in" placeholder="למשל: חצאית קפלים שחורה"><button class="go" data-sp83add>הוספה</button></div>
 ${L.length?`<ul class="sp83l">${L.map((x,i)=>{const n=sim(x.t);return `<li class="${x.ok?'ok':''}"><button class="mini" data-sp83ok="${i}" aria-label="קניתי">${x.ok?'✓':'○'}</button><span>${esc(x.t)}</span>${n?`<button class="mini sim" data-sp83sim="${i}">יש לך ${n} דומים</button>`:'<small>אין דומה בארון</small>'}<button class="mini" data-sp83del="${i}" aria-label="מחיקה">🗑</button></li>`}).join('')}</ul><div id="sp83res"></div>`:''}</div>`}
async function saveShop(L){SET.shop83=L;try{await saveSet()}catch(_){}const b=$('#hbody .sp83');if(b)b.outerHTML=shopHTML()}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sp83add],[data-sp83ok],[data-sp83del],[data-sp83sim]');if(!t)return;e.preventDefault();const L=shop().slice();
 if(t.dataset.sp83add!==undefined){const v=($('#sp83in').value||'').trim();if(v){L.push({t:v.slice(0,80),d:tIso()});saveShop(L)}return}
 if(t.dataset.sp83ok){L[+t.dataset.sp83ok]=Object.assign({},L[+t.dataset.sp83ok],{ok:!L[+t.dataset.sp83ok].ok});saveShop(L);return}
 if(t.dataset.sp83del){L.splice(+t.dataset.sp83del,1);saveShop(L);return}
 if(t.dataset.sp83sim){const r=$('#sp83res');if(r){r.innerHTML=checkSimilar(L[+t.dataset.sp83sim].t);lz(r);r.scrollIntoView({behavior:'smooth',block:'nearest'})}}});
document.addEventListener('keydown',e=>{if(e.key=='Enter'&&e.target.id=='sp83in'){e.preventDefault();$('[data-sp83add]')?.click()}});

{const _rh=renderHub;renderHub=function(){const r=_rh.apply(this,arguments);const after=()=>{try{if(TAB=='week')weekBoard();if(TAB=='check'&&!$('#hbody .sp83'))$('#hbody').insertAdjacentHTML('beforeend',shopHTML());if(TAB=='album')albumTools()}catch(e){ERR('hub',e)}};
 if(r&&typeof r.then=='function')r.then(after);else after();setTimeout(after,350);return r}}

// ================= SAFETY =================
// ---- 50. backup: an automatic daily copy inside the site (last 7 days) + "גיבוי לקובץ" in the menu
function snap(){return {v:window.VER||'',t:new Date().toISOString(),items:IT,looks:LOOKS,plan:PLAN,settings:SET}}
async function autoBackup(){try{if(!DB||lsG('bk83')==tIso())return;const s=snap();const data={t:s.t,v:s.v,items:JSON.stringify(s.items),looks:JSON.stringify(s.looks),plan:JSON.stringify(s.plan),settings:JSON.stringify(s.settings)};
 await DB.collection('backup83').doc(tIso()).set(data);lsS('bk83',tIso());const old=JSON.parse(lsG('bk83l')||'[]').filter(d=>d!=tIso());old.push(tIso());while(old.length>7){const d=old.shift();try{await DB.collection('backup83').doc(d).delete()}catch(_){}}lsS('bk83l',JSON.stringify(old))}catch(e){ERR('backup',e)}}
async function fileBackup(){try{const bl=new Blob([JSON.stringify(snap(),null,1)],{type:'application/json'});const dl=await claude.use('downloads');if(!dl){toast('שמירה לקובץ לא זמינה כאן');return}
 await dl.save({filename:`גיבוי-הארון-${tIso()}.json`,data:bl});toast('✓ הגיבוי נשמר')}catch(e){toast(e&&e.code=='declined'?'בוטל':'לא הצלחתי לשמור')}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-bk83],[data-qa83open],[data-bu83open]');if(!t)return;e.preventDefault();
 if(t.dataset.bk83!==undefined)return fileBackup();if(t.dataset.qa83open!==undefined){try{$('#more9').close()}catch(_){}return openQA()}if(t.dataset.bu83open!==undefined){try{$('#more9').close()}catch(_){}try{$('#miss77').close()}catch(_){}return openBU()}});
function entries(){const e7=document.querySelector('#more9 .e77');if(e7&&!e7.querySelector('[data-bk83]'))e7.insertAdjacentHTML('beforeend','<button data-bu83open>⬆ העלאת כמה גיליונות</button><button data-qa83open>🔍 בדיקת כל התנוחות</button><button data-bk83>💾 גיבוי לקובץ</button>');
 const m=$('#miss77');if(m&&m.open&&!m.querySelector('[data-bu83open]')){const p=m.querySelector('.p80open')||m.querySelector('.m77s');if(p)p.insertAdjacentHTML('afterend','<button class="bu83open" data-bu83open>⬆ העלאת כמה גיליונות בבת אחת</button>')}
 const sm=document.querySelector('#studio .smenu');if(sm&&!sm.querySelector('[data-qa83open]'))sm.insertAdjacentHTML('beforeend','<button data-qa83open>🔍 בדיקת כל התנוחות</button>')}
new MutationObserver(()=>{if($('#miss77')?.open&&!$('#miss77').querySelector('[data-bu83open]'))entries()}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['open']});

// ---------- boot + keep fresh
let _t=0;const go=()=>{clearTimeout(_t);_t=setTimeout(()=>{for(const [n,f] of [['hol',paintHol],['week',paintWeek],['ret',paintRet],['sort',addSorts],['cards',paintCards],['tools',toolsRow],['idx',paintIdx],['mic',voiceBtn],['entries',entries]]){try{f()}catch(e){ERR(n,e)}}ixShow()},450)};
setTimeout(go,1400);setTimeout(go,4400);setTimeout(autoBackup,9000);
{const _pa=paintAll;paintAll=function(){const r=_pa.apply(this,arguments);go();return r}}
{const _ap=apply;apply=function(){const r=_ap.apply(this,arguments);clearTimeout(apply._t83);apply._t83=setTimeout(()=>{try{paintIdx();ixShow()}catch(_){}},200);return r}}
})();

// ===== v84 (2026-10-22): phone round – resizing a garment in every pose (side view: the garment is narrow, so two fingers
// landed on the background and zoomed the whole stage instead), big ➖ ➕ size buttons, and screens that did not open on the phone.
(()=>{
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v84 '+w+': '+(e&&e.message||e));
const layer=s=>document.querySelector(`#sstage img.sl[data-slot="${s}"]`);
const canSize=()=>typeof ST!='undefined'&&ST&&SSEL&&ST.items[SSEL]&&SSEL!='jewelry'&&ST.tf[SSEL]&&!ST.tf[SSEL].lock&&layer(SSEL)&&!document.body.classList.contains('er74on');
function sizeDone(slot){try{const tf=ST.tf[slot];tf.pvman=tf.pvman||{};tf.pvman[ST.view||'front']=1;const sw=$('#sw');if(sw)sw.value=Math.round(tf.w);if(typeof saveFit=='function')saveFit(slot)}catch(e){ERR('size',e)}}

// ---- 1. two fingers on the stage while a garment is selected = that garment's size (near the garment), not the stage zoom
const P=new Map();let PZ=null;
window.addEventListener('pointerdown',e=>{try{if(!(e.target.closest&&e.target.closest('#sstage,#studio .smain'))||e.pointerType=='mouse')return;P.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(P.size!=2||!canSize())return;const [a,b]=[...P.values()];const el=layer(SSEL);const r=el.getBoundingClientRect();const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;const pad=70;
 // midpoint of the fingers on (or close to) the selected garment → resize it; elsewhere the stage zoom keeps working
 if(mx<r.left-pad||mx>r.right+pad||my<r.top-pad||my>r.bottom+pad)return;
 try{pushH()}catch(_){}PZ={slot:SSEL,el,d0:Math.max(12,Math.hypot(a.x-b.x,a.y-b.y)),ow:ST.tf[SSEL].w};
 try{ZG2=null;ZP2.clear()}catch(_){}try{PTR.clear();PG=null}catch(_){}try{SDR=null}catch(_){}e.preventDefault();e.stopImmediatePropagation()}catch(err){ERR('pd',err)}},true);
window.addEventListener('pointermove',e=>{if(!P.has(e.pointerId))return;P.set(e.pointerId,{x:e.clientX,y:e.clientY});if(!PZ)return;e.preventDefault();e.stopImmediatePropagation();
 try{if(P.size<2)return;const [a,b]=[...P.values()];const tf=ST.tf[PZ.slot];tf.w=Math.max(5,Math.min(400,PZ.ow*Math.hypot(a.x-b.x,a.y-b.y)/PZ.d0));PZ.el.style.width=tf.w+'%'}catch(err){ERR('pm',err)}},{capture:true,passive:false});
const pend=e=>{P.delete(e.pointerId);if(PZ&&P.size<2){const s=PZ.slot;PZ=null;try{paintSel()}catch(_){}sizeDone(s);e.stopImmediatePropagation()}};
window.addEventListener('pointerup',pend,true);window.addEventListener('pointercancel',pend,true);
// a finger that went down before the pinch must not keep turning the avatar or dragging
window.addEventListener('touchmove',e=>{if(PZ)e.stopImmediatePropagation()},{capture:true,passive:true});
window.addEventListener('touchend',e=>{if(PZ||P.size>1)e.stopImmediatePropagation()},{capture:true,passive:true});

// ---- 2. big ➖ ➕ for the garment size next to "הקודם / הבא" (works the same in all 5 poses)
function sizeStep(d){if(!canSize())return;const tf=ST.tf[SSEL];try{pushH()}catch(_){}tf.w=Math.max(5,Math.min(400,Math.round(tf.w*(d>0?1.06:1/1.06)*10)/10));const el=layer(SSEL);if(el)el.style.width=tf.w+'%';sizeDone(SSEL)}
if(typeof paintSel=='function'){const _ps=paintSel;paintSel=function(){const r=_ps.apply(this,arguments);try{const n=document.querySelector('#ssel .nx83');if(n&&!n.querySelector('[data-sz84]')&&SSEL!='jewelry')n.insertAdjacentHTML('beforeend','<span class="sz84"><button data-sz84="-1" aria-label="להקטין את הבגד">➖</button><b>גודל</b><button data-sz84="1" aria-label="להגדיל את הבגד">➕</button></span>')}catch(_){}return r}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-sz84]');if(!b)return;e.preventDefault();sizeStep(+b.dataset.sz84)});

// ---- 3. the side index of v83 shows only while scrolling the closet and hides 1.6 s after the scroll stops
{let t=0;window.addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(()=>{const r=$('#ix83');if(r&&!r.matches(':active'))r.classList.remove('on')},1600)},{passive:true});
 document.addEventListener('touchend',e=>{const r=$('#ix83');if(r&&r.contains(e.target)){clearTimeout(t);t=setTimeout(()=>r.classList.remove('on'),1600)}},{passive:true})}

// ---- 4. (#32) back and hand-on-waist: after the shoulder fit, check both outer edges (arms / sleeves, the bent elbow)
// row by row and nudge size and place so the sleeves cover her arms. Only rows where a sleeve is near the arm count
// (a short sleeve or a sleeveless top is left alone), at most ±10 % size, and only when it is clearly better.
async function armFit(slot,ctx){if(typeof AF_TOP=='undefined'||!AF_TOP.includes(slot))return false;let id,tf,v,g;
 if(ctx){({id,tf,v,g}=ctx)}else{if(!ST||(ST.avbase||'long')!='p5')return false;id=ST.items[slot];tf=ST.tf[slot];if(!id||!tf)return false;g=p5gOfT(id,tf);v=ST.view||'front'}
 if(v!='back'&&v!='hip')return false;if(!g||!g[v]||!tf||(tf.pvman&&tf.pvman[v]))return false;const B=P5BODY[v];if(!B)return false;
 const url=p5gUrl(g,v);let use=url;try{const cl=await cleanP5(url,false);use=cl&&cl.url||url}catch(_){}
 const ro=await rowsOf(use,tf.w/100*399);if(!ro)return false;const sx=tf.sx||1,sy=tf.sy||1;const cy=tf.y/100*1365,cx=tf.x/100*399,top=cy-ro.H*sy/2;
 const BR=[];for(let y=B.y.sh;y<=B.y.sh+340;y+=6){const q=bodyAt(v,y);if(q)BR.push([y,q[0],q[1]])}if(BR.length<12)return false;
 const T=45,cost=(s,dx,dy)=>{let c=0,n=0;for(const [y,bl,br] of BR){const r=Math.round((y-top-dy)/(sy*s));const q=r>=0&&r<ro.H?ro.R[r]:null;if(!q)continue;
   const gl=cx+dx+(q[0]-ro.W/2)*sx*s,gr=cx+dx+(q[1]-ro.W/2)*sx*s;for(const d of [gl-bl,br-gr]){if(Math.abs(d)>T){c+=T*T;continue}n++;c+=d>0?2*d*d:d*d}}return n<10?Infinity:c};
 const c0=cost(1,0,0);let best={c:c0,s:1,dx:0,dy:0};const DY=v=='hip'?[-30,-24,-18,-12,-6,0,6,12,18,24,30]:[-6,0,6];
 for(let s=.9;s<=1.1001;s+=.02)for(let dx=-24;dx<=24;dx+=3)for(const dy of DY){const c=cost(s,dx,dy);if(c<best.c)best={c,s,dx,dy}}
 if(!isFinite(c0)||best.c>c0*.9)return false;
 const nt=top+best.dy,ncy=nt+ro.H*sy*best.s/2;tf.w=Math.round(tf.w*best.s*10)/10;tf.y=Math.round(ncy/1365*1000)/10;tf.x=Math.round((cx+best.dx)/399*1000)/10;return true}
window.armFit84=armFit;
if(typeof smartFit=='function'){const _sf=smartFit;smartFit=async function(slot,force,ctx){const r=await _sf.apply(this,arguments);let a=false;try{if(r)a=await armFit(slot,ctx)}catch(e){ERR('arm',e)}return r||a};window.smartFit=smartFit}
})();
