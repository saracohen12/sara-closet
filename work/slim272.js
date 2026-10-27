// ===== v272 (Sara 27/10 23:14 "יש גם מגבלה של שטח … תמונות ששוקלות פחות, איכותיות"): the store holds 1 GB and GPT's 8-angle pictures come as PNG of ~1.8 MB.
// Saved as WebP (quality .95, same size in pixels) they weigh ~0.2 MB – the cut and the avatar look the same (checked on 3 sheets). Only the copy that is
// STORED gets smaller; the first cut is made from her original file. Small files, and anything that doesn't come out at least 40% smaller, are kept as they are.
window.slim272=async function(f){try{if(!(f instanceof Blob)||f.size<350e3||!/^image\/(png|jpeg|webp|bmp)$/.test(f.type||''))return f;
 const bm=await createImageBitmap(f),k=Math.min(1,2400/Math.max(bm.width,bm.height)),c=document.createElement('canvas');c.width=Math.round(bm.width*k);c.height=Math.round(bm.height*k);
 c.getContext('2d').drawImage(bm,0,0,c.width,c.height);try{bm.close()}catch(_){}
 const b=await new Promise(r=>c.toBlob(r,'image/webp',.95));if(!b||b.type!='image/webp'||b.size>f.size*.6)return f;
 const n=String(f.name||'pic').replace(/\.[a-z0-9]+$/i,'')+'.webp';try{return new File([b],n,{type:'image/webp',lastModified:f.lastModified||Date.now()})}catch(_){return b}}catch(_){return f}};
// v273: the GPT pictures already stored (PNG, ~1.8 MB each) are made light the same way, a few at a time in the background:
// the light copy is saved, checked (same width and height), and only then the item / style is switched to it (re-read from the db first).
// The old PNG is left for "🧹 לפנות מקום" (the delete is always her press); old→new is written to db 'slim272' so the backups can be renamed too.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v273 '+w+': '+(e&&(e.code||e.message)||e));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const HEX=/^[0-9a-f]{32}$/;
const lsG=k=>{try{return localStorage.getItem(k)}catch(_){return null}},lsS=(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}};
const SKIP=new Set(JSON.parse(lsG('slim273s')||'[]'));const skip=id=>{SKIP.add(id);lsS('slim273s',JSON.stringify([...SKIP].slice(-400)))};
const KEYS=['a8','a8up','tx','whole'];
// the sheet ids an item / style points at
function srcs(o,out){if(!o||typeof o!='object')return;if(Array.isArray(o))return o.forEach(x=>srcs(x,out));
 for(const k of ['src','a'])if(typeof o[k]=='string'&&HEX.test(o[k]))out.add(o[k]);for(const k in o)if(o[k]&&typeof o[k]=='object')srcs(o[k],out)}
const swap=(v,o,n)=>JSON.parse(JSON.stringify(v).split(o).join(n));
const busy=()=>document.hidden||document.querySelector('dialog[open]#g250,dialog[open]#tie202,dialog[open]#fix237,dialog[open]#cl262,dialog[open]#sty199')||(typeof BUSY!='undefined'&&BUSY);
let RUN=false,DONE=false;
async function run(max){if(RUN||DONE)return;RUN=true;let n=0;try{const a=await claude.use('assets'),db=await claude.use('db');if(!a||!db||typeof IT!='object'||!IT||typeof putItem!='function')return;
 const L=await a.list(),A={};for(const x of L.assets)A[x.id]=x;const u=L.usage||{};if(u.maxFiles&&u.files>=u.maxFiles-2)return;   // no room for even one light copy: 🧹 first
 const big=id=>A[id]&&/^image\/(png|jpeg|bmp)$/.test(A[id].contentType||'')&&(A[id].sizeBytes||0)>600e3&&!SKIP.has(id);
 const jobs=[];for(const id in IT){const it=IT[id];if(!it)continue;const S=new Set();for(const k of KEYS)srcs(it[k],S);S.forEach(s=>{if(big(s))jobs.push({col:'items',id,s})})}
 try{const sn=await db.collection('styles').limit(1000).get();sn.docs.forEach(d=>{const v=d.data()||{};if(typeof v.src=='string'&&big(v.src))jobs.push({col:'styles',id:d.id,s:v.src})})}catch(e){ERR('styles',e)}
 if(!jobs.length){DONE=true;return}
 const seen=new Set();for(const j of jobs){if(n>=max)break;if(seen.has(j.s)){continue}seen.add(j.s);while(busy())await sleep(4000);
  try{const r=await fetch('/_blob/'+j.s);if(!r.ok)throw new Error('http '+r.status);const f=await r.blob(),bm0=await createImageBitmap(f),W=bm0.width,H=bm0.height;try{bm0.close()}catch(_){}
   const g=await window.slim272(new File([f],'sheet.png',{type:f.type||'image/png'}));if(g===f||!g||g.size>=f.size*.6||W>2400||H>2400){skip(j.s);continue}
   const up=await a.upload(g);let ok=false;try{const b2=await (await fetch('/_blob/'+up.id)).blob(),bm=await createImageBitmap(b2);ok=bm.width==W&&bm.height==H;try{bm.close()}catch(_){}}catch(_){}
   if(!ok){try{await a.delete(up.id)}catch(_){}skip(j.s);continue}
   // every place that points at the old picture, re-read fresh
   let used=0;for(const x of jobs.filter(y=>y.s==j.s)){
    if(x.col=='items'){const d=await db.collection('items').doc(x.id).get();const v=d&&d.exists?d.data():null;if(!v)continue;const patch={};
     for(const k of KEYS)if(v[k]!=null&&JSON.stringify(v[k]).includes(j.s))patch[k]=swap(v[k],j.s,up.id);if(!Object.keys(patch).length)continue;
     Object.assign(IT[x.id]||{},v);await putItem(x.id,patch);used++}
    else{const ref=db.collection('styles').doc(x.id),d=await ref.get();const v=d&&d.exists?d.data():null;if(!v||v.src!=j.s)continue;await ref.update({src:up.id});used++}}
   if(!used){try{await a.delete(up.id)}catch(_){}continue}
   try{await db.collection('slim272').doc(j.s).set({n:up.id,t:Date.now(),from:A[j.s].sizeBytes||0,to:g.size})}catch(e){ERR('map',e)}n++}
  catch(e){ERR('one',e);if(e&&/quota|full|limit/i.test(String(e.code||e.message)))break;skip(j.s)}
  await sleep(1500)}}
 catch(e){ERR('run',e)}finally{RUN=false}}
window.SLIM273={run};setTimeout(()=>run(12).catch(()=>{}),90e3);setInterval(()=>run(12).catch(()=>{}),6*60e3);
})();
