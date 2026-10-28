// v307 (Sara 28/10 16:19 "בגד שעלה לאווטאר ויצא טוב – נשאיר רק את התמונה הראשית שאני העליתי, ואת השאר אני לא צריכה, זה סתם תופס מקום"):
// once a day, every item that is on the 360 avatar (all 8 angles, a8) for at least 3 days and has a main photo she uploaded (IT.img) keeps only that photo:
// the extra photos (pics: back/side…) and the older versions (imgs history, raw originals) leave the item and their files are deleted,
// unless something else on the site still uses them. The shop's small order picture is part of the site and takes no space, so it is not touched.
// A set (sets) is skipped: its pieces may still need the photos. Last run: db cl302/keep307 {t, items, n, bad}.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v307 '+w+': '+(e&&(e.code||e.message)||e));
const WAIT=3*864e5,HEX=/\b[0-9a-f]{32}\b/g,toast_=m=>(window.toast||(()=>{}))(m);
const day=()=>new Date().toISOString().slice(0,10);
const cat=id=>{try{return curCat(id)}catch(_){return (D[id]||{}).cat||''}};
function ready(){try{return window.R360&&R360.ready?new Set(R360.ready()||[]):null}catch(_){return null}}
function done(id,rd){const i=IT[id]||{},a=i.a8;if(!i.img||!Array.isArray(a)||!a.length)return false;
 if(!a.some(e=>e&&Array.isArray(e.L)&&e.L.filter(Boolean).length>=8))return false;
 const t=Math.max(...a.map(e=>+(e&&e.t)||0));if(!t||Date.now()-t<WAIT)return false;
 if(rd&&!rd.has(id))return false;
 return !(D[id]||{}).part&&cat(id)!='sets'}
function extras(id){const i=IT[id]||{},x=new Set();(i.pics||[]).forEach(p=>p&&p.id&&x.add(p.id));(i.imgs||[]).forEach(p=>p&&p.id&&x.add(p.id));x.delete(i.img);return [...x]}
const cands=()=>{const rd=ready();return Object.keys((typeof IT=='object'&&IT)||{}).filter(id=>Object.prototype.hasOwnProperty.call(D,id)&&done(id,rd)&&extras(id).length)};
let RUN=false;
async function run(force){if(RUN||typeof IT!='object'||!IT||typeof putItem!='function')return null;
 try{if(!force&&localStorage.getItem('keep307')==day())return null}catch(_){}
 const a=await claude.use('assets'),db=await claude.use('db');if(!a||!db)return null;   // only her (an editor) can delete files
 const ids=cands();try{localStorage.setItem('keep307',day())}catch(_){}if(!ids.length)return {items:0,n:0};
 RUN=true;let n=0,bad=0;const drop=new Set();
 try{for(const id of ids){const i=IT[id];extras(id).forEach(h=>drop.add(h));
   try{await putItem(id,{pics:[],imgs:(i.imgs||[]).filter(p=>p&&p.id==i.img)})}catch(e){ERR('put',e);extras(id).forEach(h=>drop.delete(h))}}
  // still used anywhere? every item (after the change) and the other collections except the backups
  const used=new Set();const add=s=>(String(s).match(HEX)||[]).forEach(h=>used.add(h));
  try{add(JSON.stringify(IT))}catch(_){}
  for(const c of ['styles','r360','looks360','looks','days234','shop187','feedback','bgs','settings','plan','tell282']){try{const sn=await db.collection(c).limit(1000).get();sn.docs.forEach(d=>{try{add(JSON.stringify(d.data()))}catch(_){}})}catch(_){}}
  for(const h of drop){if(used.has(h))continue;for(let t=0;t<4;t++){try{await a.delete(h);n++;break}catch(e){if(e&&(e.code=='rate_limited'||e.code=='store_unavailable')){await new Promise(q=>setTimeout(q,1500*(t+1)));continue}if(e&&e.code=='not_found'){n++;break}bad++;ERR('del',e);break}}}}
 finally{RUN=false}
 try{await db.collection('cl302').doc('keep307').set({t:Date.now(),items:ids.length,n,bad})}catch(e){ERR('log',e)}
 if(n)toast_(`🧹 ${ids.length==1?'בגד אחד מוכן':ids.length+' בגדים מוכנים'} על האווטאר: השארתי רק את התמונה הראשית, ופיניתי ${n} תמונות`);
 try{window.clean262b&&clean262b()}catch(_){}
 return {items:ids.length,n,bad}}
setTimeout(()=>run().catch(e=>{RUN=false;ERR('run',e)}),90000);
window.KEEP307={run,cands,extras};
})();
