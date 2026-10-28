/* v123 – "📦 ההזמנות שלי": items grouped by order (טמו 1 / טמו 2 / שיין), per item: arrived / on the way / missing,
   like / dislike, keep / return; return deadline per order; "📷 צילמתי מוצר" → Claude finds the product → its whole order.
   Item fields (IT[id]): got 'y'|'n' (existing), miss 1 (new: order came without it), lk 'y'|'n' (new), s 'kept'|'ret' (existing). */
(function(){
const LOG=(w,e)=>{try{(window.ERRS=window.ERRS||[]).push('orders123 '+w+': '+(e&&e.message||e))}catch(_){}};
const q=s=>document.querySelector(s);
const H=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ACC={t1:'טמו 1',t2:'טמו 2',t3:'טמו 3',sh:'שיין',ae:'עלי'};const ACCN={t1:'חשבון 8711309',t2:'חשבון 9285464',t3:'חשבון smart20.mortgage',sh:'',ae:''};
const V={acc:'',flt:'',q:'',ord:'',hl:'',scroll:0};
const dl=r=>{try{return r?daysLeft(r):null}catch(_){return null}};
const dnum=d=>{const m=/(\d+)\/(\d+)/.exec(d||'');return m?(+m[2])*100+(+m[1]):0};
const cat=id=>{try{return curCat(id)}catch(_){return D[id].cat}};
const catName=id=>{const c=cat(id);try{const x=(CATS||[]).find(a=>a[0]==c);if(x)return x[1]}catch(_){}return c};

// ---- state of one item
function st(id){const it=IT[id]||{},x=D[id];
 if(it.oos)return 'c'; // v174: cancelled by the shop (out of stock)
 if(it.miss)return 'm';
 if(it.got=='y')return 'y';
 if(it.got=='n')return 'n';
 if(x.transit&&!(ORD[x.order]||{}).arrived)return 'n';
 return '';}
function orders(){const o={};
 for(const id of Object.keys(D)){const x=D[id];if(!x||!x.order)continue;
  const k=x.order;(o[k]=o[k]||{k,src:x.src,ids:[],date:x.date,file:x.file||''}).ids.push(id)}
 return Object.values(o).sort((a,b)=>dnum(b.date)-dnum(a.date)||a.k.localeCompare(b.k));}
const NOPIC=['girls','boys','men','makeup','other','hosiery','hair','night'];
function needPic(id){const it=IT[id]||{};if(it.pn)return it.pn=='y';return !NOPIC.includes(it.cat||D[id].cat)}
function nUp(id){const it=IT[id]||{};return (it.pics||[]).length+(it.img?1:0)}
// v160: an order counts as "photos done" when she ticked ✓, or every product that needs a photo has one
function picDone(o){const p=picSum(o);return p.done||p.has>=p.need}
// v229 (Sara 27/10 00:13 "סימון האם יש אבטר או אין אבטר ... לחפש רק את ההזמנות שעדיין לא עשיתי להם אבטר"): an avatar mark per order,
// like the photos one. need = clothes/shoes/bags/jewelry that stay (not cancelled, not going back); has = on the 8-angle avatar (av188 st188 'ok').
const AVC=['dresses','tops','base','sweaters','skirts','sets','outer','scarves','shoes','belts','jewelry','bags'];
const needAv=id=>{const it=IT[id]||{};return !it.oos&&!it.gen&&it.s!='ret'&&it.s!='give'&&AVC.includes(cat(id))};
const avOk=id=>{try{return window.st188&&st188(id)=='ok'}catch(_){return false}};
function avSum(o){let need=0,has=0;for(const id of o.ids)if(needAv(id)){need++;if(avOk(id))has++}return {need,has,mark:!!(ORD[o.k]||{}).ad}}
function avDone(o){const a=avSum(o);return a.mark||a.has>=a.need}
function picSum(o){let need=0,has=0;for(const id of o.ids)if(needPic(id)){need++;if(nUp(id))has++}return {need,has,done:!!(ORD[o.k]||{}).pd}}
function onum(o){return o.src=='sh'||o.src=='ae'?o.k:o.k.replace(/^P0-/,'PO-')}
function oname(o){const n=(/(\d+)\s*$/.exec(o.file)||[])[1];
 if(o.src=='sh'||o.src=='ae')return 'הזמנה \u2066'+o.k.slice(o.src=='ae'?-6:-4)+'\u2069';
 return n?'קבלה '+n:'הזמנה \u2066'+o.k.slice(-6)+'\u2069';}
function osum(o){const c={y:0,n:0,m:0,u:0,c:0,lk:0,no:0,ret:0,kept:0,mb:0,fix:0,paid:0};let rd=null;
 for(const id of o.ids){const s=st(id),it=IT[id]||{};c[s||'u']++;if(it.lk=='y')c.lk++;if(it.lk=='n')c.no++;if(it.s=='ret')c.ret++;if(it.s=='kept')c.kept++;if(it.fix)c.fix++;if(it.mb&&!it.s)c.mb++;c.paid+=+D[id].paid||0;
  const r=D[id].rdl;if(r&&(!rd||r<rd))rd=r}
 c.rdl=rd;c.est=o.src=='sh'&&o.ids.some(id=>!D[id].rex);c.n_=o.ids.length-c.c;return c;}
function ostate(c){if(c.m)return 'm';if(c.u)return 'u';if(c.n)return 'n';return 'y';}
const money=v=>'₪'+Math.round(v).toLocaleString('he-IL');
function retTxt(r,est){if(!r)return '';const n=dl(r);const d=r.slice(8,10)+'/'+r.slice(5,7);
 if(n==null)return '';if(n<0)return `<span class="o3r late">ההחזרה נסגרה (${d})</span>`;
 return `<span class="o3r ${n<=7?'soon':n<=21?'mid':''}"${est?' title="בשיין התאריך המדויק נקבע לפי המשלוח – זה תאריך משוער"':''}>להחזרה עד <bdi dir="ltr">${est?'~':''}${d}</bdi> · ${n==0?'היום!':n==1?'מחר':'עוד '+n+' ימים'}${est?' <small>(משוער)</small>':''}</span>`;}
function th(id,cls){const s=(()=>{try{return img(id)}catch(_){return ''}})();
 return `<img class="${cls||'o3i'}" data-th="${H(id)}" ${s?`src="${H(s)}"`:''} alt="" loading="lazy">`;}
function loadThumbs(ids){const cs=new Set(ids.map(id=>D[id]&&D[id].cat).filter(Boolean));
 cs.forEach(c=>{try{thLoad(c)}catch(_){}});try{thApply(TH)}catch(_){}}

// ---- dialog
function dlg(){let d=q('#ord123');if(d)return d;
 d=document.createElement('dialog');d.id='ord123';d.innerHTML='<div class="o3h"><button class="o3back" data-o3="back" aria-label="חזרה" hidden>‹</button><h3>📦 ההזמנות שלי</h3><button class="o3x" data-o3="close" aria-label="סגירה">✕</button></div><div class="o3b"></div>';
 document.body.appendChild(d);
 d.addEventListener('click',onClick);d.addEventListener('toggle',e=>{const x=e.target;if(x.matches&&x.matches('[data-o3fab]')){x.open?V.open.add(x.dataset.o3fab):V.open.delete(x.dataset.o3fab)}},true);d.addEventListener('input',onInput);d.addEventListener('change',onChange);
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

function fixIds(L){return L.flatMap(o=>o.ids).filter(id=>(IT[id]||{}).fix)}
function fixText(ids){return '🧵 בגדים לתיקון:\n'+ids.map((id,i)=>{const it=IT[id]||{},x=D[id];const k=(it.fixk||[]).map(k=>(FIXK.find(f=>f[0]==k)||[,k])[1].replace('✂ ','')).join(', ');
 return `${i+1}. ${it.tname||x.short}${x.color?' · '+x.color:''}${k?' – '+k:''}${it.note?' ('+it.note+')':''}`}).join('\n')}
function fixList(L){const ids=fixIds(L);if(!ids.length)return '<p class="o3empty">עוד לא סימנת בגדים לתיקון. בתוך הזמנה לוחצים "🧵 דרוש תיקון".</p>';
 loadThumbs(ids);return `<div class="o3all"><button data-o3fixcopy>📋 העתיקי רשימה לתופרת (${ids.length})</button></div><div class="o3items">${ids.map(itemRow).join('')}</div>`}
const FLT=[['מה הגיע',[['','הכל'],['u','⚪ לא סימנתי'],['m','❌ חסר'],['n','⏳ בדרך'],['y','✅ להציג רק מה שהגיע'],['oos','🚫 בוטל – אזל מהמלאי']]],
 ['החזרות והחלטות',[['rp','↩ להחזיר (עוד לא נשלח)'],['rs','📮 הוחזרו'],['mb','❓ מתלבטת'],['fix','🧵 לתיקון']]],
 ['תמונות',[['pnd','📸 עוד לא העליתי תמונות'],['pdd','✅ סיימתי להעלות תמונות']]],
 ['אווטאר',[['anl','🧍 עוד לא סיימתי אווטאר'],['and','✅ סיימתי אווטאר']]]];
const fltName=()=>{if(V.flt=='fabq')return fabLbl(...V.tag.split(':'))||'בד ואיכות';for(const[,o]of FLT){const x=o.find(f=>f[0]==V.flt);if(x)return x[1]}return 'הכל'};
const retP=id=>{const it=IT[id]||{};return it.s=='ret'&&!it.rsent};
const retS=id=>{const it=IT[id]||{};return it.s=='ret'&&!!it.rsent};
function fabList(L){const [k,v]=(V.tag||':').split(':');const ids=L.flatMap(o=>o.ids).filter(id=>(IT[id]||{})[k]==v);
 if(ids.length)loadThumbs(ids);
 return ids.length?`<p class="o3hint">${ids.length} בגדים</p><div class="o3items">${ids.map(itemRow).join('')}</div>`:'<p class="o3empty">עוד אין בגדים עם הסימון הזה. מסמנים בתוך כל הזמנה, ב"🏷 בד ואיכות" של הבגד.</p>'}
// v147: in the returns lists every garment is a short packing row (photo, name, size, price) with only the return buttons
function retRow(id){const x=D[id],it=IT[id]||{};
 const b=(k,v,t,on)=>`<button data-o3set="${k}" data-v="${v}" data-id="${H(id)}" aria-pressed="${!!on}">${t}</button>`;
 const meta=[x.size&&('מידה '+x.size),x.color,money(+x.paid||0)+(x.qty>1?` · ${x.qty} יח׳`:'')].filter(Boolean).map(x=>'<bdi>'+H(x)+'</bdi>').join(' · ');
 return `<div class="o3it o3rr${it.rsent?' sent':''}" data-o3row="${H(id)}"><button class="o3ph" data-o3item="${H(id)}" aria-label="פתיחת המוצר">${th(id)}</button>
 <div class="o3in"><b>${H(it.tname||x.short)}</b><small>${meta}</small>${it.rwhy?`<small class="o3rn">↩ ${H(it.rwhy)}</small>`:''}${it.note?`<small class="o3rn">📝 ${H(it.note)}</small>`:''}
 <div class="o3seg rr">${b('rsent','1','📮 נשלח',it.rsent)}${b('refunded','1','💰 הכסף חזר',it.refunded)}${it.rsent?'':b('s','ret','✕ לא מחזירה',false)}</div></div></div>`}
const nItems=n=>n==1?'בגד אחד':n+' בגדים';
function retList(L,sent){const G=L.map(o=>({o,ids:o.ids.filter(sent?retS:retP)})).filter(g=>g.ids.length);
 if(!G.length)return `<p class="o3empty">${sent?'עוד לא סימנת שהחזרת משהו. כששולחים חבילה – לוחצים "📮 הוחזר" ליד הבגד.':'אין בגדים שמחכים להחזרה. בתוך הזמנה לוחצים "↩ מחזירה" ליד הבגד.'}</p>`;
 G.sort((a,b)=>String(osum(a.o).rdl||'9').localeCompare(String(osum(b.o).rdl||'9')));
 loadThumbs(G.flatMap(g=>g.ids));
 const all=G.flatMap(g=>g.ids),sum=money(all.reduce((t,id)=>t+(+D[id].paid||0),0)),rf=all.filter(id=>(IT[id]||{}).refunded).length;
 return `<div class="o3rtot">${sent?`📮 החזרת <b>${nItems(all.length)}</b> בשווי <b>${sum}</b> · 💰 הכסף חזר על <b>${rf}</b> מהם`:`↩ להחזיר: <b>${nItems(all.length)}</b> בשווי <b>${sum}</b> · <b>${G.length}</b> ${G.length==1?'חבילה':'חבילות'}`}</div><p class="o3hint">${sent?'מה שכבר החזרת, לפי הזמנה:':'כל חבילה = הזמנה אחת. אורזים יחד את מה שמופיע תחת אותה הזמנה:'}</p>`+G.map(({o,ids})=>{const c=osum(o);
  return `<div class="o3rg"><div class="o3rgh"><span class="sb2 ${o.src}">${ACC[o.src]}</span><b>${H(oname(o))}</b><small><bdi>${nItems(ids.length)}</bdi> · <bdi>${money(ids.reduce((t,id)=>t+(+D[id].paid||0),0))}</bdi>${sent?` · 💰 <bdi>${ids.filter(id=>(IT[id]||{}).refunded).length}/${ids.length}</bdi> החזר כספי`:''}</small>
   <span class="o3num"><small>מספר הזמנה ב${ACC[o.src]}:</small> <bdi>${H(onum(o))}</bdi> <button class="o3cp" data-o3copy="${H(onum(o))}">📋 העתק</button></span>${sent?'':retTxt(c.rdl,c.est)}
   <div class="o3all">${sent?'':`<button data-o3sentall="${H(o.k)}">📮 שלחתי את כל החבילה</button>`}<button data-o3open="${H(o.k)}" class="ghost">לכל ההזמנה ›</button></div></div>
   <div class="o3items">${ids.map(retRow).join('')}</div></div>`}).join('')}
function sheetHTML(){return `<div class="o3sbd" data-o3sheet="x"></div><div class="o3sheet" role="dialog" aria-label="סינון"><div class="o3sh"><b>סינון</b><button data-o3sheet="x" aria-label="סגירה">✕</button></div>
 ${FLT.map(([n,o])=>`<h4>${n}</h4><div class="o3sg">${o.map(([k,t])=>`<button data-o3f="${k}" aria-pressed="${V.flt==k}">${t}</button>`).join('')}</div>`).join('')}
 <h4>🏷 בד ואיכות</h4>${FAB.map(([k,n,o])=>`<div class="o3sg">${o.map(([v,t])=>`<button data-o3tag="${k}:${v}" aria-pressed="${V.flt=='fabq'&&V.tag==k+':'+v}">${t}</button>`).join('')}</div>`).join('')}</div>`}
function renderList(){const b=body(),all=orders();
 const tot={y:0,n:0,m:0,u:0};all.forEach(o=>{const c=osum(o);tot.y+=c.y;tot.n+=c.n;tot.m+=c.m;tot.u+=c.u});
 const ids=Object.keys(D);const rp=ids.filter(retP).length,rs=ids.filter(retS).length;
 const oosL=ids.filter(id=>(IT[id]||{}).oos),oosN=oosL.length,oosR=oosL.filter(id=>!IT[id].refunded).length;
 const qq=V.q.trim().toLowerCase().replace(/[-\s]/g,'').replace(/^po(?=\d)/,'p0'); // v144: Temu shows PO-…, our keys are P0-…
 const cnt={'':0,t1:0,t2:0,t3:0,sh:0,ae:0};all.forEach(o=>{cnt['']++;cnt[o.src]++});
 let L=all.filter(o=>!V.acc||o.src==V.acc);
 if(V.flt&&!['fabq','rp','rs','fix'].includes(V.flt))L=L.filter(o=>{const c=osum(o);if(V.flt=='pnd'||V.flt=='pdd'){const ps=picSum(o);return V.flt=='pdd'?ps.done:!ps.done}if(V.flt=='anl'||V.flt=='and')return avDone(o)==(V.flt=='and');return V.flt=='u'?c.u:V.flt=='m'?c.m:V.flt=='n'?c.n:V.flt=='mb'?c.mb:V.flt=='oos'?c.c:ostate(c)=='y'});
 if(qq){L=L.filter(o=>{if(o.k.toLowerCase().replace(/[-\s]/g,'').includes(qq)||oname(o).replace(/\s/g,'').includes(qq))return true;
  return o.ids.some(id=>(id+' '+D[id].short+' '+(D[id].full||'')+' '+((IT[id]||{}).tname||'')+' '+(D[id].color||'')).toLowerCase().replace(/[-\s]/g,'').includes(qq))})}
 if(V.pf==null){try{V.pf=localStorage.getItem('o3pf')||''}catch(_){V.pf=''}}
 const pfN={need:0,done:0};L.forEach(o=>pfN[picDone(o)?'done':'need']++);
 if(V.pf)L=L.filter(o=>picDone(o)==(V.pf=='done'));
 if(V.af==null){try{V.af=localStorage.getItem('o3af')||''}catch(_){V.af=''}}
 const afN={need:0,done:0};L.forEach(o=>afN[avDone(o)?'done':'need']++);
 if(V.af)L=L.filter(o=>avDone(o)==(V.af=='done'));
 const afRow=`<div class="o3pf o3af"><span>🧍</span>${[['','הכל'],['need',`עוד צריך אווטאר <small>${afN.need}</small>`],['done',`✅ סיימתי אווטאר <small>${afN.done}</small>`]].map(([k,n])=>`<button data-o3af="${k}" aria-pressed="${V.af==k}">${n}</button>`).join('')}</div>`;
 const pfRow=`<div class="o3pf"><span>📸</span>${[['','הכל'],['need',`עוד צריך תמונות <small>${pfN.need}</small>`],['done',`✅ כבר העליתי <small>${pfN.done}</small>`]].map(([k,n])=>`<button data-o3pf="${k}" aria-pressed="${V.pf==k}">${n}</button>`).join('')}</div>`;
 const tabs=[['','הכל'],['t1','טמו 1'],['t2','טמו 2'],['t3','טמו 3'],['sh','שיין'],['ae','עלי']].filter(([k])=>!k||cnt[k]).map(([k,n])=>`<button data-o3acc="${k}" aria-pressed="${V.acc==k}">${n} <small>${cnt[k]}</small></button>`).join('');
 const chip=(f,cls,txt)=>`<button class="${cls}" data-o3f="${f}" aria-pressed="${V.flt==f}">${txt}</button>`;
 b.innerHTML=`<div class="o3sum">${chip('y','y',`✅ <b>${tot.y}</b> הגיעו`)}${chip('m','m',`❌ <b>${tot.m}</b> חסרים`)}${chip('n','n',`⏳ <b>${tot.n}</b> בדרך`)}${chip('u','u',`⚪ <b>${tot.u}</b> לא סימנתי`)}${chip('rp','r',`↩ <b>${rp}</b> להחזיר`)}${chip('rs','rs',`📮 <b>${rs}</b> הוחזרו`)}${oosN?chip('oos','oos',`🚫 <b>${oosN}</b> בוטלו${oosR?` · 💰 ${oosR} מחכים להחזר`:''}`):''}${chip('pnd','pnd',`📸 <b>${orders().filter(o=>!(ORD[o.k]||{}).pd).length}</b> הזמנות בלי וי תמונות`)}${chip('anl','anl',`🧍 <b>${orders().filter(o=>!avDone(o)).length}</b> הזמנות בלי אווטאר`)}</div>
 <label class="o3cam"><input type="file" accept="image/*" data-o3cam><span class="ic">📷</span><span><b>צילמתי מוצר שהגיע</b><small>אמצא מאיזו הזמנה הוא, ואראה לך את כל ההזמנה</small></span></label>
 <div class="o3q"><input type="search" placeholder="🔍 מספר הזמנה, שם מוצר או T123" value="${H(V.q)}" data-o3q enterkeyhint="search"></div>
 <div class="o3bar2"><button class="o3fbtn${V.flt?' on':''}" data-o3sheet="open">☰ ${H(fltName())}${V.flt?'':' ▾'}</button>${V.flt?'<button class="o3fclr" data-o3f="" aria-label="ניקוי סינון">✕</button>':''}<div class="o3tabs">${tabs}</div></div>${pfRow}${afRow}
 ${V.flt=='fabq'?fabList(L):V.flt=='fix'?fixList(L):V.flt=='rp'?retList(L,false):V.flt=='rs'?retList(L,true):`<div class="o3list">${L.length?L.map(ocard).join(''):'<p class="o3empty">אין הזמנות כאלה</p>'}</div>`}
 ${V.flt?'':'<p class="o3tip">טיפ: כשחבילה מגיעה – פתחי את ההזמנה ולחצי "✅ הכל הגיע", ואז סמני רק מה שחסר.</p>'}
 ${V.sheet?sheetHTML():''}`;
 loadThumbs(L.flatMap(o=>o.ids.slice(0,5)));
 if(V.scroll){b.scrollTop=V.scroll;V.scroll=0}}

function ocard(o){const c=osum(o),s=ostate(c),ps=picSum(o);
 const lab={y:'✅ הכל הגיע',m:`❌ חסרים ${c.m}`,n:`⏳ בדרך ${c.n}`,u:`⚪ ${c.u} לא סומנו`}[s];
 const pct=Math.round(100*c.y/c.n_);
 const pics=o.ids.slice(0,5).map(id=>th(id,'o3t')).join('')+(o.ids.length>5?`<span class="o3more">+${o.ids.length-5}</span>`:'');
 return `<div class="o3cw"><button class="o3card s${s}" data-o3open="${H(o.k)}"><span class="o3top"><span class="sb2 ${o.src}">${ACC[o.src]}</span><b>${H(oname(o))}</b><small>${H(o.date||'')}</small><span class="o3st">${lab}</span></span>
 <span class="o3pics">${pics}</span>
 <span class="o3bar"><i style="width:${pct}%"></i></span>
 <span class="o3meta"><span>הגיעו <bdi>${c.y}/${c.n_}</bdi></span>${c.c?`<span>🚫 ${c.c} בוטל</span>`:''}<span>${money(c.paid)}</span>${c.lk?`<span>😍 ${c.lk}</span>`:''}${c.ret?`<span>↩ ${c.ret} להחזיר</span>`:''}${c.kept?`<span>🏠 ${c.kept}</span>`:''}${c.mb?`<span>❓ ${c.mb} מתלבטת</span>`:''}${c.fix?`<span>🧵 ${c.fix} לתיקון</span>`:''}</span>
 ${retTxt(c.rdl,c.est)}</button><button class="o3pdc${ps.done?' on':''}" data-o3pd="${H(o.k)}" aria-pressed="${ps.done}"><span class="bx">${ps.done?'✓':''}</span>${ps.done?'<b>הועלו כל התמונות</b>':'<b>סיימתי להעלות תמונות</b>'}${ps.need&&!ps.done?`<small>📸 <bdi>${ps.has}/${ps.need}</bdi></small>`:''}</button>${avStrip(o)}</div>`;}

function avStrip(o){const a=avSum(o),on=a.mark||a.has>=a.need;if(!a.need&&!a.mark)return '';
 return `<button class="o3pdc o3adc${on?' on':''}" data-o3ad="${H(o.k)}" aria-pressed="${on}"><span class="bx">${on?'✓':''}</span><b>${on?'האווטאר מוכן':'סיימתי אווטאר'}</b><small>🧍 <bdi>${a.has}/${a.need}</bdi></small></button>`}
function avRow(id){if(!needAv(id))return '';const ok=avOk(id),n=(window.up188&&up188(id))||0,e=H(id);let s='';try{s=window.mkst188?mkst188(id):''}catch(_){}
 return `<div class="o3seg why o3av${ok?' on':''}"><small>🧍 אווטאר</small><em data-mkst188="${e}">${H(ok?'✓ על האווטאר':s||(n?'⏳ הועלתה':'עוד אין'))}</em>${ok?`<button type="button" data-up188="${e}">🔄 להחליף</button>`:`<button type="button" data-mk188="${e}">📋 פרומפט</button><button type="button" class="go" data-up188="${e}">📤 להעלות 8 זוויות</button>`}</div>`}
function itemRow(id){const x=D[id],it=IT[id]||{},s=st(id);
 const b=(k,v,t,on)=>`<button data-o3set="${k}" data-v="${v}" data-id="${H(id)}" aria-pressed="${!!on}">${t}</button>`;
 const meta=[catName(id),x.size&&('מידה '+x.size),x.color,money(+x.paid||0)+(x.qty>1?` · ${x.qty} יח׳`:'')].filter(Boolean).map(x=>'<bdi>'+H(x)+'</bdi>').join(' · ');
 if(it.oos)return oosRow(id,b,meta);
 return `<div class="o3it s${s||'u'}${V.hl==id?' hl':''}" data-o3row="${H(id)}">
 <button class="o3ph" data-o3item="${H(id)}" aria-label="פתיחת המוצר">${th(id)}</button>
 <div class="o3in"><b>${H(it.tname||x.short)}</b><small>${meta}</small><small class="o3id">${H(id)}${transitNote(id)}</small>
 <div class="o3seg got">${b('got','y','✅ הגיע',s=='y')}${b('got','n','⏳ בדרך',s=='n')}${b('got','m','❌ חסר',s=='m')}</div>
 <div class="o3seg two"><span>${b('lk','y','😍 אוהבת',it.lk=='y')}${b('lk','m','🤔 לא בטוחה',it.lk=='m')}${b('lk','n','😕 לא אוהבת',it.lk=='n')}</span><span>${b('s','kept','🏠 משאירה',it.s=='kept')}${b('mb','1','❓ מתלבטת',!!it.mb&&!it.s)}${b('s','ret','↩ מחזירה',it.s=='ret')}</span></div>
 ${it.mb&&!it.s?`<div class="o3seg why"><small>למה?</small>${b('mbr','model','מחכה לדגם אחר',it.mbr=='model')}${b('mbr','size','מחכה למידה אחרת',it.mbr=='size')}${b('mbr','other','משהו אחר',it.mbr=='other')}</div>`:''}
 ${it.s=='ret'?`<div class="o3seg why rsent"><small>החזרה</small>${b('rsent','1','📮 הוחזר (נשלח)',it.rsent)}${b('refunded','1','💰 הכסף חזר',it.refunded)}</div>`:''}
 <div class="o3seg why pn${needPic(id)?' on':''}"><small>📸 תמונות</small>${b('pn','y','צריך להעלות',needPic(id))}${b('pn','n','לא צריך',!needPic(id))}<em>${nUp(id)?'📷 '+nUp(id)+' הועלו':'עוד אין'}</em></div>
 ${avRow(id)}
 <div class="o3seg marks">${b('fix','1','🧵 דרוש תיקון',it.fix)}${b('nofit','1','📏 לא במידה',it.nofit)}${b('bad','1','⚠️ פגום / לא כמו בתמונה',it.bad)}${b('oos','1','🚫 בוטל – אזל מהמלאי',false)}</div>
 ${isClo(id)?`<div class="o3seg why blt"><small>🎀 חגורה</small>${b('blt','y','הגיע עם חגורה',it.blt=='y')}${b('blt','n','בלי',it.blt=='n')}${b('blt','u','לא יודעת',it.blt=='u')}</div>`:''}
 ${it.fix?`<div class="o3seg why fixk"><small>מה לתקן?</small>${FIXK.map(([k,n])=>b('fixk',k,n,(it.fixk||[]).includes(k))).join('')}</div>`:''}
 <details class="o3fab" data-o3fab="${H(id)}"${V.open.has(id)?' open':''}><summary>🏷 בד ואיכות${FAB.map(([k])=>it[k]?' · '+fabLbl(k,it[k]):'').join('')}</summary>
 ${FAB.map(([k,n,opts])=>`<div class="o3seg why"><small>${n}</small>${opts.map(([v,t])=>b(k,v,t,it[k]==v)).join('')}</div>`).join('')}</details>
 <div class="o3note${it.note?' has':''}"><textarea data-o3note="${H(id)}" rows="${it.note?2:1}" placeholder="📝 הערה על הבגד (מה שבא לך לכתוב)">${H(it.note||'')}</textarea></div>
 </div></div>`;}
const FAB=[['fab','הבד',[['y','😍 אהבתי את הבד'],['n','😕 לא אהבתי']]],['fs','עונה',[['summer','☀️ בד קיצי'],['winter','❄️ בד חורפי'],['all','🍂 כל השנה']]],['ft','מגע',[['soft','☁️ נעים'],['rough','🌵 לא נעים']]],['rb','לקנות שוב?',[['y','👍 שווה לקנות שוב'],['n','👎 לא שווה'],['m','🤷 לא יודעת']]]];
const fabLbl=(k,v)=>{const g=FAB.find(f=>f[0]==k);const o=g&&g[2].find(x=>x[0]==v);return o?o[1]:''};
V.open=new Set();
const isClo=id=>{try{const c=cat(id);return c!='belts'&&GROUPOF(c)=='clo'}catch(_){return false}};
const FIXK=[['short','✂ לקצר'],['long','להאריך'],['narrow','להצר'],['wide','להרחיב'],['sleeve','שרוולים'],['waist','מותן / גומי'],['button','כפתור / רוכסן'],['tear','תפר / קרע'],['other','משהו אחר']];
// v174: the shop cancelled it (out of stock): a short row with the refund and "order again"
function oosRow(id,b,meta){const it=IT[id]||{},x=D[id];
 return `<div class="o3it sc${V.hl==id?' hl':''}" data-o3row="${H(id)}">
 <button class="o3ph" data-o3item="${H(id)}" aria-label="פתיחת המוצר">${th(id)}</button>
 <div class="o3in"><b>${H(it.tname||x.short)}</b><small>${meta}</small><small class="o3id">${H(id)}</small>
 <div class="o3oos"><b>🚫 בוטל – אזל מהמלאי</b><small>לא מופיע בארון. נשאר כאן כדי לעקוב אחרי הכסף.</small></div>
 <div class="o3seg why rsent"><small>הכסף</small>${b('refunded','1',it.refunded?'💰 הכסף חזר ✓':'💰 הכסף חזר',it.refunded)}</div>
 <div class="o3seg why"><small>מה עכשיו?</small>${b('reord','size','🔁 אזמין במידה אחרת',it.reord=='size')}${b('reord','other','🔎 אחפש דומה',it.reord=='other')}${b('reord','no','✕ מוותרת',it.reord=='no')}</div>
 ${it.reord=='size'||it.reord=='other'?`<a class="o3re" href="${H(reUrl(id))}" target="_blank" rel="noopener">${it.reord=='size'?'🛒 לחפש אותו בטמו':'🛒 לחפש דומה'}</a>`:''}
 <div class="o3seg why">${b('oos','1','↩ טעות, לא בוטל',false)}</div>
 <div class="o3note${it.note?' has':''}"><textarea data-o3note="${H(id)}" rows="${it.note?2:1}" placeholder="📝 הערה (למשל: הזמנתי שוב במידה M)">${H(it.note||'')}</textarea></div>
 </div></div>`}
function reUrl(id){const x=D[id],t=encodeURIComponent((x.full||x.short||'').slice(0,60));
 return x.src=='sh'?'https://www.shein.com/pdsearch/'+t+'/':x.src=='ae'?'https://www.aliexpress.com/w/wholesale-'+t+'.html':'https://www.temu.com/search_result.html?search_key='+t}
function transitNote(id){const x=D[id],it=IT[id]||{};if(it.got||it.miss)return '';return x.transit?' · לפי האתר: עוד בדרך':''}

function renderOrder(){const b=body(),o=orders().find(o=>o.k==V.ord);if(!o){V.ord='';return renderList()}
 b.innerHTML=`${oheadHTML(o)}
 <div class="o3items">${o.ids.map(itemRow).join('')}</div>`;
 loadThumbs(o.ids);
 if(V.hl){const r=b.querySelector(`[data-o3row="${CSS.escape(V.hl)}"]`);if(r)setTimeout(()=>r.scrollIntoView({block:'center'}),60)}else b.scrollTop=0;}
function avHead(o){const a=avSum(o);if(!a.need&&!a.mark)return '';const on=a.mark||a.has>=a.need;
 return `<button class="o3pd o3ad${on?' on':''}" data-o3ad="${H(o.k)}" aria-pressed="${on}"><b>${on?'✅ סיימתי אווטאר להזמנה הזאת':'🧍 סיימתי אווטאר? לחצי כדי לסמן'}</b><small>מוכנים על האווטאר: <bdi>${a.has}</bdi> מתוך <bdi>${a.need}</bdi>${a.mark?' · לחיצה מבטלת':a.has>=a.need?' · כולם מוכנים':' · מעלים ליד כל מוצר למטה'}</small></button>`}
function oheadHTML(o){const c=osum(o),ps=picSum(o);
 return `<div class="o3oh"><span class="sb2 ${o.src}">${ACC[o.src]}</span><b>${H(oname(o))}</b><small><bdi>${H(o.date||'')}</bdi> · <bdi>${o.ids.length} מוצרים</bdi> · <bdi>${money(c.paid)}</bdi></small>
  <span class="o3num"><small>מספר הזמנה ב${ACC[o.src]}:</small> <bdi>${H(onum(o))}</bdi> <button class="o3cp" data-o3copy="${H(onum(o))}">📋 העתק</button></span>${retTxt(c.rdl,c.est)}
  <div class="o3sum small"><span class="y">✅ <b>${c.y}</b></span><span class="m">❌ <b>${c.m}</b></span><span class="n">⏳ <b>${c.n}</b></span><span class="u">⚪ <b>${c.u}</b></span><span>😍 <b>${c.lk}</b></span><span>❓ <b>${c.mb}</b></span><span>↩ <b>${c.ret}</b></span></div>
  <button class="o3pd${ps.done?' on':''}" data-o3pd="${H(o.k)}" aria-pressed="${ps.done}"><b>${ps.done?'✅ סיימתי להעלות תמונות להזמנה הזאת':'📸 סיימתי להעלות תמונות? לחצי כדי לסמן'}</b><small>צריך תמונות: <bdi>${ps.need}</bdi> מוצרים · כבר העלית ל-<bdi>${ps.has}</bdi>${ps.done?' · לחיצה מבטלת':''}</small></button>${avHead(o)}
  <div class="o3shop"><label class="o3cam small"><input type="file" accept="image/*" data-o3cam="${H(o.k)}"><span class="ic">📷</span><span><b>צלמי מוצר מההזמנה הזאת</b><small>אמצא איזה מהם זה ואסמן שהגיע</small></span></label>
  <button data-o3shop="${H(o.k)}">🛍 ההזמנה ב${ACC[o.src]}<small>${o.src=='sh'||o.src=='ae'?'פותח ישר את ההזמנה':'<bdi>'+ACCN[o.src]+'</bdi> · פותח ישר את ההזמנה'}</small></button></div>
  <div class="o3all"><button data-o3all="y">✅ הכל הגיע</button><button data-o3all="n">⏳ הכל עוד בדרך</button><button data-o3all="clear" class="ghost">איפוס</button></div></div>`;}
// v145: a mark redraws only its row and the order header, not the whole screen (was ~0.7s on the phone)
function rowRefresh(id){const b=body();if(!V.ord||V.res||V.flt&&!V.ord)return refresh();const o=orders().find(o=>o.k==V.ord);const r=b.querySelector(`[data-o3row="${CSS.escape(id)}"]`);const h=b.querySelector('.o3oh');if(!o||!r||!h)return refresh();
 r.outerHTML=itemRow(id);h.outerHTML=oheadHTML(o);loadThumbs([id]);V.local=Date.now()}

// ---- marks
async function setMark(id,k,v){const it=IT[id]||{};let p;
 if(k=='got'){const cur=st(id);
  if(v=='m')p=cur=='m'?{miss:'',got:''}:{miss:1,got:''};
  else p=cur==v&&(it.got==v)?{got:'',miss:''}:{got:v,miss:''};}
 else if(k=='fix')p=it.fix?{fix:'',fixk:''}:{fix:true};
 else if(k=='nofit'||k=='bad'||k=='refunded')p={[k]:!it[k]};
 else if(k=='rsent')p={rsent:it.rsent?'':1};
 else if(k=='oos')p=it.oos?{oos:'',reord:''}:{oos:Date.now(),got:'',miss:''};
 else if(k=='fixk'){const a=(it.fixk||[]).slice(),i=a.indexOf(v);i<0?a.push(v):a.splice(i,1);p={fixk:a.length?a:'',fix:true}}
 else if(k=='mb')p=it.mb&&!it.s?{mb:'',mbr:''}:{mb:1,s:''};
 else if(k=='s')p=it.s==v?{s:'',rsent:''}:{s:v,mb:'',mbr:'',...(v!='ret'?{rsent:''}:{})};
 else p={[k]:it[k]==v?'':v};
 for(const x of Object.keys(p))if(!p[x]&&!it[x])delete p[x];
 if(!Object.keys(p).length)return;
 try{await putItem(id,p)}catch(e){LOG('put',e)}}
async function setAll(o,v){const ids=o.ids;
 for(const id of ids){const it=IT[id]||{};
  if(v=='clear'){if(it.got||it.miss)await putItem(id,{got:'',miss:''})}
  else if(v=='y'){if(!it.miss&&it.got!='y')await putItem(id,{got:'y'})}
  else if(v=='n'){if(!it.got&&!it.miss)await putItem(id,{got:'n'})}}
 if(v=='y'&&o.src&&typeof putOrd=='function'&&!(ORD[o.k]||{}).arrived){try{await putOrd(o.k,true)}catch(e){LOG('ord',e)}}}

function refresh(){const b=body(),y=b.scrollTop;render();b.scrollTop=y;}
async function onClick(e){const t=e.target.closest('button,[data-o3cam],.o3sbd');if(!t)return;
 try{
 if(t.dataset.o3=='close'){dlg().close();return}
 if(t.dataset.o3=='back'){if(V.res){V.ord=V.res.ord||'';V.res=null}else V.ord='';V.hl='';render();return}
 if(t.dataset.o3acc!=null){V.acc=t.dataset.o3acc;render();return}
 if(t.dataset.o3sheet){V.sheet=t.dataset.o3sheet=='open';const y=body().scrollTop;render();body().scrollTop=y;return}
 if(t.dataset.o3af!=null){V.af=t.dataset.o3af;try{localStorage.setItem('o3af',V.af)}catch(_){}render();return}
 if(t.dataset.o3pf!=null){V.pf=t.dataset.o3pf;try{localStorage.setItem('o3pf',V.pf)}catch(_){}render();return}
 if(t.dataset.o3f!=null){const f=t.dataset.o3f;V.flt=V.flt==f&&!V.sheet?'':f;V.sheet=false;V.tag='';render();return}
 if(t.dataset.o3sentall){const o=orders().find(o=>o.k==t.dataset.o3sentall);if(o){for(const id of o.ids.filter(retP))await putItem(id,{rsent:1});toast('סימנתי שהחבילה נשלחה 📮')}refresh();return}
 if(t.dataset.o3open){V.scroll=body().scrollTop;V.ord=t.dataset.o3open;V.hl='';render();return}
 if(t.dataset.o3shop){const k=t.dataset.o3shop,o=orders().find(o=>o.k==k);const num=o&&(o.src=='t1'||o.src=='t2'||o.src=='t3')?k.replace(/^P0/,'PO'):k;
  try{await navigator.clipboard.writeText(num)}catch(_){}
  const u=o&&o.src=='ae'?'https://www.aliexpress.com/p/order/detail.html?orderId='+encodeURIComponent(num):o&&o.src=='sh'?'https://m.shein.com/il/user/orders/detail/'+encodeURIComponent(num):'https://www.temu.com/bgt_order_detail.html?parent_order_sn='+encodeURIComponent(num); // v137: straight to the order page
  toast('פותחת את ההזמנה. המספר גם הועתק: '+num);try{window.open(u,'_blank','noopener')}catch(_){}return}
 if(t.dataset.o3tag){V.flt='fabq';V.tag=t.dataset.o3tag;V.sheet=false;render();return}
 if(t.dataset.o3fixcopy!=null){const txt=fixText(fixIds(orders()));try{await navigator.clipboard.writeText(txt);toast('הרשימה הועתקה – אפשר להדביק בווטסאפ')}catch(_){toast('לא הצלחתי להעתיק')}return}
 if(t.dataset.o3copy){const v=t.dataset.o3copy;let ok=false;try{await navigator.clipboard.writeText(v);ok=true}catch(_){try{const ta=document.createElement('textarea');ta.value=v;ta.style.cssText='position:fixed;opacity:0';(t.closest('dialog')||document.body).appendChild(ta);ta.select();ok=document.execCommand('copy');ta.remove()}catch(_){}}toast(ok?'✓ הועתק: '+v:'לא הצלחתי להעתיק – לחצי לחיצה ארוכה על המספר: '+v);if(ok){const o0=t.textContent;t.textContent='✓ הועתק';setTimeout(()=>t.textContent=o0,1600)}return}
 if(t.dataset.o3item){const id=t.dataset.o3item;const bk={ord:V.ord,hl:id};dlg().close();try{openItem(id);armBack(bk)}catch(err){LOG('open',err)}return}
 if(t.dataset.o3set){t.setAttribute('aria-pressed','true');await setMark(t.dataset.id,t.dataset.o3set,t.dataset.v);V.hl=t.dataset.id;rowRefresh(t.dataset.id);if(t.dataset.o3set=='oos'){try{apply()}catch(_){}toast((IT[t.dataset.id]||{}).oos?'🚫 בוטל – יצא מהארון, נשאר כאן למעקב אחרי הכסף':'↩ החזרתי לארון')}return}
 if(t.dataset.o3ad){const k=t.dataset.o3ad,d=!(ORD[k]||{}).ad;t.disabled=true;try{await putOrd(k,{ad:d?1:0})}catch(e){LOG('ad',e)}refresh();toast(d?'✅ סומן: סיימת אווטאר להזמנה הזאת':'בוטל הסימון');return}
 if(t.dataset.o3pd){const k=t.dataset.o3pd,d=!(ORD[k]||{}).pd;t.disabled=true;try{await putOrd(k,{pd:d?1:0})}catch(e){LOG('pd',e)}refresh();toast(d?'✅ סומן: סיימת להעלות תמונות להזמנה הזאת':'בוטל הסימון');return}
 if(t.dataset.o3all){const o=orders().find(o=>o.k==V.ord);if(!o)return;
  if(t.dataset.o3all=='clear'&&!(typeof sure=='function'?sure(t,'לאפס? לחצי שוב'):true))return;
  t.disabled=true;await setAll(o,t.dataset.o3all);refresh();toast(t.dataset.o3all=='y'?'סימנתי שהכל הגיע – עכשיו סמני רק מה שחסר':'עודכן');return}
 if(t.dataset.o3pick){const id=t.dataset.o3pick;const pf=V.res&&V.res.file;V.res=null;V.ord=D[id].order;V.hl=id;
  if(pf&&typeof addPics=='function'){addPics(id,[pf],{label:'צילום שלי',nocrop:true}).then(()=>{try{rowRefresh(id)}catch(_){}}).catch(err=>LOG('pickpic',err));toast('שומרת את התמונה שלך במוצר…')}
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
 // v157: every step has a time limit, and her photo is kept so it can be saved on the product she picks
 const TO=(p,ms,v)=>Promise.race([p,new Promise(r=>setTimeout(()=>r(v),ms))]);const S7=(s,x)=>{try{window.step157&&step157('id_'+s,x)}catch(_){}};S7('start',{size:file.size,type:file.type,ord:so});
 const fin=r=>{V.res=Object.assign(r,{ord:so,file});};
 let sample=null;try{sample=await TO(claude.use('sample'),12000,null)}catch(_){}
 const lim=sample?await TO(sample.limits().catch(()=>null),8000,null):null;S7('cap',{s:!!sample,l:!!lim});
 if(!sample||!lim||!lim.images){fin({err:'אין לי כאן גישה לזיהוי תמונה. אפשר לחפש לפי שם או מספר הזמנה, או לשלוח לי את התמונה בצ׳אט.',url:V.res.url});return render()}
 try{const ph=await TO(shrink(file,1024),15000,null);if(!ph){S7('shrink_to');fin({err:'לא הצלחתי לקרוא את התמונה. נסי צילום מסך שלה, או תמונה אחרת.',url:V.res.url});return render()}
  const sc=so?((orders().find(o=>o.k==so)||{}).ids||[]):null;
  if(sc&&sc.length==1){fin({ids:sc,url:V.res.url,sure:true});return render()}
  let r1;if(sc&&sc.length<=40){r1={what:'',ids:sc}}else{
  status('מסתכל על התמונה ומחפש ברשימת ההזמנות…');
  r1=await TO(sample.json(`My client photographed ONE product she just received in a parcel from Temu or Shein (photo attached). Below is the list of every product she ordered, one per line: id | category | product title (Hebrew, from the receipt) | colour | size | note.
Find the product in the photo. Look at the type of item, colour, pattern, material and details. Titles are machine-translated and may be vague.
Reply with ONLY JSON: {"what":"short Hebrew description of what is in the photo (max 8 words)","ids":["up to 8 ids, most likely first"]}

${catalog(sc)}`,{images:[ph],modelTier:'default'}),70000,null);S7('r1',{n:(r1&&r1.ids||[]).length});}
  let ids=((r1&&r1.ids)||[]).filter(id=>D[id]);ids=[...new Set(ids)].slice(0,sc?40:8);
  if(!ids.length){S7('none',{r:!!r1});fin({err:r1===null?'הזיהוי לקח יותר מדי זמן – נסי שוב, או חפשי לפי שם.':'לא מצאתי מוצר מתאים. נסי תמונה ברורה יותר, על רקע חלק, או חפשי לפי שם.',what:r1&&r1.what,url:V.res.url});return render()}
  if(ids.length>1&&lim.images.maxCount>=2){status('משווה לתמונות המוצרים…');
   try{const sh=await sheet(ids);
    const r2=await TO(sample.json(`Image 1 is a photo of a product a woman received. Image 2 is a numbered grid (1-${ids.length}) of the product photos from her order(s). Which numbered product is the SAME product as in image 1 (same item, colour and pattern; ignore background, folding and lighting)?
Reply with ONLY JSON: {"order":[numbers, best match first, only plausible ones],"sure":true or false}`,{images:[ph,sh],modelTier:'default'}),60000,null);
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
 let u=0,m=0,n=0;for(const id of Object.keys(D)){const s=st(id);if(s=='m')m++;else if(s=='n')n++;else if(!s)u++}
 // v244: she reads this button to see that new orders arrived – show how many orders, how many on the way, and today's new ones
 const all=orders(),td=new Date(),tdk=td.getDate()+'/'+(td.getMonth()+1),nw=all.filter(o=>o.date==tdk).length;
 const h=`<span>📦</span><span><b>ההזמנות שלי (${all.length})</b><small>${nw?`🆕 ${nw} מהיום · `:''}${n?`⏳ ${n} בדרך · `:''}${m?`❌ ${m} חסרים · `:''}${u?`⚪ ${u} לא סימנתי`:'הכל מסומן'}</small></span>`;if(e.innerHTML!=h)e.innerHTML=h;
 }catch(err){LOG('entry',err)}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-o3go]');if(!t)return;e.preventDefault();e.stopPropagation();
 V.back=null;const id=t.dataset.o3go;if(id&&D[id]){document.querySelectorAll('dialog[open]').forEach(d=>{if(d.id!='ord123')try{d.close()}catch(_){}});open(D[id].order,id)}else open()},true);
// item window: "📦 כל ההזמנה" under the details
setInterval(()=>{try{const d=q('#dlg');if(!d||!d.open)return;const ed=d.querySelector('.ed[data-id]');if(!ed)return;const id=ed.dataset.id;
 if(d.querySelector(`[data-o3go="${CSS.escape(id)}"]`))return;d.querySelectorAll('[data-o3go]').forEach(x=>x.remove());
 const o=orders().find(o=>o.k==D[id].order);if(!o)return;const s=st(id);
 const b=document.createElement('button');b.className='o3dl';b.dataset.o3go=id;
 b.innerHTML=`📦 כל ההזמנה (${o.ids.length} מוצרים) · ${ACC[o.src]} · ${{y:'✅ הגיע',n:'⏳ בדרך',m:'❌ חסר',c:'🚫 בוטל – אזל מהמלאי','':'⚪ לא סימנתי'}[s]}`;
 (d.querySelector('.pd85')||d.querySelector('.dinfo')||ed).after(b)}catch(err){LOG('dlg',err)}},500);
// card: "חסר" badge
if(typeof paint=='function'){const p0=paint;window.paint=paint=function(id){p0.apply(this,arguments);try{const c=card(id);if(!c)return;const ph=c.querySelector('.ph');if(!ph)return;
 let b=ph.querySelector('.ms123');const m=!!(IT[id]||{}).miss;
 if(m&&!b){b=document.createElement('span');b.className='ms123';b.textContent='❌ חסר';ph.appendChild(b)}else if(!m&&b)b.remove();
 if(m){const tr=c.querySelector('.tr');if(tr)tr.classList.add('hide')}}catch(_){}}}
// free search (v85 strip): typing "הזמנ" / "משלוח" offers the screen
document.addEventListener('input',e=>{if(!e.target.matches||!e.target.matches('#q'))return;setTimeout(()=>{try{const v=e.target.value.trim();const sx=q('.sx85');if(!sx)return;let b=sx.querySelector('[data-o3go]');
 if(/הזמנ|משלוח|חבילה|הגיע|חסר|קיבלתי/.test(v)){if(!b){b=document.createElement('button');b.dataset.o3go='';b.className='o3sx';b.innerHTML='📦 ההזמנות שלי – מה הגיע ומה חסר';sx.prepend(b)}sx.hidden=false}else if(b)b.remove()}catch(_){}},120)});
// ---- v152: returns from the item window + "מוצרים להחזרה" on home (Sara 24/10)
const RWHY=['קטן עליי','גדול עליי','לא אוהבת','פגום','לא כמו בתמונה'];
window.O3RET=function(){V.back=null;V.ord='';V.hl='';V.res=null;V.flt='rp';const d=dlg();render();if(!d.open)d.showModal()};
const retAll=()=>Object.keys(D).filter(retP);
function retSoon(ids){let best=null;ids.forEach(id=>{const r=D[id].rdl;if(r&&(!best||r<best))best=r});return best}
const dd=s=>{const [y,m,d]=String(s).split('-');return `${+d}/${+m}`};
const left=s=>Math.round((new Date(s+'T00:00:00')-new Date(new Date().toDateString()))/864e5);
function paintRet(){try{const cta=q('.h9cta')||q('.h9hero');if(!cta)return;let e=q('#ret152b');
 const ids=retAll();if(!ids.length){if(e)e.remove();return}
 if(!e){e=document.createElement('button');e.id='ret152b';e.onclick=ev=>{ev.preventDefault();O3RET()};const o=q('#ord123b');o?o.after(e):cta.appendChild(e)}
 const pk=new Set(ids.map(id=>D[id].order)).size,s=retSoon(ids),n=s!=null?left(s):null;
 const h=`<span>↩</span><span><b>מוצרים להחזרה (${ids.length})</b><small>${pk==1?'חבילה אחת':pk+' חבילות'}${s?` · ${n<0?'עבר הזמן של חלק':'הכי קרוב: עד '+dd(s)+(n<=7?` ⏰ עוד ${n} ימים`:'')}`:''}</small></span>`;if(e.innerHTML!=h)e.innerHTML=h;
 e.classList.toggle('urg',n!=null&&n<=7)}catch(err){LOG('ret152',err)}}
// item window: מצב = שמרתי / להחזיר / החזרתי / למסור, and a reason row while it waits to be returned
function retRow152(id){const ed=q('#dlbody .ed:not(.edtop)');if(!ed||ed.dataset.id!=id)return;const row=ed.querySelector('.erow.r152')||[...ed.querySelectorAll('.erow')].find(r=>r.querySelector('[data-k="s:ret"]'));if(!row)return;
 const it=IT[id]||{},want=it.s=='ret'&&!it.rsent,sent=it.s=='ret'&&!!it.rsent,x=D[id];
 const b=(k,l,on)=>`<button data-r152="${k}" aria-pressed="${!!on}">${l}</button>`;
 row.innerHTML=`<span>מצב</span>${b('kept','✓ שמרתי',it.s=='kept')}${b('want','↩ להחזיר',want)}${b('sent','📮 החזרתי',sent)}${b('give','🎁 למסור',it.s=='give')}`;row.classList.add('r152');
 let w=ed.querySelector('.r152why');if(w)w.remove();
 if(want){w=document.createElement('div');w.className='r152why';const n=x.rdl?left(x.rdl):null;
  w.innerHTML=`<p><b>↩ מחכה להחזרה</b>${x.rdl?` · ${n<0?'כנראה שעבר זמן ההחזרה':'אפשר להחזיר עד '+dd(x.rdl)+' (עוד '+n+' ימים'+(x.rex?')':', משוער)')}`:''}</p>
  <div class="o3seg">${RWHY.map(r=>`<button data-r152why="${H(r)}" aria-pressed="${it.rwhy==r}">${r}</button>`).join('')}</div>
  <button class="go" data-r152list>↩ לכל המוצרים להחזרה</button>`;row.after(w)}}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-r152],[data-r152why],[data-r152list]');if(!t)return;e.preventDefault();e.stopPropagation();
 if(t.dataset.r152list!=null){O3RET();return}
 const id=t.closest('.ed').dataset.id,it=IT[id]||{};
 if(t.dataset.r152why){const v=t.dataset.r152why,was=it.rwhy==v;await putItem(id,{rwhy:was?'':v})}
 else{const k=t.dataset.r152,on=t.getAttribute('aria-pressed')=='true';
  const p=k=='want'?{s:on?'':'ret',rsent:false}:k=='sent'?{s:on?'':'ret',rsent:!on}:{s:on?'':k};
  await putItem(id,p)}
 retRow152(id);paintRet()},true);
// item window: a re-render (after any mark) keeps the scroll place and the open sections
{const _oi=window.openItem||openItem;const keep=id=>{const d=q('#dlg');if(!d||!d.open||typeof CUR=='undefined'||CUR!=id)return null;const w=d.querySelector('.dlwrap');
  return {w:w?w.scrollTop:0,d:d.scrollTop,o:[...d.querySelectorAll('#dlbody details')].map(x=>x.className+'|'+(x.querySelector('summary')||{}).textContent).filter((k,i,a)=>[...d.querySelectorAll('#dlbody details')][i].open)}};
 const put=s=>{const d=q('#dlg');if(!d)return;d.querySelectorAll('#dlbody details').forEach(x=>{if(s.o.includes(x.className+'|'+(x.querySelector('summary')||{}).textContent))x.open=true});const w=d.querySelector('.dlwrap');if(w)w.scrollTop=s.w;d.scrollTop=s.d};
 window.openItem=openItem=function(id){const s=keep(id);const r=_oi.apply(this,arguments);setTimeout(()=>{try{retRow152(id)}catch(err){LOG('r152',err)}},0);
  if(s){put(s);[0,60,180,320].forEach(ms=>setTimeout(()=>put(s),ms))}return r}}
// v174: a cancelled (out of stock) item leaves the closet grid, search and the studio lists, but stays in its order
const oos=id=>!!(IT[id]||{}).oos;
if(typeof extra=='function'){const _ex=extra;extra=function(c){if(c&&c.dataset&&oos(c.dataset.id))return false;return _ex.apply(this,arguments)}}
if(typeof drawerItems=='function'){const _di=drawerItems;drawerItems=function(){const r=_di.apply(this,arguments);try{return r.filter(s=>!oos(s))}catch(_){return r}};window.drawerItems=drawerItems}
setInterval(()=>{try{const d=q('#dlg');if(!d||!d.open)return;const ed=d.querySelector('.ed[data-id]');if(!ed)return;const id=ed.dataset.id;const on=oos(id);
 const ex=d.querySelector('.o3oosw');if(ex&&ex.dataset.id==id&&ex.dataset.on==String(on))return;if(ex)ex.remove();const a=d.querySelector('.o3dl');if(!a)return;
 const w=document.createElement('div');w.className='o3oosw'+(on?' on':'');w.dataset.id=id;w.dataset.on=String(on);
 w.innerHTML=on?`<span>🚫 בוטל – אזל מהמלאי · לא מופיע בארון${(IT[id]||{}).refunded?' · 💰 הכסף חזר':''}</span><button type="button" data-o3oos="${H(id)}">↩ לא בוטל</button>`:`<button type="button" data-o3oos="${H(id)}">🚫 בוטל – אזל מהמלאי</button>`;
 a.after(w)}catch(err){LOG('oos',err)}},600);
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-o3oos]');if(!t)return;e.preventDefault();e.stopPropagation();const id=t.dataset.o3oos,was=oos(id);
 await setMark(id,'oos','1');try{apply()}catch(_){}document.querySelectorAll('.o3oosw,.o3dl').forEach(x=>x.remove());
 toast(was?'↩ החזרתי לארון':'🚫 סימנתי: בוטל – אזל מהמלאי. יצא מהארון, ונשאר בהזמנות למעקב אחרי הכסף')},true);

// keep the home button fresh
let pT;const kick=()=>{clearTimeout(pT);pT=setTimeout(()=>{paintEntry();paintRet();const d=q('#ord123');if(d&&d.open&&!V.res&&!document.activeElement.matches('[data-o3q],[data-o3note]')&&!(V.local&&Date.now()-V.local<1500))refresh()},400)};
if(typeof apply=='function'){const a0=apply;window.apply=apply=function(){const r=a0.apply(this,arguments);kick();return r}}
setTimeout(paintEntry,1200);setTimeout(paintEntry,4000);setTimeout(paintRet,1300);setTimeout(paintRet,4100);
// v243: the home buttons stay live – the order marks (ORD, e.g. 'arrived') load after the first paint and don't go through apply()
setInterval(()=>{if(!document.hidden){paintEntry();paintRet()}},3000);document.addEventListener('visibilitychange',()=>{if(!document.hidden){paintEntry();paintRet()}});
})();
