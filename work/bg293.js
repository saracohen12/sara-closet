// v295 (Sara 28/10 15:38 "התסרוקות … הכיסוי … שיגזרו בדיוק … על רקע שחור … על הכיסויים הקהים רקע בהיר … אתה תחליט לפי התמונה … ואם אני חושבת שצריך
// רקע בהיר, אני יכולה להחליף … תן לי גמישות"): every hairstyle / tie / cover-tie prompt says which backdrop GPT paints – ⬛ black or ⬜ light –
// per sheet. I choose by the colour (light, cream, beige, white, see-through → black; dark → light; her dark-chocolate wig → light), and a ⬛/⬜
// button on every card lets her switch. cut8 already finds a black backdrop by itself (deBlack) and cuts the hair / cloth from it.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v295 '+w+': '+(e&&(e.code||e.message)||e));
const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SHEER=/שקוף|שקופה|שיפון|תחרה|טול|רשת|sheer|chiffon|lace|tulle|mesh|organza/i;
const LIGHTW=/לבן|לבנה|שמנת|קרם|בז|אופ.?וויט|פנינה|פודרה|תכלת בהיר|ורוד בהיר|white|cream|ivory|beige|off.?white|nude|pearl/i;
const DARKW=/שחור|כהה|נייבי|חום|שוקו|קפה|בורדו|זית|פחם|black|navy|brown|burgundy|charcoal|chocolate/i;
const autoTxt=t=>{t=String(t||'');if(SHEER.test(t))return 'k';if(LIGHTW.test(t)&&!DARKW.test(t))return 'k';return 'l'};
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
// library hairstyles and ties: her choice is kept on this device (most are hair – her wig is dark, so light unless she picks black)
let M={};try{M=JSON.parse(localStorage.getItem('bg293')||'{}')||{}}catch(_){}
const keep=()=>{try{localStorage.setItem('bg293',JSON.stringify(M))}catch(_){}};
const styMode=k=>M[k]||'l';
const itemAuto=id=>{const d=D[id]||{};return autoTxt([d.color,d.short,d.full].filter(Boolean).join(' '))};
const itemMode=id=>{const v=it(id).tbg;return v=='k'||v=='l'?v:itemAuto(id)};
let CTX='';   // the card of the last click in the styles window
const BLK=(two,tie)=>`⬛ רקע שחור – חשוב לגזירה: ${two?'בגיליון של הגוף המלא (doll-8) ':'בגיליון '}צבעי את כל הרקע מסביב לדמות בשחור אחיד ונקי – מכל הצדדים, מעל הראש ועד הרצפה, וגם בין הזרועות לגוף. רק הרקע משתנה: הדמות, הפנים, השמלה בצבע עור והקווים הלבנים בין המשבצות נשארים בדיוק כמו שהם. קצוות השיער והבד חדים ונקיים מול השחור – בלי הילה, בלי זוהר ובלי שוליים בהירים. ${tie?'הבד אטום, גם מול השחור – השחור לא נראה דרכו.':'שיער דק בקצוות נשאר עדין וטבעי, ורואים בין השערות את השחור.'}${two?' בתקריב (face-8) הרקע נשאר כמו שהוא.':''}`;
const LGT=`⬜ רקע: הרקע נשאר בדיוק כמו בקובץ ששלחתי – בהיר וחלק, לא שחור ולא צבע אחר. קצוות השיער והבד חדים ונקיים מול הרקע, בלי הילה ובלי צל על הרקע.`;
function addBg(t,m,tie){if(typeof t!='string'||!t)return t;const two=/face-8/.test(t)&&/doll-8/.test(t);
 if(m=='k')t=t.replace(/אותו רקע/g,'אותו רקע (חוץ מהשחור שביקשתי למטה)');return t+'\n\n'+(m=='k'?BLK(two,tie):LGT)}
