
// ===== v144 (2026-10-23, Shabbat pass): garments that GPT drew on the PREVIOUS avatar (33 of her 41 five-pose garments) sat on the new body by a
// rough conversion only – her shoulders, upper arms and the nude suit showed outside the top/sweater/dress, worst in the back and hand-on-hip poses.
// Now each such garment is placed on the new body per pose by what really covers her: it tries sizes and places around the shoulder fit (fitTop116)
// and keeps the one that covers her shoulders, chest and arms best without hanging in the air or leaving the frame.
// Her own corrections (✋ in "all poses": tf.pvman) are never touched; the old numbers are kept in tf.b144 so they can be restored.
const TOPS144=['tops','sweaters','outer','dresses','sets'],SK144=['skirts'];
const AV144={};
function avMask144(v){return AV144[v]||(AV144[v]=new Promise(ok=>{const i=new Image();i.onload=()=>{try{const c=document.createElement('canvas');c.width=133;c.height=455;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(i,0,0,133,455);
  const d=x.getImageData(0,0,133,455).data;const M=new Uint8Array(133*455);for(let k=0;k<M.length;k++)M[k]=d[k*4+3]>110?1:0;
  // a little wider outline: what a garment may cover without "hanging in the air"
  const Dm=new Uint8Array(M.length);for(let y=0;y<455;y++)for(let x0=0;x0<133;x0++){if(!M[y*133+x0])continue;for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){const yy=y+dy,xx=x0+dx;if(yy>=0&&yy<455&&xx>=0&&xx<133)Dm[yy*133+xx]=1}}
  const W=y=>{let l=-1,r=-1;for(let x0=0;x0<133;x0++)if(M[y*133+x0]){if(l<0)l=x0;r=x0}return l<0?0:r-l+1};
  const B=BODY105[v];const t=B[3]/3,H=(B[4]-B[3])/3;const med=a=>{const b=a.filter(z=>z>0).sort((p,q)=>p-q);return b.length?b[b.length>>1]:0};
  const wa=med(Array.from({length:4},(_,k)=>W(Math.round(t+.22*H)+k)));let ya=Math.round(t+.15*H);while(ya<t+.3*H&&W(ya)<.9*wa)ya++;
  // her shoulder line: below the narrowest neck row, the first row twice as wide as the neck (a top must cover from there – before, from the armpits only, so a dress could sit too low and leave the suit's shoulders bare)
  let nr=-1,nw=1e9;for(let y=Math.round(t+.08*H);y<t+.2*H;y++){const w=W(y);if(w>0&&w<nw){nw=w;nr=y}}let ys=ya;if(nr>0){ys=nr;while(ys<ya&&W(ys)<2.2*nw)ys++}
  // rows' body pixel counts (all columns, and every 2nd row/column) as running sums
  const R1=new Int32Array(456),R2=new Int32Array(456);for(let y=0;y<455;y++){let c1=0,c2=0;for(let x0=0;x0<133;x0++)if(M[y*133+x0]){c1++;if(!(x0&1)&&!(y&1))c2++}R1[y+1]=R1[y]+c1;R2[y+1]=R2[y]+c2}
  // her head: top row, widest row of the head, its centre and width (for head coverings drawn for another pose)
  let ht=0;while(ht<455&&!W(ht))ht++;let hw=0,hc=66;for(let y=ht;y<ht+40&&y<455;y++){let l=-1,r=-1;for(let x0=0;x0<133;x0++)if(M[y*133+x0]){if(l<0)l=x0;r=x0}if(l>=0&&r-l+1>hw){hw=r-l+1;hc=(l+r)/2}}
  ok({M,Dm,R1,R2,head:{t:ht,c:hc,w:hw},yn:nr>0?nr-2:-1,ya:Math.max(0,Math.min(ya,ys+2)),yw:Math.round(B[0]/3)-2})}catch(e){ERR114('v144 av',e);ok(null)}};i.onerror=()=>ok(null);i.src=`av/p6c_${v}.webp?v=${window.VER||''}`}))}
