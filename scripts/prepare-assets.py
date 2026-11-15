"""Optimize original assets without changing their source files."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'media'
OUT.mkdir(parents=True, exist_ok=True)

for name in ('team-ernesto', 'team-ali', 'team-yoisielis'):
    image = ImageOps.exif_transpose(Image.open(ROOT / 'assets' / 'img' / f'{name}.jpg')).convert('RGB')
    image.thumbnail((600, 660), Image.Resampling.LANCZOS)
    image.save(OUT / f'{name}.webp', 'WEBP', quality=86, method=6)

image = ImageOps.exif_transpose(Image.open(ROOT / 'assets/img/team-oscuro.jpg')).convert('RGB')
image = ImageOps.fit(image, (480, 480), method=Image.Resampling.LANCZOS)
image.save(OUT / 'app-hero.webp', 'WEBP', quality=82, method=6)

for name in ('huella', 'yoeldis'):
    source = ROOT / '.local/captures' / f'project-{name}.png'
    if source.exists():
        image = Image.open(source).convert('RGB')
        image.save(OUT / f'project-{name}.webp', 'WEBP', quality=88, method=6)
        print(f'project-{name}.webp: {(OUT / f"project-{name}.webp").stat().st_size} bytes')
