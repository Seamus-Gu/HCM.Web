<template>
  <div class="menu-container">
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
            :hasExportd="true"
            :addPer="['system:menu:add']"
            :exportLoad="exportLoad"
            @add="handleAdd"
            @refresh="handleRefresh"
          >
          </s-tool-bar>
          <s-table ref="tableRef" :api="getJobList" :columns="columns">
            <template #jobState="{ row }">
              <s-tag :type="row.jobState === 0 ? 'success' : 'danger'">
                {{ row.jobState === 0 ? '正常' : '停用' }}
              </s-tag>
            </template>
            <template #jobType="{ row }">
              {{ row.jobType === 0 ? 'DLL' : 'API' }}
            </template>
            <template #action="{ row }">
              <s-button
                link
                type="primary"
                size="small"
                @click="handleRun(row.id)"
              >
                立即执行
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['system:menu:edit']"
                link
                type="primary"
                size="small"
                @click="handleEdit(row)"
              >
                修改
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['system:menu:remove']"
                link
                type="primary"
                size="small"
                @click="handleDelete(row.id)"
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
      width="650px"
      labelWidth="120px"
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
  </div>
</template>
<script setup>
import {
  getJobList,
  getClassList,
  AddJob,
  EditJob,
  Run
} from '@/api/monitor/job'

const classOptionsData = ref([])

const querySchema = [
  {
    label: '任务名称',
    name: 'jobName',
    component: 'input'
  },
  {
    label: '分组名称',
    name: 'groupName',
    component: 'input'
  },
  {
    label: '任务类型',
    name: 'jobType',
    component: 'select',
    props: {
      options: [
        {
          value: 0,
          label: 'DLL'
        },
        {
          value: 1,
          label: 'API'
        }
      ]
    }
  },
  {
    label: '运行状态',
    name: 'jobStatus',
    component: 'select',
    props: {
      options: [
        {
          value: 0,
          label: '启用'
        },
        {
          value: 1,
          label: '停用'
        }
      ]
    }
  }
]

const columns = [
  {
    label: '任务名称',
    name: 'jobName'
  },
  {
    label: '分组名称',
    name: 'groupName'
  },
  {
    label: '任务类型',
    name: 'jobType'
  },
  {
    label: '运行状态',
    name: 'jobState'
  },
  {
    label: '间隔Cron',
    name: 'interval'
  },
  {
    label: '操作',
    name: 'action'
  }
]

const formSchema = ref([
  {
    label: '任务名称',
    name: 'jobName',
    component: 'input'
  },
  {
    label: '分组名称',
    name: 'groupName',
    component: 'input'
  },
  {
    label: '间隔时间',
    name: 'interval',
    component: 'input'
  },
  {
    label: '任务类型',
    name: 'jobType',
    component: 'select',
    props: {
      options: [
        {
          value: 0,
          label: 'DLL'
        },
        {
          value: 1,
          label: 'API'
        }
      ]
    }
  },
  {
    label: '请求地址',
    name: 'httpUrl',
    component: 'input',
    visible: false,
    type: 1,
    required: true
  },
  {
    label: 'Query参数',
    name: 'httpQuery',
    component: 'input',
    visible: false,
    type: 1
  },
  {
    label: 'Body参数',
    name: 'httpBody',
    component: 'input',
    visible: false,
    type: 1
  },
  {
    label: 'Header参数',
    name: 'httpHeader',
    component: 'input',
    visible: false,
    type: 1
  },
  {
    label: '类名',
    name: 'className',
    component: 'select',
    props: {
      options: classOptionsData
    },
    visible: false,
    type: 0,
    required: true
  },
  {
    label: '参数',
    name: 'dllParams',
    component: 'input',
    visible: false,
    type: 0
  },
  {
    label: '描述',
    name: 'description',
    component: 'input',
    span: 24,
    props: {
      type: 'textarea',
      rows: 2
    }
  }
])

const formRules = ref({
  jobName: [
    {
      required: true,
      message: '任务名称必须填写',
      trigger: 'blur'
    }
  ],
  groupName: [
    {
      required: true,
      message: '分组名称必须填写',
      trigger: 'blur'
    }
  ],
  interval: [
    {
      required: true,
      message: '间隔时间必须填写',
      trigger: 'blur'
    }
  ],
  jobType: [
    {
      required: true,
      message: '任务类型必须填写',
      trigger: 'blur'
    }
  ]
})

const { proxy } = getCurrentInstance()

const filters = ref({}) // Query Form 查询参数
const queryLoad = ref(false) // 查询Loading
const resetLoad = ref(false) // 重置Loading
const exportLoad = ref(false) // 收缩展开Loading

const tableRef = ref() // Table Ref

const formVisible = ref(false) // Form 打开关闭
const formTitle = ref('新增任务') // Form 标题
const confirmLoading = ref(false) // Form 确认Loading
const formRef = ref() // Form Ref

const formState = ref({
  jobName: undefined,
  groupName: undefined,
  interval: undefined,
  jobType: undefined,
  httpUrl: undefined,
  httpQuery: undefined,
  httpBody: undefined,
  httpHeader: undefined,
  className: undefined,
  dllParams: undefined,
  description: undefined
})

function init() {
  getClassList().then(res => {
    res.data.forEach(t => {
      classOptionsData.value.push({
        value: t,
        label: t
      })
    })
  })
}
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
  formTitle.value = '新增任务'
  formVisible.value = true
}

function handleRefresh() {
  tableRef.value.refresh(filters.value)
}

function handleRun(id) {
  Run(id).then(() => {
    tableRef.value.refresh()
    handleClose()
  })
}

function handleEdit(data) {
  formTitle.value = '修改任务'
  Object.assign(formState.value, data)
  formVisible.value = true
}

function handleDelete(id) {
  proxy.$modal.delete({
    success: () => {
      return delMenu(id).then(() => {
        tableRef.value.refresh()
      })
    }
  })
}

function handleResetForm() {
  formState.value = {
    jobName: undefined,
    groupName: undefined,
    interval: undefined,
    jobType: undefined,
    httpUrl: undefined,
    httpQuery: undefined,
    httpBody: undefined,
    httpHeader: undefined,
    className: undefined,
    dllParams: undefined,
    description: undefined
  }
}

function handleClose() {
  formRef.value.resetFields()
  handleResetForm()
  formVisible.value = false
}

function handleSubmit() {
  formRef.value.validate().then(() => {
    confirmLoading.value = true
    if (formState.value.id) {
      editMenu(formState.value)
        .then(() => {
          tableRef.value.refresh()
          handleClose()
        })
        .finally(() => {
          confirmLoading.value = false
        })
    } else {
      AddJob(formState.value)
        .then(() => {
          tableRef.value.refresh()
          handleClose()
        })
        .finally(() => {
          confirmLoading.value = false
        })
    }
  })
}

watch(
  () => formState.value.jobType,
  newVal => {
    const schemaList = formSchema.value.filter(t => t.type != undefined)

    schemaList.forEach(item => {
      if (item.type == newVal) {
        item.visible = true

        if (item.required) {
          formRules.value[item.name] = [
            {
              required: true,
              message: `${item.label}必须填写`,
              trigger: 'blur'
            }
          ]
        }
      } else {
        item.visible = false
        formRules.value[item.name] = []
      }
    })
  }
)

init()
</script>
