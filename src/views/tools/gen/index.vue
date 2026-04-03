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
            :addPer="['gen:gen-table:add']"
            :columns="columns"
            @add="handleAdd"
            @refresh="handleRefresh"
          >
          </s-tool-bar>
          <s-table ref="tableRef" :api="getGenTableList" :columns="columns">
            <template #action="{ row }">
              <s-button
                v-has="['gen:gen-table:generate']"
                link
                type="primary"
                size="small"
                @click="handleGenerate(row.id)"
              >
                生成报表
              </s-button>
              <s-button
                v-has="['gen:gen-table:edit']"
                link
                type="primary"
                size="small"
                @click="handleEdit(row.id)"
              >
                修改
              </s-button>
              <s-button
                v-has="['gen:gen-table:column']"
                link
                type="primary"
                size="small"
                @click="handleColumn(row)"
              >
                配置列
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['gen:gen-table:remove']"
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

    <s-form
      ref="formRef"
      :title="t('gen.gen-table.generate-by-sql')"
      :schema="formSchema"
      :visible="formVisible"
      :model="formState"
      :rules="formRules"
      :confirmLoading="confirmLoading"
      @confirm="handleSubmit"
      @close="handleClose"
    >
      <template #sysDeptId>
        <s-flex-col :span="24">
          <s-form-item label="部门" prop="sysDeptId" label-width="84px">
            <s-tree-select
              v-model="formState['sysDeptId']"
              :data="treeDataSource"
              :check-strictly="true"
              placeholder="请选择部门"
            ></s-tree-select>
          </s-form-item>
        </s-flex-col>
      </template>
    </s-form>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { getGenTableList, removeGenTable } from '@/api/gen/gen-table'
import { generateData } from '@/api/gen/sql'

const { t, locale } = useI18n()

const querySchema = [
  {
    label: '名称',
    name: 'name',
    component: 'input'
  }
]

const columns = [
  {
    label: t('gen.gen-table.nameSpace'),
    name: 'nameSpace',

    sortable: true
  },
  {
    label: t('gen.gen-table.tableName'),
    name: 'tableName',
    sortable: true
  },
  {
    label: t('common.operation'),
    name: 'action'
  }
]

const formSchema = [
  {
    label: t('gen.gen-table.sql'),
    name: 'sqlStr',
    component: 'input',
    span: 24,
    props: {
      type: 'textarea',
      rows: 10
    }
  }
]

const formRules = {
  sqlStr: [
    {
      required: true,
      message: t('gen.gen-table.sql') + t('common.required'),
      trigger: 'blur'
    }
  ]
}

const router = useRouter()
const { proxy } = getCurrentInstance()

const filters = ref({}) // Query Form 查询参数
const queryLoad = ref(false) // 查询Loading
const resetLoad = ref(false) // 重置Loading
const tableRef = ref() // Table Ref

const formVisible = ref(false) // Form 打开关闭
const confirmLoading = ref(false) // Form 确认Loading
const formRef = ref() // Form Ref

const formState = ref({
  sqlStr: undefined
})

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
  formVisible.value = true
}

function handleRefresh() {
  tableRef.value.refresh(filters.value)
}

function handleGenerate(id) {}

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

function handleClose() {
  formVisible.value = false
  formRef.value.resetFields()
  handleResetForm()
}

function handleResetForm() {
  formState.value = {
    sqlStr: undefined
  }
}
// 提交按钮
function handleSubmit() {
  formRef.value.validate().then(() => {
    confirmLoading.value = true

    generateData(formState.value)
      .then(() => {
        tableRef.value.reset()
      })
      .finally(() => {
        handleClose()
        confirmLoading.value = false
      })

    handleResetForm()
  })
}
</script>
