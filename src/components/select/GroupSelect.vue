<template>
  <div class="s-select s-group-select">
    <el-select v-bind="$attrs" :placeholder="placeholder || '请选择' + label">
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
      <el-option-group
        v-for="group in optionData"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-option-group>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'SGroupSelect',
  props: {
    label: {
      type: String,
      default: '...'
    },
    placeholder: {
      type: String
    },
    options: {
      type: Array,
      default: []
    },
    request: {
      type: Function
    }
  },
  setup(props) {
    const optionData = ref(props.options)

    onBeforeMount(async () => {
      if (props.request) {
        await props.request().then(result => {
          optionData.value = result
        })
      }
    })

    return {
      optionData
    }
  }
}
</script>
