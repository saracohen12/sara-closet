/* ===== hub: looks, planner, insights, returns, home ===== */
const HARM={'שחור':'*','לבן':'*','אפור':'*','בז׳':['חום','לבן','שחור','כחול','ירוק','ורוד','אדום','סגול','אפור','צבעוני'],
 'חום':['בז׳','לבן','שחור','ירוק','כחול','צבעוני'],'כחול':['לבן','בז׳','אפור','ורוד','חום','שחור'],'ירוק':['בז׳','חום','לבן','שחור'],
 'אדום':['שחור','לבן','בז׳','אפור'],'ורוד':['אפור','לבן','כחול','בז׳','שחור'],'סגול':['אפור','לבן','שחור','בז׳'],'צבעוני':['שחור','לבן','בז׳','חום']};
const famOf=id=>(card(id)||{dataset:{}}).dataset.c||'';
function goes(a,b){if(!a||!b||a==b)return true;const A=HARM[a],B=HARM[b];if(A=='*'||B=='*')return true;return (A||[]).includes(b)||(B||[]).includes(a)}
const goesAll=(f,fs)=>fs.every(g=>goes(f,g));
let LOOKS={},PLAN={days:{}},CREDITS={},SET={};
const DAYS=['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];
const OCC={day:'חול',shab:'שבת',event:'אירוע',work:'עבודה'};
function curSeason(){const mo=new Date().getMonth()+1;return [12,1,2,3].includes(mo)?'חורף':[6,7,8,9].includes(mo)?'קיץ':'מעבר'}
function usable(id,o){const it=IT[id]||{};if(it.s=='ret'||it.s=='give'||it.nofit)return false;if(o.fav&&!it.fav)return false;return true}
function fitsOcc(id,occ){const c=card(id);if(!c)return false;const t=tgs(c);
 if(occ=='day')return isDay(c);if(occ=='shab')return isShab(c);if(occ=='event')return t.includes('אירוע')||isShab(c);if(occ=='work')return t.includes('עבודה')||isDay(c);return true}
function fitsSeason(id,sea){if(!sea)return true;const c=card(id);const s=(c?.dataset.ss||'').split('|').filter(Boolean);return !s.length||s.includes(sea)||s.includes('מעבר')||(sea=='מעבר')}
function poolOf(cats,o,cond){return Object.keys(D).filter(id=>cats.includes(curCat(id))&&card(id)&&usable(id,o)&&(!cond||cond(id)))}
const pick=a=>a.length?a[Math.floor(Math.random()*a.length)]:null;
function pickHarm(pool,fs,avoid){const ok=pool.filter(id=>!avoid.has(id)&&goesAll(famOf(id),fs));return pick(ok.length?ok:pool.filter(id=>!avoid.has(id)))}
function genLook(o,avoid=new Set(),anchor=null){
 const clo=id=>fitsOcc(id,o.occ)&&fitsSeason(id,o.sea);
 const L={};let fs=[];
 const put=(slot,id)=>{if(id){L[slot]=id;const f=famOf(id);if(f&&f!='צבעוני')fs.push(f);else if(f)fs.push(f)}};
 if(anchor){const ac=curCat(anchor);const slot={dresses:'dress',skirts:'skirt',tops:'top',sets:'set',sweaters:'top',outer:'outer',scarves:'scarf',belts:'belt',shoes:'shoes',jewelry:'jewelry',bags:'bag'}[ac]||'extra';put(slot,anchor)}
 if(!L.dress&&!L.set&&!L.skirt&&!L.top){const r=Math.random();
  if(r<.45)put('dress',pickHarm(poolOf(['dresses'],o,clo),fs,avoid));else if(r<.55)put('set',pickHarm(poolOf(['sets'],o,clo),fs,avoid));}
 if(!L.dress&&!L.set){if(!L.skirt)put('skirt',pickHarm(poolOf(['skirts'],o,clo),fs,avoid));if(!L.top)put('top',pickHarm(poolOf(['tops','sweaters'],o,clo),fs,avoid))}
 if(!L.outer&&(o.sea=='חורף'||Math.random()<.35))put('outer',pickHarm(poolOf(['outer'],o,clo),fs,avoid));
 if(!L.scarf)put('scarf',pickHarm(poolOf(['scarves'],o,id=>fitsSeason(id,o.sea)),fs,avoid));
 if(!L.belt&&(L.dress||L.skirt)&&Math.random()<.7)put('belt',pickHarm(poolOf(['belts'],o),fs,avoid));
 if(!L.shoes)put('shoes',pickHarm(poolOf(['shoes'],o,id=>!/שרוכ|מדרס|כריות/.test(D[id].short)),fs,avoid));
 if(!L.jewelry)put('jewelry',pickHarm(poolOf(['jewelry'],o),fs,avoid));
 if(!L.bag&&Math.random()<.6)put('bag',pickHarm(poolOf(['bags'],o,id=>!/איפור|קוסמט/.test(D[id].short)),fs,avoid));
 if(o.kids){const kp=poolOf(['girls','boys'],o);const k=pickHarm(kp,fs,avoid);if(k)L.kid=k}
 Object.keys(L).forEach(k=>{if(!L[k])delete L[k]});return L}
const SLOTN={dress:'שמלה',set:'סט',skirt:'חצאית',top:'חולצה',outer:'ז׳קט',scarf:'כיסוי ראש',belt:'חגורה',shoes:'נעליים',jewelry:'תכשיט',bag:'תיק',kid:'לילדים',extra:'עוד'};
function lookHTML(L,idx,saved){const ids=Object.entries(L);const tot=ids.reduce((s,[k,id])=>s+(D[id]?.paid||0),0);
 return `<div class="look" data-i="${idx}">${saved?`<h4>${esc(saved.name)} <small>${OCC[saved.occ]||''}</small></h4>`:''}<div class="lk">${ids.map(([k,id])=>`<div class="ls"><button class="mini" data-open="${id}">${img(id)||(D[id]||{}).hi?`<img data-th="${id}" src="${img(id)||TPH}" alt="">`:''}<span>${SLOTN[k]||k}</span></button>${saved?'':`<button class="rr" data-rr="${idx}|${k}" title="החליפי">↻</button>`}</div>`).join('')}</div>
 <p class="m" style="padding:0">שווי הלוק: ${m(tot)}</p><div class="lb">${saved?`<button data-lshare="${saved.id}">📤 שיתוף</button><button data-ldel="${saved.id}">מחיקה</button><select data-lday="${saved.id}"><option value="">לשבוע…</option>${DAYS.map((d,i)=>`<option value="${i}">${d}</option>`).join('')}</select>`:`<button data-lsave="${idx}">♥ שמרי לוק</button><button data-lshare2="${idx}">📤 שיתוף</button><select data-lday2="${idx}"><option value="">לשבוע…</option>${DAYS.map((d,i)=>`<option value="${i}">${d}</option>`).join('')}</select>`}</div></div>`}
let GEN=[],GENO={};
function hubOpts(){return {occ:$('#hocc').value,sea:$('#hsea').value,fav:$('#hfav').checked,kids:$('#hkid').checked}}
function runGen(anchor){GENO=hubOpts();const avoid=new Set();GEN=[0,1,2].map(()=>{const L=genLook(GENO,avoid,anchor);Object.values(L).forEach(id=>{if(id!=anchor&&['dresses','skirts','tops','sets'].includes(curCat(id)))avoid.add(id)});return L});
 $('#hlooks').innerHTML=GEN.map((L,i)=>lookHTML(L,i)).join('')||'<p>לא נמצאו מספיק פריטים. נסי לשנות את הבחירה.</p>'}
// v267: the settings doc is shared by many parts of the site – write only the top-level parts that changed since the last snapshot, so one part (or device) doesn't overwrite another's
let SET0=null;const _lost=(o,n)=>{if(!o||typeof o!='object'||Array.isArray(o))return false;if(!n||typeof n!='object'||Array.isArray(n))return true;return Object.keys(o).some(k=>!(k in n)||_lost(o[k],n[k]))};
async function saveDoc(col,id,data){if(DB){try{const ref=DB.collection(col).doc(id);
  if(data&&col=='settings'&&id=='main'&&SET0){const ch=Object.keys(data).filter(k=>JSON.stringify(data[k])!==JSON.stringify(SET0.v[k]));
   if(!ch.length)return;
   if(Object.keys(SET0.v).every(k=>k in data)&&ch.every(k=>!_lost(SET0.v[k],data[k]))){const up={};ch.forEach(k=>up[k]=data[k]);try{await ref.update(up);ch.forEach(k=>SET0.v[k]=JSON.parse(JSON.stringify(data[k])));return}catch(e){if(!(e&&e.code=='invalid_argument'))throw e}}}
  if(data)await ref.set(data);else await ref.delete();if(col=='settings'&&id=='main'&&data)SET0={v:JSON.parse(JSON.stringify(data))}}catch(e){console.warn(e)}}else{try{localStorage.setItem('hub_'+col,JSON.stringify({looks:LOOKS,plan:PLAN,credits:CREDITS,settings:SET}[col]))}catch(_){}}}
function loadLocalHub(){try{LOOKS=JSON.parse(localStorage.getItem('hub_looks')||'{}');const p=JSON.parse(localStorage.getItem('hub_plan')||'null');if(p)PLAN=p.week||p;CREDITS=JSON.parse(localStorage.getItem('hub_credits')||'{}');const s=JSON.parse(localStorage.getItem('hub_settings')||'null');if(s)SET=s.main||s}catch(_){}}
loadLocalHub();
(async()=>{try{const db=await claude.use('db');if(!db)return;
 db.collection('looks').onSnapshot(sn=>{const n={};sn.docs.forEach(d=>{const v=d.data();if(v)n[d.id]=Object.assign({id:d.id},v)});LOOKS=n;renderHub()},e=>{});
 db.collection('plan').onSnapshot(sn=>{sn.docs.forEach(d=>{if(d.id=='week')PLAN=JSON.parse(JSON.stringify(d.data()||{days:{}}))});renderHub()},e=>{});
 db.collection('credits').onSnapshot(sn=>{const n={};sn.docs.forEach(d=>{n[d.id]=JSON.parse(JSON.stringify(d.data()||{}))});CREDITS=n;renderHub()},e=>{});
 db.collection('settings').onSnapshot(sn=>{sn.docs.forEach(d=>{if(d.id=='main'){SET=JSON.parse(JSON.stringify(d.data()||{}));SET0={v:JSON.parse(JSON.stringify(SET))}}/* v93: the snapshot object is read-only – every change to SET was silently lost and saved back as the old doc */});renderHub()},e=>{})}catch(e){}})();
async function savePlan(){PLAN.days=PLAN.days||{};if(DB)await saveDoc('plan','week',PLAN);else{try{localStorage.setItem('hub_plan',JSON.stringify(PLAN))}catch(_){}}}
async function saveLook(L,occ,name){const id='l'+Date.now().toString(36);LOOKS[id]={id,name:name||('לוק '+(Object.keys(LOOKS).length+1)),occ,items:L,created:new Date().toISOString().slice(0,10)};
 if(DB)await saveDoc('looks',id,LOOKS[id]);else{try{localStorage.setItem('hub_looks',JSON.stringify(LOOKS))}catch(_){}}toast('הלוק נשמר באלבום');renderHub();return id}
async function delLook(id){delete LOOKS[id];Object.keys(PLAN.days||{}).forEach(d=>{if(PLAN.days[d]==id)delete PLAN.days[d]});if(DB)await saveDoc('looks',id,null);else{try{localStorage.setItem('hub_looks',JSON.stringify(LOOKS))}catch(_){}}await savePlan();renderHub()}
// share look as image
async function shareLook(L,name){const ids=Object.values(L);const W=900,cols=3,cw=W/cols,ch=cw*4/3;const rows=Math.ceil(ids.length/cols);
 const cv=document.createElement('canvas');cv.width=W;cv.height=rows*ch+120;const x=cv.getContext('2d');x.fillStyle='#f6efe6';x.fillRect(0,0,cv.width,cv.height);
 x.fillStyle='#2d211b';x.font='bold 44px Heebo, sans-serif';x.textAlign='center';x.direction='rtl';x.fillText(name||'הלוק שלי',W/2,70);
 await Promise.all(ids.map((id,i)=>new Promise(r=>{const im=new Image();im.onload=()=>{const cx=W-(i%cols+1)*cw,cy=100+Math.floor(i/cols)*ch;x.fillStyle='#fff';x.fillRect(cx+8,cy+8,cw-16,ch-16);
  const s=Math.min((cw-16)/im.width,(ch-16)/im.height);x.drawImage(im,cx+8+(cw-16-im.width*s)/2,cy+8+(ch-16-im.height*s)/2,im.width*s,im.height*s);r()};im.onerror=r;im.src=img(id)})));
 const blob=await new Promise(r=>cv.toBlob(r,'image/png'));try{const dl=await claude.use('downloads');if(!dl){toast('שמירה לא זמינה כאן');return}await dl.save({filename:(name||'לוק')+'.png',data:blob});toast('התמונה נשמרה, אפשר לשלוח בוואטסאפ')}catch(e){toast(e.code=='declined'?'בוטל':'לא הצלחתי לשמור')}}
// ===== hub UI =====
const TABS=[['looks','👗 לוקים'],['album','♥ האלבום'],['week','📅 השבוע'],['insights','📊 תובנות'],['money','💰 החזרות וקרדיטים'],['check','🔎 לפני הזמנה'],['home','🏠 סדר בבית']];
let TAB='looks';
function openHub(tab,anchor){if(tab)TAB=tab;$('#hub').showModal();renderHub();if(anchor){TAB='looks';renderHub();runGen(anchor)}}
function renderHub(){if(!$('#hub')||!$('#hub').open)return;$('#htabs').innerHTML=TABS.map(([k,l])=>`<button data-tab="${k}" aria-pressed="${TAB==k}">${l}</button>`).join('');
 const b=$('#hbody');const keep=TAB=='looks'&&$('#hlooks');
 if(TAB=='looks'){if(!keep){b.innerHTML=`<div class="hrow"><label>אירוע</label><select id="hocc"><option value="day">חול</option><option value="shab">שבת</option><option value="event">אירוע</option><option value="work">עבודה</option></select>
  <label>עונה</label><select id="hsea"><option value="">כל עונה</option><option>קיץ</option><option>חורף</option><option>מעבר</option></select>
  <label class="ck"><input type="checkbox" id="hfav"> רק מועדפים</label><label class="ck"><input type="checkbox" id="hkid"> גם לילדים</label>
  <button class="go" id="hgen">✨ הרכיבי לי 3 לוקים</button></div><p class="m" style="padding:0">הלוקים נבנים רק ממה שלא סימנת "החזרתי", "למסור" או "לא במידה", לפי התאמת צבעים. ↻ מחליף פריט אחד.</p><div id="hlooks"></div>`;$('#hsea').value=curSeason()=='קיץ'?'קיץ':curSeason()=='חורף'?'חורף':'';}}
 else if(TAB=='album'){const ls=Object.values(LOOKS);b.innerHTML=ls.length?ls.map(l=>lookHTML(l.items,l.id,l)).join(''):'<p>עוד אין לוקים שמורים. בלשונית "לוקים" לוחצים "♥ שמרי לוק".</p>'}
 else if(TAB=='week'){PLAN.days=PLAN.days||{};b.innerHTML=`<div class="hrow"><button class="go" id="wauto">✨ מלאי לי את השבוע</button><button id="wclear">נקי הכל</button></div><div class="week">${DAYS.map((d,i)=>{const l=LOOKS[PLAN.days[i]];return `<div class="wd"><h4>${d}${i==6?' ✨':''}</h4>${l?`<div class="lk">${Object.values(l.items).slice(0,6).map(id=>`<button class="mini" data-open="${id}">${img(id)||(D[id]||{}).hi?`<img data-th="${id}" src="${img(id)||TPH}" alt="">`:''}</button>`).join('')}</div><p class="m" style="padding:0">${esc(l.name)}</p><button data-wdel="${i}">הסירי</button>`:'<p class="m" style="padding:0">ריק</p>'}</div>`}).join('')}</div>`}
 else if(TAB=='insights')b.innerHTML=insights();
 else if(TAB=='money')b.innerHTML=moneyTab();
 else if(TAB=='check')b.innerHTML=`<p>הדביקי כאן את שם המוצר שאת שוקלת להזמין (מטמו או משיין), ואבדוק אם כבר יש לך משהו דומה.</p><textarea id="chk" rows="3" style="width:100%" placeholder="למשל: שמלת מקסי קטיפה חומה עם שרוולים ארוכים"></textarea><div class="hrow"><button class="go" id="chkgo">בדקי</button></div><div id="chkres"></div>`;
 else if(TAB=='home')b.innerHTML=homeTab();}
function insights(){const ids=Object.keys(D).filter(id=>(IT[id]||{}).s!='ret');const by={};ids.forEach(id=>{const c=curCat(id);(by[c]=by[c]||[]).push(id)});
 const n=c=>(by[c]||[]).length;const cname=k=>(CATS.find(x=>x[0]==k)||[k,k])[1];
 const miss=[];if(n('skirts')+n('dresses')>4*(n('belts')||1))miss.push(`יש לך ${n('skirts')} חצאיות ו-${n('dresses')} שמלות, אבל רק ${n('belts')} חגורות.`);
 if(n('shoes')<10)miss.push(`רק ${n('shoes')} פריטי נעליים, מעט לעומת ${n('skirts')+n('dresses')} חצאיות ושמלות.`);
 if(n('bags')<6)miss.push(`רק ${n('bags')} תיקים.`);
 const fams=['שחור','לבן','חום','בז׳','כחול','ירוק','אדום','ורוד','סגול','אפור'];const bot=ids.filter(id=>['skirts','dresses'].includes(curCat(id)));const sc=ids.filter(id=>curCat(id)=='scarves');
 fams.forEach(f=>{const b=bot.filter(id=>famOf(id)==f).length;const s=sc.filter(id=>goes(famOf(id),f)&&famOf(id)).length;if(b>=6&&s<3)miss.push(`יש ${b} חצאיות/שמלות ב${f}, ורק ${s} כיסויי ראש שמתאימים להן בצבע.`)});
 const worn=ids.filter(id=>(IT[id]||{}).wear);const cpw=worn.map(id=>[id,D[id].paid/(IT[id].wear)]).sort((a,b)=>b[1]-a[1]);
 const now=Date.now();const notw=ids.filter(id=>['dresses','skirts','tops','sweaters','outer','sets'].includes(curCat(id))&&(!(IT[id]||{}).lastWorn||now-new Date(IT[id].lastWorn)>30*864e5));
 const st={};Object.keys(D).forEach(id=>{const x=D[id];const s=x.src=='sh'?'שיין':'טמו';const c=curCat(id);st[c]=st[c]||{};st[c][s]=st[c][s]||{n:0,p:0};st[c][s].n++;st[c][s].p+=x.paid/(x.qty||1)});
 const sz={};Object.keys(D).forEach(id=>{const c=card(id);const z=c?.dataset.z;if(!z||/Y/.test(z))return;const s=D[id].src=='sh'?'שיין':'טמו';const k=s+' · '+cname(curCat(id));sz[k]=sz[k]||{};sz[k][z]=(sz[k][z]||0)+1});
 const nofit=Object.keys(D).filter(id=>(IT[id]||{}).nofit);
 const bud=+SET.budget||0;const mon={};Object.values(D).forEach(x=>{const mo=(x.date||'').split('/')[1];if(mo){mon[mo]=(mon[mo]||0)+x.paid}});
 return `<h3>מה חסר לך</h3>${miss.length?'<ul>'+miss.map(t=>`<li>${esc(t)}</li>`).join('')+'</ul>':'<p>נראה מאוזן.</p>'}
 <h3>תקציב חודשי</h3><div class="hrow"><label>תקציב</label><input id="budget" type="number" class="num" value="${bud||''}" placeholder="₪"><button id="budsave">שמרי</button></div>
 ${bud?`<table class="storet"><tr><th>חודש</th><th>הוצאה</th><th>מול התקציב</th></tr>${Object.entries(mon).map(([k,v])=>`<tr><td>${MONTHS[k]}</td><td>${money2(v)}</td><td style="color:${v>bud?'#c62828':'#256b2c'}">${v>bud?'חריגה של '+money2(v-bud):'נשאר '+money2(bud-v)}</td></tr>`).join('')}</table>`:''}
 <h3>שווה או לא: מחיר ללבישה</h3>${cpw.length?`<table class="storet"><tr><th>פריט</th><th>לבישות</th><th>מחיר ללבישה</th></tr>${cpw.slice(0,15).map(([id,v])=>`<tr><td><a href="#" data-open="${id}">${esc(D[id].short.slice(0,30))}</a></td><td>${IT[id].wear}</td><td>${m(v)}</td></tr>`).join('')}</table>`:'<p>עוד לא סימנת לבישות. בחלון של בגד לוחצים "+ לבשתי היום".</p>'}
 <h3>בגדים שלא לבשת בחודש האחרון (${notw.length})</h3><p class="m" style="padding:0">כל לחיצה על "+ לבשתי היום" מוציאה בגד מהרשימה הזו.</p><div class="strip">${notw.slice(0,40).map(id=>`<button class="mini" data-open="${id}">${img(id)||(D[id]||{}).hi?`<img data-th="${id}" src="${img(id)||TPH}" alt="">`:''}<span>${m(D[id].paid)}</span></button>`).join('')}</div>
 <h3>השוואת חנויות: מחיר ממוצע לפריט</h3><table class="storet"><tr><th>סוג</th><th>טמו</th><th>שיין</th></tr>${Object.entries(st).filter(([c,v])=>v['טמו']&&v['שיין']).map(([c,v])=>`<tr><td>${esc(cname(c))}</td><td>${money2(v['טמו'].p/v['טמו'].n)}</td><td>${money2(v['שיין'].p/v['שיין'].n)}</td></tr>`).join('')}</table>
 <h3>המידות שלך</h3><table class="storet"><tr><th>חנות · סוג</th><th>מידות שהזמנת</th></tr>${Object.entries(sz).filter(([k,v])=>Object.values(v).reduce((a,b)=>a+b,0)>=3).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${Object.entries(v).sort((a,b)=>b[1]-a[1]).map(([z,c])=>`${z}×${c}`).join(' · ')}</td></tr>`).join('')}</table>
 ${nofit.length?`<p><b>סימנת "לא במידה":</b> ${nofit.map(id=>`<a href="#" data-open="${id}">${esc(D[id].short.slice(0,25))} (${esc(D[id].size||'')})</a>`).join(' · ')}</p>`:''}`}
// v178: each return shows a small photo, the store, the order number and date, the deadline and whether it was sent
function retRow177(id){const x=D[id],it=IT[id]||{},sh=x.src=='sh'||x.src=='ae';
 const ord=sh?x.order:String(x.order||'').replace(/^P0-/,'PO-'),rc=!sh&&x.file?' · '+x.file.replace('קובץ','קבלה'):'';
 const dl=x.rdl?x.rdl.split('-').reverse().slice(0,2).join('/'):'';
 const left=x.rdl?Math.ceil((new Date(x.rdl)-new Date())/864e5):null;
 return `<div class="rt177r"><button class="ph" data-open="${id}" aria-label="פתיחת המוצר">${img(id)||x.hi?`<img data-th="${id}" src="${img(id)||TPH}" alt="">`:'<span>📦</span>'}</button>
 <div class="in"><a href="#" data-open="${id}"><b>${esc(x.short)}</b></a>
 <small>${esc(x.srcl||'')}${esc(rc)}${x.size?' · מידה '+esc(x.size):''}${x.color?' · '+esc(x.color):''}</small>
 <small>מספר הזמנה: <bdi dir="ltr">${esc(ord)}</bdi>${x.date?' · הוזמן '+esc(x.date):''}</small>
 <small>${it.rsent?'📮 נשלח להחזרה':'↩ עוד לא נשלח'}${dl&&!it.rsent?` · להחזיר עד <b>${dl}</b>${left!=null?(left>=0?` (עוד ${left} ימים)`:' (עבר)'):''}`:''}${it.rwhy?' · '+esc(it.rwhy):''}</small>
 <div class="bt"><b>${m(x.paid)}</b><button data-refund="${id}" aria-pressed="${!!it.refunded}">${it.refunded?'💰 ✓ הכסף חזר':'💰 הכסף עוד לא חזר'}</button><button data-o3go="${id}">📦 ההזמנה</button></div></div></div>`}
function moneyTab(){const ret=Object.keys(D).filter(id=>(IT[id]||{}).s=='ret');const exp=ret.reduce((s,id)=>s+D[id].paid,0);const got=ret.filter(id=>(IT[id]||{}).refunded).reduce((s,id)=>s+D[id].paid,0);
 const cr=Object.entries(CREDITS);
 return `<h3>החזרות</h3><p>סימנת ${ret.length} פריטים להחזרה. צפוי לחזור: <b>${money2(exp)}</b> · כבר חזר: <b>${money2(got)}</b></p>
 ${ret.length?`<div class="rt177">${ret.map(retRow177).join('')}</div>`:'<p class="m" style="padding:0">בחלון של פריט לוחצים "החזרתי" והוא יופיע כאן.</p>'}
 <h3>קרדיטים ויתרות</h3><div class="hrow"><select id="crs"><option>שיין</option><option>טמו 1</option><option>טמו 2</option><option>טמו 3</option></select><input id="cra" type="number" class="num" placeholder="סכום ₪"><label>תוקף</label><input id="crd" type="date" class="num" style="width:150px"><button id="cradd">הוסיפי</button></div>
 ${cr.length?`<table class="storet"><tr><th>חנות</th><th>סכום</th><th>תוקף</th><th></th></tr>${cr.map(([k,v])=>{const n=v.exp?daysLeft(v.exp):null;return `<tr><td>${esc(v.store)}</td><td>${money2(+v.amt)}</td><td style="color:${n!=null&&n<=14?'#c62828':''}">${v.exp?fmtD(v.exp)+(n!=null?` (עוד ${n} ימים)`:''):'—'}</td><td><button data-crdel="${k}">✕</button></td></tr>`}).join('')}</table>`:''}`}
function homeTab(){const LOC=['ארון','מגירה','מחסן','כביסה','אצל התופרת'];const cnt={};Object.keys(D).forEach(id=>{const l=(IT[id]||{}).loc;if(l)cnt[l]=(cnt[l]||0)+1});
 const sea=curSeason();const out=Object.keys(D).filter(id=>{const c=card(id);if(!c||!['dresses','skirts','tops','sweaters','outer','sets'].includes(curCat(id))||(IT[id]||{}).s=='ret')return false;const s=(c.dataset.ss||'').split('|');return sea=='חורף'?s.includes('קיץ'):sea=='קיץ'?s.includes('חורף'):false});
 const inn=Object.keys(D).filter(id=>{const c=card(id);if(!c||(IT[id]||{}).s=='ret')return false;const s=(c.dataset.ss||'').split('|');return s.includes(sea=='מעבר'?'חורף':sea)&&(IT[id]||{}).loc=='מחסן'});
 const give=Object.keys(D).filter(id=>(IT[id]||{}).s=='give');const gz={};give.forEach(id=>{const z=card(id)?.dataset.z||'ללא מידה';(gz[z]=gz[z]||[]).push(id)});
 const fix=Object.keys(D).filter(id=>(IT[id]||{}).fix);
 return `<h3>איפה הבגדים נמצאים</h3><p>בחלון של כל פריט אפשר לבחור מיקום: ${LOC.join(', ')}. ${Object.keys(cnt).length?Object.entries(cnt).map(([k,v])=>`${k}: ${v}`).join(' · '):'עוד לא סימנת מיקומים.'}</p>
 <h3>החלפת עונה (עכשיו ${sea})</h3><p>${sea=='מעבר'?'עונת מעבר: אפשר להתחיל להוציא בגדי חורף מהמחסן.':`כדאי להעביר למחסן ${out.length} בגדי ${sea=='חורף'?'קיץ':'חורף'}.`}</p>
 ${out.length?`<div class="strip">${out.slice(0,40).map(id=>`<button class="mini" data-open="${id}">${img(id)||(D[id]||{}).hi?`<img data-th="${id}" src="${img(id)||TPH}" alt="">`:''}</button>`).join('')}</div><div class="hrow"><button id="tostore">סמני את כולם "מחסן"</button></div>`:''}
 ${inn.length?`<p>להוציא מהמחסן (${inn.length}):</p><div class="strip">${inn.map(id=>`<button class="mini" data-open="${id}">${img(id)||(D[id]||{}).hi?`<img data-th="${id}" src="${img(id)||TPH}" alt="">`:''}</button>`).join('')}</div>`:''}
 <h3>סל "למסור" (${give.length})</h3>${give.length?Object.entries(gz).map(([z,ids])=>`<p><b>${esc(z)}</b> (${ids.length})</p><div class="strip">${ids.map(id=>`<button class="mini" data-open="${id}">${img(id)||(D[id]||{}).hi?`<img data-th="${id}" src="${img(id)||TPH}" alt="">`:''}</button>`).join('')}</div>`).join(''):'<p class="m" style="padding:0">מה שתסמני "למסור" יופיע כאן, מסודר לפי מידה.</p>'}
 <h3>רשימה לתופרת (${fix.length})</h3>${fix.length?`<table class="storet">${fix.map(id=>`<tr><td><a href="#" data-open="${id}">${esc(D[id].short.slice(0,30))}</a></td><td>${esc((IT[id]||{}).note||'')}</td><td><button data-fixed="${id}">✓ תוקן</button></td></tr>`).join('')}</table>`:'<p class="m" style="padding:0">מה שתסמני "צריך תיקון" יופיע כאן.</p>'}`}
function checkSimilar(txt){const words=txt.replace(/[^֐-׿a-zA-Z0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>1&&!['לנשים','נשים','עם','של','חדש','חדשה','אלגנטית','אלגנטי','אופנתית','יחידה','1pc','סט'].includes(w));
 const fam=(()=>{for(const [f,ks] of Object.entries({'שחור':['שחור'],'לבן':['לבן'],'חום':['חום','קפה'],'בז׳':['בז','חאקי','שמפניה'],'כחול':['כחול','נייבי'],'ירוק':['ירוק','זית'],'אדום':['אדום','בורגונדי'],'ורוד':['ורוד'],'סגול':['סגול'],'אפור':['אפור']}))if(ks.some(k=>txt.includes(k)))return f;return ''})();
 const sc=Object.keys(D).map(id=>{const q=(card(id)?.dataset.q||'').toLowerCase();let s=words.filter(w=>q.includes(w.toLowerCase())).length;if(fam&&famOf(id)==fam)s+=1.5;return [id,s]}).filter(([id,s])=>s>=2).sort((a,b)=>b[1]-a[1]).slice(0,12);
 return sc.length?`<p><b>⚠ יש לך כבר ${sc.length} פריטים דומים:</b></p><div class="strip">${sc.map(([id])=>`<button class="mini" data-open="${id}">${img(id)||(D[id]||{}).hi?`<img data-th="${id}" src="${img(id)||TPH}" alt="">`:''}<span>${({t1:'טמו 1',t2:'טמו 2',sh:'שיין'})[D[id].src]}</span></button>`).join('')}</div>`:'<p>✓ לא מצאתי אצלך משהו דומה.</p>'}
document.addEventListener('click',async e=>{const t=e.target;
 const tb=t.closest('[data-tab]');if(tb){TAB=tb.dataset.tab;renderHub();return}
 if(t.closest('#hgen')){runGen();return}
 const rr=t.closest('[data-rr]');if(rr){const [i,slot]=rr.dataset.rr.split('|');const L=GEN[+i];const cur=L[slot];delete L[slot];const nl=genLook(GENO,new Set([cur]),null);
  const tmp=Object.assign({},L);const fs=Object.values(tmp).map(famOf).filter(Boolean);const catOf={dress:['dresses'],set:['sets'],skirt:['skirts'],top:['tops','sweaters'],outer:['outer'],scarf:['scarves'],belt:['belts'],shoes:['shoes'],jewelry:['jewelry'],bag:['bags'],kid:['girls','boys']}[slot]||[];
  const p=poolOf(catOf,GENO,id=>id!=cur&&(['dresses','skirts','tops','sets','outer','sweaters'].some(c=>catOf.includes(c))?fitsOcc(id,GENO.occ):true));L[slot]=pickHarm(p,fs,new Set([cur]))||cur;$('#hlooks').innerHTML=GEN.map((L,i)=>lookHTML(L,i)).join('');return}
 const ls=t.closest('[data-lsave]');if(ls){const i=+ls.dataset.lsave;const nm=`${OCC[GENO.occ]} · ${new Date().toLocaleDateString('he-IL')}`;await saveLook(GEN[i],GENO.occ,nm);return}
 const sh2=t.closest('[data-lshare2]');if(sh2){shareLook(GEN[+sh2.dataset.lshare2],'הלוק שלי');return}
 const sh=t.closest('[data-lshare]');if(sh){const l=LOOKS[sh.dataset.lshare];shareLook(l.items,l.name);return}
 const ld=t.closest('[data-ldel]');if(ld){delLook(ld.dataset.ldel);return}
 const wd=t.closest('[data-wdel]');if(wd){delete PLAN.days[wd.dataset.wdel];await savePlan();renderHub();return}
 if(t.closest('#wclear')){PLAN.days={};await savePlan();renderHub();return}
 if(t.closest('#wauto')){const avoid=new Set();for(let i=0;i<7;i++){const occ=i==6?'shab':(i==5?'shab':'day');const o={occ,sea:curSeason()=='מעבר'?'':curSeason(),fav:false,kids:false};const L=genLook(o,avoid);Object.values(L).forEach(id=>{if(['dresses','skirts','tops','sets'].includes(curCat(id)))avoid.add(id)});
   const id='l'+Date.now().toString(36)+i;LOOKS[id]={id,name:`${DAYS[i]} · ${OCC[occ]}`,occ,items:L,created:new Date().toISOString().slice(0,10),auto:1};PLAN.days[i]=id;if(DB)await saveDoc('looks',id,LOOKS[id])}
  if(!DB){try{localStorage.setItem('hub_looks',JSON.stringify(LOOKS))}catch(_){}}await savePlan();renderHub();toast('השבוע מוכן: חול בימים א׳–ה׳, שבת בשישי ושבת');return}
 if(t.closest('#budsave')){SET.budget=+$('#budget').value||0;if(DB)await saveDoc('settings','main',SET);else{try{localStorage.setItem('hub_settings',JSON.stringify(SET))}catch(_){}}renderHub();return}
 const rf=t.closest('[data-refund]');if(rf){const id=rf.dataset.refund;await putItem(id,{refunded:!(IT[id]||{}).refunded});renderHub();return}
 if(t.closest('#cradd')){const amt=+$('#cra').value;if(!amt){$('#cra').focus();return}const k='c'+Date.now().toString(36);CREDITS[k]={store:$('#crs').value,amt,exp:$('#crd').value||''};if(DB)await saveDoc('credits',k,CREDITS[k]);else{try{localStorage.setItem('hub_credits',JSON.stringify(CREDITS))}catch(_){}}renderHub();return}
 const cd=t.closest('[data-crdel]');if(cd){delete CREDITS[cd.dataset.crdel];if(DB)await saveDoc('credits',cd.dataset.crdel,null);else{try{localStorage.setItem('hub_credits',JSON.stringify(CREDITS))}catch(_){}}renderHub();return}
 if(t.closest('#chkgo')){$('#chkres').innerHTML=checkSimilar($('#chk').value);return}
 if(t.closest('#tostore')){const sea=curSeason();for(const id of Object.keys(D)){const c=card(id);if(!c||!['dresses','skirts','tops','sweaters','outer','sets'].includes(curCat(id)))continue;const s=(c.dataset.ss||'').split('|');if((sea=='חורף'&&s.includes('קיץ'))||(sea=='קיץ'&&s.includes('חורף')))await putItem(id,{loc:'מחסן'})}renderHub();toast('סומנו כ"מחסן"');return}
 const fx=t.closest('[data-fixed]');if(fx){await putItem(fx.dataset.fixed,{fix:false});renderHub();return}
 if(t.closest('#hubbtn')){openHub();return}
 if(t.closest('[data-lookfrom]')){const id=t.closest('[data-lookfrom]').dataset.lookfrom;$('#dlg').close();openHub('looks');const c=card(id);if(c&&isShab(c)&&!isDay(c))$('#hocc').value='shab';runGen(id);return}
 if(t.closest('[data-upimg]')&&!t.classList.contains('ovf')){const ub=t.closest('[data-upimg]');$('#upfile').dataset.id=ub.dataset.upimg;$('#upfile').dataset.upm=ub.dataset.upm||'main';setSt(ub.dataset.upimg,'busy','פותחת את בחירת התמונות…');$('#upfile').click();return}
},true);
document.addEventListener('change',async e=>{const t=e.target;
 if(t.matches('[data-lday2]')&&t.value!==''){const i=+t.dataset.lday2;const id=await saveLook(GEN[i],GENO.occ,`${DAYS[+t.value]} · ${OCC[GENO.occ]}`);PLAN.days=PLAN.days||{};PLAN.days[t.value]=id;await savePlan();toast(`נוסף ליום ${DAYS[+t.value]}`);t.value=''}
 if(t.matches('[data-lday]')&&t.value!==''){PLAN.days=PLAN.days||{};PLAN.days[t.value]=t.dataset.lday;await savePlan();toast(`נוסף ליום ${DAYS[+t.value]}`);t.value=''}
 if(t.matches('.locsel')){putItem(t.closest('.ed').dataset.id,{loc:t.value})}
 if(t.id=='upfile'&&t.files[0]){const f0=t.files[0],id=t.dataset.id,mode=t.dataset.upm;
  // קוראים את הקובץ לזיכרון מיד, לפני איפוס הבורר (באנדרואיד הקובץ נעלם אחרי איפוס)
  setSt(id,'busy','קוראת את התמונה מהטלפון…');let f=f0;try{const buf=await f0.arrayBuffer();f=new File([buf],f0.name||'photo.jpg',{type:f0.type||'image/jpeg'})}catch(err){setSt(id,'err','לא הצלחתי לקרוא את הקובץ מהטלפון. נסי תמונה אחרת');toast('לא הצלחתי לקרוא את הקובץ');t.value='';return}
  t.value='';try{await routeUp(id,f,mode)}catch(err){setSt(id,'err','שגיאה: '+(err&&err.message||err));toast('שגיאה בשמירת התמונה')}}});
function paintImg(id){const it=IT[id]||{};if(!it.img)return;const c=card(id);if(!c)return;let im=c.querySelector('.ph img');if(!im){c.querySelector('.noimg')?.remove();im=document.createElement('img');c.querySelector('.ph').prepend(im)}const u='/_blob/'+it.img;if(im.getAttribute('src')!=u)im.src=u}
// dialog extras: location, colors that go, matching head coverings, look from item, photo upload
const _afterOpen=afterOpen;afterOpen=function(id){_afterOpen(id);const ed=$('#dlbody .ed:not(.edtop)');const it=IT[id]||{};
 if(ed){ed.insertAdjacentHTML('beforeend',`<div class="erow"><span>מיקום</span><select class="locsel"><option value="">—</option>${['ארון','מגירה','מחסן','כביסה','אצל התופרת'].map(l=>`<option ${it.loc==l?'selected':''}>${l}</option>`).join('')}</select></div>
 <div class="imgrow" data-imgrow="${id}"></div>`);renderImgRow(id)}
 const f=famOf(id);const g=GROUPOF(curCat(id));
 if(g=='clo'){const goesW=f?(HARM[f]=='*'?['כל הצבעים']:(HARM[f]||[])):[];
  const sc=Object.keys(D).filter(o=>curCat(o)=='scarves'&&(IT[o]||{}).s!='ret'&&goes(famOf(o),f)).slice(0,10);
  $('#dlbody').insertAdjacentHTML('beforeend',`<div class="sim"><button class="go" data-lookfrom="${id}">✨ הרכיבי לוק מהבגד הזה</button>${f?`<h4>הולך טוב עם: ${goesW.join(', ')}</h4>`:''}${sc.length?`<h4>כיסויי ראש שמתאימים</h4><div class="strip">${sc.map(o=>`<button class="mini" data-open="${o}">${img(o)||(D[o]||{}).hi?`<img data-th="${o}" src="${img(o)||TPH}" alt="">`:''}</button>`).join('')}</div>`:''}</div>`)}};
// wear sets lastWorn
const _putItem=putItem;putItem=function(id,patch){if('wear' in patch&&patch.wear>((IT[id]||{}).wear||0))patch.lastWorn=new Date().toISOString().slice(0,10);return _putItem(id,patch)};
// closet rail view
let RAIL=false;$('#rail').addEventListener('click',e=>{RAIL=!RAIL;document.body.classList.toggle('rail',RAIL);e.currentTarget.setAttribute('aria-pressed',RAIL);if(RAIL){SORT='col';$('#sort').value='col';sortAll()}});
// location filter
let LOCF='';$('#locf').addEventListener('change',e=>{LOCF=e.target.value;apply()});
const _extra2=extra;extra=function(c){if(!_extra2(c))return false;if(LOCF&&((IT[c.dataset.id]||{}).loc||'')!=LOCF)return false;return true};
// voice search
(function(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;const b=$('#mic');if(!SR){b.remove();return}
 b.addEventListener('click',()=>{try{const r=new SR();r.lang='he-IL';r.onresult=ev=>{$('#q').value=ev.results[0][0].transcript;apply();saveF()};r.onerror=()=>toast('המיקרופון לא זמין כאן');r.start();toast('מקשיבה…')}catch(_){toast('המיקרופון לא זמין כאן')}})})();
// apply custom images after data loads
const _paint=paint;paint=function(id){_paint(id);paintImg(id)};
