import sys
from PIL import Image
N='/home/claude/sara-closet/closet/avatar8/new2/frames'
for n in sys.argv[1:]:
    for i in range(1,9):
        b=Image.open(f'{N}/c{i}.png').convert('RGBA');b.alpha_composite(Image.open(f'{n}/out/rl_{i}.png'));b.convert('RGB').save(f'{n}/out/comp_{i}.png')
