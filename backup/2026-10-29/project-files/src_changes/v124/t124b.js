await new Promise(r=>setTimeout(r,500));openOrders123('P0-097-00209037804151091');await new Promise(r=>setTimeout(r,800));
document.querySelectorAll('.o3it')[0].querySelector('[data-o3set="mb"]').click();await new Promise(r=>setTimeout(r,700));
document.querySelectorAll('.o3it')[0].querySelector('[data-o3set="mbr"][data-v="size"]').click();await new Promise(r=>setTimeout(r,700));
document.querySelectorAll('.o3it')[1].querySelector('[data-o3set="s"][data-v="ret"]').click();await new Promise(r=>setTimeout(r,700));
document.querySelectorAll('.o3it')[1].querySelector('[data-o3set="mb"]').click();await new Promise(r=>setTimeout(r,700));
document.querySelectorAll(".o3it")[2].querySelector('[data-o3set="lk"][data-v="m"]').click();await new Promise(r=>setTimeout(r,700));const ta=document.querySelectorAll("[data-o3note]")[2];ta.value="מחכה לצבע השחור";ta.dispatchEvent(new Event("change",{bubbles:true}));await new Promise(r=>setTimeout(r,900));document.querySelector("#ord123 .o3b").scrollTop=330;
const r=['T103','T104','T105'].map(i=>[i,IT[i]]);const w=document.querySelector('#ord123 .o3b');return [r,w.scrollWidth-w.clientWidth];
