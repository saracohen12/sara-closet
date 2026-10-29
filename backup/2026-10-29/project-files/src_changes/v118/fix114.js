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

// ---- v116: a skirt hides the body under it. Where her avatar sticks out of the skirt below the waist (the bottom in the side poses), that part of the avatar is not drawn.
// Only the upper half of the skirt is used, so legs seen through a lace or sheer hem stay; the hands come back from the arm layer (arm110).
{const C116=new Map();const ld=u=>new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=u});
 async function clip116(av,sk,f){const W=399,H=1365;const [a,s]=await Promise.all([ld(av),ld(sk)]);
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d',{willReadFrequently:true});
  const iw=f.w/100*W,ih=iw*s.naturalHeight/s.naturalWidth;x.drawImage(s,f.x/100*W-iw/2,f.y/100*H-ih/2,iw,ih);const sd=x.getImageData(0,0,W,H).data;
  x.clearRect(0,0,W,H);x.drawImage(a,0,0,W,H);const im=x.getImageData(0,0,W,H),d=im.data;const on=(r,c)=>sd[(r*W+c)*4+3]>40;
  let top=H,bot=0;for(let r=0;r<H;r++)for(let c=0;c<W;c+=2)if(on(r,c)){if(r<top)top=r;if(r>bot)bot=r}
  if(bot-top<40)return null;const r0=Math.round(top+(bot-top)*.06),r1=Math.round(top+(bot-top)*.5);let n=0;
  for(let r=r0;r<=r1;r++)for(let c=0;c<W;c++){const i=(r*W+c)*4;if(d[i+3]&&!on(r,c)){d[i+3]=0;n++}}
  if(!n)return null;x.putImageData(im,0,0);return cv.toDataURL('image/webp',.92)}
 const _si=stageInner;stageInner=async function(S,opt){let html=await _si.apply(this,arguments);
  try{if(S&&S.items&&S.items.skirt&&!S.items.dress&&!S.items.set){
   const sk=html.match(/<img[^>]*data-slot="skirt"[^>]*>/);const sb=html.match(/<img[^>]*class="sb[^"]*"[^>]*>/);if(!sk||!sb)return html;
   const src=t=>(t.match(/src="([^"]+)"/)||[])[1],st=(sk[0].match(/style="([^"]*)"/)||[])[1]||'';const num=k=>{const m=st.match(new RegExp('(?:^|;)'+k+':(-?[\\d.]+)%'));return m?+m[1]:null};
   const f={x:num('left'),y:num('top'),w:num('width')};const av=src(sb[0]),su=src(sk[0]);
   if(!av||!su||!/av\/p6/.test(av)||f.x==null||f.y==null||!f.w||/rotate\((?!0deg)/.test(st)||/scale\((?!1,\s*1\))/.test(st)||/skewX\((?!0deg)/.test(st))return html;
   const k=av+'|'+su+'|'+f.x+'|'+f.y+'|'+f.w;if(!C116.has(k))C116.set(k,clip116(av,su,f).catch(e=>{ERR('v116 clip',e);return null}));const u=await C116.get(k);
   if(u)html=html.replace(sb[0],sb[0].replace(/src="[^"]+"/,`src="${u}" data-p6="1"`))}}catch(e){ERR('v116',e)}
  return html}}

// ---- v118: the card dot by avatar (Sara 22/10 22:41): 🟢 = uploaded for the NEW avatar (all 5 poses), 🟠 = only for the old avatar, 🔴 = nothing for the avatar
{const all5=g=>!!(g&&['front','side','back','half','hip'].every(v=>g[v]));const isNew=g=>all5(g)&&g.av=='p6';
 const st118=it=>{const gs=[it.p5g,...(it.p5gv||[])].filter(Boolean);if(gs.some(isNew))return 'ok';if(gs.some(g=>g.front)||(it.p5&&it.p5.front))return 'fix';return 'no'};
 const _av=avStat;avStat=function(id){const s=_av.apply(this,arguments);try{if(!s)return s;const it=IT[id]||{};
   const ps=it.parts||[];if(ps.length&&!it.p5g){const st=ps.map(p=>st118(IT[id+'~'+p.k]||{}));return st.every(x=>x=='ok')?'ok':st.some(x=>x!='no')?'fix':'no'}
   if(it.p5g||(it.p5gv||[]).length||it.p5||s=='ok'||s=='fix'){const r=st118(it);return r=='no'&&s!='no'&&!it.p5g&&!it.p5?s:r}
   return s}catch(_){return s}};window.avStat=avStat}
{const f=function(ids){const n={ok:0,fix:0,no:0};ids.forEach(id=>{const s=window.avStat(id);if(n[s]!=null)n[s]++});const t=n.ok+n.fix+n.no;return t?` · אווטאר: 🟢 חדש ${n.ok} 🟠 ישן ${n.fix} 🔴 אין ${n.no}`:''};try{avCounts=f}catch(_){}window.avCounts=f}
