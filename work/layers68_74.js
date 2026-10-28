// v68–v74 layers: merged in v84 from v68.js, new69.js, rule70.js, design71.js, fix72.js, design73.js, edit74.js – same order, same content. New changes go in a new file at the end.
// ===== v68 (2026-10-21): studio audit – bug fixes and upgrades. Numbers refer to /closet/audit_v68/findings.md =====
// ---- A. one renderer for "📤 תמונה של הלוק" and "🖼 כל התנוחות": draws exactly the layers on the stage (jewelry parts, neck overlay, slant, mirror, masks)
function parseTf(tr){tr=tr||'';const g=(re,d)=>{const m=tr.match(re);return m?+m[1]:d};return {r:g(/rotate\(([-\d.]+)deg\)/,0),fl:/scaleX\(-1\)/.test(tr),sx:g(/(?:^|\s)scale\(([-\d.]+),/,1),sy:g(/(?:^|\s)scale\([-\d.]+,\s*([-\d.]+)\)/,1),k:g(/skewX\(([-\d.]+)deg\)/,0),ty:/translate\(-50%,\s*0(?:px|%)?\)/.test(tr)?0:-.5}}
async function drawStageTo(x,box,ox,oy,pw,ph){const mir=!!box.querySelector('.mirw');const els=[...box.querySelectorAll('img.sb,img.sh,img.sl:not(.ghost)')].filter(el=>el.style.display!='none'&&!el.classList.contains('hide')).sort((a,b)=>(+a.style.zIndex||0)-(+b.style.zIndex||0));
 x.save();if(mir){x.translate(ox+pw,oy);x.scale(-1,1);x.translate(-ox,-oy)}
 for(const el of els){const im=await ldImg(el.src);if(!im)continue;
  if(el.classList.contains('sb')){const s=Math.min(pw/im.width,ph/im.height);x.drawImage(im,ox+(pw-im.width*s)/2,oy+(ph-im.height*s)/2,im.width*s,im.height*s);continue}
  if(el.classList.contains('sh')||el.classList.contains('nkov')){x.drawImage(im,ox,oy,pw,pw*im.height/im.width);continue}
  const L=parseFloat(el.style.left)||0,T=parseFloat(el.style.top)||0,Wp=parseFloat(el.style.width)||0;if(!Wp)continue;const w=Wp/100*pw,h=w*im.height/im.width;const t=parseTf(el.style.transform);
  x.save();x.translate(ox+L/100*pw,oy+T/100*ph);x.rotate(t.r*Math.PI/180);if(t.fl)x.scale(-1,1);x.scale(t.sx,t.sy);x.transform(1,0,Math.tan(t.k*Math.PI/180),1,0,0);
  const mk=el.style.webkitMaskImage||el.style.maskImage||'';const m=mk.match(/ellipse ([\d.]+)% ([\d.]+)% at ([\d.]+)%? ([\d.]+)%?/);
  if(m){const c=document.createElement('canvas');c.width=Math.max(1,Math.round(w));c.height=Math.max(1,Math.round(h));const y=c.getContext('2d');y.drawImage(im,0,0,c.width,c.height);y.globalCompositeOperation='destination-out';y.beginPath();y.ellipse(+m[3]/100*c.width,+m[4]/100*c.height,+m[1]/100*c.width*.97,+m[2]/100*c.height*.97,0,0,Math.PI*2);y.fill();x.drawImage(c,-w/2,t.ty*h,w,h)}
  else x.drawImage(im,-w/2,t.ty*h,w,h);x.restore()}
 x.restore()}
window.drawStageTo=drawStageTo;
p5DrawBox=function(x,box,ox,oy,pw,ph){return drawStageTo(x,box,ox,oy,pw,ph)};
exportStudio=async function(){if(!ST)return;const st=$('#sstage');if(!st)return;const W=1080,SH=Math.round(W*1365/399),H=SH+140;const cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');
 const [c1,c2]=(BGS[ST.bg]||BGS.studio)[2];const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,c1);g.addColorStop(1,c2);x.fillStyle=g;x.fillRect(0,0,W,H);
 toast('מכינה תמונה…');try{await drawStageTo(x,st,0,0,W,SH)}catch(e){toast('לא הצלחתי לצייר את הלוק');return}
 x.fillStyle='rgba(255,255,255,.85)';x.fillRect(0,H-140,W,140);x.fillStyle='#2d211b';x.textAlign='center';x.direction='rtl';x.font='bold 46px Heebo, sans-serif';x.fillText(ST.name||'הלוק שלי',W/2,H-80);x.font='30px Heebo, sans-serif';x.fillText((OCC[ST.occ]||'')+' · '+new Date(ST.date).toLocaleDateString('he-IL'),W/2,H-32);
 const blob=await new Promise(r=>cv.toBlob(r,'image/jpeg',.9));try{const dl=await claude.use('downloads');if(!dl){toast('שמירה לא זמינה כאן');return}await dl.save({filename:(ST.name||'לוק')+'.jpg',data:blob});toast('התמונה נשמרה')}catch(e){toast(e.code=='declined'?'בוטל':'לא הצלחתי לשמור')}};
// ---- B. a look rendered for another view (album, "כל התנוחות", compare) used the STUDIO's current view when choosing the picture (front/back cut, tie) – render with the look's own view
{const _si=stageInner;stageInner=async function(S,opt={}){if(ST&&S!==ST&&S.view!=null&&S.view!=ST.view){const prev=ST.view;ST.view=S.view;try{return await _si(S,opt)}finally{ST.view=prev}}return _si(S,opt)}}
// ---- C. "👗 למדוד על האווטאר" from an item opened inside the studio ADDS the item to the current look (it used to throw the whole look away)
{const _os=openStudio;openStudio=async function(look,items){if(!look&&items&&ST&&$('#studio').open&&lookIds(ST).length){const ent=Object.entries(items).filter(([k,id])=>D[id]);if(ent.length){if($('#dlg').open)$('#dlg').close();let n=0;for(const [k,id] of ent){const slot=k.replace(/2$/,'');if(SLOTS.some(s=>s[0]==slot)){await setItem(slot,id);n++}}if(n){toast('✓ נוסף ללוק שעל הדמות');return}}}return _os(look,items)}}
// ---- D. unsaved changes: a red dot on 💾, and "לוק חדש" / ✕ ask once before throwing the look away
let HSAVE=0,SNEW_ARM=0;function isDirty(){return !!(ST&&$('#studio')&&$('#studio').open&&HIST.length!=HSAVE&&lookIds(ST).length)}
function dirtyPaint(){const b=$('#ssv');if(b)b.classList.toggle('dirty',isDirty())}
{const _os=openStudio;openStudio=async function(...a){const r=await _os(...a);HSAVE=HIST.length;dirtyPaint();return r}}
{const _dsv=doSave;doSave=async function(...a){const r=await _dsv(...a);HSAVE=HIST.length;dirtyPaint();return r}}
{const _ds=drawStudio;drawStudio=async function(...a){const r=await _ds(...a);try{dirtyPaint()}catch(_){}return r}}
function closeStudioGuard(k){if(!isDirty())return false;if(Date.now()-SNEW_ARM<6000){SNEW_ARM=0;return false}SNEW_ARM=Date.now();toast(k=='new'?'יש שינויים שלא נשמרו. 💾 שמירה – או לחצי שוב על "לוק חדש" כדי להתחיל בלי לשמור':'יש שינויים שלא נשמרו. 💾 שמירה – או לחצי שוב על ✕ כדי לצאת בלי לשמור');return true}
window.closeStudioGuard=closeStudioGuard;
try{$('#studio').addEventListener('cancel',e=>{if(closeStudioGuard('close'))e.preventDefault()})}catch(_){}
// ---- E. drag never saves a jewelry part as the item's "fit" (that memory is for garments)
{const _sf=saveFit;saveFit=function(slot){if(slot=='jewelry')return;return _sf.apply(this,arguments)}}
// ---- F. a dragged layer cannot be lost outside the stage
document.addEventListener('pointermove',e=>{try{if(typeof PG=='undefined'||!PG||PTR.size>1||!ST)return;const tf=ST.tf[PG.slot];if(!tf)return;let c=false;if(tf.x<-25){tf.x=-25;c=true}if(tf.x>125){tf.x=125;c=true}if(tf.y<-25){tf.y=-25;c=true}if(tf.y>125){tf.y=125;c=true}if(c){PG.el.style.left=tf.x+'%';PG.el.style.top=tf.y+'%'}}catch(_){}});
// ---- G. two fingers on the background = zoom of the stage (there was only the mouse wheel and ＋/－)
const ZP2=new Map();let ZG2=null;
document.addEventListener('pointerdown',e=>{try{if(!ST||!$('#studio').open)return;const st=e.target.closest&&e.target.closest('#sstage');if(!st||e.target.closest('img.sl'))return;ZP2.set(e.pointerId,{x:e.clientX,y:e.clientY});if(ZP2.size==2){const [a,b]=[...ZP2.values()];ZG2={d0:Math.max(10,Math.hypot(a.x-b.x,a.y-b.y)),z0:stageZ()};if(typeof SDR!='undefined')SDR=null}}catch(_){}},true);
document.addEventListener('pointermove',e=>{try{if(!ZG2||!ZP2.has(e.pointerId))return;ZP2.set(e.pointerId,{x:e.clientX,y:e.clientY});if(ZP2.size<2)return;const [a,b]=[...ZP2.values()];const z=ZG2.z0*Math.hypot(a.x-b.x,a.y-b.y)/ZG2.d0;if(Math.abs(z-stageZ())>=.08)zoomTo(z)}catch(_){}},true);
{const zend=e=>{ZP2.delete(e.pointerId);if(ZP2.size<2)ZG2=null};document.addEventListener('pointerup',zend,true);document.addEventListener('pointercancel',zend,true)}
// ---- H. "📐 התאימי לגוף": stretch / shrink the garment so its shoulders (or the skirt's waist) are as wide as the avatar's, and centre it
// torso width at the waistband row (px of the 399-wide frame), measured on the base pictures
const FIT_WAIST={p5:{front:{w:165,cx:200},back:{w:165,cx:200},side:{w:115,cx:215},half:{w:150,cx:205},hip:{w:145,cx:148}},long:185,short:160};
async function fitToBody(slot){const tf=ST&&ST.tf[slot],id=ST&&ST.items[slot];if(!tf||!id)return false;const el=$(`#sstage img.sl[data-slot="${slot}"]`);if(!el)return false;const im=await ldImg(el.src);if(!im||!im.width)return false;
 const base=ST.avbase||'long',v=ST.view||'front';const isSk=slot=='skirt';const W=120,H=Math.max(2,Math.round(W*im.height/im.width));const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0,W,H);const d=x.getImageData(0,0,W,H).data;
 const row=y=>{let a=-1,b=-1;for(let i=0;i<W;i++)if(d[(y*W+i)*4+3]>90){if(a<0)a=i;b=i}return a<0?null:[a,b]};
 let y0=0;while(y0<H&&!row(y0))y0++;let y1=H-1;while(y1>0&&!row(y1))y1--;if(y1<=y0+2)return false;const h=y1-y0+1;
 let r=null;if(isSk){r=row(y0+Math.round(h*.03))||row(y0+Math.round(h*.06))}else{let mx=0;for(let y=y0;y<y0+h*.45;y++){const q=row(y);if(q&&q[1]-q[0]>mx)mx=q[1]-q[0]}let y=y0;while(y<y0+h*.45){const q=row(y);if(q&&q[1]-q[0]>=.7*mx){r=q;break}y++}}
 if(!r)return false;const gw=(r[1]-r[0]+1)/W,gcx=(r[0]+r[1]+1)/2/W-.5;
 let bw,bcx;const WA=FIT_WAIST[base]||FIT_WAIST.long;const wa=typeof WA=='object'?(WA[v]||WA.front):{w:WA,cx:200};if(isSk){bw=wa.w/399*1.04;bcx=wa.cx/399}else if(base=='p5'){const B=P5BODY[v]||P5BODY.front;bw=B.sh[1]/399*1.08;bcx=B.sh[0]/399}else{const B=BASES[base]||BASES.long;bw=B.sh[1]*1.07;bcx=.5}
 const cur=(tf.w/100)*(tf.sx||1)*gw;if(cur<=0)return false;const sx=Math.max(.5,Math.min(2.4,(tf.sx||1)*bw/cur));
 pushH();tf.sx=Math.round(sx*100)/100;tf.x=Math.round((bcx-gcx*(tf.w/100)*tf.sx)*1000)/10;const keep=SSEL;await drawStudio();SSEL=keep;paintSel();return true}
window.fitToBody=fitToBody;
const FITB_SLOTS=['dress','top','skirt','set','outer'];
{const _ps=paintSel;paintSel=function(){_ps();try{const c=$('#ssel');if(!c||!ST||!SSEL||!FITB_SLOTS.includes(SSEL)||!ST.items[SSEL])return;const sb=c.querySelector('.sbtns');if(sb&&!sb.querySelector('[data-fitb]'))sb.insertAdjacentHTML('afterbegin',`<button data-fitb title="מותחת או מכווצת את הבגד לרוחב הכתפיים / המותן של הדמות">📐 התאימי לגוף</button>`)}catch(_){}}}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#ssel [data-fitb]');if(!b||!ST||!SSEL)return;e.preventDefault();e.stopPropagation();const ok=await fitToBody(SSEL);toast(ok?(SSEL=='skirt'?'📐 המותן הותאמה לרוחב הגוף. "↺ למקום" מבטל':'📐 הכתפיים הותאמו לרוחב הגוף. "↺ למקום" מבטל'):'לא הצלחתי למדוד את הבגד')},true);
// ---- I. jewelry: buttons that do nothing for parts (היפוך / עם רקע / קדימה / אחורה / חולצה) are hidden; the mouse wheel over a part changes that part's size
{const _ps=paintSel;paintSel=function(){_ps();try{if(!ST||SSEL!='jewelry')return;const id=ST.items.jewelry;if(!id||!jwOf(id))return;['flip','raw','up','down','tuck'].forEach(a=>{const b=document.querySelector(`#ssel [data-sa="${a}"]`);if(b)b.classList.add('hide')})}catch(_){}}}
let JWWT=null;document.addEventListener('wheel',e=>{try{const l=e.target.closest&&e.target.closest('#sstage img.jwp');if(!l||!ST||!ST.tf.jewelry)return;e.preventDefault();e.stopPropagation();const tf=ST.tf.jewelry;const k=l.dataset.jwk;tf.jps=tf.jps||{};tf.jps[k]=Math.max(.3,Math.min(3,(tf.jps[k]||1)*(e.deltaY<0?1.06:.94)));tf.jsel=k;
 document.querySelectorAll('#sstage img.jwp[data-jwk="'+k+'"]').forEach(el=>{const o=((tf.jo||{})[ST.view||'front']||{})[k]||{};el.style.width=(parseFloat(el.dataset.bw)/(((tf.jps0||{})[k])||1)*(o.s||1)*tf.jps[k])+'%'});
 clearTimeout(JWWT);JWWT=setTimeout(async()=>{const keep='jewelry';SSEL=keep;await drawStudio();SSEL=keep;paintSel()},300)}catch(_){}},{passive:false,capture:true});
