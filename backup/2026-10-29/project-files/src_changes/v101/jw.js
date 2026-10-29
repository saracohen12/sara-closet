// ---- v53 (2026-10-21): תכשיטים על האווטאר — GPT draws the set as 3 panels (necklace / one earring / bracelet); the site cuts them and puts
// the necklace at the neck, the earring on BOTH ears (mirrored for the second ear) and the bracelet on the wrist, in every pose of the new avatar
const JWPARTS=[['neck','שרשרת'],['ear','עגיל'],['brac','צמיד']];
// landmarks in the 399×1365 avatar frame: ear lobes, neck (centre x, top y, width), wrists
const JWL={front:{ear:[[148,185],[255,185]],neck:[200,276,96],wrist:[[52,688],[348,688]]},side:{ear:[[215,185]],neck:[142,278,96,1],wrist:[[76,802]]},half:{ear:[[280,185]],neck:[215,278,80],wrist:[[102,792]]},hip:{ear:[[127,395],[202,395]],neck:[161,458,70],wrist:[[203,714]]},back:{neck:[200,256,90,0,1]}};
const JWVIEWS=['front','side','back','half','hip'];
// v62: the old bases (long / short) – front only
const JWLB={long:{front:{ear:[[147,165],[253,165]],neck:[200,232,100],wrist:[[48,745],[362,745]]},back:{}},short:{front:{ear:[[148,175],[255,175]],neck:[200,242,100],wrist:[[42,725],[368,692]]},back:{}}};
const JWPROMPT=`מצורפת תמונה של תכשיט (או סט תכשיטים) שקניתי.
צרי תמונה אחת רחבה עם 3 חלקים שווים זה לצד זה, מופרדים בקו לבן דק, על רקע אפור בהיר חלק ואחיד, בסדר הזה בדיוק:
1) שרשרת  2) עגיל אחד  3) צמיד.
בכל חלק מופיע רק החלק הזה מהתכשיט שבתמונה, בלי גוף, בלי צוואר, בלי אוזן, בלי יד ואצבעות, בלי קופסה, בלי צל, בלי טקסט.
אם חלק לא קיים בסט (למשל אין צמיד) – להשאיר את החלק ריק, רק הרקע האפור.
שרשרת: מלפנים, כמו שהיא תלויה על צוואר: בצורת U פתוחה, התליון למטה באמצע. רק החלק שרואים מלפנים – משני צידי הצוואר ולמטה עד התליון. החלק שמאחורי הצוואר והסוגר לא מופיעים: שני הקצוות העליונים נגמרים בצידי הצוואר.
עגיל: עגיל אחד בלבד, מלפנים, תלוי ישר כלפי מטה, החלק שנכנס לאוזן למעלה.
צמיד: מלפנים, כמו על פרק יד (עיגול או קשת).
לא לשנות צבע, צורה, חומר, אבנים או אורך. גודל יחסי נכון: השרשרת גדולה מהעגיל, העגיל גדול מהצמיד רק אם כך באמת.
כל חלק ממלא את גובה החלק שלו אבל לא נוגע בקווים הלבנים.`;
function jwParts(id){const p=(IT[id]||{}).jwp;return Array.isArray(p)?p.filter(k=>JWPARTS.some(([q])=>q==k)):['neck']}
function jwPromptFor(parts){const k=Array.isArray(parts)?parts[0]:parts;const n=(JWPARTS.find(([q])=>q==k)||[0,'תכשיט'])[1];
 const base=`מצורפת תמונה של ${n} שקניתי.\n`;const tail=`\nבלי גוף, בלי צוואר, בלי אוזן, בלי יד ואצבעות, בלי קופסה, בלי צל, בלי טקסט וכיתובים. לא לשנות צבע, צורה, חומר, אבנים או אורך.`;
 if(k=='neck')return base+`צרי תמונה אחת רחבה עם 5 חלקים שווים זה לצד זה, מופרדים בקו לבן דק, על רקע אפור בהיר חלק ואחיד. בכל חלק רק השרשרת, באותו גודל, בסדר הזה בדיוק:
1) מלפנים, כמו שהיא תלויה על צוואר: בצורת U פתוחה, התליון למטה באמצע  2) מהצד (פרופיל)  3) מאחור (רק השרשרת עם הסוגר)  4) חצי צד  5) מלפנים בזווית קלה.
בכל זווית רק החלק של השרשרת שרואים ממנה כשהיא על הצוואר – החלק שמאחורי הצוואר לא מופיע. מלפנים: משני צידי הצוואר ולמטה עד התליון, בלי החלק האחורי ובלי הסוגר. מאחור: רק הקשת הקטנה שעל העורף עם הסוגר.
כל חלק ממלא את גובה החלק שלו אבל לא נוגע בקווים הלבנים.`+tail;
 if(k=='ear')return base+`צרי תמונה אחת של עגיל אחד בלבד, מלפנים, תלוי ישר כלפי מטה, החלק שנכנס לאוזן למעלה, על רקע אפור בהיר חלק ואחיד. תמונה אחת, לא כמה זוויות. העגיל ממלא את גובה התמונה.`+tail;
 return base+`צרי תמונה אחת של הצמיד בלבד, מלפנים, כמו על פרק יד (עיגול או קשת), על רקע אפור בהיר חלק ואחיד. תמונה אחת, לא כמה זוויות. הצמיד ממלא את גובה התמונה.`+tail}
