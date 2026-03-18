<template>
  <div class="dictionary-container">
    <s-row :gutter="8">
      <s-col :span="6" class="type-tree">
        <s-panel :scrollX="true" class="tree-panel" height="100%">
          <s-edit-tree
            ref="typeTreeRef"
            :api="getTypeTree"
            @nodeClick="handleClickType"
            @add="handleTypeAdd"
            @edit="handleTypeEdit"
            @del="handleTypeDelete"
          >
          </s-edit-tree>
        </s-panel>
      </s-col>
      <s-col :span="18" class="item-table">
        <s-row>
          <s-col :span="24">
            <s-panel>
              <s-query-form
                :filters="filters"
                :schema="itemTableQuerySchema"
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
                :addPer="['system:dict:add']"
                :columns="itemTableColumns"
                @add="handleItemAdd"
                @refresh="handleRefresh"
              >
              </s-tool-bar>
              <s-table
                ref="itemTableRef"
                :api="getDictItemList"
                :columns="itemTableColumns"
              >
                <template #action="{ row }">
                  <s-button
                    v-has="['system:dict:edit']"
                    link
                    type="primary"
                    size="small"
                    @click="handleItemEdit(row.id)"
                  >
                    修改
                  </s-button>
                  <s-divider direction="vertical" />
                  <s-button
                    v-has="['system:dict:remove']"
                    link
                    type="primary"
                    size="small"
                    @click="handleItemDelete(row.id)"
                  >
                    删除
                  </s-button>
                </template>
              </s-table>
            </s-panel>
          </s-col>
        </s-row>
      </s-col>
    </s-row>

    <s-form
      ref="typeFormRef"
      :schema="typeFormSchema"
      :visible="typeFormVisible"
      :title="typeFormTitle"
      :model="typeFormState"
      :rules="typeFormRules"
      :confirmLoading="typeConfirmLoading"
      @confirm="handleTypeSubmit"
      @close="handleTypeClose"
    >
    </s-form>
    <s-form
      ref="itemFormRef"
      labelWidth="100px"
      :schema="itemFormSchema"
      :visible="itemFormVisible"
      :title="itemFormTitle"
      :model="itemFormState"
      :rules="itemFormRules"
      :confirmLoading="itemConfirmLoading"
      @confirm="handleItemSubmit"
      @close="handleItemClose"
    >
    </s-form>
  </div>
</template>
<script>
import {
  getTypeTree,
  getDictType,
  getNextOrderNum,
  addDictType
} from '@/api/core/dictionary/type'

import { getDictItemList } from '@/api/core/dictionary/item'
import { toRefs } from 'vue'

