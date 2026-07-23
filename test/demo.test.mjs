import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

describe('firecrawl demo scripts', () => {
  it('keyless scrape script exists and targets v2 scrape', () => {
    const src = readFileSync(join(root, 'scripts/keyless-scrape.mjs'), 'utf8')
    assert.match(src, /\/v2\/scrape/)
    assert.match(src, /api\.firecrawl\.dev/)
    assert.match(src, /Authorization/)
  })

  it('prebuilt compose override disables local builds', () => {
    const src = readFileSync(join(root, 'docker-compose.prebuilt.yaml'), 'utf8')
    assert.match(src, /ghcr\.io\/firecrawl\/firecrawl/)
    assert.match(src, /playwright-service/)
  })

  it('env template disables DB auth for local', () => {
    const src = readFileSync(join(root, '.env'), 'utf8')
    assert.match(src, /USE_DB_AUTHENTICATION=false/)
    assert.match(src, /PORT=3002/)
  })
})
