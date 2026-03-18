<template>
  <div>
    <s-form-content :schema="formSchema" :model="formState"></s-form-content>
    <s-row justify="center">
      <el-space>
        <s-button type="primary" @click="save">保存</s-button>
        <s-button @click="reset">重置</s-button>
      </el-space>
    </s-row>
  </div>
</template>
<script>
const formSchema = [
  {
    label: '用户昵称',
    name: 'nickName',
    component: 'input',
    span: 24
  },
  {
    label: '手机号码',
    name: 'phoneNumber',
    component: 'input',
    span: 24
  },
  {
    label: '邮箱',
    name: 'email',
    component: 'input',
    span: 24
  }
]

export default {
  setup() {
    const formState = reactive({
      nickName: undefined,
      phoneNumber: undefined,
      email: undefined
    })

    const formData = reactive({
      formSchema: formSchema,
      formRef: undefined,
      formVisible: false,
      formTitle: '新增用户',
      confirmLoading: false
    })

    const methods = reactive({
      save: () => {
        console.log(formState.email)
      },
      reset: () => {}
    })

    return {
      formState,
      ...toRefs(formData),
      ...toRefs(methods)
    }
  }
}
</script>
