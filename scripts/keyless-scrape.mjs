#!/usr/bin/env node
/**
 * Firecrawl keyless / self-host smoke demo
 * Article: https://mp.weixin.qq.com/s/Kk_Z4d3Ft7SKejgQoLCHXg
 *
 * Priority:
 * 1) FIRECRAWL_API_URL (self-host, e.g. http://127.0.0.1:3002)
 * 2) Cloud keyless https://api.firecrawl.dev (no Authorization)
 * 3) Optional FIRECRAWL_API_KEY for higher limits
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const url = process.argv[2] || 'https://example.com'
const base =
  process.env.FIRECRAWL_API_URL?.replace(/\/$/, '') ||
  'https://api.firecrawl.dev'
const apiKey = process.env.FIRECRAWL_API_KEY || ''

const headers = { 'Content-Type': 'application/json' }
if (apiKey) headers.Authorization = `Bearer ${apiKey}`

const endpoint = `${base}/v2/scrape`
const body = {
  url,
  formats: ['markdown'],
  onlyMainContent: true,
}

console.log(`POST ${endpoint}`)
console.log(`url=${url} key=${apiKey ? 'yes' : 'no (keyless)'}`)

const res = await fetch(endpoint, {
  method: 'POST',
  headers,
  body: JSON.stringify(body),
})
const json = await res.json()
if (!res.ok || json.success === false) {
  console.error('FAILED', res.status, json.error || json.message || json)
  process.exit(1)
}

const md = json.data?.markdown || json.markdown || ''
const outDir = join(ROOT, 'demo-output')
mkdirSync(outDir, { recursive: true })
const outFile = join(outDir, 'scrape.md')
writeFileSync(outFile, md, 'utf8')
console.log('OK markdown_chars=', md.length)
console.log('wrote', outFile)
console.log('--- preview ---')
console.log(md.slice(0, 400))
