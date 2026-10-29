# v93 backgrounds: illustrated scenes, portrait 600x1000, the floor line near the bottom (her feet stand there)
import random, os, math
OUT = os.path.join(os.path.dirname(__file__), 'svg')
os.makedirs(OUT, exist_ok=True)
W, H = 600, 1000
FLOOR = 860

def svg(body, defs=''):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice">'
            f'<defs>{defs}</defs>{body}</svg>')

def lg(id, stops, x2=0, y2=1):
    s = ''.join(f'<stop offset="{o}" stop-color="{c}"{"" if a is None else f" stop-opacity=\"{a}\""}/>' for o, c, a in
                [(st + (None,)) if len(st) == 2 else st for st in stops])
    return f'<linearGradient id="{id}" x1="0" y1="0" x2="{x2}" y2="{y2}">{s}</linearGradient>'

def rg(id, stops, cx=.5, cy=.5, r=.5):
    s = ''.join(f'<stop offset="{o}" stop-color="{c}" stop-opacity="{a}"/>' for o, c, a in stops)
    return f'<radialGradient id="{id}" cx="{cx}" cy="{cy}" r="{r}">{s}</radialGradient>'

def rect(fill, x=0, y=0, w=W, h=H, extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" {extra}/>'

def soft_shadow():
    return f'<ellipse cx="300" cy="{FLOOR+18}" rx="150" ry="16" fill="#000" opacity=".10"/>'

S = {}

# 1 garden arch with roses
def garden():
    r = random.Random(1)
    d = lg('sk', [(0, '#dceef3'), (1, '#f7f1e6')]) + lg('gr', [(0, '#a9c79a'), (1, '#7fa676')])
    b = rect('url(#sk)')
    # hedges
    for i in range(14):
        x = i * 48 - 20; b += f'<circle cx="{x}" cy="{FLOOR-170}" r="{60+r.randint(0,18)}" fill="#86ad7c" opacity=".9"/>'
    b += rect('#86ad7c', 0, FLOOR-170, W, 170)
    # arch
    b += f'<path d="M150 {FLOOR} V420 A150 150 0 0 1 450 420 V{FLOOR}" fill="none" stroke="#6f9a66" stroke-width="46"/>'
    for i in range(70):
        t = r.random()
        if t < .5:
            a = math.pi * (t / .5); x = 300 - 150 * math.cos(a); y = 420 - 150 * math.sin(a)
        else:
            side = 150 if r.random() < .5 else 450; x = side + r.uniform(-18, 18); y = r.uniform(430, FLOOR - 40)
        c = r.choice(['#f2b8c0', '#e98fa0', '#fbe0e2', '#ffffff', '#f6c9a8'])
        b += f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r.uniform(7,13):.1f}" fill="{c}"/>'
    b += rect('url(#gr)', 0, FLOOR, W, H - FLOOR)
    b += f'<path d="M210 {FLOOR} L390 {FLOOR} L470 {H} L130 {H} Z" fill="#e9dfcf"/>' + soft_shadow()
    return svg(b, d)
S['garden'] = ('גן ורדים', garden)

# 2 Jerusalem stone wall
def jlm():
    r = random.Random(2)
    d = lg('fl', [(0, '#d9c7a6'), (1, '#c4ae88')])
    b = rect('#e9dcc2')
    y = 0; row = 0
    while y < FLOOR:
        h = r.choice([62, 70, 78]); x = -r.randint(0, 80)
        while x < W:
            w = r.randint(90, 170)
            c = r.choice(['#eadcc0', '#e3d2b2', '#efe3cc', '#dccaa8', '#e6d7ba'])
            b += f'<rect x="{x+3}" y="{y+3}" width="{w-6}" height="{h-6}" rx="4" fill="{c}" stroke="#cdb894" stroke-width="1.5"/>'
            x += w
        y += h; row += 1
    b += rect('url(#fl)', 0, FLOOR, W, H - FLOOR) + f'<rect x="0" y="{FLOOR}" width="{W}" height="6" fill="#b79f78"/>'
    b += f'<path d="M40 {FLOOR} q30 -90 70 -60 q-10 -60 40 -40" fill="none" stroke="#7d9a5f" stroke-width="5"/>'
    for i in range(10):
        b += f'<circle cx="{50+r.randint(0,90)}" cy="{FLOOR-40-r.randint(0,60)}" r="9" fill="#8eab6c"/>'
    for i in range(6):
        b += f'<circle cx="{60+r.randint(0,80)}" cy="{FLOOR-50-r.randint(0,50)}" r="6" fill="#d94e8f"/>'
    return svg(b + soft_shadow(), d)
