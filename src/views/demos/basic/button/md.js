const md = `# Button Api

## Button Attributes

| 属性名   |        说明        |                      类型                       | 默认值 |
| -------- | :----------------: | :---------------------------------------------: | ------ |
| size     |        尺寸        |           ['large','default','small']           |        |
| type     |        类型        | ['primary','success','warning','danger','info'] |        |
| circle   |   是否为圆形按钮   |                     boolean                     | false  |
| loading  |  是否为加载中状态  |                     boolean                     | false  |
| disabled | 按钮是否为禁用状态 |                     boolean                     | false  |

## Button Slots

| 插槽名  |        说明        |
| ------- | :----------------: |
| default |   自定义默认内容   |
| icon    |   自定义图标组件   |
| append  | 自定义后缀图标组件 |

`

export default md
