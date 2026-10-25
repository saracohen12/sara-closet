/* ===== hub2: alerts, try-on, kids, AI stylist ===== */
TABS.splice(1,0,['tryon','🪞 מודדת עליי']);TABS.push(['kids','👧 ילדים']);
const SLOTPOS={scarf:[50,9,34],jewelry:[50,22,18],top:[50,32,44],dress:[50,45,58],set:[50,45,58],outer:[50,36,52],skirt:[50,62,46],belt:[50,42,30],shoes:[50,92,30],bag:[78,50,24],kid:[18,75,22],extra:[50,50,30]};
const slotOf=id=>({dresses:'dress',skirts:'skirt',tops:'top',sets:'set',sweaters:'top',outer:'outer',scarves:'scarf',belts:'belt',shoes:'shoes',jewelry:'jewelry',bags:'bag',girls:'kid',boys:'kid'})[curCat(id)]||'extra';
Object.keys(SLOTN).forEach(k=>SLOTN[k+'2']=SLOTN[k]);
let TRY={layers:[],sel:-1,look:null};const CUT={};
function meURL(){return SET.me?'/_blob/'+SET.me:(window._meLocal||'')}
const CM=%%CUTMETA%%,CPACK={},AVR=399/1365;
const tryMode=()=>SET.trymode=='photo'&&meURL()?'photo':'av';
async function getCut(id){const m=CM[id];if(!m)return null;const cat=m[3];if(!CPACK[cat])CPACK[cat]=fetch('cut/'+cat+'.json').then(r=>r.json()).catch(()=>({}));const p=await CPACK[cat];return p[id]?{src:p[id],w:m[0],h:m[1],mode:m[2]}:null}
function dims(src){return new Promise(r=>{const i=new Image();i.onload=()=>r([i.width,i.height]);i.onerror=()=>r([1,1]);i.src=src})}
function avPos(slot,iw,ih,mode){const k=(ih/iw)*AVR;const tb=(T,B)=>{let w=(B-T)/k;if(w>1.15)w=1.15;return {x:50,y:(T+(w*k)/2)*100,w:w*100}};
 const at=(x,y,w)=>({x:x*100,y:y*100,w:w*100});const top=(T,w)=>({x:50,y:(T+w*k/2)*100,w:w*100});const bot=(B,w)=>({x:50,y:(B-w*k/2)*100,w:w*100});
 switch(slot){case 'dress':case 'set':return mode=='full'&&ih/iw>1.9?tb(0,.99):tb(.18,.92);
  case 'skirt':return tb(.355,.92);case 'top':return tb(.18,.5);case 'outer':return tb(.175,.62);
  case 'belt':return at(.5,.37,.62);case 'shoes':return bot(.995,.42);case 'jewelry':return at(.5,.215,.3);
  case 'scarf':return top(-.02,.9);case 'bag':return at(.86,.52,.5);case 'kid':return at(.16,.8,.4);default:return at(.5,.5,.5)}}
async function mkLayer(id,z){const slot=slotOf(id);const own=(IT[id]||{}).img;const c=own?null:await getCut(id);let src,iw,ih;
 if(own){src='/_blob/'+own;[iw,ih]=await dims(src)}else if(c){src=c.src;iw=c.w;ih=c.h}else{src=await cutBg(await imgA(id));[iw,ih]=await dims(src)}
 let pos;if(tryMode()=='av')pos=avPos(slot,iw,ih,c&&c.mode);else{const [x,y,w]=SLOTPOS[slot]||SLOTPOS.extra;pos={x,y,w}}
 return Object.assign({id,r:0,z,cut:1,tol:38,src,ai:!!c},pos)}
