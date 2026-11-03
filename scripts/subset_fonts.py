#!/usr/bin/env python3
"""Subset Noto CJK (SIL OFL 1.1) fonts to the characters the site actually uses.

Source fonts (not committed, ~70 MB):
  https://github.com/notofonts/noto-cjk  Serif/SubsetOTF/{JP,TC,SC}/NotoSerif{R}-Medium.otf
                                         Sans/SubsetOTF/{JP,TC,SC}/NotoSans{R}-Regular.otf, -Bold.otf
  https://github.com/JetBrains/JetBrainsMono  fonts/ttf/JetBrainsMono-Regular.ttf
Usage: python3 scripts/subset_fonts.py <source-font-dir>
Run again whenever lib/content.ts changes. Output: app/fonts/*.woff (bundled by Next so basePath is applied)
"""
import json
import pathlib
import subprocess
import sys
import tempfile

from fontTools import subset

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "app" / "fonts"


def chars() -> dict:
    with tempfile.TemporaryDirectory() as td:
        subprocess.run(["npx", "tsc", "lib/content.ts", "--outDir", td, "--module", "commonjs",
                        "--target", "es2020", "--skipLibCheck"], cwd=ROOT, check=True)
        js = pathlib.Path(td) / "content.js"
        out = subprocess.run(["node", "scripts/dump-text.mjs", str(js)], cwd=ROOT, check=True,
                             capture_output=True, text=True).stdout
    return json.loads(out)


def make(src: pathlib.Path, text: str, dest: str) -> None:
    opts = subset.Options()
    opts.flavor = "woff"
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    font = subset.load_font(str(src), opts)
    s = subset.Subsetter(opts)
    s.populate(text=text)
    s.subset(font)
    missing = [c for c in set(text) if c.strip() and ord(c) not in font.getBestCmap()]
    subset.save_font(font, str(OUT / dest), opts)
    print(f"{dest}: {(OUT / dest).stat().st_size // 1024} KB, missing {''.join(sorted(missing)) or '-'}")


def main() -> None:
    src = pathlib.Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)
    c = chars()
    for r in ("JP", "TC", "SC"):
        make(src / f"NotoSerif{r}-Medium.otf", c[r], f"serif-{r.lower()}.woff")
        make(src / f"NotoSans{r}-Regular.otf", c[r], f"sans-{r.lower()}-400.woff")
        make(src / f"NotoSans{r}-Bold.otf", c[r], f"sans-{r.lower()}-700.woff")
        make(src / f"NotoSans{r}-Regular.otf", c["labels"][r], f"label-{r.lower()}.woff")
    mono = "".join(chr(i) for i in range(32, 127)) + "—–↗·©ŌōĀāŪū"
    make(src / "JetBrainsMono-Regular.ttf", mono, "mono-400.woff")


if __name__ == "__main__":
    main()
