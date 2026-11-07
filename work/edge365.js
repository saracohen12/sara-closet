// v365 (Sara 7/11 22:33 "הבגדים לא גזורים טוב… תעבור על כל הבגדים שכבר על 360"): the cut-out garments kept a stair-stepped, speckled edge from the cut
// (dark specks around velvet sleeves, 1-pixel bits, pinholes). Every angle of a garment (dress / top / skirt / jacket) is cleaned once when it is
// first shown and kept in this browser: specks and thin stray bits removed, pinholes filled, the outline smoothed, the rim coloured from the
// garment itself (no dark/light fringe). Covers, wigs, makeup, belts, shoes and jewellery are left exactly as they are (thin parts there are real).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v365 '+w+': '+(e&&e.message||e));
const KINDS=new Set(['body','top','bottom','outer']);
let MAP=null,MAPN=-1;
function kind(sprite){try{const it=typeof IT=='object'&&IT?IT:{};const n=Object.keys(it).length;if(!MAP||n!=MAPN){MAP=new Map();MAPN=n;
  for(const id in it){const a=it[id]&&it[id].a8;if(!Array.isArray(a))continue;for(const e of a){if(!e||!Array.isArray(e.L))continue;const s=String(e.L[0]||'').split('~')[0];if(s)MAP.set(s,e.s||'')}}}
 return MAP.get(sprite)||''}catch(_){return ''}}
const OFF=()=>{try{return localStorage.getItem('edge365')=='off'}catch(_){return false}};
function clean(c){const W=c.width,H=c.height,N=W*H,g=c.getContext('2d',{willReadFrequently:true}),im=g.getImageData(0,0,W,H),p=im.data;
 let M=new Uint8Array(N);for(let i=0;i<N;i++)M[i]=p[i*4+3]>=110?1:0;
 const dil=(m,cross)=>{const o=new Uint8Array(N);for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;if(m[i]){o[i]=1;continue}
   let v=0;if(x>0&&m[i-1]||x<W-1&&m[i+1]||y>0&&m[i-W]||y<H-1&&m[i+W])v=1;else if(!cross&&(x>0&&y>0&&m[i-W-1]||x<W-1&&y>0&&m[i-W+1]||x>0&&y<H-1&&m[i+W-1]||x<W-1&&y<H-1&&m[i+W+1]))v=1;o[i]=v}return o};
 const ero=(m,cross)=>{const o=new Uint8Array(N);for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){const i=y*W+x;if(!m[i])continue;
   if(!m[i-1]||!m[i+1]||!m[i-W]||!m[i+W])continue;if(!cross&&(!m[i-W-1]||!m[i-W+1]||!m[i+W-1]||!m[i+W+1]))continue;o[i]=1}return o};
 // fill pinholes up to 8 px (not the open background)
 const lab=new Int32Array(N),st=new Int32Array(N);
 const comps=(want)=>{lab.fill(0);const L=[0];let n=0;for(let s=0;s<N;s++){if(M[s]!=want||lab[s])continue;n++;let sp=0,sz=0,edge=false;st[sp++]=s;lab[s]=n;
   while(sp){const i=st[--sp];sz++;const x=i%W,y=(i/W)|0;if(x==0||y==0||x==W-1||y==H-1)edge=true;
    if(x>0&&M[i-1]==want&&!lab[i-1]){lab[i-1]=n;st[sp++]=i-1}if(x<W-1&&M[i+1]==want&&!lab[i+1]){lab[i+1]=n;st[sp++]=i+1}
    if(y>0&&M[i-W]==want&&!lab[i-W]){lab[i-W]=n;st[sp++]=i-W}if(y<H-1&&M[i+W]==want&&!lab[i+W]){lab[i+W]=n;st[sp++]=i+W}}
   L.push(edge?-sz:sz)}return L};
 let L=comps(0);for(let i=0;i<N;i++)if(!M[i]){const s=L[lab[i]];if(s>0&&s<=8)M[i]=1}   // only pinholes – the gaps between her fingers over the garment are real
 // open (2, cross) – stray threads and specks along the edge
 M=dil(dil(ero(ero(M,1),1),1),1);
 // drop small islands
 L=comps(1);for(let i=0;i<N;i++)if(M[i]&&Math.abs(L[lab[i]])<80)M[i]=0;
 const I=ero(ero(M,0),0);
 // soft outline: two 3x3 box blurs of the mask
 const box=(a)=>{const t=new Float32Array(N),o=new Float32Array(N);for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;t[i]=(a[i]+(x>0?a[i-1]:0)+(x<W-1?a[i+1]:0))/3}
   for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;o[i]=(t[i]+(y>0?t[i-W]:0)+(y<H-1?t[i+W]:0))/3}return o};
 const S=box(box(Float32Array.from(M)));
 // rim colour from the nearest solid garment pixel (a few steps out)
 const src=new Int32Array(N).fill(-1);let q=[];for(let i=0;i<N;i++)if(I[i]){src[i]=i;q.push(i)}
 for(let step=0;step<6&&q.length;step++){const nq=[];for(const i of q){const x=i%W;for(const j of [x>0?i-1:-1,x<W-1?i+1:-1,i-W,i+W]){if(j<0||j>=N||src[j]>=0)continue;src[j]=src[i];nq.push(j)}}q=nq}
 for(let i=0;i<N;i++){const k=i*4;if(I[i])continue;const a=Math.round(S[i]*255);if(a<=2){p[k+3]=0;continue}
  const s=src[i];if(s>=0){const m=s*4;p[k]=p[m];p[k+1]=p[m+1];p[k+2]=p[m+2]}p[k+3]=a}
 g.putImageData(im,0,0);return c}
window.EDGE365={clean,want:sprite=>!OFF()&&KINDS.has(kind(sprite))};
})();