function jwOf(id){const _j=(IT[id]||{}).jw;if(_j&&_j.__delete__){delete IT[id].jw}
const j=(IT[id]||{}).jw;return j&&(j.neck||j.ear||j.brac)?j:null}
function jwUrl(j,k,v){if(v&&v!='front'&&j.v&&j.v[k]&&j.v[k][v])return (j.uv&&j.uv[k]&&j.uv[k][v])||('/_blob/'+j.v[k][v]);return (j.u&&j.u[k])||('/_blob/'+j[k])}
function jwAsp(j,k,v){if(v&&v!='front'&&j.av&&j.av[k]&&j.av[k][v])return j.av[k][v];return (j.a&&j.a[k])||1}
function jwViews(j,k){return j.v&&j.v[k]?1+Object.keys(j.v[k]).length:1}
function jwWipeLabels(d,W,H,b){for(const [x0,x1] of b){const bx=Math.min(W-1,x0+4),by=4;const bi=(by*W+bx)*4;const br=d[bi],bg=d[bi+1],bb=d[bi+2];const dark=y=>{for(let x=x0+2;x<x1-2;x+=2){const i=(y*W+x)*4;if(Math.abs(d[i]-br)+Math.abs(d[i+1]-bg)+Math.abs(d[i+2]-bb)>90)return true}return false};
  const top=Math.round(H*.22);let y=0;while(y<top&&!dark(y))y++;if(y>=top)continue;const s0=y;while(y<top&&dark(y))y++;const s1=y;let gap=0;while(y<H&&!dark(y)&&gap<40){y++;gap++}if(gap<8||s1-s0>H*.1)continue;
  for(let yy=s0;yy<s1;yy++)for(let x=x0;x<x1;x++){const i=(yy*W+x)*4;d[i]=br;d[i+1]=bg;d[i+2]=bb;d[i+3]=255}}}
function jwSlice(im,N){N=N||3;const rd=tieRead(im);const {d,W,H}=rd;const grp=tieThinGroups(d,W,H);const xs=[0];for(const g of grp){xs.push(g[0],g[1]+1)}xs.push(W);let b=[];for(let i=0;i<xs.length;i+=2){if(xs[i+1]-xs[i]>W*.08)b.push([xs[i],xs[i+1]])}
 jwWipeLabels(d,W,H,b.length?b:[[0,W]]);let views=null;if(N==1){if(b.length>=4){views=b.slice(0,5)}b=b.length>=2?[b[0]]:[[0,W]]}else if(b.length!=N){const w=W/N;b=[...Array(N).keys()].map(i=>[Math.round(i*w),Math.round((i+1)*w)])}
 const cut=([x0,x1],pad)=>{try{const c=tieCutPanel(d,W,H,x0+pad,x1-pad,0);if(!c||c.w<8||c.h<8||c.w*c.h<(x1-x0)*H*.002)return null;return p5gClean(c)}catch(_){return null}};
 const out=b.map(r=>cut(r,N>1?6:0));if(views){out.views={};views.forEach((r,i)=>{if(i)out.views[JWVIEWS[i]]=cut(r,6)})}return out}
