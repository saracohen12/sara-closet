const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.addInitScript(()=>{window.claude={use:async k=>null}});await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
console.log(await p.evaluate(()=>['paint','paintRet','openQA','dlg','bar','rail','tile','gen','keep','clean'].map(n=>n+': '+(typeof window[n]=='function'?window[n].toString().slice(0,90):typeof window[n]+(window[n]&&window[n].tagName?' '+window[n].tagName:''))).join('\n')));await b.close()})();
