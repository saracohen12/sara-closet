// v283 redesign, screen 2 – the closet tab (Sara 28/10 10:19 "בתוך הארון שיהיה יותר קל לי, יותר שימושי, להוסיף כפתורים").
// Top: 8 clear buttons for what she does in the closet; a red line when doubles must go back soon; then the sticky search bar with
// her categories as one strip of pictures. The week, "long time not worn" and the urgent doubles open in a sheet instead of filling the page.
// Every button uses the site's own handlers (data-h9 / data-h9cat / data-sel83), so nothing is done twice.
(function(){
const H=document.documentElement,B=document.body;
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v283 '+w+': '+(e&&e.message||e));
const on=()=>H.dataset.d180=='z50';
const top=document.getElementById('top'),ctrl=document.querySelector('.ctrl');if(!top||!ctrl)return;

// ---------- a sheet that borrows a block of the page (and gives it back when closed) ----------
let SH=null,BACK=null;
function sheet(sel,title){const el=document.querySelector(sel);if(!el){(window.toast||(()=>{}))('אין כאן כלום כרגע');return}
 if(!SH){SH=document.createElement('dialog');SH.id='z6s';SH.dir='rtl';SH.setAttribute('aria-labelledby','z6st');B.appendChild(SH);
  SH.innerHTML='<div class="z6sh"><h2 id="z6st"></h2><button type="button" class="z6sx" aria-label="סגירה">✕</button></div><div class="z6sb"></div>';
  SH.addEventListener('click',e=>{if(e.target===SH||e.target.closest('.z6sx'))SH.close()});
  SH.addEventListener('close',()=>{if(BACK){const [n,p,nx]=BACK;try{nx&&nx.parentNode===p?p.insertBefore(n,nx):p.appendChild(n)}catch(_){}BACK=null}})}
 if(SH.open)SH.close();BACK=[el,el.parentNode,el.nextSibling];SH.querySelector('#z6st').textContent=title;SH.querySelector('.z6sb').appendChild(el);SH.showModal()}

// ---------- the 8 buttons ----------
const Q=[
 ['fav','♥','מועדפים','data-h9="fav"'],
 ['ret','⏰','להחזיר בקרוב','data-h9="ret"'],
 ['week','📅','מה לבשתי השבוע',''],
 ['old','⌛','מזמן לא לבשתי',''],
 ['rnd','🎲','תפתיעי אותי','data-h9="rnd"'],
 ['sel','☑','לבחור כמה',''],
 ['dup','👯','כפולים',''],
 ['num','📊','מספרים וסיכומים','data-h9="more"']];
const box=document.createElement('div');box.id='z6';box.setAttribute('role','region');box.setAttribute('aria-label','כלים לארון');
box.innerHTML=`<div class="z6q">${Q.map(([k,i,n,a])=>`<button type="button" data-z6="${k}" ${a}><i aria-hidden="true">${i}</i><span>${n}</span></button>`).join('')}</div>
 <button type="button" class="z6u" data-z6="urg" hidden></button>`;
const bar=top.querySelector('.h9bar');(bar||top.firstChild).after(box);
box.addEventListener('click',e=>{const b=e.target.closest('[data-z6]');if(!b)return;const k=b.dataset.z6;
 try{if(k=='week')sheet('#wk83','השבוע שלי');else if(k=='old')sheet('#old79','מזמן לא לבשתי');else if(k=='urg')sheet('#urgent','דחוף להחזיר');
  else if(k=='sel'){const s=document.querySelector('[data-sel83]');if(s)s.click();else (window.toast||(()=>{}))('הבחירה המרובה לא זמינה כאן')}
  else if(k=='dup'){if(window.openDups89)openDups89()}}catch(err){ERR('btn',err)}});

// ---------- the category strip, in the sticky bar ----------
const strip=document.createElement('div');strip.className='z6c';strip.setAttribute('role','group');strip.setAttribute('aria-label','הקטגוריות שלי');
const wrap=ctrl.querySelector('.wrap')||ctrl;wrap.prepend(strip);
function paintStrip(){try{const src=[...top.querySelectorAll('.h9cats [data-h9cat]')];if(!src.length)return;
  const vis=[...document.querySelectorAll('.wrap>section[id]')].filter(s=>s.offsetHeight>0&&s.querySelector('.card'));const one=vis.length==1?'#'+vis[0].id:'';
  const key=src.map(b=>b.dataset.h9cat+':'+(((b.querySelector('img')||{}).dataset||{}).th||'')).join(',')+'|'+one;   // v316: a new category picture repaints the stripif(strip.dataset.k==key){strip.querySelectorAll('img[data-th]').forEach(i=>{const o=top.querySelector(`.h9cats img[data-th="${i.dataset.th}"]`);if(o&&o.src!=i.src)i.src=o.src});return}strip.dataset.k=key;
  strip.innerHTML=`<button type="button" data-h9="all" aria-pressed="${!one}" class="z6all"><span class="z6ci">הכל</span><b>הכל</b></button>`+src.map(b=>{const im=b.querySelector('img'),nm=((b.querySelector('b')||b).textContent||'').trim(),cn=((b.querySelector('small')||{}).textContent||'').trim();
   return `<button type="button" data-h9cat="${b.dataset.h9cat}" aria-pressed="${one==b.dataset.h9cat}"><span class="z6ci">${im?`<img alt="" src="${im.getAttribute('src')||''}"${im.dataset.th?` data-th="${im.dataset.th}"`:''}>`:''}</span><b>${nm}</b>${cn?`<small>${cn}</small>`:''}</button>`}).join('');
  const a=strip.querySelector('[aria-pressed=true]');if(a&&one)a.scrollIntoView({block:'nearest',inline:'center'})}catch(e){ERR('strip',e)}}
// the urgent line: doubles whose return time ends soon
function paintUrg(){try{const n=document.querySelectorAll('#urgent .mini').length,u=box.querySelector('.z6u');u.hidden=!n;if(n)u.innerHTML=`<span aria-hidden="true">⚠</span> ${n} כפולים שזמן ההחזרה שלהם נגמר בקרוב <b>›</b>`;
  const f=box.querySelector('[data-z6=fav]'),r=box.querySelector('[data-z6=ret]'),fl=document.getElementById('flf'),so=document.getElementById('sort');
  if(f&&fl)f.setAttribute('aria-pressed',fl.value=='fav');if(r&&so)r.setAttribute('aria-pressed',so.value=='ret')}catch(e){ERR('urg',e)}}
const paint=()=>{if(!on())return;paintStrip();paintUrg()};
// when the bar is stuck at the top while scrolling, the strip gets small (pictures only) so the clothes have room
addEventListener('scroll',()=>{const st=ctrl.getBoundingClientRect().top<=1&&scrollY>200;if(ctrl.classList.contains('z6min')!=st)ctrl.classList.toggle('z6min',st)},{passive:true});
[800,2500,6000].forEach(t=>setTimeout(paint,t));setInterval(()=>{if(!document.hidden&&B.dataset.z50=='closet')paint()},1500);
document.addEventListener('change',()=>setTimeout(paint,80),true);document.addEventListener('click',()=>setTimeout(paint,250),true);
window.Z283={sheet,paint};
})();
