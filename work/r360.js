// v180: חדר הלבשה 360° – the new 8-angle avatar (a8/*.webp, cut from Sara's GPT sheets on the new doll) with every item as its own layer.
// "בניית לוק" with no item opens this room; trying a closet item ("לנסות על הדמות") still opens the full studio, which is one tap away from here.
(function(){
const V='?v='+(window.VER||'');
const NAMES=['חזית','חצי ימין','צד ימין','גב ימין','גב','גב שמאל','צד שמאל','חצי שמאל'];
const BACK=[0,0,0,1,1,1,0,0];            // views where the head covers the ears: earrings go under the hair/scarf
// items on the 360 doll. k = file key (a8/x<k><view>.webp); order below is only "what covers what"
const ITEMS=[
 {k:'b',n:'חולצה כחולה בפרחים',g:'בגדים',ic:'👚'},
 {k:'s',n:'חצאית ג׳ינס מקסי',g:'בגדים',ic:'👗'},
 {k:'n',n:'סניקרס שחורות',g:'נעליים',ic:'👟'},
 {k:'g',n:'חגורה עם אבנים',g:'אביזרים',ic:'💎'},
 {k:'j',n:'שרשרת כחולה',g:'תכשיטים',ic:'📿'},
 {k:'e',n:'עגילי פנינה',g:'תכשיטים',ic:'✨'}];
const HEADS=[{k:'c',n:'כיסוי בז׳',ic:'🧕'},{k:'w',n:'פאה',ic:'💇'},{k:'k',n:'מטפחת כחולה',ic:'🧣'}];
const DEF={on:{b:1,s:1,n:1,g:1,j:1,e:1},head:'c',tuck:0,wb:0};
const WB=[1,1,0,0,0,0,0,1]; // views with a 'hair behind the shoulders' wig layer (wb*.webp); the others are the same either way
let ST=load();
function load(){try{const s=JSON.parse(localStorage.getItem('r360')||'null');if(s&&s.on)return Object.assign({},DEF,s,{on:Object.assign({},s.on)})}catch(_){}return JSON.parse(JSON.stringify(DEF))}
function keep(){try{localStorage.setItem('r360',JSON.stringify(ST))}catch(_){}if(DB)DB.collection('r360').doc('state').set(JSON.parse(JSON.stringify(ST))).catch(()=>{})}
let DB=null,LOOKS={};
(async()=>{try{const db=await window.claude?.use?.('db');if(!db)return;DB=db;
 db.collection('looks360').onSnapshot(sn=>{const n={};sn.docs.forEach(d=>{const v=d.data();if(v)n[d.id]=v});LOOKS=n;paintLooks()},()=>{});
 db.collection('r360').doc('state').get().then(d=>{const v=d&&d.exists&&d.data&&d.data();if(v&&v.on&&!localStorage.getItem('r360')){ST=Object.assign({},DEF,v);redraw()}}).catch(()=>{})}catch(_){}})();

// ---------- images ----------
const IMG={};
function im(src){if(!IMG[src]){IMG[src]=new Promise(r=>{const i=new Image();i.decoding='async';i.onload=()=>r(i);i.onerror=()=>r(null);i.src='a8/'+src+'.webp'+V})}return IMG[src]}
function layersFor(v,s){const on=s.on,L=[];const x=k=>'x'+k+(v+1);
 if(on.n)L.push(x('n'));
 if(s.tuck){if(on.b)L.push(x('b'));if(on.s)L.push(x('s'))}else{if(on.s)L.push(x('s'));if(on.b)L.push(x('b'))}
 if(on.g)L.push(x('g'));if(on.j)L.push(x('j'));
 const head=s.head=='w'?(s.wb&&WB[v]?'wb':'w')+(v+1):s.head=='k'?x('k'):null;
 if(BACK[v]||s.head=='w'){if(on.e)L.push(x('e'));if(head)L.push(head)}else{if(head)L.push(head);if(on.e)L.push(x('e'))}
 return L}
async function paint(cv,v,s){const base=await im('n'+(v+1));if(!base)return false;const ls=await Promise.all(layersFor(v,s).map(im));
 const c=cv.getContext('2d');if(cv.width!=base.naturalWidth){cv.width=base.naturalWidth;cv.height=base.naturalHeight}
 c.clearRect(0,0,cv.width,cv.height);c.drawImage(base,0,0);ls.forEach(l=>{if(l)c.drawImage(l,0,0)});return true}
function wearing(s){const a=ITEMS.filter(i=>s.on[i.k]).map(i=>i.n);const h=HEADS.find(h=>h.k==s.head);if(h)a.unshift(h.n);return a.join(', ')}

// ---------- a turning stage (used big in the room and small on the home screen) ----------
function Stage(host,opt={}){
 const el=document.createElement('div');el.className='r3s';el.tabIndex=0;el.setAttribute('role','img');
 const cvs=[...Array(8)].map((_,i)=>{const c=document.createElement('canvas');c.width=360;c.height=541;c.className=i?'':'on';el.appendChild(c);return c});
 host.appendChild(el);let cur=0,tm=null,sx=null,si=0,moved=false;
 const api={el,get view(){return cur},onview:null};
 function label(){el.setAttribute('aria-label',`האווטאר שלך מזווית ${NAMES[cur]}. לובשת: ${wearing(ST)}. גוררים או חצים כדי לסובב.`)}
 api.show=i=>{cur=(i+8)%8;cvs.forEach((c,k)=>c.classList.toggle('on',k==cur));label();api.onview&&api.onview(cur)};
 api.draw=async()=>{await Promise.all(cvs.map((c,v)=>paint(c,v,ST)));label()};
 api.stop=()=>{if(tm){clearInterval(tm);tm=null;api.onplay&&api.onplay(false)}};
 api.play=(once)=>{api.stop();let n=0;tm=setInterval(()=>{api.show(cur+1);n++;if(once&&n>=8)api.stop()},opt.speed||170);api.onplay&&api.onplay(true)};
 api.playing=()=>!!tm;
 el.addEventListener('pointerdown',e=>{api.stop();sx=e.clientX;si=cur;moved=false;try{el.setPointerCapture(e.pointerId)}catch(_){}});
 el.addEventListener('pointermove',e=>{if(sx==null)return;const step=Math.max(22,el.clientWidth/9);const d=Math.round((sx-e.clientX)/step);if(d)moved=true;api.show(si+d)});
 const end=()=>{sx=null};el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
 el.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault()}},true);
 el.addEventListener('keydown',e=>{if(e.key=='ArrowLeft'){api.stop();api.show(cur+1);e.preventDefault()}if(e.key=='ArrowRight'){api.stop();api.show(cur-1);e.preventDefault()}});
 api.draw();label();return api}
