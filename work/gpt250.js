// ===== v250 (Sara 27/10 16:53 "בכל המוצרים אני יכולה בלחצן אחד שהוא ייתן לי את הפרומט, את הבגד, את הדמויות שלי … זיפ אחד"):
// every item gets ONE window for GPT: she answers a few questions (what it is, a belt?, how many pieces, a light colour?), downloads ONE zip
// (prompt.txt + doll-8.jpg + every picture of the item [+ face-8.jpg for jewelry]), and uploads what GPT returns in one go.
// · the type she picks is saved (IT.kd) and r360 kindOf follows it
// · belt: none / separate (GPT takes it off, she can match one of hers) / sewn on, same fabric (stays)                       → IT.blt
// · white / cream / see-through → GPT paints the backdrop black and cut8 (deBlack) cuts it from black                        → IT.wbg
// · several pieces in one product (3 shirts, a set, a jewelry set) → one sheet each; each becomes a piece (fix85 parts, D['id~g1'])
// · a set (jacket + dress): 3 pictures – the whole set, only part A, only part B; the product wears A+B, each piece alone
// · jewelry: one sheet per jewel + close-ups of her face (face-8) with the necklace / with the earrings, turning like the ties    → IT.cus
// v252 (Sara 27/10 18:02): bags get a half-body close-up (8 angles, head to hips, half-8.jpg made here from the doll); and ONE zip for several products of
// the same category – she ticks them in a window, answers per product if needed, downloads one zip, uploads everything GPT returned in one go
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v250 '+w+': '+(e&&(e.code||e.message)||e));
const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=(m,u)=>(window.toast||(()=>{}))(m,u);
const R=()=>window.R360;
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
const nm=id=>{try{return R().nm?R().nm(id):((D[id]||{}).short||'')}catch(_){return (D[id]||{}).short||''}};
const FACE8='/_blob/f020f71d608d2da7304cdb0161c87206';
const TY=[['dress','שמלה'],['skirt','חצאית'],['pants','מכנסיים'],['top','חולצה'],['base','חולצת בסיס'],['sweater','סוודר'],['vest','אפודה'],['jacket',"ז'קט"],['coat','מעיל'],
 ['set','סט (כמה חלקים)'],['jw','תכשיטים'],['belt','חגורה'],['shoes','נעליים'],['bag','תיק']];
const TN=Object.fromEntries(TY);TN.necklace='שרשרת';TN.earrings='עגילים';TN.bracelet='צמיד';TN.ring='טבעת';TN.jwset='תכשיטים';TN.bag='תיק';
const CATOF={dress:'dresses',skirt:'skirts',pants:'skirts',top:'tops',base:'base',sweater:'sweaters',vest:'outer',jacket:'outer',coat:'outer',belt:'belts',shoes:'shoes',bag:'bags',
 necklace:'jewelry',earrings:'jewelry',bracelet:'jewelry',ring:'jewelry'};
const PLURAL={top:'חולצות',base:'חולצות בסיס',sweater:'סוודרים',skirt:'חצאיות',pants:'מכנסיים',belt:'חגורות',dress:'שמלות',bag:'תיקים'};
const BELTK=['dress','skirt','pants','set','coat','jacket','vest'];
const MULTI=['top','base','sweater','skirt','pants','belt','dress'];
const JW=[['necklace','שרשרת'],['earrings','עגילים'],['bracelet','צמיד'],['ring','טבעת']];
const SETA=[['jacket',"ז'קט"],['top','חולצה'],['vest','אפודה'],['sweater','סוודר'],['coat','מעיל']],SETB=[['dress','שמלה'],['skirt','חצאית'],['pants','מכנסיים']];
const LIGHT=/לבן|לבנה|שמנת|קרם|אופ.?וויט|שקוף|שקופה|white|ivory|cream|off.?white|clear|transparent/i;
const cat0=id=>{try{return curCat(id)}catch(_){return (D[id]||{}).cat}};
const OK_CATS=new Set(['dresses','skirts','tops','base','sweaters','outer','sets','jewelry','belts','shoes','bags']);
// ---------- what she answered (saved on the item) ----------
function kd(id){const k=it(id).kd;if(k)return ['jwset','necklace','earrings','bracelet','ring'].includes(k)?'jw':k;let r='';try{r=R().kind(id)}catch(_){}
 return ['necklace','earrings','bracelet','ring','jwset'].includes(r)?'jw':r||'top'}
const txt=id=>{const x=D[id]||{};return (x.short||'')+' '+(x.full||'')+' '+(x.color||'')};
function jwOf(id){const s=it(id).jw;if(Array.isArray(s)&&s.length)return s;const t=txt(id),L=[];
 if(/שרשר|תליון|necklace|pendant/i.test(t))L.push('necklace');if(/עגיל|earring/i.test(t))L.push('earrings');if(/צמיד|שעון|bracelet/i.test(t))L.push('bracelet');if(/טבעת|\bring\b/i.test(t))L.push('ring');
 if(/(^|[\s,.\-–(])סט($|[\s,.\-–)])/.test(t)&&!L.length)L.push('necklace','earrings');return L.length?L:['necklace']}
function setOf(id){const s=it(id).sp;if(Array.isArray(s)&&s.length==2)return s;const t=txt(id);
 const a=/מעיל/.test(t)?'coat':/וסט|אפוד/.test(t)?'vest':/סוודר|סריג|קרדיגן/.test(t)?'sweater':/ז['׳]?קט|ג['׳]קט|בלייזר/.test(t)?'jacket':'top';
 const b=/שמל/.test(t)?'dress':/מכנס/.test(t)?'pants':'skirt';return [a,b]}
// v256 (Sara 27/10 19:05 "בתמונה אחת יש לי שלוש חולצות … תשאל אותי מראש כמה חולצות יש … שלוש תיקיות על המסך"): a pack is read from its name
// ("3 חולצות בסיס גולף: לבן, חום, שחור") until she answers – how many, and each one's colour; the pieces (folders) are made as soon as she answers
const PACKW=/(^|\s)([2-6])\s*(?:יח\S*\s*)?(חולצות|גופיות|טי.?שירטים|סוודרים|חצאיות|חגורות|שמלות|מכנסיים|טייצים)/;
function guess(id){const x=D[id]||{},m=((x.short||'')+' '+(x.full||'')).match(PACKW);if(!m)return null;const n=+m[2];
 let cs=[];const a=(x.short||'').match(/[:(]\s*([^:()]*?)\s*\)?\s*$/);if(a)cs=a[1].split(/\s*[,،\/+]\s*/).map(v=>v.trim()).filter(Boolean);if(cs.length!=n)cs=[];
 const w=/גופי/.test(m[3])?'גופייה':/סוודר/.test(m[3])?'סוודר':/חצאי/.test(m[3])?'חצאית':/חגור/.test(m[3])?'חגורה':/שמל/.test(m[3])?'שמלה':/מכנס|טייצ/.test(m[3])?'מכנסיים':'חולצה';
 return {n,cols:cs,names:Array.from({length:n},(_,i)=>cs[i]?`${w} בצבע ${cs[i]}`:`${w} ${i+1}`)}}
const oneDone=id=>{try{return !(it(id).parts||[]).length&&!!R().isReady(id)}catch(_){return false}};   // already on the avatar as one item: the name does not split it
const gOf=id=>{const k=kd(id);if(!MULTI.includes(k)||it(id).np!=null||oneDone(id))return null;return guess(id)};
const asked=id=>it(id).np!=null;
const npOf=id=>{if(it(id).np!=null)return Math.max(1,Math.min(6,+it(id).np||1));const g=gOf(id);return g?g.n:1};
const colsOf=id=>{const c=it(id).pc;if(Array.isArray(c))return c;const g=guess(id);return g&&g.n==npOf(id)?g.cols:[]};
// v258 (Sara 19:34 "רקע שחור אך ורק אם יש לבן ושקוף על הבגד … אם יש חום, שחור או כל צבע אחר – פחות כדאי"): black only for white / cream / see-through;
// a garment whose own colour is dark or coloured keeps doll-8's light backdrop, even when "לבן" appears somewhere in the name
const wbgOf=id=>{if(it(id).wbg!=null)return !!it(id).wbg;const c=(D[id]||{}).color||'';if(c&&!LIGHT.test(c)&&!/פולי|multi/i.test(c))return false;return LIGHT.test(txt(id))};
// v257 (Sara 27/10 19:28 "הוא עשה רקע שחור לכל החולצות, גם לחולצות השחורות"): in a pack every sheet gets its OWN backdrop – a light piece black,
// a dark piece keeps doll-8's own light backdrop (black on black can't be cut). IT.pb[i] = her choice per piece, else by the piece's colour
const DARK=/שחור|שחורה|כהה|נייבי|כחול כהה|חום|שוקו|קפה|בורדו|זית|אפור כהה|פחם|black|navy|brown|charcoal/i;
const pbOf=(id,i)=>{const b=it(id).pb;if(Array.isArray(b)&&b[i]!=null)return !!b[i];const c=(colsOf(id)[i]||namesOf(id)[i]||'');if(DARK.test(c))return false;return LIGHT.test(c)};
// holes in the fabric (lace, eyelet, mesh): 'open' = through the holes you see what she wears under it (the cut leaves them see-through, a base shirt shows),
// 'lined' = a lining is sewn under the holes and is part of the garment                                                        → IT.hol
const HOLE=/תחרה|תחרת|רשת|חורים|אג'ור|אז'ור|קרושה|סרוג ביד|lace|mesh|eyelet|crochet|openwork/i;
const holOf=id=>it(id).hol!=null?it(id).hol:(HOLE.test(txt(id))?'open':'');
const bltOf=id=>it(id).blt||'';
const namesOf=id=>{const n=npOf(id),k=kd(id),s=it(id).pn||[],g=guess(id),G=g&&g.n==n?g.names:[];return Array.from({length:n},(_,i)=>s[i]||G[i]||`${TN[k]||'פריט'} ${i+1}`)};
// ---------- the pictures GPT returns, in order ----------
// {role:'sheet'|'whole'|'cu', kind, n (name), pk (piece key or '' = the product itself), cuOf (jewel kind for a close-up)}
function outs(id){const k=kd(id),O=[];
 if(k=='set'){const [a,b]=setOf(id);O.push({role:'whole',n:`כל הסט (${TN[a]} + ${TN[b]})`});
  O.push({role:'sheet',kind:a,n:`רק ה${TN[a]}`,pk:'g1',pn:TN[a]});O.push({role:'sheet',kind:b,n:`רק ה${TN[b]}`,pk:'g2',pn:TN[b]});return O}
 if(k=='jw'){const J=jwOf(id),many=J.length>1;J.forEach((j,i)=>O.push({role:'sheet',kind:j,n:TN[j],pk:many?'g'+(i+1):'',pn:TN[j]}));
  if(J.includes('necklace'))O.push({role:'cu',n:'תקריב פנים עם השרשרת',cuOf:'necklace'});
  if(J.includes('earrings'))O.push({role:'cu',n:'תקריב פנים עם העגילים',cuOf:'earrings'});return O}
 if(k=='bag'){O.push({role:'sheet',kind:'bag',n:'התיק',pk:''});O.push({role:'cu',n:'תקריב חצי גוף עם התיק',cuOf:'bag',half:1});return O}
 const n=MULTI.includes(k)?npOf(id):1;if(n>1){const C=colsOf(id);namesOf(id).forEach((x,i)=>O.push({role:'sheet',kind:k,n:x,pk:'g'+(i+1),pn:x,col:C[i]||'',bk:pbOf(id,i)}));return O}
 O.push({role:'sheet',kind:k,n:TN[k]||'הפריט',pk:''});return O}
