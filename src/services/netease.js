import { get } from '../utils/request'

// 获取轮播图
/**
 * http://www.kffhi.com/api/netease/banner?type=2
 * 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
 * 可选参数 :
 * type:资源类型,对应以下类型,默认为 0 即PC
 * 0: pc
 * 1: android
 * 2: iphone
 * 3: ipad
 * 接口地址 : /banner
 */
export const getNetBanner = () => {
  return get('/api/netease/banner?type=1')
}


// 获取歌单列表
/**
 * http://www.kffhi.com/api/netease/top/playlist/highquality?before=1503639064232&limit=3
 * 说明 : 调用此接口 , 可获取精品歌单
 * 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * limit: 取出歌单数量 , 默认为 20
 * before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * 接口地址 : /top/playlist/highquality
 */
export const getNetSongList = (cat = '', limit = '21', before = '') => {
  // const url = `/api/netease/top/playlist/highquality?${cat ? 'cat=' + cat : ''}${limit ? '&limit=' + limit : ''}${before ? '&before=' + before : ''}`
  const URL = `/api/netease/top/playlist/highquality?${'cat=' + cat}${'&limit=' + limit}${'&before=' + before}`
  return get(URL)
}


// 获取歌单详情
/**
 * http://www.kffhi.com/api/netease//playlist/detail?id=24381616
 * 歌单能看到歌单名字 , 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐，但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
 * 必选参数 : id : 歌单 id
 * 可选参数 : s : 歌单最近的 s 个收藏者
 * 接口地址 : /playlist/detail
 */
export const getNetSongListDetail = id => {
  console.log(id)
  const URL = `/api/netease//playlist/detail?id=${id}`
  return get(URL)
}

// 获取歌单分类
/**
 * http://www.kffhi.com/api/netease/playlist/hot
 * 说明 : 调用此接口,可获取歌单分类,包含 category 信息
 * 接口地址 : /playlist/hot
 */
export const getNetSongListCategory = () => {
  return get('/api/netease/playlist/hot')
}

// 获取热搜数据
/**
 * http://www.kffhi.com/api/netease/search/hot/detail
 * 说明 : 调用此接口,可获取热门搜索列表
 * 接口地址 : /search/hot/detail
 */
export const getNetHotSearch = () => {
  return get('/mock/hotsearch.json')
}

// 搜索
/**
 * http://www.kffhi.com/api/netease/search?keywords=%E9%99%88%E5%A5%95%E8%BF%85
 * 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
 * 必选参数 : keywords : 关键词
 * 可选参数 :
 * limit : 返回数量 , 默认为 30 
 * offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * 接口地址 : /search
 */
export const getNetSearchResult = () => {
  return get('/mock/searchresult.json')
}

// 获取歌手详情
/**
 * http://www.kffhi.com/api/netease/artists?id=6452
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
 * 必选参数 : id: 歌手 id, 可由搜索接口获得
 * 接口地址 : /artists
 */
export const getNetSingerInfo = () => {
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
export const getNetSongDetail = ids => {
  const URL = `/api/netease/song/url?id=${ids}`
  return get(URL)
}