// v356 "✏️ לעצב את דף הבית" (Sara 5/11: "אני לא יכולה לערוך את המסך הראשי, אין לי את כל העריכות"; 26/10 "איך אני בוחרת איפור להצגה על המסך הראשי"):
// one sheet from a ✏️ by the home avatar – what is on her head, which makeup, the colour behind the doll, and which cards the home shows.
// Saved for the home (HOME.ed in r360 / localStorage h356); "לפי הסטייליסטית" keeps the stylist's choice.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v356e '+w+': '+(e&&e.message||e));
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast=m=>(window.toast||(()=>{}))(m);
const BG=[['sky','תכלת סטודיו','linear-gradient(180deg,#dde6f1,#bfcde0)'],['cream','שמנת','linear-gradient(180deg,#f6efe6,#e9dccb)'],['blush','ורוד עדין','linear-gradient(180deg,#f8e6e6,#ecd2d4)'],
 ['sage','מרווה','linear-gradient(180deg,#e4ebe2,#cfdbcc)'],['lav','לבנדר','linear-gradient(180deg,#ece6f6,#d8cfee)'],['stone','אפור אבן','linear-gradient(180deg,#e8e7e5,#d2d0cc)'],['white','לבן','linear-gradient(180deg,#ffffff,#eeeeee)'],['night','לילה','linear-gradient(180deg,#2a2840,#1b1a29)']];
const CARDS=[['wx','☀ מה ללבוש היום (מזג אוויר)','.wx332b'],['gpt','📥 מחכה ל-GPT','.ib334b'],['rm','⏰ תזכורת החזרה','#rm350'],['wait','מה מחכה לך','#h180 .z5w'],['tiles','הכפתורים מתחת (הזמנות, עגלה…)','.h9tiles,#h180 .z-chips,#h180 .z316h']];
let S={bg:'sky',hide:[]};try{S=Object.assign(S,JSON.parse(localStorage.getItem('h356')||'{}'))}catch(_){}
const keep=()=>{try{localStorage.setItem('h356',JSON.stringify(S))}catch(_){}apply()};
let st=null;
function apply(){try{const b=BG.find(x=>x[0]==S.bg);const el=document.querySelector('#h180 .r3s.clr');if(el){if(b&&S.bg!='sky')el.style.setProperty('background',`radial-gradient(ellipse 34% 3.2% at 50% 93.5%,rgba(30,40,70,.28),transparent 72%),${b[2]}`,'important');else el.style.removeProperty('background')}
 if(!st){st=document.createElement('style');st.id='h356s';document.head.append(st)}
 st.textContent=CARDS.filter(c=>S.hide.includes(c[0])).map(c=>`body[data-z50=home] ${c[2].split(',').join(',body[data-z50=home] ')}{display:none!important}`).join('\n')}catch(e){ERR('apply',e)}}
let dlg=null;
function paint(){if(!dlg)return;const T=R360.today,E=T.ed(),hair=T.styles('hair'),mk=T.styles('mk');
 const r=(g,v,t,on,pk)=>`<button type="button" data-h356="${g}" data-v="${es(v)}" aria-pressed="${on}"${pk?' class="h356pb"':''}>${pk?`<i class="h356p" data-pk="${es(pk)}" aria-hidden="true">${PIC[pk]?`<img alt="" src="${PIC[pk]}">`:''}</i>`:''}${es(t)}</button>`;
 dlg.querySelector('.h356b').innerHTML=`
 <h3>על הראש</h3><div class="h356r">${r('head','auto','✨ לפי הסטייליסטית',E.head=='auto')}${r('head','c','🧕 תמיד כיסוי',E.head=='c')}${r('head','w','💇 תמיד פאה',E.head=='w')}</div>
 ${hair.length?`<p class="h356s">או תסרוקת קבועה לפאה:</p><div class="h356r">${hair.map(h=>r('head',h.k,h.n||'תסרוקת',E.head==h.k,'h:'+h.k)).join('')}</div>`:''}
 <h3>איפור</h3><div class="h356r">${r('mk','auto','✨ לפי הסטייליסטית',E.mk=='auto')}${r('mk','none','בלי איפור',E.mk=='none')}${mk.map(m=>r('mk',m.k,m.n||'איפור',E.mk==m.k,'m:'+m.k)).join('')}</div>
 <h3>הרקע מאחורי הבובה</h3><div class="h356r h356bg">${BG.map(([k,n,g])=>`<button type="button" data-h356="bg" data-v="${k}" aria-pressed="${S.bg==k}" style="--sw:${g}"><i aria-hidden="true"></i>${es(n)}</button>`).join('')}</div>
 <h3>מה מופיע בדף הבית</h3><div class="h356c">${CARDS.map(([k,n])=>`<label><input type="checkbox" data-h356c="${k}"${S.hide.includes(k)?'':' checked'}> ${es(n)}</label>`).join('')}</div>
 <h3>עוד</h3><div class="h356r">${r('go','look','📌 לבחור לוק לדף הבית',false)}${r('go','week','📅 השבוע שלי',false)}${r('go','cats','🖼 תמונות הקטגוריות בארון',false)}${r('go','vid','🎬 סרטון במקום הבובה',false)}</div>`;setTimeout(pics,120)}