// ---- J. notes on the stage ("תצוגה משוערת", "אין עדיין גזירה") no longer cover the face or the 360° pill: they stack above the pill
{const _ds=drawStudio;drawStudio=async function(...a){const r=await _ds(...a);try{stackNotes()}catch(_){}return r}}
function stackNotes(){const st=$('#sstage');if(!st)return;let b=52;[...st.querySelectorAll('.p5note')].forEach(n=>{n.style.top='auto';n.style.bottom=b+'px';b+=n.offsetHeight+6})}
// ---- K. "✨ השלימי לי" places skirts / dresses with the body-width default of the old bases and puts a top under a dress, like a manual pick
{const _af=autoFill;autoFill=async function(){await _af();try{if((ST.avbase||'long')!='p5')for(const s of ['skirt','dress','set'])if(ST.tf[s]&&ST.tf[s].sx==null)ST.tf[s].sx=1.25;layerOrder('top');await drawStudio()}catch(_){}}}
// ---- L. drawer tiles show the item's name, not only the price
{const _fd=fillDrawer;fillDrawer=async function(){const r=await _fd.apply(this,arguments);try{document.querySelectorAll('#dgrid .di').forEach(t=>{if(t.querySelector('.dn'))return;const id=t.dataset.dpick;const x=D[id];if(!x)return;const dm=t.querySelector('.dm');const h=`<span class="dn" title="${esc(x.short)}">${esc((x.short||'').slice(0,26))}</span>`;if(dm)dm.insertAdjacentHTML('beforebegin',h);else t.insertAdjacentHTML('beforeend',h)})}catch(_){}return r}}
// ---- M. tapping the look's name opens the save window (rename)
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#studio #sname');if(!t||!ST)return;e.preventDefault();e.stopPropagation();if(!lookIds(ST).length){toast('קודם בוחרים בגדים, אחר כך נותנים שם');return}saveStudio()},true);
// ---- N. "❓ איך זה עובד" in the ⋯ menu – one line per button
const SHELP=[['חזית · צד · גב · חצי צד · יד על המותן','התנוחה של הדמות. ▶ סיבוב 360° מסובב לבד; גרירה על הרקע מסובבת ביד'],['המשבצות למטה (שמלה, חולצה, חצאית…)','לחיצה פותחת את הארון של המשבצת. ✕ האדום מסיר את הבגד'],['לחיצה על בגד בבמה','בוחרת אותו: גודל, סיבוב, רוחב, גובה ואלכסון בסרגל למעלה. גרירה מזיזה, צביטה מגדילה, גלגלת העכבר גם'],['📐 התאימי לגוף','מותחת או מכווצת את הבגד לרוחב הכתפיים (חצאית: המותן) של הדמות וממרכזת אותו'],['⬆ קדימה · ⬇ אחורה','מי מעל מי. 👕 חולצה בפנים / בחוץ מכניסה או מוציאה את החולצה מהחצאית'],['👤 צוואר מעל','לחולצה פתוחה: הצוואר נשאר גלוי מעל הבגד (באווטאר החדש)'],['🙈 הסתירי · 🔒 נעילה · ↺ למקום · 🗑 הסירי','להחביא בלי להסיר; לנעול מפני גרירה; לחזור למקום האוטומטי; להוריד מהדמות'],['💎 תכשיטים','לחיצה על שרשרת / עגיל / צמיד בוחרת אותו, ו"גודל" משנה רק אותו. ➖ ➕ לכל חלק. גרירה מזיזה כל חלק בנפרד'],['🧕 עם כיסוי · 💇 פאה','איך הראש נראה. 🧍 בסיס – על איזה אווטאר (חדש 5 תנוחות / ישן ארוך / ישן קצר)'],['✨ השלימי לי','ממלאת את מה שחסר בלוק לפי התאמת צבעים'],['💾 שמירה','שומרת את הלוק לאלבום. נקודה אדומה = יש שינויים שלא נשמרו. לחיצה על שם הלוק = שינוי שם'],['↶ ↷','ביטול וחזרה של כל פעולה'],['⋯ עוד','רקע, הפריטים בלוק, מה דעתך (Claude), תמונה של הלוק, הסירי הכל, לוק חדש'],['＋ －','זום על הבמה. גם צביטה בשתי אצבעות על הרקע. ↺ מחזיר לתצוגה רגילה'],['🖼 כל התנוחות','הלוק ב-5 התנוחות יחד, ושמירת תמונה אחת של כולן']];
try{SMORE.push(['shelp','❓ איך זה עובד','הסבר קצר על כל כפתור בבניית הלוק'])}catch(_){}
{const _os=openStudio;openStudio=async function(...a){const r=await _os(...a);try{if(!$('#shelp')){const b=document.createElement('button');b.id='shelp';b.hidden=true;$('#studio .stop').appendChild(b)}}catch(_){}return r}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#shelp');if(!t||!ST)return;e.preventDefault();e.stopPropagation();closeDrawer();
 $('#sdrawer').innerHTML=`<div class="dh"><b>❓ איך זה עובד</b><button class="x" id="dclose">✓ הבנתי</button></div><div class="shelp">${SHELP.map(([k,d])=>`<p><b>${k}</b><br>${d}</p>`).join('')}</div>`;$('#sdrawer').classList.add('open')},true);
// ---- O. toasts inside the studio sit under the toolbar (they covered the slot buttons on the phone)
document.head.insertAdjacentHTML('beforeend',`<style>
#studio .toast{inset-block-end:auto;inset-block-start:96px}
#ssv.dirty{position:relative}#ssv.dirty::after{content:'';position:absolute;top:-3px;inset-inline-end:-3px;width:11px;height:11px;border-radius:50%;background:#c62828;border:2px solid #fff}
#sdrawer .shelp{overflow:auto;padding:4px 14px 16px;font-size:.86rem;line-height:1.5}#sdrawer .shelp p{margin:0 0 9px;padding-bottom:7px;border-bottom:1px dashed var(--line)}#sdrawer .shelp b{color:var(--accent)}
#sdrawer .di .dn{display:block;font-size:.62rem;color:var(--muted);line-height:1.15;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;padding:0 4px}
#sstage .p5note{top:auto;bottom:52px}
@media (max-width:700px){#sinfo{padding:2px 8px;gap:3px 8px;font-size:.76rem;line-height:1.3}#sinfo .lscore{margin:0;padding:1px 8px;font-size:.72rem;display:inline-block;flex:none;line-height:1.4}#sinfo .lscore b{margin-inline-end:3px;letter-spacing:0}#ssug{padding:2px 8px;font-size:.74rem}#ssug .sg img{width:30px;height:38px}#ssug .ok{font-size:.74rem}}
</style>`);
// ---- P. generated looks ("✨ הרכיבי לי 3 לוקים") lost their "👗 לבניית לוק" button when looks2 replaced runGen – back
{const _rg=runGen;runGen=function(a){const r=_rg.apply(this,arguments);try{$$('#hlooks .look').forEach(l=>{const lb=l.querySelector('.lb');if(lb&&!lb.querySelector('[data-studio]'))lb.insertAdjacentHTML('afterbegin',`<button class="go" data-studio="g${l.dataset.i}">👗 לבניית לוק</button>`)})}catch(_){}return r}}
// ---- Q. a saved look kept a live reference to the studio's placements, so dragging after a save silently changed the album copy
{const _dsv=doSave;doSave=async function(...a){const r=await _dsv(...a);try{if(ST&&ST.id&&LOOKS[ST.id]&&LOOKS[ST.id].studio)LOOKS[ST.id].studio.tf=JSON.parse(JSON.stringify(ST.tf))}catch(_){}return r}}
// ---- R. draft: an unsaved look survives a reload / a closed app; "לוק חדש" starts clean
const DRAFTK='studio_draft';let DRT=null,SNEW_FRESH=0;
function draftSave(){try{if(!ST||!isDirty()){return}localStorage.setItem(DRAFTK,JSON.stringify({t:Date.now(),id:ST.id,name:ST.name,items:ST.items,tf:ST.tf,base:ST.base,bg:ST.bg,head:ST.head,avbase:ST.avbase,occ:ST.occ,view:ST.view}))}catch(_){}}
function draftClear(){try{localStorage.removeItem(DRAFTK)}catch(_){}}
{const _ds=drawStudio;drawStudio=async function(...a){const r=await _ds(...a);clearTimeout(DRT);DRT=setTimeout(draftSave,600);return r}}
{const _dsv=doSave;doSave=async function(...a){const r=await _dsv(...a);draftClear();return r}}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#snew,[data-smenu="snew"]'))SNEW_FRESH=Date.now()},true);
{const _os=openStudio;openStudio=async function(look,items){const fresh=Date.now()-SNEW_FRESH<3000;let d=null;if(!look&&!items&&!fresh){try{d=JSON.parse(localStorage.getItem(DRAFTK)||'null')}catch(_){}if(d&&(Date.now()-(d.t||0)>36e5*48||!d.items||!Object.values(d.items).some(id=>id&&D[id])))d=null}
 const r=await _os(look,items);if(fresh)draftClear();
 if(d){try{Object.assign(ST,{id:d.id||null,name:d.name||'',items:{},tf:d.tf||{},base:d.base||ST.base,bg:d.bg||ST.bg,head:d.head||'hair',avbase:d.avbase||ST.avbase,occ:d.occ||ST.occ,view:'front'});for(const [k,id] of Object.entries(d.items))if(id&&D[id]&&SLOTS.some(s=>s[0]==k))ST.items[k]=id;pushH();paintTop();await drawStudio();toast('המשכתי את הלוק שלא נשמר מהפעם הקודמת. "＋ לוק חדש" מתחיל נקי')}catch(_){}}
 return r}}
// ---- S. the tool strip names the garment that is selected, not only the slot
{const _ps=paintSel;paintSel=function(){_ps();try{const c=$('#ssel');if(!c||!ST||!SSEL||!ST.items[SSEL])return;const b=c.querySelector(':scope > b');const x=D[ST.items[SSEL]];if(b&&x&&!b.querySelector('.sn'))b.insertAdjacentHTML('beforeend',` <small class="sn" title="${esc(x.short)}">· ${esc((x.short||'').slice(0,18))}</small>`)}catch(_){}}}
// ---- T. the "no cut-out yet" note opens the garment's window with one tap
document.addEventListener('click',e=>{const n=e.target.closest&&e.target.closest('#sstage .rawnote');if(!n||!ST)return;e.preventDefault();e.stopPropagation();const id=n.dataset.id||[...Object.entries(ST.items)].filter(([s,i])=>i&&MAINSL.concat('jewelry').includes(s)).map(([s,i])=>i)[0];if(id)openItem(id)},true);
{const _ds=drawStudio;drawStudio=async function(...a){const r=await _ds(...a);try{document.querySelectorAll('#sstage .rawnote').forEach(n=>{if(n.querySelector('button'))return;n.style.cursor='pointer';n.insertAdjacentHTML('beforeend',' <button class="go" style="padding:2px 8px;font-size:.78rem">פתחי את הבגד</button>')})}catch(_){}return r}}
// ---- U. side / half-side / hand-on-hip: a garment without a GPT picture (the squeezed guess) can now be dragged and resized in that pose; the placement is kept per pose (tf.pv)
let APD=null;
document.addEventListener('pointerdown',e=>{try{const l=e.target.closest&&e.target.closest('#sstage img.sl.ap');if(!l||!ST)return;const tf=ST.tf[l.dataset.slot];if(!tf)return;APD={slot:l.dataset.slot,x:tf.x,y:tf.y,w:tf.w,r:tf.r||0,v:ST.view};tf.x=parseFloat(l.style.left);tf.y=parseFloat(l.style.top);tf.w=parseFloat(l.style.width)}catch(_){}},true);
document.addEventListener('pointerup',e=>{try{if(!APD||!ST||PTR.size>1)return;const tf=ST.tf[APD.slot];const a=APD;APD=null;if(!tf)return;tf.pv=tf.pv||{};tf.pv[a.v]={x:+(+tf.x).toFixed(2),y:+(+tf.y).toFixed(2),w:+(+tf.w).toFixed(2),r:tf.r||0};tf.x=a.x;tf.y=a.y;tf.w=a.w;tf.r=a.r;setTimeout(async()=>{const keep=SSEL;await drawStudio();SSEL=keep;paintSel()},0)}catch(_){}},true);
document.addEventListener('pointercancel',()=>{try{if(!APD||!ST)return;const tf=ST.tf[APD.slot];if(tf){tf.x=APD.x;tf.y=APD.y;tf.w=APD.w}APD=null}catch(_){}},true);
document.head.insertAdjacentHTML('beforeend','<style>#sstage .sl.ap{pointer-events:auto}#ssel > b .sn{font-weight:400;color:var(--muted);font-size:.74rem}</style>');

// ---- v69: the avatar sheet (for changing the avatar in GPT) moved from the removed item box to the ⋯ menu
try{SMORE.splice(SMORE.findIndex(([id])=>id=='shelp'),0,['ssheet','🧍 גיליון האווטאר','התמונה של הדמות ב-5 תנוחות – לשמור ולצרף ל-GPT כשרוצים לשנות את האווטאר'])}catch(_){}
{const _os9=openStudio;openStudio=async function(...a){const r=await _os9(...a);try{if(!$('#ssheet')){const b=document.createElement('button');b.id='ssheet';b.hidden=true;b.dataset.zoom='av/p5_sheet.jpg';$('#studio .stop').appendChild(b)}}catch(_){}return r}}