function jwSt(id,k,msg){UPST[id+'_jw']=[k,msg];const s=document.querySelector(`[data-imgrow="${id}"] .jwbox .gst`);if(!s)return setSt(id,k,msg);s.className='gst st2 '+k;s.textContent=msg}
async function upJw(id,file,part){part=JWPARTS.some(([q])=>q==part)?part:(jwParts(id)[0]||'neck');const pn=JWPARTS.find(([q])=>q==part)[1];if(UPST[id]=='busy'){toast('רגע, עוד שומרת');return}let a=null;try{a=await claude.use('assets')}catch(_){}if(!a){jwSt(id,'err','העלאת תמונות לא זמינה כאן');return}
 UPST[id]='busy';jwSt(id,'busy','מורידה רקע מה'+pn+'…');let cuts;try{cuts=jwSlice(await tieLoadImg(file),1)}catch(_){UPST[id]='';jwSt(id,'err','לא הצלחתי לקרוא את התמונה');return}
 const c=cuts[0];if(!c){UPST[id]='';jwSt(id,'err','לא מצאתי '+pn+' בתמונה. צריך תמונה על רקע אפור אחיד');return}
 const old=(IT[id]||{}).jw||{};const j=JSON.parse(JSON.stringify(old));j.u=j.u||{};j.a=j.a||{};j.t=Date.now();if(j.__delete__)delete j.__delete__;
 try{jwSt(id,'busy',`שומרת ${pn}…`);const r=await a.upload(await tieBlob(c.canvas));j[part]=r.id;j.u[part]=r.url||'';if(!r.url)delete j.u[part];j.a[part]=Math.round(c.w/c.h*100)/100;
  if(j.v)delete j.v[part];if(j.uv)delete j.uv[part];if(j.av)delete j.av[part];
  const VW=cuts.views;if(VW&&(part=='neck'||part=='ear')){j.v=j.v||{};j.uv=j.uv||{};j.av=j.av||{};j.v[part]={};j.uv[part]={};j.av[part]={};for(const vn of Object.keys(VW)){const cv=VW[vn];if(!cv)continue;jwSt(id,'busy',`שומרת ${pn} – ${(POSES.find(([q])=>q==vn)||[0,vn])[1]}…`);const rv=await a.upload(await tieBlob(cv.canvas));j.v[part][vn]=rv.id;if(rv.url)j.uv[part][vn]=rv.url;j.av[part][vn]=Math.round(cv.w/cv.h*100)/100}}
  await putItem(id,{jw:j});UPST[id]='';jwSt(id,'ok','✓ '+pn+' נשמר'+(j.v&&j.v[part]?' ב-'+(Object.keys(j.v[part]).length+1)+' כיוונים':'')+'. בבניית הלוק יושב במקומו');toast('✓ '+pn+' מוכן לאווטאר');renderImgRow(id)}
 catch(e){UPST[id]='';jwSt(id,'err','לא הצלחתי לשמור. נסי שוב');renderImgRow(id)}}