S['jlm'] = ('אבן ירושלמית', jlm)

# 3 beach sunset
def beach():
    d = lg('sk', [(0, '#f7b9a2'), (.55, '#fde2c4'), (1, '#fff3e3')]) + lg('se', [(0, '#7fb5c9'), (1, '#b7d8e2')]) + lg('sa', [(0, '#f1dcbc'), (1, '#e6c99f')])
    b = rect('url(#sk)') + '<circle cx="300" cy="610" r="70" fill="#ffd9a0" opacity=".9"/>'
    b += rect('url(#se)', 0, 640, W, 160)
    for i in range(6):
        b += f'<path d="M{40+i*90} {670+i*18} q20 -6 40 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>'
    b += f'<path d="M0 790 Q150 770 300 785 T600 780 V{H} H0Z" fill="url(#sa)"/>'
    b += f'<path d="M0 795 Q150 776 300 790 T600 785" fill="none" stroke="#fff" stroke-width="5" opacity=".8"/>'
    return svg(b + soft_shadow(), d)
S['beach'] = ('חוף בשקיעה', beach)

# 4 event hall
def hall():
    r = random.Random(4)
    d = lg('wl', [(0, '#3b2b3f'), (1, '#6b4a5c')]) + rg('gl', [(0, '#ffe6b0', .9), (1, '#ffe6b0', 0)]) + lg('fl', [(0, '#c9a77a'), (1, '#8c6a49')])
    b = rect('url(#wl)')
    for x in (0, 470):
        b += f'<path d="M{x} 0 h130 v{FLOOR} q-65 -30 -130 0z" fill="#8e3b55"/>'
        for k in range(5):
            b += f'<path d="M{x+15+k*25} 0 V{FLOOR-10}" stroke="#7a2f47" stroke-width="5"/>'
    b += '<ellipse cx="300" cy="140" rx="180" ry="120" fill="url(#gl)"/>'
    for i in range(26):
        a = i / 26 * 2 * math.pi; b += f'<circle cx="{300+110*math.cos(a):.0f}" cy="{130+28*math.sin(a):.0f}" r="5" fill="#fff4d6"/>'
        b += f'<line x1="{300+110*math.cos(a):.0f}" y1="{130+28*math.sin(a):.0f}" x2="{300+110*math.cos(a):.0f}" y2="{170+28*math.sin(a):.0f}" stroke="#ffe9b8" stroke-width="2" opacity=".7"/>'
    for i in range(40):
        b += f'<circle cx="{r.randint(0,W)}" cy="{r.randint(250,FLOOR-60)}" r="{r.randint(6,22)}" fill="#ffd98a" opacity="{r.uniform(.08,.3):.2f}"/>'
    b += rect('url(#fl)', 0, FLOOR, W, H - FLOOR)
    for i in range(8):
        b += f'<path d="M{i*80} {FLOOR} L{-200+i*130} {H}" stroke="#7a5a3c" stroke-width="2" opacity=".4"/>'
    return svg(b + soft_shadow(), d)
S['hall'] = ('אולם אירועים', hall)

