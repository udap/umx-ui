import request from '@/services/request';

/**
 * 下载作品
 * @param params
 */
export function downloadFile(params: any) {
  return request<{ code: number; message: string }>(
    '/api/asset/products/video/download',
    { ...params },
  );
}