// v360: a small picture on every hairstyle and makeup (24 + 10 names alone were hard to choose from) – drawn one by one while the sheet is open, kept for the visit
const PIC={};let picRun=false;
async function pics(){if(picRun)return;picRun=true;try{for(;;){if(!dlg||!dlg.open)break;const el=[...dlg.querySelectorAll('.h356p[data-pk]')].find(x=>!x.firstChild&&!PIC[x.dataset.pk+'#x']);if(!el)break;const pk=el.dataset.pk,k=pk.slice(2);
 let u='';try{u=pk[0]=='h'?await R360.styCard(k,{one:1}):await R360.styFace(k)}catch(_){}if(u&&typeof u!='string')u='';if(u)PIC[pk]=u;else PIC[pk+'#x']=1;
 dlg.querySelectorAll(`.h356p[data-pk="${CSS.escape(pk)}"]`).forEach(i=>{if(u&&!i.firstChild)i.innerHTML=`<img alt="" src="${u}">`});await new Promise(r=>setTimeout(r,30))}}catch(e){ERR('pics',e)}picRun=false}
function open(){try{if(!window.R360||!R360.today||!R360.today.ed)return toast('האווטאר עוד נטען');
 if(!dlg){dlg=document.createElement('dialog');dlg.id='h356';dlg.dir='rtl';dlg.setAttribute('aria-labelledby','h356t');document.body.append(dlg);
  dlg.innerHTML=`<div class="h356h"><h2 id="h356t">✏️ לעצב את דף הבית</h2><button type="button" class="h356x" aria-label="סגירה">✕</button></div><div class="h356b"></div>`;
  dlg.addEventListener('click',e=>{const b=e.target.closest('button');if(e.target===dlg||e.target.closest('.h356x'))return dlg.close();if(!b||!b.dataset.h356)return;const g=b.dataset.h356,v=b.dataset.v;
   if(g=='head'||g=='mk'){R360.today.setEd(g,v);toast('✓ נשמר לדף הבית')}
   else if(g=='bg'){S.bg=v;keep();toast('✓ הרקע נשמר')}
   else if(g=='go'){dlg.close();try{if(v=='look')openHub('looks');else if(v=='week')WEEK352.open();else if(v=='vid')VID351.sheet();else if(v=='cats'){window.zCloset&&zCloset();setTimeout(()=>{const c=document.querySelector('.c180e');if(c)c.click()},700)}}catch(_){}return}
   paint()});
  dlg.addEventListener('change',e=>{const k=e.target.dataset.h356c;if(!k)return;S.hide=S.hide.filter(x=>x!=k);if(!e.target.checked)S.hide.push(k);keep()})}
 paint();if(!dlg.open)dlg.showModal()}catch(e){ERR('open',e)}}
// the ✏️ by the home avatar's controls
setInterval(()=>{try{apply();const c=document.querySelector('#h180 .z-avc');const ph=matchMedia('(max-width:600px)').matches,at=ph?c&&c.parentElement:c;   /* v360: on a phone the ✏️ sits in the stage's corner (the row ran out of the screen) */
 if(at&&!document.querySelector('#h180 .h356e')){const b=document.createElement('button');b.type='button';b.className='h356e';b.setAttribute('aria-label','לעצב את דף הבית');b.textContent='✏️';b.onclick=open;at.append(b)}}catch(_){}},1500);
window.HOME356={open};
})();