# 5 Paris street
def paris():
    r = random.Random(5)
    d = lg('sk', [(0, '#cfe3ef'), (1, '#f4eee6')])
    b = rect('url(#sk)')
    x = -20
    while x < W:
        w = r.randint(110, 170); h = r.randint(380, 560); top = FLOOR - h
        c = r.choice(['#efe3cf', '#e8d6bc', '#f3eadb', '#e4d1b5'])
        b += f'<rect x="{x}" y="{top}" width="{w}" height="{h}" fill="{c}" stroke="#d6c3a4"/>'
        b += f'<path d="M{x-6} {top} h{w+12} l-14 -34 h{-(w-16)} z" fill="#6b7a8c"/>'
        for fy in range(top + 40, FLOOR - 80, 70):
            for fx in range(x + 16, x + w - 30, 42):
                b += f'<rect x="{fx}" y="{fy}" width="22" height="40" rx="2" fill="#8fa9bd"/><rect x="{fx-3}" y="{fy+40}" width="28" height="5" fill="#3a3f47"/>'
        b += f'<rect x="{x+10}" y="{FLOOR-70}" width="{w-20}" height="70" fill="#7b2f3a"/><rect x="{x+16}" y="{FLOOR-62}" width="{w-32}" height="54" fill="#f6dcc0" opacity=".85"/>'
        x += w
    b += rect('#b9b3ab', 0, FLOOR, W, H - FLOOR)
    for i in range(0, W, 40):
        for j in range(FLOOR, H, 24):
            b += f'<rect x="{i+(j//24%2)*20}" y="{j}" width="38" height="22" rx="4" fill="#c7c1b8"/>'
    return svg(b + soft_shadow(), d)
S['paris'] = ('רחוב בפריז', paris)

# 6 autumn park
def autumn():
    r = random.Random(6)
    d = lg('sk', [(0, '#f8e6c9'), (1, '#fbf4e9')]) + lg('gr', [(0, '#d8a865'), (1, '#b98349')])
    b = rect('url(#sk)')
    for tx in (60, 200, 420, 560):
        b += f'<rect x="{tx-10}" y="{FLOOR-330}" width="22" height="330" fill="#7a5034"/>'
        for i in range(60):
            b += f'<circle cx="{tx+r.gauss(0,70):.0f}" cy="{FLOOR-380+r.gauss(0,80):.0f}" r="{r.randint(14,30)}" fill="{r.choice(["#e0893a","#c8562e","#f0b44c","#d9752f","#b54a2a"])}" opacity=".85"/>'
    b += rect('url(#gr)', 0, FLOOR, W, H - FLOOR)
    for i in range(70):
        b += f'<ellipse cx="{r.randint(0,W)}" cy="{r.randint(FLOOR,H)}" rx="7" ry="4" fill="{r.choice(["#e0893a","#c8562e","#f0b44c"])}" transform="rotate({r.randint(0,180)} 0 0)" opacity=".0"/>'
        x, y = r.randint(0, W), r.randint(FLOOR + 5, H)
        b += f'<ellipse cx="{x}" cy="{y}" rx="7" ry="4" fill="{r.choice(["#e0893a","#c8562e","#f0b44c"])}" transform="rotate({r.randint(0,180)} {x} {y})"/>'
    return svg(b + soft_shadow(), d)
S['autumn'] = ('פארק בסתיו', autumn)

# 7 cherry blossom
def blossom():
    r = random.Random(7)
    d = lg('sk', [(0, '#fde9ef'), (1, '#fff8f4')]) + lg('gr', [(0, '#cfe0b8'), (1, '#b3cd98')])
    b = rect('url(#sk)')
    b += '<path d="M600 120 C470 160 420 260 330 250 M470 170 C450 90 400 60 360 40 M520 150 C560 230 560 300 600 330" stroke="#6e4a3c" stroke-width="12" fill="none" stroke-linecap="round"/>'
    b += '<path d="M0 220 C120 240 160 330 240 320 M90 235 C110 160 80 110 40 90" stroke="#6e4a3c" stroke-width="10" fill="none" stroke-linecap="round"/>'
    for i in range(180):
        cx = r.choice([r.gauss(450, 90), r.gauss(120, 90)]); cy = r.gauss(200, 80)
        b += f'<circle cx="{cx:.0f}" cy="{cy:.0f}" r="{r.randint(6,13)}" fill="{r.choice(["#f7c4d2","#f3aec2","#fde1e8","#ffffff"])}" opacity=".9"/>'
    for i in range(40):
        b += f'<circle cx="{r.randint(0,W)}" cy="{r.randint(300,H)}" r="4" fill="#f6b9ca" opacity=".8"/>'
    b += rect('url(#gr)', 0, FLOOR, W, H - FLOOR)
    return svg(b + soft_shadow(), d)
