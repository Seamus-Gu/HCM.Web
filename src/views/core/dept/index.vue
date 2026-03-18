<template>
  <div class="dept-container">
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
            :hasExpand="true"
            :addPer="['system:dept:add']"
            @add="handleAdd"
            @expand="handleExpand"
            @refresh="handleRefresh"
          />
          <s-tree-table ref="tableRef" :columns="columns" :api="getDeptTree">
            <template #deptStatus="{ row }">
              <el-tag :type="row.deptStatus === '0' ? 'success' : 'danger'">
                {{ row.deptStatus === '0' ? '正常' : '停用' }}
              </el-tag>
            </template>
            <template #action="{ row }">
              <s-button
                v-has="['system:dept  : add']"
                link
                type="primary"
                size="small"
                @click="handleDeptAdd(row)"
              >
                新增
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['system:dept:edit']"
                link
                type="primary"
                size="small"
                @click="handleEdit(row.id)"
              >
                修改
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['system:dept:remove']"
                link
                type="primary"
                size="small"
                @click="handleDelete(row.id)"
              >
                删除
              </s-button>
            </template>
          </s-tree-table>
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
  </div>
</template>
<script setup>
import dayjs from 'dayjs'
import {
  getDeptTree,
  getDeptTreeSelect,
  getNextOrderNum,
  getDeptById,
  addDept,
  editDept,
  delDept
} from '@/api/core/dept'

const querySchema = [
  {
    label: '部门名称',
    name: 'deptName',
    component: 'input'
  },
  {
    label: '状态',
    name: 'deptStatus',
    component: 'select',
    props: {
      options: [
        {
          value: '0',
          label: '正常'
        },
        {
          value: '1',
          label: '停用'
        }
      ]
    }
  }
]

const columns = [
  {
    label: '部门名称',
    name: 'deptName'
  },
  {
    label: '排序',
    name: 'orderNum'
  },
  {
    label: '状态',
    name: 'deptStatus'
  },
  {
    label: '创建时间',
    name: 'createTime',
    formatter: row => {
      return dayjs(row.createTime).format('YYYY-MM-DD')
    }
  },
  {
    label: '操作',
    name: 'action'
  }
]

const formSchema = [
  {
    label: '上级部门',
    name: 'parentId',
    component: 'tree-select',
    span: 24,
    props: {
      checkStrictly: true,
      request: async () => {
        const res = await getDeptTreeSelect()
        return res.data
      }
    }
  },
  {
    label: '部门名称',
    name: 'deptName',
    component: 'input',
    span: 24
  },
  {
    label: '组织状态',
    name: 'deptStatus',
    component: 'select',
    span: 12,
    props: {
      options: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '停用'
        }
      ]
    }
  },
  {
    label: '显示顺序',
    name: 'orderNum',
    component: 'input-number',
    span: 12
  }
]

const formRules = {
  parentId: [
    {
      required: true,
      message: '上级部门必须填写',
      trigger: 'change'
    }
  ],
  title: [
    {
      required: true,
      message: '组织名称必须填写',
      trigger: 'blur'
    }
  ],
  deptStatus: [
    {
      required: true,
      message: '组织状态必须填写',
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
const formTitle = ref('新增组织') // Form 标题
const confirmLoading = ref(false) // Form 确认Loading
const formRef = ref() // Form Ref

const formState = ref({
  deptName: undefined,
  parentId: undefined,
  deptStatus: '0',
  orderNum: undefined
})

function handleQuery() {
  queryLoad.value = true
  tableRef.value.refresh(filters.value).finally(() => {
    queryLoad.value = false
  })
}

function handelReset() {
  filters.value = {}
  resetLoad.value = true
  tableRef.value.refresh(filters).finally(() => {
    resetLoad.value = false
  })
}

function handleAdd() {
  formTitle.value = '新增部门'

  getNextOrderNum().then(res => {
    formState.value.orderNum = res.data
    formVisible.value = true
  })
}

function handleExpand() {
  expandLoad.value = true
  tableRef.value.allExpand().finally(() => {
    expandLoad.value = false
  })
}

function handleRefresh() {
  tableRef.value.refresh()
}

function handleDeptAdd(entity) {
  formTitle.value = '新增部门'
  formState.value.parentId = entity.id
  getNextOrderNum().then(res => {
    formState.value.orderNum = res.data
    formVisible.value = true
  })
}

function handleEdit(id) {
  formTitle.value = '修改部门'
  getDeptById(id).then(res => {
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
    id: undefined,
    title: undefined,
    parentId: undefined,
    deptStatus: '0',
    orderNum: undefined
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
