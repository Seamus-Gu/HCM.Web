<template>
  <div class="home-container">
    <div class="header">
      <s-panel>
        <el-row :gutter="20" align="middle">
          <el-col :span="1">
            <el-avatar :src="avatar">
              <!-- {{ nickName.substring(0, 1) }} -->
            </el-avatar>
          </el-col>
          <el-col :span="12">
            <el-row style="margin-bottom: 8px">
              <div style="font-size: 24px">
                {{ getDate() + '好' }},{{ nickName }}
              </div>
            </el-row>
            <el-row> 欢迎体验vue后台解决方案 </el-row>
          </el-col>
        </el-row>
      </s-panel>
    </div>
    <div class="main-container">
      <s-panel>
        <el-row :gutter="20">
          <el-col :sm="24" :lg="12" style="padding-left: 20px">
            <h2>后台解决方案框架</h2>
            <p>初代版本开发</p>
            <p><b>当前版本:</b> <span>1.0.0</span></p>
            <p>
              <el-button
                type="primary"
                disabled
                @click="goTarget('https://gitee.com/y_project/RuoYi-Cloud')"
                >访问GitHub
              </el-button>
              <el-button disabled @click="goTarget('')"> 访问主页 </el-button>
            </p>
          </el-col>

          <el-col :sm="24" :lg="12" style="padding-left: 50px">
            <el-row>
              <el-col :span="12">
                <h2>技术选型</h2>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <h4>后端技术</h4>
                <ul>
                  <li>.Net6</li>
                  <li>Redis</li>
                  <li>Consul</li>
                  <li>MagicOnion</li>
                  <li>Autofac</li>
                  <li>SqlSugar</li>
                  <li>Autofac</li>
                  <li>...</li>
                </ul>
              </el-col>
              <el-col :span="6">
                <h4>前端技术</h4>
                <ul>
                  <li>Vue</li>
                  <li>Vuex</li>
                  <li>Element-ui</li>
                  <li>Axios</li>
                  <li>Echarts</li>
                  <li>Quill</li>
                  <li>...</li>
                </ul>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </s-panel>
    </div>

    <el-divider />
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card>
          <template #header>
            <span>联系信息</span>
          </template>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="update-log">
          <template v-slot:header>
            <div class="clearfix">
              <span>更新日志</span>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import useUserStore from '@/store/modules/user'

export default {
  components: {},
  setup() {
    const userStore = useUserStore()

    const userData = reactive({
      avatar: computed(() => userStore.avatar),
      nickName: computed(() => userStore.nickName)
    })

    const methods = reactive({
      getDate: () => {
        let time = new Date().getHours()
        if (time >= 0 && time <= 5) {
          return '凌晨'
        } else if (time > 5 && time <= 11) {
          return '早上'
        } else if (time > 11 && time <= 13) {
          return '中午'
        } else if (time > 13 && time <= 17) {
          return '下午'
        } else if (time > 17 && time <= 23) {
          return '晚上'
        } else if (time > 23 && time <= 24) {
          return '凌晨'
        }
      },
      goTarget: url => {
        window.open(url, '__blank')
      }
    })

    return {
      ...toRefs(userData),
      ...toRefs(methods)
    }
  }
}
</script>
