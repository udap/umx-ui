export const randomString = (len = 32) => {
  let _chars = 'ABCDEFGHIJKMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let _maxPos = _chars.length;
  let _pwd = '';

  for (let i = 0; i < len; i++) {
    _pwd += _chars.charAt(Math.floor(Math.random() * _maxPos));
  }

  return _pwd;
};
