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
const V='?v='+(window.A8V||window.VER||'');

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
// v250 (Sara 27/10 16:53 "כשזה לבן, או שזה שמנת, או שזה שקוף … שיעשה לך רקע שחור, ככה שאתה תדע לגזור את זה ממש טוב"): a light garment comes back
// from GPT on a black backdrop. The black that touches the edge of a square is the backdrop (plus its 2 px grey fringe): it is painted as the doll's
// backdrop here, and in each square it is replaced by the doll's own pixels, so white or see-through fabric is never taken for background
function deBlack(S){const cw=SW/4,ch=SHH/2,lum=q=>S[q]*.299+S[q+1]*.587+S[q+2]*.114;let dark=0;
 for(let r=0;r<2;r++)for(let c=0;c<4;c++){let n=0;for(const [fx,fy] of [[.06,.04],[.94,.04],[.06,.5],[.94,.5]]){const x=Math.round(c*cw+fx*cw),y=Math.round(r*ch+fy*ch);if(lum((y*SW+x)*4)<50)n++}if(n>=3)dark++}
 if(dark<6)return null;
 const M=new Uint8Array(SW*SHH),Q=new Int32Array(SW*SHH);let h=0,t=0;
 const ok=i=>{const q=i*4,mx=Math.max(S[q],S[q+1],S[q+2]),mn=Math.min(S[q],S[q+1],S[q+2]);return mx<72&&mx-mn<40};
 const seed=i=>{if(!M[i]&&ok(i)){M[i]=1;Q[t++]=i}};
 for(let r=0;r<2;r++)for(let c=0;c<4;c++){const x0=Math.round(c*cw)+6,x1=Math.round((c+1)*cw)-7,y0=Math.round(r*ch)+6,y1=Math.round((r+1)*ch)-7;
  for(let x=x0;x<=x1;x++){seed(y0*SW+x);seed(y1*SW+x)}for(let y=y0;y<=y1;y++){seed(y*SW+x0);seed(y*SW+x1)}}
 while(h<t){const i=Q[h++],x=i%SW;if(x>0)seed(i-1);if(x<SW-1)seed(i+1);if(i>=SW)seed(i-SW);if(i<SW*(SHH-1))seed(i+SW)}
 for(let pass=0;pass<2;pass++){const add=[];for(let i=SW;i<SW*(SHH-1);i++){if(M[i])continue;const x=i%SW;if(x<1||x>SW-2)continue;if(!(M[i-1]||M[i+1]||M[i-SW]||M[i+SW]))continue;
  const q=i*4,mx=Math.max(S[q],S[q+1],S[q+2]),mn=Math.min(S[q],S[q+1],S[q+2]);if(lum(q)<150&&mx-mn<45)add.push(i)}add.forEach(i=>M[i]=1)}
 for(let i=0;i<M.length;i++)if(M[i]){const q=i*4;S[q]=160;S[q+1]=185;S[q+2]=218}
 return M}
// v259 (Sara 27/10 20:08 "רואים את החור השחור … והגופייה השחורה צבעת אותה בלבן"): the black backdrop is put back to the doll per view, knowing where the doll's own
// backdrop is (its light blue, DB):
// · black left INSIDE the doll's backdrop – the gap between the arm on the hip and the body, closed off from the edge – is backdrop too (no more black holes)
// · a dark garment that GPT still put on black: the flood from the edge ran into it; where the doll is body (not backdrop) the dark pixels are the garment and stay
// v259 (Sara 20:10 "לא גזרת טוב, רואים את החלק של הגוף"): GPT often draws the back / side torso a little to the side of the doll's (the sheet is aligned by the head),
// so the doll's own beige sleeve showed beside the shirt. A top is slid sideways so its shoulders-to-waist part sits centred on the doll's body (≤28 px)
const TOPK=['top','base','sweater'];
// GPT's back/side shoulders often sit lower than the doll's: the top is stretched up (hem stays) so its shoulder line meets hers
function lift(d,m,isB){const w=(f,r)=>{let a=-1,z=-1;for(let c=0;c<W;c++)if(f(r*W+c)){if(a<0)a=c;z=c}return a<0?0:z-a};
 const rB=[],rM=[];for(let r=0;r<Math.floor(H*.4);r++){rB.push(w(isB,r));rM.push(w(i=>m[i],r))}
 const T=rB[Math.round(H*.24)]*.75;if(T<30)return [d,m];
 const st=L=>{for(let r=Math.floor(H*.12);r<L.length;r++)if(L[r]>=T)return r;return -1};const sB=st(rB),sM=st(rM);
 if(sB<0||sM<0||sM-sB<2||sM-sB>25)return [d,m];let gb=-1;for(let r=Math.floor(H*.75);r>0&&gb<0;r--)for(let c=0;c<W;c++)if(m[r*W+c]){gb=r;break}if(gb<=sM+10)return [d,m];
 const d2=new Float32Array(N*3),m2=new Uint8Array(N);d2.set(d.subarray(gb*W*3),gb*W*3);m2.set(m.subarray(gb*W),gb*W);
 for(let r=0;r<gb;r++){const sr=Math.round(gb-(gb-r)*(gb-sM)/(gb-sB));if(sr<0||sr>=H)continue;for(let c=0;c<W;c++){const i=r*W+c,j=sr*W+c;m2[i]=m[j];d2[i*3]=d[j*3];d2[i*3+1]=d[j*3+1];d2[i*3+2]=d[j*3+2]}}
 return [d2,m2]}
