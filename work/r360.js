// v181: הסטודיו = the new 8-angle avatar (a8/*.webp, cut from Sara's GPT sheets on the new doll). Sara 25/10 21:00: "הסטודיו נשאר עם האווטאר הישן... לתקן אותו עם כל החדש".
// Every way into "בניית לוק" (bottom bar, item window, look of the day, saved looks) opens this room; the old 5-pose studio is no longer reachable.
// Her whole closet is in the room: items that already have a 360 sheet (READY) are worn on the avatar, every other item offers the one-message GPT prompt to make one.
// The home hero wears the look of the day (built from READY items) – 20:59 "מה שיופיע למעלה בתמונה שלי... הלבוש שחשבת שיכול להתאים".
(function(){
const V='?v='+(window.A8V||window.VER||'');   // v245: the a8 pictures' own version – stays the same across site versions
const NAMES=['חזית','חצי ימין','צד ימין','גב ימין','גב','גב שמאל','צד שמאל','חצי שמאל'];
const BACK=[0,0,0,1,1,1,0,0];            // views where the head covers the ears: earrings go under the hair/scarf
const WB=[1,1,0,0,0,0,0,1];              // views where 'hair behind the shoulders' changes the wig (front and the two half views; v288: built from the wig, see hairBack)
// closet items that already have a 360 sheet → their layer keys (a8/x<key><view>.webp). Every new sheet: cut the layers, then add one line here.
const READY={
 'S1100_0':{k:['d']},        // Omancia שמלת קטיפה ירוקה עם תחרה (25/10 20:53) – lace sleeves, see LACE
 'T591091_2':{k:['b']},      // חולצת בסיס צווארון עומד, כחול כהה עם פרחים מוזהבים
 'S1100_5':{k:['s']},        // GlowEve חצאית ג'ינס מקסי
 'S2QB0_2':{k:['n']},        // Dash Chic נעלי סניקרס גרב שחורות
 'S1100_2':{k:['g']},        // Street Style חגורת עור מערבית עם אבני חן
 'T213':{k:['j','e']},       // סט תכשיטים כחול: השרשרת והעגילים (two sheets)
 'S2QB0_4':{k:['k'],head:1}  // suzhichou צעיף ראש סאטן כחול
};
const KEYOF={};Object.entries(READY).forEach(([id,r])=>r.k.forEach(k=>KEYOF[k]=id));
const SLOT={d:'body',b:'top',s:'bottom',n:'shoes',g:'belt',j:'neck',e:'ears'};
// a dress takes the top and the skirt (v190: by slot, so items cut on the site follow the same rule)
// v210 (Sara 14:24 "קטגוריה חדשה, חולצת בסיס ... אבחר את החולצת בסיס מתחת לשמלה"): an item in her "חולצות בסיס" category is worn UNDER everything – with a dress too
const SL=k=>{const s=SLOT[k],id=KEYOF[k];if(s=='outer'&&id&&kindOf(id)=='coat')return 'coat';return s=='top'&&id&&cat(id)=='base'?'base':s};   // v250 (Sara 16:53): a coat is drawn over a jacket
const clashOf=k=>{const s=SL(k),w=s=='body'?['top','bottom']:(s=='top'||s=='bottom')?['body']:[];return Object.keys(SLOT).filter(o=>w.includes(SL(o)))};
// see-through lace: x<k>u<view> is what shows through it (the arm as GPT drew it); with a base shirt it is tinted. value = its mean luminance
const LACE={d:149};
const CAM=[{k:'black',n:'שחור',c:[24,24,26]},{k:'green',n:'ירוק כהה',c:[28,52,40]},{k:'navy',n:'כחול כהה',c:[30,38,66]},{k:'nude',n:'בז׳',c:[206,182,158]},{k:'white',n:'לבן',c:[242,240,234]},{k:'',n:'בלי',c:null}];
const HEADS=[{k:'c',n:'כיסוי',src:'a8/t_c.webp'},{k:'w',n:'פאה',src:'a8/t_w.webp'}];  // v184: the wig from her 8-angle sheet (25/10 22:17), whole head incl. face, on a head-less doll
Object.entries(READY).forEach(([id,r])=>{if(r.head)HEADS.push({k:r.k[0],id,src:'a8/t_'+r.k[0]+'.webp'})});   // v185: her avatar wearing it (the shop photo was often not loaded yet on the home row → an empty circle)
const CATS=[['all','הכל'],['ready','✓ כבר על האווטאר'],['dresses','שמלות'],['tops','חולצות'],['base','חולצות בסיס'],['sweaters','סוודרים'],['skirts','חצאיות'],['sets','סטים'],['outer','ז׳קטים ומעילים'],['scarves','כיסויי ראש'],['shoes','נעליים'],['belts','חגורות'],['jewelry','תכשיטים'],['bags','תיקים']];
const CATIDS=new Set(CATS.slice(2).map(c=>c[0]));
const DEF={on:{b:1,s:1,n:1,g:1,j:1,e:1},head:'c',tuck:0,under:0,wb:0,cam:'black',bg:'',mk:'',tf:'',tc:null};   // v199: mk = makeup, tf/tc = the cover a tie is made of and its colour
const clone=o=>JSON.parse(JSON.stringify(o));
let ST=load();let UNDO=null;
// 21:19 she asked to leave the wig until it is redone: start once on the cover
try{if(!localStorage.getItem('r3w181')){localStorage.setItem('r3w181','1');if(ST.head=='w'){ST.head='c';localStorage.setItem('r360',JSON.stringify(ST))}}}catch(_){}
function load(){try{const s=JSON.parse(localStorage.getItem('r360')||'null');if(s&&s.on)return Object.assign(clone(DEF),s,{on:Object.assign({},s.on)})}catch(_){}return clone(DEF)}
function keep(){try{localStorage.setItem('r360',JSON.stringify(ST))}catch(_){}if(DB)DB.collection('r360').doc('state').set(clone(ST)).catch(()=>{})}
let DB=null,L3={},BGU=[],BGD=null;   // BGU: v204 her own backgrounds (db 'bgs' {src,n,t})   // L3 = looks saved in the 360 room before v181 (db 'looks360'); new ones go to her main looks (LOOKS)
(async()=>{try{const db=await window.claude?.use?.('db');if(!db)return;DB=db;
 db.collection('looks360').onSnapshot(sn=>{const n={};sn.docs.forEach(d=>{const v=d.data();if(v)n[d.id]=v});L3=n;paintLooks()},()=>{});
 db.collection('bgs').onSnapshot(sn=>{const L=[];sn.docs.forEach(d=>{const v=d.data();if(v&&v.src)L.push({k:'u_'+d.id,id:d.id,n:v.n||'שלי',u:'/_blob/'+v.src,t:v.t||0})});L.sort((a,b)=>b.t-a.t);BGU=L;try{paintBgs();if(BGD&&BGD.open)bgDlg()}catch(_){}},()=>{});
 db.collection('r360').doc('state').get().then(d=>{const v=d&&d.exists&&d.data&&d.data();if(v&&v.on&&!localStorage.getItem('r360')){ST=Object.assign(clone(DEF),v);redraw()}}).catch(()=>{})}catch(_){}})();
const toast_=m=>(window.toast||(()=>{}))(m);
const ERR=(w,e)=>{try{(window.ERRS=window.ERRS||[]).push('r360 '+w+': '+(e&&e.message||e))}catch(_){}};   // v267
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cat=id=>{try{return curCat(id)}catch(_){return (D[id]||{}).cat||''}};
const nm=id=>{const x=D[id]||{};return String(x.short||x.full||'').replace(/^[A-Za-z0-9&'.\-\s]+(?=[֐-׿])/,'').trim()};  // the Shein brand name in front is noise
const ph=id=>{try{return img(id)||TPH}catch(_){return ''}};
const thl=ids=>{new Set(ids.map(cat).filter(Boolean)).forEach(c=>{try{thLoad(c).then(()=>thApply(TH)).catch(()=>{})}catch(_){}})};
const occNow=()=>{try{const o=window.occToday83&&occToday83();if(o)return o[0]}catch(_){}return [5,6].includes(new Date().getDay())?'shab':'day'};
const isReady=id=>!!READY[id];
// ---------- v190: items the site cut itself from her 8-angle GPT picture (IT[id].a8 = [{s:slot, L:[8 asset ids], …}], see cut8.js + av188.js) ----------
const DYN={},STATIC=new Set(Object.keys(READY));let DSIG='';
const WHK=new Set(),PK={};   // PK (v274): the kind each cut part was cut as (a sweater is an 'outer' part that can go into the skirt)
   // v202: an item cut whole (her exact scarf in a tie, kind 'tiex'): drawn on the head-less doll like a tie
function sync(){const a8={};try{Object.entries(IT||{}).forEach(([id,v])=>{if(v&&Array.isArray(v.a8)&&!STATIC.has(id)&&D[id])a8[id]=v.a8.filter(p=>p&&p.s&&Array.isArray(p.L)&&p.L.length==8)})}catch(_){}
 const sig=JSON.stringify(a8);if(sig==DSIG)return false;DSIG=sig;
 Object.keys(READY).forEach(id=>{if(!READY[id].dyn)return;READY[id].k.forEach(k=>{delete SLOT[k];delete KEYOF[k];for(let v=1;v<=8;v++){delete DYN['x'+k+v];delete IMG['x'+k+v]}});delete READY[id]});
 for(let i=HEADS.length-1;i>=0;i--)if(HEADS[i].dyn)HEADS.splice(i,1);
 Object.entries(a8).forEach(([id,ps])=>{if(!ps.length)return;const ks=[];let head=0;
  ps.forEach((p,j)=>{const k='u'+id.replace(/[^A-Za-z0-9]/g,'')+(j?'p'+j:'');ks.push(k);KEYOF[k]=id;PK[k]=p.k;if(p.s=='head')head=1;else SLOT[k]=p.s;if(p.k=='tiex')WHK.add(k);else WHK.delete(k);p.L.forEach((a,v)=>DYN['x'+k+(v+1)]='/_blob/'+a)});
  READY[id]={k:head?ks.slice(0,1):ks,head,dyn:1};if(head)HEADS.push({k:ks[0],id,src:DYN['x'+ks[0]+'1'],dyn:1})});
 Object.keys(ST.on||{}).forEach(k=>{if(/^u/.test(k)&&!KEYOF[k])delete ST.on[k]});if(/^u/.test(ST.head||'')&&!KEYOF[ST.head])ST.head='c';   // items taken off the avatar
 return true}
try{sync()}catch(_){}
function resync(){try{if(sync()){paintHeads();redraw()}}catch(e){(window.ERRS=window.ERRS||[]).push('v190 sync: '+(e&&e.message||e))}}
{const _p=window.paintAll;if(typeof _p=='function')paintAll=function(){const r=_p.apply(this,arguments);resync();return r}}
// ---------- v199: her styles library (sty199.js, db 'styles'): hairstyles for the wig (yh…), ties for a cover (yt… + the grey fabric zt…, painted), makeup (ym…) ----------
// Sara 26/10 09:24 "יש לי כיסוי, אני רוצה לבחור איזה סוג של קשירה ... פאה אחת עם 30 סוגים שונים של תסרוקות"
const STY={},STH={},STYSET={hair:'h',tie:'t',mk:'m'};
const styKey=s=>s&&STYSET[s.set]&&s.id?'y'+STYSET[s.set]+String(s.id).replace(/[^A-Za-z0-9]/g,''):'';
const whole=h=>h=='w'||WHK.has(h)||(/^y[ht]/.test(h||'')&&!!STY[h]);   // the whole head (face too) is a layer: draw it on the head-less doll
const BEIGE=[222,200,184];   // the doll's own cover
const GREY=[150,150,154];    // v204 (Sara 11:46 "תשים לי איזה כיסוי יפה שבצבע אפור ניטרלי"): the basic cover is her default tie in a neutral grey
function styles(list){try{for(const c in FRM)if(c[0]=='#')delete FRM[c];for(const c in CARD)if(c.includes('|face|'))delete CARD[c]}catch(_){}   // v213: the avatar tiles' frames and the makeup faces use her default tie / hairstyle
 Object.keys(STY).forEach(k=>{const z='z'+k.slice(1);for(let v=1;v<=8;v++){delete DYN[k+v];delete IMG[k+v];delete DYN[z+v];delete IMG[z+v]}delete STY[k];delete STH[k];for(const c in STH)if(c.startsWith(k+'|'))delete STH[c];try{for(const c in CARD)if(c.startsWith(k+'|'))delete CARD[c];for(const c in FRM)if(c.startsWith(k+'|'))delete FRM[c]}catch(_){}});
 (list||[]).forEach(s=>{const k=styKey(s);if(!k||!Array.isArray(s.L)||s.L.length!=8)return;STY[k]={set:s.set,n:s.n||'',lum:+s.lum||128,id:s.id,t:s.t||0,cu:s.cu||'',p:s.p||''};
  s.L.forEach((a,v)=>{if(a)DYN[k+(v+1)]='/_blob/'+a});if(Array.isArray(s.M))s.M.forEach((a,v)=>{if(a)DYN['z'+k.slice(1)+(v+1)]='/_blob/'+a})});
 if(/^y/.test(ST.head||'')&&!STY[ST.head])ST.head=ST.tf&&(ST.tf=='c'||KEYOF[ST.tf])?ST.tf:'c';if(ST.mk&&!STY[ST.mk])ST.mk='';
 try{paintHeads();redraw()}catch(_){}
 coverThumb().then(u=>{if(u)document.querySelectorAll('[data-zh="c"] img').forEach(i=>i.src=u)}).catch(()=>{})}
const styList=set=>Object.keys(STY).filter(k=>!set||STY[k].set==set).sort((a,b)=>STY[a].t-STY[b].t);
// v238: ties and hairstyles in her order (⭐ first, then the last picked) – sty199 window.STYORD
const ordSty=set=>{const L=styList(set),O=window.STYORD;if(!O)return L;try{return O.sort(set,L,k=>O.unit(STY[k].id))}catch(_){return L}};
const recSty=k=>{try{const O=window.STYORD,st=STY[k];if(O&&st&&(st.set=='tie'||st.set=='hair'))O.rec(st.set,O.unit(st.id))}catch(_){}};
// v261 (Sara 20:59 "רק מה שעם כוכבית, זה יוצא ... אם אני רוצה להוסיף תסרוקות נוספות, זה נפתח לי, ואז זה מוסיף לי כוכבית"): the studio rows show her ⭐ ones
// (and what she has on now); "☆ עוד" opens the rest, and what she picks from there gets a ⭐
const uSty=k=>{try{return window.STYORD.unit(STY[k].id)}catch(_){return ''}};
const favSty=k=>{const O=window.STYORD,st=STY[k];return !!(O&&O.isFav&&st&&O.isFav(st.set,uSty(k)))};
function favCut(set,L,cur){const O=window.STYORD;if(!O||!O.hasFav||!O.hasFav(set)||O.more(set))return [L,0];const F=L.filter(k=>favSty(k)||k==cur);return F.length?[F,L.length-F.length]:[L,0]}
const starSty=k=>{try{const O=window.STYORD,st=STY[k];if(O&&O.star&&st&&!favSty(k))O.star(st.set,uSty(k),true)}catch(_){}};
// v227: makeup groups = the groups of her prompts (doc.p 'm:day:3', or the same name), the rest is "שלי"; hidden groups are kept on this device
const mkHid=()=>{try{return new Set(JSON.parse(localStorage.getItem('mkc227')||'[]'))}catch(_){return new Set()}};
function mkGroups(ms){const P=window.STYP,C=P&&P.MKC||[],by={};
 const catOf=k=>{const x=STY[k],m=/^m:(\w+):/.exec(x.p||'');if(m&&C.some(g=>g[0]==m[1]))return m[1];const n=(x.n||'').trim();const g=n&&C.find(([,,L])=>L.some(y=>(Array.isArray(y)?y[0]:String(y).split(':')[0]).trim()==n));return g?g[0]:'own'};
 ms.forEach(k=>{const c=catOf(k);(by[c]=by[c]||[]).push(k)});
 return [...C.map(([c,t])=>[c,t,by[c]||[]]),['own','שלי',by.own||[]]].filter(g=>g[2].length)}
// the colour of a cover she picked (its front layer): the tie is painted in it
async function coverRGB(k){if(!k||k=='c')return BEIGE;const m=await im('x'+k+'1');if(!m)return BEIGE;
 const c=document.createElement('canvas');c.width=90;c.height=135;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(m,0,0,90,135);let p;try{p=g.getImageData(0,0,90,135).data}catch(_){return BEIGE}
 const R=[],G=[],B=[];for(let i=0;i<p.length;i+=4)if(p[i+3]>200){R.push(p[i]);G.push(p[i+1]);B.push(p[i+2])}if(R.length<20)return BEIGE;
 const md=a=>a.sort((x,y)=>x-y)[a.length>>1];return [md(R),md(G),md(B)]}
// ---------- v202: any cover from her closet, worn with one of her ties in its colour (Sara 26/10 11:04: "כשאני נכנסת לכיסויים זה יפתח לי את סוגי
// הקשירות ואז אני אבחר שעם הכיסוי הזה אני רוצה את הקשירה הזו ... אני לא רוצה לעשות מכל כיסוי 20 קשירות ... 1 מסטאר ועליו נלביש את הכיסוי") ----------
// IT[id].tie = the tie (db 'styles' id) she picked for that cover, IT[id].tc = a colour she picked for it. ST.tf may be a closet item id.
const isCover=id=>{if(!D[id]||cat(id)!='scarves')return false;const t=String((D[id].short||'')+' '+(D[id].full||''));return !/כובע|ברט/.test(t)||/כיסוי ראש/.test(t)};   // v228: "כובע כיסוי ראש" is a cover too
const itOf=id=>(typeof IT=='object'&&IT&&IT[id])||{};
// v260 (Sara 27/10 20:52 "תכשיט … לפעמים הוא מדי למטה … תן לי את האופציה להעלות או להוריד, בעיקר השרשרת"): a necklace, earrings, bracelet or belt
// can be moved up or down on her (IT[id].jy, px of the 541-px frame, + = down), the same in all 8 angles; JYL = her last press before it is saved
const JYS=['neck','ears','wrist','belt'],JYL={};
const jyOf=(id,sl)=>{const q=id+'|'+sl;if(q in JYL)return JYL[q];const j=itOf(id).jy;return j&&typeof j=='object'?+j[sl]||0:0};   // per part: a set's necklace and earrings move apart
const JY=k=>{const id=KEYOF[k];return id&&JYS.includes(SLOT[k])?jyOf(id,SLOT[k]):0};
const COLW=[[/שחור|black/i,[34,32,32]],[/לבן|white/i,[246,244,239]],[/שמנת|קרם|אופ.?וויט|ivory|cream/i,[239,229,207]],[/בז|חאקי|שמפניה|beige|khaki/i,[217,196,166]],[/ניוד|nude/i,[200,161,132]],
 [/אפור|כסף|grey|gray/i,[150,149,147]],[/נייבי|כחול כהה|navy/i,[31,44,77]],[/תכלת|sky/i,[169,195,223]],[/כחול|ג.ינס|blue/i,[52,86,150]],[/קפה|חום|brown|coffee/i,[107,74,51]],[/קאמל|זהב|חרדל|camel|gold/i,[180,135,70]],
 [/זית|olive/i,[92,97,55]],[/ירוק|green/i,[46,110,70]],[/בורדו|יין|בורגונדי|burgundy|wine/i,[109,31,44]],[/אדום|red/i,[180,30,40]],[/ורוד עתיק|פודרה|dusty/i,[206,162,160]],[/ורוד|pink/i,[227,150,170]],
 [/סגול|לילך|לבנדר|purple|lilac/i,[120,90,150]],[/כתום|orange/i,[220,120,50]],[/צהוב|yellow/i,[230,200,60]],[/טורקיז|turquoise/i,[40,160,160]]];
const IRGB={};
async function photoRGB(id){const u=ph(id);if(!u)return null;const m=await new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=u});if(!m||!m.naturalWidth)return null;
 const c=document.createElement('canvas');c.width=60;c.height=Math.round(60*m.naturalHeight/m.naturalWidth)||60;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(m,0,0,c.width,c.height);let p;
 try{p=g.getImageData(Math.round(c.width*.2),Math.round(c.height*.2),Math.round(c.width*.6),Math.round(c.height*.6)).data}catch(_){return null}
 const bins={};for(let i=0;i<p.length;i+=4){const R=p[i],G=p[i+1],B=p[i+2];if(R>215&&G>215&&B>215)continue;const k=(R>>5)+','+(G>>5)+','+(B>>5);(bins[k]=bins[k]||[0,0,0,0]);const b=bins[k];b[0]++;b[1]+=R;b[2]+=G;b[3]+=B}
 const top=Object.values(bins).sort((a,b)=>b[0]-a[0])[0];return top?[top[1]/top[0],top[2]/top[0],top[3]/top[0]].map(Math.round):null}
async function itemRGB(id){const t=itOf(id).tc;if(Array.isArray(t)&&t.length==3)return t;if(IRGB[id])return IRGB[id];const r=READY[id];if(r&&r.head)return IRGB[id]=await coverRGB(r.k[0]);
 const txt=String((D[id]||{}).color||'');const w=COLW.find(([re])=>re.test(txt));if(w)return IRGB[id]=w[1];return IRGB[id]=(await photoRGB(id))||BEIGE}
const tfRGB=tf=>!tf||tf=='c'?Promise.resolve(GREY):D[tf]?itemRGB(tf):coverRGB(tf);
// the tie the basic cover is tied in: the last one she picked, else her first
function defTie(){let last='';try{last=localStorage.getItem('tie202')||''}catch(_){}if(last&&STY[last]&&STY[last].set=='tie')return last;return styList('tie')[0]||''}
// 'c' (the basic cover) on any stage → that tie in grey; s.rawc keeps the doll's own beige cover (the library's empty cards)
function headOf(s){if(s.head!='c'||s.rawc)return s;const k=defTie();return k?Object.assign({},s,{head:k,tf:'c',tc:GREY}):s}
function tieFor(id){const t=itOf(id).tie,k=t?styKey({set:'tie',id:t}):'';if(k&&STY[k])return k;let last='';try{last=localStorage.getItem('tie202')||''}catch(_){}if(last&&STY[last])return last;return styList('tie')[0]||''}
const coverTie=id=>isCover(id)&&!!tieFor(id)&&!isReady(id);   // a cover with its own 8-angle picture wears that one first (Sara 11:09 "המטפחת המדוייקת ... בפרונט"); the ties stay in the row to switch
function wearCover(id,k){k=k||tieFor(id);if(!k||!STY[k])return false;const r=READY[id];ST.tf=r&&r.head?r.k[0]:id;ST.head=k;ST.tc=null;try{localStorage.setItem('tie202',k)}catch(_){}
 tfRGB(ST.tf).then(c=>{if(ST.head==k&&!ST.tc){ST.tc=c;keep();redraw()}});return true}
const tfId=()=>ST.tf&&(KEYOF[ST.tf]||(D[ST.tf]?ST.tf:''));
// a small picture of her head with the style (the row in the studio, the library)
const THQ=new Map();let SCALL=false;
// v218 (Sara 17:28 / 17:31 "לא רואים את האיפור בתמונה הקטנה ... בתקריב עם האיפור, התמונה הטובה"): a makeup with her GPT close-up shows the close-up (her wig, left);
// without one, her cover doll with the makeup as GPT drew it (a hairstyle head only gets it fitted and blurred), a bigger picture
function cuThumb(id){return new Promise((ok,no)=>{const im=new Image();im.onload=()=>{const W=im.naturalWidth,H=im.naturalHeight,sd=Math.min(W/2,H),q=sd*.86,o=document.createElement('canvas');o.width=o.height=320;
  o.getContext('2d').drawImage(im,(W/2-q)/2,Math.max(0,(H-sd)/2),q,q,0,0,320,320);ok(o.toDataURL('image/jpeg',.88))};im.onerror=no;im.src='/_blob/'+id})}
function styThumb(k,rgb){const ck=rgb?k+'|'+rgb.join(','):k;if(STH[ck])return Promise.resolve(STH[ck]);if(THQ.has(ck))return THQ.get(ck);const st=STY[k];if(!st)return Promise.resolve('');
 const p=(async()=>{if(st.set=='mk'&&st.cu){try{return STH[ck]=await cuThumb(st.cu)}catch(_){}}
  if(st.set=='mk'){const s=Object.assign(clone(DEF),{on:{},bg:'',head:'c',mk:k,tc:null}),c=document.createElement('canvas');if(!await paint(c,0,s))return '';
   const o=document.createElement('canvas');o.width=o.height=200;const g=o.getContext('2d');g.imageSmoothingQuality='high';g.drawImage(c,134,18,84,84,0,0,200,200);return STH[ck]=o.toDataURL('image/jpeg',.9)}
const s=Object.assign(clone(DEF),{on:{},bg:'',head:k,mk:'',tc:st.set=='tie'?(rgb||ST.tc||GREY):null});
  const c=document.createElement('canvas');if(!await paint(c,0,s))return '';const o=document.createElement('canvas');o.width=o.height=96;const g=o.getContext('2d');
  g.drawImage(c,96,0,160,160,0,0,96,96);
  return STH[ck]=o.toDataURL('image/jpeg',.85)})().catch(()=>'').finally(()=>THQ.delete(ck));THQ.set(ck,p);return p}

// v204: the library cards (Sara 11:38 "לא מספיק לי את השם, אני רוצה לראות פיזית איך זה נראה"): front and back (ties, hairstyles) or the face (makeup);
// o.all = all 8 angles for the viewer; no k = the doll as she is now, waiting for that style (o.set)
const CARD={},CARDQ=new Map();
function styCard(k,o){o=o||{};const st=k?STY[k]:null;if(k&&!st)return Promise.resolve('');const set=st?st.set:(o.set||'tie');
 const ck=[k||'base:'+set,o.all?'all':o.one?'one':'',o.rgb?o.rgb.join(','):''].join('|');if(CARD[ck])return Promise.resolve(CARD[ck]);if(CARDQ.has(ck))return CARDQ.get(ck);
 const p=(async()=>{const s=Object.assign(clone(DEF),{on:{},bg:'',head:set=='mk'?'c':(k||(set=='hair'?'w':'c')),mk:set=='mk'&&k?k:'',tc:set=='tie'&&k?(o.rgb||GREY):null,rawc:set=='tie'&&!k?1:0});
  const vs=o.all?[0,1,2,3,4,5,6,7]:o.one?[0]:set=='mk'?[0,1]:[0,4],face=set=='mk'&&!o.all&&!o.one;
  const [sx,sy,sw,sh]=face?[118,10,120,120]:[70,0,220,300],tw=face?150:o.all?132:o.one?176:150,th=Math.round(tw*sh/sw),cols=o.all?4:o.one?1:2;
  const out=document.createElement('canvas');out.width=tw*cols;out.height=th*Math.ceil(vs.length/cols);const g=out.getContext('2d');
  for(let i=0;i<vs.length;i++){const c=document.createElement('canvas');if(!await paint(c,vs[i],s))return '';const x0=face&&vs[i]==1?sx-14:sx;
   g.drawImage(c,x0,sy,sw,sh,(i%cols)*tw,Math.floor(i/cols)*th,tw,th)}
  return CARD[ck]=out.toDataURL('image/jpeg',.86)})().catch(()=>'').finally(()=>CARDQ.delete(ck));CARDQ.set(ck,p);return p}

// v213 (Sara 15:44 "אני רוצה לראות רק את הפנים שלי ... בתקריב יותר גדול", 15:45 "שתי פרצופים, פרצוף שלי עם כיסוי, ופרצוף שלי עם פאה"): one face, close up, with a makeup (k) or without (k '').
// h 'c' = her cover (her default tie, grey); h 'h' = her wig: the hairstyle she wears in the studio, else her first one, else her first wig.
// A tie / hairstyle / wig is a GPT drawing of the whole head: its face sits a little elsewhere (moved, turned, smaller), so the makeup layer alone would double her eyes and mouth.
// So the doll's own face with the makeup is laid on that head's face (fitFace finds where), inside a soft oval from the brows to the chin.
const hairHead=()=>/^yh/.test(ST.head||'')&&STY[ST.head]?ST.head:styList('hair')[0]||'w';
const FC=[176,66,22,25],FIT=window.FIT213={};
function lumOf(c){const d=c.getContext('2d',{willReadFrequently:true}).getImageData(0,0,c.width,c.height).data,L=new Float32Array(c.width*c.height);for(let i=0;i<L.length;i++)L[i]=.299*d[i*4]+.587*d[i*4+1]+.114*d[i*4+2];return L}
function fitFace(D,A,W,H,cx=176,cy=62,rx=19,ry=24){const P=[];   // the doll's eyes, nose and mouth (D) against the head (A) → [dx,dy,scale,turn°,score]
 for(let y=cy-ry;y<=cy+ry;y++)for(let x=cx-rx;x<=cx+rx;x++){const u=(x-cx)/rx,v=(y-cy)/ry;if(u*u+v*v<=1)P.push(x-cx,y-cy,D[y*W+x])}
 const n=P.length/3,V=new Float32Array(n);let m=0;for(let i=2;i<P.length;i+=3)m+=P[i];m/=n;let sd=0;for(let i=2;i<P.length;i+=3){P[i]-=m;sd+=P[i]*P[i]}sd=Math.sqrt(sd)||1;
 const score=(dx,dy,s,t)=>{const c=Math.cos(t*Math.PI/180)*s,si=Math.sin(t*Math.PI/180)*s;let sa=0,sb=0,sab=0;
  for(let i=0,j=0;i<P.length;i+=3,j++){const x=Math.round(cx+dx+c*P[i]-si*P[i+1]),y=Math.round(cy+dy+si*P[i]+c*P[i+1]);const a=x<0||y<0||x>=W||y>=H?0:A[y*W+x];V[j]=a;sa+=a}
  const ma=sa/n;for(let j=0;j<n;j++){const a=V[j]-ma;sab+=a*P[j*3+2];sb+=a*a}return sab/(sd*(Math.sqrt(sb)||1))};
 let best=[0,0,1,0],bs=score(0,0,1,0);
 for(let s=.9;s<=1.101;s+=.025)for(let t=-6;t<=6;t+=2)for(let dy=-10;dy<=10;dy+=2)for(let dx=-10;dx<=10;dx+=2){const r=score(dx,dy,s,t);if(r>bs){bs=r;best=[dx,dy,s,t]}}
 const [bx,by,bS,bT]=best;
 for(let s=bS-.02;s<=bS+.021;s+=.01)for(let t=bT-1.5;t<=bT+1.51;t+=.5)for(let dy=by-2;dy<=by+2;dy++)for(let dx=bx-2;dx<=bx+2;dx++){const r=score(dx,dy,s,t);if(r>bs){bs=r;best=[dx,dy,s,t]}}
 return [...best,bs]}
function styFace(k,h,o){o=o||{};if(k&&!STY[k])return Promise.resolve('');const hk=h=='h'?hairHead():defTie()||'c';
 const ck=[k||'base:mk','face',h,hk,o.big?'big':''].join('|');if(CARD[ck])return Promise.resolve(CARD[ck]);if(CARDQ.has(ck))return CARDQ.get(ck);
 const p=(async()=>{const c=document.createElement('canvas');if(!await paint(c,0,Object.assign(clone(DEF),{on:{},bg:'',head:hk,mk:k||'',tc:null})))return '';   // v217: paint() carries the makeup onto that head's face
  const [sx,sy,sw,sh]=[130,8,96,112],z=o.big?5:3,out=document.createElement('canvas');out.width=sw*z;out.height=sh*z;const g=out.getContext('2d');g.imageSmoothingQuality='high';
  g.drawImage(c,sx,sy,sw,sh,0,0,out.width,out.height);return CARD[ck]=out.toDataURL('image/jpeg',.9)})().catch(e=>{(window.ERRS=window.ERRS||[]).push('styFace '+(e&&e.message||e));return ''}).finally(()=>CARDQ.delete(ck));CARDQ.set(ck,p);return p}

// v216 (Sara 16:55 "את הפרצוף שלי עם איזה איפור שאני רוצה, אבל אני רוצה את זה עם פאה"): the same fit in every view, for every whole head (tie, hairstyle, her wig) –
// paint() lays the doll's face with the makeup on that head's face instead of the bare makeup layer (it doubled eyes and mouth on a hairstyle; on the wig there was no makeup at all)
const FCV=[[176,64,25,28],[163,63,25,27],[158,65,21,28],null,null,[205,58,10,18],[197,60,17,28],[181,58,24,28]],FITV=window.FITV216={},FMK={},DLUM={};   // the face per view (cut8 FACE)
async function fitV(hk,v,raw){const k=hk+'|'+v+'|'+(DYN[hk+(v+1)]||'')+(raw?'|raw':'');if(FITV[k])return FITV[k];const e=FCV[v];if(!e)return null;
 return FITV[k]=(async()=>{const A=document.createElement('canvas');if(!await paint(A,v,Object.assign(clone(DEF),{on:{},bg:'',head:hk,mk:'',tc:null,rawHead:raw?1:0})))return null;
  if(!DLUM[v])DLUM[v]=(async()=>{const D=document.createElement('canvas');return await paint(D,v,Object.assign(clone(DEF),{on:{},bg:'',head:'c',rawc:1,mk:'',tc:null}))?lumOf(D):null})();
  const D=await DLUM[v];if(!D)return null;return fitFace(D,lumOf(A),A.width,A.height,e[0],e[1]-2,Math.max(6,Math.round(e[2]*.78)),Math.round(e[3]*.86))})()}
// v217 (Sara 17:14 "איפה האיפור ... פאה ותסרוקת לא יושבת טוב, בעיקר פנים ופאה"): the head keeps ITS face (the doll's face pasted on a wig looked like another face);
// only the makeup is carried over: (doll with makeup − doll) inside the face oval, softened, moved onto that head's face by the fit
function mkDelta(mk,v){const k=mk+'|'+v+'|'+(DYN[mk+(v+1)]||'');if(FMK[k])return FMK[k];const e=FCV[v];
 return FMK[k]=(async()=>{const base=Object.assign(clone(DEF),{on:{},bg:'',head:'c',rawc:1,mk:'',tc:null}),D=document.createElement('canvas'),F=document.createElement('canvas');
  if(!await paint(D,v,base)||!await paint(F,v,Object.assign({},base,{mk,mkraw:1})))return null;   // mkraw: the makeup layer as GPT drew it (else it would wait for itself)
  const cx=e[0],cy=e[1]+2,rx=Math.max(5,e[2]-2),ry=Math.max(5,e[3]-2),x0=cx-rx,y0=cy-ry,w=2*rx+1,h=2*ry+1;
  const a=D.getContext('2d',{willReadFrequently:true}).getImageData(x0,y0,w,h).data,b=F.getContext('2d',{willReadFrequently:true}).getImageData(x0,y0,w,h).data;
  let d=new Float32Array(w*h*3);for(let y=0;y<h;y++)for(let x=0;x<w;x++){const q=((x-rx)/rx)**2+((y-ry)/ry)**2;if(q>1)continue;const m=q<.55?1:(1-q)/.45,i=y*w+x;for(let z=0;z<3;z++)d[i*3+z]=(b[i*4+z]-a[i*4+z])*m}
  {const mu=[0,0,0];let n=0;for(let i=0;i<w*h;i++){const m=Math.abs(d[i*3])+Math.abs(d[i*3+1])+Math.abs(d[i*3+2]);if(!m)continue;n++;for(let z=0;z<3;z++)mu[z]+=d[i*3+z]}   // v218 (Sara 17:28 "צל צהוב"): GPT warms the whole face a little – that tint is taken out
   for(let y=0;y<h;y++)for(let x=0;x<w;x++){const q=((x-rx)/rx)**2+((y-ry)/ry)**2;if(q>1)continue;const m=q<.55?1:(1-q)/.45,i=y*w+x;for(let z=0;z<3;z++)d[i*3+z]-=mu[z]/Math.max(1,n)*m}}
  // v221 (Sara 18:39 "האיפור נמרח, אתה צריך יותר לדייק"): one light smoothing pass instead of two, and the 1.7× boost only for faint makeup (strong lipstick stays as drawn)
  {const o=new Float32Array(d.length);for(let y=0;y<h;y++)for(let x=0;x<w;x++)for(let z=0;z<3;z++){let t=0,n=0;for(let yy=Math.max(0,y-1);yy<=Math.min(h-1,y+1);yy++)for(let xx=Math.max(0,x-1);xx<=Math.min(w-1,x+1);xx++){const c=yy==y&&xx==x?4:1;t+=d[(yy*w+xx)*3+z]*c;n+=c}o[(y*w+x)*3+z]=t/n}d=o}
  const g=new Float32Array(w*h),fm=new Uint8Array(w*h);for(let i=0;i<w*h;i++){const k=i*3,mg=Math.hypot(d[k],d[k+1],d[k+2]),gn=1+.7*40/(40+mg);for(let z=0;z<3;z++)d[k+z]*=gn;g[i]=a[i*4]*.299+a[i*4+1]*.587+a[i*4+2]*.114;if(mg>18)fm[i]=1}
  // the features the makeup changes most (lips, each eye): each is placed again on its own, a few px, onto the same feature of the head (eyes and mouth of a GPT head sit a little differently)
  const lab=new Int32Array(w*h),FT=[];let nl=0;for(let i=0;i<w*h;i++){if(!fm[i]||lab[i])continue;const st=[i];lab[i]=++nl;let x0=w,y0=h,x1=0,y1=0,n=0;
   while(st.length){const q=st.pop(),qx=q%w,qy=(q-qx)/w;n++;if(qx<x0)x0=qx;if(qx>x1)x1=qx;if(qy<y0)y0=qy;if(qy>y1)y1=qy;
    for(let yy=Math.max(0,qy-2);yy<=Math.min(h-1,qy+2);yy++)for(let xx=Math.max(0,qx-2);xx<=Math.min(w-1,qx+2);xx++){const r=yy*w+xx;if(fm[r]&&!lab[r]){lab[r]=nl;st.push(r)}}}
   if(n>=6&&(x1-x0)*(y1-y0)<w*h*.2)FT.push({x0:Math.max(0,x0-3),y0:Math.max(0,y0-3),x1:Math.min(w-1,x1+3),y1:Math.min(h-1,y1+3)})}
  const fid=new Int16Array(w*h).fill(-1);FT.forEach((f,n)=>{for(let y=f.y0;y<=f.y1;y++)for(let x=f.x0;x<=f.x1;x++)if(fid[y*w+x]<0)fid[y*w+x]=n});
  return {x0,y0,w,h,d,g,F:FT,fid}})()}
// v217 (Sara 17:17 "הראש לא יושב במקום"): her wig and the hairstyles are GPT drawings of the whole head – a little smaller, turned ~6° and moved.
// Toward her (front, half-turns) each is turned back upright and moved so its face lands on the doll's face; the size stays (one size in all views).
// From the side and the back the face can't be found, so those stay. Ties sat right (0.98, 1°) and stay as they are.
const HT={};
function headT(hk){if(!(hk=='w'||/^yh/.test(hk||'')&&STY[hk]))return Promise.resolve(null);const k=hk+'|'+(DYN[hk+'1']||'');if(HT[k])return HT[k];
 return HT[k]=(async()=>{const T=[];for(let v=0;v<8;v++){const f=[0,1,7].includes(v)?await fitV(hk,v,true):null,e=FCV[v];
   T.push(f&&f[4]>=.6&&Math.abs(f[0])<=8&&Math.abs(f[1])<=8?{cx:e[0],cy:e[1]-2,dx:f[0],dy:f[1],s:1,t:f[3]}:null)}return T})()}
function drawHead(c,m,T){c.save();c.translate(T.cx,T.cy);c.scale(1/T.s,1/T.s);c.rotate(-T.t*Math.PI/180);c.translate(-(T.cx+T.dx),-(T.cy+T.dy));c.drawImage(m,0,0);c.restore()}
async function mkFit(c,v,hk,mk,pt,ident){const e=FCV[v];if(!e||![0,1,7].includes(v)||!DYN[mk+(v+1)])return;try{const [f,M]=await Promise.all([ident?[0,0,1,0,1]:fitV(hk,v),mkDelta(mk,v)]);if(!f||!M||f[4]<.6)return;   // the face toward her: front and half-turns
 const [dx,dy,sc,t]=f,cx=e[0],cy=e[1]-2,co=Math.cos(t*Math.PI/180),si=Math.sin(t*Math.PI/180),R=Math.ceil(Math.max(M.w,M.h)*sc*.8)+8,X0=Math.max(0,Math.round(cx+dx-R)),Y0=Math.max(0,Math.round(cy+dy-R)),W2=Math.min(c.canvas.width-X0,2*R),H2=Math.min(c.canvas.height-(pt||0)-Y0,2*R);
 const id=c.getImageData(X0,Y0+(pt||0),W2,H2),p=id.data,P=new Uint8ClampedArray(p);
 const fwd=(sx,sy)=>{const a=(sx+M.x0-cx)*sc,b=(sy+M.y0-cy)*sc;return [cx+dx+co*a-si*b-X0,cy+dy+si*a+co*b-Y0]},   // a doll pixel of the delta → this canvas
  inv=(X,Y)=>{const ux=X0+X-(cx+dx),uy=Y0+Y-(cy+dy);return [Math.round(cx+(co*ux+si*uy)/sc)-M.x0,Math.round(cy+(-si*ux+co*uy)/sc)-M.y0]},
  lu=(x,y)=>{x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=W2||y>=H2)return NaN;const k=(y*W2+x)*4;return P[k+3]?P[k]*.299+P[k+1]*.587+P[k+2]*.114:NaN};
 const sh=M.F.map(fe=>{let best=[0,0],bs=-2,s0=-2;for(let oy=-4;oy<=4;oy++)for(let ox=-4;ox<=4;ox++){let n=0,sa=0,sb=0,saa=0,sbb=0,sab=0;   // v221: each feature finds its own spot (±4 px)
   for(let y=fe.y0;y<=fe.y1;y++)for(let x=fe.x0;x<=fe.x1;x++){const [X,Y]=fwd(x,y),B=lu(X+ox,Y+oy);if(isNaN(B))continue;const A=M.g[y*M.w+x];n++;sa+=A;sb+=B;saa+=A*A;sbb+=B*B;sab+=A*B}
   if(n<12)continue;const va=saa-sa*sa/n,vb=sbb-sb*sb/n;if(va<n*30||vb<n*10)continue;const r=(sab-sa*sb/n)/Math.sqrt(va*vb)-.004*(ox*ox+oy*oy);if(!ox&&!oy)s0=r;if(r>bs){bs=r;best=[ox,oy]}}
  return bs>.5&&bs>s0+.02?best:[0,0]});
 const src=(x,y)=>{let [sx,sy]=inv(x,y);if(sx<0||sy<0||sx>=M.w||sy>=M.h)return -1;const fi=M.fid[sy*M.w+sx];if(fi>=0&&(sh[fi][0]||sh[fi][1])){[sx,sy]=inv(x-sh[fi][0],y-sh[fi][1]);if(sx<0||sy<0||sx>=M.w||sy>=M.h)return -1}return sy*M.w+sx};
 // where the head differs from the doll under the makeup (her teeth where the doll has lips, skin beside a narrower mouth) the colour is laid on lighter
 let ta=0,tb=0,tn=0;for(let y=0;y<H2;y++)for(let x=0;x<W2;x++){const k=(y*W2+x)*4;if(!P[k+3])continue;const q=src(x,y);if(q<0)continue;ta+=M.g[q];tb+=P[k]*.299+P[k+1]*.587+P[k+2]*.114;tn++}const off=tn?(tb-ta)/tn:0;
 for(let y=0;y<H2;y++)for(let x=0;x<W2;x++){const k=(y*W2+x)*4;if(!p[k+3])continue;const q=src(x,y);if(q<0)continue;
  const B=P[k]*.299+P[k+1]*.587+P[k+2]*.114,wt=Math.max(.3,Math.min(1,1.6-Math.abs(B-off-M.g[q])/40)),j=q*3;for(let z=0;z<3;z++)p[k+z]=Math.max(0,Math.min(255,p[k+z]+M.d[j+z]*wt))}
 c.putImageData(id,X0,Y0+(pt||0));(window.MKS221=window.MKS221||{})[hk+'|'+mk+'|'+v]=sh}catch(err){(window.ERRS=window.ERRS||[]).push('mkFit '+(err&&err.message||err))}}

// v204 (Sara 11:46 "אני אגע בתמונה ואז הבובה תסתובב"): the 8 angles one by one, head to waist, for a library card that turns
const FRM={},FRQ=new Map();
function styFrames(k,o){o=o||{};const st=STY[k];if(!st)return Promise.resolve([]);
 const hk=st.set=='mk'?hairHead():k;   // v216: a makeup turns with her wig
 return frames8(k+'|'+(o.rgb?o.rgb.join(','):'')+(st.set=='mk'?'|'+hk:''),Object.assign(clone(DEF),{on:{},bg:'',head:hk,mk:st.set=='mk'?k:'',tc:st.set=='tie'?(o.rgb||GREY):null}))}
// v212 (Sara 15:21 "אני רוצה שהאווטאר יעלה לי כאן 360 מעלות, יסתובב במעבר לעכבר"): the doll alone with a head (c = cover, w = her wig) – the ties/hairstyles/makeup tiles
function headFrames(h){return frames8('#'+h,Object.assign(clone(DEF),{on:{},bg:'',head:h,mk:'',tc:null}))}
function frames8(ck,s){if(FRM[ck])return Promise.resolve(FRM[ck]);if(FRQ.has(ck))return FRQ.get(ck);
 const p=(async()=>{const out=[];
  for(let v=0;v<8;v++){const c=document.createElement('canvas');if(!await paint(c,v,s))return [];const f=document.createElement('canvas');f.width=176;f.height=240;f.getContext('2d').drawImage(c,70,0,220,300,0,0,176,240);out.push(f.toDataURL('image/jpeg',.84))}
  return FRM[ck]=out})().catch(()=>[]).finally(()=>FRQ.delete(ck));FRQ.set(ck,p);return p}

// ---------- images ----------
const IMG={},TINT={};
// v230 (Sara 00:19 "לפעמים הראש חתוך, לפעמים אני רק עם הבגד גוף ולפעמים לבושה כשזה מסתובב"): on the phone a picture sometimes fails to load, and a failed
// picture was kept as failed for good – that layer never came back (the bare doll, a head-less doll). Now at most 6 load at once, each is tried 3 times,
// a failure is forgotten (the next paint tries again), and a stage that missed a layer paints itself again a moment later
const IMQ=[];let IMN=0;
function imPump(){while(IMN<6&&IMQ.length){const [u,r]=IMQ.shift();IMN++;const i=new Image();i.decoding='async';const done=x=>{IMN--;r(x);imPump()};i.onload=()=>done(i);i.onerror=()=>done(null);i.src=u}}
const imLoad=u=>new Promise(r=>{IMQ.push([u,r]);imPump()});
// v284 (Sara 28/10 10:19 "השיער חתוך על הפנים, לא טוב"): the wig, her hairstyles and the whole-head ties bring their own face, cut straight across
// under the chin – a hard line with the doll's neck in another shade below it. The last rows of skin above that straight cut now fade out into the neck
function chinFade(m){try{const W=m.naturalWidth,H=m.naturalHeight,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(m,0,0);
 const d=x.getImageData(0,0,W,H),p=d.data,K=4,skin=i=>{const r=p[i],g=p[i+1],b=p[i+2];return (r+g+b)/3>100&&r>g&&g>=b&&r-b>25},
  neck=i=>{const r=p[i],g=p[i+1],b=p[i+2];return (r+g+b)/3>138&&r>g&&g>=b&&r-b>35&&g>.6*r};let n=0;
 for(let y=K;y<H-8;y++){let run=[];for(let x0=0;x0<=W;x0++){const i=(y*W+x0)*4,ok=x0<W&&p[i+3]>200&&p[i+8*W+3]<60&&skin(i);if(ok){run.push(x0);continue}
  if(run.length>=8){n++;const a=run[0],z=run[run.length-1];
   for(const xx of run)for(let t=0;t<K;t++){const j=((y-t)*W+xx)*4;if(p[j+3]<120||!skin(j))break;p[j+3]=Math.round(p[j+3]*(.15+.85*t/K))}
   // and under the chin a soft shadow on her neck, as in a photo (the doll's neck under the wig's chin was light, so the face looked pasted on)
   const cx=(a+z)/2,hw2=(z-a)/2+6;if(z-a>=14)for(let t=1;t<=12;t++){const yy=y+t;if(yy>=H)break;const half=hw2*(1-t/16);for(let xx=Math.round(cx-half);xx<=Math.round(cx+half);xx++){if(xx<0||xx>=W)continue;const j=(yy*W+xx)*4;if(p[j+3]>40)continue;
     const e=Math.min(1,(half-Math.abs(xx-cx))/7),al=.24*Math.min(1,t/3)*(1-t/13)*e;p[j]=96;p[j+1]=58;p[j+2]=42;p[j+3]=Math.round(255*al)}}
   // beside that cut GPT's own neck goes on down (lighter, with a straight side): the neck comes from the doll, so it goes, fading in from the cut
   for(let yy=y-2;yy<Math.min(H,y+60);yy++)for(let xx=Math.max(0,a-30);xx<=Math.min(W-1,z+30);xx++){if(xx>=a&&xx<=z&&yy<=y)continue;const j=(yy*W+xx)*4;if(p[j+3]&&neck(j))p[j+3]=Math.round(p[j+3]*Math.max(0,Math.min(1,(y+1-yy)/4)))}}
  run=[]}}
 if(!n)return m;x.putImageData(d,0,0);c.naturalWidth=W;c.naturalHeight=H;c.src=(m.src||'')+'#chin';return c}catch(_){return m}}
// v288: "hair behind the shoulders" = her wig with the hair taken away wherever her body is (the hair falls behind the neck and shoulders).
// The old wb*.webp layers were cut for the first wig and ended in a straight line above the shoulders – Sara 28/10 15:10 "עושה לי שיער באוויר".
async function hairBack(n){const w=await im('w'+n),b=await im('ch'+n);if(!w||!b)return w;try{
 const W=w.naturalWidth||w.width,H=w.naturalHeight||w.height,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 x.drawImage(w,0,0);x.globalCompositeOperation='destination-out';x.filter='blur(1.2px)';x.drawImage(b,0,0);x.filter='none';x.globalCompositeOperation='source-over';
 const i=new Image();i.src=c.toDataURL('image/png');await i.decode();return i}catch(e){(window.ERRS=window.ERRS||[]).push('v288 hairBack: '+(e&&e.message||e));return w}}
function im(src){if(/^wbx\d$/.test(src)){if(!IMG[src])IMG[src]=hairBack(src.slice(3));return IMG[src]}
 if(!IMG[src])IMG[src]=(async()=>{for(let n=0;n<3;n++){if(n)await new Promise(z=>setTimeout(z,500*n*n));const i=await imLoad(DYN[src]||('a8/'+src+'.webp'+V));if(i)return /^(w|yh\w+|yt\w+)\d$/.test(src)?chinFade(i):i}
  delete IMG[src];(window.ERRS=window.ERRS||[]).push('v230 img: '+src);return null})();return IMG[src]}
// a base shirt under lace: the arm's own light and shade, in the shirt's colour
function tinted(m,rgb,ref){const key=m.src+'|'+rgb;if(TINT[key])return TINT[key];
 const c=document.createElement('canvas');c.width=m.naturalWidth;c.height=m.naturalHeight;const x=c.getContext('2d');x.drawImage(m,0,0);
 const d=x.getImageData(0,0,c.width,c.height),p=d.data,[R,G,B]=rgb;
 for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;const k=(.299*p[i]+.587*p[i+1]+.114*p[i+2])/ref;
  if(k<=1){p[i]=R*k;p[i+1]=G*k;p[i+2]=B*k}else{const h=(k-1)*.6;p[i]=R+(255-R)*h;p[i+1]=G+(255-G)*h;p[i+2]=B+(255-B)*h}}
 x.putImageData(d,0,0);return TINT[key]=c}
// v204 (Sara 11:46 "אני רוצה גופייה שיש לי ... ולשים אותה מתחת לשמלה"): one of her own tanks ('i:'+id) – its colour, read from the item
const CAMC={};
const camOf=k=>{if(k&&/^i:/.test(k)){const id=k.slice(2);if(CAMC[id])return CAMC[id];if(!CAMC['_'+id]&&D[id]){CAMC['_'+id]=1;itemRGB(id).then(c=>{CAMC[id]=c||[24,24,26];redraw()}).catch(()=>{})}return [24,24,26]}
 const c=CAM.find(c=>c.k==(k==null?'black':k));return c?c.c:null};
const TANKS=()=>Object.keys(D).filter(id=>/גופי|קמיסול|camisole/i.test(((D[id]||{}).short||'')+' '+((D[id]||{}).full||''))&&!['makeup','boys','men','girls','outer'].includes(cat(id))&&!itOf(id).gen&&!itOf(id).oos);
function paintCam(){const sw=dlg&&dlg.querySelector('.r3cam .r3sw');if(!sw)return;const T=TANKS();
 sw.innerHTML=T.map(id=>`<button type="button" role="radio" class="r3tank" data-r3cam="i:${esc(id)}" aria-label="${esc(nm(id))}"><img alt="" data-th="${esc(id)}" src="${esc(ph(id))}"><span>${esc(nm(id).split(' ').slice(0,3).join(' '))}</span></button>`).join('')
  +CAM.map(c=>`<button type="button" role="radio" data-r3cam="${c.k}" aria-label="${c.n}"><i style="background:${c.c?`rgb(${c.c})`:'linear-gradient(135deg,#e9c3a6,#c99476)'}"></i><span>${c.n}</span></button>`).join('');thl(T)}
const ORDER=['shoes','base','body','bottom','top','outer','belt','coat','wrist','bag','neck'];   // what covers what, from the floor up (tucked: the top under the skirt)
function layersFor(v,s){const on=s.on||{},L=[];const x=k=>({s:'x'+k+(v+1),k});const of=sl=>Object.keys(SLOT).filter(k=>on[k]&&SL(k)==sl);
 // v274 (Sara 23:35–23:36 "אפשרות להכניס סוודר בתוך החצאית", "גם החולצות נעלם האופציה"): with a skirt and no dress, a top, a base shirt and a sweater
 // all go into the skirt when she ticks it (drawn under the skirt, and what would stick out below its waist is taken off in paint()); not ticked, all are over the skirt
 const swk=k=>SL(k)=='outer'&&(PK[k]=='sweater'||(!PK[k]&&KEYOF[k]&&kindOf(KEYOF[k])=='sweater'));
 const skirt=of('bottom').length&&!of('body').length,tin=skirt&&s.tuck;let ord=ORDER;
 if(skirt){const IN=['base','top','sweater'];ord=ORDER.filter(o=>o!='base'&&o!='top');ord.splice(ord.indexOf(tin?'body':'bottom')+(tin?0:1),0,...IN)}
 const of0=of;const ofs=sl=>sl=='sweater'?of0('outer').filter(swk):sl=='outer'&&skirt?of0('outer').filter(k=>!swk(k)):of0(sl);
 if(s.under){ord=ord.filter(o=>o!='top');ord.splice(ord.indexOf('body'),0,'top')}   // v255 (Sara 18:58 "איך אני שמה גופיית בסיס לשמלה"): any top worn under the dress
 const bs=of('base').length;   // v210: her base shirt under a lace dress shows through the lace, instead of the plain colour
 const TK=tin?['base','top','sweater']:[];
 ord.forEach(sl=>{if(sl=='body'&&!bs)Object.keys(LACE).forEach(k=>{if(on[k])L.push({s:'x'+k+'u'+(v+1),t:camOf(s.cam),ref:LACE[k]})});ofs(sl).forEach(k=>L.push(TK.includes(sl)?Object.assign(x(k),{tk:1}):sl=='bottom'?Object.assign(x(k),{bt:1}):x(k)))});
 // v255 (Sara 27/10 18:58 "בשמלות ארוכות אתה עולה על הנעליים"): a long dress or skirt was cut from GPT's sheet together with the doll's beige flats under its hem,
 // so it covered the shoes she chose. The shoes are drawn once more over the dress, skirt and coat (the shoe layer is only the shoe, at the floor)
 const shs=of('shoes');if(shs.length&&(of('body').length||of('bottom').length||of('coat').length))shs.forEach(k=>L.push(x(k)));
 const st=STY[s.head],z=st&&'z'+s.head.slice(1)+(v+1);
 const head=s.head=='w'?[{s:(s.wb&&WB[v]?'wbx':'w')+(v+1),hd:1}]:st?[DYN[s.head+(v+1)]&&{s:s.head+(v+1),hd:1},st.set=='tie'&&DYN[z]&&{s:z,t:s.tc||GREY,ref:st.lum}].filter(Boolean):(s.head&&s.head!='c')?[x(s.head)]:[];
 // v199 makeup: over a whole head (tie, hairstyle) right after it; with a cover under everything (a cover item is drawn over it). Her first wig is another drawing of the face: no makeup on it
 const mk=s.mk&&STY[s.mk]&&DYN[s.mk+(v+1)]?{s:s.mk+(v+1)}:null;if(mk){if(st||whole(s.head))L.fit=s.mk;else if([0,1,7].includes(v)&&!s.mkraw){L.fit=s.mk;L.fitId=1}else L.unshift(mk)}   // v226 (Sara 19:23 "רושם איפור 5 דקות, בבובה לא רואים"): a head-cover item made from a whole-head sheet (tiex) brings its own face – the makeup is fitted on it too;
   // on her own face (cover, scarf items) the front and half-turns get the same delta in place (fitId), so faint makeup is strengthened there as well   // v216: on a whole head paint() fits it (mkFit)
 const ears=of('ears').map(x);
 if(BACK[v]||s.head=='w'||(st&&st.set=='hair'))L.push(...ears,...head);else L.push(...head,...ears);
 return L}
// ---------- backgrounds (v182): the doll cut out of the blue photo backdrop (a8/c1-8.webp) stands on any background ----------
const FX=[176,167,162,170,182,194,201,189],FY=524;   // feet centre per view, measured on c1-8
const PLAIN=[['white','לבן','#ffffff','#ebe7e2'],['cream','שמנת','#fcf7ef','#e8d9c3'],['blush','ורוד','#fdf0ef','#ecc9c8'],['sage','מרווה','#f2f5ec','#c9d6bc'],['sky','תכלת','#f1f7fc','#c3d7ea'],['stone','אפור','#f0eeeb','#c6c0b8'],['dark','כהה','#4a4244','#1d191a']];
const SCENES=[["garden","גן ורדים"],["jlm","אבן ירושלמית"],["beach","חוף בשקיעה"],["hall","אולם אירועים"],["paris","רחוב בפריז"],["autumn","פארק בסתיו"],["blossom","פריחת דובדבן"],["marble","שיש לבן וזהב"],["floral","טפט פרחים"],["lavender","שדה לבנדר"],["library","ספרייה"],["night","עיר בלילה"],["winter","שלג בחורף"],["desert","מדבר"],["olive","מטע זיתים"],["parch","קשת פסטל"],["bokeh","אורות זהב"],["water","צבעי מים"],["room","חדר מואר"],["cafe","בית קפה"],["lake","אגם והרים"],["sunset","שמיים בשקיעה"],["boutique","בוטיק"],["flowerwall","קיר פרחים"]];
function bgList(){const L=[{k:'',n:'המקורי',css:'linear-gradient(#a7bedf,#c9d7ee)'}];
 PLAIN.forEach(([k,n,a,b])=>L.push({k,n,g:[a,b],css:`linear-gradient(${a},${b})`}));
 SCENES.forEach(([k,n])=>L.push({k:'s_'+k,n,u:'bg/'+k+'.svg',css:`url("bg/${k}.svg${V}") center bottom/cover`}));
 let own=[];try{own=(typeof SET=='object'&&SET&&SET.bgx)||[]}catch(_){}   // the backgrounds she wrote or uploaded in the old studio
 own.forEach(x=>{if(x&&x.k&&x.u)L.push({k:x.k,n:x.n||'שלי',u:x.u,css:`url("${x.u}") center/cover`})});
 BGU.forEach(x=>L.push({k:x.k,n:x.n,u:x.u,mine:1,css:`url("${x.u}") center/cover`}));
 return L}
// v204 (Sara 11:46 "הרקעים אני ממש ממש לא אוהבת. תן לי ... ליצור רקע עם פרומפט ... ואז אפשרות להעלות את הרקע"): the row shows the original, hers, ＋ new, then plain colours (the drawn scenes are gone from it)
function paintBgs(){const bgs=dlg&&dlg.querySelector('.r3bgs');if(!bgs)return;const L=bgList().filter(b=>!/^s_/.test(b.k));
 const b1=b=>`<button type="button" role="radio" data-bg="${esc(b.k)}" aria-label="רקע: ${esc(b.n)}" aria-checked="${(ST.bg||'')==b.k}"><i style='background:${b.css}'></i><span>${esc(b.n)}</span></button>`;
 bgs.innerHTML=L.filter(b=>!b.g).map(b1).join('')+`<button type="button" class="r3bgnew" data-bgnew><i aria-hidden="true">＋</i><span>רקע חדש</span></button>`+L.filter(b=>b.g).map(b1).join('')}
const BGI=[['סטודיו שמנת','סטודיו צילום בגוון שמנת חם, קיר חלק שמתעגל אל הרצפה, אור רך מחלון גדול'],['קשת וצמחייה','קיר לבן עם קשת אבן גדולה, עציצי זית וצמחייה ירוקה בצדדים, רצפת אבן בהירה'],
 ['אבן ירושלמית','סמטה מרוצפת באבן ירושלמית זהובה, אור שמש רך של אחר הצהריים'],['גן ורדים','שביל בגן ורדים אירופאי, ורדים ורודים ולבנים, ירוק רך'],['לובי מלון','לובי של מלון יוקרתי בגווני לבן, שמנת וזהב, רצפת שיש, נברשת רכה'],
 ['אולם לבן','אולם אירועים לבן ואלגנטי עם פרחים לבנים ונרות, אור חם'],['חוף בשקיעה','חוף ים רגוע בשעת הזהב, חול בהיר, ים ושמיים בצבעי פסטל'],['רחוב בפריז','רחוב קטן בפריז בבוקר, בתי קפה וחלונות עם פרחים'],
 ['שדרת סתיו','שדרה בפארק בסתיו, עלים כתומים וזהובים על השביל'],['סלון בוהו','סלון בהיר בסגנון בוהו: פשתן, עץ טבעי, צמחים יבשים, אור חלון רך']];
const bgPrompt=x=>`צרי תמונה של רקע לצילום אופנה. התמונה לאורך, ביחס 2:3 (למשל 1024 על 1536).\n\nהמקום: ${x}.\n\nבלי אנשים, בלי טקסט ובלי לוגו. מצלמה בגובה העיניים, ישר קדימה. הרצפה או הקרקע ממלאת בערך את הרבע התחתון של התמונה, כדי שאפשר להעמיד עליה אישה בגובה מלא. המרכז פנוי: בלי חפצים, רהיטים או צמחים באמצע. הרקע מעט מטושטש (עומק שדה רדוד), אור רך וחמים, צבעים עדינים ואלגנטיים, כמו צילום מקצועי.`;
let BGN='';
function bgDlg(){if(!BGD){BGD=document.createElement('dialog');BGD.id='bg204';BGD.dir='rtl';BGD.setAttribute('aria-labelledby','bg204t');document.body.appendChild(BGD);
  BGD.addEventListener('cancel',e=>{e.preventDefault();BGD.close()});BGD.addEventListener('click',bgClick)}
 const fr=BGD.querySelector('.bgfree'),fv=fr?fr.value:'';
 BGD.innerHTML=`<div class="mk"><div class="mkh"><h3 id="bg204t">🖼 רקע חדש</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <ol class="bgs1"><li><b>בוחרים רעיון</b> (הפרומפט מועתק), או כותבים מה רוצים.<div class="bgi">${BGI.map(([n],i)=>`<button type="button" data-bgi="${i}">📋 ${esc(n)}</button>`).join('')}</div>
   <label class="bgfl">משלי <input class="bgfree" maxlength="120" placeholder="למשל: מרפסת עם נוף לים" value="${esc(fv)}"><button type="button" data-bgi="free">📋 להעתיק</button></label></li>
   <li><b>ב-GPT, בשיחה חדשה:</b> מדביקים ושולחים (בלי תמונה).</li>
   <li><b>מעלים את התמונה שחזרה.</b> היא נכנסת לרקעים, ואני מעמידה אותך עליה.<div class="bgi"><button type="button" class="mkp" data-bgup>📤 להעלות רקע</button></div></li></ol>
  ${BGU.length?`<h4>הרקעים שלי</h4><div class="bgmine">${BGU.map(b=>`<span><button type="button" class="bgpick" data-bgpick="${esc(b.k)}" aria-label="ללבוש את הרקע ${esc(b.n)}" style="background:url('${esc(b.u)}') center/cover"></button><small>${esc(b.n)}</small><button type="button" class="bgdel" data-bgdel="${esc(b.id)}" aria-label="למחוק את הרקע ${esc(b.n)}">🗑</button></span>`).join('')}</div>`:''}</div>`;
 if(!BGD.open)BGD.showModal()}
async function bgCopy(b,text){let ok=false;try{await navigator.clipboard.writeText(text);ok=true}catch(_){}
 if(!ok){try{const t=document.createElement('textarea');t.value=text;t.setAttribute('readonly','');t.style.cssText='position:fixed;opacity:0';BGD.appendChild(t);t.select();ok=document.execCommand('copy');t.remove()}catch(_){}}
 const o=b.textContent;b.textContent=ok?'✓ הועתק – עכשיו ל-GPT':'לא הצלחתי להעתיק';setTimeout(()=>{if(b.isConnected)b.textContent=o},2400)}
let BGF=null;
async function bgUp(f){let a=null;try{a=await claude.use('assets')}catch(_){}if(!a||!DB){toast_('השמירה לא זמינה כאן. לפתוח את האתר ב-Chrome');return}
 toast_('שומרת את הרקע…');try{const url=URL.createObjectURL(f);const m=await new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src=url});
  const s=Math.min(1,720/m.naturalWidth,1200/m.naturalHeight),c=document.createElement('canvas');c.width=Math.round(m.naturalWidth*s);c.height=Math.round(m.naturalHeight*s);c.getContext('2d').drawImage(m,0,0,c.width,c.height);URL.revokeObjectURL(url);
  const bl=await new Promise(r=>c.toBlob(r,'image/jpeg',.88));const src=(await a.upload(bl)).id,id='b'+Date.now().toString(36);
  await DB.collection('bgs').doc(id).set({src,n:BGN||'רקע שלי',t:Date.now()});BGU=[{k:'u_'+id,id,n:BGN||'רקע שלי',u:'/_blob/'+src,t:Date.now()},...BGU.filter(x=>x.id!=id)];
  ST.bg='u_'+id;keep();paintBgs();redraw();if(BGD&&BGD.open)BGD.close();toast_('✓ הרקע באתר ועלייך')}catch(e){toast_('לא הצלחתי. לנסות שוב')}}