// which sheets get a black backdrop (jewelry / shoes / bags never)
function blk(id,k){if(['jw','shoes','bag'].includes(k))return {all:false,any:false,L:[]};const S=outs(id).filter(o=>o.role!='cu');
 const L=S.map(o=>o.bk!=null?o.bk:(o.role=='whole'||o.role=='sheet')&&wbgOf(id));return {all:L.length&&L.every(Boolean),any:L.some(Boolean),L,S}}
const bgNote=(id,k,o)=>{const b=blk(id,k);if(!b.any||b.all||o.role=='cu')return '';const i=b.S.findIndex(x=>x.n==o.n&&x.pk==o.pk&&x.role==o.role);if(i<0)return '';return b.L[i]?' ⬛ רקע שחור בגיליון הזה.':' ⬜ בגיליון הזה הרקע נשאר בדיוק כמו ב-doll-8 (בהיר) – לא שחור.'};
// ---------- the prompt ----------
function howOf(k){try{const K=R().KIND[k];if(K)return K[1]}catch(_){}
 if(k=='ring')return 'רק הטבעת, על האצבע של יד ימין (היד על המותן), באותו גודל כמו בתמונה. בזוויות שהיד מוסתרת לא רואים אותה.';return ''}
function photos(id){let A=[];try{A=(window.all102?all102(id):[])}catch(_){}
 A=A.filter(g=>g&&g.u&&!/^(עליי|מקרוב|כל הסט)/.test(g.n||'')&&!/^על האווטאר/.test(g.n||''));let L=A.filter(g=>!/^data:/.test(g.u));
 // v268: when the shop photo exists only inside the page (data:) it is still sent – it used to be dropped, and the ZIP went without the product
 if(!L.length)L=A.slice(0,1);
 if(!L.length){try{const u=R().ph(id)||(typeof TH!='undefined'&&TH[id])||'';if(u&&(typeof TPH=='undefined'||u!=TPH))L=[{u,n:'מהחנות'}]}catch(_){}}return L.slice(0,6)}
function prompt(id,np){const k=kd(id),x=D[id]||{},O=outs(id),ME=(R()&&R().ME)||'',np_=np||photos(id).length||1;
 const sheets=O.filter(o=>o.role!='cu'),cus=O.filter(o=>o.role=='cu'),item=`${TN[k]||'פריט'} – ${nm(id)}${x.color?', צבע: '+x.color:''}`;
 const P=[];
 P.push(`מצורף קובץ ZIP. בתוכו:
• ${np_>1?`item-1.jpg עד item-${np_}.jpg`:'item-1.jpg'} – מה שקניתי: ${item}.${np_>1?' כל התמונות הן אותו מוצר.':''}
• doll-8.jpg – גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.${extraFiles(cus)}`);
 // what she bought
 if(k=='set'){const [a,b]=setOf(id);P.push(`זה סט של שני חלקים: ${TN[a]} ו${TN[b]}. אני רוצה לראות את הסט ביחד, וגם כל חלק לבד.`)}
 else if(k=='jw'){const J=jwOf(id);P.push(J.length>1?`בתמונות יש כמה תכשיטים: ${J.map(j=>TN[j]).join(', ')}. כל תכשיט הוא פריט נפרד.`:`מה שקניתי: רק ה${TN[J[0]]}, גם אם בתמונה יש עוד תכשיטים.`)}
 else if(sheets.length>1)P.push(`בתמונות יש ${sheets.length} ${PLURAL[k]||'פריטים'}. כל פריט נפרד, ואני צריכה כל פריט לבד: ${sheets.map((o,i)=>`${i+1}) ${o.n}`).join(', ')}. הסדר: מימין לשמאל כמו בתמונה הראשית.`);
 // the pictures to return
 P.push(`החזירי ${O.length} תמונות נפרדות, בדיוק בסדר הזה:\n`+O.map((o,i)=>`${i+1}. `+retText(o,sheets,k)+bgNote(id,k,o)).join('\n'));
 P.push(...rulesOf(id,k,sheets));
 P.push(`כל תמונה היא גיליון אחד של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב כמו הקובץ שערכת, בלי טקסט ובלי מספרים. סך הכול ${O.length} תמונות. אם אי אפשר את כולן בתשובה אחת, עשי כמה שאפשר, ואני אכתוב "המשך".`);
 return (window.zipAsk||String)(P.join('\n\n'))}
const extraFiles=cus=>(cus.some(o=>!o.half)?'\n• face-8.jpg – תקריב של הפנים שלי ב-8 זוויות מסביב (ראש וכתפיים), באותו סדר.':'')+(cus.some(o=>o.half)?'\n• half-8.jpg – תקריב של חצי הגוף העליון שלי ב-8 זוויות מסביב (מהראש עד הירכיים), באותו סדר.':'');
function retText(o,sheets,k){return (o.role=='whole'?'ערכי את doll-8.jpg: הדמות לובשת את כל הסט ביחד.':o.role=='cu'&&o.half?'ערכי את half-8.jpg (חצי הגוף העליון שלי, מהראש עד הירכיים): התיק עליי, בדיוק כמו בגיליון של הגוף המלא – אותו תיק, אותו גודל ביחס לגוף, אותה רצועה באותו אורך, באותו מקום. רואים בבירור את התיק, הרצועה, הסגירה והפרטים. אותן 8 משבצות באותו סדר ובאותן זוויות, אותם פנים בדיוק, אותו כיסוי ראש, אותה שמלה, אותו רקע.':o.role=='cu'?`ערכי את face-8.jpg: ${o.cuOf=='earrings'?'העגילים על שתי האוזניים. השיער מאחורי האוזן כך שהעגיל נראה היטב.':'השרשרת על הצוואר, כמו במציאות, רואים את כל השרשרת והתליון.'} רק ה${TN[o.cuOf]}, בלי תכשיטים אחרים. אותן 8 משבצות באותו סדר ובאותן זוויות, אותם פנים בדיוק, אותו שיער${o.cuOf=='earrings'?' (רק מסודר מאחורי האוזן)':''}, אותה חולצה, אותו רקע.`:`ערכי את doll-8.jpg: הדמות לובשת רק את ${o.role=='sheet'&&sheets.length>1?o.n:'ה'+(TN[o.kind]||'פריט')}${sheets.length>1?', בלי ה'+(k=='jw'?'תכשיטים':'פריטים')+' האחרים':''}.`)}
function rulesOf(id,k,sheets){const P=[],ME=(R()&&R().ME)||'';
 // how each sheet is made
 const kinds=[...new Set(sheets.filter(o=>o.kind).map(o=>o.kind))];
 P.push(`איך עושים כל גיליון: ערכי את doll-8.jpg, אל תציירי אותו מחדש. אותו פריט בדיוק בכל 8 הזוויות: ${k=='jw'?'אותו צבע, אותו חומר, אותה צורה, אותו גודל':'אותו צבע, אותו בד, אותה גזרה, אותו גודל'}.\n`+kinds.map(q=>`${kinds.length>1?TN[q]+': ':''}${howOf(q)}`).join('\n'));
 const cloth=k!='jw'&&k!='shoes'&&k!='bag';
 if(BELTK.includes(k)){const b=bltOf(id);P.push(b=='on'?'לבגד יש חגורה תפורה מאותו בד: היא חלק מהבגד ונשארת בדיוק כמו בתמונה.':b=='off'?'לבגד הגיעה חגורה נפרדת: הורידי אותה. בגיליון בלי שום חגורה, ורואים את הבגד במקום שהחגורה הייתה.':'בלי חגורה, גם אם בתמונה יש חגורה.')}
 if(cloth)P.push('אם בתמונת המוצר יש עוד בגדים או אביזרים שלא כתבתי, הם לא שלי: אל תוסיפי אותם.');
 if(cloth)P.push(`המידות שלי: ${ME}. הדמות כבר בנויה לפי המידות האלה, אל תשני את הגוף. שמרי על אותו אורך ביחס לגוף כמו בתמונת המוצר, ואותו אורך בכל 8 הזוויות.\nהבגד צריך להיראות אמיתי על הגוף: קפלים, צללים, הבד נופל לפי התנוחה.`);
 const B=blk(id,k);
 if(B.all)P.push('חשוב מאוד: הבגד לבן, שמנת או שקוף. כדי שאפשר יהיה לגזור אותו בדיוק, בכל הגיליונות של הדמות צבעי את הרקע מסביב לדמות בשחור אחיד, מכל הצדדים ועד הרצפה. הדמות, הבגד והקווים הלבנים בין המשבצות נשארים. הלבן בבגד נשאר לבן, ובד שקוף נשאר שקוף ורואים דרכו את הגוף (השמלה בצבע עור), לא את השחור.');
 else if(B.any)P.push(`חשוב מאוד – הרקע שונה בכל גיליון: רקע שחור אך ורק בגיליון של בגד לבן, שמנת או שקוף – כאן: ${B.S.filter((o,i)=>B.L[i]).map(o=>o.n).join(', ')}. שם צבעי את הרקע מסביב לדמות בשחור אחיד, מכל הצדדים ועד הרצפה; הלבן בבגד נשאר לבן, ובד שקוף נשאר שקוף ורואים דרכו את הגוף (השמלה בצבע עור), לא את השחור. בכל שאר הגיליונות – ${B.S.filter((o,i)=>!B.L[i]).map(o=>o.n).join(', ')} – הרקע נשאר בדיוק כמו ב-doll-8, בהיר. אף פעם לא רקע שחור מאחורי בגד שחור, חום, בז׳ או צבעוני – אי אפשר לגזור אותו.`);
 const h=holOf(id);if(cloth&&h=='open')P.push(`בבד יש חורים (תחרה, רשת או רקמה עם חורים). דרך החורים רואים בדיוק מה שהדמות לובשת מתחת – השמלה בצבע עור או העור – כמו בגוף אמיתי. אל תמלאי את החורים בשחור, בלבן, ברקע או בצבע הבגד${B.any?', גם בגיליון עם רקע שחור':''}. אל תוסיפי בטנה.`);
 else if(cloth&&h=='lined')P.push('לבגד יש בטנה תפורה מתחת לחורים או לתחרה, באותו צבע כמו בתמונת המוצר: היא חלק מהבגד ונשארת, ודרך החורים רואים את הבטנה ולא את הגוף.');
 P.push(`אל תשני שום דבר אחר: אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותם פנים בדיוק, אותה תנוחה${B.all?'':B.any?', אותו רקע (חוץ מהגיליונות שכתוב בהם רקע שחור)':', אותו רקע'}, אותם קווים לבנים בין המשבצות. כל מה שהדמות כבר לובשת בגיליון (כיסוי ראש בז׳, שמלה בצבע עור) נשאר בדיוק אותו דבר. השמלה בצבע עור נשארת בכל מקום שהפריט לא מכסה.`);
 return P}
