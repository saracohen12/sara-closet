// v91 explore: Sara's white dress S0Y74_0 on p5 avatar with wig; views, sel panel, drag direction, 360 head
const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';const HEAD=process.argv[4]||'wig';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const O=S+'/tests/v91/';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:900}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(d=>{Object.assign(IT,d)},DBI);
await p.evaluate(async h=>{await openStudio();ST.avbase='p5';ST.view='front';ST.head=h;await setItem('dress','S0Y74_0');},HEAD);await p.waitForTimeout(1500);
const sst=async n=>{await p.screenshot({path:O+n+'_'+M+'.png'})};
await sst('a_front');
console.log('tf',await p.evaluate(()=>JSON.stringify(ST.tf.dress)),'SSEL',await p.evaluate(()=>SSEL));
console.log('sel',await p.evaluate(()=>{const s=document.querySelector('#ssel');return s?[s.className,getComputedStyle(s).display,s.textContent.slice(0,400)].join(' | '):'none'}));
console.log('er btn',await p.evaluate(()=>{const b=document.querySelector('#ssel [data-er="t"]');if(!b)return 'none';const r=b.getBoundingClientRect();return JSON.stringify({x:r.x,y:r.y,w:r.width,h:r.height,vis:getComputedStyle(b).display,par:getComputedStyle(b.parentElement).display})}));
for(const v of ['side','back','half','hip']){await p.evaluate(v=>document.querySelector('[data-sview="'+v+'"]').click(),v);await p.waitForTimeout(1200);await sst('b_'+v);console.log(v,await p.evaluate(()=>JSON.stringify({tf:ST.tf.dress,head:[...document.querySelectorAll('#sstage img')].map(i=>i.className+':'+(i.getAttribute('src')||'').slice(-30)).join(' ')})))}
await p.evaluate(()=>document.querySelector('[data-sview="front"]').click());await p.waitForTimeout(1000);
// drag: find dress layer
const box=await p.evaluate(()=>{const i=[...document.querySelectorAll('#sstage img,#sstage canvas')].find(e=>(e.dataset.slot||'')=='dress');if(!i)return null;const r=i.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,tag:i.tagName,cls:i.className}});console.log('dress box',JSON.stringify(box));
if(box){const x0=box.x+box.w*0.5,y0=box.y+box.h*0.6;const before=await p.evaluate(()=>ST.tf.dress.x);
 await p.mouse.move(x0,y0);await p.mouse.down();for(let i=1;i<=10;i++){await p.mouse.move(x0+i*6,y0,{steps:1});await p.waitForTimeout(20)}await p.mouse.up();await p.waitForTimeout(600);
 console.log('drag right 60px: x',before,'->',await p.evaluate(()=>ST.tf.dress.x));}
console.log('ERR',errs);await b.close()})();
