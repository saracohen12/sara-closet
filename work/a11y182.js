// v182: נגישות – text size, high contrast and "no movement" for the whole site, from one button next to 🎨 (Sara's upgrade list, 25/10).
// Kept in localStorage 'a11y' ({fs,hc,still}); the old א-/א+ buttons (body[data-fs], 'fs') follow the same size.
(function(){
const H=document.documentElement;
const SIZES=[['רגיל',100],['גדול',112.5],['גדול מאוד',125],['ענק',137.5]];
let A={fs:0,hc:0,still:0};
try{Object.assign(A,JSON.parse(localStorage.getItem('a11y')||'{}'))}catch(_){}
try{const old=+localStorage.getItem('fs');if(!localStorage.getItem('a11y')&&old>0)A.fs=Math.min(3,old)}catch(_){}
function apply(){H.style.fontSize=A.fs?SIZES[A.fs][1]+'%':'';H.dataset.a11yfs=A.fs;
 if(A.hc)H.dataset.hc='1';else delete H.dataset.hc;
 if(A.still)H.dataset.still='1';else delete H.dataset.still;
 if(document.body)document.body.dataset.fs=Math.min(2,A.fs);
 try{localStorage.setItem('a11y',JSON.stringify(A));localStorage.setItem('fs',String(Math.min(2,A.fs)))}catch(_){}
 if(A.still){try{localStorage.setItem('h181spin','0')}catch(_){}document.querySelectorAll('.z-pp[aria-pressed=false]').forEach(b=>b.click())}
 paint()}
let dlg=null;
function open(){if(!dlg){dlg=document.createElement('dialog');dlg.id='a11y';dlg.dir='rtl';dlg.setAttribute('aria-labelledby','a11yh');
  dlg.innerHTML=`<div class="ay"><div class="ayh"><h2 id="a11yh">נגישות</h2><button type="button" class="ayx" aria-label="סגירה">✕</button></div>
  <h3>גודל הטקסט</h3><div class="ays" role="radiogroup" aria-label="גודל הטקסט">${SIZES.map(([n,p],i)=>`<button type="button" role="radio" data-fs="${i}"><b style="font-size:${p/100}rem">א</b><span>${n}</span></button>`).join('')}</div>
  <label class="ayt"><span><b>ניגודיות גבוהה</b><small>טקסט כהה יותר, מסגרות ברורות, בלי שקיפות</small></span><input type="checkbox" class="ayhc" role="switch"></label>
  <label class="ayt"><span><b>בלי תנועה</b><small>האווטאר לא מסתובב לבד, בלי אנימציות</small></span><input type="checkbox" class="ayst" role="switch"></label>
  <p class="ayp">דוגמה: <b>מה לובשים היום?</b> חצאית ג׳ינס מקסי, חולצה כחולה עם פרחים.</p>
  <div class="ayb"><button type="button" class="ayr">חזרה לרגיל</button><button type="button" class="ayok">✓ סיום</button></div></div>`;
  document.body.appendChild(dlg);
  dlg.addEventListener('click',e=>{if(e.target===dlg)return dlg.close();const b=e.target.closest('button');if(!b)return;
   if(b.dataset.fs!=null){A.fs=+b.dataset.fs;apply()}
   else if(b.classList.contains('ayr')){A={fs:0,hc:0,still:0};apply()}
   else if(b.classList.contains('ayx')||b.classList.contains('ayok'))dlg.close()});
  dlg.querySelector('.ayhc').onchange=e=>{A.hc=e.target.checked?1:0;apply()};
  dlg.querySelector('.ayst').onchange=e=>{A.still=e.target.checked?1:0;apply()}}
 paint();if(!dlg.open)dlg.showModal()}
function paint(){if(!dlg)return;dlg.querySelectorAll('[data-fs]').forEach(b=>b.setAttribute('aria-checked',+b.dataset.fs==A.fs));
 dlg.querySelector('.ayhc').checked=!!A.hc;dlg.querySelector('.ayst').checked=!!A.still}
function btn(){const act=document.querySelector('#top .h9act');if(!act)return setTimeout(btn,400);
 if(act.querySelector('#a11yb'))return;const t=act.querySelector('#d71t');
 const b=document.createElement('button');b.type='button';b.id='a11yb';b.setAttribute('aria-label','נגישות: גודל טקסט וניגודיות');b.title='נגישות';b.innerHTML='<span aria-hidden="true">Aא</span>';
 b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();open()});
 if(t)t.after(b);else act.prepend(b)}
// the old א-/א+ buttons: same steps, same storage
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#fsm,#fsp');if(!b)return;setTimeout(()=>{A.fs=Math.max(0,Math.min(3,A.fs+(b.id=='fsp'?1:-1)));apply()},0)},true);
apply();btn();
window.A11Y={open,get:()=>Object.assign({},A)};
})();
