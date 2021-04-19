import { useEffect } from 'react';
import { useCountDown } from 'ahooks';
import { List, Avatar } from 'antd';
import dayjs from 'dayjs';
import NumberFormat from 'react-number-format';

import styles from './FirstWork.less';
import { LoadMore } from '@/components';
import { LOGO } from '@/images';

type ItemContentType = {
  product: API.ProductObjType;
  user: API.AuthorObjType;
};

const ItemContent = (props: ItemContentType) => {
  const [countdown, setTargetDate, formattedRes] = useCountDown();
  const { days, hours, minutes, seconds } = formattedRes;

  useEffect(() => {
    setTargetDate(dayjs(props.product.saleEndTime).valueOf());
  }, [props.product]);
  return (
    <div className={styles.item}>
      <div className={styles.itemImage}>
        <img src={props.product?.image} alt="laugh" width="100%" />
      </div>
      <div className={styles.itemContent}>
        <div className={styles.avatarContent}>
          {props.user?.headImage ? (
            <Avatar src={props.user?.headImage} size={32} />
          ) : (
            <Avatar size={32}>{props.user?.address?.substr(-2)}</Avatar>
          )}
          <div className={styles.avatarName}>{props.user?.name}</div>
        </div>
        <div className={styles.title}>{props.product.name}</div>
        <div className={styles.code}>代码 {props.product?.code}</div>
        <div className={styles.des}>{props.product?.summary}</div>
        <div className={styles.circulation}>
          {dayjs(props.product?.saleStartTime).format('MM月DD日')}，发行量
          {props.product?.copies}/已售{props.product?.soldAmount}
        </div>
      </div>
      <div className={styles.price}>
        <div className={styles.priceLeft}>
          <div className={styles.leftTitle}>售价</div>
          <div className={styles.leftAmount}>
            <NumberFormat
              value={props.product?.price}
              thousandSeparator={true}
              fixedDecimalScale={true}
              displayType={'text'}
              prefix={'¥'}
            />
          </div>
        </div>
        <div className={styles.priceRight}>
          {countdown ? (
            <>
              <div className={styles.rightTitle}>距结束</div>
              <div className={styles.rightTime}>
                {days}:{hours}:{minutes}:{seconds}
              </div>
            </>
          ) : (
            <div>已结束</div>
          )}
        </div>
      </div>
      <div className={styles.logo}>
        <img src={LOGO} alt="LOGO" width={34} height={34} />
      </div>
    </div>
  );
};

type FirstWorkType = {
  onLoadMore: () => void;
  onItemClick: (elements: API.FirstWorksType) => void;
  data: API.FirstWorksType[];
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
        <List.Item
          className={styles.listItem}
          onClick={() => props.onItemClick(item)}
        >
          <ItemContent {...item} />
        </List.Item>
      )}
      loadMore={props.hasLoadMore && <LoadMore onClick={props.onLoadMore} />}
    />
  );
};

export default FirstWork;