// ===== v69 (2026-10-21): a new home screen – app bar, dark hero with greeting + main actions, quick tiles,
// category photo tiles, returns strip; stats/summaries/progress moved into a "📊 פרטים נוספים" sheet;
// item dialog: store-search box folded. Visual language lives in new69.css (loaded last).
(function(){try{
const top=$('#top');if(!top||top.dataset.v69)return;top.dataset.v69=1;document.body.classList.add('v69');
const hr=new Date().getHours();const hi=hr<5?'לילה טוב':hr<12?'בוקר טוב':hr<17?'צהריים טובים':hr<21?'ערב טוב':'לילה טוב';
const N=Object.keys(D).length;
// --- 1. details sheet: everything that is "numbers" goes here
const sh=document.createElement('dialog');sh.id='more9';sh.className='sheet9';sh.dir='rtl';
sh.innerHTML='<div class="sh9h"><b>📊 פרטים נוספים</b><button type="button" class="x9" aria-label="סגירה">✕</button></div><div class="sh9b"></div>';
document.body.appendChild(sh);const shb=sh.querySelector('.sh9b');
[...top.querySelectorAll('p.stats')].forEach(p=>shb.appendChild(p));const pg=$('#prog');if(pg)shb.appendChild(pg);
[...top.querySelectorAll('details.sum')].forEach(d=>shb.appendChild(d));const ft=document.querySelector('p.foot');if(ft){const d=document.createElement('details');d.className='sum';d.innerHTML='<summary>איך חושב "שילמת בפועל"</summary>';d.appendChild(ft);shb.appendChild(d)}
sh.querySelector('.x9').addEventListener('click',()=>sh.close());sh.addEventListener('click',e=>{if(e.target===sh)sh.close()});
// --- 2. app bar
const h1=top.querySelector('h1');const bar=document.createElement('div');bar.className='h9bar';
bar.innerHTML='<div class="h9logo"><i aria-hidden="true">✦</i><span><b>הארון</b><small>של שרה'+(window.VER?'<em class="h236v" title="עודכן '+(window.VDATE||'')+'">גרסה '+window.VER+'</em>':'')+'</small></span></div><div class="h9act"></div>';   // v236 (Sara 27/10 "ליד הארון של שרה ... מספר גרסה, בקטן")
const act=bar.querySelector('.h9act');const bell=$('#bell'),hb=$('#helpb'),vr=$('#ver');
if(bell)act.appendChild(bell);if(hb){hb.textContent='?';hb.setAttribute('aria-label','איך משתמשים');act.appendChild(hb)}if(vr)act.appendChild(vr);
// --- 3. hero + quick tiles + categories
const hero=document.createElement('div');hero.className='h9hero';
hero.innerHTML=`<p class="h9hi">${hi}, שרה</p><h2 class="h9t">מה לובשים היום?</h2><p class="h9sub"><b>${N}</b> פריטים בארון<span class="h9retl"></span></p>
<div class="h9cta"><button type="button" class="h9b1" data-h9="studio"><i>👗</i>בניית לוק</button><button type="button" class="h9b2" data-h9="hub"><i>✨</i>הלוקים שלי</button></div>`;
const tiles=document.createElement('div');tiles.className='h9tiles';
tiles.innerHTML=`<button type="button" data-h9="ret"><i>⏰</i><b class="h9n" data-n="ret">0</b><span>להחזרה בקרוב</span></button>
<button type="button" data-h9="fav"><i>♥</i><b class="h9n" data-n="fav">0</b><span>מועדפים</span></button>
<button type="button" data-h9="rnd"><i>🎲</i><b class="h9x"></b><span>תפתיעי אותי</span></button>
<button type="button" data-h9="more"><i>📊</i><b class="h9x"></b><span>פרטים נוספים</span></button>`;
const cats=document.createElement('div');cats.className='h9sec';
const subs=[...document.querySelectorAll('.ctrl .subs a:not(.spec)')];
function thumbOf(sec){if(!sec)return null;const c=[...sec.querySelectorAll('.card')].find(c=>{const id=c.dataset.id;return (IT[id]||{}).img||(D[id]||{}).hi});return c?c.dataset.id:null}
cats.innerHTML=`<div class="h9head"><h3>הקטגוריות שלי</h3><button type="button" class="h9all" data-h9="all">הכל ←</button></div><div class="h9cats">${subs.map(a=>{const h=a.getAttribute('href');const sec=document.querySelector(h);const id=thumbOf(sec);const nm=(a.firstChild&&a.firstChild.textContent||'').trim();
 return `<button type="button" class="h9cat" data-h9cat="${h}">${id?`<span class="h9im"><img data-th="${id}" src="${img(id)||TPH}" alt="" loading="lazy"></span>`:'<span class="h9im h9e">👚</span>'}<b>${esc(nm)}</b><small data-cn="${h}">${(a.querySelector('span')||{}).textContent||''}</small></button>`}).join('')}</div>`;
const urg=$('#urgent'),rec=$('#recent');
h1.replaceWith(bar);bar.after(hero);hero.after(tiles);tiles.after(cats);if(urg)cats.after(urg);if(rec&&urg)urg.after(rec);
try{if(window.TH)thApply(TH)}catch(_){}
// --- 4. actions
const toCloset=()=>{window.zCloset&&zCloset();const c=document.querySelector('.ctrl');const y=c?c.getBoundingClientRect().top+scrollY-0:0;window.scrollTo({top:Math.max(0,($('#top').offsetHeight||y)-4),behavior:'smooth'})};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-h9],[data-h9cat]');if(!t)return;e.preventDefault();
 if(t.dataset.h9cat){const a=document.querySelector(`.ctrl .subs a[href="${t.dataset.h9cat}"]`);const g=a&&a.dataset.g;const gb=document.querySelector('.ctrl .groups button[data-g="all"]');if(gb&&gb.getAttribute('aria-pressed')!='true')gb.click();if(a)a.click();setTimeout(toCloset,60);return}
 const k=t.dataset.h9;
 if(k=='studio'){$('#studiobtn').click()}else if(k=='hub'){$('#hubbtn').click()}else if(k=='more'){sh.showModal()}else if(k=='rnd'){$('#rnd').click()}
 else if(k=='all'){const gb=document.querySelector('.ctrl .groups button[data-g="all"]');if(gb)gb.click();setTimeout(toCloset,60)}
 else if(k=='fav'){const f=$('#flf');f.value=f.value=='fav'?'':'fav';f.dispatchEvent(new Event('change'));toast(f.value?'♥ רק מועדפים':'מציגה הכל');setTimeout(toCloset,60)}
 else if(k=='ret'){const s=$('#sort');s.value=s.value=='ret'?'':'ret';s.dispatchEvent(new Event('change'));toast(s.value?'⏰ מסודר לפי זמן החזרה':'מיון רגיל');setTimeout(toCloset,60)}});
// --- 5. live numbers
function counts(){try{const ids=Object.keys(D);const fav=ids.filter(id=>(IT[id]||{}).fav).length;const u=document.querySelectorAll('#urgent .mini').length;
 const fn=tiles.querySelector('[data-n="fav"]'),rn=tiles.querySelector('[data-n="ret"]');if(fn)fn.textContent=fav;if(rn)rn.textContent=u;
 hero.querySelector('.h9retl').textContent=u?` · ${u} להחזרה בקרוב`:'';
 tiles.querySelector('[data-h9="fav"]').setAttribute('aria-pressed',$('#flf').value=='fav');tiles.querySelector('[data-h9="ret"]').setAttribute('aria-pressed',$('#sort').value=='ret');
 document.querySelectorAll('[data-cn]').forEach(s=>{const a=document.querySelector(`.ctrl .subs a[href="${s.dataset.cn}"] span`);if(a)s.textContent=a.textContent});
 const uh=document.querySelector('#urgent h3');if(uh&&!uh.dataset.v9){uh.dataset.v9=1;uh.innerHTML=`<span>⏰ כפולים להחזרה</span><small>הזמן נגמר בקרוב</small>`}}catch(_){}}
{const _ap=apply;apply=function(){const r=_ap.apply(this,arguments);counts();return r}}
new MutationObserver(counts).observe($('#urgent')||document.body,{childList:true});counts();
// --- 6. filter + sort = one bottom sheet (moved out of the sticky bar, which is now only search + filter)
const fb=$('#fb');if(fb&&!fb.querySelector('i'))fb.insertAdjacentHTML('afterbegin','<i aria-hidden="true">⚙︎</i>');
const pn=$('#panel');if(pn){(top.closest('[dir]')||document.body).appendChild(pn);pn.dir='rtl';pn.classList.add('pn9');
 const hd=document.createElement('div');hd.className='pn9h';hd.innerHTML='<b>סינון ומיון</b><button type="button" class="x9" aria-label="סגירה">✕</button>';pn.prepend(hd);
 const r=document.createElement('div');r.className='row pn9top';r.innerHTML='<label>מיון</label>';hd.after(r);
 const so=$('#sort'),sr=$('#src'),sz=document.querySelector('.ctrl .seg.sizes'),mic=$('#mic');if(so)r.appendChild(so);const l2=document.createElement('label');l2.textContent='חנות';r.appendChild(l2);if(sr)r.appendChild(sr);
 if(sz){const l3=document.createElement('label');l3.textContent='תמונות';r.appendChild(l3);r.appendChild(sz)}
 hd.querySelector('.x9').addEventListener('click',()=>fb.click());
 const bd=document.createElement('div');bd.className='pn9bd';document.body.appendChild(bd);bd.addEventListener('click',()=>fb.click())}
}catch(e){(window.ERRS=window.ERRS||[]).push('v69home:'+e.message)}})();
// ---- item dialog: store search folded (it filled half the screen)
{const _ao9=afterOpen;afterOpen=function(id){_ao9(id);try{const r=document.querySelector('#dlbody .srchrow');if(r&&!r.closest('details.srch9')){const d=document.createElement('details');d.className='srch9';d.innerHTML=`<summary>🔎 למצוא את המוצר ב${(D[id]||{}).src=='sh'?'שיין':'טמו'}</summary>`;r.before(d);d.appendChild(r)}}catch(_){}}}

// ===== v70 (2026-10-21) avatar rules + fixes from Sara =====
// A. "חוק בל יעבור": the avatar shows ONLY pictures Sara uploaded for the avatar (5-pose garment sheets p5g/p5gv, tichel ties, jewelry parts, cutimg/cutback).
//    Never a closet/product photo, never a background the site removed itself (cut/*.json, gpt/ folder, pics, raw).
// B. p5g pictures: label leftovers above the garment are wiped at runtime, and the garment is fitted to the body (shoulder line, width, centre) per pose.
// C. Drawer: no prices, bigger pictures; packs show one tile per colour (variant) with a colour name.
// D. Head covering: the scarf slot is never locked; choosing a covering switches the head to "with covering".
const BODYW={"front":{"y0":240,"s":4,"r":[[160,241],[160,241],[160,241],[160,242],[159,243],[158,245],[156,247],[152,250],[148,255],[141,262],[133,268],[125,276],[116,284],[81,314],[74,329],[68,333],[63,337],[57,342],[55,346],[53,348],[51,350],[50,351],[49,352],[48,353],[48,353],[47,354],[46,356],[45,356],[44,357],[43,358],[42,359],[42,359],[40,359],[40,360],[40,361],[39,361],[39,361],[37,362],[37,362],[37,362],[37,362],[37,362],[37,362],[37,362],[37,362],[38,362],[39,362],[39,362],[39,362],[39,362],[39,362],[39,362],[39,362],[39,362],[39,362],[39,362],[40,362],[40,361],[40,361],[40,361],[40,361],[40,361],[40,361],[40,361],[40,361],[40,361],[40,362],[40,362],[39,363],[37,364],[36,364],[35,366],[34,367],[33,368],[33,369],[31,369],[31,370],[31,370],[31,370],[31,370],[31,370],[30,371],[29,372],[29,372],[29,372],[29,372],[29,372],[28,372],[28,372],[28,373],[28,373],[28,373],[28,373],[28,372],[28,372],[28,372],[28,372],[28,372],[28,372],[29,372],[29,372],[29,372],[29,372],[29,370],[30,370],[31,370],[31,370],[31,370],[31,370],[31,370],[31,370],[31,370],[31,370],[30,370],[29,370],[28,372],[28,372],[28,373],[29,372],[29,371],[29,370],[29,370],[29,370],[29,370],[28,372],[28,372],[27,372],[26,373],[26,373],[26,374],[25,375],[25,375],[23,375],[22,376],[22,376],[24,376],[27,374],[29,371],[31,369],[32,368],[33,368],[36,365],[38,363],[41,361],[46,358],[53,350],[59,343],[66,335],[81,322],[82,319],[83,317],[84,316],[86,314],[87,314],[88,312],[89,311],[90,309],[92,309],[93,308],[93,307],[95,306],[95,305],[96,305],[96,303],[98,303],[98,303],[97,303],[97,303],[98,303],[98,302],[102,298],[106,294],[107,294],[107,292],[108,292],[109,292],[109,292],[109,292],[109,291],[110,291],[110,291],[110,291],[110,290],[111,289],[112,289],[111,289],[110,290],[110,291],[109,291],[109,291],[107,292]]},"side":{"y0":240,"s":4,"r":[[173,262],[177,263],[179,264],[182,267],[184,269],[185,271],[187,273],[188,274],[188,278],[190,280],[191,281],[190,282],[189,284],[185,285],[180,287],[178,289],[174,290],[170,292],[169,293],[167,293],[163,295],[160,295],[158,295],[154,295],[151,296],[147,296],[145,296],[141,296],[137,296],[134,296],[130,296],[126,296],[122,296],[118,296],[114,296],[110,296],[106,295],[102,295],[99,294],[96,293],[93,292],[91,291],[89,290],[88,288],[87,287],[86,285],[86,285],[86,284],[86,282],[87,281],[88,281],[89,279],[90,278],[92,276],[94,275],[97,274],[100,273],[103,273],[105,271],[105,270],[107,270],[108,270],[108,268],[108,266],[108,265],[108,265],[108,263],[109,262],[110,261],[111,262],[111,260],[111,259],[112,260],[113,260],[113,259],[113,259],[113,259],[113,259],[112,259],[111,259],[110,262],[111,263],[112,263],[113,263],[111,265],[111,267],[111,268],[110,270],[109,273],[109,275],[108,277],[108,279],[108,281],[108,283],[109,285],[109,289],[110,292],[111,293],[112,296],[113,298],[114,301],[115,303],[116,305],[117,307],[119,309],[120,310],[123,311],[122,312],[121,312],[120,313],[118,313],[116,314],[115,314],[114,315],[112,314],[111,314],[109,314],[108,313],[106,312],[106,311],[105,310],[104,309],[101,307],[99,305],[97,303],[97,301],[97,299],[96,296],[94,293],[92,290],[91,288],[89,287],[88,285],[86,285],[84,283],[83,282],[83,281],[84,281],[84,281],[84,281],[84,281],[84,280],[85,279],[86,280],[87,281],[91,281],[95,281],[99,281],[104,281],[115,281],[123,281],[130,281],[131,281],[132,281],[133,281],[135,281],[135,281],[136,281],[138,281],[139,281],[140,281],[141,280],[142,280],[143,281],[144,281],[144,281],[144,281],[144,279],[144,275],[144,274],[144,274],[145,274],[147,276],[151,276],[160,276],[160,276],[161,276],[162,276],[163,278],[163,278],[166,278],[165,278],[165,278],[165,279],[168,279],[169,280],[170,281],[172,283],[174,284],[174,286],[175,287]]},"back":{"y0":240,"s":4,"r":[[157,242],[157,242],[155,244],[151,247],[145,252],[141,258],[127,267],[120,273],[107,282],[89,293],[73,318],[63,330],[58,333],[54,338],[49,342],[46,346],[44,348],[42,350],[41,351],[41,353],[39,354],[39,355],[38,356],[37,356],[36,358],[35,359],[34,359],[33,361],[33,362],[32,362],[32,364],[31,364],[30,364],[30,365],[28,365],[28,366],[28,367],[28,367],[28,368],[28,369],[27,369],[27,369],[27,369],[27,369],[27,369],[28,369],[28,369],[27,369],[28,369],[28,369],[28,369],[28,368],[28,367],[29,367],[30,367],[30,365],[30,365],[31,365],[32,365],[32,365],[32,364],[32,364],[32,364],[32,364],[32,363],[32,364],[31,364],[30,364],[29,365],[28,366],[27,367],[27,368],[25,369],[25,369],[25,370],[25,370],[25,370],[25,370],[25,370],[24,370],[24,370],[24,371],[24,372],[24,372],[24,372],[24,372],[24,372],[24,373],[24,373],[24,373],[24,372],[24,372],[24,372],[24,372],[24,372],[25,372],[25,371],[25,370],[26,370],[27,370],[27,369],[28,369],[28,369],[28,367],[29,367],[30,367],[30,367],[30,366],[31,365],[32,365],[32,365],[32,365],[31,365],[30,366],[30,367],[30,367],[30,367],[32,365],[33,364],[33,364],[33,364],[33,364],[33,364],[33,364],[32,365],[32,365],[32,365],[32,365],[32,365],[31,367],[30,367],[30,367],[32,366],[34,364],[35,363],[36,362],[37,361],[38,360],[40,359],[43,357],[46,354],[52,349],[57,343],[66,337],[70,329],[76,323],[77,322],[77,320],[79,319],[80,319],[81,317],[83,316],[83,315],[85,314],[85,313],[86,312],[88,311],[88,309],[89,309],[90,308],[91,308],[92,307],[92,306],[93,306],[93,306],[93,306],[94,305],[94,304],[95,302],[99,300],[99,299],[100,298],[100,298],[100,298],[102,297],[102,297],[102,297],[102,297],[102,297],[102,297],[102,297],[103,296],[103,295],[103,295],[103,295],[105,295],[104,295],[103,295],[103,297],[103,297],[102,297]]},"half":{"y0":240,"s":4,"r":[[176,260],[177,260],[179,263],[179,265],[180,268],[182,272],[182,277],[183,283],[183,287],[184,293],[185,298],[185,302],[185,306],[184,310],[178,313],[173,316],[155,318],[148,320],[142,321],[139,322],[134,324],[130,325],[127,325],[126,327],[125,327],[124,328],[124,329],[124,330],[124,330],[124,332],[124,333],[123,333],[122,333],[120,332],[119,330],[116,330],[113,330],[110,331],[106,331],[103,330],[100,331],[97,331],[95,330],[92,330],[91,330],[89,330],[88,329],[88,329],[88,329],[88,329],[88,327],[88,327],[89,327],[90,326],[92,325],[94,325],[96,324],[99,324],[103,323],[107,322],[111,322],[113,321],[114,321],[114,319],[114,319],[114,318],[114,318],[116,316],[117,316],[117,315],[119,314],[119,314],[119,314],[120,314],[121,313],[121,312],[121,310],[120,308],[118,308],[116,306],[116,305],[114,304],[113,303],[113,302],[113,300],[111,299],[111,299],[110,297],[110,296],[109,297],[108,295],[107,295],[106,293],[106,293],[105,293],[105,296],[104,297],[103,299],[103,301],[102,304],[100,305],[99,308],[98,310],[97,312],[96,313],[94,315],[92,316],[91,318],[91,319],[89,321],[89,321],[87,322],[86,322],[85,322],[85,322],[85,322],[84,322],[83,322],[81,322],[80,322],[80,321],[78,321],[77,319],[75,319],[74,317],[72,316],[71,314],[69,313],[68,312],[66,310],[66,308],[66,305],[69,303],[70,299],[70,297],[72,295],[72,293],[74,291],[75,289],[78,288],[82,288],[85,286],[92,286],[96,286],[103,285],[103,285],[103,285],[103,285],[105,285],[105,285],[105,285],[105,285],[106,285],[106,284],[106,283],[107,283],[108,283],[108,283],[108,283],[108,283],[110,283],[110,282],[110,282],[110,282],[110,282],[110,282],[110,282],[111,281],[113,280],[113,279],[114,277],[114,277],[113,277],[116,277],[116,277],[114,277],[114,277],[117,277],[117,277],[117,277],[117,279],[117,279],[118,280],[121,280],[123,280],[126,280],[129,280],[132,281],[135,282],[137,283],[139,285]]},"hip":{"y0":240,"s":4,"r":[0,0,0,0,[136,162],[124,174],[116,182],[111,187],[106,191],[102,195],[99,199],[96,202],[94,204],[92,206],[90,207],[89,209],[88,209],[88,210],[88,210],[88,210],[88,211],[88,212],[88,212],[89,212],[89,212],[90,214],[91,214],[92,213],[92,212],[93,211],[95,210],[97,209],[98,208],[99,206],[101,205],[103,204],[105,204],[105,204],[106,205],[105,205],[104,204],[104,203],[105,192],[124,191],[125,191],[126,191],[126,192],[128,193],[128,194],[128,197],[128,200],[128,204],[127,209],[126,218],[122,225],[117,258],[110,263],[103,267],[91,273],[66,277],[62,282],[57,286],[52,289],[48,295],[46,299],[44,303],[44,307],[43,309],[43,312],[43,316],[42,319],[41,323],[41,326],[41,329],[40,332],[40,336],[40,340],[40,344],[40,348],[40,352],[39,356],[40,359],[40,363],[40,365],[40,368],[40,371],[40,374],[40,377],[39,380],[39,382],[39,385],[39,387],[39,390],[39,392],[39,393],[38,394],[37,395],[37,395],[37,395],[37,392],[36,387],[36,383],[35,378],[34,373],[32,368],[31,364],[30,360],[29,356],[28,352],[27,348],[26,343],[26,339],[25,334],[24,328],[24,321],[24,315],[23,309],[23,302],[22,294],[22,287],[22,280],[21,273],[21,267],[21,262],[21,252],[21,253],[21,254],[19,256],[19,257],[19,258],[19,260],[19,261],[19,262],[18,263],[18,265],[18,265],[18,266],[17,267],[17,267],[16,268],[14,270],[13,270],[13,270],[14,270],[14,271],[13,271],[13,271],[12,271],[11,270],[10,270],[9,270],[9,269],[7,268],[6,267],[6,266],[4,265],[4,265],[4,263],[7,261],[10,261],[10,259],[11,258],[14,257],[15,255],[18,254],[22,253],[29,252],[35,250],[41,249],[43,248],[43,248],[43,246],[43,246],[44,245],[44,244],[44,243],[44,243],[44,242],[44,241],[44,240],[45,239],[45,239],[45,237],[45,237],[45,237],[45,236],[46,235],[46,232],[48,232],[48,231],[48,231]]}};
function avIds(id){const it=IT[id]||{};const s=new Set();const walk=o=>{if(!o)return;if(typeof o=='string'){const m=o.match(/[0-9a-f]{32}/g);if(m)m.forEach(x=>s.add(x));if(/^blob:/.test(o))s.add(o);return}if(typeof o=='object')Object.values(o).forEach(walk)};
 walk([it.p5g,it.p5gv,it.ties,it.tie,it.jw,it.cutimg,it.cutback]);return s}