const GM144={};
function gMask144(url){return GM144[url]||(GM144[url]=new Promise(ok=>{const i=new Image();i.crossOrigin='anonymous';i.onload=()=>{try{const nw=i.naturalWidth,nh=i.naturalHeight;const gw=Math.min(160,nw),gh=Math.max(1,Math.round(gw*nh/nw));
  const c=document.createElement('canvas');c.width=gw;c.height=gh;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(i,0,0,gw,gh);const d=x.getImageData(0,0,gw,gh).data;
  const M=new Uint8Array(gw*gh);for(let k=0;k<M.length;k++)M[k]=d[k*4+3]>110?1:0;
  const big=document.createElement('canvas');big.width=nw;big.height=nh;big.getContext('2d').drawImage(i,0,0);ok({M,gw,gh,asp:nh/nw,canvas:big})}catch(e){ERR114('v144 g',e);ok(null)}};i.onerror=()=>ok(null);i.src=url}))}
// how well a placement {x,y,w} (centre and width in % of the 399×1365 frame) covers her
function score144(A,G,f,w0,y0r,st){st=st||1;const Wp=f.w/100*133,Hp=Wp*G.asp,L=f.x/100*133-Wp/2,T=f.y/100*455-Hp/2;
 // every st-th row and column only (st=2 for the first rough search – 4× faster on the phone); no per-call buffers
 let gin=0,gout=0,spill=0,bot=-1,got=0,face=0;const x0=Math.floor(L),x1=Math.ceil(L+Wp),y0=Math.floor(T),y1=Math.ceil(T+Hp);const sx=G.gw/Wp,sy=G.gh/Hp;
 const ya=y0-((y0%st)+st)%st,xa=x0-((x0%st)+st)%st;
 for(let y=ya;y<y1;y+=st){const gy=Math.floor((y+.5-T)*sy);if(gy<0||gy>=G.gh)continue;const gr=gy*G.gw,inY=y>=0&&y<455;for(let x=xa;x<x1;x+=st){const gx=Math.floor((x+.5-L)*sx);if(gx<0||gx>=G.gw||!G.M[gr+gx])continue;
  if(!inY||x<0||x>=133){gout++;continue}gin++;const k=y*133+x;if(!A.Dm[k])spill++;else if(A.M[k]){if(y>=y0r)got++;else if(y<A.yn)face++}if(y>bot)bot=y}}
 if(!gin)return -9;const R=st==1?A.R1:A.R2;const need=bot>=y0r?R[bot+1]-R[y0r]:0;
 const c=need?got/need:0;// a garment never covers her chin and face (before, a dress could slide up over her face: the face counted as "body")
 return c-.5*spill/gin-3*face/gin-3*gout/(gin+gout)-.15*Math.abs(f.w/w0-1)}
