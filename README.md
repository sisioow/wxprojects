# InstantID（身份保持生成）

> **本分支用途（wxprojects）**：单张参考图即可做身份保持的本地扩散引擎（非 Cursor Skill 格式）。  
> 英文原版：[README.en.md](README.en.md)  
> 上游：[instantX-research/InstantID](https://github.com/instantX-research/InstantID)

## 这是什么

InstantID 可在数秒内根据一张人脸参考图，在文生图/图生图流程中保持人物身份，适合本地换脸/角色一致性实验。

## 主要入口

| 文件/目录 | 说明 |
| --- | --- |
| `infer.py` | 基础推理 |
| `infer_full.py` / `infer_img2img.py` | 完整 / 图生图推理 |
| `gradio_demo/` | Gradio 演示 |
| `pipeline_stable_diffusion_xl_instantid*.py` | SDXL InstantID 管线 |
| `docs/` | 技术报告等文档 |

## 在本 monorepo 中如何拉取

```bash
git clone -b InstantID https://github.com/sisioow/wxprojects.git InstantID
```

权重与运行依赖请按英文 README / 项目页说明自行下载配置。
