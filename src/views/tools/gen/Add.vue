<template>
  <div class="gen-add-container">
    <s-panel>
      <s-row>
        <s-col :span="24">
          <s-steps style="padding: 0 16px" :active="0" finish-status="success">
            <s-step title="生成配置" />
            <s-step title="配置列" />
            <s-step title="生成表" />
          </s-steps>
        </s-col>
      </s-row>
      <s-row>
        <s-form-content
          ref="formRef"
          :labelWidth="90"
          :schema="formSchema"
          :model="formState"
          :rules="formRules"
        >
        </s-form-content>
      </s-row>

      <s-flex-row justify="center">
        <s-button type="primary" @click="handleNext">下一步</s-button>
      </s-flex-row>
    </s-panel>
  </div>
</template>

<script setup>
import { entityTypeEnum, boolEnum } from '@/data/enum'
import { componentOptions } from '@/data/option'

import { addGenTable } from '@/api/tool/gen'

const formSchema = [
  {
    label: '命名空间',
    name: 'nameSpace',
    component: 'input'
  },
  {
    label: '表名',
    name: 'tableName',
    component: 'input'
  },
  {
    label: '实体名称',
    name: 'name',
    component: 'input'
  },
  {
    label: '作者',
    name: 'author',
    component: 'input'
  },
  {
    label: '实体类型',
    name: 'entityType',
    component: 'select',
    props: {
      options: entityTypeEnum
    }
  },
  {
    label: '需要前端',
    name: 'hasFrontend',
    component: 'select',
    props: {
      options: boolEnum
    }
  },
  {
    label: '需要分页',
    name: 'hasPagination',
    component: 'checkBox'
  },
  {
    label: '需要Combo',
    name: 'hasCombo',
    component: 'checkBox'
  },

  {
    label: '描述',
    name: 'description',
    component: 'input',
    span: 24,
    props: {
      type: 'textarea',
      rows: 3
    }
  }
]

const formRules = {
  nameSpace: [
    {
      required: true,
      message: '命名空间必须填写',
      trigger: 'blur'
    }
  ],
  tableName: [
    {
      required: true,
      message: '表名必须填写',
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      message: '名称必须填写',
      trigger: 'blur'
    }
  ]
}

const router = useRouter()

const formRef = ref()
const formState = ref({
  id: undefined,
  nameSpace: undefined,
  tableName: undefined,
  name: undefined,
  author: undefined,
  entityType: 0,
  hasFrontend: true,
  hasPagination: true,
  hasCombo: false,
  description: undefined
})

function handleNext() {
  formRef.value.validate().then(() => {
    addGenTable(formState.value).then(res => {
      router.push({
        path: '/tool/gen/column`',
        query: { detailId: id }
      })
    })
  })
}
</script>
