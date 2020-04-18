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
export const getTencentSongListDetail = () => {
  return get('/mock/songlistdetail.json')
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

// 获取音乐播放地址
/**
 * http://www.kffhi.com/api/netease/song/url?id=33894312
 * 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口 , 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url( 不需要登录 )
 * 注 : 部分用户反馈获取的 url 会 403,hwaphon找到的 解决方案是当获取到音乐的 id 后，将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
 * 必选参数 : id : 音乐 id
 * 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * 接口地址 : /song/url
 */