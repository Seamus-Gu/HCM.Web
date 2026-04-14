import { generate } from './color'

export function getThemeColor(name) {
  return primary[resolveTheme(name)]
}

const primary = {
  red: 'linear-gradient(195deg, #ffa39e, #cf1322)',
  volcano: 'linear-gradient(195deg, #ffbb96, #d4380d)',
  orange: 'linear-gradient(195deg, #ffd591, #d46b08)',
  gold: 'linear-gradient(195deg, #ffe58f, #d48806)',
  yellow: 'linear-gradient(195deg, #fffb8f, #d4b106)',
  lime: 'linear-gradient(195deg, #eaff8f, #7cb305)',
  green: 'linear-gradient(195deg, #b7eb8f, #389e0d)',
  cyan: 'linear-gradient(195deg, #87e8de , #08979c)',
  blue: 'linear-gradient(195deg, #91d5ff, #096dd9)',
  geekBlue: 'linear-gradient(195deg, #adc6ff, #1d39c4)',
  purple: 'linear-gradient(195deg, #d3adf7, #531dab)',
  magenta: 'linear-gradient(195deg, #ffadd2, #c41d7f)'
}

const colorList = [
  { name: 'red', color: '#ff4d4f', title: '薄暮' },
  { name: 'volcano', color: '#ff7a45', title: '火山' },
  { name: 'orange', color: '#ffa940', title: '日暮' },
  { name: 'gold', color: '#ffc53d', title: '金盏花' },
  { name: 'yellow', color: '#fadb14', title: '日出' },
  { name: 'lime', color: '#bae637', title: '青柠' },
  { name: 'green', color: '#73d13d', title: '极光绿' },
  { name: 'cyan', color: '#36cfc9', title: '明青' },
  { name: 'blue', color: '#40a9ff', title: '拂晓蓝' },
  { name: 'geekBlue', color: '#597ef7', title: '极客蓝' },
  { name: 'purple', color: '#9254de', title: '酱紫' },
  { name: 'magenta', color: '#f749ab', title: '法式洋红' }
]

export { primary, colorList }

function applyTheme(theme) {
  const root = document.documentElement
  const colorName = theme.name

  const colors = generate(theme.color)

  root.style.setProperty('--color-primary', primary[colorName])
  root.style.setProperty('--color-primary-core', theme.color)
  // root.style.setProperty(
  //   '--color-primary-box-shadow',
  //   getBoxShadow(theme.color)
  // )

  colors.forEach((element, index) => {
    root.style.setProperty(`--color-primary-${index}`, element)
  })
}

export function setTheme(isDark, theme) {
  const html = document.documentElement
  html.classList.toggle('dark', Boolean(isDark))

  applyTheme(theme)
}
