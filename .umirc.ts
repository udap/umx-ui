import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
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
        {
          path: '/auction',
          component: '@/pages/Auction',
          title: '拍卖',
        },
        {
          path: '/sell',
          component: '@/pages/Sell',
          title: '直卖',
        },
        {
          path: '/about',
          component: '@/pages/About',
          title: '关于我们',
        },
      ],
    },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'https://api.umx.art/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
