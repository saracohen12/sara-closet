// v352 "📅 השבוע שלי מהסטייליסטית" (Sara: "תמשיך לשדרג"): a whole week planned in one go – a look for every day from today,
// weekday looks for Sunday–Friday and a Shabbat look for Friday night and Saturday, no outfit repeated in the week; same stylist as the look of the day
// (colours that go together, a matching cover or – some days – the wig, makeup, jewellery). Each day: wear it in the studio, put it on the home, or swap just that day.
// Kept on this phone and in the db (r360/week352) until the week is over.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v352w '+w+': '+(e&&e.message||e));
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast=m=>(window.toast||(()=>{}))(m);
const DN=['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];
const COL={'שחור':'#1d1b20','לבן':'#f6f4ef','אפור':'#9a98a0','בז׳':'#d9c4a6','חום':'#7a5236','כחול':'#2f4f8f','ירוק':'#4f7a4a','אדום':'#b3262e','ורוד':'#e3a1b5','סגול':'#7b4f9e','צהוב':'#e3c04a','כתום':'#e08a3c','צבעוני':'conic-gradient(#e3a1b5,#e3c04a,#4f7a4a,#2f4f8f,#e3a1b5)'};
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const fam=id=>{const c=document.querySelector('.card[data-id="'+CSS.escape(id)+'"]');return c&&c.dataset.c||''};
const days=()=>{const a=[],d=new Date();for(let i=0;i<7;i++){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate()+i);a.push({k:iso(x),w:x.getDay(),dm:x.getDate()+'/'+(x.getMonth()+1)})}return a};
let W=null;try{W=JSON.parse(localStorage.getItem('week352')||'null')}catch(_){}
const fresh=()=>W&&W.from&&W.days&&W.days[0]&&days().every(d=>W.days.some(x=>x.k==d.k));
async function save(){try{localStorage.setItem('week352',JSON.stringify(W))}catch(_){}try{const db=await window.claude?.use?.('db');if(db)await db.collection('r360').doc('week352').set(W)}catch(_){}}
async function plan(){const D7=days(),used=new Set(),out=[];
 const day=await R360.looks(null,7,{occ:'day'});const sh=await R360.looks(null,3,{occ:'shab',avoid:day.looks.flatMap(l=>l.base||[])});
 let di=0,si=0;D7.forEach(d=>{const shab=d.w==6;const L=shab?sh.looks[si++]||day.looks[di++]:day.looks[di++]||sh.looks[si++];if(L)out.push({k:d.k,ids:L.ids,s:L.s,base:L.base||[]});else out.push({k:d.k,ids:[],s:null})});
 W={from:D7[0].k,days:out};await save()}
async function swap(k){const i=W.days.findIndex(x=>x.k==k);if(i<0)return;const d=new Date(k+'T12:00');
 const avoid=W.days.flatMap(x=>x.base||[]);const r=await R360.looks(null,1,{occ:d.getDay()==6?'shab':'day',avoid});const L=r.looks[0];
 if(!L)return toast('לא מצאתי עוד לוק שלא חוזר השבוע');W.days[i]={k,ids:L.ids,s:L.s,base:L.base||[]};await save();paint();toast('↻ יום '+DN[d.getDay()]+' התחלף')}
let dlg=null;
function paint(){if(!dlg)return;const D7=days(),T=new Date();
 dlg.querySelector('.w352b').innerHTML=W&&W.days?W.days.filter(x=>D7.some(d=>d.k==x.k)).map(x=>{const d=new Date(x.k+'T12:00'),wd=d.getDay(),fs=[...new Set(x.ids.map(fam).filter(Boolean))].slice(0,4);
  const head=x.s&&(x.s.head=='w'||/^yh/.test(x.s.head||''))?'💇 פאה':'🧕 כיסוי תואם',today=x.k==iso(T);
  return `<section class="w352d${today?' today':''}${wd==6?' shab':''}"><header><b>${today?'היום · ':''}יום ${DN[wd]}</b><small>${d.getDate()}/${d.getMonth()+1}${wd==6?' · ✨ שבת':''}</small></header>
   ${x.ids.length?`<div class="w352i">${x.ids.slice(0,6).map(id=>`<button type="button" data-open="${es(id)}" aria-label="${es((D[id]||{}).short||'')}"><img alt="" data-th="${es(id)}" src="${es((typeof img=='function'&&img(id))||'')}"></button>`).join('')}</div>
   <p class="w352c">${fs.map(f=>`<i style="background:${COL[f]||'#ccc'}" aria-hidden="true"></i>`).join('')}<span>${es(fs.join(' · '))} · ${head}</span></p>
   <div class="w352a"><button type="button" data-w352wear="${x.k}">👗 ללבוש בסטודיו</button><button type="button" data-w352pin="${x.k}">📌 לדף הבית</button><button type="button" data-w352swap="${x.k}" aria-label="להחליף את הלוק של יום ${DN[wd]}">↻</button></div>`:'<p class="w352c">אין מספיק בגדים על האווטאר ליום הזה</p>'}</section>`}).join(''):'<p class="w352w">מכינה את השבוע…</p>'}
async function open(re){try{if(!window.R360||!R360.looks)return toast('האווטאר עוד נטען, נסי שוב בעוד רגע');
 if(!dlg){dlg=document.createElement('dialog');dlg.id='w352';dlg.dir='rtl';dlg.setAttribute('aria-labelledby','w352t');document.body.append(dlg);
  dlg.innerHTML=`<div class="w352h"><h2 id="w352t">📅 השבוע שלי</h2><button type="button" class="w352n">↻ שבוע אחר</button><button type="button" class="w352x" aria-label="סגירה">✕</button></div>
   <p class="w352s">לוק לכל יום, לשבת לוק של שבת, בלי לחזור על בגד בסיס. צבעים שהולכים יחד, כיסוי תואם או פאה, איפור ותכשיט.</p><div class="w352b"></div>`;
  dlg.addEventListener('click',async e=>{const b=e.target.closest('button');if(e.target===dlg||e.target.closest('.w352x'))return dlg.close();if(!b)return;
   const g=k=>W.days.find(x=>x.k==k);
   if(b.classList.contains('w352n')){dlg.querySelector('.w352b').innerHTML='<p class="w352w">מרכיבה שבוע חדש…</p>';await plan();paint();return}
   if(b.dataset.w352swap){b.disabled=true;await swap(b.dataset.w352swap);return}
   if(b.dataset.w352wear){const x=g(b.dataset.w352wear);if(x&&x.s){dlg.close();R360.wearState(x.s)}return}
   if(b.dataset.w352pin){const x=g(b.dataset.w352pin);if(x&&x.s){dlg.close();const d=new Date(x.k+'T12:00');R360.pinState(x.s,'הלוק של יום '+DN[d.getDay()])}return}
   if(b.dataset.open){dlg.close();try{openItem(b.dataset.open)}catch(_){}}})}
 if(!dlg.open)dlg.showModal();paint();if(re||!fresh()){await plan();paint()}}catch(e){ERR('open',e);toast('לא הצלחתי להכין את השבוע')}}
window.WEEK352={open};
// entry points: a link in the home look card and a line in the "עוד" sheet
setInterval(()=>{try{const h=document.querySelector('#h180 .z-lkh');if(h&&!h.querySelector('.w352l')){const a=document.createElement('button');a.type='button';a.className='w352l';a.textContent='📅 השבוע שלי';a.onclick=e=>{e.stopPropagation();open()};h.append(a)}}catch(_){}},1500);
})();