async function auto144(id,g,v,cur,sk){const A=await avMask144(v);const G=await gMask144(p5gUrl(g,v));if(!A||!G)return null;
 const starts=[];if(cur&&cur.w)starts.push({x:cur.x,y:cur.y,w:cur.w});if(!sk)try{const f=fitTop116(v,{canvas:G.canvas});if(f&&f.w>10&&f.w<200)starts.push(f)}catch(_){}
 const yr=sk?A.yw:A.ya;
 if(!starts.length)return null;let best=null;
 for(const s0 of starts){const w0=s0.w;let c0=s0;
  // when the best is at the edge of the tried range (a garment drawn much smaller or higher on the old avatar), search again around it – up to 4 times
  for(let round=0;round<4;round++){let b1=null,edge=false;
   for(let kw=-6;kw<=10;kw+=2)for(let dx=-5;dx<=5;dx++)for(let dy=-3;dy<=3;dy++){const f={x:c0.x+dx,y:c0.y+dy,w:c0.w*(1+kw*.025)};const sc=score144(A,G,f,w0,yr,2);if(!b1||sc>b1.sc)b1={sc,f,e:kw==-6||kw==10||Math.abs(dx)==5||Math.abs(dy)==3}}
   b1.w0=w0;const ok=b1.f.w<=s0.w*1.6&&b1.f.w>=s0.w*.75&&Math.abs(b1.f.x-s0.x)<=12&&Math.abs(b1.f.y-s0.y)<=8;if(ok&&(!best||b1.sc>best.sc))best=b1;if(!b1.e)break;const q=b1.f;if(q.w>s0.w*1.6||q.w<s0.w*.75||Math.abs(q.x-s0.x)>12||Math.abs(q.y-s0.y)>8)break;c0=q}}
 // finer around the best
 {const b0=best.f,W0=best.w0,w0of=()=>W0;best={sc:score144(A,G,b0,w0of(b0),yr),f:b0};for(let kw=-3;kw<=3;kw++)for(let dx=-2;dx<=2;dx++)for(let dy=-2;dy<=2;dy++){const f={x:b0.x+dx*.5,y:b0.y+dy*.5,w:b0.w*(1+kw*.0125)};const sc=score144(A,G,f,w0of(b0),yr);if(sc>best.sc)best={sc,f}}}
 if(!best)return null;const r1=q=>Math.round(q*10)/10;return {x:r1(best.f.x),y:r1(best.f.y),w:r1(best.f.w),r:0,q:1,sc:Math.round(best.sc*1000)/1000}}
// results are kept on this device too (the search takes a moment on the phone – only the first time for each garment and pose)
const DONE144=(()=>{try{return JSON.parse(localStorage.getItem('a144v4')||'{}')||{}}catch(_){return {}}})();
function keep144(){try{const ks=Object.keys(DONE144);if(ks.length>600)ks.slice(0,ks.length-600).forEach(k=>delete DONE144[k]);localStorage.setItem('a144v4',JSON.stringify(DONE144))}catch(_){}}
async function apply144(S){if(!S||!S.items||!S.tf)return;let on=false;try{on=on96(S)}catch(_){}if(!on)return;const v=S.view||'front';
 for(const [slot,id] of Object.entries(S.items)){try{const tf=S.tf[slot];if(!id||!tf||slot=='jewelry')continue;let cat='';try{cat=curCat(id)}catch(_){}const sk=SK144.includes(cat);if(!sk&&!TOPS144.includes(cat))continue;
  const g=p5gOfT(id,tf);if(!g||g.av=='p6'||!g[v])continue;if((tf.pvman||{})[v])continue;
  if(tf.sp96!='new')conv96(S,true);
  const key=id+'|'+(g.t||'')+'|'+v;if((tf.a144||{})[v]==key)continue;
  const cur=pvOf(tf,g,v);let f=DONE144[key];if(!f){f=await auto144(id,g,v,cur,sk);if(!f)continue;DONE144[key]=f;keep144()}
  const both=[tf];if(S!==ST&&ST&&ST.items&&ST.items[slot]==id&&ST.tf&&ST.tf[slot]&&ST.tf[slot]!==tf)both.push(ST.tf[slot]);
  for(const t of both){if((t.pvman||{})[v])continue;const old=pvOf(t,g,v);t.b144=t.b144||{};if(old&&!t.b144[v])t.b144[v]=old;pvSet(t,v,f);t.a144=Object.assign({},t.a144||{},{[v]:key})}
 }catch(e){ERR114('v144 apply',e)}}}
