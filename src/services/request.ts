import { extend, RequestResponse } from 'umi-request';
import { Modal } from 'antd-mobile';

import { PROD_URL, TEST_URL } from '@/utils/constants';
import { randomString } from '@/utils/common';
import CryptoJS from 'crypto-js';
import EthCrypto from 'eth-crypto';

type HeaderKey = 'd' | 'D' | 's' | 'S' | 't' | 'T' | 'a';

const customHeaderEnum: { [key in HeaderKey]: string } = {
  d: 'x-data',
  D: 'X-Data',
  s: 'x-sender',
  S: 'X-Sender',
  t: 'x-signature',
  T: 'X-Signature',
  a: 'accesstoken',
};

/**
 * 获取指定 header key的值
 * @param key HeaderKey CustomHeaderEnum key
 * @param value
 */
const generateHeaderData = (key: HeaderKey, value?: string) => {
  const headerKey = customHeaderEnum[key];
  // user 缓存是sessionStorage
  const user = JSON.parse(
    sessionStorage.getItem('userData') || '{}',
  ) as unknown as API.UserPropsType;
  const xData = randomString();
  const decrypted = CryptoJS.AES.decrypt(user?.privateKey, value || '');
  const privateKey = decrypted.toString(CryptoJS.enc.Utf8);
  switch (key) {
    case 'd':
    case 'D':
      return { [headerKey]: xData };
    case 's':
    case 'S':
      return { [headerKey]: user.userId.toLowerCase() };
    case 't':
    case 'T':
      const signature = EthCrypto.sign(
        privateKey,
        EthCrypto.hash.keccak256(xData),
      );
      return { [headerKey]: signature.substr(2) };
    case 'a':
      const dateTime = `${user.userId};${new Date('2030')
        .getTime()
        .toString()}`;
      const accessToken = EthCrypto.sign(
        privateKey,
        EthCrypto.hash.keccak256(dateTime),
      );
      return { [headerKey]: `${dateTime};${accessToken.substr(2)}` };
    default:
      return false;
  }
};

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error: { data?: any; response?: any }) => {
  if (error.data?.message) {
    const { response, data } = error;
    // Modal.alert(`错误${response?.status}`, data.message);
  } else {
    const { response } = error;
    if (typeof response.status == 'number') {
      if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        // Modal.alert(`错误${response?.status}`, errorText);
      }
    }
  }
};

// 配置request请求时的默认参数
const extendRequest = extend({
  errorHandler,
  credentials: 'include',
});

export default async function request<D>(
  url: string,
  options: any,
  headers?: string,
): Promise<RequestResponse<D>> {
  let tempURL = url;
  switch (process.env.UMI_ENV) {
    case 'production':
      tempURL = `${PROD_URL}${url.substr(5)}`;
      break;
    case 'test':
      tempURL = `${TEST_URL}${url.substr(5)}`;
      break;
    default:
      break;
  }
  // 根据headers 生成 相关headers参数
  const _options = options;
  const headerKeys = headers?.split('') || [];
  for (let i in headerKeys) {
    const _key = headerKeys[i];
    const userPassword = sessionStorage.getItem(
      'registerPwd',
    ) as unknown as string;
    if ((_key === 't' || _key === 'T' || _key === 'a') && !userPassword) {
      Modal.prompt(
        '提示',
        '使用扫码登录、相关操作需你的注册密码',
        [
          { text: '取消' },
          {
            text: '确认',
            onPress: (value) => {
              if (value) {
                sessionStorage.setItem('registerPwd', value);
                location.reload();
              }
            },
          },
        ],
        'secure-text',
      );
    }
    _options.headers = Object.assign(
      {},
      _options.headers || {},
      generateHeaderData(_key as unknown as HeaderKey, userPassword),
    );
  }
  const response = await extendRequest(tempURL, _options);
  return { data: response } as unknown as RequestResponse;
}
