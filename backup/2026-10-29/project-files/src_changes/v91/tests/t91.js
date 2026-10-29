// v91 checks: size follows all poses, mirrored drag, wig without covering, drawer ⓘ, brushes, all-poses fixes
const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const O=S+'/tests/v91/';const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:900}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(d=>{Object.assign(IT,d)},DBI);
await p.evaluate(async()=>{await openStudio();ST.avbase='p5';ST.view='front';await setItem('scarf','T162');await setItem('dress','S0Y74_0');SSEL='dress';paintSel()});await p.waitForTimeout(1500);
// 1. size in front -> side follows
const w0=await p.evaluate(()=>ST.tf.dress.w);
for(let i=0;i<3;i++){await p.evaluate(()=>document.querySelector('[data-sz84="1"]').click());await p.waitForTimeout(120)}
const w1=await p.evaluate(()=>ST.tf.dress.w);
await p.evaluate(()=>document.querySelector('[data-sview="side"]').click());await p.waitForTimeout(1500);
const sideNow=await p.evaluate(()=>({w:ST.tf.dress.w,uk:ST.tf.dress.uk}));
await p.evaluate(()=>document.querySelector('[data-sview="front"]').click());await p.waitForTimeout(1200);
log('1 size front',w0,'->',w1,'ratio',(w1/w0).toFixed(3),'side',sideNow,'front kept',await p.evaluate(()=>ST.tf.dress.w));
// change in side, front follows
await p.evaluate(()=>document.querySelector('[data-sview="side"]').click());await p.waitForTimeout(1200);const s0=await p.evaluate(()=>ST.tf.dress.w);
await p.evaluate(()=>{SSEL='dress';paintSel()});await p.evaluate(()=>document.querySelector('[data-sz84="-1"]').click());await p.waitForTimeout(200);const s1=await p.evaluate(()=>ST.tf.dress.w);
await p.evaluate(()=>document.querySelector('[data-sview="front"]').click());await p.waitForTimeout(1200);log('1b side',s0,'->',s1,'front now',await p.evaluate(()=>ST.tf.dress.w),'expected ~',(w1*s1/s0).toFixed(1));
// 2. mirrored drag
for(let i=0;i<4;i++){await p.evaluate(()=>document.querySelector('#spin [data-spin="1"]').click());await p.waitForTimeout(1100)}
log('2 view',await p.evaluate(()=>ST.view+' mir='+ST.mir));
log('2 x before',await p.evaluate(()=>ST.tf.dress.x));const bx=await p.evaluate(()=>{const i=document.querySelector('#sstage img.sl[data-slot="dress"]');const r=i.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height*.6,l:r.left}});
await p.mouse.move(bx.x,bx.y);await p.mouse.down();for(let i=1;i<=6;i++){await p.mouse.move(bx.x+i*5,bx.y);await p.waitForTimeout(20)}await p.mouse.up();await p.waitForTimeout(500);
log('2 tf.x',await p.evaluate(()=>ST.tf.dress.x),'stageW',await p.evaluate(()=>document.querySelector('#sstage').getBoundingClientRect().width),'2 drag right 30px: layer left',bx.l.toFixed(1),'->',await p.evaluate(()=>document.querySelector('#sstage img.sl[data-slot="dress"]').getBoundingClientRect().left.toFixed(1)));
// back to front
await p.evaluate(()=>document.querySelector('[data-sview="front"]').click());await p.waitForTimeout(1000);
// 3. "בלי" covering -> wig in every pose
await p.evaluate(()=>document.querySelector('#hd77 [data-hd77=""]').click());await p.waitForTimeout(1200);
const heads=[];for(const v of ['front','side','back','half','hip']){await p.evaluate(v=>document.querySelector('[data-sview="'+v+'"]').click(),v);await p.waitForTimeout(900);heads.push(v+':'+await p.evaluate(()=>[...document.querySelectorAll('#sstage img.sb,#sstage img.sh')].map(i=>(i.getAttribute('src')||'').replace(/\?v=\d+/,'').replace('av/','')).join('+')))}
log('3 head',await p.evaluate(()=>ST.head),heads.join(' | '));
await p.evaluate(()=>document.querySelector('[data-sview="front"]').click());await p.waitForTimeout(800);
// 4. brushes
await p.evaluate(()=>{SSEL='dress';paintSel()});
log('4 bar',await p.evaluate(()=>[...document.querySelectorAll('#ssel .er74 button,#ssel .cb91 button,#ssel .ex91')].map(b=>b.textContent.trim()).join(' / ')),'lpics',await p.evaluate(()=>!!document.querySelector('#ssel .lpics')));
await p.evaluate(()=>document.querySelector('#ssel [data-cb91="clone"]').click());await p.waitForTimeout(300);
log('4 clone on, size row',await p.evaluate(()=>!!document.querySelector('#ssel .br91')));
const br0=await p.evaluate(()=>BR91);await p.evaluate(()=>{document.querySelector('#ssel [data-cb91="bp"]').click();document.querySelector('#ssel [data-cb91="bp"]').click()});const br1=await p.evaluate(()=>BR91);log('4 brush',br0,'->',br1);
const L=await p.evaluate(()=>{const r=document.querySelector('#sstage img.sl[data-slot="dress"]').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}});
await p.mouse.click(L.x+L.w*.5,L.y+L.h*.75);await p.waitForTimeout(300);
await p.mouse.move(L.x+L.w*.5,L.y+L.h*.3);await p.mouse.down();for(let i=1;i<=5;i++){await p.mouse.move(L.x+L.w*.5+i*4,L.y+L.h*.3);await p.waitForTimeout(30)}await p.mouse.up();await p.waitForTimeout(1500);
log('4 clone groups',await p.evaluate(()=>JSON.stringify((ST.tf.dress.cb||{}).front||[]).slice(0,160)),'src blob',await p.evaluate(()=>document.querySelector('#sstage img.sl[data-slot="dress"]').getAttribute('src').slice(0,12)));
await p.screenshot({path:O+'t91_clone_'+M+'.png'});
await p.evaluate(()=>document.querySelector('#ssel [data-cb91="paint"]').click());await p.waitForTimeout(300);
await p.mouse.click(L.x+L.w*.5,L.y+L.h*.6);await p.waitForTimeout(500);log('4 sampled',await p.evaluate(()=>document.querySelector('#ssel .cb91c i')?.style.background));
await p.mouse.move(L.x+L.w*.3,L.y+L.h*.5);await p.mouse.down();for(let i=1;i<=5;i++){await p.mouse.move(L.x+L.w*.3+i*5,L.y+L.h*.5+i*3);await p.waitForTimeout(30)}await p.mouse.up();await p.waitForTimeout(1500);
log('4 groups now',await p.evaluate(()=>((ST.tf.dress.cb||{}).front||[]).map(g=>g.c?'paint '+g.c:'clone').join(',')));
await p.evaluate(()=>document.querySelector('#ssel [data-cb91="u"]').click());await p.waitForTimeout(800);log('4 undo ->',await p.evaluate(()=>((ST.tf.dress.cb||{}).front||[]).length));
await p.evaluate(()=>document.querySelector('#ssel [data-cb91="paint"]').click());await p.waitForTimeout(300);
await p.evaluate(()=>document.querySelector('#ssel [data-er="t"]').click());await p.waitForTimeout(300);log('4 eraser on',await p.evaluate(()=>document.body.classList.contains('er74on')),'size row',await p.evaluate(()=>!!document.querySelector('#ssel .br91')));
await p.evaluate(()=>document.querySelector('#ssel [data-er="t"]').click());await p.waitForTimeout(300);
await p.evaluate(()=>document.querySelector('[data-ex91]').click());await p.waitForTimeout(300);log('4 help',await p.evaluate(()=>document.getElementById('ex91d')?.open));await p.evaluate(()=>document.getElementById('ex91d').close());
// 5. drawer ⓘ + double click
await p.evaluate(()=>openDrawer('scarf'));await p.waitForTimeout(1500);
log('5 i91',await p.evaluate(()=>document.querySelectorAll('#sdrawer .i91').length));
await p.evaluate(()=>document.querySelector('#sdrawer .i91').click());await p.waitForTimeout(1200);log('5 dlg open',await p.evaluate(()=>document.getElementById('dlg').open+' '+(document.querySelector('#dlg h3,#dlg h2')||{}).textContent));
await p.screenshot({path:O+'t91_item_'+M+'.png'});
await p.evaluate(()=>document.getElementById('dlg').close());await p.waitForTimeout(400);
await p.evaluate(()=>{if(!document.querySelector('#sdrawer.open'))openDrawer('scarf')});await p.waitForTimeout(1000);
const tid=await p.evaluate(()=>document.querySelectorAll('#sdrawer [data-dpick]')[1].dataset.dpick);
await p.evaluate(id=>document.querySelector('#sdrawer [data-dpick="'+id+'"]').scrollIntoView(),tid);
await p.evaluate(id=>{const t=document.querySelector('#sdrawer [data-dpick="'+id+'"]');t.click();},tid);await p.waitForTimeout(150);
await p.evaluate(id=>{const t=document.querySelector('#sdrawer [data-dpick="'+id+'"]')||document.querySelector('#hd77 [data-hd77="'+id+'"]');t&&t.click()},tid);await p.waitForTimeout(1200);
log('5 dblclick',tid,'dlg',await p.evaluate(()=>document.getElementById('dlg').open),'scarf still on',await p.evaluate(()=>ST.items.scarf));
await p.evaluate(()=>document.getElementById('dlg').open&&document.getElementById('dlg').close());
// 6. all poses with a product picture chosen + ➕ for all + drag
await p.evaluate(()=>{ST.tf.dress.pic='59402704e5a3a5b64cef286a9f490735'});await p.evaluate(()=>p5ShowAll());await p.waitForTimeout(3000);
log('6 dress in poses',await p.evaluate(()=>[...document.querySelectorAll('#p5all .p5f')].map(f=>f.dataset.pose+':'+!!f.querySelector('img.sl[data-slot="dress"]')).join(' ')));
const ws=()=>p.evaluate(()=>['front','side','back','half','hip'].map(v=>{const f=pvOf(ST.tf.dress,p5gOfT('S0Y74_0',ST.tf.dress),v);return f?f.w:null}).join(','));
await p.evaluate(()=>p5PoseTap(document.querySelector('#p5all .p5f[data-pose="back"]')));await p.waitForTimeout(300);const before=await ws();
await p.evaluate(()=>document.querySelector('#p5all [data-pe="w"][data-d="1"]').click());await p.waitForTimeout(2500);log('6 ➕ all poses',before,'->',await ws());
const fb=await p.evaluate(()=>{const r=document.querySelector('#p5all .p5f[data-pose="back"] img.sl[data-slot="dress"]').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}});const x0=await p.evaluate(()=>pvOf(ST.tf.dress,p5gOfT('S0Y74_0',ST.tf.dress),'back').x);
await p.mouse.move(fb.x,fb.y);await p.mouse.down();for(let i=1;i<=6;i++){await p.mouse.move(fb.x+i*4,fb.y);await p.waitForTimeout(20)}await p.mouse.up();await p.waitForTimeout(1500);
log('6 drag back x',x0,'->',await p.evaluate(()=>pvOf(ST.tf.dress,p5gOfT('S0Y74_0',ST.tf.dress),'back').x));
await p.screenshot({path:O+'t91_all_'+M+'.png'});
log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
