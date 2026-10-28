// v299 (Sara 28/10 16:00 "איך אני יכולה גם לשדרג את ההזמנות … לעשות את זה בקלות"): a new order goes in from the site itself – she picks the receipt
// (the PDF from Temu / Shein, or screenshots of it), Claude reads every product (name, colour, size, price, category) and where its picture is, she checks
// the list, and one button puts the whole order in the closet: one item per product (IT[id].my, shown by wore234 addMine) with its picture, "on the way".
// The same order twice is refused (its number is already in the closet).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v299rc '+w+': '+(e&&(e.code||e.message)||e));
const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=m=>{try{window.toast&&toast(m)}catch(_){}};
const TO=(p,ms,v)=>Promise.race([p,new Promise(r=>setTimeout(()=>r(v),ms))]);
const PDFJS='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
const CATS=[['dresses','שמלות'],['skirts','חצאיות'],['sets','סטים'],['pants','מכנסיים'],['tops','חולצות'],['base','חולצות בסיס'],['sweaters','סוודרים'],['outer',"ז'קטים ומעילים"],['scarves','כיסויי ראש וצעיפים'],['belts','חגורות'],['jewelry','תכשיטים'],['shoes','נעליים'],['bags','תיקים'],['hosiery','גרביונים וגרביים'],['night','הלבשה תחתונה ולילה'],['hair','אביזרי שיער'],['makeup','איפור וטיפוח'],['girls','בנות'],['boys','בנים'],['men','גברים'],['wedding','חתונה ואירועים'],['other','בית ושונות']];
const ACC=[['t1','טמו 1'],['t2','טמו 2'],['t3','טמו 3'],['sh','שיין'],['ae','עלי']];
// her Temu accounts: the order number's last 4 digits tell which (1091 = 1, 1005 = 2, 1206 = 3); Shein numbers start with GSH
function accOf(o){o=String(o||'').toUpperCase();if(/^GSH/.test(o))return 'sh';const d=o.replace(/\D/g,'');const e=d.slice(-4);if(/^P[O0]-?\d/.test(o)||d.length>=20)return e=='1091'?'t1':e=='1005'?'t2':e=='1206'?'t3':'';return d.length>=12?'ae':''}
// Temu prints PO-…, the closet keeps P0-… (v144)
const normOrd=o=>{o=String(o||'').trim().toUpperCase().replace(/\s+/g,'');return o.replace(/^PO-/,'P0-')};
const have=o=>{const k=normOrd(o);return !!k&&Object.keys(D).some(id=>D[id]&&normOrd(D[id].order)==k)};
function loadPdf(){if(window.pdfjsLib)return Promise.resolve(window.pdfjsLib);return new Promise((ok,no)=>{const s=document.createElement('script');s.src=PDFJS+'pdf.min.js';
 s.onload=()=>{try{pdfjsLib.GlobalWorkerOptions.workerSrc=PDFJS+'pdf.worker.min.js';ok(pdfjsLib)}catch(e){no(e)}};s.onerror=()=>no(new Error('pdfjs'));document.head.appendChild(s)})}
async function toPages(files){const P=[];
 for(const f of files){if(/pdf/i.test(f.type)||/\.pdf$/i.test(f.name||'')){const L=await loadPdf(),doc=await L.getDocument({data:new Uint8Array(await f.arrayBuffer())}).promise;
   for(let i=1;i<=Math.min(doc.numPages,12);i++){const pg=await doc.getPage(i),v0=pg.getViewport({scale:1}),v=pg.getViewport({scale:1200/v0.width}),c=document.createElement('canvas');c.width=Math.round(v.width);c.height=Math.round(v.height);
    const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);await pg.render({canvasContext:g,viewport:v}).promise;P.push(c)}}
  else{const u=URL.createObjectURL(f);try{const im=new Image();im.src=u;await im.decode();const s=Math.min(1,1400/im.naturalWidth),c=document.createElement('canvas');c.width=Math.round(im.naturalWidth*s);c.height=Math.round(im.naturalHeight*s);
   c.getContext('2d').drawImage(im,0,0,c.width,c.height);P.push(c)}finally{URL.revokeObjectURL(u)}}}
 return P}
