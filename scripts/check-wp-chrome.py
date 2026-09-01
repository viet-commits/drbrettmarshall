#!/usr/bin/env python3
"""Build-time guard: fail if WordPress navigation chrome leaks into page body text.

The old WP theme appended cross-navigation headings to every service body
("Related Literature", "Services > By Conditions", "View Services by
Treatment or Procedure", etc.). They must only ever appear as real <h1>-<h6>
headings — never as paragraph/body text. This scans the exported `out/`
HTML and fails the build if any of them show up in a <p>.

Wire as a `postbuild` npm script so `npm run build` enforces it.
"""
import re
import sys
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "out"

# Substring markers: these are nav chrome and never legit body copy.
BODY_MARKERS = (
    "Services > By",
    "View Services by",
)

# Exact-match (case-insensitive) paragraph contents that are dead chrome.
EXACT_DEAD = {
    "related literature",
    "treatments and procedures",
}

P_TAG = re.compile(r"<p\b[^>]*>(.*?)</p>", re.S)
TAG = re.compile(r"<[^>]+>")


def unescape(s: str) -> str:
    return (
        s.replace("&gt;", ">")
        .replace("&lt;", "<")
        .replace("&amp;", "&")
        .replace("&#039;", "'")
        .replace("&quot;", '"')
        .replace("&nbsp;", " ")
    )


def paragraph_texts(html: str):
    for raw in P_TAG.findall(html):
        text = unescape(TAG.sub("", raw)).strip()
        if text:
            yield text


def main() -> int:
    files = sorted(OUT.rglob("*.html"))
    if not files:
        print("ERROR: no HTML output in out/ — run `npm run build` first.")
        return 1

    problems = []
    for f in files:
        html = f.read_text(errors="ignore")
        for p in paragraph_texts(html):
            low = p.lower()
            for marker in BODY_MARKERS:
                if marker.lower() in low:
                    problems.append((f, p))
                    break
            else:
                if low in EXACT_DEAD:
                    problems.append((f, p))

    if problems:
        print("FAIL: WordPress nav chrome rendered as body text:")
        for f, p in problems:
            print(f"  {f.relative_to(OUT.parent)}: {p!r}")
        return 1

    print(f"OK: {len(files)} HTML files — no WP nav chrome in body text.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
