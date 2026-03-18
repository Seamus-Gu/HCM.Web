<template>
  <div class="s-local-table">
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

    <div v-if="hasPagination" class="table-pagination">
      <el-pagination
        layout="total,prev, pager, next"
        :total="total"
        :pageSize="pageSize"
        :background="true"
        :currentPage="pageNum"
        @currentChange="currentChange"
      />
    </div>
  </div>
</template>

<script>
import useSettingsStore from '@/store/modules/settings'

export default {
  name: 'SLocalTable',
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
    columns: {
      type: Object,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    // Pagination
    hasPagination: {
      type: Boolean,
      default: true
    },
    // Data
    data: {
      type: Array,
      default: [],
      required: true
    }
  },
  setup(props) {
    const settingsStore = useSettingsStore()

    const dataSource = computed(() => {
      const current = (paginationData.pageNum - 1) * props.pageSize

      const pageData = props.data.slice(
        current,
        paginationData.pageNum * props.pageSize
      )

      return pageData
    })

    const tableData = reactive({
      loading: false,
      tableRef: undefined,
      tableSize: computed(() => settingsStore.tableSize)
    })

    const paginationData = reactive({
      pageNum: 1,
      total: computed(() => props.data.length)
    })

    const queryParams = {
      sorter: {},
      query: {},
      filters: {}
    }

    const methods = reactive({
      currentChange: async pageNum => {
        tableData.loading = true

        setTimeout(() => {
          paginationData.pageNum = pageNum

          tableData.loading = false
        }, 200)
      },
      sortChange: sortData => {
        queryParams.sorter = {
          order: sortData.order,
          sort: sortData.prop
        }
      },
      // 刷新 不更改分页
      refresh: async (query, filters) => {
        queryParams.query = query
        queryParams.filters = filters

        return true
      },
      // 重置 第一页
      reset: async (query, filters) => {
        paginationData.pageNum = 1
        queryParams.query = query
        queryParams.filters = filters

        return true
      },
      getSelectionRows: () => {
        return tableData.tableRef.getSelectionRows()
      },
      toggleRowSelection: row => {
        return tableData.tableRef.toggleRowSelection(row, undefined)
      }
    })

    return {
      dataSource,
      ...toRefs(tableData),
      ...toRefs(paginationData),
      ...toRefs(methods)
    }
  }
}
</script>
