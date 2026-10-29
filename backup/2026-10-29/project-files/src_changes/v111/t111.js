const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1280,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};const A={upload:async bl=>{const id=[...crypto.getRandomValues(new Uint8Array(16))].map(x=>x.toString(16).padStart(2,'0')).join('');return {id,url:URL.createObjectURL(bl)}}};window.claude={use:async k=>k=='assets'?A:null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>openItem('T156'));await p.waitForTimeout(1500);
for(const [mode,lab] of [['p5g','replace'],['p5gadd','add']]){
 await p.evaluate(async m=>{const f=async n=>new File([await (await fetch(n)).blob()],n,{type:'image/png'});window.upP5gMany('T156',[await f('s110_2.png'),await f('s110_1.png')],m)},mode);await p.waitForTimeout(7000);
 console.log(lab,'dialog',await p.evaluate(()=>document.getElementById('two99').open),'cuts',await p.evaluate(()=>[...document.querySelectorAll('#two99 .t99c figure img')].length));
 if(lab=='replace')await p.screenshot({path:S+'/tests/v92/t111_'+M+'.png'});
 await p.evaluate(()=>document.querySelector('[data-t99save]').click());await p.waitForTimeout(3000);
 console.log(lab,await p.evaluate(()=>{const it=IT.T156;return {two:it.p5g.two,n:it.p5g.n,front:it.p5g.fit.front,vars:(it.p5gv||[]).map(v=>v.n)}}))}
console.log('ERR',errs,await p.evaluate(()=>JSON.stringify(window.ERRS||[]).slice(0,300)));await b.close()})();
