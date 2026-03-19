<template>
  <div class="gen-column-container">
    <s-panel>
      <s-flex-row
        v-if="isFirst"
        justify="center"
        style="margin-bottom: 32px; padding: 0 16px"
      >
        <s-col :span="18">
          <s-steps :active="1" finish-status="success">
            <s-step title="生成配置" />
            <s-step title="配置列" />
            <s-step title="完成" />
          </s-steps>
        </s-col>
      </s-flex-row>

      <s-row>
        <s-col :span="24">
          <s-tool-bar
            :addPer="['gen:genColumn:add']"
            :columns="columns"
            @add="handleAdd"
            @refresh="handleRefresh"
          >
          </s-tool-bar>
          <s-local-table
            ref="tableRef"
            :hasPagination="false"
            :data="columnData"
            :columns="columns"
          >
            <template #action="{ row }">
              <s-button
                v-has="['gen:genColumn:edit']"
                link
                type="primary"
                size="small"
                @click="handleEdit(row)"
              >
                修改
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['gen:genColumn:remove']"
                link
                type="primary"
                size="small"
                @click="handleRemove(row)"
              >
                删除
              </s-button>
            </template>
          </s-local-table>
        </s-col>
      </s-row>

      <s-flex-row justify="center">
        <s-button @click="handleResetTable"> 重置 </s-button>
        <s-button type="primary" @click="handleSubmitColumnList">
          {{ isFirst ? '下一步' : '提交' }}
        </s-button>
      </s-flex-row>
    </s-panel>

    <s-form
      ref="formRef"
      :width="900"
      :labelWidth="160"
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
import lodash from 'lodash'
import dayjs from 'dayjs'

import { boolEnum } from '@/data/enum'
import { componentOptions } from '@/data/option'
import { getEnumCombo } from '@/api/enum'
import { getColumnList, addGenColumnList } from '@/api/tool/gen'

const sqlTypeEnum = ref([])

const columns = [
  {
    label: '列名',
    name: 'columnName',
    sortable: true
  },
  {
    label: '列类型',
    name: 'columnType',
    sortable: true,
    formatter: row => {
      let sqlType = sqlTypeEnum.value.find(t => t.value == row.columnType)
      return sqlType?.label
    }
  },
  {
    label: '长度',
    name: 'columnLength',
    sortable: true
  },
  {
    label: '列描述(注释)',
    name: 'columnDesc',
    sortable: true
  },
  {
    name: 'action'
  }
]

const formSchema = ref([
  {
    label: '列名',
    name: 'columnName',
    component: 'input'
  },
  {
    label: '列类型',
    name: 'columnType',
    component: 'select',
    props: {
      options: sqlTypeEnum
    }
  },
  {
    label: '列描述(注释)',
    name: 'columnDesc',
    component: 'input'
  },
  {
    label: '是否必填',
    name: 'isRequired',
    component: 'select',
    props: {
      options: boolEnum
    }
  },
  {
    label: '组件类型',
    name: 'componentType',
    component: 'select',
    props: {
      options: componentOptions
    }
  },
  {
    label: '字段长度',
    name: 'typeLength',
    component: 'input-number'
  },
  {
    label: '小数点',
    name: 'point',
    component: 'input-number'
  }
])

const formRules = {
  columnName: [
    {
      required: true,
      message: '列名必须填写',
      trigger: 'blur'
    }
  ],
  columnType: [
    {
      required: true,
      message: '列类型必须填写',
      trigger: 'blur'
    }
  ]
}

const router = useRouter()
const { proxy } = getCurrentInstance()

const isFirst = ref(false)
const hasFrontend = ref(false)

const tableRef = ref() // Table Ref
const columnData = ref([])

const formVisible = ref(false) // Form 打开关闭
const formTitle = ref('新增列') // Form 标题
const confirmLoading = ref(false) // Form 确认Loading
const formRef = ref() // Form Ref

const formState = ref({
  id: undefined,
  columnName: undefined,
  columnType: undefined,
  columnDesc: undefined,
  isRequired: false,
  tableId: undefined,
  index: undefined
})

function handleAdd() {
  formState.value.tableId = router.currentRoute.value.query.tableId
  formTitle.value = '新增列'
  formVisible.value = true
}

function handleRefresh() {
  tableRef.value.refresh()
}

function handleEdit(row) {
  Object.assign(formState.value, row)
  formTitle.value = '修改列'
  formVisible.value = true
}

function handleRemove(row) {
  proxy.$modal.delete({
    success: () => {
      const index = columnData.value.findIndex(item => item.index === row.index)

      // 使用 splice 方法删除元素
      if (index !== -1) {
        columnData.value.splice(index, 1)
      }

      return Promise.resolve()
    }
  })
}

function handleClose() {
  formRef.value.resetFields()
  handleResetForm()
  formVisible.value = false
}

function handleResetForm() {
  formState.value = {
    id: undefined,
    columnName: undefined,
    columnType: undefined,
    columnDesc: undefined,
    isRequired: false,
    tableId: undefined,
    index: undefined
  }
}

function handleSubmit() {
  formRef.value.validate().then(() => {
    confirmLoading.value = true
    if (formState.value.index) {
      let data = columnData.value.find(t => t.index == formState.value.index)
      Object.assign(data, formState.value)

      handleClose()
      confirmLoading.value = false
    } else {
      const data = lodash.cloneDeep(formState.value)
      data.index = Date.now().toString(36)
      columnData.value.push(data)
      handleClose()
      confirmLoading.value = false
    }
  })
}

function handleResetTable() {
  columnData.value = []
}

function handleSubmitColumnList() {
  addGenColumnList(columnData.value).then(res => {
    if (isFirst.value) {
      router.push({
        path: '/tool/gen/detail',
        query: { detailId: id }
      })
    } else {
      router.push({
        path: '/tool/gen/index'
      })
    }
  })
}

isFirst.value = router.currentRoute.value.query.isFirst

getEnumCombo('SQLType').then(res => {
  sqlTypeEnum.value = res.data
})

if (router.currentRoute.value.query.tableId) {
  getColumnList({
    tableId: router.currentRoute.value.query.tableId
  }).then(res => {
    columnData.value = res.data
  })
}
</script>