// v144: a head covering (a tie, a hat) that has no picture for the hand-on-hip pose was drawn there with the front numbers – but in that pose
// she stands smaller and more to the side, so the scarf floated above her head (Sara 14:18: check that head coverings sit well). It is moved and
// scaled from her front head to her head in that pose. Her own placement for that pose (tf.pv.hip) is kept.
async function head144(S,html){const v=S.view||'front';if(v=='front'||!S.items)return html;
 for(const slot of ['scarf','head']){const id=S.items[slot];const tf=S.tf&&S.tf[slot];if(!id||!tf||(tf.pv&&tf.pv[v]))continue;
  if(slot=='scarf'){const t=typeof tieOf=='function'&&tieOf(id,tf);if(t&&t[v]&&t.fit&&t.fit[v])continue;if(v=='back'&&t&&t.fit&&t.fit.back)continue}
  if(v!='hip')continue;
  const re=new RegExp('<img[^>]*data-slot="'+slot+'"[^>]*>');const tag=(html.match(re)||[])[0];if(!tag)continue;const st=(tag.match(/style="([^"]*)"/)||[])[1]||'';
  const num=k=>{const m=st.match(new RegExp('(?:^|;)'+k+':(-?[\\d.]+)%'));return m?+m[1]:null};const x=num('left'),y=num('top'),w=num('width');if(x==null||y==null||!w)continue;
  const [A,B]=await Promise.all([avMask144('front'),avMask144(v)]);if(!A||!B||!A.head.w||!B.head.w)continue;const k=B.head.w/A.head.w;
  const X=x/100*133,Y=y/100*455;const nx=B.head.c+(X-A.head.c)*k,ny=B.head.t+(Y-A.head.t)*k;
  const ns=st.replace(/(^|;)left:-?[\d.]+%/,'$1left:'+(nx/133*100).toFixed(2)+'%').replace(/(^|;)top:-?[\d.]+%/,'$1top:'+(ny/455*100).toFixed(2)+'%').replace(/(^|;)width:-?[\d.]+%/,'$1width:'+(w*k).toFixed(2)+'%');
  html=html.replace(tag,tag.replace(st,ns))}
 return html}
