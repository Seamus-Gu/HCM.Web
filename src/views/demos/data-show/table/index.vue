<template>
  <div class="example-table-container">
    <!-- <div>
      <Panel>
        <el-form>
          <el-row :gutter="8">
            <el-col :span="8">
              <el-form-item label="height">
                <el-input v-model="height">
                  <template #append>.px</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button @click="changeStripe">切换斑马纹</el-button>
            </el-col>
          </el-row>
        </el-form>
      </Panel>
    </div>
    <Panel>
      <Table :stripe="stripe" :api="getList" :columns="columns">
        <template #column5="{ row }">
          <el-tag :type="row.column5 === 'nice' ? 'success' : 'danger'">
            {{ row.column5 === 'nice' ? '正常' : '停用' }}
          </el-tag>
        </template>
        <template #rate="{ row }">
          <el-rate v-model="row.rate" disabled />
        </template>
        <template #column6="{ row }">
          <el-switch
            v-model="row.column6"
            active-value="0"
            inactive-value="1"
            disabled
          />
        </template>
        <template #column9="{ row }">
          <el-image style="width: 100px; height: 100px" :src="row.column9" />
        </template>
      </Table>
    </Panel> -->
  </div>
</template>

<script>
// import { Table, Panel, ToolBar } from '@com'
import { getList } from '@api/examples/data-show'

const columns = [
  {
    label: 'ID',
    dataIndex: 'id',
    sortable: true
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
    dataIndex: 'column3',
    sortable: true
  },
  {
    label: '列4',
    dataIndex: 'column4',
    sortable: true
  },
  {
    label: '列5',
    dataIndex: 'column5',
    sortable: true
  },
  {
    label: '列6',
    dataIndex: 'column6',
    sortable: true
  },
  {
    label: '列7',
    dataIndex: 'rate',
    sortable: true
  },
  {
    label: '列8',
    dataIndex: 'phoneNumber',
    sortable: true
  },
  {
    label: '列9',
    dataIndex: 'column9',
    sortable: true
  },
  {
    label: '列10',
    dataIndex: 'column10',
    sortable: true
  }
]
export default {
  // components: { Panel, Table },
  setup() {
    const configData = reactive({
      height: '500',
      stripe: true
    })

    const tableData = reactive({
      getList,
      columns
    })

    const methods = reactive({
      changeStripe: () => {
        configData.stripe = !configData.stripe
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
