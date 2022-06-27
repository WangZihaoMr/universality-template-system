function isDataType(data) {
  const dataType = Object.prototype.toString.call(data)
  const dataTypeOptins = {
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Boolean]': 'boolean',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Date]': 'date',
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Function]': 'function',
    '[object RegExp]': 'regExp'
  }

  return dataTypeOptins[dataType]
}

function deepCopy(data) {
  let dataType = isDataType(data)
  let obj
  if (dataType === 'array') {
    obj = []
    for (let i = 0; i < data.length; i++) {
      obj.push(deepCopy(data[i]))
    }
  } else if (dataType === 'object') {
    obj = {}
    for (let i in data) {
      obj[i] = deepCopy(data[i])
    }
  } else {
    return data
  }
  return obj
}

export default {
  deepCopy
}
