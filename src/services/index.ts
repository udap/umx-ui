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
  return request(`/api/asset/markets/initialOffering`, { params });
}

// pc端查询扫码信息
export async function searchQrCodeInfo(key: string): Promise<any> {
  return request(`/api/user/searchQrCodeInfo/${key}`, '');
}
