// v351 (Sara 4/11: "תראה את האבטר היפה ש-GPT עשה, זה זורם… לא כמו שאתה עשית שרואים תמונה תמונה. אני רוצה שרק הגוף שלי יזוז בצורה יפה")
// The home avatar has two smooth modes – neither switches between the 8 still pictures:
//  1) 🎬 her own video: a GIF / MP4 she made in GPT plays in the arch, looping (saved in the asset store, list in db 'r360'/'vid351'; she can keep several and pick one)
//  2) without a video: she stands facing you and only her body moves – a soft sway that grows from the feet up, and a slow breath – drawn every frame from
//     the front picture (feet stay put, the background does not move). ▶ still turns her round; dragging still turns her.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v351v '+w+': '+(e&&e.message||e));
const H=document.documentElement,toast=m=>(window.toast||(()=>{}))(m);
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const still=()=>!!H.dataset.still||matchMedia('(prefers-reduced-motion: reduce)').matches;
let V={on:'',list:[]};   // list: [{a:assetId,u:url,k:'v'|'g',n:name,t}]
const LSK='vid351';try{V=Object.assign(V,JSON.parse(localStorage.getItem(LSK)||'{}'))}catch(_){}
const db=async()=>{try{return await window.claude?.use?.('db')}catch(_){return null}};
async function load(){try{const d=await db();if(!d)return;const s=await d.collection('r360').doc('vid351').get();const v=s&&s.exists&&s.data&&s.data();if(v&&Array.isArray(v.list)){V={on:v.on||'',list:v.list};keep(false);show()}}catch(e){ERR('load',e)}}
async function keep(remote=true){try{localStorage.setItem(LSK,JSON.stringify(V))}catch(_){}if(remote){try{const d=await db();if(d)await d.collection('r360').doc('vid351').set({on:V.on,list:V.list,t:Date.now()})}catch(e){ERR('save',e)}}}
const cur=()=>V.list.find(x=>x.a==V.on);

// ---------- 1) the video in the arch ----------
function show(){try{const st=window.H180ST,el=st&&st.el;if(!el)return;let m=el.querySelector('.v351m');const c=cur();
 if(!c){if(m)m.remove();el.classList.remove('v351on');return}
 if(!m||m.dataset.a!=c.a){if(m)m.remove();m=document.createElement(c.k=='g'?'img':'video');m.className='v351m';m.dataset.a=c.a;m.alt='';
  if(c.k!='g'){m.muted=true;m.loop=true;m.playsInline=true;m.autoplay=true;m.setAttribute('playsinline','');m.setAttribute('muted','')}
  m.src=c.u;el.append(m);if(m.play)m.play().catch(()=>{})}
 el.classList.add('v351on');try{st.stop()}catch(_){}}catch(e){ERR('show',e)}
 try{const av=window.H180ST.el.closest('.z-av');if(av)av.classList.toggle('v351vid',!!cur());if(!cur()&&window.H180ST.playing()){window.H180ST.stop();window.H180ST.show(0)}}catch(_){}}   // v355: ▶/speed do nothing over a video – hidden then; back to the avatar = calm, not spinning

