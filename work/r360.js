// v181: הסטודיו = the new 8-angle avatar (a8/*.webp, cut from Sara's GPT sheets on the new doll). Sara 25/10 21:00: "הסטודיו נשאר עם האווטאר הישן... לתקן אותו עם כל החדש".
// Every way into "בניית לוק" (bottom bar, item window, look of the day, saved looks) opens this room; the old 5-pose studio is no longer reachable.
// Her whole closet is in the room: items that already have a 360 sheet (READY) are worn on the avatar, every other item offers the one-message GPT prompt to make one.
// The home hero wears the look of the day (built from READY items) – 20:59 "מה שיופיע למעלה בתמונה שלי... הלבוש שחשבת שיכול להתאים".
(function(){
const V='?v='+(window.VER||'');
const NAMES=['חזית','חצי ימין','צד ימין','גב ימין','גב','גב שמאל','צד שמאל','חצי שמאל'];
const BACK=[0,0,0,1,1,1,0,0];            // views where the head covers the ears: earrings go under the hair/scarf
const WB=[1,1,0,0,0,0,0,1];              // views with a 'hair behind the shoulders' wig layer (wb*.webp)
// closet items that already have a 360 sheet → their layer keys (a8/x<key><view>.webp). Every new sheet: cut the layers, then add one line here.
const READY={
 'S1100_0':{k:['d']},        // Omancia שמלת קטיפה ירוקה עם תחרה (25/10 20:53) – lace sleeves, see LACE
 'T591091_2':{k:['b']},      // חולצת בסיס צווארון עומד, כחול כהה עם פרחים מוזהבים
 'S1100_5':{k:['s']},        // GlowEve חצאית ג'ינס מקסי
 'S2QB0_2':{k:['n']},        // Dash Chic נעלי סניקרס גרב שחורות
 'S1100_2':{k:['g']},        // Street Style חגורת עור מערבית עם אבני חן
 'T213':{k:['j','e']},       // סט תכשיטים כחול: השרשרת והעגילים (two sheets)
 'S2QB0_4':{k:['k'],head:1}  // suzhichou צעיף ראש סאטן כחול
};
const KEYOF={};Object.entries(READY).forEach(([id,r])=>r.k.forEach(k=>KEYOF[k]=id));
const SLOT={d:'body',b:'top',s:'bottom',n:'shoes',g:'belt',j:'neck',e:'ears'};
const CLASH={d:['b','s'],b:['d'],s:['d']};   // a dress takes the top and the skirt
// see-through lace: x<k>u<view> is what shows through it (the arm as GPT drew it); with a base shirt it is tinted. value = its mean luminance
const LACE={d:149};
const CAM=[{k:'black',n:'שחור',c:[24,24,26]},{k:'green',n:'ירוק כהה',c:[28,52,40]},{k:'navy',n:'כחול כהה',c:[30,38,66]},{k:'nude',n:'בז׳',c:[206,182,158]},{k:'white',n:'לבן',c:[242,240,234]},{k:'',n:'בלי',c:null}];
const HEADS=[{k:'c',n:'הכיסוי הבסיסי',src:'a8/t_c.webp'},{k:'w',n:'פאה',src:'a8/t_w.webp'}];  // v184: the wig from her 8-angle sheet (25/10 22:17), whole head incl. face, on a head-less doll
Object.entries(READY).forEach(([id,r])=>{if(r.head)HEADS.push({k:r.k[0],id,src:'a8/t_'+r.k[0]+'.webp'})});   // v185: her avatar wearing it (the shop photo was often not loaded yet on the home row → an empty circle)
const CATS=[['all','הכל'],['ready','✓ כבר על האווטאר'],['dresses','שמלות'],['tops','חולצות'],['sweaters','סוודרים'],['skirts','חצאיות'],['sets','סטים'],['outer','ז׳קטים ומעילים'],['scarves','כיסויי ראש'],['shoes','נעליים'],['belts','חגורות'],['jewelry','תכשיטים'],['bags','תיקים']];
const CATIDS=new Set(CATS.slice(2).map(c=>c[0]));
const DEF={on:{b:1,s:1,n:1,g:1,j:1,e:1},head:'c',tuck:0,wb:0,cam:'black',bg:''};
const clone=o=>JSON.parse(JSON.stringify(o));
let ST=load();
// 21:19 she asked to leave the wig until it is redone: start once on the cover
try{if(!localStorage.getItem('r3w181')){localStorage.setItem('r3w181','1');if(ST.head=='w'){ST.head='c';localStorage.setItem('r360',JSON.stringify(ST))}}}catch(_){}
function load(){try{const s=JSON.parse(localStorage.getItem('r360')||'null');if(s&&s.on)return Object.assign(clone(DEF),s,{on:Object.assign({},s.on)})}catch(_){}return clone(DEF)}
function keep(){try{localStorage.setItem('r360',JSON.stringify(ST))}catch(_){}if(DB)DB.collection('r360').doc('state').set(clone(ST)).catch(()=>{})}
let DB=null,L3={};   // L3 = looks saved in the 360 room before v181 (db 'looks360'); new ones go to her main looks (LOOKS)
(async()=>{try{const db=await window.claude?.use?.('db');if(!db)return;DB=db;
 db.collection('looks360').onSnapshot(sn=>{const n={};sn.docs.forEach(d=>{const v=d.data();if(v)n[d.id]=v});L3=n;paintLooks()},()=>{});
 db.collection('r360').doc('state').get().then(d=>{const v=d&&d.exists&&d.data&&d.data();if(v&&v.on&&!localStorage.getItem('r360')){ST=Object.assign(clone(DEF),v);redraw()}}).catch(()=>{})}catch(_){}})();
const toast_=m=>(window.toast||(()=>{}))(m);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cat=id=>{try{return curCat(id)}catch(_){return (D[id]||{}).cat||''}};
const nm=id=>{const x=D[id]||{};return String(x.short||x.full||'').replace(/^[A-Za-z0-9&'.\-\s]+(?=[֐-׿])/,'').trim()};  // the Shein brand name in front is noise
const ph=id=>{try{return img(id)||TPH}catch(_){return ''}};
const thl=ids=>{new Set(ids.map(cat).filter(Boolean)).forEach(c=>{try{thLoad(c).then(()=>thApply(TH)).catch(()=>{})}catch(_){}})};
const occNow=()=>{try{const o=window.occToday83&&occToday83();if(o)return o[0]}catch(_){}return [5,6].includes(new Date().getDay())?'shab':'day'};
const isReady=id=>!!READY[id];

// ---------- images ----------
const IMG={},TINT={};
function im(src){if(!IMG[src]){IMG[src]=new Promise(r=>{const i=new Image();i.decoding='async';i.onload=()=>r(i);i.onerror=()=>r(null);i.src='a8/'+src+'.webp'+V})}return IMG[src]}
// a base shirt under lace: the arm's own light and shade, in the shirt's colour
function tinted(m,rgb,ref){const key=m.src+'|'+rgb;if(TINT[key])return TINT[key];
 const c=document.createElement('canvas');c.width=m.naturalWidth;c.height=m.naturalHeight;const x=c.getContext('2d');x.drawImage(m,0,0);
 const d=x.getImageData(0,0,c.width,c.height),p=d.data,[R,G,B]=rgb;
 for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;const k=(.299*p[i]+.587*p[i+1]+.114*p[i+2])/ref;
  if(k<=1){p[i]=R*k;p[i+1]=G*k;p[i+2]=B*k}else{const h=(k-1)*.6;p[i]=R+(255-R)*h;p[i+1]=G+(255-G)*h;p[i+2]=B+(255-B)*h}}
 x.putImageData(d,0,0);return TINT[key]=c}
const camOf=k=>{const c=CAM.find(c=>c.k==(k==null?'black':k));return c?c.c:null};
function layersFor(v,s){const on=s.on||{},L=[];const x=k=>({s:'x'+k+(v+1)});
 if(on.n)L.push(x('n'));
 Object.keys(LACE).forEach(k=>{if(on[k])L.push({s:'x'+k+'u'+(v+1),t:camOf(s.cam),ref:LACE[k]})});
 if(on.d)L.push(x('d'));
 if(s.tuck){if(on.b)L.push(x('b'));if(on.s)L.push(x('s'))}else{if(on.s)L.push(x('s'));if(on.b)L.push(x('b'))}
 if(on.g)L.push(x('g'));if(on.j)L.push(x('j'));
 const head=s.head=='w'?{s:(s.wb&&WB[v]?'wb':'w')+(v+1)}:(s.head&&s.head!='c')?x(s.head):null;
 if(BACK[v]||s.head=='w'){if(on.e)L.push(x('e'));if(head)L.push(head)}else{if(head)L.push(head);if(on.e)L.push(x('e'))}
 return L}
// ---------- backgrounds (v182): the doll cut out of the blue photo backdrop (a8/c1-8.webp) stands on any background ----------
const FX=[176,167,162,170,182,194,201,189],FY=524;   // feet centre per view, measured on c1-8
const PLAIN=[['white','לבן','#ffffff','#ebe7e2'],['cream','שמנת','#fcf7ef','#e8d9c3'],['blush','ורוד','#fdf0ef','#ecc9c8'],['sage','מרווה','#f2f5ec','#c9d6bc'],['sky','תכלת','#f1f7fc','#c3d7ea'],['stone','אפור','#f0eeeb','#c6c0b8'],['dark','כהה','#4a4244','#1d191a']];
const SCENES=[["garden","גן ורדים"],["jlm","אבן ירושלמית"],["beach","חוף בשקיעה"],["hall","אולם אירועים"],["paris","רחוב בפריז"],["autumn","פארק בסתיו"],["blossom","פריחת דובדבן"],["marble","שיש לבן וזהב"],["floral","טפט פרחים"],["lavender","שדה לבנדר"],["library","ספרייה"],["night","עיר בלילה"],["winter","שלג בחורף"],["desert","מדבר"],["olive","מטע זיתים"],["parch","קשת פסטל"],["bokeh","אורות זהב"],["water","צבעי מים"],["room","חדר מואר"],["cafe","בית קפה"],["lake","אגם והרים"],["sunset","שמיים בשקיעה"],["boutique","בוטיק"],["flowerwall","קיר פרחים"]];
function bgList(){const L=[{k:'',n:'המקורי',css:'linear-gradient(#a7bedf,#c9d7ee)'}];
 PLAIN.forEach(([k,n,a,b])=>L.push({k,n,g:[a,b],css:`linear-gradient(${a},${b})`}));
 SCENES.forEach(([k,n])=>L.push({k:'s_'+k,n,u:'bg/'+k+'.svg',css:`url("bg/${k}.svg${V}") center bottom/cover`}));
 let own=[];try{own=(typeof SET=='object'&&SET&&SET.bgx)||[]}catch(_){}   // the backgrounds she wrote or uploaded in the old studio
 own.forEach(x=>{if(x&&x.k&&x.u)L.push({k:x.k,n:x.n||'שלי',u:x.u,css:`url("${x.u}") center/cover`})});
 return L}
const BGC={};
// one 420×700 picture per background; the scenes are 600×1000 with their floor shadow at y=878 → (210,615) here, put under her feet
function bgCanvas(k){if(BGC[k])return BGC[k];const b=bgList().find(x=>x.k==k);if(!b)return Promise.resolve(null);
 return BGC[k]=(async()=>{const W=420,H=700,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  if(b.g){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,b.g[0]);g.addColorStop(.86,b.g[1]);g.addColorStop(1,b.g[1]);x.fillStyle=g;x.fillRect(0,0,W,H);
   const f=x.createRadialGradient(W/2,615,8,W/2,615,W*.62);f.addColorStop(0,k=='dark'?'rgba(255,255,255,.12)':'rgba(255,255,255,.5)');f.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=f;x.fillRect(0,0,W,H);return c}
  let u=b.u,tmp=null;
  try{if(/\.svg$/.test(u)){const s=await (await fetch(u+V)).text();tmp=URL.createObjectURL(new Blob([s.replace('<svg ','<svg width="600" height="1000" ')],{type:'image/svg+xml'}));u=tmp}}catch(_){}
  const i=await new Promise(r=>{const m=new Image();m.onload=()=>r(m);m.onerror=()=>r(null);m.src=u});if(tmp)setTimeout(()=>URL.revokeObjectURL(tmp),2000);
  if(!i||!i.naturalWidth){delete BGC[k];return null}
  const s=Math.max(W/i.naturalWidth,H/i.naturalHeight),w=i.naturalWidth*s,h=i.naturalHeight*s;x.drawImage(i,(W-w)/2,H-h,w,h);return c})()}
async function paint(cv,v,s){const bg=s.bg||'';const hw=s.head=='w'?'h':'';   // v184: with the wig the doll's own head is taken away (nh/ch), the wig layer brings the whole head
 let base=await im((bg?'c':'n')+hw+(v+1));if(!base&&hw)base=await im((bg?'c':'n')+(v+1));if(!base&&bg)base=await im('n'+(v+1));if(!base)return false;
 const L=layersFor(v,s);const [ms,bc]=await Promise.all([Promise.all(L.map(l=>im(l.s))),bg?bgCanvas(bg):null]);
 const c=cv.getContext('2d');if(cv.width!=base.naturalWidth){cv.width=base.naturalWidth;cv.height=base.naturalHeight}
 c.clearRect(0,0,cv.width,cv.height);
 if(bg){if(bc)c.drawImage(bc,FX[v]-210,FY-615);else{c.fillStyle='#f6efe6';c.fillRect(0,0,cv.width,cv.height)}
  const g=c.createRadialGradient(FX[v],FY+3,2,FX[v],FY+3,52);g.addColorStop(0,'rgba(40,28,20,.30)');g.addColorStop(1,'rgba(40,28,20,0)');c.save();c.translate(FX[v],FY+3);c.scale(1,.16);c.translate(-FX[v],-FY-3);c.fillStyle=g;c.fillRect(FX[v]-60,FY-60,120,126);c.restore()}
 c.drawImage(base,0,0);ms.forEach((m,i)=>{if(!m)return;const l=L[i];c.drawImage(l.t?tinted(m,l.t,l.ref):m,0,0)});return true}
function wornIds(s){const ids=[];if(s.head&&KEYOF[s.head])ids.push(KEYOF[s.head]);Object.keys(s.on||{}).forEach(k=>{const id=KEYOF[k];if(s.on[k]&&id&&!ids.includes(id))ids.push(id)});return ids}
function wearing(s){const a=wornIds(s).map(nm);if(s.head=='w')a.unshift('הפאה');return a.join(' · ')}

// ---------- a turning stage (big in the studio, small on the home screen) ----------
function Stage(host,opt={}){
 const state=opt.state||(()=>ST);
 const el=document.createElement('div');el.className='r3s'+(opt.fade?' slow':'');el.tabIndex=0;el.setAttribute('role','img');
 const cvs=[...Array(8)].map((_,i)=>{const c=document.createElement('canvas');c.width=360;c.height=541;c.className=i?'':'on';el.appendChild(c);return c});
 host.appendChild(el);let cur=0,tm=null,sx=null,si=0,moved=false;
 const api={el,get view(){return cur},onview:null};
 function label(){el.setAttribute('aria-label',`האווטאר שלך מזווית ${NAMES[cur]}. ${wearing(state())?'לובשת: '+wearing(state())+'.':''} גוררים או חצים כדי לסובב.`)}
 api.show=i=>{cur=(i+8)%8;cvs.forEach((c,k)=>c.classList.toggle('on',k==cur));label();api.onview&&api.onview(cur)};
 api.draw=async()=>{const s=state();await Promise.all(cvs.map((c,v)=>paint(c,v,s)));label()};
 api.stop=()=>{if(tm){clearInterval(tm);tm=null;api.onplay&&api.onplay(false)}};
 api.play=(once)=>{api.stop();let n=0;tm=setInterval(()=>{api.show(cur+1);n++;if(once&&n>=8)api.stop()},opt.speed||170);api.onplay&&api.onplay(true)};
 api.playing=()=>!!tm;
 api.speed=ms=>{opt.speed=ms;el.style.setProperty('--r3f',Math.min(450,Math.round(ms*.6))+'ms');if(tm)api.play()};   // v185: the home spin speed she chooses
 el.addEventListener('pointerdown',e=>{api.stop();sx=e.clientX;si=cur;moved=false;try{el.setPointerCapture(e.pointerId)}catch(_){}});
 el.addEventListener('pointermove',e=>{if(sx==null)return;const step=Math.max(22,el.clientWidth/9);const d=Math.round((sx-e.clientX)/step);if(d)moved=true;api.show(si+d)});
 const end=()=>{sx=null};el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
 el.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault()}},true);
 el.addEventListener('keydown',e=>{if(e.key=='ArrowLeft'){api.stop();api.show(cur+1);e.preventDefault()}if(e.key=='ArrowRight'){api.stop();api.show(cur-1);e.preventDefault()}});
 api.draw();label();return api}
