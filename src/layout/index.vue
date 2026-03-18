<template>
  <div :class="layoutClass">
    <SideBar></SideBar>

    <div class="layout-container">
      <Header></Header>
      <AppMain></AppMain>
    </div>

    <Setting></Setting>
  </div>
</template>
<script>
import SideBar from './sideBar'
import Header from './header'
import AppMain from './appMain'
import Setting from './setting'

import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'

export default {
  name: 'Layout',
  components: {
    SideBar,
    Header,
    AppMain,
    Setting
  },
  setup() {
    const route = useRoute()

    const appStore = useAppStore()
    const settingsStore = useSettingsStore()

    const size = computed(() => appStore.size)
    const isCollapse = computed(() => appStore.collapse)

    const layoutClass = computed(() => {
      return [
        'layout-wrapper',
        `layout-${size.value}`,
        isCollapse.value && 'layout-collapse'
      ]
    })

    const methods = reactive({
      init: async () => {
        appStore.setRoutePath(route.path)
        await settingsStore.initSetting()
      }
    })

    methods.init()

    return {
      layoutClass,
      ...toRefs(methods)
    }
  }
}
</script>
