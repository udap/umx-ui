import request from './request';

export async function getCarousels(): Promise<any> {
  return request('/api/asset/carousels', '');
}

export async function searchQrCodeInfo(key: string): Promise<any> {
  return request(`/api/user/searchQrCodeInfo/${key}`, '');
}
