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
            :hasExpand="true"
            :addPer="['system:menu:add']"
            :expandLoad="expandLoad"
            @add="handleAdd"
            @expand="handleExpand"
            @refresh="handleRefresh"
          >
          </s-tool-bar>
          <s-tree-table ref="tableRef" :api="getMenuTree" :columns="columns">
            <template #menuStatus="{ row }">
              <s-tag :type="row.menuStatus === 0 ? 'success' : 'danger'">
                {{ row.menuStatus === 0 ? '正常' : '停用' }}
              </s-tag>
            </template>
            <template #action="{ row }">
              <s-button
                v-has="['system:menu:add']"
                link
                type="primary"
                size="small"
                @click="handleMenuAdd(row)"
              >
                新增
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['system:menu:edit']"
                link
                type="primary"
                size="small"
                @click="handleEdit(row.id)"
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
      <template #icon>
        <s-flex-col :span="12">
          <s-form-item label="菜单图标" prop="icon" label-width="84px">
            <s-icon-select v-model="formState.icon"> </s-icon-select>
          </s-form-item>
        </s-flex-col>
      </template>
    </s-form>
  </div>
</template>
<script setup>
import {
  getMenuTree,
  getMenuById,
  getMenuTreeSelect,
  getMenuNextOrder,
  addMenu,
  editMenu,
  delMenu
} from '@/api/core/menu'

const partentOptionData = ref([])

const querySchema = [
  {
    label: '菜单名称',
    name: 'menuName',
    component: 'input'
  },
  {
    label: '状态',
    name: 'menuStatus',
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
    label: '菜单名称',
    name: 'menuName'
  },
  {
    label: '图标',
    name: 'icon'
  },
  {
    label: '权限标识',
    name: 'permission'
  },
  {
    label: '组件路径',
    name: 'component'
  },
  {
    label: '状态',
    name: 'menuStatus'
  },
  {
    label: '操作',
    name: 'action'
  }
]

const formSchema = ref([
  {
    label: '菜单名称',
    name: 'menuName',
    component: 'input'
  },
  {
    label: '菜单状态',
    name: 'menuStatus',
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
    label: '路由地址',
    name: 'path',
    component: 'input'
  },
  {
    label: '菜单顺序',
    name: 'orderNum',
    component: 'input-number'
  },
  {
    label: '组件路径',
    name: 'component',
    component: 'input',
    span: 24
  },
  {
    label: '是否隐藏',
    name: 'visible',
    component: 'checkBox'
  },
  {
    label: '菜单图标',
    name: 'icon'
  },
  {
    label: '菜单类型',
    name: 'menuType',
    component: 'radio',
    span: 24,
    props: {
      options: [
        {
          label: '目录',
          value: 0
        },
        {
          label: '菜单',
          value: 1
        },
        {
          label: '按钮',
          value: 2
        }
      ]
    }
  },
  {
    label: '上级菜单',
    name: 'parentId',
    component: 'tree-select',
    span: 24,
    props: {
      checkStrictly: true,
      data: partentOptionData
    }
  },
  {
    label: '权限字符',
    name: 'permission',
    component: 'input'
  },
  {
    label: '是否缓存',
    name: 'isCache',
    component: 'select',
    props: {
      options: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ]
    }
  }
])

const formRules = {
  menuName: [
    {
      required: true,
      message: '菜单名称必须填写',
      trigger: 'blur'
    }
  ],
  menuStatus: [
    {
      required: true,
      message: '菜单状态必须填写',
      trigger: 'blur'
    }
  ],
  orderNum: [
    {
      required: true,
      message: '菜单顺序必须填写',
      trigger: 'blur',
      type: 'number'
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
const formTitle = ref('新增菜单') // Form 标题
const confirmLoading = ref(false) // Form 确认Loading
const formRef = ref() // Form Ref

const formState = ref({
  menuName: undefined,
  menuStatus: 0,
  path: undefined,
  orderNum: undefined,
  component: undefined,
  icon: undefined,
  parentId: undefined,
  menuType: 0,
  permission: undefined,
  isCache: 0
})

function init() {
  getMenuTreeSelect().then(res => {
    partentOptionData.value = res.data
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
  tableRef.value.refresh(filters.value).finally(() => {
    resetLoad.value = false
  })
}

function handleAdd() {
  formTitle.value = '新增菜单'
  formVisible.value = true
  getMenuNextOrder().then(res => {
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

function handleMenuAdd(entity) {
  formTitle.value = '新增菜单'
  formState.value.parentId = entity.id
  getMenuNextOrder()
    .then(res => {
      formState.value.orderNum = res.data
      formVisible.value = true
    })
    .finally(() => {
      nextTick(() => {
        console.log(formState.value)
        return true
      })
    })
}

function handleEdit(id) {
  formTitle.value = '修改菜单'
  getMenuById(id)
    .then(res => {
      Object.assign(formState.value, res.data)
    })
    .finally(() => {
      formVisible.value = true
    })
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
    id: undefined,
    menuName: undefined,
    menuStatus: 0,
    path: undefined,
    orderNum: undefined,
    component: undefined,
    icon: undefined,
    parentId: undefined,
    menuType: 0,
    permission: undefined,
    isCache: 0
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
      addMenu(formState.value)
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

init()
</script>
