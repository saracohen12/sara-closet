// v293 (Sara 28/10 15:49 "אני חייבת לראות פה רק חולצה אחת בלבד"): a piece of a pack shows its own picture (r360 pimTag: part.img, else her avatar wearing it).
// ✂ on a piece's card opens this window: she picks one of the pack's pictures, marks the piece with her finger (a box), and that crop becomes the piece's
// picture (an asset, IT[pack].parts[i].img). "🧍 האווטאר" takes the chosen picture off again.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v293 '+w+': '+(e&&(e.code||e.message)||e));
const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=m=>{try{window.toast&&toast(m)}catch(_){}};
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
let dlg=null,PID='',PAR='',KEY='',SRC='',box=null,drag=null;
function srcs(par){const L=[],add=u=>{if(u&&!L.includes(u))L.push(u)};const x=it(par);
 if(x.img)add('/_blob/'+x.img);else try{add(window.img?img(par):'')}catch(_){}(x.imgs||[]).forEach(o=>o&&o.id&&!o.raw&&add('/_blob/'+o.id));(x.pics||[]).forEach(o=>o&&o.id&&add('/_blob/'+o.id));
 try{if(typeof TH=='object'&&TH[par])add(TH[par])}catch(_){}return L}
function make(){if(dlg)return;dlg=document.createElement('dialog');dlg.id='pc293';dlg.setAttribute('aria-label','תמונה לפריט');
 dlg.innerHTML=`<div class="pc9h"><h3></h3><button type="button" class="pc9x" aria-label="סגירה">✕</button></div>
  <p class="pc9t">בוחרים תמונה, מסמנים באצבע ריבוע סביב הפריט, ושומרים.</p><div class="pc9l" role="list"></div>
  <div class="pc9w" hidden><div class="pc9s"><img alt="" draggable="false"><i class="pc9b" hidden></i></div></div>
  <div class="pc9a"><button type="button" class="pc9ok" disabled>✓ שמירה</button><button type="button" class="pc9av">🧍 האווטאר במקום</button></div>`;
 document.body.appendChild(dlg);
 dlg.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;if(t.classList.contains('pc9x'))return dlg.close();if(t.dataset.pc9s!=null)return pick(t.dataset.pc9s);if(t.classList.contains('pc9ok'))return save();if(t.classList.contains('pc9av'))return clear()});
 const st=dlg.querySelector('.pc9s');
 st.addEventListener('pointerdown',e=>{const r=st.getBoundingClientRect();drag={x:e.clientX-r.left,y:e.clientY-r.top};box=null;try{st.setPointerCapture(e.pointerId)}catch(_){}e.preventDefault()});
 st.addEventListener('pointermove',e=>{if(!drag)return;const r=st.getBoundingClientRect(),x=Math.max(0,Math.min(r.width,e.clientX-r.left)),y=Math.max(0,Math.min(r.height,e.clientY-r.top));
  box={x:Math.min(x,drag.x)/r.width,y:Math.min(y,drag.y)/r.height,w:Math.abs(x-drag.x)/r.width,h:Math.abs(y-drag.y)/r.height};paintBox()});
 const end=()=>{drag=null;if(box&&(box.w<.04||box.h<.04))box=null;paintBox()};st.addEventListener('pointerup',end);st.addEventListener('pointercancel',end)}
function paintBox(){const b=dlg.querySelector('.pc9b');b.hidden=!box;if(box)Object.assign(b.style,{left:box.x*100+'%',top:box.y*100+'%',width:box.w*100+'%',height:box.h*100+'%'});dlg.querySelector('.pc9ok').disabled=!box}
function pick(i){SRC=dlg.querySelectorAll('.pc9l img')[+i].src;box=null;dlg.querySelectorAll('.pc9l button').forEach((b,j)=>b.setAttribute('aria-pressed',j==+i));
 const w=dlg.querySelector('.pc9w');w.hidden=false;w.querySelector('img').src=SRC;paintBox()}
