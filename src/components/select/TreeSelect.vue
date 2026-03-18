<template>
  <div class="s-select s-tree-select">
    <el-tree-select
      v-bind="$attrs"
      :data="optionData"
      :placeholder="placeholder || '请选择' + label"
    >
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
    </el-tree-select>
  </div>
</template>

<script>
export default {
  name: 'STreeSelect',
  props: {
    label: {
      type: String,
      default: '...'
    },
    placeholder: {
      type: String
    },
    data: {
      type: Array,
      default: []
    },
    request: {
      type: Function
    }
  },
  setup(props) {
    const optionData = ref(props.data)

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
