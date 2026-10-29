// ---- ties (v36): קשירות למטפחת — גיליון 4 מבטים (חזית / צד / גב / חצי צד) נחתך, הרקע האפור יורד, והקשירה יושבת על הראש בכל התנוחות
const TIES_VER=1;
const TIEV=[['front','חזית'],['side','צד'],['back','גב'],['half','חצי צד']];
// head boxes of the 5-pose avatar (stage 399×1365), measured from av/p5_*.webp
const TIEHEAD={front:{top:38,hh:161,cx:196,w:150},side:{top:38,hh:161,cx:201,w:177},back:{top:38,hh:161,cx:200.5,w:145},half:{top:38,hh:161,cx:198,w:155},hip:{top:255,hh:134,cx:151,w:125}};// v38: measured on the covered base (cap = true head)
const TIEK={front:1.14,side:1.0,back:1.26,half:1.14};const TIEUP={front:.04,side:.08,back:.04,half:.05};
function tieList(id){return ((IT[id]||{}).ties||[]).filter(t=>t&&t.front)}
function tieOf(id,tf){const L=tieList(id);if(!L.length)return null;if(tf&&tf.tie==='')return null;if(tf&&tf.tie){const t=L.find(x=>x.id==tf.tie);if(t)return t}return L[0]}
function tieUrl(t,k){return (t.u&&t.u[k])||('/_blob/'+t[k])}
// ---- slicing (canvas)
function tieLoadImg(file){return new Promise((ok,bad)=>{const u=URL.createObjectURL(file);const im=new Image();im.onload=()=>{URL.revokeObjectURL(u);ok(im)};im.onerror=()=>bad(new Error('img'));im.src=u})}
function tieRead(im){const W=im.naturalWidth,H=im.naturalHeight;const cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0);return {d:x.getImageData(0,0,W,H).data,W,H}}
function tieBgL(d,W,H){const a=[];for(let c=0;c<W;c+=4){for(const r of [0,1,2,H-3,H-2,H-1]){const k=(r*W+c)*4;a.push((d[k]+d[k+1]+d[k+2])/3)}}for(let r=0;r<H;r+=4){for(const c of [0,1,2,W-3,W-2,W-1]){const k=(r*W+c)*4;a.push((d[k]+d[k+1]+d[k+2])/3)}}a.sort((p,q)=>p-q);return a[a.length>>1]}
function tieGroups(d,W,H){// dividers: bright vertical lines
 const colL=new Float32Array(W);for(let c=0;c<W;c++){let s=0;for(let r=0;r<H;r+=2){const k=(r*W+c)*4;s+=d[k]+d[k+1]+d[k+2]}colL[c]=s/(Math.ceil(H/2)*3)}
 const cand=[];for(let c=Math.round(W*.05);c<W*.95;c++)if(colL[c]>234)cand.push(c);
 const grp=[];for(const c of cand){const g=grp[grp.length-1];if(g&&c-g[1]<=3)g[1]=c;else grp.push([c,c])}return grp}
function tieSlice(im,rd,grp0){const {d,W,H}=rd||tieRead(im);const grp=grp0||tieGroups(d,W,H);
 let bounds;if(grp.length==3)bounds=[[0,grp[0][0]],[grp[0][1]+1,grp[1][0]],[grp[1][1]+1,grp[2][0]],[grp[2][1]+1,W]];
 else if(grp.length==4)bounds=[[0,grp[0][0]],[grp[0][1]+1,grp[1][0]],[grp[1][1]+1,grp[2][0]],[grp[2][1]+1,grp[3][0]]];
 else{const w=W/4;bounds=[0,1,2,3].map(i=>[Math.round(i*w),Math.round((i+1)*w)])}
 return bounds.map(([x0,x1],i)=>tieCutPanel(d,W,H,x0+6,x1-6,i))}
