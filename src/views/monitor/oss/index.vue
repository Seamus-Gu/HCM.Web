<template>
  <div class="oss-container">
    <s-row>
      <s-col :span="24">
        <s-panel>
          <s-query-form
            :filters="filters"
            :schema="querySchema"
            :queryLoad="queryLoad"
            :resetLoad="resetLoad"
            @query="handleQuery"
            @reset="handelReset"
          />
        </s-panel>
      </s-col>
    </s-row>
    <s-row>
      <s-col :span="24">
        <s-panel>
          <s-tool-bar
            :hasAdd="false"
            :columns="columns"
            @refresh="handleRefresh"
          >
            <s-button type="primary"> 上传文件 </s-button>

            <s-button type="primary"> 上传图片 </s-button>
          </s-tool-bar>
          <s-table ref="tableRef" :api="getOssList" :columns="columns">
            <template #userStatus="{ row }">
              <s-tag :type="row.userStatus === 0 ? 'success' : 'danger'">
                {{ row.userStatus === 0 ? '正常' : '停用' }}
              </s-tag>
            </template>
            <template #action="{ row }">
              <s-button
                v-has="['system:user:edit']"
                link
                type="primary"
                size="small"
                @click="handleEdit(row.id)"
              >
                下载
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['system:user:remove']"
                link
                type="primary"
                size="small"
                @click="handleDelete(row.id)"
              >
                删除
              </s-button>
              <s-divider direction="vertical" />
            </template>
          </s-table>
        </s-panel>
      </s-col>
    </s-row>
    <s-form
      ref="formRef"
      :visible="formVisible"
      :title="formTitle"
      :schema="formSchema"
      :model="formState"
      :rules="formRules"
      :confirmLoading="confirmLoading"
      @confirm="handleSubmit"
      @close="handleClose"
    >
    </s-form>
    <s-upload :visible="true"></s-upload>
  </div>
</template>
<script setup>
import lodash from 'lodash'
import dayjs from 'dayjs'
import { getOssList } from '@/api/monitor/oss'

const querySchema = [
  {
    label: '文件名',
    name: 'fileName',
    component: 'input'
  },
  {
    label: '原名',
    name: 'rawName',
    component: 'input'
  },
  {
    label: '文件后缀',
    name: 'suffix',
    component: 'input'
  },
  {
    label: '文件类别',
    name: 'type',
    component: 'select',
    props: {
      options: [
        {
          label: '本地',
          value: 0
        },
        {
          label: 'Minio',
          value: 1
        }
      ]
    }
  }
]

const columns = [
  {
    label: '文件名',
    name: 'fileName'
  },
  {
    label: '原名',
    name: 'rawName'
  },
  {
    label: '文件后缀',
    name: 'suffix'
  },
  {
    label: '创建时间',
    name: 'createTime',
    formatter: row => {
      return dayjs(row.createTime).format('YYYY-MM-DD')
    }
  },
  {
    label: '类别',
    name: 'type'
  },
  {
    label: '操作',
    name: 'action'
  }
]

const formSchema = [
  {
    label: '专辑名',
    name: 'name',
    component: 'input',
    span: 24
  },
  {
    label: '发布时间',
    name: 'publishDate',
    component: 'date-picker',
    span: 24
  },
  {
    label: '专辑详情',
    name: 'description',
    component: 'input',
    span: 24,
    props: {
      type: 'textarea',
      rows: 2
    }
  }
]

const formRules = {
  name: [
    {
      required: true,
      message: '专辑名必须填写',
      trigger: 'blur'
    }
  ]
}

const { proxy } = getCurrentInstance()

const filters = ref({}) // Query Form 查询参数
const queryLoad = ref(false) // 查询Loading
const resetLoad = ref(false) // 重置Loading
const expandLoad = ref(false) // 收缩展开Loading

const tableRef = ref() // Table Ref

const formVisible = ref(false) // Form 打开关闭
const formTitle = ref('新增专辑') // Form 标题
const confirmLoading = ref(false) // Form 确认Loading
const formRef = ref() // Form Ref

const formState = ref({
  name: undefined,
  publishDate: undefined,
  description: undefined
})

// 获取筛选数据
function getFilterData(filterData) {
  let data = {}
  if (!filterData.publishDate) {
    data = filterData
  } else {
    data = lodash.cloneDeep(filterData)
    data.publishDateStart = data.publishDate[0]
    data.publishDateEnd = data.publishDate[1]

    delete data.publishDate
  }
  return data
}

function handleQuery() {
  queryLoad.value = true
  tableRef.value.reset(getFilterData(filters.value)).finally(() => {
    queryLoad.value = false
  })
}

function handelReset() {
  filters.value = {}
  resetLoad.value = true
  tableRef.value.reset(filters.vlue).finally(() => {
    resetLoad.value = false
  })
}

function handleAdd() {
  formTitle.value = '新增专辑'
  formVisible.value = true
}

function handleRefresh() {
  tableRef.value.refresh()
}

function handleEdit(id) {
  formTitle.value = '修改专辑'
  getAlbum(id).then(res => {
    Object.assign(formState.value, res.data)
    formVisible.value = true
  })
}

function handleDelete(id) {
  proxy.$modal.delete({
    success: () => {
      return delDept(id).then(() => {
        tableRef.value.refresh()
      })
    }
  })
}

function handleResetForm() {
  formState.value = {
    name: undefined,
    publishDate: undefined,
    description: undefined
  }
}

function handleClose() {
  formRef.value.resetFields()
  handleResetForm()
  formVisible.value = false
}

function handleSubmit() {
  formRef.validate().then(() => {
    if (formState.value.id) {
      editDept(formState.value).then(() => {
        tableRef.value.refresh()
        handleClose()
      })
    } else {
      addDept(formState.value).then(() => {
        tableRef.value.refresh()
        handleClose()
      })
    }
  })
}
</script>
