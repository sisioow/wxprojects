# Firecrawl（本文配套）

来源文章：[GitHub 上 13 万星的爬虫神器，不要 API Key 就能用了](https://mp.weixin.qq.com/s/Kk_Z4d3Ft7SKejgQoLCHXg)

上游仓库：[mendableai/firecrawl](https://github.com/mendableai/firecrawl) / [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)

## 三种用法（文章重点）

```bash
# 1) MCP（Claude Code 等，无需 Key）
claude mcp add --transport http firecrawl https://mcp.firecrawl.dev/v2/mcp

# 2) CLI
npx firecrawl-cli@latest

# 3) REST（无 Authorization）
curl -X POST https://api.firecrawl.dev/v2/scrape \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com","formats":["markdown"]}'
```

云端 Keyless 有 IP 风控；本环境若被拒，可用本地兼容服务或 Docker 自托管。

## 本仓库快速跑通

```bash
npm install
npm test

# 终端 A：本地兼容 /v2/scrape
npm run local:server

# 终端 B：抓取演示
npm run demo:local
# 或
FIRECRAWL_API_URL=http://127.0.0.1:3002 npm run demo -- https://example.com
```

### Docker 自托管（完整官方栈）

需 Docker Desktop 已启动：

```bash
cp .env.example .env   # 若无 .env
npm run selfhost:up
npm run selfhost:demo
```

预构建镜像覆盖见 `docker-compose.prebuilt.yaml`。