function avReady(id){return avIds(id).size>0}
window.avReady=avReady;
function srcAllowed(id,src){if(!src)return false;for(const k of avIds(id))if(src.includes(k))return true;return false}
// ---- B1. clean label leftovers from a p5g picture (same size, only stray specks above/below the garment are erased)
const CLN={},CLNO={};
function cleanP5(url,neck){const K=url+(neck?'|n':'');if(CLN[K])return CLN[K];return CLN[K]=(async()=>{const im=await ldImg(url);if(!im)return null;const W=im.naturalWidth,H=im.naturalHeight;const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);let d;try{d=x.getImageData(0,0,W,H)}catch(_){return null}
 const D8=d.data;const rm=new Array(H).fill(0);for(let y=0;y<H;y++){let n=0;for(let i=0;i<W;i++)if(D8[(y*W+i)*4+3]>30)n++;rm[y]=n}
 const gap=Math.max(3,Math.round(H*.015));const grp=[];let s=-1,e=-1,run=0;for(let y=0;y<H;y++){if(rm[y]>0){if(s<0)s=y;e=y;run=0}else if(s>=0){run++;if(run>=gap){grp.push([s,e]);s=-1;run=0}}}if(s>=0)grp.push([s,e]);
 let best=grp[0]||[0,H-1],bm=0;for(const g of grp){let m=0;for(let y=g[0];y<=g[1];y++)m+=rm[y];if(m>bm){bm=m;best=g}}
 let ch=false;for(let y=0;y<H;y++){if(y>=best[0]&&y<=best[1])continue;if(!rm[y])continue;for(let i=0;i<W;i++)D8[(y*W+i)*4+3]=0;rm[y]=0;ch=true}
 // v70: the back of the collar that GPT draws inside the neckline is cut away, so her own neck shows
 if(neck&&neckCut(D8,W,H,rm,best))ch=true;
 if(!ch)return {url,top:best[0]/H,bot:(best[1]+1)/H,rows:rm,W,H};
 x.putImageData(d,0,0);const bl=await new Promise(r=>c.toBlob(r,'image/png'));const u=URL.createObjectURL(bl);CLNO[u]=url;return {url:u,top:best[0]/H,bot:(best[1]+1)/H,rows:rm,W,H}})()}
function neckCut(D8,W,H,rm,best){let top=-1;for(let y=best[0];y<Math.min(H,best[0]+H*.2);y++){let n=0;for(let i=0;i<W;i++)if(D8[(y*W+i)*4+3]>128)n++;if(n>W*.05){top=y;break}}if(top<0)return false;
 let x0=-1,x1=-1;for(let i=0;i<W;i++)if(D8[(top*W+i)*4+3]>128){if(x0<0)x0=i;x1=i}let a=(x1-x0)/2;const cx=(x0+x1)/2;if(a>W*.3)a=(x1-x0)*.21;if(a<W*.08||a>W*.3)return false;
 const L=y=>{let t=0,n=0;const o=Math.round(a*.35);for(const c0 of [Math.round(cx)-o,Math.round(cx)+o])for(let i=c0-3;i<=c0+3;i++){const k=(y*W+i)*4;if(D8[k+3]>128){t+=D8[k]*.299+D8[k+1]*.587+D8[k+2]*.114;n++}}return n?t/n:-1};
 let bj=0,d=0;for(let i=8;i<a*1.6&&top+i+2<H;i++){const p=L(top+i-1),q=L(top+i+2);if(p<0||q<0)continue;const j=q-p;if(j>bj){bj=j;d=i+1}}
 if(bj<12||d<a*.22||d>a*1.5)return false;
 for(let y=Math.max(0,top-4);y<top+d+1&&y<H;y++){const dy=Math.max(0,y-top)/d;const ai=a*(.95-.07*dy);const r=1-dy*dy*dy;if(r<=0)continue;const hw=ai*Math.sqrt(r);for(let i=Math.max(0,Math.floor(cx-hw-1));i<=Math.min(W-1,Math.ceil(cx+hw+1));i++){const e=hw-Math.abs(i-cx);const k=(y*W+i)*4+3;if(e>=1)D8[k]=0;else if(e>0)D8[k]=Math.round(D8[k]*(1-e))}}
return true}
// row extents of a (cleaned) picture, at a given drawn width
async function rowsOf(url,wpx){const im=await ldImg(url);if(!im)return null;const W=Math.max(8,Math.round(wpx)),H=Math.max(8,Math.round(wpx*im.naturalHeight/im.naturalWidth));const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0,W,H);const d=x.getImageData(0,0,W,H).data;const R=[];for(let y=0;y<H;y++){let a=-1,b=-1;for(let i=0;i<W;i++)if(d[(y*W+i)*4+3]>60){if(a<0)a=i;b=i}R.push(a<0?null:[a,b])}return {W,H,R}}
function bodyAt(v,y){const t=BODYW[v];if(!t)return null;const i=Math.round((y-t.y0)/t.s);const r=t.r[i];return r||null}
const AF_TOP=['top','outer','set','dress','jacket','sweater'];const NECKS=['top','set','dress','sweater'];
// ---- B2. fit a p5g layer to the body in the current pose: shoulder (or waist) line, width, centre
// ctx (optional) = {id,tf,v,g}: fit a garment outside the studio (the 5-pose picture)
async function smartFit(slot,force,ctx){let id,tf,v,g;if(ctx){({id,tf,v,g}=ctx)}else{if(!ST||(ST.avbase||'long')!='p5')return false;id=ST.items[slot];tf=ST.tf[slot];if(!id||!tf)return false;g=p5gOfT(id,tf);v=ST.view||'front'}if(!g||!g[v])return false;
 const r0=await smartFit0(slot,force,id,tf,v,g);if(r0)sizeAdj(id,tf);return r0}
// her own correction on top of the automatic fit: size (top edge stays) and height, per garment, all poses
function sizeAdj(id,tf){const it=IT[id]||{};const f=+it.p5gs||1,dy=+it.p5gy||0;if(f==1&&!dy)return;const h=tf.w/100*399*(tf._asp||1.6)/1365*100;tf.w=Math.round(tf.w*f*10)/10;tf.y=Math.round((tf.y+h*(f-1)/2+dy)*10)/10}
async function smartFit0(slot,force,id,tf,v,g){
 const url=p5gUrl(g,v);const cl=await cleanP5(url,(v=='front'||v=='half')&&NECKS.includes(slot)&&!tf.nocut);const use=cl&&cl.url||url;const isSk=slot=='skirt';const B=P5BODY[v]||P5BODY.front;
 const wpx=tf.w/100*399;const ro=await rowsOf(use,wpx);if(!ro)return false;const sx=tf.sx||1,sy=tf.sy||1;
 const cy=tf.y/100*1365,cx=tf.x/100*399,top=cy-ro.H*sy/2;
 let gTop=-1;for(let r=0;r<ro.H;r++)if(ro.R[r]){gTop=r;break}if(gTop<0)return false;
 if(!isSk){
  // tops: try every size and height, keep the one whose outline matches her shoulders and chest best
  let bmx=0;const ys=[];for(let y=B.y.nk;y<=B.y.nk+124;y+=4){const q=bodyAt(v,y);if(q){ys.push([y,q[1]-q[0],(q[0]+q[1])/2]);bmx=Math.max(bmx,q[1]-q[0])}}
  const band=ys.filter(r=>r[1]>=bmx*.6);if(band.length<4)return false;let best=null;
  for(let k=0;k<=27;k++){const sc=.8+k*.02;for(let T=B.y.nk-70;T<=B.y.nk+70;T+=2){let c=0;for(const [y,bw] of band){const r=Math.round(gTop+(y-T)/sc);const q=r>=0&&r<ro.H?ro.R[r]:null;if(!q){c+=bw*bw*1.5;continue}const gw=(q[1]-q[0])*sc,d=gw-bw*1.03;c+=d<0?d*d*2:d*d}if(!best||c<best.c)best={c,sc,T}}}
  const sc=best.sc,T=best.T;const C=[];for(const [y,,bc] of band){const r=Math.round(gTop+(y-T)/sc);const q=r>=0&&r<ro.H?ro.R[r]:null;if(q)C.push(bc-(cx+((q[0]+q[1])/2-ro.W/2)*sc))}C.sort((p,q)=>p-q);const dc=C.length?C[C.length>>1]:0;
  const ny=(T-gTop*sc+ro.H*sc/2)/1365*100,nw=tf.w*sc,nx=tf.x+dc/399*100;
  const ch=true;
  tf.w=Math.round(nw*10)/10;tf.y=Math.round(ny*10)/10;tf.x=Math.round(nx*10)/10;tf.sx=1;tf._asp=ro.H/ro.W;return true}
 // skirts: waist line and waist width
 const line=gTop+2,bodyLine=B.y.wa-4;const dy=bodyLine-(top+line*sy);
 const S=[],C=[];for(let k=0;k<=24;k+=4){const r=Math.min(ro.H-1,line+Math.round(k/sy));const q=ro.R[r];if(!q)continue;const g0=cx+(q[0]-ro.W/2)*sx,g1=cx+(q[1]-ro.W/2)*sx;const wa=(FIT_WAIST.p5[v]||FIT_WAIST.p5.front);S.push(wa.w*1.04/Math.max(4,g1-g0));C.push(wa.cx-(g0+g1)/2)}
 if(!S.length)return false;S.sort((a,b)=>a-b);C.sort((a,b)=>a-b);const s=S[S.length>>1],dc=C[C.length>>1];
 let nsx=sx;if(s>1.03||s<.9)nsx=Math.max(.75,Math.min(1.45,sx*s));
 const ny=tf.y+dy/1365*100,nx=tf.x+dc/399*100;const ch=Math.abs(dy)>2||Math.abs(dc)>2||Math.abs(nsx-sx)>.02;
 if(!ch&&!force)return false;tf.y=Math.round(ny*10)/10;tf.x=Math.round(nx*10)/10;tf.sx=Math.round(nsx*100)/100;return true}