S['blossom'] = ('פריחת דובדבן', blossom)

# 8 marble
def marble():
    r = random.Random(8)
    d = lg('m', [(0, '#f7f5f2'), (1, '#e9e5df')])
    b = rect('url(#m)')
    for i in range(14):
        x = r.randint(-100, 700); pts = f'M{x} -20'
        y = -20
        while y < H:
            x += r.randint(-60, 60); y += r.randint(60, 140); pts += f' L{x} {y}'
        b += f'<path d="{pts}" stroke="#bdb5aa" stroke-width="{r.uniform(.8,2.5):.1f}" fill="none" opacity="{r.uniform(.25,.6):.2f}"/>'
    b += f'<rect x="0" y="{FLOOR}" width="{W}" height="{H-FLOOR}" fill="#e2ddd5"/><rect x="0" y="{FLOOR}" width="{W}" height="4" fill="#c9a96a"/>'
    return svg(b + soft_shadow(), d)
S['marble'] = ('שיש לבן וזהב', marble)

# 9 floral wallpaper
def floral():
    r = random.Random(9)
    d = '<pattern id="p" width="120" height="120" patternUnits="userSpaceOnUse"><rect width="120" height="120" fill="#f6efe6"/>' \
        '<g transform="translate(30 30)"><circle r="9" fill="#e9b7b0"/><circle cx="12" r="9" fill="#efc6bf"/><circle cy="12" r="9" fill="#efc6bf"/><circle cx="12" cy="12" r="9" fill="#e9b7b0"/><circle cx="6" cy="6" r="5" fill="#d98f86"/></g>' \
        '<path d="M80 80 q14 -18 28 0 q-14 18 -28 0z" fill="#a8bf98"/><path d="M90 20 q10 -12 20 0 q-10 12 -20 0z" fill="#a8bf98"/>' \
        '<g transform="translate(90 90)"><circle r="5" fill="#d9c27a"/></g></pattern>'
    b = rect('url(#p)', 0, 0, W, FLOOR) + f'<rect x="0" y="{FLOOR-90}" width="{W}" height="90" fill="#efe6d8"/><rect x="0" y="{FLOOR-94}" width="{W}" height="6" fill="#d8c9b0"/>'
    b += f'<rect x="0" y="{FLOOR}" width="{W}" height="{H-FLOOR}" fill="#b98f6a"/>'
    for i in range(0, W, 60):
        b += f'<line x1="{i}" y1="{FLOOR}" x2="{i}" y2="{H}" stroke="#a57b58" stroke-width="2"/>'
    return svg(b + soft_shadow(), d)
S['floral'] = ('טפט פרחים', floral)

# 10 lavender field
def lavender():
    r = random.Random(10)
    d = lg('sk', [(0, '#c9d9f0'), (.6, '#f2e5f1'), (1, '#fbf1ea')])
    b = rect('url(#sk)') + '<circle cx="470" cy="360" r="50" fill="#fff6dc"/>'
    b += '<path d="M0 560 Q150 500 300 540 T600 520 V700 H0Z" fill="#b9c7d8"/>'
    for row in range(16):
        y = 600 + row * 26
        for k in range(-2, 26):
            x = k * 26 + (row % 2) * 13 + (k - 12) * row * 1.5
            b += f'<ellipse cx="{x:.0f}" cy="{y}" rx="{6+row*.6:.1f}" ry="{10+row}" fill="{r.choice(["#9a7fc4","#8a6db8","#b49ad6"])}"/>'
    b += rect('#7fa071', 0, FLOOR + 30, W, H - FLOOR - 30, 'opacity=".0"')
    return svg(b + soft_shadow(), d)
