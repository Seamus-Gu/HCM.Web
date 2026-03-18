export function isHttp(url) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}

export const isValidComponentSize = val => {
  return ['', 'large', 'default', 'small'].includes(val)
}

export const isPlacement = val => {
  return [
    '',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
    'right',
    'right-start',
    'right-end'
  ].includes(val)
}
