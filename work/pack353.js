// v353 "🧳 לארוז" (night work, Sara: "תשדרג וזהו, תעבוד כמה שיותר"): going away for a few days or for Shabbat –
// she picks how many days and whether there is a Shabbat; the stylist builds a look for each day (Shabbat looks for Shabbat, nothing repeated),
// and everything is merged into ONE packing list by kind, with ✓ boxes that stay ticked on this phone. Pajamas / tights / hair things are reminded at the end.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v353p '+w+': '+(e&&e.message||e));
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast=m=>(window.toast||(()=>{}))(m);
const cat=id=>{try{return curCat(id)}catch(_){return (D[id]||{}).cat||''}};
let CN=null;const catName=c=>{if(!CN){CN={};document.querySelectorAll('section[id] > h2').forEach(h=>{const t=h.firstChild&&h.firstChild.textContent.trim();if(t)CN[h.parentElement.id]=t})}return CN[c]||c};
const ORDER=['dresses','sets','skirts','tops','base','sweaters','outer','scarves','belts','shoes','jewelry','bags','hosiery','night','hair','makeup'];
let P=null;try{P=JSON.parse(localStorage.getItem('pack353')||'null')}catch(_){}
const keep=()=>{try{localStorage.setItem('pack353',JSON.stringify(P))}catch(_){}};
const nm=id=>{const x=D[id]||{},i=(typeof IT=='object'&&IT[id])||{};return String(i.nm||x.short||x.full||id).replace(/^[A-Za-z0-9&'.\-\s]+(?=[֐-׿])/,'').slice(0,46)};
async function build(n,shab){const day=await R360.looks(null,Math.max(1,n-(shab?2:0)),{occ:'day'});
 const sh=shab?await R360.looks(null,2,{occ:'shab',avoid:day.looks.flatMap(l=>l.base||[])}):{looks:[]};
 const looks=[...day.looks.map(l=>({t:'יום חול',ids:l.ids,s:l.s})),...sh.looks.map((l,i)=>({t:i?'שבת בבוקר':'ליל שבת',ids:l.ids,s:l.s}))];
 const all=[...new Set(looks.flatMap(l=>l.ids))].filter(id=>D[id]);
 P={n,shab,looks,ids:all,got:{},t:Date.now()};keep()}
let dlg=null;
function paint(){if(!dlg)return;const b=dlg.querySelector('.p353b');if(!P){b.innerHTML='';return}
 const by={};P.ids.forEach(id=>{const c=cat(id);(by[c]=by[c]||[]).push(id)});
 const cs=Object.keys(by).sort((a,b)=>(ORDER.indexOf(a)+99)%99-(ORDER.indexOf(b)+99)%99);
 const done=P.ids.filter(id=>P.got[id]).length;
 b.innerHTML=`<p class="p353s">${P.n} ימים${P.shab?' כולל שבת':''} · ${P.looks.length} לוקים · <b>${done} מתוך ${P.ids.length} ארוזים</b></p>
 <div class="p353l">${P.looks.map((l,i)=>`<button type="button" data-p353look="${i}"><small>${es(l.t)}${l.t=='יום חול'&&P.looks.filter(x=>x.t=='יום חול').length>1?' '+(i+1):''}</small><span>${l.ids.slice(0,4).map(id=>`<img alt="" data-th="${es(id)}" src="${es((typeof img=='function'&&img(id))||'')}">`).join('')}</span></button>`).join('')}</div>
 ${cs.map(c=>`<h3>${es(catName(c))} <small>${by[c].length}</small></h3><ul class="p353u">${by[c].map(id=>`<li><label><input type="checkbox" data-p353="${es(id)}"${P.got[id]?' checked':''}><img alt="" data-th="${es(id)}" src="${es((typeof img=='function'&&img(id))||'')}"><span>${es(nm(id))}</span></label></li>`).join('')}</ul>`).join('')}
 <h3>לא לשכוח</h3><ul class="p353u p353x">${['פיג׳מה','גרביונים / גרביים','תחתונים וחזייה','אביזרי שיער וסיכות','איפור ומברשות','מטען לטלפון'].concat(P.shab?['נרות שבת','בגדי שבת לילדים']:[]).map((t,i)=>`<li><label><input type="checkbox" data-p353x="${i}"${P.got['x'+i]?' checked':''}><span>${es(t)}</span></label></li>`).join('')}</ul>`}
function open(){try{if(!window.R360||!R360.looks)return toast('האווטאר עוד נטען, נסי שוב בעוד רגע');
 if(!dlg){dlg=document.createElement('dialog');dlg.id='p353';dlg.dir='rtl';dlg.setAttribute('aria-labelledby','p353t');document.body.append(dlg);
  dlg.innerHTML=`<div class="p353h"><h2 id="p353t">🧳 לארוז</h2><button type="button" class="p353x" aria-label="סגירה">✕</button></div>
   <div class="p353f"><label>כמה ימים?<select class="p353n">${[1,2,3,4,5,6,7].map(n=>`<option value="${n}"${n==3?' selected':''}>${n}</option>`).join('')}</select></label>
   <label class="p353c"><input type="checkbox" class="p353sh" checked> כולל שבת</label><button type="button" class="p353go">✨ להרכיב לוקים ורשימה</button></div><div class="p353b"></div>`;
  dlg.addEventListener('click',async e=>{const t=e.target;if(t===dlg||t.closest('.p353x'))return dlg.close();
   if(t.closest('.p353go')){const n=+dlg.querySelector('.p353n').value,sh=dlg.querySelector('.p353sh').checked;dlg.querySelector('.p353b').innerHTML='<p class="p353s">מרכיבה…</p>';try{await build(n,sh);paint()}catch(err){ERR('build',err);toast('לא הצלחתי להרכיב – לנסות שוב')}return}
   const lk=t.closest('[data-p353look]');if(lk){const L=P.looks[+lk.dataset.p353look];if(L&&L.s){dlg.close();R360.wearState(L.s)}}});
  dlg.addEventListener('change',e=>{const c=e.target;if(!P)return;if(c.dataset.p353)P.got[c.dataset.p353]=c.checked;else if(c.dataset.p353x!=null)P.got['x'+c.dataset.p353x]=c.checked;else return;keep();
   const s=dlg.querySelector('.p353s b');if(s)s.textContent=`${P.ids.filter(id=>P.got[id]).length} מתוך ${P.ids.length} ארוזים`})}
 if(P){dlg.querySelector('.p353n').value=P.n;dlg.querySelector('.p353sh').checked=!!P.shab}paint();if(!dlg.open)dlg.showModal()}catch(e){ERR('open',e)}}
window.PACK353={open};
})();
