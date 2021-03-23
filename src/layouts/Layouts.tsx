import { useState, useEffect } from 'react';
import { history } from 'umi';
import { Layout, Space } from 'antd';

import styles from './Layouts.less';
import { ReactComponent as Logo } from '@/images/logo.svg';
import { ReactComponent as Fill } from '@/images/fill.svg';

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
    <Layout>
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <Logo width={24} height={24} />
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
        <div className={styles.footerLeft}>
          <Logo width={24} height={24} />
          <Fill width={24} height={24} className={styles.fill} />
          <div className={styles.aboutUDAP}>关于UDAP</div>
        </div>
        <Space size="large">
          <div>服务条款</div>
          <div>隐私</div>
          <div>帮助</div>
        </Space>
      </Footer>
    </Layout>
  );
};

export default Layouts;