function bgClick(e){if(e.target===BGD)return BGD.close();const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(b.classList.contains('mkx'))return BGD.close();
 if(d.bgi!=null){if(d.bgi=='free'){const v=(BGD.querySelector('.bgfree')||{}).value||'';if(!v.trim())return toast_('כותבים קודם מה רוצים ברקע');BGN=v.trim().slice(0,24);return bgCopy(b,bgPrompt(v.trim()))}const x=BGI[+d.bgi];if(x){BGN=x[0];bgCopy(b,bgPrompt(x[1]))}return}
 if(d.bgup!=null){if(!BGF){BGF=document.createElement('input');BGF.type='file';BGF.accept='image/*';BGF.hidden=true;document.body.appendChild(BGF);BGF.addEventListener('change',()=>{const f=BGF.files[0];BGF.value='';if(f)bgUp(f)})}BGF.click();return}
 if(d.bgpick){ST.bg=d.bgpick;keep();paintBgs();redraw();BGD.close();return}
 if(d.bgdel){if(typeof sure=='function'&&!sure(b,'בטוח? לחצי שוב'))return;const id=d.bgdel;DB&&DB.collection('bgs').doc(id).delete().catch(()=>{});BGU=BGU.filter(x=>x.id!=id);if(ST.bg=='u_'+id){ST.bg='';keep();redraw()}paintBgs();bgDlg()}}
