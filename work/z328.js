// v328 (Sara 29/10 00:51 "תבנה לי את זה כמו דף אינטרנט, כמו אתר, שיש לזה קטגוריות, ואז כאילו יש לי סרגל למעלה, ואז זה פותח לי כאילו דף אחר, ולא לגלגל את זה"):
// the closet tab works like a shop site. A menu bar stays at the top (הארון שלי · שמלות · חצאיות … · עוד ▾). The first page shows the categories as big pictures.
// A category opens as its own page: title, count, search and filters, only its clothes, and "הקטגוריה הבאה" at the end. The browser back button goes back a page.
// Searching or filtering on the first page shows the results page. "כל הפריטים" is still there (the old long list). Only in the clean design (z50).
(function(){
const H=document.documentElement,B=document.body,ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v328 '+w+': '+(e&&e.message||e))
const ctrl=document.querySelector('.ctrl'),cwrap=ctrl&&(ctrl.querySelector('.wrap')||ctrl)
const sec0=document.querySelector('.wrap>section[id]'),swrap=sec0&&sec0.parentNode
if(!ctrl||!swrap||typeof apply!='function')return
const on=()=>H.dataset.d180=='z50'&&B.dataset.z50=='closet'
const es=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))
const secs=()=>[...swrap.querySelectorAll(':scope>section[id]')]

let ALL=false,LASTC=null,HUSH=0

// ---------- what the categories are (from z283's picture strip, so names, pictures and counts match) ----------
function cats(){return [...cwrap.querySelectorAll('.z6c [data-h9cat]')].map(b=>{const im=b.querySelector('img')
 return {id:b.dataset.h9cat.slice(1),nm:((b.querySelector('b')||b).textContent||'').trim(),n:((b.querySelector('small')||{}).textContent||'').trim(),img:im?im.getAttribute('src')||'':''}})}

// ---------- is she searching or filtering? then the first page shows the results ----------
function filt(){try{const q=document.getElementById('q');if(q&&q.value.trim())return 1
 if(typeof COL!='undefined'&&COL)return 1
 if(typeof G!='undefined'&&G!='all')return 1
 if(typeof F!='undefined'&&F!='all')return 1
 if(typeof QM!='undefined'&&(QM||BYO))return 1
 for(const id of ['sort','szf','stf','tgf','ssf','flf','kidf','locf','monf','ordf']){const s=document.getElementById(id);if(s&&s.selectedIndex>0)return 1}
 for(const id of ['pmin','pmax']){const s=document.getElementById(id);if(s&&s.value)return 1}}catch(e){ERR('filt',e)}return 0}

const mode=()=>typeof C!='undefined'&&C?'page':ALL?'all':filt()?'res':'land'

// ---------- the menu bar ----------
const nav=document.createElement('nav')
nav.id='z328n'
nav.dir='rtl'
nav.setAttribute('aria-label','קטגוריות הארון')
nav.innerHTML='<div class="z328in"><div class="z328l" role="list"></div><button type="button" class="z328m" aria-expanded="false" aria-haspopup="true">עוד <span aria-hidden="true">▾</span></button></div><div class="z328d" hidden></div>'
ctrl.parentNode.insertBefore(nav,ctrl)
const list=nav.querySelector('.z328l'),more=nav.querySelector('.z328m'),drop=nav.querySelector('.z328d')

