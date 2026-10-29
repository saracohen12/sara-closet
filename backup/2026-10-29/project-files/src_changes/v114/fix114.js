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
