// ===== v91: the garment on the avatar – one size for all poses, dresses fitted shoulder→waist, clone brush, wig without a covering, drawer item window =====
{
const P5D=()=>typeof ST!='undefined'&&ST&&(ST.avbase||'long')=='p5';
const r1=n=>Math.round(n*10)/10;
// ---- 1. dresses: shoulders on her shoulders, the waist seam on her waist, the width from the waist (and never narrower than her shoulders)
const FITD=['dress','set'];const AN={};
async function anaG(url){if(AN[url])return AN[url];return AN[url]=(async()=>{const im=await ldImg(url);if(!im||!im.naturalWidth)return null;
 const W=200,H=Math.max(20,Math.round(W*im.naturalHeight/im.naturalWidth));const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0,W,H);const d=x.getImageData(0,0,W,H).data;
 const runs=[];for(let y=0;y<H;y++){const rr=[];let s=-1;for(let i=0;i<=W;i++){const on=i<W&&d[(y*W+i)*4+3]>60;if(on&&s<0)s=i;if(!on&&s>=0){rr.push([s,i-1]);s=-1}}runs.push(rr)}
 let top=-1,bot=-1;for(let y=0;y<H;y++)if(runs[y].length){if(top<0)top=y;bot=y}if(top<0)return null;const gh=bot-top+1;
 const ext=y=>{const r=runs[y];return r.length?[r[0][0],r[r.length-1][1]]:null};
 // the skirt's middle tells where the body is (sleeves hang beside it)
 const mids=[];for(let y=Math.round(top+gh*.7);y<=top+gh*.85;y++){const e=ext(y);if(e)mids.push((e[0]+e[1])/2)}mids.sort((a,b)=>a-b);let cx=mids.length?mids[mids.length>>1]:W/2;
 const torso=y=>{const r=runs[y];let best=null,bd=1e9;for(const q of r){const dd=cx<q[0]?q[0]-cx:cx>q[1]?cx-q[1]:0;if(dd<bd){bd=dd;best=q}}return bd<=6?best:null};
 const tw=[];for(let y=0;y<H;y++){const t=torso(y);tw.push(t?t[1]-t[0]+1:0)}
 const sm=y=>{let s=0,n=0;for(let k=-2;k<=2;k++){const v=tw[y+k];if(v){s+=v;n++}}return n?s/n:0};
 let wy=-1,wmin=1e9;for(let y=Math.round(top+gh*.2);y<=top+gh*.6;y++){const v=sm(y);if(v&&v<wmin){wmin=v;wy=y}}
 let bust=0;for(let y=Math.round(top+gh*.08);y<wy;y++)bust=Math.max(bust,sm(y));
 let shw=0;for(let y=top;y<=top+gh*.12;y++){const e=ext(y);if(e)shw=Math.max(shw,e[1]-e[0]+1)}
 let sh2=0;for(let y=Math.round(top+gh*.03);y<=top+gh*.07;y++){const e=ext(y);if(e)sh2=Math.max(sh2,e[1]-e[0]+1)}
 const wt=wy>=0?torso(wy):null;
 return {W,H,top,bot,wy,wmin,bust,shw,sh2,wcx:wt?(wt[0]+wt[1])/2:cx,ok:wy>0&&wmin<bust*.9}})()}
function bodyShoulder(v,y0){const t=(typeof BODYW=='object')&&BODYW[v];if(!t)return 0;let m=0;for(let y=y0;y<=y0+70;y+=4){const i=Math.round((y-t.y0)/t.s);const r=t.r[i];if(r&&r[1]>r[0])m=Math.max(m,r[1]-r[0])}return m}
// her waist in each pose, measured on the avatar pictures (399×1365): height, width of the body, middle. (FIT_WAIST.side was 40px behind her)
const WAIST91={front:{y:550,w:190,cx:200},back:{y:550,w:188,cx:199},side:{y:550,w:144,cx:174},half:{y:565,w:185,cx:213},hip:{y:700,w:180,cx:152}};window.WAIST91=WAIST91;// v96: fix96 swaps in the new avatar's numbers
// the part above the waist is stretched (or shrunk) to her shoulder→waist length; the skirt part keeps its own proportions
const WPC={};
async function warpUrl(src,k,yf){const key=src+'|'+k+'|'+yf;if(WPC[key])return WPC[key];return WPC[key]=(async()=>{const im=await ldImg(src);if(!im||!im.naturalWidth)return src;const W=im.naturalWidth,H=im.naturalHeight;const hy=Math.round(H*yf);
 const c=document.createElement('canvas');c.width=W;c.height=Math.round(hy*k+(H-hy));const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(im,0,0,W,hy,0,0,W,Math.round(hy*k));x.drawImage(im,0,hy,W,H-hy,0,Math.round(hy*k),W,H-hy);
 return await new Promise(r=>c.toBlob(bl=>r(bl?URL.createObjectURL(bl):src),'image/png'))})()}
