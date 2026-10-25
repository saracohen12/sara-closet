// ===== v74: "כל התנוחות" – every pose drawn with its own placement, and editable right there =====
// Before v74 the front/back boxes reused the placement of the pose open in the studio (tf.x/y/w belong to tf.pvv),
// so after visiting "צד" the front and back shirt came out narrow and short.
{
// placement of one garment in pose v: the live tf when that pose is the open one, else tf.pv[v], else the GPT default
function pvOf(tf,g,v){const f=(tf.pvv||'front')==v&&tf.x!=null?tf:((tf.pv||{})[v]||(g&&g.fit&&g.fit[v]));return f?{x:f.x,y:f.y,w:f.w,r:f.r||0}:null}
// writes a placement back where the studio reads it for pose v
function pvSet(tf,v,f){if((tf.pvv||'front')==v){tf.x=f.x;tf.y=f.y;tf.w=f.w;tf.r=f.r||0}else{tf.pv=tf.pv||{};tf.pv[v]={x:f.x,y:f.y,w:f.w,r:f.r||0}}}
async function stateFor(v){const S=Object.assign({},ST,{view:v,tf:{}});
 for(const [slot,t0] of Object.entries(ST.tf||{})){const id=ST.items[slot];const tf=Object.assign({},t0);S.tf[slot]=tf;if(!id||slot=='jewelry')continue;
  const g=window.p5gOfT?p5gOfT(id,t0):null;if(!g||!g[v])continue;const f=pvOf(t0,g,v);if(!f)continue;Object.assign(tf,f,{pvv:v});
  // a pose she never opened: fit it to the body the same way the studio does on the first visit, and keep the result
  const seen=(t0.pvv||'front')==v||(t0.pv||{})[v]||(t0.pvman||{})[v];
  if(!seen&&(ST.avbase||'long')=='p5'&&window.smartFit){try{if(await smartFit(slot,true,{id,tf,v,g}))pvSet(t0,v,tf)}catch(_){}}}
 return S}
let PE={v:null,slot:null};
const editable=v=>Object.entries(ST.items).filter(([s,id])=>id&&s!='jewelry'&&ST.tf[s]&&window.p5gOfT&&(p5gOfT(id,ST.tf[s])||{})[v]).map(([s])=>s);
async function drawPose(fig){const v=fig.dataset.pose;fig.querySelector('.mst').innerHTML=await stageInner(await stateFor(v),{})}
function paintBar(){const bar=$('#p5all .p5ed');if(!bar)return;const v=PE.v;const sl=v?editable(v):[];if(!v||!sl.length){bar.innerHTML=v?'<small>בתנוחה הזו אין בגד עם תמונת אווטאר לעריכה.</small>':'<small>לחצי על תנוחה כדי לתקן אותה כאן.</small>';return}
 if(!sl.includes(PE.slot))PE.slot=sl[0];const nm=s=>(SLOTS.find(x=>x[0]==s)||[0,s])[1];const pn=(POSES.find(p=>p[0]==v)||[0,v])[1];
 bar.innerHTML=`<b>✏️ ${pn}:</b>${sl.map(s=>`<button data-pes="${s}" aria-pressed="${s==PE.slot}">${esc(nm(s))}</button>`).join('')}<span class="sep"></span>`+
  `<button data-pe="w" data-d="-1" title="קטן יותר">➖</button><button data-pe="w" data-d="1" title="גדול יותר">➕</button><button data-pe="y" data-d="-1" title="למעלה">⬆</button><button data-pe="y" data-d="1" title="למטה">⬇</button><button data-pe="x" data-d="1" title="ימינה">➡</button><button data-pe="x" data-d="-1" title="שמאלה">⬅</button><button data-pe="r" data-d="-1" title="סיבוב">↺</button><button data-pe="r" data-d="1" title="סיבוב">↻</button><button data-pe="auto" title="התאמה אוטומטית לגוף">✨ אוטומטי</button><button data-pe="open" title="פתיחה בבניית הלוק">פתיחה בבניית הלוק</button>`}
window.p5ShowAll=p5ShowAll=async function(){if(!ST)return;const row=$('#p5all .p5row');row.innerHTML='';PE.v=null;
 for(const [k,n] of POSES)row.insertAdjacentHTML('beforeend',`<figure class="p5f" data-pose="${k}"><div class="mst"></div><figcaption>${n}</figcaption></figure>`);
 for(const f of row.querySelectorAll('.p5f'))await drawPose(f);
 const bt=$('#p5all .p5bt');if(bt&&!$('#p5all .p5ed'))bt.insertAdjacentHTML('beforebegin','<div class="p5ed"></div>');
 const sm=$('#p5all .p5bt small');if(sm)sm.textContent='לחיצה על תנוחה בוחרת אותה, ואז אפשר לתקן את הבגד ישר כאן: גודל, גובה, צד וסיבוב. התיקון נשמר לתנוחה הזו בלבד.';
 paintBar();$('#p5all').showModal();const on=row.querySelector(`.p5f[data-pose="${ST.view||'front'}"]`);if(on)on.scrollIntoView({inline:'center',block:'nearest'})};
// tap on a pose = choose it for editing (p5.js calls this instead of jumping to the studio)
window.p5PoseTap=function(fig){PE.v=fig.dataset.pose;$$('#p5all .p5f').forEach(f=>f.classList.toggle('on',f==fig));paintBar()};
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#p5all [data-pe],#p5all [data-pes]');if(!b||!ST||!PE.v)return;e.preventDefault();e.stopPropagation();
 if(b.dataset.pes){PE.slot=b.dataset.pes;paintBar();return}
 const v=PE.v,slot=PE.slot,id=ST.items[slot],tf=ST.tf[slot];if(!id||!tf)return;const g=p5gOfT(id,tf);const k=b.dataset.pe,d=+b.dataset.d||0;
 if(k=='open'){$('#p5all').close();ST.view=v;SSEL=slot;paintTop();await drawStudio();SSEL=slot;try{paintSel()}catch(_){}return}
 pushH();
 if(k=='auto'){if(tf.pvman)delete tf.pvman[v];const f=Object.assign({},tf,(g.fit||{})[v]||{},{pvv:v});try{await smartFit(slot,true,{id,tf:f,v,g})}catch(_){}pvSet(tf,v,f)}
 else{const f=pvOf(tf,g,v);if(!f)return;
  if(k=='w'){const n=Math.max(15,Math.min(160,f.w*(d>0?1.04:1/1.04)));f.w=Math.round(n*10)/10}
  else if(k=='y')f.y=Math.round((f.y+d*.6)*10)/10;else if(k=='x')f.x=Math.round((f.x+d*.6)*10)/10;else if(k=='r')f.r=Math.max(-30,Math.min(30,(f.r||0)+d*2));
  pvSet(tf,v,f);tf.pvman=tf.pvman||{};tf.pvman[v]=1}
 const fig=$(`#p5all .p5f[data-pose="${v}"]`);if(fig)await drawPose(fig);
 if((ST.view||'front')==v){const keep=SSEL;await drawStudio();SSEL=keep}},true);
