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

export const changeByte = (limit: number) => {
  let size = '';
  if (limit < 0.1 * 1024) {
    //小于0.1KB，则转化成B
    size = limit.toFixed(2) + 'B';
  } else if (limit < 0.1 * 1024 * 1024) {
    //小于0.1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + 'KB';
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    //小于0.1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }

  const sizeStr = size + ''; //转成字符串
  const index = sizeStr.indexOf('.'); //获取小数点处的索引
  const dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
  if (dou == '00') {
    //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
  }
  return size;
};