window.auto144=auto144;window.apply144=apply144;window.head144=head144;
{const _si=stageInner;stageInner=async function(S,opt){try{await apply144(S)}catch(e){ERR114('v144',e)}let h=await _si.apply(this,arguments);try{h=await head144(S,h)}catch(e){ERR114('v144 head',e)}return h}}
// v144: several garments on top of each other (Sara 14:16: "several kinds in the same place") – a sweater or cardigan can now also be worn
// OVER a blouse: the "ז׳קט" place lists her sweaters too, so blouse (חולצה) + sweater over it (ז׳קט / סוודר מעל) + skirt + belt work in one look.
try{const o=SLOTS.find(s=>s[0]=='outer');if(o){o[1]='ז׳קט / סוודר מעל';if(!o[3].includes('sweaters'))o[3].push('sweaters')}}catch(e){ERR114('v144 slots',e)}
// ---- v148: GPT garment prompt, reworked (Sara 14:16: "rework the prompts and think them through well").
// What went wrong in the garments GPT drew: sleeves drawn beside her arm instead of on it, the far sleeve missing in "half side",
// shoulders narrower than hers (her shoulders showed), a straight sleeve on the bent arm, and a cut-off order name ("…כעלת פרקד ע").
// The prompt now opens with the goal, names the garment by its full name + colour, says exactly where sleeves and shoulders go,
// and ends with a short check before sending. All her rules stay: one message, two avatar files, only what she bought, belt removed, grey background.
const TOPLIKE148=['tops','sweaters','outer','dresses','sets','wedding'];
function name148(id){const d=D[id]||{};let s=(d.full||d.short||'').trim().replace(/\s+/g,' ');
 // order names are cut off: drop a broken last piece ("…, ש" / "…פרקד ע")
 s=s.replace(/,\s*\S{1,3}$/,'').replace(/\s\S{1,2}$/,'').replace(/[,|\-–\s]+$/,'');return s}
{const _p=pr102;pr102=function(id,np){const t=_p.apply(this,arguments);try{if(!/\nמה שקניתי: רק /.test(t))return t;let c='';try{c=curCat(id)}catch(_){}
  const tw=typeWord102(id),d=D[id]||{},nm=name148(id),col=(d.color||'').trim();let o=t;
  // the name line: full name and colour
  o=o.replace(/\nמה שקניתי: רק ([^\n]*?)( \([^\n]*\))?\.\n/,(m,a)=>`\nמה שקניתי: רק ${a}${nm?` – "${nm}"`:''}${col?`, בצבע ${col}`:''}.\n`);
  // the goal, first
  o=`המטרה: לראות עליי את ${tw.the} שקניתי. את התמונות שתיצרי אני מלבישה באתר שלי על האווטאר, ולכן הגודל, המקום והתנוחה צריכים להיות בדיוק לפי הגוף שלי בכל אחת מ-5 התנוחות.\n\n`+o;
  if(TOPLIKE148.includes(c)){
   o=o.replace('- השרוולים הולכים לפי הידיים של כל תנוחה.',`- הכתפיים של ${tw.the} מכסות את כל הכתף שלי עד קצה הכתף, ברוחב הכתפיים של האווטאר באותה תנוחה.
- השרוולים יושבים בדיוק על הזרועות של האווטאר בכל תנוחה – לא לידן ולא רחוק מהן – ומכסים את הזרוע מהכתף עד המקום שבו השרוול נגמר באמת (שרוול ארוך: עד פרק היד).
- בחצי צד: גם השרוול של היד הרחוקה, מאחורי הגוף, כמו שרואים אותו באמת.\n-`);
   o=o.replace('- ביד על המותן: השרוול הולך לפי היד המכופפת, והיד עצמה לא מופיעה.','- ביד על המותן: השרוול של היד המכופפת מתכופף איתה במרפק (לא שרוול ישר), והיד עצמה לא מופיעה.')}
  // not a garment: the "shoulders of the garment" line was wrong for a scarf, a bag, shoes or jewelry
  const GL='הכתפיים של הבגד על קו הכתפיים (20%), והאורך כמו בתמונה של מה שקניתי ביחס לגוף שלי.';
  const ACC={scarves:'כיסוי הראש על הראש של האווטאר בכל תנוחה, בגודל הראש שלי. ביד על המותן הראש שלי קטן ונמוך יותר מבשאר התנוחות – אז גם הכיסוי, בדיוק על הראש באותה תנוחה.',
   jewelry:'התכשיט במקום שלו על הגוף שלי בכל תנוחה, בגודל האמיתי: שרשרת סביב הצוואר ועל החזה, עגיל בתנוך האוזן, צמיד על פרק היד.',
   bags:'התיק בגודל האמיתי שלו ביחס לגוף שלי (גובה 156 ס״מ), במקום שבו נושאים אותו: על הכתף – הרצועה על הכתף והתיק ליד המותן או הירך; ביד – ליד הירך.',
   shoes:'הנעליים על כפות הרגליים של האווטאר בכל תנוחה (95%–100% מהגובה), באותו כיוון של כפות הרגליים בתנוחה.'};
  if(ACC[c])o=o.replace(GL,ACC[c]);
  if(c=='jewelry')o=o.replace('- השרוולים (אם יש) הולכים לפי הידיים של כל תנוחה.','- רק התכשיט – בלי צוואר, בלי אוזניים ובלי יד. שרשרת: גם החלק שמאחורי הצוואר כמו שרואים אותו באמת בצד ובגב.').replace('- ביד על המותן: השרוול הולך לפי היד המכופפת, והיד עצמה לא מופיעה.','- ביד על המותן: היד עצמה לא מופיעה.');
  o+=`\n\nלפני ששולחים – לבדוק:
1. יצאו בדיוק 2 תמונות: א' עם 3 תנוחות (חזית, צד, גב) ו-ב' עם 2 (חצי צד, יד על המותן), באותו סידור כמו קבצי האווטאר.
2. בכל תנוחה רק ${tw.the}${tw.the=='החגורה'?'':', בלי חגורה'} – בלי גוף, בלי ראש ובלי בגדים אחרים.
3. ${tw.the} באותו גובה ובאותו גודל ביחס לגוף בכל 5 התנוחות.`;
  return o}catch(e){ERR114('v148 pr',e);return t}};window.pr102=pr102}
