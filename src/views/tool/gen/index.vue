<template>
  <div class="gen-table-container">
    <s-row>
      <s-col :span="24">
        <s-panel>
          <s-query-form
            :filters="filters"
            :schema="querySchema"
            :queryLoad="queryLoad"
            :resetLoad="resetLoad"
            @query="handleQuery"
            @reset="handleReset"
          ></s-query-form>
        </s-panel>
      </s-col>
    </s-row>
    <s-row>
      <s-col :span="24">
        <s-panel>
          <s-tool-bar
            :addPer="['gen:genTable:add']"
            :columns="columns"
            @add="handleAdd"
            @refresh="handleRefresh"
          >
          </s-tool-bar>
          <s-table ref="tableRef" :api="getGenTableList" :columns="columns">
            <template #action="{ row }">
              <s-button
                v-has="['gen:genTable:genrate']"
                link
                type="primary"
                size="small"
                @click="handleEdit(row.id)"
              >
                生成报表
              </s-button>
              <s-button
                v-has="['gen:genTable:edit']"
                link
                type="primary"
                size="small"
                @click="handleEdit(row.id)"
              >
                修改
              </s-button>
              <s-button
                v-has="['gen:genTable:column']"
                link
                type="primary"
                size="small"
                @click="handleColumn(row)"
              >
                配置列
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['gen:genTable:remove']"
                link
                type="primary"
                size="small"
                @click="handleRemove(row.id)"
              >
                删除
              </s-button>
            </template>
          </s-table>
        </s-panel>
      </s-col>
    </s-row>
  </div>
</template>
<script setup>
import dayjs from 'dayjs'
import { getGenTableList, removeGenTable } from '@/api/tool/gen'

const querySchema = [
  {
    label: '名称',
    name: 'name',
    component: 'input'
  }
]

const columns = [
  {
    label: '命名空间',
    name: 'nameSpace',

    sortable: true
  },
  {
    label: '表名',
    name: 'tableName',
    sortable: true
  },
  {
    label: '名称',
    name: 'name',
    sortable: true
  },
  {
    label: '操作',
    name: 'action'
  }
]

const router = useRouter()
const { proxy } = getCurrentInstance()

const filters = ref({}) // Query Form 查询参数
const queryLoad = ref(false) // 查询Loading
const resetLoad = ref(false) // 重置Loading

const tableRef = ref() // Table Ref

function handleQuery() {
  queryLoad.value = true
  tableRef.value.reset(filters.value).finally(() => {
    queryLoad.value = false
  })
}

function handleReset() {
  filters.value = {}
  resetLoad.value = true
  tableRef.value.reset(filters.value).finally(() => {
    resetLoad.value = false
  })
}

function handleAdd() {
  router.push({
    path: '/tool/gen/add'
  })
}

function handleRefresh() {
  tableRef.value.refresh(filters.value)
}

function handleColumn(row) {
  router.push({
    path: '/tool/gen/column',
    query: { tableId: row.id }
  })
}

function handleEdit(id) {
  router.push({
    path: '/tool/gen/detail',
    query: { tableId: id }
  })
}

function handleRemove(id) {
  proxy.$modal.delete({
    success: () => {
      filters.value = {}
      return removeGenTable(id).then(() => {
        tableRef.value.reset(filters.value)
      })
    }
  })
}
</script>
