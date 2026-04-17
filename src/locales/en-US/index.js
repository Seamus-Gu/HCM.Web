// 扫描当前目录下所有 .json 文件，以文件名（不含扩展名）作为模块命名空间前缀
const modules = import.meta.glob('./*.json', { eager: true })

const messages = Object.create(null)

for (const [path, mod] of Object.entries(modules)) {
  const moduleName = path.replace(/^\.\//, '').replace(/\.json$/, '')
  messages[moduleName] = mod.default || mod
}

export default messages