// the tie prompt: the scarf's full name and colour (the cut-off order name alone was not enough to tell GPT which scarf)
try{const _tp=tiePrompt120;tiePrompt120=function(i,id){const t=_tp.apply(this,arguments);try{const d=D[id]||{},nm=name148(id),col=(d.color||'').trim();
 return t.replace(/\nMy headscarf \(this is exactly what I bought\): [^\n]*\n/,`\nMy headscarf (this is exactly what I bought): "${nm}"${col?`, colour: ${col}`:''}. Copy its fabric, pattern and colour exactly from the photo.\n`)}catch(e){ERR114('v148 tie',e);return t}}}catch(e){ERR114('v148 tie0',e)}
// ---- v148: the look BIG (tasks #141: "to see the look big in a new window, like the all-poses window").
// In "🧍 הלוק בכל התנוחות" a ⛶ button opens one pose over the whole screen; ‹ › or a swipe go to the next pose. Nothing is redrawn – it shows the same poses.
const BIG148={i:0};
function bigPaint148(){const d=document.getElementById('big148');if(!d)return;const fs=[...document.querySelectorAll('#p5all .p5f')];if(!fs.length)return;BIG148.i=(BIG148.i+fs.length)%fs.length;const f=fs[BIG148.i];
 d.querySelector('.bst').innerHTML=f.querySelector('.mst').innerHTML;d.querySelector('.bcap').textContent=(f.querySelector('figcaption')||{}).textContent||'';
 d.querySelector('.bdots').innerHTML=fs.map((_,k)=>`<i class="${k==BIG148.i?'on':''}"></i>`).join('')}
function bigOpen148(){let d=document.getElementById('big148');if(!d){document.body.insertAdjacentHTML('beforeend',`<dialog id="big148" dir="rtl" aria-label="הלוק בגדול"><button class="bx" aria-label="סגירה">✕</button><button class="bp" data-b148="-1" aria-label="הקודמת">›</button><div class="mst bst"></div><button class="bn" data-b148="1" aria-label="הבאה">‹</button><div class="bcap"></div><div class="bdots"></div></dialog>`);d=document.getElementById('big148');
  d.addEventListener('click',e=>{const b=e.target.closest('[data-b148]');if(b){BIG148.i+=+b.dataset.b148;bigPaint148();return}if(e.target.closest('.bx')||e.target==d)d.close()});
  let x0=null;d.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});d.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40){BIG148.i+=dx>0?1:-1;bigPaint148()}},{passive:true});
  document.addEventListener('keydown',e=>{if(!d.open)return;if(e.key=='ArrowLeft'){BIG148.i++;bigPaint148()}if(e.key=='ArrowRight'){BIG148.i--;bigPaint148()}})}
 const fs=[...document.querySelectorAll('#p5all .p5f')];const on=fs.findIndex(f=>f.classList.contains('on')||f.dataset.pose==(typeof PE!='undefined'&&PE&&PE.v));BIG148.i=on>=0?on:Math.max(0,fs.findIndex(f=>f.dataset.pose==((typeof ST!='undefined'&&ST&&ST.view)||'front')));
 bigPaint148();d.showModal()}
