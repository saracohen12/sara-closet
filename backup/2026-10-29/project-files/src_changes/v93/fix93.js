// ===== v93 (2026-10-22): vest slot, the jewelry part row wraps, frame + backgrounds around the avatar =====
{
// 1) vest: its own slot between the top and the jacket, so a top + vest + jacket can be worn together
const isVest=id=>/אפוד|וסט|vest/i.test(((D[id]||{}).short||'')+' '+((D[id]||{}).name||''));
try{if(!SLOTS.find(s=>s[0]=='vest')){SLOTS.splice(SLOTS.findIndex(s=>s[0]=='outer'),0,['vest','וסט','🦺',['outer','tops','sweaters']]);SLOTZ.vest=35;
 for(const a of [typeof P5G_SLOTS!='undefined'&&P5G_SLOTS,typeof AF_TOP!='undefined'&&AF_TOP,typeof VARSL!='undefined'&&VARSL,typeof FITB_SLOTS!='undefined'&&FITB_SLOTS,typeof MAINSL!='undefined'&&MAINSL,typeof MAINS!='undefined'&&MAINS,typeof FITD!='undefined'&&null])if(a&&a.includes('outer')&&!a.includes('vest'))a.push('vest');
 if(typeof PAIR=='object'&&PAIR.outer&&!PAIR.vest)PAIR.vest=PAIR.outer.slice()}}catch(e){ERR('vest93',e)}
{const _di=drawerItems;drawerItems=function(slot){const ids=_di(slot);return slot=='vest'?ids.filter(isVest):ids}}
{const _a=avPos;avPos=function(slot){const a=[...arguments];if(slot=='vest')a[0]='outer';return _a.apply(this,a)}}
{const _f=fitPos;fitPos=function(slot){const a=[...arguments];if(slot=='vest')a[0]='outer';return _f.apply(this,a)}}

// 2) backgrounds: 24 illustrated scenes (bg/*.svg) + her own (written in words or uploaded) – SET.bgx
const BG93=[["garden","גן ורדים"],["jlm","אבן ירושלמית"],["beach","חוף בשקיעה"],["hall","אולם אירועים"],["paris","רחוב בפריז"],["autumn","פארק בסתיו"],["blossom","פריחת דובדבן"],["marble","שיש לבן וזהב"],["floral","טפט פרחים"],["lavender","שדה לבנדר"],["library","ספרייה"],["night","עיר בלילה"],["winter","שלג בחורף"],["desert","מדבר"],["olive","מטע זיתים"],["parch","קשת פסטל"],["bokeh","אורות זהב"],["water","צבעי מים"],["room","חדר מואר"],["cafe","בית קפה"],["lake","אגם והרים"],["sunset","שמיים בשקיעה"],["boutique","בוטיק"],["flowerwall","קיר פרחים"]];
const PLAIN=Object.keys(BGS);
const bgCss=u=>`url("${u}") center bottom/cover no-repeat`;
for(const [k,n] of BG93)BGS['s_'+k]=[n,bgCss('bg/'+k+'.svg'),['#f6f1ea','#e7ddd1']];
function bgxLoad(){for(const x of (SET.bgx||[]))if(x&&x.k&&x.u)BGS[x.k]=[x.n||'שלי',bgCss(x.u),['#f6f1ea','#e7ddd1']]}
bgxLoad();
try{if(typeof SMORE!='undefined'&&SMORE[0]&&SMORE[0][0]=='sbgbtn'){SMORE[0][1]='🖼 רקע ומסגרת';SMORE[0][2]='רקעים יפים, רקע שאת כותבת, ומסגרת בצבע'}}catch(_){}

// 3) frame around the avatar: colour + width, kept in SET.fr93
const FRC=[['none','בלי',''],['white','לבן','#ffffff'],['cream','שמנת','#f3e9d8'],['gold','זהב','linear-gradient(135deg,#efd795,#b8913f 40%,#f6e3ad 60%,#a8812f)'],['rose','רוז גולד','linear-gradient(135deg,#f3cfbf,#c98f7c 45%,#f6dccf 70%,#b97c6a)'],['silver','כסף','linear-gradient(135deg,#f7f7f7,#b9bcc2 45%,#eceef1 70%,#a3a7ad)'],['black','שחור','#1d1a19'],['brown','חום','#6b4a36'],['wood','עץ','linear-gradient(135deg,#c39466,#8a5f3c 50%,#b88a5e)'],['blush','ורוד','#f2c6cc'],['sage','מרווה','#a9b99a'],['sky','תכלת','#bcd6e8'],['navy','כחול','#2c3a5a'],['bordo','בורדו','#7a2638']];
const FRM=[['tight','צמוד (6 ס"מ)'],['wide','רחב'],['full','כל המסך']];
const frCfg=()=>Object.assign({c:'white',m:'wide'},SET.fr93||{});
const frCol=c=>(FRC.find(x=>x[0]==c)||FRC[1])[2];
const smOf=()=>{const st=document.getElementById('sstage');return st&&st.parentElement&&st.parentElement.classList.contains('smain')?st.parentElement:null};
function frGeo(H,W,boxW,z){const cfg=frCfg();const H0=H/(z||1);const t=cfg.c=='none'?0:Math.max(5,Math.round(H0*.014));const cm=H0*.95/156;
 const py=Math.round(3*cm)+t,px=Math.round(6*cm)+t;let fw=cfg.m=='tight'?W+2*px:cfg.m=='full'?Math.max(W+2*px,boxW-16):Math.max(W+2*px,Math.round(H*.6));
 if(boxW&&(z||1)<=1.01)fw=Math.min(fw,boxW-8);return {t,py,fw,fh:H+2*py,cfg}}
function frPlace(){const st=document.getElementById('sstage'),sm=smOf();const S=document.getElementById('studio');if(!st||!sm||!S||!S.open||typeof ST=='undefined'||!ST)return;
 let f=sm.querySelector(':scope>#fr93');if(!f){sm.insertAdjacentHTML('afterbegin','<div id="fr93" aria-hidden="true"><div class="in"></div></div>');f=sm.querySelector(':scope>#fr93')}
 S.classList.add('fr93');bgxLoad();const z=stageZ();
 const py0=Math.round(sm.clientHeight*.022)+(frCfg().c=='none'?0:Math.max(5,Math.round(sm.clientHeight*.014)));if(sm.style.getPropertyValue('--fr93py')!=py0+'px')sm.style.setProperty('--fr93py',py0+'px');
 const H=st.offsetHeight,W=st.offsetWidth;if(!H||!W)return;const g=frGeo(H,W,sm.clientWidth,z);
 Object.assign(f.style,{left:Math.round(st.offsetLeft+W/2-g.fw/2)+'px',top:Math.round(st.offsetTop-g.py)+'px',width:g.fw+'px',height:g.fh+'px',padding:g.t+'px',background:frCol(g.cfg.c)||'transparent'});
 f.classList.toggle('nof',g.cfg.c=='none');f.querySelector('.in').style.background=(BGS[ST.bg]||BGS.studio)[1]}
window.fr93place=frPlace;
// the 🔍 window gets the same frame and background
window.fr93wrap=function(k,W,H){if(typeof ST=='undefined'||!ST)return null;const g=frGeo(H,W,0,1);g.fw=Math.max(W+2*(g.py),Math.round(H*.6));if(g.cfg.m=='tight'){const cm=H*.95/156;g.fw=W+2*(Math.round(6*cm)+g.t)}
 const d=document.createElement('div');d.className='fr93w'+(g.cfg.c=='none'?' nof':'');Object.assign(d.style,{width:g.fw+'px',height:g.fh+'px',padding:g.t+'px',background:frCol(g.cfg.c)||'transparent'});
 const i=document.createElement('div');i.className='in';i.style.background=(BGS[ST.bg]||BGS.studio)[1];d.append(i);Object.assign(i.style,{display:'flex',alignItems:'center',justifyContent:'center'});k.style.background='transparent';k.style.boxShadow='none';k.style.borderRadius='0';k.style.flex='none';k.querySelector('.sbg')?.remove();i.append(k);return d};
let FIRST=true;
if(typeof drawStudio=='function'){const _d=drawStudio;drawStudio=async function(){try{bgxLoad();if(FIRST&&typeof ST!='undefined'&&ST&&(!ST.bg||ST.bg=='studio')&&!SET.bg93seen){FIRST=false;ST.bg='s_parch';SET.bg='s_parch';SET.bg93seen=1;saveSet()}else FIRST=false;if(ST&&!BGS[ST.bg])ST.bg='s_parch'}catch(_){}const r=await _d.apply(this,arguments);try{frPlace()}catch(_){}return r}}
if(typeof zoomTo=='function'){const _z=zoomTo;zoomTo=function(){const r=_z.apply(this,arguments);requestAnimationFrame(()=>requestAnimationFrame(()=>{try{frPlace()}catch(_){}}));return r}}
let RO=null;setInterval(()=>{const sm=smOf(),st=document.getElementById('sstage');if(!sm||!st||!document.getElementById('studio')?.open)return;if(!RO&&window.ResizeObserver){let q=0;RO=new ResizeObserver(()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;try{frPlace()}catch(_){}})})}if(RO&&!sm.dataset.ro93){sm.dataset.ro93=1;RO.observe(sm)}if(RO&&!st.dataset.ro93){st.dataset.ro93=1;RO.observe(st)}if(!sm.querySelector(':scope>#fr93'))frPlace()},600);
addEventListener('resize',()=>{try{frPlace()}catch(_){}});

