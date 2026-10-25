
/* ===== v100: her bodysuit in any colour (new avatar) · a belt wraps the waist ===== */
{
// ---- 1. bodysuit colour: the suit part of her avatar picture is recoloured at display time (mask per pose, folds kept)
const suitOf100=S=>(S&&S.base&&S.base.suit)||(typeof SET!='undefined'&&SET&&SET.suit100)||'orig';
const rgb100=c=>{if(!c||c=='orig')return null;if(c[0]=='#'){const n=parseInt(c.slice(1),16);return [n>>16&255,n>>8&255,n&255]}return BASEC[c]&&BASEC[c][1]};
const LD100={},RC100={};
const ld100=s=>LD100[s]||(LD100[s]=new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=s}));
function tint100(src,pre,v,col){const k=src+'|'+col.join(',');if(RC100[k])return RC100[k];
 return RC100[k]=(async()=>{const [a,m]=await Promise.all([ld100(src),ld100(`av/${pre}_suit_${v}.png?v=${window.VER||''}`)]);if(!a||!m)return src;
  const W=a.naturalWidth,H=a.naturalHeight,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d',{willReadFrequently:true});
  x.drawImage(m,0,0,W,H);const M=x.getImageData(0,0,W,H).data;x.clearRect(0,0,W,H);x.drawImage(a,0,0);const P=x.getImageData(0,0,W,H),p=P.data;
  let s=0,n=0;for(let i=0;i<p.length;i+=4)if(M[i]>128){s+=.3*p[i]+.59*p[i+1]+.11*p[i+2];n++}if(!n)return src;const med=s/n;
  for(let i=0;i<p.length;i+=4){const al=M[i]/255;if(!al)continue;const l=.3*p[i]+.59*p[i+1]+.11*p[i+2],sh=l/med;
   for(let j=0;j<3;j++)p[i+j]=p[i+j]*(1-al)+Math.max(0,Math.min(255,col[j]*sh+(l-med)*.35))*al}
  x.putImageData(P,0,0);return cv.toDataURL('image/webp',.92)})()}