const STAGES=new Set();
async function redraw(){for(const s of STAGES)await s.draw();paintRoom()}

// ---------- the room ----------
let dlg=null,big=null;
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function build(){
 dlg=document.createElement('dialog');dlg.id='r360';dlg.setAttribute('aria-label','חדר הלבשה 360');dlg.setAttribute('dir','rtl');
 dlg.innerHTML=`<div class="r3w">
 <header class="r3h"><button type="button" class="r3x" aria-label="סגירה">✕</button><div class="r3tt"><small>האווטאר החדש · 360°</small><h2>חדר הלבשה</h2></div>
  <div class="r3ha"><button type="button" class="r3save" aria-label="שמירת הלוק">♡ שמירה</button></div></header>
 <div class="r3stage" role="region" aria-label="האווטאר">
  <div class="r3fig"></div>
  <div class="r3ctl"><button type="button" class="r3prev" aria-label="זווית קודמת">→</button><div class="r3dots" role="group" aria-label="זוויות"></div><button type="button" class="r3next" aria-label="זווית הבאה">←</button></div>
  <div class="r3ctl r3ctl2"><span class="r3ang" aria-live="polite">חזית</span><button type="button" class="r3play">▶ סיבוב</button><button type="button" class="r3dl" aria-label="לשמור תמונה">⬇ תמונה</button></div>
 </div>
 <div class="r3side" role="region" aria-label="מה לובשים">
  <div class="r3blk"><h3>על הראש</h3><div class="r3heads" role="radiogroup" aria-label="על הראש"></div>
   <label class="r3tuck r3wb"><input type="checkbox"> שיער מאחורי הכתפיים (רואים צווארון ושרשרת)</label></div>
  <div class="r3blk"><h3>מה לובשת <small class="r3cnt"></small></h3><div class="r3items"></div>
   <label class="r3tuck"><input type="checkbox"> חולצה בתוך החצאית</label></div>
  <div class="r3blk r3lk"><h3>הלוקים שלי ב-360</h3><div class="r3looks"></div></div>
  <div class="r3blk r3more"><button type="button" class="r3old">👗 כל הבגדים בסטודיו המלא</button>
   <a class="r3add" href="https://claude.ai/artifact/T45B8XHpo1gawrzxv4vfGy" target="_blank" rel="noopener">＋ להוסיף פריט לאווטאר (פרומפט ל-GPT)</a>
   <p class="r3note">כל פריט חדש: גיליון 8 זוויות מ-GPT, שולחים לי בצ׳אט ואני מוסיפה אותו לכאן.</p></div>
 </div></div>`; // divs, not <section>: the closet filter treats every <section> as a category
 document.body.appendChild(dlg);
 big=Stage(dlg.querySelector('.r3fig'),{speed:150});STAGES.add(big);
 const dots=dlg.querySelector('.r3dots');NAMES.forEach((n,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',n);b.onclick=()=>{big.stop();big.show(i)};dots.appendChild(b)});
 big.onview=v=>{[...dots.children].forEach((b,k)=>b.setAttribute('aria-pressed',k==v));dlg.querySelector('.r3ang').textContent=NAMES[v]};big.show(0);
 const pb=dlg.querySelector('.r3play');big.onplay=on=>{pb.textContent=on?'⏸ עצירה':'▶ סיבוב';pb.setAttribute('aria-pressed',on)};
 pb.onclick=()=>big.playing()?big.stop():big.play();
 dlg.querySelector('.r3prev').onclick=()=>{big.stop();big.show(big.view-1)};dlg.querySelector('.r3next').onclick=()=>{big.stop();big.show(big.view+1)};
 dlg.querySelector('.r3x').onclick=()=>close();dlg.addEventListener('cancel',e=>{e.preventDefault();close()});
 const hs=dlg.querySelector('.r3heads');HEADS.forEach(h=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','radio');b.dataset.h=h.k;
  b.innerHTML=`<img alt="" src="a8/t_${h.k}.webp${V}"><span>${h.n}</span>`;b.onclick=()=>{ST.head=h.k;keep();redraw()};hs.appendChild(b)});
 const it=dlg.querySelector('.r3items');ITEMS.forEach(i=>{const b=document.createElement('button');b.type='button';b.dataset.k=i.k;
  b.innerHTML=`<span class="r3im"><img alt="" src="a8/t_${i.k}.webp${V}"></span><span class="r3nm">${i.n}</span><span class="r3ck" aria-hidden="true"></span>`;
  b.onclick=()=>{ST.on[i.k]=ST.on[i.k]?0:1;keep();redraw()};it.appendChild(b)});
 dlg.querySelector('.r3wb input').onchange=e=>{ST.wb=e.target.checked?1:0;keep();redraw()};
 dlg.querySelector('.r3tuck:not(.r3wb) input').onchange=e=>{ST.tuck=e.target.checked?1:0;keep();redraw()};
 dlg.querySelector('.r3old').onclick=()=>{close();OLD()};
 dlg.querySelector('.r3save').onclick=saveLook;dlg.querySelector('.r3dl').onclick=download;
 paintRoom();paintLooks()}
function paintRoom(){if(!dlg)return;
 dlg.querySelectorAll('.r3heads button').forEach(b=>b.setAttribute('aria-checked',b.dataset.h==ST.head));
 dlg.querySelectorAll('.r3items button').forEach(b=>b.setAttribute('aria-pressed',!!ST.on[b.dataset.k]));
 const n=ITEMS.filter(i=>ST.on[i.k]).length;dlg.querySelector('.r3cnt').textContent=`${n} מתוך ${ITEMS.length}`;
 const t=dlg.querySelector('.r3tuck:not(.r3wb)');t.hidden=!(ST.on.b&&ST.on.s);t.querySelector('input').checked=!!ST.tuck;
 const w=dlg.querySelector('.r3wb');w.hidden=ST.head!='w';w.querySelector('input').checked=!!ST.wb}
function paintLooks(){if(!dlg)return;const box=dlg.querySelector('.r3looks');const L=Object.entries(LOOKS).sort((a,b)=>(b[1].t||0)-(a[1].t||0));
 box.innerHTML=L.length?'':'<p class="r3note">עוד אין. מלבישים ולוחצים "♡ שמירה".</p>';
 L.forEach(([id,l])=>{const b=document.createElement('button');b.type='button';b.className='r3l';b.innerHTML=`<img alt="" src="${l.th||''}"><span>${esc(l.name||'לוק')}</span>`;
  b.onclick=()=>{ST={on:Object.assign({},l.on||{}),head:l.head||'c',tuck:l.tuck?1:0,wb:l.wb?1:0};keep();redraw();big&&big.show(0)};
  const x=document.createElement('button');x.type='button';x.className='r3lx';x.setAttribute('aria-label','למחוק את '+(l.name||'הלוק'));x.textContent='✕';
  x.onclick=e=>{e.stopPropagation();if(DB)DB.collection('looks360').doc(id).delete().catch(()=>{});delete LOOKS[id];paintLooks()};
  const w=document.createElement('div');w.className='r3lw';w.append(b,x);box.appendChild(w)})}
async function thumb(){const c=document.createElement('canvas');await paint(c,0,ST);const t=document.createElement('canvas');t.width=120;t.height=180;t.getContext('2d').drawImage(c,0,0,120,180);return t.toDataURL('image/jpeg',.82)}
async function saveLook(){const n=Object.keys(LOOKS).length+1;const name=`לוק ${n} · ${new Date().toLocaleDateString('he-IL',{day:'numeric',month:'numeric'})}`;
 const doc={name,on:Object.assign({},ST.on),head:ST.head,tuck:ST.tuck,wb:ST.wb||0,t:Date.now(),th:await thumb()};const id='l'+Date.now().toString(36);
 LOOKS[id]=doc;paintLooks();if(DB)DB.collection('looks360').doc(id).set(doc).catch(()=>{});(window.toast||alert)('♡ הלוק נשמר')}
async function download(){const c=document.createElement('canvas');await paint(c,big?big.view:0,ST);const blob=await new Promise(r=>c.toBlob(r,'image/png'));
 let dl=null;try{dl=await window.claude?.use?.('downloads')}catch(_){}
 try{if(dl){await dl.save({filename:'avatar-360.png',data:blob});return}}catch(e){if(e&&e.code=='declined')return}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='avatar-360.png';document.body.appendChild(a);a.click();a.remove()}
function open(){if(!dlg)build();if(!dlg.open){dlg.showModal();document.documentElement.classList.add('r3on')}big.show(0);
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('r3spun')){sessionStorage.setItem('r3spun',1);setTimeout(()=>big.play(true),400)}}
function close(){if(big)big.stop();if(dlg&&dlg.open)dlg.close();document.documentElement.classList.remove('r3on')}
// "בניית לוק" without an item → the room; with an item (or a saved old look) → the full studio as before
let OLD=()=>{};
function hook(){if(typeof openStudio!='function')return setTimeout(hook,300);const _os=openStudio;OLD=()=>_os();
 openStudio=async function(look,items){if(!look&&!items&&!window.__r3full){open();return}window.__r3full=0;return _os.apply(this,arguments)}}
hook();
window.R360={open,close,Stage:(host,o)=>{const s=Stage(host,o);STAGES.add(s);return s},wearing:()=>wearing(ST),full:()=>{window.__r3full=1;close();openStudio()}};
})();