// v39: one picture = one tying style (front view). A wide picture with several styles side by side (white lines on a grey background) is split into one style per panel.
function tieSliceN(im,rd,grp0){const {d,W,H}=rd||tieRead(im);let grp=grp0||tieThinGroups(d,W,H);
 const xs=[0];for(const g of grp){xs.push(g[0],g[1]+1)}xs.push(W);let bounds=[];for(let i=0;i<xs.length;i+=2){if(xs[i+1]-xs[i]>W*.08)bounds.push([xs[i],xs[i+1]])}
 if(!bounds.length)bounds=[[0,W]];const pad=bounds.length>1?6:0;return bounds.map(([x0,x1])=>tieCutPanel(d,W,H,x0+pad,x1-pad,0)).filter(Boolean)}
function tieThinGroups(d,W,H){const bgL=tieBgL(d,W,H);return bgL>225?[]:tieGroups(d,W,H).filter(g=>g[1]-g[0]<W*.02)}
// v40: a picture with 4 panels is one tying style seen from 4 sides (the Gemini sheet); anything else is one style per panel/picture
function tieIsSheet4(grp,W){return grp.length==3||(grp.length==4&&grp[3][0]>W*.9)}
function tieCutPanel(d,W,H,x0,x1,pi){const pw=x1-x0;let HOLE=null;
 // background = median of the border samples
 const sm=[[],[],[]];const push=(r,c)=>{const k=(r*W+c)*4;sm[0].push(d[k]);sm[1].push(d[k+1]);sm[2].push(d[k+2])};
 for(let c=x0;c<x1;c+=3){for(let r=0;r<10;r++)push(r,c);for(let r=H-10;r<H;r++)push(r,c)}for(let r=0;r<H;r+=3){for(let c=x0;c<x0+10;c++)push(r,c);for(let c=x1-10;c<x1;c++)push(r,c)}
 const med=a=>{a.sort((p,q)=>p-q);return a[a.length>>1]};const bg=[med(sm[0]),med(sm[1]),med(sm[2])];const bgL=(bg[0]+bg[1]+bg[2])/3;
 const out=new Uint8ClampedArray(pw*H*4);let minx=pw,maxx=0,miny=H,maxy=0;
 for(let r=0;r<H;r++)for(let c=0;c<pw;c++){const k=(r*W+x0+c)*4;const R=d[k],G=d[k+1],B=d[k+2];const L=(R+G+B)/3;const dd=Math.abs(R-bg[0])+Math.abs(G-bg[1])+Math.abs(B-bg[2]);
  let a=0;if(L>bgL+8)a=Math.min(1,(L-bgL-9)/34);else if(dd>60)a=Math.min(1,(dd-60)/40);
  const o=(r*pw+c)*4;if(a>0.02){const ia=Math.max(a,.05);out[o]=Math.max(0,Math.min(255,(R-bg[0]*(1-a))/ia));out[o+1]=Math.max(0,Math.min(255,(G-bg[1]*(1-a))/ia));out[o+2]=Math.max(0,Math.min(255,(B-bg[2]*(1-a))/ia));out[o+3]=Math.round(a*255);if(a>0.08){if(c<minx)minx=c;if(c>maxx)maxx=c;if(r<miny)miny=r;if(r>maxy)maxy=r}}}
 if(maxx<=minx||maxy<=miny)return null;
 if(pi==0||pi==3){// face opening: flood from inside the dome over non-solid pixels, only in the upper part
  const ch0=maxy-miny+1;const lim=miny+Math.round(ch0*.4);let dw0=0,dx0=pw,dx1=0;for(let r=miny;r<miny+Math.round(ch0*.38);r++){let a0=-1,a1=-1;for(let c=0;c<pw;c++){if(out[(r*pw+c)*4+3]>20){if(a0<0)a0=c;a1=c}}if(a0>=0){if(a1-a0>dw0)dw0=a1-a0;if(a0<dx0)dx0=a0;if(a1>dx1)dx1=a1}}
  const cx0=(dx0+dx1)/2;const seeds=pi==0?[[0,.2],[-.1,.22],[.1,.22],[0,.3]]:[[-.18,.2],[-.08,.24],[-.25,.26],[0,.22]];const seen=new Uint8Array(pw*H);const st=[];
  for(const [fx,fy] of seeds){st.push(Math.round(cx0+fx*dw0),miny+Math.round(ch0*fy))}
  const lim2=miny+Math.round(ch0*.6);let hTop=H,hBot=0;const FL=[];while(st.length){const r=st.pop(),c=st.pop();if(c<0||r<miny||c>=pw||r>=lim2)continue;if(Math.abs(c-cx0)>dw0*(r>=lim?.3:.45))continue;const k=r*pw+c;if(seen[k])continue;const k4=(r*W+x0+c)*4;const Lp=(d[k4]+d[k4+1]+d[k4+2])/3;const dq=Math.abs(d[k4]-bg[0])+Math.abs(d[k4+1]-bg[1])+Math.abs(d[k4+2]-bg[2]);if(Lp>=bgL+36||dq<14)continue;seen[k]=1;FL.push(k,out[k*4+3]);out[k*4+3]=Math.round(out[k*4+3]*.1);if(r<hTop)hTop=r;if(r>hBot)hBot=r;st.push(c+1,r,c-1,r,c,r+1,c,r-1)}
  // v39: a dark fabric would be eaten by the flood — if more than half of the upper dome went transparent, undo (no face opening)
  let solid=0;for(let r=miny;r<lim2;r++)for(let c=0;c<pw;c++){const k=r*pw+c;if(out[k*4+3]>20||seen[k])solid++}
  if(FL.length/2>solid*.5){for(let i=0;i<FL.length;i+=2)out[FL[i]*4+3]=FL[i+1];hTop=H;hBot=0}
  if(hBot>hTop+20)HOLE={top:hTop-miny,bottom:hBot-miny}}
 minx=Math.max(0,minx-2);miny=Math.max(0,miny-2);maxx=Math.min(pw-1,maxx+2);maxy=Math.min(H-1,maxy+2);const cw=maxx-minx+1,ch=maxy-miny+1;
 const cv=document.createElement('canvas');cv.width=cw;cv.height=ch;const x=cv.getContext('2d');const img=new ImageData(out,pw,H);const tmp=document.createElement('canvas');tmp.width=pw;tmp.height=H;tmp.getContext('2d').putImageData(img,0,0);x.drawImage(tmp,minx,miny,cw,ch,0,0,cw,ch);
 // dome = widest row within the top 38%
 let dw=0,dx0=cw,dx1=0;const lim=Math.round(ch*.38);for(let r=0;r<lim;r++){let a0=-1,a1=-1;for(let c=0;c<cw;c++){const al=out[((r+miny)*pw+minx+c)*4+3];if(al>20){if(a0<0)a0=c;a1=c}}if(a0>=0){if(a1-a0>dw)dw=a1-a0;if(a0<dx0)dx0=a0;if(a1>dx1)dx1=a1}}
 // v43: top band widths (garment fitting): widest row in the top 12%, and in the top 3%
 let topW=0,tx0=cw,tx1=0,top3=0;const l12=Math.max(1,Math.round(ch*.12)),l3=Math.max(1,Math.round(ch*.03));for(let r=0;r<l12;r++){let a0=-1,a1=-1;for(let c=0;c<cw;c++){const al=out[((r+miny)*pw+minx+c)*4+3];if(al>20){if(a0<0)a0=c;a1=c}}if(a0>=0){if(a1-a0>topW)topW=a1-a0;if(a0<tx0)tx0=a0;if(a1>tx1)tx1=a1;if(r<l3&&a1-a0>top3)top3=a1-a0}}
 // downscale to max 1000px height to keep assets small
 let fc=cv;const sc=Math.min(1,1000/ch);if(sc<1){fc=document.createElement('canvas');fc.width=Math.round(cw*sc);fc.height=Math.round(ch*sc);fc.getContext('2d').drawImage(cv,0,0,fc.width,fc.height)}
 return {canvas:fc,w:fc.width,h:fc.height,domeW:dw*sc,domeCx:(dx0+dx1)/2*sc,topW:topW*sc,topCx:(tx0+tx1)/2*sc,top3:top3*sc,hole:HOLE?{top:HOLE.top*sc,bottom:HOLE.bottom*sc}:null}}
