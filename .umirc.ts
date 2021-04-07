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
  routes: [
    { exact: true, path: '/', redirect: '/collections' },
    {
      path: '/',
      component: '@/components/Layouts',

      routes: [
        {
          path: '/coming',
          component: '@/pages/Coming',
          title: '即将发售',
        },
        {
          path: '/collections',
          component: '@/pages/Collections',
          title: '首发市场',
        },
        {
          path: '/marketplace',
          component: '@/pages/MarketPlace',
          title: '二级市场',
        },
        {
          path: '/artists',
          component: '@/pages/Artists',
          title: '艺术家',
        },
        {
          path: '/about',
          component: '@/pages/About',
          title: '关于我们',
        },
        {
          path: '/wallet',
          component: '@/pages/Wallet',
          title: '钱包下载',
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
          path: '/login',
          component: '@/pages/Login',
          title: '登录',
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
