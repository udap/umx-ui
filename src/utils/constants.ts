export const ZH_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

export const PAYMENT_METHOD = {
  WeChatPay: '微信支付',
  AliPay: '支付宝支付',
};

export const LOGIN_LIST = [
  {
    label: '我的',
    value: 'mine',
  },
  {
    label: '退出',
    value: 'signOut',
  },
];

export const PROD_URL = 'https://api.umx.art/';
export const TEST_URL = 'https://test-api.umx.art/';

export const WX_APPID = 'wx2f1b6d1d7f5ef6ec';

export const TEST_H5_URL = 'https://test-h5.umx.art/auction?workId=';
export const PROD_H5_URL = 'https://h5.umx.art/auction?workId=';

export const TEST_REDIRECT_URL = `https://test-api.umx.art/wechat/oauth_response`;
export const PROD_REDIRECT_URL = `https://api.umx.art/wechat/oauth_response`;

export const WHITE_ROUTE_LIST = ['/auction', '/sell'];

export const SALE_STATUS = {
  // 没有关联售卖
  NONE: '没有关联售卖',
  // 未开始
  PENDING: '未开始',
  // 进行中
  ACTIVE: '进行中',
  //已过期
  EXPIRED: '已过期',
};