window.upJw=upJw;
function jwHTML(id){const j=jwOf(id)||{};const [sk,sm]=UPST[id+'_jw']||['',''];const ps=jwParts(id);const any=JWPARTS.some(([k])=>j[k]);
 const rows=ps.map(k=>{const n=JWPARTS.find(([q])=>q==k)[1];const has=!!j[k];const nv=has?jwViews(j,k):0;
  const figs=(k=='neck'||(k=='ear'&&nv>1))&&has?`<div class="jwv">${JWVIEWS.map(vn=>{const u=vn=='front'?jwUrl(j,k):(j.v&&j.v[k]&&j.v[k][vn]?jwUrl(j,k,vn):'');const pn=(POSES.find(([q])=>q==vn)||[0,vn])[1];return `<figure class="${u?'':'miss'}">${u?`<img src="${u}" alt="" loading="lazy">`:'<span>?</span>'}<figcaption>${pn}</figcaption></figure>`}).join('')}</div>`:`<figure>${has?`<img src="${jwUrl(j,k)}" alt="" loading="lazy">`:'<span>?</span>'}</figure>`;
  const stat=!has?'עדיין לא הועלה':k=='neck'?(nv>1?'✓ '+nv+' כיוונים':'✓ רק מלפנים – לכל הכיוונים: 📋 פרומפט ← GPT מצייר גיליון 5 כיוונים ← 🔄 החליפי'):k=='ear'?(nv>1?'✓ '+nv+' כיוונים (על שתי האוזניים)':'✓ מלפנים – מספיק, האתר שם על שתי האוזניים. אפשר גם גיליון 5 כיוונים'):'✓ מלפנים – מספיק, האתר שם את זה בכל התנוחות';
  return `<div class="jwrow" data-jwrow="${k}">${figs}<div class="jwtx"><b>${n}</b><small>${stat}</small>
  <div class="ib"><button data-jwcopy="${k}">📋 פרומפט</button><button class="${has?'':'go'}" data-upimg="${id}" data-upm="jw" data-jwpart="${k}">${has?'🔄 החליפי':'📥 העלי'}</button>${has?`<button data-jwdel="${id}" data-jwpart="${k}">🗑</button>`:''}</div></div></div>`}).join('');
 return `<span class="gst st2 ${sk}">${esc(sm)}</span>
 <div class="ib jwpk"><span>בסט יש:</span>${JWPARTS.map(([k,n])=>`<button data-jwpk="${k}" aria-pressed="${ps.includes(k)}">${n}</button>`).join('')}</div>
 ${rows||'<small class="ghint">סמני למעלה מה יש בסט</small>'}
 ${any?`<div class="ib"><button class="go" data-jwtry="${id}">👗 על הדמות</button><button data-jwdel="${id}">🗑 מחקי הכל</button></div>`:''}
 <small class="ghint">לכל חלק: "📋 פרומפט" ← להדביק ב-GPT עם תמונת התכשיט ← "📥 העלי" את התוצאה. שרשרת: גיליון 5 כיוונים (או תמונה אחת מלפנים). עגיל: עגיל אחד מלפנים. צמיד: מלפנים</small>`}
{const _rr=renderImgRow;renderImgRow=function(id){_rr(id);const el=document.querySelector(`[data-imgrow="${id}"]`);if(!el)return;let box=el.querySelector('.jwbox');
 let ok=false;try{ok=curCat(id)=='jewelry'}catch(_){}if(!ok){if(box)box.remove();return}
 if(!box){const dm=el.querySelector('details.dmore');const h='<details class="jwbox" open><summary>💎 התכשיט על האווטאר</summary><div class="gslot"></div></details>';if(dm)dm.insertAdjacentHTML('beforebegin',h);else el.insertAdjacentHTML('beforeend',h);box=el.querySelector('.jwbox')}
 box.querySelector('.gslot').innerHTML=jwHTML(id)}}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-jwcopy],[data-jwtry],[data-jwdel],[data-jwpk]');if(!t)return;e.preventDefault();e.stopPropagation();
 if(t.dataset.jwpk){const id=t.closest('[data-imgrow]').dataset.imgrow;let ps=jwParts(id).slice();const k=t.dataset.jwpk;ps=ps.includes(k)?ps.filter(x=>x!=k):JWPARTS.map(([q])=>q).filter(q=>ps.includes(q)||q==k);await putItem(id,{jwp:ps});renderImgRow(id);if(!ps.length)toast('סמני מה יש בסט (שרשרת / עגיל / צמיד)');return}
 if(t.dataset.jwcopy){const id=t.closest('[data-imgrow]').dataset.imgrow;copyTxt(jwPromptFor(t.dataset.jwcopy)).then(()=>toast('✓ הפרומפט הועתק. הדביקי ב-GPT עם תמונת התכשיט')).catch(()=>toast('לא הצלחתי להעתיק'));return}
 if(t.dataset.jwtry){const id=t.dataset.jwtry;await openStudio(null,{jewelry:id});return}
 if(t.dataset.jwdel){const id=t.dataset.jwdel;const old=(IT[id]||{}).jw||null;const pk=t.dataset.jwpart;let nj=null;if(pk&&old){nj=JSON.parse(JSON.stringify(old));delete nj[pk];['u','a','v','uv','av'].forEach(q=>{if(nj[q])delete nj[q][pk]});if(!JWPARTS.some(([k])=>nj[k]))nj=null}inUndo=true;try{await putItem(id,{jw:nj})}finally{inUndo=false}renderImgRow(id);toast(pk?JWPARTS.find(([q])=>q==pk)[1]+' נמחק מהאווטאר':'התכשיט נמחק מהאווטאר',async()=>{await putItem(id,{jw:old});renderImgRow(id)})}},true);
