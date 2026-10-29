/* v123 – "📦 ההזמנות שלי": items grouped by order (טמו 1 / טמו 2 / שיין), per item: arrived / on the way / missing,
   like / dislike, keep / return; return deadline per order; "📷 צילמתי מוצר" → Claude finds the product → its whole order.
   Item fields (IT[id]): got 'y'|'n' (existing), miss 1 (new: order came without it), lk 'y'|'n' (new), s 'kept'|'ret' (existing). */
(function(){
const LOG=(w,e)=>{try{(window.ERRS=window.ERRS||[]).push('orders123 '+w+': '+(e&&e.message||e))}catch(_){}};
const q=s=>document.querySelector(s);
const H=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ACC={t1:'טמו 1',t2:'טמו 2',sh:'שיין'};
const V={acc:'',flt:'',q:'',ord:'',hl:'',scroll:0};
const dl=r=>{try{return r?daysLeft(r):null}catch(_){return null}};
const dnum=d=>{const m=/(\d+)\/(\d+)/.exec(d||'');return m?(+m[2])*100+(+m[1]):0};
const cat=id=>{try{return curCat(id)}catch(_){return D[id].cat}};
const catName=id=>{const c=cat(id);try{const x=(CATS||[]).find(a=>a[0]==c);if(x)return x[1]}catch(_){}return c};

// ---- state of one item
function st(id){const it=IT[id]||{},x=D[id];
 if(it.miss)return 'm';
 if(it.got=='y')return 'y';
 if(it.got=='n')return 'n';
 if(x.transit&&!(ORD[x.order]||{}).arrived)return 'n';
 return '';}
function orders(){const o={};
 for(const id of Object.keys(D)){const x=D[id];if(!x||!x.order)continue;
  const k=x.order;(o[k]=o[k]||{k,src:x.src,ids:[],date:x.date,file:x.file||''}).ids.push(id)}
 return Object.values(o).sort((a,b)=>dnum(b.date)-dnum(a.date)||a.k.localeCompare(b.k));}
function oname(o){const n=(/(\d+)\s*$/.exec(o.file)||[])[1];
 if(o.src=='sh')return 'הזמנה \u2066'+o.k.slice(-4)+'\u2069';
 return n?'קבלה '+n:'הזמנה \u2066'+o.k.slice(-6)+'\u2069';}
function osum(o){const c={y:0,n:0,m:0,u:0,lk:0,no:0,ret:0,kept:0,mb:0,paid:0};let rd=null;
 for(const id of o.ids){const s=st(id),it=IT[id]||{};c[s||'u']++;if(it.lk=='y')c.lk++;if(it.lk=='n')c.no++;if(it.s=='ret')c.ret++;if(it.s=='kept')c.kept++;if(it.mb&&!it.s)c.mb++;c.paid+=+D[id].paid||0;
  const r=D[id].rdl;if(r&&(!rd||r<rd))rd=r}
 c.rdl=rd;c.n_=o.ids.length;return c;}
function ostate(c){if(c.m)return 'm';if(c.u)return 'u';if(c.n)return 'n';return 'y';}
const money=v=>'₪'+Math.round(v).toLocaleString('he-IL');
function retTxt(r){if(!r)return '';const n=dl(r);const d=r.slice(8,10)+'/'+r.slice(5,7);
 if(n==null)return '';if(n<0)return `<span class="o3r late">ההחזרה נסגרה (${d})</span>`;
 return `<span class="o3r ${n<=7?'soon':n<=21?'mid':''}">להחזרה עד ${d} · ${n==0?'היום!':n==1?'מחר':'עוד '+n+' ימים'}</span>`;}
function th(id,cls){const s=(()=>{try{return img(id)}catch(_){return ''}})();
 return `<img class="${cls||'o3i'}" data-th="${H(id)}" ${s?`src="${H(s)}"`:''} alt="" loading="lazy">`;}
function loadThumbs(ids){const cs=new Set(ids.map(id=>D[id]&&D[id].cat).filter(Boolean));
 cs.forEach(c=>{try{thLoad(c)}catch(_){}});try{thApply(TH)}catch(_){}}

// ---- dialog
function dlg(){let d=q('#ord123');if(d)return d;
 d=document.createElement('dialog');d.id='ord123';d.innerHTML='<div class="o3h"><button class="o3back" data-o3="back" aria-label="חזרה" hidden>‹</button><h3>📦 ההזמנות שלי</h3><button class="o3x" data-o3="close" aria-label="סגירה">✕</button></div><div class="o3b"></div>';
 document.body.appendChild(d);
 d.addEventListener('click',onClick);d.addEventListener('input',onInput);d.addEventListener('change',onChange);
 d.addEventListener('close',()=>{V.ord='';V.hl='';try{paintEntry()}catch(_){}});
 return d;}
function body(){return dlg().querySelector('.o3b')}
function open(ord,hl){const d=dlg();V.ord=ord||'';V.hl=hl||'';render();if(!d.open)d.showModal();}
window.openOrders123=open;

function render(){const d=dlg(),b=body();d.querySelector('.o3back').hidden=!V.ord&&!V.res;
 d.querySelector('h3').textContent=V.res?'📷 איזה מוצר זה?':V.ord?'📦 הזמנה':'📦 ההזמנות שלי';
 if(V.res)return renderRes();
 if(V.ord)return renderOrder();
 renderList();}

function renderList(){const b=body(),all=orders();
 const tot={y:0,n:0,m:0,u:0};all.forEach(o=>{const c=osum(o);tot.y+=c.y;tot.n+=c.n;tot.m+=c.m;tot.u+=c.u});
 const qq=V.q.trim().toLowerCase().replace(/[-\s]/g,'');
 const cnt={'':0,t1:0,t2:0,sh:0};all.forEach(o=>{cnt['']++;cnt[o.src]++});
 let L=all.filter(o=>!V.acc||o.src==V.acc);
 if(V.flt)L=L.filter(o=>{const c=osum(o);return V.flt=='u'?c.u:V.flt=='m'?c.m:V.flt=='n'?c.n:V.flt=='ret'?c.ret:V.flt=='mb'?c.mb:ostate(c)=='y'});
 let hitItems=[];
 if(qq){L=L.filter(o=>{if(o.k.toLowerCase().replace(/[-\s]/g,'').includes(qq)||oname(o).replace(/\s/g,'').includes(qq))return true;
  const h=o.ids.filter(id=>(id+' '+D[id].short+' '+(D[id].full||'')+' '+((IT[id]||{}).tname||'')+' '+(D[id].color||'')).toLowerCase().replace(/[-\s]/g,'').includes(qq));
  if(h.length){hitItems.push(...h);return true}return false})}
 const tabs=[['','הכל'],['t1','טמו 1'],['t2','טמו 2'],['sh','שיין']].map(([k,n])=>`<button data-o3acc="${k}" aria-pressed="${V.acc==k}">${n} <small>${cnt[k]}</small></button>`).join('');
 const fl=[['','הכל'],['u','⚪ לא סימנתי'],['m','❌ חסר'],['n','⏳ בדרך'],['y','✅ הכל הגיע'],['ret','↩ יש להחזרה'],['mb','❓ מתלבטת']].map(([k,n])=>`<button data-o3f="${k}" aria-pressed="${V.flt==k}">${n}</button>`).join('');
 b.innerHTML=`<div class="o3sum"><span class="y">✅ <b>${tot.y}</b> הגיעו</span><span class="m">❌ <b>${tot.m}</b> חסרים</span><span class="n">⏳ <b>${tot.n}</b> בדרך</span><span class="u">⚪ <b>${tot.u}</b> לא סימנתי</span></div>
 <label class="o3cam"><input type="file" accept="image/*" data-o3cam><span class="ic">📷</span><span><b>צילמתי מוצר שהגיע</b><small>אמצא מאיזו הזמנה הוא, ואראה לך את כל ההזמנה</small></span></label>
 <div class="o3q"><input type="search" placeholder="🔍 מספר הזמנה, שם מוצר או T123" value="${H(V.q)}" data-o3q enterkeyhint="search"></div>
 <div class="o3tabs">${tabs}</div><div class="o3fl">${fl}</div>
 <div class="o3list">${L.length?L.map(ocard).join(''):'<p class="o3empty">אין הזמנות כאלה</p>'}</div>
 <p class="o3tip">טיפ: כשחבילה מגיעה – פתחי את ההזמנה ולחצי "✅ הכל הגיע", ואז סמני רק מה שחסר.</p>`;
 loadThumbs(L.flatMap(o=>o.ids.slice(0,5)));
 if(V.scroll){b.scrollTop=V.scroll;V.scroll=0}}

function ocard(o){const c=osum(o),s=ostate(c);
 const lab={y:'✅ הכל הגיע',m:`❌ חסרים ${c.m}`,n:`⏳ בדרך ${c.n}`,u:`⚪ ${c.u} לא סומנו`}[s];
 const pct=Math.round(100*c.y/c.n_);
 const pics=o.ids.slice(0,5).map(id=>th(id,'o3t')).join('')+(o.ids.length>5?`<span class="o3more">+${o.ids.length-5}</span>`:'');
 return `<button class="o3card s${s}" data-o3open="${H(o.k)}"><span class="o3top"><span class="sb2 ${o.src}">${ACC[o.src]}</span><b>${H(oname(o))}</b><small>${H(o.date||'')}</small><span class="o3st">${lab}</span></span>
 <span class="o3pics">${pics}</span>
 <span class="o3bar"><i style="width:${pct}%"></i></span>
 <span class="o3meta"><span>הגיעו <bdi>${c.y}/${c.n_}</bdi></span><span>${money(c.paid)}</span>${c.lk?`<span>😍 ${c.lk}</span>`:''}${c.ret?`<span>↩ ${c.ret} להחזיר</span>`:''}${c.kept?`<span>🏠 ${c.kept}</span>`:''}${c.mb?`<span>❓ ${c.mb} מתלבטת</span>`:''}</span>
 ${retTxt(c.rdl)}</button>`;}

function itemRow(id){const x=D[id],it=IT[id]||{},s=st(id);
 const b=(k,v,t,on)=>`<button data-o3set="${k}" data-v="${v}" data-id="${H(id)}" aria-pressed="${!!on}">${t}</button>`;
 const meta=[catName(id),x.size&&('מידה '+x.size),x.color,money(+x.paid||0)+(x.qty>1?` · ${x.qty} יח׳`:'')].filter(Boolean).map(x=>'<bdi>'+H(x)+'</bdi>').join(' · ');
 return `<div class="o3it s${s||'u'}${V.hl==id?' hl':''}" data-o3row="${H(id)}">
 <button class="o3ph" data-o3item="${H(id)}" aria-label="פתיחת המוצר">${th(id)}</button>
 <div class="o3in"><b>${H(it.tname||x.short)}</b><small>${meta}</small><small class="o3id">${H(id)}${transitNote(id)}</small>
 <div class="o3seg got">${b('got','y','✅ הגיע',s=='y')}${b('got','n','⏳ בדרך',s=='n')}${b('got','m','❌ חסר',s=='m')}</div>
 <div class="o3seg two"><span>${b('lk','y','😍 אוהבת',it.lk=='y')}${b('lk','m','🤔 לא בטוחה',it.lk=='m')}${b('lk','n','😕 לא אוהבת',it.lk=='n')}</span><span>${b('s','kept','🏠 משאירה',it.s=='kept')}${b('mb','1','❓ מתלבטת',!!it.mb&&!it.s)}${b('s','ret','↩ מחזירה',it.s=='ret')}</span></div>
 ${it.mb&&!it.s?`<div class="o3seg why"><small>למה?</small>${b('mbr','model','מחכה לדגם אחר',it.mbr=='model')}${b('mbr','size','מחכה למידה אחרת',it.mbr=='size')}${b('mbr','other','משהו אחר',it.mbr=='other')}</div>`:''}
 <div class="o3note${it.note?' has':''}"><textarea data-o3note="${H(id)}" rows="${it.note?2:1}" placeholder="📝 הערה על הבגד (מה שבא לך לכתוב)">${H(it.note||'')}</textarea></div>
 </div></div>`;}
function transitNote(id){const x=D[id],it=IT[id]||{};if(it.got||it.miss)return '';return x.transit?' · לפי האתר: עוד בדרך':''}

function renderOrder(){const b=body(),o=orders().find(o=>o.k==V.ord);if(!o){V.ord='';return renderList()}
 const c=osum(o);
 b.innerHTML=`<div class="o3oh"><span class="sb2 ${o.src}">${ACC[o.src]}</span><b>${H(oname(o))}</b><small><bdi>${H(o.date||'')}</bdi> · <bdi>${o.ids.length} מוצרים</bdi> · <bdi>${money(c.paid)}</bdi></small>
  <span class="o3num">${H(o.k)} <button data-o3copy="${H(o.k)}" aria-label="העתקה">📋</button></span>${retTxt(c.rdl)}
  <div class="o3sum small"><span class="y">✅ <b>${c.y}</b></span><span class="m">❌ <b>${c.m}</b></span><span class="n">⏳ <b>${c.n}</b></span><span class="u">⚪ <b>${c.u}</b></span><span>😍 <b>${c.lk}</b></span><span>❓ <b>${c.mb}</b></span><span>↩ <b>${c.ret}</b></span></div>
  <div class="o3shop"><label class="o3cam small"><input type="file" accept="image/*" data-o3cam="${H(o.k)}"><span class="ic">📷</span><span><b>צלמי מוצר מההזמנה הזאת</b><small>אמצא איזה מהם זה ואסמן שהגיע</small></span></label>
  <button data-o3shop="${H(o.k)}">🛍 ההזמנה ב${o.src=='sh'?'שיין':'טמו'}<small>מעתיק את המספר ופותח</small></button></div>
  <div class="o3all"><button data-o3all="y">✅ הכל הגיע</button><button data-o3all="n">⏳ הכל עוד בדרך</button><button data-o3all="clear" class="ghost">איפוס</button></div></div>
 <div class="o3items">${o.ids.map(itemRow).join('')}</div>`;
 loadThumbs(o.ids);
 if(V.hl){const r=b.querySelector(`[data-o3row="${CSS.escape(V.hl)}"]`);if(r)setTimeout(()=>r.scrollIntoView({block:'center'}),60)}else b.scrollTop=0;}

// ---- marks
async function setMark(id,k,v){const it=IT[id]||{};let p;
 if(k=='got'){const cur=st(id);
  if(v=='m')p=cur=='m'?{miss:'',got:''}:{miss:1,got:''};
  else p=cur==v&&(it.got==v)?{got:'',miss:''}:{got:v,miss:''};}
 else if(k=='mb')p=it.mb&&!it.s?{mb:'',mbr:''}:{mb:1,s:''};
 else if(k=='s')p=it.s==v?{s:''}:{s:v,mb:'',mbr:''};
 else p={[k]:it[k]==v?'':v};
 try{await putItem(id,p)}catch(e){LOG('put',e)}}
async function setAll(o,v){const ids=o.ids;
 for(const id of ids){const it=IT[id]||{};
  if(v=='clear'){if(it.got||it.miss)await putItem(id,{got:'',miss:''})}
  else if(v=='y'){if(!it.miss&&it.got!='y')await putItem(id,{got:'y'})}
  else if(v=='n'){if(!it.got&&!it.miss)await putItem(id,{got:'n'})}}
 if(v=='y'&&o.src&&typeof putOrd=='function'&&!(ORD[o.k]||{}).arrived){try{await putOrd(o.k,true)}catch(e){LOG('ord',e)}}}

function refresh(){const b=body(),y=b.scrollTop;render();b.scrollTop=y;}
async function onClick(e){const t=e.target.closest('button,[data-o3cam]');if(!t)return;
 try{
 if(t.dataset.o3=='close'){dlg().close();return}
 if(t.dataset.o3=='back'){if(V.res){V.ord=V.res.ord||'';V.res=null}else V.ord='';V.hl='';render();return}
 if(t.dataset.o3acc!=null){V.acc=t.dataset.o3acc;render();return}
 if(t.dataset.o3f!=null){V.flt=V.flt==t.dataset.o3f?'':t.dataset.o3f;render();return}
 if(t.dataset.o3open){V.scroll=body().scrollTop;V.ord=t.dataset.o3open;V.hl='';render();return}
 if(t.dataset.o3shop){const k=t.dataset.o3shop,o=orders().find(o=>o.k==k);const num=o&&o.src!='sh'?k.replace(/^P0/,'PO'):k;
  try{await navigator.clipboard.writeText(num)}catch(_){}
  const u=o&&o.src=='sh'?'https://m.shein.com/il/user/orders/list':'https://www.temu.com/bgt_orders.html';
  toast('מספר ההזמנה הועתק: '+num);try{window.open(u,'_blank','noopener')}catch(_){}return}
 if(t.dataset.o3copy){try{await navigator.clipboard.writeText(t.dataset.o3copy);toast('מספר ההזמנה הועתק')}catch(_){toast(t.dataset.o3copy)}return}
 if(t.dataset.o3item){const id=t.dataset.o3item;const bk={ord:V.ord,hl:id};dlg().close();try{openItem(id);armBack(bk)}catch(err){LOG('open',err)}return}
 if(t.dataset.o3set){t.setAttribute('aria-pressed','true');await setMark(t.dataset.id,t.dataset.o3set,t.dataset.v);V.hl=t.dataset.id;refresh();return}
 if(t.dataset.o3all){const o=orders().find(o=>o.k==V.ord);if(!o)return;
  if(t.dataset.o3all=='clear'&&!(typeof sure=='function'?sure(t,'לאפס? לחצי שוב'):true))return;
  t.disabled=true;await setAll(o,t.dataset.o3all);refresh();toast(t.dataset.o3all=='y'?'סימנתי שהכל הגיע – עכשיו סמני רק מה שחסר':'עודכן');return}
 if(t.dataset.o3pick){const id=t.dataset.o3pick;V.res=null;V.ord=D[id].order;V.hl=id;
  if(!(IT[id]||{}).got&&!(IT[id]||{}).miss){await putItem(id,{got:'y'});toast('מצאתי! סימנתי שהמוצר הזה הגיע')}
  render();return}
 if(t.dataset.o3retry!=null){V.ord=(V.res&&V.res.ord)||'';V.res=null;render();return}
 }catch(err){LOG('click',err);toast('משהו השתבש – נסי שוב')}}
let qT;function onInput(e){if(e.target.matches('[data-o3q]')){clearTimeout(qT);const el=e.target;qT=setTimeout(()=>{V.q=el.value;const pos=el.selectionStart;renderList();const n=body().querySelector('[data-o3q]');if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(_){}}},250)}}
function onChange(e){if(e.target.matches('[data-o3note]')){const id=e.target.dataset.o3note,v=e.target.value.trim();if(v!=((IT[id]||{}).note||''))putItem(id,{note:v}).catch(err=>LOG('note',err));return}
 if(e.target.matches('[data-o3cam]')){const f=e.target.files&&e.target.files[0];e.target.value='';if(f)identify(f,e.target.dataset.o3cam||(V.res&&V.res.ord)||'')}}

// ---- 📷 photo → product → order
function shrink(file,max){return new Promise((res,rej)=>{const u=URL.createObjectURL(file),im=new Image();
 im.onload=()=>{const s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);
  c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(b=>b?res(b):rej(new Error('blob')),'image/jpeg',.85)};
 im.onerror=()=>{URL.revokeObjectURL(u);rej(new Error('img'))};im.src=u})}
