// ===== v185: הארון החכם, stage A of the smart-closet plan (24/10, rows 267–271): where every item lives (her own map of the house, "חדר שינה › ארון לבן › מדף 2"),
// what is happening with it now (במקום / עליי / בכביסה / נקי / תופרת / הושאל / מחסן), "לבשתי היום" puts it on her, the laundry basket by colour and care label,
// "איפה ה...?", greyed-out laundry in the studio. IT[id].loc = the state (same field the old מיקום select used), IT[id].place = its home, IT[id].locT = since when, IT[id].care = label.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v185 '+w+': '+(e&&e.message||e));
const $1=s=>document.querySelector(s),$a=(s,r)=>[...(r||document).querySelectorAll(s)];
const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=m=>(window.toast||(()=>{}))(m);
const FIN={'ם':'מ','ן':'נ','ץ':'צ','ף':'פ','ך':'כ'};
const norm=s=>String(s==null?'':s).toLowerCase().replace(/[֑-ׇ]/g,'').replace(/[םןץףך]/g,c=>FIN[c]).replace(/[׳'"״`]/g,'').replace(/\s+/g,' ').trim();
const nm=id=>{const x=D[id]||{};return String(x.short||x.full||'').replace(/^[A-Za-z0-9&'.\-\s]+(?=[֐-׿])/,'').trim()||id};
const ph=id=>{try{return img(id)||TPH}catch(_){return ''}};
const cat=id=>{try{return curCat(id)}catch(_){return (D[id]||{}).cat||''}};
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
const live=id=>{const i=it(id);return D[id]&&!i.gen&&!i.oos&&i.s!='ret'&&i.s!='give'};
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};

// the states; 'ארון' / 'מגירה' (the old select) count as "in its place"
const ST=[['','🏠','במקום'],['עליי','👗','עליי'],['כביסה','🧺','בכביסה'],['נקי','✨','נקי, לקפל'],['אצל התופרת','🪡','אצל התופרת'],['הושאל','🤝','הושאל'],['מחסן','📦','במחסן']];
const SI=Object.fromEntries(ST.map(s=>[s[0],s]));
const stOf=id=>{const l=it(id).loc||'';return (l=='ארון'||l=='מגירה'||!SI[l])?'':l};
const CARE=['ביד','מכונה 30°','מכונה 40°','מכונה 60°','לא למייבש','בלי מרכך','ניקוי יבש','גיהוץ חלש'];
const WASH=new Set(['dresses','sets','skirts','tops','base','outer','sweaters','girls','boys','night','scarves','hosiery','men']);
const washable=id=>WASH.has(cat(id));
const fam=id=>{const c=document.querySelector(`.card[data-id="${CSS.escape(id)}"]`);return (c&&c.dataset.c)||((D[id]||{}).col||{}).fc||''};
// the laundry baskets
const BK=[['soft','🤲','עדין: ביד או ניקוי יבש',id=>(it(id).care||[]).some(c=>c=='ביד'||c=='ניקוי יבש')],
 ['white','⚪','לבן',id=>fam(id)=='לבן'],['light','🌸','בהירים',id=>['בז׳','ורוד','אפור'].includes(fam(id))],
 ['dark','⚫','כהים',id=>['שחור','כחול','חום','ירוק','סגול','אדום'].includes(fam(id))],['mix','🎨','צבעוני ומעורב',()=>true]];
const basketOf=id=>BK.find(b=>b[3](id))[0];

const places=()=>((typeof SET=='object'&&SET&&SET.places)||[]).slice();
async function saveSet(){try{if(typeof DB!='undefined'&&DB)await saveDoc('settings','main',SET);else localStorage.setItem('hub_settings',JSON.stringify(SET))}catch(e){ERR('saveSet',e)}}
const short=p=>{const a=String(p||'').split('›').map(s=>s.trim()).filter(Boolean);return a.slice(-2).join(' › ')};
function since(d){if(!d)return '';const t=new Date(d+'T00:00:00'),n=new Date(today()+'T00:00:00');const k=Math.round((n-t)/864e5);
 if(k<=0)return 'היום';if(k==1)return 'מאתמול';if(k<7)return 'מיום '+['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'][t.getDay()];return 'מ-'+t.getDate()+'/'+(t.getMonth()+1)}
function where(id){const s=stOf(id),i=it(id);const p=i.place?'📍 '+short(i.place):'';if(!s)return p;const x=SI[s];return [x[1]+' '+x[2]+(i.locT?' '+since(i.locT):''),p].filter(Boolean).join(' · ')}

// one write for many items (one apply, one batch to the database)
async function setMany(ids,patch,msg){ids=ids.filter(id=>D[id]);if(!ids.length)return;
 for(const id of ids){const p=typeof patch=='function'?patch(id):patch;const o=Object.assign({},IT[id]||{},p);Object.keys(o).forEach(k=>{if(o[k]===''||o[k]==null||o[k]===false||(Array.isArray(o[k])&&!o[k].length))delete o[k]});
  if(Object.keys(o).length)IT[id]=o;else delete IT[id];try{paint(id)}catch(_){}}
 try{apply()}catch(_){}
 try{if(typeof DB!='undefined'&&DB)await Promise.all(ids.map(id=>{const d=DB.collection('items').doc(id);return (IT[id]?d.set(IT[id]):d.delete()).catch(e=>console.warn(e))}));else saveLocal()}catch(e){ERR('save',e)}
 if(msg)toast_(msg);refresh()}
const toState=(ids,s,msg)=>setMany(ids,()=>({loc:s,locT:s?today():''}),msg);

// "לבשתי היום" → עליי (the whole look too, it calls putItem for every item)
{const _p=putItem;putItem=function(id,patch){try{if(patch&&'wear' in patch&&patch.wear>(it(id).wear||0)&&!('loc' in patch)&&!(patch._wd&&patch._wd.last&&patch._wd.last!=today())){   // v267: marking a day in the past doesn't put the item 'on me' today
patch.loc='עליי';patch.locT=today()}}catch(_){}return _p.apply(this,arguments)}}

// ---------- badges on the closet cards and in the studio ----------
function badge(id){const c=document.querySelector(`.card[data-id="${CSS.escape(id)}"]`);if(!c)return;const s=stOf(id);if((c.dataset.s185||'')==s)return;
 if(s)c.dataset.s185=s;else delete c.dataset.s185;const ph_=c.querySelector('.ph');if(!ph_)return;let b=ph_.querySelector('.st185');
 if(!s){if(b)b.remove();return}if(!b){b=document.createElement('span');b.className='st185';ph_.appendChild(b)}b.textContent=SI[s][1]+' '+SI[s][2]}
let BT=0;function badges(){clearTimeout(BT);BT=setTimeout(()=>{try{Object.keys(D).forEach(badge);studio()}catch(e){ERR('badges',e)}},120)}
function studio(){const d=$1('#r360');if(!d||!d.open)return;$a('[data-it]',d).forEach(b=>{const s=stOf(b.dataset.it);if((b.dataset.s185||'')!=s){if(s)b.dataset.s185=s;else delete b.dataset.s185;b.title=s?SI[s][2]:''}})}
setInterval(studio,1200);

// ---------- the item window: where it lives, what is happening with it, care label ----------
function itemRow(id){const ed=$1('#dlbody .ed[data-id]');if(!ed||ed.dataset.id!=id)return;
 // the old "מיקום" select is replaced by this row
 $a('#dlbody .locsel').forEach(s=>{const p=s.previousElementSibling;if(p&&/מיקום/.test(p.textContent))p.remove();s.remove()});
 let r=$1('#dlbody .sc185d');if(!r){r=document.createElement('div');r.className='sc185d';const at=$1('#dlbody .erow.wear')||ed.lastElementChild;at?at.after(r):ed.appendChild(r)}
 const i=it(id),s=stOf(id),care=i.care||[];r.dataset.id=id;
 r.innerHTML=`<div class="sdr"><span class="sdl">📍 המקום שלו</span><button type="button" class="sdp" data-sc185pick="${es(id)}">${i.place?es(i.place):'לבחור מקום'}</button></div>
  <div class="sdr sds" role="group" aria-label="מה קורה איתו עכשיו">${ST.filter(x=>x[0]!='כביסה'&&x[0]!='נקי'||washable(id)).map(x=>`<button type="button" data-sc185st="${x[0]}" aria-pressed="${s==x[0]}">${x[1]} ${x[2]}</button>`).join('')}</div>
  ${s&&i.locT?`<small class="sdn">${SI[s][1]} ${SI[s][2]} ${since(i.locT)}</small>`:''}
  ${washable(id)?`<details class="sdc"${care.length?'':''}><summary>🏷 הוראות כביסה${care.length?': '+es(care.join(', ')):''}</summary><div class="sdcb">${CARE.map(c=>`<button type="button" data-sc185care="${es(c)}" aria-pressed="${care.includes(c)}">${es(c)}</button>`).join('')}</div></details>`:''}`}
{const _ao=afterOpen;afterOpen=function(id){const r=_ao.apply(this,arguments);setTimeout(()=>{try{itemRow(id)}catch(e){ERR('item',e)}},80);return r}}

// ---------- place picker ----------
let P=null,PFOR=null;
function pick(ids,title){PFOR=ids;if(!P){P=document.createElement('dialog');P.id='sc185p';P.dir='rtl';P.setAttribute('aria-labelledby','sc185pt');document.body.appendChild(P)}
 const L=places(),cur=ids.length==1?it(ids[0]).place||'':'';
 P.innerHTML=`<div class="p185h"><h3 id="sc185pt">📍 ${es(title||'איפה הוא גר?')}<small>${ids.length>1?ids.length+' פריטים':es(nm(ids[0]).slice(0,50))}</small></h3><button type="button" class="x185" aria-label="סגירה">✕</button></div>
  <div class="p185b">${L.length?`<div class="p185l" role="radiogroup" aria-label="מקומות">${L.map(p=>`<button type="button" role="radio" data-p185="${es(p)}" aria-checked="${p==cur}">${es(p)}</button>`).join('')}</div>`:'<p class="p185e">עוד אין מקומות. כותבים מהגדול לקטן, למשל: חדר שינה › ארון לבן › מדף 2</p>'}
  <form class="p185n"><input name="p" placeholder="מקום חדש: חדר › ארון › מדף" aria-label="מקום חדש" autocomplete="off"><button type="submit">+ להוסיף</button></form>
  ${cur?'<button type="button" class="p185x" data-p185="">בלי מקום</button>':''}</div>`;
 if(!P.open)P.showModal()}
async function addPlace(p){p=String(p||'').replace(/\s*[>›]\s*/g,' › ').replace(/\s+/g,' ').trim();if(!p)return '';const L=places();if(!L.includes(p)){L.push(p);L.sort((a,b)=>a.localeCompare(b,'he'));SET.places=L;await saveSet()}return p}
document.addEventListener('submit',async e=>{const f=e.target.closest&&e.target.closest('.p185n,.w185n');if(!f)return;e.preventDefault();const v=await addPlace(f.elements[0].value);if(!v)return;
 if(f.classList.contains('p185n')&&PFOR){await setMany(PFOR,{place:v},'📍 '+short(v));P.close()}else{f.elements[0].value='';toast_('📍 נוסף: '+v);render()}});

// ---------- the smart closet window ----------
let W=null,TAB='now',OPEN={},MAP=null,Q='';
function grid(ids,btns){return `<div class="g185">${ids.map(id=>`<div class="c185"><button type="button" class="c185i" data-sc185open="${es(id)}"><img alt="" loading="lazy" data-th="${es(id)}" src="${ph(id)}"><span>${es(nm(id))}</span></button>${btns?`<div class="c185b">${btns(id)}</div>`:''}</div>`).join('')}</div>`}
function thl(ids){new Set(ids.map(cat)).forEach(c=>{try{thLoad(c).then(()=>thApply(TH)).catch(()=>{})}catch(_){}})}
const by=s=>Object.keys(D).filter(id=>live(id)&&stOf(id)==s);
function counts(){const n={};Object.keys(D).forEach(id=>{if(!live(id))return;const s=stOf(id);if(s)n[s]=(n[s]||0)+1});return n}
function tabNow(){const on=by('עליי'),cl=by('נקי');let h='',all=[...on,...cl];
 h+=`<section class="s185"><h3>👗 עליי היום <small>${on.length}</small></h3>${on.length?`<div class="a185"><button type="button" data-sc185all="wash" class="pri">🧺 הבגדים לכביסה</button><button type="button" data-sc185all="home">↩ הכל חזר למקום</button></div>`+grid(on,id=>`${washable(id)?`<button type="button" data-sc185to="כביסה" data-id="${es(id)}">🧺 לכביסה</button>`:''}<button type="button" data-sc185to="" data-id="${es(id)}">↩ למקום</button>`):'<p class="e185">כשלוחצים "לבשתי היום" על פריט או על לוק, הוא מופיע כאן. בערב: לכביסה או חזרה לארון.</p>'}</section>`;
 h+=`<section class="s185"><h3>✨ נקי, לקפל ולהחזיר <small>${cl.length}</small></h3>${cl.length?`<div class="a185"><button type="button" data-sc185all="back">↩ הכל חזר למקום</button></div>`+grid(cl,id=>`<button type="button" data-sc185to="" data-id="${es(id)}">↩ ${it(id).place?es(short(it(id).place)):'למקום'}</button><button type="button" data-sc185pick="${es(id)}" aria-label="למקום אחר">📍</button>`):'<p class="e185">מה שסימנת "כובס" בסל הכביסה מחכה כאן לקיפול.</p>'}</section>`;
 [['אצל התופרת'],['הושאל'],['מחסן']].forEach(([s])=>{const L=by(s);if(!L.length)return;all.push(...L);
  h+=`<section class="s185"><h3>${SI[s][1]} ${SI[s][2]} <small>${L.length}</small></h3>`+grid(L,id=>`<small class="w185s">${since(it(id).locT)}</small><button type="button" data-sc185to="" data-id="${es(id)}">↩ חזר</button>`)+'</section>'});
 thl(all);return h}
function tabWash(){const L=by('כביסה');const g={};L.forEach(id=>{const k=basketOf(id);(g[k]=g[k]||[]).push(id)});
 let h=`<p class="i185">${L.length?`${L.length} בגדים בסל, מסודרים למכונות לפי צבע. מה שסימנת "ביד" או "ניקוי יבש" לבד.`:'הסל ריק 🎉'}</p>`;
 BK.forEach(([k,i,n])=>{const ids=g[k];if(!ids)return;const temps=ids.map(id=>(it(id).care||[]).map(c=>+((c.match(/(\d+)°/)||[])[1]||0)).filter(Boolean)).flat();const lo=temps.length?Math.min(...temps):0;
  const no=ids.filter(id=>(it(id).care||[]).includes('לא למייבש')).length;
  h+=`<section class="s185 b185"><h3>${i} ${n} <small>${ids.length}</small></h3><p class="t185">${lo?`🌡 עד ${lo}°`:''}${no?` · ${no} לא למייבש`:''}</p><div class="a185"><button type="button" class="pri" data-sc185done="${k}">✓ כובס</button></div>`+grid(ids,id=>`<button type="button" data-sc185to="נקי" data-id="${es(id)}">✓ כובס</button><button type="button" data-sc185to="" data-id="${es(id)}" aria-label="להוציא מהסל">✕</button>`)+'</section>'});
 h+=`<section class="s185"><h3>+ להוסיף לסל</h3><input class="q185" data-q185="wash" placeholder="מה עוד לכביסה? שם, צבע או סוג" aria-label="חיפוש בגד להוספה לסל" value="${es(Q)}"><div class="r185"></div></section>`;
 thl(L);return h}
function tree(){const L=places(),n={};Object.keys(D).forEach(id=>{const p=it(id).place;if(p&&live(id))n[p]=(n[p]||0)+1});return {L,n}}
function tabWhere(){const {L,n}=tree();const none=Object.keys(D).filter(id=>live(id)&&!it(id).place).length;
 let h=`<section class="s185"><h3>🔎 איפה ה...?</h3><input class="q185" data-q185="where" placeholder="למשל: חצאית שחורה" aria-label="איפה הבגד" value="${es(Q)}"><div class="r185"></div></section>`;
 h+=`<section class="s185"><h3>🗺 המקומות בבית <small>${L.length}</small></h3>${L.length?`<ul class="m185">${L.map(p=>{const k=n[p]||0;const o=OPEN[p];return `<li><div class="m185r"><button type="button" class="m185n" data-sc185map="${es(p)}" aria-expanded="${!!o}"><b>${es(p)}</b><small>${k} פריטים</small></button><button type="button" data-sc185fill="${es(p)}">+ פריטים</button><button type="button" data-sc185del="${es(p)}" aria-label="למחוק את המקום">🗑</button></div>${o?(k?grid(Object.keys(D).filter(id=>live(id)&&it(id).place==p)):'<p class="e185">עוד ריק. "+ פריטים" כדי לסמן מה יש כאן.</p>'):''}</li>`}).join('')}</ul>`:'<p class="e185">כותבים פעם אחת את החדרים והארונות, ומאז בוחרים בלחיצה.</p>'}
  <form class="w185n"><input placeholder="מקום חדש: חדר שינה › ארון לבן › מדף 2" aria-label="מקום חדש" autocomplete="off"><button type="submit">+ להוסיף</button></form>
  ${L.length?'':`<div class="k185">${['חדר שינה › ארון','חדר שינה › מגירות','ארון כניסה','מחסן › ארגזים','חדר ילדים › ארון'].map(x=>`<button type="button" data-sc185sug="${es(x)}">+ ${es(x)}</button>`).join('')}</div>`}
  <p class="i185">${none} פריטים עוד בלי מקום.${L.length?' "+ פריטים" ליד מקום, ומסמנים מה יש בו, מדף אחרי מדף.':''}</p></section>`;
 Object.keys(OPEN).forEach(p=>{if(OPEN[p])thl(Object.keys(D).filter(id=>it(id).place==p))});return h}
// fill a place: tap the items that live there (filtered by category), then save
let FILL=null;
function fillView(){const p=FILL.p;const cats=[...new Set(Object.keys(D).filter(live).map(cat))];const c=FILL.c||'';
 const ids=Object.keys(D).filter(id=>live(id)&&(!c||cat(id)==c)&&(FILL.all||!it(id).place||it(id).place==p));
 let CN={};$a('section[id] > h2').forEach(h=>{const t=h.firstChild&&h.firstChild.textContent.trim();if(t)CN[h.parentElement.id]=t});
 const h=`<div class="f185h"><b>📍 ${es(p)}</b><small>מסמנים מה יש כאן · ${FILL.sel.size} מסומנים</small></div>
  <div class="k185">${['',...cats].map(k=>`<button type="button" data-sc185fc="${k}" aria-pressed="${k==c}">${k?es(CN[k]||k):'הכל'}</button>`).join('')}<label class="f185a"><input type="checkbox" data-sc185fa ${FILL.all?'checked':''}> גם מה שכבר יש לו מקום</label></div>
  <div class="g185 f185g">${ids.slice(0,240).map(id=>`<button type="button" class="c185i" data-sc185t="${es(id)}" aria-pressed="${FILL.sel.has(id)}"><img alt="" loading="lazy" data-th="${es(id)}" src="${ph(id)}"><span>${es(nm(id))}</span></button>`).join('')}</div>
  ${ids.length>240?`<p class="i185">מראה 240 מתוך ${ids.length}. בוחרים קטגוריה כדי לצמצם.</p>`:''}
  <div class="f185f"><button type="button" class="pri" data-sc185fsave>✓ לשמור (${FILL.sel.size})</button><button type="button" data-sc185fx>ביטול</button></div>`;
 thl(ids.slice(0,240));return h}
function render(){if(!W||!W.open)return;const n=counts();const b=W.querySelector('.w185b');const y=b.scrollTop;
 $a('.w185t button',W).forEach(x=>{x.setAttribute('aria-selected',x.dataset.t==TAB);const k=x.querySelector('b');if(k){const v=x.dataset.t=='now'?(n['עליי']||0)+(n['נקי']||0):x.dataset.t=='wash'?(n['כביסה']||0):0;k.textContent=v||'';k.hidden=!v}});
 b.innerHTML=FILL?fillView():TAB=='now'?tabNow():TAB=='wash'?tabWash():tabWhere();b.scrollTop=y;if(Q)search()}
function refresh(){badges();render();homeBtn();const d=$1('#dlg');if(d&&d.open){const r=$1('#dlbody .sc185d');if(r)itemRow(r.dataset.id)}}
function open(tab){if(tab)TAB=tab;FILL=null;Q='';if(!W){W=document.createElement('dialog');W.id='sc185';W.dir='rtl';W.setAttribute('aria-labelledby','sc185t');document.body.appendChild(W);
  W.innerHTML=`<div class="w185h"><h3 id="sc185t">🧺 הארון החכם<small>איפה כל דבר, מה עליי ומה בכביסה</small></h3><button type="button" class="x185" aria-label="סגירה">✕</button></div>
   <div class="w185t" role="tablist"><button type="button" role="tab" data-t="now">👗 עכשיו <b hidden></b></button><button type="button" role="tab" data-t="wash">🧺 סל כביסה <b hidden></b></button><button type="button" role="tab" data-t="where">🗺 איפה הכל</button></div><div class="w185b"></div>`}
 if(!W.open)W.showModal();render();W.querySelector('.w185b').scrollTop=0}
// the search inside (איפה / להוסיף לסל)
function search(){const inp=W&&W.querySelector('.q185');const box=W&&W.querySelector('.r185');if(!inp||!box)return;const ws=norm(Q).split(' ').filter(Boolean);
 if(!ws.length){box.innerHTML='';return}
 let CN={};$a('section[id] > h2').forEach(h=>{const t=h.firstChild&&h.firstChild.textContent.trim();if(t)CN[h.parentElement.id]=t});
 const ids=Object.keys(D).filter(id=>{if(!live(id))return false;const x=D[id];const h=' '+norm([x.short,x.full,x.color,fam(id),CN[cat(id)],it(id).place,SI[stOf(id)]&&SI[stOf(id)][2]].filter(Boolean).join(' '))+' ';return ws.every(w=>h.includes(w))}).slice(0,24);
 const wash=inp.dataset.q185=='wash';
 box.innerHTML=ids.length?`<ul class="l185">${ids.map(id=>`<li><button type="button" class="l185i" data-sc185open="${es(id)}"><img alt="" data-th="${es(id)}" src="${ph(id)}"><span><b>${es(nm(id))}</b><small>${es(where(id)||'עוד בלי מקום')}</small></span></button>${wash?(stOf(id)=='כביסה'?'<em>בסל</em>':`<button type="button" data-sc185to="כביסה" data-id="${es(id)}">🧺 לסל</button>`):(it(id).place?'':`<button type="button" data-sc185pick="${es(id)}">📍</button>`)}</li>`).join('')}</ul>`:`<p class="e185">לא מצאתי "${es(Q)}"</p>`;thl(ids)}
document.addEventListener('input',e=>{const t=e.target;if(!t.classList||!t.classList.contains('q185'))return;Q=t.value;search()});

// ---------- clicks ----------
let DEL='';
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('button,[data-sc185open]');if(!t)return;const d=t.dataset;
 try{
 if(t.id=='sc185b'||d.sc185go!=null){e.preventDefault();e.stopPropagation();document.querySelectorAll('dialog[open]').forEach(x=>{if(x.id!='sc185')try{x.close()}catch(_){}});return open(d.sc185go||null)}
 if(t.closest('#sc185p')){if(t.classList.contains('x185'))return P.close();if(d.p185!=null){await setMany(PFOR,{place:d.p185},d.p185?'📍 '+short(d.p185):'המקום נמחק');P.close()}return}
 if(d.sc185pick!=null){e.preventDefault();return pick([d.sc185pick])}
 if(d.sc185st!=null){const r=t.closest('.sc185d');if(!r)return;const id=r.dataset.id;const s=d.sc185st;await toState([id],s==stOf(id)?'':s,s?SI[s][1]+' '+SI[s][2]:'🏠 במקום');return}
 if(d.sc185care!=null){const r=t.closest('.sc185d');if(!r)return;const id=r.dataset.id;let c=(it(id).care||[]).slice();const k=d.sc185care;c=c.includes(k)?c.filter(x=>x!=k):[...c,k];
  if(k.startsWith('מכונה'))c=c.filter(x=>x==k||!x.startsWith('מכונה'));await setMany([id],{care:c});const det=$1('#dlbody .sdc');if(det)det.open=true;return}
 if(!W||!t.closest('#sc185'))return;
 if(t.classList.contains('x185'))return W.close();
 if(d.t){TAB=d.t;FILL=null;Q='';return render()}
 if(d.sc185open!=null){W.close();return openItem(d.sc185open)}
 if(d.sc185to!=null)return toState([d.id],d.sc185to,d.sc185to?SI[d.sc185to][1]+' '+SI[d.sc185to][2]:'↩ חזר למקום');
 if(d.sc185all){const on=by('עליי');if(d.sc185all=='wash'){const w=on.filter(washable),o=on.filter(x=>!washable(x));await toState(w,'כביסה');await toState(o,'',`🧺 ${w.length} לכביסה${o.length?` · ${o.length} חזרו למקום`:''}`)}
  else if(d.sc185all=='home')await toState(on,'','↩ הכל חזר למקום');else await toState(by('נקי'),'','↩ הכל חזר למקום');return}
 if(d.sc185done){const ids=by('כביסה').filter(id=>basketOf(id)==d.sc185done);return toState(ids,'נקי',`✓ ${ids.length} כובסו, מחכים לקיפול`)}
 if(d.sc185map!=null){OPEN[d.sc185map]=!OPEN[d.sc185map];return render()}
 if(d.sc185sug){await addPlace(d.sc185sug);return render()}
 if(d.sc185del!=null){const p=d.sc185del;if(DEL!=p){DEL=p;t.textContent='בטוח?';setTimeout(()=>{if(DEL==p){DEL='';render()}},2500);return}DEL='';
  const ids=Object.keys(D).filter(id=>it(id).place==p);SET.places=places().filter(x=>x!=p);await saveSet();if(ids.length)await setMany(ids,{place:''});toast_('המקום נמחק');return render()}
 if(d.sc185fill!=null){FILL={p:d.sc185fill,sel:new Set(Object.keys(D).filter(id=>it(id).place==d.sc185fill)),c:'',all:false};return render()}
 if(d.sc185fc!=null){FILL.c=d.sc185fc;return render()}
 if(d.sc185t){const id=d.sc185t;FILL.sel.has(id)?FILL.sel.delete(id):FILL.sel.add(id);t.setAttribute('aria-pressed',FILL.sel.has(id));const s=W.querySelector('.f185h small');if(s)s.textContent=`מסמנים מה יש כאן · ${FILL.sel.size} מסומנים`;const sv=W.querySelector('[data-sc185fsave]');if(sv)sv.textContent=`✓ לשמור (${FILL.sel.size})`;return}
 if(d.sc185fsave!=null){const p=FILL.p,was=Object.keys(D).filter(id=>it(id).place==p&&!FILL.sel.has(id));const add=[...FILL.sel].filter(id=>it(id).place!=p);FILL=null;OPEN[p]=true;
  if(was.length)await setMany(was,{place:''});await setMany(add,{place:p},`📍 ${add.length} פריטים ב${short(p)}`);return render()}
 if(d.sc185fx!=null){FILL=null;return render()}
 }catch(err){ERR('click',err)}});
document.addEventListener('change',e=>{if(e.target.matches&&e.target.matches('[data-sc185fa]')&&FILL){FILL.all=e.target.checked;render()}});

// ---------- entry points: a home button, the admin panel, the search, the closet filter ----------
function homeBtn(){try{const cta=$1('.h9cta')||$1('.h9hero');if(!cta)return;let e=$1('#sc185b');
 if(!e){e=document.createElement('button');e.id='sc185b';e.type='button';const r=$1('#ret152b')||$1('#ord123b');r?r.after(e):cta.appendChild(e)}
 const n=counts();const bits=[n['עליי']?`👗 ${n['עליי']} עליי`:'',n['כביסה']?`🧺 ${n['כביסה']} בכביסה`:'',n['נקי']?`✨ ${n['נקי']} לקפל`:''].filter(Boolean);
 const h=`<span>🧺</span><span><b>הארון החכם</b><small>${bits.join(' · ')||'איפה כל דבר, כביסה'}</small></span>`;if(e.innerHTML!=h)e.innerHTML=h}catch(err){ERR('home',err)}}
setInterval(homeBtn,2000);
try{const T=window.TOOLS172;if(T&&T[0]&&!T[0][1].some(x=>x[1]&&String(x[1]).includes('הארון החכם')))T[0][1].splice(1,0,['🧺','הארון החכם: איפה כל דבר, כביסה',()=>{document.querySelectorAll('dialog[open]').forEach(x=>{try{x.close()}catch(_){}});open()}])}catch(e){ERR('tools',e)}
// the closet's מיקום filter knows the new states
try{const f=$1('#locf');if(f){[['עליי','עליי'],['נקי','נקי, לקפל'],['הושאל','הושאל']].forEach(([v,t])=>{if(![...f.options].some(o=>o.value==v)){const o=document.createElement('option');o.value=v;o.textContent=t;f.appendChild(o)}})}}catch(_){}
{const a0=apply;window.apply=apply=function(){const r=a0.apply(this,arguments);badges();return r}}
badges();setTimeout(badges,3000);setTimeout(homeBtn,1500);
window.SC185={open,where,stOf,pick,places};
})();
