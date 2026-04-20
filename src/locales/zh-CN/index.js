const modules = import.meta.glob('./*.json', { eager: true })

const messages = Object.create(null)

for (const [path, mod] of Object.entries(modules)) {
  const moduleName = path.replace(/^\.\//, '').replace(/\.json$/, '')
  messages[moduleName] = mod.default || mod
}

export default messages
