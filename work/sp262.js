// ===== v263 (Sara 27/10 22:21 "כן – לשמור את 8 הזוויות בקובץ אחד, ובבקשה שלא להרוס כל מה שבנינו"): the store counts FILES (5,000), and every item / tie / hairstyle /
// makeup on the 360 avatar took 8 files (one per angle) + 8 more for a tie's fabric mask. Now the 8 angles live in ONE picture (4 across, 2 down) and the lists keep
// 8 names "<picture>~<angle>", so every screen that shows or reads an angle works as before:
//  - a picture "/_blob/<id>~<v>" is cut out of the big picture in the browser (img.src, setAttribute, pictures written as HTML, fetch) and kept in this browser;
//  - the packer packs what is still 8 files, checks the packed picture against the 8 originals before it changes anything, and changes only that list.
// The 8 old files stay until "🧹 לפנות מקום" (the daily backup still points at them for a week, so a restore keeps working).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v263 '+w+': '+(e&&(e.code||e.message)||e));
const RX=/\/_blob\/([0-9a-f]{32})~([0-7])(?:[?#].*)?$/;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const _fetch=window.fetch.bind(window);
// ---------- one angle out of the packed picture (kept in IndexedDB, so the next visit is instant) ----------
let IDB=null;const idb=()=>IDB||(IDB=new Promise(ok=>{try{const q=indexedDB.open('sp262',1);q.onupgradeneeded=()=>q.result.createObjectStore('f');q.onsuccess=()=>ok(q.result);q.onerror=()=>ok(null)}catch(_){ok(null)}}));
async function kvGet(k){const d=await idb();if(!d)return null;return new Promise(ok=>{try{const r=d.transaction('f').objectStore('f').get(k);r.onsuccess=()=>ok(r.result||null);r.onerror=()=>ok(null)}catch(_){ok(null)}})}
async function kvPut(k,v){const d=await idb();if(!d)return;try{d.transaction('f','readwrite').objectStore('f').put(v,k)}catch(_){}}
const BM=new Map();   // sprite id -> Promise<ImageBitmap>, let go after a while
function bitmap(id){let p=BM.get(id);if(!p){p=(async()=>{let last;for(const w of [0,700,2200]){if(w)await sleep(w);try{const r=await _fetch('/_blob/'+id);if(!r.ok)throw new Error('http '+r.status);return await createImageBitmap(await r.blob())}catch(e){last=e}}throw last})();BM.set(id,p);
  p.then(()=>setTimeout(()=>{if(BM.get(id)===p){BM.delete(id);p.then(b=>{try{b.close()}catch(_){}})}},20000),()=>BM.delete(id))}return p}
const FR=new Map();   // "<id>~<v>" -> Promise<{b:Blob,u:objectURL}>
function frame(id,v){const k=id+'~'+v;let p=FR.get(k);if(p)return p;
 p=(async()=>{let b=await kvGet(k);if(!b){const bm=await bitmap(id),fw=bm.width/4,fh=bm.height/2,c=document.createElement('canvas');c.width=fw;c.height=fh;
   c.getContext('2d').drawImage(bm,(v%4)*fw,(v>>2)*fh,fw,fh,0,0,fw,fh);b=await new Promise(ok=>c.toBlob(ok,'image/png'));if(!b)throw new Error('encode');kvPut(k,b)}
  return {b,u:URL.createObjectURL(b)}})();
 FR.set(k,p);p.catch(e=>{FR.delete(k);ERR('frame',e)});return p}
window.SP262={frame,RX,isPacked:a=>typeof a=='string'&&/^[0-9a-f]{32}~[0-7]$/.test(a)};
// ---------- every way a picture reaches the page ----------
const SRC=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');
function want(el,v,m){const abs=new URL(v,location.href).href;if(el.__sp===abs)return;el.__sp=abs;
 frame(m[1],+m[2]).then(f=>{if(el.__sp===abs)SRC.set.call(el,f.u)},()=>{if(el.__sp===abs)SRC.set.call(el,'data:,')})}   // a failure fires the picture's own error handler
Object.defineProperty(HTMLImageElement.prototype,'src',{configurable:true,enumerable:SRC.enumerable,
 get(){return this.__sp||SRC.get.call(this)},
 set(v){const m=typeof v=='string'&&RX.exec(v);if(m)return want(this,v,m);this.__sp=null;SRC.set.call(this,v)}});
const SA=Element.prototype.setAttribute;
Element.prototype.setAttribute=function(n,v){if(this instanceof HTMLImageElement&&String(n).toLowerCase()=='src'){const m=typeof v=='string'&&RX.exec(v);if(m)return want(this,v,m);this.__sp=null}return SA.call(this,n,v)};
const fix=img=>{const v=img.getAttribute('src');const m=v&&RX.exec(v);if(m)want(img,v,m)};
new MutationObserver(R=>{for(const r of R){if(r.type=='attributes'){if(r.target instanceof HTMLImageElement)fix(r.target);continue}
  r.addedNodes.forEach(n=>{if(n.nodeType!=1)return;if(n instanceof HTMLImageElement)fix(n);else if(n.querySelector&&n.querySelector('img[src*="~"]'))n.querySelectorAll('img[src*="~"]').forEach(fix)})}})
 .observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
window.fetch=function(i,o){const u=typeof i=='string'?i:i&&i.url||'';const m=RX.exec(u);if(!m)return _fetch(i,o);
 return frame(m[1],+m[2]).then(f=>new Response(f.b,{status:200,headers:{'content-type':'image/png'}}),()=>new Response('',{status:404}))};

// ---------- the packer ----------
const plain=L=>Array.isArray(L)&&L.length==8&&L.some(Boolean)&&L.every(a=>!a||/^[0-9a-f]{32}$/.test(a));
async function decode(id){let last;for(const w of [0,900,2500]){if(w)await sleep(w);try{const r=await _fetch('/_blob/'+id);if(!r.ok)throw new Error('http '+r.status);return await createImageBitmap(await r.blob())}catch(e){last=e}}throw last}
const px=(bm,sx,sy,w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(bm,sx,sy,w,h,0,0,w,h);return x.getImageData(0,0,w,h).data};
async function put1(a,b){let last;for(const w of [0,1500,4000,9000]){if(w)await sleep(w);try{return await a.upload(b)}catch(e){last=e;if(e&&e.code&&!/rate|unavail|network/.test(e.code))break}}throw last}
// packs 8 files into one; returns the new list, or null (left as it was)
async function pack(a,L){const bms=await Promise.all(L.map(x=>x?decode(x):null));
 try{const ok=bms.filter(Boolean);const W=ok[0].width,H=ok[0].height;if(ok.some(b=>b.width!=W||b.height!=H)){ERR('size',L[0]);return null}
  const c=document.createElement('canvas');c.width=W*4;c.height=H*2;const x=c.getContext('2d');bms.forEach((b,v)=>{if(b)x.drawImage(b,(v%4)*W,(v>>2)*H)});
  let bl=await new Promise(r=>c.toBlob(r,'image/webp',.98));   // v265: lossless made a ~600 KB file out of 8 files of ~7 KB; .98 gives ~63 KB with a mean change of 1.5/255 on her tie (invisible), the pixel check below still guardsif(!bl||bl.type!='image/webp')bl=await new Promise(r=>c.toBlob(r,'image/png'));if(!bl)return null;
  const up=await put1(a,bl);
  // check: the stored picture, cut back into 8, must match the 8 originals
  const back=await decode(up.id);let bad=0;
  try{if(back.width!=W*4||back.height!=H*2)bad=1;else for(let v=0;v<8&&!bad;v++){if(!bms[v])continue;const A=px(bms[v],0,0,W,H),B=px(back,(v%4)*W,(v>>2)*H,W,H);let d=0,n=0;
    for(let i=0;i<A.length;i+=4){const al=Math.max(A[i+3],B[i+3]);if(!al)continue;n++;d+=Math.abs(A[i+3]-B[i+3])+(al>40?(Math.abs(A[i]-B[i])+Math.abs(A[i+1]-B[i+1])+Math.abs(A[i+2]-B[i+2]))/3:0)}
    if(n&&d/n>3)bad=1}}finally{try{back.close()}catch(_){}}
  if(bad){ERR('check',L[0]);return null}
  return L.map((y,v)=>y?up.id+'~'+v:'')}
 finally{bms.forEach(b=>{try{b&&b.close()}catch(_){}})}}
const same=(A,B)=>Array.isArray(A)&&Array.isArray(B)&&A.length==B.length&&A.every((x,i)=>x==B[i]);
let RUN=false,DONE=0;
const sig=L=>L.join(',');
// every list of 8 that is still 8 files: items' 360 parts (a8) and a cover's ties (tx), styles (L) and a tie's fabric mask (M).
// The same 8 can sit in two places (a cover's tie is in a8 and in tx) – it is packed once and changed everywhere, so "which tie is on" still matches.
function lists(styles){const G=new Map();const add=(L,w,due)=>{if(!plain(L))return;const k=sig(L);if(!G.has(k))G.set(k,{L:L.slice(),at:[]});const g=G.get(k);g.at.push(w);if(due)g.due=1};
 const C8=window.cut8||{},dueX=p=>p.k=='tiex'&&p.src&&(p.cv||0)<(C8.CVX||0),dueS=v=>(v.set=='hair'||v.set=='tie')&&v.src&&(v.cv||0)<((v.set=='hair'&&C8.CVH)||C8.CVW||0);   // a re-cut is waiting: leave it, the re-cut writes new files anyway
 Object.keys(IT).forEach(id=>{const it=IT[id]||{};['a8','tx'].forEach(f=>(Array.isArray(it[f])?it[f]:[]).forEach(p=>p&&add(p.L,{id},dueX(p))))});
 styles.forEach(d=>{const v=d.data()||{};['L','M'].forEach(f=>add(v[f],{st:d.id},dueS(v)))});return [...G.values()].filter(g=>!g.due)}
async function run(max){if(RUN)return;RUN=true;let n=0;try{const a=await claude.use('assets'),db=await claude.use('db');if(!a||!db||typeof IT=='undefined'||typeof putItem!='function')return;
  const busy=()=>document.hidden||document.querySelector('dialog[open]#g250,dialog[open]#tie202,dialog[open]#fix237,dialog[open]#cl262');
  const G=lists((await db.collection('styles').get()).docs);
  for(const g of G){if(n>=max)break;while(busy())await sleep(3000);
   let NL=null;try{NL=await pack(a,g.L)}catch(e){ERR('pack',e)}n++;if(!NL)continue;
   const k=sig(g.L),swap=L=>Array.isArray(L)&&sig(L)==k?NL.slice():L;
   for(const id of new Set(g.at.filter(w=>w.id).map(w=>w.id))){const it=IT[id]||{},pt={};
    ['a8','tx'].forEach(f=>{const cur=it[f];if(!Array.isArray(cur))return;let hit=0;const nx=cur.map(q=>q&&Array.isArray(q.L)&&sig(q.L)==k?(hit=1,Object.assign({},q,{L:NL.slice()})):q);if(hit)pt[f]=nx});
    if(Object.keys(pt).length){await putItem(id,pt);DONE++}}
   for(const sid of new Set(g.at.filter(w=>w.st).map(w=>w.st))){const ref=db.collection('styles').doc(sid),fr=await ref.get();if(!fr.exists)continue;const v=fr.data()||{},pt={};
    ['L','M'].forEach(f=>{if(Array.isArray(v[f])&&sig(v[f])==k)pt[f]=NL.slice()});if(Object.keys(pt).length){await ref.update(pt);DONE++}}
   try{R360.sync()}catch(_){}}
 }catch(e){ERR('run',e)}finally{RUN=false}}
window.SP262.run=run;window.SP262.left=async()=>{const db=await claude.use('db');return db?lists((await db.collection('styles').get()).docs).length:-1};
// 25 s after the page opens, then every 4 minutes, a few at a time (each pack takes a few seconds and runs in the background)
setTimeout(()=>run(30),25000);setInterval(()=>run(15),4*60e3);
})();
