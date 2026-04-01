import Mock from 'mockjs'

const userList = Mock.mock({
  'items|10': [
    {
      userName: '@first()',
      nickName: '@cname()',
      'sex|1': ['男', '女'],
      id: '@ID',
      tags: ['nice', 'developer'],
      'enable|1': [0, 1],
      phoneNumber: '@integer(10000000000,19999999999)'
    }
  ],
  total: 20
})

const userMockList = [
  {
    url: '/api/core/v1/sys-user/get-info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: {
          permissions: ['*:*:*'],
          roleKeys: ['admin'],
          user: {
            createBy: 'admin',
            createTime: '2022-08-22 23:16:15',
            updateBy: null,
            updateTime: null,
            dataStatus: null,
            userId: 1,
            deptId: 103,
            userName: 'admin',
            nickName: '管理员',
            email: 'ry@163.com',
            phoneNumber: '15888888888',
            sex: '1',
            avatar:
              'http://81.69.242.207:9101/only/2022/06/27/96eb8071-ab53-4ace-b071-e568c65651f0.png',
            userStatus: '0',
            delFlag: '0',
            loginIp: '127.0.0.1',
            loginDate: '2022-08-22T23:16:15.000+08:00',
            dept: {
              searchValue: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              dataStatus: null,
              params: {},
              deptId: 103,
              parentId: 101,
              ancestors: '0,100,101',
              deptName: '研发部门',
              orderNum: 1,
              leader: '若依',
              phone: null,
              email: null,
              status: '0',
              delFlag: null,
              parentName: null,
              children: []
            },
            roles: [
              {
                searchValue: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
                dataStatus: null,
                params: {},
                roleId: 1,
                roleName: '超级管理员',
                roleKey: 'admin',
                roleSort: '1',
                dataScope: '1',
                menuCheckStrictly: false,
                deptCheckStrictly: false,
                status: '0',
                delFlag: null,
                flag: false,
                menuIds: null,
                deptIds: null,
                permissions: null,
                admin: true
              }
            ],
            roleIds: null,
            postIds: null,
            roleId: null,
            admin: true
          }
        }
      }
    }
  },
  {
    url: '/api/core/user/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: userList
      }
    }
  }
]

export default userMockList
