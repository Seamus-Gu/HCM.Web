<template>
  <div class="layout-sider">
    <transition name="el-fade-in">
      <div
        v-show="!isCollapse"
        class="layout-sider-mask"
        @click="closeSideBar"
      ></div>
    </transition>

    <div class="layout-sider-container">
      <div class="layout-sider-logo">
        <SideBarLogo :collapse="isCollapse"></SideBarLogo>
      </div>
      <div class="layout-sider-divider"></div>
      <el-scrollbar>
        <el-menu
          class="layout-sider-menu"
          :collapse="isCollapse"
          :collapseTransition="false"
          :defaultActive="activePath"
          :uniqueOpened="true"
        >
          <SubMenu
            v-for="(route, index) in siderRoutes"
            :key="route.path + index"
            :data="route"
          >
          </SubMenu>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import SideBarLogo from './SideBarLogo.vue'
import SubMenu from './SubMenu.vue'

import useAppStore from '@/store/modules/app'
import usePermissionStore from '@/store/modules/permission'

export default {
  name: 'SideBar',
  components: {
    SideBarLogo,
    SubMenu
  },
  setup() {
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()

    const isMin = computed(() => appStore.size == 'sm')
    const isCollapse = computed(() => appStore.collapse)

    const siderRoutes = computed(() => permissionStore.handleSiderRoutes)
    const activePath = computed(() => appStore.routePath)

    const methods = reactive({
      closeSideBar: () => {
        appStore.closeSideBar()
      }
    })

    return {
      isMin,
      isCollapse,
      siderRoutes,
      activePath,
      ...toRefs(methods)
    }
  }
}
</script>
