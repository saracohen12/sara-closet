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
