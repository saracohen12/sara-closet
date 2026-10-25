// ===== v71 "בוטיק" design: line icons instead of emoji, avatar in the hero, theme switch (bordo / gold-rose) =====
{const SV=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
 const IC={home:SV('<path d="M12 6.5a2 2 0 1 1 2 2c-1 .4-2 1-2 2V11"/><path d="M12 11 3.4 17.3c-.8.6-.4 1.7.6 1.7h16c1 0 1.4-1.1.6-1.7L12 11"/>'),
  search:SV('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>'),
  studio:SV('<path d="M9.5 3h5l-.8 4 4.3 13H6l4.3-13z"/><path d="M9.7 7h4.6"/>'),
  hub:SV('<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>'),
  bell:SV('<path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
  ret:SV('<circle cx="12" cy="12.5" r="7.5"/><path d="M12 8.5v4l2.8 1.8"/><path d="M9.5 3h5"/>'),
  fav:SV('<path d="M12 19.5s-7-4.3-7-9.6A3.9 3.9 0 0 1 12 7.6a3.9 3.9 0 0 1 7 2.3c0 5.3-7 9.6-7 9.6z"/>'),
  rnd:SV('<path d="M12 3.5l1.9 5.6 5.6 1.9-5.6 1.9L12 18.5l-1.9-5.6L4.5 11l5.6-1.9z"/><path d="M19 17.5v3M17.5 19h3"/>'),
  more:SV('<path d="M5 20V11M12 20V5M19 20v-6"/>'),
  look:SV('<path d="M12 3.5l1.9 5.6 5.6 1.9-5.6 1.9L12 18.5l-1.9-5.6L4.5 11l5.6-1.9z"/>'),
  pal:SV('<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.8 1.8-1.7 0-1.3-1.2-1.6-1.2-2.8 0-1 .8-1.6 1.8-1.6H17a3.5 3.5 0 0 0 3.5-3.5c0-4.1-3.8-7.4-8.5-7.4z"/><circle cx="7.8" cy="11" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15" cy="7.8" r="1"/>')};
 const root=document.documentElement;let th='bordo';try{th=localStorage.getItem('d71')||'bordo'}catch(_){}
 const apply=()=>{root.classList.toggle('d71',th!='off');root.dataset.d71=th};apply();
 const set=(sel,key)=>{const i=document.querySelector(sel+' i');if(i&&!i.querySelector('svg'))i.innerHTML=IC[key]};
 function paint(){try{
  [['home','home'],['search','search'],['studio','studio'],['hub','hub'],['bell','bell']].forEach(([b,k])=>set(`.bnav [data-bn="${b}"]`,k));
  [['ret','ret'],['fav','fav'],['rnd','rnd'],['more','more']].forEach(([b,k])=>set(`.h9tiles [data-h9="${b}"]`,k));
  set('.h9cta [data-h9="studio"]','studio');set('.h9cta [data-h9="hub"]','look');
  const hero=document.querySelector('.h9hero');if(hero&&!hero.querySelector('.h9av'))hero.insertAdjacentHTML('beforeend',`<span class="h9av" data-h9="studio" role="button" aria-label="בניית לוק"><img src="av/p5c_front.webp" alt=""><small>האווטאר שלך</small></span>`);
  const act=document.querySelector('.h9act');if(act&&!act.querySelector('#d71t'))act.insertAdjacentHTML('afterbegin',`<button type="button" id="d71t" title="צבע העיצוב: בורדו / זהב-ורוד / הקודם">${IC.pal}</button>`);
 }catch(_){}}
 paint();setTimeout(paint,400);setTimeout(paint,1500);new MutationObserver(()=>paint()).observe(document.body,{childList:true});
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#d71t');if(!b)return;e.preventDefault();th=th=='bordo'?'gold':th=='gold'?'off':'bordo';try{localStorage.setItem('d71',th)}catch(_){}apply();toast(th=='bordo'?'🎨 בורדו':th=='gold'?'🎨 זהב-ורוד':'🎨 העיצוב הקודם')},true);
 window.d71=t=>{th=t;apply()}}
// emoji in front of a text label are tucked away (the label stays); buttons that are only an emoji keep it
{const RE=/^(\s*)((?:\p{Extended_Pictographic}|[←-⇿☀-➿⬀-⯿])(?:[️‍⃣]|\p{Emoji_Modifier}|\p{Extended_Pictographic})*)\s+(?=\S)/u;
 const SEL='button,summary,a,label,h2,h3,h4,.tab,.chip,[role=button]';
 function fix(el){if(el.closest('.bnav,#sstage,.e71k')||el.dataset.e71)return;let t=el.firstChild;while(t&&t.nodeType==3&&!t.nodeValue.trim())t=t.nextSibling;if(!t)return;
  if(t.nodeType==1&&t.tagName=='I'&&!t.querySelector('svg')&&RE.test(t.textContent+' x')&&/[֐-׿A-Za-z]/.test(el.textContent.replace(t.textContent,''))){t.classList.add('e71');el.dataset.e71=1;return}
  if(t.nodeType!=3)return;const m=t.nodeValue.match(RE);if(!m)return;const rest=t.nodeValue.slice(m[0].length)+(el.textContent.slice(t.nodeValue.length));if(!/[֐-׿A-Za-z0-9]/.test(rest))return;
  const sp=document.createElement('span');sp.className='e71';sp.textContent=m[2];t.nodeValue=m[1]+t.nodeValue.slice(m[0].length);el.insertBefore(sp,t);el.dataset.e71=1}
 function scan(root){try{if(!document.documentElement.classList.contains('d71'))return;if(root.matches&&root.matches(SEL))fix(root);root.querySelectorAll&&root.querySelectorAll(SEL).forEach(fix)}catch(_){}}
 let q=new Set(),tm=0;new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType==1)q.add(n);if(!tm)tm=setTimeout(()=>{tm=0;const a=[...q];q.clear();a.forEach(scan)},60)}).observe(document.body,{childList:true,subtree:true});
 scan(document.body);setTimeout(()=>scan(document.body),1200)}
