# v173: tasks.md (the task table kept by Claude) -> tasks172.js, shown in the admin panel ("📋 כל המשימות")
import json,os,re
def gen(src='/mnt/project-files/closet/tasks.md',out='tasks172.js'):
    if not os.path.exists(src):
        if not os.path.exists(out):open(out,'w').write('window.TASKS172=[];')
        return
    rows=[]
    for ln in open(src,encoding='utf-8'):
        p=[x.strip() for x in ln.strip().strip('|').split('|')]
        if len(p)<3 or not re.fullmatch(r'\d+',p[0]):continue
        n,ask,done=int(p[0]),p[1],p[2];note=p[3] if len(p)>3 else ''
        d=done.lstrip()
        if d.startswith('✗'):st='no'
        elif d.startswith('✓'):st='wait' if re.search(r'מחכה|צריך|חסר|עוד לא|תשלחי|תעלי',note) else 'done'
        else:st='open'
        rows.append({'n':n,'a':ask,'d':done,'o':note,'s':st})
    rows.sort(key=lambda r:-r['n'])
    open(out,'w',encoding='utf-8').write('window.TASKS172='+json.dumps(rows,ensure_ascii=False,separators=(',',':'))+';')
if __name__=='__main__':gen()