window.prompt250=prompt;window.outs250=outs;
// ---------- the zip ----------
// half-8.jpg: the doll's upper half (head to hips) from each of the 8 squares, twice as big, same 2×4 order, white lines between – a bag's close-up is an EDIT of it
const OFF8=[[0,0],[361,0],[724,0],[1087,0],[0,544],[361,544],[724,544],[1087,543]];
let H8=null;
function half8(){if(H8)return H8;return H8=new Promise((res,rej)=>{const m=new Image();m.onload=()=>{try{const cw=280,ch=330,cx=175,k=2,G=6,W=4*cw*k+3*G,H=2*ch*k+G,c=document.createElement('canvas');c.width=W;c.height=H;
  const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,W,H);g.imageSmoothingQuality='high';const sx=m.naturalWidth/1448,sy=m.naturalHeight/1086;
  OFF8.forEach(([x,y],v)=>{const r=v>>2,q=v&3;g.drawImage(m,(x+cx-cw/2)*sx,(y+4)*sy,cw*sx,ch*sy,q*(cw*k+G),r*(ch*k+G),cw*k,ch*k)});
  c.toBlob(b=>b?res(b):rej(new Error('half8')),'image/jpeg',.9)}catch(e){H8=null;rej(e)}};m.onerror=()=>{H8=null;rej(new Error('half8 img'))};m.src='a8/sheet.jpg?v='+(window.VER||'')})}
window.half8=half8;
async function shared(O,files){files.push({name:'doll-8.jpg',blob:await (await fetch('a8/sheet.jpg?v='+(window.VER||''))).blob()});
 if(O.some(x=>x.role=='cu'&&!x.half))try{files.push({name:'face-8.jpg',blob:await (await fetch(FACE8)).blob()})}catch(e){ERR('zipface',e)}
 if(O.some(x=>x.role=='cu'&&x.half))try{files.push({name:'half-8.jpg',blob:await half8()})}catch(e){ERR('ziphalf',e)}}
async function dlZip(id,b){const o=b.textContent;b.disabled=true;b.textContent='מכינה את הקובץ…';
 try{const files=[];try{await thLoad(cat0(id))}catch(_){}
  const L=photos(id);let n=0;for(const g of L){try{files.push({name:`item-${n+1}.jpg`,blob:await jpeg246(g.u)});n++}catch(e){ERR('zipph',e)}}
  await shared(outs(id),files);
  files.push({name:'prompt.txt',blob:new Blob(['﻿'+prompt(id,n)],{type:'text/plain;charset=utf-8'})});
  await R().saveFile(`gpt-${String(id).replace(/[^A-Za-z0-9_]/g,'')}.zip`,await zip246(files));
  toast_(n?`✓ ירד ZIP: ${n} תמונות של המוצר, הבובה והפרומפט`:'ירד ZIP בלי תמונת המוצר – צרפי אותה לבד');try{await putItem(id,{g250:Date.now()})}catch(_){}}
 catch(e){ERR('zip',e);toast_('לא הצלחתי להכין את הקובץ. לנסות שוב')}finally{if(b.isConnected){b.disabled=false;b.textContent=o}}}
async function copyTxt(b,t){let ok=false;try{await navigator.clipboard.writeText(t);ok=true}catch(_){try{const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();ok=document.execCommand('copy');a.remove()}catch(_){}}
 const o=b.textContent;b.textContent=ok?'✓ הועתק – עכשיו ל-GPT':'לא הצלחתי להעתיק';setTimeout(()=>{if(b.isConnected)b.textContent=o},2600)}
// ---------- several products of one category in ONE zip (v252) ----------
// pN-item-M.jpg per product + the shared doll/face/half; GPT returns every product's pictures in order, product after product
let B=null;   // {cat, sel:[ids], step:'pick'|'list'}
const MAXB=8;
function bPrompt(ids,np){const all=ids.flatMap(id=>outs(id)),cus=all.filter(o=>o.role=='cu'),P=[];
 P.push(`מצורף קובץ ZIP עם ${ids.length} מוצרים שקניתי. כל מוצר לבד, אחד אחרי השני. בתוך ה-ZIP:\n`+ids.map((id,i)=>{const n=np&&np[i]!=null?np[i]:Math.min(4,photos(id).length);   // v268: the same count as the ZIP (at most 4), 0 = not in the ZIP
  if(!n)return `• מוצר ${i+1} – התמונה שלו לא בתוך ה-ZIP, אני מצרפת אותה בנפרד (צילום מסך)`;
  return `• ${n>1?`p${i+1}-item-1.jpg עד p${i+1}-item-${n}.jpg`:`p${i+1}-item-1.jpg`} – מוצר ${i+1}${n>1?' (כל התמונות הן אותו מוצר)':''}`}).join('\n')+`\n• doll-8.jpg – גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.${extraFiles(cus)}`);
 let g=0;
 ids.forEach((id,i)=>{const k=kd(id),x=D[id]||{},O=outs(id),sheets=O.filter(o=>o.role!='cu');const L=[];
  L.push(`━━ מוצר ${i+1}: ${TN[k]||'פריט'} – ${nm(id)}${x.color?', צבע: '+x.color:''} (התמונות p${i+1}-…)`);
  if(k=='set'){const [a,b]=setOf(id);L.push(`זה סט של שני חלקים: ${TN[a]} ו${TN[b]}. אני רוצה לראות את הסט ביחד, וגם כל חלק לבד.`)}
  else if(k=='jw'){const J=jwOf(id);L.push(J.length>1?`בתמונות יש כמה תכשיטים: ${J.map(j=>TN[j]).join(', ')}. כל תכשיט הוא פריט נפרד.`:`רק ה${TN[J[0]]}, גם אם בתמונה יש עוד תכשיטים.`)}
  else if(sheets.length>1)L.push(`בתמונות יש ${sheets.length} ${PLURAL[k]||'פריטים'}, ${['sweater','pants'].includes(k)?'כל אחד':'כל אחת'} לבד: ${sheets.map((o,j)=>`${j+1}) ${o.n}`).join(', ')}. הסדר: מימין לשמאל כמו בתמונה הראשית.`);
  L.push(`התמונות שמחזירים למוצר ${i+1}:\n`+O.map(o=>`${++g}. `+retText(o,sheets,k)+bgNote(id,k,o)).join('\n'));
  // only what is this product's own; the general rules (how to edit the sheet, her measurements, extra clothes, don't change anything else) are said once, below
  const ru=rulesOf(id,k,sheets).slice(0,-1);L.push(...ru[0].split('\n').slice(1).filter(Boolean),...ru.slice(1).filter(r=>!/^(אם בתמונת המוצר|המידות שלי)/.test(r)));
  P.push(L.join('\n'))});
 const ME=(R()&&R().ME)||'',cloth=ids.some(id=>!['jw','shoes','bag'].includes(kd(id)));
 P.push(`לכל המוצרים: כל תמונה היא עריכה של הקובץ שכתוב לידה (doll-8.jpg, ובתקריבים face-8.jpg או half-8.jpg), אל תציירי אותו מחדש. אותו פריט בדיוק בכל 8 הזוויות: אותו צבע, אותו בד או חומר, אותה גזרה, אותו גודל.`+(cloth?`\nהמידות שלי: ${ME}. הדמות כבר בנויה לפי המידות האלה, אל תשני את הגוף. שמרי על אותו אורך ביחס לגוף כמו בתמונת המוצר, ואותו אורך בכל 8 הזוויות. הבגד צריך להיראות אמיתי על הגוף: קפלים, צללים, הבד נופל לפי התנוחה.\nאם בתמונת המוצר יש עוד בגדים או אביזרים שלא כתבתי, הם לא שלי: אל תוסיפי אותם.`:''));
 P.push(`אל תשני שום דבר אחר – אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותם פנים בדיוק, אותה תנוחה, אותם קווים לבנים בין המשבצות. כל מה שהדמות כבר לובשת בגיליון (כיסוי ראש בז׳, שמלה בצבע עור) נשאר בדיוק אותו דבר בכל מקום שהפריט לא מכסה. בכל גיליון רק המוצר שלו, בלי המוצרים האחרים.`);
 P.push(`כל תמונה היא גיליון אחד של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב כמו הקובץ שערכת, בלי טקסט ובלי מספרים. סך הכול ${g} תמונות, בסדר של המספרים. אם אי אפשר את כולן בתשובה אחת, עשי כמה שאפשר, ואני אכתוב "המשך".`);
 return (window.zipAsk||String)(P.join('\n\n'))}
