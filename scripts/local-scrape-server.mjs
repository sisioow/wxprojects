#!/usr/bin/env node
/**
 * Minimal local scrape stand-in when cloud keyless is IP-blocked
 * and Docker self-host is unavailable. Compatible with scripts/keyless-scrape.mjs
 */
import http from 'node:http'
import { convert } from 'html-to-text'

const PORT = Number(process.env.PORT || 3002)

function htmlToMarkdownLite(html, pageUrl) {
  const text = convert(html, {
    wordwrap: false,
    selectors: [
      { selector: 'a', options: { hideLinkHrefIfSameAsText: true } },
      { selector: 'img', format: 'skip' },
      { selector: 'script', format: 'skip' },
      { selector: 'style', format: 'skip' },
      { selector: 'nav', format: 'skip' },
      { selector: 'footer', format: 'skip' },
    ],
  })
  return `# Scraped\n\nSource: ${pageUrl}\n\n${text.trim()}\n`
}

async function scrape(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'firecrawl-local-demo/0.1' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`upstream ${res.status}`)
  const html = await res.text()
  const markdown = htmlToMarkdownLite(html, url)
  return {
    success: true,
    data: {
      markdown,
      metadata: {
        sourceURL: url,
        statusCode: res.status,
      },
    },
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && (req.url === '/' || req.url === '/health')) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: true, mode: 'local-demo' }))
    return
  }

  if (req.method === 'POST' && (req.url === '/v2/scrape' || req.url === '/v1/scrape')) {
    let raw = ''
    for await (const chunk of req) raw += chunk
    try {
      const body = JSON.parse(raw || '{}')
      if (!body.url) throw new Error('url required')
      const out = await scrape(body.url)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(out))
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: String(e.message || e) }))
    }
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'not found' }))
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`local firecrawl-compatible scrape on http://127.0.0.1:${PORT}`)
})
