export function loadAllPlugins(app) {
  const files = import.meta.glob('./modules/*.js', { eager: true })

  Object.keys(files).forEach(item => {
    files[item].default(app)
  })
}

import msg from './proxy/msg'
import modal from './proxy/modal'
// import notify from './proxy/notify'

export function loadAllProxy(app) {
  app.config.globalProperties.$modal = modal
  app.config.globalProperties.$msg = msg
  // app.config.globalProperties.$notify = notify
}

import has from './directive/v-has'
import copyText from './directive/v-copy-text'

export function loadAllDirective(app) {
  app.directive('has', has)
  app.directive('copyText', copyText)
}