function loadImg(src){return new Promise(r=>{if(!src)return r(null);const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src})}
async function sheet(ids){await Promise.all([...new Set(ids.map(id=>D[id].cat))].map(c=>thLoad(c).catch(()=>{})));
 const big=ids.length>12,W=big?150:200,Hh=big?195:260,cols=big?5:4,rows=Math.ceil(ids.length/cols),c=document.createElement('canvas');c.width=W*cols;c.height=Hh*rows;const g=c.getContext('2d');
 g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);
 for(let i=0;i<ids.length;i++){const x=(i%cols)*W,y=Math.floor(i/cols)*Hh;let im=null;try{im=await loadImg(img(ids[i])||TH[ids[i]])}catch(_){}
  if(im){const s=Math.min((W-10)/im.width,(Hh-40)/im.height);g.drawImage(im,x+(W-im.width*s)/2,y+34,im.width*s,im.height*s)}
  g.fillStyle='#b5562f';g.fillRect(x+4,y+4,36,28);g.fillStyle='#fff';g.font='bold 20px sans-serif';g.fillText(String(i+1),x+(i<9?15:9),y+25);
  g.strokeStyle='#ddd';g.strokeRect(x+.5,y+.5,W-1,Hh-1)}
 return new Promise(r=>c.toBlob(b=>r(b),'image/jpeg',.85));}