function slide(d,m,b){const isB=i=>{const k=i*3;return !(b[k+2]-b[k]>22&&b[k+2]>150)};[d,m]=lift(d,m,isB);
 // only a top that covers her arms too (long sleeves): a tank leaves her arms outside it, and stretching it to her edges pulled its hem out sideways
 {let gm=0,gb=0;for(let r=Math.floor(H*.28);r<Math.floor(H*.34);r++){let a=-1,z=-1,p=-1,q=-1;for(let c=0;c<W;c++){const i=r*W+c;if(m[i]){if(a<0)a=c;z=c}if(isB(i)){if(p<0)p=c;q=c}}if(a>=0&&p>=0){gm+=z-a;gb+=q-p}}if(!gb||gm<gb*.85)return [d,m]}
 // row by row: the top's left/right edges are moved onto the doll's left/right edges at that row (arms included on both).
 // v271 (Sara 27/10 22:51 "הם מרוחות ולא גזורות טוב"): rows that failed the test were left where they were while their neighbours moved, so the top tore
 // into sideways bands (the hand on the hip, the elbow). Now each row's left/right shift is measured, odd rows are dropped, the gaps are filled from the
 // rows around them, the ends fade to no shift, and the shift may change by at most 1 px from row to row – the top bends, it never tears.
 const r0=Math.floor(H*.15),r1=Math.floor(H*.62),DL=new Float32Array(H).fill(NaN),DR=new Float32Array(H).fill(NaN),P=new Float32Array(H).fill(NaN),Q=new Float32Array(H).fill(NaN);
 for(let r=r0;r<r1;r++){let a=-1,z=-1,p=-1,q=-1;for(let c=0;c<W;c++){const i=r*W+c;if(m[i]){if(a<0)a=c;z=c}if(isB(i)){if(p<0)p=c;q=c}}
  if(a<0||p<0)continue;const wm=z-a,wb=q-p;if(wm<30||wb<30||wm<wb*.6||wm>wb*1.35)continue;const k=wb/wm;if(k<.85||k>1.3)continue;DL[r]=a-p;DR[r]=z-q;P[r]=p;Q[r]=q}
 const med=(X,r)=>{const v=[];for(let t=r-7;t<=r+7;t++)if(t>=0&&t<H&&!isNaN(X[t]))v.push(X[t]);v.sort((x,y)=>x-y);return v.length>4?v[v.length>>1]:NaN};
 const DL0=DL.slice(),DR0=DR.slice();for(let r=0;r<H;r++)if(!isNaN(DL0[r])){const ml=med(DL0,r),mr=med(DR0,r);if(isNaN(ml)||Math.abs(DL0[r]-ml)>6||Math.abs(DR0[r]-mr)>6){DL[r]=DR[r]=P[r]=Q[r]=NaN}}
 const ok=[];for(let r=0;r<H;r++)if(!isNaN(DL[r]))ok.push(r);if(ok.length<8)return [d,m];
 const fill=(X,fade)=>{const Y=new Float32Array(H),f=ok[0],l=ok[ok.length-1];let j=0;
  for(let r=0;r<H;r++){if(r<=f)Y[r]=fade?X[f]*Math.max(0,1-(f-r)/12):X[f];else if(r>=l)Y[r]=fade?X[l]*Math.max(0,1-(r-l)/12):X[l];
   else{while(ok[j+1]<=r)j++;const u=ok[j],v=ok[j+1];Y[r]=v==u?X[u]:X[u]+(X[v]-X[u])*(r-u)/(v-u)}}return Y};
 const box=X=>{const Y=new Float32Array(H);for(let r=0;r<H;r++){let s=0,n=0;for(let t=r-7;t<=r+7;t++)if(t>=0&&t<H){s+=X[t];n++}Y[r]=s/n}return Y};
 const cap=X=>{for(let r=1;r<H;r++)X[r]=Math.max(X[r-1]-1,Math.min(X[r-1]+1,X[r]));for(let r=H-2;r>=0;r--)X[r]=Math.max(X[r+1]-1,Math.min(X[r+1]+1,X[r]));return X};
 const L=cap(box(fill(DL,1))),R=cap(box(fill(DR,1))),PP=box(fill(P,0)),QQ=box(fill(Q,0));
 const d2=new Float32Array(d),m2=new Uint8Array(m);let moved=0;
 for(let r=0;r<H;r++){const dl=L[r],dr=R[r],p=PP[r],q=QQ[r];if(Math.abs(dl)<1.5&&Math.abs(dr)<1.5)continue;moved++;
  for(let c=0;c<W;c++){const t=q>p?Math.max(0,Math.min(1,(c-p)/(q-p))):0,sc=Math.round(c+dl+(dr-dl)*t),i=r*W+c;if(sc<0||sc>=W){m2[i]=0;continue}const j=r*W+sc;m2[i]=m[j];d2[i*3]=d[j*3];d2[i*3+1]=d[j*3+1];d2[i*3+2]=d[j*3+2]}}
 // a few px of her shoulder/arm still beside a top that covers her whole shoulder line: the top's edge colour is carried out to her edge (≤10 px; not for a tank – her sleeves are outside it)
 for(let r=Math.floor(H*.15);r<Math.floor(H*.32);r++){let a=-1,z=-1,p=-1,q=-1;for(let c=0;c<W;c++){const i=r*W+c;if(m2[i]){if(a<0)a=c;z=c}if(isB(i)){if(p<0)p=c;q=c}}
  if(a<0||p<0||z-a<(q-p)*.85)continue;const cp=(c,s)=>{const i=r*W+c,j=r*W+s;m2[i]=1;d2[i*3]=d2[j*3];d2[i*3+1]=d2[j*3+1];d2[i*3+2]=d2[j*3+2];moved++};
  if(a-p>0&&a-p<=10)for(let c=p;c<a;c++)cp(c,Math.min(W-1,a+2));if(q-z>0&&q-z<=10)for(let c=z+1;c<=q;c++)cp(c,Math.max(0,z-2))}
 return moved?[d2,m2]:[d,m]}
function unBlack(d,b,pm){const DB=new Uint8Array(N);for(let i=0;i<N;i++){const k=i*3;DB[i]=b[k+2]-b[k]>22&&b[k+2]>150?1:0}
 const DBd=dilate(DB,1);let area=0,ins=0;for(let i=0;i<N;i++)if(!DBd[i]){area++;if(pm[i])ins++}
 const dark=area>0&&ins>area*.04;
 const lum=k=>d[k]*.299+d[k+1]*.587+d[k+2]*.114,sat=k=>Math.max(d[k],d[k+1],d[k+2])-Math.min(d[k],d[k+1],d[k+2]);
 const M=new Uint8Array(N);
 for(let i=0;i<N;i++){const k=i*3;if(pm[i]){if(!(dark&&!DBd[i]))M[i]=1}else if(DB[i]&&lum(k)<70&&sat(k)<40)M[i]=1}
 // the dark-grey rim where the black meets the garment, inside the doll's backdrop
 for(let pass=0;pass<2;pass++){const add=[];for(let i=W;i<N-W;i++){if(M[i]||!DBd[i])continue;if(!(M[i-1]||M[i+1]||M[i-W]||M[i+W]))continue;const k=i*3;if(lum(k)<150&&sat(k)<45)add.push(i)}add.forEach(i=>M[i]=1)}
 for(let i=0;i<N;i++)if(M[i]){const k=i*3;d[k]=b[k];d[k+1]=b[k+1];d[k+2]=b[k+2]}
 return dark}