function tieFit(view,c){const h=TIEHEAD[view]||TIEHEAD.front;let s=(h.w*(TIEK[view]||1.1))/Math.max(1,c.domeW);let top=h.top-(TIEUP[view]||.04)*h.hh;
 if(c.hole&&(view=='front'||view=='half')){top=(h.top+0.1*h.hh)-c.hole.top*s}
 return {x:Math.round((h.cx+(c.w/2-c.domeCx)*s)/399*1000)/10,y:Math.round((top+c.h*s/2)/1365*1000)/10,w:Math.round(c.w*s/399*1000)/10}}
const tieBlob=cv=>new Promise(ok=>cv.toBlob(ok,'image/png'));
// ---- upload flow (v40): several pictures at once; 4 panels = one style from 4 sides, else one style per picture/panel; names from the field (comma separated) or the chips
function tieSt(id,k,msg){UPST[id+'_tm']=[k,msg];const s=document.querySelector(`[data-imgrow="${id}"] .tiesbox .tst`);if(!s)return setSt(id,k,msg);s.className='tst st2 '+k;s.textContent=msg}
window.tieSt=tieSt;
function tieNameField(id){return document.querySelector(`[data-imgrow="${id}"] .tiename`)}
function tieNames(id){const f=tieNameField(id);return ((f&&f.value)||'').split(/[,،\n;]+/).map(x=>x.trim()).filter(Boolean)}
const TIE_DEFAULT_NAMES=['קשר מאחור','שובל נשפך','קוקו נמוך','טורבן גבוה','פפיון צדי','קשירה נמוכה בשכבות','צמה מסביב','קשר בצד','טורבן נמוך'];
function tieKnownNames(){const seen=new Set();const out=[];const add=n=>{n=(n||'').replace(/\s+\d+$/,'').trim();if(n&&!seen.has(n)){seen.add(n);out.push(n)}};
 try{Object.keys(IT||{}).forEach(k=>((IT[k]||{}).ties||[]).forEach(t=>add(t.n)))}catch(_){}TIE_DEFAULT_NAMES.forEach(add);return out}
