import { List, Avatar } from 'antd';

import styles from './FirstWork.less';
import { LoadMore } from '@/components';
import { ReactComponent as Logo } from '@/images/logo.svg';

type DataType = {
  img: string;
  avatarImg: string;
  avatarName: string;
  title: string;
  des: string;
  code: string;
  circulation: number;
  date: string;
  sold: number;
  lowAuctionPrice: number;
  countdown: string;
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
              <img src={item.img} alt="laugh" width="100%" />
            </div>
            <div className={styles.itemContent}>
              <div className={styles.avatarContent}>
                <Avatar src={item.avatarImg} size={32} />
                <div className={styles.avatarName}>{item.avatarName}</div>
              </div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.code}>代码 {item.code}</div>
              <div className={styles.des}>{item.des}</div>
              <div className={styles.circulation}>
                {item.date}，发行量{item.circulation}/已售{item.sold}
              </div>
            </div>
            <div className={styles.price}>
              <div className={styles.priceLeft}>
                <div className={styles.leftTitle}>拍卖低价</div>
                <div className={styles.leftAmount}>¥{item.lowAuctionPrice}</div>
              </div>
              <div className={styles.priceRight}>
                <div className={styles.rightTitle}>售卖倒计时</div>
                <div className={styles.rightTime}>{item.countdown}</div>
              </div>
            </div>
            <div className={styles.logo}>
              <Logo width={34} height={34} />
            </div>
          </div>
        </List.Item>
      )}
      loadMore={props.hasLoadMore && <LoadMore onClick={props.onLoadMore} />}
    />
  );
};

export default FirstWork;