function catalog(sc){return (sc||Object.keys(D)).map(id=>{const x=D[id],it=IT[id]||{};
 return [id,catName(id),(it.tname||x.full||x.short||'').slice(0,70),x.color||'',x.size||'',it.got=='y'?'כבר סומן שהגיע':''].join(' | ')}).join('\n')}
async function identify(file,scope){const so=scope||'';V.res={busy:true,url:URL.createObjectURL(file),ord:so};V.ord='';render();
 const fin=r=>{V.res=Object.assign(r,{ord:so});};
 let sample=null;try{sample=await claude.use('sample')}catch(_){}
 const lim=sample?await sample.limits().catch(()=>null):null;
 if(!sample||!lim||!lim.images){fin({err:'אין לי כאן גישה לזיהוי תמונה. אפשר לחפש לפי שם או מספר הזמנה, או לשלוח לי את התמונה בצ׳אט.',url:V.res.url});return render()}
 try{const ph=await shrink(file,1024);
  const sc=so?((orders().find(o=>o.k==so)||{}).ids||[]):null;
  if(sc&&sc.length==1){fin({ids:sc,url:V.res.url,sure:true});return render()}
  let r1;if(sc&&sc.length<=40){r1={what:'',ids:sc}}else{
  status('מסתכל על התמונה ומחפש ברשימת ההזמנות…');
  r1=await sample.json(`My client photographed ONE product she just received in a parcel from Temu or Shein (photo attached). Below is the list of every product she ordered, one per line: id | category | product title (Hebrew, from the receipt) | colour | size | note.
Find the product in the photo. Look at the type of item, colour, pattern, material and details. Titles are machine-translated and may be vague.
Reply with ONLY JSON: {"what":"short Hebrew description of what is in the photo (max 8 words)","ids":["up to 8 ids, most likely first"]}

${catalog(sc)}`,{images:[ph],modelTier:'default'});}
  let ids=((r1&&r1.ids)||[]).filter(id=>D[id]);ids=[...new Set(ids)].slice(0,sc?40:8);
  if(!ids.length){fin({err:'לא מצאתי מוצר מתאים. נסי תמונה ברורה יותר, על רקע חלק, או חפשי לפי שם.',what:r1&&r1.what,url:V.res.url});return render()}
  if(ids.length>1&&lim.images.maxCount>=2){status('משווה לתמונות המוצרים…');
   try{const sh=await sheet(ids);
    const r2=await sample.json(`Image 1 is a photo of a product a woman received. Image 2 is a numbered grid (1-${ids.length}) of the product photos from her order(s). Which numbered product is the SAME product as in image 1 (same item, colour and pattern; ignore background, folding and lighting)?
Reply with ONLY JSON: {"order":[numbers, best match first, only plausible ones],"sure":true or false}`,{images:[ph,sh],modelTier:'default'});
    const ord=((r2&&r2.order)||[]).map(n=>ids[n-1]).filter(Boolean);
    if(ord.length)ids=[...new Set([...ord,...ids])].slice(0,6);else ids=ids.slice(0,6);fin({ids,what:r1.what,sure:!!(r2&&r2.sure),url:V.res.url});
   }catch(e){LOG('sheet',e);fin({ids:ids.slice(0,6),what:r1.what,url:V.res.url})}}
  else fin({ids:ids.slice(0,6),what:r1.what,url:V.res.url});
 }catch(e){LOG('sample',e);fin({err:e&&e.code=='not_granted'?'צריך לאשר לאתר לשלוח תמונה ל-Claude (בחלון שקפץ). נסי שוב.':e&&e.code=='rate_limited'?'יותר מדי בקשות ברגע – נסי שוב בעוד דקה.':'הזיהוי לא הצליח – נסי שוב.',url:V.res&&V.res.url})}
 render();}