async function layerSrc(o){if((IT[o.id]||{}).img)return '/_blob/'+IT[o.id].img;if(!o.cut)return await imgA(o.id);if(o.ai){const c=await getCut(o.id);if(c)return c.src}return cutBg(await imgA(o.id),o.tol||38)}
// remove plain background: flood fill from the edges
function cutBg(src,tol=38){if(CUT[src+tol])return Promise.resolve(CUT[src+tol]);return new Promise(r=>{const im=new Image();im.onload=()=>{const W=im.width,H=im.height,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');x.drawImage(im,0,0);
 let d;try{d=x.getImageData(0,0,W,H)}catch(_){r(src);return}const p=d.data,seen=new Uint8Array(W*H),st=[];
 const ref=[[0,0],[W-1,0],[0,H-1],[W-1,H-1]].map(([a,b])=>{const i=(b*W+a)*4;return [p[i],p[i+1],p[i+2]]});
 const near=i=>ref.some(c=>Math.abs(p[i]-c[0])+Math.abs(p[i+1]-c[1])+Math.abs(p[i+2]-c[2])<tol*3);
 for(let a=0;a<W;a++){st.push(a,0,a,H-1)}for(let b=0;b<H;b++){st.push(0,b,W-1,b)}
 while(st.length){const b=st.pop(),a=st.pop();if(a<0||b<0||a>=W||b>=H)continue;const k=b*W+a;if(seen[k])continue;seen[k]=1;if(!near(k*4))continue;p[k*4+3]=0;st.push(a+1,b,a-1,b,a,b+1,a,b-1)}
 x.putImageData(d,0,0);const u=cv.toDataURL('image/png');CUT[src+tol]=u;r(u)};im.onerror=()=>r(src);im.src=src})}
function tryHTML(){const me=meURL();const looks=Object.values(LOOKS);
 return `${(()=>{window._av=tryMode()=='av';return ''})()}<p>בוחרים לוק או מוסיפים פריטים, ואני מלבישה אותם על האווטאר שלך. כל פריט אפשר לגרור, להגדיל ולסובב.</p>
 <div class="hrow"><button data-tm="av" aria-pressed="${_av}">👤 האווטאר שלי</button><button data-tm="photo" aria-pressed="${!_av}">📷 תמונה אחרת</button>${_av?`<button id="thair" aria-pressed="${!SET.nohair}">💇 שיער מעל הבגד</button>`:`<button class="go" id="meup">📷 ${me?'החליפי תמונה':'העלי תמונה'}</button>`}<input type="file" id="mefile" accept="image/*" hidden></div>
 <div class="hrow">
 <select id="tlook"><option value="">טעני לוק…</option>${GEN.map((L,i)=>`<option value="g${i}">לוק ${i+1} מההרכבה האחרונה</option>`).join('')}${looks.map(l=>`<option value="${l.id}">${esc(l.name)}</option>`).join('')}</select>
 <button id="tadd">+ הוסיפי פריט</button><button id="tclear">נקי</button></div>
<div id="tpick" class="hide"><div class="hrow">${[["dresses","שמלות"],["skirts","חצאיות"],["tops","חולצות"],["sweaters","סוודרים"],["outer","ז׳קטים"],["scarves","כיסויי ראש"],["belts","חגורות"],["shoes","נעליים"],["jewelry","תכשיטים"],["bags","תיקים"]].map(([k,n])=>`<button data-tpc="${k}">${n}</button>`).join("")}</div><input id="tq" type="search" placeholder="חיפוש פריט: שמלה שחורה, חגורה…" style="width:100%"><div class="strip" id="tpres"></div></div>
 <div class="stage${_av?' av':''}" id="stage">${_av?`<img class="me" src="av/avatar.webp" alt=""><img class="head" src="av/avatar_head.webp" alt=""${SET.nohair?' hidden':''}>`:me?`<img class="me" src="${me}" alt="">`:'<div class="noimg2">עוד אין תמונה.<br>לחצי "העלי תמונה".</div>'}<div id="layers"></div></div>
 <div id="tctl" class="tctl"></div>
 <div class="hrow"><button class="go" id="tsave">💾 שמרי כתמונה</button>${TRY.look&&LOOKS[TRY.look]?`<button id="tkeep">♥ שמרי את ההלבשה בלוק</button>`:''}<button id="tai">✨ מה דעתך? (חוות דעת מ-Claude)</button></div><div id="taires" class="aires"></div>
`}
function drawLayers(){const box=$('#layers');if(!box)return;box.innerHTML=TRY.layers.map((L,i)=>`<img class="lay${i==TRY.sel?' sel':''}" data-li="${i}" src="${L.src}" style="left:${L.x}%;top:${L.y}%;width:${L.w}%;transform:translate(-50%,-50%) rotate(${L.r||0}deg);z-index:${L.z};clip-path:inset(${(L.c||[0,0,0,0]).map(v=>v+'%').join(' ')})" draggable="false" alt="">`).join('');ctlHTML()}
function ctlHTML(){const c=$('#tctl');if(!c)return;const L=TRY.layers[TRY.sel];if(!L){c.innerHTML=TRY.layers.length?'<p class="m" style="padding:0">לחצי על פריט כדי להזיז או לשנות אותו.</p>':'';return}
 c.innerHTML=`<b>${esc(D[L.id].short.slice(0,30))}</b><label>גודל<input type="range" id="tw" min="5" max="110" value="${L.w}"></label><label>סיבוב<input type="range" id="tr" min="-45" max="45" value="${L.r||0}"></label>
 <details><summary>✂ חיתוך שוליים (כשהרקע לא נעלם)</summary>${['למעלה','ימין','למטה','שמאל'].map((n,k)=>`<label>${n}<input type="range" class="tcrop" data-k="${k}" min="0" max="45" value="${(L.c||[0,0,0,0])[k]}"></label>`).join('')}</details><div class="hrow"><button id="tbg" aria-pressed="${!!L.cut}">✂ ${L.cut?'החזירי רקע':'העלימי רקע'}</button>${L.cut?`<label>עוצמה<input type="range" id="ttol" min="10" max="90" value="${L.tol||38}"></label>`:''}<button id="tup">⬆ קדימה</button><button id="tdn">⬇ אחורה</button><button id="tauto">↺ למקום</button><button id="tdel">🗑 הסירי</button></div>`}
