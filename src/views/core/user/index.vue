<template>
  <div class="user-container">
    <s-row :gutter="8">
      <s-col :span="6" class="dept-tree">
        <s-panel :scrollX="true" class="tree-panel" height="100%">
          <s-local-tree
            :data="treeDataSource"
            :loading="treeLoading"
            @nodeClick="handleSelectTree"
          >
          </s-local-tree>
        </s-panel>
      </s-col>
      <s-col :span="18" class="user-table">
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
              >
              </s-query-form>
            </s-panel>
          </s-col>
        </s-row>
        <s-row>
          <s-col :span="24">
            <s-panel>
              <s-tool-bar
                :hasExport="true"
                :addPer="['system:user:add']"
                :exportPer="['system:user:export']"
                :exportLoad="exportLoad"
                :columns="columns"
                @add="handleAdd"
                @export="handleExport"
                @refresh="handleRefresh"
              >
              </s-tool-bar>
              <s-table ref="tableRef" :api="getUserList" :columns="columns">
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
                    修改
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
                  <s-button
                    v-has="['system:user:resetPwd']"
                    link
                    type="primary"
                    size="small"
                    @click="handleResetPwd(row)"
                  >
                    重置密码
                  </s-button>
                </template>
              </s-table>
            </s-panel>
          </s-col>
        </s-row>
      </s-col>
    </s-row>
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
import dayjs from 'dayjs'
import {
  getUserList,
  getUser,
  addUser,
  updateUser,
  removeUser,
  resetPwd,
  exportUser
} from '@/api/core/user'
import { getRoleList } from '@/api/core/role'
import { getDeptTreeSelect } from '@/api/core/dept'
import lodash from 'lodash'

const querySchema = [
  {
    label: '用户名',
    name: 'userName',
    component: 'input'
  },
  {
    label: '用户昵称',
    name: 'nickName',
    component: 'input'
  },
  {
    label: '电话号码',
    name: 'phoneNumber',
    component: 'input'
  },
  {
    label: '状态',
    name: 'userStatus',
    component: 'select',
    props: {
      options: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '禁用'
        }
      ]
    }
  },
  {
    label: '创建时间',
    name: 'createTime',
    component: 'datePicker',
    md: 24,
    lg: 12,
    props: {
      type: 'daterange'
    }
  }
]

const columns = [
  {
    label: i('pages.system.sys-user'),
    name: 'userName',
    sortable: true
  },
  {
    label: '用户昵称',
    name: 'nickName',
    sortable: true
  },
  {
    label: '电话号码',
    name: 'phoneNumber',
    sortable: true
  },
  {
    label: '状态',
    name: 'userStatus',
    sortable: true
  },
  {
    label: '创建时间',
    name: 'createTime',
    sortable: true,
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
    label: '用户账号',
    name: 'userName',
    component: 'input'
  },
  {
    label: '用户名称',
    name: 'nickName',
    component: 'input'
  },
  {
    label: '用户密码',
    name: 'password',
    component: 'input',
    span: 24,
    props: {
      type: 'password',
      showPassword: true,
      clearable: true
    }
  },
  {
    label: '手机号码',
    name: 'phoneNumber',
    component: 'input'
  },
  {
    label: '邮箱',
    name: 'email',
    component: 'input'
  },
  {
    label: '用户性别',
    name: 'sex',
    component: 'select',
    props: {
      options: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '0',
          label: '女'
        }
      ]
    }
  },
  {
    label: '用户状态',
    name: 'userStatus',
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
  },
  {
    label: '所属部门',
    name: 'sysDeptId'
  },
  {
    label: '角色',
    name: 'roleIds',
    span: 24,
    component: 'select',
    props: {
      multiple: true,
      request: async () => {
        const res = await getRoleList({ pageSize: 999 })

        res.data.items.filter(t => {
          t.value = t.id
          t.label = t.roleName
          return true
        })

        return res.data.items
      }
    }
  }
]

