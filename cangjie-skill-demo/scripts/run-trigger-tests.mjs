#!/usr/bin/env node
/**
 * Rule-based trigger intent check for test-prompts.json (demo / CI).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const slug = process.env.BOOK_SLUG || 'constraint-first-decision'
const bookDir = join(ROOT, 'books', slug)

const RULES = {
  'constraint-first-decision': {
    positive: [/方案|选项|选不出|招人|硬约束|constraint/i],
    negative: [/总结.*目录|天气|预算|日活|投放/i],
  },
  'two-track-evidence': {
    positive: [/预算|指标|不对劲|过程|结果|证据/i],
    negative: [/天气|选项|方案/i],
  },
  'reversibility-ladder': {
    positive: [/切换|供应商|快推|调研|可逆|不可逆/i],
    negative: [/诗|硬性限制|硬约束/i],
  },
}

let total = 0
let passed = 0

const skillDirs = readdirSync(bookDir).filter((name) => {
  const p = join(bookDir, name)
  return statSync(p).isDirectory() && !['candidates', 'rejected'].includes(name)
})

for (const skill of skillDirs) {
  const file = join(bookDir, skill, 'test-prompts.json')
  const { cases } = JSON.parse(readFileSync(file, 'utf8'))
  const rule = RULES[skill]
  if (!rule) continue

  for (const c of cases) {
    total++
    const text = c.prompt
    const should = c.expect_trigger
    const hitPos = rule.positive.some((r) => r.test(text))
    const hitNeg = rule.negative.some((r) => r.test(text))
    const predicted = should ? hitPos && !hitNeg : hitNeg || !hitPos
    if (predicted) {
      passed++
      console.log(`PASS ${skill}#${c.id}`)
    } else {
      console.error(`FAIL ${skill}#${c.id} expect=${should} prompt=${text}`)
      process.exitCode = 1
    }
  }
}

console.log(`\nTrigger checks: ${passed}/${total}`)
if (process.exitCode) process.exit(process.exitCode)