// upload routing (the overlay input in the button)
{const _ru=routeUp;routeUp=async function(id,f,mode,part){if(mode=='jw')return upJw(id,f,part);return _ru(id,f,mode)}}
// studio: parts instead of the flat picture (new avatar only)
const JWZ={neck:51,ear:55,brac:51};
{const _si=stageInner;stageInner=async function(S,opt={}){let html=await _si(S,opt);const base=S.avbase||'long';const id=S.items.jewelry;if(!id)return html;const j=jwOf(id);const flatRe=/<img class="sl[^"]*" data-slot="jewelry"[^>]*>/g;
 if(!j){let raw=true;try{raw=await isRawLayer(id)}catch(_){}return raw?html.replace(flatRe,''):html}// v62: a raw product photo is never put on the body (the note explains); a cut-out still works flat
 const tf=S.tf.jewelry||{};if(tf.hidden&&!opt.edit)return html;const v=S.view||'front';const L=(base=='p5'?JWL[v]:(JWLB[base]||{})[v])||{};const on=Object.assign({neck:1,ear:1,brac:1},tf.jw||{});
 html=html.replace(/<img class="sl[^"]*" data-slot="jewelry"[^>]*>/g,'');const px=x=>Math.round(x/399*1000)/10,py=y=>Math.round(y/1365*1000)/10;const sc=(tf.jws||1);let add='';
 const jo=(tf.jo||{})[v]||{};const jps=tf.jps||{};
 const img=(k,x,y,w,mir)=>{const kk=k.replace(/\d/,'');const o=jo[kk]||{};const sg=k=='ear1'?-1:1;const bx=px(x),by=py(y),bw=px(w*sc*(jps[kk]||1));tf.jps0=Object.assign({},jps);const rot=(((tf.jrot||{})[v]||{})[kk]||0)*sg;const lx=Math.round((bx+(o.dx||0)*sg)*10)/10,ly=Math.round((by+(o.dy||0))*10)/10,lw=Math.round(bw*(o.s||1)*10)/10;
  const msk=kk=='neck'&&v!='back'?(()=>{const g=v=='side'?'radial-gradient(ellipse 46% 26% at 62% 0,transparent 96%,#000 100%)':'radial-gradient(ellipse 36% 24% at 50% 0,transparent 96%,#000 100%)';return `-webkit-mask-image:${g};mask-image:${g};`})():'';
  return `<img class="sl jwp${opt.edit&&SSEL=='jewelry'&&(!tf.jsel||tf.jsel==kk)?' sel':''}${tf.hidden?' ghost':''}" data-slot="jewelry" data-part="${k}" data-jwk="${kk}" data-bx="${bx}" data-by="${by}" data-bw="${bw}" data-sg="${sg}" src="${jwUrl(j,kk,v)}" style="left:${lx}%;top:${ly}%;width:${lw}%;z-index:${JWZ[kk]};${msk}transform-origin:50% 0;transform:translate(-50%,0)${rot?` rotate(${rot}deg)`:''}${mir?' scaleX(-1)':''}" alt="" draggable="false">`};
 const want=jwParts(id);if(!want.includes('neck'))on.neck=0;if(!want.includes('ear'))on.ear=0;if(!want.includes('brac'))on.brac=0;
 if(j.neck&&on.neck&&L.neck){const [cx,y,w,mir,fix]=L.neck;const aF=(j.a&&j.a.neck)||1,aV=jwAsp(j,'neck',v);const hasV=j.v&&j.v.neck&&j.v.neck[v];if(hasV||(v!='side'&&v!='back'))add+=img('neck',cx,y,hasV&&!fix?w*aV/aF:w,hasV&&mir)}// v68: no side picture of the necklace → skip the necklace only, the earrings and bracelet still show
 if(j.ear&&on.ear&&L.ear){const h=34,w=h*jwAsp(j,'ear',v);L.ear.forEach(([x,y],i)=>{add+=img('ear'+i,x,y,w,i==1)})}
 if(j.brac&&on.brac&&L.wrist){const w=46;add+=img('brac',L.wrist[0][0],L.wrist[0][1],w)}
 return stageAdd(html,add)}}
