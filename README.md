> **本分支用途（wxprojects）**：本仓独立分支，便于识别与按分支克隆。
>
> ```bash
> git clone -b cangjie-skill-demo https://github.com/sisioow/wxprojects.git
> ```

# cangjie-skill 测试项目

用一篇**短样书**跑通 [cangjie-skill](https://github.com/kangarooking/cangjie-skill) 的 RIA-TV++ 流水线，并做结构 + 触发意图校验。

来源文章：[替你逛了一圈本周 GitHub…](https://mp.weixin.qq.com/s/rgszldQ00DQtP22jECmISA) 第 5 项。

## 目录

```
source/constraint-first-decision.txt   # 样章原文
books/constraint-first-decision/     # 蒸馏产出（阶段 0–5）
.agents/skills/                      # 元 skill + 蒸馏后的 3 个 skill
scripts/                             # 校验与安装脚本
```

## 跑测试

```bash
npm test
```

包含：

1. **validate** — 检查 `PIPELINE_STATE` / `BOOK_OVERVIEW` / `verified` / `INDEX` / `GLOSSARY` / `DIGEST` 与各 skill 的 RIA++ 章节
2. **test:triggers** — 对 `test-prompts.json` 做规则化触发意图检查
3. **install:skills** — 将 3 个蒸馏 skill 安装到 `.agents/skills/`

## 蒸馏结果（3 个 skill）

| Skill | 用途 |
| --- | --- |
| `constraint-first-decision` | 先写硬约束，再比选项 |
| `two-track-evidence` | 过程证据 + 结果证据 |
| `reversibility-ladder` | 按可逆程度决定快慢 |

## 在 Cursor 里试用

安装元 skill（若尚未安装）：

```bash
npx skills add kangarooking/cangjie-skill -a cursor -y
```

然后可对 Agent 说：

> 用 `constraint-first-decision` skill，帮我收敛一个“要不要重做官网”的决策讨论。

或用自己的书/视频转写：

> 按 cangjie-skill，把 `source/你的材料.txt` 蒸馏成 skills（先试点 1 份）。
