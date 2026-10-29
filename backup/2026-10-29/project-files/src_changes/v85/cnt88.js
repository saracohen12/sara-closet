// after splitting a set, item counts / money totals / grid must not change
const {chromium,devices}=require('playwright');const S=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1366,height:850}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
const snap=async()=>p.evaluate(async()=>{const o={};o.cards=document.querySelectorAll('.grid .card').length;o.chips=[...document.querySelectorAll('[data-g9],.cats button,.chips button')].slice(0,6).map(b=>b.textContent.trim()).join('|');
 o.hdr=(document.querySelector('header')||{}).innerText?.replace(/\s+/g,' ').slice(0,200);
 for(const tab of ['money','insights','check']){try{openHub(tab);await new Promise(r=>setTimeout(r,900));o[tab]=(document.querySelector('#hbody')||{}).innerText?.replace(/\s+/g,' ').slice(0,400)}catch(e){o[tab]='ERR '+e.message}}
 document.querySelectorAll('dialog[open]').forEach(d=>d.close());return o});
const a=await snap();
await p.evaluate(async()=>{for(const id of ['S1YVN_4','SMW6D_21','T1'])await putItem(id,{parts:suggestParts85(id).map((x,i)=>({k:'k'+i,n:x.n,cat:x.cat}))})});await p.waitForTimeout(2500);
await p.evaluate(()=>{try{paintAll()}catch(_){}});await p.waitForTimeout(800);
const bb=await snap();
for(const k of Object.keys(a))console.log(k,a[k]==bb[k]?'SAME':'DIFF\n  before: '+a[k]+'\n  after:  '+bb[k]);
console.log('D parts',await p.evaluate(()=>Object.keys(D).filter(k=>D[k].part).length));console.log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
