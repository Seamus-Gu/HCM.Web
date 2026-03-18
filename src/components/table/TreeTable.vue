<template>
  <div class="s-tree-table">
    <el-table
      v-if="refreshTable"
      v-loading="loading"
      v-bind="$attrs"
      :data="dataSource"
      :border="border"
      :size="tableSize"
      :rowKey="rowKey"
      :defaultExpandAll="isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <template
        v-for="item in columns.filter(t => t.visible != false)"
        :key="item.index"
      >
        <el-table-column
          :type="item.type"
          :label="item.label"
          :prop="item.name"
          :width="item.width"
          :minWidth="item.minWidth"
          :fixed="item.fixed"
          :sortable="item.sortable ? 'custom' : false"
          :resizable="item.resizable"
          :formatter="item.formatter"
        >
          <template v-if="$slots[item.name]" #default="slotData">
            <slot
              :name="item.name"
              :row="slotData.row"
              :column="slotData.column"
              :$index="slotData.$index"
            ></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import useSettingsStore from '@/store/modules/settings'

export default {
  name: 'STreeTable',
  props: {
    border: {
      type: Boolean,
      default: true
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    api: {
      type: Function,
      required: true
    },
    columns: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const settingsStore = useSettingsStore()

    const dataSource = ref()

    const treeTableData = reactive({
      loading: false,
      tableSize: computed(() => settingsStore.tableSize),
      isExpandAll: false,
      refreshTable: true
    })

    const queryParams = {
      sorter: {},
      query: {},
      filters: {}
    }

    const methods = reactive({
      getData: async () => {
        treeTableData.loading = true

        const queryData = {}

        Object.assign(
          queryData,
          queryParams.sorter,
          queryParams.query,
          queryParams.filters
        )

        await props
          .api(queryData, props.defaultValue)
          .then(res => {
            dataSource.value = res.data
            props.defaultExtends &&
              (treeTableData.expandedRowKeys = res.data.map(
                t => t[props.idName]
              ))
            treeTableData.loading = false
          })
          .catch(() => {})
          .finally(() => {
            treeTableData.loading = false
          })

        return true
      },
      allExpand: async () => {
        treeTableData.refreshTable = false
        treeTableData.isExpandAll = !treeTableData.isExpandAll
        nextTick(() => {
          treeTableData.refreshTable = true
          return true
        })
      },
      refresh: async (query, filters) => {
        queryParams.query = query
        queryParams.filters = filters

        await methods.getData()
        return true
      },
      reset: async (query, filters) => {
        queryParams.query = query
        queryParams.filters = filters

        await methods.getData()

        return true
      }
    })

    methods.getData()

    return {
      dataSource,
      ...toRefs(treeTableData),
      ...toRefs(methods)
    }
  }
}
</script>
