import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dryRun = process.argv.includes('--dry-run')

const IGNORE_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  '.vite',
  '.idea',
  '.vscode'
])

const TEXT_EXT = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.vue',
  '.json',
  '.scss',
  '.css',
  '.md',
  '.mjs',
  '.cjs',
  '.html',
  '.yml',
  '.yaml'
])

const IGNORE_FILES = new Set([
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock'
])

function toKebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

function rel(p) {
  return path.relative(root, p).replace(/\\/g, '/')
}

function joinPosix(...parts) {
  return parts.join('/').replace(/\\/g, '/').replace(/\/+/g, '/')
}

function walkDirs(current, out = []) {
  const entries = fs.readdirSync(current, { withFileTypes: true })
  for (const e of entries) {
    if (!e.isDirectory()) continue
    if (IGNORE_DIRS.has(e.name)) continue
    const abs = path.join(current, e.name)
    out.push(abs)
    walkDirs(abs, out)
  }
  return out
}

const allDirs = walkDirs(root)
let mappings = allDirs
  .map(abs => {
    const base = path.basename(abs)
    const kebab = toKebab(base)
    if (base === kebab) return null
    const parent = path.dirname(abs)
    return {
      oldAbs: abs,
      newAbs: path.join(parent, kebab),
      oldRel: rel(abs),
      newRel: rel(path.join(parent, kebab)),
      oldBase: base,
      newBase: kebab
    }
  })
  .filter(Boolean)

// Parent-first collisions.
const targetMap = new Map()
for (const m of mappings) {
  const key = m.newAbs.toLowerCase()
  if (!targetMap.has(key)) targetMap.set(key, [])
  targetMap.get(key).push(m.oldAbs)
}
for (const [target, sources] of targetMap.entries()) {
  if (sources.length > 1) {
    console.error('Collision detected:', target, sources)
    process.exit(1)
  }
}

// Skip if target already exists and is not the same folder.
for (const m of mappings) {
  if (
    fs.existsSync(m.newAbs) &&
    m.oldAbs.toLowerCase() !== m.newAbs.toLowerCase()
  ) {
    console.error('Target already exists:', m.newRel)
    process.exit(1)
  }
}

// Rename deep paths first.
mappings.sort((a, b) => b.oldRel.split('/').length - a.oldRel.split('/').length)

function collectTextFiles(current, out = []) {
  const entries = fs.readdirSync(current, { withFileTypes: true })
  for (const e of entries) {
    const abs = path.join(current, e.name)
    if (e.isDirectory()) {
      if (IGNORE_DIRS.has(e.name)) continue
      collectTextFiles(abs, out)
      continue
    }
    if (IGNORE_FILES.has(e.name)) continue
    const ext = path.extname(e.name).toLowerCase()
    if (TEXT_EXT.has(ext)) out.push(abs)
  }
  return out
}

function buildReplacements(m) {
  const pairs = []

  // Absolute repo-relative mentions.
  pairs.push([m.oldRel, m.newRel])

  // src/... -> ... and @/... variants.
  if (m.oldRel.startsWith('src/')) {
    const sOld = m.oldRel.slice(4)
    const sNew = m.newRel.slice(4)
    pairs.push([sOld, sNew])
    pairs.push([`@/${sOld}`, `@/${sNew}`])
  }

  // mock/... -> ... variants used by route component strings.
  if (m.oldRel.startsWith('mock/')) {
    const sOld = m.oldRel.slice(5)
    const sNew = m.newRel.slice(5)
    pairs.push([sOld, sNew])
  }

  // Relative import patterns.
  pairs.push([`./${m.oldBase}`, `./${m.newBase}`])
  pairs.push([`../${m.oldBase}`, `../${m.newBase}`])
  pairs.push([`/${m.oldBase}/`, `/${m.newBase}/`])
  pairs.push([`/${m.oldBase}'`, `/${m.newBase}'`])
  pairs.push([`/${m.oldBase}\"`, `/${m.newBase}\"`])
  pairs.push([`/${m.oldBase}\``, `/${m.newBase}\``])
  pairs.push([`/${m.oldBase})`, `/${m.newBase})`])

  // Deduplicate.
  const seen = new Set()
  return pairs.filter(([o]) => {
    if (seen.has(o)) return false
    seen.add(o)
    return true
  })
}

const replacementPairs = mappings.flatMap(buildReplacements)

const fileChanges = []
for (const file of collectTextFiles(root)) {
  const before = fs.readFileSync(file, 'utf8')
  let after = before
  for (const [oldStr, newStr] of replacementPairs) {
    if (!oldStr || oldStr === newStr) continue
    if (after.includes(oldStr)) {
      after = after.split(oldStr).join(newStr)
    }
  }
  if (after !== before) {
    fileChanges.push({ file: rel(file), before, after })
  }
}

console.log('Folders to rename:', mappings.length)
for (const m of mappings) {
  console.log(`- ${m.oldRel} -> ${m.newRel}`)
}
console.log('Files to update:', fileChanges.length)
for (const c of fileChanges) {
  console.log(`- ${c.file}`)
}

if (dryRun) {
  console.log('Dry run only. No filesystem changes were made.')
  process.exit(0)
}

// Write file content updates first so old paths are still valid.
for (const c of fileChanges) {
  fs.writeFileSync(path.join(root, c.file), c.after, 'utf8')
}
for (const m of mappings) {
  fs.renameSync(m.oldAbs, m.newAbs)
}

const rollback = mappings
  .map(m => ({ from: m.newRel, to: m.oldRel }))
  .sort((a, b) => b.from.split('/').length - a.from.split('/').length)

fs.writeFileSync(
  path.join(root, '.kebab-rename-rollback.json'),
  JSON.stringify(rollback, null, 2),
  'utf8'
)

console.log('Done. Rollback map written to .kebab-rename-rollback.json')
