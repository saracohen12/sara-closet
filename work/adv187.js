// ===== v187: 🛍 יועץ קניות, stage C of the smart-closet plan (24/10, row 269): before she buys, a photo or screenshot of the product (or just its name).
// Claude looks at it next to her whole closet: what she already has that is nearly the same (checked again on a numbered sheet of her own item photos),
// up to 3 looks with her own clothes (to see on the 360 avatar), the size by her measurements, modesty, cost per wear and a verdict (כדאי / אולי / לא כדאי).
// Every check is kept in an archive (DB 'shop187', localStorage without a db): עוד חושבת / קניתי / ויתרתי, price, store, date, what she thought; 2–3 side by side.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v187 '+w+': '+(e&&e.message||e));
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
const fam=id=>{const c=document.querySelector(`.card[data-id="${CSS.escape(id)}"]`);return (c&&c.dataset.c)||((D[id]||{}).col||{}).fc||''};
let CN=null;const catName=c=>{if(!CN){CN={};$a('section[id] > h2').forEach(h=>{const t=h.firstChild&&h.firstChild.textContent.trim();if(t)CN[h.parentElement.id]=t})}return CN[c]||c};
const thl=ids=>new Set(ids.flatMap(id=>[cat(id),(D[id]||{}).cat])).forEach(c=>{try{thLoad(c).then(()=>thApply(TH)).catch(()=>{})}catch(_){}});
const money=n=>'₪'+(Math.round(n*10)/10).toLocaleString('he-IL');
const dd=t=>{const d=new Date(t);return isNaN(d)?'':d.getDate()+'/'+(d.getMonth()+1)};
const TO=(p,ms,v)=>Promise.race([p,new Promise(r=>setTimeout(()=>r(v),ms))]);

// what can go with a new item: her clothes and accessories (not kids, men, nightwear, makeup)
const KEEP=new Set(['dresses','tops','base','sweaters','skirts','sets','outer','scarves','shoes','belts','jewelry','bags','hosiery']);
const pool=()=>Object.keys(D).filter(id=>live(id)&&KEEP.has(cat(id)));
const STORES=['שיין','טמו','עלי אקספרס','חנות','אחר'];
const VD={yes:['✅','כדאי','ye187'],maybe:['🤔','אולי','mb187'],no:['✋','לא כדאי','no187']};
const SS=[['think','🤔','עוד חושבת'],['buy','🛍','קניתי'],['skip','✕','ויתרתי']];const SI=Object.fromEntries(SS.map(s=>[s[0],s]));
const ME=()=>{const m=Object.assign({h:156,b:94,w:73,hp:96,sh:45},(typeof SET=='object'&&SET&&SET.me93&&SET.me91)||{});return m};

// ---------- the archive ----------
const LK='shop187';let ARC=[],SUB=null,LOCAL=false;
const lsGet=()=>{try{return JSON.parse(localStorage.getItem(LK)||'[]')}catch(_){return []}};
const lsPut=()=>{try{localStorage.setItem(LK,JSON.stringify(ARC))}catch(e){ERR('ls',e)}};
const sortA=()=>ARC.sort((a,b)=>String(b.t).localeCompare(String(a.t)));
function load(){if(SUB)return;
 try{if(typeof DB!='undefined'&&DB){let first=true;SUB=DB.collection(LK).onSnapshot(sn=>{const a=[];sn.docs.forEach(d=>{const v=d.data();if(v)a.push(Object.assign({},v,{id:d.id}))});
   // checks saved in this browser before the db was there go up once
   if(first){first=false;const have=new Set(a.map(x=>x.id)),up=lsGet().filter(x=>x&&x.id&&!have.has(x.id));if(up.length){up.forEach(x=>a.push(x));Promise.all(up.map(x=>{const {id,...v}=x;return DB.collection(LK).doc(id).set(v)})).then(()=>{try{localStorage.removeItem(LK)}catch(_){}}).catch(e=>ERR('up',e));/* v278: removed from the phone only after all are in the database */}}
   ARC=a;sortA();const f=document.activeElement;if(!(W&&f&&W.contains(f)&&/^(TEXTAREA|INPUT|SELECT)$/.test(f.tagName)))render();homeBtn()},e=>ERR('snap',e));return}}catch(e){ERR('load',e)}
 if(!LOCAL){LOCAL=true;ARC=lsGet();sortA()}}
