const menuGlobal = [
  {
    id: 'home',
    // pid: '0',
    name: '首页',
    // icon: 'user',
    path: '/home',
    models: () => [import('../models/home')], //models可多个
    component: () => import('../routes/Home/index'),
  },
  {
    id: 'songlistall',
    name: '歌单广场',
    path: '/songlistall',
    models: () => [import('../models/home')],
    component: () => import('../routes/SongListAll/index'),
  },
  {
    id: 'songlistinfo',
    name: '歌单详情',
    path: '/songlistinfo',
    models: () => [import('../models/home')],
    component: () => import('../routes/SongListInfo/index'),
  },
  {
    id: 'player',
    name: '歌曲播放',
    path: '/player',
    models: () => [import('../models/home')],
    component: () => import('../routes/Player/index'),
  },
  {
    id: 'search',
    name: '搜索页',
    path: '/search',
    models: () => [import('../models/home')],
    component: () => import('../routes/Search/index'),
  },
  {
    id: 'singerinfo',
    name: '歌手详情',
    path: '/singerinfo',
    models: () => [import('../models/home')],
    component: () => import('../routes/SingerInfo/index'),
  },
  {
    id: 'userinfo',
    name: '个人中心',
    path: '/userinfo',
    models: () => [import('../models/home')],
    component: () => import('../routes/UserInfo/index'),
  },
];

export default {
  menuGlobal
}