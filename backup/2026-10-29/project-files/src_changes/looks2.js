// ===== looks2 (2026-10-21): real colour matching, explanations, feedback that the site learns from =====
const LK_VER=1;
// --- colour facts for one item: text colour first, measured colour (D[id].col) for hue/lightness and for items without a colour name
const FAMW={'חום':1,'בז׳':1,'אדום':1,'ורוד':1,'צהוב':1},FAMC2={'כחול':1,'סגול':1,'ירוק':1,'אפור':1};
function cinfo(id){const x=D[id]||{};const col=x.col||{};const txt=x.color||'';const famT=famOf(id);const fam=famT||col.fc||'';const main=(col.c||[])[0]||[1,0,0,.5];
 const metal=col.metal||(/זהב/.test(txt)?'gold':/כסף/.test(txt)?'silver':'');const h=main[1],s=main[2],l=main[3];
 const mixed=!!col.mixed||fam=='צבעוני'||(col.sp||0)>70||/\+|-| ו/.test(txt.replace(/^#\d+ /,''))&&/שחור|לבן|זהב|כסף|ורוד|כחול|ירוק|סגול|חום/.test(txt)&&txt.split(/\+|-| ו/).length>1&&!/כהה|בהיר|עתיק|בייבי|מלכותי|אדמדם/.test(txt);
 const neutral=['שחור','לבן','אפור','בז׳','חום'].includes(fam)||(fam=='כחול'&&(l<.26||/נייבי/.test(txt)))||(!fam&&s<.14);
 const chrom=!neutral&&!mixed&&!!fam;
 const warm=metal=='gold'||(!!FAMW[fam])||(chrom&&h>=15&&h<=70);const cool=metal=='silver'||(!!FAMC2[fam])||(chrom&&h>=170&&h<=300);
 return {id,fam,h,s,l,metal,mixed,neutral,chrom,warm,cool,txt,name:(x.short||'').slice(0,28)}}
const hdist=(a,b)=>{const d=Math.abs(a-b)%360;return d>180?360-d:d};
const FKEY=(a,b)=>[a,b].sort().join('|');
function learn(){SET.learn=SET.learn||{pairs:{},items:{},notes:[]};return SET.learn}
// --- how well two items go together: score (negative = problem) and the reason in Hebrew
function pairScore(a,b){let s=0;const why=[];
 if(a.metal&&b.metal&&a.metal!=b.metal){s-=10;why.push('זהב וכסף יחד')}
 if(a.mixed&&b.mixed){s-=6;why.push('שתי דוגמאות/צבעוניים יחד')}
 if(a.neutral||b.neutral||a.mixed||b.mixed){
  if(a.fam=='שחור'&&b.fam=='חום'||a.fam=='חום'&&b.fam=='שחור'){s-=1}
  else if(a.fam=='שחור'&&b.fam=='כחול'&&b.l<.26||b.fam=='שחור'&&a.fam=='כחול'&&a.l<.26){s-=1}
  else s+=2}
 else{const d=hdist(a.h,b.h);
  if(a.fam==b.fam||d<28){s+=3;why.push('אותה משפחת צבע')}
  else if(d<60){s-=2}
  else if(d<150){s-=5;why.push(`${a.fam} עם ${b.fam} מתנגשים`)}
  else if(d<=210){if(a.s>.45&&b.s>.45){s-=1}else{s+=1;why.push('צבעים משלימים')}}
  else s-=2;
  if((a.warm&&b.cool)||(a.cool&&b.warm)){s-=3;why.push('גוון חם עם גוון קר')}}
 if(a.metal&&!b.metal&&b.chrom){if(a.metal=='gold'&&b.cool){s-=2;why.push('זהב עם צבע קר')}if(a.metal=='silver'&&b.warm){s-=2;why.push('כסף עם צבע חם')}}
 if(b.metal&&!a.metal&&a.chrom){if(b.metal=='gold'&&a.cool){s-=2;why.push('זהב עם צבע קר')}if(b.metal=='silver'&&a.warm){s-=2;why.push('כסף עם צבע חם')}}
 // what Sara taught the site
 const L=learn();const k1=FKEY(a.fam||'?',b.fam||'?');if(L.pairs[k1]){s+=L.pairs[k1];if(L.pairs[k1]<0)why.push(`למדתי: ${a.fam} עם ${b.fam} לא`)}
 if(a.metal&&b.metal){const k2='metal:'+FKEY(a.metal,b.metal);if(L.pairs[k2])s+=L.pairs[k2]}
 return {s,why}}
const MAINS=['dress','set','top','skirt','outer'];
function lookScore(L){const ents=Object.entries(L).filter(([k,id])=>id&&D[id]&&k!='kid'&&k!='extra');const inf=ents.map(([k,id])=>[k.replace(/2$/,''),cinfo(id)]);
 let s=0,np=0;const badM=new Map(),good=[];
 for(let i=0;i<inf.length;i++)for(let j=i+1;j<inf.length;j++){const [ka,a]=inf[i],[kb,b]=inf[j];const w=(MAINS.includes(ka)&&MAINS.includes(kb))?1:.7;const r=pairScore(a,b);s+=r.s*w;np+=w;
  r.why.forEach(t=>{if(r.s<0){const ex=badM.get(t)||[];if(ex.length<2)ex.push(`${a.name} · ${b.name}`);badM.set(t,ex)}else if(!good.includes(t))good.push(t)})}
 const bad=[...badM.entries()].map(([t,ex])=>`${t} (${ex.join(' / ')})`);const avg=np?s/np:0;
 const fams=new Set(inf.filter(([k,c])=>c.chrom).map(([k,c])=>c.fam));if(fams.size>2){s-=4;bad.push('יותר מדי צבעים חזקים יחד')}else if(fams.size==1&&inf.length>=3){s+=1.5;good.push('צבע מוביל אחד על בסיס ניטרלי')}
 const metals=new Set(inf.map(([k,c])=>c.metal).filter(Boolean));if(metals.size>1){bad.push('גם זהב וגם כסף בלוק')}
 const L2=learn();inf.forEach(([k,c])=>{const v=L2.items[c.id];if(v){s+=v;if(v<=-3)bad.push(`למדתי: ${c.name} לא ללוקים`)}});
 const dark=inf.filter(([k,c])=>c.l<.22&&!c.mixed).length;if(inf.length>=4&&dark==inf.length){s-=1}
 return {s:Math.round(s*10)/10,avg:Math.round(avg*100)/100,bad:[...new Set(bad)],good:[...new Set(good)].slice(0,3)}}
function starsN(r){const a=typeof r=='number'?r:(r.avg||0);let n=a>=1.5?5:a>=.5?4:a>=-1?3:a>=-3?2:1;if(typeof r=='object'){if(r.bad.length)n=Math.min(n,3);if(hardBad(r))n=Math.min(n,2)}return n}
function stars(r){const n=starsN(r);return '★'.repeat(n)+'☆'.repeat(5-n)}
function whyHTML(r){const ok=!r.bad.length;return `<div class="lscore ${ok?'ok':hardBad(r)?'bad':'meh'}"><b>${stars(r)}</b> ${ok?'התאמת צבעים טובה'+(r.good.length?': '+r.good.join(', '):''):'שימי לב: '+r.bad.join('; ')}</div>`}
// --- generation: many candidates, keep the best three (different main garment each)
function hardBad(r){return r.bad.some(t=>/זהב וכסף|מתנגשים|למדתי/.test(t))}
function genBest(o,anchor,n=3){const cands=[];const tries=o.tries||42;
 for(let i=0;i<tries;i++){const L=genLook(o,new Set(),anchor);if(!Object.keys(L).length)continue;const key=Object.values(L).sort().join(',');if(cands.some(c=>c.key==key))continue;const r=lookScore(L);cands.push({L,r,key,main:L.dress||L.set||L.skirt||L.top||''})}
 cands.sort((a,b)=>(b.r.avg-a.r.avg)||(b.r.s-a.r.s));const out=[];const mains=new Set(),sigs=new Set();const sig=L=>Object.values(L).map(id=>cinfo(id)).filter(c=>c.chrom||c.mixed).map(c=>c.fam).sort().join();
 for(const c of cands){if(out.length>=n)break;if(hardBad(c.r)&&cands.length>n)continue;if(mains.has(c.main)&&cands.length>n*2)continue;const g=sig(c.L);if(sigs.has(g)&&cands.length>n*3)continue;mains.add(c.main);sigs.add(g);out.push(c)}
 for(const c of cands){if(out.length>=n)break;if(!out.includes(c))out.push(c)}
 return out}
let GENR=[];
runGen=function(anchor){GENO=hubOpts();const best=genBest(GENO,anchor);GEN=best.map(c=>c.L);GENR=best.map(c=>c.r);
 $('#hlooks').innerHTML=GEN.map((L,i)=>lookHTML(L,i)).join('')||'<p>לא נמצאו מספיק פריטים. נסי לשנות את הבחירה.</p>';decorate()};
// replacing one item: pick the best-scoring candidate for that slot instead of a random one
document.addEventListener('click',e=>{const rr=e.target.closest&&e.target.closest('[data-rr]');if(!rr)return;e.preventDefault();e.stopImmediatePropagation();
 const [i,slot]=rr.dataset.rr.split('|');const L=GEN[+i];if(!L)return;const cur=L[slot];const base=slot.replace(/2$/,'');
 const catOf={dress:['dresses'],set:['sets'],skirt:['skirts'],top:['tops','sweaters'],outer:['outer'],scarf:['scarves'],belt:['belts'],shoes:['shoes'],jewelry:['jewelry'],bag:['bags']}[base]||[];
 const used=new Set(Object.values(L));const pool=poolOf(catOf,GENO,id=>id!=cur&&!used.has(id)&&(MAINS.includes(base)?fitsOcc(id,GENO.occ)&&fitsSeason(id,GENO.sea):true));
 if(!pool.length){toast('אין עוד פריט מתאים להחלפה');return}
 const scored=pool.map(id=>{const T=Object.assign({},L,{[slot]:id});return {id,r:lookScore(T)}}).sort((a,b)=>(b.r.avg-a.r.avg)||(b.r.s-a.r.s));
 const top=scored.slice(0,Math.min(4,scored.length));const pickd=top[Math.floor(Math.random()*top.length)];L[slot]=pickd.id;GENR[+i]=pickd.r;
 $('#hlooks').innerHTML=GEN.map((L,i)=>lookHTML(L,i)).join('');decorate()},true);
// --- the score + feedback row on every look card
function decorate(){$$('#hlooks .look').forEach(el=>{if(el.querySelector('.lscore'))return;const i=+el.dataset.i;const L=GEN[i];if(!L)return;const r=GENR[i]||(GENR[i]=lookScore(L));
 el.insertAdjacentHTML('beforeend',whyHTML(r)+`<div class="lfb" data-fb="${i}"><span>מה דעתך?</span><button data-fbv="up">👍 מתאים</button><button data-fbv="down">👎 לא מתאים</button></div>`)});
 // a trial look in the hub gets the same treatment
 const tr=$('#tryon');}
function fbForm(i){const L=GEN[i];const ids=Object.values(L).filter(id=>D[id]);return `<div class="fbform">
 <b>מה לא טוב כאן? (אפשר כמה)</b>
 <div class="fbr"><button data-fbr="colors">🎨 הצבעים לא מתאימים</button><button data-fbr="style">👗 לא הסגנון שלי</button><button data-fbr="occ">📅 לא מתאים לאירוע</button><button data-fbr="item">🚫 בגד שלא אלבש</button></div>
 <div class="fbitems hide"><small>סמני את הבגד/ים הבעייתיים:</small><div class="lk">${ids.map(id=>`<button class="mini fbi" data-fbi="${id}"><img data-th="${id}" src="${img(id)||TPH}" alt=""><span>${esc(D[id].short.slice(0,16))}</span></button>`).join('')}</div></div>
 <textarea class="fbnote" rows="2" placeholder="במילים שלך, למשל: חולצה שחור-כסף עם כיסוי זהב לא הולך"></textarea>
 <div class="ib"><button class="go" data-fbsend="${i}">שלחי, ואלמד מזה</button><button data-fbcancel="1">ביטול</button></div></div>`}
const COLW={'שחור':'שחור','לבן':'לבן','חום':'חום','בז':'בז׳','כחול':'כחול','נייבי':'כחול','ירוק':'ירוק','אדום':'אדום','בורדו':'אדום','ורוד':'ורוד','סגול':'סגול','אפור':'אפור','זהב':'metal:gold','כסף':'metal:silver','צבעוני':'צבעוני'};
function wordsOf(t){const f=[];Object.keys(COLW).forEach(w=>{if(t.includes(w))f.push(COLW[w])});return [...new Set(f)]}
async function sendFb(i,verdict,reasons,items,note){const L=GEN[i];const ids=Object.values(L).filter(id=>D[id]);const inf=ids.map(cinfo);const LN=learn();const learned=[];
 const bump=(k,v)=>{LN.pairs[k]=Math.max(-8,Math.min(6,(LN.pairs[k]||0)+v))};
 if(verdict=='up'){for(let a=0;a<inf.length;a++)for(let b=a+1;b<inf.length;b++){if(inf[a].fam&&inf[b].fam)bump(FKEY(inf[a].fam,inf[b].fam),1)}ids.forEach(id=>{LN.items[id]=Math.min(4,(LN.items[id]||0)+1)});learned.push('הלוק הזה טוב, אחפש עוד כאלה')}
 else{
  if(reasons.includes('colors')){const keys=new Map();let metalClash=false;
   for(let a=0;a<inf.length;a++)for(let b=a+1;b<inf.length;b++){const A=inf[a],B=inf[b];if(A.metal&&B.metal&&A.metal!=B.metal){metalClash=true;keys.set('metal:'+FKEY(A.metal,B.metal),'לא לשלב זהב עם כסף')}}
   if(!metalClash)for(let a=0;a<inf.length;a++)for(let b=a+1;b<inf.length;b++){const A=inf[a],B=inf[b];if(A.fam&&B.fam&&A.fam!=B.fam&&(A.chrom||B.chrom||(A.mixed&&B.mixed))){const k=FKEY(A.fam,B.fam);if(!keys.has(k))keys.set(k,`פחות ${k.split('|')[0]} עם ${k.split('|')[1]}`)}}
   keys.forEach((msg,k)=>{bump(k,k.startsWith('metal:')?-4:-2);learned.push(msg)});if(!keys.size)learned.push('הצבעים כאן פחות (אזכור את השילוב)')}
  if(reasons.includes('item')||items.length){items.forEach(id=>{LN.items[id]=Math.max(-6,(LN.items[id]||0)-3);learned.push(`${D[id].short.slice(0,22)}: לא ללוקים אוטומטיים`)})}
  if(reasons.includes('style')){ids.forEach(id=>{LN.items[id]=Math.max(-6,(LN.items[id]||0)-1)});learned.push('הסגנון הזה פחות')}
  if(reasons.includes('occ')){learned.push('לא לאירוע הזה')}
  // free text: two colour words with "לא" = don't combine them
  if(note){const ws=wordsOf(note);if(/לא|בלי|אסור/.test(note)&&ws.length>=2){for(let a=0;a<ws.length;a++)for(let b=a+1;b<ws.length;b++){const ka=ws[a],kb=ws[b];const key=(ka.startsWith('metal')&&kb.startsWith('metal'))?'metal:'+FKEY(ka.slice(6),kb.slice(6)):FKEY(ka.replace('metal:gold','בז׳').replace('metal:silver','אפור'),kb.replace('metal:gold','בז׳').replace('metal:silver','אפור'));bump(key,-3);learned.push(`לא ${ka.replace('metal:gold','זהב').replace('metal:silver','כסף')} עם ${kb.replace('metal:gold','זהב').replace('metal:silver','כסף')}`)}}
   LN.notes=[{t:Date.now(),note,items:ids}].concat(LN.notes||[]).slice(0,40)}}
 LN.log=[{t:Date.now(),v:verdict,r:reasons,items:ids,note:note||''}].concat(LN.log||[]).slice(0,200);
 try{await saveSet()}catch(_){}
 if(DB){try{await DB.collection('feedback').doc('f'+Date.now().toString(36)).set({t:Date.now(),v:verdict,r:reasons,items:ids,bad:items,note:note||'',occ:GENO.occ||''})}catch(_){}}
 return [...new Set(learned)]}
document.addEventListener('click',async e=>{const t=e.target;if(!t.closest)return;
 const v=t.closest('[data-fbv]');if(v){const box=v.closest('.lfb');const i=+box.dataset.fb;if(v.dataset.fbv=='up'){const got=await sendFb(i,'up',[],[],'');box.innerHTML=`<span class="fbok">✓ תודה! ${got[0]||''}</span>`;toast('👍 למדתי: הלוק הזה טוב');GENR[i]=lookScore(GEN[i]);return}
  if(!box.querySelector('.fbform'))box.insertAdjacentHTML('beforeend',fbForm(i));return}
 const r=t.closest('[data-fbr]');if(r){r.setAttribute('aria-pressed',r.getAttribute('aria-pressed')!='true');if(r.dataset.fbr=='item')r.closest('.fbform').querySelector('.fbitems').classList.toggle('hide',r.getAttribute('aria-pressed')!='true');return}
 const fi=t.closest('[data-fbi]');if(fi){e.preventDefault();e.stopPropagation();fi.classList.toggle('on');return}
 const c=t.closest('[data-fbcancel]');if(c){c.closest('.fbform').remove();return}
 const s=t.closest('[data-fbsend]');if(s){const i=+s.dataset.fbsend;const f=s.closest('.fbform');const reasons=[...f.querySelectorAll('[data-fbr][aria-pressed="true"]')].map(b=>b.dataset.fbr);const items=[...f.querySelectorAll('.fbi.on')].map(b=>b.dataset.fbi);const note=f.querySelector('.fbnote').value.trim();
  if(!reasons.length&&!items.length&&!note){toast('סמני סיבה או כתבי מילה');return}
  s.disabled=true;const got=await sendFb(i,'down',reasons,items,note);const box=f.closest('.lfb');box.innerHTML=`<span class="fbok">✓ תודה, למדתי: ${got.length?got.join(' · '):'אזכור את זה'}</span> <button data-fbredo="${i}">↻ הרכיבי לוק אחר במקום</button>`;paintLearn();return}
 const rd=t.closest('[data-fbredo]');if(rd){const i=+rd.dataset.fbredo;const best=genBest(GENO,null,6).filter(c=>!GEN.some((L,j)=>j!=i&&Object.values(L).sort().join()==c.key));if(best.length){GEN[i]=best[0].L;GENR[i]=best[0].r;$('#hlooks').innerHTML=GEN.map((L,i)=>lookHTML(L,i)).join('');decorate();toast('הרכבתי לוק אחר לפי מה שלמדתי')}return}
 const dl=t.closest('[data-lrndel]');if(dl){const [kind,key]=dl.dataset.lrndel.split('::');const LN=learn();if(kind=='p')delete LN.pairs[key];if(kind=='i')delete LN.items[key];if(kind=='n')LN.notes=(LN.notes||[]).filter(n=>String(n.t)!=key);await saveSet();paintLearn();return}
 if(t.closest('#lrnclr')){if(!sure(t.closest('#lrnclr'),'בטוח? לחצי שוב למחיקה'))return;SET.learn={pairs:{},items:{},notes:[]};await saveSet();paintLearn();return}});
// --- "מה למדתי": the rules in plain Hebrew, each one removable
function learnHTML(){const LN=learn();const rows=[];
 Object.entries(LN.pairs).forEach(([k,v])=>{if(!v)return;const [a,b]=k.replace(/^metal:/,'').split('|').map(x=>x=='gold'?'זהב':x=='silver'?'כסף':x);rows.push(`<li>${v<0?'לא לשלב':'כן לשלב'} <b>${esc(a)}</b> עם <b>${esc(b)}</b> <small>(${v>0?'+':''}${v})</small><button data-lrndel="p::${esc(k)}" aria-label="מחיקה">✕</button></li>`)});
 Object.entries(LN.items).forEach(([id,v])=>{if(!v||!D[id])return;rows.push(`<li>${v<0?(v<=-3?'לא להכניס ללוקים':'פחות'):'יותר'}: <button class="lnk" data-open="${id}">${esc(D[id].short.slice(0,30))}</button> <small>(${v>0?'+':''}${v})</small><button data-lrndel="i::${id}" aria-label="מחיקה">✕</button></li>`)});
 (LN.notes||[]).forEach(n=>rows.push(`<li>📝 "${esc(n.note)}"<button data-lrndel="n::${n.t}" aria-label="מחיקה">✕</button></li>`));
 const nlog=(LN.log||[]).length;
 return `<details class="learnbox" ${rows.length?'':''}><summary>🧠 מה למדתי ממך על לוקים (${rows.length} כללים${nlog?' · '+nlog+' משובים':''})</summary>${rows.length?`<ul>${rows.join('')}</ul><button id="lrnclr" class="lnk">מחקי הכול</button>`:'<p class="m" style="padding:0">עוד לא למדתי כלום. אחרי שתסמני 👍 או 👎 על לוקים, הכללים יופיעו כאן ואשתמש בהם בכל לוק הבא.</p>'}</details>`}
function paintLearn(){let el=$('#hlearn');if(!el){const hg=$('#hgen');if(!hg)return;const row=hg.closest('.hrow');el=document.createElement('div');el.id='hlearn';(row||hg).after(el)}el.innerHTML=learnHTML()}
{const _rh2=renderHub;renderHub=function(){_rh2();if(TAB=='looks')paintLearn();if(TAB=='looks')decorate()}}
// AI looks (Claude) and "הרכיבי לי" both end up in #hlooks: give every card its score row
new MutationObserver(()=>{if($('#hlooks'))decorate()}).observe(document.getElementById('hub')||document.body,{childList:true,subtree:true});
// --- studio: "✨ השלימי לי" tries many completions and keeps the best match; the drawer's "הכי מתאים" uses the same scoring
autoFill=async function(){pushH();const o={occ:ST.occ=='shab'?'shab':ST.occ=='event'?'event':'day',sea:'',fav:false,kids:false,tries:30};const have=Object.assign({},ST.items);const anchor=Object.values(have)[0]||null;
 const merge=(L)=>{const M=Object.assign({},have);for(const [k,id] of Object.entries(L)){const slot=k=='extra'||k=='kid'?null:k;if(!slot||M[slot])continue;if(slot=='scarf'&&ST.head=='wig')continue;if((slot=='top'||slot=='skirt')&&(M.dress||M.set))continue;if(slot=='dress'&&(M.top||M.skirt))continue;M[slot]=id}return M};
 let best=null;for(let i=0;i<30;i++){const M=merge(genLook(o,new Set(),anchor));const r=lookScore(M);if(!best||r.avg>best.r.avg)best={M,r}}
 if(!best)return;for(const [slot,id] of Object.entries(best.M)){if(ST.items[slot])continue;ST.items[slot]=id;ST.tf[slot]=await autoTf(slot,id)}
 await drawStudio();toast(best.r.bad.length?'השלמתי. שימי לב: '+best.r.bad[0].slice(0,70):'השלמתי בהתאמת צבעים: '+stars(best.r))};
{const _di=drawerItems;drawerItems=function(slot){const ids=_di(slot);if(DRF.sort!='match'&&DRF.sort!='av')return ids;const cur=lookIds(ST).filter(id=>id!=ST.items[slot]).map(cinfo);if(!cur.length)return ids;
 const sc=id=>{const c=cinfo(id);return cur.reduce((s,o)=>s+pairScore(c,o).s,0)+((IT[id]||{}).fav?1:0)};const cache={};ids.forEach(id=>cache[id]=sc(id));return ids.sort((a,b)=>cache[b]-cache[a])}}
// studio: live colour verdict under the stage info
{const _pi=paintInfo;paintInfo=function(){_pi();const el=$('#sinfo');if(!el||!ST)return;const ids=lookIds(ST);let box=el.querySelector('.lscore');if(ids.length<2){if(box)box.remove();return}const r=lookScore(ST.items);const html=whyHTML(r);if(box)box.outerHTML=html;else el.insertAdjacentHTML('beforeend',html)}}
