<template>
  <el-main class="layout-main">
    <TabsView v-if="showTabView"></TabsView>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script>
import TabsView from '../tabsView'

import useSettingsStore from '@/store/modules/settings'
import usetabViewStore from '@/store/modules/tabs-view'

export default {
  components: {
    TabsView
  },
  setup() {
    const settingsStore = useSettingsStore()
    const tabViewStore = usetabViewStore()

    const cachedViews = computed(() => tabViewStore.views)
    const affixHeader = computed(() => settingsStore.affixHeader)
    const showTabView = computed(() => settingsStore.showTabView)

    return {
      cachedViews,
      affixHeader,
      showTabView
    }
  }
}
</script>
