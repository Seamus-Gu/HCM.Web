import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from '@/locales'

const appStore = defineStore('app', {
  state: () => ({
    language: localStorage.getItem(LOCALE_STORAGE_KEY) || DEFAULT_LOCALE,
    size: 'lg', // sm,md,lg
    collapse: false,
    routePath: '/index'
  }),
  actions: {
    toggleSideBar() {
      this.collapse = !this.collapse
    },
    openSideBar() {
      this.collapse = false
    },
    closeSideBar() {
      this.collapse = true
    },
    setSize(size) {
      this.size = size
    },
    setLanguage(language) {
      this.language = language
    },
    setRoutePath(routePath) {
      this.routePath = routePath
    }
  }
})

export default appStore
