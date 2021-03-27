function asyncInit() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
}

export default {
  namespace: 'count', // 可省略
  state: JSON.parse(localStorage.getItem('count')) || 99, // 初始状态：缓存或空数组

  effects: {
    // generactor 这玩意还再用，我也是醉了
    //这个执行异步操作，这玩意是* 生成器函数？？
    *init(action, { call, put }) {
      let payload = yield call(asyncInit);
      yield put({ type: 'setCount', payload });
    },
  },
  reducers: {
    add(state, action) {
      return state + action.payload;
    },
    minus(state, action) {
      return state - action.payload;
    },
    setCount(state, action) {
      state = action.payload;
      return state;
    },
  },
};