window.bigOpen148=bigOpen148;
{const _sa=window.p5ShowAll;if(_sa)window.p5ShowAll=p5ShowAll=async function(){const r=await _sa.apply(this,arguments);try{const h=document.querySelector('#p5all .hh');if(h&&!h.querySelector('.big148b'))h.querySelector('.x')?.insertAdjacentHTML('afterend','<button class="big148b" type="button" title="הלוק בגדול">⛶ בגדול</button>')}catch(e){ERR114('v148 big',e)}return r}}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.big148b:not(.gif150b)')){e.preventDefault();e.stopPropagation();bigOpen148()}},true);
// ---- v150: "🎞 360 אמיתי" (tasks #154: GPT can make a consistent 16-frame 360° GIF – use it). In "🧍 הלוק בכל התנוחות":
// 1) save the picture of all poses (the button that is already there), 2) copy the ready prompt (it names every garment of the look),
// 3) upload the GIF (or a short video) GPT made – it is kept with the saved look (LOOKS[id].gif360) and shown in "⛶ בגדול" as the last page.
function gifPrompt150(){const ids=Object.values((typeof ST!='undefined'&&ST&&ST.items)||{}).filter(Boolean);const L=ids.map(id=>{const d=D[id]||{};let w='';try{w=typeWord102(id).a}catch(_){}return `- ${w?w+': ':''}"${name148(id)}"${d.color?`, בצבע ${d.color}`:''}`}).join('\n');
 return `מצורפת תמונה אחת של הלוק שלי ב-5 תנוחות (חזית, צד, גב, חצי צד, יד על המותן). זו אני, ואלה הבגדים שלי בדיוק.

צרי GIF של סיבוב 360° שלם: אני עומדת במקום ומסתובבת לאט סביב עצמי, 16 מסגרות במרווחים שווים (כל מסגרת 22.5°), בלולאה חלקה – המסגרת האחרונה מתחברת לראשונה.
${L?`\nמה אני לובשת:\n${L}\n`:''}
- אותם פנים, אותו גוף, אותו כיסוי ראש, עמידה ישרה, הידיים לצד הגוף.
- אותם בגדים בדיוק כמו בתמונה: צבעים, בדים, דוגמאות, אורכים ושכבות. לבן נשאר לבן.
- אותו גודל ואותו מקום בכל המסגרות – רק מסתובבת, לא זזה ולא מתקרבת.
- כל הגוף בתוך המסגרת, מהראש עד כפות הרגליים, עם מרווח.
- רקע אפור בהיר אחיד, בלי טקסט ובלי צל.
- קובץ GIF אחד, מסגרת אנכית.`}
function gifOf150(){const id=typeof ST!='undefined'&&ST&&ST.id;return id&&LOOKS[id]&&LOOKS[id].gif360||null}
async function gifSave150(v){const id=ST.id;if(!id||!LOOKS[id])return;if(v)LOOKS[id].gif360=v;else delete LOOKS[id].gif360;
 if(DB)await saveDoc('looks',id,LOOKS[id]);else{try{localStorage.setItem('hub_looks',JSON.stringify(LOOKS))}catch(_){}}}
// a re-save of the look keeps its 360
{const _ds=doSave;doSave=async function(asNew){const keep=gifOf150();const r=await _ds.apply(this,arguments);try{if(keep&&ST.id&&LOOKS[ST.id]&&!LOOKS[ST.id].gif360)await gifSave150(keep)}catch(e){ERR114('v150 keep',e)}return r}}
function gifUrl150(g){return g.u||('/_blob/'+g.id)}
function gifPaint150(){const d=document.getElementById('gif150');if(!d)return;const g=gifOf150();const saved=!!(ST&&ST.id);
 d.querySelector('.gb').innerHTML=`<p>GPT יודע להכין סיבוב 360° אמיתי שלך עם הלוק – 16 תמונות שמתחברות לסרטון.</p>
 <ol><li>בחלון "כל התנוחות": <b>שמירת תמונה של כל התנוחות</b>.</li><li><button type="button" data-g150="copy">📋 העתקת הפרומפט</button> – ב-ChatGPT: צ׳אט חדש, מצרפים את התמונה ומדביקים.</li>
 <li>${saved?'<label class="gup">⬆ העלאת ה-GIF שקיבלת<input type="file" accept="image/gif,video/mp4,video/webm,image/webp" data-g150="up" hidden></label>':'<b>שומרים קודם את הלוק</b> (💾 שמירה), ואז מעלים כאן את ה-GIF.'}</li></ol>
 ${g?`<div class="gv">${/^video/.test(g.t||'')?`<video src="${gifUrl150(g)}" autoplay loop muted playsinline></video>`:`<img src="${gifUrl150(g)}" alt="סיבוב 360 של הלוק">`}<button type="button" data-g150="del">🗑 להסיר את ה-360</button></div>`:''}`}
