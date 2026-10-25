// ===== v73 design: black-white + camel, three switchable directions (html[data-dir=A|B|C]) =====
// A = editorial magazine · B = modern app · C = luxury minimal. Palettes (html[data-pal]) stay as alternates behind the palette button.
// Presentation only: adds an avatar figure to the home hero, a direction switch, and takes over from the v71 theme.
{const root=document.documentElement;const PALS=['mono','olive','navy','rose'],DIRS=['A','B','C'];
 const PN={mono:'שחור-לבן וקאמל',olive:'זית',navy:'כחול כהה',rose:'ורוד עתיק'},DN={A:'A · מגזין',B:'B · אפליקציה',C:'C · מינימליסטי'};
 let dir='A',pal='mono';
 try{const u=new URLSearchParams(location.search).get('dir');if(u&&DIRS.includes(u.toUpperCase())){dir=u.toUpperCase();localStorage.setItem('dir73',dir)}else dir=localStorage.getItem('dir73')||'A'}catch(_){}
 try{pal=localStorage.getItem('pal')||'mono'}catch(_){}
 if(!DIRS.includes(dir))dir='A';if(!PALS.includes(pal))pal='mono';
 const apply=()=>{root.classList.remove('d71');root.classList.add('d73');root.dataset.dir=dir;root.dataset.pal=pal;const b=document.getElementById('d73dir');if(b)b.textContent=dir};
 apply();
 // palette button (the v71 🎨 button) cycles the four palettes; the direction button cycles A/B/C
 window.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#d71t,#d73dir');if(!t)return;e.preventDefault();e.stopImmediatePropagation();
  if(t.id=='d71t'){pal=PALS[(PALS.indexOf(pal)+1)%PALS.length];try{localStorage.setItem('pal',pal)}catch(_){}apply();try{toast('צבעים: '+PN[pal])}catch(_){}}
  else{dir=DIRS[(DIRS.indexOf(dir)+1)%DIRS.length];try{localStorage.setItem('dir73',dir)}catch(_){}apply();try{toast('עיצוב '+DN[dir])}catch(_){}}},true);
 window.d73=(d,p)=>{if(d&&DIRS.includes(d))dir=d;if(p&&PALS.includes(p))pal=p;apply()};
 // home: overline + full-body avatar figure (head covering / wig), crossfading on phones, side by side on desktop
 let rot=0;
 function build(){try{
  const act=document.querySelector('.h9act');if(act&&!act.querySelector('#d73dir')){act.insertAdjacentHTML('afterbegin',`<button type="button" id="d73dir" title="החלפת כיוון עיצוב (A / B / C)" aria-label="החלפת כיוון עיצוב">${dir}</button>`)}
  const t=act&&act.querySelector('#d71t');if(t)t.title='צבעים: שחור-לבן וקאמל / זית / כחול / ורוד';
  const hero=document.querySelector('.h9hero');if(!hero)return;
  if(!hero.querySelector('.h73kick')){let m='';try{m=new Date().toLocaleDateString('he-IL',{month:'long'})}catch(_){}hero.insertAdjacentHTML('afterbegin',`<p class="h73kick">הארון של שרה${m?' · '+m:''}</p>`)}
  if(!document.querySelector('.h73fig')){
   const f=document.createElement('div');f.className='h73fig';
   f.innerHTML=`<figure class="h73f on" data-h9="studio" role="button" aria-label="בניית לוק על האווטאר"><img src="av/p5c_front.webp" alt="האווטאר שלך עם כיסוי ראש" decoding="async"><figcaption>עם כיסוי</figcaption></figure><figure class="h73f" data-h9="studio" role="button" aria-label="בניית לוק על האווטאר"><img src="av/p5_front.webp" alt="האווטאר שלך עם פאה" decoding="async"><figcaption>עם פאה</figcaption></figure><div class="h73dots" role="group" aria-label="איך להציג את האווטאר"><button type="button" data-av73="0" aria-pressed="true">כיסוי</button><button type="button" data-av73="1" aria-pressed="false">פאה</button></div>`;
   hero.after(f)}
 }catch(_){}}
 function show(i){const fs=document.querySelectorAll('.h73fig .h73f');fs.forEach((f,k)=>f.classList.toggle('on',k==i));document.querySelectorAll('.h73dots [data-av73]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.av73==i))}
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-av73]');if(!b)return;e.preventDefault();show(+b.dataset.av73);rot=Date.now()},true);
 const calm=matchMedia('(prefers-reduced-motion: reduce)');
 setInterval(()=>{try{if(calm.matches||document.hidden||Date.now()-rot<9000)return;if(document.querySelector('dialog[open]'))return;const on=document.querySelector('.h73fig .h73f.on');if(!on)return;const fs=[...document.querySelectorAll('.h73fig .h73f')];show((fs.indexOf(on)+1)%fs.length)}catch(_){}},4800);
 build();setTimeout(build,400);setTimeout(build,1500);
 // the v71 emoji tidy-up only runs while html.d71 is set: the same tidy-up for html.d73 (leading emoji in labels are tucked away, the label stays)
 const RE=/^(\s*)((?:\p{Extended_Pictographic}|[←-⇿☀-➿⬀-⯿])(?:[️‍⃣]|\p{Emoji_Modifier}|\p{Extended_Pictographic})*)\s+(?=\S)/u;
 const SEL='button,summary,a,label,h2,h3,h4,.tab,.chip,[role=button]';
 function fix(el){if(el.closest('.bnav,#sstage,.e71k')||el.dataset.e71)return;let t=el.firstChild;while(t&&t.nodeType==3&&!t.nodeValue.trim())t=t.nextSibling;if(!t)return;
  if(t.nodeType==1&&t.tagName=='I'&&!t.querySelector('svg')&&RE.test(t.textContent+' x')&&/[֐-׿A-Za-z]/.test(el.textContent.replace(t.textContent,''))){t.classList.add('e71');el.dataset.e71=1;return}
  if(t.nodeType!=3)return;const m=t.nodeValue.match(RE);if(!m)return;const rest=t.nodeValue.slice(m[0].length)+(el.textContent.slice(t.nodeValue.length));if(!/[֐-׿A-Za-z0-9]/.test(rest))return;
  const sp=document.createElement('span');sp.className='e71';sp.textContent=m[2];t.nodeValue=m[1]+t.nodeValue.slice(m[0].length);el.insertBefore(sp,t);el.dataset.e71=1}
 function scan(r){try{if(!root.classList.contains('d73'))return;if(r.matches&&r.matches(SEL))fix(r);r.querySelectorAll&&r.querySelectorAll(SEL).forEach(fix)}catch(_){}}
 let qq=new Set(),tm=0;new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType==1)qq.add(n);if(!tm)tm=setTimeout(()=>{tm=0;const a=[...qq];qq.clear();a.forEach(scan)},60)}).observe(document.body,{childList:true,subtree:true});
 scan(document.body);setTimeout(()=>scan(document.body),1200)}
