// v313 redesign of the closet tab (Sara 28/10 17:52 "יש לי דברים ימינה-שמאלה, אני לא רואה את כולם", 18:01 "חזרת לעיצוב הישן, בלגן", 18:17 "2080, נקי, מסודר, ברור ונוח"):
// one clean column – title and count, the search, ALL the categories as a grid of pictures (on a phone the first two rows, "כל הקטגוריות" opens the rest – nothing hides
// to the left or right), the groups as pills that wrap, the 8 tools as one row of small pills, and colour / view / selection behind one "🎨 צבע ותצוגה" pill.
// The bar scrolls with the page. Uses z283's strip and buttons as they are (same handlers), only the layout changes.
(function(){
const H=document.documentElement,B=document.body,ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v313 '+w+': '+(e&&e.message||e));
const ctrl=document.querySelector('.ctrl'),wrap=ctrl&&(ctrl.querySelector('.wrap')||ctrl);if(!wrap)return;
const LS=k=>{try{return localStorage.getItem(k)}catch(_){return null}},LSS=(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}};
// title
const hd=document.createElement('div');hd.className='z313h';hd.innerHTML='<h2>הארון שלי</h2><small id="z313n"></small>';wrap.prepend(hd);
// the bar under the categories: show all categories · colour and view
const bar=document.createElement('div');bar.className='z313b';
bar.innerHTML='<button type="button" class="z313all" data-z313="cats" aria-expanded="false"></button><button type="button" data-z313="more" aria-expanded="false">🎨 צבע ותצוגה</button>';
wrap.append(bar);
const setCats=v=>{B.classList.toggle('z313c',v);const b=bar.querySelector('[data-z313=cats]');b.setAttribute('aria-expanded',v);paintBar();LSS('z313c',v?'1':'')};
const setMore=v=>{B.classList.toggle('z313f',v);bar.querySelector('[data-z313=more]').setAttribute('aria-expanded',v);LSS('z313f',v?'1':'')};
function paintBar(){try{const s=wrap.querySelector('.z6c'),n=s?s.querySelectorAll('button[data-h9cat]').length:0,b=bar.querySelector('[data-z313=cats]');
  b.textContent=B.classList.contains('z313c')?'▴ פחות קטגוריות':`▾ כל ${n} הקטגוריות`;
  const g=document.querySelector('.groups button[aria-pressed=true] .gc,.groups button.on .gc')||document.querySelector('.groups .gc'),c=document.getElementById('z313n');if(c&&g)c.textContent=g.textContent.trim()+' פריטים'}catch(e){ERR('bar',e)}}
bar.addEventListener('click',e=>{const b=e.target.closest('[data-z313]');if(!b)return;if(b.dataset.z313=='cats')setCats(!B.classList.contains('z313c'));else setMore(!B.classList.contains('z313f'))});
// after a category is picked on a phone, the long list folds again so the clothes are right there
wrap.addEventListener('click',e=>{if(e.target.closest('.z6c [data-h9cat],.z6c [data-h9=all]')&&innerWidth<760&&B.classList.contains('z313c'))setTimeout(()=>setCats(false),60)});
if(LS('z313f'))setMore(true);
// the 8 tools of z283 go under the title, as one row of small pills
setTimeout(()=>{try{const t=document.querySelector('#z6');if(t&&t.parentNode!==wrap)hd.after(t)}catch(e){ERR('move',e)}paintBar()},300);
setInterval(()=>{if(!document.hidden&&B.dataset.z50=='closet')paintBar()},2000);
})();
// v316 (Sara 28/10 19:38 "אני רוצה לראות רק את השמלות של שבת… רק את החצאיות של יום חול… זה לא מסנן לי"): picking a category used to reset the group to "הכל" and
// then to "בגדי חול", so Shabbat could never be combined with a category. Now "הכל · ☀ חול · ✨ שבת" is its own choice that stays while she picks categories
// (clothes and children's clothes; accessories are not split), every category picture shows how many are in the choice, and the title says "· ✨ שבת".
// It is not remembered after closing the site, so nothing looks missing next time. 19:36 "רציתי להחליף פה תמונה בנושאים": "🖼 לבחור תמונות" here too (cat180).
(function(){
const B=document.body,ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v316 '+w+': '+(e&&e.message||e));
const wrap=document.querySelector('.ctrl .wrap')||document.querySelector('.ctrl');if(!wrap||typeof extra!='function')return;
let M='';const MG=new Set(['clo','kid']);
const sg=c=>c._g316!=null?c._g316:(c._g316=((c.closest('section')||{}).dataset||{}).g||'');
const base=extra;extra=function(c){if(!base.apply(this,arguments))return false;if(M&&MG.has(sg(c)))return M=='day'?isDay(c):isShab(c);return true};
const box=document.createElement('div');box.className='z316m';box.setAttribute('role','radiogroup');box.setAttribute('aria-label','שבת או חול');
box.innerHTML='<button type="button" role="radio" data-z316=""><b>הכל</b><small></small></button><button type="button" role="radio" data-z316="day"><b>☀ חול</b><small></small></button><button type="button" role="radio" data-z316="shab"><b>✨ שבת</b><small></small></button>';
wrap.append(box);
const bar=wrap.querySelector('.z313b');if(bar&&!bar.querySelector('.c180e')){const e=document.createElement('button');e.type='button';e.className='c180e';e.setAttribute('aria-pressed','false');e.textContent='🖼 לבחור תמונות';bar.append(e)}
const cards=()=>[...document.querySelectorAll('.wrap>section[id] .card')];
function paint(){try{const L=cards().filter(c=>MG.has(sg(c))&&base(c));
  box.querySelectorAll('[data-z316]').forEach(b=>{const m=b.dataset.z316;b.setAttribute('aria-checked',m==M);b.querySelector('small').textContent=(m=='day'?L.filter(isDay):m=='shab'?L.filter(isShab):L).length});
  document.querySelectorAll('.wrap>section[id]').forEach(s=>{const v=M&&MG.has(s.dataset.g)?M:'';if((s.dataset.m316||'')!=v)s.dataset.m316=v});
  // the count under each category picture = what she will see in it now
  wrap.querySelectorAll('.z6c [data-h9cat]').forEach(b=>{const s=document.querySelector(b.dataset.h9cat);if(!s)return;let sm=b.querySelector('small');if(!sm){sm=document.createElement('small');b.append(sm)}
   const n=[...s.querySelectorAll('.card')].filter(c=>extra(c)).length+'';if(sm.textContent!=n)sm.textContent=n;b.classList.toggle('z316e',n=='0')});
  const g=document.querySelectorAll('.ctrl .groups button');g.forEach(o=>{if(o.dataset.g=='day'||o.dataset.g=='shab')o.setAttribute('aria-pressed',o.dataset.g==M)})}catch(e){ERR('paint',e)}}
function setM(m){M=m;if(G=='day'||G=='shab'){G='all';document.querySelectorAll('.ctrl .groups button').forEach(o=>o.setAttribute('aria-pressed',o.dataset.g=='all'))}
 apply();paint();(window.toast||(()=>{}))(m?'מציגה רק '+(m=='day'?'בגדי חול':'בגדי שבת')+' – גם כשבוחרים קטגוריה':'מציגה הכל – שבת וחול')}
box.addEventListener('click',e=>{const b=e.target.closest('[data-z316]');if(b)setM(b.dataset.z316)});
// the old "בגדי חול" / "✨ בגדי שבת" group buttons do the same now (they used to drop the category)
window.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.ctrl .groups button[data-g=day],.ctrl .groups button[data-g=shab]');if(!t)return;
 e.preventDefault();e.stopImmediatePropagation();setM(M==t.dataset.g?'':t.dataset.g)},true);
