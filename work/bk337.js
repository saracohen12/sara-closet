// ===== v337 (Sara 29/10 16:46 "למה התמונות לא עוברות במאגר?" – the Max plan ends, she may move to her other account):
// "💾 גיבוי כל התמונות" in the admin panel: every picture ever uploaded to the closet (assets.list) + all the data, as a few zip files
// of ~120MB that she downloads one by one (a part that failed can be downloaded again). Part 1 also holds data.json (every db collection)
// and assets.json (id, type, size, date). Names inside the zip = asset id + extension, so the ids in the data still match.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v337 '+w+': '+(e&&(e.code||e.message)||e));
const $1=s=>document.querySelector(s);
const PART=120*1024*1024;
const COLS=['items','orders','looks','looks360','styles','cats','bgs','stylehide','stylegrid','days234','settings','plan','credits','feedback','r360','cl302','gpt312','slim272','tell282','wx','shop187','backup83'];
const EXT={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif','image/svg+xml':'svg','application/pdf':'pdf','application/json':'json','text/plain':'txt','text/csv':'csv','text/markdown':'md','video/mp4':'mp4'};
const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc=u=>{let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=CRC[(c^u[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0};
// stored (no compression) zip – pictures are already compressed
function zip(files){const enc=new TextEncoder(),parts=[],cen=[];let off=0;
 for(const f of files){const d=f.data,nm=enc.encode(f.name),c=crc(d);
  const h=new DataView(new ArrayBuffer(30));h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint32(14,c,true);h.setUint32(18,d.length,true);h.setUint32(22,d.length,true);h.setUint16(26,nm.length,true);
  parts.push(h,nm,d);const e=new DataView(new ArrayBuffer(46));e.setUint32(0,0x02014b50,true);e.setUint16(4,20,true);e.setUint16(6,20,true);e.setUint16(8,0x0800,true);e.setUint32(16,c,true);e.setUint32(20,d.length,true);e.setUint32(24,d.length,true);e.setUint16(28,nm.length,true);e.setUint32(42,off,true);
  cen.push(e,nm);off+=30+nm.length+d.length}
 let cl=0;cen.forEach(x=>cl+=x.byteLength);const z=new DataView(new ArrayBuffer(22));z.setUint32(0,0x06054b50,true);z.setUint16(8,files.length,true);z.setUint16(10,files.length,true);z.setUint32(12,cl,true);z.setUint32(16,off,true);
 return new Blob([...parts,...cen,z],{type:'application/zip'})}
const mb=b=>Math.round(b/1048576);
let V=null; // {list, groups:[[asset…]], done:{i:true}}
async function load(){const a=await claude.use('assets');if(!a)throw{message:'אין גישה לתמונות כאן (צריך לפתוח את האתר בחשבון שלך)'};
 const r=await a.list();const list=(r.assets||[]).slice().sort((x,y)=>String(x.createdAt).localeCompare(String(y.createdAt)));
 const groups=[];let g=[],s=0;for(const x of list){if(g.length&&s+x.sizeBytes>PART){groups.push(g);g=[];s=0}g.push(x);s+=x.sizeBytes||0}if(g.length)groups.push(g);
 let done={};try{done=JSON.parse(localStorage.getItem('bk337')||'{}')}catch(_){}
 V={list,groups,usage:r.usage,done}}
async function dataJson(){const out={t:new Date().toISOString(),ver:window.VER||'',cols:{}};const db=await claude.use('db');if(!db)return out;
 for(const c of COLS){try{const sn=await db.collection(c).get();const o={};sn.docs.forEach(d=>{o[d.id]=d.data()});out.cols[c]=o}catch(e){out.cols[c]={_err:String(e&&(e.code||e.message)||e)}}}return out}
async function part(i,btn,st){const g=V.groups[i],files=[];let n=0;const enc=new TextEncoder();
 const q=g.slice();async function worker(){while(q.length){const x=q.shift();let d=null;for(let t=0;t<3&&!d;t++){try{const r=await fetch(x.url||('/_blob/'+x.id));if(r.ok)d=new Uint8Array(await r.arrayBuffer())}catch(_){}}
   if(d)files.push({name:'images/'+x.id+'.'+(EXT[x.contentType]||'bin'),data:d});else files.push({name:'missing/'+x.id+'.txt',data:enc.encode('not downloaded')});
   n++;st.textContent=`מוריד תמונות: ${n} מתוך ${g.length}`}}
 await Promise.all([worker(),worker(),worker(),worker()]);
 if(i==0){st.textContent='אוסף את כל הנתונים…';files.push({name:'data.json',data:enc.encode(JSON.stringify(await dataJson()))});
  files.push({name:'assets.json',data:enc.encode(JSON.stringify(V.list.map(x=>({id:x.id,type:x.contentType,size:x.sizeBytes,t:x.createdAt,part:V.groups.findIndex(gg=>gg.includes(x))+1}))))});
  files.push({name:'README.txt',data:enc.encode('גיבוי הארון של שרה. images/<id> = התמונה שהמזהה שלה מופיע בנתונים. data.json = כל הנתונים מהאתר. assets.json = רשימת כל התמונות ובאיזה חלק כל אחת.\n')})}
 st.textContent='מכין את הקובץ…';const blob=zip(files);const dl=await claude.use('downloads');if(!dl)throw{message:'הורדה לא זמינה כאן. פתחי את האתר ב-Chrome במחשב'};
 st.textContent='שומר…';await dl.save({filename:`closet-backup-${i+1}-of-${V.groups.length}.zip`,data:blob});
 V.done[i]=1;try{localStorage.setItem('bk337',JSON.stringify(V.done))}catch(_){}}
function paint(d){const b=d.querySelector('.bk337b');if(!V){b.innerHTML='<p class="bk337i">טוען את רשימת התמונות…</p>';return}
 const tot=V.list.reduce((s,x)=>s+(x.sizeBytes||0),0);
 b.innerHTML=`<p class="bk337i">${V.list.length} תמונות, ${mb(tot)}MB. הן מחולקות ל-${V.groups.length} קבצים. מורידים כל קובץ בנפרד, עדיף מהמחשב. קובץ 1 כולל גם את כל הנתונים (סימונים, הזמנות, לוקים).</p>
 <div class="bk337l">${V.groups.map((g,i)=>`<button type="button" data-bk337="${i}" class="${V.done[i]?'ok':''}"><b>${V.done[i]?'✓ ':'⬇ '}קובץ ${i+1}</b><small>${g.length} תמונות · ${mb(g.reduce((s,x)=>s+(x.sizeBytes||0),0))}MB${i==0?' + הנתונים':''}</small></button>`).join('')}</div><p class="bk337s" aria-live="polite"></p>`}
let busy=false;
async function open(){let d=$1('#bk337');if(!d){d=document.createElement('dialog');d.id='bk337';d.dir='rtl';d.innerHTML='<div class="bk337h"><h3>💾 גיבוי כל התמונות והנתונים</h3><button type="button" data-bk337x aria-label="סגירה">✕</button></div><div class="bk337b"></div>';document.body.appendChild(d);
  d.addEventListener('click',async e=>{if(e.target.closest('[data-bk337x]')){d.close();return}const b=e.target.closest('[data-bk337]');if(!b||busy)return;busy=true;const st=d.querySelector('.bk337s');d.querySelectorAll('[data-bk337]').forEach(x=>x.disabled=true);
   try{await part(+b.dataset.bk337,b,st);paint(d)}catch(er){ERR('part',er);paint(d);const s2=d.querySelector('.bk337s');if(s2)s2.textContent=er&&er.code=='declined'?'ההורדה בוטלה. אפשר ללחוץ שוב.':'לא הצלחתי: '+(er&&(er.message||er.code)||er)+'. אפשר ללחוץ שוב על אותו קובץ.'}busy=false})}
 d.showModal();paint(d);if(!V){try{await load()}catch(e){ERR('load',e);d.querySelector('.bk337b').innerHTML='<p class="bk337i">'+(e.message||'לא הצלחתי לטעון את רשימת התמונות')+'</p>';return}paint(d)}}
window.BK337={open};
function entry(){try{const p=$1('#ad172 .ad172b');if(p&&!p.querySelector('[data-bk337open]'))p.insertAdjacentHTML('afterbegin','<button type="button" class="bk337e" data-bk337open>💾 גיבוי כל התמונות והנתונים<small>להורדה למחשב, לפני מעבר חשבון</small></button>');
 const e7=$1('#more9 .e77');if(e7&&!e7.querySelector('[data-bk337open]'))e7.insertAdjacentHTML('beforeend','<button type="button" data-bk337open>💾 גיבוי כל התמונות</button>')}catch(e){ERR('entry',e)}}
document.addEventListener('click',e=>{if(e.target.closest('[data-bk337open]')){e.preventDefault();e.stopPropagation();open()}},true);
setInterval(entry,1500);
})();
