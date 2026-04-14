<template>
  <div class="s-form-content">
    <el-form ref="formRef" :model="model" :rules="rules">
      <el-row :gutter="16">
        <template
          v-for="item in schema.filter(t => t.visible != false)"
          :key="item.dataIndex"
        >
          <el-col v-if="item.component" :span="item.span || 12">
            <el-form-item
              label-position="top"
              :label="item.label"
              :prop="item.name"
            >
              <component
                v-model="model[item.name]"
                v-bind="item.props"
                :is="`s-${item.component}`"
                :label="item.label"
              ></component>
            </el-form-item>
          </el-col>
          <slot v-else :name="item.name"></slot>
        </template>
        <slot></slot>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'SFormContent',
  props: {
    schema: {
      type: Array,
      default: [],
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    },
    labelWidth: {
      type: [String, Number],
      default: 'auto'
    }
  },
  components: {},
  setup(props, context) {
    const formRef = ref()

    const methods = reactive({
      validate: (isValid, invalidFields) => {
        return formRef.value.validate(isValid, invalidFields)
      },
      validateField: (isValid, invalidFields) => {
        return formRef.value.validateField(isValid, invalidFields)
      },
      resetFields: () => {
        return formRef.value.resetFields()
      },
      clearValidate: () => {
        return formRef.value.clearValidate()
      }
    })
    return {
      formRef,
      ...toRefs(methods)
    }
  }
}
</script>
