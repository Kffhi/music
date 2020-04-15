export const format = interval => {
  interval = interval | 0
  const minute = interval / 60 | 0
  const second = _pad(interval % 60)
  return `${minute}:${second}`
}

export const _pad = (num, n = 2) => {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const shuffle = arr => {
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  return arr
}