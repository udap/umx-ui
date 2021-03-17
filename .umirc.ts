import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: { type: 'hash' },
  routes: [
    { exact: true, path: '/', redirect: '/collections' },
    {
      path: '/',
      component: '@/layouts',

      routes: [
        {
          path: '/collections',
          component: '@/pages/Collections',
          title: '首发市场',
        },
        {
          path: '/login',
          component: '@/pages/Login',
          title: '登录',
        },
        {
          path: '/marketplace',
          component: '@/pages/MarketPlace',
          title: '二级市场',
        },
        {
          path: '/profile',
          component: '@/pages/Profile',
          title: '作者主页',
        },
        {
          path: '/mine',
          component: '@/pages/Mine',
          title: '我的',
        },
      ],
    },
  ],
  fastRefresh: {},
});