const BGC={};
// one 420×700 picture per background; the scenes are 600×1000 with their floor shadow at y=878 → (210,615) here, put under her feet
function bgCanvas(k){if(BGC[k])return BGC[k];const b=bgList().find(x=>x.k==k);if(!b)return Promise.resolve(null);
 return BGC[k]=(async()=>{const W=420,H=700,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  if(b.g){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,b.g[0]);g.addColorStop(.86,b.g[1]);g.addColorStop(1,b.g[1]);x.fillStyle=g;x.fillRect(0,0,W,H);
   const f=x.createRadialGradient(W/2,615,8,W/2,615,W*.62);f.addColorStop(0,k=='dark'?'rgba(255,255,255,.12)':'rgba(255,255,255,.5)');f.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=f;x.fillRect(0,0,W,H);return c}
  let u=b.u,tmp=null;
  try{if(/\.svg$/.test(u)){const s=await (await fetch(u+V)).text();tmp=URL.createObjectURL(new Blob([s.replace('<svg ','<svg width="600" height="1000" ')],{type:'image/svg+xml'}));u=tmp}}catch(_){}
  const i=await new Promise(r=>{const m=new Image();m.onload=()=>r(m);m.onerror=()=>r(null);m.src=u});if(tmp)setTimeout(()=>URL.revokeObjectURL(tmp),2000);
  if(!i||!i.naturalWidth){delete BGC[k];return null}
  const s=Math.max(W/i.naturalWidth,H/i.naturalHeight),w=i.naturalWidth*s,h=i.naturalHeight*s;x.drawImage(i,(W-w)/2,H-h,w,h);return c})()}
