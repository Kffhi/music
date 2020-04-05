import { get } from '../utils/request'

// 获取轮播图
export const getNetBanner = () => {
  return get('/mock/banner.json')
}


// 获取歌单列表
export const getNetSongList = () => {
  return get('/mock/songlist.json')
}


// 获取歌单详情
export const getNetSongListDetail = () => {
  return get('/mock/songlistdetail.json')
}

// 获取歌单分类
export const getNetSongListCategory = () => {
  return get('/mock/category.json')
}

// 获取热搜数据
export const getHotSearch = () => {
  return get('/mock/hotsearch.json')
}