function open(pid){try{make();const i=pid.indexOf('~');PID=pid;PAR=pid.slice(0,i);KEY=pid.slice(i+1);box=null;SRC='';
 dlg.querySelector('h3').textContent='✂ תמונה ל'+(((D[pid]||{}).short)||'פריט');
 const L=srcs(PAR);dlg.querySelector('.pc9l').innerHTML=L.map((u,j)=>`<button type="button" role="listitem" data-pc9s="${j}" aria-pressed="false" aria-label="תמונה ${j+1}"><img alt="" src="${es(u)}"></button>`).join('')||'<p>אין תמונות למארז הזה.</p>';
 dlg.querySelector('.pc9w').hidden=true;paintBox();dlg.querySelector('.pc9av').hidden=!(it(PAR).parts||[]).some(p=>p.k==KEY&&p.img);
 if(!dlg.open)dlg.showModal();if(L.length==1)pick(0)}catch(e){ERR('open',e)}}
const loadImg=u=>new Promise((ok,no)=>{const i=new Image();i.crossOrigin='anonymous';i.onload=()=>ok(i);i.onerror=()=>no(new Error('img'));i.src=u});
async function setImg(v){const ps=(it(PAR).parts||[]).map(p=>{if(p.k!=KEY)return p;const q=Object.assign({},p);if(v)q.img=v;else delete q.img;return q});
 await putItem(PAR,{parts:ps});const P=window.PIM292||{};delete P[PID];if(v)P[PID]='/_blob/'+v;
 document.querySelectorAll(`img[data-pim="${CSS.escape(PID)}"]`).forEach(i=>{if(v)i.src=P[PID]});try{window.R360&&R360.sync&&R360.sync()}catch(_){}}
async function save(){if(!box||!SRC)return;const b=dlg.querySelector('.pc9ok');b.disabled=true;b.textContent='שומרת…';try{
 const im=await loadImg(SRC),W=im.naturalWidth,H=im.naturalHeight,sx=Math.round(box.x*W),sy=Math.round(box.y*H),sw=Math.max(8,Math.round(box.w*W)),sh=Math.max(8,Math.round(box.h*H));
 let ch=Math.max(sh,Math.round(sw*4/3)),cw=Math.round(ch*3/4);if(cw<sw){cw=sw;ch=Math.round(cw*4/3)}   // the card is 3:4 – the piece in the middle on the photo's own background
 const k=Math.min(1,900/ch),c=document.createElement('canvas');c.width=Math.round(cw*k);c.height=Math.round(ch*k);const g=c.getContext('2d');
 const t=document.createElement('canvas');t.width=t.height=1;const tg=t.getContext('2d');tg.drawImage(im,sx,sy,1,1,0,0,1,1);const px=tg.getImageData(0,0,1,1).data;g.fillStyle=`rgb(${px[0]},${px[1]},${px[2]})`;g.fillRect(0,0,c.width,c.height);
 g.drawImage(im,sx,sy,sw,sh,Math.round((cw-sw)/2*k),Math.round((ch-sh)/2*k),Math.round(sw*k),Math.round(sh*k));
 const bl=await new Promise(r=>c.toBlob(r,'image/jpeg',.88)),a=await claude.use('assets');if(!a)throw new Error('assets');const r=await a.upload(bl);
 await setImg(r.id);toast_('✓ התמונה של הפריט נשמרה');dlg.close()}catch(e){ERR('save',e);toast_(e&&e.message=='assets'?'שמירת תמונות לא זמינה כאן':'✗ לא הצלחתי לשמור. נסי שוב')}finally{b.textContent='✓ שמירה';b.disabled=!box}}
async function clear(){try{await setImg('');toast_('🧍 הפריט מוצג על האווטאר');dlg.close()}catch(e){ERR('clear',e)}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-pc293]');if(!t)return;e.preventDefault();e.stopPropagation();open(t.dataset.pc293)},true);
window.PC293={open};
})();
