const menuRoutes = [
  {
    name: 'system',
    path: '/system',
    hidden: false,
    component: 'Layout',
    meta: {
      title: '系统管理',
      icon: 'system'
    },
    children: [
      {
        name: 'user',
        path: '/system/user',
        hidden: false,
        component: 'core/user/index',
        meta: {
          title: '用户管理',
          icon: 'user'
        }
      },
      {
        name: 'role',
        path: '/system/role',
        hidden: false,
        component: 'core/role/index',
        meta: {
          title: '角色管理',
          icon: 'role'
        }
      },
      {
        name: 'menu',
        path: '/system/menu',
        hidden: false,
        component: 'core/menu/index',
        meta: {
          title: '菜单管理',
          icon: 'menu'
        }
      },
      {
        name: 'dept',
        path: '/system/dept',
        hidden: false,
        component: 'core/dept/index',
        meta: {
          title: '部门管理',
          icon: 'organization'
        }
      }
      // {
      //   name: 'dictionary',
      //   path: '/system/dictionary',
      //   hidden: false,
      //   component: 'core/dictionary/index',
      //   meta: { title: '字典管理', icon: 'dic-manage' }
      // },
      // {
      //   name: 'log',
      //   path: '/system/log',
      //   hidden: false,
      //   meta: { title: '日志管理', icon: 'log' },
      //   component: 'ParentView',
      //   children: [
      //     {
      //       name: 'operationLog',
      //       path: '/system/log/operationLog',
      //       hidden: false,
      //       component: 'system/log/OperationLog',
      //       meta: {
      //         title: '操作日志',
      //         icon: 'caozuorizhi'
      //       }
      //     },
      //     {
      //       name: 'loginLog',
      //       path: '/system/log/loginLog',
      //       hidden: false,
      //       component: 'system/log/LoginLog',
      //       meta: {
      //         title: '登录日志',
      //         icon: 'denglurizhi'
      //       }
      //     }
      //   ]
      // }
    ]
  },
  {
    name: 'tools',
    path: '/tools',
    hidden: false,
    component: 'Layout',
    meta: {
      title: '系统工具',
      icon: 'briefcase'
    },
    children: [
      {
        name: 'gen',
        path: '/tools/gen',
        hidden: false,
        component: 'tools/gen/index',
        meta: {
          title: '代码生成',
          icon: 'code'
        }
      }
    ]
  },
  {
    name: 'Components',
    path: '/components',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '组件',
      icon: 'component',
      noCache: false,
      link: null
    },
    children: [
      {
        path: '/',
        hidden: false,
        redirect: 'noRedirect',
        component: 'ParentView',
        alwaysShow: true,
        meta: {
          title: '数据展示',
          icon: 'user-manage',
          noCache: false,
          link: null
        },
        children: [
          {
            name: 'DataShow',
            path: '/dataShow',
            hidden: false,
            redirect: 'noRedirect',
            component: 'ParentView',
            alwaysShow: true,
            meta: {
              title: 'Table',
              icon: 'user-manage',
              noCache: false,
              link: null
            },
            children: [
              {
                name: 'Table',
                path: '/table',
                hidden: false,
                component: 'examples/dataShow/table/index',
                meta: {
                  title: '默认table',
                  icon: 'user-manage',
                  noCache: false,
                  link: null
                }
              }
            ]
          }
        ]
      }
    ]
  }
]
const menuList = [
  {
    key: 1,
    text: 'John Brown sr.',
    sex: 60,
    phoneNumber: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        text: 'John Brown',
        sex: 42,
        phoneNumber: 'New York No. 2 Lake Park'
      },
      {
        key: 12,
        text: 'John Brown jr.',
        sex: 30,
        phoneNumber: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            text: 'Jimmy Brown',
            sex: 16,
            phoneNumber: 'New York No. 3 Lake Park'
          }
        ]
      },
      {
        key: 13,
        text: 'Jim Green sr.',
        sex: 72,
        phoneNumber: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            text: 'Jim Green',
            sex: 42,
            phoneNumber: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                text: 'Jim Green jr.',
                sex: 25,
                phoneNumber: 'London No. 3 Lake Park'
              },
              {
                key: 1312,
                text: 'Jimmy Green sr.',
                sex: 18,
                phoneNumber: 'London No. 4 Lake Park'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 2,
    name: 'Joe Black',
    sex: 32,
    phoneNumber: 'Sidney No. 1 Lake Park'
  }
]
const menuMockList = [
  {
    url: '/api/core/v1/sys-menu/get-routers',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: menuRoutes
      }
    }
  },
  {
    url: '/api/menu/getMenuList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: menuList
      }
    }
  }
]

export default menuMockList