async function loadTryLook(L,lookId){TRY={layers:[],sel:-1,look:lookId||null};const saved=lookId&&LOOKS[lookId]&&LOOKS[lookId].tryon;
 if(saved&&(saved.mode||'av')==tryMode()){for(const s of saved.layers||saved){const o=Object.assign({},s);o.src=await layerSrc(o);if(o.src)TRY.layers.push(o)}}
 else{let z=1;const order=['bag','skirt','dress','set','top','vest','outer','belt','shoes','jewelry','scarf','kid','extra'];const ks=Object.keys(L).sort((a,b)=>order.indexOf(a.replace(/2$/,''))-order.indexOf(b.replace(/2$/,'')));
  for(const slot of ks){const id=L[slot];if(!id||!img(id))continue;TRY.layers.push(await mkLayer(id,z++))}}
 drawLayers()}
async function addTry(id){const z=TRY.layers.length?Math.max(...TRY.layers.map(x=>x.z))+1:1;TRY.layers.push(await mkLayer(id,z));TRY.sel=TRY.layers.length-1;drawLayers();toast('נוסף. אפשר לגרור ולהתאים')}
async function stageBlob(maxW=900){const st=$('#stage');const R=st.getBoundingClientRect();const k=maxW/R.width;const cv=document.createElement('canvas');cv.width=maxW;cv.height=R.height*k;const x=cv.getContext('2d');x.fillStyle='#f6efe6';x.fillRect(0,0,cv.width,cv.height);
 const ld=s=>new Promise(r=>{const im=new Image();im.onload=()=>r(im);im.onerror=()=>r(null);im.src=s});
 const me=st.querySelector('img.me');if(me){const im=await ld(me.src);if(im){const s=Math.min(cv.width/im.width,cv.height/im.height);x.drawImage(im,(cv.width-im.width*s)/2,(cv.height-im.height*s)/2,im.width*s,im.height*s)}}
 const hd=st.querySelector('img.head');const hdi=hd&&!hd.hidden?await ld(hd.src):null;
 for(const L of [...TRY.layers].sort((a,b)=>a.z-b.z)){const im=await ld(L.src);if(!im)continue;const w=L.w/100*cv.width,h=w*im.height/im.width;x.save();x.translate(L.x/100*cv.width,L.y/100*cv.height);x.rotate((L.r||0)*Math.PI/180);const c=L.c||[0,0,0,0];x.beginPath();x.rect(-w/2+w*c[3]/100,-h/2+h*c[0]/100,w*(1-(c[1]+c[3])/100),h*(1-(c[0]+c[2])/100));x.clip();x.drawImage(im,-w/2,-h/2,w,h);x.restore()}
 if(hdi)x.drawImage(hdi,0,0,cv.width,cv.width*hdi.height/hdi.width);
 return new Promise(r=>cv.toBlob(r,'image/jpeg',.88))}