window.bprompt252=bPrompt;
async function bZip(b){const ids=B.sel.slice(),o=b.textContent;b.disabled=true;b.textContent='מכינה את הקובץ…';
 try{const files=[],np=[];try{await thLoad(B.cat)}catch(_){}
  try{await Promise.all([...new Set(ids.map(cat0))].map(c=>thLoad(c)))}catch(_){}
  const miss=[];for(let i=0;i<ids.length;i++){let n=0;for(const g of photos(ids[i]).slice(0,4)){try{files.push({name:`p${i+1}-item-${n+1}.jpg`,blob:await jpeg246(g.u)});n++}catch(e){ERR('bzipph',e)}}np.push(n);if(!n)miss.push(i+1)}   // v268: 0 = no picture went in (the prompt says so)
  await shared(ids.flatMap(id=>outs(id)),files);
  files.push({name:'prompt.txt',blob:new Blob(['\ufeff'+bPrompt(ids,np)],{type:'text/plain;charset=utf-8'})});
  await R().saveFile(`gpt-${ids.length}-products.zip`,await zip246(files));B.np=np;saveOrd(ids);
  toast_(miss.length?`⚠ ירד ZIP, אבל בלי תמונה של מוצר ${miss.join(', ')} – צרפי ל-GPT צילום מסך שלו`:`✓ ירד ZIP אחד: ${ids.length} מוצרים, הבובה והפרומפט`);for(const id of ids)try{await putItem(id,{g250:Date.now()})}catch(_){}}
 catch(e){ERR('bzip',e);toast_('לא הצלחתי להכין את הקובץ. לנסות שוב')}finally{if(b.isConnected){b.disabled=false;b.textContent=o}}}
function catItems(c){return Object.keys(D).filter(k=>!k.includes('~')&&cat0(k)==c&&!it(k).gen&&!it(k).oos&&it(k).s!='ret'&&it(k).s!='give')}
function bOpen(id){const c=cat0(id),ok=hasPh(id);if(!ok)toast_('לזה עוד אין תמונה – אפשר לבחור רק מוצרים עם תמונה');if(!B||B.cat!=c)B={cat:c,sel:ok?[id]:[],step:'pick'};else{if(ok&&!B.sel.includes(id)&&B.sel.length<MAXB)B.sel.unshift(id);B.step='pick'}paintB()}
// v270 (Sara 27/10 22:47 "מה שאין תמונות, תכבה ... שאני לא יכולה לבחור אותה ... מחזיר לי קבצים לא טובים"): a product with no photo of hers can't be picked at all
const hasPh=k=>{const t=it(k),h=v=>Array.isArray(v)?v.length>0:!!v;let s='';try{s=window.avStat?avStat(k):''}catch(_){}return s=='fix'||['img','imgs','pics','p5g','p5gv','p5g118','a8up'].some(q=>h(t[q]))};
function paintB(){const d=dlg();ID='';B.sel=B.sel.filter(hasPh);const c=B.cat,title=(()=>{try{return document.querySelector(`[data-sec="${c}"] h2,#${c} h2`).textContent.replace(/[\d\s]+$/,'').trim()}catch(_){return ''}})();
 if(B.step=='pick'){
  // v254 (Sara 18:32 "שלא אבחר משהו שכבר עשיתי לו, או משהו שאין לו בכלל תמונה"): every item shows the same 📷 / 360 lights as the closet cards,
  // in three groups – ready to send (has her photo, no 360 yet), no photo yet, already 360 (dimmed). She can still pick any of them
  const ready=k=>{try{const s=window.avStat?avStat(k):'';return s?s=='ok':R().isReady(k)}catch(_){return false}};
  const all=catItems(c),G=[['todo','מוכנים לעבודה – יש תמונה, עוד אין 360',all.filter(k=>hasPh(k)&&!ready(k))],['noph','אין להם תמונה – אי אפשר לבחור. קודם מעלים תמונה בחלון של הפריט',all.filter(k=>!hasPh(k)&&!ready(k))],['done','כבר יש להם 360 – לא צריך שוב',all.filter(ready)]];
  const tile=k=>{const on=B.sel.includes(k),r=ready(k),ph=hasPh(k);let p='';try{p=R().ph(k)}catch(_){}
   return `<button type="button" class="g252i${on?' on':''}${r?' done':!ph?' noph':''}" data-g252t="${es(k)}" aria-pressed="${on}"${ph?'':' disabled aria-disabled="true"'} aria-label="${es(nm(k))} – ${ph?'יש תמונה':'אין תמונה'}, ${r?'יש 360':'אין 360'}"><img alt="" loading="lazy" src="${es(p)}"><span>${es(nm(k))}</span><span class="g254l" aria-hidden="true"><i class="${ph?'on':''}">📷</i><i class="${r?'on':''}">360</i></span>${on?'<b aria-hidden="true">✓</b>':''}${ph?'':'<em class="g270x">🚫 אין תמונה</em>'}</button>`};
  d.innerHTML=`<div class="mk"><div class="mkh"><h3 id="g250t">📦 כמה מוצרים יחד${title?' – '+es(title):''}</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
   <p class="g250p">בוחרים עד ${MAXB} מוצרים (נבחרו ${B.sel.length}). 📷 דלוק = יש תמונה שלך · 360 דלוק = כבר על האווטאר.</p>
   <div class="g252g">${G.filter(g=>g[2].length).map(([k,t,L])=>`<h4 class="g254h ${k}">${t} · ${L.length}</h4>${L.map(tile).join('')}`).join('')}</div>
   <div class="mkb g250bar"><button type="button" class="mkp" data-g252next${B.sel.length?'':' disabled'}>המשך עם ${B.sel.length} ←</button><button type="button" data-g252x>ביטול</button></div></div>`}
 else{const all=B.sel.flatMap(k=>outs(k));
  d.innerHTML=`<div class="mk"><div class="mkh"><h3 id="g250t">📦 ${B.sel.length} מוצרים – הכול ל-GPT</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
   <p class="g250p">לכל מוצר בדקי שהסוג נכון. "⚙ שאלות" פותח את השאלות שלו (חגורה, כמה פריטים, לבן), ו"↩ לרשימה" מחזיר לכאן.</p>
   <div class="g252l">${B.sel.map((k,i)=>{let p='';try{p=R().ph(k)}catch(_){}const O=outs(k);return `<div class="g252r"><img alt="" src="${es(p)}"><div><b>${i+1}. ${es(nm(k))}</b><small>${es(TN[kd(k)]||'')} · ${O.length} ${O.length>1?'תמונות':'תמונה'}: ${O.map(o=>es(o.n)).join(', ')}</small>${MULTI.includes(kd(k))?`<span class="g256bn${asked(k)?'':' ask'}">${asked(k)?'כמה בחבילה:':'❓ כמה בחבילה?'} ${[1,2,3,4,5,6].map(v=>`<button type="button" class="g250c${npOf(k)==v?' on':''}" data-g256n="${es(k)}" data-v="${v}" aria-pressed="${npOf(k)==v}">${v}</button>`).join('')}</span>`:''}</div><button type="button" data-g252q="${es(k)}">⚙ שאלות</button><button type="button" data-g252rm="${es(k)}" aria-label="להוריד מהרשימה: ${es(nm(k))}">✕</button></div>`}).join('')}</div>
   <div class="g250o"><b>GPT יחזיר ${all.length} תמונות</b>, מוצר אחרי מוצר.</div>
   <ol class="g250s"><li><b>⬇ להוריד</b> – ZIP אחד עם כל המוצרים, הבובה והפרומפט.</li><li>ב-GPT בשיחה חדשה: מצרפים את ה-ZIP ומדביקים את הפרומפט (📋).</li><li><b>📤 להעלות</b> – בוחרים את כל התמונות שחזרו בבת אחת. אני מסדרת מה שייך לאיזה מוצר.</li></ol>
   <div class="mkb g250bar"><button type="button" class="mkp" data-g252zip>⬇ להוריד הכול (ZIP)</button><button type="button" data-g252cp>📋 הפרומפט</button><button type="button" class="mkp" data-g252up>📤 להעלות מה שחזר</button><button type="button" data-g252back>↩ לבחור מוצרים</button></div>
   <details class="g250pr"><summary>לקרוא את הפרומפט</summary><textarea readonly rows="12">${es(bPrompt(B.sel))}</textarea></details></div>`}
 if(!d.open)d.showModal()}