// 4) "🖼 רקע ומסגרת" window
function setBg(k){if(!BGS[k]||typeof ST=='undefined'||!ST)return;ST.bg=k;SET.bg=k;saveSet();const sb=document.querySelector('#sstage .sbg');if(sb)sb.style.background=BGS[k][1];frPlace();paintDlg()}
function tile(k){const [n,css]=BGS[k];const own=(SET.bgx||[]).some(x=>x.k==k);return `<button class="b93t${ST&&ST.bg==k?' on':''}" data-b93bg="${k}" aria-pressed="${!!(ST&&ST.bg==k)}"><i style='background:${css.replace(/'/g,"&#39;")}'></i><span>${n}</span>${own?`<b data-b93del="${k}" title="למחוק את הרקע הזה" role="button">✕</b>`:''}</button>`}
function paintDlg(){const d=document.getElementById('bg93');if(!d||!d.open)return;const cfg=frCfg();
 d.querySelector('.b93own').innerHTML=(SET.bgx||[]).map(x=>tile(x.k)).join('')||'<p class="b93e">עוד אין. כתבי למטה איזה רקע את רוצה, או העלי תמונה.</p>';
 d.querySelector('.b93sc').innerHTML=BG93.map(([k])=>tile('s_'+k)).join('');d.querySelector('.b93pl').innerHTML=PLAIN.map(tile).join('');
 d.querySelector('.b93c').innerHTML=FRC.map(([k,n,c])=>`<button data-b93fc="${k}" aria-pressed="${cfg.c==k}" title="${n}"><i style="background:${c||'repeating-linear-gradient(45deg,#fff 0 5px,#eee 5px 10px)'}"></i><span>${n}</span></button>`).join('');
 d.querySelector('.b93m').innerHTML=FRM.map(([k,n])=>`<button data-b93fm="${k}" aria-pressed="${cfg.m==k}">${n}</button>`).join('')}
