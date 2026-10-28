// v296 (Sara 28/10 16:00 "איך אני יכולה גם לשדרג את ההזמנות, אם עשיתי הזמנות, קיבלתי את הסחורה, לעשות את זה בקלות"): a parcel arrives – she lays
// everything out and takes ONE photo (or a few). Claude names every product it sees and finds it in what has not arrived yet; she sees the list with
// a picture of each match, fixes a wrong one with a tap, and one button marks them all as arrived. In an order it looks only in that order.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v296rc '+w+': '+(e&&(e.code||e.message)||e));
const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=m=>{try{window.toast&&toast(m)}catch(_){}};
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
const ACC={t1:'טמו 1',t2:'טמו 2',t3:'טמו 3',sh:'שיין',ae:'עלי'};
const TO=(p,ms,v)=>Promise.race([p,new Promise(r=>setTimeout(()=>r(v),ms))]);
const dnum=d=>{const m=/(\d+)\/(\d+)/.exec(d||'');return m?(+m[2])*100+(+m[1]):0};
// what has not arrived yet (on the way, not marked, or marked missing); cancelled and archived items are left out
const open_=id=>{const x=D[id],t=it(id);return x&&x.order&&!t.oos&&!t.gen&&t.got!='y'};
function pool(ord){const L=Object.keys(D).filter(id=>open_(id)&&(!ord||D[id].order==ord));L.sort((a,b)=>dnum(D[b].date)-dnum(D[a].date));return L.slice(0,320)}
const thumb=id=>{try{return img(id)||((typeof TH=='object'&&TH[id])||'')}catch(_){return ''}};
function shrink(f,max){return new Promise((ok,no)=>{const u=URL.createObjectURL(f),im=new Image();im.onload=()=>{const s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');
 c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(b=>b?ok(b):no(new Error('blob')),'image/jpeg',.85)};
 im.onerror=()=>{URL.revokeObjectURL(u);no(new Error('img'))};im.src=u})}
const loadImg=s=>new Promise(r=>{if(!s)return r(null);const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=s});
async function grid(ids){try{await Promise.all([...new Set(ids.map(id=>D[id].cat))].map(c=>typeof thLoad=='function'?thLoad(c).catch(()=>{}):0))}catch(_){}
 const W=150,Hh=195,cols=6,c=document.createElement('canvas');c.width=W*cols;c.height=Hh*Math.ceil(ids.length/cols);const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);
 for(let i=0;i<ids.length;i++){const x=(i%cols)*W,y=Math.floor(i/cols)*Hh,im=await loadImg(thumb(ids[i]));
  if(im){const s=Math.min((W-10)/im.width,(Hh-40)/im.height);g.drawImage(im,x+(W-im.width*s)/2,y+34,im.width*s,im.height*s)}
  g.fillStyle='#b5562f';g.fillRect(x+4,y+4,38,28);g.fillStyle='#fff';g.font='bold 20px sans-serif';g.fillText(String(i+1),x+(i<9?16:9),y+25);g.strokeStyle='#ddd';g.strokeRect(x+.5,y+.5,W-1,Hh-1)}
 return new Promise(r=>c.toBlob(b=>r(b),'image/jpeg',.85))}
const line=id=>{const x=D[id],t=it(id);return [id,(t.tname||x.full||x.short||'').slice(0,70),x.color||'',x.size||'',x.cat||'',t.miss?'marked missing':''].join(' | ')};

// ---- the window
let dlg=null,R=null,BUSY=false;
function make(){if(dlg)return dlg;dlg=document.createElement('dialog');dlg.id='rc296';dlg.setAttribute('aria-label','צילום של כל החבילה');
 dlg.innerHTML='<div class="rc9h"><h3>📦 מה הגיע בחבילה</h3><button type="button" class="rc9x" aria-label="סגירה">✕</button></div><div class="rc9b"></div>';
 document.body.appendChild(dlg);dlg.addEventListener('click',onClick);dlg.addEventListener('close',()=>{if(R&&R.done)try{const o=document.getElementById('ord123');if(o&&o.open&&window.openOrders123)openOrders123(R.ord||'')}catch(_){}});return dlg}
