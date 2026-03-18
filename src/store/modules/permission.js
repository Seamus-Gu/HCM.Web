import { constantRoutes } from '@/router'
import { getRouters } from '@/api/core/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/parentView'

const modules = import.meta.glob('./../../views/**/*.vue')

const permissionStore = defineStore('permission', {
  state: () => ({
    routes: [],
    addRoutes: [],
    sideBarRouters: []
  }),
  actions: {
    generateRoutes() {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          const dData = JSON.parse(JSON.stringify(res.data))
          const sData = JSON.parse(JSON.stringify(res.data))
          const routes = filterAsyncRouter(dData)
          const sidebarRoutes = filterAsyncRouter(sData)
          this.addRoutes = routes
          this.routes = constantRoutes.concat(routes)
          this.sideBarRouters = constantRoutes.concat(sidebarRoutes)

          resolve(routes)
        })
      })
    },
    setSiderBarRoutes(routes) {
      this.sideBarRouters = routes
    }
  },
  getters: {
    handleSiderRoutes(state) {
      let data = state.sideBarRouters
      return data.filter(t => !t.hidden)
    }
  }
})

const loadView = view => {
  let result
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      result = () => modules[path]()
    }
  }
  return result
}

// 遍历后台传来的路由字符串，转换为组件对象
const filterAsyncRouter = asyncRouterMap => {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      switch (route.component) {
        case 'Layout':
          route.component = Layout
          break
        case 'ParentView':
          route.component = ParentView
          break
        default:
          route.component = loadView(route.component)
      }
    }
    if (route.children) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export default permissionStore