window.g252open=bOpen;
window.g250assign=(ids,fs)=>assign(ids,fs);
window.g256={npOf,namesOf,colsOf,asked,kd,ensurePieces,MULTI,TN};
// ---------- pieces (fix85 parts) ----------
const subId=(id,k)=>id+'~'+k;
// v256: also when she answers how many (not only at upload), and fewer pieces when she lowers the number – each piece's own avatar stays saved under its id
async function ensurePieces(id){const O=outs(id).filter(o=>o.pk),old=Array.isArray(it(id).parts)?it(id).parts:[];if(!O.length&&!old.some(p=>/^g\d+$/.test(p.k)))return;
 const keep=old.filter(p=>!/^g\d+$/.test(p.k)),mine=O.map(o=>{const p={k:o.pk,n:(o.pn||o.n).slice(0,40),cat:MULTI.includes(kd(id))&&o.kind==kd(id)?cat0(id):(CATOF[o.kind]||cat0(id))};if(o.col)p.color=o.col;return p});
 const nu=[...keep,...mine];if(JSON.stringify(nu)!=JSON.stringify(old))await putItem(id,{parts:nu.length?nu:null});try{window.syncParts85&&syncParts85()}catch(_){}}
// ---------- upload: she picks every picture GPT returned; the site shows which is which (by order), she can change it, then ✓ ----------
let UP=null;
function pick(ids){ids=[].concat(ids);const f=document.createElement('input');f.type='file';f.accept='image/*,.zip,application/zip,application/x-zip-compressed';f.multiple=true;f.hidden=true;document.body.appendChild(f);
 f.addEventListener('change',()=>{const fs=[...f.files];f.remove();if(fs.length)assign(ids,fs)});f.click()}
function cuKind(f){return new Promise(res=>{const u=URL.createObjectURL(f),m=new Image();m.onload=()=>{try{const W=m.naturalWidth,H=m.naturalHeight,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(m,0,0);
  // a close-up: the bottom of every square is her top (beige) right to the edge; on a body sheet it is floor and two feet
  let cov=0,tot=0;for(let r=0;r<2;r++)for(let q=0;q<4;q++){const px=Math.round(q*W/4),pw=Math.round(W/4),py=Math.round(r*H/2),ph=Math.round(H/2),bg=g.getImageData(px+Math.round(pw*.06),py+Math.round(ph*.03),3,3).data,
   d=g.getImageData(px+Math.round(pw*.05),py+Math.round(ph*.88),Math.round(pw*.9),Math.max(1,Math.round(ph*.06))).data;for(let k=0;k<d.length;k+=16){tot++;if(Math.abs(d[k]-bg[0])+Math.abs(d[k+1]-bg[1])+Math.abs(d[k+2]-bg[2])>70)cov++}}
  res(tot>0?cov/tot:0)}catch(_){res(0)}URL.revokeObjectURL(u)};m.onerror=()=>{URL.revokeObjectURL(u);res(0)};m.src=u})}
const targets=ids=>ids.flatMap((id,p)=>outs(id).map(o=>({id,o,p})));
const COLS=[[/שחור|black/i,[28,28,30]],[/לבן|white/i,[236,236,234]],[/שמנת|קרם|אופ.?וויט|ivory|cream/i,[238,228,206]],[/קאמל|camel/i,[180,135,90]],[/בז|beige|nude|ניוד/i,[205,180,150]],
 [/חאקי|khaki/i,[150,140,95]],[/זית|olive/i,[110,108,45]],[/קפה|שוקו|חום|brown|coffee/i,[92,58,40]],[/ירוק|green/i,[25,85,60]],[/נייבי|navy/i,[30,36,70]],[/תכלת/i,[150,190,228]],[/כחול|blue/i,[45,75,150]],
 [/בורדו|יין|burgundy/i,[100,25,38]],[/אדום|red/i,[185,35,45]],[/ורוד|pink/i,[228,160,180]],[/סגול|purple/i,[100,60,130]],[/חרדל|mustard/i,[200,150,40]],[/צהוב|yellow/i,[230,205,70]],[/כתום|orange/i,[230,120,45]],[/אפור|grey|gray/i,[128,128,130]]];
const colRGB=t=>{t=String(t||'');for(const [r,c] of COLS)if(r.test(t))return c;return null};
const cdist=(a,b)=>Math.sqrt(2*(a[0]-b[0])**2+4*(a[1]-b[1])**2+3*(a[2]-b[2])**2);
// the garment's colour: the median of the middle of the body in the front view (top-left square), chest to waist
function garmentRGB(f){return new Promise(res=>{const u=URL.createObjectURL(f),m=new Image();m.onload=()=>{try{const W=m.naturalWidth/4,H=m.naturalHeight/2,c=document.createElement('canvas');c.width=40;c.height=40;const g=c.getContext('2d',{willReadFrequently:true});
  g.drawImage(m,W*.42,H*.27,W*.16,H*.14,0,0,40,40);const d=g.getImageData(0,0,40,40).data,R=[],G=[],B=[];for(let k=0;k<d.length;k+=4){R.push(d[k]);G.push(d[k+1]);B.push(d[k+2])}const md=a=>a.sort((x,y)=>x-y)[a.length>>1];res([md(R),md(G),md(B)])}catch(_){res(null)}URL.revokeObjectURL(u)};m.onerror=()=>{URL.revokeObjectURL(u);res(null)};m.src=u})}
// v276 (Sara 23:29–23:39: belts, skirts and sweaters each went to the item before it): GPT names its pictures by the product's number in the prompt
// (skirt-01, 04_woven…). The list she uploads to can be in another order than the list the ZIP was made from (opened from another item,
// picked again after a refresh), so the ZIP's order is kept and used again, and the files go by the number in their names
const ORDK='g250ord';
function saveOrd(ids){try{localStorage.setItem(ORDK,JSON.stringify({ids:ids.slice(),t:Date.now()}))}catch(_){}}
function ordFor(sel){try{const o=JSON.parse(localStorage.getItem(ORDK)||'null');if(o&&Array.isArray(o.ids)&&o.ids.length==sel.length&&o.ids.every(x=>sel.includes(x))&&Date.now()-o.t<14*864e5)return o.ids.slice()}catch(_){}return sel.slice()}
const numOf=f=>{const m=String(f&&f.name||'').match(/(\d+)/);return m?+m[1]:NaN};
async function assign(ids,fs){const byN=fs.length>1&&fs.every(f=>!isNaN(numOf(f)))&&new Set(fs.map(numOf)).size==fs.length;
 fs=fs.slice().sort((a,b)=>byN?numOf(a)-numOf(b):(a.lastModified-b.lastModified)||String(a.name).localeCompare(String(b.name),undefined,{numeric:true}));
 const T=targets(ids),sc=await Promise.all(fs.map(cuKind));
 // close-ups go to the close-up outputs, sheets to the sheet outputs, each in order. The close-ups = the pictures that cover the bottom of their squares most
 // (a face close-up ~1, a half body ~.5, a whole body sheet ~.1 – floor and two feet)
 const si=T.map((t,i)=>t.o.role!='cu'?i:-1).filter(i=>i>=0),ci=T.map((t,i)=>t.o.role=='cu'?i:-1).filter(i=>i>=0);
 const isCu=new Array(fs.length).fill(false);fs.map((f,j)=>j).filter(j=>sc[j]>.3).sort((a,b)=>sc[b]-sc[a]).slice(0,ci.length).forEach(j=>isCu[j]=true);let a=0,c=0;
 const map=fs.map((f,j)=>isCu[j]&&c<ci.length?ci[c++]:a<si.length?si[a++]:-1);
 // v259 (Sara 27/10 20:10 "התבלבלת בצבעים, קאמל שמת שחור"): GPT doesn't keep the order of the pictures. When every sheet has a colour (packs: "חולצה בצבע קאמל"),
 // each picture goes to the sheet whose colour is nearest to the garment in it (its middle, front view); equal colours keep GPT's order
 try{const sh=fs.map((f,j)=>map[j]>=0&&T[map[j]].o.role=='sheet'?j:-1).filter(j=>j>=0),tg=sh.map(j=>map[j]),cols=tg.map(i=>colRGB(T[i].o.col||T[i].o.n));
  if(sh.length>1&&cols.every(Boolean)){const fc=await Promise.all(sh.map(j=>garmentRGB(fs[j])));if(fc.every(Boolean)){
   const C=[];sh.forEach((j,x)=>tg.forEach((i,y)=>C.push([cdist(fc[x],cols[y])+6*Math.abs(x-y),x,y])));C.sort((p,q)=>p[0]-q[0]);
   const ux=new Set(),uy=new Set();for(const [,x,y] of C){if(ux.has(x)||uy.has(y))continue;ux.add(x);uy.add(y);map[sh[x]]=tg[y]}}}}catch(e){ERR('bycol',e)}
 UP={ids,T,fs,map,urls:fs.map(f=>URL.createObjectURL(f)),flag:{},chk:'run'};paintUp();check(UP)}