S['lavender'] = ('שדה לבנדר', lavender)

# 11 library
def library():
    r = random.Random(11)
    d = lg('wd', [(0, '#6d4a33'), (1, '#4e3424')])
    b = rect('url(#wd)')
    for sy in range(60, FLOOR - 80, 120):
        b += f'<rect x="0" y="{sy+100}" width="{W}" height="14" fill="#3b271b"/>'
        x = 6
        while x < W:
            w = r.randint(14, 28); h = r.randint(70, 98)
            b += f'<rect x="{x}" y="{sy+100-h}" width="{w}" height="{h}" fill="{r.choice(["#8c3b33","#2f4f5f","#c9a35a","#5b6b3a","#e7d9bd","#6a4c7a","#a25b3a"])}"/>'
            x += w + 2
    b += f'<rect x="0" y="{FLOOR}" width="{W}" height="{H-FLOOR}" fill="#8f6a4c"/>' + '<rect width="600" height="1000" fill="#ffe2a8" opacity=".08"/>'
    return svg(b + soft_shadow(), d)
S['library'] = ('ספרייה', library)

# 12 city night bokeh
def night():
    r = random.Random(12)
    d = lg('sk', [(0, '#1d2340'), (1, '#3c3557')])
    b = rect('url(#sk)')
    x = 0
    while x < W:
        w = r.randint(50, 110); h = r.randint(200, 500)
        b += f'<rect x="{x}" y="{FLOOR-h}" width="{w}" height="{h}" fill="#2a2e4a"/>'
        for fy in range(FLOOR - h + 14, FLOOR - 20, 22):
            for fx in range(x + 8, x + w - 10, 16):
                if r.random() < .45:
                    b += f'<rect x="{fx}" y="{fy}" width="8" height="10" fill="#ffd98a" opacity=".8"/>'
        x += w + 4
    for i in range(45):
        b += f'<circle cx="{r.randint(0,W)}" cy="{r.randint(0,H)}" r="{r.randint(10,40)}" fill="{r.choice(["#ffcf7a","#ff9fb8","#9fc6ff","#fff2c8"])}" opacity="{r.uniform(.08,.28):.2f}"/>'
    b += f'<rect x="0" y="{FLOOR}" width="{W}" height="{H-FLOOR}" fill="#2b2a3c"/>'
    return svg(b + soft_shadow(), d)
S['night'] = ('עיר בלילה', night)

# 13 winter snow
def winter():
    r = random.Random(13)
    d = lg('sk', [(0, '#d7e5f2'), (1, '#f6f9fc')])
    b = rect('url(#sk)')
    for tx in (70, 170, 450, 540):
        for k in range(5):
            w = 120 - k * 20; y = FLOOR - 60 - k * 70
            b += f'<path d="M{tx-w/2} {y} L{tx} {y-110} L{tx+w/2} {y}Z" fill="#5f8a74"/><path d="M{tx-w/2+8} {y} L{tx} {y-60} L{tx+w/2-8} {y}" fill="#fff" opacity=".6"/>'
    for i in range(140):
        b += f'<circle cx="{r.randint(0,W)}" cy="{r.randint(0,H)}" r="{r.uniform(1.5,4):.1f}" fill="#fff"/>'
    b += f'<path d="M0 {FLOOR-10} Q300 {FLOOR-40} 600 {FLOOR-10} V{H} H0Z" fill="#ffffff"/>'
    return svg(b + soft_shadow(), d)
S['winter'] = ('שלג בחורף', winter)