let NK=''
function paintNav(){try{const L=cats();if(!L.length)return
 const k=L.map(c=>c.id+c.nm+c.n+c.img).join('|')
 if(k!=NK){NK=k
  list.innerHTML=`<button type="button" role="listitem" data-z328c="" class="z328h"><span aria-hidden="true">⌂</span> הארון שלי</button>`+L.map(c=>`<button type="button" role="listitem" data-z328c="${es(c.id)}">${es(c.nm)}</button>`).join('')
  drop.innerHTML=`<div class="z328dg">${L.map(c=>`<button type="button" data-z328c="${es(c.id)}"><span class="z328di">${c.img?`<img alt="" loading="lazy" src="${es(c.img)}">`:''}</span><b>${es(c.nm)}</b><small>${es(c.n)}</small></button>`).join('')}<button type="button" data-z328c="*"><span class="z328di z328da" aria-hidden="true">✦</span><b>כל הפריטים</b><small></small></button></div>`
  fit()}
 const cur=mode()=='page'?C:mode()=='land'?'':'#'
 nav.querySelectorAll('[data-z328c]').forEach(b=>{const v=b.dataset.z328c,a=v==cur||(v=='*'&&ALL&&!C)
  if(a)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')})
 if(nav.dataset.cur!=cur){nav.dataset.cur=cur;fit()}
 const hid=[...list.querySelectorAll('[data-z328c]')].some(b=>b.hidden&&b.hasAttribute('aria-current'))
 more.classList.toggle('on',hid)}catch(e){ERR('nav',e)}}

// as many categories as fit in one line; the rest are under "עוד ▾"
function fit(){try{if(!on())return
 const bs=[...list.querySelectorAll('[data-z328c]')]
 bs.forEach(b=>b.hidden=false)
 const w=list.clientWidth
 if(!w)return
 let used=0
 const gap=parseFloat(getComputedStyle(list).columnGap)||0
 bs.forEach((b,i)=>{used+=b.offsetWidth+(i?gap:0);if(i&&used>w-6)b.hidden=true})
 drop.querySelectorAll('[data-z328c]').forEach(d=>{const t=list.querySelector(`[data-z328c="${d.dataset.z328c}"]`);d.classList.toggle('z328x',!!t&&!t.hidden)})}catch(e){ERR('fit',e)}}

function openDrop(v){drop.hidden=!v;more.setAttribute('aria-expanded',v);B.classList.toggle('z328o',v)}
more.addEventListener('click',e=>{e.stopPropagation();openDrop(drop.hidden)})
document.addEventListener('click',e=>{if(!drop.hidden&&!e.target.closest('#z328n'))openDrop(false)})
document.addEventListener('keydown',e=>{if(e.key=='Escape'&&!drop.hidden){openDrop(false);more.focus()}})
nav.addEventListener('click',e=>{const b=e.target.closest('[data-z328c]');if(!b)return
 openDrop(false)
 const v=b.dataset.z328c
 go(v=='*'?'':v,v=='*')})
addEventListener('resize',()=>{clearTimeout(fit.t);fit.t=setTimeout(fit,120)})

// ---------- the page header and the end of the page ----------
const hd=document.createElement('div')
hd.id='z328p'
cwrap.prepend(hd)
const ft=document.createElement('div')
ft.id='z328f'
swrap.append(ft)

function paintPage(){try{const m=mode(),L=cats()
 B.dataset.z328=m
 const n=secs().reduce((a,s)=>a+s.querySelectorAll('.card:not(.hide)').length,0)
 const sm=window.Z316&&Z316.mode()
 const tag=sm=='day'?' · ☀ חול':sm=='shab'?' · ✨ שבת':''
 let h='',f=''
 if(m=='page'){const i=L.findIndex(c=>c.id==C),c=L[i]||{nm:((document.querySelector('#'+CSS.escape(C)+' h2')||{}).firstChild||{}).textContent||''},pv=L[i-1],nx=L[i+1]
  h=`<nav class="z328b" aria-label="מיקום"><button type="button" data-z328c="">הארון שלי</button><span aria-hidden="true">›</span><b>${es(c.nm)}</b></nav><div class="z328t"><h1>${es(c.nm)}</h1><small>${n} פריטים${tag}</small><span class="z328pn">${pv?`<button type="button" data-z328c="${es(pv.id)}">› ${es(pv.nm)}</button>`:''}${nx?`<button type="button" data-z328c="${es(nx.id)}">${es(nx.nm)} ‹</button>`:''}</span></div>`
  f=`<div class="z328fe">${nx?`<button type="button" class="z328nx" data-z328c="${es(nx.id)}"><small>הקטגוריה הבאה</small>${nx.img?`<img alt="" loading="lazy" src="${es(nx.img)}">`:''}<b>${es(nx.nm)} ‹</b></button>`:''}<button type="button" class="z328bk" data-z328c="">⌂ לכל הקטגוריות</button><button type="button" class="z328up">↑ לראש הדף</button></div>`}
 else if(m=='all'){h=`<nav class="z328b" aria-label="מיקום"><button type="button" data-z328c="">הארון שלי</button><span aria-hidden="true">›</span><b>כל הפריטים</b></nav><div class="z328t"><h1>כל הפריטים</h1><small>${n} פריטים${tag}</small></div>`
  f=`<div class="z328fe"><button type="button" class="z328bk" data-z328c="">⌂ לכל הקטגוריות</button><button type="button" class="z328up">↑ לראש הדף</button></div>`}
 else if(m=='res'){const q=(document.getElementById('q')||{}).value||''
  const gb=typeof G!='undefined'&&G!='all'&&document.querySelector(`.ctrl .groups button[data-g="${G}"]`),gn=gb?((gb.firstChild||{}).textContent||gb.textContent).replace(/\d+/g,'').trim():''
  h=`<div class="z328t"><h1>${q.trim()?'תוצאות עבור „'+es(q.trim())+'”':gn?es(gn):'תוצאות הסינון'}</h1><small>${n} פריטים${tag}</small><span class="z328pn"><button type="button" class="z328clr">✕ לנקות ולחזור לקטגוריות</button></span></div>`
  f=`<div class="z328fe"><button type="button" class="z328clr">✕ לנקות ולחזור לקטגוריות</button><button type="button" class="z328up">↑ לראש הדף</button></div>`}
 if(hd.dataset.k!=h){hd.innerHTML=h;hd.dataset.k=h}
 if(ft.dataset.k!=f){ft.innerHTML=f;ft.dataset.k=f}
 const all=cwrap.querySelector('.z6c [data-h9=all]')
 if(all){const b=all.querySelector('b');if(b&&b.textContent!='כל הפריטים')b.textContent='כל הפריטים'}
 paintNav()}catch(e){ERR('page',e)}}

function clearAll(){try{const q=document.getElementById('q');if(q)q.value=''
 const c=document.getElementById('pclr');if(c)c.click()
 if(typeof G!='undefined'&&G!='all'){G='all';document.querySelectorAll('.ctrl .groups button').forEach(o=>o.setAttribute('aria-pressed',o.dataset.g=='all'))}
 if(typeof F!='undefined'&&F!='all'){F='all';const s=document.getElementById('src');if(s)s.value='all'}
 const p=document.getElementById('panel');if(p&&p.classList.contains('open'))(p.querySelector('.x9')||{click(){}}).click()}catch(e){ERR('clr',e)}go('',false)}

const hf=e=>{if(e.target.closest('.z328clr')){clearAll();return}
 if(e.target.closest('.z328up')){scrollTo({top:0,behavior:'smooth'});return}
 const b=e.target.closest('[data-z328c]');if(b)go(b.dataset.z328c,false)}
hd.addEventListener('click',hf)
ft.addEventListener('click',hf)

// ---------- going to a page ----------
function top0(){HUSH=Date.now()+450;S0.call(window,{top:0,behavior:'instant'})}
function go(c,all,push){try{if(window.zCloset&&B.dataset.z50!='closet')zCloset()
 ALL=!c&&!!all
 C=c||'';SC=''
 if(G!='all'){G='all';document.querySelectorAll('.ctrl .groups button').forEach(o=>o.setAttribute('aria-pressed',o.dataset.g=='all'))}
 LASTC=C
 apply()
 try{window.Z283&&Z283.paint()}catch(_){}
 if(push!==false)rec()
 top0()}catch(e){ERR('go',e)}}

function rec(){try{const s={z328:1,c:C||'',all:ALL},h=history.state
 if(h&&h.z328&&h.c==s.c&&h.all==s.all)return
 history.pushState(s,'')}catch(e){ERR('push',e)}}

addEventListener('popstate',e=>{const s=e.state
 if(!s||!s.z328||H.dataset.d180!='z50')return
 if(B.dataset.z50!='closet')return
 go(s.c,s.all,false)})

try{if(!(history.state&&history.state.z328))history.replaceState({z328:1,c:'',all:false},'')}catch(_){}

// other parts of the site that open a category (home pictures, the strip, links) – the page starts at its top and gets its own back step
const S0=window.scrollTo
window.scrollTo=function(){if(Date.now()<HUSH&&on())return;return S0.apply(window,arguments)}

const _ap=apply
apply=function(){const r=_ap.apply(this,arguments)
 try{const c=typeof C!='undefined'?C:''
  if(c&&ALL)ALL=false
  if(LASTC!==null&&c!=LASTC&&H.dataset.d180=='z50')setTimeout(()=>{if(on()){rec();top0()}},0)   /* from the home page the closet tab opens right after */
  LASTC=c
  paintPage()}catch(e){ERR('apply',e)}
 return r}

// "כל הפריטים" in the pictures on the first page
addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.z6c [data-h9=all]')
 if(!t||!on())return
 e.preventDefault();e.stopImmediatePropagation()
 go('',true)},true)

// leaving a search empty goes back to the categories
document.addEventListener('input',e=>{if(e.target.id=='q'&&on())setTimeout(paintPage,0)},true)

const MO=new MutationObserver(()=>{clearTimeout(MO.t);MO.t=setTimeout(paintPage,60)})
const watch=()=>{const st=cwrap.querySelector('.z6c');if(st&&!watch.on){watch.on=1;MO.observe(st,{childList:true,subtree:true,characterData:true})}}
watch()
try{document.fonts&&document.fonts.ready.then(()=>setTimeout(fit,50))}catch(_){}
;[300,1200,3000].forEach(t=>setTimeout(()=>{watch();paintPage();fit()},t))
setInterval(()=>{if(!document.hidden&&on()){paintPage();if(!fit.w||fit.w!=list.clientWidth){fit.w=list.clientWidth;fit()}}},1500)

// the closet tab was hidden while the bar was first measured – measure again when she opens it
new MutationObserver(()=>{if(on())requestAnimationFrame(()=>{fit();paintPage()})}).observe(B,{attributes:true,attributeFilter:['data-z50']})

window.Z328={go,mode,paint:paintPage}
})()
