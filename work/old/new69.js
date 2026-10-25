// ===== v69 (2026-10-21): a new home screen – app bar, dark hero with greeting + main actions, quick tiles,
// category photo tiles, returns strip; stats/summaries/progress moved into a "📊 פרטים נוספים" sheet;
// item dialog: store-search box folded. Visual language lives in new69.css (loaded last).
(function(){try{
const top=$('#top');if(!top||top.dataset.v69)return;top.dataset.v69=1;document.body.classList.add('v69');
const hr=new Date().getHours();const hi=hr<5?'לילה טוב':hr<12?'בוקר טוב':hr<17?'צהריים טובים':hr<21?'ערב טוב':'לילה טוב';
const N=Object.keys(D).length;
// --- 1. details sheet: everything that is "numbers" goes here
const sh=document.createElement('dialog');sh.id='more9';sh.className='sheet9';sh.dir='rtl';
sh.innerHTML='<div class="sh9h"><b>📊 פרטים נוספים</b><button type="button" class="x9" aria-label="סגירה">✕</button></div><div class="sh9b"></div>';
document.body.appendChild(sh);const shb=sh.querySelector('.sh9b');
[...top.querySelectorAll('p.stats')].forEach(p=>shb.appendChild(p));const pg=$('#prog');if(pg)shb.appendChild(pg);
[...top.querySelectorAll('details.sum')].forEach(d=>shb.appendChild(d));const ft=document.querySelector('p.foot');if(ft){const d=document.createElement('details');d.className='sum';d.innerHTML='<summary>איך חושב "שילמת בפועל"</summary>';d.appendChild(ft);shb.appendChild(d)}
sh.querySelector('.x9').addEventListener('click',()=>sh.close());sh.addEventListener('click',e=>{if(e.target===sh)sh.close()});
// --- 2. app bar
const h1=top.querySelector('h1');const bar=document.createElement('div');bar.className='h9bar';
bar.innerHTML='<div class="h9logo"><i aria-hidden="true">✦</i><span><b>הארון</b><small>של שרה</small></span></div><div class="h9act"></div>';
const act=bar.querySelector('.h9act');const bell=$('#bell'),hb=$('#helpb'),vr=$('#ver');
if(bell)act.appendChild(bell);if(hb){hb.textContent='?';hb.setAttribute('aria-label','איך משתמשים');act.appendChild(hb)}if(vr)act.appendChild(vr);
// --- 3. hero + quick tiles + categories
const hero=document.createElement('div');hero.className='h9hero';
hero.innerHTML=`<p class="h9hi">${hi}, שרה</p><h2 class="h9t">מה לובשים היום?</h2><p class="h9sub"><b>${N}</b> פריטים בארון<span class="h9retl"></span></p>
<div class="h9cta"><button type="button" class="h9b1" data-h9="studio"><i>👗</i>בניית לוק</button><button type="button" class="h9b2" data-h9="hub"><i>✨</i>הלוקים שלי</button></div>`;
const tiles=document.createElement('div');tiles.className='h9tiles';
tiles.innerHTML=`<button type="button" data-h9="ret"><i>⏰</i><b class="h9n" data-n="ret">0</b><span>להחזרה בקרוב</span></button>
<button type="button" data-h9="fav"><i>♥</i><b class="h9n" data-n="fav">0</b><span>מועדפים</span></button>
<button type="button" data-h9="rnd"><i>🎲</i><b class="h9x"></b><span>תפתיעי אותי</span></button>
<button type="button" data-h9="more"><i>📊</i><b class="h9x"></b><span>פרטים נוספים</span></button>`;
const cats=document.createElement('div');cats.className='h9sec';
const subs=[...document.querySelectorAll('.ctrl .subs a:not(.spec)')];
function thumbOf(sec){if(!sec)return null;const c=[...sec.querySelectorAll('.card')].find(c=>{const id=c.dataset.id;return (IT[id]||{}).img||(D[id]||{}).hi});return c?c.dataset.id:null}
cats.innerHTML=`<div class="h9head"><h3>הקטגוריות שלי</h3><button type="button" class="h9all" data-h9="all">הכל ←</button></div><div class="h9cats">${subs.map(a=>{const h=a.getAttribute('href');const sec=document.querySelector(h);const id=thumbOf(sec);const nm=(a.firstChild&&a.firstChild.textContent||'').trim();
 return `<button type="button" class="h9cat" data-h9cat="${h}">${id?`<span class="h9im"><img data-th="${id}" src="${img(id)||TPH}" alt="" loading="lazy"></span>`:'<span class="h9im h9e">👚</span>'}<b>${esc(nm)}</b><small data-cn="${h}">${(a.querySelector('span')||{}).textContent||''}</small></button>`}).join('')}</div>`;
const urg=$('#urgent'),rec=$('#recent');
h1.replaceWith(bar);bar.after(hero);hero.after(tiles);tiles.after(cats);if(urg)cats.after(urg);if(rec&&urg)urg.after(rec);
try{if(window.TH)thApply(TH)}catch(_){}
// --- 4. actions
const toCloset=()=>{const c=document.querySelector('.ctrl');const y=c?c.getBoundingClientRect().top+scrollY-0:0;window.scrollTo({top:Math.max(0,($('#top').offsetHeight||y)-4),behavior:'smooth'})};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-h9],[data-h9cat]');if(!t)return;e.preventDefault();
 if(t.dataset.h9cat){const a=document.querySelector(`.ctrl .subs a[href="${t.dataset.h9cat}"]`);const g=a&&a.dataset.g;const gb=document.querySelector('.ctrl .groups button[data-g="all"]');if(gb&&gb.getAttribute('aria-pressed')!='true')gb.click();if(a)a.click();setTimeout(toCloset,60);return}
 const k=t.dataset.h9;
 if(k=='studio'){$('#studiobtn').click()}else if(k=='hub'){$('#hubbtn').click()}else if(k=='more'){sh.showModal()}else if(k=='rnd'){$('#rnd').click()}
 else if(k=='all'){const gb=document.querySelector('.ctrl .groups button[data-g="all"]');if(gb)gb.click();setTimeout(toCloset,60)}
 else if(k=='fav'){const f=$('#flf');f.value=f.value=='fav'?'':'fav';f.dispatchEvent(new Event('change'));toast(f.value?'♥ רק מועדפים':'מציגה הכל');setTimeout(toCloset,60)}
 else if(k=='ret'){const s=$('#sort');s.value=s.value=='ret'?'':'ret';s.dispatchEvent(new Event('change'));toast(s.value?'⏰ מסודר לפי זמן החזרה':'מיון רגיל');setTimeout(toCloset,60)}});
