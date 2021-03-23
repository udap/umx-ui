import { useEffect } from 'react';
import { Avatar } from 'antd';
import { useCountDown } from 'ahooks';

import styles from './WorkSale.less';
import { laugh, avatarY, etherscan } from '@/images';

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
};

const WorkSale = (props: WorkSaleType) => {
  const onEnd = () => {
    console.log('onEnd of the time');
  };

  const [countdown, setTargetDate] = useCountDown({ onEnd });

  useEffect(() => {
    setTargetDate(Date.now() + 10000);
  }, []);

  return (
    <>
      <div className={styles.code}>代码 A29387</div>
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <img src={laugh} alt="laugh" className={styles.leftImg} />
          <div className={styles.desContent}>
            <Avatar src={etherscan} size={12} />
            <div className={styles.desTitle}>Etherscan</div>
            <div className={styles.desCode}>
              0x 3f13 3816 f817 8b93 ac99 1a2c 3eed db8f 947a f0cb
            </div>
          </div>
        </div>
        <div className={styles.contentRight}>
          <div className={styles.avatar}>
            <div className={styles.avatarContent}>
              <Avatar src={avatarY} size={44} />
              <div className={styles.avatarName}>岳敏君</div>
            </div>
          </div>

          <div className={styles.center}>
            <div className={styles.centerTitle}>快乐图</div>
            <div className={styles.centerDes}>
              那时已经有一些艺术家开始做失落感觉的作品了,他们给我一些启发,
              我开始做一排排的人,一排排的人有一点力量感,也有一种嘲笑。
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
              <div className={styles.leftReservePrice}>¥10,000</div>
              <div className={styles.leftReserve}>
                发行 <span className={styles.reserveAmount}>900</span> 份
              </div>
              {props.sellingMethod === 'sell' && <div>已售10份</div>}
              <div className={styles.auth}>用户购买权限说明</div>
            </div>
            <div className={styles.infoRight}>
              <div className={styles.rightAuctionTitle}>3月20日12:00发行</div>
              <div className={styles.rightAuctionDate}>
                {countdown ? (
                  <>
                    <div className={styles.rightAuctionDateTitle}>剩余</div>
                    <div className={styles.rightAuctionTime}>
                      {Math.round(countdown / 1000)}
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
              >
                {methodArr.map((item) => {
                  if (item.method === props.sellingMethod) {
                    return countdown ? item.buttonText : item.buttonEnd;
                  }
                })}
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
