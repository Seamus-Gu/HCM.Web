<template>
  <div class="s-form">
    <el-dialog
      :modelValue="visible"
      :title="title"
      :width="width"
      :close-on-click-modal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      :showClose="showClose"
      :draggable="draggable"
      :center="center"
      :align-center="alignCenter"
      :destroyOnClose="destroyOnClose"
      @open="handleOpen"
      @opened="opened"
      @close="handleClose"
      @closed="closed"
    >
      <el-form
        ref="formRef"
        :model="model"
        :rules="rules"
        :validate-on-rule-change="false"
      >
        <el-row :gutter="16">
          <template
            v-for="item in schema.filter(t => t.visible != false)"
            :key="item.dataIndex"
          >
            <s-flex-col v-if="item.component" :span="item.span || 12">
              <s-form-item
                :label="item.label"
                :prop="item.name"
                :label-width="labelWidth"
              >
                <component
                  v-model="model[item.name]"
                  v-bind="item.props"
                  :is="`s-${item.component}`"
                  :label="item.label"
                ></component>
              </s-form-item>
            </s-flex-col>
            <slot v-else :name="item.name"></slot>
          </template>
          <slot></slot>
        </el-row>
      </el-form>

      <!-- 对话框标题插槽 -->
      <template #header v-if="$slots.header">
        <slot name="header"></slot>
      </template>
      <!-- 对话框操作区域插槽 -->
      <template #footer>
        <div class="dialog-footer" v-if="!$slots.footer">
          <s-button @click="handleClose">取 消</s-button>
          <s-button
            type="primary"
            @click="handleConfirm"
            :loading="confirmLoading"
          >
            确 定
          </s-button>
        </div>
        <slot v-else name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'SForm',
  props: {
    // 是否显示表单
    visible: {
      type: Boolean
    },
    // 对话框标题
    title: {
      type: String
    },
    // 对话框宽度
    width: {
      type: [String, Number]
    },
    // 是否可以通过点击遮罩关闭表单
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    // 是否可以通过 Esc 关闭表单
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 表单是否可拖拽
    draggable: {
      type: Boolean,
      default: false
    },
    // 表单 Header 和 Footer 居中排列
    center: {
      type: Boolean,
      default: false
    },
    // 表单垂直居中
    alignCenter: {
      type: Boolean,
      default: true
    },
    // 关闭表单销毁元素
    destroyOnClose: {
      type: Boolean,
      default: true
    },
    // allDisabled: {
    //   type: Boolean,
    //   default: false
    // },
    // 列宽度
    labelWidth: {
      type: [String, Number],
      default: '96px'
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    schema: {
      type: Array,
      default: [],
      required: true
    },
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  components: {},
  setup(props, context) {
    const formRef = ref()

    const methods = reactive({
      // 打开的回调
      handleOpen: () => {
        context.emit('open')
      },
      // 打开动画结束时的回调
      opened: () => {
        context.emit('opend')
      },
      // 关闭的回调
      handleClose: () => {
        context.emit('close')
      },
      // 关闭动画结束时的回调
      closed: () => {
        context.emit('closed')
      },
      // 验证表单
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
      },
      handleConfirm: () => {
        context.emit('confirm')
      }
    })
    return {
      formRef,
      ...toRefs(methods)
    }
  }
}
</script>
