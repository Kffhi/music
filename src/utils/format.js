export const format = interval => {
  interval = interval | 0
  const minute = interval / 60 | 0
  const second = _pad(interval % 60)
  return `${minute}:${second}`
}

export const _pad = (num, n = 2) => {
  let len = num.toString().length
  while(len < n){
    num = '0'+num
    len++
  }
  return num
}