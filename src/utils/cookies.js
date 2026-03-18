import Cookies from 'js-cookie'

export const getSidebarStatus = () => Cookies.get('sidebarStatus')
export const setSidebarStatus = status => Cookies.set('sidebarStatus', status)
