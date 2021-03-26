import { Card, Collapse } from 'antd';

import styles from './Mine.less';
import { UMedia } from '@/images';

const list = [
  {
    year: '2020年',
    expenditure: 299_910,
    income: 9_910,
    orderList: [
      {
        order: '28387477711',
        title: '购买《某某某》',
        date: '2020年2月12日 12:00',
        price: '-¥200',
      },
      {
        order: '28387477711',
        title: '张三购买《某某某》',
        date: '2020年2月12日 12:00',
        price: '¥200',
      },
    ],
  },
  {
    year: '2019年',
    expenditure: 299_910,
    income: 9_910,
    orderList: [
      {
        order: '28387477711',
        title: '购买《某某某》',
        date: '2020年2月12日 12:00',
        price: '-¥200',
      },
      {
        order: '28387477711',
        title: '张三购买《某某某》',
        date: '2020年2月12日 12:00',
        price: '¥200',
      },
    ],
  },
];

const Mine = () => {
  return (
    <div>
      <div className={styles.top}>
        <img src={UMedia} alt="UMedia" className={styles.topLogo} />
        <div className={styles.topTitle}>UMedia</div>
        <div>请下载手机客户端查看自己购买的作品和签发出售的作品</div>
      </div>
      <div className={styles.status}>
        <div className={styles.statusContent}>
          <div className={styles.contentAmount}>90</div>
          <div className={styles.contentTitle}>待签发</div>
        </div>
        <div className={styles.statusContent}>
          <div className={styles.contentAmount}>2</div>
          <div className={styles.contentTitle}>我的作品</div>
        </div>
      </div>

      <div className={styles.record}>
        <div className={styles.recordContent}>
          <Card
            title="交易记录"
            bordered={false}
            style={{ width: 480 }}
            extra={
              <div className={styles.cardExtra}>
                <div className={styles.account}>账户余额 ¥21,000</div>
                <button type="button" className={styles.withdraw}>
                  提现
                </button>
              </div>
            }
          >
            <Collapse defaultActiveKey={['0']} ghost expandIconPosition="right">
              {list &&
                list.map((item, index) => {
                  return (
                    <Collapse.Panel
                      header={
                        <div>
                          <div className={styles.panelHeader}>{item.year}</div>
                          <div className={styles.panelSubtitle}>
                            <div>支出 ¥{item.expenditure}</div>
                            <div className={styles.subtitleRight}>
                              收入 ¥{item.income}
                            </div>
                          </div>
                        </div>
                      }
                      key={index}
                    >
                      {item.orderList &&
                        item.orderList.map((itemOrder, i) => {
                          return (
                            <div className={styles.panelContent} key={i}>
                              <div className={styles.contentLeft}>
                                <div className={styles.leftOrder}>
                                  订单号 {itemOrder.order}
                                </div>
                                <div className={styles.leftTitle}>
                                  {itemOrder.title}
                                </div>
                                <div className={styles.leftDate}>
                                  {itemOrder.date}
                                </div>
                              </div>
                              <div className={styles.contentRight}>
                                <div className={styles.rightPrice}>
                                  {itemOrder.price}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </Collapse.Panel>
                  );
                })}
            </Collapse>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mine;
