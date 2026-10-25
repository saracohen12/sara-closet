await new Promise(r=>setTimeout(r,500));openOrders123('P0-097-00209037804151091');await new Promise(r=>setTimeout(r,800));
const W=ms=>new Promise(r=>setTimeout(r,ms));const row=i=>document.querySelectorAll('.o3it')[i];
row(0).querySelector('[data-o3set="fix"]').click();await W(700);
row(0).querySelector('[data-o3set="fixk"][data-v="short"]').click();await W(700);
row(0).querySelector('[data-o3set="fixk"][data-v="waist"]').click();await W(700);
row(1).querySelector('[data-o3set="nofit"]').click();await W(700);
const r=['T103','T104'].map(i=>[i,IT[i]]);
document.querySelector('[data-o3="back"]').click();await W(400);
document.querySelector('[data-o3sheet="open"]').click();await W(400);document.querySelector('[data-o3f="fix"]').click();await W(800);
const n=document.querySelectorAll('.o3it').length;let txt;try{txt=fixText(fixIds(orders()))}catch(e){txt='scoped:'+e.message}
const fc=document.querySelector('[data-o3fixcopy]')?.textContent;
openOrders123('P0-097-00209037804151091');await W(800);document.querySelector('#ord123 .o3b').scrollTop=330;
const w=document.querySelector('#ord123 .o3b');return [r,n,w.scrollWidth-w.clientWidth,fc,txt];