function gifOpen150(){let d=document.getElementById('gif150');if(!d){document.body.insertAdjacentHTML('beforeend',`<dialog id="gif150" dir="rtl"><div class="hh"><button class="x" aria-label="סגירה" onclick="this.closest('dialog').close()" style="float:left">✕</button><h2>🎞 סיבוב 360 אמיתי</h2></div><div class="gb"></div></dialog>`);d=document.getElementById('gif150');
  d.addEventListener('click',async e=>{const b=e.target.closest('[data-g150]');if(!b||b.dataset.g150=='up')return;e.preventDefault();
   if(b.dataset.g150=='copy'){try{await navigator.clipboard.writeText(gifPrompt150());toast('📋 הפרומפט הועתק')}catch(_){prompt('להעתיק:',gifPrompt150())}}
   if(b.dataset.g150=='del'){const old=gifOf150();await gifSave150(null);gifPaint150();toast('ה-360 הוסר',async()=>{await gifSave150(old);gifPaint150()})}});
  d.addEventListener('change',async e=>{const f=e.target.files&&e.target.files[0];if(!f)return;try{const a=await claude.use('assets');if(!a){toast('העלאה לא זמינה כאן');return}
   toast('מעלה…');const r=await a.upload(f);await gifSave150({id:r.id,u:r.url||'',t:f.type||'',at:Date.now()});gifPaint150();toast('🎞 ה-360 נשמר עם הלוק')}catch(err){ERR114('v150 up',err);toast('ההעלאה לא הצליחה – נסי שוב')}})}
 gifPaint150();d.showModal()}
window.gifOpen150=gifOpen150;window.gifPrompt150=gifPrompt150;
{const _sa=window.p5ShowAll;window.p5ShowAll=p5ShowAll=async function(){const r=await _sa.apply(this,arguments);try{const b=document.querySelector('#p5all .big148b');if(b&&!document.querySelector('#p5all .gif150b'))b.insertAdjacentHTML('afterend','<button class="big148b gif150b" type="button" title="סיבוב 360 אמיתי מ-GPT">🎞 360</button>')}catch(e){ERR114('v150 btn',e)}return r}}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.gif150b')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();gifOpen150()}},true);
// the big window: the 360 is the last page
{const _bp=bigPaint148;bigPaint148=function(){const g=gifOf150();const fs=document.querySelectorAll('#p5all .p5f').length;const d=document.getElementById('big148');
  if(!g||!d)return _bp();const n=fs+1;BIG148.i=(BIG148.i+n)%n;if(BIG148.i<fs){_bp();d.querySelector('.bdots').insertAdjacentHTML('beforeend','<i></i>');return}
  d.querySelector('.bst').innerHTML=/^video/.test(g.t||'')?`<video src="${gifUrl150(g)}" autoplay loop muted playsinline style="width:100%;height:100%;object-fit:contain"></video>`:`<img src="${gifUrl150(g)}" alt="" style="width:100%;height:100%;object-fit:contain">`;
  d.querySelector('.bcap').textContent='🎞 360';d.querySelector('.bdots').innerHTML=Array.from({length:n},(_,k)=>`<i class="${k==BIG148.i?'on':''}"></i>`).join('')}}
