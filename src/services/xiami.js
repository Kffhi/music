import { get } from '../utils/request'

// 获取轮播图
export const getXiamiBanner = () => {
  return get('/mock/banner.json')
}


// 获取歌单列表
export const getXiamiSongList = () => {
  return get('/mock/songlist.json')
}


// 获取歌单详情
export const getXiamiSongListDetail = () => {
  return get('/mock/songlistdetail.json')
}

// 获取歌单分类
export const getXiamiSongListCategory = () => {
  return get('/mock/category.json')
}

// 获取热搜数据
export const getXiamiHotSearch = () => {
  return get('/mock/hotsearch.json')
}

// 搜索
export const getXiamiSearchResult = keyword => {
  return get('/mock/searchresult.json')
}

// 获取歌手详情
export const getXiamiSingerInfo = () => {
  return get('/mock/singerinfo.json')
}

// 获取音乐播放地址
export const getXiamiSongDetail = () => {
  return null
}

// 获取歌曲详情
export const getXiamiSongDetailData = () => {
  return null
}

// 获取歌词
export const getXiamiSongLyric = () => {
  return null
}