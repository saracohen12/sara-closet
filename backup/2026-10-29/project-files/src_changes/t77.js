// v68: fit-to-body on a real garment cut (skirt 5-pose sheet) on the new and old bases
const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7']}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);await p.evaluate(()=>openItem('S17QJ_11'));await p.waitForTimeout(800);
 await (await p.$('button[data-upm="p5g"] input.ovf')).setInputFiles([S+'/tests/fx/skirt5.jpg']);await p.waitForTimeout(7000);
 await p.evaluate(()=>document.querySelector('#dlg').close());
 const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
 for(const base of ['p5','long','short']){await p.evaluate(async base=>{await openStudio();ST.avbase=base;ST.view='front';await setItem('skirt','S17QJ_11');SSEL='skirt';paintSel()},base);await p.waitForTimeout(900);
  const before=await p.evaluate(()=>({x:ST.tf.skirt.x,w:ST.tf.skirt.w,sx:ST.tf.skirt.sx}));
  const r=await p.evaluate(()=>fitToBody('skirt'));await p.waitForTimeout(700);const after=await p.evaluate(()=>({x:ST.tf.skirt.x,w:ST.tf.skirt.w,sx:ST.tf.skirt.sx}));log(base,'ret',r,'before',before,'after',after);
  // measured waist width on screen vs body
  const m=await p.evaluate(()=>{const el=document.querySelector('#sstage img.sl[data-slot="skirt"]');const st=document.querySelector('#sstage').getBoundingClientRect();const r=el.getBoundingClientRect();return {left:Math.round((r.left-st.left)/st.width*100),right:Math.round((r.right-st.left)/st.width*100),top:Math.round((r.top-st.top)/st.height*100)}});log(base,'rect%',m);log(base,'rows',await p.evaluate(async()=>{const el=document.querySelector('#sstage img.sl[data-slot="skirt"]');const im=await ldImg(el.src);const tf=ST.tf.skirt;const W=Math.round(tf.w/100*399*(tf.sx||1)),H=Math.round(W*im.height/im.width/(tf.sx||1)*(tf.sy||1));const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0,W,H);const d=x.getImageData(0,0,W,H).data;const row=y=>{let a=-1,b=-1;for(let i=0;i<W;i++)if(d[(y*W+i)*4+3]>90){if(a<0)a=i;b=i}return a<0?null:[a,b,b-a+1]};let y0=0;while(y0<H&&!row(y0))y0++;const out={};for(const f of [.03,.06,.1,.2]){const r=row(Math.min(H-1,y0+Math.round((H-y0)*f)));out[f]=r&&r[2]}return {W,H,y0,out}}));
  await p.screenshot({path:S+'/tests/audit/t77_'+base+(PHONE?'_m':'')+'.png',clip:await p.evaluate(()=>{const r=document.querySelector('#sstage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}})});
  await p.evaluate(()=>{HSAVE=HIST.length;document.querySelector('#studio').close()})}
 log('ERR',errs,await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