function wrap(){const P=window.STYP;if(!P||P.__bg293)return!!P;P.__bg293=1;
 ['hair','hairW','hairZ','tie','tieW'].forEach(k=>{const f=P[k];if(typeof f!='function')return;P[k]=function(){return addBg(f.apply(this,arguments),styMode(CTX||('new:'+(/^hair/.test(k)?'hair':'tie'))),/^tie/.test(k))}});
 ['exact','batch'].forEach(k=>{const f=P[k];if(typeof f!='function')return;P[k]=function(item){let id='';try{const d=document.getElementById('tie202');if(d&&d.open&&window.tie228&&tie228.pid)id=tie228.pid()}catch(_){}
  return addBg(f.apply(this,arguments),id?itemMode(id):autoTxt(item),true)}});return true}
// ---- the buttons ----
const lbl=(m,auto)=>`${m=='k'?'⬛ רקע שחור':'⬜ רקע בהיר'}<small>${auto?'בחרתי בשבילך':'בחירה שלך'} · לגעת כדי להחליף</small>`;
function paintSty(d){d.querySelectorAll('.syc').forEach(c=>{const rm=c.querySelector('[data-syrm]'),sb=c.querySelector('.sycb');if(!rm||!sb||!c.querySelector('[data-syp2]'))return;
  const k=rm.dataset.syrm,m=styMode(k),h=`<button type="button" class="bg293b" data-bg293s="${es(k)}" aria-pressed="${m=='k'}" title="הרקע שיבקש הפרומפט">${lbl(m,!M[k])}</button>`;
  const old=c.querySelector('.bg293b');if(old){if(old.outerHTML!=h)old.outerHTML=h}else sb.insertAdjacentHTML('afterbegin',h)});
 d.querySelectorAll('[data-sycopy]').forEach(b=>{const set=b.dataset.sycopy;if(set=='mk')return;const k='new:'+set,m=styMode(k),h=`<button type="button" class="bg293b" data-bg293s="${es(k)}" aria-pressed="${m=='k'}">${lbl(m,!M[k])}</button>`;
  const o=b.parentNode.querySelector('.bg293b');if(o){if(o.outerHTML!=h)o.outerHTML=h}else b.insertAdjacentHTML('afterend',h)})}
function paintTie(d){const id=window.tie228&&tie228.pid&&tie228.pid();if(!id)return;const h=d.querySelector('.mkh');if(!h)return;const v=it(id).tbg,m=itemMode(id);
 const html=`<div class="bg293r"><span>הרקע בגיליונות של הכיסוי הזה:</span><button type="button" class="bg293b" data-bg293i="${es(id)}" aria-pressed="${m=='k'}">${lbl(m,!(v=='k'||v=='l'))}</button></div>`;
 const o=d.querySelector('.bg293r');if(o){if(o.outerHTML!=html)o.outerHTML=html}else h.insertAdjacentHTML('afterend',html)}
function watch(id,fn){const t=setInterval(()=>{const d=document.getElementById(id);if(!d)return;clearInterval(t);let q=0;
 new MutationObserver(()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;try{fn(d)}catch(e){ERR('paint',e)}})}).observe(d,{childList:true,subtree:true});try{fn(d)}catch(e){ERR('paint',e)}},900)}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('button');if(!t)return;
 if(t.closest('#sty199')){const c=t.closest('.syc'),rm=c&&c.querySelector('[data-syrm]');CTX=rm?rm.dataset.syrm:t.dataset.sycopy?'new:'+t.dataset.sycopy:CTX}
 if(t.dataset.bg293s!=null){e.preventDefault();e.stopPropagation();const k=t.dataset.bg293s;M[k]=styMode(k)=='k'?'l':'k';keep();paintSty(t.closest('#sty199')||document);return}
 if(t.dataset.bg293i!=null){e.preventDefault();e.stopPropagation();const id=t.dataset.bg293i,nv=itemMode(id)=='k'?'l':'k';try{await putItem(id,{tbg:nv})}catch(er){ERR('put',er)}const d=document.getElementById('tie202');if(d)paintTie(d)}},true);
const w=setInterval(()=>{if(wrap())clearInterval(w)},500);
watch('sty199',paintSty);watch('tie202',paintTie);
{const _bp=window.beforePut;if(typeof _bp=='function')beforePut=function(id,p){const k=p&&Object.keys(p);if(k&&k.length==1&&k[0]=='tbg')return;return _bp.apply(this,arguments)}}   // not an undo step
window.BG293={autoTxt,itemMode,styMode,addBg};
})();
