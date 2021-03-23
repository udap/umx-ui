import { List, Avatar } from 'antd';
import NumberFormat from 'react-number-format';

import styles from './MarketPlaceList.less';
import { ReactComponent as RateRise } from '@/images/rateRise.svg';
import { LoadMore } from '@/components';

type DataType = {
  img: string;
  avatarImg: string;
  avatarName: string;
  title: string;
  des: string;
  code: string;
  circulation: number;
  heightPrice: number;
  lowPrice: number;
};

type MarketPlaceListType = {
  onLoadMore: () => void;
  data: DataType[];
  grid?: {
    gutter: number;
    column: number;
  };
  hasLoadMore?: boolean;
};

const MarketPlaceList = (props: MarketPlaceListType) => {
  return (
    <List
      grid={props.grid || { gutter: 96, column: 3 }}
      dataSource={props.data}
      renderItem={(item) => (
        <List.Item className={styles.listItem}>
          <div className={styles.item}>
            <div className={styles.itemImage}>
              <img src={item.img} alt="laugh" width="100%" />
            </div>
            <div className={styles.itemContent}>
              <div className={styles.avatarContent}>
                <Avatar
                  src={item.avatarImg}
                  size={32}
                  style={{ boxShadow: '0px 0px 12px 5px rgba(0, 0, 0, 0.65)' }}
                />
                <div className={styles.avatarName}>{item.avatarName}</div>
              </div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.code}>代码 {item.code}</div>
              <div className={styles.des}>{item.des}</div>
              <div className={styles.circulation}>
                二手流通量 {item.circulation}
              </div>
            </div>
            <div className={styles.rate}>
              <div className={styles.priceRange}>
                <NumberFormat
                  value={item.lowPrice}
                  thousandSeparator={true}
                  fixedDecimalScale={true}
                  displayType={'text'}
                  prefix={'¥'}
                  suffix={'~'}
                />
                <NumberFormat
                  value={item.heightPrice}
                  thousandSeparator={true}
                  fixedDecimalScale={true}
                  displayType={'text'}
                  prefix={'¥'}
                />
              </div>
              <div className={styles.rateTrend}>
                <RateRise width={24} height={20} />
              </div>
            </div>
          </div>
        </List.Item>
      )}
      loadMore={props.hasLoadMore && <LoadMore onClick={props.onLoadMore} />}
    />
  );
};

export default MarketPlaceList;
