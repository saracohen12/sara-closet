// v183: חיפוש אחד – one search for the whole site (Sara's upgrade list, 25/10): clothes in the closet, the general list,
// cancelled items, looks, orders and every screen/tool, from 🔍 in the bottom bar or the header (and "/" on a computer).
(function(){
const FIN={'ם':'מ','ן':'נ','ץ':'צ','ף':'פ','ך':'כ'};
const norm=s=>String(s==null?'':s).toLowerCase().replace(/[֑-ׇ]/g,'').replace(/[םןץףך]/g,c=>FIN[c]).replace(/[׳'"״`]/g,'').replace(/\s+/g,' ').trim();
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=m=>(window.toast||(()=>{}))(m);
const nm=id=>{const x=D[id]||{};return String(x.short||x.full||'').replace(/^[A-Za-z0-9&'.\-\s]+(?=[֐-׿])/,'').trim()||id};
const ph=id=>{try{return img(id)||TPH}catch(_){return ''}};
const cat=id=>{try{return curCat(id)}catch(_){return (D[id]||{}).cat||''}};
let CN=null;const catName=c=>{if(!CN){CN={};document.querySelectorAll('section[id] > h2').forEach(h=>{const t=h.firstChild&&h.firstChild.textContent.trim();if(t)CN[h.parentElement.id]=t})}return CN[c]||''};
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
function status(id){const i=it(id),x=D[id]||{};
 if(i.gen)return ['gen','🗃 ברשימה הכללית'];if(i.oos)return ['oos','🚫 בוטל'];if(i.s=='ret')return ['ret','הוחזר'];if(i.s=='give')return ['give','נמסר'];
 if(x.transit)return ['tr','🚚 בדרך'];return ['','']}
// one text per item, built once (and again when the closet changes size)
let HAY=null,HN=0;
function hay(){const ids=Object.keys(D);if(HAY&&HN==ids.length)return HAY;HN=ids.length;HAY={};
 ids.forEach(id=>{const x=D[id]||{},i=it(id),c=cat(id);
  HAY[id]=' '+norm([x.short,x.full,x.color,x.col&&x.col.fc,catName(c),(x.tags||[]).join(' '),(x.season||[]).join(' '),x.size,x.srcl,x.order,id,i.note,i.notes].filter(Boolean).join(' '))+' '});
 return HAY}
const words=q=>norm(q).split(' ').filter(Boolean);
const hit=(h,ws)=>ws.every(w=>h.includes(w));
function score(id,ws,q){const n=' '+norm(nm(id))+' ';let s=0;if(n.includes(' '+ws[0]))s+=4;if(n.includes(q))s+=3;if(hay()[id].includes(' '+norm(catName(cat(id)))+' ')&&norm(catName(cat(id))).includes(ws[0]))s+=2;if(!status(id)[0])s+=1;return s}
// screens and tools: the admin panel's lists + a few of the new ones
function tools(){const L=[];
 const add=(i,n,f,k)=>L.push({i,n:typeof n=='function'?n():n,f,k:norm((typeof n=='function'?n():n)+' '+(k||''))});
 add('✦','הסטודיו – האווטאר 360°',()=>R360&&R360.open(),'בניית לוק אווטאר להלביש');
 add('🎨','לבחור עיצוב לאתר',()=>{const b=document.getElementById('d71t');if(b)b.click()},'צבעים עיצוב');
 add('Aא','נגישות: גודל טקסט, ניגודיות',()=>window.A11Y&&A11Y.open(),'גדול קטן אותיות ניגודיות תנועה');
 add('📋','פרומפטים ל-GPT (אווטאר 360)',()=>R360&&R360.prompts&&R360.prompts(),'פרומט gpt גיליון פאה');
 try{(window.WAIT172||[]).forEach(w=>add(w[0],w[1],w[4]))}catch(_){}
 try{(window.TOOLS172||[]).forEach(([g,T])=>T.forEach(t=>{if(typeof t[2]=='function')add(t[0],t[1],t[2],g)}))}catch(_){}
 const seen=new Set();return L.filter(t=>!seen.has(t.n)&&seen.add(t.n))}
function looks(ws,ids){let LK={};try{LK=LOOKS||{}}catch(_){}const set=new Set(ids);
 return Object.entries(LK).filter(([id,l])=>l&&l.items&&!l.auto).filter(([id,l])=>hit(' '+norm(l.name||'')+' '+norm(l.notes||'')+' ',ws)||Object.values(l.items).some(x=>set.has(x))).slice(0,12)}

// ---------- the dialog ----------
let dlg=null,Q='',MORE={},TM=null;
const RK='gs183r';const recent=()=>{try{return JSON.parse(localStorage.getItem(RK)||'[]')}catch(_){return []}};
const remember=q=>{q=q.trim();if(q.length<2)return;const r=[q,...recent().filter(x=>x!=q)].slice(0,6);try{localStorage.setItem(RK,JSON.stringify(r))}catch(_){}};
const SUG=['שמלה לשבת','כחול','חצאית ג׳ינס','בדרך','החזרות','הזמנות','לוקים','סטודיו'];
function build(){dlg=document.createElement('dialog');dlg.id='gs183';dlg.dir='rtl';dlg.setAttribute('aria-label','חיפוש בכל האתר');
 dlg.innerHTML=`<div class="gsw"><div class="gsh"><div class="gsq"><span aria-hidden="true">🔍</span><input type="search" enterkeyhint="search" placeholder="מה מחפשים? בגד, צבע, לוק, הזמנה…" aria-label="חיפוש בכל האתר" autocomplete="off"><button type="button" class="gsc" aria-label="ניקוי" hidden>✕</button></div><button type="button" class="gsx">סגירה</button></div>
 <div class="gsb" aria-live="polite"></div></div>`;
 document.body.appendChild(dlg);const inp=dlg.querySelector('input');
 inp.addEventListener('input',()=>{Q=inp.value;MORE={};dlg.querySelector('.gsc').hidden=!Q;clearTimeout(TM);TM=setTimeout(paint,140)});
 inp.addEventListener('keydown',e=>{if(e.key=='Enter'){remember(Q);const f=dlg.querySelector('.gsb [data-gi],.gsb [data-gt],.gsb [data-gl]');if(f)f.focus()}});
 dlg.querySelector('.gsc').onclick=()=>{inp.value='';Q='';dlg.querySelector('.gsc').hidden=true;paint();inp.focus()};
 dlg.querySelector('.gsx').onclick=()=>dlg.close();
 dlg.addEventListener('click',e=>{if(e.target===dlg)return dlg.close();const b=e.target.closest('button');if(!b||!dlg.contains(b))return;const d=b.dataset;
  if(d.gs!=null){inp.value=d.gs;Q=d.gs;dlg.querySelector('.gsc').hidden=false;paint();return}
  if(d.gm){MORE[d.gm]=1;paint();return}
  if(d.gi){remember(Q);dlg.close();try{openItem(d.gi)}catch(_){}return}
  if(d.gl){remember(Q);dlg.close();try{openStudio(LOOKS[d.gl])}catch(_){}return}
  if(d.gt!=null){remember(Q);const t=TL[+d.gt];dlg.close();try{t&&t.f()}catch(_){toast_('לא הצלחתי לפתוח')}return}
  if(d.gf!=null){remember(Q);dlg.close();filterCloset(Q);return}
  if(d.grx!=null){try{localStorage.removeItem(RK)}catch(_){}paint()}})}
let TL=[];
// v186: the smart closet's "where is it / what is happening with it" (search "כביסה", "מגירה", "ארון לבן"…)
const where185=(id,n)=>{try{const w=window.SC185?SC185.where(id):'';return n?' '+norm(w)+' ':w}catch(_){return ''}};
function card(id){const [k,s]=status(id);const x=D[id]||{};
 return `<button type="button" class="gsi" data-gi="${id}"><span class="gsp"><img alt="" loading="lazy" data-th="${id}" src="${ph(id)}"></span><span class="gsn">${esc(nm(id))}</span><small>${esc([catName(cat(id)),x.color].filter(Boolean).join(' · '))}</small>${where185(id)?`<small class="gs185">${esc(where185(id))}</small>`:''}${s?`<em class="gss ${k}">${s}</em>`:''}</button>`}
function group(key,title,rows,n,html){if(!rows.length)return '';const lim=MORE[key]?999:n;
 return `<div class="gsg" role="group" aria-label="${esc(title)}"><h3>${title} <small>${rows.length}</small></h3><div class="gsl gsl-${key}">${rows.slice(0,lim).map(html).join('')}</div>${rows.length>lim?`<button type="button" class="gsm" data-gm="${key}">עוד ${rows.length-lim}</button>`:''}</div>`}
function paint(){if(!dlg)return;const box=dlg.querySelector('.gsb');const q=norm(Q);
 if(!q){const r=recent();
  box.innerHTML=(r.length?`<div class="gsg"><h3>חיפושים אחרונים <button type="button" class="gsrx" data-grx>ניקוי</button></h3><div class="gschips">${r.map(x=>`<button type="button" data-gs="${esc(x)}">🕘 ${esc(x)}</button>`).join('')}</div></div>`:'')+
   `<div class="gsg"><h3>אפשר לנסות</h3><div class="gschips">${SUG.map(x=>`<button type="button" data-gs="${esc(x)}">${esc(x)}</button>`).join('')}</div></div>
   <p class="gsnote">מחפש בכל האתר: בגדים בארון, ברשימה הכללית ובהזמנות, לוקים, וכל המסכים והכלים.</p>`;return}
 const ws=words(Q),H=hay();
 const ids=Object.keys(D).filter(id=>hit(H[id]+where185(id,1),ws)).sort((a,b)=>score(b,ws,q)-score(a,ws,q));
 const live=ids.filter(id=>{const k=status(id)[0];return !k||k=='tr'}),other=ids.filter(id=>{const k=status(id)[0];return k&&k!='tr'});
 const L=looks(ws,live.slice(0,40));
 TL=tools();const T=TL.map((t,i)=>[t,i]).filter(([t])=>hit(' '+t.k+' ',ws));
 const ords=[...new Set(ids.map(id=>(D[id]||{}).order).filter(o=>o&&ws.some(w=>norm(o).includes(w)&&w.length>=4)))];
 let h='';
 if(T.length)h+=group('t','מסכים וכלים',T,4,([t,i])=>`<button type="button" class="gst" data-gt="${i}"><i>${esc(t.i)}</i><span>${esc(t.n)}</span></button>`);
 h+=group('c','בארון',live,8,card);
 if(L.length)h+=group('l','לוקים',L,4,([id,l])=>{const its=Object.values(l.items).filter(x=>D[x]);return `<button type="button" class="gsk" data-gl="${id}"><span class="gskm">${its.slice(0,3).map(x=>`<img alt="" data-th="${x}" src="${ph(x)}">`).join('')}</span><span><b>${esc(l.name||'לוק')}</b><small>${its.length} פריטים</small></span></button>`});
 if(ords.length)h+=group('o','הזמנות',ords,3,o=>{const n=Object.keys(D).filter(id=>D[id].order==o).length;return `<button type="button" class="gst" data-gt="${TL.findIndex(t=>/ההזמנות שלי/.test(t.n))}"><i>📦</i><span>הזמנה ${esc(o)} <small>· ${n} פריטים</small></span></button>`});
 h+=group('x','ברשימה הכללית, הוחזרו או בוטלו',other,4,card);
 if(live.length)h+=`<button type="button" class="gsf" data-gf>לראות את כל ${live.length} בארון עצמו ←</button>`;
 box.innerHTML=h||`<p class="gsnote">לא מצאתי "${esc(Q)}". אפשר לנסות מילה אחרת, צבע או סוג בגד.</p>`;
 const cats=new Set([...live.slice(0,MORE.c?999:8),...other.slice(0,MORE.x?999:4)].map(cat));L.forEach(([id,l])=>Object.values(l.items).forEach(x=>cats.add(cat(x))));
 cats.forEach(c=>{try{thLoad(c).then(()=>thApply(TH)).catch(()=>{})}catch(_){}})}
// the closet's own filter (what 🔍 did before), for "see them all"
function filterCloset(q){const inp=document.getElementById('q');if(!inp)return;inp.value=q;inp.dispatchEvent(new Event('input',{bubbles:true}));
 try{const s=document.querySelector('.ctrl');if(s)window.scrollTo({top:s.getBoundingClientRect().top+scrollY-8,behavior:'smooth'})}catch(_){}}
function open(q){if(!dlg)build();const inp=dlg.querySelector('input');if(q!=null){inp.value=q;Q=q}dlg.querySelector('.gsc').hidden=!Q;MORE={};
 if(!dlg.open)dlg.showModal();paint();setTimeout(()=>{inp.focus();inp.select()},60)}
// 🔍 in the bottom bar (phone) and a button in the header (computer)
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.bnav [data-bn="search"],#gs183b');if(!b)return;e.preventDefault();e.stopImmediatePropagation();open()},true);
document.addEventListener('keydown',e=>{if(e.key=='/'&&!e.ctrlKey&&!e.metaKey&&!/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||'')&&!document.querySelector('dialog[open]')){e.preventDefault();open()}});
function btn(){const act=document.querySelector('#top .h9act');if(!act)return setTimeout(btn,500);if(act.querySelector('#gs183b'))return;
 const b=document.createElement('button');b.type='button';b.id='gs183b';b.setAttribute('aria-label','חיפוש בכל האתר');b.title='חיפוש (/)';b.innerHTML='<span aria-hidden="true">🔍</span>';
 const a=act.querySelector('#a11yb')||act.querySelector('#d71t');if(a)a.after(b);else act.prepend(b)}
btn();
window.SEARCH183={open};
})();
