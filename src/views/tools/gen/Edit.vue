<template>
  <div class="gen-column-container">
    <s-panel>
      <s-tabs type="border-card" v-model="activeName">
        <s-tab-pane :label="t('gen.gen-table.basic')" name="basic">
          <s-form-content :schema="basicFormSchema" :model="basicFormState">
          </s-form-content>
          <s-row justify="end">
            <s-button type="primary" @click="handleBasicSubmit">
              {{ t('common.submit') }}
            </s-button>
          </s-row>
        </s-tab-pane>
        <s-tab-pane :label="t('gen.gen-table.columns')" name="columns">
          <s-tool-bar
            :addPer="['gen_column::add']"
            :columns="columns"
            @add="handleAdd"
            @refresh="handleRefresh"
          >
          </s-tool-bar>
          <s-table ref="tableRef" :api="getGenColumnList" :columns="columns">
            <template #action="{ row }">
              <s-button
                v-has="['gen_column::edit']"
                link
                type="primary"
                size="small"
                @click="handleEdit(row.id)"
              >
                修改
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['gen_column::remove']"
                link
                type="primary"
                size="small"
                @click="handleRemove(row.id)"
              >
                删除
              </s-button>
            </template>
          </s-table>
        </s-tab-pane>
      </s-tabs>
    </s-panel>

    <s-form
      ref="formRef"
      :schema="formSchema"
      :visible="formVisible"
      :title="formTitle"
      :model="formState"
      :rules="formRules"
      :confirmLoading="confirmLoading"
      @confirm="handleSubmit"
      @close="handleClose"
    >
    </s-form>
  </div>
</template>
<script setup>
//#region 引用
import { useI18n } from 'vue-i18n'
import { getGenTableById } from '@/api/gen/gen-table'

import {
  getGenColumnList,
  getGenColumnById,
  addGenColumn,
  editGenColumn,
  removeGenColumn
} from '@/api/gen/gen-column'

const route = useRoute()
const { t, locale } = useI18n()
const { proxy } = getCurrentInstance()
//#endregion

//#region 查询列
const querySchema = []
//#endregion

//#region 列 && 表单

const basicFormSchema = [
  {
    label: t('gen.gen-table.name'),
    name: 'name',
    component: 'input'
  },
  {
    label: t('gen.gen-table.namespace'),
    name: 'namespace',
    component: 'input'
  },
  {
    label: t('gen.gen-table.table-name'),
    name: 'tableName',
    component: 'input'
  },
  {
    label: t('gen.gen-table.entity-name'),
    name: 'entityName',
    component: 'input'
  },
  {
    label: t('gen.gen-table.has-pagination'),
    name: 'hasPagination',
    component: 'switch'
  },
  {
    label: t('gen.gen-table.has-combo'),
    name: 'hasCombo',
    component: 'switch'
  },
  {
    label: t('gen.gen-table.has-frontend'),
    name: 'hasFrontend',
    component: 'switch'
  },
  {
    label: t('gen.gen-table.translate'),
    name: 'translationKey',
    component: 'input'
  },
  {
    label: t('gen.gen-table.description'),
    name: 'description',
    component: 'input',
    span: 24,
    props: {
      type: 'textarea',
      rows: 3
    }
  }
]

// 列配置
const columns = [
  {
    label: t('gen.gen-column.name'),
    name: 'columnName',
    sortable: true
  },
  {
    label: t('gen.gen-column.column-type'),
    name: 'columnType',
    sortable: true
  },
  {
    label: t('gen.gen-column.column-desc'),
    name: 'columnDesc',
    sortable: true
  },
  {
    label: '操作',
    name: 'action'
  }
]

