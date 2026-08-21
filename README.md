# 东方仙侠视觉导演（xianxia-visual-director）

> **本分支用途（wxprojects）**：东方仙侠环境视觉导演 Skill，用于生成/优化电影级图片提示词。  
> 完整说明见下文；上游备份：[README.upstream.md](README.upstream.md)  
> 上游：[liyue-aigc/xianxia-visual-director](https://github.com/liyue-aigc/xianxia-visual-director)

```bash
git clone -b xianxia-visual-director https://github.com/sisioow/wxprojects.git xianxia-visual-director
```

---

# 东方仙侠视觉导演

`xianxia-visual-director` 是一个面向 Codex / Agent Skills 体系的东方仙侠环境视觉导演 Skill，用于把简短构想、已有提示词或视觉参考，扩展为结构清晰、可控、可衍生的电影级图片提示词。

它不是一套固定的“白玉长廊模板”，而是一套共享仙界总则下的视觉路由系统。不同场景与风格可以变化，但必须保留可验证的巨物尺度、五层空间、有内容的呼吸空间、可信的东方建筑语言、无栏杆开放边界，以及统一的人物与仙衣逻辑。

> Eastern xianxia environment direction for cinematic still prompts, celestial cities, monumental sky architecture, measurable scale, luminous color and multiple aspect ratios.

## 核心能力

- 从一句场景构想生成完整视觉导演方案、正向提示词、负面约束和衍生方向。
- 优化已有仙侠提示词中的尺度不足、城市不够繁华、空间扁平、灰雾过重、颜色脏灰或过度橙金等问题。
- 设计单一仙境地标，也能设计连续运行、有人居住的神域城市。
- 支持华彩通透的国风幻想，以及建筑压住苍穹的东方巨构视觉。
- 使用人物、柱径、门洞、平台跨度、建筑递减和极远天域等关系证明尺度，而不是只堆叠“宏大、史诗”等形容词。
- 支持 `16:9`、`21:9`、`4:3`、`3:2`、`4:5`、`9:16`，默认 `16:9`。
- 默认生成单张画面的提示词，不会因为 `9:16` 推断为九宫格或系列图。

## 共享仙界总则

所有普通路由和独立原典路由都继承以下规则：

1. 至少四项可观察或可量化的巨物尺度证据。
2. 固定五层空间：近景巨型门槛、承人界面、统治主体、从属空间、天际终点。
3. 保留约 40%–60% 的有内容空气；空气可由天空、云隙、水面、庭院、门洞、桥下深空和远方天光构成，但不能只是空白或灰雾。
4. 建筑巨大、平静、结构清晰，先建立梁柱、基座、屋檐、平台和承重关系，再集中添加局部装饰。
5. 平台、台阶、桥梁、长廊、云港和悬崖边缘默认不使用栏杆。
6. 环境型人物默认是 1%–4% 画面高度的虚构成年人，以背影或斜后方出现。
7. 仙衣遵循“衣有骨、纱有气、饰有止、色有主”，头发、衣袖、后摆与披帛服从同一风向。

## 路由系统

### 场景路由

- `单体仙境`：围绕一处局部地点或唯一地标展开，例如天门、神木书阁、观星台、孤岛、祭台或悬空藏经阁。
- `神域聚居地`：设计真实有人居住和运转的仙界文明，包括主城区、从属城区、街巷、庭院、交通、云港、瀑布水系与极远聚落。

### 视觉风格路由

- `华彩通透仙侠`：色彩明亮、材质丰富、空气清澈、建筑细节精密，但避免霓虹色和全局橙金滤镜。
- `东方苍穹巨构`：使用被裁切或遮挡的巨型建筑片段、门槛揭示、压顶结构与断裂式尺度关系，让观者处于巨构之下。

### 独立总则路由

- `仙界大境原典`：更加安静、辽阔、克制的仙界空间路线，继承共享总则，并增加低位云海、有限远方锚点、单一主动态和柔和高空漫射光等控制。

场景路由与视觉风格路由可以独立组合，例如：

- `单体仙境 + 华彩通透仙侠`
- `单体仙境 + 东方苍穹巨构`
- `神域聚居地 + 华彩通透仙侠`
- `神域聚居地 + 东方苍穹巨构`

## 安装

### Windows PowerShell

```powershell
git clone https://github.com/liyue-aigc/xianxia-visual-director.git
Copy-Item -Recurse -Force `
  .\xianxia-visual-director\xianxia-visual-director `
  "$env:USERPROFILE\.codex\skills\xianxia-visual-director"
```

如果目标目录已经存在，请先自行备份。重新启动 Codex 或刷新 Skill 列表后即可调用。

### macOS / Linux

```bash
git clone https://github.com/liyue-aigc/xianxia-visual-director.git
mkdir -p ~/.codex/skills
cp -R ./xianxia-visual-director/xianxia-visual-director ~/.codex/skills/
```

## 最小调用示例

```text
使用 $xianxia-visual-director。

设计一座雨后初晴的悬空藏经阁。画面明亮通透，植物鲜绿，阴影透明，不要灰蒙蒙。

请输出参数锁定、视觉导演方案、完整提示词、负面约束和三个衍生方向。
```

## 完整调用示例

```text
使用 $xianxia-visual-director。

画幅比例：21:9
场景路由：神域聚居地
视觉风格路由：东方苍穹巨构
镜头意图：繁华压迫
空间尺度强度：超宏大
饱和策略：选择性高饱和

设计一座建在巨型悬空神殿基座下方的仙界都城。采用远距离低机位、平视略微仰拍、85mm长焦压缩。神殿基座只显露局部并越过画面顶部；都城沿山崖、云层与瀑布河谷连续发展。人物保持极小背影，只作为尺度参照。

输出标准完整格式。
```

## 标准输出

默认输出包含：

1. 参数锁定
2. 视觉导演方案
3. 完整提示词
4. 负面约束
5. 三个可衍生方向

完整提示词会明确镜头高度、观看距离、倾角、焦段、五层空间、尺度证据、呼吸空间分布、人物服装、色彩预算和单一主光方向。

## 目录结构

```text
xianxia-visual-director/
├── README.md
└── xianxia-visual-director/
    ├── SKILL.md
    ├── agents/
    │   └── openai.yaml
    └── references/
        ├── aspect-ratios.md
        ├── celestial-grand-realm-canon.md
        ├── celestial-realm-route.md
        ├── composition-color-light.md
        ├── eastern-sky-megastructure-style.md
        ├── prompt-examples.md
        ├── visual-dna.md
        └── xianxia-master-rules.md
```

## 与运镜导演配合

单张图片、关键帧和视觉设定使用本 Skill。需要将场景发展成多镜头视频、规划运镜、节奏、连续性和逐镜头视频提示词时，配合 [xianxia-cinematic-video-director](https://github.com/liyue-aigc/xianxia-cinematic-video-director) 使用。

两套 Skill 同时使用时，应只锁定一次画幅、空间尺度、饱和策略、建筑、人物、服装、材质、天气和光线方向。

## 注意事项

- Skill 负责生成视觉导演提示词，不绑定特定图片生成平台。
- 只有在用户明确要求直接生成图片时，才应调用可用的图片生成能力。
- 避免使用受版权保护的在世艺术家姓名模仿风格，应描述可观察的构图、材质、色彩和光线属性。
- `柔和鲜明`、`静谧朝圣` 等非内置参数可以作为用户自定义意图保留，但调用时应说明它们与内置镜头或饱和逻辑的映射关系。

## License

本仓库暂未附带开源许可证。仓库公开可见不等于授予复制、修改或再分发许可。
