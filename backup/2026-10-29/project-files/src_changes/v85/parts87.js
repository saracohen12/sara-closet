// v87: split a product into pieces; each piece gets its own upload box, studio slot and drawer tile
const {chromium,devices}=require('playwright');const S=process.argv[2];const M=process.argv[3]||'desk';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7']}:{viewport:{width:1366,height:850}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};let n=0;window.claude={use:async k=>k=='assets'?{upload:async bl=>{const id='mock'+(n++);return {id,url:URL.createObjectURL(bl)}}}:null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
for(const id of ['T1','SMW6D_21','S1YVN_4','SN4WS_0','T122'])console.log(id,await p.evaluate(i=>D[i]?(D[i].short||'').slice(0,50)+' | '+(D[i].full||'').slice(0,90)+' => '+JSON.stringify(suggestParts85(i)):'missing',id));
const all=await p.evaluate(()=>Object.keys(D).filter(i=>suggestParts85(i).length).map(i=>i+': '+(D[i].short||'').slice(0,40)+' => '+suggestParts85(i).map(x=>x.n+'/'+x.cat).join(', ')));console.log('ALL',all.length);all.forEach(x=>console.log('  ',x));
// open the jacket+dress set
const SET='S1YVN_4';await p.evaluate(i=>openItem(i),SET);await p.waitForTimeout(1500);
console.log('box',await p.evaluate(()=>{const b=document.querySelector('#dlg .pt85');return b?b.querySelector('summary').textContent+' rows='+b.querySelectorAll('.pt85r').length:'none'}));
await p.evaluate(()=>{const b=document.querySelector('#dlg .pt85');if(b)b.scrollIntoView({block:'center'})});await p.screenshot({path:S+'/tests/v77/parts87_'+M+'_ed.png'});
await p.click('#dlg [data-pt85save]');await p.waitForTimeout(1500);
console.log('setdot',await p.evaluate(i=>avStat(i),SET));console.log('saved',await p.evaluate(i=>JSON.stringify(IT[i].parts)+' subs='+Object.keys(D).filter(k=>D[k].part==i).join(','),SET));
console.log('box2',await p.evaluate(()=>{const b=document.querySelector('#dlg .pt85');return b?b.querySelector('summary').textContent+' | p5g='+b.querySelectorAll('.p5gbox').length+' | '+[...b.querySelectorAll('.pt85p>summary')].map(s=>s.textContent.trim()).join(' / '):'none'}));
await p.evaluate(()=>{const b=document.querySelector('#dlg .pt85');if(b)b.scrollIntoView({block:'start'})});await p.screenshot({path:S+'/tests/v77/parts87_'+M+'_split.png'});
// upload a synthetic sheet for the first piece
const sub=await p.evaluate(i=>i+'~'+IT[i].parts[0].k,SET);
const r=await p.evaluate(async i=>{const W=1672,H=941,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');x.fillStyle='#d9d9d9';x.fillRect(0,0,W,H);const pw=(W-24)/5;
 for(let k=0;k<5;k++){const ox=k*(pw+6);if(k){x.fillStyle='#fff';x.fillRect(ox-6,0,6,H)}x.fillStyle='#c46a3a';x.fillRect(ox+pw*.25,H*.18,pw*.5,H*.4)}
 const blob=await new Promise(r=>cv.toBlob(r,'image/png'));await upP5g(i,new File([blob],'j.png',{type:'image/png'}),'');return {p5g:!!(IT[i]||{}).p5g,ready:avReady(i),slot:slotOf(i),img:(img(i)||'').slice(0,30)}},sub);console.log('upload',JSON.stringify(r));
await p.waitForTimeout(1200);
console.log('setdot2',await p.evaluate(i=>avStat(i)+' '+avStat(i+'~'+IT[i].parts[0].k),SET));console.log('box3',await p.evaluate(()=>{const b=document.querySelector('#dlg .pt85');return b?[...b.querySelectorAll('.pt85p>summary')].map(s=>s.textContent.trim()).join(' / '):'none'}));
await p.screenshot({path:S+'/tests/v77/parts87_'+M+'_up.png'});
// openItem on the piece goes to the product
await p.evaluate(()=>document.querySelectorAll('dialog[open]').forEach(d=>d.close()));await p.evaluate(i=>openItem(i),sub);await p.waitForTimeout(1500);
console.log('redirect',await p.evaluate(()=>{const d=document.getElementById('dlg');return d.open+' '+!!d.querySelector('.pt85')+' '+(d.querySelector('h2,h3')||{}).textContent}));
// studio with the piece
await p.evaluate(async i=>{document.querySelectorAll('dialog[open]').forEach(d=>d.close());await openStudio(null,{[slotOf(i)]:i})},sub);await p.waitForTimeout(1500);
console.log('studio',await p.evaluate(s=>{const im=document.querySelector('#sstage img.sl[data-slot="'+s+'"]');return im?'layer ok '+im.naturalWidth:'no layer'},r.slot));
await p.screenshot({path:S+'/tests/v77/parts87_'+M+'_studio.png'});
// split list
await p.evaluate(()=>document.querySelectorAll('dialog[open]').forEach(d=>d.close()));await p.evaluate(()=>openSplit85());await p.waitForTimeout(800);
console.log('list',await p.evaluate(()=>document.querySelectorAll('#sp85 .sp85r').length+' | '+(document.querySelector('#sp85 .m77h')||{}).textContent));
await p.screenshot({path:S+'/tests/v77/parts87_'+M+'_list.png'});
console.log('search',await p.evaluate(()=>siteSearch85('פירוק').map(x=>x.t).join(',')));
console.log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
