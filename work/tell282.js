// v282 (Sara 28/10 10:19 "איך אני יכולה לכתוב לך… מה לא תקין, שתוכל להסתכל על המסך שאני נמצאת"): 💬 on every screen.
// She writes what is wrong (or taps a ready sentence); the page keeps a picture of the avatar as it is on the screen right now, where she is
// (which window, which item, what the studio wears) and her own screenshot if she adds one – all in db 'tell282', which Claude reads.
// Claude's answer is written back on the same row (ans, st) and she sees it under "מה ששלחתי".
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v282 '+w+': '+(e&&e.message||e));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const QUICK=['החגורה לא חתוכה טוב, רואים לבן','השיער חתוך על הפנים','הבגד לא יושב טוב על האווטאר','האיפור לא טוב','חסר כאן כפתור','משהו לא עובד כשאני לוחצת','הדף לא נוח, קשה למצוא'];
let SNAP=null,CTX=null,PIC=null,ROWS=[],SUB=false;
const READ=new Set((()=>{try{return JSON.parse(localStorage.getItem('tell282r')||'[]')}catch(_){return []}})());const saveRead=()=>{try{localStorage.setItem('tell282r',JSON.stringify([...READ].slice(-200)))}catch(_){}};
const tops=()=>[...document.querySelectorAll('dialog[open]')].filter(d=>d.id!='tell282');
const topD=()=>{const L=tops();return L[L.length-1]||null};

// what is on the screen now: the avatar pictures (canvases) of the top window, side by side
function snap(){try{const host=topD()||document.body;const cs=[...host.querySelectorAll('canvas')].filter(c=>{const r=c.getBoundingClientRect();return r.width>80&&r.height>120&&r.bottom>0&&r.top<innerHeight&&getComputedStyle(c).visibility!='hidden'}).slice(0,3);
  if(!cs.length)return null;const H=900,ws=cs.map(c=>Math.round(c.width*H/c.height)),o=document.createElement('canvas');o.width=ws.reduce((a,b)=>a+b,0)+12*(cs.length-1);o.height=H;
  const g=o.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,o.width,H);let x=0;cs.forEach((c,i)=>{try{g.drawImage(c,x,0,ws[i],H)}catch(_){}x+=ws[i]+12});
  return o}catch(e){ERR('snap',e);return null}}
function where(){const d=tops().map(x=>x.id||x.className).filter(Boolean);let st=null,home=null;try{st=JSON.parse(localStorage.getItem('r360')||'null')}catch(_){}try{home=JSON.parse(localStorage.getItem('r3home')||'null')}catch(_){}
 const cur=typeof CUR!='undefined'?CUR:null;const nm=id=>id&&((typeof IT=='object'&&IT[id]&&IT[id].nm)||(typeof D=='object'&&D[id]&&D[id].short))||'';
 return {dlg:d,tab:document.body.dataset.z50||'',item:(d.includes('dlg')&&cur)||'',itemName:d.includes('dlg')?nm(cur):'',studio:d.includes('r360')&&st?{on:st.on,head:st.head,mk:st.mk,tuck:st.tuck,under:st.under,tf:st.tf}:null,
  wearing:(()=>{try{return window.R360&&R360.wearing?R360.wearing().slice(0,12):null}catch(_){return null}})(),home:home&&home.pin?{pin:1,head:home.head}:null,
  ver:(document.getElementById('ver')||{}).textContent||'',w:innerWidth,h:innerHeight,ua:navigator.userAgent.slice(0,120),errs:(window.ERRS||[]).slice(-10).map(x=>String(x).slice(0,200))}}

