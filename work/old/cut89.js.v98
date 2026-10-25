// ===== v89 (2026-10-22): background removal for the 5-pose garment sheets and the covering (tichel) sheets – see comment inside
tieCutPanel=function(d,W,H,x0,x1,pi){const pw=x1-x0;let HOLE=null;
 // v89: background = what is connected to the panel's edge and has the background colour. Colour alone is not enough:
 // a white or cream garment is almost the same colour as the light grey background, so the old "brighter than the background
 // = see-through" rule erased white dresses and white coverings. Now everything inside the garment's outline stays solid.
 const N=pw*H;const sm=[[],[],[]];const push=(r,c)=>{const k=(r*W+c)*4;sm[0].push(d[k]);sm[1].push(d[k+1]);sm[2].push(d[k+2])};
 for(let c=x0;c<x1;c+=2){for(let r=H-10;r<H;r++)push(r,c)}for(let r=Math.round(H*.15);r<H;r+=2){for(let c=x0;c<x0+10;c++)push(r,c);for(let c=x1-10;c<x1;c++)push(r,c)}
 const med=a=>{const s=a.slice().sort((p,q)=>p-q);return s[s.length>>1]};const bg=[med(sm[0]),med(sm[1]),med(sm[2])];const bgL=(bg[0]+bg[1]+bg[2])/3;
 const bdd=sm[0].map((v,i)=>Math.abs(v-bg[0])+Math.abs(sm[1][i]-bg[1])+Math.abs(sm[2][i]-bg[2])).sort((p,q)=>p-q);const T=Math.max(4,Math.min(8,bdd[Math.floor(bdd.length*.95)]+2));
 const dd=new Uint16Array(N);for(let r=0;r<H;r++)for(let c=0;c<pw;c++){const k=(r*W+x0+c)*4;dd[r*pw+c]=Math.abs(d[k]-bg[0])+Math.abs(d[k+1]-bg[1])+Math.abs(d[k+2]-bg[2])}
 // close small gaps in the outline (9×9), so a faint edge does not let the background flood into the garment
 const R=4;const mx=(src,horiz,isMax,outside)=>{const o=new Uint8Array(N);for(let r=0;r<H;r++)for(let c=0;c<pw;c++){let v=isMax?0:1;for(let t=-R;t<=R;t++){const rr=horiz?r:r+t,cc=horiz?c+t:c;const q=(rr<0||rr>=H||cc<0||cc>=pw)?outside:src[rr*pw+cc];if(isMax?q:!q){v=isMax?1:0;break}}o[r*pw+c]=v}return o};
 let solid=new Uint8Array(N);for(let i=0;i<N;i++)solid[i]=dd[i]>T?1:0;
 let cl=mx(mx(solid,true,true,0),false,true,0);cl=mx(mx(cl,true,false,1),false,false,1);
 const bgm=new Uint8Array(N);const st=[];const seed=i=>{if(!cl[i]&&!bgm[i]){bgm[i]=1;st.push(i)}};
 for(let c=0;c<pw;c++){seed(c);seed((H-1)*pw+c)}for(let r=0;r<H;r++){seed(r*pw);seed(r*pw+pw-1)}
 while(st.length){const p=st.pop();const c=p%pw;if(c>0)seed(p-1);if(c<pw-1)seed(p+1);if(p>=pw)seed(p-pw);if(p<N-pw)seed(p+pw)}
 // closed background pockets (e.g. between a bent arm and the body): large, flat and exactly background-coloured
 {const lab=new Int32Array(N);let n=0;for(let i=0;i<N;i++){if(cl[i]||bgm[i]||lab[i])continue;n++;const comp=[i];lab[i]=n;let s=0;for(let h=0;h<comp.length;h++){const p=comp[h];s+=dd[p];const c=p%pw;for(const q of [c>0?p-1:-1,c<pw-1?p+1:-1,p-pw,p+pw])if(q>=0&&q<N&&!cl[q]&&!bgm[q]&&!lab[q]){lab[q]=n;comp.push(q)}}
  if(comp.length>=N*.0004&&s/comp.length<=Math.min(3,T*.4))for(const p of comp)bgm[p]=1}}
 // background-coloured fringe right next to the background goes too
 for(let i=0;i<N;i++){if(bgm[i]||dd[i]>T)continue;const c=i%pw;if((c>0&&bgm[i-1]==1)||(c<pw-1&&bgm[i+1]==1)||(i>=pw&&bgm[i-pw]==1)||(i<N-pw&&bgm[i+pw]==1))bgm[i]=2}
 const out=new Uint8ClampedArray(N*4);let minx=pw,maxx=0,miny=H,maxy=0;
 for(let r=0;r<H;r++)for(let c=0;c<pw;c++){const p=r*pw+c;if(bgm[p])continue;const k=(r*W+x0+c)*4;const o=p*4;out[o]=d[k];out[o+1]=d[k+1];out[o+2]=d[k+2];
  const edge=(c>0&&bgm[p-1])||(c<pw-1&&bgm[p+1])||(r>0&&bgm[p-pw])||(r<H-1&&bgm[p+pw]);out[o+3]=edge?Math.round(255*Math.max(.55,Math.min(1,dd[p]/(T*3)))):255;
  if(c<minx)minx=c;if(c>maxx)maxx=c;if(r<miny)miny=r;if(r>maxy)maxy=r}
 if(maxx<=minx||maxy<=miny)return null;
 if(pi==0||pi==3){// face opening: flood from inside the dome over non-solid pixels, only in the upper part
  const ch0=maxy-miny+1;const lim=miny+Math.round(ch0*.4);let dw0=0,dx0=pw,dx1=0;for(let r=miny;r<miny+Math.round(ch0*.38);r++){let a0=-1,a1=-1;for(let c=0;c<pw;c++){if(out[(r*pw+c)*4+3]>20){if(a0<0)a0=c;a1=c}}if(a0>=0){if(a1-a0>dw0)dw0=a1-a0;if(a0<dx0)dx0=a0;if(a1>dx1)dx1=a1}}
  const cx0=(dx0+dx1)/2;let FLIM=bgL+36;{const ls=[];for(let r=miny;r<lim;r+=2)for(let c=0;c<pw;c+=2){const k=(r*pw+c);if(out[k*4+3]>200)ls.push((out[k*4]+out[k*4+1]+out[k*4+2])/3)}if(ls.length){ls.sort((p,q)=>p-q);const fabL=ls[ls.length>>1];if(fabL>bgL-10)FLIM=Math.min(FLIM,fabL-28)}}const seeds=pi==0?[[0,.2],[-.1,.22],[.1,.22],[0,.3]]:[[-.18,.2],[-.08,.24],[-.25,.26],[0,.22]];const seen=new Uint8Array(pw*H);const st=[];
  for(const [fx,fy] of seeds){st.push(Math.round(cx0+fx*dw0),miny+Math.round(ch0*fy))}
  const lim2=miny+Math.round(ch0*.6);let hTop=H,hBot=0;const FL=[];while(st.length){const r=st.pop(),c=st.pop();if(c<0||r<miny||c>=pw||r>=lim2)continue;if(Math.abs(c-cx0)>dw0*(r>=lim?.3:.45))continue;const k=r*pw+c;if(seen[k])continue;const k4=(r*W+x0+c)*4;const Lp=(d[k4]+d[k4+1]+d[k4+2])/3;const dq=Math.abs(d[k4]-bg[0])+Math.abs(d[k4+1]-bg[1])+Math.abs(d[k4+2]-bg[2]);if(Lp>=FLIM||dq<14)continue;seen[k]=1;FL.push(k,out[k*4+3]);out[k*4+3]=Math.round(out[k*4+3]*.1);if(r<hTop)hTop=r;if(r>hBot)hBot=r;st.push(c+1,r,c-1,r,c,r+1,c,r-1)}
  // v39: a dark fabric would be eaten by the flood — if more than half of the upper dome went transparent, undo (no face opening)
  let solid=0;for(let r=miny;r<lim2;r++)for(let c=0;c<pw;c++){const k=r*pw+c;if(out[k*4+3]>20||seen[k])solid++}
  if(FL.length/2>solid*.5){for(let i=0;i<FL.length;i+=2)out[FL[i]*4+3]=FL[i+1];hTop=H;hBot=0}
  if(hBot>hTop+20)HOLE={top:hTop-miny,bottom:hBot-miny};
  // v89: the face opening may already be see-through (grey background seen through it) – measure it down the middle
  if(!HOLE){const cc=Math.round(cx0+(pi==3?-.12:0)*dw0);let t0=-1,t1=-1,seenSolid=false;for(let r=miny;r<=maxy;r++){const al=out[(r*pw+cc)*4+3];if(al>20){if(t0>=0){t1=r;break}seenSolid=true}else if(seenSolid&&t0<0)t0=r}if(t0>0&&t1<0)t1=maxy;if(t0>0&&t0<miny+ch0*.6&&t1>t0+20)HOLE={top:t0-miny,bottom:t1-miny}}}
 minx=Math.max(0,minx-2);miny=Math.max(0,miny-2);maxx=Math.min(pw-1,maxx+2);maxy=Math.min(H-1,maxy+2);const cw=maxx-minx+1,ch=maxy-miny+1;
 const cv=document.createElement('canvas');cv.width=cw;cv.height=ch;const x=cv.getContext('2d');const img=new ImageData(out,pw,H);const tmp=document.createElement('canvas');tmp.width=pw;tmp.height=H;tmp.getContext('2d').putImageData(img,0,0);x.drawImage(tmp,minx,miny,cw,ch,0,0,cw,ch);
 // dome = widest row within the top 38%
 let dw=0,dx0=cw,dx1=0;const lim=Math.round(ch*.38);for(let r=0;r<lim;r++){let a0=-1,a1=-1;for(let c=0;c<cw;c++){const al=out[((r+miny)*pw+minx+c)*4+3];if(al>20){if(a0<0)a0=c;a1=c}}if(a0>=0){if(a1-a0>dw)dw=a1-a0;if(a0<dx0)dx0=a0;if(a1>dx1)dx1=a1}}
 // v43: top band widths (garment fitting): widest row in the top 12%, and in the top 3%
 let topW=0,tx0=cw,tx1=0,top3=0;const l12=Math.max(1,Math.round(ch*.12)),l3=Math.max(1,Math.round(ch*.03));for(let r=0;r<l12;r++){let a0=-1,a1=-1;for(let c=0;c<cw;c++){const al=out[((r+miny)*pw+minx+c)*4+3];if(al>20){if(a0<0)a0=c;a1=c}}if(a0>=0){if(a1-a0>topW)topW=a1-a0;if(a0<tx0)tx0=a0;if(a1>tx1)tx1=a1;if(r<l3&&a1-a0>top3)top3=a1-a0}}
 // downscale to max 1000px height to keep assets small
 let fc=cv;const sc=Math.min(1,1000/ch);if(sc<1){fc=document.createElement('canvas');fc.width=Math.round(cw*sc);fc.height=Math.round(ch*sc);fc.getContext('2d').drawImage(cv,0,0,fc.width,fc.height)}
 return {canvas:fc,w:fc.width,h:fc.height,domeW:dw*sc,domeCx:(dx0+dx1)/2*sc,topW:topW*sc,topCx:(tx0+tx1)/2*sc,top3:top3*sc,hole:HOLE?{top:HOLE.top*sc,bottom:HOLE.bottom*sc}:null}};window.tieCutPanel=tieCutPanel;
