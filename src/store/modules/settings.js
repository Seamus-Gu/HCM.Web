import { getSettings, getTableSize, setTableSize } from '@/utils/local-storage'
import { setTheme } from '@/utils/theme'

const settingsStore = defineStore('settings', {
  state: () => ({
    visible: false,
    theme: 'blue',
    isDark: false,
    showTabView: true,
    affixHeader: true,
    searchSwitch: true,
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
    toggleSearchSwitch() {
      this.searchSwitch = !this.searchSwitch
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
    },
    setLoginSetting() {
      let settingLocal = getSettings()
      if (settingLocal) {
        let settings = JSON.parse(settingLocal)
        this.theme = settings['theme']
      }

      setTheme(false, this.theme)
    }
  }
})

export default settingsStore
