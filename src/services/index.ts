import request from './request';

// 查询生效的轮播图
export async function getCarousels(): Promise<any> {
  return request('/api/asset/carousels', '');
}

// 查询本周预告
export async function getMarkets(params: API.GetMarketsType): Promise<any> {
  return request(
    `/api/asset/markets?startDate=${params.startDate}&endDate=${params.endDate}&q=${params.q}`,
    '',
  );
}

// 查询首发市场
export async function initialOffering(
  params: API.InitialOfferingType,
): Promise<any> {
  console.log('params', params);
  return request(
    // `/api/asset/markets/initialOffering?orderBy=${params.orderBy}&direction=${params.direction}`,
    `/api/asset/markets/initialOffering?page=${params.pageIndex}&size=${params.pageSize}`,
    '',
  );
}

export async function searchQrCodeInfo(key: string): Promise<any> {
  return request(`/api/user/searchQrCodeInfo/${key}`, '');
}
