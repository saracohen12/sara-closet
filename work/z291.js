// v291 (Sara 28/10 15:25 + 15:31): one "✏ עריכה" window on the avatar, like the 📿 one – everything she changes on the look is there:
// what she wears now (✕ / ✨ / 🚀, reset, undo), tuck in / under the dress / hair behind, jewelry height, the head (cover / wig / hairstyle,
// her scarf and its real ties), makeup, the base under lace, the background and the frame. The left-side block is gone.
// The studio's own elements are MOVED here (same handlers); the loose tie presets row is dropped (a tie is picked inside its scarf).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v291 '+w+': '+(e&&e.message||e));
window.NOTIE291=1;
const FR=[['arch','קשת'],['soft','מלבן מעוגל'],['rect','מלבן'],['none','בלי מסגרת']];
let dlg=null,pan=null,btn=null;
const frGet=()=>{try{return localStorage.getItem('z9frame')||'arch'}catch(_){return 'arch'}};
function frSet(k){try{localStorage.setItem('z9frame',k)}catch(_){}if(dlg)dlg.dataset.z9f=k;paintFr()}
function paintFr(){const b=pan&&pan.querySelector('.z9fr');if(!b)return;const k=frGet();b.innerHTML=FR.map(([v,t])=>`<button type="button" role="radio" aria-checked="${v==k}" data-z9fr="${v}"><i class="z9fi z9fi-${v}" aria-hidden="true"></i><span>${t}</span></button>`).join('')}
function unfold(){if(!pan)return;pan.querySelectorAll('.r3fz').forEach(x=>x.classList.remove('r3fz'));pan.querySelectorAll('.r3fh').forEach(l=>{l.classList.remove('r3fh');l.removeAttribute('role');l.removeAttribute('tabindex');l.removeAttribute('aria-expanded');delete l.dataset.pick})}
function show(on){if(!pan)return;pan.hidden=!on;btn.setAttribute('aria-expanded',on);if(on){unfold();if(innerWidth<900){const st=dlg.querySelector('.r3stage');if(st)st.scrollIntoView({block:'start'})}try{window.Z284&&Z284.paint()}catch(_){}const f=pan.querySelector('.z9x');if(f)f.focus({preventScroll:true})}else btn.focus({preventScroll:true})}
function setup(d){dlg=d;if(d.querySelector('#z9'))return;const stage=d.querySelector('.r3stage'),side=d.querySelector('.r3side'),now=d.querySelector('.r3now');if(!stage||!now)return;
 d.dataset.z9f=frGet();
 btn=document.createElement('button');btn.type='button';btn.className='z9b';btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','z9');btn.innerHTML='<i aria-hidden="true">✏</i><span>עריכה</span>';stage.appendChild(btn);
 pan=document.createElement('section');pan.id='z9';pan.hidden=true;pan.setAttribute('role','dialog');pan.setAttribute('aria-label','עריכה');
 pan.innerHTML=`<div class="z9h"><h3>✏ עריכה</h3><button type="button" class="z9x" aria-label="סגירה">✕</button></div><div class="z9in"></div>
  <div class="z9s"><span class="r3lbl">🖼 מסגרת</span><div class="z9fr" role="radiogroup" aria-label="מסגרת"></div></div>`;
 d.querySelector('.r3w').appendChild(pan);const inn=pan.querySelector('.z9in');
 const z7=d.querySelector('#z7');if(z7)inn.appendChild(z7);
 ['.r3hd','.r3styr','.r3cam','.r3bgw'].forEach(s=>{const x=now.querySelector(s);if(x){const w=document.createElement('div');w.className='z9s';inn.appendChild(w);w.appendChild(x)}});
 now.classList.add('z9gone');   // the rest (the worn chips and the three checkboxes) stays in place, hidden – the buttons above drive them
 paintFr();
 btn.addEventListener('click',()=>show(pan.hidden));
 pan.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;if(t.classList.contains('z9x'))return show(false);if(t.dataset.z9fr)return frSet(t.dataset.z9fr)});
 d.addEventListener('keydown',e=>{if(e.key=='Escape'&&pan&&!pan.hidden){e.preventDefault();e.stopPropagation();show(false)}},true);
 // the studio repaints these blocks (heads, styles, backgrounds): keep them unfolded here
 let q=0;new MutationObserver(()=>{if(q||pan.hidden)return;q=requestAnimationFrame(()=>{q=0;unfold()})}).observe(pan,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
}
const t=setInterval(()=>{const d=document.getElementById('r360');if(d&&d.querySelector('.r3now')&&d.querySelector('#z7')){clearInterval(t);try{setup(d)}catch(e){ERR('setup',e)}}},700);
window.Z291={show:o=>show(o!==false)};
})();
