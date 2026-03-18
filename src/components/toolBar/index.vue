<template>
  <div class="s-tool-bar">
    <el-row justify="space-between" align="middle">
      <div class="main-left">
        <el-space>
          <s-button
            v-if="hasAdd"
            v-has="addPer"
            type="primary"
            :loading="addLoad"
            @click="handleAdd"
          >
            <template #icon>
              <svg class="icon" ariel-hidden="true" font-size="15px">
                <use xlink:href="#icon-plus" />
              </svg>
            </template>
            新增
          </s-button>
          <s-button
            v-if="hasBatchDelete"
            v-has="batchDeletePer"
            danger="true"
            @click="handleBatchDelete"
          >
            <template #icon>
              <svg class="icon" ariel-hidden="true" font-size="15px">
                <use xlink:href="#icon-trash-alt" />
              </svg>
            </template>
            批量删除
          </s-button>
          <s-button
            v-if="hasExport"
            v-has="exportPer"
            type="info"
            :loading="exportLoad"
            @click="handleExport"
          >
            <template #icon>
              <svg class="icon" ariel-hidden="true" font-size="15px">
                <use xlink:href="#icon-download" />
              </svg>
            </template>
            导出
          </s-button>
          <s-button
            v-if="hasExpand"
            @click="expand"
            type="info"
            :loading="expandLoad"
          >
            <template #icon>
              <svg class="icon" ariel-hidden="true" font-size="15px">
                <use xlink:href="#icon-folding" />
              </svg>
            </template>
            展开/折叠
          </s-button>
          <slot></slot>
        </el-space>
      </div>
      <div class="main-right">
        <el-space>
          <el-tooltip content="刷新" placement="top">
            <div class="refresh-svg" @click="refresh">
              <svg
                class="icon cursor-pointer"
                ariel-hidden="true"
                font-size="18px"
              >
                <use xlink:href="#icon-refresh" />
              </svg>
            </div>
          </el-tooltip>
          <el-tooltip content="间距" placement="top">
            <s-dropdown :trigger="['click']" @command="changeSize">
              <svg
                class="icon cursor-pointer"
                ariel-hidden="true"
                font-size="18px"
              >
                <use xlink:href="#icon-column-height" />
              </svg>
              <template #dropdown>
                <s-dropdown-item command="large">宽松</s-dropdown-item>
                <s-dropdown-item command="default">默认</s-dropdown-item>
                <s-dropdown-item command="small">紧凑</s-dropdown-item>
              </template>
            </s-dropdown>
          </el-tooltip>
          <el-tooltip content="列设置" placement="top">
            <div class="columns-svg" @click="columnsVisible = true">
              <svg
                class="icon cursor-pointer"
                ariel-hidden="true"
                font-size="20px"
              >
                <use xlink:href="#icon-column-setting" />
              </svg>
            </div>
          </el-tooltip>
        </el-space>
      </div>
    </el-row>
    <el-dialog
      v-model="columnsVisible"
      :width="700"
      title="列设置"
      class="align-center-dialog"
    >
      <div style="text-align: center">
        <el-transfer
          v-model="targetKeys"
          :data="transferData"
          :filterable="true"
          :titles="['显示', '隐藏']"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <s-button @click="columnsVisible = false">取消</s-button>
          <s-button type="primary" @click="changeColumns"> 确认 </s-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import useSettingsStore from '@/store/modules/settings'

export default {
  name: 'SToolBar',
  props: {
    hasAdd: {
      type: Boolean,
      default: true
    },
    hasExport: {
      type: Boolean,
      default: false
    },
    hasBatchDelete: {
      type: Boolean,
      default: false
    },
    hasExpand: {
      type: Boolean,
      default: false
    },

    addPer: {
      type: Array
    },
    exportPer: {
      type: Array
    },
    batchDeletePer: {
      type: Array
    },

    addLoad: {
      type: Boolean,
      default: false
    },
    exportLoad: {
      type: Boolean,
      default: false
    },
    expandLoad: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: []
    }
  },
  setup(props, context) {
    const settingsStore = useSettingsStore()
    const loadData = reactive({
      addLoad: false
    })

    const columnsData = reactive({
      transferData: props.columns.filter(t => {
        t.key = t.dataIndex
        return true
      }),
      columnsVisible: false,
      targetKeys: [],
      selectedKeys: []
    })

    const methods = reactive({
      handleAdd: () => {
        context.emit('add')
      },
      handleBatchDelete: () => {
        context.emit('batchDelete')
      },
      handleExport: () => {
        context.emit('export')
      },
      expand: () => {
        context.emit('expand')
      },
      refresh: () => {
        context.emit('refresh')
      },
      changeSize: key => {
        settingsStore.setTableSize(key)
      },
      handleColumnsChange: (nextTargetKeys, direction, moveKeys) => {
        columnsData.targetKeys = nextTargetKeys
      },
      handleColumnsSelectChange: (sourceSelectedKeys, targetSelectedKeys) => {
        columnsData.selectedKeys = [
          ...sourceSelectedKeys,
          ...targetSelectedKeys
        ]
      },
      changeColumns: () => {
        for (let item in props.columns) {
          const key = props.columns[item].dataIndex
          props.columns[item].visible = !columnsData.targetKeys.includes(key)
        }
        columnsData.columnsVisible = false
      }
    })

    return {
      ...toRefs(columnsData),
      ...toRefs(loadData),
      ...toRefs(methods)
    }
  }
}
</script>
