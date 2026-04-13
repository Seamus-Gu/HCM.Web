import { createI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

const modules = import.meta.glob('./modules/**/*.json', { eager: true })

function deepMerge(target = {}, source = {}) {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      target[key] = deepMerge(target[key] || {}, source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

function loadMessages() {
  const messages = Object.create(null)

  for (const [path, mod] of Object.entries(modules)) {
    const match = path.match(/modules\/(.+)\/(.+)\.json$/)
    if (!match) continue
    const [, , locale] = match
    if (!messages[locale]) messages[locale] = {}

    messages[locale] = deepMerge(messages[locale], mod.default)
  }

  return messages
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: loadMessages(),
  globalInjection: true
})

// const stores = useThemeConfig(pinia)
// const { themeConfig } = storeToRefs(stores)

// const i18n = createI18n({
//   legacy: false,           // 使用 Composition API 模式
//   locale: localStorage.getItem('locale') || 'zh-CN',
//   fallbackLocale: {
//     'zh-HK': ['zh-CN', 'en-US'],
//     'zh-TW': ['zh-CN', 'en-US'],
//     default: ['en-US']
//   },
//   messages: loadMessages(),
//   missingWarn: false,      // 生产环境关闭警告
//   fallbackWarn: false,
//   // 数字、日期本地化配置
//   numberFormats: {
//     'zh-CN': {
//       currency: {
//         style: 'currency',
//         currency: 'CNY',
//         notation: 'standard'
//       }
//     },
//     'en-US': {
//       currency: {
//         style: 'currency',
//         currency: 'USD',
//         notation: 'standard'
//       }
//     }
//   },
//   datetimeFormats: {
//     'zh-CN': {
//       short: {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit'
//       },
//       long: {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit'
//       }
//     }
//   }
// })

// export async function setLocale(locale: string) {
//   // 如需按需加载，可在此动态 import
//   // const messages = await import(`./locales/${locale}.ts`)
//   // i18n.global.setLocaleMessage(locale, messages.default)

//   i18n.global.locale.value = locale
//   localStorage.setItem('locale', locale)
//   document.querySelector('html')?.setAttribute('lang', locale)
// }

export default i18n