// ---------- 2) the body sway, drawn from the front picture ----------
let sw=null,raf=0,t0=performance.now();
function swayOn(){const st=window.H180ST,el=st&&st.el;if(!el||still())return false;if(!sw||!el.contains(sw)){sw=document.createElement('canvas');sw.className='v351s';sw.setAttribute('aria-hidden','true');el.append(sw)}return true}
function frame(now){raf=requestAnimationFrame(frame);try{const st=window.H180ST,el=st&&st.el;if(!el||document.hidden)return;
 const vid=el.classList.contains('v351on'),spin=st.playing&&st.playing(),dragging=el.matches(':active');
 const src=el.querySelectorAll('canvas:not(.v351s)')[0];   // the front picture (angle 0)
 const front=st.view===0||st.view==null;
 if(vid||spin||dragging||!front||still()||!src||!src._done&&!src.width){if(sw)sw.style.opacity='0';return}
 if(!swayOn())return;const W=src.width,Hh=src.height;if(!W||!Hh)return;if(sw.width!=W||sw.height!=Hh){sw.width=W;sw.height=Hh}
 const g=sw.getContext('2d');const t=(now-t0)/1000;
 // feet ≈ 93% down the picture; the sway grows with height (feet still, head moves most); two slow waves so it never looks mechanical
 const feet=Hh*.93,A=W*.012,sA=Math.sin(t*2*Math.PI/5.6),sB=Math.sin(t*2*Math.PI/3.1+1.3)*.35,br=1+.006*Math.sin(t*2*Math.PI/4.2);
 g.clearRect(0,0,W,Hh);g.drawImage(src,0,feet,W,Hh-feet,0,feet,W,Hh-feet);   // v356: the doll is on a clear background now – only the feet strip is copied as is, the body rows sway
 const step=3;for(let y=0;y<feet;y+=step){const k=Math.pow((feet-y)/feet,1.5),dx=A*(sA+sB)*k;
  // breath: the body above the feet stretches a hair upwards and back
  const sy=feet-(feet-y)*br;g.drawImage(src,0,y,W,step,dx,sy,W,step*br+.6)}
 sw.style.opacity='1'}catch(e){ERR('frame',e);cancelAnimationFrame(raf);raf=0}}
function startSway(){if(!raf)raf=requestAnimationFrame(frame)}

// ---------- the 🎬 sheet ----------
let dlg=null;
const PROMPT=`צרי סרטון קצר (4–6 שניות, לופ חלק בלי קפיצה) של האישה בתמונה ששלחתי – זו אני.
היא עומדת במקום, פנים אליי, נושמת בעדינות, הגוף מתנדנד קצת, יד על המותן זזה מעט, השיער זז ברכות.
אותם פנים בדיוק, אותו גוף, אותם בגדים ואותו כיסוי ראש/פאה כמו בתמונה – בלי לשנות שום דבר.
רקע אחיד בהיר כמו בתמונה, מצלמה קבועה, בלי טקסט. תמונה אנכית 2:3. הורידי כ-GIF או MP4.`;
function sheet(){if(!dlg){dlg=document.createElement('dialog');dlg.id='v351d';dlg.dir='rtl';dlg.setAttribute('aria-labelledby','v351t');document.body.append(dlg);
  dlg.addEventListener('click',e=>{const b=e.target.closest('button');if(e.target===dlg||e.target.closest('.v351x'))return dlg.close();if(!b)return;
   if(b.dataset.v351pick!=null){V.on=b.dataset.v351pick;keep();show();paint();toast(V.on?'🎬 הסרטון בדף הבית':'האווטאר חזר לדף הבית')}
   else if(b.dataset.v351del!=null){const a=b.dataset.v351del;V.list=V.list.filter(x=>x.a!=a);if(V.on==a)V.on='';keep();show();paint()}
   else if(b.dataset.v351cp!=null){try{navigator.clipboard.writeText(PROMPT);toast('📋 הפרומפט הועתק – מדביקים ב-GPT')}catch(_){toast('לא הצלחתי להעתיק – אפשר לסמן ולהעתיק ידנית')}}
   else if(b.dataset.v351img!=null)downloadFront()});
  dlg.addEventListener('change',e=>{const f=e.target.files&&e.target.files[0];if(f)upload(f);e.target.value=''})}
 paint();if(!dlg.open)dlg.showModal()}