// v276 (Sara 23:32 "אתה חייב תמיד כאשר אני מעלה קובץ לאמת מול הקובץ שהכל מתאים"): Claude looks at every picture GPT returned next to the photos of the
// products and says which product each one is, and whether the colour and the details are the same. A picture that is not the product, or not
// in its colour, is set to "לא להשתמש" with the reason in red – she can still choose it herself
const TOp=(p,ms,v)=>Promise.race([p,new Promise(r=>setTimeout(()=>r(v),ms))]);
const ldImg=u=>new Promise(r=>{const m=new Image();m.crossOrigin='anonymous';m.onload=()=>r(m);m.onerror=()=>r(null);m.src=u});
function grid(cells,cw,ch,lab){const n=cells.length,cols=Math.min(4,n),rows=Math.ceil(n/cols),c=document.createElement('canvas');c.width=cols*cw;c.height=rows*(ch+28);
 const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);
 cells.forEach((m,i)=>{const x=(i%cols)*cw,y=Math.floor(i/cols)*(ch+28);if(m){const k=Math.min(cw/m.w,ch/m.h),w=m.w*k,h=m.h*k;g.drawImage(m.im,m.sx||0,m.sy||0,m.sw||m.w,m.sh||m.h,x+(cw-w)/2,y+28,w,h)}
  g.fillStyle='#c0262d';g.font='bold 24px sans-serif';g.fillText(lab(i),x+6,y+23)});
 return new Promise(r=>c.toBlob(r,'image/jpeg',.85))}
const sheetCell=async u=>{const m=await ldImg(u);if(!m)return null;const W=m.naturalWidth,H=m.naturalHeight;return {im:m,sx:0,sy:0,sw:W/4,sh:H/2,w:W/4,h:H/2}};
const photoCell=async u=>{const m=u&&await ldImg(u);return m?{im:m,w:m.naturalWidth,h:m.naturalHeight}:null};
async function check(U){const say=t=>{if(UP!==U)return;U.chk=t;const e=dlg().querySelector('.g250ck');if(e)e.textContent=t};
 try{const si=U.T.map((t,i)=>t.o.role!='cu'?i:-1).filter(i=>i>=0),sj=U.fs.map((f,j)=>j).filter(j=>!(U.map[j]>=0&&U.T[U.map[j]].o.role=='cu'));
  if(!si.length||!sj.length){say('');return}
  let S=null;try{S=await TOp(claude.use('sample'),12000,null)}catch(_){}const lim=S?await TOp(S.limits().catch(()=>null),8000,null):null;
  if(!S||!lim||!lim.images||lim.images.maxCount<2){say('לא הצלחתי לבדוק כאן את ההתאמה – כדאי להסתכל על כל תמונה מול המוצר');return}
  say('✨ בודקת שכל תמונה מתאימה למוצר שלה…');
  const ph=await Promise.all(si.map(i=>{let u='';try{u=(photos(U.T[i].id)[0]||{}).u||R().ph(U.T[i].id)}catch(_){}return photoCell(u)}));
  const sh=await Promise.all(sj.map(j=>sheetCell(U.urls[j])));
  const L=[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].concat([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(c=>c+c));   // v278: more than 26 pictures (AA, BB…)
  const A=await grid(ph,260,300,i=>String(i+1)),B_=await grid(sh,200,300,i=>L[i]);
  const list=si.map((i,k)=>`${k+1}. ${U.T[i].o.n}${U.T[i].o.col?' – colour: '+U.T[i].o.col:''} (product: ${nm(U.T[i].id)}${(D[U.T[i].id]||{}).color?', shop colour: '+D[U.T[i].id].color:''})`).join('\n');
  const prompt=`You check try-on pictures for a clothing app. Image 1 = the shop photos of the products, numbered in red:\n${list}\n`+
   `Some products are packs or sets: then the name says which piece or colour is wanted. Image 2 = pictures made by an image AI, lettered in red (A, B…): each shows a woman wearing ONE item (front view).\n`+
   `For every letter say which product number the woman is wearing. Compare the kind of item, the colour, the pattern and the details (buckle, lace, collar, sleeves). colour_ok=false when the colour or pattern is clearly different from that product (e.g. grey in the photo, black on her). same=false when it is not any of the products. problem = a short note in Hebrew for the owner, empty when all is fine.\n`+
   `Answer JSON only: {"sheets":[{"s":"A","p":1,"same":true,"colour_ok":true,"problem":""}]}`;
  const r=await TOp(S.json(prompt,{images:[A,B_],modelTier:'default'}),120000,null);if(UP!==U)return;
  const R_=(r&&Array.isArray(r.sheets))?r.sheets:null;if(!R_){say('לא הצלחתי לבדוק את ההתאמה – כדאי להסתכל על כל תמונה מול המוצר');return}
  let moved=0,bad=0;const took={};
  R_.forEach(x=>{const k=L.indexOf(String(x.s||'').trim().toUpperCase());const j=sj[k];if(j==null)return;const p=+x.p;const ti=p>=1&&p<=si.length?si[p-1]:-1;
   if(x.same===false||ti<0){U.map[j]=-1;U.flag[j]='✗ '+(x.problem||'זה לא אחד המוצרים');bad++;return}
   if(took[ti]!=null){U.flag[j]='✗ עוד תמונה נראית כמו אותו מוצר: '+(x.problem||'');U.map[j]=-1;bad++;return}took[ti]=j;
   if(x.colour_ok===false){U.map[j]=-1;U.flag[j]='✗ הצבע או הדוגמה לא כמו במוצר: '+(x.problem||'');bad++;return}
   if(U.map[j]!==ti){U.map[j]=ti;moved++}if(x.problem)U.flag[j]='⚠ '+x.problem});
  // v278: a picture Claude didn't name keeps its first place – not when that product already got the picture Claude chose for it
  sj.forEach(j=>{const ti=U.map[j];if(ti>=0&&took[ti]!=null&&took[ti]!==j){U.map[j]=-1;U.flag[j]='✗ למוצר הזה כבר יש תמונה מתאימה';bad++}});
  U.chk=bad?`✨ בדקתי: ${bad} תמונות לא מתאימות (מסומנות באדום, לא יעלו אלא אם תבחרי).${moved?' '+moved+' תמונות העברתי למוצר הנכון.':''}`:moved?`✨ בדקתי: ${moved} תמונות העברתי למוצר הנכון. השאר מתאימות`:'✨ בדקתי: כל תמונה מתאימה למוצר שלה';
  paintUp()}
 catch(e){ERR('check',e);say('לא הצלחתי לבדוק את ההתאמה – כדאי להסתכל על כל תמונה מול המוצר')}}
// v276: one picture uploaded in the item's own window – the same check, for that one product (av188.js shows the answer on the item)
window.g276one=async(id,f)=>{let S=null;try{S=await TOp(claude.use('sample'),12000,null)}catch(_){}const lim=S?await TOp(S.limits().catch(()=>null),8000,null):null;
 if(!S||!lim||!lim.images||lim.images.maxCount<2)return null;const u=URL.createObjectURL(f);
 try{const ph=await photoCell(prodPh(id)),sh=await sheetCell(u);if(!ph||!sh)return null;const A=await grid([ph],300,340,()=>'1'),B_=await grid([sh],220,330,()=>'A');const x=D[id]||{};
  const r=await TOp(S.json(`Image 1 = the shop photo of a product: "${nm(id)}"${x.color?', shop colour: '+x.color:''}. Image 2 = a picture made by an image AI of a woman who should be wearing exactly this product (front view). `+
   `Is it the same item (kind, colour, pattern, details)? Answer JSON only: {"same":true,"colour_ok":true,"problem":"short note in Hebrew for the owner, empty when all is fine"}`,{images:[A,B_],modelTier:'default'}),90000,null);
  return r&&typeof r=='object'?r:null}catch(e){ERR('one',e);return null}finally{URL.revokeObjectURL(u)}};
const prodPh=id=>{try{return (photos(id)[0]||{}).u||R().ph(id)||''}catch(_){return ''}};
function paintUp(){const d=dlg();const {ids,T,fs,map,urls}=UP,many=ids.length>1,lab=t=>(many?`מוצר ${t.p+1} · `:'')+t.o.n;
 d.innerHTML=`<div class="mk"><div class="mkh"><h3 id="g250t">📤 מה GPT החזיר – ${many?ids.length+' מוצרים':es(nm(ids[0]))}</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <p class="g250p">סידרתי לפי הסדר. אם משהו לא במקום, בוחרים מהרשימה מה כל תמונה. אחר כך "✓ לסדר הכול".</p>
  <p class="g250ck" aria-live="polite">${es(UP.chk=='run'?'✨ בודקת שכל תמונה מתאימה למוצר שלה…':UP.chk||'')}</p>
  <div class="g250u">${fs.map((f,j)=>`<label class="g250f${UP.flag[j]&&UP.flag[j][0]=='✗'?' bad':''}"><span class="g250pair"><img alt="" src="${urls[j]}">${map[j]>=0?`<img class="g250pp" alt="המוצר" src="${es(prodPh(T[map[j]].id))}">`:''}</span>${UP.flag[j]?`<small class="g250fl">${es(UP.flag[j])}</small>`:''}<select data-g250m="${j}" aria-label="מה התמונה הזו"><option value="-1">— לא להשתמש —</option>${T.map((t,i)=>`<option value="${i}"${map[j]==i?' selected':''}>${i+1}. ${es(lab(t))}</option>`).join('')}</select></label>`).join('')}</div>
  <div class="mkb"><button type="button" class="mkp" data-g250go>✓ לסדר הכול</button><button type="button" data-g250back>ביטול</button></div></div>`;if(!d.open)d.showModal()}
async function apply(){const {ids,T,fs,map}=UP;const d=dlg();d.close();UP.urls.forEach(u=>URL.revokeObjectURL(u));UP=null;
 if(typeof window.av188up!='function'){toast_('לא הצלחתי להעלות. לרענן את הדף');return}
 const jobs=fs.map((f,j)=>({f,t:T[map[j]],i:map[j]})).filter(x=>x.t).sort((p,q)=>p.i-q.i),used=[...new Set(jobs.map(x=>x.t.id))];
 for(const id of used)await ensurePieces(id);let a=null;try{a=await claude.use('assets')}catch(_){}
 let n=0;const CU={},bad=[];   // v268: what didn't work is said at the end (it always said ✓)
 for(const x of jobs){n++;const o=x.t.o,id=x.t.id;toast_(`מסדרת ${n} מתוך ${jobs.length}: ${ids.length>1?nm(id)+' · ':''}${o.n}`);
  try{if(o.role=='cu'){if(!a)throw new Error('assets');const r=await a.upload(await cuJpeg(x.f));if(r&&r.id)(CU[id]=CU[id]||[]).push({k:o.cuOf,n:o.n,cu:r.id,cu8:1});continue}
   if(o.role=='whole'){if(!a)throw new Error('assets');const r=await a.upload(await slim272(x.f));if(r&&r.id)await putItem(id,{whole:r.id});continue}
   const t=o.pk?subId(id,o.pk):id;if(o.pk){try{window.syncParts85&&syncParts85()}catch(_){}if(!D[t]){await new Promise(r=>setTimeout(r,1600))}}
   window.av188kind(t,o.kind);window.G276SKIP=1;const okU=await window.av188up(t,[x.f]);window.G276SKIP=0;if(okU===false)bad.push(o.n)}catch(e){ERR('apply',e);bad.push(o.n)}}
for(const id of used){const cus=CU[id]||[];
  if(cus.length){const old=(it(id).cus||[]).filter(c=>!cus.some(q=>q.k==c.k));try{await putItem(id,{cus:[...old,...cus]})}catch(e){ERR('cus',e)}}
  // a set: the product wears both parts together; each piece can be worn alone
  if(kd(id)=='set'){const ps=['g1','g2'].map(k=>(it(subId(id,k)).a8||[])).flat().filter(p=>p&&Array.isArray(p.L)&&p.L.length==8);if(ps.length)try{await putItem(id,{a8:ps});R().sync()}catch(e){ERR('set',e)}}}
 toast_(bad.length?`✓ ${jobs.length-bad.length} סודרו · ✗ ${bad.length} לא: ${bad.slice(0,3).join(', ')}${bad.length>3?'…':''} – אפשר להעלות אותן שוב`:`✓ סידרתי ${jobs.length} תמונות${used.length>1?` של ${used.length} מוצרים`:''}`);try{paint(used[0])}catch(_){}}
async function cuJpeg(f){const u=URL.createObjectURL(f);try{const m=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=u});const k=Math.min(1,1600/Math.max(m.naturalWidth,m.naturalHeight));
  const c=document.createElement('canvas');c.width=Math.round(m.naturalWidth*k);c.height=Math.round(m.naturalHeight*k);c.getContext('2d').drawImage(m,0,0,c.width,c.height);return await new Promise(r=>c.toBlob(r,'image/jpeg',.9))}finally{URL.revokeObjectURL(u)}}