const STAGES=new Set();
async function redraw(){for(const s of STAGES)await s.draw();paintRoom()}

// ---------- wearing ----------
function wearItem(id){const r=READY[id];if(!r)return;
 if(r.head){ST.head=ST.head==r.k[0]?'c':r.k[0];return}
 const on=r.k.every(k=>ST.on[k]);
 r.k.forEach(k=>{if(on){ST.on[k]=0;return}ST.on[k]=1;(CLASH[k]||[]).forEach(c=>ST.on[c]=0);Object.keys(ST.on).forEach(o=>{if(o!=k&&SLOT[o]&&SLOT[o]==SLOT[k])ST.on[o]=0})})}
function takeOff(id){const r=READY[id];if(!r)return;if(r.head){if(ST.head==r.k[0])ST.head='c';return}r.k.forEach(k=>ST.on[k]=0)}
function stateFrom(ids,base){const s=Object.assign(clone(DEF),base||{},{on:{}});
 ids.forEach(id=>{const r=READY[id];if(!r)return;if(r.head)s.head=r.k[0];else r.k.forEach(k=>{s.on[k]=1;(CLASH[k]||[]).forEach(c=>{if(!ids.some(o=>READY[o]&&READY[o].k.includes(c)))s.on[c]=0})})});
 return s}