// drag
let DRAG=null;
document.addEventListener('pointerdown',e=>{const l=e.target.closest('.lay');if(!l)return;e.preventDefault();const i=+l.dataset.li;TRY.sel=i;$$('.lay').forEach(z=>z.classList.toggle('sel',z==l));ctlHTML();const R=$('#stage').getBoundingClientRect();DRAG={i,R,sx:e.clientX,sy:e.clientY,ox:TRY.layers[i].x,oy:TRY.layers[i].y,el:l};l.setPointerCapture(e.pointerId)});
document.addEventListener('pointermove',e=>{if(!DRAG)return;const L=TRY.layers[DRAG.i];L.x=DRAG.ox+(e.clientX-DRAG.sx)/DRAG.R.width*100;L.y=DRAG.oy+(e.clientY-DRAG.sy)/DRAG.R.height*100;DRAG.el.style.left=L.x+'%';DRAG.el.style.top=L.y+'%'});
document.addEventListener('pointerup',()=>{DRAG=null});
document.addEventListener('input',async e=>{const L=TRY.layers[TRY.sel];if(!L)return;const t=e.target;
 if(t.classList.contains('tcrop')){L.c=L.c||[0,0,0,0];L.c[+t.dataset.k]=+t.value;const el=$(`.lay[data-li="${TRY.sel}"]`);if(el)el.style.clipPath=`inset(${L.c.map(v=>v+'%').join(' ')})`}
 if(t.id=='tw'){L.w=+t.value;const el=$(`.lay[data-li="${TRY.sel}"]`);if(el)el.style.width=L.w+'%'}
 if(t.id=='tr'){L.r=+t.value;const el=$(`.lay[data-li="${TRY.sel}"]`);if(el)el.style.transform=`translate(-50%,-50%) rotate(${L.r}deg)`}});
document.addEventListener('change',async e=>{const t=e.target;const L=TRY.layers[TRY.sel];
 if(t.id=='ttol'&&L){L.tol=+t.value;L.src=await cutBg(await imgA(L.id),L.tol);drawLayers()}
 if(t.id=='tlook'&&t.value){const v=t.value;if(v[0]=='g')await loadTryLook(GEN[+v.slice(1)],null);else await loadTryLook(LOOKS[v].items,v);renderTryBtns();t.value=''}
 if(t.id=='mefile'&&t.files[0]){const f=t.files[0];window._meLocal=URL.createObjectURL(f);try{const a=await claude.use('assets');if(a){const r=await a.upload(f);SET.me=r.id;if(DB)await saveDoc('settings','main',SET);else{try{localStorage.setItem('hub_settings',JSON.stringify(SET))}catch(_){}}}else toast('התמונה תישאר רק עד שתסגרי את הדף')}catch(_){toast('התמונה תישאר רק עד שתסגרי את הדף')}
  SET.trymode='photo';saveSet();const ids=TRY.layers.map(l=>l.id);TRY.layers=[];$('#hbody').innerHTML=tryHTML();let z=1;for(const id of ids)TRY.layers.push(await mkLayer(id,z++));drawLayers();t.value=''}});
