<template>
  <div>
    <s-form-content :schema="formSchema" :model="formState"></s-form-content>
    <el-row justify="center">
      <el-space>
        <s-button type="primary" @click="savePwd">保存</s-button>
        <s-button @click="resetPwd">重置</s-button>
      </el-space>
    </el-row>
  </div>
</template>

<script>
const formSchema = [
  {
    label: '旧密码',
    name: 'oldPassword',
    component: 'input',
    span: 24,
    props: {
      showPassword: true
    }
  },
  {
    label: '新密码',
    name: 'newPassword',
    component: 'input',
    span: 24,
    props: {
      showPassword: true
    }
  },
  {
    label: '确认密码',
    name: 'confirmPassword',
    component: 'input',
    span: 24,
    props: {
      showPassword: true
    }
  }
]

export default {
  setup() {
    const formState = reactive({
      oldPassword: undefined
    })

    const formData = reactive({
      formSchema: formSchema,

      formRef: undefined,
      formVisible: false,
      formTitle: '新增用户',
      confirmLoading: false
    })

    const methods = reactive({
      savePwd: () => {},
      resetPwd: () => {}
    })

    return {
      formState,
      ...toRefs(formData),
      ...toRefs(methods)
    }
  }
}
</script>