// v204 (Sara 11:46 "עוד סנטימטר אחד יותר לגובה ואחד מתחת לרגליים, כי היום זה ממש צמוד לרגליים"): the stages get room above the head and under the feet –
// the photo's top and bottom rows are stretched into it (the backdrop is smooth there), a background simply reaches further
const PT=50,PB=46;
// the photo's last 2–4 rows are lighter (its edge) and the floor under the feet has a shadow: the bottom pad is the floor's two sides, faded in over the last rows
const FP=new WeakMap();
function floorPad(b){let t=FP.get(b);if(t)return t;t=document.createElement('canvas');t.width=2;t.height=1;const x=t.getContext('2d'),W=b.naturalWidth,H=b.naturalHeight,w=Math.round(W*.28);
 x.imageSmoothingQuality='high';x.drawImage(b,0,H-9,w,4,0,0,1,1);x.drawImage(b,W-w,H-9,w,4,1,0,1,1);FP.set(b,t);return t}
function again(cv,v,s,pad,my){clearTimeout(cv._rtT);const n=cv._rt=(cv._rt||0)+1;if(n<=5)cv._rtT=setTimeout(()=>{if(cv._pg===my)paint(cv,v,s,pad)},1200*n)}   // v230
async function paint(cv,v,s,pad){s=headOf(s);const bg=s.bg||'';const hw=whole(s.head)?'h':'';const my=cv._pg=(cv._pg||0)+1;   // v184: with the wig the doll's own head is taken away (nh/ch), the wig layer brings the whole head
 let base=await im((bg?'c':'n')+hw+(v+1));if(!base&&hw)base=await im((bg?'c':'n')+(v+1));if(!base&&bg)base=await im('n'+(v+1));if(!base){if(pad)again(cv,v,s,pad,my);return false}
 const L=layersFor(v,s);const [ms,bc]=await Promise.all([Promise.all(L.map(l=>im(l.s))),bg?bgCanvas(bg):null]);
 const pt=pad?PT:0,pb=pad?PB:0,BW=base.naturalWidth,BH=base.naturalHeight;
 // v223 (Sara 19:04 "הדמות יורדת מטושטשת"): since v216 paint() waits (head fit, makeup) in the middle of drawing; two paints of the same canvas at once
 // (the home avatar redraws when her styles and home look arrive) stacked their moves – the doll slid down and doubled. Now each paint draws aside and the newest one is copied in at the end
 const oc=document.createElement('canvas');oc.width=BW;oc.height=BH+pt+pb;const c=oc.getContext('2d',{willReadFrequently:true});
 const E=pb&&!bg?floorPad(base):null;
 if(pt||pb){if(!bg){c.drawImage(base,0,0,BW,2,0,0,BW,pt+1);if(E)c.drawImage(E,0,0,2,1,0,pt+BH-8,BW,pb+8)}c.save();c.translate(0,pt)}
 if(bg){if(bc)c.drawImage(bc,FX[v]-210,FY-615);else{c.fillStyle='#f6efe6';c.fillRect(0,-pt,oc.width,oc.height)}
  const g=c.createRadialGradient(FX[v],FY+3,2,FX[v],FY+3,52);g.addColorStop(0,'rgba(40,28,20,.30)');g.addColorStop(1,'rgba(40,28,20,0)');c.save();c.translate(FX[v],FY+3);c.scale(1,.16);c.translate(-FX[v],-FY-3);c.fillStyle=g;c.fillRect(FX[v]-60,FY-60,120,126);c.restore()}
 c.drawImage(base,0,0);if(E){for(let i=0;i<8;i++){c.globalAlpha=(i+1)/8;c.drawImage(E,0,0,2,1,0,BH-8+i,BW,1)}c.globalAlpha=1}
 if(hw&&!bg){const nk=await im('ch'+(v+1));if(nk)c.drawImage(nk,0,0)}   // v284: under a wig or hairstyle, her real neck (the no-head picture has a blurred stump there with a second chin shadow)
 const HTv=!s.rawHead&&hw?((await headT(s.head))||[])[v]:null;
 const BT=ms.filter((m,i)=>m&&L[i].bt),BTK=L.filter(l=>l.bt).map(l=>l.s).join(',');const doll=BT.length&&L.some(l=>l.tk)?await im('c'+(v+1)):null;
 ms.forEach((m,i)=>{if(!m)return;const l=L[i];if(l.tk&&BT.length)m=tuckCut(m,BT,doll,l.s+'|'+(m.src||'')+'|'+BTK+'|'+BT.map(b=>b.src||'').join(','));const im=l.t?tinted(m,l.t,l.ref):m;if(l.hd&&HTv)drawHead(c,im,HTv);else c.drawImage(im,0,l.k?JY(l.k):0)});if(L.fit)await mkFit(c,v,s.head,L.fit,pt,L.fitId);if(pt||pb)c.restore();
 const miss=ms.some(m=>!m);if(cv._pg!==my)return !miss;if(cv.width!=BW||cv.height!=BH+pt+pb){cv.width=BW;cv.height=BH+pt+pb}const g=cv.getContext('2d');g.clearRect(0,0,cv.width,cv.height);g.drawImage(oc,0,0);
 if(pad){if(miss)again(cv,v,s,pad,my);else cv._rt=0}return !miss}   // a layer missing: not kept as a finished picture (frames, thumbs), the stage tries again
// v274: a top, base shirt or sweater tucked into the skirt. Under the skirt it is hidden already; what is left is what sticks out below the skirt's waist –
// the hem at the hips (outside her body: the sweater stood out boxy in the side view) and below a short skirt. Her arms and sleeves at the sides stay
// v279: with no doll frame to tell body from sleeve, only the columns of the skirt itself are cut, so the sleeves at the sides stay
const TUCK=new Map();
function tuckCut(m,BT,doll,key){if(TUCK.has(key))return TUCK.get(key);const W=m.naturalWidth||m.width,H=m.naturalHeight||m.height;
 const rd=x=>{const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(x,0,0,W,H);return [c,g,g.getImageData(0,0,W,H)]};
 const [oc,og,od]=rd(m),p=od.data,sk=new Uint8Array(W*H);BT.forEach(b=>{const d=rd(b)[2].data;for(let i=0;i<W*H;i++)if(d[i*4+3]>100)sk[i]=1});
 const bd=new Uint8Array(W*H);if(doll){const d=rd(doll)[2].data;for(let i=0;i<W*H;i++)if(d[i*4+3]>100)bd[i]=1}
 const top=new Float32Array(W).fill(NaN),r0=Math.floor(H*.3),r1=Math.floor(H*.75);let lo=W,hi=-1;
 for(let x=0;x<W;x++)for(let y=r0;y<r1;y++)if(sk[y*W+x]){top[x]=y;if(x<lo)lo=x;if(x>hi)hi=x;break}
 if(hi<0){TUCK.set(key,m);return m}
 const ys=[...top].filter(y=>!isNaN(y)).sort((a,b)=>a-b),mid=ys[ys.length>>1];
 for(let x=0;x<W;x++)if(isNaN(top[x])){let a=x,b=x;while(a>=0&&isNaN(top[a]))a--;while(b<W&&isNaN(top[b]))b++;top[x]=a>=0&&b<W?Math.max(top[a],top[b]):a>=0?top[a]:b<W?top[b]:mid}
 // the skirt's lowest row in each column: below a short skirt the tucked top must not show over her legs either
 const bot=new Int32Array(W).fill(-1);for(let x=lo;x<=hi;x++)for(let y=H-1;y>=r0;y--)if(sk[y*W+x]){bot[x]=y;break}
 const bd2=new Uint8Array(W*H);for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){const i=y*W+x;if(bd[i]||bd[i-1]||bd[i+1]||bd[i-W]||bd[i+W]||bd[i-2]||bd[i+2])bd2[i]=1}
 let n=0;for(let x=0;x<W;x++){const t=Math.round(top[x])+3;for(let y=t;y<H;y++){const i=y*W+x,q=i*4;if(!p[q+3]||sk[i])continue;
  const below=x>=lo&&x<=hi&&bot[x]>=0&&y>bot[x];if(doll?(!bd2[i]||below):(x>=lo&&x<=hi)){p[q+3]=0;n++}}}
 if(n){og.putImageData(od,0,0)}const out=n?oc:m;if(TUCK.size>16)TUCK.delete(TUCK.keys().next().value);TUCK.set(key,out);return out}
const JYT={},JYN={neck:'📿 שרשרת',ears:'✨ עגילים',wrist:'⌚ צמיד',belt:'➰ חגורה'};
// v266 (Sara 23:34 "לא כל הזמן על המסך – עיגול קטן, פותחת, מזיזה, סוגרת"): the rows live in a small panel over the avatar, opened by 📿 and closed by ✓
let JYOPEN=false;
function paintJY(){if(!dlg)return;const W=[...dlg.querySelectorAll('.r3jy')],B=dlg.querySelector('.r3jyb');if(!W.length)return;const L=[];
 Object.keys(ST.on||{}).forEach(k=>{const id=KEYOF[k];if(!ST.on[k]||!id||!JYS.includes(SLOT[k])||L.some(x=>x[0]==id&&x[1]==SLOT[k]))return;L.push([id,SLOT[k]])});
 const H=L.length?'<b class="r3jyh">גובה התכשיט <small>מזיזים קצת למעלה או למטה, בכל הזוויות</small></b>'+L.map(([id,sl])=>{const v=jyOf(id,sl),a=`data-id="${esc(id)}" data-sl="${sl}"`;
  return `<div class="r3jyr"><span>${JYN[sl]} <small>${esc(nm(id).split(' ').slice(0,3).join(' '))}</small></span><button type="button" ${a} data-jy="-3" aria-label="להעלות">⬆ למעלה</button><button type="button" ${a} data-jy="3" aria-label="להוריד">⬇ למטה</button>${v?`<button type="button" ${a} data-jy="0" aria-label="למקום המקורי">↺</button>`:''}</div>`}).join(''):'';if(!L.length)JYOPEN=false;if(B){B.hidden=!L.length;B.setAttribute('aria-expanded',JYOPEN);B.classList.toggle('on',JYOPEN)}
 W.forEach(w=>{w.hidden=!L.length||!JYOPEN;w.innerHTML=H+(L.length?'<button type="button" class="r3jyx" data-jyx>✓ סיום</button>':'')})}
function wornIds(s){const ids=[];if(s.head&&KEYOF[s.head])ids.push(KEYOF[s.head]);if(/^yt/.test(s.head||'')&&s.tf){const t=KEYOF[s.tf]||(D[s.tf]?s.tf:'');if(t&&!ids.includes(t))ids.push(t)}Object.keys(s.on||{}).forEach(k=>{const id=KEYOF[k];if(s.on[k]&&id&&!ids.includes(id))ids.push(id)});return ids}
function wearing(s){const a=wornIds(s).map(nm);if(s.head=='w')a.unshift('הפאה');const n=k=>STY[k]&&STY[k].n;if(n(s.head))a.unshift(n(s.head));if(n(s.mk))a.push('איפור: '+n(s.mk));return a.join(' · ')}

// ---------- a turning stage (big in the studio, small on the home screen) ----------
function Stage(host,opt={}){
 const state=opt.state||(()=>ST);
 const el=document.createElement('div');el.className='r3s'+(opt.fade?' slow':'');el.tabIndex=0;el.setAttribute('role','img');
 const cvs=[...Array(8)].map((_,i)=>{const c=document.createElement('canvas');c.width=360;c.height=541+PT+PB;c.className=i?'':'on';el.appendChild(c);return c});
 host.appendChild(el);let cur=0,tm=null,sx=null,si=0,moved=false;
 const api={el,get view(){return cur},onview:null};
 function label(){el.setAttribute('aria-label',`האווטאר שלך מזווית ${NAMES[cur]}. ${wearing(state())?'לובשת: '+wearing(state())+'.':''} גוררים או חצים כדי לסובב.`)}
 api.show=i=>{cur=(i+8)%8;cvs.forEach((c,k)=>c.classList.toggle('on',k==cur));label();api.onview&&api.onview(cur)};
 api.draw=async()=>{const s=state();await Promise.all(cvs.map((c,v)=>paint(c,v,s,1)));label()};
 api.stop=()=>{if(tm){clearInterval(tm);tm=null;api.onplay&&api.onplay(false)}};
 api.play=(once)=>{api.stop();let n=0;tm=setInterval(()=>{api.show(cur+1);n++;if(once&&n>=8)api.stop()},opt.speed||170);api.onplay&&api.onplay(true)};
 api.playing=()=>!!tm;
 api.speed=ms=>{opt.speed=ms;el.style.setProperty('--r3f',Math.min(450,Math.round(ms*.6))+'ms');if(tm)api.play()};   // v185: the home spin speed she chooses
 el.addEventListener('pointerdown',e=>{api.stop();sx=e.clientX;si=cur;moved=false;try{el.setPointerCapture(e.pointerId)}catch(_){}});
 el.addEventListener('pointermove',e=>{if(sx==null)return;const step=Math.max(22,el.clientWidth/9);const d=Math.round((sx-e.clientX)/step);if(d)moved=true;api.show(si+d)});
 const end=()=>{sx=null};el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
 el.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault()}},true);
 el.addEventListener('keydown',e=>{if(e.key=='ArrowLeft'){api.stop();api.show(cur+1);e.preventDefault()}if(e.key=='ArrowRight'){api.stop();api.show(cur-1);e.preventDefault()}});
 api.draw();label();return api}
const STAGES=new Set();
async function redraw(){for(const s of STAGES){try{await s.draw()}catch(e){ERR('draw',e)}}paintRoom()}   // v267: one stage that fails no longer stops the others (the studio froze)

// ---------- wearing ----------
function wearItem(id){const r=READY[id];if(!r)return;
 if(r.head){ST.head=ST.head==r.k[0]?'c':r.k[0];return}
 const on=r.k.every(k=>ST.on[k]);
 r.k.forEach(k=>{if(on){ST.on[k]=0;return}ST.on[k]=1;clashOf(k).forEach(c=>ST.on[c]=0);Object.keys(ST.on).forEach(o=>{if(o!=k&&SLOT[o]&&SL(o)==SL(k))ST.on[o]=0})})}
function takeOff(id){const r=READY[id];if(!r)return;if(r.head){if(ST.head==r.k[0])ST.head='c';return}r.k.forEach(k=>ST.on[k]=0)}
function stateFrom(ids,base){const s=Object.assign(clone(DEF),base||{},{on:{}});
 ids.forEach(id=>{const r=READY[id];if(!r)return;if(r.head)s.head=r.k[0];else r.k.forEach(k=>{s.on[k]=1;clashOf(k).forEach(c=>{if(!ids.some(o=>READY[o]&&READY[o].k.includes(c)))s.on[c]=0})})});
 return s}

