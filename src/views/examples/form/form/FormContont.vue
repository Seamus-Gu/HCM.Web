<template>
  <div class="example-form-container">
    <s-form-content :schema="schema" :model="formState"> </s-form-content>
    <s-button @click="test">Submit</s-button>
  </div>
</template>

<script>
const schema = [
  {
    label: '用户名',
    name: 'input',
    component: 'input'
  },
  {
    label: '性别',
    name: 'select',
    component: 'select',
    props: {
      options: [
        {
          label: '男',
          value: 'man'
        },
        {
          label: '女',
          value: 'woman'
        }
      ]
    }
  },
  {
    label: '地区',
    name: 'area',
    component: 'input'
  },
  {
    label: '日期',
    name: 'datePicker',
    component: 'date-picker'
  },
  {
    label: '是否成功',
    name: 'switch',
    component: 'switch'
  },
  {
    label: '数字',
    name: 'number',
    component: 'input-number'
  }
]

export default {
  setup() {
    const themeVal = ref()

    const formState = reactive({
      input: undefined,
      select: undefined,
      switch: undefined
    })

    const methods = reactive({})

    return {
      schema,
      formState,
      ...toRefs(methods)
    }
  }
}
</script>
