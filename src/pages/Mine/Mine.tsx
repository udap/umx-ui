import { Card, Collapse } from 'antd';

import styles from './Mine.less';
import { UMedia } from '@/images';

const Mine = () => {
  return (
    <>
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
            <Collapse defaultActiveKey={['1']} ghost expandIconPosition="right">
              <Collapse.Panel
                header={
                  <div>
                    <div className={styles.panelHeader}>2020年</div>
                    <div className={styles.panelSubtitle}>
                      <div>支出 ¥299,910</div>
                      <div className={styles.subtitleRight}>收入 ¥9,910</div>
                    </div>
                  </div>
                }
                key="1"
              >
                <div className={styles.panelContent}>
                  <div className={styles.contentLeft}>
                    <div className={styles.leftOrder}>订单号 28387477711</div>
                    <div className={styles.leftTitle}>购买《某某某》</div>
                    <div className={styles.leftDate}>2020年2月12日 12:00</div>
                  </div>
                  <div className={styles.contentRight}>
                    <div className={styles.rightPrice}>-¥200</div>
                  </div>
                </div>

                <div className={styles.panelContent}>
                  <div className={styles.contentLeft}>
                    <div className={styles.leftOrder}>订单号 28387477711</div>
                    <div className={styles.leftTitle}>购买《某某某》</div>
                    <div className={styles.leftDate}>2020年2月12日 12:00</div>
                  </div>
                  <div className={styles.contentRight}>
                    <div className={styles.rightPrice}>-¥200</div>
                  </div>
                </div>
              </Collapse.Panel>
            </Collapse>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Mine;