document.head.insertAdjacentHTML('beforeend',`<style>
#p5all .p5f .mst{pointer-events:none}
#p5all .p5ed{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:4px 14px 0;min-height:40px}
#p5all .p5ed b{font-weight:700;margin-inline-end:4px}#p5all .p5ed small{color:var(--muted)}
#p5all .p5ed button{font:inherit;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:10px;padding:7px 11px;cursor:pointer;min-width:40px}
#p5all .p5ed button[aria-pressed=true]{background:var(--fg);color:var(--bg);border-color:var(--fg)}
#p5all .p5ed .sep{width:1px;height:26px;background:var(--line);margin:0 4px}
dialog#p5all[open]{max-height:100dvh;overflow-y:auto}
</style>`);
}
// ===== v74: base shirt ("גופיית בסיס") – a layer under the top/dress, in any colour =====
// Sara marks closet tops that have her avatar pictures as base shirts. The colour is changed at display time only
// (a tinted copy in memory, like the collar cut) – her uploaded picture is never replaced.
{
const BASEK='base';
try{SLOTS.splice(SLOTS.findIndex(s=>s[0]=='top')+1,0,[BASEK,'גופיית בסיס','👕',['tops','sweaters']]);SLOTZ[BASEK]=9;
 for(const a of [P5G_SLOTS,AF_TOP,VARSL,NECKS,NKSLOTS,typeof FITB_SLOTS!='undefined'?FITB_SLOTS:[]])if(a&&!a.includes(BASEK))a.push(BASEK)}catch(e){(window.ERRS=window.ERRS||[]).push('base74:'+e.message)}
const isBase=id=>!!(IT[id]||{}).base;
const BASEHINT=/בסיס|גופי|גופיה|basic/i;
// the drawer of this slot lists only base shirts; with none yet it offers the closet tops that look like one
{const _di=drawerItems;drawerItems=function(slot){const ids=_di(slot);return slot==BASEK?ids.filter(isBase):ids}}
{const _fd=fillDrawer;fillDrawer=async function(){const r=await _fd.apply(this,arguments);try{if(DRAWER!=BASEK)return r;const g=$('#dgrid');if(!g)return r;
 const cand=Object.keys(D).filter(id=>['tops','sweaters'].includes(curCat(id))&&!isBase(id)&&(BASEHINT.test(D[id].short||'')||BASEHINT.test(D[id].name||'')));
 g.insertAdjacentHTML('beforeend',`<div class="base74"><p><b>להוסיף גופיית בסיס:</b> פותחים חולצה מהארון שיש לה תמונת אווטאר ולוחצים "👕 גופיית בסיס". ${cand.length?'נראה שאלה גופיות בסיס:':''}</p>${cand.map(id=>`<button data-base74="${id}">${esc((D[id].short||'').slice(0,26))}${avReady(id)?' 🟢':' · אין תמונת אווטאר'}</button>`).join('')}</div>`)}catch(_){}return r}}
// toggle in the item window (next to the 5-pose avatar box)
{const _ao=afterOpen;afterOpen=function(id){_ao(id);try{if(!['tops','sweaters'].includes(curCat(id)))return;const box=$('#dlbody .p5gbox')||$('#dlbody h3');if(!box||$('#dlbody [data-base74]'))return;
 box.insertAdjacentHTML('afterend',`<p class="base74i"><button data-base74="${id}" aria-pressed="${isBase(id)}">👕 גופיית בסיס${isBase(id)?' ✓':''}</button> <small>${isBase(id)?'מופיעה במשבצת "גופיית בסיס" בבניית הלוק':'לסמן אם לובשים אותה מתחת לבגדים עם פתח'}</small></p>`)}catch(_){}}}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-base74]');if(!b)return;e.preventDefault();e.stopPropagation();const id=b.dataset.base74;const on=!isBase(id);
 await putItem(id,{base:on?1:''});if(b.closest('#dlbody')){b.setAttribute('aria-pressed',on);b.textContent='👕 גופיית בסיס'+(on?' ✓':'');const s=b.parentElement.querySelector('small');if(s)s.textContent=on?'מופיעה במשבצת "גופיית בסיס" בבניית הלוק':'לסמן אם לובשים אותה מתחת לבגדים עם פתח'}
 if(DRAWER==BASEK)fillDrawer();toast(on?'👕 נוספה לגופיות הבסיס':'הוסרה מגופיות הבסיס')},true);