# 14 desert dunes
def desert():
    d = lg('sk', [(0, '#f6cfa3'), (1, '#fdf0dc')])
    b = rect('url(#sk)') + '<circle cx="150" cy="300" r="60" fill="#fff1d0"/>'
    b += '<path d="M0 620 Q200 520 380 600 T600 560 V1000 H0Z" fill="#e7b17c"/>'
    b += '<path d="M0 720 Q180 650 330 700 T600 680 V1000 H0Z" fill="#dc9d66"/>'
    b += f'<path d="M0 {FLOOR-20} Q300 {FLOOR-60} 600 {FLOOR-10} V{H} H0Z" fill="#e9bb88"/>'
    return svg(b + soft_shadow(), d)
S['desert'] = ('מדבר', desert)

# 15 olive grove
def olive():
    r = random.Random(15)
    d = lg('sk', [(0, '#e7eef0'), (1, '#f8f4ea')])
    b = rect('url(#sk)') + '<path d="M0 520 Q150 470 300 500 T600 480 V700 H0Z" fill="#c6cdb2"/>'
    for tx, ty, s in ((80, 640, 1), (520, 650, 1.1), (300, 560, .6), (190, 590, .7), (420, 585, .7)):
        b += f'<path d="M{tx} {ty+120*s} q-10 -60 0 -110" stroke="#6b5a4a" stroke-width="{14*s:.0f}" fill="none"/>'
        for i in range(36):
            b += f'<ellipse cx="{tx+r.gauss(0,55*s):.0f}" cy="{ty-30*s+r.gauss(0,35*s):.0f}" rx="{14*s:.0f}" ry="{9*s:.0f}" fill="{r.choice(["#8a9a6b","#9fae80","#76875a"])}" opacity=".85"/>'
    b += f'<rect x="0" y="{FLOOR-40}" width="{W}" height="{H-FLOOR+40}" fill="#d8cba8"/>'
    return svg(b + soft_shadow(), d)
S['olive'] = ('מטע זיתים', olive)

# 16 pastel arch (photo studio)
def parch():
    d = lg('w', [(0, '#f4e3dc'), (1, '#efd8cf')])
    b = rect('#f8eee8') + '<path d="M120 860 V330 A180 180 0 0 1 480 330 V860Z" fill="url(#w)"/>'
    b += '<path d="M120 860 V330 A180 180 0 0 1 480 330 V860" fill="none" stroke="#e5c5b8" stroke-width="10"/>'
    b += '<path d="M60 860 q-20 -120 40 -160 q10 80 -10 160z" fill="#b7c4a5"/><path d="M80 860 q40 -170 90 -150 q-50 60 -60 150z" fill="#9fb38c"/>'
    b += '<path d="M540 860 q20 -140 -40 -180 q-10 90 10 180z" fill="#b7c4a5"/>'
    b += f'<rect x="0" y="{FLOOR}" width="{W}" height="{H-FLOOR}" fill="#ead7cc"/>'
    return svg(b + soft_shadow(), d)
S['parch'] = ('קשת פסטל', parch)

# 17 gold bokeh
def bokeh():
    r = random.Random(17)
    d = rg('g', [(0, '#fff4dc', 1), (1, '#e9cfa2', 1)], .5, .4, .8)
    b = rect('url(#g)')
    for i in range(70):
        b += f'<circle cx="{r.randint(0,W)}" cy="{r.randint(0,H)}" r="{r.randint(8,46)}" fill="{r.choice(["#fff","#f6d58e","#f3c8a8"])}" opacity="{r.uniform(.15,.45):.2f}"/>'
    return svg(b + soft_shadow(), d)
S['bokeh'] = ('אורות זהב', bokeh)

# 18 watercolor blush
def water():
    r = random.Random(18)
    d = '<filter id="b"><feGaussianBlur stdDeviation="40"/></filter>'
    b = rect('#fbf3ef')
    for i in range(12):
        b += f'<circle cx="{r.randint(0,W)}" cy="{r.randint(0,H)}" r="{r.randint(120,220)}" fill="{r.choice(["#f5cfd3","#f9e1c9","#e5d4ef","#d6e6f2"])}" opacity=".7" filter="url(#b)"/>'
    return svg(b + soft_shadow(), d)
