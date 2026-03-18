<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <router-link to="/index">
          <svg class="icon" ariel-hidden="true" font-size="12px">
            <use xlink:href="#icon-home2" />
          </svg>
        </router-link>
      </el-breadcrumb-item>

      <template v-for="(item, index) in breadcrumbList" :key="index">
        <el-breadcrumb-item>
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  setup() {
    const route = useRoute()
    const breadcrumbList = ref()

    const methods = reactive({
      getBreadcrumb: () => {
        let matched = route.matched.filter(item => item.meta && item.meta.title)

        breadcrumbList.value = matched.filter(
          item => item.meta && item.meta.title && item.meta.breadcrumb !== false
        )
      },
      isDashboard: route => {
        const name = route && route.name
        if (!name) {
          return false
        }
        return name.trim() === 'Index'
      }
    })

    watchEffect(() => {
      methods.getBreadcrumb()
    })

    return {
      breadcrumbList,
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss" scoped></style>
