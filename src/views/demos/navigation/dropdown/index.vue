<template>
  <div class="example-button-container">
    <s-panel title="基础用法">
      <s-row> 悬停在下拉菜单上以展开更多操作。 </s-row>
      <s-row>
        <s-dropdown>
          <span class="el-dropdown-link"> Dropdown List </span>
          <template #dropdown>
            <s-dropdown-item command="a">Action 1</s-dropdown-item>
            <s-dropdown-item command="b">Action 2</s-dropdown-item>
            <s-dropdown-item>Action 3</s-dropdown-item>
            <s-dropdown-item disabled>Action 4</s-dropdown-item>
            <s-dropdown-item divided>Action 5</s-dropdown-item>
          </template>
        </s-dropdown>
      </s-row>
    </s-panel>

    <s-panel title="触发对象">
      <s-row>
        设置 split-button
        属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮
      </s-row>
      <s-row>
        <s-col>
          <s-dropdown>
            <span class="el-dropdown-link"> Dropdown List </span>
            <template #dropdown>
              <s-dropdown-item command="a">Action 1</s-dropdown-item>
              <s-dropdown-item command="b">Action 2</s-dropdown-item>
              <s-dropdown-item>Action 3</s-dropdown-item>
              <s-dropdown-item disabled>Action 4</s-dropdown-item>
              <s-dropdown-item divided>Action 5</s-dropdown-item>
            </template>
          </s-dropdown>
        </s-col>
        <s-col>
          <s-dropdown split-button>
            <span class="el-dropdown-link"> Dropdown List </span>
            <template #dropdown>
              <s-dropdown-item command="a">Action 1</s-dropdown-item>
              <s-dropdown-item command="b">Action 2</s-dropdown-item>
              <s-dropdown-item>Action 3</s-dropdown-item>
              <s-dropdown-item disabled>Action 4</s-dropdown-item>
              <s-dropdown-item divided>Action 5</s-dropdown-item>
            </template>
          </s-dropdown>
        </s-col>
        <s-col>
          <s-dropdown split-button type="primary">
            <span class="el-dropdown-link"> Dropdown List </span>
            <template #dropdown>
              <s-dropdown-item command="a">Action 1</s-dropdown-item>
              <s-dropdown-item command="b">Action 2</s-dropdown-item>
              <s-dropdown-item>Action 3</s-dropdown-item>
              <s-dropdown-item disabled>Action 4</s-dropdown-item>
              <s-dropdown-item divided>Action 5</s-dropdown-item>
            </template>
          </s-dropdown>
        </s-col>
      </s-row>
    </s-panel>

    <s-panel>
      <div v-html="api"></div>
    </s-panel>
  </div>
</template>

<script>
import markdownit from 'markdown-it'

// import apiDoc from './md.js'

export default {
  setup() {
    const md = markdownit()
    // const api = md.render(apiDoc)

    const methods = reactive({})

    return {
      // api,
      ...toRefs(methods)
    }
  }
}
</script>