function renderTryBtns(){const b=$('#hbody');if(TAB!='tryon')return;const keep=TRY;b.innerHTML=tryHTML();TRY=keep;drawLayers()}
document.addEventListener('click',async e=>{const t=e.target;
 if(t.closest('#meup')){$('#mefile').click();return}
 if(t.closest('#tadd')){$('#tpick').classList.toggle('hide');$('#tq').focus();tpSearch('');return}
 const tp=t.closest('[data-tp]');if(tp){await addTry(tp.dataset.tp);return}
 if(t.closest('#tclear')){TRY={layers:[],sel:-1,look:null};renderTryBtns();return}
 const L=TRY.layers[TRY.sel];
 if(t.closest('#tbg')&&L){L.cut=!L.cut;L.src=await layerSrc(L);drawLayers();return}
 const tm=t.closest('[data-tm]');if(tm){if(tm.dataset.tm=='photo'&&!meURL()){SET.trymode='photo';$('#mefile').click();return}SET.trymode=tm.dataset.tm;saveSet();const ids=TRY.layers.map(l=>l.id);TRY.layers=[];let z=1;for(const id of ids)TRY.layers.push(await mkLayer(id,z++));renderTryBtns();return}
 if(t.closest('#tbody')){SET.body=SET.body=='real'?'doll':'real';saveSet();renderTryBtns();return}
 if(t.closest('#thair')){SET.nohair=!SET.nohair;saveSet();const h=$('#stage img.head');if(h)h.hidden=!!SET.nohair;t.closest('#thair').setAttribute('aria-pressed',!SET.nohair);return}
 if(t.closest('#tauto')&&L){const n=await mkLayer(L.id,L.z);Object.assign(L,{x:n.x,y:n.y,w:n.w,r:0});drawLayers();return}
 if(t.closest('#tup')&&L){L.z=Math.max(...TRY.layers.map(x=>x.z))+1;drawLayers();return}
 if(t.closest('#tdn')&&L){L.z=Math.min(...TRY.layers.map(x=>x.z))-1;drawLayers();return}
 if(t.closest('#tdel')&&L){TRY.layers.splice(TRY.sel,1);TRY.sel=-1;drawLayers();return}
 if(t.closest('#stage')&&!t.closest('.lay')){TRY.sel=-1;drawLayers();return}
 if(t.closest('#tsave')){const b=await stageBlob();try{const dl=await claude.use('downloads');if(!dl){toast('שמירה לא זמינה כאן');return}await dl.save({filename:'הלוק עליי.jpg',data:b});toast('נשמר')}catch(err){toast(err.code=='declined'?'בוטל':'לא הצלחתי לשמור')}return}
 if(t.closest('#tkeep')&&TRY.look){LOOKS[TRY.look].tryon={mode:tryMode(),layers:TRY.layers.map(({src,...o})=>o)};await saveDoc('looks',TRY.look,LOOKS[TRY.look]);if(!DB){try{localStorage.setItem('hub_looks',JSON.stringify(LOOKS))}catch(_){}}toast('ההלבשה נשמרה בלוק');return}
 if(t.closest('#tai')){aiOpinion();return}
 if(t.closest('#aigen')){aiLooks();return}
 if(t.closest('#bell')){openAlerts();return}
 if(t.closest('[data-tryl]')){const i=t.closest('[data-tryl]').dataset.tryl;TAB='tryon';renderHub();if(LOOKS[i])await loadTryLook(LOOKS[i].items,i);else await loadTryLook(GEN[+i],null);renderTryBtns();return}
 if(t.closest('#kidadd')){const n=$('#kidn').value.trim();if(!n)return;SET.kids=SET.kids||[];SET.kids.push({n,z:$('#kidz').value.trim()});await saveSet();renderHub();return}
 const kd=t.closest('[data-kdel]');if(kd){SET.kids.splice(+kd.dataset.kdel,1);await saveSet();renderHub();return}
},true);
document.addEventListener('input',e=>{if(e.target.id=='tq')tpSearch(e.target.value)});
let TPC='';document.addEventListener('click',e=>{const b=e.target.closest('[data-tpc]');if(!b)return;TPC=TPC==b.dataset.tpc?'':b.dataset.tpc;$$('[data-tpc]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.tpc==TPC));tpSearch($('#tq').value)},true);
function tpSearch(q){const w=q.trim().toLowerCase().split(/\s+/).filter(Boolean);const r=Object.keys(D).filter(id=>(IT[id]||{}).s!='ret'&&(img(id)||(D[id]||{}).hi)&&(!TPC||curCat(id)==TPC)&&w.every(x=>(card(id)?.dataset.q||'').toLowerCase().includes(x))).slice(0,80);
 $('#tpres').innerHTML=r.map(id=>`<button class="mini" data-tp="${id}"><img src="${img(id)||TPH}" data-th="${id}" alt=""><span>${m(D[id].paid)}</span></button>`).join('')||'<p>לא נמצא</p>'}
async function saveSet(){if(DB)await saveDoc('settings','main',SET);else{try{localStorage.setItem('hub_settings',JSON.stringify(SET))}catch(_){}}}
// ===== Claude: stylist opinion + AI looks =====
async function aiOpinion(){const out=$('#taires');let sample;try{sample=await claude.use('sample')}catch(_){}if(!sample){out.textContent='האפשרות הזו לא זמינה כאן.';return}
 out.textContent='חושבת…';const items=TRY.layers.map(L=>`- ${D[L.id].short} (${D[L.id].color||''})`).join('\n');
 try{const lim=await sample.limits();const imgs=lim&&lim.images?[await stageBlob(700)]:undefined;
  const {text}=await sample(`את סטייליסטית לאישה דתייה צנועה. ${imgs?'בתמונה יש הדמיה גסה (קולאז׳) של לוק':'זה לוק'} שמורכב מהפריטים האלה:\n${items}\n\nכתבי בעברית, קצר וחם (עד 6 שורות): האם הצבעים והפריטים הולכים יחד, מה הייתי מחליפה או מוסיפה (רק מסוג פריט: חגורה, כיסוי ראש, נעליים וכו׳), ולאיזה אירוע זה מתאים. אל תתייחסי לאיכות ההדמיה עצמה.`,{images:imgs,onText:({text})=>{out.textContent=text}});out.textContent=text}
 catch(e){out.textContent=e.code=='not_granted'?'לא אושר שימוש ב-Claude.':e.code=='rate_limited'?'יותר מדי בקשות, נסי שוב בעוד דקה.':(e.text||'לא הצלחתי לקבל תשובה.')}}
async function aiLooks(){const out=$('#aires');let sample;try{sample=await claude.use('sample')}catch(_){}if(!sample){out.textContent='האפשרות הזו לא זמינה כאן.';return}
 const o=hubOpts();const cats=['dresses','skirts','tops','sweaters','sets','outer','scarves','belts','shoes','jewelry','bags'];
 const list=Object.keys(D).filter(id=>cats.includes(curCat(id))&&usable(id,o)&&(['scarves','belts','shoes','jewelry','bags'].includes(curCat(id))||(fitsOcc(id,o.occ)&&fitsSeason(id,o.sea)))).map(id=>`${id}|${(CATS.find(c=>c[0]==curCat(id))||[0,''])[1]}|${D[id].color||''}|${D[id].short.slice(0,40)}`).join('\n');
 const wish=($('#aiwish').value||'').trim();out.textContent='Claude מרכיבה לוקים… (יכול לקחת עד דקה)';
 try{const r=await sample.json(`את סטייליסטית לאישה דתייה צנועה. הנה הארון שלה (מזהה|סוג|צבע|שם):\n${list}\n\nהרכיבי 3 לוקים ל${OCC[o.occ]}${o.sea?' בעונת '+o.sea:''}.${wish?' בקשה שלה: '+wish:''}\nכל לוק: שמלה, או חצאית + חולצה (חובה), ועוד כיסוי ראש, נעליים, ולפי הצורך חגורה, תכשיט, תיק, ז׳קט. השתמשי רק במזהים מהרשימה. התאמת צבעים חשובה.\nהחזירי JSON בלבד: [{"name":"שם קצר","why":"משפט אחד למה זה עובד","items":["מזהה",...]}]`,{modelTier:'default'});
  const arr=(Array.isArray(r)?r:r.looks||[]).slice(0,3);GENO=o;GEN=arr.map(l=>{const L={};(l.items||[]).filter(id=>D[id]).forEach(id=>{let s=slotOf(id);if(L[s])s=s+'2';L[s]=id});return L});
  $('#hlooks').innerHTML=GEN.map((L,i)=>`<p style="margin:14px 0 0"><b>${esc(arr[i].name||'')}</b> · ${esc(arr[i].why||'')}</p>`+lookHTML(L,i)).join('');out.textContent=''}
 catch(e){out.textContent=e.code=='not_granted'?'לא אושר שימוש ב-Claude.':e.code=='rate_limited'?'יותר מדי בקשות, נסי שוב בעוד דקה.':'לא הצלחתי, נסי שוב.'}}
// ===== kids =====
function kidsTab(){const ks=SET.kids||[];const z2n=z=>{const mm=String(z).match(/(\d+)/);return mm?+mm[1]:null};
 return `<p>רשמי את הילדים והמידה הנוכחית של כל אחד. בחלון של בגד ילדים בוחרים למי הוא שייך, ואני אסמן בגדים שכבר קטנים.</p>
 <div class="hrow"><input id="kidn" placeholder="שם" class="num" style="width:110px"><input id="kidz" placeholder="מידה (למשל 6 או 6Y)" class="num" style="width:150px"><button class="go" id="kidadd">הוסיפי</button></div>
 ${ks.map((k,i)=>{const its=Object.keys(D).filter(id=>(IT[id]||{}).kid==k.n);const kz=z2n(k.z);const small=its.filter(id=>{const z=z2n(card(id)?.dataset.z||D[id].size||'');return kz&&z&&z<kz});
  return `<h3>${esc(k.n)} · מידה ${esc(k.z||'?')} <button data-kdel="${i}">✕</button></h3>${its.length?`<div class="strip">${its.map(id=>`<button class="mini" data-open="${id}">${img(id)||(D[id]||{}).hi?`<img data-th="${id}" src="${img(id)||TPH}" alt="">`:''}<span>${small.includes(id)?'⚠ קטן':esc(card(id)?.dataset.z||'')}</span></button>`).join('')}</div>`:'<p class="m" style="padding:0">עוד לא שויכו בגדים.</p>'}${small.length?`<p style="color:#c62828">${small.length} בגדים כבר קטנים מהמידה הנוכחית.</p>`:''}`}).join('')}`}
// ===== alerts (bell) =====
function getAlerts(){const A=[];const add=(lvl,txt,ids)=>A.push({lvl,txt,ids:ids||[]});
 const live=id=>(IT[id]||{}).s!='ret'&&(IT[id]||{}).s!='kept';
 const soon=Object.keys(D).filter(id=>{const n=daysLeft(D[id].rdl);return n!=null&&n>=0&&n<=14&&live(id)});
 const dsoon=soon.filter(id=>card(id)?.dataset.dup);if(dsoon.length)add(3,`${dsoon.length} פריטים כפולים שאפשר להחזיר תוך שבועיים. כדאי להחליט עכשיו.`,dsoon);
 const vs=soon.filter(id=>daysLeft(D[id].rdl)<=7&&!dsoon.includes(id));if(vs.length)add(3,`${vs.length} פריטים שנשארו פחות משבוע להחזיר. לא סימנת אם להשאיר.`,vs);
 const s2=soon.filter(id=>!dsoon.includes(id)&&!vs.includes(id));if(s2.length)add(2,`${s2.length} פריטים שאפשר להחזיר רק עוד 8–14 ימים.`,s2);
 const ret=Object.keys(D).filter(id=>(IT[id]||{}).s=='ret'&&!(IT[id]||{}).refunded);if(ret.length)add(2,`החזרת ${ret.length} פריטים, ועדיין לא סימנת שהכסף חזר (${money2(ret.reduce((s,id)=>s+D[id].paid,0))}).`,ret);
 Object.values(CREDITS).forEach(c=>{const n=c.exp?daysLeft(c.exp):null;if(n!=null&&n>=0&&n<=14)add(n<=7?3:2,`קרדיט של ${money2(+c.amt)} ב${c.store} פג בעוד ${n} ימים.`)});
 const ords=[...new Set(Object.keys(D).filter(id=>D[id].transit&&!(ORD[D[id].order]||{}).arrived).map(id=>D[id].order))];if(ords.length)add(1,`${ords.length} הזמנות עוד בדרך. כשהן מגיעות, לוחצים "ההזמנה הגיעה".`,Object.keys(D).filter(id=>ords.includes(D[id].order)).slice(0,30));
 const fix=Object.keys(D).filter(id=>(IT[id]||{}).fix);if(fix.length)add(1,`${fix.length} בגדים מחכים לתופרת.`,fix);
 const td=new Date().getDay();const tl=LOOKS[(PLAN.days||{})[td]];if(tl)add(1,`הלוק של היום (${DAYS[td]}): ${tl.name}`,Object.values(tl.items));
 const unm=Object.keys(D).filter(id=>!(IT[id]||{}).s).length;if(unm)add(0,`עוד ${unm} פריטים לא סימנת אם השארת. "⚡ סימון מהיר" בסינון עושה את זה מהר.`);
 return A.sort((a,b)=>b.lvl-a.lvl)}
function paintBell(){const b=$('#bell');if(!b)return;const n=getAlerts().filter(a=>a.lvl>=2).length;b.querySelector('i').textContent=n||'';b.classList.toggle('hot',n>0)}
function openAlerts(){const A=getAlerts();$('#albody').innerHTML=A.length?A.map(a=>`<div class="al l${a.lvl}"><p>${a.lvl>=3?'🔴 ':a.lvl==2?'🟠 ':'• '}${esc(a.txt)}</p>${a.ids.length?`<div class="strip">${a.ids.slice(0,30).map(id=>`<button class="mini" data-open="${id}">${img(id)||(D[id]||{}).hi?`<img data-th="${id}" src="${img(id)||TPH}" alt="">`:''}<span>${D[id].rdl&&daysLeft(D[id].rdl)>=0?(daysLeft(D[id].rdl)==0?'⚠ היום אחרון':daysLeft(D[id].rdl)==1?'⚠ מחר אחרון':'עוד '+daysLeft(D[id].rdl)+' ימים'):m(D[id].paid)}</span></button>`).join('')}</div>`:''}</div>`).join(''):'<p>אין כרגע שום דבר דחוף. 🙂</p>';$('#alerts').showModal()}
const _aa=afterApply;afterApply=function(){_aa();paintBell()};
setInterval(paintBell,60000);
// hub tab render additions
const _rh=renderHub;renderHub=function(){if(!$('#hub')||!$('#hub').open){paintBell();return}
 if(TAB=='tryon'){$('#htabs').innerHTML=TABS.map(([k,l])=>`<button data-tab="${k}" aria-pressed="${TAB==k}">${l}</button>`).join('');if(!$('#stage'))$('#hbody').innerHTML=tryHTML();drawLayers();return}
 if(TAB=='kids'){$('#htabs').innerHTML=TABS.map(([k,l])=>`<button data-tab="${k}" aria-pressed="${TAB==k}">${l}</button>`).join('');$('#hbody').innerHTML=kidsTab();return}
 _rh();
 if(TAB=='looks'&&!$('#aiwish')){$('#hgen').insertAdjacentHTML('afterend',`<details class="aibox"><summary>✨ או: ש-Claude תרכיב לוקים</summary><input id="aiwish" placeholder="בקשה (לא חובה): משהו בכחול, לחתונה של אחותי…" style="width:100%;margin:6px 0"><button class="go" id="aigen">הרכיבי עם Claude</button><div id="aires" class="aires"></div></details>`)}
 $$('#hbody .look').forEach(l=>{const i=l.dataset.i;const lb=l.querySelector('.lb');if(lb&&!lb.querySelector('[data-tryl]'))lb.insertAdjacentHTML('afterbegin',`<button data-tryl="${i}">🪞 עליי</button>`)})};
const _rg=runGen;runGen=function(a){_rg(a);$$('#hlooks .look').forEach(l=>{const lb=l.querySelector('.lb');if(lb&&!lb.querySelector('[data-tryl]'))lb.insertAdjacentHTML('afterbegin',`<button data-tryl="${l.dataset.i}">🪞 עליי</button>`)})};
// mark whole look as worn
document.addEventListener('click',async e=>{const w=e.target.closest('[data-lwore]');if(!w)return;const l=LOOKS[w.dataset.lwore];for(const id of Object.values(l.items))await putItem(id,{wear:((IT[id]||{}).wear||0)+1});toast('סומן: לבשת את כל הלוק היום');renderHub()},true);
const _lh=lookHTML;lookHTML=function(L,idx,saved){let h=_lh(L,idx,saved);if(saved)h=h.replace('<div class="lb">',`<div class="lb"><button data-lwore="${saved.id}">✓ לבשתי היום</button>`);return h};
paintBell();