const B=()=>make().querySelector('.rc9b');
function busy(t){B().innerHTML=`${R&&R.urls?`<div class="rc9ph">${R.urls.map(u=>`<img src="${es(u)}" alt="">`).join('')}</div>`:''}<div class="rc9busy"><i></i><span>${es(t)}</span></div>`}
async function run(files,ord){if(BUSY)return;BUSY=true;R={ord,urls:files.map(f=>URL.createObjectURL(f))};const d=make();if(!d.open)d.showModal();busy('מכין את התמונות…');
 try{let sample=null;try{sample=await TO(claude.use('sample'),12000,null)}catch(_){}
  const lim=sample?await TO(sample.limits().catch(()=>null),8000,null):null;
  if(!sample||!lim||!lim.images)return fail('אין לי כאן גישה לזיהוי תמונה. אפשר לסמן בתוך כל הזמנה "✅ הכל הגיע".');
  const max=Math.max(1,Math.min(files.length,(lim.images.maxCount||1)-1));
  const ph=(await Promise.all(files.slice(0,max).map(f=>TO(shrink(f,1400),15000,null)))).filter(Boolean);if(!ph.length)return fail('לא הצלחתי לקרוא את התמונה. נסי שוב.');
  const P=pool(ord);if(!P.length)return fail(ord?'בהזמנה הזאת כל המוצרים כבר מסומנים שהגיעו.':'כל המוצרים כבר מסומנים שהגיעו 🎉');
  busy(`מסתכל על התמונה ומחפש בין ${P.length} מוצרים שעוד לא הגיעו…`);
  const r1=await TO(sample.json(`My client photographed the products she just received in a parcel from Temu or Shein – usually several products laid out together (${ph.length} photo${ph.length>1?'s':''} attached). Below is every product she ordered that has not arrived yet, one per line: id | product title (machine-translated, may be vague) | colour | size | category | note.
List EVERY separate product you can see in the photo(s) – each one once, even if it is still in its bag. For each, give the ids that could be it (most likely first, at most 3).
Reply with ONLY JSON: {"items":[{"what":"short Hebrew description (max 6 words)","ids":["id",...]}]}

${P.map(line).join('\n')}`,{images:ph,modelTier:'default'}),90000,null);
  if(r1===null)return fail('הזיהוי לקח יותר מדי זמן – נסי שוב.');
  let items=((r1&&r1.items)||[]).filter(x=>x&&x.what).slice(0,24).map(x=>({what:String(x.what).slice(0,60),ids:[...new Set((x.ids||[]).filter(id=>D[id]&&P.includes(id)))].slice(0,3)}));
  if(!items.length)return fail('לא ראיתי מוצרים בתמונה. נסי לצלם מלמעלה, באור טוב, עם רווח בין המוצרים.');
  // second look: the photo next to a numbered grid of every candidate – the picture decides, not the title
  const C=[...new Set(items.flatMap(x=>x.ids))].slice(0,36);
  if(C.length>1&&ph.length<(lim.images.maxCount||1)){busy('משווה לתמונות של המוצרים…');
   try{const gr=await grid(C);const r2=await TO(sample.json(`The first image${ph.length>1?'s are photos':' is a photo'} of products a woman received. The LAST image is a numbered grid (1-${C.length}) of product photos from her orders.
These products were seen in her photo: ${items.map((x,i)=>`${i+1}. ${x.what}`).join('; ')}.
For each seen product say which grid number is the SAME product (same item type, colour and pattern; ignore folding, bags and light), or 0 if none matches.
Reply with ONLY JSON: {"m":[{"i":seen number,"n":grid number,"sure":true or false}]}`,{images:[...ph,gr],modelTier:'default'}),70000,null);
    ((r2&&r2.m)||[]).forEach(o=>{const x=items[(o.i|0)-1],id=C[(o.n|0)-1];if(!x)return;if(o.n===0){x.none=1;return}if(id){x.ids=[id,...x.ids.filter(y=>y!=id)].slice(0,3);x.sure=!!o.sure}})}catch(e){ERR('grid',e)}}
  // one product can be matched once: a later row that wants an id already taken moves to its next choice
  const used=new Set();items.forEach(x=>{x.ids=x.ids.filter(id=>!used.has(id)).concat(x.ids.filter(id=>used.has(id)));x.pick=x.none||!x.ids.length||used.has(x.ids[0])?'':x.ids[0];x.on=!!x.pick;if(x.pick)used.add(x.pick)});
  R.items=items;paint()}catch(e){ERR('run',e);fail(e&&e.code=='not_granted'?'צריך לאשר לאתר לשלוח תמונה ל-Claude (בחלון שקפץ). נסי שוב.':e&&e.code=='rate_limited'?'יותר מדי בקשות ברגע – נסי שוב בעוד דקה.':'הזיהוי לא הצליח – נסי שוב.')}
 finally{BUSY=false}}
