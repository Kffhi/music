import { get } from '../utils/request'

export const getNetBanner = () => {
  return get('/mock/banner.json')
}

export const getNetSongList = () => {
  return get('/mock/songlist.json')
}

export const getNetSongListDetail = () => {
  return get('/mock/songlistdetail.json')
}