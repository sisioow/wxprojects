# 就业市场 AI 暴露度（madeye/jobs）

> **本分支用途（wxprojects）**：职业 AI/自动化暴露度分析与可视化（含中文站点数据）。  
> 英文原版：[README.en.md](README.en.md)  
> 上游：[madeye/jobs](https://github.com/madeye/jobs)

## 这是什么

基于美国劳工统计局等职业数据，用 LLM 给各职业打「AI 暴露度」分数，并做成可交互树图。仓库内也有中国相关内容目录 `cn/`、`site-cn/`。

## 主要文件

| 路径 | 说明 |
| --- | --- |
| `scrape.py` / `process.py` / `score.py` | 抓取 → 处理 → 打分流水线 |
| `occupations.csv` / `scores.json` | 职业与分数数据 |
| `site/` · `site-cn/` | 站点前端 |
| `china-job-research.md` | 中国就业研究相关说明 |
| `jobs.png` | 树图预览 |

## 在本 monorepo 中如何拉取

```bash
git clone -b madeye-jobs https://github.com/sisioow/wxprojects.git madeye-jobs
```