window.smartFit=smartFit;
// automatic: once per garment, pose and look – unless she already placed it herself in that pose
{const _ds=drawStudio;let busy=false;drawStudio=async function(...a){const r=await _ds.apply(this,a);if(busy||!ST||(ST.avbase||'long')!='p5')return r;busy=true;try{const v=ST.view||'front';let ch=false;
 for(const [slot,id] of Object.entries(ST.items)){if(!id||!(AF_TOP.includes(slot)||slot=='skirt'))continue;const tf=ST.tf[slot];if(!tf)continue;tf.af=tf.af||{};const k=v+':'+(tf.gv||'');if(tf.af[k])continue;tf.af[k]=1;if(tf.pvman&&tf.pvman[v])continue;try{if(await smartFit(slot))ch=true}catch(_){}}
 if(ch)await _ds.apply(this,a)}finally{busy=false}return r}}
// a drag by hand marks the pose as "placed by her" (no more automatic fitting there)
document.addEventListener('pointerup',()=>{try{if(!ST||!SSEL||!ST.tf[SSEL])return;if(document.querySelector('#sstage img.sl.sel')){const tf=ST.tf[SSEL];tf.pvman=tf.pvman||{};if(typeof PG!='undefined'&&PG)tf.pvman[ST.view||'front']=1}}catch(_){}},true);
// 📐 button: the smart fit for GPT pictures on the 5-pose avatar
{const _fb=window.fitToBody;if(_fb)window.fitToBody=fitToBody=async function(slot){if(ST&&(ST.avbase||'long')=='p5'&&p5gOfT(ST.items[slot],ST.tf[slot])){pushH();const tf=ST.tf[slot];tf.sx=1;const ok=await smartFit(slot,true);await drawStudio();toast(ok?'📐 הותאם לגוף בתנוחה הזו':'כבר מותאם');return ok}return _fb(slot)}}
// ---- A. the rule, applied to every stage (studio, album, compare, export)
{const _si=stageInner;stageInner=async function(S,opt={}){let html=await _si(S,opt);const miss=[];const subs=[];
 html=html.replace(/<img class="sl[^"]*"[^>]*>/g,tag=>{const sm=tag.match(/data-slot="([^"]*)"/);const slot=sm&&sm[1];const id=slot&&S.items[slot];if(!id)return tag;const src=(tag.match(/src="([^"]*)"/)||[])[1]||'';
  if(srcAllowed(id,src)){if(/\/_blob\/|blob:/.test(src)&&(p5gVars(id)||[]).some(g=>Object.values(g.u||{}).includes(src)||Object.keys(g).some(k=>g[k]&&src.endsWith(g[k])))){const fr=(p5gVars(id)||[]).some(g=>['front','half'].some(k=>(g.u&&g.u[k]==src)||(g[k]&&src.endsWith(g[k]))));subs.push([src,fr&&NECKS.includes(slot)&&!(S.tf[slot]&&S.tf[slot].nocut)])}return tag}
  if(!miss.includes(id))miss.push(id);return ''});
 html=html.replace(/<p class="p5note sm">[\s\S]*?<\/p>/g,'').replace(/<p class="p5note">לבגד הזה עוד אין תמונה[\s\S]*?<\/p>/g,'');
 const seen={};for(const [u,nk] of subs){if(seen[u])continue;seen[u]=1;try{const c=await cleanP5(u,nk);if(c&&c.url&&c.url!=u)html=html.split('src="'+u+'"').join('src="'+c.url+'" data-av="'+u+'"')}catch(_){}}
 if(opt.edit&&miss.length){const nm=miss.map(id=>esc((D[id].short||'').slice(0,20))).join(' · ');html+=`<p class="p5note avmiss">📤 <b>${nm}</b>: עוד אין תמונת אווטאר, ולכן ${miss.length>1?'הם לא מופיעים':'הוא לא מופיע'} על הדמות. <button type="button" data-avup="${miss[0]}">העלי תמונת אווטאר</button></p>`}
 return html}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-avup]');if(!b)return;e.preventDefault();e.stopPropagation();openItem(b.dataset.avup);setTimeout(()=>{const x=document.querySelector('#dlg .p5gbox,#dlg .tiesbox,#dlg .jwbox');if(x){if(x.tagName=='DETAILS')x.open=true;x.scrollIntoView({block:'center',behavior:'smooth'})}},500)},true);
// the old "try on me" tab used product cut-outs on a photo – removed under the rule
try{const i=TABS.findIndex(t=>t[0]=='tryon');if(i>=0)TABS.splice(i,1)}catch(_){}
// "✨ השלימי לי" picks only garments that have an avatar picture
{const _af=autoFill;autoFill=async function(){const _fo=fitsOcc;fitsOcc=function(id,o){return avReady(id)&&_fo(id,o)};try{await _af()}finally{fitsOcc=_fo}try{for(const [s,id] of Object.entries(ST.items))if(id&&!avReady(id)){delete ST.items[s];delete ST.tf[s]}await drawStudio()}catch(_){}}}
// ---- C. drawer: pictures, not prices; one tile per colour for packs; not-ready items open the upload
const CNAME={};
async function colorName(url){if(CNAME[url]!=null)return CNAME[url];const im=await ldImg(url);if(!im)return CNAME[url]='';const c=document.createElement('canvas');c.width=60;c.height=Math.round(60*im.naturalHeight/im.naturalWidth)||60;const x=c.getContext('2d');x.drawImage(im,0,0,c.width,c.height);let d;try{d=x.getImageData(0,0,c.width,c.height).data}catch(_){return CNAME[url]=''}
 const bins={};for(let i=0;i<d.length;i+=4){if(d[i+3]<200)continue;const k=(d[i]>>5)+','+(d[i+1]>>5)+','+(d[i+2]>>5);bins[k]=(bins[k]||0)+1}const top=Object.entries(bins).sort((a,b)=>b[1]-a[1])[0];if(!top)return CNAME[url]='';const [r,g,b]=top[0].split(',').map(n=>(+n)*32+16);
 const mx=Math.max(r,g,b)/255,mn=Math.min(r,g,b)/255,l=mx,s=mx?(mx-mn)/mx:0;let h=0;if(mx!=mn){const R=r/255,G=g/255,B2=b/255;if(mx==R)h=60*(((G-B2)/(mx-mn))%6);else if(mx==G)h=60*((B2-R)/(mx-mn)+2);else h=60*((R-G)/(mx-mn)+4)}if(h<0)h+=360;
 let n;if(l<.2)n='שחור';else if(s<.14)n=l>.86?'לבן':l>.55?'אפור בהיר':'אפור';else if(h<15||h>=345)n=l<.45?'בורדו':s<.45?'ורוד עתיק':'אדום';else if(h<42)n=l<.5?'חום':s<.4?"בז'":l>.8?'קאמל':'כתום';else if(h<68)n=l<.55?'חרדל':'צהוב';else if(h<165)n=l<.45?'ירוק זית':'ירוק';else if(h<200)n='טורקיז';else if(h<255)n=l<.38?'כחול כהה':s<.4?'תכלת':'כחול';else if(h<290)n='סגול';else n=l<.45?'סגול כהה':'ורוד';return CNAME[url]=n}
function varName(v,i){return (v.n&&!/^גרסה \d+$/.test(v.n))?v.n:''}
async function varLabel(v,i){return varName(v,i)||(await colorName(p5gUrl(v,'front')))||('גרסה '+(i+1))}
const VARSL=['top','outer','dress','set','skirt'];
{const _fd=fillDrawer;fillDrawer=async function(){const r=await _fd.apply(this,arguments);try{const g=$('#dgrid');if(!g||!DRAWER||!ST)return r;
 for(const t of [...g.querySelectorAll('.di[data-dpick]')]){const id=t.dataset.dpick;if(!avReady(id)){t.classList.add('noav');if(!t.querySelector('.noavb'))t.querySelector('.chk')?.insertAdjacentHTML('beforeend','<i class="noavb">📤 אין תמונת אווטאר</i>')}
  const vs=VARSL.includes(DRAWER)?p5gVars(id):[];if(vs.length<2)continue;const cur=ST.items[DRAWER]==id?(p5gOfT(id,ST.tf[DRAWER])||{}).t:null;
  const html=vs.map((v,i)=>`<button class="di var9${cur==v.t?' on':''}" data-dpick="${id}" data-gvp="${v.t}"><span class="chk"><img src="${p5gUrl(v,'front')}" alt="" loading="lazy"></span><span class="dn">${esc((D[id].short||'').slice(0,18))}</span><span class="vn" data-vn="${i}">…</span></button>`).join('');t.insertAdjacentHTML('afterend',html);
  const added=[];let n=t.nextElementSibling;for(let i=0;i<vs.length&&n;i++){added.push(n);n=n.nextElementSibling}t.remove();
  vs.forEach(async(v,i)=>{const l=await varLabel(v,i);const s=added[i]&&added[i].querySelector('.vn');if(s)s.textContent='🎨 '+l})}
 }catch(e){(window.ERRS=window.ERRS||[]).push('drawer70:'+e.message)}return r}}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('#sdrawer [data-dpick]');if(!t||e.target.closest('.zm')||!ST||!DRAWER)return;const id=t.dataset.dpick;
 if(t.dataset.gvp){e.preventDefault();e.stopPropagation();const slot=DRAWER;if(ST.items[slot]!=id)await setItem(slot,id);else pushH();const tf=ST.tf[slot]=ST.tf[slot]||{};tf.gv=+t.dataset.gvp;const g=p5gOfT(id,tf);const v=ST.view||'front';const f=g&&(g.fit[v]||g.fit.front);if(f){tf.x=f.x;tf.y=f.y;tf.w=f.w;tf.r=0;tf.pvv=v;delete tf.pv;tf.sx=1;tf.af={};tf.pvman={}}await drawStudio();SSEL=slot;paintSel();fillDrawer();if(innerWidth<=700)closeDrawer();return}
 if(!avReady(id)&&ST.items[DRAWER]!=id){e.preventDefault();e.stopPropagation();openItem(id);toast('לבגד הזה עוד אין תמונת אווטאר. העלי כאן: "👗 הבגד על האווטר ב-5 תנוחות"');setTimeout(()=>{const x=document.querySelector('#dlg .p5gbox,#dlg .tiesbox,#dlg .jwbox');if(x){if(x.tagName=='DETAILS')x.open=true;x.scrollIntoView({block:'center'})}},500)}},true);