function dlg(){let d=document.getElementById('tell282');if(d)return d;d=document.createElement('dialog');d.id='tell282';d.dir='rtl';d.setAttribute('aria-labelledby','t282h');document.body.appendChild(d);
 d.addEventListener('click',async e=>{const t=e.target;if(t===d)return d.close();const b=t.closest('button');if(!b)return;
  if(b.dataset.t282=='x')return d.close();
  if(b.dataset.t282q!=null){const ta=d.querySelector('textarea');ta.value=(ta.value.trim()?ta.value.trim()+'\n':'')+QUICK[+b.dataset.t282q];ta.focus();return}
  if(b.dataset.t282=='pic')return d.querySelector('.t282f').click();
  if(b.dataset.t282=='rmpic'){PIC=null;paintPic();return}
  if(b.dataset.t282=='send')return send();
  if(b.dataset.t282=='mine'){d.querySelector('.t282m').hidden=!d.querySelector('.t282m').hidden;paintMine();return}});
 d.addEventListener('change',e=>{if(e.target.classList.contains('t282f')&&e.target.files&&e.target.files[0]){PIC=e.target.files[0];e.target.value='';paintPic()}});
 return d}
function paintPic(){const d=dlg(),w=d.querySelector('.t282pp');if(!w)return;w.innerHTML=PIC?`<img alt="הצילום שצירפת" src="${URL.createObjectURL(PIC)}"><button type="button" data-t282="rmpic">✕ להוריד</button>`:''}
function paintMine(){const d=dlg(),m=d.querySelector('.t282m');if(!m||m.hidden)return;ROWS.forEach(r=>{if(r.ans)READ.add(r.id)});saveRead();setTimeout(paintBtn,0);
 m.innerHTML=ROWS.length?ROWS.slice(0,15).map(r=>`<li><small>${new Date(r.t).toLocaleString('he-IL',{day:'numeric',month:'numeric',hour:'2-digit',minute:'2-digit'})} · ${r.st=='done'?'✓ תוקן':r.st=='seen'?'👀 Claude ראה':'⏳ נשלח'}</small><p>${esc(r.note)}</p>${r.ans?`<p class="t282a"><b>Claude:</b> ${esc(r.ans)}</p>`:''}</li>`).join(''):'<li>עוד לא שלחת כלום.</li>'}
function open(){try{SNAP=snap();CTX=where();PIC=null;const d=dlg();const ans=ROWS.filter(r=>r.ans&&!READ.has(r.id)).length;
  d.innerHTML=`<div class="t282h"><h2 id="t282h">💬 לספר ל-Claude</h2><button type="button" data-t282="x" aria-label="סגירה">✕</button></div>
   <p class="t282i">כתבי מה לא תקין כאן${CTX.itemName?` (<b>${esc(CTX.itemName)}</b>)`:''}. אני מקבל את ההודעה יחד עם ${SNAP?'תמונה של האווטאר כמו שהוא עכשיו על המסך, ו':''}איפה את נמצאת באתר.</p>
   ${SNAP?`<div class="t282s"><img alt="מה שעל המסך עכשיו" src="${SNAP.toDataURL('image/jpeg',.7)}"><label><input type="checkbox" class="t282c" checked> לצרף את התמונה הזו</label></div>`:''}
   <div class="t282q">${QUICK.map((q,i)=>`<button type="button" data-t282q="${i}">${q}</button>`).join('')}</div>
   <textarea rows="4" aria-label="מה לא תקין" placeholder="לדוגמה: החגורה השחורה – בצד ימין רואים פס לבן"></textarea>
   <div class="t282r"><button type="button" data-t282="pic">📷 להוסיף צילום מסך</button><input type="file" accept="image/*" class="t282f" hidden></div><div class="t282pp"></div>
   <button type="button" class="t282go" data-t282="send">שליחה ל-Claude</button>
   <button type="button" class="t282mb" data-t282="mine">📬 מה ששלחתי${ans?` · <b>${ans} תשובות חדשות</b>`:''}</button><ul class="t282m" hidden></ul>`;
  if(!d.open)d.showModal();setTimeout(()=>{const ta=d.querySelector('textarea');ta&&ta.focus()},60)}catch(e){ERR('open',e)}}
