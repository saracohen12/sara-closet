/* ===== studio: personal look builder ===== */
const TH_DONE={};const SLOTS=[['dress','שמלה','👗',['dresses']],['top','חולצה / סוודר','👚',['tops','sweaters']],['skirt','חצאית','🩱',['skirts']],['set','סט','🎽',['sets']],['outer','ז׳קט','🧥',['outer']],
 ['scarf','כיסוי ראש','🧕',['scarves']],['shoes','נעליים','👠',['shoes']],['belt','חגורה','➰',['belts']],['jewelry','תכשיטים','📿',['jewelry']],['bag','תיק','👜',['bags']],['hosiery','גרביונים','🧦',['hosiery']],['hairacc','אביזר שיער','🎀',['hair']]];
const SLOTZ={hosiery:6,hairacc:61,shoes:5,skirt:10,dress:20,set:20,top:30,outer:40,belt:45,jewelry:50,head:52,scarf:60,bag:70};
const BASEC={orig:['כמו בתמונה',null],white:['לבן',[246,245,241]],black:['שחור',[38,38,42]],skin:['גוון עור',[224,192,168]],beige:['בז׳',[214,196,170]],gray:['אפור',[150,150,154]],navy:['נייבי',[42,54,96]],brown:['חום',[112,80,58]],rose:['ורוד עתיק',[206,162,160]],olive:['ירוק זית',[112,116,72]],bordo:['בורדו',[112,34,48]]};
const BGS={studio:['סטודיו','radial-gradient(ellipse at 50% 35%,#ffffff 0%,#ece7e1 60%,#d9d2ca 100%)',['#fbfaf8','#d9d2ca']],white:['לבן','#ffffff',['#fff','#fff']],cream:['שמנת','linear-gradient(#fbf6ee,#efe4d3)',['#fbf6ee','#efe4d3']],
 blush:['ורוד אבקה','linear-gradient(#fbecea,#efd3cf)',['#fbecea','#efd3cf']],sky:['תכלת','linear-gradient(#eef6fb,#cfe2ee)',['#eef6fb','#cfe2ee']],
 room:['סלון','linear-gradient(#f3ede4 0 72%,#b99b7c 72% 73%,#cdb294 73% 100%)',['#f3ede4','#cdb294']],
 bricks:['קיר לבנים','repeating-linear-gradient(0deg,#e9e2da 0 2px,transparent 2px 26px),repeating-linear-gradient(90deg,#e9e2da 0 2px,transparent 2px 52px),linear-gradient(#c98f74,#b97c62)',['#c98f74','#b07a62']],
 garden:['גינה','linear-gradient(#e3f0f7 0 55%,#a9c98f 55% 100%)',['#e3f0f7','#a9c98f']],sunset:['שקיעה','linear-gradient(#fcd7b6,#f3a7a0 55%,#a77fa8)',['#fcd7b6','#a77fa8']],
 event:['אולם אירועים','radial-gradient(circle at 20% 20%,#ffe9b366 0 6%,transparent 7%),radial-gradient(circle at 80% 30%,#ffe9b355 0 5%,transparent 6%),radial-gradient(circle at 60% 12%,#ffffff44 0 4%,transparent 5%),linear-gradient(#3b2b3f,#1d1520)',['#3b2b3f','#1d1520']],
 marble:['שיש','linear-gradient(115deg,#f4f2ef 0 40%,#e6e2dc 41%,#f4f2ef 43% 70%,#e9e5df 71%,#f4f2ef 73%)',['#f4f2ef','#e6e2dc']],
 shabbat:['שולחן שבת','linear-gradient(#efe6d6 0 70%,#fff 70% 72%,#e9dfcd 72%)',['#efe6d6','#e9dfcd']]};
let ST=null,HIST=[],FUT=[],SSEL=null,DRAWER=null,DRF={occ:'',fam:'',q:'',sort:'av',fav:false,ready:false};
function newST(){return {avbase:SET.avbase||'long',items:{},tf:{},base:{top:'orig',skirt:'orig'},bg:SET.bg||'studio',head:'hair',view:'front',id:null,name:'',date:new Date().toISOString().slice(0,10),occ:'day',rating:0,notes:''}}
const snap=()=>JSON.stringify({items:ST.items,tf:ST.tf,base:ST.base,head:ST.head,avbase:ST.avbase});
function pushH(){HIST.push(snap());if(HIST.length>60)HIST.shift();FUT=[]}
// ---- base recolor
let BASEIMG=null,MASKS=null;const BCACHE={};
function ldImg(s){return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=s})}
async function baseURL(top,sk){const k=top+'|'+sk;if(k=='orig|orig')return 'av/avatar.webp';if(BCACHE[k])return BCACHE[k];
 if(!BASEIMG){const [a,t,s]=await Promise.all([ldImg('av/avatar.webp'),ldImg('av/mask_top.png'),ldImg('av/mask_skirt.png')]);if(!a||!t||!s)return 'av/avatar.webp';BASEIMG=a;MASKS=[t,s]}
 const W=BASEIMG.width,H=BASEIMG.height,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');x.drawImage(BASEIMG,0,0);const P=x.getImageData(0,0,W,H);
 const mk=im=>{const c=document.createElement('canvas');c.width=W;c.height=H;const y=c.getContext('2d');y.drawImage(im,0,0,W,H);return y.getImageData(0,0,W,H).data};
 const M=[mk(MASKS[0]),mk(MASKS[1])];const p=P.data;
 [[top,M[0]],[sk,M[1]]].forEach(([c,m])=>{const col=BASEC[c]&&BASEC[c][1];if(!col)return;let s=0,n=0;for(let i=0;i<p.length;i+=4)if(m[i]>128){s+=.3*p[i]+.59*p[i+1]+.11*p[i+2];n++}const med=s/Math.max(n,1);
  for(let i=0;i<p.length;i+=4){const a=m[i]/255;if(!a)continue;const l=.3*p[i]+.59*p[i+1]+.11*p[i+2];const sh=Math.min(1.25,l/med);for(let k=0;k<3;k++)p[i+k]=p[i+k]*(1-a)+Math.min(255,col[k]*sh)*a}});
 x.putImageData(P,0,0);BCACHE[k]=cv.toDataURL('image/webp',.9);return BCACHE[k]}
