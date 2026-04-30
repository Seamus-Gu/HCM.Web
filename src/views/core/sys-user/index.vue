<template>
  <div class="sys-user-container">
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
            :addPer="['sys_user::add']"
            :columns="columns"
            @add="handleAdd"
            @refresh="handleRefresh"
          >
          </s-tool-bar>
          <s-table ref="tableRef" :api="getSysUserList" :columns="columns">
            <template #action="{ row }">
              <s-button
                v-has="['sys_user::edit']"
                link
                type="primary"
                size="small"
                @click="handleEdit(row.id)"
              >
                修改
              </s-button>
              <s-divider direction="vertical" />
              <s-button
                v-has="['sys_user::remove']"
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
import {
  getSysUserList,
  getSysUserById,
  addSysUser,
  editSysUser,
  removeSysUser
} from '@/api/core/sys-user'

const { t } = useI18n()
const { proxy } = getCurrentInstance()
//#endregion

//#region 查询列
const querySchema = [
  {
    label: t('core.sys-user.user-name'),
    name: 'userName',
    component: 'input'
  },
  {
    label: t('core.sys-user.nick-name'),
    name: 'nickName',
    component: 'input'
  },
  {
    label: t('core.sys-user.phone-number'),
    name: 'phoneNumber',
    component: 'input'
  },
  {
    label: t('core.sys-user.user-status'),
    name: 'userStatus',
    component: 'input',
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
//#endregion

//#region 列 && 表单
// 列配置
const columns = [
  {
    label: t('core.sys-user.user-name'),
    name: 'userName',
    sortable: true
  },
  {
    label: t('core.sys-user.nick-name'),
    name: 'nickName',
    sortable: true
  },
  {
    label: t('core.sys-user.email'),
    name: 'email',
    sortable: true
  },
  {
    label: t('core.sys-user.phone-number'),
    name: 'phoneNumber',
    sortable: true
  },
  {
    label: t('core.sys-user.user-status'),
    name: 'userStatus',
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
    label: t('core.sys-user.user-name'),
    name: 'userName',
    component: 'input'
  },
  {
    label: t('core.sys-user.nike-name'),
    name: 'nickName',
    component: 'input'
  },
  {
    label: t('core.sys-user.user-type'),
    name: 'userType',
    component: 'input'
  },
  {
    label: t('core.sys-user.email'),
    name: 'email',
    component: 'input'
  },
  {
    label: t('core.sys-user.phone-number'),
    name: 'phoneNumber',
    component: 'input'
  },
  {
    label: t('core.sys-user.sex'),
    name: 'sex',
    component: 'input'
  },
  {
    label: t('core.sys-user.avatar'),
    name: 'avatar',
    component: 'input'
  },
  {
    label: t('core.sys-user.password'),
    name: 'password',
    component: 'input'
  },
  {
    label: t('core.sys-user.user-status'),
    name: 'userStatus',
    component: 'input'
  },
  {
    label: t('core.sys-user.data-status'),
    name: 'dataStatus',
    component: 'input'
  },
  {
    label: t(''),
    name: 'createBy',
    component: 'input'
  },
  {
    label: t(''),
    name: 'createTime',
    component: 'input'
  },
  {
    label: t(''),
    name: 'updateBy',
    component: 'input'
  },
  {
    label: t(''),
    name: 'updateTime',
    component: 'input'
  }
]

// 校验规则
const formRules = {}
//#endregion

//#region 绑定值
// Table列表
const filters = ref({})
const queryLoad = ref(false)
const resetLoad = ref(false)
const tableRef = ref()

// 表单
const formVisible = ref(false)
const formTitle = ref(t('common.add') + t('core.sys-user.user'))
const confirmLoading = ref(false)
const formRef = ref()

// 表单数据
const formState = ref({
  id: undefined,
  sysUserId: undefined,
  sysDeptId: undefined,
  userName: undefined,
  nickName: undefined,
  userType: undefined,
  email: undefined,
  phoneNumber: undefined,
  sex: undefined,
  avatar: undefined,
  password: undefined,
  userStatus: undefined,
  dataStatus: undefined,
  loginIp: undefined,
  loginDate: undefined,
  deviceId: undefined,
  createBy: undefined,
  createTime: undefined,
  updateBy: undefined,
  updateTime: undefined
})

//#endregion

//#region 方法
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
  formTitle.value = t('common.add') + t('core.sys-user.user')
  formVisible.value = true
}

// 刷新
function handleRefresh() {
  tableRef.value.refresh(filters.value)
}

// 编辑
function handleEdit(id) {
  formTitle.value = t('common.edit') + t('core.sys-user.user')

  getSysUserById(id).then(res => {
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
      return removeSysUser(id).then(() => {
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

    sysUserId: undefined,
    sysDeptId: undefined,
    userName: undefined,
    nickName: undefined,
    userType: undefined,
    email: undefined,
    phoneNumber: undefined,
    sex: undefined,
    avatar: undefined,
    password: undefined,
    userStatus: undefined,
    dataStatus: undefined,
    loginIp: undefined,
    loginDate: undefined,
    deviceId: undefined,
    createBy: undefined,
    createTime: undefined,
    updateBy: undefined,
    updateTime: undefined
  }
}

// 提交表单
function handleSubmit() {
  formRef.value.validate().then(() => {
    confirmLoading.value = true
    if (formState.value.id) {
      editSysUser(formState.value)
        .then(res => {
          filters.value = {}
          tableRef.value.reset()
          handleClose()
        })
        .finally(() => {
          confirmLoading.value = false
        })
    } else {
      addSysUser(formState.value)
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
</script>