const blob=(c,q)=>new Promise(r=>c.toBlob(r,'image/jpeg',q||.85));
// the model's box is close, not exact: inside a slightly bigger box the picture is the block of rows and columns that are mostly not white
function snap(c,b){const W=c.width,H=c.height;let [x0,y0,x1,y1]=b.map(Number);if(![x0,y0,x1,y1].every(isFinite))return null;if(x1<x0)[x0,x1]=[x1,x0];if(y1<y0)[y0,y1]=[y1,y0];
 const px=(x1-x0)*.25,py=(y1-y0)*.25;let X0=Math.max(0,Math.floor((x0-px)*W)),X1=Math.min(W,Math.ceil((x1+px)*W)),Y0=Math.max(0,Math.floor((y0-py)*H)),Y1=Math.min(H,Math.ceil((y1+py)*H));
 if(X1-X0<12||Y1-Y0<12)return null;const d=c.getContext('2d').getImageData(X0,Y0,X1-X0,Y1-Y0).data,w=X1-X0,h=Y1-Y0,R=new Float32Array(h),C=new Float32Array(w);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const q=(y*w+x)*4;if(Math.max(Math.abs(d[q]-250),Math.abs(d[q+1]-250),Math.abs(d[q+2]-250))>16){R[y]++;C[x]++}}
 const run=(A,n,t)=>{let best=[0,n],bl=0,s=-1;for(let i=0;i<=n;i++){const on=i<n&&A[i]>t;if(on&&s<0)s=i;if(!on&&s>=0){if(i-s>bl){bl=i-s;best=[s,i]}s=-1}}return bl?best:[0,n]};
 const [ry0,ry1]=run(R,h,w*.3),[cx0,cx1]=run(C,w,h*.3);const o={x:X0+cx0,y:Y0+ry0,w:cx1-cx0,h:ry1-ry0};return o.w>20&&o.h>20?o:{x:Math.round(x0*W),y:Math.round(y0*H),w:Math.round((x1-x0)*W),h:Math.round((y1-y0)*H)}}
function crop(c,r){const o=document.createElement('canvas');o.width=r.w;o.height=r.h;o.getContext('2d').drawImage(c,r.x,r.y,r.w,r.h,0,0,r.w,r.h);return o}

// ---- the window
let dlg=null,S=null,BUSY=false;
function make(){if(dlg)return dlg;dlg=document.createElement('dialog');dlg.id='rp299';dlg.setAttribute('aria-label','קבלה חדשה');
 dlg.innerHTML='<div class="rp9h"><h3>🧾 הזמנה חדשה מקבלה</h3><button type="button" class="rp9x" aria-label="סגירה">✕</button></div><div class="rp9b"></div>';document.body.appendChild(dlg);
 dlg.addEventListener('click',onClick);dlg.addEventListener('change',onChange);dlg.addEventListener('input',onChange);
 dlg.addEventListener('close',()=>{if(S&&S.done)try{const o=document.getElementById('ord123');if(o&&o.open&&window.openOrders123)openOrders123(S.ord||'')}catch(_){}});return dlg}