// ---- layer sources
const SRCC={};
async function srcOf(slot,id,tf){if((IT[id]||{}).img)return '/_blob/'+IT[id].img;if(tf&&tf.raw)return await imgA(id);const c=await getCut(id);if(c)return c.src;return cutBg(await imgA(id))}
async function autoTf(slot,id){const s=await srcOf(slot,id);const [iw,ih]=await dims(s);const c=CM[id];const p=avPos(slot,iw,ih,c&&c[2]);return {x:p.x,y:p.y,w:p.w,r:0}}
// ---- render
async function stageInner(S,opt={}){const back=S.view=='back';const lays=[];
 for(const [slot,id] of Object.entries(S.items)){if(!id||!D[id])continue;const tf=S.tf[slot]||{};if(tf.hidden&&!opt.edit)continue;if(back&&slot=='jewelry')continue;
  const src=await srcOf(slot,id,tf);const z=(tf.z!=null?tf.z:SLOTZ[slot]);
  lays.push(`<img class="sl${opt.edit&&SSEL==slot?' sel':''}${tf.hidden?' ghost':''}" data-slot="${slot}" src="${src}" style="left:${tf.x}%;top:${tf.y}%;width:${tf.w}%;z-index:${z};transform:${tfStr(tf,(tf.flip?!(back&&!hasBack(id)):(back&&!hasBack(id))))}" alt="" draggable="false">`)}
 let base;if(back){base=`<img class="sb" src="${SET.back?'/_blob/'+SET.back:'av/back.webp'}" alt="">`+(SET.back?'':`<img class="sh" src="av/back_head.webp" style="z-index:${ST&&S.items.scarf?SLOTZ.head:55}" alt="">`)}
 else{const BB=BASES[S.avbase||'long'];base=`<img class="sb" src="${BB.recolor?await baseURL(S.base.top,S.base.skirt):BB.img}" alt="">`+(S.head=='hair'||S.items.scarf?`<img class="sh" src="${BB.head}" style="z-index:${SLOTZ.head}" alt="">`:'')}
 return `<div class="sbg" style="background:${(BGS[S.bg]||BGS.studio)[1]}"></div>${base}${lays.join('')}`}
async function drawStudio(){if(!ST)return;$('#sstage').innerHTML=await stageInner(ST,{edit:1});paintSlots();paintInfo();paintSel()}
function paintSlots(){$('#srail').innerHTML=SLOTS.map(([k,n,ic])=>{const id=ST.items[k];const off=k=='scarf'&&ST.head=='wig';return `<button class="slot${DRAWER==k?' on':''}${id?' has':''}" data-sslot="${k}" ${off?'disabled title="במצב פאה"':''}>${id&&img(id)?`<img src="${img(id)||TPH}" data-th="${id}" alt="">`:`<span class="ic">${ic}</span>`}<b>${n}</b>${id?`<i data-sx="${k}" title="הסירי">✕</i>`:''}</button>`}).join('')+
 (BASES[ST.avbase||'long'].recolor?`<button class="slot base" data-sbase="top"><span class="ic" style="background:${BASEC[ST.base.top][1]?'rgb('+BASEC[ST.base.top][1]+')':'#f2ead9'}"></span><b>חולצת בסיס</b></button><button class="slot base" data-sbase="skirt"><span class="ic" style="background:${BASEC[ST.base.skirt][1]?'rgb('+BASEC[ST.base.skirt][1]+')':'#e4d6c2'}"></span><b>קומבינזון / בסיס</b></button>`:'')}
function lookIds(S){return Object.values(S.items).filter(id=>id&&D[id])}
function paintInfo(){const ids=lookIds(ST);const tot=ids.reduce((s,id)=>s+(D[id].paid||0),0);const fs=[...new Set(ids.map(famOf).filter(Boolean))];
 const clash=[];for(let i=0;i<fs.length;i++)for(let j=i+1;j<fs.length;j++)if(!goes(fs[i],fs[j]))clash.push(fs[i]+' + '+fs[j]);
 const need=[];if(!ST.items.dress&&!ST.items.set&&!(ST.items.top&&ST.items.skirt)&&ids.length)need.push(ST.items.top?'חסרה חצאית':ST.items.skirt?'חסרה חולצה':'חסר בגד עיקרי');if(ids.length&&!ST.items.shoes)need.push('בלי נעליים');
 $('#sinfo').innerHTML=`<span>${ids.length} פריטים</span><span class="pal">${fs.map(f=>`<i class="dot" style="background:${FAMC[f]||'#ccc'}" title="${f}"></i>`).join('')}</span>${clash.length?`<span class="warn">⚠ ${esc(clash.join(', '))} פחות הולכים יחד</span>`:ids.length>1?'<span class="ok">✓ הצבעים מתאימים</span>':''}${need.length?`<span class="warn">${need.join(' · ')}</span>`:''}`}
const FAMC={'שחור':'#222','לבן':'#f7f7f4','חום':'#7a5236','בז׳':'#d8c3a5','כחול':'#2f4f8f','ירוק':'#4f7a4a','אדום':'#b3262e','ורוד':'#e3a1b5','סגול':'#7b4f9d','אפור':'#9a9a9a','צבעוני':'conic-gradient(red,orange,yellow,green,blue,violet,red)'};
function paintSel(){const c=$('#ssel');const slot=SSEL;const tf=slot&&ST.tf[slot];if(!tf||!ST.items[slot]){c.innerHTML=lookIds(ST).length?'<span class="hint">לחצי על בגד כדי להזיז, להגדיל או לסובב. אפשר גם לצבוט בשתי אצבעות.</span>':'<span class="hint">👇 מתחילים: לחצי למטה על 👗 שמלה או 👚 חולצה ובחרי מהארון. ✨ "השלימי לי" מרכיב לוק לבד.</span>';return}
 c.innerHTML=`<b>${SLOTS.find(s=>s[0]==slot)[1]}</b><label>גודל<input type="range" id="sw" min="5" max="400" value="${Math.round(tf.w)}"></label><label>סיבוב<input type="range" id="sr" min="-60" max="60" value="${tf.r||0}"></label><label>רוחב<input type="range" id="ssx" min="50" max="220" value="${Math.round((tf.sx||1)*100)}"></label><label>גובה<input type="range" id="ssy" min="50" max="220" value="${Math.round((tf.sy||1)*100)}"></label><label>אלכסון<input type="range" id="ssk" min="-35" max="35" value="${tf.k||0}"></label>
 <div class="sbtns"><button data-sa="up">⬆ קדימה</button><button data-sa="down">⬇ אחורה</button><button data-sa="flip">⇋ היפוך</button><button data-sa="raw" aria-pressed="${!tf.raw}">✂ ${tf.raw?'הורידי רקע':'עם רקע'}</button><button data-sa="hide" aria-pressed="${!!tf.hidden}">${tf.hidden?'👁 הציגי':'🙈 הסתירי'}</button><button data-sa="lock" aria-pressed="${!!tf.lock}">${tf.lock?'🔒 נעול':'🔓 נעילה'}</button><button data-sa="reset">↺ למקום</button>${(slot=='top'&&ST.items.skirt)||(slot=='skirt'&&ST.items.top)?`<button data-sa="tuck" class="go">${((ST.tf.top||{}).z||30)<10?'👕 חולצה בפנים ← להוציא':'👕 חולצה בחוץ ← להכניס לחצאית'}</button>`:''}<button data-sa="del">🗑 הסירי</button></div>`}
