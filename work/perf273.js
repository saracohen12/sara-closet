// ===== v273 stage ו of the site analysis (bug "about 15 timers run all the time and scan 700 cards – battery and stutter on the phone"):
// the background checks that the site's parts start when it loads (every 0.3–5 s: add a button, refresh a counter, fix a picture…) now run only
// when something happened since their last run – a tap, typing, a window opening, a new part of the page – and at least once every ~4 s,
// and never while the site is in the background. Turning pictures and slideshows use the plain timer (rawSetInterval) and keep their pace.
(function(){const raw=window.setInterval.bind(window);window.rawSetInterval=raw;let LOAD=true,GEN=1;
 let off=false;try{off=localStorage.getItem('perf273off')=='1'}catch(_){}
 const P=window.__P273={runs:0,skips:0,timers:0};const bump=()=>{GEN++};
 window.__perf273end=()=>{LOAD=false;if(off)return;const el=n=>{for(const x of n)if(x.nodeType==1)return true;return false};   // a poller writing the same text again is not news
  try{new MutationObserver(ms=>{for(const m of ms)if(m.type=='attributes'||el(m.addedNodes)||el(m.removedNodes)){bump();return}}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['open']})}catch(_){}
  ['click','input','change','keydown','pointerup','touchend','focusin','visibilitychange','pageshow','hashchange'].forEach(e=>document.addEventListener(e,bump,true));raw(bump,4000)};
 window.setInterval=function(fn,ms,...a){if(off||!LOAD||typeof fn!='function'||!(ms>=300&&ms<=5000))return raw(fn,ms,...a);P.timers++;let seen=0;
  return raw(function(){if(document.hidden||seen===GEN){P.skips++;return}seen=GEN;P.runs++;return fn.apply(this,a)},ms)}})();
