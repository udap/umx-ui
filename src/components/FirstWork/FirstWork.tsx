import { List, Avatar } from 'antd';
import dayjs from 'dayjs';
import NumberFormat from 'react-number-format';

import styles from './FirstWork.less';
import { LoadMore } from '@/components';
import { logo } from '@/images';

type DataType = {
  product: {
    image: string;
    code: string;
    name: string;
    summary: string;
    publishDate: string;
    copies: string;
    soldAmount: string;
    price: string;
  };
  user: {
    headImage: string;
    address: string;
    name: string;
  };
};

type FirstWorkType = {
  onLoadMore: () => void;
  data: DataType[];
  hasLoadMore?: boolean;
  grid?: {
    gutter: number;
    column: number;
  };
};

const FirstWork = (props: FirstWorkType) => {
  return (
    <List
      grid={props.grid || { gutter: 96, column: 3 }}
      dataSource={props.data}
      renderItem={(item) => (
        <List.Item className={styles.listItem}>
          <div className={styles.item}>
            <div className={styles.itemImage}>
              <img src={item.product?.image} alt="laugh" width="100%" />
            </div>
            <div className={styles.itemContent}>
              <div className={styles.avatarContent}>
                {item.user?.headImage ? (
                  <Avatar src={item.user?.headImage} size={32} />
                ) : (
                  <Avatar size={32}>{item.user?.address?.substr(-2)}</Avatar>
                )}
                <div className={styles.avatarName}>{item.user?.name}</div>
              </div>
              <div className={styles.title}>{item.product.name}</div>
              <div className={styles.code}>代码 {item.product?.code}</div>
              <div className={styles.des}>{item.product?.summary}</div>
              <div className={styles.circulation}>
                {dayjs(item.product?.publishDate).format('MM月DD日')}，发行量
                {item.product?.copies}/已售{item.product?.soldAmount}
              </div>
            </div>
            <div className={styles.price}>
              <div className={styles.priceLeft}>
                <div className={styles.leftTitle}>售价</div>
                <div className={styles.leftAmount}>
                  <NumberFormat
                    value={item.product?.price}
                    thousandSeparator={true}
                    fixedDecimalScale={true}
                    displayType={'text'}
                    prefix={'¥'}
                  />
                </div>
              </div>
              <div className={styles.priceRight}>
                <div className={styles.rightTitle}>售卖倒计时</div>
                <div className={styles.rightTime}>20:00</div>
              </div>
            </div>
            <div className={styles.logo}>
              <img src={logo} alt="logo" width={34} height={34} />
            </div>
          </div>
        </List.Item>
      )}
      loadMore={props.hasLoadMore && <LoadMore onClick={props.onLoadMore} />}
    />
  );
};

export default FirstWork;
