import numpy as np,sys
from PIL import Image
rows=[]
for n in sys.argv[2:]:
    rows.append(np.concatenate([np.asarray(Image.open(f'{n}/out/comp_{i}.png').convert('RGB').resize((180,270))) for i in range(1,9)],1))
Image.fromarray(np.concatenate(rows,0)).save(sys.argv[1])
