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
  name: 'STree',
  emits: ['nodeClick'],
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
      getList: res => {
        let expendList = []
        for (let item of res) {
          expendList.push(item[props.nodeKey])
          if (item.children != null && item.children.length) {
            expendList = expendList.concat(methods.getList(item.children))
          }
        }
        return expendList
      },
      allCheck: isAllCheck => {
        treeRef.value.setCheckedKeys(
          isAllCheck ? treeData.dataSource.map(t => t.value) : []
        )
      },
      allExpend: isExpend => {
        let keys = methods.getList(treeData.dataSource)

        keys.forEach(element => {
          treeRef.value.store.nodesMap[element].expanded = isExpend
        })
      },
      getCheckedKeys: () => {
        const halfList = treeRef.value.getHalfCheckedKeys() ?? []
        const checkList = treeRef.value.getCheckedKeys() ?? []
        return halfList.concat(checkList)
      },
      setCheckedKeys: keys => {
        treeRef.value.setCheckedKeys(keys)
      }
    })

    methods.init()

    return {
      treeRef,
      ...toRefs(treeData),
      ...toRefs(methods)
    }
  }
}
</script>