const formRules = {
  userName: [
    {
      required: true,
      message: '用户名必须填写',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 20,
      message: '用户名称长度必须介于 5 和 20 之间',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码必须填写',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 20,
      message: '用户密码长度必须介于 5 和 20 之间',
      trigger: 'blur'
    }
  ],
  nickName: [
    {
      required: true,
      message: '用户名称必须填写',
      trigger: 'blur'
    }
  ],
  phoneNumber: [
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  email: [
    {
      type: 'email',
      message: "'请输入正确的邮箱地址",
      trigger: ['blur', 'change']
    }
  ]
}

const { proxy } = getCurrentInstance()

const treeDataSource = ref([])
const treeLoading = ref(false)
const selectedId = ref()

const filters = ref({}) // Query Form 查询参数
const queryLoad = ref(false) // 查询Loading
const resetLoad = ref(false) // 重置Loading
const exportLoad = ref(false) // 收缩展开Loading
const tableRef = ref()

const formVisible = ref(false) // Form 打开关闭
const formTitle = ref('新增用户') // Form 标题
const confirmLoading = ref(false) // Form 确认Loading
const formRef = ref() // Form Ref

const formState = ref({
  userName: '',
  password: '000000',
  nickName: '',
  phoneNumber: undefined,
  email: undefined,
  sex: '1',
  userStatus: 0,
  sysDeptId: undefined,
  roleIds: undefined
})

// 点击树节点
function handleSelectTree(node) {
  selectedId.value = node.value
  tableRef.value.reset(filters.value, {
    deptId: selectedId.value
  })
}

// 获取筛选数据
function getFilterData(filterData) {
  let data = {}
  if (!filterData.createTime) {
    data = filterData
  } else {
    data = lodash.cloneDeep(filterData)
    data.createTimeStart = data.createTime[0]
    data.createTimeEnd = data.createTime[1]

    delete data.createTime
  }
  return data
}

// 查询点击
function handleQuery() {
  queryLoad.value = true
  tableRef.value
    .reset(getFilterData(filters.value), {
      deptId: selectedId.value
    })
    .finally(() => {
      queryLoad.value = false
    })
}

// 重置点击
function handleReset() {
  filters.value = {}
  resetLoad.value = true
  tableRef.value
    .reset(filters, {
      deptId: selectedId.value
    })
    .finally(() => {
      resetLoad.value = false
    })
}

// 新增按钮
function handleAdd() {
  formTitle.value = '新增用户'
  formSchema.find(t => t.name === 'password').visible = true
  formVisible.value = true
}

// 导出按钮
function handleExport() {
  exportLoad.value = true
  exportUser(`用户列表_${dayjs().format('YYYY-MM-DD')}.xlsx`).finally(() => {
    exportLoad.value = false
  })
}

// 刷新按钮
function handleRefresh() {
  tableRef.value.refresh(filters.value, {
    deptId: selectedId.value
  })
}

// 修改按钮
function handleEdit(id) {
  formTitle.value = '修改用户'

  getUser(id).then(res => {
    formSchema.find(t => t.name === 'password').visible = false
    Object.assign(formState.value, res.data)
    formState.value.roleIds = res.data.roleIds
    formVisible.value = true
  })
}

// 删除按钮
function handleDelete(id) {
  proxy.$modal.delete({
    success() {
      return removeUser(id).then(() => {
        tableRef.value.reset(filters.value, {
          deptId: selectedId.value
        })
      })
    }
  })
}

// 重置密码按钮
function handleResetPwd(entity) {
  Object.assign(formState.value, entity)

  proxy.$modal.confirm({
    content: '确认要重置密码吗?',
    success: () => {
      return resetPwd(formState.value)
    }
  })
}

// 关闭表单
function handleClose() {
  formVisible.value = false
  formRef.value.resetFields()
  handleResetForm()
}

// 重置表单
function handleResetForm() {
  formState.value = {
    id: undefined,
    userName: '',
    password: '000000',
    nickName: undefined,
    sysDeptId: undefined,
    phoneNumber: undefined,
    email: undefined,
    sex: '1',
    userStatus: 0,
    roleIds: undefined
  }
}

// 提交按钮
function handleSubmit() {
  formRef.value.validate().then(() => {
    confirmLoading.value = true
    if (formState.value.id) {
      formState.value.password = undefined
      updateUser(formState.value)
        .then(() => {
          tableRef.value.reset()
        })
        .finally(() => {
          handleClose()
          confirmLoading.value = false
        })
    } else {
      addUser(formState.value)
        .then(() => {
          tableRef.value.reset()
        })
        .finally(() => {
          handleClose()
          confirmLoading.value = false
        })
    }

    handleResetForm()
  })
}

onMounted(() => {
  treeLoading.value = true
  getDeptTreeSelect()
    .then(res => {
      treeDataSource.value = res.data
    })
    .finally(() => {
      treeLoading.value = false
    })
})
</script>
