<template>
  <el-popover
    class="icon-select-container"
    v-model:visible="visible"
    :trigger="trigger"
    :placement="placement"
    :width="width"
  >
    <template #reference>
      <s-input :value="modelValue" placeholder="请选择图标" readonly></s-input>
    </template>
    <div class="icon-select-body">
      <s-input
        v-model="search"
        placeholder="输入关键字进行搜索"
        @input="filterIcon"
      />
      <div class="icon-list-panel">
        <div class="list-container">
          <div
            class="icon-box"
            v-for="(item, index) in list"
            :key="index"
            @click="changeIcon(item), close()"
          >
            <s-button>
              <svg class="icon" ariel-hidden="true" font-size="16px">
                <use :xlink:href="'#' + item" />
              </svg>
            </s-button>
          </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          size="small"
          style="margin-top: 8px"
          :total="total"
          :pageSize="pageSize"
          @change="changeCurrent"
        />
      </div>
    </div>
  </el-popover>
</template>
<script>
import iconList from '@/assets/json/icon-list.json'

export default {
  name: 'SIconSelect',
  props: {
    modelValue: {
      type: String
    },
    width: {
      type: String,
      default: '242px'
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    trigger: {
      type: String,
      default: 'click'
    },
    pageSize: {
      type: Number,
      default: 28
    }
  },
  setup(props, context) {
    const iconSelectData = reactive({
      visible: false,
      list: iconList.slice(0, props.pageSize),
      total: iconList.length,
      search: undefined
    })

    const methods = reactive({
      close: () => {
        iconSelectData.visible = false
      },
      filterIcon: () => {
        if (iconSelectData.search) {
          iconSelectData.list = iconList.filter(item =>
            item.toLowerCase().includes(iconSelectData.search.toLowerCase())
          )
          iconSelectData.total = iconSelectData.list.length
        } else {
          iconSelectData.list = iconList.slice(0, props.pageSize)
          iconSelectData.total = iconList.length
        }
      },
      changeCurrent: page => {
        let start = (page - 1) * props.pageSize
        let end = page * props.pageSize
        iconSelectData.list = iconList.slice(start, end)
      },
      changeIcon: icon => {
        let iconVal = icon.slice(5)
        context.emit('update:modelValue', iconVal)
      }
    })
    return {
      ...toRefs(iconSelectData),
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-select-body {
  width: 100%;
  .icon-list-panel {
    margin-top: 4px;
    height: 200px;
    overflow: auto;
    .list-container {
      display: flex;
      flex-wrap: wrap;
      .icon-box {
        margin-top: 4px;
        width: 25%;
      }
    }
  }
}
</style>
