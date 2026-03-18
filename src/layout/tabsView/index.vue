<template>
  <el-card class="tabs-container">
    <el-row>
      <el-tabs
        type="card"
        :class="{ smooth: show }"
        v-model="tabActive"
        @tab-click="handleTabClick"
        @tab-remove="handleRemove"
      >
        <el-tab-pane
          v-for="item in views"
          :key="item.path"
          :name="item.path"
          :label="item.meta.title"
          :closable="!item.meta.affix"
        >
        </el-tab-pane>
      </el-tabs>
      <TabMenu @command="handleDropdownClick"></TabMenu>
    </el-row>
  </el-card>
</template>

<script>
import TabMenu from './TabMenu'

import useAppStore from '@/store/modules/app'
import usePermissionStore from '@/store/modules/permission'
import useTabViewStore from '@/store/modules/tabs-view'
import useSettingsStore from '@/store/modules/settings'

export default {
  components: {
    TabMenu
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const appStore = useAppStore()
    const permissionStore = usePermissionStore()
    const tabViewStore = useTabViewStore()
    const settingsStore = useSettingsStore()

    const routes = computed(() => permissionStore.routes)
    const views = computed(() => tabViewStore.views)
    const show = computed(() => settingsStore.screenFullSwitch)

    const tabActive = computed({
      get: () => appStore.routePath,
      set: tab => {
        appStore.setRoutePath(tab)
      }
    })

    const methods = reactive({
      initTags: routes => {
        routes
          .filter(t => !t.hidden)
          .forEach(route => {
            if (route.meta && route.meta.affix) {
              tabViewStore.addView(route)
            }
            if (route.children) {
              methods.initTags(route.children)
            }
          })
        tabViewStore.addView(route)
      },
      addTabs: routePath => {
        const { path } = routePath

        tabViewStore.addView(routePath)
        appStore.setRoutePath(path)
      },
      handleTabClick: pane => {
        router.push({ path: pane.paneName })
      },
      handleRemove: pane => {
        const view = views.value.find(item => item.path === pane)
        tabViewStore.delView(view)
        if (tabActive.value === pane) {
          methods.toLastTab()
        }
      },
      toLastTab: () => {
        const latestView = views.value.slice(-1)[0]
        router.push({ path: latestView.path })
      },
      handleDropdownClick: command => {
        if (command == '0') {
          const view = views.value.find(
            item => item.path === tabActive.value && item.meta.affix != true
          )
          tabViewStore.delView(view)
          if (tabActive.value === tabActive.value) {
            methods.toLastTab()
          }
        } else if (command == '1') {
          tabViewStore.delOthersViews(route)
        } else {
          tabViewStore.delAllViews(route)
          methods.toLastTab()
        }
      }
    })

    onMounted(() => {
      methods.initTags(routes.value)
    })

    watch(route, () => {
      methods.addTabs(route)
    })

    return {
      show,
      tabActive,
      views,
      ...toRefs(methods)
    }
  }
}
</script>