// ---- drawer
const hasPic=id=>{const x=D[id];return !!(x&&(x.hi||TH[id]||(IT[id]||{}).img))};
function drawerItems(slot){const cats=SLOTS.find(s=>s[0]==slot)[3];const cur=lookIds(ST).filter(id=>id!=ST.items[slot]);const fs=cur.map(famOf).filter(Boolean);const q=DRF.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
 let ids=Object.keys(D).filter(id=>cats.includes(curCat(id))&&(IT[id]||{}).s!='ret'&&hasPic(id));
 if(DRF.occ&&['dress','top','skirt','set','outer'].includes(slot))ids=ids.filter(id=>{const c=card(id);return c&&(DRF.occ=='day'?isDay(c):isShab(c))});
 if(DRF.fam)ids=ids.filter(id=>famOf(id)==DRF.fam);if(DRF.fav)ids=ids.filter(id=>(IT[id]||{}).fav);
 if(q.length)ids=ids.filter(id=>q.every(w=>(card(id)?.dataset.q||'').toLowerCase().includes(w)));
 const sc=id=>(goesAll(famOf(id),fs)?0:1);
 const S={match:(a,b)=>sc(a)-sc(b)||((IT[b]||{}).fav?1:0)-((IT[a]||{}).fav?1:0),new:(a,b)=>dnum(D[b].date)-dnum(D[a].date),cheap:(a,b)=>(D[a].paid||0)-(D[b].paid||0),least:(a,b)=>((IT[a]||{}).wear||0)-((IT[b]||{}).wear||0)}[DRF.sort=='av'?'match':DRF.sort];if(S)ids.sort(S);return ids}
const dnum=s=>{const [d,mo]=(s||'0/0').split('/');return +mo*40+ +d};
function openDrawer(slot){DRAWER=slot;paintSlots();const n=SLOTS.find(s=>s[0]==slot)[1];
 $('#sdrawer').innerHTML=`<div class="dh"><b>${n}</b><span><button id="drnd" title="בחירה אקראית">🎲</button> <button class="x" id="dclose">✓ סיימתי</button></span></div>
 <div class="df"><input id="dq" type="search" placeholder="חיפוש…" value="${esc(DRF.q)}"><select id="dsort"><option value="av">🟢 מוכן לאווטאר קודם</option><option value="match">מתאים בצבע ללוק</option><option value="new">חדש קודם</option><option value="cheap">זול קודם</option><option value="least">הכי פחות לבשתי</option></select>
 ${['dress','top','skirt','set','outer'].includes(slot)?`<div class="seg"><button data-docc="" aria-pressed="${!DRF.occ}">הכל</button><button data-docc="day" aria-pressed="${DRF.occ=='day'}">☀ חול</button><button data-docc="shab" aria-pressed="${DRF.occ=='shab'}">✨ שבת</button></div>`:''}<button data-dfav aria-pressed="${DRF.fav}">♥</button></div>
 <div class="dfam"><button data-dfam="" aria-pressed="${!DRF.fam}">כל הצבעים</button>${Object.keys(FAMC).map(f=>`<button data-dfam="${f}" aria-pressed="${DRF.fam==f}" title="${f}"><i class="dot" style="background:${FAMC[f]}"></i></button>`).join('')}</div>
 ${slot=='scarf'?`<div class="hrow"><button data-shead="wig">💇 היום בפאה (בלי כיסוי)</button></div>`:''}<div class="dgrid" id="dgrid"></div>`;
 $('#dsort').value=DRF.sort;$('#sdrawer').classList.add('open');fillDrawer()}
async function fillDrawer(){const slot=DRAWER;if(!slot)return;const g=$('#dgrid');const cats=SLOTS.find(s=>s[0]==slot)[3];
 if(typeof thLoad=='function'&&cats.some(c=>!TH_DONE[c])){if(g&&!g.children.length)g.innerHTML='<p class="dempty">טוענת תמונות…</p>';await Promise.all(cats.map(c=>thLoad(c).then(()=>{TH_DONE[c]=1})));if(DRAWER!=slot)return}
 const ids=drawerItems(slot);const fs=lookIds(ST).filter(id=>id!=ST.items[slot]).map(famOf).filter(Boolean);
 g.innerHTML=ids.length?ids.map(id=>`<button class="di${ST.items[slot]==id?' on':''}" data-dpick="${id}"><span class="chk"><img data-cut="${id}" src="${img(id)||TPH}" data-th="${id}" alt="" loading="lazy"></span><span class="dm">${m(D[id].paid)}${(IT[id]||{}).fav?' ♥':''}${fs.length&&goesAll(famOf(id),fs)?' <em>✓ מתאים</em>':''}</span></button>`).join(''):'<p class="dempty">לא נמצאו פריטים. נסי לשנות סינון.</p>';
}
// ---- actions
// v62: width / height / slant of a layer (tf.sx, tf.sy, tf.k) on top of size+rotation
function tfStr(tf,mir){return `translate(-50%,-50%) rotate(${tf.r||0}deg)${mir?' scaleX(-1)':''} scale(${tf.sx||1},${(tf.sy||1)*(tf.q||1)}) skewX(${tf.k||0}deg)`}
window.tfStr=tfStr;
async function setItem(slot,id){pushH();if(id){if(slot=='dress'&&ST.items.set){delete ST.items.set;delete ST.tf.set}if(slot=='set'&&ST.items.dress){delete ST.items.dress;delete ST.tf.dress}
  if(slot=='scarf')ST.head='hair';ST.items[slot]=id;ST.tf[slot]=await autoTf(slot,id);if((ST.avbase||'long')!='p5'&&['skirt','dress','set'].includes(slot)&&ST.tf[slot]&&ST.tf[slot].sx==null)ST.tf[slot].sx=1.25;SSEL=slot;try{layerOrder(slot)}catch(_){}}else{delete ST.items[slot];delete ST.tf[slot];if(SSEL==slot)SSEL=null}await drawStudio();if(DRAWER)fillDrawer()}
