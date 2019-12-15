String.prototype.trim = function() {
  return this.replace(/^\s*|\s*$/gm, '')
}

export const dateFormat = timestamp => {
  timestamp = /^[0-9]+$/.test(timestamp) ? +timestamp : timestamp.replace(/-/g, '/')
  let time = new Date(timestamp)
  let format = 'yyyy-MM-dd hh:mm:ss'
  let date = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3),
    'S+': time.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    //+''转为字符串
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      //数字没有length属性，字符串才有
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return format
}

export const Cookie = () => {
  this.get = function(key) {
    var cookieStr = document.cookie
    var cs = cookieStr.split(';')
    var val = 'null'
    for (var i = 0; i < cs.length; i++) {
      var _cs = cs[i].split('=')
      if (_cs[0].trim() == key) {
        val = unescape(_cs[1])
        break
      }
    }
    return val
  }
  this.set = function(key, val) {
    document.cookie = key + '=' + escape(val)
  }
  this.remove = function(key) {
    document.cookie = key + '= '
  }
}

export const getSearchString = (key, search) => {
  var str = location.href.split('?')[1]
  str = str.substring(0, str.length)
  var arr = str.split('&')
  var obj = new Object()
  for (var i = 0; i < arr.length; i++) {
    var tmp_arr = arr[i].split('=')
    obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1])
  }
  return obj[key] || ''
}

export const jsonResolver = jsonStr => {
  let temp = JSON.parse(JSON.stringify(jsonStr))
  if (temp) {
    let arr = Object.keys(temp)
    Object.values(temp).forEach((item, index) => {
      if (typeof item == 'string' && /{.*}/g.test(item)) {
        temp[arr[index]] = JSON.parse(item)
      }
      if (typeof item == 'object') {
        temp[arr[index]] = jsonResolver(item)
      }
    })
  }
  return temp
}

export const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  remove(key) {
    localStorage.removeItem(key)
  }
}

export const throttle = (fn, delay) => {
  var pre = 0
  return function() {
    // arguments.callee
    var now = +new Date()
    if (now - pre > delay) {
      // 闭包中this指window
      // 这里arguemnts是event
      fn.apply(this, arguments)
      pre = now
    }
  }
}
