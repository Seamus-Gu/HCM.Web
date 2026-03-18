<template>
  <div class="s-tree s-edit-tree">
    <div v-if="hasSearch" class="tree-search">
      <s-input
        v-model="searchValue"
        :placeholder="searchPlaceholder"
        :clearable="true"
        @clear="clearSearch"
      >
        <template #suffix>
          <div class="search-icon cursor-pointer" @click="search">
            <svg class="icon" ariel-hidden="true" font-size="14px">
              <use xlink:href="#icon-search" />
            </svg>
          </div>
        </template>
      </s-input>
    </div>
    <div class="tree-main">
      <el-tree
        v-loading="loading"
        v-bind="$attrs"
        ref="treeRef"
        :data="dataSource"
        :nodeKey="nodeKey"
        :emptyText="emptyText"
        :highlightCurrent="highlightCurrent"
        :defaultExpandAll="defaultExpandAll"
        :defaultExpandedKeys="defaultExpandedKeys"
        :filterNodeMethod="filterNode"
        @nodeClick="handleNodeClick"
        @node-contextmenu="handleNodeContextMenu"
      >
        <template #default="{ node, data }">
          <span>{{ node.label }}</span>
        </template>
        <template v-if="$slots.switcherIcon" #switcherIcon>
          <slot name="switcherIcon"></slot>
        </template>
      </el-tree>
    </div>
    <div class="s-right-menu">
      <Teleport to="body">
        <div
          v-if="showMenu"
          ref="rightMenuRef"
          class="s-right-menu-popover"
          :style="{ left: `${left}px`, top: `${top}px` }"
        >
          <div class="right-menu-panel">
            <div class="right-menu-item" @click="handleAdd">
              <svg
                class="icon"
                ariel-hidden="true"
                font-size="15px"
                style="margin-right: 8px"
              >
                <use xlink:href="#icon-plus" />
              </svg>
              新增
            </div>
            <div class="right-menu-item" @click="handleEdit">
              <svg
                class="icon"
                ariel-hidden="true"
                font-size="15px"
                style="margin-right: 8px"
              >
                <use xlink:href="#icon-edit" />
              </svg>
              修改
            </div>
            <div class="right-menu-item" @click="handleDelete">
              <svg
                class="icon"
                ariel-hidden="true"
                font-size="15px"
                style="margin-right: 8px"
              >
                <use xlink:href="#icon-trash-alt" />
              </svg>
              删除
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from '@vueuse/core'

export default {
  name: 'SEditTree',
  emits: ['nodeClick', 'add', 'edit', 'del'],
  props: {
    api: {
      type: Function,
      required: true
    },
    hasSearch: {
      type: Boolean,
      default: true
    },
    searchPlaceholder: {
      type: String,
      default: '请输入搜索内容'
    },
    searchParamsName: {
      type: String,
      default: 'search'
    },
    //是否默认展开一级菜单
    defaultOneExpand: {
      type: Boolean,
      default: true
    },
    //默认全部展开
    defaultExpandAll: {
      type: Boolean
    },
    //高亮当前
    highlightCurrent: {
      type: Boolean,
      default: true
    },
    //树节点唯一标识字段
    nodeKey: {
      type: String,
      default: 'value'
    },
    //空数据文本
    emptyText: {
      type: String
    }
  },
  setup(props, context) {
    const treeRef = ref()

    const treeData = reactive({
      loading: false,
      searchValue: undefined,
      dataSource: undefined,
      defaultExpandedKeys: [],
      currentKey: undefined
    })

    const rightMenuData = reactive({
      showMenu: false,
      left: 0,
      top: 0,
      nodeData: undefined
    })

    const rightMenuRef = ref(null)

    const methods = reactive({
      init: async (query = {}) => {
        if (treeData.searchValue) {
          query[props.searchName] = treeData.searchValue
        }
        treeData.loading = true
        await props
          .api(query)
          .then(res => {
            treeData.dataSource = res.data
            if (props.defaultOneExpand) {
              treeData.defaultExpandedKeys = res.data.map(t => t[props.nodeKey])
            }
          })
          .finally(() => {
            treeData.loading = false
          })
      },
      filterNode: (value, data) => {
        if (!value) return true
        return data.label.includes(value)
      },
      search: () => {
        treeRef.value.filter(treeData.searchValue)
      },
      clearSearch: () => {
        treeRef.value.filter()
      },
      handleNodeClick: (node, nodeProps) => {
        let currentKey = treeRef.value.getCurrentKey()
        if (treeData.currentKey === currentKey) {
          treeData.currentKey = null
          treeRef.value.setCurrentKey()
          context.emit('nodeClick', {}, {})
        } else {
          treeData.currentKey = currentKey
          context.emit('nodeClick', node, nodeProps)
        }
      },
      refresh: query => {
        methods.init(query)
      },
      handleNodeContextMenu: (event, data) => {
        rightMenuData.showMenu = true
        rightMenuData.left = event.clientX
        rightMenuData.top = event.clientY
        rightMenuData.nodeData = data
      },
      handleCloseRightMenu: () => {
        rightMenuData.showMenu = false
      },
      handleAdd: async () => {
        await context.emit('add', rightMenuData.nodeData)
        rightMenuData.showMenu = false
      },
      handleEdit: async () => {
        await context.emit('edit', rightMenuData.nodeData)
        rightMenuData.showMenu = false
      },
      handleDelete: async () => {
        await context.emit('del', rightMenuData.nodeData)
        rightMenuData.showMenu = false
      }
    })

    methods.init()

    onClickOutside(rightMenuRef, () => {
      rightMenuData.showMenu = false
    })

    return {
      treeRef,
      rightMenuRef,
      ...toRefs(treeData),
      ...toRefs(rightMenuData),
      ...toRefs(methods)
    }
  }
}
</script>
