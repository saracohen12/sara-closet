// ===== v179: "מה יש לי בארון" tile on the home screen – one tap opens "הארון שלי" (every category as a tile, fix163)
// (Sara 25/10, on the computer: "חסר לי... מה יש לי בארון, חולצות, חצאיות... לא צריכה לגלגל לחפש... במקום אולי פרטים נוספים")
// It takes the place of the "פרטים נוספים" tile; that one moved to the bottom of "הארון שלי" and stays in the admin panel and the search (the tile stays hidden in the page so they keep working).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v179 '+w+': '+(e&&e.message||e));
const st=document.createElement('style');st.textContent=`
.h9tiles [data-h9="more"]{display:none!important}
#cl163{overflow-y:auto!important;overscroll-behavior:contain;-webkit-overflow-scrolling:touch} /* v163 sheet did not scroll on the phone: the lower categories were out of reach */
.h9tiles button.cl179,html.d73.d78 .h9tiles button.cl179{background:linear-gradient(135deg,#3a2a1e,#6e4b35)!important;border-color:transparent!important;color:#fff!important}
.h9tiles .cl179 i,html.d73.d78 .h9tiles .cl179 i{background:rgba(255,255,255,.16)!important;color:#fff}
.h9tiles .cl179 i svg{stroke:#fff}
.h9tiles .cl179 span,html.d73.d78 .h9tiles .cl179 span{color:#fff!important;font-size:.86rem!important;font-weight:700!important}
.h9tiles .cl179 small{display:block;color:rgba(255,255,255,.78);font-size:.7rem;line-height:1.2}
/* computer: the hero buttons wrap to a second row instead of squeezing into circles over the avatar (Sara 25/10 screenshot) */
@media(min-width:701px){
 html .h9cta{flex-wrap:wrap!important;align-items:center!important;gap:12px 14px!important;max-width:none!important}
 html .h9cta #ord123b,html .h9cta #ret152b{width:auto!important;flex:0 0 auto!important;margin:0!important;border-radius:18px!important;padding:8px 14px!important;min-height:0!important;aspect-ratio:auto!important}
 html .h9cta #ord123b b,html .h9cta #ret152b b,html .h9cta #ord123b small,html .h9cta #ret152b small{white-space:nowrap}
 html .h9cta .h9adm{flex:0 0 auto!important;width:auto!important}
 html .h9cta .h9b2{white-space:nowrap;flex:0 0 auto!important}
}
.cl163x .cl179m{font:inherit;font-size:.88rem;padding:9px 14px;border-radius:999px;border:1px solid var(--line);background:#fff;cursor:pointer}`;
document.head.appendChild(st);
const ICON='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7.2a1.9 1.9 0 1 1 1.9-1.9"/><path d="M12 7.2v1.4L3.6 14.4a1.3 1.3 0 0 0 .8 2.4h15.2a1.3 1.3 0 0 0 .8-2.4L12 8.6"/></svg>';
function put(){try{const tl=document.querySelector('.h9tiles');if(!tl||tl.querySelector('.cl179'))return;
 tl.insertAdjacentHTML('afterbegin',`<button type="button" class="cl179" data-cl163open aria-label="מה יש לי בארון – לפי קטגוריות"><i>${ICON}</i><span>מה יש לי בארון</span><small>חולצות, חצאיות, הכל</small></button>`)}catch(e){ERR('put',e)}}
put();setTimeout(put,400);setTimeout(put,1500);setInterval(put,3000);
// "פרטים נוספים" at the bottom of "הארון שלי"
new MutationObserver(()=>{const x=document.querySelector('#cl163 .cl163x');if(x&&!x.querySelector('.cl179m'))x.insertAdjacentHTML('beforeend','<button type="button" class="cl179m" data-cl179more>📊 פרטים נוספים</button>')}).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-cl179more]');if(!t)return;e.preventDefault();e.stopPropagation();
 try{const d=document.getElementById('cl163');if(d)d.close();const m=document.querySelector('.h9tiles [data-h9="more"]');if(m)m.click()}catch(err){ERR('more',err)}},true);
})();
