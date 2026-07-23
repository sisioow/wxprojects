# Apple Design Demo

基于微信文章推荐的 [emilkowalski/skills](https://github.com/emilkowalski/skills) 中的 **apple-design** Skill，落地一个可交互的底部弹层演示，并覆盖核心物理工具单测。

## 已安装 Skill

```bash
npx skills@latest add emilkowalski/skills --skill apple-design -a cursor -y
```

Skill 路径：`.agents/skills/apple-design/SKILL.md`

同仓库完整克隆见：`../emilkowalski-skills`

## 本地运行

```bash
npm install
npm test
npm run dev
```

## 演示能力（对应 Skill 原则）

- 按下即时缩放反馈（Response）
- 底部弹层 1:1 跟手 + grab offset（Direct manipulation）
- 释放速度惯性投影到打开/关闭（Momentum projection）
- 边界橡皮筋（Rubber-banding）
- 弹簧可打断（Interruptibility）
- 毛玻璃材质层级（Materials）
