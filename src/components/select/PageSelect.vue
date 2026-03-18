<template>
  <div class="s-select s-page-select">
    <el-select
      v-bind="$attrs"
      :loading="loading"
      :placeholder="placeholder || '请选择' + label"
      @visible-change="visibleChange"
    >
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData"></slot>
      </template>
      <template v-if="hasSearch" #header>
        <s-input
          v-model="search"
          :clearable="true"
          placeholder="请输入搜索值"
          @change="handleSearch"
        >
          <template #append>
            <s-button @click="handleSearch">
              <svg class="icon" ariel-hidden="true">
                <use xlink:href="#icon-search" />
              </svg>
            </s-button>
          </template>
        </s-input>
      </template>
      <div class="select-contont">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </div>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'SPageSelect',
  props: {
    label: {
      type: String,
      default: '...'
    },
    placeholder: {
      type: String
    },
    pageSize: {
      type: Number,
      default: 10
    },
    hasSearch: {
      type: Boolean,
      default: false
    },
    searchName: {
      type: String,
      default: 'search'
    },
    init: {
      type: Object
    },
    request: {
      type: Function
    }
  },
  setup(props) {
    const selectData = reactive({
      options: [],
      loading: false,
      selectDom: undefined,
      initValList: undefined,
      search: undefined
    })

    const paginationData = reactive({
      pageNum: 1,
      pageSize: props.pageSize,
      total: 0
    })

    const methods = reactive({
      visibleChange: isShow => {
        if (isShow) {
          if (paginationData.pageNum === 1) {
            selectData.loading = true

            const queryData = {
              pageNum: paginationData.pageNum,
              pageSize: paginationData.pageSize
            }

            props.request(queryData).then(res => {
              selectData.options = res.data.items
              paginationData.total = res.data.total
              paginationData.pageNum += 1
              selectData.loading = false
            })
          }

          const parentDom = document.querySelectorAll(
            '.el-select-dropdown .el-scrollbar .el-select-dropdown__wrap'
          )
          setTimeout(() => {
            parentDom.forEach((e, index) => {
              const content = e.querySelector('.select-contont')
              if (content && content.children && content.children.length > 0) {
                selectData.selectDom = parentDom[index]
                selectData.selectDom.addEventListener(
                  'scroll',
                  methods.handleScroll,
                  false
                )
              }
            })
          }, 1000)
        } else {
          // // 移除滚动监听
          selectData.selectDom?.removeEventListener(
            'scroll',
            methods.handleScroll,
            false
          )
        }
      },
      handleScroll: async e => {
        const self = e.target
        if (self.scrollHeight - self.scrollTop <= self.clientHeight) {
          const isLoading =
            paginationData.pageNum * paginationData.pageSize <
            paginationData.total

          if (isLoading) {
            selectData.loading = true

            const queryData = {
              pageNum: paginationData.pageNum,
              pageSize: paginationData.pageSize
            }

            if (selectData.search) {
              queryData[props.searchName] = selectData.search
            }

            setTimeout(() => {
              props.request(queryData).then(res => {
                selectData.options = selectData.options.concat(res.data.items)
                paginationData.total = res.data.total
                paginationData.pageNum += 1
                selectData.loading = false
              })
            }, 500)
          }
        }
      },
      handleSearch: () => {
        selectData.loading = true
        paginationData.pageNum = 1

        const queryData = {
          pageNum: paginationData.pageNum,
          pageSize: paginationData.pageSize
        }
        queryData[props.searchName] = selectData.search

        setTimeout(() => {
          props.request(queryData).then(res => {
            selectData.options = res.data.items
            paginationData.total = res.data.total
            paginationData.pageNum += 1
            selectData.loading = false
          })
        }, 500)
      }
    })

    if (props.init) {
      selectData.options = props.init
    }

    watch(
      () => props.init,
      newVal => {
        selectData.options = newVal
      }
    )

    return {
      ...toRefs(selectData),
      ...toRefs(methods)
    }
  }
}
</script>
