export default {
  beforeMount(el, { value, arg }) {
    if (arg === 'callback') {
      el._copyCallback = value
    } else {
      el._copyValue = value
      el._clickHandler = createClickHandler(el)
      el.addEventListener('click', el._clickHandler)
      el._destroyCopy = () => el.removeEventListener('click', el._clickHandler)
    }
  }
}

function createClickHandler(el) {
  return async () => {
    const text = el._copyValue
    if (!text) return

    const success = await copyTextToClipboard(text)

    if (el._copyCallback) {
      el._copyCallback(text, success)
    }
  }
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.warn('Clipboard API 失败:', err)
    }
  }

  return fallbackCopy(text)
}

// function copyTextToClipboard(input, { target = document.body } = {}) {
//   const element = document.createElement('textarea')
//   const previouslyFocusedElement = document.activeElement

//   element.value = input

//   element.setAttribute('readonly', '')

//   element.style.contain = 'strict'
//   element.style.position = 'absolute'
//   element.style.left = '-9999px'
//   element.style.fontSize = '12pt'

//   const selection = document.getSelection()
//   const originalRange = selection.rangeCount > 0 && selection.getRangeAt(0)

//   target.append(element)
//   element.select()

//   // Explicit selection workaround for iOS
//   element.selectionStart = 0
//   element.selectionEnd = input.length

//   let isSuccess = false
//   try {
//     isSuccess = document.execCommand('copy')
//   } catch {
//     console.error('execCommand copy 失败:', err)
//   }

//   element.remove()

//   if (originalRange) {
//     selection.removeAllRanges()
//     selection.addRange(originalRange)
//   }

//   if (previouslyFocusedElement) {
//     previouslyFocusedElement.focus()
//   }

//   return isSuccess
// }
