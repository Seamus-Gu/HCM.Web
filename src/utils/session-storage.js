export function getToken() {
  return sessionStorage.getItem('Token')
}

export function setToken(token) {
  return sessionStorage.setItem('Token', token)
}

export function removeToken() {
  return sessionStorage.removeItem('Token')
}