// ---------- the studio ----------
let dlg=null,big=null,TAB='closet',CAT='all',Q='',SHOWN=60,MISS=[],CMP=null;   // CMP = the looks picked to compare (null = not comparing)
function build(){
 dlg=document.createElement('dialog');dlg.id='r360';dlg.setAttribute('aria-label','הסטודיו');dlg.setAttribute('dir','rtl');
 dlg.innerHTML=`<div class="r3w">
 <header class="r3h"><button type="button" class="r3x" aria-label="סגירה">✕</button><div class="r3tt"><small>האווטאר שלך · 360°</small><h2>הסטודיו</h2></div>
  <div class="r3ha"><button type="button" class="r3pin" aria-label="לשים את הלוק הזה בדף הראשי">📌 לדף הראשי</button><button type="button" class="r3save" aria-label="שמירת הלוק">♡ שמירה</button></div></header>
 <div class="r3stage" role="region" aria-label="האווטאר">
  <div class="r3fig"></div>
  <div class="r3miss" hidden></div>
  <div class="r3ctl"><button type="button" class="r3prev" aria-label="זווית קודמת">→</button><div class="r3dots" role="group" aria-label="זוויות"></div><button type="button" class="r3next" aria-label="זווית הבאה">←</button></div>
  <div class="r3ctl r3ctl2"><span class="r3ang" aria-live="polite">חזית</span><button type="button" class="r3play">▶ סיבוב</button><button type="button" class="r3dl" aria-label="תמונה לשליחה בוואטסאפ או לשמירה">📲 לשתף</button></div>
  <button type="button" class="r3jyb" hidden aria-expanded="false" aria-label="גובה התכשיט – להזיז שרשרת, עגילים, צמיד">📿</button><div class="r3jy r3jyo" role="dialog" aria-label="גובה התכשיט" hidden></div>
 </div>
 <div class="r3side" role="region" aria-label="מה לובשים">
  <div class="r3blk r3now"><h3>לובשת עכשיו <small class="r3cnt"></small></h3>
   <div class="r3worn"></div>
   <div class="r3hd"><span class="r3lbl">על הראש</span><div class="r3heads" role="radiogroup" aria-label="על הראש"></div></div>
   <div class="r3styr"></div>
   <label class="r3tuck r3wb"><input type="checkbox"> שיער מאחורי הכתפיים (רואים צווארון ושרשרת)</label>
   <label class="r3tuck r3tk"><input type="checkbox"> בתוך החצאית (חולצה, חולצת בסיס או סוודר)</label>
   <label class="r3tuck r3un"><input type="checkbox"> החולצה מתחת לשמלה (כמו חולצת בסיס)</label>
   <div class="r3cam" hidden><span class="r3lbl">גופיית בסיס מתחת לתחרה <small>הגופיות שלך, או צבע</small></span><div class="r3sw" role="radiogroup" aria-label="צבע גופיית הבסיס"></div></div>
   <div class="r3bgw"><span class="r3lbl">רקע <small class="r3bgn"></small></span><div class="r3bgs" role="radiogroup" aria-label="רקע"></div></div>
  </div>
  <div class="r3tabs" role="tablist"><button type="button" role="tab" data-t="closet">👗 הארון שלי</button><button type="button" role="tab" data-t="looks">♡ הלוקים שלי</button></div>
  <div class="r3pane" data-p="closet" role="tabpanel">
   <input type="search" class="r3q" placeholder="חיפוש בארון: שם, צבע…" aria-label="חיפוש בארון">
   <div class="r3cats" role="group" aria-label="קטגוריות"></div>
   <p class="r3hint"></p>
   <div class="r3grid"></div>
   <button type="button" class="r3moreb" hidden>להראות עוד</button>
  </div>
  <div class="r3pane" data-p="looks" role="tabpanel" hidden><div class="r3lt"><button type="button" class="r3cmpb" aria-pressed="false">⚖ להשוות 2 לוקים</button><span class="r3cmph" hidden>בוחרים 2 לוקים (אפשר גם "מה שעליי עכשיו")</span></div><div class="r3looks"></div></div>
 </div></div>`; // divs, not <section>: the closet filter treats every <section> as a category
 document.body.appendChild(dlg);
 big=Stage(dlg.querySelector('.r3fig'),{speed:150});STAGES.add(big);
 const dots=dlg.querySelector('.r3dots');NAMES.forEach((n,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',n);b.onclick=()=>{big.stop();big.show(i)};dots.appendChild(b)});
 big.onview=v=>{[...dots.children].forEach((b,k)=>b.setAttribute('aria-pressed',k==v));dlg.querySelector('.r3ang').textContent=NAMES[v]};big.show(0);
 const pb=dlg.querySelector('.r3play');big.onplay=on=>{pb.textContent=on?'⏸ עצירה':'▶ סיבוב';pb.setAttribute('aria-pressed',on)};
 pb.onclick=()=>big.playing()?big.stop():big.play();
 dlg.querySelector('.r3prev').onclick=()=>{big.stop();big.show(big.view-1)};dlg.querySelector('.r3next').onclick=()=>{big.stop();big.show(big.view+1)};
 dlg.querySelector('.r3x').onclick=()=>close();dlg.addEventListener('cancel',e=>{e.preventDefault();close()});
 paintHeads();
 paintCam();paintBgs();
 dlg.querySelector('.r3cmpb').onclick=()=>{CMP=CMP?null:[];paintLooks()};
 dlg.querySelector('.r3wb input').onchange=e=>{ST.wb=e.target.checked?1:0;keep();redraw()};
 dlg.querySelector('.r3tk input').onchange=e=>{ST.tuck=e.target.checked?1:0;keep();redraw()};
 dlg.querySelector('.r3un input').onchange=e=>{ST.under=e.target.checked?1:0;keep();redraw()};
 dlg.querySelector('.r3jyb').onclick=()=>{JYOPEN=!JYOPEN;paintJY()};
 dlg.querySelectorAll('.r3jy').forEach(w=>w.onclick=e=>{if(e.target.closest('[data-jyx]')){JYOPEN=false;paintJY();try{dlg.querySelector('.r3jyb').focus()}catch(_){}return}const b=e.target.closest('button[data-jy]');if(!b)return;const id=b.dataset.id,sl=b.dataset.sl,d=+b.dataset.jy;
  const v=d?Math.max(-45,Math.min(45,jyOf(id,sl)+d)):0;JYL[id+'|'+sl]=v;paintJY();redraw();clearTimeout(JYT[id]);
  JYT[id]=setTimeout(async()=>{const o={};JYS.forEach(x=>{const n=jyOf(id,x);if(n)o[x]=n});try{await putItem(id,{jy:Object.keys(o).length?o:''})}catch(er){(window.ERRS=window.ERRS||[]).push('v260 jy: '+(er&&er.message||er));(window.toast||(()=>{}))('לא נשמר. לנסות שוב')}},700)});
 dlg.querySelector('.r3save').onclick=saveLook3;dlg.querySelector('.r3pin').onclick=()=>TODAY.pin();dlg.querySelector('.r3dl').onclick=share;
 dlg.querySelectorAll('.r3tabs button').forEach(b=>b.onclick=()=>{TAB=b.dataset.t;paintTabs()});
 const q=dlg.querySelector('.r3q');q.addEventListener('input',()=>{Q=q.value.trim();SHOWN=60;paintGrid()});
 dlg.querySelector('.r3moreb').onclick=()=>{SHOWN+=60;paintGrid()};
 dlg.addEventListener('click',e=>{const t=e.target.closest('button');if(!t||!dlg.contains(t))return;
  if(t.dataset.cat){CAT=t.dataset.cat;SHOWN=60;paintGrid();return}
  if(t.dataset.it){const id=t.dataset.it;if(coverTie(id)){if(/^yt/.test(ST.head)&&tfId()==id){ST.head='c';ST.tf=''}else wearCover(id);keep();redraw();return}if(isReady(id)){wearItem(id);keep();redraw()}else make(id);return}
  if(t.dataset.undo!=null){if(UNDO&&JSON.stringify(ST)===UNDO.bj){ST=clone(UNDO.a);UNDO=null;keep();redraw()}return}   // v288: ↩ puts back what she took off by mistake (Sara 28/10 15:08 "בטעות הורדתי")
  if(t.dataset.off){UNDO={a:clone(ST),n:((t.querySelector('span')||{}).textContent||'').trim()};const o=t.dataset.off;if(o=='w')ST.head='c';else if(o=='yh')ST.head='w';else if(o=='yt')ST.head=ST.tf&&(ST.tf=='c'||KEYOF[ST.tf])?ST.tf:'c';else if(o=='ym')ST.mk='';else if(o==tfId()&&/^yt/.test(ST.head)){ST.head='c';ST.tf=''}else takeOff(o);UNDO.bj=JSON.stringify(ST);keep();redraw();return}
  if(t.dataset.r3more!=null||t.dataset.r3less!=null){try{window.STYORD.more(t.dataset.r3more||t.dataset.r3less,t.dataset.r3more!=null)}catch(_){}paintSty();return}
  if(t.dataset.syh!=null){if(t.dataset.syh){recSty(t.dataset.syh);starSty(t.dataset.syh)}ST.head=t.dataset.syh||'w';keep();redraw();return}
  if(t.dataset.sytfm!=null){SCALL=!SCALL;paintSty();return}
  if(t.dataset.t266tx!=null){TXOPEN=TXOPEN==t.dataset.t266tx?'':t.dataset.t266tx;paintSty();return}
  if(t.dataset.t228s!=null){TXOPEN='';const [id,i]=t.dataset.t228s.split('|');if(window.tie228)tie228.set(id,+i).then(ok=>{if(ok&&READY[id]){ST.head=READY[id].k[0];ST.tf='';keep();redraw()}try{paintSty()}catch(_){}});return}
  if(t.dataset.sytf!=null){const id=t.dataset.sytf,k=/^yt/.test(ST.head)?ST.head:defTie();
   if(id=='c'){if(k){ST.head=k;ST.tf='c';ST.tc=GREY}else ST.head='c'}
   else if(READY[id]&&READY[id].head){ST.head=READY[id].k[0];ST.tf=''}   // her scarf with its own 8-angle picture: that one
   else{ST.tf=id;keep();paintSty();try{window.tie202open&&tie202open(id)}catch(_){}return}   // v228: a scarf without its own tie is not painted – she makes it one
   keep();redraw();return}
  if(t.dataset.r3cam!=null){ST.cam=t.dataset.r3cam;keep();redraw();return}   // not data-cam: imgup.js takes that one for the camera
  if(t.dataset.bg!=null){ST.bg=t.dataset.bg;keep();redraw();return}
  if(t.dataset.bgnew!=null){bgDlg();return}
  if(t.dataset.syt!=null){const k=t.dataset.syt;if(k){recSty(k);starSty(k)}if(!k){if(/^yt/.test(ST.head))ST.head=ST.tf&&(ST.tf=='c'||KEYOF[ST.tf])?ST.tf:'c'}
   else{if(!/^yt/.test(ST.head)){ST.tf=ST.head=='w'||/^yh/.test(ST.head)?'c':ST.head;ST.tc=null}ST.head=k;try{localStorage.setItem('tie202',k)}catch(_){}if(!ST.tc){tfRGB(ST.tf).then(c=>{if(ST.head==k&&!ST.tc){ST.tc=c;keep();redraw()}})}
   const tid=tfId();if(tid&&D[tid]&&!READY[tid]&&typeof putItem=='function')putItem(tid,{tie:STY[k].id}).catch(()=>{})}keep();redraw();return}
  if(t.dataset.sytc!=null){const v=t.dataset.sytc,tid=tfId();if(v=='cover'){if(tid&&D[tid]){delete IRGB[tid];if(itOf(tid).tc&&typeof putItem=='function')putItem(tid,{tc:''}).catch(()=>{})}
    setTimeout(()=>tfRGB(ST.tf).then(c=>{ST.tc=c;keep();redraw()}),50)}
   else{ST.tc=v.split(',').map(Number);if(tid&&D[tid]&&typeof putItem=='function')putItem(tid,{tc:ST.tc}).catch(()=>{});keep();redraw()}return}   // v202: the colour stays with that cover
  if(t.dataset.sym!=null){ST.mk=t.dataset.sym;if(ST.mk)starSty(ST.mk);keep();redraw();return}
  if(t.dataset.mkc!=null){const c=t.dataset.mkc,H=mkHid();H.has(c)?H.delete(c):H.add(c);try{localStorage.setItem('mkc227',JSON.stringify([...H]))}catch(_){}redraw();return}
  if(t.dataset.styopen!=null){try{window.STY199&&STY199.open(t.dataset.styopen)}catch(_){}return}
  if(t.dataset.mk){make(t.dataset.mk);return}
  if(t.classList.contains('r3missx')){MISS=[];paintMiss();return}
  if(t.dataset.cmp){pickCmp(t.dataset.cmp);return}
  if(t.dataset.l3pin){TODAY.pinLook(t.dataset.l3pin);return}
  if(t.dataset.look){useLook(t.dataset.look);nudgePin();return}
  if(t.dataset.l3){const l=L3[t.dataset.l3];if(l){ST=Object.assign(clone(DEF),{on:Object.assign({},l.on||{}),head:l.head||'c',tuck:l.tuck?1:0,under:l.under?1:0,wb:l.wb?1:0,cam:l.cam==null?'black':l.cam,mk:l.mk||'',tf:l.tf||'',tc:l.tc||null});MISS=[];keep();redraw();paintMiss();big.show(0);nudgePin()}return}
  if(t.dataset.l3x){if(typeof sure=='function'&&!sure(t,'בטוח? לחצי שוב'))return;   // v267: two taps, and a way back – one tap on the small ✕ used to delete the look for good
   const id=t.dataset.l3x,was=L3[id];if(DB)DB.collection('looks360').doc(id).delete().catch(()=>{});delete L3[id];paintLooks();
   (window.toast||(()=>{}))('הלוק נמחק',was?async()=>{L3[id]=was;paintLooks();try{if(DB){const v=Object.assign({},was);delete v.id;await DB.collection('looks360').doc(id).set(v)}}catch(e){ERR('l3undo',e)}}:undefined);return}});
 paintCats();paintTabs();paintRoom();paintLooks()}
function paintTabs(){if(!dlg)return;dlg.querySelectorAll('.r3tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.t==TAB));dlg.querySelectorAll('.r3pane').forEach(p=>p.hidden=p.dataset.p!=TAB);if(TAB=='closet')paintGrid();else paintLooks()}
// v199: under "על הראש": the hairstyles when the wig is on, the ties when a cover is on (then its colour), the makeup – only rows she has styles for
const TIEC=[['לבן','246,244,239'],['שמנת','239,229,207'],['בז׳','217,196,166'],['ניוד','200,161,132'],['אפור','167,166,163'],['שחור','40,38,38'],['כחול כהה','31,44,77'],['תכלת','169,195,223'],['חום','107,74,51'],['זית','92,97,55'],['בורדו','109,31,44'],['ורוד','227,180,191']];
let TXOPEN='';   // v266: the cover whose ties are open
function paintSty(){const box=dlg&&dlg.querySelector('.r3styr');if(!box)return;
 const chip=(attr,k,name,on,src)=>`<button type="button" role="radio" aria-checked="${on}" ${attr}="${esc(k)}"><img alt="" ${src==null?`data-sth="${esc(k)}" src="${STH[k]||''}"`:`src="${src}"`}><span>${esc(name)}</span></button>`;
 const add=(set,t)=>`<button type="button" class="r3styadd" data-styopen="${set}" aria-label="${t}"><b aria-hidden="true">＋</b><span>עוד</span></button>`;
 const H=ST.head=='w'||/^yh/.test(ST.head),O=window.STYORD;let h='';
 const [hs,hm]=favCut('hair',ordSty('hair'),ST.head),[ts,tm]=favCut('tie',ordSty('tie'),ST.head),[ms,mm]=favCut('mk',O&&O.sort?ordSty('mk'):styList('mk'),ST.mk);
 const nmS=k=>(favSty(k)&&O&&O.more(STY[k].set)?'⭐ ':'')+STY[k].n;
 const more=(set,n)=>n?`<button type="button" class="r3styadd r3more" data-r3more="${set}" aria-label="עוד ${n} – לבחור ולסמן כוכבית"><b aria-hidden="true">☆</b><span>עוד ${n}</span></button>`
  :O&&O.hasFav&&O.hasFav(set)&&O.more(set)?`<button type="button" class="r3styadd r3more" data-r3less="${set}" aria-label="רק מה שסימנתי בכוכבית"><b aria-hidden="true">⭐</b><span>רק שלי</span></button>`:'';
 if(H&&hs.length)h+=`<span class="r3lbl">💇 תסרוקת</span><div class="r3heads r3sty" role="radiogroup" aria-label="תסרוקת">${chip('data-syh','','כמו שהיא',ST.head=='w','a8/t_w.webp'+V)}${hs.map(k=>chip('data-syh',k,nmS(k),ST.head==k)).join('')}${more('hair',hm)}${add('hair','להוסיף תסרוקת')}</div>`;
 // v204 (Sara 11:46 "גם שם זה קטן, תגדילי, וזה גם מתגלגל ... בצבע מטפחת, אני לא רוצה ... אני רוצה ... אחת המטפחות שנמצאות לי"): big tiles that wrap,
 // and instead of colours: her own scarves – the tie takes the colour of the one she picks; the exact one (with its print) is the 🎯 prompt
 if(!H&&ts.length){if(!window.NOTIE291)h+=`<span class="r3lbl">🧕 קשירה</span><div class="r3heads r3sty r3big" role="radiogroup" aria-label="קשירה">${ts.map(k=>chip('data-syt',k,nmS(k),ST.head==k)).join('')}${more('tie',tm)}${add('tie','להוסיף קשירה')}</div>`;
  const own=KEYOF[ST.head]&&READY[KEYOF[ST.head]]&&READY[KEYOF[ST.head]].head?KEYOF[ST.head]:'',sel=own||tfId()||(/^yt/.test(ST.head)&&(!ST.tf||ST.tf=='c')?'c':'');
  let cv=Object.keys(D).filter(id=>isCover(id)&&!itOf(id).gen&&!itOf(id).oos&&itOf(id).s!='ret'&&itOf(id).s!='give');
  cv.sort((a,b)=>(b==sel)-(a==sel)||(isReady(b)-isReady(a)));const all=cv.length,show=SCALL?cv:cv.slice(0,11);
  h+=`<span class="r3lbl">🧕 המטפחת <small>כל מטפחת עם הקשירות האמיתיות שהכנת לה</small></span><div class="r3scf" role="radiogroup" aria-label="המטפחת">
   <button type="button" role="radio" aria-checked="${sel=='c'}" data-sytf="c"><i style="background:rgb(${GREY.join(',')})"></i><span>אפור ניטרלי</span></button>
   ${show.map(id=>`<button type="button" role="radio" aria-checked="${sel==id}" data-sytf="${esc(id)}"><img alt="" loading="lazy" data-th="${esc(id)}" src="${esc(ph(id))}">${isReady(id)?'<b class="r3own" title="עם ההדפס">🎯</b>':''}<span>${esc(nm(id).split(' ').slice(0,3).join(' '))}</span></button>`).join('')}
   ${all>11?`<button type="button" class="r3scm" data-sytfm aria-expanded="${!!SCALL}">${SCALL?'פחות':'עוד '+(all-11)}</button>`:''}</div>`;
  // v228: no painted ties – her scarf with the real ties she made for it, and a way to add one
  const it=sel&&sel!='c'?sel:'',TX=it&&window.tie228?tie228.txs(it):[];
  // v266 (Sara 23:34 "בחרתי מטפחת – לראות את הקשירה הנוכחית, ולא לגלגל את הכל"): only the tie she has on, "עוד N קשירות" opens the rest, a pick closes it again
  const txOn=x=>READY[it]&&DYN['x'+READY[it].k[0]+'1']=='/_blob/'+x.L[0],cur=Math.max(0,TX.findIndex(txOn)),TXS=TXOPEN==it?TX.map((x,i)=>i):[cur];
  if(TX.length>1)h+=`<div class="r3heads r3sty r3tx" role="radiogroup" aria-label="הקשירות של המטפחת">${TXS.map(i=>[TX[i],i]).map(([x,i])=>{const on=txOn(x);return `<button type="button" role="radio" aria-checked="${!!on}" data-t228s="${esc(it)}|${i}"><img alt="" data-t228th="${esc(x.L[0])}" src="/_blob/${esc(x.L[0])}"><span>${esc(x.n)}</span></button>`}).join('')}<button type="button" class="r3scm r3txm" data-t266tx="${esc(it)}" aria-expanded="${TXOPEN==it}">${TXOPEN==it?'▴ רק הנוכחית':'▾ עוד '+(TX.length-1)+' קשירות'}</button></div>`;
  h+=it?`<button type="button" class="r3stb r3ex" data-tie202="${esc(it)}">${TX.length?'🧕 הקשירות של המטפחת הזו · להוסיף עוד':'🧕 להכין למטפחת הזו קשירה אמיתית'}</button>`:`<p class="r3note r3exn">🧕 בוחרים מטפחת, ואז מכינים לה קשירות אמיתיות, עם ההדפס שלה.</p>`}
 // v227 (Sara 19:33 "תמיין את האיפורים לפי הנושאים ... יום יום אירוע וכו, כמובן שאפשר להסתיר סיווג"): her makeups in the groups of her prompts, each group folds
 if(ms.length){const G=mkGroups(ms),H=mkHid();h+=`<span class="r3lbl">💄 איפור</span><div class="r3mkg" aria-label="איפור"><div class="r3heads r3sty r3mk r3mk0" role="radiogroup" aria-label="בלי איפור">${chip('data-sym','','בלי',!ST.mk,'a8/t_c.webp'+V)}</div>
  ${G.map(([c,t,L])=>{const on=!H.has(c),sel=L.find(k=>k==ST.mk);return `<button type="button" class="r3mkh" data-mkc="${esc(c)}" aria-expanded="${on}"><b>${esc(t)}</b> <small>${L.length}</small>${!on&&sel?`<em>· ${esc(STY[sel].n)}</em>`:''}<i aria-hidden="true">${on?'הסתרה':'הצגה'}</i></button>${on?`<div class="r3heads r3sty r3mk" role="radiogroup" aria-label="${esc(t)}">${L.map(k=>chip('data-sym',k,nmS(k),ST.mk==k)).join('')}</div>`:''}`}).join('')}${mm||(O&&O.hasFav&&O.hasFav('mk')&&O.more('mk'))?`<div class="r3heads r3sty r3mk">${more('mk',mm)}</div>`:''}
  <div class="r3heads r3sty r3mk">${add('mk','להוסיף איפור')}</div></div>`}
 h+=`<button type="button" class="r3stb" data-styopen="${H?'hair':'tie'}">🎨 תסרוקות, קשירות ואיפור</button>`;
 if(box.dataset.h!==h){box.dataset.h=h;box.innerHTML=h;try{thl([...box.querySelectorAll('img[data-th]')].map(i=>i.dataset.th))}catch(_){}}
 box.querySelectorAll('img[data-sth]').forEach(i=>{if(!i.getAttribute('src'))styThumb(i.dataset.sth).then(u=>{if(u)document.querySelectorAll(`img[data-sth="${CSS.escape(i.dataset.sth)}"]`).forEach(x=>x.src=u)})});
 dlg.querySelectorAll('.r3worn img[data-sth]').forEach(i=>{if(!i.getAttribute('src'))styThumb(i.dataset.sth).then(u=>{if(u)i.src=u})})}
function paintRoom(){if(!dlg)return;
 const hk=ST.head=='w'||/^yh/.test(ST.head)?'w':'c';   // v204: a hairstyle is her wig, anything else is a cover
 dlg.querySelectorAll('.r3heads button[data-h]').forEach(b=>b.setAttribute('aria-checked',b.dataset.h==hk));   // v267: only the head buttons – the tie/hair/makeup chips (no data-h) kept losing their highlight
 const ids=wornIds(ST);const wv=dlg.querySelector('.r3worn');
 const chips=ids.map(id=>`<button type="button" class="r3wc" data-off="${id}" aria-label="להוריד: ${esc(nm(id))}"><img alt="" data-th="${id}" src="${ph(id)}"><span>${esc(nm(id))}</span><b aria-hidden="true">✕</b></button>`);
 if(ST.head=='w')chips.unshift(`<button type="button" class="r3wc" data-off="w" aria-label="להוריד: הפאה"><img alt="" src="a8/t_w.webp${V}"><span>הפאה שלי</span><b aria-hidden="true">✕</b></button>`);
 [[ST.head,/^yh/.test(ST.head)?'yh':'yt'],[ST.mk,'ym']].forEach(([k,o])=>{if(!k||!STY[k])return;
  chips.unshift(`<button type="button" class="r3wc" data-off="${o}" aria-label="להוריד: ${esc(STY[k].n)}"><img alt="" data-sth="${k}" src="${STH[k]||''}"><span>${esc(STY[k].n)}</span><b aria-hidden="true">✕</b></button>`)});
 // v197: an item she cut herself can be replaced or deleted right here (Sara 08:29 "גם אם לחצתי מדוד עלי שיהיה לי אפשרות למחוק ולהחליף")
 const fx=ids.filter(id=>READY[id]&&READY[id].dyn&&window.acts197).map(id=>`<div class="r3fx"><span>${esc(nm(id).split(' ').slice(0,3).join(' '))}</span>${acts197(id)}</div>`).join('');
 if(UNDO&&JSON.stringify(ST)!==UNDO.bj)UNDO=null;   // v288: the undo is offered only until she changes something else
 if(UNDO)chips.unshift(`<button type="button" class="r3wc r3undo" data-undo="1" aria-label="להחזיר: ${esc(UNDO.n)}"><b aria-hidden="true">↩</b><span>להחזיר: ${esc(UNDO.n)}</span></button>`);
 wv.innerHTML=(chips.join('')||'<p class="r3note">עוד לא לבשת כלום. בוחרים למטה מהארון.</p>')+fx;thl(ids);
 dlg.querySelector('.r3cnt').textContent=ids.length?`${ids.length} פריטים`:'';
 const t=dlg.querySelector('.r3tk');const sl=x=>Object.keys(ST.on).some(k=>ST.on[k]&&SLOT[k]&&SL(k)==x);t.hidden=!((sl('top')||sl('base')||Object.keys(ST.on).some(k=>ST.on[k]&&SLOT[k]=='outer'&&PK[k]=='sweater'))&&sl('bottom')&&!sl('body'));t.querySelector('input').checked=!!ST.tuck;   // v225 (Sara 19:22 "איפה מכניסים את החולצה"): any top with any skirt, not only the first two items
 paintJY();
 const un=dlg.querySelector('.r3un');un.hidden=!(sl('top')&&sl('body'));un.querySelector('input').checked=!!ST.under;
 const w=dlg.querySelector('.r3wb');w.hidden=ST.head!='w';w.querySelector('input').checked=!!ST.wb;
 paintSty();
 const bn=bgList().find(b=>b.k==(ST.bg||''));dlg.querySelector('.r3bgn').textContent=bn?bn.n:'';
 dlg.querySelectorAll('.r3bgs [data-bg]').forEach(b=>b.setAttribute('aria-checked',b.dataset.bg==(ST.bg||'')));
 const cm=dlg.querySelector('.r3cam');cm.hidden=!Object.keys(LACE).some(k=>ST.on[k])||Object.keys(SLOT).some(k=>ST.on[k]&&SL(k)=='base');cm.querySelectorAll('button').forEach(b=>b.setAttribute('aria-checked',b.dataset.r3cam==(ST.cam==null?'black':ST.cam)));
 dlg.querySelectorAll('.r3grid [data-it]').forEach(b=>{if(isReady(b.dataset.it)||coverTie(b.dataset.it))b.setAttribute('aria-pressed',ids.includes(b.dataset.it))})}

// her closet, by category; items with a 360 sheet first
function pool(){return Object.keys(D).concat(window.pieces85?pieces85():[]).filter(id=>{if(!CATIDS.has(cat(id)))return false;const it=(typeof IT=='object'&&IT&&IT[id])||{};if(it.gen||it.oos||it.s=='ret'||it.s=='give')return false;return true})}
function paintCats(){if(!dlg)return;const P=pool();const n=c=>c=='all'?P.length:c=='ready'?P.filter(isReady).length:P.filter(id=>cat(id)==c).length;
 dlg.querySelector('.r3cats').innerHTML=CATS.map(([k,t])=>{const c=n(k);return c||k=='all'?`<button type="button" data-cat="${k}" aria-pressed="${k==CAT}">${t} <small>${c}</small></button>`:''}).join('')}
function paintGrid(){if(!dlg||TAB!='closet')return;dlg.querySelectorAll('.r3cats button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.cat==CAT));
 let ids=pool();if(CAT=='ready')ids=ids.filter(isReady);else if(CAT!='all')ids=ids.filter(id=>cat(id)==CAT);
 if(Q){const q=Q.toLowerCase();ids=ids.filter(id=>{const x=D[id]||{};return (x.short+' '+x.full+' '+(x.color||'')).toLowerCase().includes(q)})}
 const order=Object.fromEntries(CATS.map((c,i)=>[c[0],i]));ids.sort((a,b)=>(isReady(b)-isReady(a))||(order[cat(a)]-order[cat(b)]));
 const r=ids.filter(isReady).length,worn=wornIds(ST);
 dlg.querySelector('.r3hint').textContent=ids.length?(CAT=='ready'?'לוחצים כדי ללבוש או להוריד.':`${r?`${r} כבר על האווטאר (מסומנים 360°), לוחצים כדי ללבוש. `:''}לשאר צריך גיליון 360 – לוחצים ואני מסבירה איך.`):'לא מצאתי פריטים.';
 const sh=ids.slice(0,SHOWN);
 dlg.querySelector('.r3grid').innerHTML=sh.map(id=>{const tw=coverTie(id),ok=isReady(id)||tw;return `<button type="button" class="r3c${ok?' ok':''}" data-it="${id}"${ok?` aria-pressed="${worn.includes(id)}"`:''}><span class="r3ph"><img alt="" loading="lazy" data-th="${id}" src="${ph(id)}"></span><span class="r3n">${esc(nm(id))}</span><span class="r3b">${tw?'🧕 עם קשירה':ok?'360°':(window.up188&&up188(id))?'⏳ הועלה, מחכה':'עוד לא ב-360'}</span></button>`}).join('');
 const mb=dlg.querySelector('.r3moreb');mb.hidden=ids.length<=SHOWN;mb.textContent=`להראות עוד (${ids.length-SHOWN})`;thl(sh)}
function paintMiss(){if(!dlg)return;const m=dlg.querySelector('.r3miss');m.hidden=!MISS.length;if(!MISS.length){m.innerHTML='';return}
 m.innerHTML=`<p>עוד ${MISS.length==1?'פריט אחד':MISS.length+' פריטים'} מהלוק בלי 360:</p><div>${MISS.map(id=>`<button type="button" data-mk="${id}" aria-label="${esc(nm(id))}: איך להכין"><img alt="" data-th="${id}" src="${ph(id)}"></button>`).join('')}</div><button type="button" class="r3missx" aria-label="סגירה">✕</button>`;thl(MISS)}

// looks: her saved looks (LOOKS, the album); the ones saved here also keep the avatar picture
function paintLooks(){if(!dlg)return;const box=dlg.querySelector('.r3looks');let LK={};try{LK=LOOKS||{}}catch(_){}
 const main=Object.entries(LK).filter(([id,l])=>l&&l.items&&!l.auto).sort((a,b)=>String(b[1].created||'').localeCompare(String(a[1].created||'')));
 const old=Object.entries(L3).sort((a,b)=>(b[1].t||0)-(a[1].t||0));
 const cb=dlg.querySelector('.r3cmpb');cb.setAttribute('aria-pressed',!!CMP);cb.textContent=CMP?'✕ ביטול השוואה':'⚖ להשוות 2 לוקים';dlg.querySelector('.r3cmph').hidden=!CMP;
 dlg.querySelector('.r3lt').hidden=main.length+old.length<1;
 if(!main.length&&!old.length){box.innerHTML='<p class="r3note">עוד אין. מלבישים ולוחצים "♡ שמירה".</p>';return}
 const ids=[],sel=k=>CMP&&CMP.includes(k);
 const act=(k,id,attr)=>CMP?`data-cmp="${k}" aria-pressed="${sel(k)}"`:`${attr}="${id}"`;
 box.innerHTML=(CMP?`<button type="button" class="r3l r3now" data-cmp="now" aria-pressed="${sel('now')}"><span class="r3lm r3lnow">👗</span><span><b>מה שעליי עכשיו</b><small>${esc(wearing(ST)||'האווטאר כמו שהוא')}</small></span></button>`:'')+
  main.map(([id,l])=>{const its=Object.values(l.items).filter(x=>D[x]);const r=its.filter(isReady).length;its.slice(0,3).forEach(x=>ids.push(x));
  const pic=l.th360?`<img class="r3lb" alt="" src="${l.th360}">`:`<span class="r3lm">${its.slice(0,4).map(x=>`<img alt="" data-th="${x}" src="${ph(x)}">`).join('')}</span>`;
  return `<div class="r3lw"><button type="button" class="r3l" ${act('m:'+id,id,'data-look')}>${pic}<span><b>${esc(l.name||'לוק')}</b><small>${r} מתוך ${its.length} על האווטאר</small></span></button>${CMP||!r?'':pinB('m:'+id,l.name)}</div>`}).join('')+
  old.map(([id,l])=>`<div class="r3lw"><button type="button" class="r3l" ${act('o:'+id,id,'data-l3')}><img class="r3lb" alt="" src="${l.th||''}"><span><b>${esc(l.name||'לוק')}</b><small>מהחדר הקודם</small></span></button>${CMP?'':`<button type="button" class="r3lx" data-l3x="${id}" aria-label="למחוק את ${esc(l.name||'הלוק')}">✕</button>`+pinB('o:'+id,l.name)}</div>`).join('');
 thl(ids)}
// ---------- compare 2 looks side by side, turning together (v182) ----------
function lookOf(k){let LK={};try{LK=LOOKS||{}}catch(_){}
 if(k=='now')return {name:'מה שעליי עכשיו',s:clone(ST),miss:MISS.slice()};
 if(k.startsWith('m:')){const l=LK[k.slice(2)];if(!l)return null;const its=Object.values(l.items||{}).filter(x=>D[x]);
  const s=l.r360?Object.assign(clone(DEF),clone(l.r360)):stateFrom(its,{head:ST.head,cam:ST.cam,bg:ST.bg});if(l.r360&&l.r360.bg==null)s.bg=ST.bg;if(!l.r360&&!its.some(x=>READY[x]&&READY[x].head))s.head=ST.head=='w'?'w':s.head;
  return {name:l.name||'לוק',s,miss:its.filter(x=>!isReady(x)&&CATIDS.has(cat(x))),id:k.slice(2)}}
 if(k.startsWith('o:')){const l=L3[k.slice(2)];if(!l)return null;return {name:l.name||'לוק',s:Object.assign(clone(DEF),{on:Object.assign({},l.on||{}),head:l.head||'c',tuck:l.tuck?1:0,under:l.under?1:0,wb:l.wb?1:0,cam:l.cam==null?'black':l.cam,bg:ST.bg}),miss:[]}}
 return null}
function pickCmp(k){if(!CMP)return;const i=CMP.indexOf(k);if(i>=0)CMP.splice(i,1);else CMP.push(k);
 if(CMP.length>=2){const a=lookOf(CMP[0]),b=lookOf(CMP[1]);CMP=null;paintLooks();if(a&&b)compare(a,b);return}paintLooks()}
let CD=null;
function compare(a,b){if(!CD){CD=document.createElement('dialog');CD.id='r3cmp';CD.dir='rtl';CD.setAttribute('aria-label','השוואה בין 2 לוקים');document.body.appendChild(CD);
  CD.addEventListener('click',e=>{if(e.target===CD)CD.close()});CD.addEventListener('close',()=>{(CD._st||[]).forEach(s=>s.stop());CD._st=[]})}
 const L=[a,b];
 CD.innerHTML=`<div class="cw"><div class="ch"><h3>⚖ השוואה</h3><button type="button" class="cx" aria-label="סגירה">✕</button></div>
  <div class="cg">${L.map((l,i)=>`<div class="cc"><div class="cf" data-i="${i}"></div><b>${esc(l.name)}</b><small>${esc(wearing(l.s)||'בלי בגדים מהארון')}${l.miss.length?` · עוד ${l.miss.length} בלי 360`:''}</small><button type="button" class="cwear" data-i="${i}">👗 ללבוש את זה</button></div>`).join('')}</div>
  <div class="r3ctl"><button type="button" class="cp" aria-label="זווית קודמת">→</button><span class="cang" aria-live="polite">חזית</span><button type="button" class="cn" aria-label="זווית הבאה">←</button><button type="button" class="cpl">▶ סיבוב</button></div></div>`;
 let lock=false;const st=L.map((l,i)=>Stage(CD.querySelector(`.cf[data-i="${i}"]`),{speed:420,state:()=>l.s}));CD._st=st;
 const sync=v=>{if(lock)return;lock=true;st.forEach(s=>{if(s.view!=v)s.show(v)});CD.querySelector('.cang').textContent=NAMES[v];lock=false};
 st.forEach(s=>s.onview=sync);
 const pl=CD.querySelector('.cpl');st[0].onplay=on=>{pl.textContent=on?'⏸ עצירה':'▶ סיבוב'};st[1].onplay=null;
 const stopAll=()=>st.forEach(s=>s.stop());
 CD.querySelector('.cp').onclick=()=>{stopAll();sync((st[0].view+7)%8)};CD.querySelector('.cn').onclick=()=>{stopAll();sync((st[0].view+1)%8)};
 pl.onclick=()=>{if(st[0].playing())stopAll();else{st[1].stop();st[0].play()}};
 CD.querySelector('.cx').onclick=()=>CD.close();
 CD.querySelectorAll('.cwear').forEach(btn=>btn.onclick=()=>{const l=L[+btn.dataset.i];ST=clone(l.s);MISS=l.miss.slice();keep();CD.close();redraw();paintMiss();big&&big.show(0);toast_('👗 '+l.name)});
 if(!CD.open)CD.showModal()}
function useLook(id){let l=null;try{l=LOOKS[id]}catch(_){}if(!l)return;
 const bg=ST.bg;if(l.r360){ST=Object.assign(clone(DEF),clone(l.r360));if(l.r360.bg==null)ST.bg=bg;MISS=Object.values(l.items||{}).filter(x=>D[x]&&!isReady(x))}else applyIds(Object.values(l.items||{}),true);
 keep();redraw();paintMiss();big&&big.show(0);toast_(`👗 ${l.name||'הלוק'}`)}
function applyIds(ids,reset){ids=ids.filter(id=>D[id]);
 if(reset){const head=ST.head;ST.on={};ST.tuck=0;ST.under=0;ST.head=ids.some(id=>READY[id]&&READY[id].head)?'c':head}
 ids.filter(isReady).forEach(id=>{const r=READY[id];if(r.head){ST.head=r.k[0];return}if(!r.k.every(k=>ST.on[k]))wearItem(id)});
 MISS=ids.filter(id=>!isReady(id)&&CATIDS.has(cat(id)))}
async function thumb(){const c=document.createElement('canvas');await paint(c,0,ST);const t=document.createElement('canvas');t.width=120;t.height=180;t.getContext('2d').drawImage(c,0,0,120,180);return t.toDataURL('image/jpeg',.82)}
async function saveLook3(){const ids=wornIds(ST);if(!ids.length&&!whole(ST.head)&&!ST.mk){toast_('עוד לא לבשת כלום');return}
 const items={};ids.forEach(id=>{let s='extra';try{s=slotOf(id)}catch(_){}if(!items[s])items[s]=id});
 MISS.forEach(id=>{let s='extra';try{s=slotOf(id)}catch(_){}if(!items[s])items[s]=id});
 const th=await thumb();let id=null;
 try{id=await saveLook(items,occNow(),null)}catch(_){}
 if(id&&LOOKS[id]){LOOKS[id].r360=clone(ST);LOOKS[id].th360=th;try{await saveDoc('looks',id,LOOKS[id])}catch(_){}}
 else if(DB){const k='l'+Date.now().toString(36);L3[k]={name:'לוק · '+new Date().toLocaleDateString('he-IL'),on:clone(ST.on),head:ST.head,tuck:ST.tuck,under:ST.under||0,wb:ST.wb,cam:ST.cam,mk:ST.mk||'',tf:ST.tf||'',tc:ST.tc||null,t:Date.now(),th};DB.collection('looks360').doc(k).set(L3[k]).catch(()=>{})}
 paintLooks();toast_('♡ הלוק נשמר')}
async function saveFile(name,blob){let dl=null;try{dl=await window.claude?.use?.('downloads')}catch(_){}
 try{if(dl){await dl.save({filename:name,data:blob});return}}catch(e){if(e&&e.code=='declined')return}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove()}
// ---------- a picture to send (WhatsApp) or keep: 3 angles or one, her title, the items (v182) ----------
let SH=null,SHL='3',SHT='',SHB=null,NOIT=false;   // NOIT: an item photo from another site blocked the picture → leave the photos out
const ldImg=u=>new Promise(r=>{if(!u)return r(null);const i=new Image();if(/^https?:/.test(u)&&!u.startsWith(location.origin))i.crossOrigin='anonymous';i.onload=()=>r(i);i.onerror=()=>r(null);i.src=u});
function rr(x,X,Y,W,H,R){x.beginPath();x.moveTo(X+R,Y);x.arcTo(X+W,Y,X+W,Y+H,R);x.arcTo(X+W,Y+H,X,Y+H,R);x.arcTo(X,Y+H,X,Y,R);x.arcTo(X,Y,X+W,Y,R);x.closePath()}
async function card(){const views=SHL=='3'?[0,2,4]:[big?big.view:0];const pw=SHL=='3'?318:600,ph_=Math.round(pw*541/360),gap=24,tot=views.length*pw+(views.length-1)*gap,top=182;
 const ids=NOIT?[]:wornIds(ST).slice(0,6),y0=top+ph_+44,tw=136,th=170;
 const W=1080,H=y0+(ids.length?th+64:0)+70,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');   // the height follows what is on it
 try{await Promise.all(['700 64px "Frank Ruhl Libre"','500 30px Heebo','700 30px Heebo'].map(f=>document.fonts.load(f)))}catch(_){}
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#fcf8f2');g.addColorStop(1,'#efe4d4');x.fillStyle=g;x.fillRect(0,0,W,H);
 x.direction='rtl';x.textAlign='center';x.fillStyle='#2d211b';x.font='700 64px "Frank Ruhl Libre", serif';x.fillText(SHT||'הלוק שלי',W/2,104);
 x.font='500 28px Heebo, sans-serif';x.fillStyle='#87725f';let dt='';try{dt=new Date().toLocaleDateString('he-IL',{weekday:'long',day:'numeric',month:'long'})}catch(_){}x.fillText(dt,W/2,148);
 const cv=document.createElement('canvas');
 for(let i=0;i<views.length;i++){await paint(cv,views[i],ST);const X=W-(W-tot)/2-(i+1)*pw-i*gap;   // right to left: front first
  x.save();x.shadowColor='rgba(60,40,20,.18)';x.shadowBlur=24;x.shadowOffsetY=8;rr(x,X,top,pw,ph_,26);x.fillStyle='#fff';x.fill();x.restore();
  x.save();rr(x,X,top,pw,ph_,26);x.clip();x.drawImage(cv,X,top,pw,ph_);x.restore()}
 if(ids.length){try{await Promise.all([...new Set(ids.map(cat))].map(k=>thLoad(k)))}catch(_){}
  const ims=await Promise.all(ids.map(id=>ldImg(ph(id))));const tg=22,tt=ids.length*tw+(ids.length-1)*tg;
  ids.forEach((id,i)=>{const X=W-(W-tt)/2-(i+1)*tw-i*tg;x.save();rr(x,X,y0,tw,th,18);x.fillStyle='#fff';x.fill();x.clip();const m=ims[i];
   if(m){const s=Math.min((tw-12)/m.naturalWidth,(th-12)/m.naturalHeight);x.drawImage(m,X+(tw-m.naturalWidth*s)/2,y0+(th-m.naturalHeight*s)/2,m.naturalWidth*s,m.naturalHeight*s)}x.restore();
   x.font='500 21px Heebo, sans-serif';x.fillStyle='#4a3a30';let n=nm(id);while(n.length>3&&x.measureText(n).width>tw+12)n=n.slice(0,-2);if(n!=nm(id))n=n.trim()+'…';x.fillText(n,X+tw/2,y0+th+32)})}
 x.font='700 26px Heebo, sans-serif';x.fillStyle='#b5562f';x.fillText('הארון של שרה ✦',W/2,H-30);
 return c}
async function share(){if(!SH){SH=document.createElement('dialog');SH.id='r3sh';SH.dir='rtl';SH.setAttribute('aria-labelledby','r3sht');document.body.appendChild(SH);
  SH.innerHTML=`<div class="sw"><div class="sh"><h3 id="r3sht">📲 תמונה לשליחה</h3><button type="button" class="sx" aria-label="סגירה">✕</button></div>
   <div class="spv"><img alt="התמונה שתישלח"></div>
   <label class="stl">כותרת<input type="text" maxlength="40" placeholder="הלוק שלי"></label>
   <div class="slay" role="radiogroup" aria-label="כמה זוויות"><button type="button" role="radio" data-l="3">3 זוויות</button><button type="button" role="radio" data-l="1">זווית אחת (הנוכחית)</button></div>
   <div class="sbt"><button type="button" class="ssend">📲 לשלוח</button><button type="button" class="ssave">⬇ לשמור</button></div>
   <p class="snote"></p></div>`;
  SH.addEventListener('click',e=>{if(e.target===SH)SH.close()});SH.querySelector('.sx').onclick=()=>SH.close();
  let tm=null;SH.querySelector('.stl input').addEventListener('input',e=>{SHT=e.target.value.trim();clearTimeout(tm);tm=setTimeout(prev,350)});
  SH.querySelectorAll('.slay button').forEach(b=>b.onclick=()=>{SHL=b.dataset.l;prev()});
  SH.querySelector('.ssave').onclick=async()=>{if(SHB)await saveFile('look.png',SHB)};
  SH.querySelector('.ssend').onclick=async()=>{if(!SHB)return;const f=new File([SHB],'look.png',{type:'image/png'});const note=SH.querySelector('.snote');
   try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:SHT||'הלוק שלי'});return}}catch(e){if(e&&e.name=='AbortError')return}
   await saveFile('look.png',SHB);note.textContent='שמרתי את התמונה. בוואטסאפ: 📎 ← גלריה ← look.png'}}
 SH.querySelector('.stl input').value=SHT;SH.querySelector('.snote').textContent='';if(!SH.open)SH.showModal();prev()}
let PV=0;
async function prev(){if(!SH)return;const me=++PV;SH.querySelectorAll('.slay button').forEach(b=>b.setAttribute('aria-checked',b.dataset.l==SHL));
 const im_=SH.querySelector('.spv img');im_.style.opacity=.5;const c=await card();if(me!=PV)return;
 try{SHB=await new Promise((r,j)=>{try{c.toBlob(r,'image/png')}catch(e){j(e)}})}catch(e){if(!NOIT){NOIT=true;return prev()}return}if(me!=PV)return;if(im_.src.startsWith('blob:'))URL.revokeObjectURL(im_.src);im_.src=URL.createObjectURL(SHB);im_.style.opacity=1}

// ---------- "how do I get this item onto the avatar": one GPT message (Sara's rule) ----------
const ME='גובה 156 ס"מ, חזה 94, מותן 73, ירכיים 96';
const KIND={dress:['שמלה','השמלה מכסה את השמלה בצבע עור. הכתפיים, הצווארון והשרוולים בדיוק כמו בתמונה.',1,1],
 top:['חולצה','החולצה יושבת על הכתפיים שלה, השרוולים על הידיים שלה, באורך שבתמונה. החולצה בחוץ, לא בתוך השמלה.',1],
 base:['חולצת בסיס','זו חולצת בסיס דקה וצמודה שלובשים מתחת לבגדים אחרים: צמודה לגוף, בלי קפלים גדולים, הצווארון והשרוולים בדיוק כמו בתמונה.',1],
 sweater:['סוודר','הסוודר מעל השמלה, עם הנפח של הבד הסרוג, השרוולים על הידיים שלה.',1],
 skirt:['חצאית','החצאית מתחילה בקו המותן שלה ונופלת עד האורך האמיתי.',1,1],
 pants:['מכנסיים','המכנסיים מתחילים בקו המותן שלה ומגיעים עד האורך האמיתי.',1,1],
 set:['סט (2 חלקים)','זה סט של שני חלקים, ואני צריכה כל חלק בנפרד:\nתמונה 1: הגיליון עם החלק העליון בלבד.\nתמונה 2: הגיליון עם החלק התחתון בלבד.',1,1,2],
 vest:['אפודה','אפודה בלי שרוולים, מעל השמלה. הידיים והשרוולים הקצרים של השמלה נשארים בדיוק כמו שהם.',1,1],
 jacket:['ז\'קט','הז\'קט יושב מעל הבגדים שעל הדמות, כמו שלובשים ז\'קט על שמלה: פתוח או סגור בדיוק כמו בתמונה, השרוולים על הידיים שלה. איפה שהז\'קט פתוח או קצר רואים את השמלה שמתחת בלי שינוי.',1],
 coat:['מעיל','המעיל יושב מעל כל הבגדים שעל הדמות, כמו שלובשים מעיל בחוץ: פתוח או סגור בדיוק כמו בתמונה, באורך האמיתי שלו, השרוולים על הידיים שלה. איפה שהמעיל פתוח רואים את השמלה שמתחת בלי שינוי.',1,1],
 cover:['כיסוי ראש','כיסוי הראש מחליף את כיסוי הבז׳ הפשוט שעל הדמות ומסתיר אותו לגמרי, כולל השוליים. בצד ובגב צרי אותו כמו שהוא נראה באמת מהכיוון הזה.',0,0,1,'head'],
 scarf:['מטפחת','המטפחת קשורה בדיוק כמו בתמונה: אותה קשירה, אותו נפח, אותו קשר. היא מחליפה את כיסוי הבז׳ הפשוט שעל הדמות ומסתירה אותו לגמרי. בצד ובגב צרי את הקשר כמו שהוא נראה באמת מהכיוון הזה.',0,0,1,'head'],
 necklace:['שרשרת','רק השרשרת, גם אם בתמונה יש עוד תכשיטים. על הצוואר, באורך האמיתי שלה, נופלת על החזה כמו במציאות. מקדימה רואים את כל השרשרת והתליון, מהצד רואים אותה יורדת מהצוואר, ומהגב רק את השרשרת הדקה על העורף (אם רואים אותה).',0,0,1,'jw'],
 earrings:['עגילים','רק העגילים, גם אם בתמונה יש עוד תכשיטים. על שתי האוזניים, באותו גודל ובאותו אורך כמו בתמונה. אם כיסוי הראש מכסה חלק מהאוזן, תנוך האוזן והעגיל יוצאים מתחתיו ונראים. מקדימה רואים את שני העגילים, מהצד רק את העגיל שבצד הזה.',0,0,1,'jw'],
 ring:['טבעת','רק הטבעת, על אחת האצבעות של היד השמאלית (היד שיורדת ישר למטה), באותו גודל כמו בתמונה. בזוויות שהיד מוסתרת לא רואים אותה.',0,0,1,'jw'],
 bracelet:['צמיד','רק הצמיד, על פרק היד השמאלי, באותו גודל כמו בתמונה. בזוויות שהיד מוסתרת לא רואים אותו.',0,0,1,'jw'],
 jwset:['סט תכשיטים','בתמונת המוצר יש כמה תכשיטים. אני צריכה כל תכשיט בתמונה נפרדת (שרשרת לבד, עגילים לבד). בכל תמונה רק תכשיט אחד, בלי האחרים.',0,0,2,'jw'],
 belt:['חגורה','החגורה על קו המותן שלה, מסביב לכל הגוף, בדיוק באותו רוחב ואותו אבזם כמו בתמונה. בצד היד עוברת מעל החגורה.',0,0,1,'more'],
 shoes:['נעליים','הנעליים האלה במקום הנעליים הבז\'. אותו מיקום של הרגליים, אותה עמידה. מקדימה, מהצד ומאחור צרי את הנעל כמו שהיא נראית באמת מהכיוון הזה.',0,0,1,'more'],
 bag:['תיק','התיק תלוי על הכתף, בגודל האמיתי שלו ביחס לגוף, בלי לשנות את תנוחת הידיים. מהגב ומהצד רואים אותו כמו במציאות.',0,0,1,'more']};
function kindOf(id){const c=cat(id),t=(D[id]||{}).short+' '+(D[id]||{}).full;
 {const kd=(typeof IT=='object'&&IT&&IT[id]||{}).kd;if(kd&&KIND[kd])return kd}   // v250: the type she picked in the GPT window
 if(c=='dresses')return 'dress';if(c=='skirts')return /מכנס/.test(t)?'pants':'skirt';if(c=='sets')return 'set';if(c=='sweaters')return 'sweater';
 if(c=='base')return 'base';
 if(c=='tops')return /בסיס/.test(t)?'base':/סוודר|סריג/.test(t)?'sweater':'top';
 if(c=='outer')return /מעיל/.test(t)?'coat':/וסט|אפוד/.test(t)?'vest':'jacket';
 if(c=='scarves')return /כובע|כיסוי/.test(t)&&!/מטפחת|צעיף/.test(t)?'cover':'scarf';
 if(c=='jewelry')return /(^|[\s,.\-–(])סט($|[\s,.\-–)])/.test(t)||(/עגיל/.test(t)&&/שרשר/.test(t))?'jwset':/עגיל/.test(t)?'earrings':/צמיד|שעון/.test(t)?'bracelet':'necklace';
 if(c=='belts')return 'belt';if(c=='shoes')return 'shoes';if(c=='bags')return 'bag';return 'top'}
function prompt(id){const K=KIND[kindOf(id)];const [t,how,body,len,n=1,g='cloth']=K;const x=D[id]||{};const item=`${t} – ${nm(id)}${x.color?', צבע: '+x.color:''}`;const P=[];
 P.push(`מצורפות שתי תמונות.\nהתמונה הראשונה: מה שקניתי – ${item}.\nהתמונה השנייה: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.`);
 P.push((n>1?'':`הלבישי את הדמות ב${g=='jw'?'תכשיט':'פריט'} הזה בכל 8 הזוויות. אותו פריט בדיוק בכל המשבצות: אותו צבע, אותו בד, אותה גזרה, אותו גודל. `)+how+(n>1?'\nבכל תמונה: אותו פריט בדיוק בכל 8 הזוויות, אותו צבע, אותו בד, אותו גודל, ובצד ובגב כמו שהוא נראה באמת מהכיוון הזה.':''));
 if(g=='cloth')P.push('אם בתמונת המוצר יש עוד בגדים או אביזרים שלא כתבתי, הם לא שלי: אל תוסיפי אותם. בלי חגורה, גם אם בתמונה יש חגורה.');
 P.push(`אל תשני שום דבר אחר: אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותם פנים בדיוק, אותה תנוחה, אותו רקע, אותם קווים לבנים בין המשבצות. כל מה שהדמות כבר לובשת בגיליון (כיסוי ראש בז׳, שמלה בצבע עור) נשאר בדיוק אותו דבר${g=='head'?', חוץ מהראש':''}. השמלה בצבע עור נשארת בכל מקום שהפריט לא מכסה.`);
 if(body)P.push(`המידות שלי: ${ME}. הדמות כבר בנויה לפי המידות האלה, אל תשני את הגוף. המידות הן כדי שהפריט יישב נכון, צמוד או רחב כמו במציאות.`+(len?'\nשמרי על אותו אורך ביחס לגוף כמו בתמונת המוצר, ואותו אורך בכל 8 הזוויות.':''));
 if(g=='cloth')P.push('הבגד צריך להיראות אמיתי על הגוף: קפלים, צללים, הבד נופל לפי התנוחה. לבן בבגד נשאר לבן.');
 P.push(n>1?`החזירי ${n} תמונות נפרדות, אחת לכל ${g=='jw'?'תכשיט':'חלק'}. כל תמונה היא אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.`:'החזירי תמונה אחת: אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.');
 return (window.zipAsk||String)(P.join('\n\n'))}
let MK=null,MKID='';
function mkDlg(){
 if(!MK){MK=document.createElement('dialog');MK.id='r3mk';MK.dir='rtl';MK.setAttribute('aria-labelledby','r3mkt');document.body.appendChild(MK);
  MK.addEventListener('click',async e=>{if(e.target===MK)return MK.close();const b=e.target.closest('button');if(!b)return;
   if(b.classList.contains('mkx'))return MK.close();
   if(b.dataset.mk=='photo'){try{let u=ph(MKID);if(!u||u==TPH){await thLoad(cat(MKID));u=ph(MKID)}const bl=await (await fetch(u)).blob();saveFile('item-'+MKID+'.jpg',bl)}catch(_){toast_('לא הצלחתי. אפשר צילום מסך של המוצר')}return}
   if(b.dataset.mk=='sheet'){try{const bl=await (await fetch('a8/sheet.jpg'+V)).blob();saveFile('avatar-8-angles.jpg',bl)}catch(_){toast_('לא הצלחתי לשמור')}return}
   if(b.dataset.mk=='copy'){const t=MK.querySelector('textarea');let ok=false;try{await navigator.clipboard.writeText(t.value);ok=true}catch(_){try{t.select();ok=document.execCommand('copy')}catch(__){}}
    b.textContent=ok?'✓ הועתק – עכשיו ל-GPT':'סימנתי, להעתיק ידנית';if(!ok){const d=MK.querySelector('details');if(d)d.open=true;t.select()}setTimeout(()=>b.textContent='📋 להעתיק את הפרומפט',2600)}
   if(b.dataset.styopen!=null){try{window.STY199&&STY199.open(b.dataset.styopen)}catch(_){}return}
   if(b.dataset.mk=='closet'){MK.close();open();TAB='closet';CAT='all';Q='';const q=dlg.querySelector('.r3q');if(q)q.value='';paintTabs();toast_('לוחצים על בגד שכתוב עליו "עוד לא ב-360"')}})}
 return MK}
function make(id){MKID=id;mkDlg();
 const k=KIND[kindOf(id)];
 MK.innerHTML=`<div class="mk"><div class="mkh"><h3 id="r3mkt">"${esc(nm(id))}" על האווטאר</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <div class="mki"><img alt="" data-th="${id}" src="${ph(id)}"><p>לפריט הזה עוד אין גיליון 360, אז הוא עוד לא יכול להופיע על האווטאר. ככה מכינים אותו (${k[4]>1?k[4]+' תמונות חוזרות':'2 דקות'}):</p></div>
  <ol class="mks">
   <li><b>שומרים 2 תמונות</b><span class="mkb"><button type="button" data-mk="photo">⬇ תמונת הפריט</button><button type="button" data-mk="sheet">⬇ הבובה ב-8 זוויות</button></span><small>אם יש תמונה יותר טובה של המוצר מהאתר, עדיף אותה.</small></li>
   <li><b>ב-GPT, בשיחה חדשה:</b> מצרפים את שתי התמונות (קודם הפריט, אחר כך הבובה), מדביקים את הפרומפט ושולחים. הכל בהודעה אחת.<span class="mkb"><button type="button" data-mk="copy" class="mkp">📋 להעתיק את הפרומפט</button></span></li>
   <li><b>את התמונה שחוזרת</b> (אחת, עם 8 הזוויות) מעלים כאן. האתר גוזר אותה, מתאים בדיוק לבובה ומכניס את הבגד לסטודיו.<span class="mkb"><button type="button" data-up188="${id}" class="mkp">📤 להעלות תמונה של 8 זוויות</button></span><small data-mkst188="${id}">${window.mkst188?mkst188(id):''}</small></li>
  </ol>
  <details><summary>לראות את הפרומפט</summary><textarea readonly rows="10">${esc(prompt(id))}</textarea></details></div>`;
 thl([id]);if(!MK.open)MK.showModal()}

// every GPT prompt for the 360 avatar in one place (Sara 21:39 "איפה הפרומפטים")
const WIGP=`מצורפות שתי תמונות.
התמונה הראשונה: הפאה שלי מכמה כיוונים.
התמונה השנייה: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון השני, אל תציירי אותו מחדש. שני דבר אחד בלבד: במקום כיסוי הראש הבז׳ שימי את הפאה שלי מהתמונה הראשונה. אותו צבע, אותו אורך, אותה חלוקה ואותו נפח. כיסוי הבז׳ נעלם לגמרי. השיער יושב על הראש בגודל טבעי, לא גבוה ולא רחב מדי. בצד ובגב צרי את השיער כמו שהוא נראה באמת מהכיוון הזה.

הפנים לא משתנים בכלל: אותם פנים, אותה הבעה, אותו חיוך, אותו עור. הראש באותו גודל ובאותו מקום בדיוק בכל משבצת.

אל תשני שום דבר אחר: אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותה תנוחה, אותו רקע, אותם קווים לבנים בין המשבצות. השמלה בצבע עור נשארת.

החזירי תמונה אחת: אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.`;
function prompts(){mkDlg();MKID='';
 MK.innerHTML=`<div class="mk"><div class="mkh"><h3 id="r3mkt">📋 פרומפטים ל-GPT</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <ol class="mks">
   <li><b>בגד מהארון:</b> בסטודיו, בלשונית "👗 הארון שלי", לוחצים על בגד שכתוב עליו "עוד לא ב-360". נפתח חלון עם תמונת הבגד, הבובה והפרומפט של הבגד הזה בדיוק.<span class="mkb"><button type="button" data-mk="closet" class="mkp">👗 לבחור בגד</button></span></li>
   <li><b>הפאה שלי:</b> מצרפים קודם תמונה של הפאה (מכמה כיוונים), אחר כך את הבובה ב-8 זוויות, ומדביקים את הפרומפט. הכל בהודעה אחת.<span class="mkb"><button type="button" data-mk="sheet">⬇ הבובה ב-8 זוויות</button><button type="button" data-mk="copy" class="mkp">📋 להעתיק את הפרומפט</button></span>
    <details><summary>לראות את הפרומפט</summary><textarea readonly rows="10">${esc(WIGP)}</textarea></details></li>
   <li><b>💇 תסרוקות לפאה · 🧕 קשירות לכיסוי · 💄 איפור:</b> כל הפרומפטים, וגם המקום להעלות.<span class="mkb"><button type="button" data-styopen="hair" class="mkp">🎨 לפתוח</button></span></li>
  </ol></div>`;
 if(!MK.open)MK.showModal()}

// ---------- open ----------
// v222 (Sara 18:55 "שהכל יהיה לי כותרות, אני פותחת – נפתח, לוחצת – נסגר"): every group in the side (what she wears, on the head, tie, hairstyle, makeup, base top, background)
// is a heading that opens and closes; closed shows the choice. Which are open is kept on this device
function fold221(){const side=dlg.querySelector('.r3side');if(!side)return;let OPEN;try{OPEN=new Set(JSON.parse(localStorage.getItem('r222open')||'[]'))}catch(_){OPEN=new Set()}
 const keyOf=l=>{const c=l.nextElementSibling;return c?(c.getAttribute('aria-label')||c.className.split(' ')[0]):''};
 const heads=()=>[...side.querySelectorAll('.r3lbl'),...side.querySelectorAll('.r3now>h3')];
 const apply=()=>heads().forEach(l=>{const k=l.tagName=='H3'?'worn':keyOf(l);if(!k)return;const on=OPEN.has(k),cs=l.tagName=='H3'?[side.querySelector('.r3worn')]:[];if(l.tagName!='H3')for(let c=l.nextElementSibling;c&&!c.classList.contains('r3lbl');c=c.nextElementSibling)if(!c.matches('[data-styopen]'))cs.push(c);   // up to the next heading (the 🎯 line goes with the scarf)
  l.classList.add('r3fh');l.setAttribute('role','button');l.tabIndex=0;l.setAttribute('aria-expanded',on);cs.forEach(c=>c&&c.classList.toggle('r3fz',!on));
  const ch=!on&&cs[0]&&cs[0].querySelector('[aria-checked=true] span');l.dataset.pick=ch?'· '+ch.textContent:''});
 const tog=l=>{const k=l.tagName=='H3'?'worn':keyOf(l);if(!k)return;OPEN.has(k)?OPEN.delete(k):OPEN.add(k);try{localStorage.setItem('r222open',JSON.stringify([...OPEN]))}catch(_){}apply()};
 side.addEventListener('click',e=>{const l=e.target.closest('.r3fh');if(l&&side.contains(l))tog(l)});
 // on a phone the avatar is above the list: after a pick, a button brings her up to see it
 let see=null,st=0;side.addEventListener('click',e=>{if(innerWidth>=900||!e.target.closest('[data-sym],[data-syh],[data-syt],[data-sytf],[data-zh]'))return;
  if(!see){see=document.createElement('button');see.type='button';see.className='r3see';see.textContent='👀 לראות על הבובה';see.addEventListener('click',()=>{see.hidden=true;dlg.querySelector('.r3stage').scrollIntoView({behavior:'smooth',block:'start'})});dlg.appendChild(see)}
  see.hidden=false;clearTimeout(st);st=setTimeout(()=>see.hidden=true,6000)});
 side.addEventListener('keydown',e=>{const l=e.target.closest('.r3fh');if(l&&(e.key=='Enter'||e.key==' ')){e.preventDefault();tog(l)}});
 let q=0;new MutationObserver(()=>{if(!q)q=requestAnimationFrame(()=>{q=0;apply()})}).observe(side,{childList:true,subtree:true});apply()}
function open(){try{window.STYORD&&STYORD.freeze();if(!(dlg&&dlg.open)&&STYORD.reset)STYORD.reset()}catch(_){}if(!dlg){build();fold221()}
 document.querySelectorAll('dialog[open]').forEach(d=>{if(d!==dlg&&d.id!='r3mk')try{d.close()}catch(_){}});
 if(!dlg.open){dlg.showModal();document.documentElement.classList.add('r3on')}paintCats();paintTabs();paintRoom();paintMiss();big.show(0);
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.documentElement.dataset.still&&!sessionStorage.getItem('r3spun')){sessionStorage.setItem('r3spun',1);setTimeout(()=>big.play(true),400)}}
function close(){if(big)big.stop();if(dlg&&dlg.open)dlg.close();document.documentElement.classList.remove('r3on')}
// every "בניית לוק" goes here: openStudio() = the studio as it was left; openStudio(look) = a saved look; openStudio(null,{slot:id,...}) = try one item / a suggested look
// v204 (Sara 11:46 "מספיק, יהיה לי כיסוי ראש ופאה, אני לא צריכה שלוש דברים"): only the cover and the wig; a cover item with its own picture is worn from the closet
const HEAD2=()=>HEADS.filter(h=>h.k=='c'||h.k=='w');
function coverThumb(){const k=defTie();return k?styThumb(k,GREY):Promise.resolve('')}
function wearHead(k){if(k=='w'){ST.head='w';return}const t=/^yt/.test(ST.head)?ST.head:defTie();if(!t){ST.head='c';return}if(!/^yt/.test(ST.head)){ST.tf='c';ST.tc=GREY}ST.head=t}
function paintHeads(){const hs=dlg&&dlg.querySelector('.r3heads');if(!hs)return;hs.innerHTML='';HEAD2().forEach(h=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','radio');b.dataset.h=h.k;
  b.innerHTML=`<img alt="" src="${h.src?h.src+(h.dyn?'':V):ph(h.id)}"><span>${esc(h.n||nm(h.id))}</span>`;b.onclick=()=>{wearHead(h.k);keep();redraw()};hs.appendChild(b)});
 coverThumb().then(u=>{const i=u&&hs.querySelector('[data-h="c"] img');if(i)i.src=u})}