function panelM(M,v,ex,ey){const [x0,y0]=OFFS[v],[dx,dy]=SH[v],o=new Uint8Array(N);
 for(let r=0;r<H;r++){const sy=Math.min(SHH-1,Math.max(0,y0+dy+ey+r));for(let c=0;c<W;c++){const sx=Math.min(SW-1,Math.max(0,x0+dx+ex+c));o[r*W+c]=M[sy*SW+sx]}}
 return o}
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
 // v232 (Sara 00:33 "החולצה הלבנה לא חתך אותה טוב באתר"): a white or grey garment and the doll's light beige differ by less than 40 where the doll is lit,
 // so those parts were left out – beige holes in the blouse. Near the garment, a pixel that is neutral (white, grey, black) where the doll is warm beige is the garment too
 if(!SMALL&&!HEAD){const near=dilate(m,30),wm=(a,k)=>(a[k]-a[k+2])/((a[k]+a[k+1]+a[k+2])/3+1);
  for(let i=0;i<N;i++){if(m[i]||!near[i]||dbg[i]<=22)continue;const k=i*3,wd=wm(ds,k);if(Math.abs(wd)<.08&&wm(bs,k)-wd>.09)m[i]=1}
  palette(m,bs,ds,diff,dbg,o)}
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
 // v250 (Sara 27/10 16:53 "חגורות… שתגזור בדיוק מה שצריך, שלא תשאיר לי את החום"): the belt's rim kept doll-beige pixels.
 // A rim pixel that looks more like the bare doll there than like the belt's own core colour is the doll, not the belt
 if(o.rim)for(let p=0;p<3;p++){const core=erode(m,3);let cr=0,cg=0,cb=0,cn=0;for(let i=0;i<N;i++)if(core[i]){const k=i*3;cr+=d[k];cg+=d[k+1];cb+=d[k+2];cn++}
  if(cn<30)break;cr/=cn;cg/=cn;cb/=cn;let dropped=0;
  for(let i=0;i<N;i++){if(!m[i]||core[i])continue;const k=i*3,dd=Math.hypot(d[k]-b[k],d[k+1]-b[k+1],d[k+2]-b[k+2]),dc=Math.hypot(d[k]-cr,d[k+1]-cg,d[k+2]-cb);if(dd<.8*dc){m[i]=0;dropped++}}
  if(!dropped)break}
 if(CUT)for(let i=Math.floor(H*.45)*W;i<N;i++)m[i]=0;
 else if(!HEAD&&!o.nohem){let mw=0;const w=new Int32Array(H);for(let r=0;r<H;r++){let s=0;for(let c=0;c<W;c++)s+=m[r*W+c];w[r]=s;if(s>mw)mw=s}
  let last=-1;for(let r=0;r<H;r++)if(w[r]>=.35*mw)last=r;if(last>=0)for(let i=(last+2)*W;i<N;i++)m[i]=0}   // the hem: nothing of the item below the last wide row (feet, floor)
 return m}
// v233 (Sara 27/10 07:07, a cream blouse: "רואים את הגוף של הבובה"): cream, ivory, light beige are warm like the doll, so the v232 rule
// missed them – beige patches and torn views. The garment's own colours are learnt from the parts that surely are the garment
// (6 colours, Lab, lightness counts half: folds and light change it more than the colour). Near the garment, a pixel much closer
// to those colours than to the doll under it is the garment too. Her notes make it bolder: o.light (white, cream, beige) · o.sheer
const LIN=v=>{v/=255;return v>.04045?Math.pow((v+.055)/1.055,2.4):v/12.92},LF=t=>t>.008856?Math.cbrt(t):7.787*t+16/116;
function lab3(a){const o=new Float32Array(a.length);for(let k=0;k<a.length;k+=3){const r=LIN(a[k]),g=LIN(a[k+1]),b=LIN(a[k+2]),y=LF(.2126*r+.7152*g+.0722*b);
 o[k]=(116*y-16)*.5;o[k+1]=500*(LF((.4124*r+.3576*g+.1805*b)/.95047)-y);o[k+2]=200*(y-LF((.0193*r+.1192*g+.9505*b)/1.08883))}return o}
function palette(m,bs,ds,diff,dbg,o){const conf=erode(m,2),Ld=lab3(ds),X=[];for(let i=0;i<N;i+=2)if(conf[i]&&diff[i]>48)X.push(i);
 if(X.length<100)return;
 const K=6,dd=(k,q)=>{const a=Ld[k]-q[0],b=Ld[k+1]-q[1],c=Ld[k+2]-q[2];return a*a+b*b+c*c};X.sort((p,q)=>Ld[p*3]-Ld[q*3]);
 let C=[];for(let j=0;j<K;j++){const k=X[Math.floor((j+.5)*X.length/K)]*3;C.push([Ld[k],Ld[k+1],Ld[k+2]])}let cnt=[];
 for(let t=0;t<12;t++){const S=C.map(()=>[0,0,0]);cnt=C.map(()=>0);
  for(const i of X){const k=i*3;let bj=0,bd=Infinity;for(let j=0;j<K;j++){const e=dd(k,C[j]);if(e<bd){bd=e;bj=j}}cnt[bj]++;S[bj][0]+=Ld[k];S[bj][1]+=Ld[k+1];S[bj][2]+=Ld[k+2]}
  for(let j=0;j<K;j++)if(cnt[j])C[j]=S[j].map(x=>x/cnt[j])}
 C=C.filter((_,j)=>cnt[j]>Math.max(15,.03*X.length));if(!C.length)return;
 const Lb=lab3(bs),near=dilate(m,o.sheer?40:30),minB=o.sheer?1.2:o.light?1.5:2.5,ratio=o.sheer?.6:o.light?.5:.4,add=[];
 for(let i=0;i<N;i++){if(m[i]||!near[i]||dbg[i]<=22)continue;const k=i*3,dB=Math.sqrt(dd(k,[Lb[k],Lb[k+1],Lb[k+2]]));if(dB<=minB)continue;
  let dG=Infinity;for(const q of C){const e=dd(k,q);if(e<dG)dG=e}if(Math.sqrt(dG)<ratio*dB)add.push(i)}
 for(const i of add)m[i]=1}