[1200,4000,9000].forEach(ms=>setTimeout(()=>{load();homeBtn()},ms));
async function put(r){const i=ARC.findIndex(x=>x.id==r.id);if(i>=0)ARC[i]=r;else ARC.unshift(r);sortA();
 try{if(SUB&&DB){const {id,...v}=r;await DB.collection(LK).doc(id).set(v)}else lsPut()}catch(e){ERR('put',e);toast_('לא הצלחתי לשמור, נסי שוב')}
 homeBtn()}
async function del(id){ARC=ARC.filter(x=>x.id!=id);CMP.delete(id);try{if(SUB&&DB)await DB.collection(LK).doc(id).delete();else lsPut()}catch(e){ERR('del',e)}homeBtn()}
const rec=id=>ARC.find(x=>x.id==id);

// ---------- pictures ----------
function toCanvas(file,max){return new Promise((res,rej)=>{const u=URL.createObjectURL(file),im=new Image();
 im.onload=()=>{const s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*s));c.height=Math.max(1,Math.round(im.height*s));
  const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);g.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);res(c)};
 im.onerror=()=>{URL.revokeObjectURL(u);rej(new Error('img'))};im.src=u})}
const blobOf=c=>new Promise((r,j)=>c.toBlob(b=>b?r(b):j(new Error('blob')),'image/jpeg',.85));
const loadImg=src=>new Promise(r=>{if(!src)return r(null);const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src});
// a numbered sheet of her own item photos, to check "nearly the same" with the eyes and not only by the names
async function sheet(ids){await Promise.all([...new Set(ids.flatMap(id=>[(D[id]||{}).cat,cat(id)]))].map(c=>{try{return thLoad(c).catch(()=>{})}catch(_){}}));
 const cols=4,W=190,Hh=240,c=document.createElement('canvas');c.width=W*cols;c.height=Hh*Math.ceil(ids.length/cols);const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);
 for(let i=0;i<ids.length;i++){const x=(i%cols)*W,y=Math.floor(i/cols)*Hh;let im=null;try{im=await loadImg(img(ids[i])||TH[ids[i]])}catch(_){}
  if(im){const s=Math.min((W-10)/im.width,(Hh-40)/im.height);g.drawImage(im,x+(W-im.width*s)/2,y+34,im.width*s,im.height*s)}
  g.fillStyle='#b5562f';g.fillRect(x+4,y+4,36,28);g.fillStyle='#fff';g.font='bold 20px sans-serif';g.fillText(String(i+1),x+(i<9?15:9),y+25);g.strokeStyle='#ddd';g.strokeRect(x+.5,y+.5,W-1,Hh-1)}
 return blobOf(c)}

// ---------- without Claude: "nearly the same" by the words ----------
const STOP=new Set(['לנשים','נשים','עם','של','חדש','חדשה','אלגנטית','אלגנטי','אופנתית','יחידה','סט','בגד','מוצר','אני','רוצה','לקנות','שוקלת','את','זה','זאת','או','גם']);
const FAMW={'שחור':['שחור'],'לבן':['לבן'],'חום':['חום','קפה'],'בז׳':['בז','חאקי','שמפניה','קרם'],'כחול':['כחול','נייבי','גינס','ג׳ינס'],'ירוק':['ירוק','זית'],'אדום':['אדום','בורדו','בורגונדי'],'ורוד':['ורוד'],'סגול':['סגול'],'אפור':['אפור']};
function localSim(txt){const ws=norm(txt).split(' ').filter(w=>w.length>1&&!STOP.has(w));if(!ws.length)return [];
 const f=Object.keys(FAMW).find(k=>FAMW[k].some(w=>txt.includes(w)))||'';
 return pool().map(id=>{const x=D[id]||{};const h=' '+norm([x.short,x.full,x.color,catName(cat(id)),(x.tags||[]).join(' ')].filter(Boolean).join(' '))+' ';
  let s=ws.filter(w=>h.includes(w)).length;if(f&&fam(id)==f)s+=1.5;return [id,s]}).filter(([,s])=>s>=(ws.length>1?2:1)).sort((a,b)=>b[1]-a[1]).slice(0,8).map(x=>x[0])}

