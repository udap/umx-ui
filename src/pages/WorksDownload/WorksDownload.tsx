import { useEffect, useState } from 'react';
import { history } from 'umi';
import QRCode from 'qrcode.react';

import styles from './WorksDownload.less';
import { getAuthor, getMarkets } from '@/services/auction';
import { randomString } from '@/utils/common';
import { UMedia } from '@/images';

const WorksDownload = () => {
  const { workId, assetId } = (history.location
    .query as unknown) as API.QueryProps;

  const [markets, setMarkets] = useState<API.MarketsType | null>(null);

  const fetchMarkets = async () => {
    try {
      const result = await getMarkets(workId);
      if (result.data?.id) {
        setMarkets(result.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  console.log('markets', markets);
  const randomKeys = randomString(19);

  return (
    <div className={styles.container}>
      <header>
        <img src={require('@/images/footer-logo.png')} alt="logo.png" />
      </header>
      <section>
        <div className={styles.sectionLeft}>
          <div className={styles.worksImg}>
            <img src={markets?.image} alt="img" />
          </div>
        </div>
        <div className={styles.sectionRight}>
          <div className={styles.product}>
            <div className={styles.name}>{markets?.name}</div>
            <div className={styles.productDetails}>
              <div className={styles.label}>合约地址</div>
              <div className={styles.value}>{markets?.contractaddress}</div>
            </div>
            <div className={styles.productDetails}>
              <div className={styles.label}>作品代码</div>
              <span className={styles.value}>{markets?.code}</span>
            </div>
            <div className={styles.productDetails}>
              <div className={styles.label}>总发行量</div>
              <span className={styles.value}>{markets?.copies}份</span>
            </div>
          </div>

          <QRCode
            id="qrcode"
            value={`UMedia://login?key=${randomKeys}`}
            renderAs={'svg'}
            size={140}
            level={'H'}
          />
        </div>
      </section>
    </div>
  );
};

export default WorksDownload;