window.warpUrl91=warpUrl;
async function fit91(slot,id,tf,v,g){if(!FITD.includes(slot)||!g||!g[v])return false;const B=(typeof P5BODY=='object')&&(P5BODY[v]||P5BODY.front);const WB=WAIST91[v];if(!B||!WB)return false;
 let url=p5gUrl(g,v);try{const cl=await cleanP5(url,(v=='front'||v=='half')&&!tf.nocut);if(cl&&cl.url)url=cl.url}catch(_){}
 const a=await anaG(url);if(!a||!a.ok)return false;
 const yTop=B.y.sh-12,yW=WB.y;let sx=WB.w*1.03/a.wmin;
 const sx0=sx;const bs={front:307,back:322}[v];if(bs&&a.shw*sx<bs*.97)sx=bs*.97/a.shw;const b2={front:300,back:313}[v];if(b2&&a.sh2*sx<b2)sx=b2/a.sh2;sx=Math.min(sx,sx0*1.3);
 const k=Math.round(Math.max(.8,Math.min(1.6,(yW-yTop)/Math.max(4,a.wy-a.top)/sx))*100)/100;const yf=Math.round(a.wy/a.H*1000)/1000;
 const H2=a.H*yf*k+a.H*(1-yf);const cx=WB.cx-(a.wcx-a.W/2)*sx;const cy=yTop-a.top*k*sx+H2*sx/2;
 tf.w=r1(a.W*sx/399*100);tf.x=r1(cx/399*100);tf.y=r1(cy/1365*100);tf.q=1;tf.wq=Object.assign({},tf.wq||{},{[v]:{k,y:yf}});tf._asp=H2/a.W;return true}
window.fit91=fit91;
// her own size: what she did in one pose follows in the others (tf.uk), and her width (tf.sx) is not reset by the automatic fit
function applyUk(tf){const k=tf.uk||1;if(Math.abs(k-1)<.004)return;const h=tf.w/100*399*(tf._asp||2)*(tf.q||1)/1365*100;tf.y=r1(tf.y+h*(k-1)/2);tf.w=r1(tf.w*k)}
if(typeof smartFit=='function'){const _sf=smartFit;smartFit=async function(slot,force,ctx){let id,tf,v,g;
 if(ctx){({id,tf,v,g}=ctx)}else if(P5D()){id=ST.items[slot];tf=ST.tf[slot];v=ST.view||'front';g=tf&&p5gOfT(id,tf)}
 const sx0=tf&&tf.sx;let r=await _sf.apply(this,arguments);
 try{if(tf&&g&&FITD.includes(slot)){if(await fit91(slot,id,tf,v,g)){r=true;try{if(typeof sizeAdj=='function')sizeAdj(id,tf)}catch(_){}}}}catch(e){ERR('fit91',e)}
 try{if(r&&tf){if(slot!='skirt'&&sx0)tf.sx=sx0;applyUk(tf)}}catch(_){}return r};window.smartFit=smartFit}
const LAST={};
function sync91(){if(!P5D())return;const v=ST.view||'front';
 for(const [slot,id] of Object.entries(ST.items)){const tf=ST.tf[slot];if(!id||!tf||slot=='jewelry'||tf.x==null)continue;const rec=LAST[slot];
  if(rec&&rec.tf===tf&&rec.id==id&&(tf.pvv||'front')==rec.v&&rec.w>0){const k=tf.w/rec.w;const v=rec.v;
   if(Math.abs(k-1)>.004){tf.uk=Math.round((tf.uk||1)*k*1000)/1000;for(const [ov,p] of Object.entries(tf.pv||{})){if(ov==v||!p||p.w==null)continue;const h=p.w/100*399*(tf._asp||2)*(p.q||1)/1365*100;p.y=r1(p.y+h*(k-1)/2);p.w=r1(p.w*k)}}}
  LAST[slot]={tf,id,v:tf.pvv||'front',w:tf.w}}}
