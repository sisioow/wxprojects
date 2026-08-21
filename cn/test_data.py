"""Validate China jobs dataset integrity (no network, no API key).

Usage:
    uv run python cn/test_data.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def load(name: str):
    return json.loads((ROOT / name).read_text(encoding="utf-8"))


def main() -> int:
    occ = load("cn/occupations.json")
    scores = load("cn/scores.json")
    data = load("site-cn/data.json")

    assert isinstance(occ, list) and len(occ) >= 200, f"occupations too few: {len(occ)}"
    assert isinstance(scores, list) and len(scores) >= 200, f"scores too few: {len(scores)}"
    assert len(data) == len(occ), f"data/occ mismatch {len(data)}!={len(occ)}"

    score_by_slug = {s["slug"]: s for s in scores}
    missing = [o["slug"] for o in occ if o["slug"] not in score_by_slug]
    assert not missing, f"missing scores: {missing[:5]}"

    exposures = [s.get("exposure") for s in scores]
    assert all(isinstance(x, (int, float)) and 0 <= x <= 10 for x in exposures), "exposure out of range"
    avg = sum(exposures) / len(exposures)
    assert 4.0 <= avg <= 6.5, f"avg exposure unexpected: {avg}"

    # Anchors from the 逛逛GitHub article / China demo
    high = {"软件工程师", "前端开发工程师", "证券分析师", "翻译"}
    low = {"建筑工人", "搬家工人", "中式厨师"}
    titles = {d["title"]: d for d in data}
    for title in high:
        assert title in titles and titles[title]["exposure"] >= 8, (title, titles.get(title))
    for title in low:
        assert title in titles and titles[title]["exposure"] <= 2, (title, titles.get(title))

    html = (ROOT / "site-cn/index.html").read_text(encoding="utf-8")
    assert "data.json" in html and "中国" in html

    print(f"OK cn occupations={len(occ)} scores={len(scores)} avg_exposure={avg:.2f}")
    print(f"OK site-cn/data.json={len(data)} total_jobs={sum(d['jobs'] or 0 for d in data):,}")
    print("OK site-cn/index.html")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        raise SystemExit(1)