let TIE_SEQ=0;function tieId(){return 't'+Date.now().toString(36)+(TIE_SEQ++).toString(36)}
async function upTies(id,files,mode){files=[...(files||[])].filter(Boolean);if(!files.length)return;if(UPST[id]=='busy'){toast('רגע, עוד שומרת');return}
 let a=null;try{a=await claude.use('assets')}catch(_){}if(!a){toast('העלאת תמונות לא זמינה כאן');tieSt(id,'err','העלאת תמונות לא זמינה כאן');return}
 const names=tieNames(id);const base=tieList(id).length;UPST[id]='busy';const made=[];let fails=0;
 try{for(let i=0;i<files.length;i++){tieSt(id,'busy',files.length>1?`קוראת תמונה ${i+1} מתוך ${files.length}…`:'קוראת את התמונה…');let im;try{im=await tieLoadImg(files[i])}catch(_){fails++;continue}
   const rd=tieRead(im);const grp=tieThinGroups(rd.d,rd.W,rd.H);
   if(mode=='tie4'||tieIsSheet4(grp,rd.W)){const cuts=tieSlice(im,rd,grp);if(!cuts[0]){fails++;continue}const t={id:tieId(),n:'',t:Date.now(),fit:{},u:{}};
    for(let k=0;k<4;k++){const c=cuts[k];if(!c)continue;const v=TIEV[k][0];tieSt(id,'busy',`שומרת ${TIEV[k][1]} של קשירה ${made.length+1}…`);const r=await a.upload(await tieBlob(c.canvas));t[v]=r.id;if(r.url)t.u[v]=r.url;t.fit[v]=tieFit(v,c);if(c.hole)t.fit[v].hole=1}
    made.push(t)}
   else{const cuts=tieSliceN(im,rd,grp);if(!cuts.length){fails++;continue}
    for(const c of cuts){tieSt(id,'busy',`שומרת קשירה ${made.length+1}…`);const r=await a.upload(await tieBlob(c.canvas));const t={id:tieId(),n:'',t:Date.now(),front:r.id,u:{},fit:{front:tieFit('front',c)},one:1};if(r.url)t.u.front=r.url;if(c.hole)t.fit.front.hole=1;made.push(t)}}}
  const N=made.length;made.forEach((t,i)=>{t.n=!names.length?('קשירה '+(base+i+1)):(names.length==1&&N>1?names[0]+' '+(i+1):(names[i]||('קשירה '+(base+i+1))))});
  if(N)await putItem(id,{ties:tieList(id).concat(made)});
  UPST[id]='';
  if(!N){tieSt(id,'err','לא מצאתי קשירה בתמונות. צריך תמונה על רקע חלק ואחיד (אפור בהיר הכי טוב)');toast('לא הצלחתי לחתוך את התמונות');renderImgRow(id);return}
  const n4=made.filter(t=>t.side||t.back).length;const msg=(N>1?`✓ נשמרו ${N} קשירות`:'✓ הקשירה נשמרה')+(n4?(N>1?` (${n4} מהן מ-4 כיוונים)`:' מ-4 כיוונים'):'')+(fails?` · ${fails} תמונות לא הצלחתי לקרוא`:'');
  tieSt(id,fails?'err':'ok',msg+'. לחיצה על קשירה = על הדמות');toast(msg);const f=tieNameField(id);if(f)f.value='';renderImgRow(id);return made}
 catch(e){UPST[id]='';tieSt(id,'err','לא הצלחתי לשמור. נסי שוב');toast('לא הצלחתי לשמור');renderImgRow(id)}}
