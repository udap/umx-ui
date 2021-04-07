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