function dlg(){let d=document.getElementById('bg93');if(d)return d;
 document.body.insertAdjacentHTML('beforeend',`<dialog id="bg93" aria-label="רקע ומסגרת"><div class="b93h"><b>🖼 רקע ומסגרת</b><button data-b93x class="go">✓ סיום</button></div><div class="b93b">
 <h4>✍ רקע שאת ממציאה</h4><div class="b93w"><input id="b93t" maxlength="140" placeholder="למשל: גן עם בריכה ושקיעה ורודה"><button data-b93gen class="go">✨ צרי רקע</button></div><p class="b93msg" id="b93msg"></p>
 <div class="b93r"><label class="b93up">📷 תמונה שלי כרקע<input type="file" accept="image/*" id="b93f" hidden></label><button data-b93gpt>📋 פרומפט לרקע מ-GPT</button></div>
 <h4>הרקעים שלי</h4><div class="b93g b93own"></div>
 <h4>מקומות</h4><div class="b93g b93sc"></div>
 <h4>צבע חלק</h4><div class="b93g b93pl"></div>
 <h4>מסגרת</h4><div class="b93c"></div><div class="seg b93m"></div>
 </div></dialog>`);d=document.getElementById('bg93');return d}
function openDlg(){if(typeof ST=='undefined'||!ST)return;bgxLoad();const d=dlg();if(!d.open)d.showModal();paintDlg()}
window.openBg93=openDlg;
const msg=t=>{const m=document.getElementById('b93msg');if(m)m.textContent=t||''};
async function keep(n,blob,fallback){let u=null;try{const a=await claude.use('assets');if(a){const r=await a.upload(blob);u=r.url||('/_blob/'+r.id)}}catch(e){ERR('bg93up',e)}
 if(!u)u=fallback||null;if(!u){msg('לא הצלחתי לשמור את הרקע כאן.');return null}
 const k='x'+Date.now().toString(36);SET.bgx=(SET.bgx||[]).concat([{k,n:n.slice(0,26),u}]);bgxLoad();setBg(k);return k}
