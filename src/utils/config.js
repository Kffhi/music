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
    id: 'search',
    name: '搜索页',
    path: '/search',
    models: () => [import('../models/home')],
    component: () => import('../routes/Search/index'),
  },
];

export default {
  menuGlobal
}