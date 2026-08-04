#!/usr/bin/env node
/**
 * Validate cangjie-skill RIA-TV++ output structure for a distilled book slug.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const slug = process.env.BOOK_SLUG || 'constraint-first-decision'
const bookDir = join(ROOT, 'books', slug)

const REQUIRED_ROOT = [
  'PIPELINE_STATE.md',
  'BOOK_OVERVIEW.md',
  'verified.md',
  'INDEX.md',
  'GLOSSARY.md',
  'DIGEST.md',
]

const REQUIRED_SKILL_SECTIONS = [
  '## R — 原文',
  '## I — 方法论骨架',
  '## A1 —',
  '## A2 — 触发场景',
  '## E — 可执行步骤',
  '## B — 边界',
]

function fail(msg) {
  console.error('FAIL', msg)
  process.exit(1)
}

function ok(msg) {
  console.log('OK', msg)
}

if (!existsSync(bookDir)) fail(`missing book dir ${bookDir}`)

for (const f of REQUIRED_ROOT) {
  const p = join(bookDir, f)
  if (!existsSync(p)) fail(`missing ${f}`)
  ok(`root file ${f}`)
}

if (!existsSync(join(bookDir, 'candidates'))) fail('missing candidates/')
if (!existsSync(join(bookDir, 'rejected'))) fail('missing rejected/')

const verified = readFileSync(join(bookDir, 'verified.md'), 'utf8')
const skillDirs = readdirSync(bookDir).filter((name) => {
  const p = join(bookDir, name)
  return statSync(p).isDirectory() && !['candidates', 'rejected'].includes(name)
})

if (skillDirs.length < 1) fail('no skill directories found')
ok(`skill dirs: ${skillDirs.join(', ')}`)

for (const name of skillDirs) {
  if (!verified.includes(name)) fail(`verified.md does not mention skill ${name}`)
  const skillMd = join(bookDir, name, 'SKILL.md')
  const tests = join(bookDir, name, 'test-prompts.json')
  const results = join(bookDir, name, 'test-results.md')
  if (!existsSync(skillMd)) fail(`${name}/SKILL.md missing`)
  if (!existsSync(tests)) fail(`${name}/test-prompts.json missing`)
  if (!existsSync(results)) fail(`${name}/test-results.md missing`)

  const body = readFileSync(skillMd, 'utf8')
  if (!body.startsWith('---')) fail(`${name}/SKILL.md missing frontmatter`)
  for (const sec of REQUIRED_SKILL_SECTIONS) {
    if (!body.includes(sec)) fail(`${name}/SKILL.md missing section ${sec}`)
  }

  const prompts = JSON.parse(readFileSync(tests, 'utf8'))
  if (!Array.isArray(prompts.cases) || prompts.cases.length < 3) {
    fail(`${name}/test-prompts.json needs >=3 cases`)
  }
  ok(`skill ${name} structure`)
}

console.log(`\nAll checks passed for books/${slug}`)