async function autoFill(){pushH();const o={occ:ST.occ=='shab'?'shab':ST.occ=='event'?'event':'day',sea:'',fav:false,kids:false};const cur={};
 Object.entries(ST.items).forEach(([k,v])=>{cur[k]=v});const anchor=Object.values(cur)[0]||null;const L=genLook(o,new Set(),anchor);
 for(const [k,id] of Object.entries(L)){const slot=k=='extra'||k=='kid'?null:k;if(!slot||ST.items[slot])continue;if(slot=='scarf'&&ST.head=='wig')continue;if((slot=='top'||slot=='skirt')&&(ST.items.dress||ST.items.set))continue;if(slot=='dress'&&(ST.items.top||ST.items.skirt))continue;ST.items[slot]=id;ST.tf[slot]=await autoTf(slot,id)}
 await drawStudio();toast('השלמתי את מה שחסר, בהתאמת צבעים')}
async function openStudio(look,items){ST=newST();HIST=[];FUT=[];SSEL=null;DRAWER=null;
 if(look){Object.assign(ST,{id:look.id,name:look.name||'',date:look.date||look.created||ST.date,occ:look.occ||'day',rating:look.rating||0,notes:look.notes||''});items=look.items;if(look.studio){Object.assign(ST,{tf:JSON.parse(JSON.stringify(look.studio.tf||{})),base:look.studio.base||ST.base,bg:look.studio.bg||ST.bg,head:look.studio.head||'hair',avbase:look.studio.avbase||'long'})}}
 if(items)for(const [k,id] of Object.entries(items)){const slot=k.replace(/2$/,'');if(!SLOTS.some(s=>s[0]==slot)||ST.items[slot]||!D[id])continue;ST.items[slot]=id;if(!ST.tf[slot])ST.tf[slot]=await autoTf(slot,id)}
 if($('#hub').open)$('#hub').close();if($('#dlg').open)$('#dlg').close();$('#studio').showModal();document.body.style.overflow='hidden';
 $('#sbgs').innerHTML=Object.entries(BGS).map(([k,[n,css]])=>`<button data-sbg="${k}" title="${n}" style="background:${css}" aria-pressed="${ST.bg==k}"><span>${n}</span></button>`).join('');
 paintTop();await drawStudio()}
function paintTop(){$$('[data-sview]').forEach(b=>b.setAttribute('aria-pressed',ST.view==b.dataset.sview));$('#shead').textContent=ST.head=='wig'?'💇 פאה':'🧕 עם כיסוי';$('#sname').textContent=ST.name||'לוק חדש'}
async function saveStudio(){const ids=lookIds(ST);if(!ids.length){toast('עוד אין פריטים בלוק');return}
 const auto=ids.slice(0,3).map(id=>(D[id].short||'').split(' ').slice(0,2).join(' ')).join(' + ');
 $('#ssave').innerHTML=`<h3>שמירת הלוק</h3><label>שם<input id="vn" value="${esc(ST.name||auto)}"></label><label>תאריך<input id="vd" type="date" value="${ST.date}"></label>
 <label>לאן<select id="vo">${Object.entries(OCC).map(([k,v])=>`<option value="${k}" ${ST.occ==k?'selected':''}>${v}</option>`).join('')}</select></label>
 <label>כמה אהבתי<span class="stars">${[1,2,3,4,5].map(i=>`<button data-star="${i}" aria-pressed="${ST.rating>=i}">★</button>`).join('')}</span></label>
 <label>הערות<textarea id="vno" rows="2">${esc(ST.notes)}</textarea></label><label class="ck"><input type="checkbox" id="vw"> לבשתי את זה היום (מוסיף לבישה לכל פריט)</label>
 <div class="hrow"><button class="go" id="vok">💾 שמרי</button>${ST.id?'<button id="vcopy">שמרי כלוק חדש</button>':''}<button id="vx">ביטול</button></div>`;$('#ssave').showModal()}
async function doSave(asNew){ST.name=$('#vn').value.trim()||'לוק';ST.date=$('#vd').value||ST.date;ST.occ=$('#vo').value;ST.notes=$('#vno').value.trim();
 const id=(!asNew&&ST.id)||('l'+Date.now().toString(36));const items={};Object.entries(ST.items).forEach(([k,v])=>{if(v)items[k]=v});
 LOOKS[id]={id,name:ST.name,date:ST.date,occ:ST.occ,rating:ST.rating,notes:ST.notes,items,created:(LOOKS[id]||{}).created||new Date().toISOString().slice(0,10),studio:{tf:ST.tf,base:ST.base,bg:ST.bg,head:ST.head,avbase:ST.avbase}};
 ST.id=id;if(DB)await saveDoc('looks',id,LOOKS[id]);else{try{localStorage.setItem('hub_looks',JSON.stringify(LOOKS))}catch(_){}}
 if($('#vw').checked)for(const i of Object.values(items))await putItem(i,{wear:((IT[i]||{}).wear||0)+1});
 $('#ssave').close();paintTop();toast('הלוק נשמר באלבום ♥')}
