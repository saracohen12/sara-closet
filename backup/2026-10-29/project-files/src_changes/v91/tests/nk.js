const {chromium}=require('playwright');const S=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2000);
console.log(await p.evaluate(async()=>{const im=await ldImg('/_blob/d3f4e4b82e33e259bd720097f8643021');const W=im.naturalWidth,H=im.naturalHeight;const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);const D8=x.getImageData(0,0,W,H).data;
 let top=-1;for(let y=0;y<H*.2;y++){let n=0;for(let i=0;i<W;i++)if(D8[(y*W+i)*4+3]>128)n++;if(n>W*.05){top=y;break}}
 let x0=-1,x1=-1;for(let i=0;i<W;i++)if(D8[(top*W+i)*4+3]>128){if(x0<0)x0=i;x1=i}let a=(x1-x0)/2;const cx=(x0+x1)/2;const a0=a;if(a>W*.3)a=(x1-x0)*.21;
 const runs=[];for(let y=top;y<top+40;y+=3){let r='',on=false;for(let i=0;i<W;i++){const o=D8[(y*W+i)*4+3]>128;if(o!=on){r+=i+(o?'[':']')+' ';on=o}}runs.push(y+':'+r)}
 const L=y=>{let t=0,n=0;const o=Math.round(a*.35);for(const c0 of [Math.round(cx)-o,Math.round(cx)+o])for(let i=c0-3;i<=c0+3;i++){const k=(y*W+i)*4;if(D8[k+3]>128){t+=D8[k]*.299+D8[k+1]*.587+D8[k+2]*.114;n++}}return n?t/n:-1};
 const prof=[];for(let i=0;i<40;i+=2)prof.push(Math.round(L(top+i)));
 return JSON.stringify({W,H,top,x0,x1,a0,a,cx,prof})+'\n'+runs.join('\n')}));await b.close()})();