// colour: tf.tint (hex). Shading of her picture is kept: each pixel = colour × its brightness relative to the bright parts of the shirt
const TINTC={};
async function tintUrl(src,hex){const k=src+'|'+hex;if(TINTC[k])return TINTC[k];const im=await ldImg(src);if(!im||!im.naturalWidth)return src;
 const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0);let d;try{d=x.getImageData(0,0,c.width,c.height)}catch(_){return src}const a=d.data;
 const hist=new Uint32Array(256);let n=0;for(let i=0;i<a.length;i+=4)if(a[i+3]>128){hist[Math.round(.299*a[i]+.587*a[i+1]+.114*a[i+2])]++;n++}
 let ref=255,acc=0;for(let l=255;l>=0;l--){acc+=hist[l];if(acc>=n*.08){ref=Math.max(l,40);break}}
 const R=parseInt(hex.slice(1,3),16),G=parseInt(hex.slice(3,5),16),B=parseInt(hex.slice(5,7),16);
 for(let i=0;i<a.length;i+=4){if(!a[i+3])continue;const l=Math.min(1.12,(.299*a[i]+.587*a[i+1]+.114*a[i+2])/ref);const s=.25+.75*l;a[i]=Math.min(255,R*s);a[i+1]=Math.min(255,G*s);a[i+2]=Math.min(255,B*s)}
 x.putImageData(d,0,0);const u=await new Promise(r=>c.toBlob(bl=>r(bl?URL.createObjectURL(bl):src),'image/png'));TINTC[k]=u;return u}
{const _si=stageInner;stageInner=async function(S,opt={}){let html=await _si(S,opt);try{const tf=(S.tf||{})[BASEK];if(!S.items[BASEK]||!tf||!tf.tint)return html;
 const tags=html.match(/<img class="sl[^>]*data-slot="base"[^>]*>/g)||[];for(const t of tags){const m=t.match(/ src="([^"]+)"/);if(!m)continue;const u=await tintUrl(m[1],tf.tint);html=html.replace(t,t.replace(m[0],` src="${u}"`))}}catch(_){}return html}}
const TINTS=[['','מקורי'],['#f6f4ef','לבן'],['#efe5cf','שמנת'],['#d9c4a6','בז׳'],['#c8a184','ניוד'],['#a7a6a3','אפור'],['#1d1c1c','שחור'],['#1f2c4d','כחול כהה'],['#a9c3df','תכלת'],['#6b4a33','חום'],['#5c6137','זית'],['#6d1f2c','בורדו'],['#e3b4bf','ורוד']];
{const _ps=paintSel;paintSel=function(){_ps();try{const c=$('#ssel');if(!c||!ST||SSEL!=BASEK||!ST.items[BASEK])return;const tf=ST.tf[BASEK]||{};const cur=tf.tint||'';
 const at=c.querySelector(':scope>b')||null;(at||c).insertAdjacentHTML(at?'afterend':'afterbegin',`<div class="tint74"><span>צבע:</span>${TINTS.map(([h,n])=>`<button data-tint="${h}" title="${n}" aria-label="${n}" aria-pressed="${cur==h}" >${h?`<i style="background:${h}"></i>`:'מקורי'}</button>`).join('')}<label title="צבע אחר"><input type="color" data-tintc value="${cur||'#d9c4a6'}"> אחר</label></div>`)}catch(_){}}}
const setTint=async h=>{if(!ST||!ST.tf[BASEK])return;pushH();ST.tf[BASEK].tint=h||undefined;if(!h)delete ST.tf[BASEK].tint;const keep=SSEL;await drawStudio();SSEL=keep;paintSel()};
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#ssel [data-tint]');if(!b)return;e.preventDefault();e.stopPropagation();setTint(b.dataset.tint)},true);
document.addEventListener('change',e=>{if(e.target.matches&&e.target.matches('#ssel [data-tintc]'))setTint(e.target.value)},true);
document.head.insertAdjacentHTML('beforeend',`<style>
.tint74{display:flex;flex:none;flex-wrap:nowrap;gap:5px;align-items:center;padding:2px 6px;border-inline:1px solid var(--line)}
.tint74 button{width:30px;height:30px;min-height:30px;border-radius:50%;border:1px solid var(--line);padding:0;cursor:pointer;font-size:.62rem;box-shadow:inset 0 0 0 2px var(--bg)}
.tint74 button i{display:block;width:100%;height:100%;border-radius:50%;pointer-events:none}
.tint74 button[aria-pressed=true]{outline:2px solid var(--fg);outline-offset:1px}
.tint74 button[data-tint=""]{width:auto;border-radius:99px;padding:0 10px;background:var(--card)}
.tint74 label{display:inline-flex;align-items:center;gap:4px;font-size:.8rem}.tint74 input[type=color]{width:30px;height:30px;border:0;padding:0;background:none}
.base74{grid-column:1/-1;padding:8px;display:flex;flex-wrap:wrap;gap:6px}.base74 p{margin:0 0 4px;flex-basis:100%;font-size:.85rem}
.base74 button,.base74i button{font:inherit;font-size:.82rem;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:99px;padding:6px 12px;cursor:pointer}
.base74i button[aria-pressed=true]{background:var(--fg);color:var(--bg)}
</style>`);
}
// drawer tiles of colour variants (packs) showed the raw GPT picture with its "קדמי" label – show the cleaned one, like the item window
{const _fd=fillDrawer;fillDrawer=async function(){const r=await _fd.apply(this,arguments);try{for(const im of document.querySelectorAll('#dgrid .var9 img')){const u=im.getAttribute('src')||'';if(im.dataset.cl||!/\/_blob\/|blob:/.test(u))continue;im.dataset.cl=1;cleanP5(u).then(c=>{if(c&&c.url&&c.url!=u)im.src=c.url}).catch(()=>0)}}catch(_){}return r}}
// ===== v74: eraser – rub out a bit of a garment where it sticks out (e.g. by the hands), per pose =====
// Strokes are kept in the look (tf.er[view] = groups of [u,v,r] in picture coordinates) and applied at display time only.
{
const ER={on:false,size:2,drag:null};const SIZES=[.035,.06,.1];
const ERC={};
async function eraseUrl(src,groups){const k=src+'|'+JSON.stringify(groups);if(ERC[k])return ERC[k];const im=await ldImg(src);if(!im||!im.naturalWidth)return src;
 const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d');x.drawImage(im,0,0);x.globalCompositeOperation='destination-out';x.lineCap='round';x.lineJoin='round';
 for(const g of groups){if(!g.length)continue;x.lineWidth=g[0][2]*2*c.width;x.beginPath();x.moveTo(g[0][0]*c.width,g[0][1]*c.height);if(g.length==1)x.lineTo(g[0][0]*c.width+.1,g[0][1]*c.height);for(const p of g.slice(1))x.lineTo(p[0]*c.width,p[1]*c.height);x.stroke()}
 const u=await new Promise(r=>c.toBlob(bl=>r(bl?URL.createObjectURL(bl):src),'image/png'));ERC[k]=u;return u}
const strokesOf=(tf,v)=>((tf&&tf.er)||{})[v]||[];
{const _si=stageInner;stageInner=async function(S,opt={}){let html=await _si(S,opt);try{const v=S.view||'front';
 for(const [slot,tf] of Object.entries(S.tf||{})){if(slot=='jewelry'||!S.items[slot])continue;const gs=strokesOf(tf,v);if(!gs.length)continue;
  const re=new RegExp(`<img class="sl[^>]*data-slot="${slot}"[^>]*>`);const t=(html.match(re)||[])[0];if(!t)continue;const m=t.match(/ src="([^"]+)"/);if(!m)continue;
  const u=await eraseUrl(m[1],gs);html=html.replace(t,t.replace(m[0],` src="${u}" data-er0="${m[1]}"`))}}catch(_){}return html}}