// ---------- asking Claude ----------
function catalog(){return pool().map(id=>{const x=D[id]||{},i=it(id);
 return [id,catName(cat(id)),nm(id).slice(0,44),(x.color||fam(id)||'').slice(0,18),i.fav?'♥':'',i.wear?'w'+i.wear:'',i.loc=='כביסה'?'🧺':''].map(v=>String(v).replace(/[|\n]+/g,' / ').trim()).join('|').replace(/\|+$/,'')}).join('\n')}
function prompt1(f,hasPh){const m=ME();
 return `You are a warm, honest personal stylist. My client is deciding whether to buy ONE item.${hasPh?' The attached image shows it (a product photo or a screenshot from a shopping site; it may include a size chart).':''}${f.txt?` She wrote about it: "${f.txt.slice(0,300)}".`:''}${f.price?` Price: ${f.price} ₪.`:''}${f.store?` Store: ${f.store}.`:''}
About her: a religious woman who dresses modestly (her closet: long skirts and dresses, tops with sleeves, head coverings and a wig). Her body: height ${m.h} cm, bust ${m.b}, waist ${m.w}, hips ${m.hp}, shoulders ${m.sh}.
Her closet right now (only what she owns), one item per line: id|category|name|colour|♥ = a favourite|wN = worn N times|🧺 = in the wash
${catalog()}

Think about: does she already own something nearly the same (same kind of item AND similar colour and style, so she would not need both)? Which of her items go with it for full outfits (prefer favourites and items she wears)? Which size fits her body (use the size chart in the image if there is one; Shein and Temu sizes run small)? Is it modest enough for her (length, sleeves, neckline, tight or see-through)? How often would she really wear it?
Reply in Hebrew, speaking to her as "את", with ONLY this JSON:
{"what":"what the item is, at most 7 Hebrew words","cat":"dresses|tops|sweaters|skirts|sets|outer|scarves|shoes|belts|jewelry|bags|other","colour":"main colour in Hebrew",
"similar":["ids of items she owns that are nearly the same, at most 6, [] if none"],
"looks":[{"name":"short Hebrew name for the outfit","ids":["2 to 5 ids from her closet that complete the outfit with the new item"],"why":"one short Hebrew sentence"}],
"size":"the size to order, or \\"\\" if you cannot tell","sizeWhy":"one short Hebrew sentence",
"modest":"one short Hebrew sentence if something is not modest enough for her or needs a layer, else \\"\\"",
"missing":"what she would still need in order to wear it, short Hebrew, or \\"\\"",
"wears":a number: about how many times a year she would wear it,
"verdict":"yes|maybe|no","why":"two short honest, kind Hebrew sentences"}
Up to 3 looks. Use only ids from the list.`}
const errMsg=e=>e&&e.code=='not_granted'?'צריך לאשר לאתר לשאול את Claude (בחלון שקפץ). נסי שוב.':e&&e.code=='rate_limited'?'יותר מדי בקשות ברגע, נסי שוב בעוד דקה.':e&&e.code=='prompt_too_large'?'הבקשה ארוכה מדי, נסי לקצר את מה שכתבת.':'הבדיקה לא הצליחה, נסי שוב.';
const ids_=(a,n)=>[...new Set((Array.isArray(a)?a:[]).filter(id=>typeof id=='string'&&D[id]&&live(id)))].slice(0,n);
function clean(r){r=r&&typeof r=='object'?r:{};const s=v=>typeof v=='string'?v.trim().slice(0,400):'';
 return {what:s(r.what).slice(0,60),cat:s(r.cat),colour:s(r.colour).slice(0,30),similar:ids_(r.similar,6),
  looks:(Array.isArray(r.looks)?r.looks:[]).map(l=>({name:s(l&&l.name).slice(0,40)||'לוק',ids:ids_(l&&l.ids,5),why:s(l&&l.why).slice(0,160)})).filter(l=>l.ids.length).slice(0,3),
  size:s(r.size).slice(0,20),sizeWhy:s(r.sizeWhy),modest:s(r.modest),missing:s(r.missing),wears:Math.max(0,Math.min(200,Math.round(+r.wears||0))),
  verdict:VD[r.verdict]?r.verdict:'maybe',why:s(r.why)}}
