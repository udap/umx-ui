import request from '@/services/request';

/**
 * 下载作品
 * @param params
 */
export function downloadFile(params: any) {
  return request('/api/asset/products/video/download', params);
}