const typeFormSchema = [
  {
    label: '类别名称',
    name: 'dictTypeName',
    component: 'input'
  },
  {
    label: '编码',
    name: 'dictTypeCode',
    component: 'input'
  },
  {
    label: '排序数',
    name: 'orderNum',
    component: 'input'
  },
  {
    label: '状态',
    name: 'dictTypeStatus',
    component: 'select',
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
    label: '父节点',
    name: 'parentId',
    span: 24,
    component: 'tree-select',
    props: {
      request: async () => {
        const res = await getTypeTree()
        return res.data
      }
    }
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
]

const typeFormRules = {
  dictTypeName: [
    {
      required: true,
      message: '类别名称必须填写',
      trigger: 'blur'
    }
  ],
  dictTypeCode: [
    {
      required: true,
      message: '类别编码必须填写',
      trigger: 'blur'
    }
  ]
}

const itemTableQuerySchema = [
  {
    label: '字典项名称',
    name: 'dictItemName',
    component: 'input'
  },
  {
    label: '字典项值',
    name: 'dictItemValue',
    component: 'input'
  },
  {
    label: '字典项状态',
    name: 'dictItemStatus',
    component: 'select',
    props: {
      options: [
        {
          value: '1',
          label: '禁用'
        },
        {
          value: '0',
          label: '正常'
        }
      ]
    }
  }
]

const itemTableColumns = [
  {
    label: '排序数',
    name: 'orderNum',
    sorter: true
  },
  {
    label: '字典项名称',
    name: 'dictItemName',
    sorter: true
  },
  {
    label: '字典项值',
    name: 'dictItemValue',
    sorter: true
  },
  {
    label: '字典项状态',
    name: 'dictItemStatus',
    sorter: true
  },
  {
    label: '操作',
    slots: {
      customRender: 'action'
    }
  }
]

const itemFormSchema = [
  {
    label: '字典项名称',
    name: 'dictItemName',
    component: 'input'
  },
  {
    label: '字典项值',
    name: 'dictItemValue',
    component: 'input'
  },
  {
    label: '排序数',
    name: 'orderNum',
    component: 'input-number'
  },
  {
    label: '字典项状态',
    name: 'dictItemStatus',
    component: 'select',
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
    label: '所属字典类',
    name: 'dictTypeId',
    span: 24,
    component: 'tree-select',
    props: {
      request: async () => {
        const res = await getTypeTree()
        return res.data
      }
    }
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
]

const itemFormRules = {
  orderNum: [
    {
      required: true,
      message: '排序数必须填写',
      trigger: 'blur'
    }
  ],
  dictItemName: [
    {
      required: true,
      message: '字典项名称必须填写',
      trigger: 'blur'
    }
  ],
  dictTypeId: [
    {
      required: true,
      message: '所属字典类必须填写',
      trigger: 'blur'
    }
  ],
  dictItemValue: [
    {
      required: true,
      message: '字典项值必须填写',
      trigger: 'blur'
    }
  ]
}

export default {
  setup() {
    const { proxy } = getCurrentInstance()

    const typeTreeData = reactive({
      getTypeTree,
      typeTreeRef: undefined,
      selectedId: undefined
    })

    const typeFormData = reactive({
      typeFormRef: undefined,
      typeFormVisible: false,
      typeFormTitle: '新增字典类',
      typeFormSchema: typeFormSchema,
      typeFormRules: typeFormRules,
      typeConfirmLoading: false
    })

    const typeFormState = reactive({
      id: undefined,
      dictTypeName: undefined,
      dictTypeCode: undefined,
      orderNum: undefined,
      dictTypeStatus: '0',
      parentId: undefined,
      description: undefined
    })

    const itemTableData = reactive({
      itemTableQuerySchema,
      filters: {},

      getDictItemList,
      queryLoad: false,
      resetLoad: false,
      itemTableColumns,
      itemTableRef: undefined
    })

    const itemFormData = reactive({
      itemFormRef: undefined,
      itemFormVisible: false,
      itemFormTitle: '新增字典项',
      itemFormSchema: itemFormSchema,
      itemFormRules: itemFormRules,
      itemConfirmLoading: false
    })

    const itemFormState = reactive({
      id: undefined,
      dictTypeId: undefined,
      orderNum: undefined,
      dictItemName: undefined,
      dictItemValue: undefined,
      dictItemStatus: '0',
      description: undefined
    })

    const methods = reactive({
      handleTypeAdd: entity => {
        typeFormData.typeFormTitle = '新增字典类'
        typeFormState.parentId = entity.value
        getNextOrderNum().then(res => {
          typeFormState.orderNum = res.data
          typeFormData.typeFormVisible = true
        })
      },
      handleTypeEdit: entity => {
        typeFormData.typeFormTitle = '修改字典类'
        getDictType(entity.value).then(res => {
          Object.assign(typeFormState, res.data)
          typeFormData.typeFormVisible = true
        })
      },
      handleTypeDelete: entity => {
        proxy.$modal.delete({
          content: `是否确认删除 ${entity.label} 字典类?`,
          success: () => {
            return delUser(id).then(() => {
              tableData.tableRef.reset(tableData.filters, {
                deptId: treeData.selectedId
              })
            })
          }
        })
      },
      handleTypeClose: () => {
        typeFormData.typeFormVisible = false
        typeFormData.typeFormRef.resetFields()
        methods.resetTypeForm()
      },
      resetTypeForm: () => {
        Object.assign(typeFormState, {
          id: undefined,
          dictTypeName: undefined,
          dictTypeCode: undefined,
          orderNum: undefined,
          dictTypeStatus: '0',
          parentId: undefined,
          description: undefined
        })
      },
      handleTypeSubmit: () => {
        typeFormData.typeFormRef.validate().then(() => {
          typeFormData.typeConfirmLoading = true
          if (typeFormState.id) {
          } else {
            addDictType(typeFormState)
              .then(() => {
                typeTreeData.typeTreeRef.refresh()
                methods.handleTypeClose()
              })
              .finally(() => {
                typeFormData.typeConfirmLoading = false
              })
          }
        })
      },

      handleClickType: node => {
        typeTreeData.selectedId = node.value
        itemTableData.itemTableRef.reset(itemTableData.filters, {
          dictTypeId: typeTreeData.selectedId
        })
      },
      handleQuery: () => {
        itemTableData.queryLoad = true
        itemTableData.itemTableRef
          .reset(itemTableData.filters, {
            dictTypeId: typeTreeData.selectedId
          })
          .finally(() => {
            itemTableData.queryLoad = false
          })
      },
      handleReset: () => {
        itemTableData.filters = {}
        itemTableData.resetLoad = true
        itemTableData.itemTableRef
          .reset(itemTableData.filters, {
            dictTypeId: typeTreeData.selectedId
          })
          .finally(() => {
            itemTableData.resetLoad = false
          })
      },
      handleItemAdd: () => {
        itemFormData.itemFormTitle = '新增字典项'
        itemFormData.itemFormVisible = true
      },
      // 刷新按钮
      handleRefresh: () => {
        // tableData.tableRef.refresh(tableData.filters, {
        //   deptId: treeData.selectedId
        // })
      },
      // 修改按钮
      handleItemEdit: id => {
        // formData.formTitle = '修改用户'
        // getUser(id).then(res => {
        //   formData.formSchema.find(t => t.name === 'password').visible = false
        //   Object.assign(formState, res.data.user)
        //   formState.roleIds = res.data.roleIds
        //   formData.formVisible = true
        // })
      },
      // 删除按钮
      handleItemDelete: id => {
        // proxy.$modal.delete({
        //   success: () => {
        //     return delUser(id).then(() => {
        //       tableData.tableRef.reset(tableData.filters, {
        //         deptId: treeData.selectedId
        //       })
        //     })
        //   }
        // })
      },
      // 关闭表单
      handleItemClose: () => {
        itemFormData.itemFormData = false
        itemFormData.itemFormRef.resetFields()
        methods.handleResetItemForm()
      },
      // 重置表单
      handleResetItemForm: () => {
        Object.assign(itemFormState, {
          id: undefined,
          dictTypeId: undefined,
          orderNum: undefined,
          dictItemName: undefined,
          dictItemValue: undefined,
          dictItemStatus: '0',
          description: undefined
        })
      },
      // 提交按钮
      handleItemSubmit: () => {
        formData.formRef.validate().then(() => {
          formData.confirmLoading = true
          if (formState.id) {
            formState.password = undefined
            updateUser(formState)
              .then(() => {
                tableData.tableRef.reset()
                methods.handleItemClose()
              })
              .finally(() => {
                formData.confirmLoading = false
              })
          } else {
            addUser(formState)
              .then(() => {
                tableData.tableRef.reset()
                methods.handleItemClose()
              })
              .finally(() => {
                formData.confirmLoading = false
              })
          }

          methdos.handleResetItemForm()
        })
      }
    })

    return {
      typeFormState,
      itemFormState,
      ...toRefs(typeTreeData),
      ...toRefs(typeFormData),
      ...toRefs(itemTableData),
      ...toRefs(itemFormData),
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped></style>