// v256: "how many in the pack" – asked first, before the zip; her answer makes the folders (pieces) at once
function packQ(id,k){const n=npOf(id),A=asked(id),g=gOf(id),W=PLURAL[k]||'פריטים';
 return `<div class="g250q g256q${A?'':' ask'}"><b>${A?'2. ':'❓ קודם כל: '}כמה ${W} יש בחבילה?</b>${!A&&g?`<small>לפי השם: ${g.n}${g.cols.length?' ('+es(g.cols.join(', '))+')':''}. נכון?</small>`:''}
  <div class="g250cs">${[1,2,3,4,5,6].map(v=>chip(A&&n==v||!A&&g&&g.n==v,'data-g250n',v,v)).join('')}${!A&&g?`<button type="button" class="g250c g256ok" data-g250n="${g.n}">✓ נכון, ${g.n}</button>`:''}</div>
  ${n>1?`<small>${A?`📁 יש ${n} תיקיות נפרדות בקטגוריה – כל אחת כמו מוצר שקנית לבד. שם וצבע לכל אחת:`:'כל אחת תהיה תיקייה נפרדת. שם וצבע לכל אחת:'}</small><div class="g250pn g256pn">${namesOf(id).map((x,i)=>`<span><i>${i+1}</i><input data-g250pn="${i}" value="${es(x)}" aria-label="שם ${i+1}"><input data-g256pc="${i}" value="${es(colsOf(id)[i]||'')}" placeholder="צבע" aria-label="צבע ${i+1}"><button type="button" class="g250c g257bg${pbOf(id,i)?' on':''}" data-g257bg="${i}" aria-pressed="${pbOf(id,i)}" title="הרקע ש-GPT יעשה בגיליון של ${es(x)}">${pbOf(id,i)?'⬛ רקע שחור':'⬜ רקע בהיר'}</button></span>`).join('')}</div><small>⬛ רקע שחור רק לבגד לבן, שמנת או שקוף · ⬜ כל צבע אחר – הרקע הרגיל. לחיצה מחליפה.</small>`:''}</div>`}
// ---------- the window ----------
let DL=null,ID='';
function dlg(){if(DL)return DL;DL=document.createElement('dialog');DL.id='g250';DL.dir='rtl';DL.setAttribute('aria-labelledby','g250t');document.body.appendChild(DL);
 DL.addEventListener('cancel',e=>{e.preventDefault();DL.close()});
 DL.addEventListener('change',e=>{const s=e.target.closest('[data-g250m]');if(s&&UP){UP.map[+s.dataset.g250m]=+s.value;delete UP.flag[+s.dataset.g250m];paintUp();return}
  const t=e.target.closest('[data-g250pn]');if(t){const L=namesOf(ID);L[+t.dataset.g250pn]=t.value.trim()||L[+t.dataset.g250pn];save({pn:L},true);return}
  const c=e.target.closest('[data-g256pc]');if(c){const n=npOf(ID),L=Array.from({length:n},(_,i)=>colsOf(ID)[i]||'');L[+c.dataset.g256pc]=c.value.trim();save({pc:L,pn:namesOf(ID)},true)}});
 DL.addEventListener('click',async e=>{if(e.target===DL)return DL.close();const b=e.target.closest('button');if(!b)return;const q=b.dataset;
  if(b.classList.contains('mkx'))return DL.close();
  if(q.g250k)return save({kd:q.g250k});
  if(q.g250b!=null)return save({blt:q.g250b});
  if(q.g250w!=null)return save({wbg:+q.g250w});
  if(q.g257h)return save({hol:q.g257h=='no'?'':q.g257h});
  if(q.g257bg!=null){const n=npOf(ID),L=Array.from({length:n},(_,i)=>pbOf(ID,i)?1:0),i=+q.g257bg;L[i]=L[i]?0:1;return save({pb:L})}
  if(q.g250n)return save({np:+q.g250n});
  if(q.g250j){const L=jwOf(ID).slice(),i=L.indexOf(q.g250j);if(i>=0){if(L.length>1)L.splice(i,1)}else L.push(q.g250j);return save({jw:JW.map(x=>x[0]).filter(x=>L.includes(x))})}
  if(q.g250sa)return save({sp:[q.g250sa,setOf(ID)[1]]});
  if(q.g250sb)return save({sp:[setOf(ID)[0],q.g250sb]});
  if(q.g250zip!=null)return dlZip(ID,b);
  if(q.g250cp!=null)return copyTxt(b,prompt(ID));
  if(q.g250up!=null)return pick(ID);
  if(q.g252!=null)return bOpen(ID);
  if(q.g252t){if(b.disabled||!hasPh(q.g252t)){toast_('לזה אין תמונה – קודם מעלים תמונה בחלון של הפריט');return}B.np=null;const k=q.g252t,i=B.sel.indexOf(k);if(i>=0)B.sel.splice(i,1);else if(B.sel.length<MAXB){B.sel.push(k);if(b.classList.contains('done'))toast_('שימי לב: לזה כבר יש 360');}else toast_(`עד ${MAXB} מוצרים בפעם אחת`);const y=d0(DL);paintB();d0(DL,y);return}
  if(q.g252next!=null){B.step='list';return paintB()}
  if(q.g252x!=null){B=null;return DL.close()}
  if(q.g252back!=null){B.step='pick';return paintB()}
  if(q.g252q){B.from=1;return open(q.g252q)}
  if(q.g256n){const k=q.g256n;try{await putItem(k,{np:+q.v});await ensurePieces(k)}catch(er){ERR('bnp',er)}return paintB()}
  if(q.g252rm){B.np=null;B.sel=B.sel.filter(k=>k!=q.g252rm);if(!B.sel.length)B.step='pick';return paintB()}
  if(q.g252zip!=null)return bZip(b);
  if(q.g252cp!=null){saveOrd(B.sel);return copyTxt(b,bPrompt(B.sel,B.np))}
  if(q.g252up!=null)return pick(ordFor(B.sel));
  if(q.g252list!=null){B.from=0;B.step='list';return paintB()}
  if(q.g250go!=null)return apply().catch(er=>{ERR('apply',er);toast_('משהו נעצר. מה שכבר עלה נשמר')});
  if(q.g250back!=null){const many=UP&&UP.ids.length>1,one=UP&&UP.ids[0];if(UP){UP.urls.forEach(u=>URL.revokeObjectURL(u));UP=null}if(many&&B){B.step='list';return paintB()}return open(one||ID)}
  if(q.g250see){DL.close();try{R().openWith(null,{a:q.g250see})}catch(er){ERR('see',er)}}});
 return DL}
