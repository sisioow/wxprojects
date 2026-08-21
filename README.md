# wxprojects

微信 / 自媒体相关本地项目集合。**每个子项目对应一条独立 Git 分支**（分支名 = 项目名）。

当前所在分支一般为 `main`：只放本索引说明；具体代码请切换到对应项目分支，或按下方命令按分支克隆。

## 项目一览

| 分支 | 中文说明 | 上游 / 备注 |
| --- | --- | --- |
| [`iosuiskills`](https://github.com/sisioow/wxprojects/tree/iosuiskills) | Apple 风格 UI Skill（emilkowalski/skills）+ 演示项目 | 本仓分支 |
| [`insprira`](https://github.com/sisioow/wxprojects/tree/insprira) | 灵感熔炉：全平台自媒体工作台 | 本仓分支 |
| [`firecrawl`](https://github.com/sisioow/wxprojects/tree/firecrawl) | Firecrawl 网页抓取（Keyless / 自托管演示） | 本仓分支 |
| [`cangjie-skill`](https://github.com/sisioow/wxprojects/tree/cangjie-skill) | 仓颉 Skill：RIA-TV++ 蒸馏元 skill | 本仓分支 |
| [`cangjie-skill-demo`](https://github.com/sisioow/wxprojects/tree/cangjie-skill-demo) | 仓颉 Skill 测试项目（样书 + 校验脚本） | 本仓分支 |
| [`system_prompts_leaks`](https://github.com/sisioow/wxprojects/tree/system_prompts_leaks) | 各家 AI 系统提示词泄露/整理合集（README 为中文导读） | 源自 asgeirtj/system_prompts_leaks |
| [`runcomfy-agent-skills`](https://github.com/sisioow/wxprojects/tree/runcomfy-agent-skills) | RunComfy 换脸 / 生图 / 视频 Agent Skill 包 | 源自 agentspace-so/runcomfy-agent-skills |
| [`xianxia-visual-director`](https://github.com/sisioow/wxprojects/tree/xianxia-visual-director) | 东方仙侠视觉导演 Skill（电影级提示词） | 源自 liyue-aigc/xianxia-visual-director |
| [`InstantID`](https://github.com/sisioow/wxprojects/tree/InstantID) | 单张参考图身份保持生成（本地扩散引擎） | 源自 instantX-research/InstantID |
| [`madeye-jobs`](https://github.com/sisioow/wxprojects/tree/madeye-jobs) | 就业市场 AI 暴露度分析与可视化 | 源自 madeye/jobs |

## 按分支克隆

```bash
# 已有本仓分支的项目
git clone -b iosuiskills https://github.com/sisioow/wxprojects.git
git clone -b insprira https://github.com/sisioow/wxprojects.git
git clone -b firecrawl https://github.com/sisioow/wxprojects.git
git clone -b cangjie-skill https://github.com/sisioow/wxprojects.git
git clone -b cangjie-skill-demo https://github.com/sisioow/wxprojects.git
git clone -b system_prompts_leaks https://github.com/sisioow/wxprojects.git
git clone -b runcomfy-agent-skills https://github.com/sisioow/wxprojects.git
git clone -b xianxia-visual-director https://github.com/sisioow/wxprojects.git
git clone -b InstantID https://github.com/sisioow/wxprojects.git
git clone -b madeye-jobs https://github.com/sisioow/wxprojects.git
```

## 本地工作区说明

若你在同一目录下同时保留多个子文件夹，其中部分可能仍是**独立上游仓库**的 clone（自带 `.git`）。  
以 GitHub 上的 `sisioow/wxprojects` 为准时，请优先使用上表对应**分支**查看与提交。
