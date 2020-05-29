import { get } from '../utils/request'

// 获取轮播图
/**
 * http://www.kffhi.com/api/tencent//getDigitalAlbumLists
 * 接口说明: 调用此接口, 可获取数字专辑, 轮播图banner, 专辑列表等信息, 详见API结构图
 * 接口地址: /getDigitalAlbumLists
 */
export const getTencentBanner = () => {
  return get('/api/tencent/getDigitalAlbumLists')
}


// 获取歌单列表
/**
 * http://www.kffhi.com/api/tencent/getRecommend
 * 接口说明: 调用此接口, 可获取首页推荐
 * 接口地址: /getRecommend
 */
export const getTencentSongList = () => {
  return get('/api/tencent/getRecommend')
}

// 获取歌单分类下的歌单列表
/**
 * http://www.kffhi.com/api/tencent/getSongLists?categoryId=10000000
 * 接口说明: 调用此接口, 可获取歌单列表
 * 参数列表:
 * 必选参数
 * categoryId: 类别id, 详见 /getSongListCategories
 * 可选参数
 * page: 当前页数, 默认为1
 * limit: 取出歌单数量, 默认为 20
 * sortId: 最新, 最热,评分, 默认为5
 * 接口地址: /getSongLists
 */
export const getTencentCartSongList = (categoryId = '', page = '1', limit = 21, sortId = '5') => {
  const URL = `/api/tencent/getSongLists?categoryId=${categoryId}&page=${page}&limit=${limit}&sortId=${sortId}`
  return get(URL)
}


// 获取歌单详情
/**
 * http://www.kffhi.com/api/tencent/getSongListDetail?disstid=7011264340
 * 接口说明: 调用此接口, 可获取歌单详情
 * 必选参数
 * disstid: 歌单id
 * 接口地址: /getSongListDetail
 */
export const getTencentSongListDetail = (disstid = '') => {
  const URL = `/api/tencent/getSongListDetail?disstid=${disstid}`
  return get(URL)
}

// 获取音乐播放地址
/**
 * http://www.kffhi.com/api/tencent/getMusicVKey?songmid=0025NhlN2yWrP4
 * 说明 : 使调用此接口, 可获取歌曲VKey
 * 必选参数 : songmid : 音乐 id
 * 接口地址 : /getMusicVKey
 */
export const getTencentSongDetail = id => {
  const URL = `/api/tencent/getMusicVKey?songmid=${id}`
  return get(URL)
}

// 获取歌单分类
/**
 * http://www.kffhi.com/api/tencent/getSongListCategories
 * 接口说明: 调用此接口, 可获取歌单分类, 包含category信息
 * 接口地址: /getSongListCategories
 */
export const getTencentSongListCategory = () => {
  return get('/api/tencent/getSongListCategories')
}

// 获取热搜数据
/**
 * http://www.kffhi.com/api/tencent/getHotkey
 * 接口说明: 调用此接口, 可获取搜索热词
 * 接口地址: /getHotkey
 */
export const getTencentHotSearch = () => {
  return get('/mock/hotsearch.json')
}

// 搜索
/**
 * http://www.kffhi.com/api/tencent/getSearchByKey?key=%E5%91%A8%E6%9D%B0%E4%BC%A6
 * 接口说明: 调用此接口, 可获取获取搜索结果
 * 参数列表(部分参数待注释):
 * 必选参数
 * key: 搜索关键字
 * catZhida: 0表示歌曲, 2表示歌手, 3表示专辑, 默认值为1
 * 可选参数
 * page: 当前页数, 默认为1
 * limit: 取出歌单数量, 默认为 10
 * 接口地址: /getSearchByKey
 */
export const getTencentSearchResult = () => {
  return get('/mock/searchresult.json')
}

// 获取歌手详情
/**
 * http://www.kffhi.com/api/tencent/getSingerAlbum?singermid=0025NhlN2yWrP4
 * 接口说明: 调用此接口, 可获取歌手专辑
 * 参数列表:
 * 必选参数
 * singermid: 歌手id
 * 可选参数
 * page: 当前页数, 默认为1
 * limit: 取出歌单数量, 默认为 20
 * 接口地址: /getSingerAlbum
 */
export const getTencentSingerInfo = () => {
  return get('/mock/singerInfo.json')
}

// 获取歌词
/**
 * http://www.kffhi.com/api/netease/getLyric?songmid=003rJSwm3TechU
 * 说明 : 调用此接口, 可获取歌曲歌词
 * 必选参数 : isongmid: 专辑id
 * 可选参数： isFormat: 是否格式化歌词, 默认值为 false
 * 接口地址 : /getLyric
 */
export const getTencentSongLyric = id => {
  const URL = `/api/tencent/getLyric?songmid=${id}`
  return get(URL)
}