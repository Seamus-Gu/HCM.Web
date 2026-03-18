<template>
  <div class="role-container">
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
            :hasExport="true"
            :addPer="['system:role:add']"
            :exportPer="['system:role:export']"
            :exportLoad="exportLoad"
            :columns="columns"
            @add="handleAdd"
            @export="handleExport"
            @refresh="handleRefresh"
          >
          </s-tool-bar>
          <s-table ref="tableRef" :api="getRoleList" :columns="columns">
            <template #roleStatus="{ row }">
              <s-tag :type="row.roleStatus === 0 ? 'success' : 'danger'">
                {{ row.roleStatus === 0 ? '正常' : '停用' }}
              </s-tag>
            </template>
            <template #action="{ row }">
              <template v-if="row.roleKey != 'admin'">
                <s-button
                  v-has="['system:role:edit']"
                  link
                  type="primary"
                  size="small"
                  @click="handleEdit(row.id)"
                >
                  修改
                </s-button>
                <s-divider direction="vertical" />
                <s-button
                  v-has="['system:role:remove']"
                  link
                  type="primary"
                  size="small"
                  @click="handleDelete(row.id)"
                >
                  删除
                </s-button>
              </template>
            </template>
          </s-table>
        </s-panel>
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
      <template #menuIds>
        <s-col :span="24">
          <s-form-item
            label="菜单权限"
            :labelCol="{ style: { width: '80px' } }"
            :wrapper-col="{ style: { width: 'calc(100% - 80px)' } }"
            name="menuIds"
          >
            <s-row style="width: 100%">
              <s-space>
                <s-check-box v-model="menuExpend" @change="handleMenuExpend">
                  展开/折叠
                </s-check-box>
                <s-check-box v-model="menuCheck" @change="handleMenuCheck">
                  全选/全不选
                </s-check-box>
              </s-space>
            </s-row>
            <s-row style="width: 100%">
              <s-panel height="300px" width="96%" :scrollY="true">
                <s-tree
                  ref="menuSelectRef"
                  show-checkbox
                  :showSearch="false"
                  :api="getMenuTreeSelect"
                  :checkable="true"
                >
                </s-tree>
              </s-panel>
            </s-row>
          </s-form-item>
        </s-col>
      </template>
    </s-form>
  </div>
</template>
<script setup>
import dayjs from 'dayjs'
import {
  getRoleList,
  getRoleById,
  getRoleNextOrder,
  addRole,
  updateRole,
  delRole,
  exportRole
} from '@/api/core/role'

import { getMenuTreeSelect } from '@/api/core/menu'

const querySchema = [
  {
    label: '角色名称',
    name: 'roleName',
    component: 'input'
  },
  {
    label: '权限字符',
    name: 'roleKey',
    component: 'input'
  },
  {
    label: '状态',
    name: 'roleStatus',
    component: 'select',
    props: {
      options: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '禁用'
        }
      ]
    }
  }
]

const columns = [
  {
    label: '角色顺序',
    name: 'orderNum',
    sortable: true
  },
  {
    label: '角色名称',
    name: 'roleName',
    sortable: true
  },
  {
    label: '权限字符',
    name: 'roleKey',
    sortable: true
  },
  {
    label: '角色状态',
    name: 'roleStatus',
    sortable: true
  },
  {
    label: '操作',
    name: 'action'
  }
]

const formSchema = [
  {
    label: '角色名称',
    name: 'roleName',
    component: 'input'
  },
  {
    label: '权限标识',
    name: 'roleKey',
    component: 'input'
  },
  {
    label: '角色状态',
    name: 'roleStatus',
    component: 'select',
    props: {
      options: [
        {
          value: '1',
          label: '禁用'
        },
        {
          value: '0',
          label: '启用'
        }
      ]
    }
  },
  {
    label: '角色顺序',
    name: 'orderNum',
    component: 'input-number'
  },
  {
    label: '菜单权限',
    name: 'menuIds',
    span: 24
  }
]

const formRules = {
  roleName: [
    {
      required: true,
      message: '角色名必须填写',
      trigger: 'blur'
    }
  ],
  roleKey: [
    {
      required: true,
      message: '权限标识必须填写',
      trigger: 'blur'
    }
  ],
  roleSort: [
    {
      required: true,
      message: '显示顺序必须填写',
      trigger: 'blur'
    }
  ]
}

const { proxy } = getCurrentInstance()

const filters = ref({}) // Query Form 查询参数
const queryLoad = ref(false) // 查询Loading
const resetLoad = ref(false) // 重置Loading
const exportLoad = ref(false) // 收缩展开Loading

const tableRef = ref() // Table Ref

const formVisible = ref(false) // Form 打开关闭
const formTitle = ref('新增角色') // Form 标题
const confirmLoading = ref(false) // Form 确认Loading
const formRef = ref() // Form Ref

const menuSelectRef = ref()
const menuExpend = ref(false)
const menuCheck = ref(false)

const formState = ref({
  roleName: undefined,
  roleKey: undefined,
  roleStatus: '0',
  orderNum: undefined,
  menuIds: undefined
})

function handleQuery() {
  queryLoad.value = true
  console.log(filters.value)
  tableRef.value.reset(filters.value).finally(() => {
    queryLoad.value = false
  })
}

function handleReset() {
  filters.value = {}
  resetLoad.value = true
  tableRef.value.reset(filters).finally(() => {
    resetLoad.value = false
  })
}

async function handleAdd() {
  await getRoleNextOrder().then(res => {
    formState.value.orderNum = res.data
  })
  formTitle.value = '新增角色'
  formVisible.value = true
}

function handleExport() {
  exportLoad.value = true
  exportRole(`角色列表_${dayjs().format('YYYY-MM-DD')}.xlsx`).finally(() => {
    exportLoad.value = false
  })
}

function handleRefresh() {
  tableRef.value.refresh(filters.value)
}

function handleEdit(id) {
  formTitle.value = '修改角色'
  getRoleById(id).then(res => {
    Object.assign(formState.value, res.data)
    // getRoleMenuList(id).then(res => {
    //   formVisible.value = true
    //   nextTick(() => {
    //     menuSelectRef.value.setCheckedKeys(res.data)
    //   })
    // })
  })
}

function handleDelete(id) {
  proxy.$modal.delete({
    success: () => {
      return delRole(id).then(() => {
        tableRef.value.reset(filters.value)
      })
    }
  })
}

function handleMenuExpend() {
  menuSelectRef.value.allExpend(menuExpend.value)
}

function handleMenuCheck() {
  menuSelectRef.value.allCheck(menuCheck.value)
}

function handleClose() {
  formRef.value.resetFields()
  handleResetForm()
  formVisible.value = false
  menuExpend.value = false
  menuCheck.value = false
}

function handleResetForm() {
  formState.value = {
    id: undefined,
    roleName: undefined,
    roleKey: undefined,
    roleStatus: '0',
    orderNum: undefined,
    menuIds: undefined
  }
}

function handleSubmit() {
  const menuIds = menuSelectRef.value.getCheckedKeys()
  formState.value.menuIds = menuIds
  formRef.value.validate().then(() => {
    confirmLoading.value = true
    if (formState.id) {
      updateRole(formState.value)
        .then(res => {
          tableRef.value.reset()
          handleClose()
        })
        .finally(() => {
          confirmLoading.value = false
        })
    } else {
      addRole(formState.value)
        .then(res => {
          tableRef.value.reset()
          formVisible.value = false
        })
        .finally(() => {
          confirmLoading.value = false
        })
    }
  })
}
</script>
