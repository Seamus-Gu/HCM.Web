import { createI18n } from 'vue-i18n'

export const DEFAULT_LOCALE = 'zh-CN'
export const FALLBACK_LOCALE = 'zh-CN'
export const LOCALE_STORAGE_KEY = 'locale'
export const SUPPORTED_LOCALES = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
]

const localeIndexLoaders = import.meta.glob('./*/index.js')

function normalizeLocale(locale) {
  const supportedLocales = SUPPORTED_LOCALES.map(item => item.value)

  return supportedLocales.includes(locale) ? locale : DEFAULT_LOCALE
}

async function loadLocaleMessages(locale) {
  const targetLocale = normalizeLocale(locale)
  const loader = localeIndexLoaders[`./${targetLocale}/index.js`]
  if (!loader) return {}
  const mod = await loader()
  return mod.default || mod
}

function setDocumentLanguage(locale) {
  document.documentElement.setAttribute('lang', locale)
}

const loadedLocales = new Set()

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages: {},
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false
})

export async function setLocale(locale) {
  const targetLocale = normalizeLocale(locale)

  if (!loadedLocales.has(targetLocale)) {
    const messages = await loadLocaleMessages(targetLocale)
    i18n.global.setLocaleMessage(targetLocale, messages)
    loadedLocales.add(targetLocale)
  }

  i18n.global.locale.value = targetLocale
  localStorage.setItem(LOCALE_STORAGE_KEY, targetLocale)
  setDocumentLanguage(targetLocale)

  return targetLocale
}

export default i18n