async function exportStudio(){const st=$('#sstage');const R=st.getBoundingClientRect();const W=1080,H=Math.round(W*R.height/R.width)+140;const cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');
 const [c1,c2]=(BGS[ST.bg]||BGS.studio)[2];const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,c1);g.addColorStop(1,c2);x.fillStyle=g;x.fillRect(0,0,W,H);
 const sw=W,sh=H-140;const els=[...st.querySelectorAll('img.sb,img.sh,img.sl:not(.ghost)')].sort((a,b)=>(+a.style.zIndex||0)-(+b.style.zIndex||0));
 for(const el of els){const im=await ldImg(el.src);if(!im)continue;if(el.classList.contains('sb')){const s=Math.min(sw/im.width,sh/im.height);x.drawImage(im,(sw-im.width*s)/2,(sh-im.height*s)/2,im.width*s,im.height*s);continue}
  if(el.classList.contains('sh')){x.drawImage(im,0,0,sw,sw*im.height/im.width);continue}
  const slot=el.dataset.slot,tf=ST.tf[slot];const w=tf.w/100*sw,h=w*im.height/im.width;x.save();x.translate(tf.x/100*sw,tf.y/100*sh);x.rotate((tf.r||0)*Math.PI/180);if((tf.flip?1:0)^(ST.view=='back'?1:0))x.scale(-1,1);x.scale(tf.sx||1,tf.sy||1);x.transform(1,0,Math.tan((tf.k||0)*Math.PI/180),1,0,0);x.drawImage(im,-w/2,-h/2,w,h);x.restore()}
 x.fillStyle='rgba(255,255,255,.85)';x.fillRect(0,H-140,W,140);x.fillStyle='#2d211b';x.textAlign='center';x.direction='rtl';x.font='bold 46px Heebo, sans-serif';x.fillText(ST.name||'הלוק שלי',W/2,H-80);x.font='30px Heebo, sans-serif';x.fillText((OCC[ST.occ]||'')+' · '+new Date(ST.date).toLocaleDateString('he-IL'),W/2,H-32);
 const blob=await new Promise(r=>cv.toBlob(r,'image/jpeg',.9));try{const dl=await claude.use('downloads');if(!dl){toast('שמירה לא זמינה כאן');return}await dl.save({filename:(ST.name||'לוק')+'.jpg',data:blob});toast('התמונה נשמרה')}catch(e){toast(e.code=='declined'?'בוטל':'לא הצלחתי לשמור')}}
// ---- pointer: drag + pinch
const PTR=new Map();let PG=null;
document.addEventListener('pointerdown',e=>{const l=e.target.closest('#sstage img.sl');if(!l)return;const slot=l.dataset.slot;const tf=ST.tf[slot];if(SSEL!=slot){SSEL=slot;$$('#sstage img.sl').forEach(z=>z.classList.toggle('sel',z==l));paintSel()}if(tf.lock)return;e.preventDefault();l.setPointerCapture(e.pointerId);
 PTR.set(e.pointerId,{x:e.clientX,y:e.clientY});const R=$('#sstage').getBoundingClientRect();if(PTR.size==1){pushH();PG={slot,R,sx:e.clientX,sy:e.clientY,ox:tf.x,oy:tf.y,ow:tf.w,el:l}}else if(PTR.size==2&&PG){const [a,b]=[...PTR.values()];PG.d0=Math.hypot(a.x-b.x,a.y-b.y);PG.ow=tf.w}});
document.addEventListener('pointermove',e=>{if(!PG||!PTR.has(e.pointerId))return;PTR.set(e.pointerId,{x:e.clientX,y:e.clientY});const tf=ST.tf[PG.slot];
 if(PTR.size>=2&&PG.d0){const [a,b]=[...PTR.values()];tf.w=Math.max(5,Math.min(400,PG.ow*Math.hypot(a.x-b.x,a.y-b.y)/PG.d0));PG.el.style.width=tf.w+'%'}
 else{const mx=PG.el.closest('.mirw')?-1:1;tf.x=PG.ox+mx*(e.clientX-PG.sx)/PG.R.width*100;tf.y=PG.oy+(e.clientY-PG.sy)/PG.R.height*100;PG.el.style.left=tf.x+'%';PG.el.style.top=tf.y+'%'}});
const endP=e=>{PTR.delete(e.pointerId);if(!PTR.size){if(PG)paintSel();PG=null}else if(PG)PG.d0=null};
document.addEventListener('pointerup',endP);document.addEventListener('pointercancel',endP);
document.addEventListener('wheel',e=>{if(!e.target.closest('#sstage img.sl.sel'))return;e.preventDefault();const tf=ST.tf[SSEL];tf.w=Math.max(5,Math.min(400,tf.w*(e.deltaY<0?1.05:.95)));e.target.style.width=tf.w+'%';paintSel()},{passive:false});
document.addEventListener('input',e=>{if(!ST||!SSEL)return;const tf=ST.tf[SSEL];const el=$(`#sstage img.sl[data-slot="${SSEL}"]`);if(e.target.id=='sw'){tf.w=+e.target.value;if(el)el.style.width=tf.w+'%'}if(e.target.id=='sr'||e.target.id=='ssx'||e.target.id=='ssy'||e.target.id=='ssk'){if(e.target.id=='sr')tf.r=+e.target.value;if(e.target.id=='ssx')tf.sx=+e.target.value/100;if(e.target.id=='ssy')tf.sy=+e.target.value/100;if(e.target.id=='ssk')tf.k=+e.target.value;if(el)el.style.transform=tfStr(tf,(tf.flip?ST.view!='back':ST.view=='back'))}
 if(e.target.id=='dq'){DRF.q=e.target.value;fillDrawer()}});
document.addEventListener('change',async e=>{const t=e.target;if(t.id=='dsort'){DRF.sort=t.value;fillDrawer()}if(t.id=='sw'||t.id=='sr')pushH();
 if(t.id=='backfile'&&t.files[0]){try{const a=await claude.use('assets');if(!a){toast('העלאה לא זמינה כאן');return}const r=await a.upload(t.files[0]);SET.back=r.id;await saveSet();drawStudio();toast('תמונת הגב נשמרה')}catch(_){toast('לא הצלחתי להעלות')}t.value=''}});
