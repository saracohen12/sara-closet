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
function push(){try{history.pushState(Object.assign({},history.state||{},{d358:1}),'');slots++}catch(e){ERR('push',e)}}
function need(){let n=want();while(slots<n)push()}
new MutationObserver(ms=>{let ch=false;for(const m of ms){const d=m.target;if(d.tagName!='DIALOG'||!d.id||SKIP.has(d.id))continue;const i=REC.indexOf(d);if(i>=0)REC.splice(i,1);
 if(d.open)REC.push(d);else for(let j=CB.length-1;j>=0;j--)if(CB[j].d===d)CB.splice(j,1);ch=true}if(ch)setTimeout(need,30)}).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['open']});
addEventListener('popstate',()=>{if(slots>0)slots--;const d=top();if(!d)return;const c=CB.length&&CB[CB.length-1];
 if(c&&c.d===d){CB.pop();try{c.fn()}catch(e){ERR('cb',e)}return}
 try{d.close()}catch(_){}});
window.NAV358={slots:()=>slots,
 step:(d,fn)=>{if(!d||!d.open)return;CB.push({d,fn});need()},   // an inner step of window d: back calls fn instead of closing d
 unstep:d=>{for(let j=CB.length-1;j>=0;j--)if(CB[j].d===d){CB.splice(j,1);break}},   // the inner step was undone in the window itself (its own ‹)
 reset:()=>{slots=0;setTimeout(need,30)}};
})();
