const appStore = defineStore('app', {
  state: () => ({
    language: 'zh-cn',
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
    setRoutePath(routePath) {
      this.routePath = routePath
    }
  }
})

export default appStore