// ---------- the studio ----------
let dlg=null,big=null,TAB='closet',CAT='all',Q='',SHOWN=60,MISS=[],CMP=null;   // CMP = the looks picked to compare (null = not comparing)
function build(){
 dlg=document.createElement('dialog');dlg.id='r360';dlg.setAttribute('aria-label','הסטודיו');dlg.setAttribute('dir','rtl');
 dlg.innerHTML=`<div class="r3w">
 <header class="r3h"><button type="button" class="r3x" aria-label="סגירה">✕</button><div class="r3tt"><small>האווטאר שלך · 360°</small><h2>הסטודיו</h2></div>
  <div class="r3ha"><button type="button" class="r3pin" aria-label="לשים את הלוק הזה בדף הראשי">📌 לדף הראשי</button><button type="button" class="r3save" aria-label="שמירת הלוק">♡ שמירה</button></div></header>
 <div class="r3stage" role="region" aria-label="האווטאר">
  <div class="r3fig"></div>
  <div class="r3miss" hidden></div>
  <div class="r3ctl"><button type="button" class="r3prev" aria-label="זווית קודמת">→</button><div class="r3dots" role="group" aria-label="זוויות"></div><button type="button" class="r3next" aria-label="זווית הבאה">←</button></div>
  <div class="r3ctl r3ctl2"><span class="r3ang" aria-live="polite">חזית</span><button type="button" class="r3play">▶ סיבוב</button><button type="button" class="r3dl" aria-label="תמונה לשליחה בוואטסאפ או לשמירה">📲 לשתף</button></div>
 </div>
 <div class="r3side" role="region" aria-label="מה לובשים">
  <div class="r3blk r3now"><h3>לובשת עכשיו <small class="r3cnt"></small></h3>
   <div class="r3worn"></div>
   <div class="r3hd"><span class="r3lbl">על הראש</span><div class="r3heads" role="radiogroup" aria-label="על הראש"></div></div>
   <label class="r3tuck r3wb"><input type="checkbox"> שיער מאחורי הכתפיים (רואים צווארון ושרשרת)</label>
   <label class="r3tuck r3tk"><input type="checkbox"> חולצה בתוך החצאית</label>
   <div class="r3cam" hidden><span class="r3lbl">גופיית בסיס מתחת לתחרה</span><div class="r3sw" role="radiogroup" aria-label="צבע גופיית הבסיס"></div></div>
   <div class="r3bgw"><span class="r3lbl">רקע <small class="r3bgn"></small></span><div class="r3bgs" role="radiogroup" aria-label="רקע"></div></div>
  </div>
  <div class="r3tabs" role="tablist"><button type="button" role="tab" data-t="closet">👗 הארון שלי</button><button type="button" role="tab" data-t="looks">♡ הלוקים שלי</button></div>
  <div class="r3pane" data-p="closet" role="tabpanel">
   <input type="search" class="r3q" placeholder="חיפוש בארון: שם, צבע…" aria-label="חיפוש בארון">
   <div class="r3cats" role="group" aria-label="קטגוריות"></div>
   <p class="r3hint"></p>
   <div class="r3grid"></div>
   <button type="button" class="r3moreb" hidden>להראות עוד</button>
  </div>
  <div class="r3pane" data-p="looks" role="tabpanel" hidden><div class="r3lt"><button type="button" class="r3cmpb" aria-pressed="false">⚖ להשוות 2 לוקים</button><span class="r3cmph" hidden>בוחרים 2 לוקים (אפשר גם "מה שעליי עכשיו")</span></div><div class="r3looks"></div></div>
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
  b.innerHTML=`<img alt="" src="${h.src?h.src+V:ph(h.id)}"><span>${esc(h.n||nm(h.id))}</span>`;b.onclick=()=>{ST.head=h.k;keep();redraw()};hs.appendChild(b)});
 const sw=dlg.querySelector('.r3sw');CAM.forEach(c=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','radio');b.dataset.cam=c.k;b.setAttribute('aria-label',c.n);
  b.innerHTML=`<i style="background:${c.c?`rgb(${c.c})`:'linear-gradient(135deg,#e9c3a6,#c99476)'}"></i><span>${c.n}</span>`;b.onclick=()=>{ST.cam=c.k;keep();redraw()};sw.appendChild(b)});
 const bgs=dlg.querySelector('.r3bgs');bgList().forEach(b=>{const e=document.createElement('button');e.type='button';e.setAttribute('role','radio');e.dataset.bg=b.k;e.setAttribute('aria-label','רקע: '+b.n);
  e.innerHTML=`<i style='background:${b.css}'></i><span>${esc(b.n)}</span>`;e.onclick=()=>{ST.bg=b.k;keep();redraw()};bgs.appendChild(e)});
 dlg.querySelector('.r3cmpb').onclick=()=>{CMP=CMP?null:[];paintLooks()};
 dlg.querySelector('.r3wb input').onchange=e=>{ST.wb=e.target.checked?1:0;keep();redraw()};
 dlg.querySelector('.r3tk input').onchange=e=>{ST.tuck=e.target.checked?1:0;keep();redraw()};
 dlg.querySelector('.r3save').onclick=saveLook3;dlg.querySelector('.r3pin').onclick=()=>TODAY.pin();dlg.querySelector('.r3dl').onclick=share;
 dlg.querySelectorAll('.r3tabs button').forEach(b=>b.onclick=()=>{TAB=b.dataset.t;paintTabs()});
 const q=dlg.querySelector('.r3q');q.addEventListener('input',()=>{Q=q.value.trim();SHOWN=60;paintGrid()});
 dlg.querySelector('.r3moreb').onclick=()=>{SHOWN+=60;paintGrid()};
 dlg.addEventListener('click',e=>{const t=e.target.closest('button');if(!t||!dlg.contains(t))return;
  if(t.dataset.cat){CAT=t.dataset.cat;SHOWN=60;paintGrid();return}
  if(t.dataset.it){const id=t.dataset.it;if(isReady(id)){wearItem(id);keep();redraw()}else make(id);return}
  if(t.dataset.off){if(t.dataset.off=='w')ST.head='c';else takeOff(t.dataset.off);keep();redraw();return}
  if(t.dataset.mk){make(t.dataset.mk);return}
  if(t.classList.contains('r3missx')){MISS=[];paintMiss();return}
  if(t.dataset.cmp){pickCmp(t.dataset.cmp);return}
  if(t.dataset.l3pin){TODAY.pinLook(t.dataset.l3pin);return}
  if(t.dataset.look){useLook(t.dataset.look);nudgePin();return}
  if(t.dataset.l3){const l=L3[t.dataset.l3];if(l){ST=Object.assign(clone(DEF),{on:Object.assign({},l.on||{}),head:l.head||'c',tuck:l.tuck?1:0,wb:l.wb?1:0,cam:l.cam==null?'black':l.cam});MISS=[];keep();redraw();paintMiss();big.show(0);nudgePin()}return}
  if(t.dataset.l3x){const id=t.dataset.l3x;if(DB)DB.collection('looks360').doc(id).delete().catch(()=>{});delete L3[id];paintLooks();return}});
 paintCats();paintTabs();paintRoom();paintLooks()}
function paintTabs(){if(!dlg)return;dlg.querySelectorAll('.r3tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.t==TAB));dlg.querySelectorAll('.r3pane').forEach(p=>p.hidden=p.dataset.p!=TAB);if(TAB=='closet')paintGrid();else paintLooks()}
function paintRoom(){if(!dlg)return;
 dlg.querySelectorAll('.r3heads button').forEach(b=>b.setAttribute('aria-checked',b.dataset.h==ST.head));
 const ids=wornIds(ST);const wv=dlg.querySelector('.r3worn');
 const chips=ids.map(id=>`<button type="button" class="r3wc" data-off="${id}" aria-label="להוריד: ${esc(nm(id))}"><img alt="" data-th="${id}" src="${ph(id)}"><span>${esc(nm(id))}</span><b aria-hidden="true">✕</b></button>`);
 if(ST.head=='w')chips.unshift(`<button type="button" class="r3wc" data-off="w" aria-label="להוריד: הפאה"><img alt="" src="a8/t_w.webp${V}"><span>הפאה שלי</span><b aria-hidden="true">✕</b></button>`);
 wv.innerHTML=chips.join('')||'<p class="r3note">עוד לא לבשת כלום. בוחרים למטה מהארון.</p>';thl(ids);
 dlg.querySelector('.r3cnt').textContent=ids.length?`${ids.length} פריטים`:'';
 const t=dlg.querySelector('.r3tk');t.hidden=!(ST.on.b&&ST.on.s);t.querySelector('input').checked=!!ST.tuck;
 const w=dlg.querySelector('.r3wb');w.hidden=ST.head!='w';w.querySelector('input').checked=!!ST.wb;
 const bn=bgList().find(b=>b.k==(ST.bg||''));dlg.querySelector('.r3bgn').textContent=bn?bn.n:'';
 dlg.querySelectorAll('.r3bgs button').forEach(b=>b.setAttribute('aria-checked',b.dataset.bg==(ST.bg||'')));
 const cm=dlg.querySelector('.r3cam');cm.hidden=!Object.keys(LACE).some(k=>ST.on[k]);cm.querySelectorAll('button').forEach(b=>b.setAttribute('aria-checked',b.dataset.cam==(ST.cam==null?'black':ST.cam)));
 dlg.querySelectorAll('.r3grid [data-it]').forEach(b=>{if(isReady(b.dataset.it))b.setAttribute('aria-pressed',ids.includes(b.dataset.it))})}

// her closet, by category; items with a 360 sheet first
function pool(){return Object.keys(D).filter(id=>{if(!CATIDS.has(cat(id)))return false;const it=(typeof IT=='object'&&IT&&IT[id])||{};if(it.gen||it.oos||it.s=='ret'||it.s=='give')return false;return true})}
function paintCats(){if(!dlg)return;const P=pool();const n=c=>c=='all'?P.length:c=='ready'?P.filter(isReady).length:P.filter(id=>cat(id)==c).length;
 dlg.querySelector('.r3cats').innerHTML=CATS.map(([k,t])=>{const c=n(k);return c||k=='all'?`<button type="button" data-cat="${k}" aria-pressed="${k==CAT}">${t} <small>${c}</small></button>`:''}).join('')}
function paintGrid(){if(!dlg||TAB!='closet')return;dlg.querySelectorAll('.r3cats button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.cat==CAT));
 let ids=pool();if(CAT=='ready')ids=ids.filter(isReady);else if(CAT!='all')ids=ids.filter(id=>cat(id)==CAT);
 if(Q){const q=Q.toLowerCase();ids=ids.filter(id=>{const x=D[id]||{};return (x.short+' '+x.full+' '+(x.color||'')).toLowerCase().includes(q)})}
 const order=Object.fromEntries(CATS.map((c,i)=>[c[0],i]));ids.sort((a,b)=>(isReady(b)-isReady(a))||(order[cat(a)]-order[cat(b)]));
 const r=ids.filter(isReady).length,worn=wornIds(ST);
 dlg.querySelector('.r3hint').textContent=ids.length?(CAT=='ready'?'לוחצים כדי ללבוש או להוריד.':`${r?`${r} כבר על האווטאר (מסומנים 360°), לוחצים כדי ללבוש. `:''}לשאר צריך גיליון 360 – לוחצים ואני מסבירה איך.`):'לא מצאתי פריטים.';
 const sh=ids.slice(0,SHOWN);
 dlg.querySelector('.r3grid').innerHTML=sh.map(id=>{const ok=isReady(id);return `<button type="button" class="r3c${ok?' ok':''}" data-it="${id}"${ok?` aria-pressed="${worn.includes(id)}"`:''}><span class="r3ph"><img alt="" loading="lazy" data-th="${id}" src="${ph(id)}"></span><span class="r3n">${esc(nm(id))}</span><span class="r3b">${ok?'360°':(window.up188&&up188(id))?'⏳ הועלה, מחכה':'עוד לא ב-360'}</span></button>`}).join('');
 const mb=dlg.querySelector('.r3moreb');mb.hidden=ids.length<=SHOWN;mb.textContent=`להראות עוד (${ids.length-SHOWN})`;thl(sh)}
function paintMiss(){if(!dlg)return;const m=dlg.querySelector('.r3miss');m.hidden=!MISS.length;if(!MISS.length){m.innerHTML='';return}
 m.innerHTML=`<p>עוד ${MISS.length==1?'פריט אחד':MISS.length+' פריטים'} מהלוק בלי 360:</p><div>${MISS.map(id=>`<button type="button" data-mk="${id}" aria-label="${esc(nm(id))}: איך להכין"><img alt="" data-th="${id}" src="${ph(id)}"></button>`).join('')}</div><button type="button" class="r3missx" aria-label="סגירה">✕</button>`;thl(MISS)}

// looks: her saved looks (LOOKS, the album); the ones saved here also keep the avatar picture
function paintLooks(){if(!dlg)return;const box=dlg.querySelector('.r3looks');let LK={};try{LK=LOOKS||{}}catch(_){}
 const main=Object.entries(LK).filter(([id,l])=>l&&l.items&&!l.auto).sort((a,b)=>String(b[1].created||'').localeCompare(String(a[1].created||'')));
 const old=Object.entries(L3).sort((a,b)=>(b[1].t||0)-(a[1].t||0));
 const cb=dlg.querySelector('.r3cmpb');cb.setAttribute('aria-pressed',!!CMP);cb.textContent=CMP?'✕ ביטול השוואה':'⚖ להשוות 2 לוקים';dlg.querySelector('.r3cmph').hidden=!CMP;
 dlg.querySelector('.r3lt').hidden=main.length+old.length<1;
 if(!main.length&&!old.length){box.innerHTML='<p class="r3note">עוד אין. מלבישים ולוחצים "♡ שמירה".</p>';return}
 const ids=[],sel=k=>CMP&&CMP.includes(k);
 const act=(k,id,attr)=>CMP?`data-cmp="${k}" aria-pressed="${sel(k)}"`:`${attr}="${id}"`;
 box.innerHTML=(CMP?`<button type="button" class="r3l r3now" data-cmp="now" aria-pressed="${sel('now')}"><span class="r3lm r3lnow">👗</span><span><b>מה שעליי עכשיו</b><small>${esc(wearing(ST)||'האווטאר כמו שהוא')}</small></span></button>`:'')+
  main.map(([id,l])=>{const its=Object.values(l.items).filter(x=>D[x]);const r=its.filter(isReady).length;its.slice(0,3).forEach(x=>ids.push(x));
  const pic=l.th360?`<img class="r3lb" alt="" src="${l.th360}">`:`<span class="r3lm">${its.slice(0,4).map(x=>`<img alt="" data-th="${x}" src="${ph(x)}">`).join('')}</span>`;
  return `<div class="r3lw"><button type="button" class="r3l" ${act('m:'+id,id,'data-look')}>${pic}<span><b>${esc(l.name||'לוק')}</b><small>${r} מתוך ${its.length} על האווטאר</small></span></button>${CMP||!r?'':pinB('m:'+id,l.name)}</div>`}).join('')+
  old.map(([id,l])=>`<div class="r3lw"><button type="button" class="r3l" ${act('o:'+id,id,'data-l3')}><img class="r3lb" alt="" src="${l.th||''}"><span><b>${esc(l.name||'לוק')}</b><small>מהחדר הקודם</small></span></button>${CMP?'':`<button type="button" class="r3lx" data-l3x="${id}" aria-label="למחוק את ${esc(l.name||'הלוק')}">✕</button>`+pinB('o:'+id,l.name)}</div>`).join('');
 thl(ids)}
// ---------- compare 2 looks side by side, turning together (v182) ----------
function lookOf(k){let LK={};try{LK=LOOKS||{}}catch(_){}
 if(k=='now')return {name:'מה שעליי עכשיו',s:clone(ST),miss:MISS.slice()};
 if(k.startsWith('m:')){const l=LK[k.slice(2)];if(!l)return null;const its=Object.values(l.items||{}).filter(x=>D[x]);
  const s=l.r360?Object.assign(clone(DEF),clone(l.r360)):stateFrom(its,{head:ST.head,cam:ST.cam,bg:ST.bg});if(l.r360&&l.r360.bg==null)s.bg=ST.bg;if(!l.r360&&!its.some(x=>READY[x]&&READY[x].head))s.head=ST.head=='w'?'w':s.head;
  return {name:l.name||'לוק',s,miss:its.filter(x=>!isReady(x)&&CATIDS.has(cat(x))),id:k.slice(2)}}
 if(k.startsWith('o:')){const l=L3[k.slice(2)];if(!l)return null;return {name:l.name||'לוק',s:Object.assign(clone(DEF),{on:Object.assign({},l.on||{}),head:l.head||'c',tuck:l.tuck?1:0,wb:l.wb?1:0,cam:l.cam==null?'black':l.cam,bg:ST.bg}),miss:[]}}
 return null}
function pickCmp(k){if(!CMP)return;const i=CMP.indexOf(k);if(i>=0)CMP.splice(i,1);else CMP.push(k);
 if(CMP.length>=2){const a=lookOf(CMP[0]),b=lookOf(CMP[1]);CMP=null;paintLooks();if(a&&b)compare(a,b);return}paintLooks()}
let CD=null;
function compare(a,b){if(!CD){CD=document.createElement('dialog');CD.id='r3cmp';CD.dir='rtl';CD.setAttribute('aria-label','השוואה בין 2 לוקים');document.body.appendChild(CD);
  CD.addEventListener('click',e=>{if(e.target===CD)CD.close()});CD.addEventListener('close',()=>{(CD._st||[]).forEach(s=>s.stop());CD._st=[]})}
 const L=[a,b];
 CD.innerHTML=`<div class="cw"><div class="ch"><h3>⚖ השוואה</h3><button type="button" class="cx" aria-label="סגירה">✕</button></div>
  <div class="cg">${L.map((l,i)=>`<div class="cc"><div class="cf" data-i="${i}"></div><b>${esc(l.name)}</b><small>${esc(wearing(l.s)||'בלי בגדים מהארון')}${l.miss.length?` · עוד ${l.miss.length} בלי 360`:''}</small><button type="button" class="cwear" data-i="${i}">👗 ללבוש את זה</button></div>`).join('')}</div>
  <div class="r3ctl"><button type="button" class="cp" aria-label="זווית קודמת">→</button><span class="cang" aria-live="polite">חזית</span><button type="button" class="cn" aria-label="זווית הבאה">←</button><button type="button" class="cpl">▶ סיבוב</button></div></div>`;
 let lock=false;const st=L.map((l,i)=>Stage(CD.querySelector(`.cf[data-i="${i}"]`),{speed:420,state:()=>l.s}));CD._st=st;
 const sync=v=>{if(lock)return;lock=true;st.forEach(s=>{if(s.view!=v)s.show(v)});CD.querySelector('.cang').textContent=NAMES[v];lock=false};
 st.forEach(s=>s.onview=sync);
 const pl=CD.querySelector('.cpl');st[0].onplay=on=>{pl.textContent=on?'⏸ עצירה':'▶ סיבוב'};st[1].onplay=null;
 const stopAll=()=>st.forEach(s=>s.stop());
 CD.querySelector('.cp').onclick=()=>{stopAll();sync((st[0].view+7)%8)};CD.querySelector('.cn').onclick=()=>{stopAll();sync((st[0].view+1)%8)};
 pl.onclick=()=>{if(st[0].playing())stopAll();else{st[1].stop();st[0].play()}};
 CD.querySelector('.cx').onclick=()=>CD.close();
 CD.querySelectorAll('.cwear').forEach(btn=>btn.onclick=()=>{const l=L[+btn.dataset.i];ST=clone(l.s);MISS=l.miss.slice();keep();CD.close();redraw();paintMiss();big&&big.show(0);toast_('👗 '+l.name)});
 if(!CD.open)CD.showModal()}
function useLook(id){let l=null;try{l=LOOKS[id]}catch(_){}if(!l)return;
 const bg=ST.bg;if(l.r360){ST=Object.assign(clone(DEF),clone(l.r360));if(l.r360.bg==null)ST.bg=bg;MISS=Object.values(l.items||{}).filter(x=>D[x]&&!isReady(x))}else applyIds(Object.values(l.items||{}),true);
 keep();redraw();paintMiss();big&&big.show(0);toast_(`👗 ${l.name||'הלוק'}`)}
function applyIds(ids,reset){ids=ids.filter(id=>D[id]);
 if(reset){const head=ST.head;ST.on={};ST.tuck=0;ST.head=ids.some(id=>READY[id]&&READY[id].head)?'c':head}
 ids.filter(isReady).forEach(id=>{const r=READY[id];if(r.head){ST.head=r.k[0];return}if(!r.k.every(k=>ST.on[k]))wearItem(id)});
 MISS=ids.filter(id=>!isReady(id)&&CATIDS.has(cat(id)))}
async function thumb(){const c=document.createElement('canvas');await paint(c,0,ST);const t=document.createElement('canvas');t.width=120;t.height=180;t.getContext('2d').drawImage(c,0,0,120,180);return t.toDataURL('image/jpeg',.82)}
async function saveLook3(){const ids=wornIds(ST);if(!ids.length&&ST.head!='w'){toast_('עוד לא לבשת כלום');return}
 const items={};ids.forEach(id=>{let s='extra';try{s=slotOf(id)}catch(_){}if(!items[s])items[s]=id});
 MISS.forEach(id=>{let s='extra';try{s=slotOf(id)}catch(_){}if(!items[s])items[s]=id});
 const th=await thumb();let id=null;
 try{id=await saveLook(items,occNow(),null)}catch(_){}
 if(id&&LOOKS[id]){LOOKS[id].r360=clone(ST);LOOKS[id].th360=th;try{await saveDoc('looks',id,LOOKS[id])}catch(_){}}
 else if(DB){const k='l'+Date.now().toString(36);L3[k]={name:'לוק · '+new Date().toLocaleDateString('he-IL'),on:clone(ST.on),head:ST.head,tuck:ST.tuck,wb:ST.wb,cam:ST.cam,t:Date.now(),th};DB.collection('looks360').doc(k).set(L3[k]).catch(()=>{})}
 paintLooks();toast_('♡ הלוק נשמר')}
async function saveFile(name,blob){let dl=null;try{dl=await window.claude?.use?.('downloads')}catch(_){}
 try{if(dl){await dl.save({filename:name,data:blob});return}}catch(e){if(e&&e.code=='declined')return}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove()}
// ---------- a picture to send (WhatsApp) or keep: 3 angles or one, her title, the items (v182) ----------
let SH=null,SHL='3',SHT='',SHB=null,NOIT=false;   // NOIT: an item photo from another site blocked the picture → leave the photos out
const ldImg=u=>new Promise(r=>{if(!u)return r(null);const i=new Image();if(/^https?:/.test(u)&&!u.startsWith(location.origin))i.crossOrigin='anonymous';i.onload=()=>r(i);i.onerror=()=>r(null);i.src=u});
function rr(x,X,Y,W,H,R){x.beginPath();x.moveTo(X+R,Y);x.arcTo(X+W,Y,X+W,Y+H,R);x.arcTo(X+W,Y+H,X,Y+H,R);x.arcTo(X,Y+H,X,Y,R);x.arcTo(X,Y,X+W,Y,R);x.closePath()}
async function card(){const views=SHL=='3'?[0,2,4]:[big?big.view:0];const pw=SHL=='3'?318:600,ph_=Math.round(pw*541/360),gap=24,tot=views.length*pw+(views.length-1)*gap,top=182;
 const ids=NOIT?[]:wornIds(ST).slice(0,6),y0=top+ph_+44,tw=136,th=170;
 const W=1080,H=y0+(ids.length?th+64:0)+70,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');   // the height follows what is on it
 try{await Promise.all(['700 64px "Frank Ruhl Libre"','500 30px Heebo','700 30px Heebo'].map(f=>document.fonts.load(f)))}catch(_){}
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#fcf8f2');g.addColorStop(1,'#efe4d4');x.fillStyle=g;x.fillRect(0,0,W,H);
 x.direction='rtl';x.textAlign='center';x.fillStyle='#2d211b';x.font='700 64px "Frank Ruhl Libre", serif';x.fillText(SHT||'הלוק שלי',W/2,104);
 x.font='500 28px Heebo, sans-serif';x.fillStyle='#87725f';let dt='';try{dt=new Date().toLocaleDateString('he-IL',{weekday:'long',day:'numeric',month:'long'})}catch(_){}x.fillText(dt,W/2,148);
 const cv=document.createElement('canvas');
 for(let i=0;i<views.length;i++){await paint(cv,views[i],ST);const X=W-(W-tot)/2-(i+1)*pw-i*gap;   // right to left: front first
  x.save();x.shadowColor='rgba(60,40,20,.18)';x.shadowBlur=24;x.shadowOffsetY=8;rr(x,X,top,pw,ph_,26);x.fillStyle='#fff';x.fill();x.restore();
  x.save();rr(x,X,top,pw,ph_,26);x.clip();x.drawImage(cv,X,top,pw,ph_);x.restore()}
 if(ids.length){try{await Promise.all([...new Set(ids.map(cat))].map(k=>thLoad(k)))}catch(_){}
  const ims=await Promise.all(ids.map(id=>ldImg(ph(id))));const tg=22,tt=ids.length*tw+(ids.length-1)*tg;
  ids.forEach((id,i)=>{const X=W-(W-tt)/2-(i+1)*tw-i*tg;x.save();rr(x,X,y0,tw,th,18);x.fillStyle='#fff';x.fill();x.clip();const m=ims[i];
   if(m){const s=Math.min((tw-12)/m.naturalWidth,(th-12)/m.naturalHeight);x.drawImage(m,X+(tw-m.naturalWidth*s)/2,y0+(th-m.naturalHeight*s)/2,m.naturalWidth*s,m.naturalHeight*s)}x.restore();
   x.font='500 21px Heebo, sans-serif';x.fillStyle='#4a3a30';let n=nm(id);while(n.length>3&&x.measureText(n).width>tw+12)n=n.slice(0,-2);if(n!=nm(id))n=n.trim()+'…';x.fillText(n,X+tw/2,y0+th+32)})}
 x.font='700 26px Heebo, sans-serif';x.fillStyle='#b5562f';x.fillText('הארון של שרה ✦',W/2,H-30);
 return c}
async function share(){if(!SH){SH=document.createElement('dialog');SH.id='r3sh';SH.dir='rtl';SH.setAttribute('aria-labelledby','r3sht');document.body.appendChild(SH);
  SH.innerHTML=`<div class="sw"><div class="sh"><h3 id="r3sht">📲 תמונה לשליחה</h3><button type="button" class="sx" aria-label="סגירה">✕</button></div>
   <div class="spv"><img alt="התמונה שתישלח"></div>
   <label class="stl">כותרת<input type="text" maxlength="40" placeholder="הלוק שלי"></label>
   <div class="slay" role="radiogroup" aria-label="כמה זוויות"><button type="button" role="radio" data-l="3">3 זוויות</button><button type="button" role="radio" data-l="1">זווית אחת (הנוכחית)</button></div>
   <div class="sbt"><button type="button" class="ssend">📲 לשלוח</button><button type="button" class="ssave">⬇ לשמור</button></div>
   <p class="snote"></p></div>`;
  SH.addEventListener('click',e=>{if(e.target===SH)SH.close()});SH.querySelector('.sx').onclick=()=>SH.close();
  let tm=null;SH.querySelector('.stl input').addEventListener('input',e=>{SHT=e.target.value.trim();clearTimeout(tm);tm=setTimeout(prev,350)});
  SH.querySelectorAll('.slay button').forEach(b=>b.onclick=()=>{SHL=b.dataset.l;prev()});
  SH.querySelector('.ssave').onclick=async()=>{if(SHB)await saveFile('look.png',SHB)};
  SH.querySelector('.ssend').onclick=async()=>{if(!SHB)return;const f=new File([SHB],'look.png',{type:'image/png'});const note=SH.querySelector('.snote');
   try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:SHT||'הלוק שלי'});return}}catch(e){if(e&&e.name=='AbortError')return}
   await saveFile('look.png',SHB);note.textContent='שמרתי את התמונה. בוואטסאפ: 📎 ← גלריה ← look.png'}}
 SH.querySelector('.stl input').value=SHT;SH.querySelector('.snote').textContent='';if(!SH.open)SH.showModal();prev()}
let PV=0;
async function prev(){if(!SH)return;const me=++PV;SH.querySelectorAll('.slay button').forEach(b=>b.setAttribute('aria-checked',b.dataset.l==SHL));
 const im_=SH.querySelector('.spv img');im_.style.opacity=.5;const c=await card();if(me!=PV)return;
 try{SHB=await new Promise((r,j)=>{try{c.toBlob(r,'image/png')}catch(e){j(e)}})}catch(e){if(!NOIT){NOIT=true;return prev()}return}if(me!=PV)return;if(im_.src.startsWith('blob:'))URL.revokeObjectURL(im_.src);im_.src=URL.createObjectURL(SHB);im_.style.opacity=1}

// ---------- "how do I get this item onto the avatar": one GPT message (Sara's rule) ----------
const ME='גובה 156 ס"מ, חזה 94, מותן 73, ירכיים 96';
const KIND={dress:['שמלה','השמלה מכסה את השמלה בצבע עור. הכתפיים, הצווארון והשרוולים בדיוק כמו בתמונה.',1,1],
 top:['חולצה','החולצה יושבת על הכתפיים שלה, השרוולים על הידיים שלה, באורך שבתמונה. החולצה בחוץ, לא בתוך השמלה.',1],
 base:['חולצת בסיס','זו חולצת בסיס דקה וצמודה שלובשים מתחת לבגדים אחרים: צמודה לגוף, בלי קפלים גדולים, הצווארון והשרוולים בדיוק כמו בתמונה.',1],
 sweater:['סוודר','הסוודר מעל השמלה, עם הנפח של הבד הסרוג, השרוולים על הידיים שלה.',1],
 skirt:['חצאית','החצאית מתחילה בקו המותן שלה ונופלת עד האורך האמיתי.',1,1],
 pants:['מכנסיים','המכנסיים מתחילים בקו המותן שלה ומגיעים עד האורך האמיתי.',1,1],
 set:['סט (2 חלקים)','זה סט של שני חלקים, ואני צריכה כל חלק בנפרד:\nתמונה 1: הגיליון עם החלק העליון בלבד.\nתמונה 2: הגיליון עם החלק התחתון בלבד.',1,1,2],
 vest:['אפודה','אפודה בלי שרוולים, מעל השמלה. הידיים והשרוולים הקצרים של השמלה נשארים בדיוק כמו שהם.',1,1],
 jacket:['ז\'קט','הז\'קט מעל השמלה, פתוח או סגור בדיוק כמו בתמונה, השרוולים על הידיים שלה.',1],
 coat:['מעיל','המעיל מעל הכל, פתוח או סגור בדיוק כמו בתמונה, באורך האמיתי שלו.',1,1],
 cover:['כיסוי ראש','כיסוי הראש מחליף את כיסוי הבז׳ הפשוט שעל הדמות ומסתיר אותו לגמרי, כולל השוליים. בצד ובגב צרי אותו כמו שהוא נראה באמת מהכיוון הזה.',0,0,1,'head'],
 scarf:['מטפחת','המטפחת קשורה בדיוק כמו בתמונה: אותה קשירה, אותו נפח, אותו קשר. היא מחליפה את כיסוי הבז׳ הפשוט שעל הדמות ומסתירה אותו לגמרי. בצד ובגב צרי את הקשר כמו שהוא נראה באמת מהכיוון הזה.',0,0,1,'head'],
 necklace:['שרשרת','רק השרשרת, גם אם בתמונה יש עוד תכשיטים. על הצוואר, באורך האמיתי שלה, נופלת על החזה כמו במציאות. מקדימה רואים את כל השרשרת והתליון, מהצד רואים אותה יורדת מהצוואר, ומהגב רק את השרשרת הדקה על העורף (אם רואים אותה).',0,0,1,'jw'],
 earrings:['עגילים','רק העגילים, גם אם בתמונה יש עוד תכשיטים. על שתי האוזניים, באותו גודל ובאותו אורך כמו בתמונה. אם כיסוי הראש מכסה חלק מהאוזן, תנוך האוזן והעגיל יוצאים מתחתיו ונראים. מקדימה רואים את שני העגילים, מהצד רק את העגיל שבצד הזה.',0,0,1,'jw'],
 bracelet:['צמיד','רק הצמיד, על פרק היד השמאלי, באותו גודל כמו בתמונה. בזוויות שהיד מוסתרת לא רואים אותו.',0,0,1,'jw'],
 jwset:['סט תכשיטים','בתמונת המוצר יש כמה תכשיטים. אני צריכה כל תכשיט בתמונה נפרדת (שרשרת לבד, עגילים לבד). בכל תמונה רק תכשיט אחד, בלי האחרים.',0,0,2,'jw'],
 belt:['חגורה','החגורה על קו המותן שלה, מסביב לכל הגוף, בדיוק באותו רוחב ואותו אבזם כמו בתמונה. בצד היד עוברת מעל החגורה.',0,0,1,'more'],
 shoes:['נעליים','הנעליים האלה במקום הנעליים הבז\'. אותו מיקום של הרגליים, אותה עמידה. מקדימה, מהצד ומאחור צרי את הנעל כמו שהיא נראית באמת מהכיוון הזה.',0,0,1,'more'],
 bag:['תיק','התיק תלוי על הכתף, בגודל האמיתי שלו ביחס לגוף, בלי לשנות את תנוחת הידיים. מהגב ומהצד רואים אותו כמו במציאות.',0,0,1,'more']};
function kindOf(id){const c=cat(id),t=(D[id]||{}).short+' '+(D[id]||{}).full;
 if(c=='dresses')return 'dress';if(c=='skirts')return /מכנס/.test(t)?'pants':'skirt';if(c=='sets')return 'set';if(c=='sweaters')return 'sweater';
 if(c=='tops')return /בסיס/.test(t)?'base':/סוודר|סריג/.test(t)?'sweater':'top';
 if(c=='outer')return /מעיל/.test(t)?'coat':/וסט|אפוד/.test(t)?'vest':'jacket';
 if(c=='scarves')return /כובע|כיסוי/.test(t)&&!/מטפחת|צעיף/.test(t)?'cover':'scarf';
 if(c=='jewelry')return /סט/.test(t)||(/עגיל/.test(t)&&/שרשר/.test(t))?'jwset':/עגיל/.test(t)?'earrings':/צמיד|שעון/.test(t)?'bracelet':'necklace';
 if(c=='belts')return 'belt';if(c=='shoes')return 'shoes';if(c=='bags')return 'bag';return 'top'}
function prompt(id){const K=KIND[kindOf(id)];const [t,how,body,len,n=1,g='cloth']=K;const x=D[id]||{};const item=`${t} – ${nm(id)}${x.color?', צבע: '+x.color:''}`;const P=[];
 P.push(`מצורפות שתי תמונות.\nהתמונה הראשונה: מה שקניתי – ${item}.\nהתמונה השנייה: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.`);
 P.push((n>1?'':`הלבישי את הדמות ב${g=='jw'?'תכשיט':'פריט'} הזה בכל 8 הזוויות. אותו פריט בדיוק בכל המשבצות: אותו צבע, אותו בד, אותה גזרה, אותו גודל. `)+how+(n>1?'\nבכל תמונה: אותו פריט בדיוק בכל 8 הזוויות, אותו צבע, אותו בד, אותו גודל, ובצד ובגב כמו שהוא נראה באמת מהכיוון הזה.':''));
 if(g=='cloth')P.push('אם בתמונת המוצר יש עוד בגדים או אביזרים שלא כתבתי, הם לא שלי: אל תוסיפי אותם. בלי חגורה, גם אם בתמונה יש חגורה.');
 P.push(`אל תשני שום דבר אחר: אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותם פנים בדיוק, אותה תנוחה, אותו רקע, אותם קווים לבנים בין המשבצות. כל מה שהדמות כבר לובשת בגיליון (כיסוי ראש בז׳, שמלה בצבע עור) נשאר בדיוק אותו דבר${g=='head'?', חוץ מהראש':''}. השמלה בצבע עור נשארת בכל מקום שהפריט לא מכסה.`);
 if(body)P.push(`המידות שלי: ${ME}. הדמות כבר בנויה לפי המידות האלה, אל תשני את הגוף. המידות הן כדי שהפריט יישב נכון, צמוד או רחב כמו במציאות.`+(len?'\nשמרי על אותו אורך ביחס לגוף כמו בתמונת המוצר, ואותו אורך בכל 8 הזוויות.':''));
 if(g=='cloth')P.push('הבגד צריך להיראות אמיתי על הגוף: קפלים, צללים, הבד נופל לפי התנוחה. לבן בבגד נשאר לבן.');
 P.push(n>1?`החזירי ${n} תמונות נפרדות, אחת לכל ${g=='jw'?'תכשיט':'חלק'}. כל תמונה היא אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.`:'החזירי תמונה אחת: אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.');
 return P.join('\n\n')}
let MK=null,MKID='';
function mkDlg(){
 if(!MK){MK=document.createElement('dialog');MK.id='r3mk';MK.dir='rtl';MK.setAttribute('aria-labelledby','r3mkt');document.body.appendChild(MK);
  MK.addEventListener('click',async e=>{if(e.target===MK)return MK.close();const b=e.target.closest('button');if(!b)return;
   if(b.classList.contains('mkx'))return MK.close();
   if(b.dataset.mk=='photo'){try{let u=ph(MKID);if(!u||u==TPH){await thLoad(cat(MKID));u=ph(MKID)}const bl=await (await fetch(u)).blob();saveFile('item-'+MKID+'.jpg',bl)}catch(_){toast_('לא הצלחתי. אפשר צילום מסך של המוצר')}return}
   if(b.dataset.mk=='sheet'){try{const bl=await (await fetch('a8/sheet.jpg'+V)).blob();saveFile('avatar-8-angles.jpg',bl)}catch(_){toast_('לא הצלחתי לשמור')}return}
   if(b.dataset.mk=='copy'){const t=MK.querySelector('textarea');let ok=false;try{await navigator.clipboard.writeText(t.value);ok=true}catch(_){try{t.select();ok=document.execCommand('copy')}catch(__){}}
    b.textContent=ok?'✓ הועתק – עכשיו ל-GPT':'סימנתי, להעתיק ידנית';if(!ok){const d=MK.querySelector('details');if(d)d.open=true;t.select()}setTimeout(()=>b.textContent='📋 להעתיק את הפרומפט',2600)}
   if(b.dataset.mk=='closet'){MK.close();open();TAB='closet';CAT='all';Q='';const q=dlg.querySelector('.r3q');if(q)q.value='';paintTabs();toast_('לוחצים על בגד שכתוב עליו "עוד לא ב-360"')}})}
 return MK}
function make(id){MKID=id;mkDlg();
 const k=KIND[kindOf(id)];
 MK.innerHTML=`<div class="mk"><div class="mkh"><h3 id="r3mkt">"${esc(nm(id))}" על האווטאר</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <div class="mki"><img alt="" data-th="${id}" src="${ph(id)}"><p>לפריט הזה עוד אין גיליון 360, אז הוא עוד לא יכול להופיע על האווטאר. ככה מכינים אותו (${k[4]>1?k[4]+' תמונות חוזרות':'2 דקות'}):</p></div>
  <ol class="mks">
   <li><b>שומרים 2 תמונות</b><span class="mkb"><button type="button" data-mk="photo">⬇ תמונת הפריט</button><button type="button" data-mk="sheet">⬇ הבובה ב-8 זוויות</button></span><small>אם יש תמונה יותר טובה של המוצר מהאתר, עדיף אותה.</small></li>
   <li><b>ב-GPT, בשיחה חדשה:</b> מצרפים את שתי התמונות (קודם הפריט, אחר כך הבובה), מדביקים את הפרומפט ושולחים. הכל בהודעה אחת.<span class="mkb"><button type="button" data-mk="copy" class="mkp">📋 להעתיק את הפרומפט</button></span></li>
   <li><b>את מה שחוזר</b> מעלים כאן, ואני מלבישה את זה על האווטאר בכל 8 הזוויות.<span class="mkb"><button type="button" data-up188="${id}" class="mkp">📤 להעלות את מה שחזר מ-GPT</button></span><small data-mkst188="${id}">${window.mkst188?mkst188(id):''}</small></li>
  </ol>
  <details><summary>לראות את הפרומפט</summary><textarea readonly rows="10">${esc(prompt(id))}</textarea></details></div>`;
 thl([id]);if(!MK.open)MK.showModal()}

// every GPT prompt for the 360 avatar in one place (Sara 21:39 "איפה הפרומפטים")
const WIGP=`מצורפות שתי תמונות.
התמונה הראשונה: הפאה שלי מכמה כיוונים.
התמונה השנייה: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון השני, אל תציירי אותו מחדש. שני דבר אחד בלבד: במקום כיסוי הראש הבז׳ שימי את הפאה שלי מהתמונה הראשונה. אותו צבע, אותו אורך, אותה חלוקה ואותו נפח. כיסוי הבז׳ נעלם לגמרי. השיער יושב על הראש בגודל טבעי, לא גבוה ולא רחב מדי. בצד ובגב צרי את השיער כמו שהוא נראה באמת מהכיוון הזה.

הפנים לא משתנים בכלל: אותם פנים, אותה הבעה, אותו חיוך, אותו עור. הראש באותו גודל ובאותו מקום בדיוק בכל משבצת.

אל תשני שום דבר אחר: אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותה תנוחה, אותו רקע, אותם קווים לבנים בין המשבצות. השמלה בצבע עור נשארת.

החזירי תמונה אחת: אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.`;
function prompts(){mkDlg();MKID='';
 MK.innerHTML=`<div class="mk"><div class="mkh"><h3 id="r3mkt">📋 פרומפטים ל-GPT</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <ol class="mks">
   <li><b>בגד מהארון:</b> בסטודיו, בלשונית "👗 הארון שלי", לוחצים על בגד שכתוב עליו "עוד לא ב-360". נפתח חלון עם תמונת הבגד, הבובה והפרומפט של הבגד הזה בדיוק.<span class="mkb"><button type="button" data-mk="closet" class="mkp">👗 לבחור בגד</button></span></li>
   <li><b>הפאה שלי:</b> מצרפים קודם תמונה של הפאה (מכמה כיוונים), אחר כך את הבובה ב-8 זוויות, ומדביקים את הפרומפט. הכל בהודעה אחת.<span class="mkb"><button type="button" data-mk="sheet">⬇ הבובה ב-8 זוויות</button><button type="button" data-mk="copy" class="mkp">📋 להעתיק את הפרומפט</button></span>
    <details><summary>לראות את הפרומפט</summary><textarea readonly rows="10">${esc(WIGP)}</textarea></details></li>
   <li><b>את מה שחוזר מ-GPT</b> שולחים לי בצ׳אט, ואני מלבישה את זה על האווטאר בכל 8 הזוויות.</li>
  </ol></div>`;
 if(!MK.open)MK.showModal()}

// ---------- open ----------
function open(){if(!dlg)build();
 document.querySelectorAll('dialog[open]').forEach(d=>{if(d!==dlg&&d.id!='r3mk')try{d.close()}catch(_){}});
 if(!dlg.open){dlg.showModal();document.documentElement.classList.add('r3on')}paintCats();paintTabs();paintRoom();paintMiss();big.show(0);
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.documentElement.dataset.still&&!sessionStorage.getItem('r3spun')){sessionStorage.setItem('r3spun',1);setTimeout(()=>big.play(true),400)}}
function close(){if(big)big.stop();if(dlg&&dlg.open)dlg.close();document.documentElement.classList.remove('r3on')}
// every "בניית לוק" goes here: openStudio() = the studio as it was left; openStudio(look) = a saved look; openStudio(null,{slot:id,...}) = try one item / a suggested look
function openWith(look,items){MISS=[];
 if(look&&typeof look=='object'){if(look.r360){const bg=ST.bg;ST=Object.assign(clone(DEF),clone(look.r360));if(look.r360.bg==null)ST.bg=bg;MISS=Object.values(look.items||{}).filter(x=>D[x]&&!isReady(x))}else applyIds(Object.values(look.items||{}),true)}
 else if(items&&typeof items=='object'){const ids=Object.values(items).filter(id=>typeof id=='string'&&D[id]);
  if(ids.length==1){const id=ids[0];if(isReady(id)){const r=READY[id];if(r.head)ST.head=r.k[0];else if(!r.k.every(k=>ST.on[k]))wearItem(id)}keep();open();redraw();if(!isReady(id))make(id);else toast_('👗 '+nm(id));return}
  applyIds(ids,true)}
 keep();open();redraw()}
function hook(){if(typeof openStudio!='function')return setTimeout(hook,300);
 openStudio=async function(look,items){openWith(look,items)}}
hook();

// ---------- look of the day on the avatar (home hero) ----------
// built by the closet's own outfit maker (genLook: occasion, season, colours) but only from items that are already on the avatar
function genReady(){const avoid=new Set(Object.keys(D).filter(id=>!isReady(id)));const occ=occNow();let sea='';try{sea=curSeason()}catch(_){}
 let best=null;for(let t=0;t<14;t++){let L=null;try{L=genLook({occ:t<7?occ:(occ=='shab'?'day':'shab'),sea,fav:false,kids:false},avoid)}catch(_){}
  if(!L)continue;const ids=Object.values(L).filter(isReady);const full=ids.some(id=>cat(id)=='dresses')||(ids.some(id=>['tops','sweaters'].includes(cat(id)))&&ids.some(id=>cat(id)=='skirts'));
  if(full){best=ids;break}if(!best||ids.length>best.length)best=ids}
 const R=Object.keys(READY).filter(id=>D[id]);
 if(!best||!best.some(id=>['dresses','tops','skirts'].includes(cat(id)))){const day=+new Date().toISOString().slice(0,10).replace(/-/g,'');const dr=R.filter(id=>cat(id)=='dresses');
  best=(dr.length&&(occ=='shab'||day%2))?[dr[day%dr.length]]:R.filter(id=>['tops','skirts','belts'].includes(cat(id)));R.filter(id=>['shoes','jewelry'].includes(cat(id))).forEach(id=>best.push(id))}
 return [...new Set(best)]}
function lotd(fresh){const d=new Date().toISOString().slice(0,10),o=occNow();let c=null;try{c=JSON.parse(localStorage.getItem('lotd360')||'null')}catch(_){}
 if(fresh||!c||c.d!=d||c.o!=o||!c.ids||!c.ids.every(id=>isReady(id))){c={d,o,ids:genReady()};try{localStorage.setItem('lotd360',JSON.stringify(c))}catch(_){}}
 return c}
// what the home avatar wears: her pinned look ("📌 לדף הראשי" in the studio) or the look of the day; the head is her own choice (Sara 21:17: "לא תמיד עם פאה")
let HOME=(()=>{try{return Object.assign({head:'c',pin:null},JSON.parse(localStorage.getItem('r3home')||'{}'))}catch(_){return {head:'c',pin:null}}})();
function saveHome(){try{localStorage.setItem('r3home',JSON.stringify(HOME))}catch(_){}if(DB)DB.collection('r360').doc('home').set(clone(HOME)).catch(()=>{});STAGES.forEach(s=>s.today&&s.draw());HOMEL.forEach(f=>{try{f()}catch(_){}})}
const HOMEL=new Set();
// v185 (Sara 22:41 "אם בחרתי לוק אני רוצה שיופיע במסך הראשי, אין לי כפתור"): "📌 לדף הראשי" on the studio, on every saved look and in the looks album –
// it puts the look on the home avatar and jumps there, so she sees it happen
function pinGo(s,name){HOME.pin=clone(s);HOME.head=s.head||'c';saveHome();close();
 document.querySelectorAll('dialog[open]').forEach(d=>{try{d.close()}catch(_){}});
 const hb=document.querySelector('.bnav [data-bn="home"]');if(hb)hb.click();else window.scrollTo({top:0,behavior:'smooth'});
 const av=document.querySelector('#h180 .z-av');if(av){av.classList.remove('z-pin185');void av.offsetWidth;av.classList.add('z-pin185');setTimeout(()=>av.classList.remove('z-pin185'),2600)}
 toast_(name?`📌 "${name}" בדף הראשי`:'📌 הלוק הזה בדף הראשי')}
const pinB=(k,n)=>`<button type="button" class="r3lp" data-l3pin="${esc(k)}" aria-label="לשים את ${esc(n||'הלוק')} בדף הראשי">📌 לדף הראשי</button>`;
function nudgePin(){const b=dlg&&dlg.querySelector('.r3pin');if(!b)return;b.classList.remove('r3nudge');void b.offsetWidth;b.classList.add('r3nudge');setTimeout(()=>b.classList.remove('r3nudge'),3200)}
(async()=>{try{const db=await window.claude?.use?.('db');if(!db)return;const d=await db.collection('r360').doc('home').get();const v=d&&d.exists&&d.data&&d.data();
 if(v&&!localStorage.getItem('r3home')){HOME=Object.assign({head:'c',pin:null},v);STAGES.forEach(s=>s.today&&s.draw());HOMEL.forEach(f=>{try{f()}catch(_){}})}}catch(_){}})();
let LOTD=null;const lotdIds=()=>{if(!LOTD)LOTD=lotd();return LOTD.ids.filter(id=>!READY[id].head)};
function homeState(){const head=HOME.head||'c';
 if(HOME.pin)return Object.assign(clone(DEF),clone(HOME.pin),{head});
 return stateFrom(lotdIds(),{head,cam:ST.cam,wb:ST.wb,bg:ST.bg})}
const TODAY={state:homeState,
 ids:()=>{const s=homeState();return wornIds(s).filter(id=>!READY[id].head)},
 pinned:()=>!!HOME.pin,heads:()=>HEADS.map(h=>({k:h.k,n:h.n||nm(h.id).split(' ').slice(0,2).join(' '),src:h.src?h.src+V:ph(h.id)})),head:()=>HOME.head||'c',
 setHead:k=>{HOME.head=k;saveHome()},
 pin:()=>pinGo(ST),
 pinLook:k=>{const o=lookOf(k);if(!o)return;if(!wornIds(o.s).length)return toast_('אין עוד בגד מהלוק הזה על האווטאר 360');pinGo(o.s,o.name)},
 pinIds:(ids,name)=>{ids=ids.filter(id=>D[id]);if(!ids.some(isReady))return toast_('אין עוד בגד מהלוק הזה על האווטאר 360');pinGo(stateFrom(ids.filter(isReady),{head:HOME.head||'c',cam:ST.cam,bg:ST.bg}),name)},
 unpin:()=>{HOME.pin=null;saveHome()},
 next:()=>{HOME.pin=null;LOTD=lotd(true);saveHome();return TODAY.ids()},
 onchange:f=>HOMEL.add(f),
 wear:()=>{const s=homeState();ST=Object.assign(clone(DEF),clone(s));MISS=[];keep();open();redraw()}};

// the looks album and the suggested looks ("הלוקים שלי") get the same "📌 לדף הראשי"
try{if(typeof lookHTML=='function'){const _lh=lookHTML;lookHTML=function(L,idx,saved){const h=_lh.apply(this,arguments);
 return h.replace('<div class="lb">',`<div class="lb"><button type="button" class="lb185" ${saved?`data-pin185="${esc(saved.id)}"`:`data-pin185g="${idx}"`}>📌 לדף הראשי</button>`)}}}catch(e){(window.ERRS=window.ERRS||[]).push('v185 hub pin: '+e.message)}
try{if(typeof albumHTML=='function'){const _al=albumHTML;albumHTML=async function(){const h=await _al.apply(this,arguments);
 return String(h).replace(/<div class="lb"><button data-sedit="([^"]+)">/g,(m0,id)=>`<div class="lb"><button type="button" class="lb185" data-pin185="${id}">📌 לדף הראשי</button><button data-sedit="${id}">`)}}}catch(e){(window.ERRS=window.ERRS||[]).push('v185 album pin: '+e.message)}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-pin185],[data-pin185g]');if(!b)return;e.preventDefault();e.stopPropagation();
 if(b.dataset.pin185!=null)TODAY.pinLook('m:'+b.dataset.pin185);else{let L=null;try{L=GEN[+b.dataset.pin185g]}catch(_){}if(L)TODAY.pinIds(Object.values(L),'הלוק')}},true);

window.R360={open,close,make,prompts,openWith,Stage:(host,o)=>{const s=Stage(host,o);if(o&&o.today)s.today=1;STAGES.add(s);return s},wearing:()=>wearing(ST),today:TODAY,
 ready:()=>Object.keys(READY).filter(id=>D[id]),readyCount:()=>{const P=pool();return [P.filter(isReady).length,P.length]},nm,ph};
})();
