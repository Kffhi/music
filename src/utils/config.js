const menuGlobal = [
  {
    id: 'home',
    // pid: '0',
    name: '首页',
    // icon: 'user',
    path: '/home',
    component: () => import('../routes/Home/index'),
  },
  {
    id: 'songlistall',
    name: '歌单广场',
    path: '/songlistall/:tab',
    component: () => import('../routes/SongListAll/index'),
  },
  {
    id: 'songlistinfo',
    name: '歌单详情',
    path: '/songlistinfo/:tab/:id',
    component: () => import('../routes/SongListInfo/index'),
  },
  {
    id: 'search',
    name: '搜索页',
    path: '/search',
    component: () => import('../routes/Search/index'),
  },
  {
    id: 'singerinfo',
    name: '歌手详情',
    path: '/singerinfo',
    component: () => import('../routes/SingerInfo/index'),
  },
  {
    id: 'userinfo',
    name: '个人中心',
    path: '/userinfo',
    component: () => import('../routes/UserInfo/index'),
  },
];

export default {
  menuGlobal
}