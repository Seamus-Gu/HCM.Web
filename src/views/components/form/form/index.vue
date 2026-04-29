<template>
  <div class="example-form-container">
    <s-form
      ref="formRef"
      :schema="formSchema"
      :visible="formVisible"
      :title="formTitle"
      :model="formState"
      :rules="formRules"
      @submit="handleSubmit"
      @close="handleClose"
    >
    </s-form>
    <s-button @click="showForm">ShowForm</s-button>
  </div>
</template>

<script>
const formSchema = [
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

const formRules = {
  username: [
    {
      required: true,
      message: '用户名必须填写',
      trigger: 'blur'
    },
    {
      min: 2,
      max: 20,
      message: '用户名称长度必须介于 2 和 20 之间',
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
      message: '用户昵称必须填写',
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

export default {
  setup() {
    const themeVal = ref()

    const formData = reactive({
      formRef: undefined,
      formVisible: false,
      formTitle: '新增用户',
      formSchema: formSchema,
      formRules: formRules,
      confirmLoading: false
    })

    const formState = reactive({
      input: undefined,
      select: undefined,
      switch: undefined
    })

    const methods = reactive({
      showForm: () => {
        formData.formTitle = '新增用户'
        formData.formVisible = true
      },
      handleSubmit: () => {},
      handleClose: () => {
        formData.formVisible = false
      }
    })

    return {
      formState,
      ...toRefs(formData),
      ...toRefs(methods)
    }
  }
}
</script>