// bottom panel: which parts to wear + size
{const _ps=paintSel;paintSel=function(){_ps();const c=$('#ssel');if(!c||!ST||SSEL!='jewelry')return;const id=ST.items.jewelry;const j=id&&jwOf(id);if(!j)return;const tf=ST.tf.jewelry||{};const on=Object.assign({neck:1,ear:1,brac:1},tf.jw||{});
 const jsel=JWPARTS.some(([q])=>q==tf.jsel&&j[q])?tf.jsel:(JWPARTS.find(([q])=>j[q])||['neck'])[0];tf.jsel=jsel;const jn=JWPARTS.find(([q])=>q==jsel)[1];
 const sw=c.querySelector('#sw');if(sw){sw.value=Math.round(((tf.jps||{})[jsel]||1)*100);sw.min=30;sw.max=300;const lb=sw.closest('label');if(lb)lb.firstChild.textContent='גודל ('+jn+')'}['#sr','#ssx','#ssy','#ssk'].forEach(q=>{const i=c.querySelector(q);const lb=i&&i.closest('label');if(lb)lb.style.display='none'});
 c.insertAdjacentHTML('beforeend',`<div class="lpics jwt"><span>💎 נבחר: <b>${jn}</b> (לחצי על חלק אחר כדי לבחור אותו)</span>${JWPARTS.filter(([k])=>j[k]&&jwParts(id).includes(k)).map(([k,n])=>`<span class="jwg"><button data-jwt="${k}" aria-pressed="${!!on[k]}" class="${k==jsel?'cur':''}">${n}</button><button data-jwps="${k}" data-d="-1" title="${n} קטן יותר">➖</button><button data-jwps="${k}" data-d="1" title="${n} גדול יותר">➕</button><button data-jwr="${k}" data-d="-1" title="לסובב את ה${n} שמאלה">↺</button><button data-jwr="${k}" data-d="1" title="לסובב את ה${n} ימינה">↻</button></span>`).join('')}<span class="hint">גררי חלק כדי להזיז אותו · צביטה בשתי אצבעות = גודל · ↺↻ סיבוב (לכל תנוחה בנפרד) · ↺ למקום מחזיר</span></div>`)}}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#ssel [data-jwt],#ssel [data-jws],#ssel [data-jwps],#ssel [data-jwr]');if(!b||!ST||!ST.items.jewelry)return;e.preventDefault();e.stopPropagation();pushH();const tf=ST.tf.jewelry=ST.tf.jewelry||{};
 if(b.dataset.jwt){tf.jw=Object.assign({neck:1,ear:1,brac:1},tf.jw||{});tf.jw[b.dataset.jwt]=tf.jw[b.dataset.jwt]?0:1}else if(b.dataset.jwps){tf.jps=tf.jps||{};const k=b.dataset.jwps;tf.jps[k]=Math.max(.4,Math.min(3,(tf.jps[k]||1)+(+b.dataset.d)*.15))}else if(b.dataset.jwr){/* v74: rotate one part, per pose */const k=b.dataset.jwr,v=ST.view||'front';tf.jrot=tf.jrot||{};const r=tf.jrot[v]=tf.jrot[v]||{};r[k]=Math.max(-90,Math.min(90,(r[k]||0)+(+b.dataset.d)*5));if(!r[k])delete r[k]}else{tf.jws=Math.max(.5,Math.min(2,(tf.jws||1)+(+b.dataset.jws)*.15))}
 const keep=SSEL;await drawStudio();SSEL=keep;paintSel()},true);
// readiness dot: a jewelry item is "ready" when its parts exist
{const _av=avStat;avStat=function(id){try{if(curCat(id)=='jewelry'){const it=IT[id]||{};if(it.av)return it.av;return jwOf(id)?'ok':'no'}}catch(_){}return _av(id)};window.avStat=avStat}
// ---- v53: warn when a worn garment has no cut-out yet (the raw product photo, model included, is what shows)
async function isRawLayer(id){const it=IT[id]||{},gm=(window.GPTM||{})[id]||{};if(p5gOf(id)||gm.f||it.cutimg)return false;if(it.img)return true;try{return !(await getCut(id))}catch(_){return true}}
{const _ds=drawStudio;drawStudio=async function(){const r=await _ds.apply(this,arguments);try{if(!ST)return r;const st=$('#sstage');if(!st)return r;const raw=[];for(const [slot,id] of Object.entries(ST.items)){if(!id||!D[id]||!MAINSL.includes(slot)||(ST.tf[slot]||{}).hidden)continue;if(await isRawLayer(id))raw.push(id)}
 st.querySelectorAll('.rawnote').forEach(e=>e.remove());if(raw.length&&!st.querySelector('.p5note:not(.rawnote)'))st.insertAdjacentHTML('beforeend',`<p class="p5note rawnote">⚠️ ${esc(D[raw[0]].short.slice(0,24))}: אין עדיין גזירה, זו התמונה המקורית. בחלון הבגד: 📥 העלי בגד בלבד – 5 תנוחות</p>`);
 const jid=ST.items.jewelry;if(jid&&D[jid]&&!jwOf(jid)&&!(ST.tf.jewelry||{}).hidden&&!st.querySelector('.rawnote')&&(await isRawLayer(jid)))st.insertAdjacentHTML('beforeend',`<p class="p5note rawnote">💎 ${esc(D[jid].short.slice(0,24))}: עוד אין גזירה לתכשיט, לכן לא מוצג על הדמות. בחלון התכשיט: שורה שרשרת / עגיל / צמיד ← 📥 העלי</p>`)}catch(_){}return r}}

