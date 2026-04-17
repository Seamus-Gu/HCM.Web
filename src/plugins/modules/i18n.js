import i18n, { setupI18n } from '../../locales'

setupI18n()

export default function setupElementPlus(app) {
  app.use(i18n)
}
