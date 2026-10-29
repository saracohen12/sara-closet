// ---- v52 (2026-10-21): Sara's studio round — new avatar by default + base chooser, "⋯ עוד" menu, drawer inside the column on desktop,
// readiness dots + sort in the drawer, label clean-up for garments uploaded before v51
{const _os=openStudio;openStudio=async function(look,items){if(!SET.avb3){SET.avb3=1;SET.avbase='p5';try{saveSet()}catch(_){}}const r=await _os(look,items);s52Mount();return r}}
// 1) base chooser
const AVB=[['p5','האווטאר החדש · 5 תנוחות','מומלץ: חזית, צד, גב, חצי צד, יד על המותן. עם כיסוי או פאה'],['long','ישן · בסיס ארוך','שרוול ארוך וחצאית ארוכה. רק חזית וגב'],['short','ישן · בסיס קצר','שרוול קצר וחצאית עד הברך. רק חזית וגב']];
function openBaseDrawer(){if(!ST)return;closeDrawer();const cur=ST.avbase||'long';
 $('#sdrawer').innerHTML=`<div class="dh"><b>🧍 על איזה אווטאר?</b><button class="x" id="dclose">✓</button></div><div class="avbl">${AVB.map(([k,n,d])=>`<button data-avb="${k}" aria-pressed="${cur==k}"><img src="${(BASES[k]||{}).img||TPH}" alt=""><span><b>${n}</b><small>${d}</small></span></button>`).join('')}</div>`;$('#sdrawer').classList.add('open')}
window.openBaseDrawer=openBaseDrawer;
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-avb]');if(!b||!ST)return;e.preventDefault();e.stopPropagation();const k=b.dataset.avb;closeDrawer();if(k==(ST.avbase||'long'))return;
 pushH();ST.avbase=k;SET.avbase=k;try{saveSet()}catch(_){}if(k!='p5'&&POSEIMG[ST.view])ST.view='front';for(const s of Object.keys(ST.items))ST.tf[s]=await autoTf(s,ST.items[s]);paintTop();await drawStudio();try{paintSpin()}catch(_){}
 toast(k=='p5'?'האווטאר החדש: אפשר לבחור תנוחה למעלה':'בסיס ישן: רק חזית וגב')},true);
// 2) "⋯ עוד" menu for the rarely used toolbar buttons, each with one line of explanation
const SMORE=[['sbgbtn','🎨 רקע','צבע הרקע מאחורי הדמות'],['slist','🧺 הפריטים בלוק','מה כבר על הדמות עכשיו'],['sai','💬 מה דעתך?','חוות דעת על הלוק: מה הולך יחד ומה לשנות'],['sexp','📤 תמונה של הלוק','שומרת תמונה אחת של הלוק, לשיתוף'],['sclear','🧹 הסירי הכל','מורידה את כל הבגדים מהדמות'],['snew','＋ לוק חדש','מתחילה לוק ריק']];
function s52Mount(){const top=$('#studio .stop');if(!top||$('#smore'))return;const b=document.createElement('button');b.id='smore';b.textContent='⋯ עוד';($('#sredo')||$('#ssv')).after(b)}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#smore');if(!t||!ST)return;e.preventDefault();e.stopPropagation();const d=$('#sdrawer');if(d.querySelector('.smenu')&&d.classList.contains('open')){closeDrawer();return}closeDrawer();
 d.innerHTML=`<div class="dh"><b>⋯ עוד</b><button class="x" id="dclose">✓</button></div><div class="smenu">${SMORE.filter(([id])=>id=='sclear'?lookIds(ST).length:$('#'+id)).map(([id,n,d])=>`<button data-smenu="${id}"><b>${n}</b><small>${d}</small></button>`).join('')}</div>`;d.classList.add('open')},true);
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-smenu]');if(!t)return;e.preventDefault();e.stopPropagation();const id=t.dataset.smenu;closeDrawer();
 if(id=='sclear'){const c=$('#ssel');if(c&&!c.querySelector('#sclear'))c.insertAdjacentHTML('beforeend','<button id="sclear" class="mini2 hide">🧹 הסירי הכל</button>')}const b=$('#'+id);if(b)setTimeout(()=>b.click(),30)},true);