function status(t){const s=body().querySelector('.o3busy span');if(s)s.textContent=t}
function renderRes(){const b=body(),r=V.res;
 const top=`<div class="o3photo">${r.url?`<img src="${H(r.url)}" alt="">`:''}${r.what?`<p>ראיתי: <b>${H(r.what)}</b></p>`:''}</div>`;
 if(r.busy){b.innerHTML=top+'<div class="o3busy"><i></i><span>מכין את התמונה…</span></div>';return}
 if(r.err){b.innerHTML=top+`<p class="o3err">${H(r.err)}</p><div class="o3all"><button data-o3retry>${r.ord?'חזרה להזמנה':'חזרה להזמנות'}</button></div>`;return}
 b.innerHTML=top+`<p class="o3hint">${r.sure?'נראה לי שזה המוצר הראשון. ':''}לחצי על המוצר הנכון – ואפתח לך את כל ההזמנה שלו:</p>
 <div class="o3cands">${r.ids.map((id,i)=>{const x=D[id],o={k:x.order,src:x.src,file:x.file||''};
  return `<button class="o3cand${i==0?' best':''}" data-o3pick="${H(id)}">${th(id)}<span><b>${H((IT[id]||{}).tname||x.short)}</b><small>${ACC[x.src]} · ${H(oname(o))} · ${H(x.date||'')}</small><small>${H([x.color,x.size&&'מידה '+x.size].filter(Boolean).join(' · '))}</small>${i==0?'<em>הכי מתאים</em>':''}</span></button>`}).join('')}</div>
 <label class="o3cam small"><input type="file" accept="image/*" data-o3cam><span class="ic">📷</span><span><b>זה לא אף אחד – לצלם שוב</b></span></label>${r.ord?'<div class="o3all"><button data-o3retry class="ghost">‹ חזרה להזמנה</button></div>':''}`;
 loadThumbs(r.ids);}