// pointer position -> picture coordinates of the layer (undoes its rotate/scale/skew and the stage zoom)
function toImg(el,px,py){const r=el.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;const st=$('#sstage');const z=(st&&st.offsetWidth)?st.getBoundingClientRect().width/st.offsetWidth:1;
 let m;try{m=new DOMMatrix(getComputedStyle(el).transform)}catch(_){m=new DOMMatrix()}const dx=(px-cx)/z,dy=(py-cy)/z;const det=(m.a*m.d-m.b*m.c)||1;
 const lx=(m.d*dx-m.c*dy)/det,ly=(-m.b*dx+m.a*dy)/det;return [lx/el.offsetWidth+.5,ly/el.offsetHeight+.5]}
const layerOf=slot=>$(`#sstage img.sl[data-slot="${slot}"]`);
let live=0;
async function paintLive(){const d=ER.drag;if(!d)return;const el=layerOf(d.slot);if(!el)return;const src0=el.dataset.er0||el.getAttribute('src');el.dataset.er0=src0;const u=await eraseUrl(src0,d.all.concat([d.g]));if(ER.drag==d||!ER.drag)el.src=u}
window.addEventListener('pointerdown',e=>{try{if(!ER.on||!ST||!SSEL||SSEL=='jewelry')return;if(!e.target.closest||!e.target.closest('#sstage'))return;const el=layerOf(SSEL);if(!el)return;
 e.preventDefault();e.stopPropagation();pushH();const tf=ST.tf[SSEL];const v=ST.view||'front';const [u,w]=toImg(el,e.clientX,e.clientY);const r=SIZES[ER.size-1]||.06;
 ER.drag={slot:SSEL,v,g:[[+u.toFixed(3),+w.toFixed(3),r]],all:strokesOf(tf,v).slice(),r};paintLive()}catch(_){}},true);