function openWith(look,items){MISS=[];
 if(look&&typeof look=='object'){if(look.r360){const bg=ST.bg;ST=Object.assign(clone(DEF),clone(look.r360));if(look.r360.bg==null)ST.bg=bg;MISS=Object.values(look.items||{}).filter(x=>D[x]&&!isReady(x))}else applyIds(Object.values(look.items||{}),true)}
 else if(items&&typeof items=='object'){const ids=Object.values(items).filter(id=>typeof id=='string'&&D[id]);
  if(ids.length==1){const id=ids[0];if(coverTie(id)&&wearCover(id)){keep();open();redraw();toast_('🧕 '+nm(id)+' · '+STY[ST.head].n);return}
   if(isReady(id)){const r=READY[id];if(r.head)ST.head=r.k[0];else if(!r.k.every(k=>ST.on[k]))wearItem(id)}keep();open();redraw();if(!isReady(id))make(id);else toast_('👗 '+nm(id));return}
  applyIds(ids,true)}
 keep();open();redraw()}
function hook(){if(typeof openStudio!='function')return setTimeout(hook,300);
 openStudio=async function(look,items){openWith(look,items)}}
hook();

// ---------- look of the day on the avatar (home hero) ----------
// built by the closet's own outfit maker (genLook: occasion, season, colours) but only from items that are already on the avatar
function genReady(){const avoid=new Set(Object.keys(D).filter(id=>!isReady(id)));const occ=occNow();let sea='';try{sea=curSeason()}catch(_){}
 let best=null;for(let t=0;t<14;t++){let L=null;try{L=genLook({occ:t<7?occ:(occ=='shab'?'day':'shab'),sea,fav:false,kids:false},avoid)}catch(_){}
  if(!L)continue;const ids=Object.values(L).filter(isReady);const full=ids.some(id=>cat(id)=='dresses')||(ids.some(id=>['tops','sweaters'].includes(cat(id)))&&ids.some(id=>cat(id)=='skirts'));
  if(full){best=ids;break}if(!best||ids.length>best.length)best=ids}
 const R=Object.keys(READY).filter(id=>D[id]);
 if(!best||!best.some(id=>['dresses','tops','skirts'].includes(cat(id)))){const day=+new Date().toISOString().slice(0,10).replace(/-/g,'');const dr=R.filter(id=>cat(id)=='dresses');
  best=(dr.length&&(occ=='shab'||day%2))?[dr[day%dr.length]]:R.filter(id=>['tops','skirts','belts'].includes(cat(id)));R.filter(id=>['shoes','jewelry'].includes(cat(id))).forEach(id=>best.push(id))}
 return [...new Set(best)]}
