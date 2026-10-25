---
name: wardrobe-upload-inbox
description: 25/10 chat uploads blocked project-wide; Sara sends images via the upload-inbox artifact 6QchawxHTNjJ14ZQxeok6F (assets + db 'uploads')
metadata:
  type: reference
  modified: 2026-10-25T17:24:31.986Z
---
25/10/2026 17:24: photo uploads in the project chat stopped working in ALL threads (not only the old full one); the newest file in uploads/hearth is from 15:42.

Workaround: page "תיבת התמונות של שרה" https://claude.ai/artifact/6QchawxHTNjJ14ZQxeok6F (scratchpad upl/index.html). She picks images → assets.upload + db doc uploads/<assetId> {asset,name,at,size}.
To read them: ArtifactData list collection "uploads" on that url, then Artifact read with path=<asset id> (saves locally).

Related: [[wardrobe-avatar8-pipeline]], [[wardrobe-v152-uploads]]