window.upTies=upTies;
{const _ru=routeUp;routeUp=async function(id,f,mode){if(mode=='tie'||mode=='tie4')return upTies(id,[f],mode);return _ru(id,f,mode)}}
const TIEPROMPT=`מצורפת תמונה של מטפחת/כיסוי ראש שלי.
צרי תמונה אחת רחבה עם 4 חלקים שווים זה לצד זה, מופרדים בקו לבן דק, על רקע אפור בהיר חלק ואחיד.
בכל חלק: אותו כיסוי הראש בדיוק (אותו בד, צבעים, דוגמה, פנינים/קישוטים) קשור על ראש בלתי נראה (invisible mannequin, בלי פנים ובלי שיער), בקשירה: ___ (למשל: קשר מאחור עם זנבות, טורבן, צמה מסביב, קשר בצד).
סדר החלקים: 1 חזית (מבט ישר, פתח הפנים ריק), 2 פרופיל צד, 3 גב, 4 חצי צד.
אותו גודל ראש ואותו גובה בכל 4 החלקים, הראש במרכז החלק העליון, זנבות המטפחת נופלים למטה. בלי טקסט, בלי חפצים נוספים, בלי צל על הרקע.`;
const TIEPROMPT5=`מצורפת תמונה של מטפחת/כיסוי ראש שלי.
צרי תמונה אחת רחבה עם 5 חלקים שווים זה לצד זה, מופרדים בקו לבן דק, על רקע אפור בהיר חלק ואחיד.
בכל חלק: אותו כיסוי הראש בדיוק (אותו בד, צבעים, דוגמה, פנינים/קישוטים) קשור על ראש בלתי נראה (invisible mannequin, בלי פנים ובלי שיער), במבט ישר מקדימה, פתח הפנים ריק.
כל חלק בקשירה אחרת: 1 ___ 2 ___ 3 ___ 4 ___ 5 ___ (למשל: קשר מאחור עם זנבות, טורבן, צמה מסביב, קשר בצד, פפיון למעלה).
אותו גודל ראש ואותו גובה בכל 5 החלקים, הראש במרכז החלק העליון, זנבות המטפחת נופלים למטה. בלי טקסט, בלי חפצים נוספים, בלי צל על הרקע.`;
// ---- item dialog section (scarves only)
function tiesHTML(id){const L=tieList(id);const [sk,sm]=UPST[id+'_tm']||['',''];const chips=tieKnownNames();
 return `<span class="tst st2 ${sk}">${esc(sm)}</span>
 ${L.length?`<div class="tiel">${L.map(t=>`<figure data-tieid="${t.id}"><button class="tryb" data-tietry="${t.id}" title="על הדמות"><img src="${tieUrl(t,'front')}" alt="" loading="lazy"><span class="tag">👗</span>${t.side||t.back?'<span class="v4" title="מ-4 כיוונים">↻</span>':''}</button><figcaption><button class="tn" data-tiern="${t.id}" title="שינוי שם">${esc(t.n)}</button><button class="lnk del" data-tiedel="${t.id}" title="מחיקה">🗑</button></figcaption></figure>`).join('')}</div>`:'<p class="tiemp">עדיין אין קשירות לכיסוי הזה. העלי תמונות של הכיסוי קשור, וכל קשירה תופיע כאן ועל הדמות.</p>'}
 <div class="ib tieact"><button class="go" data-upimg="${id}" data-upm="tie">➕ הוסיפי קשירות</button><button data-tiepaste="${id}">📋 הדביקי</button></div>
 <div class="ib"><input class="tiename" placeholder="שם לקשירה (כמה שמות – בפסיקים)" maxlength="120"></div>
 <div class="tiechips">${chips.map(n=>`<button class="chip" data-tiechip="${esc(n)}">${esc(n)}</button>`).join('')}</div>
 <small class="tiehint">תמונה עם 4 חלקים = קשירה אחת מ-4 כיוונים · 5 חלקים או תמונות נפרדות = קשירה לכל תמונה · רקע אפור חלק, בלי פנים ושיער</small>
 <details class="tieadv"><summary>📋 פרומפטים ל-Gemini</summary><div class="ib"><button data-tiecopy="4">קשירה אחת מ-4 כיוונים</button><button data-tiecopy="5">5 קשירות בתמונה אחת</button></div></details>`}
{const _rr=renderImgRow;renderImgRow=function(id){_rr(id);const el=document.querySelector(`[data-imgrow="${id}"]`);if(!el)return;let box=el.querySelector('.tiesbox');
 if(curCat(id)!='scarves'){if(box)box.remove();return}
 if(!box){const dm=el.querySelector('details.dmore');const h='<details class="tiesbox" open><summary>🧕 קשירות של הכיסוי על הדמות</summary><div class="tieslot"></div></details>';if(dm)dm.insertAdjacentHTML('beforebegin',h);else el.insertAdjacentHTML('beforeend',h);box=el.querySelector('.tiesbox')}
 box.querySelector('.tieslot').innerHTML=tiesHTML(id)}}