// the colour strip in the tool row: names instead of "גרסה 2", and first in the row
{const _ps=paintSel;paintSel=function(){_ps();try{const c=$('#ssel .gvs');if(!c||!ST||!SSEL)return;const id=ST.items[SSEL];const vs=p5gVars(id);c.querySelectorAll('[data-gv]').forEach(async(b,i)=>{const v=vs.find(x=>String(x.t)==b.dataset.gv);if(!v)return;const l=await varLabel(v,vs.indexOf(v));const s=b.querySelector('small');if(s)s.textContent=l})}catch(_){}}}
// ---- D. head covering: never locked; picking one puts the covering on
{const _pl=paintSlots;paintSlots=function(){_pl();try{const b=document.querySelector('#srail [data-sslot="scarf"]');if(b){b.disabled=false;b.removeAttribute('disabled');b.classList.toggle('wigoff',ST.head=='wig')}}catch(_){}}}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#srail [data-sslot="scarf"]');if(!b||!ST||ST.head!='wig')return;ST.head='hair';try{paintTop()}catch(_){}},true);
{const _set=setItem;setItem=async function(slot,id){if(!slot||slot=='null')return;if(slot=='scarf'&&id&&ST&&ST.head=='wig')ST.head='hair';return _set(slot,id)}}
const s70=document.createElement('style');s70.textContent=`
#sdrawer .di .dm{display:none!important}
#sdrawer .di .dn{display:block;font-size:.74rem;font-weight:600;line-height:1.25;max-height:2.5em;overflow:hidden;color:var(--fg)}
#sdrawer .di .vn{display:block;font-size:.72rem;font-weight:700;color:var(--accent)}
#sdrawer .di.noav{opacity:.55}#sdrawer .di .chk{position:relative}
#sdrawer .noavb{position:absolute;inset-inline:4px;bottom:4px;font-style:normal;font-size:.6rem;font-weight:700;background:rgba(27,20,17,.72);color:#fff;border-radius:8px;padding:2px 4px;text-align:center}
#sdrawer .di.var9 .chk{background:#fff}
#srail .slot.wigoff{opacity:.6}
#sstage .p5note.avmiss{top:auto;bottom:52px;inset-inline:8px;max-width:none;font-size:.78rem;line-height:1.4}
#sstage .p5note.avmiss button{margin-inline-start:6px;border:0;border-radius:99px;padding:4px 10px;background:var(--ink,#1b1411);color:#fff;font:inherit;font-weight:700;font-size:.74rem;min-height:0}
`;document.head.appendChild(s70);
// v70: "⭕ צווארון" – cut the inside of the collar (default) or keep the picture as it came
{const _ps7=paintSel;paintSel=function(){_ps7();try{const c=$('#ssel');if(!c||!ST||!NECKS.includes(SSEL)||!ST.items[SSEL]||(ST.avbase||'long')!='p5'||!['front','half'].includes(ST.view||'front'))return;const tf=ST.tf[SSEL]||{};if(!p5gOfT(ST.items[SSEL],tf))return;const sb=c.querySelector('.sbtns');if(sb&&!sb.querySelector('[data-nocut]'))sb.insertAdjacentHTML('afterbegin',`<button data-nocut aria-pressed="${!tf.nocut}" title="מוריד את החלק האחורי של הבגד שנראה בתוך הצווארון">⭕ ${tf.nocut?'צווארון כמו בתמונה':'צווארון פתוח'}</button>`)}catch(_){}}}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#ssel [data-nocut]');if(!b||!ST||!SSEL)return;e.preventDefault();e.stopPropagation();pushH();const tf=ST.tf[SSEL]=ST.tf[SSEL]||{};tf.nocut=tf.nocut?0:1;const keep=SSEL;await drawStudio();SSEL=keep;paintSel()},true);
// v70 rule: her uploaded avatar pictures are never replaced by copies I processed – labels are hidden at display time only (cleanP5)
p5gRecheck=window.p5gRecheck=async function(){};
// v70b: "עלי ב-5 תנוחות" – the same fitting as the studio (cleaned picture, collar cut, smart fit), head above the garment, and her own size / height buttons
const PVW={id:null,busy:false};
document.body.insertAdjacentHTML('beforeend',`<dialog id="p5pv" dir="rtl"><div class="pvh"><b>הבגד עלייך ב-5 תנוחות</b><button class="x" data-pvx aria-label="סגירה">✕</button></div><div class="pvimg" dir="ltr"><img alt=""><p class="pvwait">מציירת…</p></div><div class="pvbar"><span>גודל הבגד:</span><button data-pvs="-1">➖ קטן יותר</button><button data-pvs="1">➕ גדול יותר</button><button data-pvy="-1">⬆ למעלה</button><button data-pvy="1">⬇ למטה</button><button data-pvr>↺ אוטומטי</button><button data-pvh>💇 פאה / 🧕 כיסוי</button></div><p class="pvnote">בטלפון: גוללים הצידה לראות את כל התנוחות. השינוי נשמר לבגד הזה וחל גם בבניית לוק, בכל התנוחות.</p></dialog>`);
let PVHEAD='p5c';
async function p5pvDraw(){const id=PVW.id;if(!id)return;const g=p5gOf(id);if(!g)return;const d=$('#p5pv');const im=d.querySelector('.pvimg img');d.querySelector('.pvwait').hidden=false;
 const slot=p5gSlot(id)||'top';const W=399,H=1365,cv=document.createElement('canvas');cv.width=W*5+40;cv.height=H+70;const x=cv.getContext('2d');x.fillStyle='#ece8e1';x.fillRect(0,0,cv.width,cv.height);
 for(let i=0;i<5;i++){const v=P5G_VIEWS[i];const ox=i*(W+10);const b=(PVHEAD=='p5c'&&window.AVC96)?AVC96():(PVHEAD=='p5'&&window.AVW96)?AVW96():PVHEAD;
  const base=await ldImg(`av/${b}_${v}.webp`);if(base)x.drawImage(base,ox,0,W,H);
  if(g[v]){const f=(g.fit||{})[v]||{x:50,y:40,w:70};const tf={x:f.x,y:f.y,w:f.w,sx:1};
   let src=p5gUrl(g,v);try{await smartFit(slot,true,{id,tf,v,g})}catch(_){}
   try{const c=await cleanP5(src,(v=='front'||v=='half')&&NECKS.includes(slot));if(c&&c.url)src=c.url}catch(_){}
   const gi=await ldImg(src);if(gi){const w=tf.w/100*W*(tf.sx||1),h=tf.w/100*W*gi.naturalHeight/gi.naturalWidth;x.drawImage(gi,ox+tf.x/100*W-w/2,tf.y/100*H-h/2,w,h)}}
  const hd=await ldImg(`av/${b}_${v}_${(v=='front'||v=='back')?'headonly':'head'}.webp`);if(hd)x.drawImage(hd,ox,0,W,W*hd.naturalHeight/hd.naturalWidth);
  x.fillStyle='#333';x.font='bold 34px Rubik,sans-serif';x.textAlign='center';x.fillText((POSES[i]||[])[1]||v,ox+W/2,H+50)}
 im.src=cv.toDataURL('image/jpeg',.88);d.querySelector('.pvwait').hidden=true}
p5gPreview=window.p5gPreview=async function(id){if(!p5gOf(id)){toast('לבגד הזה עוד אין תמונת אווטאר');return}PVW.id=id;const d=$('#p5pv');if(!d.open)d.showModal();await p5pvDraw()};
document.addEventListener('click',async e=>{const d=e.target.closest&&e.target.closest('#p5pv');if(!d)return;const t=e.target;
 if(t.closest('[data-pvx]')){d.close();return}const id=PVW.id;if(!id||PVW.busy)return;const it=IT[id]||{};let s=+it.p5gs||1,y=+it.p5gy||0;
 const bs=t.closest('[data-pvs]'),by=t.closest('[data-pvy]');
 if(bs)s=Math.round(Math.max(.6,Math.min(1.6,s+(+bs.dataset.pvs)*.05))*100)/100;else if(by)y=Math.round((y+(+by.dataset.pvy)*.6)*10)/10;else if(t.closest('[data-pvr]')){s=1;y=0}else if(t.closest('[data-pvh]')){PVHEAD=PVHEAD=='p5c'?'p5':'p5c';PVW.busy=true;try{await p5pvDraw()}finally{PVW.busy=false}return}else return;
 PVW.busy=true;try{IT[id]=Object.assign(IT[id]||{},{p5gs:s,p5gy:y});try{await putItem(id,{p5gs:s,p5gy:y})}catch(_){}
  // the studio fits again with the new size, in every pose
  try{if(ST)for(const [sl,i2] of Object.entries(ST.items))if(i2==id&&ST.tf[sl]){ST.tf[sl].af={};if(ST.tf[sl].pvman)ST.tf[sl].pvman={}}}catch(_){}
  toast(s==1&&!y?'↺ חזרה להתאמה האוטומטית':`גודל ${Math.round(s*100)}%`);await p5pvDraw()}finally{PVW.busy=false}},true);
{const st=document.createElement('style');st.textContent=`#p5pv{width:min(980px,96vw);max-height:94vh;border:0;border-radius:22px;padding:0;background:#fff;box-shadow:0 20px 60px #0004}#p5pv::backdrop{background:#0008}
#p5pv[open]{display:flex;flex-direction:column;overflow:hidden}#p5pv .pvimg{flex:1 1 auto;min-height:0}#p5pv .pvbar,#p5pv .pvh,#p5pv .pvnote{flex:none}
#p5pv .pvh{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;font-size:17px}#p5pv .x{border:0;background:#eee;border-radius:50%;width:36px;height:36px;font-size:18px}
#p5pv .pvimg{position:relative;overflow:auto;background:#ece8e1}#p5pv .pvimg img{display:block;width:100%;min-width:900px;height:auto}#p5pv .pvwait{position:absolute;inset:0;margin:0;display:grid;place-items:center;background:#fff8;font-weight:700}#p5pv .pvwait[hidden]{display:none}
#p5pv .pvbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:12px 16px 4px}#p5pv .pvbar button{border:0;border-radius:999px;padding:10px 14px;background:#f1edf7;font:600 15px Rubik,sans-serif}#p5pv .pvbar span{font-weight:700}
#p5pv .pvnote{margin:4px 16px 14px;color:#666;font-size:13px}`;document.head.appendChild(st)}

// ===== v71 "בוטיק" design: line icons instead of emoji, avatar in the hero, theme switch (bordo / gold-rose) =====
{const SV=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
 const IC={home:SV('<path d="M12 6.5a2 2 0 1 1 2 2c-1 .4-2 1-2 2V11"/><path d="M12 11 3.4 17.3c-.8.6-.4 1.7.6 1.7h16c1 0 1.4-1.1.6-1.7L12 11"/>'),
  search:SV('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>'),
  studio:SV('<path d="M9.5 3h5l-.8 4 4.3 13H6l4.3-13z"/><path d="M9.7 7h4.6"/>'),
  hub:SV('<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>'),
  bell:SV('<path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
  ret:SV('<circle cx="12" cy="12.5" r="7.5"/><path d="M12 8.5v4l2.8 1.8"/><path d="M9.5 3h5"/>'),
  fav:SV('<path d="M12 19.5s-7-4.3-7-9.6A3.9 3.9 0 0 1 12 7.6a3.9 3.9 0 0 1 7 2.3c0 5.3-7 9.6-7 9.6z"/>'),
  rnd:SV('<path d="M12 3.5l1.9 5.6 5.6 1.9-5.6 1.9L12 18.5l-1.9-5.6L4.5 11l5.6-1.9z"/><path d="M19 17.5v3M17.5 19h3"/>'),
  more:SV('<path d="M5 20V11M12 20V5M19 20v-6"/>'),
  look:SV('<path d="M12 3.5l1.9 5.6 5.6 1.9-5.6 1.9L12 18.5l-1.9-5.6L4.5 11l5.6-1.9z"/>'),
  pal:SV('<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.8 1.8-1.7 0-1.3-1.2-1.6-1.2-2.8 0-1 .8-1.6 1.8-1.6H17a3.5 3.5 0 0 0 3.5-3.5c0-4.1-3.8-7.4-8.5-7.4z"/><circle cx="7.8" cy="11" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15" cy="7.8" r="1"/>')};
 const root=document.documentElement;let th='bordo';try{th=localStorage.getItem('d71')||'bordo'}catch(_){}
 const apply=()=>{root.classList.toggle('d71',th!='off');root.dataset.d71=th};apply();
 const set=(sel,key)=>{const i=document.querySelector(sel+' i');if(i&&!i.querySelector('svg'))i.innerHTML=IC[key]};
 function paintIc(){try{
  [['home','home'],['search','search'],['studio','studio'],['hub','hub'],['bell','bell']].forEach(([b,k])=>set(`.bnav [data-bn="${b}"]`,k));
  [['ret','ret'],['fav','fav'],['rnd','rnd'],['more','more']].forEach(([b,k])=>set(`.h9tiles [data-h9="${b}"]`,k));
  set('.h9cta [data-h9="studio"]','studio');set('.h9cta [data-h9="hub"]','look');
  const hero=document.querySelector('.h9hero');if(hero&&!hero.querySelector('.h9av'))hero.insertAdjacentHTML('beforeend',`<span class="h9av" data-h9="studio" role="button" aria-label="בניית לוק"><img src="${window.AVF96?AVF96():'av/p5c_front.webp'}" alt=""><small>האווטאר שלך</small></span>`);
  const act=document.querySelector('.h9act');if(act&&!act.querySelector('#d71t'))act.insertAdjacentHTML('afterbegin',`<button type="button" id="d71t" title="צבע העיצוב: בורדו / זהב-ורוד / הקודם">${IC.pal}</button>`);
 }catch(_){}}
 paintIc();setTimeout(paintIc,400);setTimeout(paintIc,1500);new MutationObserver(()=>paintIc()).observe(document.body,{childList:true});
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#d71t');if(!b)return;e.preventDefault();th=th=='bordo'?'gold':th=='gold'?'off':'bordo';try{localStorage.setItem('d71',th)}catch(_){}apply();toast(th=='bordo'?'🎨 בורדו':th=='gold'?'🎨 זהב-ורוד':'🎨 העיצוב הקודם')},true);
 window.d71=t=>{th=t;apply()}}
// emoji in front of a text label are tucked away (the label stays); buttons that are only an emoji keep it
{const RE=/^(\s*)((?:\p{Extended_Pictographic}|[←-⇿☀-➿⬀-⯿])(?:[️‍⃣]|\p{Emoji_Modifier}|\p{Extended_Pictographic})*)\s+(?=\S)/u;
 const SEL='button,summary,a,label,h2,h3,h4,.tab,.chip,[role=button]';
 function fix(el){if(el.closest('.bnav,#sstage,.e71k')||el.dataset.e71)return;let t=el.firstChild;while(t&&t.nodeType==3&&!t.nodeValue.trim())t=t.nextSibling;if(!t)return;
  if(t.nodeType==1&&t.tagName=='I'&&!t.querySelector('svg')&&RE.test(t.textContent+' x')&&/[֐-׿A-Za-z]/.test(el.textContent.replace(t.textContent,''))){t.classList.add('e71');el.dataset.e71=1;return}
  if(t.nodeType!=3)return;const m=t.nodeValue.match(RE);if(!m)return;const rest=t.nodeValue.slice(m[0].length)+(el.textContent.slice(t.nodeValue.length));if(!/[֐-׿A-Za-z0-9]/.test(rest))return;
  const sp=document.createElement('span');sp.className='e71';sp.textContent=m[2];t.nodeValue=m[1]+t.nodeValue.slice(m[0].length);el.insertBefore(sp,t);el.dataset.e71=1}
 function scan(root){try{if(!document.documentElement.classList.contains('d71'))return;if(root.matches&&root.matches(SEL))fix(root);root.querySelectorAll&&root.querySelectorAll(SEL).forEach(fix)}catch(_){}}
 let q=new Set(),tm=0;new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType==1)q.add(n);if(!tm)tm=setTimeout(()=>{tm=0;const a=[...q];q.clear();a.forEach(scan)},60)}).observe(document.body,{childList:true,subtree:true});
 scan(document.body);setTimeout(()=>scan(document.body),1200)}

// ===== v72/73 fixes found by the screen-by-screen audit =====
// 1. item dialog: the colour/pose thumbnails of the avatar pictures show the cleaned picture (no "קדמי" label), and unnamed colours get a colour name
{const _ao72=afterOpen;afterOpen=function(id){_ao72(id);setTimeout(async()=>{try{const box=document.querySelector('#dlbody .p5gbox')||document.querySelector('#dlbody');if(!box)return;
  for(const im of box.querySelectorAll('.p5gv img,.p5r img')){const u=im.getAttribute('src')||'';if(!/\/_blob\/|blob:/.test(u)||im.dataset.cl)continue;im.dataset.cl=1;try{const c=await cleanP5(u);if(c&&c.url&&c.url!=u)im.src=c.url}catch(_){}}
  for(const sp of box.querySelectorAll('.p5gv .pv>span')){if(!/^גרסה \d+$/.test(sp.textContent.trim()))continue;const im=sp.parentElement.querySelector('img');try{const n=await colorName(im.dataset.cl?(im.src):im.getAttribute('src'));if(n)sp.textContent=n}catch(_){}}
 }catch(_){}},60)}}
// 2. prices are not shown in picture strips (only inside the item: "פרטים נוספים")
{const tidy=root=>{try{root.querySelectorAll&&root.querySelectorAll('.mini>span').forEach(s=>{if(/^\s*₪\s?[\d.,]+\s*$/.test(s.textContent)||/^\s*[\d.,]+\s?₪\s*$/.test(s.textContent))s.classList.add('pr72')})}catch(_){}};
 new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType==1)tidy(n)}).observe(document.body,{childList:true,subtree:true});tidy(document.body)}
// 3. hub: the chosen tab is always visible in the tab bar
{const _rh=renderHub;renderHub=function(...a){const r=_rh.apply(this,a);try{const b=document.querySelector('#htabs [aria-pressed="true"]');if(b){const p=b.parentElement,ar=b.getBoundingClientRect(),sr=p.getBoundingClientRect();p.scrollLeft+=(ar.left+ar.width/2)-(sr.left+sr.width/2)}}catch(_){}return r}}   // v323: only the tab row moves sideways, never the page
// 4. drawer: pieces that are ready for the avatar come first
{const _fd=fillDrawer;fillDrawer=function(...a){const r=_fd.apply(this,a);const go=()=>{try{const g=document.querySelector('#dgrid');if(!g)return;const tiles=[...g.children].filter(t=>t.classList.contains('di'));const late=tiles.filter(t=>t.classList.contains('noav'));if(late.length&&late.length<tiles.length)late.forEach(t=>g.appendChild(t))}catch(_){}};if(r&&r.then)r.then(go);else setTimeout(go,0);return r}}

