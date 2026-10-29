/* v334 (Sara 29/10 13:27 "יצאתי מהמסך ... אני פשוט לא מוצאת איפה להעלות אותם ... במסך הראשי ... לפתוח תיבה, ואז זה יפתח לי את התיבה של כל דבר שהורדתי קובץ
   בשביל להעלות את זה חזרה מ-GPT, שיהיה לי קל למצוא את זה"): one inbox "📥 מחכה ל-GPT" on the home screen with every ZIP she downloaded whose pictures
   didn't come back yet – several covers at once (MC333), a cover's ties (txw), several products (gpt312 history) and one product (IT.g250) – each with
   "📤 להעלות מה שחזר" straight from the row, "פתיחה" (the same screen as before) and ✕ (not waiting any more). */
;(function(){
const ERR=(w,e)=>{try{(window.ERRS=window.ERRS||[]).push('v334 '+w+': '+(e&&e.message||e))}catch(_){}};
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=m=>(window.toast||(()=>{}))(m);
const R=()=>window.R360;
const nm=id=>{try{return R().nm(id)}catch(_){return (D[id]||{}).short||''}};
const ph=id=>{try{return R().ph(id)}catch(_){return ''}};
const ready=id=>{try{return !!R().isReady(id)}catch(_){return false}};
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
const live=id=>{const t=it(id);return D[id]&&!(t.s=='give'||t.s=='ret'||t.gen||t.out||t.oos)};
const DAYS=21,XK='inbox334x';
const gone=()=>{try{return JSON.parse(localStorage.getItem(XK)||'{}')||{}}catch(_){return {}}};
const hide=k=>{try{const g=gone();g[k]=Date.now();localStorage.setItem(XK,JSON.stringify(g))}catch(_){}};
const when=t=>{if(!t)return '';const d=new Date(+t),n=new Date(),dd=Math.round((new Date(n.toDateString())-new Date(d.toDateString()))/864e5),hm=d.toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'});
 return dd<=0?'היום '+hm:dd==1?'אתמול '+hm:d.toLocaleDateString('he-IL',{day:'numeric',month:'numeric'})};
const short=id=>nm(id).split(' ').slice(0,4).join(' ');
let HC=null,HT=0;
async function hist(){if(HC&&Date.now()-HT<60e3)return HC;try{HC=window.g334?await g334.hist():[]}catch(e){ERR('hist',e);HC=HC||[]}HT=Date.now();return HC}
// everything that waits, newest first
async function rows(){const L=[],x=gone(),old=Date.now()-DAYS*864e5,seen=new Set();
 // 1. several covers at once
 try{const w=window.MC333&&MC333.wait();if(w&&w.ids.length&&!x['mc'+w.b])L.push({k:'mc'+w.b,t:+w.b||0,ic:'🧕',ti:`${w.ids.length} כיסויים יחד`,sub:w.ids.map(short).join(' · '),ids:w.ids,
  up:()=>MC333.up(),op:()=>MC333.open()});if(w)w.ids.forEach(id=>seen.add('tie'+id))}catch(e){ERR('mc',e)}
 // 2. a cover's own ties waiting (one cover's ZIP)
 try{for(const id of Object.keys(D)){const t=it(id),W=Array.isArray(t.txw)?t.txw.filter(v=>v&&v.p):[];if(!W.length||seen.has('tie'+id)||!live(id))continue;const k='tie'+id+':'+W.map(v=>v.p).join(',');if(x[k])continue;
  L.push({k,t:0,ic:'🧕',ti:`${W.length} קשירות ל${short(id)}`,sub:W.map(v=>v.n).join(' · '),ids:[id],up:()=>window.TIE202up&&TIE202up(id),op:()=>window.tie202open&&tie202open(id)})}}catch(e){ERR('tie',e)}
 // 3. several products in one ZIP
 const inH=new Set();
 try{for(const h of await hist()){const ids=(h.ids||[]).filter(k=>live(k)),wait=ids.filter(k=>!ready(k));ids.forEach(k=>inH.add(k));if(!wait.length||(h.t||0)<old)continue;const k='h'+h.t+':'+ids.join(',');if(x[k])continue;
  L.push({k,t:h.t||0,ic:'📦',ti:`${ids.length} מוצרים יחד`+(wait.length<ids.length?` · עוד ${wait.length} מחכים`:''),sub:ids.map(short).join(' · '),ids,up:()=>g334.up(ids),op:()=>g334.open(h)})}}catch(e){ERR('h',e)}
 // 4. one product
 try{for(const id of Object.keys(D)){const t=it(id);if(!t.g250||t.g250<old||inH.has(id)||ready(id)||!live(id))continue;const k='g'+id+':'+t.g250;if(x[k])continue;
  L.push({k,t:t.g250,ic:'👗',ti:short(id),sub:'מוצר אחד',ids:[id],up:()=>g334.up([id]),op:()=>window.g250open&&g250open(id)})}}catch(e){ERR('g',e)}
 return L.sort((a,b)=>(b.t||0)-(a.t||0))}
let DL=null,CUR=[];
function dlg(){if(DL)return DL;DL=document.createElement('dialog');DL.id='ib334';DL.dir='rtl';DL.setAttribute('aria-labelledby','ib334t');document.body.appendChild(DL);
 DL.addEventListener('click',e=>{if(e.target===DL)return DL.close();const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.ibx!=null)return DL.close();
  const r=CUR[+(d.ibup??d.ibop??d.ibno)];if(!r)return;
  if(d.ibup!=null){DL.close();try{r.up()}catch(er){ERR('up',er);toast_('לא הצלחתי לפתוח. לנסות שוב')}return}
  if(d.ibop!=null){DL.close();try{r.op()}catch(er){ERR('op',er)}return}
  if(d.ibno!=null){if(typeof sure=='function'&&!sure(b,'בטוח? לחצי שוב'))return;hide(r.k);paint();home()}});
 return DL}
async function paint(){const d=dlg();CUR=await rows();
 d.innerHTML=`<div class="ibw"><div class="ibh"><h2 id="ib334t">📥 מחכה ל-GPT</h2><button type="button" class="ibx" data-ibx aria-label="סגירה">✕</button></div>
  <p class="ibp">כל מה שהורדת לו ZIP, ועוד לא העלית את מה ש-GPT החזיר. <b>📤 להעלות</b> פותח מיד את בחירת התמונות.</p>
  ${CUR.length?`<ul class="ibl">${CUR.map((r,i)=>`<li class="ibr"><div class="ibt">${r.ids.slice(0,6).map(id=>`<img alt="" loading="lazy" src="${es(ph(id))}">`).join('')}${r.ids.length>6?`<span>+${r.ids.length-6}</span>`:''}</div>
   <div class="ibm"><b>${r.ic} ${es(r.ti)}</b><small>${r.t?'הורדת '+es(when(r.t))+' · ':''}${es(r.sub)}</small></div>
   <div class="iba"><button type="button" class="pri" data-ibup="${i}">📤 להעלות מה שחזר</button><button type="button" data-ibop="${i}">פתיחה</button><button type="button" data-ibno="${i}" aria-label="לא מחכה יותר: ${es(r.ti)}">✕</button></div></li>`).join('')}</ul>`
   :'<p class="ibe">✓ אין כרגע שום דבר שמחכה ל-GPT</p>'}</div>`}
async function open(){const d=dlg();d.innerHTML='<div class="ibw"><p class="ibp">טוענת…</p></div>';if(!d.open)d.showModal();await paint()}
// ---------- the home screen: a bar under the title, only when something waits ----------
let HN=-1;
async function home(){try{const c=document.querySelector('#h180 .z-txt');if(!c)return;let b=document.querySelector('.ib334b');const L=await rows(),n=L.length;
  if(!n){if(b)b.hidden=true;HN=0;return}
  if(!b){b=document.createElement('button');b.type='button';b.className='ib334b';b.addEventListener('click',open)}
  if(b.parentNode!=c){const w=c.querySelector('.wx332b');if(w)w.after(b);else c.append(b)}
  b.hidden=false;if(n==HN&&b.innerHTML)return;HN=n;
  b.innerHTML=`<span class="ibbi" aria-hidden="true">📥</span><span><b>מחכה ל-GPT <i>${n}</i></b><small>להעלות את מה ש-GPT החזיר: ${es(L[0].ti)}${n>1?' ועוד':''}</small></span><span class="ibbg" aria-hidden="true">›</span>`}catch(e){ERR('home',e)}}
;[1500,4000,9000].forEach(t=>setTimeout(home,t));
setInterval(()=>{if(!document.hidden)home()},8000);
window.IB334={open,rows,home};
})();