document.addEventListener('click',async e=>{const t=e.target;if(!t.closest)return;
 const cp=t.closest('[data-tiecopy]');if(cp){e.preventDefault();e.stopPropagation();const txt=cp.dataset.tiecopy=='5'?TIEPROMPT5:TIEPROMPT;(navigator.clipboard?.writeText?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>toast('✓ הפרומפט הועתק. הדביקי ב-Gemini או GPT')).catch(()=>{const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toast('✓ הפרומפט הועתק')}catch(_){toast('לא הצלחתי להעתיק')}ta.remove()});return}
 const tr=t.closest('[data-tietry]');if(tr){e.preventDefault();e.stopPropagation();const id=tr.closest('[data-imgrow]').dataset.imgrow;const tid=tr.dataset.tietry;await openStudio(null,{scarf:id});
  if(ST&&ST.items.scarf==id){const x=tieList(id).find(z=>z.id==tid);if(x){ST.tf.scarf=Object.assign(ST.tf.scarf||{},{tie:tid},x.fit.front||{});await drawStudio();toast('👗 "'+x.n+'" על הדמות')}}return}
 const ch=t.closest('[data-tiechip]');if(ch){e.preventDefault();e.stopPropagation();const f=ch.closest('.tiesbox').querySelector('.tiename');if(f){const v=f.value.trim();f.value=v?(v.replace(/[,،]\s*$/,'')+', '+ch.dataset.tiechip):ch.dataset.tiechip}return}
 const pb=t.closest('[data-tiepaste]');if(pb){e.preventDefault();e.stopPropagation();const id=pb.dataset.tiepaste;
  try{if(!navigator.clipboard||!navigator.clipboard.read)throw 0;const its=await navigator.clipboard.read();const fs=[];for(const ci of its){const ty=ci.types.find(x=>x.startsWith('image/'));if(ty){const b=await ci.getType(ty);fs.push(new File([b],'paste.'+ty.split('/')[1],{type:ty}))}}
   if(fs.length)return upTies(id,fs,'tie');tieSt(id,'err','אין תמונה בהעתקה. העתיקי תמונה ונסי שוב');return}
  catch(_){const box=pb.closest('.tiesbox');let z=box.querySelector('[data-tiepz]');if(!z){pb.closest('.ib').insertAdjacentHTML('afterend',`<div class="pz tiepz" contenteditable="true" data-tiepz="${id}" inputmode="none">לחיצה ארוכה כאן ← "הדבק"</div>`);z=box.querySelector('[data-tiepz]')}
   z.focus();tieSt(id,'busy','הדפדפן לא נותן לקרוא את ההעתקה מהכפתור. לחיצה ארוכה בתיבה ← "הדבק"')}return}
 const rn=t.closest('[data-tiern]');if(rn){e.stopPropagation();const id=rn.closest('[data-imgrow]').dataset.imgrow;const ties=tieList(id).map(x=>({...x}));const x=ties.find(z=>z.id==rn.dataset.tiern);const n=prompt('שם לקשירה:',x.n);if(n==null)return;x.n=n.trim()||x.n;await putItem(id,{ties});renderImgRow(id);return}
 const dl=t.closest('[data-tiedel]');if(dl){e.stopPropagation();const id=dl.closest('[data-imgrow]').dataset.imgrow;if(!sure(dl,'בטוח? לחצי שוב'))return;const ties=tieList(id).filter(z=>z.id!=dl.dataset.tiedel);await putItem(id,{ties});renderImgRow(id);toast('הקשירה נמחקה');return}
},true);
document.addEventListener('paste',e=>{const box=e.target&&e.target.closest&&e.target.closest('.tiesbox');if(!box)return;const id=(box.closest('[data-imgrow]')||{}).dataset?.imgrow;if(!id)return;
 const fs=[...(e.clipboardData?.items||[])].filter(i=>i.kind=='file'&&i.type.startsWith('image/')).map(i=>i.getAsFile()).filter(Boolean);
 if(fs.length){e.preventDefault();e.stopPropagation();upTies(id,fs,'tie')}else if(e.target.closest('[data-tiepz]')){e.preventDefault();e.stopPropagation();toast('אין תמונה בהעתקה')}},true);