// ===== v73/74 design "מגזין" (editorial): black-white + camel, serif headings, thin lines, square cards =====
// Palettes (html[data-pal]: mono default, olive, navy, rose) sit behind the palette button.
// Presentation only: adds the full-body avatar figure (head covering / wig) and an overline to the home hero, and takes over from the v71 theme.
{const root=document.documentElement;const PALS=['mono','olive','navy','rose'];
 const PN={mono:'שחור-לבן וקאמל',olive:'זית',navy:'כחול כהה',rose:'ורוד עתיק'};
 let pal='mono';try{pal=localStorage.getItem('pal')||'mono'}catch(_){}
 if(!PALS.includes(pal))pal='mono';
 const apply=()=>{root.classList.remove('d71');root.classList.add('d73');root.dataset.pal=pal};
 apply();
 // the palette button (the v71 🎨 button) cycles the four palettes; mono is the default
 window.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#d71t');if(!t)return;e.preventDefault();e.stopImmediatePropagation();
  pal=PALS[(PALS.indexOf(pal)+1)%PALS.length];try{localStorage.setItem('pal',pal)}catch(_){}apply();try{toast('צבעים: '+PN[pal])}catch(_){}},true);
 window.d73=p=>{if(p&&PALS.includes(p)){pal=p;apply()}};
 // home: overline + full-body avatar figure (head covering / wig), crossfading on phones, side by side on desktop
 let rot=0;
 function build(){try{
  const act=document.querySelector('.h9act');const t=act&&act.querySelector('#d71t');if(t)t.title='צבעים: שחור-לבן וקאמל / זית / כחול / ורוד';
  const hero=document.querySelector('.h9hero');if(!hero)return;
  if(!hero.querySelector('.h73kick')){let m='';try{m=new Date().toLocaleDateString('he-IL',{month:'long'})}catch(_){}hero.insertAdjacentHTML('afterbegin',`<p class="h73kick">הארון של שרה${m?' · '+m:''}</p>`)}
  if(!document.querySelector('.h73fig')){
   const f=document.createElement('div');f.className='h73fig';
   f.innerHTML=`<figure class="h73f on" data-h9="studio" role="button" aria-label="בניית לוק על האווטאר"><img src="${window.AVF96?AVF96():'av/p5c_front.webp'}" alt="האווטאר שלך עם כיסוי ראש" decoding="async"><figcaption>עם כיסוי</figcaption></figure><figure class="h73f" data-h9="studio" role="button" aria-label="בניית לוק על האווטאר"><img src="av/p5_front.webp" alt="האווטאר שלך עם פאה" decoding="async"><figcaption>עם פאה</figcaption></figure><div class="h73dots" role="group" aria-label="איך להציג את האווטאר"><button type="button" data-av73="0" aria-pressed="true">כיסוי</button><button type="button" data-av73="1" aria-pressed="false">פאה</button></div>`;
   hero.after(f)}
 }catch(_){}}
 function show(i){const fs=document.querySelectorAll('.h73fig .h73f');fs.forEach((f,k)=>f.classList.toggle('on',k==i));document.querySelectorAll('.h73dots [data-av73]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.av73==i))}
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-av73]');if(!b)return;e.preventDefault();show(+b.dataset.av73);rot=Date.now()},true);
 const calm=matchMedia('(prefers-reduced-motion: reduce)');
 (window.rawSetInterval||setInterval)(()=>{try{if(calm.matches||document.hidden||Date.now()-rot<9000)return;if(document.querySelector('dialog[open]'))return;const on=document.querySelector('.h73fig .h73f.on');if(!on)return;const fs=[...document.querySelectorAll('.h73fig .h73f')];show((fs.indexOf(on)+1)%fs.length)}catch(_){}},4800);
 build();setTimeout(build,400);setTimeout(build,1500);
 // the v71 emoji tidy-up only runs while html.d71 is set: the same tidy-up for html.d73 (leading emoji in labels are tucked away, the label stays)
 const RE=/^(\s*)((?:\p{Extended_Pictographic}|[←-⇿☀-➿⬀-⯿])(?:[️‍⃣]|\p{Emoji_Modifier}|\p{Extended_Pictographic})*)\s+(?=\S)/u;
 const SEL='button,summary,a,label,h2,h3,h4,.tab,.chip,[role=button]';
 function fix(el){if(el.closest('.bnav,#sstage,.e71k')||el.dataset.e71)return;let t=el.firstChild;while(t&&t.nodeType==3&&!t.nodeValue.trim())t=t.nextSibling;if(!t)return;
  if(t.nodeType==1&&t.tagName=='I'&&!t.querySelector('svg')&&RE.test(t.textContent+' x')&&/[֐-׿A-Za-z]/.test(el.textContent.replace(t.textContent,''))){t.classList.add('e71');el.dataset.e71=1;return}
  if(t.nodeType!=3)return;const m=t.nodeValue.match(RE);if(!m)return;const rest=t.nodeValue.slice(m[0].length)+(el.textContent.slice(t.nodeValue.length));if(!/[֐-׿A-Za-z0-9]/.test(rest))return;
  const sp=document.createElement('span');sp.className='e71';sp.textContent=m[2];t.nodeValue=m[1]+t.nodeValue.slice(m[0].length);el.insertBefore(sp,t);el.dataset.e71=1}
 function scan(r){try{if(!root.classList.contains('d73'))return;if(r.matches&&r.matches(SEL))fix(r);r.querySelectorAll&&r.querySelectorAll(SEL).forEach(fix)}catch(_){}}
 let qq=new Set(),tm=0;new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType==1)qq.add(n);if(!tm)tm=setTimeout(()=>{tm=0;const a=[...qq];qq.clear();a.forEach(scan)},60)}).observe(document.body,{childList:true,subtree:true});
 scan(document.body);setTimeout(()=>scan(document.body),1200)}

// ===== v74: "כל התנוחות" – every pose drawn with its own placement, and editable right there =====
// Before v74 the front/back boxes reused the placement of the pose open in the studio (tf.x/y/w belong to tf.pvv),
// so after visiting "צד" the front and back shirt came out narrow and short.
{
// placement of one garment in pose v: the live tf when that pose is the open one, else tf.pv[v], else the GPT default
function pvOf(tf,g,v){const f=(tf.pvv||'front')==v&&tf.x!=null?tf:((tf.pv||{})[v]||(g&&g.fit&&g.fit[v]));return f?{x:f.x,y:f.y,w:f.w,r:f.r||0,q:f.q||1}:null}
// writes a placement back where the studio reads it for pose v
function pvSet(tf,v,f){if((tf.pvv||'front')==v){tf.x=f.x;tf.y=f.y;tf.w=f.w;tf.r=f.r||0;tf.q=f.q||1}else{tf.pv=tf.pv||{};tf.pv[v]={x:f.x,y:f.y,w:f.w,r:f.r||0,q:f.q||1}}}
async function stateFor(v){const S=Object.assign({},ST,{view:v,tf:{}});
 for(const [slot,t0] of Object.entries(ST.tf||{})){const id=ST.items[slot];const tf=Object.assign({},t0);S.tf[slot]=tf;if(!id||slot=='jewelry')continue;
  const g=window.p5gOfT?p5gOfT(id,t0):null;if(!g||!g[v])continue;const f=pvOf(t0,g,v);if(!f)continue;Object.assign(tf,f,{pvv:v});
  // a pose she never opened: fit it to the body the same way the studio does on the first visit, and keep the result
  const seen=(t0.pvv||'front')==v||(t0.pv||{})[v]||(t0.pvman||{})[v];
  if(!seen&&(ST.avbase||'long')=='p5'&&window.smartFit){try{if(await smartFit(slot,true,{id,tf,v,g}))pvSet(t0,v,tf)}catch(_){}}}
 return S}
let PE={v:null,slot:null};
const editable=v=>Object.entries(ST.items).filter(([s,id])=>id&&s!='jewelry'&&ST.tf[s]&&window.p5gOfT&&(p5gOfT(id,ST.tf[s])||{})[v]).map(([s])=>s);
async function drawPose(fig){const v=fig.dataset.pose;fig.querySelector('.mst').innerHTML=await stageInner(await stateFor(v),{})}
window.pvOf=pvOf;window.pvSet=pvSet;window.drawPose=drawPose;
function paintBar(){const bar=$('#p5all .p5ed');if(!bar)return;const v=PE.v;const sl=v?editable(v):[];if(!v||!sl.length){bar.innerHTML=v?'<small>בתנוחה הזו אין בגד עם תמונת אווטאר לעריכה.</small>':'<small>לחצי על תנוחה כדי לתקן אותה כאן.</small>';return}
 if(!sl.includes(PE.slot))PE.slot=sl[0];const nm=s=>(SLOTS.find(x=>x[0]==s)||[0,s])[1];const pn=(POSES.find(p=>p[0]==v)||[0,v])[1];
 bar.innerHTML=`<b>✏️ ${pn}:</b>${sl.map(s=>`<button data-pes="${s}" aria-pressed="${s==PE.slot}">${esc(nm(s))}</button>`).join('')}<span class="sep"></span>`+
  `<button data-pe="w" data-d="-1" title="קטן יותר">➖</button><button data-pe="w" data-d="1" title="גדול יותר">➕</button><button data-pe="y" data-d="-1" title="למעלה">⬆</button><button data-pe="y" data-d="1" title="למטה">⬇</button><button data-pe="x" data-d="1" title="ימינה">➡</button><button data-pe="x" data-d="-1" title="שמאלה">⬅</button><button data-pe="r" data-d="-1" title="סיבוב">↺</button><button data-pe="r" data-d="1" title="סיבוב">↻</button><button data-pe="auto" title="התאמה אוטומטית לגוף">✨ אוטומטי</button><button data-pe="open" title="פתיחה בבניית הלוק">פתיחה בבניית הלוק</button>`}
window.p5ShowAll=p5ShowAll=async function(){if(!ST)return;const row=$('#p5all .p5row');row.innerHTML='';PE.v=null;
 for(const [k,n] of POSES)row.insertAdjacentHTML('beforeend',`<figure class="p5f" data-pose="${k}"><div class="mst"></div><figcaption>${n}</figcaption></figure>`);
 for(const f of row.querySelectorAll('.p5f'))await drawPose(f);
 const bt=$('#p5all .p5bt');if(bt&&!$('#p5all .p5ed'))bt.insertAdjacentHTML('beforebegin','<div class="p5ed"></div>');
 const sm=$('#p5all .p5bt small');if(sm)sm.textContent='לחיצה על תנוחה בוחרת אותה, ואז אפשר לתקן את הבגד ישר כאן: גודל, גובה, צד וסיבוב. התיקון נשמר לתנוחה הזו בלבד.';
 paintBar();$('#p5all').showModal();const on=row.querySelector(`.p5f[data-pose="${ST.view||'front'}"]`);if(on)on.scrollIntoView({inline:'center',block:'nearest'})};
// tap on a pose = choose it for editing (p5.js calls this instead of jumping to the studio)
window.p5PoseTap=function(fig){PE.v=fig.dataset.pose;$$('#p5all .p5f').forEach(f=>f.classList.toggle('on',f==fig));paintBar()};
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#p5all [data-pe],#p5all [data-pes]');if(!b||!ST||!PE.v)return;e.preventDefault();e.stopPropagation();
 if(b.dataset.pes){PE.slot=b.dataset.pes;paintBar();return}
 const v=PE.v,slot=PE.slot,id=ST.items[slot],tf=ST.tf[slot];if(!id||!tf)return;const g=p5gOfT(id,tf);const k=b.dataset.pe,d=+b.dataset.d||0;
 if(k=='open'){$('#p5all').close();ST.view=v;SSEL=slot;paintTop();await drawStudio();SSEL=slot;try{paintSel()}catch(_){}return}
 pushH();
 if(k=='auto'){if(tf.pvman)delete tf.pvman[v];const f=Object.assign({},tf,(g.fit||{})[v]||{},{pvv:v});try{await smartFit(slot,true,{id,tf:f,v,g})}catch(_){}pvSet(tf,v,f)}
 else{const f=pvOf(tf,g,v);if(!f)return;
  if(k=='w'){const n=Math.max(15,Math.min(160,f.w*(d>0?1.04:1/1.04)));f.w=Math.round(n*10)/10}
  else if(k=='y')f.y=Math.round((f.y+d*.6)*10)/10;else if(k=='x')f.x=Math.round((f.x+d*.6)*10)/10;else if(k=='r')f.r=Math.max(-30,Math.min(30,(f.r||0)+d*2));
  pvSet(tf,v,f);tf.pvman=tf.pvman||{};tf.pvman[v]=1}
 const fig=$(`#p5all .p5f[data-pose="${v}"]`);if(fig)await drawPose(fig);
 if((ST.view||'front')==v){const keep=SSEL;await drawStudio();SSEL=keep}},true);
