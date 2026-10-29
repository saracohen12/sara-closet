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
