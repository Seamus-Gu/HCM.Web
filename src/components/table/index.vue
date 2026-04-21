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
        v-for="item in columns.filter(item => item.visible !== false)"
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
      v-if="hasPagination"
      class="table-pagination"
      v-model:current-page="pageNum"
      v-model:page-size="size"
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
    border: {
      type: Boolean,
      default: true
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    paginationLayout: {
      type: String,
      default: 'total, prev, pager, next'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeArr: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    pagerCenter: {
      type: Boolean,
      default: false
    },
    api: {
      type: [Function, Object],
      required: true
    },
    default: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const settingsStore = useSettingsStore()

    const dataSource = ref([])
    const loading = ref(false)
    const tableRef = ref()
    const tableSize = computed(() => settingsStore.tableSize)

    const pageNum = ref(1)
    const size = ref(props.pageSize)
    const total = ref(0)

    const queryParams = reactive({
      sorter: {},
      query: {},
      filters: {}
    })

    const methods = reactive({
      getData: async () => {
        loading.value = true

        const queryData = {
          pageNum: pageNum.value,
          pageSize: size.value,
          ...queryParams.sorter,
          ...queryParams.query,
          ...queryParams.filters,
          ...props.default
        }

        try {
          const res = await props.api(queryData)
          total.value = res?.data?.total || 0
          dataSource.value = res?.data?.items || []
        } catch (_) {
          dataSource.value = []
          total.value = 0
          return false
        } finally {
          loading.value = false
        }

        return true
      },
      handleCurrentChange: currentPage => {
        pageNum.value = currentPage
        return methods.getData()
      },
      handleSizeChange: pageSize => {
        size.value = pageSize
        pageNum.value = 1

        return methods.getData()
      },
      sortChange: sortData => {
        queryParams.sorter = sortData.order
          ? {
              order: sortData.order,
              sort: sortData.prop
            }
          : {}

        pageNum.value = 1
        return methods.getData()
      },
      // 刷新 不更改分页
      refresh: async (query, filters) => {
        queryParams.query = query
        queryParams.filters = filters

        return await methods.getData()
      },
      // 重置 第一页
      reset: async (query, filters) => {
        pageNum.value = 1
        queryParams.query = query
        queryParams.filters = filters

        return await methods.getData()
      },
      getSelectionRows: () => {
        return tableRef.value?.getSelectionRows() || []
      },
      toggleRowSelection: row => {
        return tableRef.value?.toggleRowSelection(row, undefined)
      }
    })

    methods.getData()

    return {
      dataSource,
      loading,
      tableRef,
      tableSize,
      pageNum,
      size,
      total,
      ...toRefs(methods)
    }
  }
}
</script>
