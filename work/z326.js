// v326: the studio's category buttons are one clean line now – their two-line labels (a <br>) become one line with a space
(function(){
const fix=()=>{try{document.querySelectorAll('#r360 .z8c button br').forEach(b=>b.replaceWith(' '))}catch(_){}};
let MO=null;const watch=()=>{const n=document.querySelector('#r360 .z8c');if(!n){return}fix();if(MO)return;MO=new MutationObserver(fix);MO.observe(n,{childList:true,subtree:true})};
setInterval(watch,1500);
})();
