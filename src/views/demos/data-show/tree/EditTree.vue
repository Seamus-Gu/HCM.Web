<template>
  <div class="example-edit-tree-container">
    <s-row>
      <s-col :span="8">
        <s-panel>
          <s-edit-tree :api="apiData"></s-edit-tree>
        </s-panel>
      </s-col>
    </s-row>
  </div>
</template>

<script>
const data = {
  code: 200,
  msg: '操作成功',
  data: [
    {
      value: 1,
      parentId: null,
      label: '字典类别1',
      weight: null,
      children: [
        {
          value: 2,
          parentId: null,
          label: '字典类别2',
          weight: null
        },
        {
          value: 3,
          parentId: null,
          label: '字典类别3',
          weight: null
        }
      ]
    }
  ]
}

export default {
  setup() {
    const methods = reactive({
      apiData: async () => {
        return data
      }
    })

    return {
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss"></style>