document.addEventListener('keydown',e=>{if(!$('#studio')?.open)return;if((e.ctrlKey||e.metaKey)&&e.key=='z'){e.preventDefault();$('#sundo').click()}if((e.key=='Delete'||e.key=='Backspace')&&SSEL&&!e.target.matches('input,textarea'))setItem(SSEL,null)});
document.addEventListener('click',async e=>{const t=e.target;if(!t.closest('#studio,#ssave,[data-studio],[data-sedit],[data-sdup],#studiobtn'))return;
 if(t.closest('#studiobtn')){openStudio();return}
 const so=t.closest('[data-studio]');if(so){const v=so.dataset.studio;if(LOOKS[v])openStudio(LOOKS[v]);else if(v[0]=='g')openStudio(null,GEN[+v.slice(1)]);else if(D[v]){const s=slotOf(v);openStudio(null,{[s]:v})}return}
 const se=t.closest('[data-sedit]');if(se){openStudio(LOOKS[se.dataset.sedit]);return}
 const sd=t.closest('[data-sdup]');if(sd){const l=JSON.parse(JSON.stringify(LOOKS[sd.dataset.sdup]));delete l.id;l.name=(l.name||'')+' (עותק)';await openStudio(l);ST.id=null;return}
 if(t.closest('#sclose')){if(window.closeStudioGuard&&closeStudioGuard('close'))return;$('#studio').close();return}
 const sx=t.closest('[data-sx]');if(sx){e.stopPropagation();setItem(sx.dataset.sx,null);return}
 const ss=t.closest('[data-sslot]');if(ss){const k=ss.dataset.sslot;if(DRAWER==k){closeDrawer()}else openDrawer(k);return}
 const sb=t.closest('[data-sbase]');if(sb){const k=sb.dataset.sbase;closeDrawer();$('#sdrawer').innerHTML=`<div class="dh"><b>${k=='top'?'חולצת בסיס (מתחת לבגד)':'קומבינזון / בסיס (מתחת לבגד שקוף)'}</b><button class="x" id="dclose">✓</button></div><div class="bcols">${Object.entries(BASEC).map(([c,[n,rgb]])=>`<button data-bcol="${k}|${c}" aria-pressed="${ST.base[k]==c}"><i style="background:${rgb?'rgb('+rgb+')':'#f2ead9'}"></i>${n}</button>`).join('')}</div>`;$('#sdrawer').classList.add('open');return}
 const bc=t.closest('[data-bcol]');if(bc){const [k,c]=bc.dataset.bcol.split('|');pushH();ST.base[k]=c;$$('[data-bcol]').forEach(b=>b.setAttribute('aria-pressed',b==bc));await drawStudio();return}
 if(t.closest('#dclose')){closeDrawer();return}
 if(t.closest('#drnd')){const ids=drawerItems(DRAWER).slice(0,Math.max(8,Math.ceil(drawerItems(DRAWER).length/3)));const id=ids[Math.floor(Math.random()*ids.length)];if(id)await setItem(DRAWER,id);return}
 const dp=t.closest('[data-dpick]');if(dp&&!t.closest('.zm')){const id=dp.dataset.dpick;await setItem(DRAWER,ST.items[DRAWER]==id?null:id);return}
 const dc=t.closest('[data-docc]');if(dc){DRF.occ=dc.dataset.docc;openDrawer(DRAWER);return}
 const df=t.closest('[data-dfam]');if(df){DRF.fam=df.dataset.dfam;openDrawer(DRAWER);return}
 if(t.closest('[data-dfav]')){DRF.fav=!DRF.fav;openDrawer(DRAWER);return}
 const sh=t.closest('[data-shead]');if(sh||t.closest('#shead')){pushH();ST.head=sh?sh.dataset.shead:(ST.head=='wig'?'hair':'wig');if(ST.head=='wig'){if(ST.items.scarf)ST._sc=[ST.items.scarf,ST.tf.scarf];delete ST.items.scarf;delete ST.tf.scarf}else if(!ST.items.scarf&&ST._sc&&D[ST._sc[0]]){ST.items.scarf=ST._sc[0];ST.tf.scarf=ST._sc[1]||await autoTf('scarf',ST._sc[0])}paintTop();closeDrawer();await drawStudio();if(ST.head!='wig'&&!ST.items.scarf){openDrawer('scarf');toast('עם כיסוי: בחרי כיסוי ראש מהארון')}return}
 const sv=t.closest('[data-sview]');if(sv){ST.view=sv.dataset.sview;SSEL=null;paintTop();await drawStudio();return}
 const bg=t.closest('[data-sbg]');if(bg){ST.bg=bg.dataset.sbg;SET.bg=ST.bg;saveSet();$$('[data-sbg]').forEach(b=>b.setAttribute('aria-pressed',b==bg));$('#sstage .sbg').style.background=BGS[ST.bg][1];return}
 if(t.closest('#sbgbtn')){$('#sbgs').classList.toggle('hide');return}
 if(t.closest('#sundo')){if(!HIST.length)return;FUT.push(snap());Object.assign(ST,JSON.parse(HIST.pop()));SSEL=null;await drawStudio();return}
 if(t.closest('#sredo')){if(!FUT.length)return;HIST.push(snap());Object.assign(ST,JSON.parse(FUT.pop()));await drawStudio();return}
 if(t.closest('#sauto')){autoFill();return}
 if(t.closest('#snew')){if(lookIds(ST).length&&!confirmNew())return;await openStudio();return}
 // v35: zoom handled in studio3.js
 if(t.closest('#ssv')){saveStudio();return}
 if(t.closest('#vok')){doSave(false);return}if(t.closest('#vcopy')){doSave(true);return}if(t.closest('#vx')){$('#ssave').close();return}
 const star=t.closest('[data-star]');if(star){ST.rating=+star.dataset.star;$$('[data-star]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.star<=ST.rating));return}
 if(t.closest('#sexp')){exportStudio();return}
 if(t.closest('#sai')){studioAI();return}
 if(t.closest('#slist')){const ids=lookIds(ST);$('#sdrawer').innerHTML=`<div class="dh"><b>הפריטים בלוק (${ids.length})</b><button class="x" id="dclose">✓</button></div><div class="dgrid">${ids.length?'':'<p class="dempty">עוד לא בחרת בגדים. לחצי על משבצת למטה (👗 שמלה, 👚 חולצה…) ובחרי מהארון.</p>'}${ids.map(id=>`<button class="di" data-open2="${id}"><span class="chk"><img src="${img(id)||TPH}" data-th="${id}" alt=""></span><span class="dm">${esc(D[id].short.slice(0,28))}<br>${m(D[id].paid)} · ${esc(D[id].color||'')} · ${esc(D[id].size||'')}</span></button>`).join('')}</div>`;$('#sdrawer').classList.add('open');return}
 const o2=t.closest('[data-open2]');if(o2){openItem(o2.dataset.open2);return}
 if(t.closest('#backup')){$('#backfile').click();return}
 if(t.closest('#sstage')&&!t.closest('img.sl')){SSEL=null;$$('#sstage img.sl').forEach(z=>z.classList.remove('sel'));paintSel();return}
 const sa=t.closest('[data-sa]');if(sa&&SSEL){const tf=ST.tf[SSEL];const a=sa.dataset.sa;pushH();
  if(a=='up')tf.z=Math.max(...Object.keys(ST.items).map(k=>(ST.tf[k]||{}).z??SLOTZ[k]))+1;if(a=='down')tf.z=Math.min(...Object.keys(ST.items).map(k=>(ST.tf[k]||{}).z??SLOTZ[k]))-1;
  if(a=='flip')tf.flip=!tf.flip;if(a=='hide')tf.hidden=!tf.hidden;if(a=='lock')tf.lock=!tf.lock;if(a=='raw'){tf.raw=!tf.raw}
  if(a=='tuck'){const t=ST.tf.top||tf;t.z=(t.z??30)<10?30:8}if(a=='reset'){Object.assign(tf,await autoTf(SSEL,ST.items[SSEL]),{z:undefined,sx:undefined,sy:undefined,k:undefined})}if(a=='del'){await setItem(SSEL,null);return}
  await drawStudio();return}
},true);
function confirmNew(){return window.closeStudioGuard?!closeStudioGuard('new'):true}// v68: asks once when there are unsaved changes
function closeDrawer(){DRAWER=null;$('#sdrawer').classList.remove('open');paintSlots()}
async function studioAI(){const out=$('#saiout');let sample;try{sample=await claude.use('sample')}catch(_){}if(!sample){out.textContent='האפשרות הזו לא זמינה כאן.';return}
 const ids=lookIds(ST);if(!ids.length){out.textContent='קודם בוחרים בגדים 🙂';return}out.classList.remove('hide');out.textContent='חושבת…';
 const items=Object.entries(ST.items).map(([k,id])=>`- ${SLOTS.find(s=>s[0]==k)[1]}: ${D[id].short} (${D[id].color||''})`).join('\n');
 try{const lim=await sample.limits();let imgs;if(lim&&lim.images){const st=$('#sstage');imgs=undefined}
  const {text}=await sample(`את סטייליסטית לאישה דתייה צנועה. זה לוק ל${OCC[ST.occ]||'יום רגיל'}:\n${items}\n${ST.head=='wig'?'היא בפאה, בלי כיסוי ראש.':''}\nכתבי בעברית, חם וקצר (עד 6 שורות): האם זה הולך יחד, מה הייתי משנה או מוסיפה (סוג פריט וצבע), ואם כדאי חולצת בסיס או קומבינזון מתחת ובאיזה צבע.`,{onText:({text})=>{out.textContent=text}});out.textContent=text}
 catch(e){out.textContent=e.code=='not_granted'?'לא אושר שימוש ב-Claude.':e.code=='rate_limited'?'יותר מדי בקשות, נסי בעוד דקה.':(e.text||'לא הצלחתי לקבל תשובה.')}}
$('#studio').addEventListener('close',()=>{document.body.style.overflow='';closeDrawer()});
// ---- album with mini renders
async function albumHTML(){const ls=Object.values(LOOKS).sort((a,b)=>(b.date||b.created||'').localeCompare(a.date||a.created||''));if(!ls.length)return '<p>עוד אין לוקים שמורים. לחצי "👗 בניית לוק" כדי להתחיל.</p>';
 const view=SET.albumView||'av';const occF=SET.albumOcc||'';const f=ls.filter(l=>!occF||l.occ==occF);
 let h=`<div class="hrow"><div class="seg"><button data-av="av" aria-pressed="${view=='av'}">👤 עליי</button><button data-av="items" aria-pressed="${view=='items'}">🧺 הבגדים</button></div><select id="aocc"><option value="">כל האירועים</option>${Object.entries(OCC).map(([k,v])=>`<option value="${k}" ${occF==k?'selected':''}>${v}</option>`).join('')}</select><button class="go" id="studiobtn">+ לוק חדש</button></div><div class="alb">`;
 for(const l of f){const S=Object.assign(newST(),{items:l.items||{},tf:(l.studio||{}).tf||{},base:(l.studio||{}).base||{top:'orig',skirt:'orig'},bg:(l.studio||{}).bg||'studio',head:(l.studio||{}).head||'hair',avbase:(l.studio||{}).avbase||'long'});
  for(const [k,id] of Object.entries(S.items)){const s=k.replace(/2$/,'');if(s!=k){S.items[s]=S.items[s]||id;delete S.items[k]}if(!S.tf[s]&&D[S.items[s]])S.tf[s]=await autoTf(s,S.items[s])}
  const ids=lookIds(S);const tot=ids.reduce((s,id)=>s+D[id].paid,0);
  h+=`<div class="ac"><button class="aview" data-sedit="${l.id}">${view=='av'?`<div class="mst">${await stageInner(S)}</div>`:`<div class="mit">${ids.map(id=>`<img src="${img(id)||TPH}" data-th="${id}" alt="">`).join('')}</div>`}</button>
  <div class="at"><b>${esc(l.name||'לוק')}</b><small>${OCC[l.occ]||''} · ${l.date?new Date(l.date).toLocaleDateString('he-IL'):''}${l.rating?' · '+'★'.repeat(l.rating):''}</small><small>${ids.length} פריטים · ${money2(tot)}</small>${l.notes?`<small>${esc(l.notes)}</small>`:''}</div>
  <div class="lb"><button data-sedit="${l.id}">✏ עריכה</button><button data-sdup="${l.id}">⧉ שכפול</button><button data-lwore="${l.id}">✓ לבשתי</button><select data-lday="${l.id}"><option value="">לשבוע…</option>${DAYS.map((d,i)=>`<option value="${i}">${d}</option>`).join('')}</select><button data-ldel="${l.id}">🗑</button></div></div>`}
 return h+'</div>'}
document.addEventListener('click',async e=>{const av=e.target.closest('[data-av]');if(av){SET.albumView=av.dataset.av;saveSet();renderHub()}},true);
document.addEventListener('change',e=>{if(e.target.id=='aocc'){SET.albumOcc=e.target.value;saveSet();renderHub()}});
const _rh2=renderHub;renderHub=async function(){if($('#hub')?.open&&TAB=='album'){$('#htabs').innerHTML=TABS.map(([k,l])=>`<button data-tab="${k}" aria-pressed="${TAB==k}">${l}</button>`).join('');const b=$('#hbody');const tk=Symbol();renderHub._t=tk;const h=await albumHTML();if(renderHub._t===tk&&TAB=='album')b.innerHTML=h;return}
 if($('#hub')?.open&&TAB=='tryon'){TAB='album';openStudio();return}
 _rh2();if($('#hub')?.open&&TAB=='looks'){const hl=$('#hgen');if(hl&&!$('#bigstudio'))hl.closest('.hrow').insertAdjacentHTML('beforebegin',`<button class="go big" id="bigstudio" data-studio="">👗 בניית לוק אישי על האווטאר שלי</button>`)}
 $$('#hbody [data-tryl]').forEach(b=>{b.dataset.studio=LOOKS[b.dataset.tryl]?b.dataset.tryl:'g'+b.dataset.tryl;b.removeAttribute('data-tryl');b.textContent='👗 לבניית לוק'})};
document.addEventListener('click',e=>{if(e.target.closest('#bigstudio')){e.stopPropagation();openStudio()}},true);
const _rg2=runGen;runGen=function(a){_rg2(a);$$('#hlooks [data-tryl]').forEach(b=>{b.dataset.studio='g'+b.dataset.tryl;b.removeAttribute('data-tryl');b.textContent='👗 לבניית לוק'})};
// tryon tab now = studio
TABS.splice(TABS.findIndex(t=>t[0]=='tryon'),1);
// item dialog: open in studio
const _ao2=afterOpen;afterOpen=function(id){_ao2(id);const b=$('#dlbody [data-lookfrom]');if(b&&SLOTS.some(s=>s[3].includes(curCat(id))))b.insertAdjacentHTML('afterend',` <button class="go" data-studio="${id}">👗 למדוד על האווטאר</button>`)};
/* ===== magnifier ===== */
const ZD=$('#zoomd'),ZI=ZD.querySelector('img');let ZS={s:1,x:0,y:0},ZP=new Map(),ZG=null,ZT=0;
function zApply(){ZI.style.transform=`translate(${ZS.x}px,${ZS.y}px) scale(${ZS.s})`}
function zFit(){ZS={s:1,x:0,y:0};zApply()}
function zAt(cx,cy,ns){const R=ZI.getBoundingClientRect();ns=Math.max(1,Math.min(8,ns));const bx=R.left-ZS.x,by=R.top-ZS.y;const px=(cx-R.left)/ZS.s,py=(cy-R.top)/ZS.s;ZS.x=cx-bx-px*ns;ZS.y=cy-by-py*ns;ZS.s=ns;if(ns==1){ZS.x=0;ZS.y=0}zApply()}
async function openZoom(src,id){ZI.src=src;zFit();ZD.showModal();if(id){const c=await getCut(id).catch(()=>null)}}
let ZCLOSED=0;document.addEventListener('click',e=>{const im=e.target.closest('.dl img.main,[data-zoom]');if(im){e.stopPropagation();e.preventDefault();if(Date.now()-ZCLOSED<600)return;let zs=im.classList.contains('zbtn')?(($('#dlbody img.main')||{}).src||''):(im.dataset.zoom||im.src);if(!zs||zs==TPH){if(typeof toast=='function')toast('התמונה עוד נטענת, נסי שוב');return}openZoom(zs);return}
 const b=e.target.closest('[data-zz]');if(b){const R=ZD.getBoundingClientRect(),cx=R.width/2,cy=R.height/2;const a=b.dataset.zz;if(a=='x')ZD.close();else if(a=='fit')zFit();else zAt(cx,cy,ZS.s*(a=='in'?1.6:1/1.6))}},true);
ZD.addEventListener('wheel',e=>{e.preventDefault();zAt(e.clientX,e.clientY,ZS.s*(e.deltaY<0?1.15:1/1.15))},{passive:false});
let ZOUT=null;ZD.addEventListener('pointerdown',e=>{if(e.target.closest('.zb,.zx2,button'))return;ZOUT=(e.target.tagName!='IMG'&&ZP.size==0)?{x:e.clientX,y:e.clientY}:null;ZP.set(e.pointerId,{x:e.clientX,y:e.clientY});ZD.setPointerCapture?.(e.pointerId);
 const now=Date.now();if(ZP.size==1&&now-ZT<300){zAt(e.clientX,e.clientY,ZS.s>1.2?1:2.5);ZT=0;return}ZT=now;
 if(ZP.size==1)ZG={sx:e.clientX,sy:e.clientY,ox:ZS.x,oy:ZS.y};else if(ZP.size==2){const [a,b]=[...ZP.values()];ZG={d0:Math.hypot(a.x-b.x,a.y-b.y),s0:ZS.s,cx:(a.x+b.x)/2,cy:(a.y+b.y)/2}}});
ZD.addEventListener('pointermove',e=>{if(!ZP.has(e.pointerId)||!ZG)return;ZP.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(ZP.size>=2&&ZG.d0){const [a,b]=[...ZP.values()];zAt(ZG.cx,ZG.cy,ZG.s0*Math.hypot(a.x-b.x,a.y-b.y)/ZG.d0)}else if(ZP.size==1&&ZG.sx!=null&&ZS.s>1){ZS.x=ZG.ox+e.clientX-ZG.sx;ZS.y=ZG.oy+e.clientY-ZG.sy;zApply()}});
const zEnd=e=>{ZP.delete(e.pointerId);if(ZOUT&&!ZP.size&&e.type=='pointerup'&&Math.hypot(e.clientX-ZOUT.x,e.clientY-ZOUT.y)<10){ZOUT=null;ZD.close();ZG=null;ZCLOSED=Date.now();return}if(!ZP.size)ZOUT=null;if(ZP.size==1){const [p]=[...ZP.values()];ZG={sx:p.x,sy:p.y,ox:ZS.x,oy:ZS.y}}else if(!ZP.size)ZG=null};
ZD.addEventListener('pointerup',zEnd);ZD.addEventListener('pointercancel',zEnd);
const _ao3=afterOpen;afterOpen=function(id){_ao3(id);const im=$('#dlbody img.main');if(im&&!im.parentElement.querySelector('.zbtn')){const p=im.parentElement;if(getComputedStyle(p).position=='static')p.style.position='relative';p.insertAdjacentHTML('beforeend',`<button class="zbtn" data-zoom="${im.src}" aria-label="הגדלה">🔍</button>`)}};
// zoom from studio drawer: long-press / magnifier chip
document.addEventListener('contextmenu',e=>{const d=e.target.closest('.di img');if(d){e.preventDefault();openZoom(d.src)}});
