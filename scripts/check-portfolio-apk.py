"""Check the final APK contains the new portfolio images and JavaScript."""
from pathlib import Path
import hashlib
import json
import sys
import zipfile

root = Path(__file__).resolve().parents[1]
apk = Path(sys.argv[1]).resolve(strict=True)
with zipfile.ZipFile(apk) as archive:
    images = {hashlib.sha256(archive.read(name)).hexdigest(): name
              for name in archive.namelist() if name.lower().endswith((".png", ".webp", ".jpg"))}
    pieces = []
    for path in sorted((root / "mobile/assets/projects/gallery").glob("*.webp")):
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        if digest not in images:
            raise ValueError(f"Optimized asset absent from APK: {path.name}")
        pieces.append({"source": path.name, "apkEntry": images[digest], "bytes": path.stat().st_size})
    if len(pieces) != 12:
        raise ValueError("Expected six full images and six thumbnails")
    obsolete = []
    for name in ("project-huella.webp", "project-yoeldis.webp", "project-huella-mobile.png", "project-yoeldis-mobile.png"):
        path = root / "mobile/assets/projects" / name
        if hashlib.sha256(path.read_bytes()).hexdigest() in images:
            obsolete.append(name)
    if obsolete:
        raise ValueError(f"Obsolete catalog images still packaged: {obsolete}")
    bundle = archive.read("assets/index.android.bundle")
    def present(value):
        return any(value.encode(encoding) in bundle for encoding in ("utf-8", "latin-1", "utf-16-le"))
    expected = ["Yoeldis Castillo", "ProjectGallery", "UpcomingProduct", "Cuentos Mágicos", "cuentos-magicos"]
    text_checks = {value: present(value) for value in expected}
    if not all(text_checks.values()):
        raise ValueError(f"New portfolio code not confirmed in bundle: {text_checks}")
    report = {"apk": str(apk), "images": pieces, "imageBytes": sum(row["bytes"] for row in pieces),
              "obsoleteImages": obsolete, "bundleBytes": len(bundle), "bundleContent": text_checks}
(root / "docs/audit/portfolio-premium/apk-portfolio-content.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({key: value for key, value in report.items() if key != "images"}, ensure_ascii=False))