// ---- item window opened from an order: closing it returns to that order (unless something else opened, e.g. the studio)
function armBack(bk){const d=q('#dlg');if(!d)return;V.back=bk;
 if(!d.dataset.o3bk){d.dataset.o3bk=1;d.addEventListener('close',()=>{const b=V.back;if(!b)return;V.back=null;
  setTimeout(()=>{if([...document.querySelectorAll('dialog[open]')].some(x=>x.id!='ord123'))return;
   const id=(typeof CUR!='undefined'&&CUR&&D[CUR]&&D[CUR].order==b.ord)?CUR:b.hl;open(b.ord,id)},250)})}}
// ---- entry points: home button, item window link, search, card badge "חסר"
function paintEntry(){try{
 const cta=q('.h9cta')||q('.h9hero');if(!cta)return;let e=q('#ord123b');
 if(!e){e=document.createElement('button');e.id='ord123b';e.dataset.o3go='';cta.appendChild(e)}
 let u=0,m=0;for(const id of Object.keys(D)){const s=st(id);if(s=='m')m++;else if(!s)u++}
 e.innerHTML=`<span>📦</span><span><b>ההזמנות שלי</b><small>${m?`❌ ${m} חסרים · `:''}${u?`⚪ ${u} לא סימנתי`:'הכל מסומן'}</small></span>`;
 }catch(err){LOG('entry',err)}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-o3go]');if(!t)return;e.preventDefault();e.stopPropagation();
 V.back=null;const id=t.dataset.o3go;if(id&&D[id]){document.querySelectorAll('dialog[open]').forEach(d=>{if(d.id!='ord123')try{d.close()}catch(_){}});open(D[id].order,id)}else open()},true);
