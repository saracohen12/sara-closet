// v300: errors in Sara's own browser come to me without her reporting them. A 💬 report showed that the daily backup had failed for a day
// with nobody seeing it, and errlog290() (called on save failures since v290) was never defined. Now every new error line in window.ERRS (the page already
// puts uncaught errors there) is written once a day (same text = one row with a count) to db 'errlog': row id = day + short hash, fields
// t, day, ver, msg, n, w (screen width), tab, ua. At most 30 rows a day from one browser, sent quietly every 40 s and when the page is hidden.
(function(){
const day=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const hash=s=>{let h=5381;for(let i=0;i<s.length;i++)h=(h*33^s.charCodeAt(i))>>>0;return h.toString(36)};
const norm=s=>String(s).replace(/\b[0-9a-f]{32}\b/g,'#').replace(/\d{4,}/g,'#').slice(0,300);
let Q={},sent={},seen=0;
try{const o=JSON.parse(localStorage.getItem('err300')||'{}');if(o.d==day())sent=o.s||{}}catch(_){}
const keep=()=>{try{localStorage.setItem('err300',JSON.stringify({d:day(),s:sent}))}catch(_){}};
function add(msg){const m=norm(msg);if(!m)return;const k=hash(m);(Q[k]=Q[k]||{msg:m,n:0}).n++}
window.errlog290=(w,e,id)=>add('v290 '+w+': '+(e&&(e.code||e.message)||e)+(id?' ['+id+']':''));
async function flush(){const E=window.ERRS||[];for(;seen<E.length;seen++)add(E[seen]);const ks=Object.keys(Q);if(!ks.length)return;
 let db=null;try{db=await claude.use('db')}catch(_){}if(!db)return;const d=day(),now=Date.now();
 const tab=(document.querySelector('[aria-current="page"]')||{}).textContent||'';
 for(const k of ks){const x=Q[k],p=sent[k]||{n:0,t:0};if(!p.n&&Object.keys(sent).length>=30){delete Q[k];continue}
  if(p.n&&now-p.t<6e5)continue;   // the same error again: its count is written at most every 10 minutes
  delete Q[k];try{await db.collection('errlog').doc(d+'_'+k).set({t:now,day:d,ver:(document.getElementById('ver')||{}).textContent||'',msg:x.msg,n:p.n+x.n,w:innerWidth,tab:String(tab).trim().slice(0,30),ua:navigator.userAgent.slice(0,120)});sent[k]={n:p.n+x.n,t:now}}catch(_){}}
 keep()}
setTimeout(flush,15000);setInterval(flush,40000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState=='hidden')flush()});
window.ERR300={flush,Q:()=>Q};
})();