window.addEventListener('pointermove',e=>{const d=ER.drag;if(!d)return;e.preventDefault();e.stopPropagation();const el=layerOf(d.slot);if(!el)return;const [u,w]=toImg(el,e.clientX,e.clientY);const l=d.g[d.g.length-1];
 if(Math.hypot(u-l[0],w-l[1])<d.r*.35||d.g.length>300)return;d.g.push([+u.toFixed(3),+w.toFixed(3),d.r]);const t=Date.now();if(t-live>90){live=t;paintLive()}},true);
window.addEventListener('pointerup',async e=>{const d=ER.drag;if(!d)return;ER.drag=null;e.preventDefault();e.stopPropagation();const tf=ST.tf[d.slot];if(!tf)return;tf.er=tf.er||{};tf.er[d.v]=d.all.concat([d.g]).slice(-40);
 const keep=SSEL;await drawStudio();SSEL=keep;paintSel()},true);
// click that follows an erase stroke must not select another layer
window.addEventListener('click',e=>{if(ER.on&&e.target.closest&&e.target.closest('#sstage')){e.stopPropagation();e.preventDefault()}},true);
{const _ps=paintSel;paintSel=function(){_ps();try{const c=$('#ssel');if(!c||!ST||!SSEL||SSEL=='jewelry'||!ST.items[SSEL])return;const n=strokesOf(ST.tf[SSEL],ST.view||'front').length;
 const at=c.querySelector(':scope>b');(at||c).insertAdjacentHTML(at?'afterend':'afterbegin',`<span class="er74"><button data-er="t" aria-pressed="${ER.on}" title="מחק: מעבירים אצבע על החלק שרוצים להעלים">🧽 מחק</button>${ER.on?`${['קטן','בינוני','גדול'].map((s,i)=>`<button data-er="s${i+1}" aria-pressed="${ER.size==i+1}">${s}</button>`).join('')}`:''}${n?`<button data-er="u" title="ביטול המחיקה האחרונה">↶ ביטול מחיקה</button><button data-er="c" title="מחזיר את כל מה שנמחק בתנוחה הזו">נקי מחיקות</button>`:''}</span>`)}catch(_){}}}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#ssel [data-er]');if(!b||!ST||!SSEL)return;e.preventDefault();e.stopPropagation();const k=b.dataset.er;const tf=ST.tf[SSEL];const v=ST.view||'front';
 if(k=='t'){ER.on=!ER.on;document.body.classList.toggle('er74on',ER.on);if(ER.on)toast('🧽 מעבירים אצבע על החלק שרוצים להעלים. לסיום לוחצים שוב על "מחק"');paintSel();return}
 if(k[0]=='s'){ER.size=+k.slice(1);paintSel();return}
 pushH();if(k=='u'&&tf.er&&tf.er[v]){tf.er[v].pop();if(!tf.er[v].length)delete tf.er[v]}if(k=='c'&&tf.er)delete tf.er[v];const keep=SSEL;await drawStudio();SSEL=keep;paintSel()},true);
document.head.insertAdjacentHTML('beforeend',`<style>
.er74{display:inline-flex;flex:none;gap:5px;align-items:center;padding:0 6px;border-inline:1px solid var(--line)}
.er74 button[aria-pressed=true]{background:var(--fg)!important;color:var(--bg)!important}
body.er74on #sstage{cursor:crosshair;touch-action:none}
</style>`);
}
