import { useState } from 'react';
import { history } from 'umi';
import { Layout, Space, Dropdown } from 'antd';

import styles from './Layouts.less';
import { ReactComponent as Logo } from '@/images/logo.svg';
import { ReactComponent as Fill } from '@/images/fill.svg';

const { Header, Content, Footer } = Layout;

const list = ['首发市场', '二级市场', '关于我们', '登录'];

const Layouts = (props: { children: any }) => {
  const [current, setCurrent] = useState(0);

  const handleClick = (e: number) => {
    setCurrent(e);
    console.log(e);
    switch (e) {
      case 0:
        history.push('/collections');
        break;
      case 1:
        history.push('/marketplace');
        break;
      case 2:
        break;
      case 3:
        history.push('/login');
        break;

      default:
        break;
    }
  };

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
                {list.map((item, index) => (
                  <li
                    key={item}
                    onClick={() => handleClick(index)}
                    className={index === current ? styles.active : ''}
                  >
                    {/* {item === '登录' ? (
                      <Dropdown
                        overlay={
                          <div style={{ border: '1px solid red' }}>
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                          </div>
                        }
                        trigger={['click']}
                        placement="bottomCenter"
                      >
                        <div onClick={(e) => e.preventDefault()}>{item}</div>
                      </Dropdown>
                    ) : (
                      item
                    )} */}
                    {item}
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
