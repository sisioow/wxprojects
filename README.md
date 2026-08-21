# 系统提示词泄露合集（System Prompts Leaks）

> **本分支用途（wxprojects）**：便于本地识别与查阅各家 AI 产品的系统提示词原文。  
> 英文原版说明见 [README.en.md](README.en.md)。  
> 上游仓库：[asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)

收录 ChatGPT、Claude、Gemini、Grok、Cursor 等产品在对话前收到的**隐藏系统指令**（尽量原文照录）。

## 这是什么

系统提示词 = 模型在你发第一条消息之前就加载的规则与工具说明。本仓库按厂商分目录存放泄露/公开的提示词文件，方便对比与研究。

## 目录速查（按厂商）

| 目录 | 中文说明 |
| --- | --- |
| [Anthropic/](Anthropic/) | Claude 网页端、Claude Code、Claude Design、Office 插件等 |
| [OpenAI/](OpenAI/) | ChatGPT、Codex、API 注入提示、旧版工具策略 |
| [Google/](Google/) | Gemini、Antigravity CLI、NotebookLM、Jules 等 |
| [xAI/](xAI/) | Grok 系列 |
| [Perplexity/](Perplexity/) | Perplexity、Deep Research、Comet 浏览器 |
| [Microsoft/](Microsoft/) | GitHub Copilot、VS Code Agent、Copilot CLI / macOS |
| [Cursor/](Cursor/) | Cursor 系统提示词（含中英对照整理版） |
| [Meta/](Meta/) | Meta AI |
| [Mistral/](Mistral/) | Mistral Medium / Code |
| [Kimi/](Kimi/) | 月之暗面 Kimi |
| [DeepSeek/](DeepSeek/) | DeepSeek |
| [Qwen/](Qwen/) | 通义千问 |
| [GLM/](GLM/) | 智谱 GLM |
| [OpenCode/](OpenCode/) · [Pi/](Pi/) · [Notion/](Notion/) · [Misc/](Misc/) | 其他工具与杂项 |

## 最近更新（摘自上游）

| 内容 | 日期 | 链接 |
|------|------|------|
| Codex GPT-5.6（Sol） | 2026-07-26 | [Terra/Luna](OpenAI/Codex/gpt-5.6.md) · [Sol](OpenAI/Codex/gpt-5.6-sol.md) |
| Grok 4.5 | 2026-07-26 | [提示词](xAI/grok-4.5.md) |
| Claude Opus 5 | 2026-07-24 | [网页](Anthropic/claude-opus-5.md) · [Claude Code](Anthropic/Claude%20Code/claude-code-opus-5.md) |
| Claude Design | 2026-07-23 | [提示词](Anthropic/claude-design.md) |
| Perplexity | 2026-07-17 | [提示词](Perplexity/perplexity-ai.md) |
| Cursor | — | [Cursor/cursor.md](Cursor/cursor.md) |

## 在本 monorepo 中如何拉取

```bash
git clone -b system_prompts_leaks https://github.com/sisioow/wxprojects.git system_prompts_leaks
```

## 说明

- 内容来自公开泄露/逆向收集，仅供学习研究。
- 文件名与路径尽量与上游保持一致，便于对照更新。