let BUSY='',F={file:null,url:'',txt:'',price:'',store:''},CUR=null,TB='new',FLT='',CMP=new Set(),VIEW='',DEL='';
function status(t){BUSY=t;const s=W&&W.querySelector('.b187 span');if(s)s.textContent=t;else render()}
async function run(){if(BUSY)return;const f=Object.assign({},F,{txt:(F.txt||'').trim(),price:+String(F.price||'').replace(',','.')||0});
 if(!f.file&&!f.txt){toast_('צלמי את המוצר, או כתבי מה הוא');const t=W&&W.querySelector('#t187');if(t)t.focus();return}
 status('מתחברת ל-Claude…');
 const r={id:'c'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),t:new Date().toISOString(),txt:f.txt.slice(0,300),price:f.price,store:f.store,st:'think',mine:'',th:''};
 let pic=null;if(f.file){try{const c=await TO(toCanvas(f.file,1024),15000,null);if(c){pic=await blobOf(c);const t=document.createElement('canvas'),k=Math.min(1,240/Math.max(c.width,c.height));t.width=Math.round(c.width*k);t.height=Math.round(c.height*k);t.getContext('2d').drawImage(c,0,0,t.width,t.height);r.th=t.toDataURL('image/jpeg',.72)}}catch(e){ERR('pic',e)}
  if(!pic&&!f.txt){BUSY='';toast_('לא הצלחתי לקרוא את התמונה. נסי צילום מסך שלה');return render()}}
 let sample=null;try{sample=await TO(claude.use('sample'),12000,null)}catch(_){}
 const lim=sample?await TO(sample.limits().catch(()=>null),8000,null):null;
 const canPic=!!(pic&&lim&&lim.images);
 if(!sample||(!canPic&&!f.txt)){
  // no Claude here (or no pictures): the words only, and say so
  BUSY='';if(!f.txt){toast_(sample?'כאן אי אפשר לשלוח תמונה ל-Claude. כתבי מה המוצר, ואבדוק':'אין לי כאן חיבור ל-Claude. כתבי מה המוצר, ואחפש דומים לפי המילים');return render()}
  Object.assign(r,clean({}),{what:f.txt.slice(0,60),similar:localSim(f.txt),verdict:'',local:1,why:''});
  await put(r);CUR=r.id;F={file:null,url:'',txt:'',price:'',store:f.store};return render()}
 try{status(canPic?'מסתכלת על המוצר ועל כל הארון שלך…':'בודקת מול כל הארון שלך…');
  const a=await TO(sample.json(prompt1(f,canPic),canPic?{images:[pic],modelTier:'default'}:{modelTier:'default'}),110000,null);
  if(a===null){BUSY='';toast_('הבדיקה לקחה יותר מדי זמן, נסי שוב');return render()}
  Object.assign(r,clean(a));
  // "nearly the same" again, on a sheet of her own photos (names from the receipts are vague)
  const cand=[...new Set([...r.similar,...localSim([r.what,r.colour,f.txt].join(' '))])].slice(0,12);
  if(canPic&&cand.length&&lim.images.maxCount>=2){status('משווה לתמונות של הבגדים שלך…');
   try{const sh=await sheet(cand);const b=await TO(sample.json(`Image 1 is an item a woman is thinking of buying. Image 2 is a numbered grid (1-${cand.length}) of items she already owns. Which numbered items are nearly the same as image 1 – the same kind of item AND a similar colour, pattern and style, so she would not need both? Ignore background, folding and lighting.
Reply with ONLY JSON: {"same":[numbers, closest first, [] if none]}`,{images:[pic,sh],modelTier:'default'}),60000,null);
    if(b&&Array.isArray(b.same))r.similar=b.same.map(n=>cand[n-1]).filter(Boolean).slice(0,6)}catch(e){ERR('sheet',e)}}
  BUSY='';await put(r);CUR=r.id;F={file:null,url:'',txt:'',price:'',store:f.store};render();const b=W&&W.querySelector('.w187b');if(b)b.scrollTop=0;
 }catch(e){ERR('sample',e);BUSY='';toast_(errMsg(e));render()}}

