import request from './request';

// 查询生效的轮播图
export async function getCarousels(): Promise<any> {
  return request('/api/asset/carousels', '');
}

// 查询本周预告
export async function getMarkets(params: API.GetMarketsType): Promise<any> {
  return request('/api/asset/markets', { params });
}

// 查询首发市场
export async function initialOffering(): Promise<any> {
  return request('/api/asset/markets/initialOffering', '');
}

// 查询首发市场
export async function getMarketsProduct(id: string): Promise<any> {
  return request(`/api/asset/markets/${id}`, '');
}

// 查询某个作者的公众信息
export async function getAuthor(id: string): Promise<any> {
  return request(`/api/user/authors/${id}`, '');
}

// 根据 productId 查询商品的交易历史汇总
export async function getTradeHistory(params: any): Promise<any> {
  return request('/api/market/markets/tradeHistory', {
    params,
  });
}

// 根据 productId 查询商品的交易历史汇总
export async function getToBuy(data: any): Promise<any> {
  return request('/api/business/orders/tobuy', {
    method: 'post',
    data,
  });
}

// 根据 productId 查询商品的交易历史汇总
export async function getPayOrder(data: any): Promise<any> {
  return request('/api/business/orders/payOrder', {
    method: 'post',
    data,
  });
}

// 检查订单支付状态
export async function getCheckOrder(id: string): Promise<any> {
  return request(`/api/business/orders/check/${id}`, '');
}

// 检查订单支付状态
export async function getProductNumber(productId: string): Promise<any> {
  return request(`/api/market/products/number/${productId}`, '');
}

// pc端查询扫码信息
export async function searchQrCodeInfo(key: string): Promise<any> {
  return request(`/api/user/searchQrCodeInfo/${key}`, '');
}