function clean(svg){try{const doc=new DOMParser().parseFromString(svg,'image/svg+xml');const s=doc.documentElement;if(!s||s.nodeName.toLowerCase()!='svg'||doc.querySelector('parsererror'))return null;
 doc.querySelectorAll('script,foreignObject,image,iframe,a,style,animate,set').forEach(x=>x.remove());
 for(const el of [s,...s.querySelectorAll('*')])for(const at of [...el.attributes]){const n=at.name.toLowerCase(),v=at.value;if(n.startsWith('on')||((n=='href'||n=='xlink:href')&&!v.startsWith('#'))||/url\((?!\s*['"]?#)/i.test(v))el.removeAttribute(at.name)}
 s.setAttribute('xmlns','http://www.w3.org/2000/svg');if(!s.getAttribute('viewBox'))s.setAttribute('viewBox','0 0 600 1000');s.setAttribute('preserveAspectRatio','xMidYMax slice');s.removeAttribute('width');s.removeAttribute('height');
 return new XMLSerializer().serializeToString(s)}catch(_){return null}}
let BUSY=false;
async function gen(){const t=(document.getElementById('b93t')?.value||'').trim();if(!t){msg('כתבי קודם איזה רקע את רוצה 🙂');return}if(BUSY)return;
 let sm=null;try{sm=await claude.use('sample')}catch(_){}if(!sm){msg('יצירת רקע לא זמינה כאן. אפשר להשתמש ב"📋 פרומפט לרקע מ-GPT" ולהעלות את התמונה.');return}
 BUSY=true;msg('מציירת לך רקע… (בערך חצי דקה)');
 try{const {text}=await sm(`Create an illustrated background scene as one SVG image for a fashion app where a woman's full-body photo stands in front of it.
Scene (the user wrote it in Hebrew): «${t}»
Rules:
- viewBox="0 0 600 1000" (portrait). Fill the whole area.
- Elegant, soft, flat illustration with gentle gradients and harmonious colours; beautiful and calm, like a pretty postcard.
- The ground / floor line at about y=860, the woman will stand in the middle on it. Keep the middle (x 190–410, y 120–860) calm and not busy, with the interesting details around it and in the distance.
- No people, no animals in the middle, no text, no letters, no logos.
- Only basic SVG: rect, circle, ellipse, path, polygon, polyline, line, g, defs, linearGradient, radialGradient, stop, filter with feGaussianBlur. No <image>, no external links, no scripts, no CSS <style>.
- Under 30 KB.
Reply with the SVG code only, starting with <svg and ending with </svg>.`,{modelTier:'default',cache:false});
  const m=(text||'').match(/<svg[\s\S]*<\/svg>/i);const svg=m&&clean(m[0]);if(!svg){msg('לא יצא רקע טוב. נסי שוב או כתבי קצת אחרת.');return}
  const k=await keep(t,new Blob([svg],{type:'image/svg+xml'}),svg.length<60000?'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg):null);if(k)msg('✓ הרקע מוכן ונשמר ב"הרקעים שלי".')}
 catch(e){msg(e&&e.code=='rate_limited'?'יותר מדי בקשות כרגע, נסי שוב עוד דקה.':e&&e.code=='not_granted'?'צריך לאשר את השימוש ב-Claude כדי לצייר רקע.':'משהו השתבש, נסי שוב.');ERR('bg93gen',e)}finally{BUSY=false}}
const GPTBG=t=>`צרי תמונת רקע לאורך, 1024 על 1536 פיקסלים, של: ${t||'___'}.
בלי אנשים, בלי טקסט ובלי כיתוב. מקום יפה ונעים, צילום אמיתי בגובה העיניים, תאורה רכה.
בחלק התחתון (בערך ב-85% מהגובה) יש רצפה או אדמה ישרה שאפשר לעמוד עליה באמצע. האמצע רגוע ולא עמוס, הפרטים היפים מסביב וברקע.`;
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('#bg93 [data-b93x],#bg93 [data-b93bg],#bg93 [data-b93del],#bg93 [data-b93fc],#bg93 [data-b93fm],#bg93 [data-b93gen],#bg93 [data-b93gpt]');if(!t)return;e.preventDefault();e.stopPropagation();
 const ds=t.dataset;
 if(ds.b93x!=null){document.getElementById('bg93').close();return}
 if(ds.b93del){if(!confirm('למחוק את הרקע הזה?'))return;SET.bgx=(SET.bgx||[]).filter(x=>x.k!=ds.b93del);delete BGS[ds.b93del];if(ST.bg==ds.b93del)setBg('s_parch');else{saveSet();paintDlg()}return}
 if(ds.b93bg){setBg(ds.b93bg);return}
 if(ds.b93fc){SET.fr93=Object.assign(frCfg(),{c:ds.b93fc});saveSet();frPlace();paintDlg();return}
 if(ds.b93fm){SET.fr93=Object.assign(frCfg(),{m:ds.b93fm});saveSet();frPlace();paintDlg();return}
 if(ds.b93gen!=null){gen();return}
 if(ds.b93gpt!=null){const txt=GPTBG((document.getElementById('b93t')?.value||'').trim());try{await navigator.clipboard.writeText(txt);msg('✓ הפרומפט הועתק. מדביקים ב-GPT, ואת התמונה שיוצאת מעלים ב"📷 תמונה שלי כרקע".')}catch(_){msg(txt)}return}},true);
document.addEventListener('change',async e=>{if(e.target.id!='b93f'||!e.target.files[0])return;const f=e.target.files[0];e.target.value='';msg('שומרת את התמונה…');
 const n=(document.getElementById('b93t')?.value||'').trim()||'תמונה שלי';const k=await keep(n,f,null);if(k)msg('✓ התמונה היא הרקע עכשיו, ונשמרה ב"הרקעים שלי".')});
// open it from "⋯ עוד" (the old 🎨 רקע list) and from a 🖼 button next to 🔍
window.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#sbgbtn')){e.preventDefault();e.stopImmediatePropagation();openDlg()}},true);
function bgBtn(){const s=document.querySelector('#studio .sside');if(s&&!s.querySelector('#sbg93'))(s.querySelector('#smag91')||s.firstChild)?.insertAdjacentHTML('afterend','<button id="sbg93" title="רקע ומסגרת">🖼</button>')}
setInterval(()=>{if(document.getElementById('studio')?.open)bgBtn()},700);
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#sbg93')){e.preventDefault();e.stopPropagation();openDlg()}},true);
}
