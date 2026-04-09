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
      },
      {
        name: 'genColumn',
        path: '/tool/gen-column/:tableId(\\d+)',
        hidden: true,
        component: 'tools/gen/Column',
        meta: {
          title: '修改生成配置',
          icon: 'code'
        }
      }
    ]
  },
  {
    name: 'examples',
    path: '/examples',
    hidden: false,
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '示例',
      icon: 'example'
    },
    children: [
      {
        path: '/examples/basic',
        component: 'ParentView',
        meta: {
          title: '基础组件',
          icon: 'example'
        },
        children: [
          {
            name: 'button',
            path: '/examples/basic/button',
            hidden: false,
            component: 'examples/basic/button/index',
            meta: {
              title: 'Button 按钮',
              icon: 'example'
            }
          },
          {
            name: 'color',
            path: '/examples/basic/color',
            hidden: false,
            component: 'examples/basic/color/index',
            meta: {
              title: '色彩',
              icon: 'example'
            }
          },
          {
            name: 'layout',
            path: '/examples/basic/layout',
            hidden: false,
            component: 'examples/basic/layout/index',
            meta: {
              title: '布局',
              icon: 'example'
            }
          }
        ]
      },
      {
        path: '/examples/form',
        component: 'ParentView',
        meta: {
          title: '表单组件',
          icon: 'example'
        },
        children: [
          {
            name: 'form',
            path: '/examples/form/index',
            hidden: false,
            component: 'examples/form/form/index',
            meta: {
              title: 'Form 表单',
              icon: 'example'
            }
          },
          {
            name: 'FormContent',
            path: '/examples/form/form-content',
            hidden: false,
            component: 'examples/form/form/FormContent',
            meta: {
              title: 'Form 表单内容',
              icon: 'example'
            }
          },
          {
            name: 'input',
            path: '/examples/form/input',
            hidden: false,
            component: 'examples/form/input/index',
            meta: {
              title: 'Input 输入框',
              icon: 'example'
            }
          }
        ]
      },
      {
        path: '/examples/data-show',
        component: 'ParentView',
        meta: {
          title: '数据展示',
          icon: 'example'
        },
        children: [
          {
            name: 'DataShow',
            path: '/components/data-show/table',
            hidden: false,
            redirect: 'noRedirect',
            component: 'ParentView',
            alwaysShow: true,
            meta: {
              title: 'Table',
              icon: 'example'
            },
            children: [
              {
                name: 'Table',
                path: '/examples/data_show/table/default',
                hidden: false,
                component: 'examples/dataShow/table/index',
                meta: {
                  title: '默认table',
                  icon: 'example'
                }
              },
              {
                name: 'TreeTable',
                path: '/examples/data_show/table/tree',
                hidden: false,
                component: 'examples/dataShow/table/TreeTable',
                meta: {
                  title: '树table',
                  icon: 'example'
                }
              }
            ]
          }
        ]
      },
      {
        path: '/examples/navigation',
        component: 'ParentView',
        meta: {
          title: '导航',
          icon: 'example'
        },
        children: [
          {
            name: 'Dropdown',
            path: '/examples/navigation/dropdown',
            component: 'examples/navigation/dropdown/index',
            meta: {
              title: '下拉菜单',
              icon: 'example'
            }
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