function fail(t){B().innerHTML=`${R&&R.urls?`<div class="rc9ph">${R.urls.map(u=>`<img src="${es(u)}" alt="">`).join('')}</div>`:''}<p class="rc9err">${es(t)}</p>`}
function card(id){const x=D[id];return `<img src="${es(thumb(id))}" alt="" loading="lazy"><span><b>${es(it(id).tname||x.short||'')}</b><small>${es([ACC[x.src],x.date,x.color,x.size&&'מידה '+x.size].filter(Boolean).join(' · '))}</small></span>`}
function paint(){const L=R.items,n=L.filter(x=>x.on&&x.pick).length;
 B().innerHTML=`<div class="rc9ph">${R.urls.map(u=>`<img src="${es(u)}" alt="">`).join('')}</div>
 <p class="rc9t">ראיתי ${L.length} מוצרים. בדקי שכל אחד נכון – ✓ יסומן שהגיע. אם טעיתי, לחצי על האפשרות הנכונה מתחת.</p>
 <ul class="rc9l">${L.map((x,i)=>`<li class="${x.on&&x.pick?'on':''}"><div class="rc9w">👀 ${es(x.what)}${x.pick&&x.sure?' <em>בטוח</em>':''}</div>
  ${x.pick?`<button type="button" class="rc9m" data-rc9on="${i}" aria-pressed="${!!x.on}">${card(x.pick)}<i>${x.on?'✓':''}</i></button>`:'<p class="rc9no">לא מצאתי אותו ברשימה של מה שעוד לא הגיע</p>'}
  ${x.ids.filter(id=>id!=x.pick).length?`<div class="rc9alt"><small>או:</small>${x.ids.filter(id=>id!=x.pick).map(id=>`<button type="button" data-rc9alt="${i}" data-id="${es(id)}">${card(id)}</button>`).join('')}</div>`:''}</li>`).join('')}</ul>
 <div class="rc9a"><button type="button" class="rc9ok" ${n?'':'disabled'}>✅ לסמן ${n==1?'מוצר אחד':n+' מוצרים'} שהגיעו</button></div>`}
async function onClick(e){const t=e.target.closest('button');if(!t)return;
 if(t.classList.contains('rc9x'))return dlg.close();
 if(t.dataset.rc9on!=null){const x=R.items[+t.dataset.rc9on];x.on=!x.on;return paint()}
 if(t.dataset.rc9alt!=null){const x=R.items[+t.dataset.rc9alt],id=t.dataset.id;R.items.forEach(y=>{if(y!==x&&y.pick==id){y.pick='';y.on=false}});x.pick=id;x.on=true;x.sure=false;return paint()}
 if(t.classList.contains('rc9ok')){t.disabled=true;const L=R.items.filter(x=>x.on&&x.pick);let k=0;
  for(const x of L){t.textContent=`מסמנת… ${k+1}/${L.length}`;try{await putItem(x.pick,{got:'y',miss:''});k++}catch(er){ERR('put',er)}}
  R.done=1;toast_(`✅ סימנתי ${k} מוצרים שהגיעו`);
  B().innerHTML=`<p class="rc9t big">✅ סימנתי ${k} מוצרים שהגיעו.</p><p class="rc9t">מה שלא היה בתמונה נשאר "בדרך". אם משהו חסר בחבילה – בתוך ההזמנה לוחצים ❌.</p><div class="rc9a"><label class="rc9again"><input type="file" accept="image/*" multiple data-rc296="${es(R.ord||'')}">📷 עוד תמונה</label><button type="button" class="rc9x2">סיום</button></div>`}
 if(t.classList.contains('rc9x2'))dlg.close()}
document.addEventListener('change',e=>{const t=e.target;if(!t.matches||!t.matches('[data-rc296]'))return;const f=[...(t.files||[])];t.value='';if(f.length)run(f,t.dataset.rc296||'')},true);
// ---- the button, next to "📷 צילמתי מוצר שהגיע" (all orders) and inside an order
function inject(d){d.querySelectorAll('label.o3cam').forEach(l=>{const i=l.querySelector('input[data-o3cam]');if(!i||l.closest('.o3shop')||l.textContent.includes('לצלם שוב'))return;
  const ord=i.dataset.o3cam||'';if(l.nextElementSibling&&l.nextElementSibling.classList.contains('rc296b'))return;
  l.insertAdjacentHTML('afterend',`<label class="o3cam rc296b${ord?' small':''}"><input type="file" accept="image/*" multiple data-rc296="${es(ord)}"><span class="ic">🧺</span><span><b>צילמתי את כל החבילה</b><small>פורשים הכל ומצלמים פעם אחת – אסמן מה הגיע${ord?' מההזמנה הזאת':''}</small></span></label>`)})}
const w=setInterval(()=>{const d=document.getElementById('ord123');if(!d)return;clearInterval(w);let q=0;
 new MutationObserver(()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;try{inject(d)}catch(e){ERR('inject',e)}})}).observe(d,{childList:true,subtree:true});try{inject(d)}catch(e){ERR('inject',e)}},800);
window.RC296={run,pool};
})();
