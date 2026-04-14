import { getSettings, getTableSize, setTableSize } from '@/utils/local-storage'
import { setTheme } from '@/utils/theme'

const settingsStore = defineStore('settings', {
  state: () => ({
    visible: false,
    theme: { name: 'blue', color: '#40a9ff', title: '拂晓蓝' },
    isDark: false,
    showTabView: true,
    affixHeader: true,
    localizationSwitch: true,
    themeSwitch: true,
    noticeSwitch: true,
    fullSwitch: true,
    tableSize: getTableSize() ?? 'default'
  }),
  actions: {
    setVisible(visible) {
      this.visible = visible
    },
    setTheme(theme) {
      this.theme = theme
      setTheme(this.isDark, theme)
    },
    toggleIsDark(isDark) {
      this.isDark = !this.isDark
      setTheme(this.isDark, this.theme)
    },
    toggleTabView() {
      this.showTabView = !this.showTabView
    },
    toggleAffixHeader() {
      this.affixHeader = !this.affixHeader
    },
    togglelocalizationSwitch() {
      this.localizationSwitch = !this.localizationSwitch
    },
    toggleThemeSwitch() {
      this.themeSwitch = !this.themeSwitch
    },
    toggleMessageSwitch() {
      this.noticeSwitch = !this.noticeSwitch
    },
    toggleFullSwitch() {
      this.fullSwitch = !this.fullSwitch
    },
    setTableSize(tableSize) {
      this.tableSize = tableSize
      setTableSize(tableSize)
    },
    initSetting() {
      let settingLocal = getSettings()
      if (settingLocal) {
        let settings = JSON.parse(settingLocal)
        let settingArr = Object.keys(settings)

        settingArr.forEach(key => {
          this[key] = settings[key]
        })
      }

      setTheme(this.isDark, this.theme)
    }
  }
})

export default settingsStore