document.head.insertAdjacentHTML('beforeend',`<style>
#p5all .p5f .mst{pointer-events:none}
#p5all .p5ed{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:4px 14px 0;min-height:40px}
#p5all .p5ed b{font-weight:700;margin-inline-end:4px}#p5all .p5ed small{color:var(--muted)}
#p5all .p5ed button{font:inherit;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:10px;padding:7px 11px;cursor:pointer;min-width:40px}
#p5all .p5ed button[aria-pressed=true]{background:var(--fg);color:var(--bg);border-color:var(--fg)}
#p5all .p5ed .sep{width:1px;height:26px;background:var(--line);margin:0 4px}
dialog#p5all[open]{max-height:100dvh;overflow-y:auto}
</style>`);
}
// ===== v74: base shirt ("גופיית בסיס") – a layer under the top/dress, in any colour =====
// Sara marks closet tops that have her avatar pictures as base shirts. The colour is changed at display time only
// (a tinted copy in memory, like the collar cut) – her uploaded picture is never replaced.
{
const BASEK='base';
try{SLOTS.splice(SLOTS.findIndex(s=>s[0]=='top')+1,0,[BASEK,'גופיית בסיס','👕',['tops','sweaters']]);SLOTZ[BASEK]=9;
 for(const a of [P5G_SLOTS,AF_TOP,VARSL,NECKS,NKSLOTS,typeof FITB_SLOTS!='undefined'?FITB_SLOTS:[]])if(a&&!a.includes(BASEK))a.push(BASEK)}catch(e){(window.ERRS=window.ERRS||[]).push('base74:'+e.message)}
const isBase=id=>!!(IT[id]||{}).base;
const BASEHINT=/בסיס|גופי|גופיה|basic/i;
// the drawer of this slot lists only base shirts; with none yet it offers the closet tops that look like one
{const _di=drawerItems;drawerItems=function(slot){const ids=_di(slot);return slot==BASEK?ids.filter(isBase):ids}}
{const _fd=fillDrawer;fillDrawer=async function(){const r=await _fd.apply(this,arguments);try{if(DRAWER!=BASEK)return r;const g=$('#dgrid');if(!g)return r;
 const cand=Object.keys(D).filter(id=>['tops','sweaters'].includes(curCat(id))&&!isBase(id)&&(BASEHINT.test(D[id].short||'')||BASEHINT.test(D[id].name||'')));
 g.insertAdjacentHTML('beforeend',`<div class="base74"><p><b>להוסיף גופיית בסיס:</b> פותחים חולצה מהארון שיש לה תמונת אווטאר ולוחצים "👕 גופיית בסיס". ${cand.length?'נראה שאלה גופיות בסיס:':''}</p>${cand.map(id=>`<button data-base74="${id}">${esc((D[id].short||'').slice(0,26))}${avReady(id)?' 🟢':' · אין תמונת אווטאר'}</button>`).join('')}</div>`)}catch(_){}return r}}
// toggle in the item window (next to the 5-pose avatar box)
{const _ao=afterOpen;afterOpen=function(id){_ao(id);try{if(!['tops','sweaters'].includes(curCat(id)))return;const box=$('#dlbody .p5gbox')||$('#dlbody h3');if(!box||$('#dlbody [data-base74]'))return;
 box.insertAdjacentHTML('afterend',`<p class="base74i"><button data-base74="${id}" aria-pressed="${isBase(id)}">👕 גופיית בסיס${isBase(id)?' ✓':''}</button> <small>${isBase(id)?'מופיעה במשבצת "גופיית בסיס" בבניית הלוק':'לסמן אם לובשים אותה מתחת לבגדים עם פתח'}</small></p>`)}catch(_){}}}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-base74]');if(!b)return;e.preventDefault();e.stopPropagation();const id=b.dataset.base74;const on=!isBase(id);
 await putItem(id,{base:on?1:''});if(b.closest('#dlbody')){b.setAttribute('aria-pressed',on);b.textContent='👕 גופיית בסיס'+(on?' ✓':'');const s=b.parentElement.querySelector('small');if(s)s.textContent=on?'מופיעה במשבצת "גופיית בסיס" בבניית הלוק':'לסמן אם לובשים אותה מתחת לבגדים עם פתח'}
 if(DRAWER==BASEK)fillDrawer();toast(on?'👕 נוספה לגופיות הבסיס':'הוסרה מגופיות הבסיס')},true);
// colour: tf.tint (hex). Shading of her picture is kept: each pixel = colour × its brightness relative to the bright parts of the shirt
const TINTC={};
async function tintUrl(src,hex){const k=src+'|'+hex;if(TINTC[k])return TINTC[k];const im=await ldImg(src);if(!im||!im.naturalWidth)return src;
 const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0);let d;try{d=x.getImageData(0,0,c.width,c.height)}catch(_){return src}const a=d.data;
 const hist=new Uint32Array(256);let n=0;for(let i=0;i<a.length;i+=4)if(a[i+3]>128){hist[Math.round(.299*a[i]+.587*a[i+1]+.114*a[i+2])]++;n++}
 let ref=255,acc=0;for(let l=255;l>=0;l--){acc+=hist[l];if(acc>=n*.08){ref=Math.max(l,40);break}}
 const R=parseInt(hex.slice(1,3),16),G=parseInt(hex.slice(3,5),16),B=parseInt(hex.slice(5,7),16);
 for(let i=0;i<a.length;i+=4){if(!a[i+3])continue;const l=Math.min(1.12,(.299*a[i]+.587*a[i+1]+.114*a[i+2])/ref);const s=.25+.75*l;a[i]=Math.min(255,R*s);a[i+1]=Math.min(255,G*s);a[i+2]=Math.min(255,B*s)}
 x.putImageData(d,0,0);const u=await new Promise(r=>c.toBlob(bl=>r(bl?URL.createObjectURL(bl):src),'image/png'));TINTC[k]=u;return u}
{const _si=stageInner;stageInner=async function(S,opt={}){let html=await _si(S,opt);try{const tf=(S.tf||{})[BASEK];if(!S.items[BASEK]||!tf||!tf.tint)return html;
 const tags=html.match(/<img class="sl[^>]*data-slot="base"[^>]*>/g)||[];for(const t of tags){const m=t.match(/ src="([^"]+)"/);if(!m)continue;const u=await tintUrl(m[1],tf.tint);html=html.replace(t,t.replace(m[0],` src="${u}"`))}}catch(_){}return html}}
const TINTS=[['','מקורי'],['#f6f4ef','לבן'],['#efe5cf','שמנת'],['#d9c4a6','בז׳'],['#c8a184','ניוד'],['#a7a6a3','אפור'],['#1d1c1c','שחור'],['#1f2c4d','כחול כהה'],['#a9c3df','תכלת'],['#6b4a33','חום'],['#5c6137','זית'],['#6d1f2c','בורדו'],['#e3b4bf','ורוד']];
{const _ps=paintSel;paintSel=function(){_ps();try{const c=$('#ssel');if(!c||!ST||SSEL!=BASEK||!ST.items[BASEK])return;const tf=ST.tf[BASEK]||{};const cur=tf.tint||'';
 const at=c.querySelector(':scope>b')||null;(at||c).insertAdjacentHTML(at?'afterend':'afterbegin',`<div class="tint74"><span>צבע:</span>${TINTS.map(([h,n])=>`<button data-tint="${h}" title="${n}" aria-label="${n}" aria-pressed="${cur==h}" >${h?`<i style="background:${h}"></i>`:'מקורי'}</button>`).join('')}<label title="צבע אחר"><input type="color" data-tintc value="${cur||'#d9c4a6'}"> אחר</label></div>`)}catch(_){}}}
const setTint=async h=>{if(!ST||!ST.tf[BASEK])return;pushH();ST.tf[BASEK].tint=h||undefined;if(!h)delete ST.tf[BASEK].tint;const keep=SSEL;await drawStudio();SSEL=keep;paintSel()};
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#ssel [data-tint]');if(!b)return;e.preventDefault();e.stopPropagation();setTint(b.dataset.tint)},true);
document.addEventListener('change',e=>{if(e.target.matches&&e.target.matches('#ssel [data-tintc]'))setTint(e.target.value)},true);
document.head.insertAdjacentHTML('beforeend',`<style>
.tint74{display:flex;flex:none;flex-wrap:nowrap;gap:5px;align-items:center;padding:2px 6px;border-inline:1px solid var(--line)}
.tint74 button{width:30px;height:30px;min-height:30px;border-radius:50%;border:1px solid var(--line);padding:0;cursor:pointer;font-size:.62rem;box-shadow:inset 0 0 0 2px var(--bg)}
.tint74 button i{display:block;width:100%;height:100%;border-radius:50%;pointer-events:none}
.tint74 button[aria-pressed=true]{outline:2px solid var(--fg);outline-offset:1px}
.tint74 button[data-tint=""]{width:auto;border-radius:99px;padding:0 10px;background:var(--card)}
.tint74 label{display:inline-flex;align-items:center;gap:4px;font-size:.8rem}.tint74 input[type=color]{width:30px;height:30px;border:0;padding:0;background:none}
.base74{grid-column:1/-1;padding:8px;display:flex;flex-wrap:wrap;gap:6px}.base74 p{margin:0 0 4px;flex-basis:100%;font-size:.85rem}
.base74 button,.base74i button{font:inherit;font-size:.82rem;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:99px;padding:6px 12px;cursor:pointer}
.base74i button[aria-pressed=true]{background:var(--fg);color:var(--bg)}
</style>`);
}
// drawer tiles of colour variants (packs) showed the raw GPT picture with its "קדמי" label – show the cleaned one, like the item window
{const _fd=fillDrawer;fillDrawer=async function(){const r=await _fd.apply(this,arguments);try{for(const im of document.querySelectorAll('#dgrid .var9 img')){const u=im.getAttribute('src')||'';if(im.dataset.cl||!/\/_blob\/|blob:/.test(u))continue;im.dataset.cl=1;cleanP5(u).then(c=>{if(c&&c.url&&c.url!=u)im.src=c.url}).catch(()=>0)}}catch(_){}return r}}
// ===== v74: eraser – rub out a bit of a garment where it sticks out (e.g. by the hands), per pose =====
// Strokes are kept in the look (tf.er[view] = groups of [u,v,r] in picture coordinates) and applied at display time only.
{
const ER={on:false,size:2,drag:null};const SIZES=[.035,.06,.1];
const ERC={};
async function eraseUrl(src,groups){const k=src+'|'+JSON.stringify(groups);if(ERC[k])return ERC[k];const im=await ldImg(src);if(!im||!im.naturalWidth)return src;
 const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d');x.drawImage(im,0,0);x.globalCompositeOperation='destination-out';x.lineCap='round';x.lineJoin='round';
 for(const g of groups){if(!g.length)continue;x.lineWidth=g[0][2]*2*c.width;x.beginPath();x.moveTo(g[0][0]*c.width,g[0][1]*c.height);if(g.length==1)x.lineTo(g[0][0]*c.width+.1,g[0][1]*c.height);for(const p of g.slice(1))x.lineTo(p[0]*c.width,p[1]*c.height);x.stroke()}
 const u=await new Promise(r=>c.toBlob(bl=>r(bl?URL.createObjectURL(bl):src),'image/png'));ERC[k]=u;return u}
const strokesOf=(tf,v)=>((tf&&tf.er)||{})[v]||[];
{const _si=stageInner;stageInner=async function(S,opt={}){let html=await _si(S,opt);try{const v=S.view||'front';
 for(const [slot,tf] of Object.entries(S.tf||{})){if(slot=='jewelry'||!S.items[slot])continue;const gs=strokesOf(tf,v);if(!gs.length)continue;
  const re=new RegExp(`<img class="sl[^>]*data-slot="${slot}"[^>]*>`);const t=(html.match(re)||[])[0];if(!t)continue;const m=t.match(/ src="([^"]+)"/);if(!m)continue;
  const u=await eraseUrl(m[1],gs);html=html.replace(t,t.replace(m[0],` src="${u}" data-er0="${m[1]}"`))}}catch(_){}return html}}
// pointer position -> picture coordinates of the layer (undoes its rotate/scale/skew and the stage zoom)
function toImg(el,px,py){const r=el.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;const st=$('#sstage');const z=(st&&st.offsetWidth)?st.getBoundingClientRect().width/st.offsetWidth:1;
 let m;try{m=new DOMMatrix(getComputedStyle(el).transform)}catch(_){m=new DOMMatrix()}const dx=(px-cx)/z,dy=(py-cy)/z;const det=(m.a*m.d-m.b*m.c)||1;
 const mxw=el.closest('.mirw')?-1:1;const lx=(m.d*dx*mxw-m.c*dy)/det,ly=(-m.b*dx*mxw+m.a*dy)/det;return [lx/el.offsetWidth+.5,ly/el.offsetHeight+.5]}
const layerOf=slot=>$(`#sstage img.sl[data-slot="${slot}"]`);
let live=0;
async function paintLive(){const d=ER.drag;if(!d)return;const el=layerOf(d.slot);if(!el)return;const src0=el.dataset.er0||el.getAttribute('src');el.dataset.er0=src0;const u=await eraseUrl(src0,d.all.concat([d.g]));if(ER.drag==d||!ER.drag)el.src=u}
window.addEventListener('pointerdown',e=>{try{if(!ER.on||!ST||!SSEL||SSEL=='jewelry')return;if(!e.target.closest||!e.target.closest('#sstage'))return;const el=layerOf(SSEL);if(!el)return;
 e.preventDefault();e.stopPropagation();pushH();const tf=ST.tf[SSEL];const v=ST.view||'front';const [u,w]=toImg(el,e.clientX,e.clientY);const r=window.BR91||SIZES[ER.size-1]||.06;
 ER.drag={slot:SSEL,v,g:[[+u.toFixed(3),+w.toFixed(3),r]],all:strokesOf(tf,v).slice(),r};paintLive()}catch(_){}},true);
window.addEventListener('pointermove',e=>{const d=ER.drag;if(!d)return;e.preventDefault();e.stopPropagation();const el=layerOf(d.slot);if(!el)return;const [u,w]=toImg(el,e.clientX,e.clientY);const l=d.g[d.g.length-1];
 if(Math.hypot(u-l[0],w-l[1])<d.r*.35||d.g.length>300)return;d.g.push([+u.toFixed(3),+w.toFixed(3),d.r]);const t=Date.now();if(t-live>90){live=t;paintLive()}},true);
window.addEventListener('pointerup',async e=>{const d=ER.drag;if(!d)return;ER.drag=null;e.preventDefault();e.stopPropagation();const tf=ST.tf[d.slot];if(!tf)return;tf.er=tf.er||{};tf.er[d.v]=d.all.concat([d.g]).slice(-40);
 const keep=SSEL;await drawStudio();SSEL=keep;paintSel()},true);
// click that follows an erase stroke must not select another layer
window.addEventListener('click',e=>{if(ER.on&&e.target.closest&&e.target.closest('#sstage')){e.stopPropagation();e.preventDefault()}},true);
{const _ps=paintSel;paintSel=function(){_ps();try{const c=$('#ssel');if(!c||!ST||!SSEL||SSEL=='jewelry'||!ST.items[SSEL])return;const n=strokesOf(ST.tf[SSEL],ST.view||'front').length;
 const at=c.querySelector(':scope>b');(at||c).insertAdjacentHTML(at?'afterend':'afterbegin',`<span class="er74"><button data-er="t" aria-pressed="${ER.on}" title="מחק: מעבירים אצבע על החלק שרוצים להעלים">🧽 מחק</button>${ER.on?`${['קטן','בינוני','גדול'].map((s,i)=>`<button data-er="s${i+1}" aria-pressed="${ER.size==i+1}">${s}</button>`).join('')}`:''}${n?`<button data-er="u" title="ביטול המחיקה האחרונה">↶ ביטול מחיקה</button><button data-er="c" title="מחזיר את כל מה שנמחק בתנוחה הזו">נקי מחיקות</button>`:''}</span>`)}catch(_){}}}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#ssel [data-er]');if(!b||!ST||!SSEL)return;e.preventDefault();e.stopPropagation();const k=b.dataset.er;const tf=ST.tf[SSEL];const v=ST.view||'front';
 if(k=='t'){ER.on=!ER.on;document.body.classList.toggle('er74on',ER.on);if(ER.on)toast('🧽 מעבירים אצבע על החלק שרוצים להעלים. לסיום לוחצים שוב על "מחק"');paintSel();return}
 if(k[0]=='s'){ER.size=+k.slice(1);paintSel();return}
 pushH();if(k=='u'&&tf.er&&tf.er[v]){tf.er[v].pop();if(!tf.er[v].length)delete tf.er[v]}if(k=='c'&&tf.er)delete tf.er[v];const keep=SSEL;await drawStudio();SSEL=keep;paintSel()},true);
document.head.insertAdjacentHTML('beforeend',`<style>
.er74{display:inline-flex;flex:none;gap:5px;align-items:center;padding:0 6px;border-inline:1px solid var(--line)}
.er74 button[aria-pressed=true]{background:var(--fg)!important;color:var(--bg)!important}
body.er74on #sstage{cursor:crosshair;touch-action:none}
</style>`);
}