const B=()=>make().querySelector('.rp9b');
const busy=t=>{B().innerHTML=`<div class="rp9busy"><i></i><span>${es(t)}</span></div>`};
const fail=t=>{B().innerHTML=`<p class="rp9err">${es(t)}</p>`;BUSY=false};
async function run(files){if(BUSY)return;BUSY=true;S={items:[]};const d=make();if(!d.open)d.showModal();busy('פותחת את הקבלה…');
 try{let sample=null;try{sample=await TO(claude.use('sample'),12000,null)}catch(_){}
  const lim=sample?await TO(sample.limits().catch(()=>null),8000,null):null;
  if(!sample||!lim||!lim.images)return fail('אין לי כאן גישה לקריאת תמונות. אפשר לשלוח לי את הקבלה בצ׳אט, ואכניס אותה.');
  let P;try{P=await toPages(files)}catch(e){ERR('pages',e);return fail(e&&e.message=='pdfjs'?'לא הצלחתי לפתוח את ה-PDF כאן. נסי צילומי מסך של הקבלה.':'לא הצלחתי לקרוא את הקובץ. נסי שוב, או צילומי מסך.')}
  if(!P.length)return fail('לא מצאתי עמודים בקובץ.');S.pages=P;
  const per=Math.max(1,Math.min(4,lim.images.maxCount||1));let head=null;
  for(let i=0;i<P.length;i+=per){const ch=P.slice(i,i+per);busy(`קוראת את הקבלה… עמוד ${i+1}${ch.length>1?'–'+(i+ch.length):''} מתוך ${P.length}`);
   const ims=await Promise.all(ch.map(c=>blob(c,.82)));
   const r=await TO(sample.json(`These ${ch.length} image(s) are page(s) ${i+1}${ch.length>1?'-'+(i+ch.length):''} of ${P.length} of an online-shop order receipt (Temu, Shein or AliExpress, often in Hebrew).
${i==0?'Read the order header: the order number exactly as printed, the order date, the sum of the items, and the total paid.\n':''}List EVERY product line on these pages, in order. For each: a short clear Hebrew name of what it is (max 7 words, e.g. "חצאית מידי שחורה עם כפתורים"), the full title as printed, the colour/variant and the size as printed, the line price (a number), the quantity, a category id from this list: ${CATS.map(c=>c[0]).join(', ')} (girls/boys = children's clothes; base = plain tanks/undershirts worn under other clothes), the page number (1 = first image here), and the box of the product's picture on that page as fractions [x0,y0,x1,y1] of the page width/height.
Reply with ONLY JSON: {${i==0?'"order":"…","date":"d/m","subtotal":number,"total":number,':''}"items":[{"name":"…","full":"…","color":"…","size":"…","price":number,"qty":number,"cat":"…","page":number,"box":[x0,y0,x1,y1]}]}`,{images:ims,modelTier:'default'}),120000,null);
   if(r===null)return fail('הקריאה לקחה יותר מדי זמן. נסי שוב, או שלחי לי את הקבלה בצ׳אט.');
   if(i==0)head=r||{};
   ((r&&r.items)||[]).forEach(x=>{if(!x||!x.name)return;const pg=Math.max(1,Math.min(ch.length,x.page|0||1))-1;S.items.push({name:String(x.name).slice(0,60),full:String(x.full||x.name).slice(0,200),color:String(x.color||'').slice(0,60),size:String(x.size||'').slice(0,30),
    price:Math.max(0,+x.price||0),qty:Math.max(1,x.qty|0||1),cat:CATS.some(c=>c[0]==x.cat)?x.cat:'other',page:i+pg,box:Array.isArray(x.box)&&x.box.length==4?x.box:null,on:true})})}
  if(!S.items.length)return fail('לא מצאתי מוצרים בקבלה. נסי צילומי מסך ברורים של רשימת המוצרים.');
  const now=new Date();S.ord=normOrd(head&&head.order);S.acc=accOf(S.ord);S.date=String(head&&head.date||'').match(/\d{1,2}\/\d{1,2}/)?String(head.date).match(/\d{1,2}\/\d{1,2}/)[0]:now.getDate()+'/'+(now.getMonth()+1);
  S.sub=+(head&&head.subtotal)||S.items.reduce((t,x)=>t+x.price,0);S.total=+(head&&head.total)||S.sub;
  busy('גוזרת את התמונות של המוצרים…');S.items.forEach(x=>{try{const c=P[x.page];const r=x.box&&snap(c,x.box);if(r){x.cv=crop(c,r);x.url=x.cv.toDataURL('image/jpeg',.85)}}catch(e){ERR('crop',e)}});
  BUSY=false;paint()}catch(e){ERR('run',e);fail(e&&e.code=='not_granted'?'צריך לאשר לאתר לשלוח תמונה ל-Claude (בחלון שקפץ). נסי שוב.':e&&e.code=='rate_limited'?'יותר מדי בקשות ברגע – נסי שוב בעוד דקה.':'משהו השתבש בקריאה. נסי שוב, או שלחי לי את הקבלה בצ׳אט.')}}
function paint(){const L=S.items,n=L.filter(x=>x.on).length,dup=have(S.ord);
 B().innerHTML=`<div class="rp9o"><label>מספר הזמנה<input data-rp="ord" value="${es(S.ord)}" dir="ltr"></label><label>תאריך<input data-rp="date" value="${es(S.date)}" dir="ltr" inputmode="numeric"></label>
  <label>חשבון<select data-rp="acc"><option value="">לבחור…</option>${ACC.map(([k,t])=>`<option value="${k}"${S.acc==k?' selected':''}>${t}</option>`).join('')}</select></label>
  <label>שולם ₪<input data-rp="total" value="${es(S.total)}" dir="ltr" inputmode="decimal"></label></div>
  ${dup?'<p class="rp9err">ההזמנה הזאת כבר בארון – לא אכניס אותה פעמיים.</p>':''}
  <p class="rp9t">מצאתי ${L.length} מוצרים. בדקי שם, קטגוריה ותמונה; ✓ = נכנס לארון.</p>
  <ul class="rp9l">${L.map((x,i)=>`<li class="${x.on?'on':''}"><button type="button" class="rp9c" data-rpon="${i}" aria-pressed="${x.on}" aria-label="להכניס">${x.on?'✓':''}</button>
   <span class="rp9p">${x.url?`<img src="${x.url}" alt="">`:'<i>אין תמונה</i>'}</span>
   <span class="rp9f"><input data-rpn="${i}" value="${es(x.name)}" aria-label="שם"><small>${es([x.color,x.size&&'מידה '+x.size,'₪'+x.price.toFixed(2),x.qty>1?'×'+x.qty:''].filter(Boolean).join(' · '))}</small>
   <select data-rpc="${i}" aria-label="קטגוריה">${CATS.map(([k,t])=>`<option value="${k}"${x.cat==k?' selected':''}>${t}</option>`).join('')}</select></span></li>`).join('')}</ul>
  <div class="rp9a"><button type="button" class="rp9ok" ${n&&S.acc&&S.ord&&!dup?'':'disabled'}>➕ להכניס ${n==1?'מוצר אחד':n+' מוצרים'} לארון</button></div>
  ${!S.acc?'<p class="rp9hint">בחרי לאיזה חשבון ההזמנה שייכת, ואז אפשר להכניס.</p>':''}`}
