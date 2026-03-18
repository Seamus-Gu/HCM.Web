const tabViewStore = defineStore('tabView', {
  state: () => ({
    views: [],
    catchViews: []
  }),
  actions: {
    addView(view) {
      if (this.views.some(t => t.path === view.path)) return
      this.views.push(Object.assign({}, view))
      if (view.meta.cache) {
        this.catchViews.push(view.name)
      }
    },
    delView(view) {
      return new Promise(resolve => {
        for (const [i, v] of this.views.entries()) {
          if (v.path === view.path) {
            this.views.splice(i, 1)
            break
          }
        }
        resolve([...this.views])
      })
    },
    delOthersViews(view) {
      return new Promise(resolve => {
        this.views = this.views.filter(
          t => t.meta.affix || t.path === view.path
        )
        this.catchViews = []
        resolve([...this.views])
      })
    },
    delAllViews(view) {
      return new Promise(resolve => {
        const affixTags = this.views.filter(tag => tag.meta.affix)
        this.views = affixTags
        this.catchViews = []
        resolve([...this.views])
      })
    }
  }
})

export default tabViewStore