function paint(){if(!dlg)return;dlg.innerHTML=`<div class="v351h"><h2 id="v351t">🎬 אווטאר בתנועה</h2><button type="button" class="v351x" aria-label="סגירה">✕</button></div>
 <p class="v351p">סרטון קצר מ-GPT שלך מתנגן בדף הבית במקום התמונות – תנועה זורמת אמיתית. בלי סרטון, האווטאר עומד מולך והגוף זז ברכות.</p>
 <label class="v351u"><input type="file" accept="video/mp4,video/webm,video/quicktime,image/gif" hidden><span>⬆ להעלות סרטון / GIF מ-GPT</span></label>
 <div class="v351l">${V.list.map(x=>`<div class="v351i${V.on==x.a?' on':''}">${x.k=='g'?`<img alt="" src="${es(x.u)}">`:`<video src="${es(x.u)}" muted loop playsinline autoplay></video>`}
  <div><button type="button" data-v351pick="${es(x.a)}" aria-pressed="${V.on==x.a}">${V.on==x.a?'✓ בדף הבית':'לשים בדף הבית'}</button><button type="button" class="v351del" data-v351del="${es(x.a)}" aria-label="למחוק את הסרטון">🗑</button></div></div>`).join('')}</div>
 ${V.on?`<button type="button" class="v351off" data-v351pick="">↩ בלי סרטון – האווטאר שזז</button>`:''}
 <details class="v351g"><summary>איך מכינים סרטון כזה ב-GPT</summary><ol><li>מורידים את התמונה של האווטאר עם הלוק: <button type="button" data-v351img>⬇ תמונת האווטאר עכשיו</button></li>
 <li>שולחים אותה ל-GPT עם הפרומפט: <button type="button" data-v351cp>📋 להעתיק פרומפט</button></li><li>מורידים את הסרטון ומעלים כאן ⬆</li></ol><pre>${es(PROMPT)}</pre></details>`}
async function upload(f){try{if(f.size>15e6)return toast('הקובץ גדול מדי (עד 15MB) – בקשי מ-GPT גרסה קצרה יותר');
 toast('מעלה את הסרטון…');let a=null;try{a=await window.claude.use('assets')}catch(_){}if(!a)return toast('אין גישה לשמירת קבצים כאן');
 const r=await a.upload(f);const it={a:r.id,u:r.url||('/_blob/'+r.id),k:/gif/i.test(f.type)?'g':'v',n:f.name||'',t:Date.now()};
 V.list.unshift(it);V.list=V.list.slice(0,12);V.on=it.a;await keep();show();paint();toast('🎬 הסרטון בדף הבית')}catch(e){ERR('up',e);toast('ההעלאה לא הצליחה – לנסות שוב')}}
function downloadFront(){try{const st=window.H180ST;const c=st&&st.el.querySelectorAll('canvas:not(.v351s)')[0];if(!c)return;c.toBlob(async b=>{if(!b)return;
  let dl=null;try{dl=await window.claude?.use?.('downloads')}catch(_){}
  if(dl&&dl.save){try{await dl.save(b,'האווטאר-שלי.png');return}catch(_){}}
  const u=URL.createObjectURL(b),l=document.createElement('a');l.href=u;l.download='האווטאר-שלי.png';document.body.append(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)},'image/png')}catch(e){ERR('dl',e)}}

// ---------- start: a 🎬 button by the home avatar's controls; calm by default (no picture-by-picture turning) ----------
function boot(n=0){const st=window.H180ST;if(!st){if(n<60)setTimeout(()=>boot(n+1),500);return}
 try{const ctl=st.el.closest('.z-av')&&st.el.closest('.z-av').querySelector('.z-avc');if(ctl&&!ctl.querySelector('.v351b')){const b=document.createElement('button');b.type='button';b.className='v351b';b.setAttribute('aria-label','אווטאר בתנועה – סרטון');b.textContent='🎬';b.onclick=sheet;ctl.append(b)}
  // v351: no automatic picture-by-picture turning on the home – she moves smoothly in place; ▶ turns her when she wants
  // after she turns her by hand, she comes back to face you a few seconds later
  let last=Date.now();st.el.addEventListener('pointerdown',()=>{last=Date.now()});st.el.addEventListener('pointermove',()=>{if(st.el.matches(':active'))last=Date.now()});
  setInterval(()=>{try{if(!st.playing()&&st.view!==0&&Date.now()-last>5000)st.show(0)}catch(_){}},1000);
  show();startSway();load()}catch(e){ERR('boot',e)}}
boot();
window.VID351={sheet};
})();
