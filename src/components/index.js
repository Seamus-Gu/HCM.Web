const modules = import.meta.glob('./**/*.vue', { eager: true })

export default {
  install(app) {
    Object.entries(modules).forEach(([path, component]) => {
      const exportVal = component.default
      if (!exportVal.name) {
        return
      }
      app.component(exportVal.name, exportVal)
    })
  }
}