// v62: parts can be dragged (and pinched) – the offset is kept per view in tf.jo[view][part]; both earrings move together (mirrored)
document.addEventListener('pointerup',e=>{try{if(typeof PG=='undefined'||!PG||!PG.el||!PG.el.classList.contains('jwp')||PTR.size>1||!ST)return;const el=PG.el;const tf=ST.tf.jewelry;if(!tf||tf.lock)return;const v=ST.view||'front';const k=el.dataset.jwk;const sg=+el.dataset.sg||1;
 const dx=(parseFloat(el.style.left)-parseFloat(el.dataset.bx))*sg,dy=parseFloat(el.style.top)-parseFloat(el.dataset.by),sc=parseFloat(el.style.width)/parseFloat(el.dataset.bw);if(![dx,dy,sc].every(Number.isFinite))return;
 tf.jo=tf.jo||{};tf.jo[v]=tf.jo[v]||{};tf.jo[v][k]={dx:Math.round(dx*10)/10,dy:Math.round(dy*10)/10,s:Math.round(Math.max(.3,Math.min(4,sc))*100)/100};setTimeout(async()=>{const keep=SSEL;await drawStudio();SSEL=keep;paintSel()},0)}catch(_){}},true);
// before the generic drag starts, point tf.x/tf.y at the part itself so it does not jump to the flat layer's position
document.addEventListener('pointerdown',e=>{try{const l=e.target.closest&&e.target.closest('#sstage img.jwp');if(!l||!ST||!ST.tf.jewelry)return;const tf=ST.tf.jewelry;tf.x=parseFloat(l.style.left);tf.y=parseFloat(l.style.top);tf.w=parseFloat(l.style.width);tf.jsel=l.dataset.jwk;setTimeout(()=>{document.querySelectorAll('#sstage img.jwp').forEach(z=>z.classList.toggle('sel',z.dataset.jwk==tf.jsel));if(SSEL=='jewelry')paintSel()},0)}catch(_){}},true);
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#ssel [data-sa="reset"]');if(!b||!ST||SSEL!='jewelry'||!ST.tf.jewelry)return;delete ST.tf.jewelry.jo;delete ST.tf.jewelry.jps;delete ST.tf.jewelry.jrot;ST.tf.jewelry.jws=1},true);

// v66: the generic "גודל" slider scales only the selected part (tf.jps[tf.jsel]); live, without touching tf.w
let JWSZT=null;document.addEventListener('input',e=>{try{if(e.target.id!='sw'||!ST||SSEL!='jewelry')return;const id=ST.items.jewelry;const j=id&&jwOf(id);if(!j)return;e.stopPropagation();const tf=ST.tf.jewelry;const k=tf.jsel||'neck';tf.jps=tf.jps||{};tf.jps[k]=Math.max(.3,Math.min(3,+e.target.value/100));
 document.querySelectorAll('#sstage img.jwp[data-jwk="'+k+'"]').forEach(el=>{const o=((tf.jo||{})[ST.view||'front']||{})[k]||{};el.style.width=(parseFloat(el.dataset.bw)/(( (tf.jps0||{})[k])||1)*(o.s||1)*tf.jps[k])+'%'});
 clearTimeout(JWSZT);JWSZT=setTimeout(async()=>{const keep=SSEL;await drawStudio();SSEL=keep;paintSel()},250)}catch(_){}},true);
