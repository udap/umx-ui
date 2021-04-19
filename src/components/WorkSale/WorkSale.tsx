import { useEffect } from 'react';
import { Avatar } from 'antd';
import { useCountDown } from 'ahooks';
import NumberFormat from 'react-number-format';
import dayjs from 'dayjs';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './WorkSale.less';
import { etherscan } from '@/images';

const methodArr = [
  {
    method: 'sell',
    title: '首发售价',
    desc:
      '售卖结束后，可在二级市场交易 同时原创作者会在7日内签发，如没有签发成功钱自动原路返还',
    buttonText: '立即购买',
    buttonEnd: '首发结束',
  },
  {
    method: 'auction',
    title: '拍卖底价',
    desc: '在最后15分钟内进行的任何投标都将将拍卖再延长15分钟。',
    buttonText: '拍卖出价',
    buttonEnd: '首发结束',
  },
];

type WorkSaleType = {
  sellingMethod: string;
  marketsProduct: API.ProductObjType;
  authorObj: API.AuthorObjType;
  sellBtnClick: () => void;
  hasSellBtnLoading: boolean;
};

const WorkSale = (props: WorkSaleType) => {
  const [countdown, setTargetDate, formattedRes] = useCountDown();
  const { days, hours, minutes, seconds } = formattedRes;

  useEffect(() => {
    setTargetDate(dayjs(props.marketsProduct.saleEndTime).valueOf());
  }, [props.marketsProduct]);

  return (
    <>
      <div className={styles.code}>代码 {props.marketsProduct?.code}</div>
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <img
            src={props.marketsProduct?.image}
            alt="image"
            className={styles.leftImg}
          />
          <div className={styles.desContent}>
            <Avatar src={etherscan} size={12} />
            <div className={styles.desTitle}>Etherscan</div>
            <div className={styles.desCode}>
              {props.marketsProduct?.contractaddress}
            </div>
          </div>
        </div>
        <div className={styles.contentRight}>
          <div className={styles.avatar}>
            <div className={styles.avatarContent}>
              {props.authorObj?.headImage ? (
                <Avatar src={props.authorObj?.headImage} size={44} />
              ) : (
                <Avatar size={44}>
                  {props.authorObj?.address?.substr(-2)}
                </Avatar>
              )}
              <div className={styles.avatarName}>{props.authorObj?.name}</div>
            </div>
          </div>

          <div className={styles.center}>
            <div className={styles.centerTitle}>
              {props.marketsProduct?.name}
            </div>
            <div className={styles.centerDes}>
              {props.marketsProduct?.summary}
            </div>
          </div>

          <div className={styles.auctionInfo}>
            <div className={styles.infoLeft}>
              <div className={styles.leftReserveTitle}>
                {methodArr.map((item) => {
                  if (item.method === props.sellingMethod) {
                    return item.title;
                  }
                })}
              </div>
              <div className={styles.leftReservePrice}>
                <NumberFormat
                  value={props.marketsProduct?.price}
                  thousandSeparator={true}
                  fixedDecimalScale={true}
                  displayType={'text'}
                  prefix={'¥'}
                />
              </div>
              <div className={styles.leftReserve}>
                上限{' '}
                <span className={styles.reserveAmount}>
                  {props.marketsProduct?.copies}
                </span>{' '}
                份
              </div>
              <div className={styles.auth}>用户购买权限说明</div>
            </div>
            <div className={styles.infoRight}>
              <div className={styles.rightAuctionTitle}>
                {dayjs(props.marketsProduct?.saleStartTime).format(
                  'MM月DD日 HH:mm',
                )}{' '}
                发行
              </div>
              <div className={styles.rightAuctionDate}>
                {countdown ? (
                  <>
                    <div className={styles.rightAuctionDateTitle}>距结束</div>
                    <div className={styles.rightAuctionTime}>
                      {days}:{hours}:{minutes}:{seconds}
                    </div>
                  </>
                ) : (
                  <div className={styles.rightAuctionTime}>已结束</div>
                )}
              </div>
              <div className={styles.rightAuctionDes}>
                {methodArr.map((item) => {
                  if (item.method === props.sellingMethod) {
                    return item.desc;
                  }
                })}
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottomBtn}>
              <button
                type="button"
                className={styles.btn}
                style={{ backgroundColor: countdown ? '#000' : '#555' }}
                disabled={countdown === 0}
                onClick={props.sellBtnClick}
              >
                {methodArr.map((item) => {
                  if (item.method === props.sellingMethod) {
                    return countdown ? item.buttonText : item.buttonEnd;
                  }
                })}{' '}
                {props.hasSellBtnLoading && <LoadingOutlined />}
              </button>
            </div>
            {props.sellingMethod === 'auction' && (
              <div className={styles.bottomTips}>
                拍卖结束后，创作者会根据出价签发作品发送给你。
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkSale;
