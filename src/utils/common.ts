export const randomString = (len = 32) => {
  let _chars = 'ABCDEFGHIJKMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let _maxPos = _chars.length;
  let _pwd = '';

  for (let i = 0; i < len; i++) {
    _pwd += _chars.charAt(Math.floor(Math.random() * _maxPos));
  }

  return _pwd;
};

export const checkHasLogin = () => {
  const loginObj = sessionStorage.getItem('login');

  let login;
  if (loginObj) {
    login = JSON.parse(loginObj);
  }

  return login;
};

export const padLeft = (nr: number | string, n: number, str?: string) => {
  return Array(n - String(nr).length + 1).join(str || '0') + nr;
};

/**
 * 计算文件大小
 * @return {number} 文件大小（字节）
 */
export const size2Str = (size: number) => {
  if (size < 1024) {
    return size + 'B';
  } else if (size >= 1024 && size < Math.pow(1024, 2)) {
    return parseFloat((size / 1024).toString()).toFixed(2) + 'KB';
  } else if (size >= Math.pow(1024, 2) && size < Math.pow(1024, 3)) {
    return parseFloat((size / Math.pow(1024, 2)).toString()).toFixed(2) + 'MB';
  } else if (size > Math.pow(1024, 3)) {
    return parseFloat((size / Math.pow(1024, 3)).toString()).toFixed(2) + 'GB';
  } else {
    return 0 + 'B';
  }
};
