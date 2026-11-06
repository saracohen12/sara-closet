// v358 (Sara 6/11: "אחורה זה צריך לעבוד לי תמיד"): the phone's back gesture / the browser's back closes the window on top – the one opened LAST –
// instead of leaving the site. Every open window has one back step; a window can add inner steps (NAV358.step: e.g. an order inside "ההזמנות שלי" → back = the list).
// Code never calls history.back() (that raced with the next window opening). A category change in the closet starts fresh (NAV358.reset from z328).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v358n '+w+': '+(e&&e.message||e));
let slots=0;const SKIP=new Set(['zpick']);
const REC=[];   // dialogs in the order they opened (most recent last)
const CB=[];    // inner steps {d, fn}
const top=()=>{for(let i=REC.length-1;i>=0;i--){const d=REC[i];if(d.open)return d}return null};
const want=()=>REC.filter(d=>d.open).length+CB.filter(c=>c.d.open).length;
function push(){try{history.pushState(Object.assign({},history.state||{},{d358:1,b358:0}),'');slots++}catch(e){ERR('push',e)}}
function need(){let n=want();while(slots<n)push()}
new MutationObserver(ms=>{let ch=false;for(const m of ms){const d=m.target;if(d.tagName!='DIALOG'||!d.id||SKIP.has(d.id))continue;const i=REC.indexOf(d);if(i>=0)REC.splice(i,1);
 if(d.open)REC.push(d);else for(let j=CB.length-1;j>=0;j--)if(CB[j].d===d)CB.splice(j,1);ch=true}if(ch)setTimeout(need,30)}).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['open']});
addEventListener('popstate',e=>{const orphan=slots>want();if(slots>0)slots--;
 const d=top();if(!d){if(orphan&&document.body.dataset.z50=='closet'){try{history.back()}catch(_){}return}   // v360: in the closet, a step of a window she already closed with ✕ – take the next step at once (it was a back press that did nothing); on the home screen it stays a safe stop
  home(e.state);return}const c=CB.length&&CB[CB.length-1];
 if(c&&c.d===d){CB.pop();try{c.fn()}catch(e){ERR('cb',e)}return}
 try{d.close()}catch(_){}});
// v360 (Sara: "אחורה זה צריך לעבוד לי תמיד"): in the closet with no window open, back went out of the site – now the closet has its own step: back from it = the home screen
try{history.replaceState(Object.assign({},history.state||{},{b358:1}),'')}catch(e){ERR('base',e)}
function home(s){try{if(s&&s.b358&&document.body.dataset.z50=='closet'&&!document.querySelector('dialog[open]')&&window.zHome)setTimeout(()=>{if(document.body.dataset.z50=='closet')zHome()},0)}catch(e){ERR('home',e)}}
new MutationObserver(()=>{try{if(document.body.dataset.z50=='closet'&&history.state&&history.state.b358)history.pushState(Object.assign({},history.state,{b358:0,t358:1}),'')}catch(e){ERR('tab',e)}}).observe(document.body,{attributes:true,attributeFilter:['data-z50']});
window.NAV358={slots:()=>slots,
 step:(d,fn)=>{if(!d||!d.open)return;CB.push({d,fn});need()},   // an inner step of window d: back calls fn instead of closing d
 unstep:d=>{for(let j=CB.length-1;j>=0;j--)if(CB[j].d===d){CB.splice(j,1);break}},   // the inner step was undone in the window itself (its own ‹)
 reset:()=>{slots=0;setTimeout(need,30)}};
})();
