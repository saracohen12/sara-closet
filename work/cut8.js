// ===== v190: one GPT picture with the 8 angles → 8 transparent layers that sit exactly on the doll (Sara 26/10 06:59:
// "אני מעלה תמונה אחת של 8 ושצריך לגזור אותה ולהתאים אותה לאבטר החדש, ואז להתאים אותה בדיוק לבובה, ואז להעלות אותה ... לארון בגדים").
// The same steps as closet/avatar8/new2/items/crop.py + layer_new.py, in the browser:
// cut the 8 squares (offs.json + SH), line each one up with the bare doll (a8/f1-8.webp, lossless copies of new2/frames/c1-8.png),
// keep only what differs from the doll and from the backdrop, clean it (pieces, holes, hem) → RGBA canvases.
(function(){
const OFFS=[[0,0],[361,0],[724,0],[1087,0],[0,544],[361,544],[724,544],[1087,543]];
const SH=[[-2,2],[-3,0],[-6,-2],[0,-1],[-5,1],[-4,0],[6,0],[2,2]];
const W=360,H=541,SW=1448,SHH=1086,N=W*H;
// v192: the doll on the site (a8/n, nh, c) was turned smooth in 25/10 19:50 (new2/turn/norm.py): every view got its own size and place
// (same feet line, height and body axis). GPT draws on the doll BEFORE that, so each layer must get the same move, or the dress sits
// beside the doll (Sara 26/10 07:32-07:33: the arm and the front of the body showed next to the dress). [scale, dx, dy] = new2/turn/turn.json
const TURN=[[1,-.75,2],[1,0,0],[1.0038986,-12.2465887,-2.0584795],[.998062,-4.6414728,.0251938],[1.0258964,2.0069721,8.8964148],[1.0279441,1.6516966,7.8602796],[1.0258964,13.5483065,7.8705177],[1.0177865,-6.763834,8.928854]];
const V='?v='+(window.VER||'');

const loadImg=src=>new Promise((r,j)=>{const i=new Image();i.decoding='async';i.onload=()=>r(i);i.onerror=()=>j(new Error('img'));i.src=src});
async function toImg(x){if(typeof x=='string')return loadImg(x);const u=URL.createObjectURL(x);try{return await loadImg(u)}finally{setTimeout(()=>URL.revokeObjectURL(u),3000)}}
const BASE=[];
async function base(v){if(!BASE[v]){BASE[v]=loadImg('a8/f'+(v+1)+'.webp'+V).then(i=>rgbOf(i,0,0,W,H)).catch(e=>{BASE[v]=null;throw e})}return BASE[v]}
function rgbOf(img,x,y,w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(img,x,y,w,h,0,0,w,h);
 const p=g.getImageData(0,0,w,h).data,o=new Float32Array(w*h*3);for(let i=0,k=0;i<p.length;i+=4,k+=3){o[k]=p[i];o[k+1]=p[i+1];o[k+2]=p[i+2]}return o}

// the sheet at GPT's own size, scaled to the size of the doll's sheet (GPT sometimes returns another size, same shape)
function sheetData(img){const w=img.naturalWidth,h=img.naturalHeight,r=(w/h)/(SW/SHH);if(r<.94||r>1.06)return null;
 const c=document.createElement('canvas');c.width=SW;c.height=SHH;const g=c.getContext('2d',{willReadFrequently:true});g.imageSmoothingQuality='high';g.drawImage(img,0,0,SW,SHH);
 return g.getImageData(0,0,SW,SHH).data}
// one square: pixel (x0+dx+c, y0+dy+r), edges repeated (crop.py pads with mode='edge')
function panel(S,v,ex,ey){const [x0,y0]=OFFS[v],[dx,dy]=SH[v],o=new Float32Array(N*3);
 for(let r=0;r<H;r++){const sy=Math.min(SHH-1,Math.max(0,y0+dy+ey+r));for(let c=0;c<W;c++){const sx=Math.min(SW-1,Math.max(0,x0+dx+ex+c)),s=(sy*SW+sx)*4,k=(r*W+c)*3;o[k]=S[s];o[k+1]=S[s+1];o[k+2]=S[s+2]}}
 return o}
// GPT may move a square by a few pixels: find the shift where the part that never changes (the head for clothes, the feet for head items) matches the doll
function shift(S,v,b,head){const r0=Math.floor(H*(head?.9:.015)),r1=Math.floor(H*(head?.99:.13));const gray=(a,k)=>a[k]*.299+a[k+1]*.587+a[k+2]*.114;
 const [x0,y0]=OFFS[v],[dx,dy]=SH[v];let best=[0,0],bs=Infinity,s0=0;
 for(let ey=-5;ey<=5;ey++)for(let ex=-5;ex<=5;ex++){let s=0;
  for(let r=r0;r<r1;r+=2){const sy=Math.min(SHH-1,Math.max(0,y0+dy+ey+r));for(let c=12;c<W-12;c+=2){const sx=Math.min(SW-1,Math.max(0,x0+dx+ex+c)),q=(sy*SW+sx)*4;
   s+=Math.abs(S[q]*.299+S[q+1]*.587+S[q+2]*.114-gray(b,(r*W+c)*3))}}
  if(!ex&&!ey)s0=s;if(s<bs){bs=s;best=[ex,ey]}}
 return bs<s0*.85?best:[0,0]}

// ---------- small image tools (scipy.ndimage defaults: 4-neighbour cross, reflect at the borders) ----------
function gauss(a,ch,sg){const R=Math.floor(4*sg+.5),k=new Float32Array(2*R+1);let t=0;for(let i=-R;i<=R;i++){k[i+R]=Math.exp(-i*i/(2*sg*sg));t+=k[i+R]}for(let i=0;i<k.length;i++)k[i]/=t;
 const rf=(i,n)=>{while(i<0||i>=n)i=i<0?-i-1:2*n-i-1;return i};const tmp=new Float32Array(a.length),o=new Float32Array(a.length);
 for(let r=0;r<H;r++)for(let c=0;c<W;c++)for(let z=0;z<ch;z++){let s=0;for(let i=-R;i<=R;i++)s+=a[(r*W+rf(c+i,W))*ch+z]*k[i+R];tmp[(r*W+c)*ch+z]=s}
 for(let r=0;r<H;r++)for(let c=0;c<W;c++)for(let z=0;z<ch;z++){let s=0;for(let i=-R;i<=R;i++)s+=tmp[(rf(r+i,H)*W+c)*ch+z]*k[i+R];o[(r*W+c)*ch+z]=s}
 return o}
function erode(m,n){let a=m;for(let t=0;t<n;t++){const o=new Uint8Array(N);for(let r=0;r<H;r++)for(let c=0;c<W;c++){const i=r*W+c;
  o[i]=a[i]&&r>0&&r<H-1&&c>0&&c<W-1&&a[i-1]&&a[i+1]&&a[i-W]&&a[i+W]?1:0}a=o}return a}
function dilate(m,n){let a=m;for(let t=0;t<n;t++){const o=new Uint8Array(N);for(let r=0;r<H;r++)for(let c=0;c<W;c++){const i=r*W+c;
  o[i]=a[i]||(c>0&&a[i-1])||(c<W-1&&a[i+1])||(r>0&&a[i-W])||(r<H-1&&a[i+W])?1:0}a=o}return a}
function label(m){const L=new Int32Array(N),st=new Int32Array(N);let n=0;
 for(let i=0;i<N;i++){if(!m[i]||L[i])continue;n++;let sp=0;st[sp++]=i;L[i]=n;
  while(sp){const p=st[--sp],r=(p/W)|0,c=p-r*W;
   if(c>0&&m[p-1]&&!L[p-1]){L[p-1]=n;st[sp++]=p-1}if(c<W-1&&m[p+1]&&!L[p+1]){L[p+1]=n;st[sp++]=p+1}
   if(r>0&&m[p-W]&&!L[p-W]){L[p-W]=n;st[sp++]=p-W}if(r<H-1&&m[p+W]&&!L[p+W]){L[p+W]=n;st[sp++]=p+W}}}
 return [L,n]}
function fillHoles(m){const out=new Uint8Array(N),st=new Int32Array(N);let sp=0;const push=p=>{if(!m[p]&&!out[p]){out[p]=1;st[sp++]=p}};
 for(let c=0;c<W;c++){push(c);push((H-1)*W+c)}for(let r=0;r<H;r++){push(r*W);push(r*W+W-1)}
 while(sp){const p=st[--sp],r=(p/W)|0,c=p-r*W;if(c>0)push(p-1);if(c<W-1)push(p+1);if(r>0)push(p-W);if(r<H-1)push(p+W)}
 const o=new Uint8Array(N);for(let i=0;i<N;i++)o[i]=out[i]?0:1;return o}

// ---------- one view: what is the item (layer_new.py) ----------
// mode: '' clothes · 'head' (scarves, covers, hats: upper part only) · 'small' (jewelry: thin pieces, holes kept) ; rows: [a,b] where the item can be ; one: a single piece
function mask(b,d,o){const SMALL=o.mode=='small',HEAD=o.mode=='head'||SMALL,CUT=HEAD&&!o.low;const sg=SMALL?.7:1.2;   // CUT: head items and jewelry live in the upper 45%
 const bs=gauss(b,3,sg),ds=gauss(d,3,sg),diff=new Float32Array(N),dbg=new Float32Array(N),bbg=new Uint8Array(N);
 const bgr=new Float32Array(H*3),col=[];for(let c=0;c<10;c++)col.push(c);for(let c=W-10;c<W;c++)col.push(c);
 for(let r=0;r<H;r++)for(let z=0;z<3;z++){const vs=col.map(c=>d[(r*W+c)*3+z]).sort((x,y)=>x-y);bgr[r*3+z]=(vs[9]+vs[10])/2}
 let m=new Uint8Array(N);
 for(let r=0;r<H;r++)for(let c=0;c<W;c++){const i=r*W+c,k=i*3;let s=0,t=0,u=0;for(let z=0;z<3;z++){const a=ds[k+z]-bs[k+z],e=d[k+z]-bgr[r*3+z],f=b[k+z]-bgr[r*3+z];s+=a*a;t+=e*e;u+=f*f}
  diff[i]=Math.sqrt(s);dbg[i]=Math.sqrt(t);bbg[i]=Math.sqrt(u)<=22?1:0;
  if(SMALL){m[i]=((diff[i]>30&&!bbg[i])||(diff[i]>16&&bbg[i]))&&!(d[k]-d[k+2]>18&&!o.warm)?1:0}
  else m[i]=diff[i]>40&&dbg[i]>22?1:0}
 for(let r=Math.floor(H*.86);r<H;r++)for(let c=0;c<W;c++){const i=r*W+c;if(dbg[i]<=48)m[i]=0}   // floor shadows near the feet are not the item
 if(!SMALL)m=dilate(erode(m,2),2);m=erode(dilate(m,SMALL?1:3),SMALL?1:3);
 for(let r=0;r<H;r++)for(let c=0;c<8;c++){m[r*W+c]=0;m[r*W+W-1-c]=0}   // the sheet's white divider lines
 if(o.rows){const a=Math.floor(H*o.rows[0]),z=Math.floor(H*o.rows[1]);for(let r=0;r<H;r++)if(r<a||r>=z)for(let c=0;c<W;c++)m[r*W+c]=0}
 if(CUT)for(let i=Math.floor(H*.45)*W;i<N;i++)m[i]=0;
 const [L,n]=label(m);
 if(n){const sz=new Float64Array(n+1),mx=new Float32Array(n+1),r0=new Int32Array(n+1).fill(H),r1=new Int32Array(n+1).fill(-1);
  for(let i=0;i<N;i++){const l=L[i];if(!l)continue;sz[l]++;if(diff[i]>mx[l])mx[l]=diff[i];const r=(i/W)|0;if(r<r0[l])r0[l]=r;if(r>r1[l])r1[l]=r}
  let keep=new Uint8Array(n+1);
  if(SMALL){const strong=new Uint8Array(N);for(let i=0;i<N;i++){const l=L[i];if(l&&mx[l]>32&&sz[l]>=4)strong[i]=1}const near=dilate(strong,6);
   for(let i=0;i<N;i++){const l=L[i];if(l&&near[i]&&sz[l]>=3)keep[l]=1}}
  else if(HEAD){const er=erode(m,3),ec=new Float64Array(n+1);for(let i=0;i<N;i++)if(er[i])ec[L[i]]++;
   const vals={};for(let i=0;i<N;i++){const l=L[i];if(l&&sz[l]>=40&&ec[l]>=30)(vals[l]=vals[l]||[]).push(dbg[i])}
   for(const l in vals){const a=vals[l].sort((x,y)=>x-y),h=a.length>>1,md=a.length%2?a[h]:(a[h-1]+a[h])/2;if(md>45)keep[l]=1}}
  else{let big=1;for(let l=2;l<=n;l++)if(sz[l]>sz[big])big=l;const M=sz[big],min=Math.max(Math.min(400,.1*M),40,.02*M);
   for(let l=1;l<=n;l++)if(sz[l]>=min&&r0[l]>=r0[big]-5&&r1[l]<=r1[big]+5)keep[l]=1}
  for(let i=0;i<N;i++)m[i]=keep[L[i]]?1:0;
  if(SMALL&&o.one){let any=0;for(let i=0;i<N;i++)if(m[i]){any=1;break}
   if(any){const [L2,n2]=label(dilate(m,8)),s2=new Float64Array(n2+1);for(let i=0;i<N;i++)if(m[i])s2[L2[i]]++;let bg=1;for(let l=2;l<=n2;l++)if(s2[l]>s2[bg])bg=l;for(let i=0;i<N;i++)if(L2[i]!=bg)m[i]=0}}}
 else m.fill(0);
 if(!SMALL)m=fillHoles(m);
 if(CUT)for(let i=Math.floor(H*.45)*W;i<N;i++)m[i]=0;
 else if(!HEAD&&!o.nohem){let mw=0;const w=new Int32Array(H);for(let r=0;r<H;r++){let s=0;for(let c=0;c<W;c++)s+=m[r*W+c];w[r]=s;if(s>mw)mw=s}
  let last=-1;for(let r=0;r<H;r++)if(w[r]>=.35*mw)last=r;if(last>=0)for(let i=(last+2)*W;i<N;i++)m[i]=0}   // the hem: nothing of the item below the last wide row (feet, floor)
 return m}
// the same move as cv2.warpAffine(turn.json) in norm.py (pixel centres → +.5(1-s)); the canvas keeps the alpha premultiplied, like norm.py
function turn(c,v){const [s,dx,dy]=TURN[v],o=document.createElement('canvas');o.width=W;o.height=H;const g=o.getContext('2d');
 g.setTransform(s,0,0,s,dx+.5*(1-s),dy+.5*(1-s));g.drawImage(c,0,0);o.px=c.px;return o}
function layer(d,m){const a=gauss(Float32Array.from(m,x=>x*255),1,.8),c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),im=g.createImageData(W,H),p=im.data;let px=0;
 for(let i=0;i<N;i++){const k=i*3,q=i*4;p[q]=d[k];p[q+1]=d[k+1];p[q+2]=d[k+2];p[q+3]=Math.max(0,Math.min(255,Math.round(a[i])));if(m[i])px++}
 g.putImageData(im,0,0);c.px=px;return c}

// ---------- v199: styles (sty199.js) ----------
// hair / tie: the WHOLE head, face too – they are drawn on the head-less doll (a8/nh, ch) like her wig, so nothing of the beige cover peeks out.
// Everything above the neck that is not backdrop, plus what hangs below it (hair on the shoulders and back, a tie's tail) and joins the head.
// tie also gives the fabric alone (fab): GPT draws it plain medium grey, the studio paints it in the colour she picks (r360 tinted()).
const NK=[81,88,94,82,64,87,83,77];   // the neck row of each view on f1-8: where the doll's head ends (n vs nh, turned back)
// below the head: a pixel that only got darker or lighter but kept the doll's own colour is a shadow on her dress, not the scarf
// (Sara's first tie, 26/10: a beige rim along the tail in the back views)
function shade(bs,ds,k){const sb=bs[k]+bs[k+1]+bs[k+2]+1,sd=ds[k]+ds[k+1]+ds[k+2]+1;let c=0;for(let z=0;z<3;z++)c+=Math.abs(ds[k+z]/sd-bs[k+z]/sb);return c<.045}
// v213 (Sara 26/10 15:36, her first hairstyle "לא נגזרה טוב"): GPT's backdrop has light/dark blue patches (kept as pieces above the head),
// and GPT's body sits a few px off the doll (thin beige strips along the arm and back in the side views). Now:
// · a light blue pixel is backdrop (not for tiex – her own scarf may be blue) · a piece must touch the doll's head, not just be high up
// · below the neck a pixel counts only if it differs from every doll pixel around it (5 px) – a moved body edge is not hair · small holes are filled
function maskWhole(b,d,v,fab,keepBlue){const bs=gauss(b,3,1.2),ds=gauss(d,3,1.2),diff=new Float32Array(N),dbg=new Float32Array(N),bgr=new Float32Array(H*3),bgb=new Float32Array(H*3),col=[];
 for(let c=0;c<10;c++)col.push(c);for(let c=W-10;c<W;c++)col.push(c);
 for(let r=0;r<H;r++)for(let z=0;z<3;z++){const vs=col.map(c=>d[(r*W+c)*3+z]).sort((x,y)=>x-y);bgr[r*3+z]=(vs[9]+vs[10])/2;const vb=col.map(c=>b[(r*W+c)*3+z]).sort((x,y)=>x-y);bgb[r*3+z]=(vb[9]+vb[10])/2}
 const nk=NK[v]+4,low=Math.floor(H*.8),RN=5;let m=new Uint8Array(N);
 const blue=k=>{const R=d[k],G=d[k+1],B=d[k+2];return B-R>28&&B>=G-6&&R*.299+G*.587+B*.114>105};
 const far=(r,c,k)=>{for(let y=Math.max(0,r-RN);y<=Math.min(H-1,r+RN);y++)for(let x=Math.max(0,c-RN);x<=Math.min(W-1,c+RN);x++){const j=(y*W+x)*3;let s=0;for(let z=0;z<3;z++){const a=ds[k+z]-bs[j+z];s+=a*a}if(s<1600)return false}return true};
 for(let r=0;r<low;r++)for(let c=0;c<W;c++){const i=r*W+c,k=i*3;let s=0,t=0;for(let z=0;z<3;z++){const a=ds[k+z]-bs[k+z],e=d[k+z]-bgr[r*3+z];s+=a*a;t+=e*e}
  diff[i]=Math.sqrt(s);dbg[i]=Math.sqrt(t);if(!keepBlue&&blue(k))continue;
  m[i]=dbg[i]>22&&(r<nk||diff[i]>40&&!shade(bs,ds,k)&&far(r,c,k))?1:0}
 for(let r=0;r<H;r++)for(let c=0;c<8;c++){m[r*W+c]=0;m[r*W+W-1-c]=0}   // the sheet's white divider lines
 m=erode(dilate(m,2),2);m=dilate(erode(m,1),1);
 {const o=dilate(erode(m,2),2);for(let i=(nk+10)*W;i<N;i++)m[i]=o[i]}   // lower down, a strip under 5 px wide is the edge of GPT's body, not hair
 // the doll's own head (and a margin): a piece is kept only if it touches it
 let hz=new Uint8Array(N);for(let r=0;r<nk;r++)for(let c=8;c<W-8;c++){const i=r*W+c,k=i*3;let t=0;for(let z=0;z<3;z++){const e=b[k+z]-bgb[r*3+z];t+=e*e}if(t>22*22)hz[i]=1}
 hz=dilate(erode(hz,1),9);
 const [L,n]=label(m),keep=new Uint8Array(n+1);for(let i=0;i<nk*W;i++)if(L[i]&&hz[i])keep[L[i]]=1;
 for(let i=0;i<N;i++)m[i]=keep[L[i]]?1:0;
 {const f=fillHoles(m);for(let i=0;i<nk*W;i++)m[i]=f[i];   // holes in the head
  const h=new Uint8Array(N);for(let i=nk*W;i<N;i++)h[i]=f[i]&&!m[i]?1:0;const [HL,hn]=label(h),sz=new Int32Array(hn+1);for(let i=0;i<N;i++)if(HL[i])sz[HL[i]]++;
  for(let i=0;i<N;i++)if(HL[i]&&sz[HL[i]]<450)m[i]=1}   // below it a closed hole is a missed bit of hair (at the nape the doll is dark too); a gap between strands is open
 // the neck: below the doll's head line GPT's neck fades into the doll's own neck (unless hair covers it), so no line shows where they meet
 // v214 (Sara 15:57 "עדיין יש חורים, אני רואה בשתי תמונות חורים"): only her skin fades there – at the back hair covers the nape (dark like the doll's), and fading it left a see-through line
 const A=Float32Array.from(m);for(let r=nk-3;r<nk;r++)for(let c=0;c<W;c++){const i=r*W+c,k=i*3;if(A[i]&&diff[i]<40&&d[k]*.299+d[k+1]*.587+d[k+2]*.114>150)A[i]*=(nk-r)/4}
 // v218 (Sara 17:28 "צל צהוב, לא גזור טוב"): below the neck the hair's edge kept a beige rim of GPT's body/top. An edge pixel (4 px) lighter than the hair inside it (6 px around) fades out
 // v220 (17:52 "עדיין צל צהוב בשיער"): an edge pixel whose colour is nearer to what was there before (GPT's beige top, the backdrop) than to the hair inside takes the hair's colour and fades
 {const cr=erode(m,4),T=[0,1,2,3,4].map(()=>new Float64Array((W+1)*(H+1))),lu=i=>d[i*3]*.299+d[i*3+1]*.587+d[i*3+2]*.114;
  for(let r=0;r<H;r++)for(let c=0;c<W;c++){const i=r*W+c,j=(r+1)*(W+1)+c+1,on=cr[i]?1:0,vs=[lu(i),d[i*3],d[i*3+1],d[i*3+2],1];for(let z=0;z<5;z++){const t=T[z];t[j]=t[j-1]+t[j-W-1]-t[j-W-2]+(on?vs[z]:0)}}
  const bx=(t,r0,c0,r1,c1)=>t[(r1+1)*(W+1)+c1+1]-t[r0*(W+1)+c1+1]-t[(r1+1)*(W+1)+c0]+t[r0*(W+1)+c0];
  const bk=(r,k)=>{let t=0;for(let z=0;z<3;z++)t+=(b[k+z]-bgb[r*3+z])**2;return t<25*25};   // above the neck only where the doll had backdrop (the light-blue rim on top of the hair), never her face
  for(let r=0;r<H;r++)for(let c=0;c<W;c++){const i=r*W+c,k=i*3;if(!m[i]||cr[i]||r<nk&&!bk(r,k))continue;const r0=Math.max(0,r-6),r1=Math.min(H-1,r+6),c0=Math.max(0,c-6),c1=Math.min(W-1,c+6),n=bx(T[4],r0,c0,r1,c1);if(n<6)continue;
   const x=lu(i)-bx(T[0],r0,c0,r1,c1)/n;if(x>12)A[i]*=Math.max(0,1-(x-12)/22);
   let dh=0,db=0;const mu=[1,2,3].map(z=>bx(T[z],r0,c0,r1,c1)/n);for(let z=0;z<3;z++){dh+=(d[k+z]-mu[z])**2;db+=(d[k+z]-b[k+z])**2}dh=Math.sqrt(dh);db=Math.sqrt(db);
   if(db<dh){const t=1-db/dh;A[i]*=1-.6*t;for(let z=0;z<3;z++)d[k+z]+=(mu[z]-d[k+z])*t}}
 }
 {const G=gauss(A,1,.8),core=erode(m,3);for(let r=0;r<H;r++)if(r<nk-3||r>=nk)for(let c=0;c<W;c++){const i=r*W+c;if(core[i])G[i]=1}m.A=G}   // inside the hair (3 px from its edge) nothing is see-through
 if(!fab)return [m];
 // the fabric: changed from the doll and grey (skin, lips and her front hair are not grey)
 let f=new Uint8Array(N);const lum=[];
 for(let i=0;i<N;i++){if(!m[i]||diff[i]<=30)continue;const k=i*3,R=d[k],G=d[k+1],B=d[k+2],mx=Math.max(R,G,B),mn=Math.min(R,G,B);if(mx>0&&(mx-mn)/mx<.2){f[i]=1;lum.push(.299*R+.587*G+.114*B)}}
 f=erode(dilate(f,2),2);for(let i=0;i<N;i++)if(!m[i])f[i]=0;
 return [m,f,lum]}
// makeup: inside a loose oval around the face, only where the face changed (lipstick, eyes, blush) – pasted over any head (cover, tie, hairstyle)
const FACE=[[176,64,25,28],[163,63,25,27],[158,65,21,28],null,null,[205,58,10,18],[197,60,17,28],[181,58,24,28]];   // [cx,cy,rx,ry] on f1-8; views 4-5 show no face
function maskFace(b,d,v){const A=new Float32Array(N),e=FACE[v];if(!e)return A;const [cx,cy,rx,ry]=e,bs=gauss(b,3,1),ds=gauss(d,3,1);
 for(let r=Math.max(0,cy-ry);r<=Math.min(H-1,cy+ry);r++)for(let c=Math.max(0,cx-rx);c<=Math.min(W-1,cx+rx);c++){const q=((c-cx)/rx)**2+((r-cy)/ry)**2;if(q>1)continue;
  const i=r*W+c,k=i*3;let s=0;for(let z=0;z<3;z++){const a=ds[k+z]-bs[k+z];s+=a*a}const a=Math.min(1,Math.max(0,(Math.sqrt(s)-10)/14));A[i]=a*(q>.7?(1-q)/.3:1)}
 return gauss(A,1,1)}
function layerA(d,A){const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),im=g.createImageData(W,H),p=im.data;let px=0;
 for(let i=0;i<N;i++){const k=i*3,q=i*4;p[q]=d[k];p[q+1]=d[k+1];p[q+2]=d[k+2];p[q+3]=Math.round(255*Math.min(1,A[i]));if(A[i]>.3)px++}
 g.putImageData(im,0,0);c.px=px;return c}

