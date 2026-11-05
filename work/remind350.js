// v350 return reminders (Sara 4/11: "התראות – נשארו 3 ימים להחזיר את X"):
//  • a card at the top of the home: what she marked "להחזיר" and has not sent yet, whose last return day is within 7 days (closest first) –
//    a tap opens the returns screen; plus items NOT marked whose window closes within 3 days ("עוד יכולה להחזיר")
//  • once a day a short note when she opens the site
//  • "🔔 גם התראה בטלפון": asks the phone once; when allowed, a system notification once a day (when the page is open – a page cannot wake the phone by itself)
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v350rm '+w+': '+(e&&e.message||e));
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const I=id=>(typeof IT=='object'&&IT&&IT[id])||{};
const LS=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(_){return null}};
const today=()=>{const d=new Date();return new Date(d.getFullYear(),d.getMonth(),d.getDate())};
const left=s=>{const m=String(s||'').match(/^(\d{4})-(\d\d)-(\d\d)/);if(!m)return null;return Math.round((new Date(+m[1],+m[2]-1,+m[3])-today())/864e5)};
const nm=id=>{const x=D[id]||{};return String(I(id).nm||I(id).tname||x.short||x.full||id).replace(/^[A-Za-z0-9&'.\-\s]+(?=[֐-׿])/,'').split(/[,،]/)[0].slice(0,42)};
const days=n=>n<=0?'היום – היום האחרון':n==1?'נשאר יום אחד':n==2?'נשארו יומיים':`נשארו ${n} ימים`;
function list(){const ids=Object.keys(typeof D=='object'&&D||{});const out=[],may=[];
 ids.forEach(id=>{const x=D[id],i=I(id);if(!x||!x.rdl||i.gen||i.oos||i.refunded||i.rnr||i.s=='give')return;const n=left(x.rdl);if(n==null||n<0)return;
  if(i.s=='ret'&&!i.rsent){if(n<=7)out.push([id,n])}
  else if(!i.s&&!i.kept&&i.got=='y'&&n<=3)may.push([id,n])});
 out.sort((a,b)=>a[1]-b[1]);may.sort((a,b)=>a[1]-b[1]);return {out,may}}
function card(){try{const s=document.getElementById('h180');if(!s)return;const {out,may}=list();let c=document.getElementById('rm350');
 if(!out.length&&!may.length){if(c)c.remove();return}
 if(!c){c=document.createElement('button');c.type='button';c.id='rm350';c.addEventListener('click',e=>{if(e.target.closest('.rm350n'))return ask();try{openHub('money')}catch(_){try{openOrders123()}catch(_){}}});
  const anchor=s.querySelector('.ib334b')||s.querySelector('.wx332b');if(anchor)anchor.after(c);else s.prepend(c)}
 const f=out[0]||may[0],more=out.length?out.length-1:may.length-1,also=out.length&&may.length?may.length:0;   // v355: "ועוד" counts the same kind only
 const h=`<i aria-hidden="true">⏰</i><span><b>${out.length?days(f[1])+' להחזיר':days(f[1])+' – עוד אפשר להחזיר'}</b><small>${es(nm(f[0]))}${more>0?` · ועוד ${more}`:''}${also?` · ועוד ${also} שאפשר להחזיר`:''}</small></span>${('Notification' in window)&&Notification.permission=='default'&&!LS('rm350ask')?'<em class="rm350n" role="button" tabindex="0">🔔 גם התראה</em>':''}<em aria-hidden="true">‹</em>`;
 if(c.innerHTML!=h)c.innerHTML=h;c.classList.toggle('urgent',!!out.length&&f[1]<=3);
 c.setAttribute('aria-label',(out.length?days(f[1])+' להחזיר את ':'עוד אפשר להחזיר את ')+nm(f[0])+(more>0?' ועוד '+more:'')+'. לפתוח את ההחזרות');
 daily(out,may)}catch(e){ERR('card',e)}}
function daily(out,may){const k=today().toISOString().slice(0,10);if(LS('rm350d')==k||!out.length)return;LS('rm350d',k);
 const f=out[0],t=`⏰ ${days(f[1])} להחזיר את ${nm(f[0])}${out.length>1?` (ועוד ${out.length-1})`:''}`;
 setTimeout(()=>{try{(window.toast||(()=>{}))(t)}catch(_){}},2500);
 try{if('Notification' in window&&Notification.permission=='granted')new Notification('הארון של שרה',{body:t.replace('⏰ ',''),tag:'rm350',lang:'he',dir:'rtl'})}catch(_){}}
function ask(){LS('rm350ask','1');try{if(!('Notification' in window))return;Notification.requestPermission().then(p=>{(window.toast||(()=>{}))(p=='granted'?'🔔 אזכיר גם בהתראה':'בסדר – התזכורת תופיע כאן בדף הבית');card()}).catch(()=>card())}catch(_){card()}}
setTimeout(card,3000);setInterval(()=>{if(!document.hidden)card()},20000);
window.REMIND350={list,card};
})();