// her notes for the cut (v233, Sara 07:07 "שנרשום לך אם יש משהו מיוחד כדי שתשים לב כשאתה חותך ... לבן, שקוף, שמנת"): the words the site understands
const NOTEW={light:/לבן|לבנה|שמנת|קרם|או?ף[ -]?וו?יט|שנהב|ניוד|בז['׳]|בהיר|פנינה|פודרה|white|cream|ivory|beige|nude/i,
 sheer:/שקו?ף|שקופה|שקיפות|שיפון|תחרה|רשת|טול|אוורירי|sheer|lace|mesh|chiffon|tulle/i,chain:/שרשרת|שרשראות|chain/i};
const NOTET={light:'בגד בהיר (לבן, שמנת, בז׳): גוזרת עדין יותר ליד הבובה',sheer:'בגד שקוף: משאירה גם את מה שרואים דרכו',chain:'שרשרת: גוזרת דק, גם מה שמשתלשל'};
function flags(t){t=String(t||'');const f={};for(const k in NOTEW)if(NOTEW[k].test(t))f[k]=1;return f}
const says=t=>Object.keys(flags(t)).map(k=>NOTET[k]);
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
function shade(bs,ds,k){const sb=bs[k]+bs[k+1]+bs[k+2]+1,sd=ds[k]+ds[k+1]+ds[k+2]+1;let c=0;for(let z=0;z<3;z++)c+=Math.abs(ds[k+z]/sd-bs[k+z]/sb);
 // v224 (Sara 19:09 "הכיסוי לא חתוך טוב"): a grey scarf tail over her beige arm passed as a shadow of the arm (warm greys) and was cut into pieces – a shadow keeps the colour's strength, grey has none
 const sat=(a)=>{const mx=Math.max(a[k],a[k+1],a[k+2]),mn=Math.min(a[k],a[k+1],a[k+2]);return mx>0?(mx-mn)/mx:0};return c<.045&&sat(ds)>sat(bs)*.6}
// v213 (Sara 26/10 15:36, her first hairstyle "לא נגזרה טוב"): GPT's backdrop has light/dark blue patches (kept as pieces above the head),
// and GPT's body sits a few px off the doll (thin beige strips along the arm and back in the side views). Now:
// · a light blue pixel is backdrop (not for tiex – her own scarf may be blue) · a piece must touch the doll's head, not just be high up
// · below the neck a pixel counts only if it differs from every doll pixel around it (5 px) – a moved body edge is not hair · small holes are filled
function maskWhole(b,d,v,fab,keepBlue){const grow=fab||keepBlue;   // v248: her own cover's tie (tiex) also grows its long tails
const bs=gauss(b,3,1.2),ds=gauss(d,3,1.2),diff=new Float32Array(N),dbg=new Float32Array(N),bgr=new Float32Array(H*3),bgb=new Float32Array(H*3),col=[];
 for(let c=0;c<10;c++)col.push(c);for(let c=W-10;c<W;c++)col.push(c);
 for(let r=0;r<H;r++)for(let z=0;z<3;z++){const vs=col.map(c=>d[(r*W+c)*3+z]).sort((x,y)=>x-y);bgr[r*3+z]=(vs[9]+vs[10])/2;const vb=col.map(c=>b[(r*W+c)*3+z]).sort((x,y)=>x-y);bgb[r*3+z]=(vb[9]+vb[10])/2}
 const nk=NK[v]+4,low=Math.floor(H*.8),RN=5;let m=new Uint8Array(N);
 const blue=k=>{const R=d[k],G=d[k+1],B=d[k+2];return B-R>28&&B>=G-6&&R*.299+G*.587+B*.114>105};
 // v248 (Sara 27/10 16:20 "הוא גזר את זה של האבטר … לא גזר טוב"): GPT's backdrop on her plum ties was a deeper blue with a soft gradient, and tiex kept every blue pixel
 // (in case the scarf itself is blue) – so chunks of backdrop came with the head. Now blue is kept only when the scarf really is blue: most of the doll's head area turned blue.
 if(keepBlue){let nb=0,nt=0;for(let r=0;r<nk;r++)for(let c=8;c<W-8;c++){const i=r*W+c,k=i*3;let t=0;for(let z=0;z<3;z++){const e=b[k+z]-bgb[r*3+z];t+=e*e}if(t>900){nt++;if(blue(k))nb++}}keepBlue=nt>0&&nb/nt>.3}
 const grey=k=>{const mx=Math.max(d[k],d[k+1],d[k+2]),mn=Math.min(d[k],d[k+1],d[k+2]);return mx>0&&(mx-mn)/mx<.1};   // v224: a grey scarf near her arm's dark crease is not GPT's body moved (that is skin-coloured)
 const far=(r,c,k)=>{for(let y=Math.max(0,r-RN);y<=Math.min(H-1,r+RN);y++)for(let x=Math.max(0,c-RN);x<=Math.min(W-1,c+RN);x++){const j=(y*W+x)*3;let s=0;for(let z=0;z<3;z++){const a=ds[k+z]-bs[j+z];s+=a*a}if(s<1600)return false}return true};
 for(let r=0;r<low;r++)for(let c=0;c<W;c++){const i=r*W+c,k=i*3;let s=0,t=0;for(let z=0;z<3;z++){const a=ds[k+z]-bs[k+z],e=d[k+z]-bgr[r*3+z];s+=a*a;t+=e*e}
  diff[i]=Math.sqrt(s);dbg[i]=Math.sqrt(t);if(!keepBlue&&blue(k))continue;
  m[i]=dbg[i]>22&&(r<nk||diff[i]>40&&!shade(bs,ds,k)&&(grey(k)||far(r,c,k)))?1:0}
 if(window.CUT8D)CUT8D.raw=Uint8Array.from(m);
 for(let r=0;r<H;r++)for(let c=0;c<8;c++){m[r*W+c]=0;m[r*W+W-1-c]=0}   // the sheet's white divider lines
 m=erode(dilate(m,2),2);m=dilate(erode(m,1),1);
 {const o=dilate(erode(m,2),2);for(let i=(nk+10)*W;i<N;i++)m[i]=o[i]}   // lower down, a strip under 5 px wide is the edge of GPT's body, not hair
 if(window.CUT8D)CUT8D.morph=Uint8Array.from(m);
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
 // v245 (Sara's 27 ties, 27/10): a long scarf over her body lost bits (grey knit over the beige dress passed as a shadow) – below the neck the scarf grows into neighbours of its own colour
 if(grow)for(let it=0;it<8;it++){const T=[0,1,2,3].map(()=>new Float64Array((W+1)*(H+1)));
  for(let r=0;r<H;r++)for(let c=0;c<W;c++){const i=r*W+c,j=(r+1)*(W+1)+c+1,on=m[i]?1:0;for(let z=0;z<4;z++){const t=T[z];t[j]=t[j-1]+t[j-W-1]-t[j-W-2]+(on?(z<3?d[i*3+z]:1):0)}}
  const bx=(t,r0,c0,r1,c1)=>t[(r1+1)*(W+1)+c1+1]-t[r0*(W+1)+c1+1]-t[(r1+1)*(W+1)+c0]+t[r0*(W+1)+c0],e=dilate(m,2);let add=0;
  for(let r=nk;r<low;r++)for(let c=8;c<W-8;c++){const i=r*W+c,k=i*3;if(m[i]||!e[i]||dbg[i]<=22||diff[i]<25||blue(k))continue;
   const r0=Math.max(0,r-7),r1=Math.min(H-1,r+7),c0=Math.max(0,c-7),c1=Math.min(W-1,c+7),n=bx(T[3],r0,c0,r1,c1);if(n<12)continue;
   let q=0;for(let z=0;z<3;z++)q+=(d[k+z]-bx(T[z],r0,c0,r1,c1)/n)**2;if(q<34*34){m[i]=2;add++}}
  for(let i=0;i<N;i++)if(m[i]==2)m[i]=1;if(!add)break}
 // v259 (Sara 27/10 20:18 "רואים את הבד של החולצה" through her tie's tail): a scarf's tail is one piece of cloth – below the neck small gaps are closed
 // and every hole inside it is filled (hair keeps its gaps between strands)
 // v259b (Sara 20:35 "יש חלק גם מהכיסוי שהוא קצת שקוף … יש לי הרבה כיסויים כאלה"): light flowers printed on a dark scarf look like the beige dress to the
// doll test, so bites were taken out of the tail's edge. Within 7 px of the tail anything GPT changed at all (not the doll as it was) is the scarf too
if(grow){const cl=erode(dilate(m,7),7);for(let i=(nk+6)*W;i<N;i++)if(cl[i]&&!m[i]&&diff[i]>16&&dbg[i]>22&&!blue(i*3))m[i]=1;
 const c2=erode(dilate(m,3),3),f=fillHoles(c2);for(let i=(nk+6)*W;i<N;i++)if(f[i])m[i]=1}
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
// v274 (Sara 23:29 "השקוף לא עובד"): a clear belt differs from the doll under it only by its shine and stones, so the normal cut kept a few torn bits.
// The belt is the band of rows where most of the body changed a little; in it the shine and stones keep their own colour, and the clear part is a thin white veil
function maskClear(b,d){const bs=gauss(b,3,1.2),ds=gauss(d,3,1.2),df=new Float32Array(N),body=new Uint8Array(N);
 const bgr=new Float32Array(H*3),col=[];for(let c=0;c<10;c++)col.push(c);for(let c=W-10;c<W;c++)col.push(c);
 for(let r=0;r<H;r++)for(let z=0;z<3;z++){const vs=col.map(c=>b[(r*W+c)*3+z]).sort((x,y)=>x-y);bgr[r*3+z]=(vs[9]+vs[10])/2}
 for(let i=0;i<N;i++){const k=i*3,r=(i/W)|0;let s=0,u=0;for(let z=0;z<3;z++){const a=ds[k+z]-bs[k+z],f=b[k+z]-bgr[r*3+z];s+=a*a;u+=f*f}df[i]=Math.sqrt(s);body[i]=Math.sqrt(u)>30&&!(b[k+2]-b[k]>22&&b[k+2]>150)?1:0}   // the doll, not her blue backdrop
 const r0=Math.floor(H*.28),r1=Math.floor(H*.62),fr=new Float32Array(H);
 for(let r=r0;r<r1;r++){let n=0,c=0;for(let x=8;x<W-8;x++){const i=r*W+x;if(!body[i])continue;n++;if(df[i]>20)c++}fr[r]=n>20?c/n:0}   // GPT's light changes the whole body a little; the belt changes it a lot
 let best=[0,0],a=-1,gap=0;for(let r=r0;r<=r1;r++){if(r<r1&&fr[r]>.3){if(a<0)a=r;gap=0}else if(a>=0&&++gap>2){const z=r-gap;if(z-a>best[1]-best[0])best=[a,z];a=-1;gap=0}}
 const A=new Float32Array(N);if(best[1]-best[0]<4)return A;const nb=dilate(body,4);
 best[0]=Math.max(r0,best[0]-1);best[1]=Math.min(r1,best[1]+1);
 // across: the columns where the belt is (her arms at the waist change only a little) – the longest run of them
 let xa=0,xz=W-1;{const cf=new Uint8Array(W);for(let x=8;x<W-8;x++){let n=0,c=0;for(let r=best[0];r<=best[1];r++){const i=r*W+x;if(!body[i])continue;n++;if(df[i]>20)c++}cf[x]=n>3&&c>.35*n?1:0}
  let bl=0,s0=-1,g=0;for(let x=0;x<=W;x++){if(x<W&&cf[x]){if(s0<0)s0=x;g=0}else if(s0>=0&&(++g>3||x==W)){const e=x-g;if(e-s0>bl){bl=e-s0;xa=s0;xz=e}s0=-1;g=0}}if(bl<10)return A}
 // v284: her arm crossing the waist (GPT's arm is never exactly where the doll's is) changed the band too and was kept as "clear belt".
 // The belt ends at the band; an arm goes on above or below it, so a column that also changes there is her arm, not the belt
 const sk=dollSkin(b),arm=new Uint8Array(W);for(let x=8;x<W-8;x++){const fr2=(y0,y1)=>{let n=0,c=0;for(let r=Math.max(0,y0);r<Math.min(H,y1);r++){const i=r*W+x;if(!body[i]&&df[i]<40)continue;n++;if(df[i]>26)c++}return n>3?c/n:0};
  if(fr2(best[0]-14,best[0]-3)>.55||fr2(best[1]+4,best[1]+15)>.55)arm[x]=1}
 {const a2=arm.slice();for(let x=0;x<W;x++)if(a2[x])for(let t=-3;t<=3;t++)if(x+t>=0&&x+t<W)arm[x+t]=1}
 for(let r=best[0];r<=best[1];r++){const e=r==best[0]||r==best[1]?.6:1;for(let x=Math.max(8,xa-1);x<=Math.min(W-9,xz+1);x++){const i=r*W+x;if(arm[x]||sk[i])continue;if(!body[i]&&(df[i]<40||!nb[i]))continue;const k=i*3;
  if(df[i]<=14){d[k]=d[k+1]=d[k+2]=245;A[i]=.16*e}else A[i]=Math.min(1,.25+(df[i]-14)/35)*e}}
 return A}
// v284 (Sara 28/10 10:19 "אתה חותך חגורה ורואים את הלבן"): a belt's edge pixels are half belt, half GPT's beige body, so over a dark dress
// the belt had a light outline. The bare doll under every pixel is known, so each edge pixel is un-mixed: how much of it is belt
// (projected between the doll's colour and the belt's own colour nearby) becomes its transparency, and its colour is the belt's.
function matte(d,b,m){m=fillHoles(m);const core=erode(m,2),ring=dilate(m,1),A=new Float32Array(N),o=Float32Array.from(d),R=4;
 const I=new Float64Array((W+1)*(H+1)*4);for(let r=0;r<H;r++)for(let c=0;c<W;c++){const i=r*W+c,k=i*3,q=((r+1)*(W+1)+c+1)*4,u=(r*(W+1)+c+1)*4,l=((r+1)*(W+1)+c)*4,ul=(r*(W+1)+c)*4,on=core[i];
  for(let z=0;z<3;z++)I[q+z]=(on?d[k+z]:0)+I[u+z]+I[l+z]-I[ul+z];I[q+3]=on+I[u+3]+I[l+3]-I[ul+3]}
 let gr=0,gg=0,gb=0,gn=0;for(let i=0;i<N;i++)if(core[i]){gr+=d[i*3];gg+=d[i*3+1];gb+=d[i*3+2];gn++}if(gn){gr/=gn;gg/=gn;gb/=gn}
 for(let r=0;r<H;r++)for(let c=0;c<W;c++){const i=r*W+c;if(!ring[i])continue;
  const r0=Math.max(0,r-R),r1=Math.min(H,r+R+1),c0=Math.max(0,c-R),c1=Math.min(W,c+R+1),Q=(y,x)=>(y*(W+1)+x)*4,S=z=>I[Q(r1,c1)+z]-I[Q(r0,c1)+z]-I[Q(r1,c0)+z]+I[Q(r0,c0)+z];
  const n=S(3),F=n>=3?[S(0)/n,S(1)/n,S(2)/n]:[gr,gg,gb],k=i*3;if(!n&&!gn){A[i]=m[i];continue}
  let fb=0,db=0;for(let z=0;z<3;z++){const e=F[z]-b[k+z];fb+=e*e;db+=(d[k+z]-b[k+z])*e}
  if(fb<30*30){A[i]=m[i];continue}   // a belt the colour of the doll: nothing to un-mix, keep the cut as it was
  const enc=(dx,dy)=>{let p=0,q=0;for(let t=1;t<=(m[i]?6:4);t++){const x1=c+dx*t,y1=r+dy*t,x2=c-dx*t,y2=r-dy*t;if(!p&&x1>=0&&x1<W&&y1>=0&&y1<H&&core[y1*W+x1])p=1;if(!q&&x2>=0&&x2<W&&y2>=0&&y2<H&&core[y2*W+x2])q=1}return p&&q};
  if(core[i]||enc(1,0)||enc(0,1)){let e1=0,e2=0;for(let z=0;z<3;z++){e1+=(d[k+z]-b[k+z])**2;e2+=(d[k+z]-F[z])**2}A[i]=fb>100*100&&e1<36*36&&e2>70*70?0:1;continue}   // inside: the holes of a cut-out belt show GPT's beige dress – they are holes (only on belts far from beige, so a light buckle pin stays)
  const a=Math.max(0,Math.min(1,db/fb));A[i]=a<.08?0:a;
  for(let z=0;z<3;z++){const un=a>.5?b[k+z]+(d[k+z]-b[k+z])/a:F[z];o[k+z]=Math.max(0,Math.min(255,a>.5?.5*un+.5*F[z]:F[z]))}}
 return layerA(o,A)}
// v296 (Sara 28/10 13:43 "הגזירה מסביב לכיסוי ולחולצה לא מדויקת"): the outer 3 px of a top / cover are half garment, half GPT's light backdrop or beige body,
// so over a dark skirt or background the garment had a light outline. An edge pixel lighter than the garment just inside it takes the garment's
// colour, and the lighter it was, the more see-through it gets. A light garment (its edge is not lighter than it) is left as it was.
// b (the bare doll): the light-blue backdrop left in a gap between her arm and her body is taken out – unless the garment itself is that light blue.
function defringe(c,b,open){const g=c.getContext('2d'),im=g.getImageData(0,0,W,H),p=im.data,on=new Uint8Array(N),so=new Uint8Array(N);let gap=0;
 if(b){let K=[0,0,0],kn=0;for(let r=0;r<12;r++)for(const x of [0,1,2,3,4,W-5,W-4,W-3,W-2,W-1]){const q=(r*W+x)*3;K[0]+=b[q];K[1]+=b[q+1];K[2]+=b[q+2];kn++}K=K.map(v=>v/kn);
  const dd=(a,o,k)=>(a[o]-k[0])**2+(a[o+1]-k[1])**2+(a[o+2]-k[2])**2;
  const G=[];let bo=0,bk=0;for(let i=0;i<N;i++){const q=i*4;if(p[q+3]<200)continue;const P=[p[q],p[q+1],p[q+2]],near=dd(P,0,K)<36*36&&P[2]-P[0]>K[2]-K[0]-22;if(near)G.push(i);if(dd(b,i*3,K)>=26*26){bo++;if(near)bk++}}
  if(bk<.03*bo||G.length<.12*(bo+G.length))for(const i of G){p[i*4+3]=0;gap++}
  // v297 (her 💬 15:44 "הזקט לא חתוך טוב", "רואים את הגוף"): a band of her beige body left along the edge of an open jacket or a scarf's tails –
  // a pixel near the edge that is the bare doll's own colour there, on a garment that is not that colour itself, is the doll: out.
  {let fr=0,fg=0,fb=0,fn=0;const so0=new Uint8Array(N),on0=new Uint8Array(N);for(let i=0;i<N;i++){const a=p[i*4+3];on0[i]=a>20?1:0;so0[i]=a>=250?1:0}
   const cr=erode(so0,3),dp=erode(on0,7);for(let i=0;i<N;i++)if(cr[i]){fr+=p[i*4];fg+=p[i*4+1];fb+=p[i*4+2];fn++}
   if(fn>500){const F=[fr/fn,fg/fn,fb/fn];for(let i=0;i<N;i++){if(!on0[i]||dp[i])continue;const q=i*4,k=i*3,e=(p[q]-b[k])**2+(p[q+1]-b[k+1])**2+(p[q+2]-b[k+2])**2,f=(F[0]-b[k])**2+(F[1]-b[k+1])**2+(F[2]-b[k+2])**2;
    if(e<22*22&&f>50*50&&dd(b,k,K)>=26*26){p[q+3]=0;gap++}}
   // v309 (her 16:41 "רואים את הגוף מאחורי הבד"): GPT draws her body inside an open jacket shaded and a few px off the doll, so a wider band stayed.
   // Up to 14 px in from the edge, a pixel that is the doll's colour somewhere within 4 px (not the backdrop), and 4x nearer to it than to the jacket,
   // is the body – removed when it touches the gap, growing in from the gap through such pixels (a jacket's own colour never grows).
   let DM=[0,0,0],dn=0;if(open)for(let r=Math.floor(H*.25);r<Math.floor(H*.6);r++)for(let c=0;c<W;c++){const k=(r*W+c)*3;if(dd(b,k,K)<26*26)continue;DM[0]+=b[k];DM[1]+=b[k+1];DM[2]+=b[k+2];dn++}
   if(dn)DM=DM.map(x=>x/dn);   // a jacket near her body's own beige (camel, khaki) is left alone: there the colours can't tell jacket from body
   if(open&&fn>500&&dn&&(F[0]-DM[0])**2+(F[1]-DM[1])**2+(F[2]-DM[2])**2>100*100){const dz=erode(on0,14),ok=new Uint8Array(N),LF=.299*F[0]+.587*F[1]+.114*F[2];
    for(let i=0;i<N;i++){const q=i*4;if(!on0[i]||dz[i]||p[q+3]<=20)continue;const k=i*3,f=(F[0]-b[k])**2+(F[1]-b[k+1])**2+(F[2]-b[k+2])**2;if(f<55*55)continue;
     const r=(i/W)|0,c=i%W,sp=p[q]+p[q+1]+p[q+2]+1,lp=.299*p[q]+.587*p[q+1]+.114*p[q+2];let be=1e9,bc=1e9,bl=0;
     for(let y=Math.max(0,r-4);y<=Math.min(H-1,r+4);y++)for(let x=Math.max(0,c-4);x<=Math.min(W-1,c+4);x++){const j=(y*W+x)*3;if(dd(b,j,K)<26*26)continue;const e=(p[q]-b[j])**2+(p[q+1]-b[j+1])**2+(p[q+2]-b[j+2])**2;if(e<be)be=e;
      const sb=b[j]+b[j+1]+b[j+2]+1,ch=(p[q]/sp-b[j]/sb)**2+(p[q+1]/sp-b[j+1]/sb)**2+(p[q+2]/sp-b[j+2]/sb)**2;if(ch<bc){bc=ch;bl=.299*b[j]+.587*b[j+1]+.114*b[j+2]}}
     const g=(p[q]-F[0])**2+(p[q+1]-F[1])**2+(p[q+2]-F[2])**2,sf=F[0]+F[1]+F[2]+1,cf=(p[q]/sp-F[0]/sf)**2+(p[q+1]/sp-F[1]/sf)**2+(p[q+2]/sp-F[2]/sf)**2;
     // …or, on a dark jacket, her body in its shadow: the doll's hue, lighter than the jacket, not lighter than the doll
     if((be<28*28&&g>4*be)||(LF<90&&lp>LF+35&&lp<1.05*bl&&bc<.05*.05&&p[q]-p[q+2]>15))ok[i]=1}
    const tr=j=>p[j*4+3]<=20,st=[];for(let i=0;i<N;i++)if(ok[i]){const r=(i/W)|0,c=i%W;const sd=j=>tr(j)&&dd(b,j*3,K)>=26*26;if((c>0&&sd(i-1))||(c<W-1&&sd(i+1))||(r>0&&sd(i-W))||(r<H-1&&sd(i+W)))st.push(i)}   // a seed is a gap over her body, not over the backdrop
    while(st.length){const i=st.pop();if(!ok[i])continue;ok[i]=0;p[i*4+3]=0;gap++;const r=(i/W)|0,c=i%W;if(c>0&&ok[i-1])st.push(i-1);if(c<W-1&&ok[i+1])st.push(i+1);if(r>0&&ok[i-W])st.push(i-W);if(r<H-1&&ok[i+W])st.push(i+W)}}}}
  if(gap){const m=new Uint8Array(N);for(let i=0;i<N;i++)m[i]=p[i*4+3]>40?1:0;const [Lb,nl]=label(m),sz=new Int32Array(nl+1);for(let i=0;i<N;i++)if(m[i])sz[Lb[i]]++;for(let i=0;i<N;i++)if(m[i]&&sz[Lb[i]]<25)p[i*4+3]=0}}   // what is left of the backdrop: specks   // over her body the garment is that light blue too: it is the garment's own colour – keep it
 for(let i=0;i<N;i++){const a=p[i*4+3];on[i]=a>20?1:0;so[i]=a>=250?1:0}
 const core=erode(so,b?3:2),deep=erode(on,3),deep7=b?erode(on,7):deep,R=b?8:5,I=new Float64Array((W+1)*(H+1)*4);
 for(let r=0;r<H;r++)for(let x=0;x<W;x++){const i=r*W+x,q=((r+1)*(W+1)+x+1)*4,u=(r*(W+1)+x+1)*4,l=((r+1)*(W+1)+x)*4,ul=(r*(W+1)+x)*4,k=core[i];
  for(let z=0;z<3;z++)I[q+z]=(k?p[i*4+z]:0)+I[u+z]+I[l+z]-I[ul+z];I[q+3]=k+I[u+3]+I[l+3]-I[ul+3]}
 const Q=(y,x)=>(y*(W+1)+x)*4,L=(a,b,d)=>.299*a+.587*b+.114*d;let n=0;
 for(let r=0;r<H;r++)for(let x=0;x<W;x++){const i=r*W+x;if(!on[i]||deep7[i]||core[i])continue;
  const r0=Math.max(0,r-R),r1=Math.min(H,r+R+1),c0=Math.max(0,x-R),c1=Math.min(W,x+R+1),S=z=>I[Q(r1,c1)+z]-I[Q(r0,c1)+z]-I[Q(r1,c0)+z]+I[Q(r0,c0)+z],m=S(3);if(m<4)continue;
  const F=[S(0)/m,S(1)/m,S(2)/m],q=i*4;
  // v297: up to 7 px in, a pixel that is a mix of the garment and the bare doll under it (her beige body inside an open jacket) is un-mixed like a belt (matte)
  if(b){const k=i*3;let fb=0,db=0;for(let z=0;z<3;z++){const e=F[z]-b[k+z];fb+=e*e;db+=(p[q+z]-b[k+z])*e}
   if(fb>50*50){const a=db/fb;let rs=0;for(let z=0;z<3;z++)rs+=(p[q+z]-(b[k+z]+a*(F[z]-b[k+z])))**2;
    if(rs<30*30&&a<.9){if(a<.15)p[q+3]=0;else{for(let z=0;z<3;z++)p[q+z]=Math.round(F[z]);p[q+3]=Math.round(p[q+3]*Math.min(1,a))}n++;continue}}}
  if(deep[i])continue;const d=L(p[q],p[q+1],p[q+2])-L(F[0],F[1],F[2]);if(d<14)continue;
  const t=Math.min(1,(d-14)/50+.35);for(let z=0;z<3;z++)p[q+z]=Math.round(p[q+z]*(1-t)+F[z]*t);p[q+3]=Math.round(p[q+3]*(1-.45*t));n++}
 if(n||gap)g.putImageData(im,0,0);c.fr=n;return c}
// v290 (Sara 28/10 15:22 "שיעשה אותם בצבע שחור, ככה תדע להוציא את זה"): gold, silver, clear and chain belts are made by GPT on the doll dressed in a plain
// matte BLACK bodysuit (gpt250 asks for it). Over black the belt is simply what is not black: no guessing against her beige dress.
// A clear belt over black is its own shine – how bright a pixel is, is how much belt is there (so on the avatar the garment under it shows through).
function blackBody(d,b){const bd=erode(dollBody(b),6);let n=0,k=0;const r0=Math.floor(H*.3),r1=Math.floor(H*.7);
 for(let r=r0;r<r1;r++)for(let c=0;c<W;c++){const i=r*W+c;if(!bd[i])continue;n++;const q=i*3;if(Math.max(d[q],d[q+1],d[q+2])<62)k++}return n>200&&k>.45*n}
function keyBlack(d,b,sheer){const body=dilate(dollBody(b),8),sk=dilate(dollSkin(b),5),A=new Float32Array(N),o=Float32Array.from(d),r0=Math.floor(H*.24),r1=Math.floor(H*.82);
 let K=[0,0,0],kn=0;const bd=erode(dollBody(b),6);for(let r=Math.floor(H*.3);r<Math.floor(H*.7);r++)for(let c=0;c<W;c++){const i=r*W+c,q=i*3;if(bd[i]&&Math.max(d[q],d[q+1],d[q+2])<45){K[0]+=d[q];K[1]+=d[q+1];K[2]+=d[q+2];kn++}}
 if(kn)K=K.map(x=>x/kn);const kl=Math.max(...K);
 for(let r=r0;r<r1;r++)for(let c=0;c<W;c++){const i=r*W+c;if(!body[i])continue;const q=i*3,R=d[q],G=d[q+1],B=d[q+2],L=Math.max(R,G,B);
  if(sk[i]&&R>G&&G>B&&R-B>18&&R-B<95&&G>.66*R&&L>95)continue;   // her own hand on the hip, not the belt
  const a=sheer?Math.min(1,Math.max(0,(L-kl-22)/150)):Math.min(1,Math.max(0,(L-kl-28)/45));if(a<.05)continue;A[i]=a;
  for(let z=0;z<3;z++)o[q+z]=Math.max(0,Math.min(255,K[z]+(d[q+z]-K[z])/a))}
 // specks: a piece smaller than 10 px that is not near a bigger one is GPT's noise on the black
 const m=new Uint8Array(N);for(let i=0;i<N;i++)m[i]=A[i]>.25?1:0;const [Lb,n]=label(dilate(m,2)),sz=new Int32Array(n+1);for(let i=0;i<N;i++)if(m[i])sz[Lb[i]]++;
 for(let i=0;i<N;i++)if(A[i]&&sz[Lb[i]]<10)A[i]=0;
 return layerA(o,A)}
// the doll's own pixels (not her light-blue backdrop) of one view
function dollBody(b){const bgr=new Float32Array(H*3),col=[],body=new Uint8Array(N);for(let c=0;c<10;c++)col.push(c);for(let c=W-10;c<W;c++)col.push(c);
 for(let r=0;r<H;r++)for(let z=0;z<3;z++){const vs=col.map(c=>b[(r*W+c)*3+z]).sort((x,y)=>x-y);bgr[r*3+z]=(vs[9]+vs[10])/2}
 for(let i=0;i<N;i++){const k=i*3,r=(i/W)|0;let u=0;for(let z=0;z<3;z++){const f=b[k+z]-bgr[r*3+z];u+=f*f}body[i]=Math.sqrt(u)>30&&!(b[k+2]-b[k]>22&&b[k+2]>150)?1:0}
 return body}
// v284: her arms and hands on the doll (warm, more saturated than the beige dress). Used where a thin or clear belt meets her hand on the hip:
// GPT's fingers are never where the doll's are, so they were kept as part of the belt
function dollSkin(b){const m=new Uint8Array(N);for(let i=0;i<N;i++){const k=i*3,r=b[k]/255,g=b[k+1]/255,u=b[k+2]/255,mx=Math.max(r,g,u),mn=Math.min(r,g,u),l=(mx+mn)/2,dd=mx-mn,s=l<.5?dd/(mx+mn+1e-6):dd/(2-mx-mn+1e-6);
  m[i]=s>.6&&r>=g&&g>=u-.02&&l>.3&&l<.93?1:0}
 return dilate(erode(dilate(m,2),2),2)}
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
const MODE={cover:{mode:'head'},scarf:{mode:'head'},necklace:{mode:'small',rows:[.1,.55],one:1},earrings:{mode:'small',rows:[.03,.2]},bracelet:{mode:'small',low:1},ring:{mode:'small',low:1},
 belt:{rows:[.28,.62],nohem:1,rim:1},shoes:{rows:[.8,1],nohem:1},hair:{mode:'whole'},tie:{mode:'whole',fab:1},tiex:{mode:'whole'},makeup:{mode:'face'}};
const FRK=['cover','scarf','jacket','coat','vest'],OPENK=['jacket','coat','vest'];   // v296: cut with defringe() besides the tops
const tick=()=>new Promise(r=>setTimeout(r,0));
// src: a File/Blob or a url · kind: KIND key · onStep(i): progress · opt.note: her notes for the cut (v233) → {views:[canvas×8], shifts, px}
async function run(src,kind,onStep,opt){const img=await toImg(src);const S=sheetData(img);if(!S)throw Object.assign(new Error('shape'),{code:'shape',w:img.naturalWidth,h:img.naturalHeight});
 const o=Object.assign({},MODE[kind]||{},flags(opt&&opt.note)),views=[],shifts=[],fab=[],lum=[];const S0=S.slice(),BM=deBlack(S);
 for(let v=0;v<8;v++){onStep&&onStep(v);await tick();const b=await base(v);const s=shift(S,v,b,o.mode=='head'||o.mode=='whole');shifts.push(s);const d=panel(BM?S0:S,v,s[0],s[1]);if(BM)unBlack(d,b,panelM(BM,v,s[0],s[1]));
  if(o.mode=='whole'){const [m,f,l]=maskWhole(b,d,v,o.fab,kind=='tiex');views.push(kind=='hair'?await snug(turn(layerA(d,m.A),v),v):turn(kind=='tiex'&&!BM?defringe(layerA(d,m.A)):layerA(d,m.A),v));if(f){fab.push(turn(layer(d,f),v));lum.push(...l)}}
  else if(o.mode=='face')views.push(turn(layerA(d,maskFace(b,d,v)),v));
  else if(kind=='belt'&&blackBody(d,b))views.push(turn(keyBlack(d,b,!!o.sheer),v));
  else if(kind=='belt'&&o.chain){const m=mask(b,d,Object.assign({},o,{mode:'small',low:1,warm:1,rows:[.28,.8],one:1,rim:0}));
   const inb=erode(dollBody(b),5),sk=dollSkin(b);   // v284: bits along her arm's outline (GPT's arm vs the doll's, over the backdrop) are not the chain
   for(let i=0;i<N;i++)if(m[i]){const k=i*3,l=.299*d[k]+.587*d[k+1]+.114*d[k+2];if(l<105||d[k+1]<.7*d[k]||!inb[i]||sk[i])m[i]=0}
   {let br=-1,bw=0;for(let r=0;r<H;r++){let n=0;for(let c=0;c<W;c++)n+=m[r*W+c];if(n>bw){bw=n;br=r}}if(br>8)m.fill(0,0,(br-8)*W)}   // a chain hangs down from the waist line, never up   // a chain is gold or crystal: bright, not her nails or a dark edge
   views.push(turn(layer(d,m),v))}
  else if(kind=='belt'&&o.sheer)views.push(turn(layerA(d,maskClear(b,d)),v));
  else{let m=mask(b,d,o);if(TOPK.includes(kind)){const r=slide(d,m,b);m=r[1];views.push(turn(defringe(layer(r[0],m),b),v))}else views.push(turn(kind=='belt'?matte(d,b,m):FRK.includes(kind)?defringe(layer(d,m),b,OPENK.includes(kind)):layer(d,m),v))}}
 lum.sort((x,y)=>x-y);
 return {views,shifts,px:views.map(c=>c.px),fab:fab.length?fab:null,lum:lum.length?Math.round(lum[lum.length>>1]):0,black:!!BM}}
// test helper: the panel, the doll and the masks of one view of a sheet (window.cut8dbg(url,v))
window.cut8dbg=async(src,v)=>{const img=await toImg(src),S=sheetData(img),b=await base(v),s=shift(S,v,b,true),d=panel(S,v,s[0],s[1]);window.CUT8D={};const [m]=maskWhole(b,d,v,1,false);
 const im=a=>{const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),x=g.createImageData(W,H);for(let i=0;i<N;i++){const on=a.length==N?a[i]:0;x.data[i*4]=on?255:0;x.data[i*4+1]=on?255:0;x.data[i*4+2]=on?255:0;x.data[i*4+3]=255}g.putImageData(x,0,0);return c.toDataURL()};
 const rgb=a=>{const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),x=g.createImageData(W,H);for(let i=0;i<N;i++){x.data[i*4]=a[i*3];x.data[i*4+1]=a[i*3+1];x.data[i*4+2]=a[i*3+2];x.data[i*4+3]=255}g.putImageData(x,0,0);return c.toDataURL()};
 return {d:rgb(d),b:rgb(b),raw:im(CUT8D.raw),morph:im(CUT8D.morph),fin:im(m)}};
window.cut8={run,MODE,W,H,CV:2,CVT:3,TOPK,cvOf:k=>TOPK.includes(k)?5:k=='belt'?3:OPENK.includes(k)?6:FRK.includes(k)?4:2,CVW:9,CVH:8,CVX:5,flags,says};   // CVT/cvOf (v271): tops, base shirts and sweaters cut before the no-tear slide are cut again by av188.js   // CVW: hairstyles and ties cut before v214 are cut again by sty199.js   // CV: layers cut before v192 (no turn) have no cv and are cut again by themselves (av188.js)
})();
