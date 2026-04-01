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
                @click="handleEdit(row.id)"
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
      title="根据SQL生成"
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
import dayjs from 'dayjs'
import { getGenTableList, removeGenTable } from '@/api/gen/gen-table'

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

const router = useRouter()
const { proxy } = getCurrentInstance()

const filters = ref({}) // Query Form 查询参数
const queryLoad = ref(false) // 查询Loading
const resetLoad = ref(false) // 重置Loading
const tableRef = ref() // Table Ref

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
  formSchema.find(t => t.name === 'password').visible = true
  formVisible.value = true
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
