// ---- v114: her body as measured on the avatar pictures goes into every garment prompt, the garment length per item, a length check on upload
// Lines measured on p6c_sheet1/2 and the bodysuit masks; body height = top of the cap to the soles = 100%.
const LEN114={knee:['עד הברך',58],mid:['עד אמצע השוק',74],ankle:['עד הקרסול',88],floor:['עד הרצפה',97]};
const LENCAT114=['skirts','dresses','sets'];
const cat114=id=>{try{return curCat(id)}catch(_){return ''}};
// the length she chose for this item, or a guess from the product name
function len114(id){const it=IT[id]||{};if(it.len114)return it.len114;const n=((D[id]||{}).full||'')+' '+((D[id]||{}).short||'');
 return /מקסי|ארוכה|ארוך/.test(n)?'ankle':/מידי/.test(n)?'mid':/קצרה|קצר|מיני/.test(n)?'knee':''}
function lenCm114(id){const k=len114(id);return LEN114[k]?LEN114[k][1]:(+k||0)}
function lenWord114(id){const k=len114(id);return LEN114[k]?LEN114[k][0]:(+k?`${+k} ס״מ מהמותן`:'')}
const hem114=cm=>Math.round(37+cm/156*100);
function body114(id){const m=typeof ME=='function'?ME():{};const c=cat114(id),the=typeWord102(id).the;const cm=LENCAT114.includes(c)?lenCm114(id):0;
 let s=`המידות של הגוף שלי – נמדדו על תמונות האווטאר עצמן. בכל תנוחה: מקצה הכובע עד כפות הרגליים = 100%.
- קו הכתפיים: 20% מלמעלה.
- המותן: 37% מלמעלה – בדיוק בתפר הרוחבי של הבגד-גוף באווטאר. רוחב המותן: בחזית ובגב 15% מהגובה, בצד ובחצי צד 12%.
- הירכיים (המקום הכי רחב): 50% מלמעלה, רוחב 21% מהגובה בחזית.
- הברך: 74% מלמעלה. אמצע השוק: 84%. הקרסול: 95%.
במידות אמיתיות: גובה ${m.h||156} ס״מ, היקף חזה ${m.b||94}, היקף מותן ${m.w||73}, היקף ירכיים ${m.hp||96}, רוחב כתפיים ${m.sh||45}, מהמותן עד הברך ${m.wk||58}, עד הקרסול ${m.wa||90}, עד הרצפה ${m.wf||99}.`;
 if(cm)s+=`\nהאורך של ${the}: ${lenWord114(id)} – ${cm} ס״מ מהמותן. כלומר מתחיל על קו המותן (37%) והשוליים ב-${hem114(cm)}% מהגובה – באותו גובה בדיוק בכל 5 התנוחות. לא קצר יותר ולא ארוך יותר.`;
 if(c=='skirts')s+=`\nהחגורה של החצאית ברוחב המותן של האווטאר באותה תנוחה, לא צרה ולא רחבה ממנו. הנפח והקפלים כמו בתמונה של מה שקניתי – לא להוסיף נפח ולא להתנפח יותר.`;
 else if(c=='dresses'||c=='sets')s+=`\nהכתפיים של השמלה על קו הכתפיים, קו המותן של השמלה על המותן (37%). הנפח כמו בתמונה של מה שקניתי.`;
 else s+=`\nהכתפיים של הבגד על קו הכתפיים (20%), והאורך כמו בתמונה של מה שקניתי ביחס לגוף שלי.`;
 return s}
{const _p=pr102;pr102=function(id,np){const t=_p.apply(this,arguments);try{return t.replace('\nחשוב:','\n'+body114(id)+'\n\nחשוב:')}catch(e){ERR('v114 pr',e);return t}};window.pr102=pr102;window.body114=body114}

// the length row: in the "🚀 הכל ל-GPT" window and in the 2-file upload window
function lenRow114(id){if(!LENCAT114.includes(cat114(id)))return '';const k=String(len114(id)||'');const own=IT[id]&&IT[id].len114;
 return `<div class="len114"><b>📏 האורך האמיתי של ${esc(typeWord102(id).the)}:</b> ${Object.entries(LEN114).map(([q,[n]])=>`<button data-len114="${q}" class="${k==q?'on':''}">${n.replace('עד ','')}</button>`).join('')}<label>או <input type="number" inputmode="numeric" min="20" max="120" data-len114c value="${+k||''}" placeholder="ס״מ"> ס״מ מהמותן</label>${k&&!own?'<small>(ניחשתי לפי שם המוצר – אפשר לשנות)</small>':''}</div>`}