// 3) desktop: the drawer sits inside the slots column, under the slot buttons, instead of over the avatar
function placeDrawer(){const d=$('#sdrawer');if(!d)return;if(innerWidth<900||!d.classList.contains('open')){if(d.dataset.fx){d.style.cssText='';delete d.dataset.fx}return}
 const rail=$('#srail'),dlg=$('#studio').getBoundingClientRect(),rr=rail.getBoundingClientRect();let bot=0;for(const c of rail.children){const r=c.getBoundingClientRect();if(r.bottom>bot)bot=r.bottom}if(!bot)bot=rr.top;
 const si=$('#sinfo');const vb=Math.min(dlg.bottom,innerHeight);let end=vb;if(si){const q=si.getBoundingClientRect();if(q.top>bot+380)end=q.top}/* v74: on short screens the drawer covers #sinfo instead of shrinking to nothing */d.dataset.fx=1;d.style.cssText=`position:fixed;left:${rr.left}px;width:${rr.width}px;top:${bot+6}px;height:${Math.max(Math.min(300,vb-bot-6),end-bot-6)}px;right:auto;bottom:auto;border-radius:18px 18px 0 0;z-index:30`}
try{new MutationObserver(placeDrawer).observe($('#sdrawer'),{attributes:true,attributeFilter:['class']});addEventListener('resize',placeDrawer)}catch(_){}
// 4) drawer: readiness dot on every tile, sort "🟢 מוכן לאווטאר קודם" (default), "🟢 רק מוכנים" chip
const AVRANK=s=>s=='ok'?0:s==''?1:s=='fix'?2:3;
{const _fd=fillDrawer;fillDrawer=async function(){await _fd();const slot=DRAWER;const g=$('#dgrid');if(!g||!slot||!SLOTS.find(s=>s[0]==slot))return;
 const df=$('#sdrawer .df');if(df&&!df.querySelector('[data-dready]'))df.insertAdjacentHTML('beforeend',`<button data-dready aria-pressed="${!!DRF.ready}" title="רק פריטים שכבר מוכנים לאווטאר">🟢 מוכנים</button>`);
 const tiles=[...g.querySelectorAll('.di')];const st={};for(const t of tiles){const id=t.dataset.dpick;const s=(window.avStat&&avStat(id))||'';st[id]=s;const chk=t.querySelector('.chk');if(s&&chk&&!chk.querySelector('.avd'))chk.insertAdjacentHTML('beforeend',`<i class="avd avd-${s}" title="${s=='ok'?'מוכן לאווטאר החדש':s=='fix'?'רק לאווטאר הישן':'אין עדיין לאווטאר'}"></i>`)}
 if(DRF.sort=='av'){tiles.sort((a,b)=>AVRANK(st[a.dataset.dpick])-AVRANK(st[b.dataset.dpick]));tiles.forEach(t=>g.appendChild(t))}
 if(DRF.ready){let n=0;tiles.forEach(t=>{const h=st[t.dataset.dpick]!='ok';t.classList.toggle('hide',h);if(!h)n++});if(!n&&!g.querySelector('.dempty2'))g.insertAdjacentHTML('afterbegin','<p class="dempty dempty2">אין עדיין פריטים מוכנים לאווטאר במשבצת הזו. כבי את "🟢 רק מוכנים" כדי לראות את כולם.</p>')}}}
let DR_LAST=null;{const _od=openDrawer;openDrawer=function(slot){if(DR_LAST&&DR_LAST!=slot){DRF.fam='';DRF.q=''}DR_LAST=slot;const r=_od.apply(this,arguments);try{const d=$('#sdrawer');d.scrollTop=0;const g=$('#dgrid');if(g)g.scrollTop=0;d.querySelectorAll('.dfam.pop.open').forEach(x=>x.classList.remove('open'))}catch(_){}return r}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-dready]');if(!t)return;e.preventDefault();e.stopPropagation();DRF.ready=!DRF.ready;openDrawer(DRAWER)},true);
// 5) garments uploaded before v51 may still carry GPT labels ("קדמי"): clean them once, in the background, and refit
const P5GRC={};function loadUrlImg(u){return new Promise((ok,bad)=>{const im=new Image();im.onload=()=>ok(im);im.onerror=()=>bad(new Error('img'));im.src=u})}
async function p5gRecheck(id){if(P5GRC[id])return;P5GRC[id]=1;const it=IT[id]||{};const vars=p5gVars(id);if(!vars.length||vars.every(g=>g.c==2))return;
 let a=null;try{a=await claude.use('assets')}catch(_){}if(!a)return;const slot=p5gSlot(id)||'top';let changed=0;
 for(const g of vars){if(g.c==2)continue;for(const v of P5G_VIEWS){if(!g[v])continue;try{const u=(g.u&&g.u[v]&&/^(\/|blob:)/.test(g.u[v]))?g.u[v]:'/_blob/'+g[v];const im=await loadUrlImg(u);const cv=document.createElement('canvas');cv.width=im.naturalWidth||im.width;cv.height=im.naturalHeight||im.height;cv.getContext('2d').drawImage(im,0,0);
   const c=p5gClean(p5gMeasure(cv));g.fit=g.fit||{};if(!c.cleaned){g.fit[v]=p5gFit(v,slot,c);continue}const c2=p5gLong(v,slot,c);const r=await a.upload(await tieBlob(c2.canvas));g[v]=r.id;g.u=g.u||{};if(r.url)g.u[v]=r.url;g.fit[v]=p5gFit(v,slot,c2);changed++}catch(e){}}g.c=2}
 const act=p5gActive(id);inUndo=true;try{await putItem(id,{p5g:vars[act]||vars[0],p5gv:vars.length>1?vars:null})}catch(_){}finally{inUndo=false}// v68: a background clean-up must not pop a 'נשמר… ביטול' toast when an item is merely opened
 if(changed){toast('✓ ניקיתי כיתובים מהבגד והנחתי אותו מחדש');try{if(ST&&$('#studio').open)drawStudio()}catch(_){}try{renderImgRow(id)}catch(_){}}}
