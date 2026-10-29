const {chromium,devices}=require('playwright');const S=process.argv[2];const M=process.argv[3]||'desk';const ID=process.argv[4]||'T30';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7']}:{viewport:{width:1366,height:850}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(id=>openItem(id),ID);await p.waitForTimeout(1200);
console.log(await p.evaluate(()=>{const t=document.querySelector('#dlg table');const s=t.closest('details');return (s?s.outerHTML.slice(0,300):'')+'\nROWS '+[...t.rows].map(r=>r.textContent.trim().replace(/\s+/g,' ')).join(' ¦ ')}));console.log(await p.evaluate(()=>{const d=document.querySelector('#dlg');return [...d.querySelectorAll('h2,h3,h4,dl,table,.meta,.facts,section,details>summary')].map(x=>x.tagName+'.'+x.className+' top='+Math.round(x.getBoundingClientRect().top)+' :: '+x.textContent.trim().replace(/\s+/g,' ').slice(0,90)).join('\n')}));
await p.screenshot({path:S+'/tests/v77/dlg85_'+M+'.png',fullPage:false});
await p.evaluate(()=>{const d=document.querySelector('#dlg');[...d.querySelectorAll('*')].forEach(x=>{if(x.scrollHeight>x.clientHeight+5&&getComputedStyle(x).overflowY!='visible')x.scrollTop=99999})});await p.waitForTimeout(400);
await p.screenshot({path:S+'/tests/v77/dlg85_'+M+'_end.png'});console.log('ERR',errs);await b.close()})();