S['water'] = ('צבעי מים', water)

# 19 sunny room with window
def room():
    d = lg('wl', [(0, '#f6efe4'), (1, '#efe4d4')]) + lg('ws', [(0, '#cfe6f3'), (1, '#eef6f8')])
    b = rect('url(#wl)')
    b += '<rect x="330" y="140" width="220" height="420" rx="6" fill="url(#ws)" stroke="#fff" stroke-width="14"/><line x1="440" y1="140" x2="440" y2="560" stroke="#fff" stroke-width="10"/><line x1="330" y1="350" x2="550" y2="350" stroke="#fff" stroke-width="10"/>'
    b += '<path d="M330 140 L550 140 L600 1000 L230 1000Z" fill="#fff6dc" opacity=".25"/>'
    b += '<path d="M300 130 q-20 250 10 450 h-30 q-20 -220 0 -450z" fill="#e7d3c0"/><path d="M580 130 q20 250 -10 450 h30 q20 -220 0 -450z" fill="#e7d3c0"/>'
    b += '<rect x="40" y="610" width="80" height="250" fill="#c9a77f"/><path d="M80 610 q-60 -90 0 -170 q60 80 0 170" fill="#8fae7a"/>'
    b += f'<rect x="0" y="{FLOOR}" width="{W}" height="{H-FLOOR}" fill="#cfae88"/><rect x="0" y="{FLOOR-14}" width="{W}" height="14" fill="#fff"/>'
    return svg(b + soft_shadow(), d)
S['room'] = ('חדר מואר', room)

