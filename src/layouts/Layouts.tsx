import { useState, useEffect } from 'react';
import { history } from 'umi';
import { Layout } from 'antd';
import dayjs from 'dayjs';

import styles from './Layouts.less';
import { logo, logoLeft, udapLogo } from '@/images';

const { Header, Content, Footer } = Layout;

const list = [
  { key: 'collections', title: '首发市场' },
  { key: 'marketplace', title: '二级市场' },
  { key: 'about', title: '关于我们' },
  { key: 'login', title: '登录' },
];

const Layouts = (props: { children: any }) => {
  const [current, setCurrent] = useState(list[0].key);

  const handleClick = (element: string) => {
    setCurrent(element);
    history.push(`/${element}`);
  };

  useEffect(() => {
    const { location } = history;
    setCurrent(location?.pathname?.substring(1));
  });

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={logoLeft} alt="logo" className={styles.leftLogo} />
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
        </div>
      </Header>
      <Content className={styles.content}>{props.children}</Content>
      <Footer className={styles.footer}>
        <div className={styles.footerTop}>
          <img src={logo} alt="logo" className={styles.topLogo} />
          <img src={udapLogo} alt="udapLogo" className={styles.topUdapLogo} />
        </div>
        <div className={styles.footerBottom}>
          <div>© umx {dayjs().year()}</div>
        </div>
      </Footer>
    </Layout>
  );
};

export default Layouts;
