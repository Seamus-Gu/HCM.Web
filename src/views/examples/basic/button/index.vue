<template>
  <div class="example-button-container">
    <s-panel title="基础用法" style="margin-bottom: 8px">
      <s-row> 使用 type 和 circle 来定义按钮的样式。 </s-row>
      <s-row>
        <el-space>
          <s-button>Default </s-button>
          <s-button>默认 </s-button>
          <s-button type="primary">primary </s-button>
          <s-button type="primary">按钮 </s-button>
          <s-button type="success">success </s-button>
          <s-button type="info">info </s-button>
          <s-button type="warning">warning </s-button>
          <s-button type="danger">danger </s-button>
        </el-space>
      </s-row>
      <s-row>
        <el-space>
          <s-button circle>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </s-button>
          <s-button type="primary" circle>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </s-button>
          <s-button type="success" circle>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </s-button>
          <s-button type="info" circle>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </s-button>
          <s-button type="warning" circle>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </s-button>
          <s-button type="danger" circle>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </s-button>
        </el-space>
      </s-row>
    </s-panel>

    <s-panel title="禁用状态" style="margin-bottom: 8px">
      <s-row>你可以使用 disabled 属性来定义按钮是否被禁用。</s-row>
      <s-row>
        <el-space>
          <s-button disabled>Default </s-button>
          <s-button type="primary" disabled>primary </s-button>
          <s-button type="success" disabled>success </s-button>
          <s-button type="info" disabled>info </s-button>
          <s-button type="warning" disabled>warning </s-button>
          <s-button type="danger" disabled>danger </s-button>
        </el-space>
      </s-row>
    </s-panel>

    <s-panel title="链接按钮" style="margin-bottom: 8px">
      <s-row>链接按钮</s-row>
      <s-row>
        <el-space>
          <s-button link>Default </s-button>
          <s-button link type="primary">primary </s-button>
          <s-button link type="success">success </s-button>
          <s-button link type="info">info </s-button>
          <s-button link type="warning">warning </s-button>
          <s-button link type="danger">danger </s-button>
        </el-space>
      </s-row>
      <s-row>禁用链接按钮</s-row>
      <s-row>
        <el-space>
          <s-button link disabled>Default </s-button>
          <s-button link type="primary" disabled>primary </s-button>
          <s-button link type="success" disabled>success </s-button>
          <s-button link type="info" disabled>info </s-button>
          <s-button link type="warning" disabled>warning </s-button>
          <s-button link type="danger" disabled>danger </s-button>
        </el-space>
      </s-row>
    </s-panel>

    <s-panel title="图标按钮" style="margin-bottom: 8px">
      <s-row>使用图标为按钮添加更多的含义</s-row>
      <s-row>
        <el-space>
          <s-button>
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </s-button>
          <s-button type="primary">
            <svg class="icon" ariel-hidden="true">
              <use xlink:href="#icon-search" />
            </svg>
          </s-button>
          <s-button type="primary">
            <template #icon>
              <svg class="icon" ariel-hidden="true" font-size="12px">
                <use xlink:href="#icon-search" />
              </svg>
            </template>
            Test
          </s-button>
          <s-button type="primary">
            <template #append>
              <svg class="icon" ariel-hidden="true">
                <use xlink:href="#icon-search" />
              </svg>
            </template>
            <span>Test</span>
          </s-button>
        </el-space>
      </s-row>
    </s-panel>

    <s-panel title="加载状态按钮" style="margin-bottom: 8px">
      <s-row>通过设置 loading 属性为 true 来显示加载中状态。</s-row>
      <s-row>
        <el-space>
          <s-button type="primary" :loading="true">Default </s-button>
        </el-space>
      </s-row>
    </s-panel>

    <s-panel title="调整尺寸" style="margin-bottom: 8px">
      <s-row>
        除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。
        使用 size 属性额外配置尺寸，可使用 large和small两种值。
      </s-row>
      <s-row>
        <el-space>
          <s-button size="large">Large </s-button>
          <s-button>Default </s-button>
          <s-button size="small">small </s-button>
        </el-space>
      </s-row>
    </s-panel>
    <s-panel>
      <div v-html="api"></div>
    </s-panel>
  </div>
</template>

<script>
import markdownit from 'markdown-it'

import apiDoc from './md.js'

export default {
  setup() {
    const md = markdownit()
    const api = md.render(apiDoc)

    const methods = reactive({})

    return {
      api,
      ...toRefs(methods)
    }
  }
}
</script>