document.addEventListener('input',e=>{const z=e.target.closest&&e.target.closest('[data-tiepz]');if(!z)return;const im=z.querySelector('img');const id=z.dataset.tiepz;
 if(im&&im.src){fetch(im.src).then(r=>r.blob()).then(b=>{if(b.type.startsWith('image/'))upTies(id,[new File([b],'paste',{type:b.type})],'tie')}).catch(()=>toast('לא הצלחתי לקרוא את התמונה שהודבקה'))}z.textContent='לחיצה ארוכה כאן ← "הדבק"'});
document.addEventListener('focusin',e=>{const z=e.target.closest&&e.target.closest('[data-tiepz]');if(z)z.textContent=''});
document.addEventListener('focusout',e=>{const z=e.target.closest&&e.target.closest('[data-tiepz]');if(z&&!z.textContent.trim())z.textContent='לחיצה ארוכה כאן ← "הדבק"'});
// ---- studio: the tie replaces the flat scarf picture, in every pose
{const _so=srcOf;srcOf=async function(slot,id,tf){if(slot=='scarf'&&!(tf&&tf.raw)){const t=tieOf(id,tf);if(t){const v=ST?(ST.view||'front'):'front';const k=(v=='back'&&t.back)?'back':'front';return tieUrl(t,k)}}return _so(slot,id,tf)}}
{const _at=autoTf;autoTf=async function(slot,id,fresh){if(slot=='scarf'){const t=tieOf(id,ST&&ST.tf&&ST.tf[slot]);if(t&&t.fit&&t.fit.front)return Object.assign({r:0,tie:t.id},t.fit.front)}return _at(slot,id,fresh)}}
function tieStyle(f,z){return `left:${f.x}%;top:${f.y}%;width:${f.w}%;z-index:${z};transform:translate(-50%,-50%)`}
{const _si=stageInner;stageInner=async function(S,opt={}){let html=await _si(S,opt);if((S.avbase||'long')!='p5'||!S.items.scarf)return html;
 const id=S.items.scarf,tf=S.tf.scarf||{};const t=tieOf(id,tf);if(!t||tf.raw||tf.hidden)return html;const v=S.view||'front';
 if(v=='back'&&t.fit.back){html=html.replace(/(<img class="sl[^"]*" data-slot="scarf"[^>]*style=")[^"]*(")/,(m,a,b)=>a+tieStyle(t.fit.back,tf.z!=null?tf.z:SLOTZ.scarf)+b)}
 if((v=='side'||v=='half')&&t[v]&&t.fit[v]){const fit=t.fit[v];const re=/<img class="sl ap" data-slot="scarf"[^>]*>/;const tag=`<img class="sl ap" data-slot="scarf" src="${tieUrl(t,v)}" style="${tieStyle(fit,tf.z!=null?tf.z:SLOTZ.scarf)}" alt="" draggable="false">`;
  if(re.test(html))html=html.replace(re,tag);else html=stageAdd(html,tag);
  // the "approximate" note is only about the other garments
  if(Object.keys(S.items).filter(k=>S.items[k]).length==1)html=html.replace(/<p class="p5note sm">[\s\S]*?<\/p>/,'')}
 return html}}
