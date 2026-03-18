<template>
  <template v-if="!data.hidden">
    <el-sub-menu
      class="sub-menu"
      v-if="data.meta && data.children && data.children.length > 0"
      :index="data.path"
    >
      <template #title>
        <el-icon>
          <svg class="icon menu-icon" ariel-hidden="true">
            <use :xlink:href="'#icon-' + data.meta.icon" />
          </svg>
        </el-icon>
        <s-auto-text
          placement="right"
          :contont="data.meta.title"
          style="width: 90%"
        ></s-auto-text>
      </template>
      <sub-menu v-for="item in data.children" :key="item.id" :data="item" />
    </el-sub-menu>
    <el-menu-item
      v-else-if="data.meta"
      :index="data.path"
      class="menu-item"
      @click="goTarget"
    >
      <el-icon>
        <svg class="icon menu-icon" ariel-hidden="true">
          <use :xlink:href="'#icon-' + data.meta.icon" />
        </svg>
      </el-icon>
      <template #title>
        <s-auto-text
          placement="right"
          :contont="data.meta.title"
          style="width: 90%"
        ></s-auto-text>
      </template>
    </el-menu-item>
    <el-menu-item
      v-else
      :index="data.children[0].path"
      class="menu-one"
      @click="goTarget"
    >
      <el-icon>
        <svg class="icon menu-icon" ariel-hidden="true">
          <use :xlink:href="'#icon-' + data.children[0].meta.icon" />
        </svg>
      </el-icon>
      <template #title>
        <span>{{ data.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script>
import usePermissionStore from '@/store/modules/permission'

export default {
  name: 'SubMenu',
  props: {
    isHeader: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {},
  setup(props) {
    const permiussionStore = usePermissionStore()
    const router = useRouter()

    const routes = permiussionStore.routes

    const methods = reactive({
      goTarget(e) {
        router.push({ path: e.index })
      }
    })

    return {
      ...toRefs(methods)
    }
  }
}
</script>
