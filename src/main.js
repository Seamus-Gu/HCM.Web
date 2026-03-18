import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import { loadAllPlugins, loadAllProxy, loadAllDirective } from './plugins'

import 'virtual:svg-icons-register'
import './permission'

const app = createApp(App)

loadAllPlugins(app)

loadAllProxy(app)

loadAllDirective(app)

app.use(store)
app.use(router)
app.mount('#app')
