"""Create responsive WebP derivatives of the six authentic public captures."""
from pathlib import Path
import json
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / ".local/portfolio-premium/source"
web = root / "public/media/projects"
mobile = root / "mobile/assets/projects/gallery"
web.mkdir(parents=True, exist_ok=True)
mobile.mkdir(parents=True, exist_ok=True)

def localized(pt, es):
    return {"pt": pt, "es": es}

definitions = {
    "huella": [
        ("hero", "https://www.lahuellaescrita.com/", localized("Identidade editorial", "Identidad editorial"), localized("A apresentação pública combina tipografia editorial, tons claros e a identidade de La Huella Escrita.", "La presentación pública combina tipografía editorial, tonos claros y la identidad de La Huella Escrita.")),
        ("books", "https://www.lahuellaescrita.com/biblioteca.html", localized("Biblioteca e livros", "Biblioteca y libros"), localized("A biblioteca apresenta capas, descrições de obras e caminhos para explorar os livros.", "La biblioteca presenta portadas, descripciones de obras y caminos para explorar los libros.")),
        ("resources", "https://www.lahuellaescrita.com/recursos.html", localized("Recursos para escritores", "Recursos para escritores"), localized("Uma seleção pública de técnicas, ferramentas e ideias para a escrita, com organização em cartões.", "Una selección pública de técnicas, herramientas e ideas para la escritura, organizada en tarjetas.")),
    ],
    "yoeldis": [
        ("hero", "https://www.yoeldiscastillo.com/", localized("Marca pessoal", "Marca personal"), localized("A identidade profissional reúne psicologia, escrita e desenvolvimento pessoal em uma apresentação própria.", "La identidad profesional reúne psicología, escritura y desarrollo personal en una presentación propia.")),
        ("books", "https://www.yoeldiscastillo.com/libros.html", localized("Livros e conteúdo", "Libros y contenido"), localized("A página de livros destaca capas, descrições e uma prévia do conteúdo das obras.", "La página de libros destaca portadas, descripciones y una vista previa del contenido de las obras.")),
        ("articles", "https://www.yoeldiscastillo.com/articulos.html", localized("Artigos e reflexões", "Artículos y reflexiones"), localized("Artigos públicos abordam autoconhecimento, psicologia e desenvolvimento pessoal.", "Los artículos públicos abordan autoconocimiento, psicología y desarrollo personal.")),
    ],
}
manifest = {"capturedOn": "2026-11-15", "projects": {}, "upcoming": {
    "id": "cuentos-magicos", "name": "Cuentos Mágicos", "status": "upcoming",
    "category": localized("PRODUTO NARRATIVO", "PRODUCTO NARRATIVO"),
    "copy": localized("Uma nova proposta narrativa em preparação. A próxima história do ecossistema Loop Avante começa aqui.", "Una nueva propuesta narrativa en preparación. La próxima historia del ecosistema Loop Avante comienza aquí."),
}}
sizes = []
for project, pieces in definitions.items():
    manifest["projects"][project] = []
    for key, url, title, description in pieces:
        original = Image.open(source / f"{project}-{key}.png").convert("RGB")
        if original.size != (1280, 800):
            raise ValueError(f"Unexpected capture dimensions: {project}/{key}: {original.size}")
        for width, quality in [(1280, 82), (960, 82), (480, 80), (192, 74)]:
            path = web / f"{project}-{key}-{width}.webp"
            original.resize((width, width * 10 // 16), Image.Resampling.LANCZOS).save(path, "WEBP", quality=quality, method=6)
            sizes.append({"path": path.relative_to(root).as_posix(), "bytes": path.stat().st_size, "width": width})
        for width, quality in [(720, 80), (192, 74)]:
            path = mobile / f"{project}-{key}-{width}.webp"
            original.resize((width, width * 10 // 16), Image.Resampling.LANCZOS).save(path, "WEBP", quality=quality, method=6)
            sizes.append({"path": path.relative_to(root).as_posix(), "bytes": path.stat().st_size, "width": width})
        prefix = f"/media/projects/{project}-{key}"
        manifest["projects"][project].append({"id": key, "title": title, "description": description, "sourceUrl": url,
            "image": prefix + "-960.webp", "small": prefix + "-480.webp", "large": prefix + "-1280.webp", "thumbnail": prefix + "-192.webp", "width": 1280, "height": 800})

for path in [root / "src/data/projectGallery.json", root / "mobile/src/data/projectGallery.json"]:
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(root / "docs/audit/portfolio-premium/image-budget.json").write_text(json.dumps(sizes, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"pieces": 6, "webBytes": sum(p["bytes"] for p in sizes if p["path"].startswith("public/")), "androidBytes": sum(p["bytes"] for p in sizes if p["path"].startswith("mobile/"))}))
