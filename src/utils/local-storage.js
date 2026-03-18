export const getLocal = key => {
  return localStorage.getItem(key)
}
export const setLocal = (key, value) => {
  return localStorage.setItem(key, value)
}
export const removeLocal = key => {
  return localStorage.removeItem(key)
}

export const getSettings = () => {
  return localStorage.getItem('setting')
}
export const setSettings = setting => {
  return localStorage.setItem('setting', setting)
}
export const removeSettings = () => {
  return localStorage.removeItem('setting')
}

export const getTableSize = () => {
  return localStorage.getItem('tableSize')
}
export const setTableSize = tableSize => {
  return localStorage.setItem('tableSize', tableSize)
}
export const removeTableSize = () => {
  return localStorage.removeItem('tableSize')
}