// --- 5. live numbers
function counts(){try{const ids=Object.keys(D);const fav=ids.filter(id=>(IT[id]||{}).fav).length;const u=document.querySelectorAll('#urgent .mini').length;
 const fn=tiles.querySelector('[data-n="fav"]'),rn=tiles.querySelector('[data-n="ret"]');if(fn)fn.textContent=fav;if(rn)rn.textContent=u;
 hero.querySelector('.h9retl').textContent=u?` · ${u} להחזרה בקרוב`:'';
 tiles.querySelector('[data-h9="fav"]').setAttribute('aria-pressed',$('#flf').value=='fav');tiles.querySelector('[data-h9="ret"]').setAttribute('aria-pressed',$('#sort').value=='ret');
 document.querySelectorAll('[data-cn]').forEach(s=>{const a=document.querySelector(`.ctrl .subs a[href="${s.dataset.cn}"] span`);if(a)s.textContent=a.textContent});
 const uh=document.querySelector('#urgent h3');if(uh&&!uh.dataset.v9){uh.dataset.v9=1;uh.innerHTML=`<span>⏰ כפולים להחזרה</span><small>הזמן נגמר בקרוב</small>`}}catch(_){}}
{const _ap=apply;apply=function(){const r=_ap.apply(this,arguments);counts();return r}}
new MutationObserver(counts).observe($('#urgent')||document.body,{childList:true});counts();
// --- 6. filter + sort = one bottom sheet (moved out of the sticky bar, which is now only search + filter)
const fb=$('#fb');if(fb&&!fb.querySelector('i'))fb.insertAdjacentHTML('afterbegin','<i aria-hidden="true">⚙︎</i>');
const pn=$('#panel');if(pn){(top.closest('[dir]')||document.body).appendChild(pn);pn.dir='rtl';pn.classList.add('pn9');
 const hd=document.createElement('div');hd.className='pn9h';hd.innerHTML='<b>סינון ומיון</b><button type="button" class="x9" aria-label="סגירה">✕</button>';pn.prepend(hd);
 const r=document.createElement('div');r.className='row pn9top';r.innerHTML='<label>מיון</label>';hd.after(r);
 const so=$('#sort'),sr=$('#src'),sz=document.querySelector('.ctrl .seg.sizes'),mic=$('#mic');if(so)r.appendChild(so);const l2=document.createElement('label');l2.textContent='חנות';r.appendChild(l2);if(sr)r.appendChild(sr);
 if(sz){const l3=document.createElement('label');l3.textContent='תמונות';r.appendChild(l3);r.appendChild(sz)}
 hd.querySelector('.x9').addEventListener('click',()=>fb.click());
 const bd=document.createElement('div');bd.className='pn9bd';document.body.appendChild(bd);bd.addEventListener('click',()=>fb.click())}
}catch(e){(window.ERRS=window.ERRS||[]).push('v69home:'+e.message)}})();
// ---- item dialog: store search folded (it filled half the screen)
{const _ao9=afterOpen;afterOpen=function(id){_ao9(id);try{const r=document.querySelector('#dlbody .srchrow');if(r&&!r.closest('details.srch9')){const d=document.createElement('details');d.className='srch9';d.innerHTML=`<summary>🔎 למצוא את המוצר ב${(D[id]||{}).src=='sh'?'שיין':'טמו'}</summary>`;r.before(d);d.appendChild(r)}}catch(_){}}}
