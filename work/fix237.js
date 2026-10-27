/* ===== v237: "✨ לתקן ב-GPT" (Sara 22/10 row 125, asked again 27/10 09:43 "כן"): a garment on the 360 doll with one flaw – she marks the flaw
   on its 8-angle GPT picture, saves the marked picture, copies a prompt that fixes ONLY the marked places, and uploads what comes back (cut again as usual). */
(function(){
const ERR=(w,e)=>{try{(window.ERRS=window.ERRS||[]).push('v237 '+w+': '+(e&&e.message||e))}catch(_){}};
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=(m,u)=>(window.toast||(()=>{}))(m,u);
const it=id=>(typeof IT=='object'&&IT[id])||{};
const parts=id=>(it(id).a8||[]).filter(p=>p&&Array.isArray(p.L)&&p.L.length==8&&p.src);
const nm=id=>{try{return R360.nm(id)}catch(_){return (D[id]||{}).short||''}};
let DL=null,ID='',PI=0,IMG=null,ST=[],CUR=null,NOTE='';
function el(){if(DL)return DL;DL=document.createElement('dialog');DL.id='fix237';DL.dir='rtl';DL.setAttribute('aria-labelledby','fix237t');document.body.appendChild(DL);
 DL.addEventListener('cancel',e=>{e.preventDefault();DL.close()});
 DL.addEventListener('click',e=>{if(e.target===DL)return DL.close();const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(b.classList.contains('mkx'))return DL.close();
  if(d.f237part!=null){PI=+d.f237part;ST=[];load();return}
  if(d.f237undo!=null){ST.pop();draw();return}
  if(d.f237clear!=null){ST=[];draw();return}
  if(d.f237save!=null){save().catch(er=>ERR('save',er));return}
  if(d.f237copy!=null){copy(b);return}});
 DL.addEventListener('input',e=>{if(e.target.classList.contains('f237note'))NOTE=e.target.value});
 return DL}
// her strokes, kept in the picture's own pixels
function cv(){return DL&&DL.querySelector('canvas.f237c')}
function pt(e){const c=cv(),r=c.getBoundingClientRect();return [(e.clientX-r.left)/r.width*c.width,(e.clientY-r.top)/r.height*c.height]}
const LW=()=>IMG?Math.max(6,Math.round(IMG.naturalWidth*.008)):8;
function line(g,s,k){if(!s.length)return;g.strokeStyle='#ff1a1a';g.lineWidth=LW()*k;g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(s[0][0]*k,s[0][1]*k);
 if(s.length==1)g.lineTo(s[0][0]*k+.1,s[0][1]*k);s.slice(1).forEach(p=>g.lineTo(p[0]*k,p[1]*k));g.stroke()}
function draw(){const c=cv();if(!c||!IMG)return;const g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);g.drawImage(IMG,0,0,c.width,c.height);const k=c.width/IMG.naturalWidth;
 ST.forEach(s=>line(g,s,k));const n=DL.querySelector('.f237n');if(n)n.textContent=ST.length?`סימנת ${ST.length} ${ST.length==1?'מקום':'מקומות'}`:'עוד לא סימנת';
 DL.querySelectorAll('[data-f237undo],[data-f237clear],[data-f237save],[data-f237copy]').forEach(b=>b.disabled=!ST.length)}
function wire(){const c=cv();if(!c||c._w)return;c._w=1;const k=()=>IMG?c.width/IMG.naturalWidth:1;
 c.addEventListener('pointerdown',e=>{if(!IMG)return;e.preventDefault();c.setPointerCapture(e.pointerId);const [x,y]=pt(e);CUR=[[x/k(),y/k()]];ST.push(CUR);draw()});
 c.addEventListener('pointermove',e=>{if(!CUR)return;e.preventDefault();const [x,y]=pt(e);CUR.push([x/k(),y/k()]);draw()});
 const up=()=>{CUR=null};c.addEventListener('pointerup',up);c.addEventListener('pointercancel',up)}
function load(){const P=parts(ID),p=P[PI]||P[0];if(!p)return;IMG=null;paint();const m=new Image();
 m.onload=()=>{if(!DL.open)return;IMG=m;const c=cv();if(!c)return;const w=Math.min(1600,m.naturalWidth);c.width=w;c.height=Math.round(w*m.naturalHeight/m.naturalWidth);c.classList.add('ok');draw()};
 m.onerror=()=>{const n=DL.querySelector('.f237n');if(n)n.textContent='התמונה לא נטענה. לסגור ולפתוח שוב'};m.src='/_blob/'+p.src}
function prompt(){const n=NOTE.trim();return `מצורפת תמונה אחת: גיליון של הדמות שלי ב-8 זוויות מסביב (שתי שורות של 4 משבצות), לובשת ${nm(ID)}${(D[ID]||{}).color?`, בצבע ${D[ID].color}`:''}.
סימנתי בקו אדום את המקומות שלא יצאו טוב.${n?`
מה לא טוב: ${n}`:''}

תקני רק את המקומות שסימנתי באדום, כך שהבגד ייראה שם נכון ויתאים לאיך שהוא נראה בשאר הזוויות.
כל השאר נשאר בדיוק אותו דבר: הדמות, הפנים, הגוף, התנוחה, הרקע, גודל התמונה, המקום של כל זווית, והבגד בכל מקום שלא סימנתי.
מחקי לגמרי את הקווים האדומים. בלי טקסט, בלי מסגרות. תחזירי תמונה אחת באותו גודל בדיוק.`}
async function save(){if(!IMG||!ST.length)return;const c=document.createElement('canvas');c.width=IMG.naturalWidth;c.height=IMG.naturalHeight;const g=c.getContext('2d');g.drawImage(IMG,0,0);ST.forEach(s=>line(g,s,1));
 const b=await new Promise(r=>c.toBlob(r,'image/jpeg',.92));if(!b)return toast_('לא הצלחתי לשמור');
 try{await R360.saveFile(`fix-${String(ID).replace(/[^A-Za-z0-9_-]/g,'')}.jpg`,b)}catch(e){ERR('file',e);toast_('לא הצלחתי לשמור');return}
 const s=DL.querySelector('[data-f237save]');if(s){const o=s.textContent;s.textContent='✓ נשמרה';setTimeout(()=>{if(s.isConnected)s.textContent=o},2400)}}
async function copy(b){const t=prompt();let ok=false;try{await navigator.clipboard.writeText(t);ok=true}catch(_){}
 if(!ok){try{const a=document.createElement('textarea');a.value=t;a.setAttribute('readonly','');a.style.cssText='position:fixed;opacity:0';DL.appendChild(a);a.select();ok=document.execCommand('copy');a.remove()}catch(_){}}
 const o=b.textContent;b.textContent=ok?'✓ הועתק – עכשיו ל-GPT':'לא הצלחתי להעתיק';setTimeout(()=>{if(b.isConnected)b.textContent=o},2600)}
// the upload: the usual replace button of the item (a tie on a cover keeps its kind and its place in the cover's ties)
function upBtn(){const p=parts(ID)[PI]||{};let x=parts(ID).length>1?` data-at="${PI}"`:'';   // v267: on a set the fixed picture replaces THIS part onlyif(p.k=='tiex'){x=' data-w="1"';try{const t=(window.tie228?tie228.txs(ID):[]).find(y=>y.L&&p.L&&y.L[0]==p.L[0]),m=t&&/^w(\d+)$/.exec(t.p||'');if(m)x+=` data-tx228="${m[1]}"`}catch(_){}}
 return `<button type="button" class="mkp" data-up188="${es(ID)}"${x}>📤 להעלות את התמונה המתוקנת</button>`}
function paint(){const P=parts(ID);
 DL.innerHTML=`<div class="mk"><div class="mkh"><h3 id="fix237t">✨ לתקן ב-GPT · ${es(nm(ID).split(' ').slice(0,5).join(' '))}</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <p class="f237p">מסמנים רק את מה שלא טוב, ו-GPT מתקן רק את זה. מה שכבר טוב נשאר.</p>
  ${P.length>1?`<div class="f237parts" role="group" aria-label="איזה חלק">${P.map((_,i)=>`<button type="button" data-f237part="${i}" aria-pressed="${i==PI}">חלק ${i+1}</button>`).join('')}</div>`:''}
  <ol class="f237s"><li><b>מסמנים</b> באצבע או בעכבר, על התמונה, את מה שלא יצא טוב.</li></ol>
  <div class="f237w"><canvas class="f237c" aria-label="התמונה של הבגד ב-8 זוויות. מסמנים עליה"></canvas></div>
  <div class="f237bar"><span class="f237n" aria-live="polite">טוענת את התמונה…</span><span class="mkb"><button type="button" data-f237undo disabled>↩ לבטל סימון</button><button type="button" data-f237clear disabled>🧽 לנקות</button></span></div>
  <ol class="f237s" start="2"><li><label class="f237l"><b>מה לא טוב?</b> (לא חובה)<textarea class="f237note" rows="2" maxlength="300" placeholder="למשל: השרוול השמאלי חתוך, הכפתורים חסרים מהגב">${es(NOTE)}</textarea></label></li>
   <li><b>⬇ שומרים</b> את התמונה המסומנת ו<b>📋 מעתיקים</b> את הפרומפט. ב-GPT, בשיחה חדשה: מצרפים את התמונה ומדביקים.<span class="mkb"><button type="button" data-f237save disabled>⬇ התמונה המסומנת</button><button type="button" class="mkp" data-f237copy disabled>📋 להעתיק את הפרומפט</button></span></li>
   <li><b>📤 מעלים</b> את מה ש-GPT החזיר. האתר גוזר אותו שוב ושם על הבובה במקום הקודם.<span class="mkb">${upBtn()}</span></li></ol></div>`;
 wire();draw()}
function open(id){if(!parts(id).length){toast_('לבגד הזה עוד אין תמונה על האווטאר');return}el();if(ID!=id){NOTE='';PI=0}ID=id;ST=[];if(!DL.open)DL.showModal();load()}
window.fix237open=open;
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-fix237]');if(!b)return;e.preventDefault();e.stopPropagation();try{open(b.dataset.fix237)}catch(er){ERR('open',er)}},true);
// after the upload the dialog has done its job
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#fix237 [data-up188]');if(b)setTimeout(()=>{try{DL.close()}catch(_){}},50)});
})();
