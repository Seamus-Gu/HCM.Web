<template>
  <div class="example-table-container">
    <!-- <Panel>
      <el-form>
        <el-row :gutter="8">
          <el-col :span="8">
            <el-form-item label="height">
              <el-input v-model="height">
                <template #append>.px</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button @click="changeStripe">切换斑马纹</el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="changeBorder">切换纵向边框</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-button type="peimary">扩展/收缩</el-button>
    </Panel>
    <Panel>
      <TreeTable
        :height="`${height}.px`"
        :stripe="stripe"
        :border="border"
        :api="getTree"
        :columns="columns"
      >
      </TreeTable>
    </Panel> -->
  </div>
</template>

<script>
// import { TreeTable, Panel } from '@com'
import { getTree } from '@api/examples/data-show'
import { toRefs } from 'vue'

const columns = [
  {
    label: 'ID',
    dataIndex: 'id',
    sortable: true,
    visible: false
  },
  {
    label: '列1',
    dataIndex: 'column1',
    sortable: true
  },
  {
    label: '列2',
    dataIndex: 'column2',
    sortable: true
  },
  {
    label: '列3',
    dataIndex: 'date',
    sortable: true
  },
  {
    label: '列4',
    dataIndex: 'avatar',
    sortable: true
  },
  {
    label: '列5',
    dataIndex: 'ip',
    sortable: true
  },
  {
    label: '列6',
    dataIndex: 'email',
    sortable: true
  }
]
export default {
  // components: { Panel, TreeTable },
  setup() {
    const configData = reactive({
      height: '500',
      stripe: true,
      border: true
    })

    const tableData = reactive({
      getTree,
      columns
    })

    const methods = reactive({
      changeStripe: () => {
        configData.stripe = !configData.stripe
      },
      changeBorder: () => {
        configData.border = !configData.border
      }
    })

    return {
      ...toRefs(configData),
      ...toRefs(tableData),
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss"></style>
