export function getSortBy(sorter) {
  let sortBy = null
  if (sorter && sorter.order != null) {
    switch (sorter.order) {
      case 'ascend':
        sortBy = 'asc("' + sorter.field + '")'
        break
      case 'descend':
        sortBy = 'desc("' + sorter.field + '")'
        break
    }
  }
  return sortBy
}

export function getFilter(filterData, sqlWay) {
  var filter = null
  switch (sqlWay) {
    case 'like':
      filter = { like: filterData }
      break
    case 'eq':
      filter = { eq: filterData }
      break
    case 'in':
      filter = { in: filterData.toString() }
      break
  }

  return filter
}
