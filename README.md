# RunComfy Agent Skills（换脸 / 生图 / 视频）

> **本分支用途（wxprojects）**：RunComfy 相关 Agent Skill 集合，含 face-swap、图像编辑、视频生成等。  
> 英文原版：[README.en.md](README.en.md)  
> 上游：[agentspace-so/runcomfy-agent-skills](https://github.com/agentspace-so/runcomfy-agent-skills)

## 这是什么

通过 `runcomfy` CLI 调用 RunComfy 上的模型 API。常用 Skill 包括：

| Skill | 中文说明 |
| --- | --- |
| `face-swap` | 静图/视频换脸与角色替换路由 |
| `gpt-image-edit` | GPT Image 2 编辑（多参考图换脸） |
| `nano-banana-edit` | Nano Banana 图像编辑 |
| `flux-kontext` | Flux Kontext 局部精修 |
| `runcomfy-cli` | CLI 安装、登录与调用说明 |

## 安装示例

```bash
npx skills add agentspace-so/runcomfy-agent-skills --skill face-swap -g
```

## 在本 monorepo 中如何拉取

```bash
git clone -b runcomfy-agent-skills https://github.com/sisioow/wxprojects.git runcomfy-agent-skills
```

使用前需 `runcomfy login` 或设置 `RUNCOMFY_TOKEN`。
