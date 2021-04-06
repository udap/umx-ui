import request from './request';

// 查询某个作者的公众信息
export async function getAuthor(id: string): Promise<any> {
  return request(`/api/user/authors/${id}`, '');
}

// 查询某个作品
export async function getMarkets(id: string): Promise<any> {
  return request(`/api/asset/markets/${id}`, '');
}

// 查询出价人的最高出价列表
export async function getBidsTops(params: { productId: string }): Promise<any> {
  return request(`/api/asset/bids/tops`, { params });
}
