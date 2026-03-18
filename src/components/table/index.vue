<template>
  <div class="s-table">
    <el-table
      v-loading="loading"
      v-bind="$attrs"
      ref="tableRef"
      :data="dataSource"
      :border="border"
      :size="tableSize"
      :rowKey="rowKey"
      @sortChange="sortChange"
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

    <el-pagination
      class="table-pagination"
      :current-page="pageNum"
      :page-size="size"
      :page-sizes="pageSizeArr"
      :background="true"
      :layout="paginationLayout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import useSettingsStore from '@/store/modules/settings'

export default {
  name: 'STable',
  props: {
    // Table
    border: {
      type: Boolean,
      default: true
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    // Pagination
    paginationLayout: {
      type: String,
      default: 'total,prev, pager, 22next'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeArr: {
      type: Array,
      default: [10, 20, 50, 100]
    },
    pagerCenter: {
      type: Boolean,
      default: false
    },
    // Api
    api: {
      type: Function,
      required: true
    },
    defaultValue: {
      type: Object
    },
    columns: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const settingsStore = useSettingsStore()

    const dataSource = ref()

    const tableData = reactive({
      loading: false,
      tableRef: undefined,
      tableSize: computed(() => settingsStore.tableSize)
    })

    const paginationData = reactive({
      pageNum: 1,
      size: props.pageSize,
      total: 0
    })

    const queryParams = {
      sorter: {},
      query: {},
      filters: {}
    }

    const methods = reactive({
      getData: async () => {
        tableData.loading = true

        const queryData = {
          pageNum: paginationData.pageNum,
          pageSize: paginationData.size
        }

        Object.assign(
          queryData,
          queryParams.sorter,
          queryParams.query,
          queryParams.filters
        )

        if (props.defaultValue) {
          Object.assign(queryData, props.defaultValue)
        }

        await props
          .api(queryData)
          .then(res => {
            paginationData.total = res.data.total
            dataSource.value = res.data.items
          })
          .catch(() => {})
          .finally(() => {
            tableData.loading = false
          })

        return true
      },
      handleCurrentChange: pageNum => {
        paginationData.pageNum = pageNum

        methods.getData()
      },
      handleSizeChange: size => {
        paginationData.size = size

        methods.getData()
      },
      sortChange: sortData => {
        if (sortData.order) {
          queryParams.sorter = {
            order: sortData.order,
            sort: sortData.prop
          }
        } else {
          queryParams.sorter = {}
        }

        methods.getData()
      },
      // 刷新 不更改分页
      refresh: async (query, filters) => {
        queryParams.query = query
        queryParams.filters = filters

        await methods.getData()
        return true
      },
      // 重置 第一页
      reset: async (query, filters) => {
        paginationData.pageNum = 1
        queryParams.query = query
        queryParams.filters = filters

        await methods.getData()

        return true
      },
      getSelectionRows: () => {
        return tableData.tableRef.getSelectionRows()
      },
      toggleRowSelection: row => {
        return tableData.tableRef.toggleRowSelection(row, undefined)
      }
    })

    methods.getData()

    return {
      dataSource,
      ...toRefs(tableData),
      ...toRefs(paginationData),
      ...toRefs(methods)
    }
  }
}
</script>
