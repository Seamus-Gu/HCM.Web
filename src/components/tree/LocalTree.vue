<template>
  <div class="s-tree">
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
        :props="props"
        :emptyText="emptyText"
        :highlightCurrent="highlightCurrent"
        :defaultExpandAll="defaultExpandAll"
        :defaultExpandedKeys="defaultExpandedKeys"
        :filterNodeMethod="filterNode"
        @nodeClick="handleNodeClick"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SLocalTree',
  emits: ['nodeClick'],
  props: {
    data: {
      type: Array,
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
    props: {
      type: Object
    },
    //空数据文本
    emptyText: {
      type: String
    },
    loading: {
      type: Boolean
    }
  },
  setup(props, context) {
    const treeRef = ref()

    const treeData = reactive({
      searchValue: undefined,
      dataSource: undefined,
      defaultExpandedKeys: [],
      currentKey: undefined
    })

    const methods = reactive({
      init: async (query = {}) => {
        treeData.dataSource = props.data

        if (treeData.searchValue) {
          query[props.searchName] = treeData.searchValue
        }

        if (props.defaultOneExpand) {
          treeData.defaultExpandedKeys = treeData.dataSource.map(
            t => t[props.nodeKey]
          )
        }
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
      }
    })

    watch(
      () => props.data,
      () => {
        methods.init()
      },
      { immediate: true, deep: true }
    )

    return {
      treeRef,
      ...toRefs(treeData),
      ...toRefs(methods)
    }
  }
}
</script>
