export default {
  reset: (oldVal, newVal) => {
    for (let key in newVal) {
      if (oldVal.hasOwnProperty(key)) {
        oldVal[key] = newVal[key]
      }
    }
  }
}