// v89: the 5 panels are found by the thin white lines between them, even when the grey background itself is very light
// (the old check gave up on light backgrounds and cut 5 equal strips, which can slice a neighbour's sleeve or a white line into a pose)
p5gSlice=function(im){const rd=tieRead(im);const {d,W,H}=rd;const wc=new Uint16Array(W);
 for(let c=0;c<W;c++){let n=0;for(let r=0;r<H;r+=2){const k=(r*W+c)*4;if(d[k]>=246&&d[k+1]>=246&&d[k+2]>=246)n++}wc[c]=n}
 const half=Math.ceil(H/2);const grp=[];for(let c=Math.round(W*.05);c<W*.95;c++){if(wc[c]<half*.9)continue;const g=grp[grp.length-1];if(g&&c-g[1]<=3)g[1]=c;else grp.push([c,c])}
 const thin=grp.filter(g=>g[1]-g[0]<W*.02);let bounds=[];const xs=[0];for(const g of thin){xs.push(g[0],g[1]+1)}xs.push(W);for(let i=0;i<xs.length;i+=2){if(xs[i+1]-xs[i]>W*.08)bounds.push([xs[i],xs[i+1]])}
 if(bounds.length!=5){const g2=tieThinGroups(d,W,H);const xs2=[0];for(const g of g2){xs2.push(g[0],g[1]+1)}xs2.push(W);bounds=[];for(let i=0;i<xs2.length;i+=2){if(xs2[i+1]-xs2[i]>W*.08)bounds.push([xs2[i],xs2[i+1]])}}
 if(bounds.length!=5){const w=W/5;bounds=[0,1,2,3,4].map(i=>[Math.round(i*w),Math.round((i+1)*w)])}
 return bounds.map(([x0,x1])=>tieCutPanel(d,W,H,x0+6,x1-6,1))};window.p5gSlice=p5gSlice;
