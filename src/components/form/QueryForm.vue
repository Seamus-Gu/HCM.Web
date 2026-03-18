<template>
  <div class="s-query-form">
    <el-form ref="formRef" :model="filters">
      <el-row :gutter="16">
        <template
          v-for="(item, index) in schema.filter(t => !t.hidden)"
          :key="item.dataIndex"
        >
          <el-col
            v-if="item.component"
            :sm="item.sm ?? 24"
            :md="item.md ?? 12"
            :lg="item.lg ?? 8"
          >
            <el-form-item
              v-show="!isExpend || index < expendIndex"
              :label="item.label"
              :prop="item.name"
              :label-width="labelWidth"
            >
              <component
                v-model="filters[item.name]"
                v-bind="item.props"
                :is="`s-${item.component}`"
                :label="item.label"
                @keyup.enter="query"
              ></component>
            </el-form-item>
          </el-col>
          <slot v-else :name="item.name"></slot>
        </template>
        <el-col :span="buttonGroupSpan">
          <div style="display: flex; justify-content: end">
            <s-button type="primary" @click="query" :loading="queryLoad">
              查询
            </s-button>
            <s-button
              style="margin-left: 10px"
              @click="reset"
              :loading="resetLoad"
            >
              重置
            </s-button>
            <s-button
              v-if="showExpand"
              style="margin-left: 10px"
              @click="expend"
            >
              {{ isExpend ? '展开' : '收缩' }}
              <svg
                class="icon expend-icon"
                ariel-hidden="true"
                font-size="14px"
                :style="{ transform: isExpend ? '' : 'rotate(180deg)' }"
              >
                <use xlink:href="#icon-angle-down" />
              </svg>
            </s-button>
          </div>
        </el-col>
        <slot></slot>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import useAppStore from '@/store/modules/app'

const sizeDeafult = {
  lg: 8,
  md: 12,
  sm: 24
}

export default {
  name: 'SQueryForm',
  props: {
    queryLoad: {
      type: Boolean
    },
    resetLoad: {
      type: Boolean
    },
    filters: {
      type: Object,
      required: true
    },
    schema: {
      type: Array,
      default: [],
      required: true
    },
    labelWidth: {
      type: [String, Number],
      default: '96px'
    }
  },
  components: {},
  setup(props, context) {
    const appStore = useAppStore()
    const size = computed(() => appStore.size)

    const formRef = ref()

    const expendData = reactive({
      buttonGroupSpan: 24,
      showExpand: false,
      isExpend: false,
      expendIndex: undefined
    })

    const methods = reactive({
      init: () => {
        const schemaData = props.schema.filter(t => !t.hidden)
        const sizeVal = size.value
        const sizeDefaultVal = sizeDeafult[sizeVal]

        let span = 0
        let getIndex = false

        for (let i = 0; i < schemaData.length; i++) {
          const spanVal = schemaData[i][sizeVal] ?? sizeDefaultVal
          span += spanVal

          if (!getIndex && span > 24) {
            getIndex = true
            expendData.expendIndex = i
          }
        }

        if (size == 'sm' || span % 24 == 0 || span % 24 > 12) {
          expendData.buttonGroupSpan = 24
        } else {
          expendData.buttonGroupSpan = 24 - (span % 24)
        }

        let row = span / 24
        if (expendData.buttonGroupSpan != 24) {
          row -= 1
        }

        expendData.showExpand = row > 1
      },
      query: () => {
        context.emit('query')
      },
      reset: () => {
        context.emit('reset')
      },
      expend: () => {
        expendData.isExpend = !expendData.isExpend
      }
    })

    watch(size, () => {
      methods.init()
    })

    methods.init()

    return {
      ...toRefs(expendData),
      ...toRefs(methods)
    }
  }
}
</script>