window.p5gRecheck=p5gRecheck;
{const _ds=drawStudio;drawStudio=async function(){const r=await _ds.apply(this,arguments);try{if(ST)Object.values(ST.items).forEach(id=>{if(id&&p5gOf(id))p5gRecheck(id)})}catch(_){}return r}}
{const _rr=renderImgRow;renderImgRow=function(id){const r=_rr.apply(this,arguments);try{if(p5gOf(id))p5gRecheck(id)}catch(_){}return r}}

// ---- v54: colour chips folded into one "🎨 צבע" button that opens the colour row; column widened to 440px (CSS)
{const _od=openDrawer;openDrawer=function(slot){_od(slot);const d=$('#sdrawer');const fam=d&&d.querySelector('.dfam');const df=d&&d.querySelector('.df');if(!fam||!df||df.querySelector('[data-dcol]'))return;
 const cur=DRF.fam?`<i class="dot" style="background:${FAMC[DRF.fam]||'#ccc'}"></i> ${esc(DRF.fam)}`:'כל הצבעים';df.insertAdjacentHTML('beforeend',`<button data-dcol aria-pressed="${!!DRF.fam}" title="צבע">${DRF.fam?cur:'🎨'} ▾</button>`);fam.classList.add('pop')}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-dcol]');if(!t)return;e.preventDefault();e.stopPropagation();const fam=$('#sdrawer .dfam');if(fam)fam.classList.toggle('open')},true);

try{new ResizeObserver(()=>placeDrawer()).observe($('#ssel'))}catch(_){}
// ---- v56: the garment tool strip (#ssel) moves to a thin full-width row right under the toolbar
function s56Mount(){const st=$('#studio .stop'),ss=$('#ssel');if(!st||!ss||st.nextElementSibling===ss)return;st.after(ss);ss.classList.add('thin')}
{const _os=openStudio;openStudio=async function(look,items){const r=await _os(look,items);try{s56Mount();placeDrawer()}catch(_){}return r}}

// ---- v57: pick the colour/version of a pack right in the tool strip; selection frame fades when idle
{const _ps=paintSel;paintSel=function(){_ps();const c=$('#ssel');if(!c||!ST||!SSEL)return;const id=ST.items[SSEL];if(!id)return;const vs=p5gVars(id);if(vs.length<2)return;const tf=ST.tf[SSEL]||{};const cur=p5gOfT(id,tf);
 c.insertAdjacentHTML('beforeend',`<div class="lpics gvs"><span>🎨 צבע:</span>${vs.map((v,i)=>`<button data-gv="${v.t}" aria-pressed="${cur&&cur.t==v.t}" title="${esc(v.n||('גרסה '+(i+1)))}"><img src="${p5gUrl(v,'front')}" alt=""><small>${esc(v.n||('גרסה '+(i+1)))}</small></button>`).join('')}</div>`)}}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#ssel [data-gv]');if(!b||!ST||!SSEL)return;e.preventDefault();e.stopPropagation();pushH();const tf=ST.tf[SSEL]=ST.tf[SSEL]||{};tf.gv=+b.dataset.gv;const keep=SSEL;await drawStudio();SSEL=keep;$$('#sstage img.sl').forEach(z=>z.classList.toggle('sel',z.dataset.slot==keep));paintSel()},true);