window.after106=function(d){const s=d.querySelector('.g106s');if(s&&window.G106.id&&!s.querySelector('.len114'))s.querySelector('div').insertAdjacentHTML('beforeend',lenRow114(window.G106.id))};
// how long the skirt GPT drew comes out on her body, in cm from the waist (front pose)
function gotCm114(){try{const c=TW99.cuts;if(!c||!c.front||cat114(TW99.id)!='skirts')return 0;const f=fitSkirt105(c).front;const B=BODY105.front,H=B[4]-B[3];
  return Math.round((c.front.h/c.front.w)*(f.w/100*399)/H*156)}catch(_){return 0}}
{const _p9=paint99;paint99=function(){_p9.apply(this,arguments);try{const d=document.getElementById('two99');const id=TW99.id;if(!d||!id)return;const g=d.querySelector('.t99g');
  if(g&&!d.querySelector('.len114'))g.insertAdjacentHTML('beforebegin',lenRow114(id));
  const got=gotCm114(),want=lenCm114(id);const h=d.querySelector('.t99c');
  if(h&&got){const bad=want&&Math.abs(got-want)>10;h.insertAdjacentHTML('afterend',`<p class="lck114${bad?' bad':''}">📏 האורך שיצא: בערך ${got} ס״מ מהמותן${want?` · ביקשת ${want} ס״מ (${esc(lenWord114(id))})`:''}${bad?`<br>⚠ זה לא האורך האמיתי. כדאי לכתוב ל-GPT באותו צ'אט: "החצאית צריכה להגיע ${esc(lenWord114(id))} – ${want} ס״מ מהמותן, השוליים ב-${hem114(want)}% מהגובה. אותו נפח כמו בתמונה של מה שקניתי." ולהעלות שוב.`:' ✓'}</p>`)}}catch(e){ERR('v114 two99',e)}}}
async function setLen114(id,v){IT[id]=IT[id]||{};IT[id].len114=v||null;try{await putItem(id,{len114:v||null})}catch(e){ERR('v114 len',e)}
 try{if(document.getElementById('g106')?.open){window.paint106();await window.copy106()}}catch(_){}
 try{if(document.getElementById('two99')?.open)paint99()}catch(_){}toast(v?'✓ האורך נשמר ונכנס לפרומפט':'✓')}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-len114]');if(!b)return;e.preventDefault();e.stopPropagation();const id=document.getElementById('g106')?.open?window.G106.id:TW99.id;if(id)setLen114(id,b.dataset.len114)},true);
document.addEventListener('change',e=>{const t=e.target;if(!t||!t.matches||!t.matches('[data-len114c]'))return;const id=document.getElementById('g106')?.open?window.G106.id:TW99.id;const n=Math.round(+t.value||0);if(id)setLen114(id,n>=20&&n<=120?String(n):'')},true);

// a quiet check: once per page load, the numbers of each garment from 2 GPT files as her browser places it, so I can see what she sees
{const SENT=new Set();const _si=stageInner;stageInner=async function(S,opt){const html=await _si.apply(this,arguments);
 try{if(S&&S.items&&S.tf&&typeof DB!='undefined'&&DB&&SENT.size<12)for(const [slot,id] of Object.entries(S.items)){const tf=S.tf[slot];if(!id||!tf)continue;const g=p5gOfT(id,tf);if(!g||!g.two)continue;
  const v=S.view||'front',k=id+'|'+v+'|'+(opt&&opt.big?'b':'');if(SENT.has(k))continue;SENT.add(k);
  const m=html.match(new RegExp(`<img[^>]*data-slot="${slot}"[^>]*>`));
  DB.collection('feedback').doc('d114'+Date.now().toString(36)+SENT.size).set({kind:'dbg114',ver:114,t:Date.now(),id,slot,v,avbase:S.avbase||'',gt:g.t,gn:g.n||'',fit:(g.fit||{})[v]||null,tf:JSON.parse(JSON.stringify(tf)),img:m?m[0].replace(/src="[^"]*"/,'').slice(0,400):'',w:innerWidth,h:innerHeight}).catch(()=>{})}}catch(_){}
 return html}}

// ---- v116/v119: a garment hides the body under it.
// Skirt: where her avatar sticks out of the skirt below the waist (the bottom in the side poses), that part of the avatar is not drawn
// (only the upper half of the skirt, so legs seen through a lace hem stay; the hands come back from the arm layer arm110).
// Top: where her avatar sticks out of the top between the shoulders and the top's hem (the bust in the side pose), it is not drawn – her arms (the arm mask) always stay.
// Tucked top ("חולצה בפנים"): the top stays ABOVE the skirt, and only its body below the skirt's waistband is hidden – the sleeves stay (before, the top went under the skirt and the arm layer covered the sleeves).
{const C116=new Map();const ld=u=>new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=u});const W=399,H=1365;
 const cvs=()=>{const c=document.createElement('canvas');c.width=W;c.height=H;return [c,c.getContext('2d',{willReadFrequently:true})]};
 // a layer drawn alone on a stage-size canvas, at its place
 async function layer(L){const s=await ld(L.src);const [c,x]=cvs();const iw=L.f.w/100*W,ih=iw*s.naturalHeight/s.naturalWidth;x.drawImage(s,L.f.x/100*W-iw/2,L.f.y/100*H-ih/2,iw,ih);return {c,d:x.getImageData(0,0,W,H).data}}
 async function mask(u,r){if(!u)return null;let i;try{i=await ld(u)}catch(_){return null}const [c,x]=cvs();for(let dx=-r;dx<=r;dx+=Math.max(1,r>>1))for(let dy=-r;dy<=r;dy+=Math.max(1,r>>1))x.drawImage(i,dx,dy,W,H);return x.getImageData(0,0,W,H).data}
 const rows=d=>{let t=H,b=0;for(let r=0;r<H;r++)for(let c=0;c<W;c+=2)if(d[(r*W+c)*4+3]>40){if(r<t)t=r;if(r>b)b=r}return [t,b]};
 async function work(av,armU,sk,tp,tuck,view){const out={};const A=await ld(av);const [bc,bx]=cvs();bx.drawImage(A,0,0,W,H);const im=bx.getImageData(0,0,W,H),d=im.data;let n=0;
  const arm=await mask(armU,6);const inArm=i=>arm&&arm[i+3]>40;
  // the arm layer itself (exact, not widened): its pixels are her arms, and it is drawn again as arm110 above skirts
  let ar=null,ac=null,an=0;try{const ai=await ld(armU);[ac]=cvs();const ax=ac.getContext('2d',{willReadFrequently:true});ax.drawImage(ai,0,0,W,H);ar=ax.getImageData(0,0,W,H)}catch(_){}
  const isArm=i=>ar&&ar.data[i+3]>40;
  const S=sk?await layer(sk):null,T=tp?await layer(tp):null;
  if(S){const [t,b]=rows(S.d);if(b-t>40){const r0=Math.round(t+(b-t)*.06),r1=Math.round(t+(b-t)*.5);for(let r=r0;r<=r1;r++)for(let c=0;c<W;c++){const i=(r*W+c)*4;if(d[i+3]&&!(S.d[i+3]>40)){d[i+3]=0;n++}}}
   out.skTop=t}
  if(T){const [t,b]=rows(T.d);if(b-t>40){let r0=Math.round(t+(b-t)*.18),r1=Math.round(b-(b-t)*.03);if(tuck&&S&&out.skTop!=null)r1=Math.min(r1,out.skTop+4);
    for(let r=r0;r<=r1;r++)for(let c=0;c<W;c++){const i=(r*W+c)*4;if(d[i+3]&&!(T.d[i+3]>40)&&!inArm(i)){d[i+3]=0;n++}}
    // v119: inside the sleeves, her own arm that sticks out of the sleeve is not drawn (the skin slivers beside the sleeves);
    // the sleeve ends at the last row where it covers at least half of her arm on that side, so the hands below the cuff stay
    if(ar){const cx=W/2;for(const [c0,c1] of [[0,Math.floor(cx)],[Math.floor(cx),W]]){let end=-1;
      for(let r=r0;r<=b;r++){let a=0,cov=0;for(let c=c0;c<c1;c++){const i=(r*W+c)*4;if(isArm(i)){a++;if(T.d[i+3]>40)cov++}}if(a>3&&cov*2>=a)end=r}
      for(let r=r0;r<=end-3;r++)for(let c=c0;c<c1;c++){const i=(r*W+c)*4;if(isArm(i)&&!(T.d[i+3]>40)){if(d[i+3]){d[i+3]=0;n++}ar.data[i+3]=0;an++}}}}}
   if(tuck&&S&&out.skTop!=null){const td=T.c.getContext('2d').getImageData(0,0,W,H);const q=td.data;const cut=out.skTop+Math.round((b-t)*.02);
    // below the waistband the top shows only where the skirt is not (the sleeves hanging beside the skirt) and over her arms (not in the hand-on-waist pose: there GPT's arm is not where hers is, and her hand comes from the arm layer)
    for(let r=cut;r<H;r++)for(let c=0;c<W;c++){const i=(r*W+c)*4;if(q[i+3]&&S.d[i+3]>40&&(view=='hip'||!inArm(i)))q[i+3]=0}
    T.c.getContext('2d').putImageData(td,0,0);out.top=T.c.toDataURL('image/webp',.92)}}
  if(n){bx.putImageData(im,0,0);out.body=bc.toDataURL('image/webp',.92)}
  if(an&&ac){ac.getContext('2d').putImageData(ar,0,0);out.arms=ac.toDataURL('image/webp',.92)}return out}
 const ok=st=>!(/rotate\((?!0deg)/.test(st)||/scale\((?!1,\s*1\))/.test(st)||/skewX\((?!0deg)/.test(st));
 const parse=tag=>{if(!tag)return null;const src=(tag.match(/src="([^"]+)"/)||[])[1],st=(tag.match(/style="([^"]*)"/)||[])[1]||'';const num=k=>{const m=st.match(new RegExp('(?:^|;)'+k+':(-?[\\d.]+)%'));return m?+m[1]:null};
  const f={x:num('left'),y:num('top'),w:num('width')};const z=+((st.match(/z-index:(-?\d+)/)||[])[1]||0);return src&&f.x!=null&&f.y!=null&&f.w&&ok(st)?{tag,src,f,z}:null};
 const _si=stageInner;stageInner=async function(S,opt){let html=await _si.apply(this,arguments);
  try{if(!S||!S.items)return html;const sb=html.match(/<img[^>]*class="sb[^"]*"[^>]*>/);if(!sb)return html;const av=(sb[0].match(/src="([^"]+)"/)||[])[1];
   const m=av&&av.match(/av\/(p6[cw])_(front|side|back|half|hip)\.webp/);if(!m)return html;
   const sk=S.items.skirt&&!S.items.dress&&!S.items.set?parse((html.match(/<img[^>]*data-slot="skirt"[^>]*>/)||[])[0]):null;
   const tp=S.items.top?parse((html.match(/<img[^>]*data-slot="top"[^>]*>/)||[])[0]):null;if(!sk&&!tp)return html;
   const tuck=!!(tp&&sk&&tp.z<10);const armU=`av/${m[1]}_arms_${m[2]}.webp`;
   const k=[av,sk&&sk.src,sk&&JSON.stringify(sk.f),tp&&tp.src,tp&&JSON.stringify(tp.f),tuck].join('|');
   if(!C116.has(k))C116.set(k,work(av,armU,sk,tp,tuck,m[2]).catch(e=>{ERR('v116 clip',e);return {}}));const o=await C116.get(k)||{};
   if(o.body)html=html.replace(sb[0],sb[0].replace(/src="[^"]+"/,`src="${o.body}" data-p6="1"`));
   if(o.arms){const at=(html.match(/<img[^>]*class="sh arm110"[^>]*>/)||[])[0];if(at)html=html.replace(at,at.replace(/src="[^"]+"/,`src="${o.arms}" data-p6="1"`))}
   if(o.top&&tp)html=html.replace(tp.tag,tp.tag.replace(/src="[^"]+"/,`src="${o.top}"`).replace(/style="[^"]*"/,`style="left:50%;top:50%;width:100%;z-index:${SLOTZ.skirt+3};transform:translate(-50%,-50%)"`))}
  catch(e){ERR('v116',e)}
  return html}}

// ---- v118: the card dot by avatar (Sara 22/10 22:41): 🟢 = uploaded for the NEW avatar (all 5 poses), 🟠 = only for the old avatar, 🔴 = nothing for the avatar
{const all5=g=>!!(g&&['front','side','back','half','hip'].every(v=>g[v]));const isNew=g=>all5(g)&&g.av=='p6';
 const st118=it=>{const gs=[it.p5g,...(it.p5gv||[])].filter(Boolean);if(gs.some(isNew))return 'ok';if(gs.some(g=>g.front)||(it.p5&&it.p5.front))return 'fix';return 'no'};
 const _av=avStat;avStat=function(id){const s=_av.apply(this,arguments);try{if(!s)return s;const it=IT[id]||{};
   const ps=it.parts||[];if(ps.length&&!it.p5g){const st=ps.map(p=>st118(IT[id+'~'+p.k]||{}));return st.every(x=>x=='ok')?'ok':st.some(x=>x!='no')?'fix':'no'}
   if(it.p5g||(it.p5gv||[]).length||it.p5||s=='ok'||s=='fix'){const r=st118(it);return r=='no'&&s!='no'&&!it.p5g&&!it.p5?s:r}
   return s}catch(_){return s}};window.avStat=avStat}
{const f=function(ids){const n={ok:0,fix:0,no:0};ids.forEach(id=>{const s=window.avStat(id);if(n[s]!=null)n[s]++});const t=n.ok+n.fix+n.no;return t?` · אווטאר: 🟢 חדש ${n.ok} 🟠 ישן ${n.fix} 🔴 אין ${n.no}`:''};try{avCounts=f}catch(_){}window.avCounts=f}

// ---- v119: tops, sweaters, jackets and dresses from 2 GPT files are placed by her SHOULDERS (GPT draws them at its own size and place):
// the garment's shoulder line goes on the avatar's shoulder line, and its width just below the shoulders matches her shoulders and upper arms in that pose
{const AVP={};const VS=['front','side','back','half','hip'];
 const prof=cv=>{const w=cv.width,h=cv.height,d=cv.getContext('2d',{willReadFrequently:true}).getImageData(0,0,w,h).data;const L=new Int16Array(h).fill(-1),R=new Int16Array(h).fill(-1);
  for(let y=0;y<h;y++){for(let x=0;x<w;x++)if(d[(y*w+x)*4+3]>128){L[y]=x;break}for(let x=w-1;x>=0;x--)if(d[(y*w+x)*4+3]>128){R[y]=x;break}}return {L,R,W:y=>L[y]<0?0:R[y]-L[y]+1}};
 const load=()=>Promise.all(VS.map(v=>new Promise(ok=>{const i=new Image();i.onload=()=>{try{const c=document.createElement('canvas');c.width=399;c.height=1365;c.getContext('2d').drawImage(i,0,0,399,1365);AVP[v]=prof(c)}catch(_){}ok()};i.onerror=()=>ok();i.src='av/p6c_'+v+'.webp'})));
 setTimeout(()=>load().catch(()=>{}),1500);
 const med=a=>{const b=a.filter(x=>x>0).sort((p,q)=>p-q);return b.length?b[b.length>>1]:0};
 window.fitTop116=function(v,c){const A=AVP[v],B=BODY105[v];if(!A||!B||!c||!c.canvas)return null;const t=B[3],H=B[4]-B[3];
  // the avatar: shoulder width just below the shoulder points, and the row where the shoulders start
  let wa=med(Array.from({length:Math.round(.03*H)},(_,i)=>A.W(Math.round(t+.22*H)+i)));let ya=t+Math.round(.15*H);while(ya<t+.3*H&&A.W(ya)<.9*wa)ya++;
  const G=prof(c.canvas),gh=c.canvas.height;let top=0;while(top<gh&&G.W(top)<3)top++;
  let M=0;for(let y=top;y<top+.3*gh&&y<gh;y++)M=Math.max(M,G.W(y));let gs=top;while(gs<gh&&G.W(gs)<.9*M)gs++;
  let s=wa/Math.max(8,med(Array.from({length:12},(_,i)=>G.W(gs+4+i))));
  for(let k=0;k<3;k++){const a0=Math.round(.02*H),a1=Math.round(.06*H);const wav=med(Array.from({length:a1-a0},(_,i)=>A.W(ya+a0+i)));
   const wg=med(Array.from({length:Math.max(2,Math.round((a1-a0)/s))},(_,i)=>G.W(Math.round(gs+a0/s)+i)));if(!wg||!wav)break;s=wav/wg}
  if(!(s>0)||!isFinite(s))return null;
  const rows=Array.from({length:Math.round(.04*H/s)+2},(_,i)=>Math.round(gs+.02*H/s)+i).filter(y=>y<gh&&G.L[y]>=0);
  const gc=rows.length?rows.reduce((p,y)=>p+(G.L[y]+G.R[y])/2,0)/rows.length:c.canvas.width/2;
  const arow=Array.from({length:Math.round(.04*H)},(_,i)=>Math.round(ya+.02*H)+i).filter(y=>A.L[y]>=0);const ac=arow.reduce((p,y)=>p+(A.L[y]+A.R[y])/2,0)/Math.max(1,arow.length);
  const cw=c.canvas.width,ch=c.canvas.height,r1=q=>Math.round(q*10)/10;
  return {x:r1((ac-(gc-cw/2)*s)/399*100),y:r1((ya-gs*s+ch*s/2)/1365*100),w:r1(cw*s/399*100)}};
 const TOPS=['tops','sweaters','outer','dresses','sets','vests','blouses','jackets','coats','cardigans'];
 const _fa=fitAny105;fitAny105=function(id,v,k,p,cuts){let cat='';try{cat=curCat(id)}catch(_){}
  if(TOPS.includes(cat)){try{const f=fitTop116(v,p);if(f)return f}catch(e){ERR('v119 fit',e)}}return _fa.apply(this,arguments)}}