// ---------- the window ----------
let W=null;
const tile=(id,tag)=>`<button type="button" class="t187" data-ad187open="${es(id)}"><img alt="" data-th="${es(id)}" src="${ph(id)}">${tag?`<em>${es(tag)}</em>`:''}<span>${es(nm(id))}</span></button>`;
const vPill=v=>VD[v]?`<span class="v187 ${VD[v][2]}">${VD[v][0]} ${VD[v][1]}</span>`:'';
const sPill=s=>SI[s]?`<span class="p187 s${s}">${SI[s][1]} ${SI[s][2]}</span>`:'';
const meta=r=>[r.price?money(r.price):'',r.store,dd(r.t)].filter(Boolean).join(' · ');
const pic=r=>r.th?`<img alt="" src="${es(r.th)}">`:'<span class="n187">🛍</span>';
function formView(){const rc=ARC.slice(0,3);
 return `<label class="cam187"><input type="file" accept="image/*" data-ad187f><span class="ic">📷</span><span><b>${F.url?'להחליף תמונה':'צילום או צילום מסך של המוצר'}</b><small>מהאתר, מהחנות או מהאינסטגרם, גם עם טבלת המידות</small></span></label>
 ${F.url?`<div class="pv187"><img alt="התמונה שבחרת" src="${es(F.url)}"><button type="button" data-ad187rm aria-label="להסיר את התמונה">✕</button></div>`:''}
 <label class="l187">מה זה? <small>${F.url?'(לא חובה)':'(או רק לכתוב, בלי תמונה)'}</small><textarea id="t187" rows="2" placeholder="למשל: שמלת מקסי קטיפה חומה עם שרוול ארוך">${es(F.txt)}</textarea></label>
 <div class="r187"><label class="l187">מחיר ₪<input id="pr187" inputmode="decimal" autocomplete="off" value="${es(F.price)}" placeholder="0"></label>
 <label class="l187">איפה<select id="so187"><option value="">–</option>${STORES.map(s=>`<option${F.store==s?' selected':''}>${s}</option>`).join('')}</select></label></div>
 <button type="button" class="pri go187" data-ad187go>✨ בדקי לי</button>
 <p class="i187">אני בודקת מול כל הארון שלך: אם יש לך כבר משהו דומה, עם מה זה הולך (ואפשר לראות על האווטאר), איזו מידה להזמין לפי המידות שלך, ואם כדאי. כל בדיקה נשמרת בארכיון.</p>
 ${rc.length?`<h4 class="h187">בדיקות אחרונות</h4><ul class="a187">${rc.map(rowHTML).join('')}</ul>`:''}`}
function resView(r){const rd=new Set((window.R360&&R360.ready&&R360.ready())||[]);const m=ME();
 const cpw=r.price&&r.wears?r.price/r.wears:0;
 const look=(l,i)=>{const n=l.ids.filter(id=>rd.has(id)).length;
  return `<li class="k187"><div class="kh187"><b>${es(l.name)}</b>${l.why?`<small>${es(l.why)}</small>`:''}</div><div class="s187"><span class="t187 new">${pic(r)}<em>חדש</em><span>${es(r.what||'הפריט החדש')}</span></span>${l.ids.map(id=>tile(id)).join('')}</div>
  ${n?`<button type="button" data-ad187av="${i}">👗 לראות על האווטאר <small>(${n} מתוך ${l.ids.length} כבר עליו)</small></button>`:'<p class="i187">הבגדים בלוק הזה עוד לא על האווטאר 360.</p>'}</li>`};
 return `<div class="hr187">${pic(r)}<div><b>${es(r.what||'המוצר')}</b><small>${es(meta(r))}</small><div class="pp187">${vPill(r.verdict)}${sPill(r.st)}</div></div></div>
 ${r.why?`<p class="why187">${es(r.why)}</p>`:''}${r.local?`<p class="i187">⚠ בלי חיבור ל-Claude בדקתי רק לפי המילים שכתבת. כשתפתחי את האתר ב-Chrome או באפליקציה של Claude אוכל לבדוק גם לפי התמונה, ולהציע לוקים ומידה.</p>`:''}
 <section class="c187"><h4>👯 יש לך כבר משהו דומה?</h4>${r.similar.length?`<p class="w187">כן, ${r.similar.length==1?'פריט אחד דומה':r.similar.length+' פריטים דומים'}:</p><div class="s187">${r.similar.map(id=>tile(id)).join('')}</div>`:'<p class="ok187">✓ אין לך משהו כמעט זהה.</p>'}</section>
 ${r.looks&&r.looks.length?`<section class="c187"><h4>👗 עם מה זה הולך מהארון שלך</h4><ul class="ks187">${r.looks.map(look).join('')}</ul><p class="i187">הפריט החדש עצמו יעלה על האווטאר אחרי שתקני ותכיני לו גיליון ב-GPT.</p></section>`:''}
 ${r.size||r.sizeWhy?`<section class="c187"><h4>📏 מידה</h4>${r.size?`<p class="sz187">להזמין <b>${es(r.size)}</b></p>`:''}${r.sizeWhy?`<p>${es(r.sizeWhy)}</p>`:''}<p class="i187">לפי המידות שלך: גובה ${m.h} · חזה ${m.b} · מותן ${m.w} · ירכיים ${m.hp}</p></section>`:''}
 ${r.modest?`<section class="c187"><h4>🤍 צניעות</h4><p>${es(r.modest)}</p></section>`:''}
 ${r.missing?`<section class="c187"><h4>🛒 מה עוד חסר כדי ללבוש את זה</h4><p>${es(r.missing)}</p></section>`:''}
 ${cpw?`<section class="c187"><h4>💰 כמה זה עולה לכל לבישה</h4><p><b>${money(cpw)}</b> לפעם, אם תלבשי את זה בערך ${r.wears} פעמים בשנה.</p></section>`:''}
 <section class="c187"><h4>מה החלטת?</h4><div class="st187" role="group" aria-label="מה החלטת">${SS.map(([k,i,t])=>`<button type="button" data-ad187st="${k}" aria-pressed="${r.st==k}">${i} ${t}</button>`).join('')}</div>
 ${r.st=='buy'?`<div class="nx187"><button type="button" data-ad187ord>📦 ההזמנות שלי</button><button type="button" data-ad187pr>📋 פרומפט ל-GPT לאווטאר</button></div><p class="i187">כשהחבילה תגיע, צלמי את המוצר ב"ההזמנות שלי" ואמצא אותו.</p>`:''}
 <label class="l187">מה אני חושבת <small>(נשמר בארכיון)</small><textarea id="m187" rows="2" placeholder="למשל: יפה, אבל יש לי כבר שתיים כאלה">${es(r.mine||'')}</textarea></label></section>
 <div class="ft187"><button type="button" class="pri" data-ad187new>🔎 בדיקה חדשה</button><button type="button" data-ad187del="${es(r.id)}">🗑 למחוק מהארכיון</button></div>`}
