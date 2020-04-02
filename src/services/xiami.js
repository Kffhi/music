import { get } from '../utils/request'

export const getXiamiBanner = () => {
  return get('/mock/banner.json')
}

export const getXiamiSongList = () => {
  return get('/mock/songlist.json')
}