const d0=(d,y)=>{const m=d.querySelector('.g252g');if(y==null)return m?m.scrollTop:0;if(m)m.scrollTop=y};
async function save(p,quiet){try{await putItem(ID,p);if(['np','pn','pc','kd','sp','jw'].some(k=>k in p))await ensurePieces(ID)}catch(e){ERR('save',e)}if(!quiet)open(ID)}
const chip=(on,attr,v,t)=>`<button type="button" class="g250c${on?' on':''}" ${attr}="${es(v)}" aria-pressed="${on}">${t}</button>`;
function open(id){ID=id;if(B&&!B.sel.includes(id))B.from=0;const d=dlg(),k=kd(id),O=outs(id),ph=photos(id);let p='';try{p=R().ph(id)}catch(_){}
 const q=[];
 q.push(`<div class="g250q"><b>1. מה זה?</b><div class="g250cs">${TY.map(([v,t])=>chip(k==v,'data-g250k',v,t)).join('')}</div></div>`);
 if(k=='set'){const [a,b]=setOf(id);q.push(`<div class="g250q"><b>2. אילו חלקים בסט?</b><div class="g250cs">${SETA.map(([v,t])=>chip(a==v,'data-g250sa',v,t)).join('')}</div><div class="g250cs">${SETB.map(([v,t])=>chip(b==v,'data-g250sb',v,t)).join('')}</div><small>GPT יחזיר 3 תמונות: כל הסט, רק ה${TN[a]}, רק ה${TN[b]}.</small></div>`)}
 if(k=='jw'){const J=jwOf(id);q.push(`<div class="g250q"><b>2. אילו תכשיטים יש במוצר?</b> <small>(אפשר כמה)</small><div class="g250cs">${JW.map(([v,t])=>chip(J.includes(v),'data-g250j',v,t)).join('')}</div><small>כל תכשיט יוצא לבד${J.includes('necklace')||J.includes('earrings')?', ובנוסף תקריב של הפנים שלך עם השרשרת / עם העגילים':''}.</small></div>`)}
 if(MULTI.includes(k))q.push(packQ(id,k));
 if(BELTK.includes(k)){const b=bltOf(id);q.push(`<div class="g250q"><b>${q.length+1}. הגיע עם חגורה?</b><div class="g250cs">${chip(!b||b=='no','data-g250b','no','אין חגורה')}${chip(b=='off','data-g250b','off','חגורה נפרדת – להוריד')}${chip(b=='on','data-g250b','on','חגורה תפורה, מאותו בד – להשאיר')}</div></div>`)}
 if(k!='jw'&&k!='shoes'&&k!='bag'&&!(MULTI.includes(k)&&npOf(id)>1)){const w=wbgOf(id);q.push(`<div class="g250q"><b>${q.length+1}. הבגד לבן, שמנת או שקוף?</b><div class="g250cs">${chip(w,'data-g250w',1,'כן – רקע שחור')}${chip(!w,'data-g250w',0,'לא')}</div>${w?'<small>GPT יעשה רקע שחור, וכך האתר גוזר בדיוק בלי חורים.</small>':''}</div>`)}
 if(k!='jw'&&k!='shoes'&&k!='bag'){const h=holOf(id);q.push(`<div class="g250q"><b>${q.length+1}. יש בבד חורים, תחרה או רשת?</b><div class="g250cs">${chip(!h,'data-g257h','no','אין')}${chip(h=='open','data-g257h','open','יש – רואים מה שמתחת')}${chip(h=='lined','data-g257h','lined','יש – עם בטנה תפורה')}</div>${h=='open'?'<small>GPT ישאיר את החורים פתוחים, והאתר גוזר אותם שקופים. בסטודיו לובשים מתחת חולצת בסיס, והיא נראית דרך החורים.</small>':h=='lined'?'<small>הבטנה היא חלק מהבגד ונשארת.</small>':''}</div>`)}
 const ps=(it(id).parts||[]).filter(x=>/^g\d+$/.test(x.k));
 d.innerHTML=`<div class="mk"><div class="mkh"><h3 id="g250t">🚀 ${es(nm(id))} – הכול ל-GPT</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <div class="g250top"><img alt="" src="${es(p)}"><div>${q.join('')}</div></div>
  <div class="g250o"><b>GPT יחזיר ${O.length} ${O.length>1?'תמונות':'תמונה'}:</b><ol>${O.map(o=>`<li>${es(o.n)}</li>`).join('')}</ol></div>
  <ol class="g250s"><li><b>⬇ להוריד</b> – ZIP אחד: ${ph.length} תמונות של המוצר, הבובה${O.some(o=>o.role=='cu')?', תקריב הפנים שלך':''} והפרומפט.</li><li>ב-GPT בשיחה חדשה: מצרפים את ה-ZIP ומדביקים את הפרומפט (📋).</li><li><b>📤 להעלות</b> – בוחרים את כל התמונות שחזרו בבת אחת.</li></ol>
  <div class="mkb g250bar">${B&&B.from&&B.sel.includes(id)?'<button type="button" class="mkp" data-g252list>↩ לרשימת המוצרים</button>':`<button type="button" class="mkp" data-g250zip>⬇ להוריד הכול (ZIP)</button><button type="button" data-g250cp>📋 הפרומפט</button><button type="button" class="mkp" data-g250up>📤 להעלות מה שחזר</button><button type="button" data-g252>📦 כמה מוצרים יחד</button>`}</div>
  ${ps.length?`<div class="g250ps"><b>הפריטים במוצר הזה</b>${ps.map(x=>{const s=subId(id,x.k),ok=R()&&R().isReady(s);return `<div class="g250pi"><span>${es(x.n)}</span><em class="${ok?'ok':''}">${ok?'✓ על האווטאר':'עוד לא'}</em>${ok?`<button type="button" data-g250see="${es(s)}">👀 עליי</button>`:''}</div>`}).join('')}</div>`:''}
  <details class="g250pr"><summary>לקרוא את הפרומפט</summary><textarea readonly rows="12">${es(prompt(id))}</textarea></details></div>`;
 if(!d.open)d.showModal()}
window.g250open=open;
// her answers are saved quietly (no generic "נשמר: …" toast)
{const _bp=typeof beforePut=='function'?beforePut:null;if(_bp)beforePut=function(id,patch){const k=patch&&Object.keys(patch);if(k&&k.length&&k.every(x=>['kd','blt','wbg','np','jw','sp','pn','pc','pb','hol','g250','parts','cus','whole'].includes(x)))return;return _bp.apply(this,arguments)}}
// ---------- the box in the item window, under the buttons ----------
function box(){const d=document.getElementById('dlg');if(!d||!d.open)return;const bar=d.querySelector('#dlbody .it77');if(!bar)return;
 const ed=d.querySelector('#dlbody .ed[data-id]'),id=(ed&&ed.dataset.id)||(typeof CUR!='undefined'?CUR:'');let x=d.querySelector('.g250box');
 if(!id||!D[id]||!OK_CATS.has(cat0(id))){if(x)x.remove();return}
 const O=outs(id),ready=(()=>{try{return R().isReady(id)}catch(_){return false}})(),sig=id+'|'+kd(id)+'|'+O.length+'|'+ready;if(x&&x.dataset.sig==sig)return;
 if(!x){x=document.createElement('div');x.className='g250box';const t=d.querySelector('.t228box');(t||bar).after(x)}x.dataset.sig=sig;
 x.innerHTML=`<div class="g250bt"><b>🚀 הכול ל-GPT בלחיצה אחת</b><small>${ready?'✓ כבר על האווטאר · אפשר להכין מחדש':'זיפ אחד עם הפרומפט, הבובה וכל התמונות'} · ${es(TN[kd(id)]||'')}${O.length>1?` · ${O.length} תמונות`:''}</small></div><span class="g250bb"><button type="button" class="mkp" data-g250="${es(id)}">🚀 לפתוח</button><button type="button" data-g252b="${es(id)}">📦 כמה יחד</button></span>`}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-g250],[data-g252b]');if(!t||t.closest('#g250'))return;e.preventDefault();e.stopPropagation();if(t.dataset.g252b)bOpen(t.dataset.g252b);else{if(B)B.from=0;open(t.dataset.g250)}},true);
setInterval(()=>{try{box()}catch(e){ERR('box',e)}},700);
// ---------- her close-ups (jewelry) and the whole set: first in the item window, the close-up turns ----------
if(typeof galList=='function'){const _gl=galList;galList=function(id){const L=_gl.apply(this,arguments);try{const t=it(id),add=[];
  const turn=(a,n)=>{const C=window.C8R||{};let u='/_blob/'+a;if(C[a])u=C[a][0];else if(window.cu8Frames)cu8Frames(a).then(F=>{if(F&&!C[a]){C[a]=F;try{if(typeof CUR!='undefined'&&CUR==id)paintGal(id)}catch(_){}}});add.push({u,n,cu248:a})};
  (t.cus||[]).forEach(c=>c.cu8?turn(c.cu,'מקרוב · '+(TN[c.k]||'')):add.push({u:'/_blob/'+c.cu,n:'מקרוב · '+(TN[c.k]||'')}));
  if(t.whole)turn(t.whole,'כל הסט');
  return add.length?[...add,...L]:L}catch(e){ERR('gal',e)}return L}}
})();