const rowHTML=r=>`<li><button type="button" class="ar187" data-ad187rec="${es(r.id)}">${pic(r)}<span><b>${es(r.what||r.txt||'מוצר')}</b><small>${es(meta(r))}</small><span class="pp187">${vPill(r.verdict)}${sPill(r.st)}</span></span></button><button type="button" class="cm187" data-ad187cmp="${es(r.id)}" aria-pressed="${CMP.has(r.id)}" aria-label="להשוואה">⚖</button></li>`;
function arcView(){const by=k=>ARC.filter(r=>r.st==k);const buy=by('buy'),skip=by('skip');const sum=L=>L.reduce((s,r)=>s+(+r.price||0),0);
 if(!ARC.length)return '<p class="e187">עוד אין בדיקות. בלשונית "בדיקה חדשה" מצלמים מוצר שחושבים לקנות.</p>';
 const L=FLT?by(FLT):ARC;
 return `<div class="sm187"><span>בדקת <b>${ARC.length}</b></span>${buy.length?`<span>קנית <b>${buy.length}</b>${sum(buy)?` (${money(sum(buy))})`:''}</span>`:''}${skip.length?`<span>ויתרת על <b>${skip.length}</b>${sum(skip)?`, חסכת <b>${money(sum(skip))}</b>`:''}</span>`:''}</div>
 <div class="fl187" role="group" aria-label="סינון">${[['','הכל',ARC.length],...SS.map(([k,i,t])=>[k,i+' '+t,by(k).length])].map(([k,t,n])=>`<button type="button" data-ad187flt="${k}" aria-pressed="${FLT==k}">${t} <small>${n}</small></button>`).join('')}</div>
 ${L.length?`<ul class="a187">${L.map(rowHTML).join('')}</ul>`:'<p class="e187">אין כאן כלום.</p>'}
 <p class="i187">⚖ מסמנים 2 או 3 מוצרים כדי להשוות ביניהם.</p>
 ${CMP.size>=2?`<div class="cb187"><button type="button" class="pri" data-ad187cmpgo>⚖ להשוות (${CMP.size})</button><button type="button" data-ad187cmpx>ניקוי</button></div>`:''}`}