# 20 café
def cafe():
    r = random.Random(20)
    d = lg('wl', [(0, '#3f4a44'), (1, '#55625a')])
    b = rect('url(#wl)')
    b += '<rect x="0" y="90" width="600" height="60" fill="#c9a36a"/><text x="300" y="132" font-size="0"></text>'
    for i in range(9):
        x = 40 + i * 65; b += f'<line x1="{x}" y1="150" x2="{x}" y2="230" stroke="#222" stroke-width="2"/><circle cx="{x}" cy="240" r="13" fill="#ffd98a"/><circle cx="{x}" cy="240" r="40" fill="#ffd98a" opacity=".15"/>'
    b += '<rect x="40" y="300" width="160" height="200" rx="6" fill="#2f3833"/>'
    for k in range(5):
        b += f'<rect x="60" y="{320+k*34}" width="{r.randint(60,120)}" height="8" rx="4" fill="#e9e1cf" opacity=".7"/>'
    b += '<rect x="400" y="560" width="200" height="300" fill="#7a5638"/><rect x="390" y="550" width="220" height="16" fill="#5e4129"/>'
    for k in range(4):
        b += f'<rect x="{420+k*40}" y="520" width="18" height="30" rx="3" fill="#f2efe8"/>'
    b += f'<rect x="0" y="{FLOOR}" width="{W}" height="{H-FLOOR}" fill="#a07a56"/>'
    for i in range(0, W, 50):
        for j in range(FLOOR, H, 50):
            if (i // 50 + j // 50) % 2: b += f'<rect x="{i}" y="{j}" width="50" height="50" fill="#8a6646"/>'
    return svg(b + soft_shadow(), d)
S['cafe'] = ('בית קפה', cafe)

# 21 lake & mountains
def lake():
    d = lg('sk', [(0, '#bcd7ea'), (1, '#f3f1ea')]) + lg('lk', [(0, '#8fb7c9'), (1, '#c6dde5')])
    b = rect('url(#sk)')
    b += '<path d="M0 560 L120 380 L210 480 L330 300 L460 470 L540 400 L600 450 V620 H0Z" fill="#9aa9b8"/>'
    b += '<path d="M290 360 L330 300 L370 352 L350 345 L330 360 L310 350Z" fill="#fff"/>'
    b += '<path d="M0 600 L150 470 L260 560 L400 450 L600 590 V650 H0Z" fill="#6f8f7a"/>'
    b += rect('url(#lk)', 0, 640, W, 190)
    b += f'<path d="M0 820 Q300 800 600 820 V{H} H0Z" fill="#9db58a"/>'
    b += f'<path d="M0 {FLOOR-10} Q300 {FLOOR-30} 600 {FLOOR-10} V{H} H0Z" fill="#8aa676"/>'
    return svg(b + soft_shadow(), d)
S['lake'] = ('אגם והרים', lake)

# 22 sunset gradient
def sunset():
    d = lg('s', [(0, '#7c6aa8'), (.45, '#e59ab0'), (.75, '#f8c58f'), (1, '#fde7c8')])
    b = rect('url(#s)') + '<circle cx="300" cy="700" r="90" fill="#fff0c8" opacity=".85"/>'
    b += f'<path d="M0 760 Q150 740 300 760 T600 750 V{H} H0Z" fill="#5d4a6e" opacity=".55"/>'
    return svg(b + soft_shadow(), d)
S['sunset'] = ('שמיים בשקיעה', sunset)

# 23 boutique
def boutique():
    r = random.Random(23)
    d = lg('wl', [(0, '#f3e9e4'), (1, '#ead9d1')])
    b = rect('url(#wl)')
    for x in (30, 400):
        b += f'<rect x="{x}" y="200" width="170" height="8" rx="4" fill="#c9a36a"/>'
        for k in range(7):
            cx = x + 14 + k * 22; c = r.choice(['#d9a3a8', '#f2efe8', '#9fb4c7', '#c9b28a', '#7d5a6b', '#e6c7b8'])
            b += f'<path d="M{cx} 208 l-12 18 v150 h24 v-150z" fill="{c}"/><path d="M{cx} 196 v12" stroke="#8a7a6a" stroke-width="2"/>'
    b += '<rect x="215" y="120" width="170" height="320" rx="85" fill="#fff" stroke="#c9a36a" stroke-width="8"/><rect x="230" y="135" width="140" height="290" rx="70" fill="#e5eef2"/>'
    b += '<circle cx="300" cy="70" r="26" fill="#ffe9b8" opacity=".7"/>'
    b += f'<rect x="0" y="{FLOOR}" width="{W}" height="{H-FLOOR}" fill="#d9c3b4"/>' + f'<ellipse cx="300" cy="{FLOOR+60}" rx="260" ry="50" fill="#e9d6c9"/>'
    return svg(b + soft_shadow(), d)
S['boutique'] = ('בוטיק', boutique)

# 24 white flower wall (wedding)
def flowerwall():
    r = random.Random(24)
    b = rect('#f7f1ec')
    for i in range(420):
        x, y = r.randint(-20, W + 20), r.randint(-20, FLOOR - 40)
        c = r.choice(['#ffffff', '#fbe9ec', '#f6dade', '#fff6ea', '#f1c9cf'])
        rr = r.randint(14, 26)
        b += f'<circle cx="{x}" cy="{y}" r="{rr}" fill="{c}" stroke="#ead2d4" stroke-width="1"/><circle cx="{x}" cy="{y}" r="{rr*.35:.0f}" fill="#f0d3d6"/>'
    b += f'<rect x="0" y="{FLOOR-40}" width="{W}" height="{H-FLOOR+40}" fill="#efe4dc"/>'
    return svg(b + soft_shadow())
S['flowerwall'] = ('קיר פרחים', flowerwall)

if __name__ == '__main__':
    import json
    meta = []
    for k, (n, f) in S.items():
        s = f()
        open(os.path.join(OUT, k + '.svg'), 'w').write(s)
        meta.append([k, n, len(s)])
    print(json.dumps(meta, ensure_ascii=False))
