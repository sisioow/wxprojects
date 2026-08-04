#!/usr/bin/env node
import { cpSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const slug = process.env.BOOK_SLUG || 'constraint-first-decision'
const bookDir = join(ROOT, 'books', slug)
const outRoot = join(ROOT, '.agents', 'skills')

const skills = ['constraint-first-decision', 'two-track-evidence', 'reversibility-ladder']

for (const name of skills) {
  const src = join(bookDir, name, 'SKILL.md')
  const destDir = join(outRoot, name)
  mkdirSync(destDir, { recursive: true })
  cpSync(src, join(destDir, 'SKILL.md'))
  console.log('installed', name, '->', destDir)
}

if (!existsSync(join(outRoot, 'cangjie-skill', 'SKILL.md'))) {
  console.warn('warn: cangjie-skill meta skill not found under .agents/skills')
}