// v219 (Sara 17:43 "למה השיער באוויר ולא צמוד"): in the side views GPT's body is a little further back than the doll's, so the hair behind it floated with a gap.
// Row by row below the neck, hair behind the doll's back moves forward until it touches her back (≤24 px, smoothed over rows)
const BACK={2:1,6:-1},BODY=[];
async function body(v){if(!BODY[v])BODY[v]=loadImg('a8/c'+(v+1)+'.webp'+V).then(i=>{const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(i,0,0,W,H);
  const p=g.getImageData(0,0,W,H).data,a=new Uint8Array(N);for(let i=0;i<N;i++)a[i]=p[i*4+3]>128?1:0;return a}).catch(e=>{BODY[v]=null;throw e});return BODY[v]}
async function snug(c,v){const dir=BACK[v];if(!dir)return c;let A;try{A=await body(v)}catch(_){return c}
 const g=c.getContext('2d',{willReadFrequently:true}),im=g.getImageData(0,0,W,H),p=im.data,r0=NK[v]+10,eb=new Float32Array(H).fill(NaN),gp=new Float32Array(H).fill(NaN);
 for(let r=r0;r<H;r++){let e=-1;for(let x=0;x<W;x++)if(A[r*W+x]){if(dir>0||e<0)e=x;if(dir<0)break}if(e<0)continue;eb[r]=e;
  for(let k=1;k<=60;k++){const x=e+dir*k;if(x<0||x>=W)break;if(p[(r*W+x)*4+3]>128){gp[r]=Math.min(24,k-1);break}}}
 // v220 (17:52 "השיער לא נראה טבעי"): v219 moved each row on its own (steps along the hair). Now one soft shift: smoothed over ±10 rows,
 // full behind her back and fading to nothing 16 px into the body, sampled between pixels
 const av=(a,r,n)=>{let t=0,q=0;for(let y=r-n;y<=r+n;y++)if(y>=r0&&y<H&&!isNaN(a[y])){t+=a[y];q++}return q?t/q:NaN};
 const o=new Uint8ClampedArray(p);let moved=0;
 for(let r=r0;r<H;r++){const e=av(eb,r,10),sh=av(gp,r,10)*Math.min(1,(r-r0)/12);if(isNaN(e)||!(sh>=.5))continue;moved++;
  for(let x=0;x<W;x++){const u=(x-e)*dir,w=u>=0?1:u<=-16?0:1+u/16;if(!w)continue;const sx=x+dir*sh*w,x0=Math.floor(sx),f=sx-x0,q=(r*W+x)*4;
   for(let z=0;z<4;z++){const a=x0>=0&&x0<W?p[(r*W+x0)*4+z]:0,b=x0+1>=0&&x0+1<W?p[(r*W+x0+1)*4+z]:0;o[q+z]=a+(b-a)*f}}}
 if(moved){im.data.set(o);g.putImageData(im,0,0)}return c}

