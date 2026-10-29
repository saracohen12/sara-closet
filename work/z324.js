// v324 (redesign, screen 3 – the item window; row 534/540 "בתוך הארון שיהיה יותר קל ושימושי"): the item window was one long page (3,300 px on a phone).
// Now three tabs under its title – 👗 הבגד (picture, details, order, what to do with it), 🧍 אווטאר (avatar pictures, GPT, upload), ⚙ ניהול (status, place, tags).
// Nothing was removed: each part only moved into its tab. Anything that scrolls to a part in another tab (upload, a GPT row…) opens that tab first.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v324 '+w+': '+(e&&e.message||e));
const T=[['item','👗','הבגד'],['avatar','🧍','אווטאר'],['manage','⚙','ניהול']];
const GRP={item:['.dmedia','.dinfo','.o3dl','.o3oosw'],avatar:['.dtools'],manage:['.drest']};
let TAB='item';
const body=()=>document.getElementById('dlbody');
function set(t,scroll){TAB=t;const b=body();if(!b)return;b.dataset.z324=t;const bar=b.querySelector('.z324t');if(bar)bar.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x.dataset.z324==t));
 if(scroll){const w=b.closest('.dlwrap')||b;const sc=[w,b,document.getElementById('dlg')].find(x=>x&&x.scrollHeight>x.clientHeight+4);if(sc)sc.scrollTop=0}}
function bar(){try{const b=body();if(!b||!b.querySelector('.dinfo,.dtools'))return;if(!b.querySelector('.z324t')){const n=document.createElement('div');n.className='z324t';n.setAttribute('role','tablist');n.setAttribute('aria-label','חלקי החלון');
  n.innerHTML=T.map(([k,i,l])=>`<button type="button" role="tab" data-z324="${k}" aria-selected="${k==TAB}"><span aria-hidden="true">${i}</span>${l}</button>`).join('');b.prepend(n)}
 set(TAB)}catch(e){ERR('bar',e)}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.z324t [data-z324]');if(t){set(t.dataset.z324,true)}});
// a part in a hidden tab is asked for (scrollIntoView / focus): open its tab
const which=el=>{const b=body();if(!b||!el||!b.contains(el))return '';for(const k in GRP)if(GRP[k].some(s=>el.closest(s)))return k;return ''};
const show=el=>{try{const k=which(el);if(k&&k!=TAB)set(k)}catch(_){}};
{const f=Element.prototype.scrollIntoView;Element.prototype.scrollIntoView=function(){show(this);return f.apply(this,arguments)}}
{const f=HTMLElement.prototype.focus;HTMLElement.prototype.focus=function(){show(this);return f.apply(this,arguments)}}
let MO=null;function watch(){const b=body();if(!b||MO)return;MO=new MutationObserver(()=>{if(!b.querySelector('.z324t'))bar()});MO.observe(b,{childList:true})}
watch();setTimeout(watch,1500);
const dlg=document.getElementById('dlg');if(dlg)dlg.addEventListener('close',()=>{TAB='item'});
window.Z324={set,tab:()=>TAB};
})();