// item window: "📦 כל ההזמנה" under the details
setInterval(()=>{try{const d=q('#dlg');if(!d||!d.open)return;const ed=d.querySelector('.ed[data-id]');if(!ed)return;const id=ed.dataset.id;
 if(d.querySelector(`[data-o3go="${CSS.escape(id)}"]`))return;d.querySelectorAll('[data-o3go]').forEach(x=>x.remove());
 const o=orders().find(o=>o.k==D[id].order);if(!o)return;const s=st(id);
 const b=document.createElement('button');b.className='o3dl';b.dataset.o3go=id;
 b.innerHTML=`📦 כל ההזמנה (${o.ids.length} מוצרים) · ${{y:'✅ הגיע',n:'⏳ בדרך',m:'❌ חסר','':'⚪ לא סימנתי'}[s]}`;
 (d.querySelector('.pd85')||d.querySelector('.dinfo')||ed).after(b)}catch(err){LOG('dlg',err)}},500);
// card: "חסר" badge
if(typeof paint=='function'){const p0=paint;window.paint=paint=function(id){p0.apply(this,arguments);try{const c=card(id);if(!c)return;const ph=c.querySelector('.ph');if(!ph)return;
 let b=ph.querySelector('.ms123');const m=!!(IT[id]||{}).miss;
 if(m&&!b){b=document.createElement('span');b.className='ms123';b.textContent='❌ חסר';ph.appendChild(b)}else if(!m&&b)b.remove();
 if(m){const tr=c.querySelector('.tr');if(tr)tr.classList.add('hide')}}catch(_){}}}
// free search (v85 strip): typing "הזמנ" / "משלוח" offers the screen
document.addEventListener('input',e=>{if(!e.target.matches||!e.target.matches('#q'))return;setTimeout(()=>{try{const v=e.target.value.trim();const sx=q('.sx85');if(!sx)return;let b=sx.querySelector('[data-o3go]');
 if(/הזמנ|משלוח|חבילה|הגיע|חסר|קיבלתי/.test(v)){if(!b){b=document.createElement('button');b.dataset.o3go='';b.className='o3sx';b.innerHTML='📦 ההזמנות שלי – מה הגיע ומה חסר';sx.prepend(b)}sx.hidden=false}else if(b)b.remove()}catch(_){}},120)});
// keep the home button fresh
let pT;const kick=()=>{clearTimeout(pT);pT=setTimeout(()=>{paintEntry();const d=q('#ord123');if(d&&d.open&&!V.res&&!document.activeElement.matches('[data-o3q],[data-o3note]'))refresh()},400)};
if(typeof apply=='function'){const a0=apply;window.apply=apply=function(){const r=a0.apply(this,arguments);kick();return r}}
setTimeout(paintEntry,1200);setTimeout(paintEntry,4000);
})();
