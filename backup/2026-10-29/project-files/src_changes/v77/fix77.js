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
function lotdPick(fresh){const occ=[5,6].includes(new Date().getDay())?'shab':'day';
 let c=null;try{c=JSON.parse(lsG('lotd77')||'null')}catch(_){}
 if(!fresh&&c&&c.d==today()&&c.items&&Object.values(c.items).every(id=>D[id]))return c;
 const saved=Object.values(LOOKS||{}).filter(l=>l&&l.items&&Object.values(l.items).some(id=>D[id]));
 let L=null,look=null;
 if(saved.length&&!fresh){const seed=+today().replace(/-/g,'');look=saved[seed%saved.length];L=look.items}
 else{try{L=genLook({occ,sea:curSeason(),fav:false,kids:false})}catch(_){L=null}}
 if(!L||!Object.keys(L).length)return null;c={d:today(),items:L,look:look&&look.id||'',name:look&&look.name||''};lsS('lotd77',JSON.stringify(c));return c}
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
 let st='';if(usesPoses(id)){const n=P77.filter(([k])=>poseHas(id,k)).length;st=`<div class="it77p" aria-label="מוכן לאווטאר">${P77.map(([k,l])=>`<span class="${poseHas(id,k)?'ok':'no'}">${poseHas(id,k)?'✓':'✗'} ${l}</span>`).join('')}</div>${n<5?`<button class="it77u" data-m77up="${id}">${n?'להשלים':'להעלות'} תמונות לאווטאר</button>`:''}`}
 else st=`<div class="it77p"><span class="${avReady(id)?'ok':'no'}">${avReady(id)?'✓ מוכן על הדמות':'✗ עוד אין תמונה לאווטאר'}</span></div>${avReady(id)?'':`<button class="it77u" data-m77up="${id}">להעלות תמונה לאווטאר</button>`}`;
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
 t.innerHTML=`<div class="t77c"><h4>ברוכה הבאה לבניית הלוק</h4><ol><li>בוחרים בגד מהשורה <b>למטה</b> (שמלה, חולצה, חצאית…).</li><li><b>מחליקים</b> על הדמות ימינה או שמאלה כדי לראות אותה מהצד ומהגב.</li><li>נוגעים <b>בבגד</b> כדי להזיז, להגדיל או למחוק ממנו מעט.</li><li>כיסוי ראש בוחרים מ<b>השורה</b> שמתחת לדמות.</li></ol><button class="go" data-t77>הבנתי</button></div>`;
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