// 表单配置
const formSchema = [
  {
    label: t('gen.gen-column.name'),
    name: 'columnName',
    component: 'input'
  },
  {
    label: t('gen.gen-column.column-type'),
    name: 'columnType',
    component: 'input'
  },
  {
    label: t('gen.gen-column.column-desc'),
    name: 'columnDesc',
    component: 'input'
  },
  {
    label: t('gen.gen-column.is-nullable'),
    name: 'isNullable',
    component: 'input'
  },
  {
    label: t(''),
    name: 'typeLength',
    component: 'input'
  },
  {
    label: t(''),
    name: 'point',
    component: 'input'
  },
  {
    label: t('gen.gen-column.component-type'),
    name: 'componentType',
    component: 'input'
  }
]

// 校验规则
const formRules = {}
//#endregion

//#region 绑定值
const activeName = ref('basic')
const basicFormState = ref({
  id: undefined,
  namespace: undefined,
  tableName: undefined,
  entityName: undefined,
  name: undefined,
  description: undefined,
  entityType: undefined,
  hasPagination: false,
  hasCombo: false,
  hasFrontend: false,
  translationKey: undefined,
  moduleName: undefined,
  camelName: undefined,
  kebabName: undefined
})

// Table列表
const filters = ref({})
const queryLoad = ref(false)
const resetLoad = ref(false)
const tableRef = ref()

// 表单
const formVisible = ref(false)
const formTitle = ref(t('common.add') + t('gen.gen-table.name'))
const confirmLoading = ref(false)
const formRef = ref()

// 表单数据
const formState = ref({
  id: undefined,
  columnName: undefined,
  columnType: undefined,
  columnDesc: undefined,
  isNullable: undefined,
  typeLength: undefined,
  point: undefined,
  componentType: undefined,
  tableId: undefined
})

//#endregion

//#region 方法
function init() {
  const tableId = route.params.tableId

  getGenTableById(tableId).then(res => {
    Object.assign(basicFormState.value, res.data)
  })
}

function handleBasicSubmit() {}

// 查询
function handleQuery() {
  queryLoad.value = true
  tableRef.value.reset(filters.value).finally(() => {
    queryLoad.value = false
  })
}

// 重置
function handleReset() {
  filters.value = {}
  resetLoad.value = true
  tableRef.value.reset(filters.value).finally(() => {
    resetLoad.value = false
  })
}

// 新增
function handleAdd() {
  formTitle.value = t('common.add') + t('gen.gen-table.name')
  formVisible.value = true
}

// 刷新
function handleRefresh() {
  tableRef.value.refresh(filters.value)
}

// 编辑
function handleEdit(id) {
  formTitle.value = t('common.edit') + t('gen.gen-table.name')

  getGenColumnById(id).then(res => {
    Object.assign(formState.value, res.data)
    nextTick(() => {
      formVisible.value = true
    })
  })
}

// 删除
function handleRemove(id) {
  proxy.$modal.delete({
    success: () => {
      filters.value = {}
      return removeGenColumn(id).then(() => {
        tableRef.value.reset(filters.value)
      })
    }
  })
}

// 关闭表单
function handleClose() {
  formRef.value.resetFields()
  handleResetForm()
  formVisible.value = false
}

// 重置表单
function handleResetForm() {
  formState.value = {
    id: undefined,

    columnName: undefined,
    columnType: undefined,
    columnDesc: undefined,
    isNullable: undefined,
    typeLength: undefined,
    point: undefined,
    componentType: undefined,
    tableId: undefined
  }
}

// 提交表单
function handleSubmit() {
  formRef.value.validate().then(() => {
    confirmLoading.value = true
    if (formState.value.id) {
      editGenColumn(formState.value)
        .then(res => {
          filters.value = {}
          tableRef.value.reset()
          handleClose()
        })
        .finally(() => {
          confirmLoading.value = false
        })
    } else {
      addGenColumn(formState.value)
        .then(res => {
          filters.value = {}
          tableRef.value.reset()
          formVisible.value = false
        })
        .finally(() => {
          confirmLoading.value = false
        })
    }
  })
}
//#endregion

init()
</script>