function cmpView(){const L=[...CMP].map(rec).filter(Boolean).slice(0,3);
 const row=(t,f)=>`<tr><th scope="row">${t}</th>${L.map(r=>`<td>${f(r)}</td>`).join('')}</tr>`;
 return `<button type="button" class="bk187" data-ad187back>→ חזרה לארכיון</button><div class="cw187"><table class="ct187"><thead><tr><td></td>${L.map(r=>`<th scope="col"><button type="button" data-ad187rec="${es(r.id)}">${pic(r)}<span>${es(r.what||r.txt||'מוצר')}</span></button></th>`).join('')}</tr></thead><tbody>
 ${row('מה אמרתי',r=>vPill(r.verdict)||'–')}${row('מחיר',r=>r.price?money(r.price):'–')}${row('איפה',r=>es(r.store||'–'))}
 ${row('דומים בארון',r=>r.similar&&r.similar.length?`<b class="w187">${r.similar.length}</b>`:'<span class="ok187">אין</span>')}${row('לוקים מהארון',r=>String((r.looks||[]).length))}
 ${row('מידה',r=>es(r.size||'–'))}${row('לכל לבישה',r=>r.price&&r.wears?money(r.price/r.wears):'–')}${row('צניעות',r=>r.modest?'⚠':'✓')}${row('החלטתי',r=>sPill(r.st))}</tbody></table></div>`}
function render(){if(!W||!W.open)return;const b=W.querySelector('.w187b');const y=b.scrollTop;
 const g=k=>W.querySelector(k);if(g('#t187')){F.txt=g('#t187').value;F.price=g('#pr187').value;F.store=g('#so187').value}
 $a('.w187t button',W).forEach(x=>{x.setAttribute('aria-selected',x.dataset.t==TB);const k=x.querySelector('b');if(k){const v=x.dataset.t=='arc'?ARC.length:0;k.textContent=v||'';k.hidden=!v}});
 const r=CUR&&rec(CUR);
 b.innerHTML=BUSY?`<div class="b187" role="status" aria-live="polite"><i aria-hidden="true"></i><span>${es(BUSY)}</span><small>זה לוקח בערך חצי דקה</small></div>`:VIEW=='cmp'?cmpView():r?resView(r):TB=='arc'?arcView():formView();
 if(!BUSY&&(r||VIEW))b.scrollTop=y;thl($a('[data-ad187open]',b).map(x=>x.dataset.ad187open))}
function open(tab){load();if(!W){W=document.createElement('dialog');W.id='sh187';W.dir='rtl';W.setAttribute('aria-labelledby','sh187t');document.body.appendChild(W);
  W.innerHTML=`<div class="w187h"><h3 id="sh187t">🛍 יועץ קניות<small>לפני שקונים: יש לי כבר? עם מה זה הולך? כדאי?</small></h3><button type="button" class="x187" aria-label="סגירה">✕</button></div>
   <div class="w187t" role="tablist"><button type="button" role="tab" data-t="new">🔎 בדיקה חדשה</button><button type="button" role="tab" data-t="arc">🗂 הארכיון <b hidden></b></button></div><div class="w187b"></div>`}
 if(tab){TB=tab;CUR=null;VIEW=''}
 if(!W.open)W.showModal();render()}
const closeAll=()=>$a('dialog[open]').forEach(x=>{try{x.close()}catch(_){}});

