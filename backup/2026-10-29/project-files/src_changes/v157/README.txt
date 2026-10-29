v157 (closet thread) on v156. Phone photo uploads.
- fix157.js (NEW, appended after fix144.js in book3.py): writes each upload step to db uplog as k:'step' (pick_open, pick_file, pick_blocked, pick_back_empty, up_start, up_ok, up_fail, crop_timeout, upItemImg, addPics, toast, id_*), with env (chrome/webview) and the end of the UA. heicBad has an 8 s limit and autoCrop a 20 s limit. On a phone, if the page is never hidden within 5 s of tapping a file input, the gallery did not open (the Claude app's in-app view blocks the picker): it shows "פתחי את האתר ב-Chrome".
- orders123.js identify(): every step has a time limit (use 12 s, limits 8 s, shrink 15 s, sample.json 70/60 s). The photo is kept in V.res.file, and picking a candidate (o3pick) saves it on that item via addPics(label 'צילום שלי', nocrop).
- imgup.js: unchanged from v156 (included for reference).
- book3.py: concat adds fix157.js. Paths use the <SCRATCH> placeholder like yours.
Cause found: Sara had the site open inside the Claude app, where the file picker never opens.
