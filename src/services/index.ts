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
export async function initialOffering(
  params: API.InitialOfferingType,
): Promise<any> {
  return request('/api/asset/markets/initialOffering', { params });
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

// pc端查询扫码信息
export async function searchQrCodeInfo(key: string): Promise<any> {
  return request(`/api/user/searchQrCodeInfo/${key}`, '');
}