function lotd(fresh){const d=new Date().toISOString().slice(0,10),o=occNow();let c=null;try{c=JSON.parse(localStorage.getItem('lotd360')||'null')}catch(_){}
 if(fresh||!c||c.d!=d||c.o!=o||!c.ids||!c.ids.every(id=>isReady(id))){c={d,o,ids:genReady()};try{localStorage.setItem('lotd360',JSON.stringify(c))}catch(_){}}
 return c}
// what the home avatar wears: her pinned look ("📌 לדף הראשי" in the studio) or the look of the day; the head is her own choice (Sara 21:17: "לא תמיד עם פאה")
let HOME=(()=>{try{return Object.assign({head:'c',pin:null},JSON.parse(localStorage.getItem('r3home')||'{}'))}catch(_){return {head:'c',pin:null}}})();
function saveHome(){try{localStorage.setItem('r3home',JSON.stringify(HOME))}catch(_){}if(DB)DB.collection('r360').doc('home').set(clone(HOME)).catch(()=>{});STAGES.forEach(s=>s.today&&s.draw());HOMEL.forEach(f=>{try{f()}catch(_){}})}
const HOMEL=new Set();
// v185 (Sara 22:41 "אם בחרתי לוק אני רוצה שיופיע במסך הראשי, אין לי כפתור"): "📌 לדף הראשי" on the studio, on every saved look and in the looks album –
// it puts the look on the home avatar and jumps there, so she sees it happen
function pinGo(s,name){HOME.pin=clone(s);HOME.head=s.head||'c';saveHome();close();
 document.querySelectorAll('dialog[open]').forEach(d=>{try{d.close()}catch(_){}});
 if(window.zHome&&document.documentElement.dataset.d180=='z50')zHome();const hb=document.querySelector('.bnav [data-bn="home"]');if(hb)hb.click();else window.scrollTo({top:0,behavior:'smooth'});
 const av=document.querySelector('#h180 .z-av');if(av){av.classList.remove('z-pin185');void av.offsetWidth;av.classList.add('z-pin185');setTimeout(()=>av.classList.remove('z-pin185'),2600)}
 toast_(name?`📌 "${name}" בדף הראשי`:'📌 הלוק הזה בדף הראשי')}