// how each kind of item is cut (KIND keys in r360.js)
const MODE={cover:{mode:'head'},scarf:{mode:'head'},necklace:{mode:'small',rows:[.1,.55],one:1},earrings:{mode:'small',rows:[.03,.2]},bracelet:{mode:'small',low:1},
 belt:{rows:[.28,.62],nohem:1},shoes:{rows:[.8,1],nohem:1},hair:{mode:'whole'},tie:{mode:'whole',fab:1},tiex:{mode:'whole'},makeup:{mode:'face'}};
const tick=()=>new Promise(r=>setTimeout(r,0));
// src: a File/Blob or a url · kind: KIND key · onStep(i): progress → {views:[canvas×8], shifts, px}
async function run(src,kind,onStep){const img=await toImg(src);const S=sheetData(img);if(!S)throw Object.assign(new Error('shape'),{code:'shape',w:img.naturalWidth,h:img.naturalHeight});
 const o=MODE[kind]||{},views=[],shifts=[],fab=[],lum=[];
 for(let v=0;v<8;v++){onStep&&onStep(v);await tick();const b=await base(v);const s=shift(S,v,b,o.mode=='head'||o.mode=='whole');shifts.push(s);const d=panel(S,v,s[0],s[1]);
  if(o.mode=='whole'){const [m,f,l]=maskWhole(b,d,v,o.fab,kind=='tiex');views.push(kind=='hair'?await snug(turn(layerA(d,m.A),v),v):turn(layerA(d,m.A),v));if(f){fab.push(turn(layer(d,f),v));lum.push(...l)}}
  else if(o.mode=='face')views.push(turn(layerA(d,maskFace(b,d,v)),v));
  else views.push(turn(layer(d,mask(b,d,o)),v))}
 lum.sort((x,y)=>x-y);
 return {views,shifts,px:views.map(c=>c.px),fab:fab.length?fab:null,lum:lum.length?Math.round(lum[lum.length>>1]):0}}
window.cut8={run,MODE,W,H,CV:2,CVW:7};   // CVW: hairstyles and ties cut before v214 are cut again by sty199.js   // CV: layers cut before v192 (no turn) have no cv and are cut again by themselves (av188.js)
})();
