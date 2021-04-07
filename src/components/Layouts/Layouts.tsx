import { useState, useEffect, useRef, FC } from 'react';
import { history } from 'umi';
import dayjs from 'dayjs';

import styles from './Layouts.less';
import { LOGO, logoLeft, udapLogo } from '@/images';
import { LOGIN_LIST } from '@/utils/constants';
import { MyModal } from '@/components';

const list = [
  // { key: 'coming', title: '即将发售' },
  { key: 'collections', title: '首发市场' },
  // { key: 'marketplace', title: '二级市场' },
  // { key: 'artists', title: '艺术家' },
  { key: 'about', title: '关于我们' },
  // { key: 'wallet', title: '钱包下载' },
];

const Layouts = (props: { children: FC }) => {
  const defaultLoginInfo = {
    address: '',
    headImage: '',
    name: '',
    qrCode: '',
    udapAccessToken: '',
    xData: '',
    xSender: '',
    xSignature: '',
  };
  const [current, setCurrent] = useState(list[0].key);
  const [loginInfo, setLoginInfo] = useState<API.LoginInfoType>(
    defaultLoginInfo,
  );
  const [hasLogin, setHasLogin] = useState(false);
  const [isLoginClick, setIsLoginClick] = useState(false);
  const [isSignOutVisible, setIsSignOutVisible] = useState(false);

  const elRef = useRef<HTMLDivElement>(null);

  const handleClick = (element: string) => {
    setCurrent(element);
    history.push(`/${element}`);
  };

  const getLoginInfo = () => {
    const loginStr = sessionStorage.getItem('login');

    let tempLoginInfo: API.LoginInfoType;
    if (loginStr) {
      tempLoginInfo = JSON.parse(loginStr);
      setLoginInfo(tempLoginInfo);
      setHasLogin(true);
    } else {
      setHasLogin(false);
    }
  };

  useEffect(() => {
    const { location } = history;
    setCurrent(location?.pathname?.substring(1));

    getLoginInfo();
  }, [props.children]);

  const handleLogin = () => {
    if (!hasLogin) {
      history.push('/login');
      return;
    }

    setIsLoginClick(!isLoginClick);
  };

  const handleLoginItem = (element: string) => {
    switch (element) {
      case 'mine':
        history.push('/mine');
        break;

      case 'signOut':
        setIsSignOutVisible(true);
        break;

      default:
        break;
    }
    setIsLoginClick(false);
  };

  const onSignOutCancel = () => {
    setIsSignOutVisible(false);
  };

  const onBtnClick = () => {
    sessionStorage.clear();
    onSignOutCancel();
    history.replace('/');
  };

  const handle = (e: { target: any }) => {
    if (elRef && !elRef.current?.contains(e.target)) {
      setIsLoginClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handle);
    return () => {
      document.removeEventListener('click', handle);
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <header>
          <div className={styles.headerLeft}>
            <img src={logoLeft} alt="logo" className={styles.leftLogo} />
            <div className={styles.slogan}>传承有绪 · 价值永存</div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.headerRightMenu}>
              <>
                <ul>
                  {list.map((item) => (
                    <li
                      key={item.key}
                      onClick={() => handleClick(item.key)}
                      className={item.key === current ? styles.active : ''}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </>
            </div>
            <div className={styles.loginContent} ref={elRef}>
              <div className={styles.login} onClick={handleLogin}>
                {hasLogin
                  ? loginInfo.name.substr(-2) || loginInfo.address.substr(-2)
                  : '登录'}
              </div>
              {isLoginClick && (
                <ul className={styles.modelSelectOption}>
                  {LOGIN_LIST.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => handleLoginItem(item.value)}
                      >
                        {item.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </header>
        <section>{props.children}</section>
        <footer>
          <div className={styles.footerTop}>
            <img src={LOGO} alt="LOGO" className={styles.topLogo} />
            <img src={udapLogo} alt="udapLogo" className={styles.topUdapLogo} />
          </div>
          <div className={styles.footerBottom}>
            <div>© umx {dayjs().year()}</div>
          </div>
        </footer>
      </div>
      {isSignOutVisible && (
        <MyModal
          visible={isSignOutVisible}
          onCancel={onSignOutCancel}
          onBtnClick={onBtnClick}
        />
      )}
    </>
  );
};

export default Layouts;
