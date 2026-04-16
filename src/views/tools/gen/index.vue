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
                v-has="['gen:gen-table:edit']"
                link
                type="primary"
                size="small"
                @click="handleEdit(row.id)"
              >
                {{ t('common.edit') }}
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['gen:gen-table:generate']"
                link
                type="primary"
                size="small"
                @click="handleGenerate(row.id)"
              >
                {{ t('gen.gen-table.generate-code') }}
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['gen:gen-table:remove']"
                link
                type="primary"
                size="small"
                @click="handleRemove(row.id)"
              >
                {{ t('common.remove') }}
              </s-button>
            </template>
          </s-table>
        </s-panel>
      </s-col>
    </s-row>

    <s-form
      ref="addFormRef"
      :title="t('gen.gen-table.generate-by-sql')"
      :schema="addFormSchema"
      :visible="addFormVisible"
      :model="addFormState"
      :rules="addFormRules"
      :confirmLoading="confirmLoading"
      @confirm="handleSubmit"
      @close="handleClose"
    >
    </s-form>

    <s-dialog
      v-model="dialogVisible"
      width="80%"
      :title="t('gen.gen-table.code-preview')"
    >
      <s-tabs v-model="tabVal" @tab-change="handleChangeTab">
        <template v-for="(item, index) in codeList">
          <s-tab-pane :label="item.name" :name="index">
            <s-panel height="520px" :scrollY="false">
              <s-button
                circle
                style="float: right; position: absolute; right: 6%; z-index: 10"
                v-copy-text="item.code"
                v-copyText:callback="copyTextSuccess"
              >
                <svg class="icon" ariel-hidden="true">
                  <use xlink:href="#icon-copy" />
                </svg>
              </s-button>
              <Codemirror
                v-if="tabVal === index"
                :value="item.code"
                :options="{
                  mode: 'text/x-csharp',
                  readOnly: true,
                  theme: 'eclipse', //主题
                  lineNumbers: true,
                  lineWrapping: true,
                  matchBrackets: true,
                  cursorBlinkRate: -1
                }"
              />
            </s-panel>
          </s-tab-pane>
        </template>
      </s-tabs>
      <template #footer>
        <s-button type="primary" @click="handleExportCode">
          {{ t('gen.gen-table.export-copy') }}
        </s-button>
        <s-button @click="handleDialogClose">
          {{ t('common.close') }}
        </s-button>
      </template>
    </s-dialog>
  </div>
</template>
<script setup>
//#region 引用
import { useI18n } from 'vue-i18n'
import { getGenTableList, generateCode, exportCode } from '@/api/gen/gen-table'
import { generateData } from '@/api/gen/sql'
import { namespaceOptions } from '@/data/gen/options'
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/eclipse.css'
//#endregion
const router = useRouter()
const { proxy } = getCurrentInstance()
const { t, locale } = useI18n()

const querySchema = [
  {
    label: t('gen.gen-table.namespace'),
    name: 'namespace',
    component: 'select',
    props: {
      options: namespaceOptions
    }
  },
  {
    label: t('gen.gen-table.table-name'),
    name: 'tableName',
    component: 'input'
  }
]

const columns = [
  {
    label: t('gen.gen-table.namespace'),
    name: 'namespace',
    sortable: true
  },
  {
    label: t('gen.gen-table.table-name'),
    name: 'tableName',
    sortable: true
  },
  {
    label: t('common.operation'),
    name: 'action'
  }
]

const addFormSchema = [
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

const addFormRules = {
  sqlStr: [
    {
      required: true,
      message: t('gen.gen-table.sql') + t('common.required'),
      trigger: 'blur'
    }
  ]
}

const filters = ref({}) // Query Form 查询参数
const queryLoad = ref(false) // 查询Loading
const resetLoad = ref(false) // 重置Loading
const tableRef = ref() // Table Ref

const addFormVisible = ref(false) // Form 打开关闭
const confirmLoading = ref(false) // Form 确认Loading
const addFormRef = ref() // Form Ref

const addFormState = ref({
  sqlStr: undefined
})

const dialogVisible = ref(false)
const tabVal = ref(0)
const tableId = ref()
const codeList = ref([])
const codeData = ref()

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
  addFormVisible.value = true
}

function handleRefresh() {
  tableRef.value.refresh(filters.value)
}

function handleGenerate(id) {
  dialogVisible.value = true
  tabVal.value = 0
  tableId.value = id
  generateCode({ tableId: id }).then(res => {
    codeList.value = res.data
    codeData.value = codeList.value[0].code
  })
}

function handleChangeTab(index) {
  codeData.value = codeList.value[index].code
}

function copyTextSuccess() {
  proxy.$message.success(t('common.copy-success'))
}

function handleExportCode() {
  exportCode({
    tableId: tableId.value
  })
}

function handleDialogClose() {
  dialogVisible.value = false
  tabVal.value = 0
  tableId.value = undefined
  codeList.value = []
  codeData.value = ''
}

function handleEdit(id) {
  router.push({
    path: '/tools/gen/edit/' + id,
    query: {}
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
  addFormVisible.value = false
  addFormRef.value.resetFields()
  handleResetForm()
}

function handleResetForm() {
  addFormState.value = {
    sqlStr: undefined
  }
}
// 提交按钮
function handleSubmit() {
  addFormRef.value.validate().then(() => {
    confirmLoading.value = true

    generateData(addFormState.value)
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
