// phone: sel panel visibility (eraser), size + many times, pinch; screenshots
const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'phone';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const O=S+'/tests/v91/';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:900}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(d=>{Object.assign(IT,d)},DBI);
await p.evaluate(async()=>{await openStudio();ST.avbase='p5';ST.view='front';ST.head='wig';await setItem('dress','S0Y74_0');});await p.waitForTimeout(1500);
await p.screenshot({path:O+'c_sel_'+M+'.png'});
console.log('er',await p.evaluate(()=>{const b=document.querySelector('#ssel [data-er="t"]');if(!b)return 'none';const r=b.getBoundingClientRect();return JSON.stringify({x:r.x,y:r.y,w:r.width,h:r.height,inView:r.x>=0&&r.right<=innerWidth&&r.y>=0&&r.bottom<=innerHeight})}));
console.log('ssel',await p.evaluate(()=>{const s=document.querySelector('#ssel');const r=s.getBoundingClientRect();return s.className+' '+JSON.stringify({x:r.x,y:r.y,w:r.width,h:r.height,sw:s.scrollWidth,ov:getComputedStyle(s).overflowX})}));
for(let i=0;i<14;i++){await p.evaluate(()=>document.querySelector('[data-sz84="1"]').click());await p.waitForTimeout(150)}
await p.waitForTimeout(800);console.log('w after 14x+',await p.evaluate(()=>ST.tf.dress.w));
await p.screenshot({path:O+'c_big_'+M+'.png'});
console.log('ERR',errs);await b.close()})();