function onChange(e){const t=e.target;if(!S)return;
 if(t.dataset.rp){const k=t.dataset.rp;S[k]=k=='total'?(+t.value||0):k=='ord'?normOrd(t.value):t.value;if(k=='ord'){const a=accOf(S.ord);if(a)S.acc=a}if(e.type=='change')paint();return}
 if(t.dataset.rpn!=null){S.items[+t.dataset.rpn].name=t.value.slice(0,60);return}
 if(t.dataset.rpc!=null){S.items[+t.dataset.rpc].cat=t.value;return}}
async function onClick(e){const t=e.target.closest('button');if(!t)return;
 if(t.classList.contains('rp9x'))return dlg.close();
 if(t.dataset.rpon!=null){const x=S.items[+t.dataset.rpon];x.on=!x.on;return paint()}
 if(t.classList.contains('rp9ok')){if(have(S.ord))return paint();t.disabled=true;const L=S.items.filter(x=>x.on),sum=L.reduce((a,x)=>a+x.price,0)||1,k=S.total/(S.sub||sum);
  const tag=(S.ord.replace(/\D/g,'').slice(-6)||String(Date.now()).slice(-6));let a=null;try{a=await claude.use('assets')}catch(_){}
  let n=0,j=0;for(const x of L){const id=`R${tag}_${j++}`;if(D[id])continue;t.textContent=`מכניסה… ${n+1}/${L.length}`;let img='';
   try{if(a&&x.cv){const r=await a.upload(await blob(x.cv,.9));img=r&&r.id||''}}catch(er){ERR('up',er)}
   const m={cat:x.cat,short:x.name,full:x.full,color:x.color,size:x.size,price:+x.price.toFixed(2),paid:+(x.price*Math.min(1,k)).toFixed(2),src:S.acc,order:S.ord,d:S.date,rcpt:1};
   try{await putItem(id,Object.assign({my:m},img?{img}:{}));try{window.addMine299&&addMine299(id,Object.assign({img},m))}catch(_){}n++}catch(er){ERR('put',er)}}
  S.done=1;toast_(`✓ ההזמנה נכנסה: ${n} מוצרים`);
  B().innerHTML=`<p class="rp9t big">✓ ההזמנה ${es(S.ord)} נכנסה לארון: ${n} מוצרים, בסטטוס "בדרך".</p><p class="rp9t">כשהחבילה מגיעה: "🧺 צילמתי את כל החבילה".</p><div class="rp9a"><button type="button" class="rp9x2">סיום</button></div>`}
 if(t.classList.contains('rp9x2'))dlg.close()}
document.addEventListener('change',e=>{const t=e.target;if(!t.matches||!t.matches('[data-rp299]'))return;const f=[...(t.files||[])];t.value='';if(f.length)run(f)},true);
function inject(d){const l=d.querySelector('label.o3cam:not(.small):not(.rc296b)');if(!l||d.querySelector('.rp299b'))return;const after=d.querySelector('.rc296b')||l;
 after.insertAdjacentHTML('afterend',`<label class="o3cam small rp299b"><input type="file" accept="application/pdf,.pdf,image/*" multiple data-rp299><span class="ic">🧾</span><span><b>הזמנה חדשה מקבלה</b><small>מעלים את ה-PDF או צילומי מסך – והמוצרים נכנסים לבד</small></span></label>`)}
const w=setInterval(()=>{const d=document.getElementById('ord123');if(!d)return;clearInterval(w);let q=0;
 new MutationObserver(()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;try{inject(d)}catch(e){ERR('inject',e)}})}).observe(d,{childList:true,subtree:true});try{inject(d)}catch(e){ERR('inject',e)}},800);
window.RP299={run,accOf,snap};
})();