async function send(){const d=dlg(),b=d.querySelector('.t282go'),note=d.querySelector('textarea').value.trim();if(!note&&!PIC){(window.toast||alert)('כתבי כמה מילים, או הוסיפי צילום');return}
 b.disabled=true;b.textContent='שולחת…';const doc=Object.assign({t:Date.now(),note:note.slice(0,2000),st:'new'},CTX||where());
 try{let a=null;try{a=await claude.use('assets')}catch(_){}
  const up=async bl=>{if(!a||!bl)return '';try{const r=typeof upl=='function'?await upl(a,bl):await a.upload(bl);return r&&r.id||''}catch(e){ERR('up',e);return ''}};
  const keep=d.querySelector('.t282c');if(SNAP&&(!keep||keep.checked)){const bl=await new Promise(r=>SNAP.toBlob(r,'image/jpeg',.85));doc.shot=await up(bl)}
  if(PIC)doc.pic=await up(PIC);
  let ok=false;if(typeof DB!='undefined'&&DB){try{await DB.collection('tell282').doc('m'+Date.now().toString(36)).set(doc);ok=true}catch(e){ERR('save',e)}}
  if(!ok){try{const l=JSON.parse(localStorage.getItem('tell282')||'[]');l.push(doc);localStorage.setItem('tell282',JSON.stringify(l.slice(-20)))}catch(_){}}
  d.close();(window.toast||(()=>{}))(ok?'✓ נשלח ל-Claude. אפשר גם לכתוב לי בצ׳אט "שלחתי"':'נשמר בטלפון – כשיהיה חיבור זה יישלח')}
 catch(e){ERR('send',e);b.disabled=false;b.textContent='שליחה ל-Claude';(window.toast||alert)('לא הצלחתי לשלוח, נסי שוב')}}
// her messages and Claude's answers
function load(n=0){if(SUB)return;try{if(typeof DB!='undefined'&&DB){SUB=true;DB.collection('tell282').onSnapshot(sn=>{const a=[];sn.docs.forEach(x=>{const v=x.data();if(v)a.push(Object.assign({id:x.id},v))});ROWS=a.sort((p,q)=>q.t-p.t);paintBtn();paintMine()},e=>ERR('snap',e));
  // messages saved on the phone when there was no connection go up now
  try{const l=JSON.parse(localStorage.getItem('tell282')||'[]');if(l.length)Promise.all(l.map((x,i)=>DB.collection('tell282').doc('m'+(x.t||Date.now()).toString(36)+i).set(x))).then(()=>localStorage.removeItem('tell282')).catch(e=>ERR('up',e))}catch(_){}}
  else if(n<20)setTimeout(()=>load(n+1),1500)}catch(e){ERR('load',e)}}

// the round 💬 button: on the page, and moved into the window on top so it is there in every window
const btn=document.createElement('button');btn.type='button';btn.id='t282b';btn.setAttribute('aria-label','לספר ל-Claude מה לא תקין');btn.innerHTML='<span aria-hidden="true">💬</span><b hidden></b>';
btn.addEventListener('click',e=>{e.stopPropagation();open()});document.body.appendChild(btn);
function paintBtn(){const n=ROWS.filter(r=>r.ans&&!READ.has(r.id)).length,b=btn.querySelector('b');b.hidden=!n;b.textContent=n}
// on the page it sits in the header row (round like the others); inside a window it floats at the bottom corner
function place(){const d=topD(),act=document.querySelector('#top .h9act'),p=d||act||document.body;if(btn.parentNode!==p){if(p===act)act.prepend(btn);else p.appendChild(btn)}btn.classList.toggle('in',!!d);btn.classList.toggle('hd',!d&&p===act)}
new MutationObserver(()=>place()).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});setInterval(place,1200);
window.openTell282=open;window.openBug77=open;
setTimeout(load,2500);
})();
