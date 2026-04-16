import { generate, getButotonBoxShadow } from './color'

const primary = {
  red: 'linear-gradient(195deg, #ffa39e, #cf1322)',
  volcano: 'linear-gradient(195deg, #ffbb96, #d4380d)',
  orange: 'linear-gradient(195deg, #ffd591, #d46b08)',
  lime: 'linear-gradient(195deg, #eaff8f, #7cb305)',
  gold: 'linear-gradient(195deg, #ffe58f, #d48806)',
  yellow: 'linear-gradient(195deg, #fffb8f, #d4b106)',
  green: 'linear-gradient(195deg, #b7eb8f, #389e0d)',
  cyan: 'linear-gradient(195deg, #87e8de , #08979c)',
  blue: 'linear-gradient(195deg, #91d5ff, #096dd9)',
  geekBlue: 'linear-gradient(195deg, #adc6ff, #1d39c4)',
  purple: 'linear-gradient(195deg, #d3adf7, #531dab)',
  magenta: 'linear-gradient(195deg, #ffadd2, #c41d7f)'
}

const colorList = [
  { name: 'red', color: '#f5222d', title: '薄暮' },
  { name: 'volcano', color: '#fa541c', title: '火山' },
  { name: 'orange', color: '#fa8c16', title: '日暮' },
  { name: 'lime', color: '#a0d911', title: '青柠' },
  { name: 'gold', color: '#faad14', title: '金盏花' },
  { name: 'yellow', color: '#fadb14', title: '日出' },
  { name: 'green', color: '#52c41a', title: '极光绿' },
  { name: 'cyan', color: '#13c2c2', title: '明青' },
  { name: 'blue', color: '#1677ff', title: '拂晓蓝' },
  { name: 'geekBlue', color: '#2f54eb', title: '极客蓝' },
  { name: 'purple', color: '#722ed1', title: '酱紫' },
  { name: 'magenta', color: '#eb2f96', title: '法式洋红' }
]

export { primary, colorList }

function getBoxShadow(theme) {
  const color = boxShadow[theme]

  return `rgba(${color}, 0.4) 0 14px 26px -12px,rgba(${color}, 0.15) 0 4px 23px 0,rgba(${color}, 0.2) 0 8px 10px -5px`
}

export function getThemeColor(theme) {
  return primary[theme.name]
}

/*
色板规则
1 最浅色（背景、浅标签）
2 浅色
3 淡色
4 弱化色
5 浅色背景（按钮/背景底）
6 🎯 主色（品牌色、按钮主色）
7 悬停色
8 点击/激活色
9 强调文字色
10 最深色（文字、边框强调）
*/

export function setTheme(isDark, theme) {
  const html = document.documentElement
  html.classList.toggle('dark', Boolean(isDark))

  const root = document.documentElement
  const colorName = theme.name

  const colors = generate(theme.color, isDark)

  root.style.setProperty('--color-primary', primary[colorName])
  root.style.setProperty('--color-primary-core', theme.color)
  root.style.setProperty('--button-box-shadow', getButotonBoxShadow(colors[2]))

  colors.forEach((element, index) => {
    root.style.setProperty(`--color-primary-${index}`, element)
  })
}