window.sync91=sync91;
// ---- 2. no covering = the wig, in every pose (before: front/back showed the wig hair, side/half the cap)
const wigNow=()=>{try{if(ST&&ST.head!='wig'&&!ST.items.scarf){ST.head='wig';try{paintTop()}catch(_){}}}catch(_){}};
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-hd77=""],#srail [data-sx="scarf"]');if(!b)return;setTimeout(async()=>{if(ST&&!ST.items.scarf&&ST.head!='wig'){wigNow();await drawStudio()}},60)});
{const _ds=drawStudio;drawStudio=async function(...a){try{sync91()}catch(e){ERR('sync91',e)}const r=await _ds.apply(this,a);try{if(ST){const v=ST.view||'front';for(const [slot,id] of Object.entries(ST.items)){const tf=ST.tf[slot];if(id&&tf)LAST[slot]={tf,id,v:tf.pvv||v,w:tf.w}}}}catch(_){}return r}}
['pointerup','change','click','wheel'].forEach(t=>document.addEventListener(t,()=>setTimeout(()=>{try{sync91()}catch(_){}},30)));
{const _si=stageInner;stageInner=async function(S,opt={}){let html=await _si(S,opt);try{if((S.avbase||'long')=='p5'&&S.head!='wig')html=html.replace(/src="av\/p5_(front|back)_head\.webp/g,'src="av/p5c_$1_headonly.webp')}catch(_){}return html}}

// ---- 3. brushes on the garment, display-time only, kept in tf.cb[view] in the order she made them:
// 🖌 fabric brush = copies fabric from one spot to another (lengthen a sleeve, cover a spot); 🎨 colour brush = paints a colour she sampled from the garment (or chose)
// one brush size for the eraser and both brushes, from very small to big, with ➖ ➕
const CB={mode:null,o:null,src:null,drag:null,col:null,pick:false};const CBC={};window.CB91=CB;
window.BR91=window.BR91||.05;const BRMIN=.008,BRMAX=.22;
const ccache={};async function pixAt(src,u,w){try{let c=ccache[src];if(!c){const im=await ldImg(src);if(!im)return null;c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext('2d').drawImage(im,0,0);ccache[src]=c}
 const R=Math.max(1,Math.round(c.width*.01));const x0=Math.round(u*c.width),y0=Math.round(w*c.height);const d=c.getContext('2d').getImageData(Math.max(0,x0-R),Math.max(0,y0-R),R*2+1,R*2+1).data;let r=0,g=0,b=0,n=0;
 for(let i=0;i<d.length;i+=4)if(d[i+3]>200){r+=d[i];g+=d[i+1];b+=d[i+2];n++}if(!n)return null;const h=v=>Math.round(v/n).toString(16).padStart(2,'0');return '#'+h(r)+h(g)+h(b)}catch(_){return null}}
async function cloneUrl(src,groups){const k='c|'+src+'|'+JSON.stringify(groups);if(CBC[k])return CBC[k];const im=await ldImg(src);if(!im||!im.naturalWidth)return src;const W=im.naturalWidth,H=im.naturalHeight;
 const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);
 for(const gr of groups){const g=gr.g;if(!g||!g.length)continue;const m=document.createElement('canvas');m.width=W;m.height=H;const mx=m.getContext('2d');mx.lineCap='round';mx.lineJoin='round';mx.strokeStyle=gr.c||'#fff';mx.lineWidth=g[0][2]*2*W;
  mx.beginPath();mx.moveTo(g[0][0]*W,g[0][1]*H);if(g.length==1)mx.lineTo(g[0][0]*W+.1,g[0][1]*H);for(const p of g.slice(1))mx.lineTo(p[0]*W,p[1]*H);mx.stroke();
  if(!gr.c){mx.globalCompositeOperation='source-in';mx.drawImage(c,gr.o[0]*W,gr.o[1]*H)}x.drawImage(m,0,0)}
 const u=await new Promise(r=>c.toBlob(bl=>r(bl?URL.createObjectURL(bl):src),'image/png'));CBC[k]=u;return u}
const ERC2={};
async function erase2(src,groups){const k=src+'|'+JSON.stringify(groups);if(ERC2[k])return ERC2[k];const im=await ldImg(src);if(!im||!im.naturalWidth)return src;
 const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d');x.drawImage(im,0,0);x.globalCompositeOperation='destination-out';x.lineCap='round';x.lineJoin='round';
 for(const g of groups){if(!g.length)continue;x.lineWidth=g[0][2]*2*c.width;x.beginPath();x.moveTo(g[0][0]*c.width,g[0][1]*c.height);if(g.length==1)x.lineTo(g[0][0]*c.width+.1,g[0][1]*c.height);for(const p of g.slice(1))x.lineTo(p[0]*c.width,p[1]*c.height);x.stroke()}
 const u=await new Promise(r=>c.toBlob(bl=>r(bl?URL.createObjectURL(bl):src),'image/png'));ERC2[k]=u;return u}
const cbOf=(tf,v)=>((tf&&tf.cb)||{})[v]||[];
{const _si=stageInner;stageInner=async function(S,opt={}){let html=await _si(S,opt);try{const v=S.view||'front';
 for(const [slot,tf] of Object.entries(S.tf||{})){const id=S.items[slot];if(slot=='jewelry'||!id)continue;const gs=cbOf(tf,v);const wq=(tf.wq||{})[v];if(!gs.length&&!wq)continue;
  const re=new RegExp(`<img class="sl[^>]*data-slot="${slot}"[^>]*>`);const t=(html.match(re)||[])[0];if(!t)continue;const e0=(t.match(/ data-er0="([^"]+)"/)||[])[1];const m=t.match(/ src="([^"]+)"/);if(!m)continue;
  let base=e0||m[1];
  if(wq&&!tf.raw&&!tf.pic){const g=p5gOfT(id,tf);if(g&&g[v]){base=await warpUrl(p5gUrl(g,v),wq.k,wq.y);const nk=(v=='front'||v=='half')&&typeof NECKS!='undefined'&&NECKS.includes(slot)&&!tf.nocut;try{const c=await cleanP5(base,nk);if(c&&c.url)base=c.url}catch(_){}}}
  let u=gs.length?await cloneUrl(base,gs):base;const er=((tf.er||{})[v])||[];if(er.length)u=await erase2(u,er);
  let t2=t.replace(m[0],` src="${u}"`);t2=e0?t2.replace(/ data-er0="[^"]+"/,` data-er0="${base}"`):t2.replace(' src=',` data-er0="${base}" src=`);html=html.replace(t,t2)}}catch(e){ERR('cb91',e)}return html}}
function toImg2(el,px,py){const r=el.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;const st=$('#sstage');const z=(st&&st.offsetWidth)?st.getBoundingClientRect().width/st.offsetWidth:1;
 let m;try{m=new DOMMatrix(getComputedStyle(el).transform)}catch(_){m=new DOMMatrix()}const mx=el.closest('.mirw')?-1:1;const dx=(px-cx)/z*mx,dy=(py-cy)/z;const det=(m.a*m.d-m.b*m.c)||1;
 const lx=(m.d*dx-m.c*dy)/det,ly=(-m.b*dx+m.a*dy)/det;return [lx/el.offsetWidth+.5,ly/el.offsetHeight+.5]}
const lay=s=>$(`#sstage img.sl[data-slot="${s}"]`);
const MSG={clone:'🖌 1. לחצי על הבד שרוצים להעתיק. 2. ציירי במקום שרוצים להוסיף בד',paint:'🎨 לחצי על הבגד כדי לדגום צבע, ואז מרחי איפה שרוצים'};
function cbSet(mode){CB.mode=mode;CB.o=null;CB.src=null;CB.pick=mode=='paint'&&!CB.col;document.body.classList.toggle('cb91on',!!mode);if(mode&&document.body.classList.contains('er74on')){const b=$('#ssel [data-er="t"]');if(b)b.click()}try{paintSel()}catch(_){}if(mode)toast(MSG[mode])}
let liveT=0;
async function cbLive(){const d=CB.drag;if(!d)return;const el=lay(d.slot);if(!el)return;const orig=el.dataset.er0||el.getAttribute('src');el.dataset.er0=orig;const u=await cloneUrl(orig,d.all.concat([d.gr]));if(CB.drag==d)el.src=u}
window.addEventListener('pointerdown',async e=>{try{if(!CB.mode||!ST||!SSEL||SSEL=='jewelry')return;if(!e.target.closest||!e.target.closest('#sstage'))return;const el=lay(SSEL);if(!el)return;e.preventDefault();e.stopPropagation();
 const [u,w]=toImg2(el,e.clientX,e.clientY);
 if(CB.mode=='paint'&&CB.pick){const c=await pixAt(el.getAttribute('src'),u,w);if(c){CB.col=c;CB.pick=false;paintSel();toast('🎨 נדגם צבע. עכשיו מרחי איפה שרוצים')}else toast('לחצי על הבד עצמו כדי לדגום צבע');return}
 if(CB.mode=='clone'&&!CB.o){if(!CB.src){CB.src=[u,w];toast('👍 נבחר. עכשיו ציירי במקום שרוצים להוסיף בד');return}CB.o=[+(CB.src[0]-u).toFixed(3),+(CB.src[1]-w).toFixed(3)]}
 pushH();const tf=ST.tf[SSEL];const v=ST.view||'front';const r=+window.BR91.toFixed(3);const g=[[+u.toFixed(3),+w.toFixed(3),r]];
 CB.drag={slot:SSEL,v,r,g,gr:CB.mode=='paint'?{c:CB.col,g}:{o:CB.o,g},all:cbOf(tf,v).slice()};cbLive()}catch(err){ERR('cb91d',err)}},true);
window.addEventListener('pointermove',e=>{const d=CB.drag;if(!d)return;e.preventDefault();e.stopPropagation();const el=lay(d.slot);if(!el)return;const [u,w]=toImg2(el,e.clientX,e.clientY);const l=d.g[d.g.length-1];
 if(Math.hypot(u-l[0],w-l[1])<d.r*.35||d.g.length>300)return;d.g.push([+u.toFixed(3),+w.toFixed(3),d.r]);const t=Date.now();if(t-liveT>90){liveT=t;cbLive()}},true);
window.addEventListener('pointerup',async e=>{const d=CB.drag;if(!d)return;CB.drag=null;e.preventDefault();e.stopPropagation();const tf=ST.tf[d.slot];if(!tf)return;tf.cb=tf.cb||{};tf.cb[d.v]=d.all.concat([d.gr]).slice(-40);
 const keep=SSEL;await drawStudio();SSEL=keep;paintSel()},true);
window.addEventListener('click',e=>{if(CB.mode&&e.target.closest&&e.target.closest('#sstage')){e.preventDefault();e.stopPropagation()}},true);
const toolOn=()=>!!CB.mode||document.body.classList.contains('er74on');
if(typeof paintSel=='function'){const _ps=paintSel;paintSel=function(){const r=_ps.apply(this,arguments);try{const c=$('#ssel');if(c&&ST&&SSEL&&ST.items[SSEL]&&SSEL!='jewelry'&&!c.querySelector('.cb91')){const tf=ST.tf[SSEL]||{};const n=cbOf(tf,ST.view||'front').length;
  const px=Math.round(4+window.BR91*120);
  const h=`<span class="cb91"><button data-cb91="clone" aria-pressed="${CB.mode=='clone'}" title="מעתיקה בד ממקום למקום: להאריך שרוול, לכסות חור">🖌 מברשת בד</button>${CB.mode=='clone'?`<button data-cb91="n">📍 מקור חדש</button>`:''}`+
   `<button data-cb91="paint" aria-pressed="${CB.mode=='paint'}" title="מברשת צבע: דוגמים צבע מהבגד ומורחים">🎨 מברשת צבע</button>${CB.mode=='paint'?`<button data-cb91="pick" aria-pressed="${CB.pick}" title="לחצי ואז על הבגד כדי לדגום צבע">💧 דגימה</button><label class="cb91c" title="או לבחור צבע">${CB.col?`<i style="background:${CB.col}"></i>`:'🎨'}<input type="color" data-cb91col value="${CB.col||'#ffffff'}"></label>`:''}`+
   `${toolOn()?`<span class="br91"><button data-cb91="bm" aria-label="מברשת קטנה יותר">➖</button><i class="bdot" style="width:${px}px;height:${px}px"></i><b>גודל מברשת</b><button data-cb91="bp" aria-label="מברשת גדולה יותר">➕</button></span>`:''}${n?`<button data-cb91="u">↶ ביטול מברשת</button>`:''}</span>`;
  const at=c.querySelector('.er74');if(at)at.insertAdjacentHTML('afterend',h);else{const b=c.querySelector(':scope>b');(b||c).insertAdjacentHTML(b?'afterend':'afterbegin',h)}
  c.querySelectorAll('.er74 [data-er^="s"]').forEach(x=>x.remove())}}catch(_){}return r}}
document.addEventListener('input',e=>{const t=e.target;if(t&&t.matches&&t.matches('[data-cb91col]')){CB.col=t.value;CB.pick=false;const i=t.parentElement.querySelector('i');if(i)i.style.background=t.value}},true);
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#ssel [data-cb91],#ssel [data-er="t"]');if(!b||!ST||!SSEL)return;
 if(b.dataset.er=='t'){if(CB.mode){CB.mode=null;document.body.classList.remove('cb91on')}setTimeout(()=>{try{paintSel()}catch(_){}},30);return}
 const k=b.dataset.cb91;if(k=='col'||b.tagName=='LABEL')return;e.preventDefault();e.stopPropagation();const tf=ST.tf[SSEL];const v=ST.view||'front';
 if(k=='clone'||k=='paint')return cbSet(CB.mode==k?null:k);
 if(k=='bm'||k=='bp'){window.BR91=Math.max(BRMIN,Math.min(BRMAX,window.BR91*(k=='bp'?1.25:.8)));paintSel();toast('גודל מברשת '+Math.round(window.BR91*100));return}
 if(k=='n'){CB.o=null;CB.src=null;toast('📍 לחצי על הבד שרוצים להעתיק');return}if(k=='pick'){CB.pick=true;paintSel();toast('💧 לחצי על הבגד במקום שרוצים לדגום ממנו צבע');return}
 if(k=='u'&&tf&&tf.cb&&tf.cb[v]){pushH();tf.cb[v].pop();if(!tf.cb[v].length)delete tf.cb[v];const keep=SSEL;await drawStudio();SSEL=keep;paintSel()}},true);
// the eraser button says what it does
if(typeof paintSel=='function'){const _ps=paintSel;paintSel=function(){const r=_ps.apply(this,arguments);try{const b=$('#ssel [data-er="t"]');if(b&&!b.dataset.l91){b.dataset.l91=1;b.textContent='🧽 מחק';b.title='מחק: מעבירים אצבע על החלק שרוצים להעלים (למשל מעל הידיים)'}}catch(_){}return r}}

// ---- 4. the item window from the studio drawer: ⓘ on every tile, or a double click/tap on it
const DRW_I='<span class="zm i91" role="button" aria-label="פתיחת חלון הפריט" title="פתיחת חלון הפריט (העיצובים, הקשירות)">ⓘ</span>';
function addI(){const g=$('#dgrid');if(!g)return;g.querySelectorAll('.di[data-dpick]').forEach(t=>{if(!t.querySelector('.i91'))t.insertAdjacentHTML('beforeend',DRW_I)})}
if(typeof fillDrawer=='function'){const _fd=fillDrawer;fillDrawer=async function(){const r=await _fd.apply(this,arguments);try{addI()}catch(_){}return r}}
setInterval(()=>{try{if(document.querySelector('#sdrawer.open #dgrid'))addI()}catch(_){}},1500);
let lastTap={id:null,t:0};
async function openFromStudio(id){try{await openItem(id)}catch(e){ERR('i91',e)}}
window.addEventListener('click',e=>{const i=e.target.closest&&e.target.closest('#sdrawer .i91');if(i){e.preventDefault();e.stopImmediatePropagation();const t=i.closest('[data-dpick]');if(t)openFromStudio(t.dataset.dpick);return}
 const t=e.target.closest&&e.target.closest('#sdrawer [data-dpick],#hd77 [data-hd77]');if(!t)return;const id=t.dataset.dpick||t.dataset.hd77;if(!id)return;const now=Date.now();
 if(lastTap.id==id&&now-lastTap.t<450){lastTap={id:null,t:0};e.preventDefault();e.stopImmediatePropagation();openFromStudio(id);return}lastTap={id,t:now}},true);

// ---- 5. a garment with avatar pictures always shows its avatar picture on the 5-pose avatar
// ("📷 תמונה על הדמות" / "עם רקע" chose the PRODUCT photo; the avatar rule then hid it, so front and back came out without the dress)
const hasG=(id,tf)=>{try{return P5D()&&!!p5gOfT(id,tf)}catch(_){return false}};
if(typeof srcOf=='function'){const _so=srcOf;srcOf=async function(slot,id,tf){if(tf&&(tf.pic||tf.raw)&&id&&(typeof ST!='undefined'&&ST&&(ST.avbase||'long')=='p5')&&p5gOfT(id,tf)){const t2=Object.assign({},tf);delete t2.pic;delete t2.raw;return _so(slot,id,t2)}return _so.apply(this,arguments)}}
{const _os=openStudio;openStudio=async function(...a){const r=await _os.apply(this,a);try{if(ST&&ST.tf)for(const [slot,tf] of Object.entries(ST.tf)){const id=ST.items[slot];if(tf&&id&&hasG(id,tf)){delete tf.pic;delete tf.raw}}}catch(_){}return r}}
// the selection bar: on the 5-pose avatar only the buttons that do something, each with a short explanation
const EXPL={'nk':'👤 צוואר מעל: לחולצה עם צווארון פתוח – הצוואר שלך נראה מעל הבגד','up':'⬆ קדימה: הבגד הזה מעל בגד אחר (למשל ז׳קט מעל שמלה)','down':'⬇ אחורה: הבגד הזה מתחת לבגד אחר','flip':'⇋ היפוך: מראה, ימין ושמאל מתחלפים','hide':'🙈 הסתירי: מחביא את הבגד בלי להוריד אותו','lock':'🔒 נעילה: הבגד לא זז בטעות כשנוגעים','reset':'↺ למקום: מחזיר את הבגד להתאמה האוטומטית','del':'🗑 הסירי: מוריד את הבגד מהדמות','fit':'📐 התאימי לגוף: מתאים שוב את הבגד לכתפיים ולמותן'};
if(typeof paintSel=='function'){const _ps=paintSel;paintSel=function(){const r=_ps.apply(this,arguments);try{const c=$('#ssel');if(!c||!ST||!SSEL)return r;const id=ST.items[SSEL],tf=ST.tf[SSEL]||{};
  if(id&&hasG(id,tf)){c.querySelectorAll('.lpics,[data-sa="raw"]').forEach(x=>x.remove())}
  c.querySelectorAll('[data-sa]').forEach(b=>{const k=b.dataset.sa;if(EXPL[k])b.title=EXPL[k]});
  const fb=c.querySelector('[data-fit],[data-sfit],#sfit');if(fb)fb.title=EXPL.fit;
  if(!c.querySelector('.ex91')&&id){const sb=c.querySelector('.sbtns');if(sb)sb.insertAdjacentHTML('afterend','<button type="button" class="ex91" data-ex91>❓ מה עושים הכפתורים?</button>')}}catch(_){}return r}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-ex91]');if(!b)return;e.preventDefault();e.stopPropagation();let d=$('#ex91d');if(!d){d=document.createElement('dialog');d.id='ex91d';d.className='sheet9';d.dir='rtl';document.body.appendChild(d)}
 d.innerHTML=`<div class="sh9h"><h3>❓ הכפתורים של הבגד</h3><button class="x" data-ex91x aria-label="סגירה">✕</button></div><div class="ex91b"><p><b>להזיז:</b> גוררים את הבגד באצבע או בעכבר. <b>גודל:</b> ➖ ➕ או שתי אצבעות. גודל שמשנים בתנוחה אחת עובר לכל התנוחות.</p><ul>${['fit','nk','up','down','flip','hide','lock','reset','del'].map(k=>`<li>${EXPL[k]}</li>`).join('')}<li>🧽 מחק: מעבירים אצבע על חלק שרוצים להעלים</li><li>🖌 מברשת בד: לוחצים על בד ואז מציירים במקום שרוצים להוסיף בד</li><li>🎨 מברשת צבע: דוגמים צבע מהבגד ומורחים</li></ul></div>`;d.showModal()},true);
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-ex91x]')){const d=$('#ex91d');if(d)d.close()}});

// ---- 6. "כל התנוחות": drag the garment with the finger / mouse in the chosen pose; ➖ ➕ change the size in ALL poses (no 160% ceiling)
window.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#p5all [data-pe="w"]');if(!b||!ST)return;e.preventDefault();e.stopImmediatePropagation();
 const slot=(document.querySelector('#p5all [data-pes][aria-pressed="true"]')||{}).dataset?.pes||Object.keys(ST.items).find(s=>ST.items[s]&&s!='jewelry'&&p5gOfT(ST.items[s],ST.tf[s]));const id=ST.items[slot],tf=ST.tf[slot];if(!id||!tf)return;const g=p5gOfT(id,tf);if(!g)return;
 pushH();const k=+b.dataset.d>0?1.04:1/1.04;tf.uk=Math.round((tf.uk||1)*k*1000)/1000;
 for(const v of ['front','side','back','half','hip']){if(!g[v])continue;const f=window.pvOf(tf,g,v);if(!f)continue;const h=f.w/100*399*(tf._asp||2)*(f.q||1)/1365*100;f.y=r1(f.y+h*(k-1)/2);f.w=r1(Math.max(10,Math.min(400,f.w*k)));window.pvSet(tf,v,f)}
 try{LAST[slot]={tf,id,v:ST.view||'front',w:tf.w}}catch(_){}
 for(const fig of document.querySelectorAll('#p5all .p5f'))await window.drawPose(fig);const keep=SSEL;await drawStudio();SSEL=keep},true);
{let D9=null;
 window.addEventListener('pointerdown',e=>{const fig=e.target.closest&&e.target.closest('#p5all .p5f');if(!fig||!ST||e.button>0)return;const v=fig.dataset.pose;
  const slot=(document.querySelector('#p5all [data-pes][aria-pressed="true"]')||{}).dataset?.pes||Object.keys(ST.items).find(s=>ST.items[s]&&s!='jewelry'&&p5gOfT(ST.items[s],ST.tf[s]));if(!slot)return;const id=ST.items[slot],tf=ST.tf[slot];const g=id&&tf&&p5gOfT(id,tf);if(!g||!g[v])return;
  const el=fig.querySelector(`.mst img.sl[data-slot="${slot}"]`);if(!el)return;const f=window.pvOf(tf,g,v);if(!f)return;const R=fig.querySelector('.mst').getBoundingClientRect();
  D9={fig,v,slot,tf,g,el,f,x0:e.clientX,y0:e.clientY,R,moved:false};},true);
 window.addEventListener('pointermove',e=>{if(!D9)return;const dx=e.clientX-D9.x0,dy=e.clientY-D9.y0;if(!D9.moved&&Math.hypot(dx,dy)<6)return;if(!D9.moved){D9.moved=true;try{pushH()}catch(_){}}e.preventDefault();
  D9.el.style.left=(D9.f.x+dx/D9.R.width*100)+'%';D9.el.style.top=(D9.f.y+dy/D9.R.height*100)+'%'},true);
 window.addEventListener('pointerup',async e=>{const d=D9;D9=null;if(!d||!d.moved)return;e.preventDefault();e.stopPropagation();const dx=e.clientX-d.x0,dy=e.clientY-d.y0;const f=Object.assign({},d.f);f.x=r1(f.x+dx/d.R.width*100);f.y=r1(f.y+dy/d.R.height*100);window.pvSet(d.tf,d.v,f);d.tf.pvman=d.tf.pvman||{};d.tf.pvman[d.v]=1;
  try{if(typeof p5PoseTap=='function')p5PoseTap(d.fig)}catch(_){}await window.drawPose(d.fig);if((ST.view||'front')==d.v){const keep=SSEL;await drawStudio();SSEL=keep}window.__drag91=Date.now()},true);
 window.addEventListener('click',e=>{if(window.__drag91&&Date.now()-window.__drag91<400&&e.target.closest&&e.target.closest('#p5all .p5f')){e.preventDefault();e.stopImmediatePropagation()}},true);
}

// ---- 7. her measurements and the avatar's body lines go into every garment prompt, so GPT draws the garment in her size and proportions
const ME0={h:156,b:94,ub:83,w:73,hp:96,sh:45,nw:49,wk:58,wa:90,wf:99,arm:50,ua:28,wr:16,nk:32,nb:25};/* Sara measured 22/10 (v93) */
const ME=()=>Object.assign({},ME0,(typeof SET=='object'&&SET.me93&&SET.me91)||{});/* v93: the old guessed numbers in SET.me91 are ignored until she edits a field again */
const ML=[['h','גובה'],['b','היקף חזה'],['w','היקף מותן'],['hp','היקף ירכיים'],['sh','רוחב כתפיים'],['nw','מבסיס הצוואר עד המותן'],['wk','מהמותן עד הברך'],['wa','מהמותן עד הקרסול'],['wf','מהמותן עד הרצפה'],['ub','מתחת לחזה'],['arm','אורך יד (כתף עד פרק כף היד)'],['ua','היקף זרוע עליונה'],['wr','היקף פרק כף היד'],['nk','היקף צוואר'],['nb','מהגומה בצוואר עד קו החזה']];
function meText(){const m=ME();const parts=ML.filter(([k])=>+m[k]>0).map(([k,n])=>`${n} ${m[k]} ס״מ`);
 return `המידות שלי: ${parts.join(', ')}. הבגד צריך להיות בדיוק במידה שלי ובפרופורציות של הגוף באווטר – לא צר יותר ולא קצר יותר.
בכל חלק של גיליון האווטר, מלמעלה למטה: קו הכתפיים בערך ב-22% מגובה החלק, המותן ב-40%, הירכיים ב-51%, הברך ב-72%, הקרסול ב-93%. בכל חלק הבגד יושב בדיוק על הקווים האלה: הכתפיים של הבגד על קו הכתפיים, קו המותן של הבגד על המותן, והאורך לפי הגובה שלי (שמלה או חצאית מידי – עד אמצע השוק). רוחב הבגד בכתפיים ובשרוולים מכסה את הכתפיים והזרועות של האווטר.`}
window.meText91=meText;
const isG=t=>/^מצורפות שתי תמונות/.test(t||'')&&/5 חלקים/.test(t||'');
function me91(){const d=document.getElementById('pr80');if(!d||!d.open)return;const ta=d.querySelector('#p80txt');if(ta&&isG(ta.value)&&!ta.value.includes('המידות שלי:'))ta.value=ta.value.replace(/\n?(בלי טקסט, בלי כותרות)/,'\n'+meText()+'\n$1').replace(/^((?![\s\S]*המידות שלי:)[\s\S]*)$/,m=>m.includes('המידות שלי:')?m:m+'\n'+meText());
 if(!d.querySelector('#me91')){const a=d.querySelector('.p80a');if(!a)return;const m=ME();
  a.insertAdjacentHTML('afterend',`<details id="me91" class="me91"><summary>📏 המידות שלי <small>(נכנסות לבד לכל פרומפט של בגד)</small></summary><div class="me91g">${ML.map(([k,n])=>`<label>${n}<input type="number" inputmode="numeric" min="0" max="250" data-me91="${k}" value="${m[k]||''}" placeholder="ס״מ"></label>`).join('')}</div><p class="m77h">אפשר להשאיר ריק מה שלא מדדת.</p></details>`)}}
{const _op=window.openPrompts80;if(_op)window.openPrompts80=function(){const r=_op.apply(this,arguments);try{me91()}catch(e){ERR('me91',e)}return r}}
setInterval(()=>{try{me91()}catch(_){}},800);
document.addEventListener('change',e=>{const t=e.target;if(!t||!t.matches||!t.matches('[data-me91]'))return;SET.me91=Object.assign({},ME(),{[t.dataset.me91]:+t.value||0});SET.me93=1;try{saveSet()}catch(_){}
 const ta=document.querySelector('#pr80 #p80txt');if(ta&&ta.value.includes('המידות שלי:'))ta.value=ta.value.replace(/המידות שלי:[\s\S]*?רוחב הבגד בכתפיים ובשרוולים מכסה את הכתפיים והזרועות של האווטר\./,meText());toast('📏 נשמר, ונכנס לפרומפטים')});
}