// a category (in the closet grid or on the home page) keeps the Shabbat / weekday choice
window.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.z6c [data-h9cat],.h9cats [data-h9cat]');if(!t||document.querySelector('.c180e[aria-pressed=true]'))return;
 e.preventDefault();e.stopImmediatePropagation();try{const id=t.dataset.h9cat.slice(1),home=!t.closest('.z6c');C=(!home&&C==id)?'':id;SC='';
  G='all';
  document.querySelectorAll('.ctrl .groups button').forEach(o=>o.setAttribute('aria-pressed',o.dataset.g==G&&o.dataset.g!='day'&&o.dataset.g!='shab'));
  apply();paint();try{window.Z283&&Z283.paint()}catch(_){}if(home&&window.zCloset)zCloset();
  const all=wrap.querySelector('.z313all[aria-expanded=true]');if(!home&&innerWidth<760&&all)all.click();
  setTimeout(()=>{const s=C&&document.getElementById(C),y=s&&s.offsetHeight?s.getBoundingClientRect().top+scrollY-8:(document.getElementById('top')||{}).offsetHeight||0;window.scrollTo({top:Math.max(0,y),behavior:'smooth'})},home?120:40)}catch(err){ERR('cat',err)}},true);
setTimeout(paint,900);setInterval(()=>{if(!document.hidden&&B.dataset.z50=='closet')paint()},2000);
let MO=null;const watch=()=>{const st=wrap.querySelector('.z6c');if(!st||MO)return;MO=new MutationObserver(()=>paint());MO.observe(st,{childList:true})};watch();setTimeout(watch,1500);   // z283 repaints the strip → the counts again
document.addEventListener('change',()=>setTimeout(paint,100),true);
window.Z316={mode:()=>M,set:setM};
})();
// v316 (Sara 28/10 19:41 "תסרוקות ואיפורים, לפחות שיהיה לי גישה לזה מהמסך הראשי"): a row on the home page under the chips –
// hairstyles for the wig, makeup and ties open the styles window (sty199) right at that tab, where she can also pick up to 10 at once
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v316h '+w+': '+(e&&e.message||e));
const L=[['hair','💇','תסרוקות לפאה'],['mk','💄','איפור'],['tie','🧕','קשירות']];
function add(){try{if(document.querySelector('.z316h'))return;const c=document.querySelector('#h180 .z-chips');if(!c)return;
 const r=document.createElement('div');r.className='z316h';r.setAttribute('role','group');r.setAttribute('aria-label','תסרוקות, איפור וקשירות');
 r.innerHTML=L.map(([k,i,n])=>`<button type="button" data-z316h="${k}"><span aria-hidden="true">${i}</span><b>${n}</b></button>`).join('');c.after(r);
 r.addEventListener('click',e=>{const b=e.target.closest('[data-z316h]');if(b&&window.STY199)STY199.open(b.dataset.z316h)})}catch(e){ERR('add',e)}}
add();[600,2000,5000].forEach(t=>setTimeout(add,t));
})();