// ---- 2. belt: stretched so it covers her waist and whatever is worn under it (per pose, unless she placed it herself)
const UNDER100=['top','dress','skirt','set','vest'];
const bwOf100=S=>{const tf=S&&S.tf&&S.tf.belt;return tf&&tf.bw100&&tf.bw100[S.view||'front']};
{const _si=stageInner;stageInner=async function(S,opt={}){let html=await _si(S,opt);
 // v110: her arms hang beside the skirt, not inside it – a layer of only her forearms/hands (cut from her own avatar picture) goes above the skirt, below tops/dresses
 try{const m=html.match(/src="av\/(p6[cw])_(front|side|back|half|hip)(?:_neck)?\.webp(\?v=[^"]*)?"/);if(m&&S.items&&S.items.skirt&&!S.items.dress&&!S.items.set)html=stageAdd(html,`<img class="sh arm110" src="av/${m[1]}_arms_${m[2]}.webp${m[3]||''}" style="z-index:${SLOTZ.skirt+2}" alt="" draggable="false">`)}catch(e){ERR('v110 arms',e)}
 try{const c=rgb100(suitOf100(S));if(c){const hits=[...new Set([...html.matchAll(/src="(av\/(p6[cw])_(front|side|back|half|hip)(_neck)?\.webp(\?v=[^"]*)?)"/g)].map(h=>h[0]))];
  for(const h of hits){const m=h.match(/src="(av\/(p6[cw])_(front|side|back|half|hip)(_neck)?\.webp(\?v=[^"]*)?)"/);const u=await tint100(m[1],m[2],m[3],c);html=html.split(h).join(`src="${u}"`)}}}catch(e){ERR('v100 suit',e)}
 try{const bw=bwOf100(S);if(bw&&(bw.k!=1||bw.dx))html=html.replace(/<img class="sl[^"]*"[^>]*data-slot="belt"[^>]*>/,t=>t.replace(/left:(-?[\d.]+)%/,(q,a)=>`left:${Math.round((+a+bw.dx)*10)/10}%`).replace(/scale\((-?[\d.]+),/,(q,a)=>`scale(${Math.round(a*bw.k*1000)/1000},`))}catch(e){ERR('v100 belt',e)}
 return html}}
const AL100={};
async function alpha100(src){if(AL100[src])return AL100[src];const im=await ld100(src);if(!im)return null;const W=im.naturalWidth,H=im.naturalHeight;const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0);
 let d;try{d=x.getImageData(0,0,W,H).data}catch(_){return null}return AL100[src]={W,H,d}}
// the opaque run on one row that holds the point cx (a gap separates sleeves / arms from the body)
function run100(A,r,cx){r=Math.max(0,Math.min(A.H-1,Math.round(r)));const op=c=>c>=0&&c<A.W&&A.d[(r*A.W+c)*4+3]>110;let c0=Math.round(cx);
 if(!op(c0)){let f=-1;for(let k=1;k<=A.W*.06;k++){if(op(c0-k)){f=c0-k;break}if(op(c0+k)){f=c0+k;break}}if(f<0)return null;c0=f}
 let a=c0,b=c0;while(op(a-1))a--;while(op(b+1))b++;return [a,b]}
// the whole width of her bodysuit on one row (the mask has no arms)
function full100(A,r){r=Math.max(0,Math.min(A.H-1,Math.round(r)));let a=-1,b=-1;for(let c=0;c<A.W;c++)if(A.d[(r*A.W+c)*4]>110){if(a<0)a=c;b=c}return a<0?null:[a,b]}
// screen x-range of one layer at screen row y around screen x cx
async function scr100(img,y,cx,msk){const A=await alpha100(msk||img.currentSrc||img.src);if(!A)return null;const R=img.getBoundingClientRect();if(!R.width||y<R.top||y>R.bottom)return null;
 let f=new DOMMatrix(getComputedStyle(img).transform).a<0;if(img.closest('.mirw'))f=!f;const nx=X=>f?(R.right-X)/R.width*A.W:(X-R.left)/R.width*A.W,sx=c=>f?R.right-c/A.W*R.width:R.left+c/A.W*R.width;
 const e=msk?full100(A,(y-R.top)/R.height*A.H):run100(A,(y-R.top)/R.height*A.H,nx(cx));if(!e)return null;const p=sx(e[0]),q=sx(e[1]+1);return [Math.min(p,q),Math.max(p,q)]}
async function beltWrap100(){if(!ST||(ST.avbase||'long')!='p5'||!ST.items.belt)return false;const v=ST.view||'front',tf=ST.tf.belt;if(!tf||(tf.pvman&&tf.pvman[v]))return false;
 const sig=UNDER100.map(k=>ST.items[k]||'').join(',')+'|'+(tf.gv||'');tf.bw100=tf.bw100||{};const old=tf.bw100[v];if(old&&old.sig==sig)return false;
 const st=document.getElementById('sstage');const b=st&&st.querySelector('img.sl[data-slot="belt"]');if(!b)return false;
 const imgs=[b,...st.querySelectorAll('img.sl,img.sb')];await Promise.all(imgs.map(i=>i.decode?i.decode().catch(()=>{}):0));
 const SR=st.getBoundingClientRect(),BR=b.getBoundingClientRect();if(!SR.width||!BR.width)return false;const mir=!!st.querySelector('.mirw');
 const y=BR.top+BR.height/2;const base=st.querySelector('img.sb');
 // her body at that height: the run of the avatar picture around the middle (the arms are apart from the waist)
 const bm=((base&&base.getAttribute('src'))||'').match(/(p6[cw])_(front|side|back|half|hip)/);const pre=bm?bm[1]:(ST.head=='wig'?'p6w':'p6c');
 let T=base?await scr100(base,y,BR.left+BR.width/2,`av/${pre}_suit_${v}.png?v=${window.VER||''}`):null;const cx=T?(T[0]+T[1])/2:BR.left+BR.width/2;
 for(const k of UNDER100){const i=st.querySelector(`img.sl[data-slot="${k}"]`);if(!i||i.classList.contains('ghost'))continue;const e=await scr100(i,y,cx);if(e)T=T?[Math.min(T[0],e[0]),Math.max(T[1],e[1])]:e}
 const be=await scr100(b,y,BR.left+BR.width/2);if(!T||!be)return false;
 const k0=old?old.k:1,dx0=old?old.dx:0;const need=(T[1]-T[0])*1.04/(be[1]-be[0]);let k=k0,dx=dx0;
 if(need>1.01){k=Math.min(2.6,k0*need);const d=((T[0]+T[1])/2-(be[0]+be[1])/2)/SR.width*100;dx=dx0+(mir?-d:d)}else if(!old){k=1;dx=0}
 tf.bw100[v]={k:Math.round(k*1000)/1000,dx:Math.round(dx*10)/10,sig};return Math.abs(k-k0)>.005||Math.abs(dx-dx0)>.05}
{const _ds=drawStudio;let busy=false;drawStudio=async function(...a){const r=await _ds.apply(this,a);if(busy)return r;busy=true;
 try{suitBtn100();if(await beltWrap100())await _ds.apply(this,a)}catch(e){ERR('v100 wrap',e)}finally{busy=false}return r}}
// "התאימי לגוף" / reset for the belt starts the wrap again
document.addEventListener('click',e=>{try{if(e.target.closest&&e.target.closest('#sfit,[data-fit],#sreset')&&ST&&ST.tf.belt&&ST.tf.belt.bw100)delete ST.tf.belt.bw100[ST.view||'front']}catch(_){}},true);
// ---- 3. buttons: "🎨 בגד גוף" next to the head button, and a row in the base chooser
function suitBtn100(){const h=document.getElementById('shead');if(!h||!ST)return;let b=document.getElementById('ssuit100');const on=(ST.avbase||'long')=='p5';
 if(!b){h.insertAdjacentHTML('afterend','<button id="ssuit100" data-e71="1"></button>');b=document.getElementById('ssuit100')}
 b.hidden=!on;const c=rgb100(suitOf100(ST));b.innerHTML=`<i class="d100" style="background:${c?'rgb('+c+')':'#e3c3ab'}"></i>בגד גוף`}
function openSuit100(){if(!ST)return;try{closeDrawer()}catch(_){}const cur=suitOf100(ST);const d=document.getElementById('sdrawer');if(!d)return;
 const nm={orig:'כמו בתמונה'};d.innerHTML=`<div class="dh"><b>🎨 בגד הגוף · מתחת לבגדים</b><button class="x" id="dclose">✓</button></div><div class="bcols s100">${Object.entries(BASEC).map(([c,[n,rgb]])=>`<button data-suit100="${c}" aria-pressed="${cur==c}"><i style="background:${rgb?'rgb('+rgb+')':'#e3c3ab'}"></i>${nm[c]||n}</button>`).join('')}<label class="c100" aria-pressed="${cur[0]=='#'}"><i style="background:${cur[0]=='#'?cur:'conic-gradient(#e33,#ec3,#3c5,#3be,#55e,#d3c,#e33)'}"></i>צבע אחר<input type="color" id="suit100c" value="${cur[0]=='#'?cur:'#6b4f7a'}"></label></div><p class="n100">באווטאר החדש. הצבע נשמר ללוק הזה וללוקים חדשים.</p>`;d.classList.add('open')}
let T100=null;
async function setSuit100(c){if(!ST)return;try{pushH()}catch(_){}ST.base=ST.base||{};ST.base.suit=c;try{SET.suit100=c;saveSet()}catch(_){}
 document.querySelectorAll('[data-suit100]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.suit100==c));const l=document.querySelector('#sdrawer .c100');if(l){l.setAttribute('aria-pressed',c[0]=='#');if(c[0]=='#')l.querySelector('i').style.background=c}
 await drawStudio()}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#ssuit100,[data-suit100],[data-suit100open]');if(!t)return;e.preventDefault();e.stopImmediatePropagation();
 if(t.dataset.suit100)setSuit100(t.dataset.suit100);else openSuit100()},true);
document.addEventListener('input',e=>{if(e.target&&e.target.id=='suit100c'){const c=e.target.value;clearTimeout(T100);T100=setTimeout(()=>setSuit100(c),180)}},true);
{const _ob=window.openBaseDrawer;if(_ob)window.openBaseDrawer=function(...a){const r=_ob.apply(this,a);try{const l=document.querySelector('#sdrawer .avbl');if(l&&!document.querySelector('#sdrawer [data-suit100open]')){const c=rgb100(suitOf100(ST));
 l.insertAdjacentHTML('afterend',`<button class="r100" data-suit100open="1"><i class="d100" style="background:${c?'rgb('+c+')':'#e3c3ab'}"></i><span><b>🎨 צבע בגד הגוף</b><small>לבן, שחור, צבע גוף או כל צבע</small></span></button>`)}}catch(e){ERR('v100 drawer',e)}return r}}
}