let CALMT=null;function calmSel(){clearTimeout(CALMT);CALMT=setTimeout(()=>$$('#sstage img.sl.sel').forEach(z=>z.classList.add('calm')),1400)}
document.addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('#sstage')){clearTimeout(CALMT);$$('#sstage img.sl.calm').forEach(z=>z.classList.remove('calm'))}},true);
document.addEventListener('pointerup',()=>{if(ST&&$('#studio').open)calmSel()},true);
{const _ds=drawStudio;drawStudio=async function(){const r=await _ds.apply(this,arguments);try{calmSel()}catch(_){}return r}}

// v66: an empty drawer says WHY (which filter is on) and offers to clear it – Sara saw a blank list after picking a colour in another slot
{const _fd=fillDrawer;fillDrawer=async function(){const r=await _fd.apply(this,arguments);try{const g=$('#dgrid');if(!g||g.querySelector('[data-dpick]')||g.querySelector('.dclr'))return r;const on=[];if(DRF.fam)on.push('צבע '+DRF.fam);if(DRF.q)on.push('חיפוש "'+DRF.q+'"');if(DRF.fav)on.push('♥ מועדפים');if(DRF.occ)on.push(DRF.occ=='shab'?'שבת':'חול');if(DRF.ready)on.push('🟢 רק מוכנים');
 g.innerHTML=`<div class="dempty dclr"><p>${on.length?'אין פריטים שמתאימים לסינון: <b>'+on.join(' · ')+'</b>':'אין פריטים במשבצת הזו'}</p>${on.length?'<button class="go" data-dclear>🧹 נקי סינון – הראי הכל</button>':''}</div>`}catch(_){}return r}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-dclear]');if(!t)return;e.preventDefault();e.stopPropagation();DRF.fam='';DRF.q='';DRF.fav=false;DRF.occ='';DRF.ready=false;if(DRAWER)openDrawer(DRAWER)},true);
// v67: "🟢 מוכן לאווטאר קודם" in the closet sorts inside each category only, so the first category can still show red items.
// Choosing it now also switches the "רק" filter to 🟢 מסודר לאווטר (and back when another sort is chosen).
{const so=$('#sort'),fl=$('#flf');if(so&&fl){so.addEventListener('change',e=>{if(e.target.value=='av'){if(fl.value!='avok'){fl.value='avok';fl.dispatchEvent(new Event('change',{bubbles:true}))}toast('מציגה רק פריטים שמוכנים לאווטאר. לכולם: מיון רגיל')}else if(fl.value=='avok'){fl.value='';fl.dispatchEvent(new Event('change',{bubbles:true}))}})}}

// v67: open-neck tops – "👤 צוואר מעל הבגד" draws the neck of the new avatar above the garment (av/p5_front_neck.webp); the old bases always do (their head overlay includes the neck)
const NKSLOTS=['top','dress','set','outer'];
{const _ps2=paintSel;paintSel=function(){_ps2();try{const c=$('#ssel');if(!c||!ST||!NKSLOTS.includes(SSEL)||!ST.items[SSEL])return;if((ST.avbase||'long')!='p5')return;const tf=ST.tf[SSEL]||{};const sb=c.querySelector('.sbtns');if(sb&&!sb.querySelector('[data-nk]'))sb.insertAdjacentHTML('afterbegin',`<button data-nk aria-pressed="${!!tf.nk}" title="לחולצה פתוחה: הצוואר נשאר גלוי מעל הבגד">👤 ${tf.nk?'צוואר מעל הבגד':'צוואר מעל'}</button>`)}catch(_){}}}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#ssel [data-nk]');if(!b||!ST||!SSEL)return;e.preventDefault();e.stopPropagation();pushH();const tf=ST.tf[SSEL]=ST.tf[SSEL]||{};tf.nk=tf.nk?0:1;const keep=SSEL;await drawStudio();SSEL=keep;paintSel()},true);
{const _si2=stageInner;stageInner=async function(S,opt={}){let html=await _si2(S,opt);try{if((S.avbase||'long')!='p5'||(S.view||'front')!='front')return html;const on=NKSLOTS.some(k=>S.items[k]&&(S.tf[k]||{}).nk&&!(S.tf[k]||{}).hidden);if(!on)return html;const src='av/'+(S.head!='wig'?'p5c':'p5')+'_front_neck.webp';html=stageAdd(html,`<img class="sl nkov" src="${src}" style="left:0;top:0;width:100%;transform:none;z-index:49;pointer-events:none" alt="" draggable="false">`)}catch(_){}return html}}
