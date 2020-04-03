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
    id: 'search',
    name: '搜索页',
    path: '/search',
    models: () => [import('../models/home')],
    component: () => import('../routes/Search/index'),
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