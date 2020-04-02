import { get } from '../utils/request'

export const getTencentBanner = () => {
  return get('/mock/banner.json')
}

export const getTencentSongList = () => {
  return get('/mock/song.json')
}