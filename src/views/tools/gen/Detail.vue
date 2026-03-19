<template>
  <div class="gen-column-container">
    <s-row>
      <s-col :span="24">
        <s-panel>
          <s-flex-row justify="center">
            <s-flex-col :spjian="24">
              <s-steps
                :active="2"
                finish-status="success"
                style="padding: 0 16px"
              >
                <s-step title="生成配置" />
                <s-step title="配置列" />
                <s-step title="完成" />
              </s-steps>
            </s-flex-col>
            <s-flex-col :span="24">
              <s-result icon="success" title="提交成功"> </s-result>
            </s-flex-col>
          </s-flex-row>

          <s-flex-row justify="center">
            <s-button type="primary" @click="handleNext">返回</s-button>
          </s-flex-row>
        </s-panel>
      </s-col>
    </s-row>

    <s-row v-if="!isSuccess">
      <s-col :span="24">
        <s-panel title="SQL语句">
          <s-input type="textarea" :rows="10" v-model="sqlContent"></s-input>
        </s-panel>
      </s-col>
    </s-row>
  </div>
</template>
<script setup>
import lodash from 'lodash'
import dayjs from 'dayjs'

import { boolEnum } from '@/data/enum'
import { componentOptions } from '@/data/option'
import { getEnumCombo } from '@/api/enum'
import { getGenSql } from '@/api/tool/gen'

const sqlTypeEnum = ref([])

const columns = [
  {
    label: '列名',
    name: 'columnName',
    sortable: true
  },
  {
    label: '列类型',
    name: 'columnType',
    sortable: true
  },
  {
    label: '长度',
    name: 'columnLength',
    sortable: true
  },
  {
    label: '列描述(注释)',
    name: 'columnDesc',
    sortable: true
  },
  {
    name: 'action'
  }
]

const router = useRouter()
const { proxy } = getCurrentInstance()

const tableId = ref()
const isSuccess = ref(false)
const hasFrontend = ref(false)

const tableRef = ref() // Table Ref
const sqlContent = ref()

isSuccess.value = router.currentRoute.value.query.isSuccess
tableId.value = router.currentRoute.value.query.tableId

getEnumCombo('SQLType').then(res => {
  sqlTypeEnum.value = res.data
})

if (!isSuccess.value) {
  getGenSql({ tableId: tableId.value }).then(res => {
    sqlContent.value = res.data
  })
}
</script>
