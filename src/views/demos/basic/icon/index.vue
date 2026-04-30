<template>
  <div class="example-button-container">
    <s-panel title="基础布局">
      <el-row> ELement-Plus</el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content ep-bg-purple-dark" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content ep-bg-purple-dark" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="12">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="8">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
      </el-row>

      <s-row>封装</s-row>
      <s-row>
        <s-col :span="12">
          <div class="grid-content ep-bg-purple-dark" />
        </s-col>
      </s-row>
      <s-row>
        <s-col :span="24">
          <div class="grid-content ep-bg-purple-dark" />
        </s-col>
      </s-row>
      <s-row>
        <s-col :span="12"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="12">
          <div class="grid-content ep-bg-purple-light" />
        </s-col>
      </s-row>
      <s-row>
        <s-col :span="12"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="12">
          <div class="grid-content ep-bg-purple-light" />
        </s-col>
      </s-row>
      <s-row>
        <s-col :span="8"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="8">
          <div class="grid-content ep-bg-purple-light" />
        </s-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
      </s-row>
      <s-row>
        <s-col :span="6"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </s-col>
        <s-col :span="6"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </s-col>
      </s-row>
      <s-row>
        <s-col :span="4"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="4">
          <div class="grid-content ep-bg-purple-light" />
        </s-col>
        <s-col :span="4"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="4">
          <div class="grid-content ep-bg-purple-light" />
        </s-col>
        <s-col :span="4"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="4">
          <div class="grid-content ep-bg-purple-light" />
        </s-col>
      </s-row>
    </s-panel>

    <s-panel title="分栏间隔">
      <el-row>
        支持列间距。行提供 gutter 属性来指定列之间的间距，其默认值为0。
      </el-row>
      <el-row> Element-Plus </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>

      <s-row> 封装 </s-row>
      <s-row :gutter="20" style="margin-top: 8px">
        <s-col :span="6"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="6"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="6"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="6"><div class="grid-content ep-bg-purple" /></s-col>
      </s-row>
    </s-panel>

    <s-panel title="混合布局">
      <el-row>
        通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。
      </el-row>
      <el-row>Element-Plus</el-row>
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="16"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>

      <s-row>封装</s-row>
      <s-row :gutter="20">
        <s-col :span="16"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="8"><div class="grid-content ep-bg-purple" /></s-col>
      </s-row>
      <s-row :gutter="20">
        <s-col :span="8"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="8"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="4"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="4"><div class="grid-content ep-bg-purple" /></s-col>
      </s-row>
      <s-row :gutter="20">
        <s-col :span="4"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="16"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="4"><div class="grid-content ep-bg-purple" /></s-col>
      </s-row>
    </s-panel>

    <s-panel title="列偏移">
      <el-row>
        您可以指定列偏移量。 通过制定 col 组件的 offset
        属性可以指定分栏偏移的栏数。
      </el-row>
      <el-row>Element-Plus</el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="6" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </el-col>
      </el-row>

      <s-row>封装</s-row>
      <s-row :gutter="20">
        <s-col :span="6"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="6" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </s-col>
      </s-row>
      <s-row :gutter="20">
        <s-col :span="6" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </s-col>
        <s-col :span="6" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </s-col>
      </s-row>
      <s-row :gutter="20">
        <s-col :span="12" :offset="6">
          <div class="grid-content ep-bg-purple" />
        </s-col>
      </s-row>
    </s-panel>

    <s-panel title="对齐方式">
      您可以通过justify
      属性来定义子元素的排版方式，其取值为start、center、end、space-between、space-around或space-evenly。

      <el-row> Element-Plus </el-row>
      <el-row class="row-bg">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row class="row-bg" justify="center">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row class="row-bg" justify="end">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row class="row-bg" justify="space-between">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row class="row-bg" justify="space-around">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row class="row-bg" justify="space-evenly">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple" />
        </el-col>
      </el-row>

      <s-row> 封装 </s-row>
      <s-row class="row-bg">
        <s-col :span="6"><div class="grid-content ep-bg-purple" /></s-col>
        <s-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </s-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </s-row>
      <el-row class="row-bg" justify="center">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row class="row-bg" justify="end">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row class="row-bg" justify="space-between">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row class="row-bg" justify="space-around">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
      <el-row class="row-bg" justify="space-evenly">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple" />
        </el-col>
      </el-row>
    </s-panel>

    <s-panel title="响应式布局">
      <el-row>Element-Plus</el-row>
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content ep-bg-purple-light" />
        </el-col>
      </el-row>

      <s-row>封装</s-row>
      <s-row :gutter="10">
        <s-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content ep-bg-purple" />
        </s-col>
        <s-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div class="grid-content ep-bg-purple-light" />
        </s-col>
        <s-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div class="grid-content ep-bg-purple" />
        </s-col>
        <s-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content ep-bg-purple-light" />
        </s-col>
      </s-row>
    </s-panel>
  </div>
</template>

<script>
export default {
  setup() {
    const themeVal = ref()

    const methods = reactive({
      test: val => {
        console.log(111)
      }
    })

    return {
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.ep-bg-purple-light {
  background: #667180;
}
.ep-bg-purple {
  background: #46494d;
}
.ep-bg-purple-dark {
  background: #242546;
}
</style>
