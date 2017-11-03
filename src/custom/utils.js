
export function last (arr) {
  return arr[arr.length - 1]
}

// 日期相关函数
export function countDays (year, month) {
  var date

  year = parseInt(year, 10)
  month = parseInt(month, 10)
  month-- // 月份从0开始算,上面就是从1开始算

  if (month === 11) {
    month = 0
    year++
  } else {
    month++
  }

  date = new Date(year, month)
  date.setTime(date.getTime() - 100)
  return date.getDate()
}

export function offsetMonth (year, month, offset = 0) {
  if (month < 0 || month > 12) {
    console.log('检查到非法month')
  }

  year = year + Math.floor((month + offset) / 13)
  month = month + offset
  if (offset > 0) {
    month = month % 12
    month = month === 0 ? 12 : month
  } else if (offset < 0) {
    while (month <= 0) {
      month += 12
    }
  }
  return [year, month]
}

export function monthsBetween (y1, m1, y2, m2) {
  var months1 = y1 * 12 + m1
  var months2 = y2 * 12 + m2

  return months1 - months2
}

export function throttle (callback, delay, tail = true) {
  var timer = null
  var context

  return function () {
    if (timer) return

    let args = arguments
    context = this

    if (!tail) callback.apply(context, args)
    timer = setTimeout(function () {
      timer = null
      if (tail) callback.apply(context, args)
    }, delay)
  }
}

export function fixZero (val) {
  if (val < 10) val = '0' + val
  return val
}
