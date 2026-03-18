<template>
  <div>
    <s-row :gutter="8">
      <s-col :span="10">
        <s-panel title="个人信息">
          <s-row justify="center" style="margin-bottom: 18px">
            <UserAvatar></UserAvatar>
          </s-row>
          <s-row justify="center" style="font-weight: 600; font-size: 20px">
            {{ userInfoData.nickName }}
          </s-row>
          <s-divider />
          <s-row class="user-info" justify="space-between">
            <s-col :span="8">
              <svg class="icon" ariel-hidden="true" font-size="16px">
                <use xlink:href="#icon-yonghu" />
              </svg>
              用户名
            </s-col>
            <s-col :span="16" style="text-align: end">
              {{ userInfoData.userName }}
            </s-col>
          </s-row>
          <s-divider />

          <s-row class="user-info" justify="space-between">
            <s-col :span="12">
              <svg class="icon" ariel-hidden="true" font-size="16px">
                <use xlink:href="#icon-phone" />
              </svg>
              手机号码
            </s-col>
            <s-col :span="12" style="text-align: end">
              {{
                userInfoData.phoneNumber != ''
                  ? userInfoData.phoneNumber
                  : '暂无'
              }}
            </s-col>
          </s-row>
          <s-divider />
          <s-row class="user-info" justify="space-between">
            <s-col :span="12">
              <svg class="icon" ariel-hidden="true" font-size="16px">
                <use xlink:href="#icon-mailbox" />
              </svg>
              用户邮箱
            </s-col>
            <s-col :span="12" style="text-align: end">
              {{ userInfoData.email != '' ? userInfoData.email : '暂无' }}
            </s-col>
          </s-row>
          <s-divider />
          <s-row class="user-info" justify="space-between">
            <s-col :span="8">
              <svg class="icon" ariel-hidden="true" font-size="16px">
                <use xlink:href="#icon-company" />
              </svg>
              部门
            </s-col>
            <s-col :span="12" style="text-align: end">
              {{ userInfoData.dept ? userInfoData.dept.deptName : '暂无' }}
            </s-col>
          </s-row>
          <s-divider />

          <s-row class="user-info" justify="center">
            <div>
              <svg class="icon" ariel-hidden="true" font-size="16px">
                <use xlink:href="#icon-roles" />
              </svg>
              所属角色
            </div>
          </s-row>
          <s-row justify="center">
            <template v-for="(item, index) in userInfoData.roles" :key="index">
              <el-space>
                <s-col :span="4" style="text-align: end">
                  <s-tag :color="generateColor(item.roleName)">
                    {{ item.roleName }}
                  </s-tag>
                </s-col>
              </el-space>
            </template>
          </s-row>
        </s-panel>
      </s-col>
      <s-col :span="14">
        <s-panel>
          <s-tabs>
            <s-tab-pane key="1" label="基本资料">
              <UserInfo></UserInfo>
            </s-tab-pane>
            <s-tab-pane key="2" label="修改密码" force-render>
              <ResetPwd></ResetPwd>
            </s-tab-pane>
          </s-tabs>
        </s-panel>
      </s-col>
    </s-row>
  </div>
</template>

<script>
import { getProfile } from '@/api/core/profile'
import UserAvatar from './UserAvatar'
import UserInfo from './UserInfo'
import ResetPwd from './ResetPwd'
import { generateColor } from '@/utils/tools'

export default {
  components: { UserAvatar, UserInfo, ResetPwd },
  setup() {
    const userInfoData = reactive({
      userName: undefined,
      nickName: undefined,
      phoneNumber: undefined,
      email: undefined,
      avatar: undefined,
      dept: {},
      roles: []
    })

    const methods = reactive({
      initProfile: () => {
        getProfile().then(res => {
          Object.assign(userInfoData, res.data)
          if (res.data.dept) {
            userInfoData.dept = res.data.dept.title
          }
        })
      }
    })

    methods.initProfile()

    return {
      userInfoData,
      generateColor,
      ...toRefs(methods)
    }
  }
}
</script>
<style lang="scss" scoped>
.user-info {
  padding: 0 16px 0 16px;
}
</style>

<!--
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑     永不宕机     永无BUG
 -->