const pinB=(k,n)=>`<button type="button" class="r3lp" data-l3pin="${esc(k)}" aria-label="לשים את ${esc(n||'הלוק')} בדף הראשי">📌 לדף הראשי</button>`;
function nudgePin(){const b=dlg&&dlg.querySelector('.r3pin');if(!b)return;b.classList.remove('r3nudge');void b.offsetWidth;b.classList.add('r3nudge');setTimeout(()=>b.classList.remove('r3nudge'),3200)}
(async()=>{try{const db=await window.claude?.use?.('db');if(!db)return;const d=await db.collection('r360').doc('home').get();const v=d&&d.exists&&d.data&&d.data();
 if(v&&!localStorage.getItem('r3home')){HOME=Object.assign({head:'c',pin:null},v);STAGES.forEach(s=>s.today&&s.draw());HOMEL.forEach(f=>{try{f()}catch(_){}})}}catch(_){}})();
let LOTD=null;const lotdIds=()=>{if(!LOTD||LOTD.ids.some(id=>!READY[id]))LOTD=lotd();return LOTD.ids.filter(id=>READY[id]&&!READY[id].head)};   // v267: an item taken off the avatar no longer breaks the look of the day
function homeState(){const head=HOME.head||'c';
 if(HOME.pin)return Object.assign(clone(DEF),clone(HOME.pin),{head});
 return stateFrom(lotdIds(),{head,cam:ST.cam,wb:ST.wb,bg:ST.bg})}
const TODAY={state:homeState,
 ids:()=>{const s=homeState();return wornIds(s).filter(id=>READY[id]&&!READY[id].head)},
 pinned:()=>!!HOME.pin,heads:()=>HEAD2().map(h=>({k:h.k,n:h.n||nm(h.id).split(' ').slice(0,2).join(' '),src:h.k=='c'&&STH[defTie()+'|'+GREY.join(',')]||(h.src?h.src+(h.dyn?'':V):ph(h.id))})),coverThumb,head:()=>HOME.head||'c',
 setHead:k=>{HOME.head=k;saveHome()},
 pin:()=>pinGo(ST),
 pinLook:k=>{const o=lookOf(k);if(!o)return;if(!wornIds(o.s).length)return toast_('אין עוד בגד מהלוק הזה על האווטאר 360');pinGo(o.s,o.name)},
 pinIds:(ids,name)=>{ids=ids.filter(id=>D[id]);if(!ids.some(isReady))return toast_('אין עוד בגד מהלוק הזה על האווטאר 360');pinGo(stateFrom(ids.filter(isReady),{head:HOME.head||'c',cam:ST.cam,bg:ST.bg}),name)},
 unpin:()=>{HOME.pin=null;saveHome()},
 next:()=>{HOME.pin=null;LOTD=lotd(true);saveHome();return TODAY.ids()},
 onchange:f=>HOMEL.add(f),
 wear:()=>{const s=homeState();ST=Object.assign(clone(DEF),clone(s));MISS=[];keep();open();redraw()}};

// the looks album and the suggested looks ("הלוקים שלי") get the same "📌 לדף הראשי"
try{if(typeof lookHTML=='function'){const _lh=lookHTML;lookHTML=function(L,idx,saved){const h=_lh.apply(this,arguments);
 return h.replace('<div class="lb">',`<div class="lb"><button type="button" class="lb185" ${saved?`data-pin185="${esc(saved.id)}"`:`data-pin185g="${idx}"`}>📌 לדף הראשי</button>`)}}}catch(e){(window.ERRS=window.ERRS||[]).push('v185 hub pin: '+e.message)}
try{if(typeof albumHTML=='function'){const _al=albumHTML;albumHTML=async function(){const h=await _al.apply(this,arguments);
 return String(h).replace(/<div class="lb"><button data-sedit="([^"]+)">/g,(m0,id)=>`<div class="lb"><button type="button" class="lb185" data-pin185="${id}">📌 לדף הראשי</button><button data-sedit="${id}">`)}}}catch(e){(window.ERRS=window.ERRS||[]).push('v185 album pin: '+e.message)}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-pin185],[data-pin185g]');if(!b)return;e.preventDefault();e.stopPropagation();
 if(b.dataset.pin185!=null)TODAY.pinLook('m:'+b.dataset.pin185);else{let L=null;try{L=GEN[+b.dataset.pin185g]}catch(_){}if(L)TODAY.pinIds(Object.values(L),'הלוק')}},true);

// v238 (Sara 27/10 10:00 "פותחת את הקשירות ולוקח הרבה זמן עד שהן עולות"): every picture drawn for a style (8 angles, cards, chips) is kept on her phone
// (IndexedDB, per site version and per the exact layers it was drawn from), so the next time it opens at once; cards first draw only the front angle.
const KV=(()=>{let db=null;const op=()=>db||(db=new Promise(r=>{try{const q=indexedDB.open('r360c',1);q.onupgradeneeded=()=>{try{q.result.createObjectStore('k')}catch(_){}};q.onsuccess=()=>r(q.result);q.onerror=()=>r(null);q.onblocked=()=>r(null)}catch(_){r(null)}}));
 const tx=async(m,f)=>{const d=await op();if(!d)return null;return new Promise(r=>{try{const t=d.transaction('k',m),q=f(t.objectStore('k'));t.oncomplete=()=>r(q&&q.result);t.onerror=t.onabort=()=>r(null)}catch(_){r(null)}})};
 return {get:k=>tx('readonly',st=>st.get(k)),put:(k,v)=>tx('readwrite',st=>st.put(v,k)),
  tidy:p=>tx('readwrite',st=>{const q=st.openKeyCursor?st.openKeyCursor():st.openCursor();q.onsuccess=()=>{const c=q.result;if(!c)return;if(!String(c.key).startsWith(p))st.delete(c.key);c.continue()};return null})}})();
const KVV='rv2:'+String(window.A8V||window.VER||'')+'|';   // v245: was the site version, so every update wiped her saved pictures; bump rv1 when the drawing code changes
const sig8=s=>[s.head,s.mk,defTie()].filter(Boolean).map(k=>k+':'+(DYN[k+'1']||'')+(DYN['z'+String(k).slice(1)+'1']||'')).join(',')+'|'+(s.tc?s.tc.join(','):'');
const pkey=(t,ck,s)=>KVV+t+'|'+ck+'|'+sig8(s);
const PQ=new Map(),FR0={};
{const f8=frames8;frames8=function(ck,s){if(FRM[ck])return Promise.resolve(FRM[ck]);const q='f'+ck;if(PQ.has(q))return PQ.get(q);const kk=pkey('f',ck,s);
  const p=KV.get(kk).then(v=>Array.isArray(v)&&v.length==8?(FRM[ck]=v):f8(ck,s).then(F=>{if(F&&F.length==8)KV.put(kk,F);return F})).catch(()=>f8(ck,s)).finally(()=>PQ.delete(q));PQ.set(q,p);return p}}
{const fc=styCard;styCard=function(k,o){o=o||{};if(k&&!STY[k])return Promise.resolve('');const ck=[k||'base:'+(o.set||'tie'),o.all?'all':o.one?'one':'',o.rgb?o.rgb.join(','):''].join('|');if(CARD[ck])return Promise.resolve(CARD[ck]);
  const q='c'+ck;if(PQ.has(q))return PQ.get(q);const kk=pkey('c',ck,{head:k,mk:'',tc:o.rgb});
  const p=KV.get(kk).then(v=>typeof v=='string'&&v?(CARD[ck]=v):fc(k,o).then(u=>{if(u)KV.put(kk,u);return u})).catch(()=>fc(k,o)).finally(()=>PQ.delete(q));PQ.set(q,p);return p}}
{const ft=styThumb;styThumb=function(k,rgb){const ck=rgb?k+'|'+rgb.join(','):k;if(STH[ck])return Promise.resolve(STH[ck]);const st=STY[k];if(!st)return Promise.resolve('');
  const q='t'+ck;if(PQ.has(q))return PQ.get(q);const kk=pkey('t',ck+'|'+(st.cu||''),{head:k,mk:'',tc:st.set=='tie'?(rgb||ST.tc||GREY):null});
  const p=KV.get(kk).then(v=>typeof v=='string'&&v?(STH[ck]=v):ft(k,rgb).then(u=>{if(u)KV.put(kk,u);return u})).catch(()=>ft(k,rgb)).finally(()=>PQ.delete(q));PQ.set(q,p);return p}}
// the front angle alone: what a card shows until she turns it
function styFrame0(k,o){o=o||{};const st=STY[k];if(!st)return Promise.resolve('');const hk=st.set=='mk'?hairHead():k,ck=k+'|'+(o.rgb?o.rgb.join(','):'')+(st.set=='mk'?'|'+hk:'');
 if(FRM[ck])return Promise.resolve(FRM[ck][0]);if(FR0[ck])return FR0[ck];
 const s=Object.assign(clone(DEF),{on:{},bg:'',head:hk,mk:st.set=='mk'?k:'',tc:st.set=='tie'?(o.rgb||GREY):null}),kk=pkey('f',ck,s),k0=pkey('f0',ck,s);
 return FR0[ck]=(async()=>{const a=await KV.get(kk);if(Array.isArray(a)&&a.length==8){FRM[ck]=a;return a[0]}const b=await KV.get(k0);if(typeof b=='string'&&b)return b;
  const c=document.createElement('canvas');if(!await paint(c,0,s))return '';const f=document.createElement('canvas');f.width=176;f.height=240;f.getContext('2d').drawImage(c,70,0,220,300,0,0,176,240);
  const u=f.toDataURL('image/jpeg',.84);KV.put(k0,u);return u})().catch(()=>'').then(u=>{if(!u)delete FR0[ck];return u})}
setTimeout(()=>{try{KV.tidy(KVV)}catch(_){}},9000);   // pictures of older versions go
// v288b: ↺ איפוס – everything off the avatar in one tap (Sara 28/10 15:18 "במקום שאני אוריד כל דבר… מאפס"); ↩ brings it all back
function reset(){UNDO={a:clone(ST),n:'כל מה שהיה עלייך'};ST=Object.assign(clone(DEF),{on:{},bg:ST.bg,cam:ST.cam});UNDO.bj=JSON.stringify(ST);MISS=[];keep();redraw();try{paintMiss()}catch(_){}}
window.R360={reset,dbgPaint:async(h,mk,v,on)=>{const c=document.createElement("canvas");if(!await paint(c,v,Object.assign(clone(DEF),{on:on||{},bg:"",head:h,mk:mk||"",tc:null})))return "";return c.toDataURL("image/png")},dbgFrames:(h,mk,on,raw)=>frames8("#dbg|"+h+"|"+mk+"|"+JSON.stringify(on||{})+(raw?"r":""),Object.assign(clone(DEF),{on:on||{},bg:"",head:h,mk:mk||"",tc:null,rawHead:raw?1:0})),open,close,make,prompts,openWith,styCard,styFace,styFrames,styFrame0,headFrames,restyle:()=>{try{if(dlg&&dlg.open)paintSty()}catch(_){}},Stage:(host,o)=>{const s=Stage(host,o);if(o&&o.today)s.today=1;STAGES.add(s);return s},wearing:()=>wearing(ST),today:TODAY,
 ready:()=>Object.keys(READY).filter(id=>D[id]),isReady,kind:kindOf,KIND,ME,prompt1:prompt,sync:resync,dyn:id=>!!(READY[id]&&READY[id].dyn),names:NAMES,show:v=>{if(big){big.stop();big.show(v)}},
 still:async(id,v)=>{if(!READY[id])return null;const s=stateFrom([id],{head:ST.head=='w'?'w':'c',cam:ST.cam,bg:''});
  if((await Promise.all(layersFor(v||0,s).map(l=>im(l.s)))).some(m=>!m))return null;   // a layer that did not load would show the bare doll
  const c=document.createElement('canvas');return await paint(c,v||0,s)?c:null},   // v195: the doll wearing just this item (the first picture in its window), with her wig if she picked it in the studio
 wig:()=>ST.head=='w',
 styles,styKey,styThumb,saveFile,styName:k=>STY[k]?STY[k].n:'',
 wearStyle:k=>{const st=STY[k];if(!st)return;if(st.set=='mk')ST.mk=k;else{if(st.set=='tie'&&!/^yt/.test(ST.head)){ST.tf=ST.head=='w'||/^yh/.test(ST.head)?'c':ST.head;ST.tc=null}ST.head=k;
  if(st.set=='tie'&&!ST.tc)tfRGB(ST.tf).then(c=>{if(ST.head==k&&!ST.tc){ST.tc=c;keep();redraw()}})}keep();open();redraw()},
 isCover,coverTie,tieFor,itemRGB,styList,
 wearCover:(id,k)=>{if(!wearCover(id,k))return false;keep();open();redraw();return true},
 tiles:id=>{const r=READY[id];if(!r)return null;return NAMES.map((_,v)=>r.k.map(k=>DYN['x'+k+(v+1)]||'a8/x'+k+(v+1)+'.webp'+V))},   // v191: the 8 cut pieces, for the item window
readyCount:()=>{const P=pool();return [P.filter(isReady).length,P.length]},nm,ph};
})();