// ---------- clicks and typing ----------
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('button,[data-ad187open]');if(!t)return;const d=t.dataset;
 try{
 if(t.id=='sh187b'||d.ad187in!=null){e.preventDefault();e.stopPropagation();closeAll();return open(d.ad187in||'new')}
 if(!W||!t.closest('#sh187'))return;
 if(t.classList.contains('x187'))return W.close();
 if(d.t){TB=d.t;CUR=null;VIEW='';return render()}
 if(BUSY)return;
 if(d.ad187go!=null){const g=k=>W.querySelector(k);F.txt=g('#t187').value;F.price=g('#pr187').value;F.store=g('#so187').value;return run()}
 if(d.ad187rm!=null){if(F.url)URL.revokeObjectURL(F.url);F.file=null;F.url='';return render()}
 if(d.ad187open!=null)return openItem(d.ad187open);
 if(d.ad187rec){CUR=d.ad187rec;VIEW='';render();W.querySelector('.w187b').scrollTop=0;return}
 if(d.ad187new!=null){CUR=null;VIEW='';TB='new';return render()}
 const r=CUR&&rec(CUR);
 if(d.ad187st&&r){r.st=d.ad187st;await put(r);toast_(SI[r.st][1]+' '+SI[r.st][2]);return render()}
 if(d.ad187av!=null&&r){const l=r.looks[+d.ad187av];if(!l)return;W.close();return R360.openWith(null,Object.assign({},l.ids))}
 if(d.ad187ord!=null){closeAll();return window.openOrders123&&openOrders123()}
 if(d.ad187pr!=null){closeAll();return window.R360&&R360.prompts()}
 if(d.ad187del){const id=d.ad187del;if(DEL!=id){DEL=id;t.textContent='בטוח? לחצי שוב';setTimeout(()=>{if(DEL==id){DEL='';render()}},2500);return}
  DEL='';await del(id);CUR=null;TB='arc';toast_('נמחק מהארכיון');return render()}
 if(d.ad187flt!=null){FLT=d.ad187flt;return render()}
 if(d.ad187cmp){const id=d.ad187cmp;if(CMP.has(id))CMP.delete(id);else{if(CMP.size>=3){toast_('אפשר להשוות עד 3');return}CMP.add(id)}return render()}
 if(d.ad187cmpgo!=null){VIEW='cmp';CUR=null;render();W.querySelector('.w187b').scrollTop=0;return}
 if(d.ad187cmpx!=null){CMP.clear();return render()}
 if(d.ad187back!=null){VIEW='';TB='arc';return render()}
 }catch(err){ERR('click',err)}});
document.addEventListener('change',async e=>{const t=e.target;if(!t.closest||!t.closest('#sh187'))return;
 try{if(t.matches('[data-ad187f]')){const f=t.files&&t.files[0];t.value='';if(!f)return;const g=k=>W.querySelector(k);F.txt=g('#t187').value;F.price=g('#pr187').value;F.store=g('#so187').value;
   if(F.url)URL.revokeObjectURL(F.url);F.file=f;F.url=URL.createObjectURL(f);return render()}
  if(t.id=='m187'){const r=CUR&&rec(CUR);if(r&&r.mine!=t.value.trim()){r.mine=t.value.trim().slice(0,400);await put(r)}}}catch(err){ERR('change',err)}});
document.addEventListener('keydown',e=>{if(e.key=='Enter'&&e.target&&e.target.id=='pr187'){e.preventDefault();const b=W&&W.querySelector('[data-ad187go]');if(b)b.click()}});

// ---------- entry points: a home chip, the admin panel, the "לפני הזמנה" tab ----------
function homeBtn(){try{const cta=$1('#h180 .z-chips')||$1('.h9cta')||$1('.h9hero');if(!cta)return;let e=$1('#sh187b');
 if(!e){e=document.createElement('button');e.id='sh187b';e.type='button';const s=$1('#sc185b');s&&s.parentNode==cta?s.after(e):cta.appendChild(e)}
 const n=ARC.filter(r=>r.st=='think').length;
 const h=`<span>🛍</span><span><b>יועץ קניות</b><small>${n?`🤔 ${n} עוד בהתלבטות`:'לפני שקונים'}</small></span>`;if(e.innerHTML!=h)e.innerHTML=h}catch(err){ERR('home',err)}}
setInterval(homeBtn,2000);setTimeout(homeBtn,1500);
try{const T=window.TOOLS172,g=T&&T.find(x=>x[0]=='הזמנות וכסף');if(g&&!g[1].some(x=>String(x[1]).includes('יועץ קניות')))g[1].splice(0,0,['🛍','יועץ קניות: לפני שקונים',()=>{closeAll();open('new')}])}catch(e){ERR('tools',e)}
{const _rh=renderHub;renderHub=function(){const r=_rh.apply(this,arguments);const add=()=>{try{const b=$1('#hbody');if(typeof TAB!='undefined'&&TAB=='check'&&b&&!b.querySelector('.in187'))b.insertAdjacentHTML('afterbegin','<button type="button" class="in187" data-ad187in="new"><span>🛍</span><span><b>יועץ הקניות החכם</b><small>עם תמונה: דומים בארון, לוקים, מידה, וכדאי או לא</small></span></button>')}catch(err){ERR('hub',err)}};
 if(r&&typeof r.then=='function')r.then(add);else add();setTimeout(add,400);return r}}
window.ADV187={open,list:()=>ARC.slice()};
})();