// default tie when a scarf is placed
{const _lo=layerOrder;layerOrder=function(slot){_lo(slot);if(slot=='scarf'&&ST&&ST.items.scarf){const t=tieOf(ST.items.scarf,ST.tf.scarf);if(t&&ST.tf.scarf&&!ST.tf.scarf.tie)ST.tf.scarf.tie=t.id}}}
// bottom panel: choose a tie
{const _ps=paintSel;paintSel=function(){_ps();const c=$('#ssel');if(!c||!ST||SSEL!='scarf')return;const id=ST.items.scarf;const L=tieList(id);if(!L.length)return;const tf=ST.tf.scarf||{};const cur=tf.tie===''?'':(tieOf(id,tf)||{}).id;
 c.insertAdjacentHTML('beforeend',`<div class="lpics ties"><span>🧕 קשירה:</span>${L.map(t=>`<button data-tie="${t.id}" aria-pressed="${cur==t.id}"><img src="${tieUrl(t,'front')}" alt=""><small>${esc(t.n)}</small></button>`).join('')}<button data-tie="" aria-pressed="${cur===''}"><img src="${img(id)||TPH}" alt=""><small>תמונת המוצר</small></button></div>`)}}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#ssel [data-tie]');if(!b||!ST||!ST.items.scarf)return;e.stopPropagation();pushH();const tf=ST.tf.scarf;const id=ST.items.scarf;
 if(b.dataset.tie===''){tf.tie='';const f=await (async()=>{const t=ST.tf.scarf;ST.tf.scarf={raw:t.raw};const r=await autoTf('scarf',id,true);ST.tf.scarf=t;return r})();Object.assign(tf,{x:f.x,y:f.y,w:f.w})}
 else{tf.tie=b.dataset.tie;const t=tieOf(id,tf);if(t&&t.fit.front)Object.assign(tf,t.fit.front)}
 const keep=SSEL;await drawStudio();SSEL=keep;$$('#sstage img.sl').forEach(z=>z.classList.toggle('sel',z.dataset.slot==keep));paintSel()},true);
// ---- v37: covered base — when av/p5c_*.webp exist (same 5 poses, hair tucked under a cap), a look with a scarf uses them automatically
let P5COV=null;function p5covCheck(){if(P5COV!=null)return;P5COV=false;const im=new Image();im.onload=()=>{P5COV=true;if(ST&&$('#studio')&&$('#studio').open)drawStudio()};im.onerror=()=>{P5COV=false};im.src='av/p5c_front.webp'}
{const _os=openStudio;openStudio=async function(look,items){p5covCheck();return _os(look,items)}}
{const _si=stageInner;stageInner=async function(S,opt={}){let html=await _si(S,opt);if((S.avbase||'long')!='p5'||!P5COV)return html;
 if(S.head!='wig')html=html.replace(/src="av\/p5_(front|side|back|half|hip|front_headonly|back_headonly)\.webp"/g,'src="av/p5c_$1.webp"');return html}}
