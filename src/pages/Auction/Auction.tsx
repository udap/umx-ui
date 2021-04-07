import { useEffect, useState, useRef } from 'react';
import { Skeleton, Avatar } from 'antd';
import { useCountDown } from 'ahooks';
import dayjs from 'dayjs';
import NumberFormat from 'react-number-format';

import styles from './Auction.less';
import { getAuthor, getMarkets, getBidsTops } from '@/services/auction';
import { BidGraph } from '@/components';
import { WeChat, TikTok } from '@/images';
import { IMG_WIDTH_RATE } from '@/utils/constants';
import useWindowSize from '@/utils/useWindowSize';

interface MarketsType {
  height: number;
  width: number;
  image: string;
  name: string;
  code: string;
  copies: number;
  contractaddress: string;
  saleEndTime: string;
  price: number;
  increment: number;
}

interface AuthInfoType {
  headImage: string;
  name: string;
  nickName: string;
}

const Auction = () => {
  const defaultMarkets = {
    height: 427,
    width: 466,
    image: '',
    name: '',
    code: '',
    copies: 0,
    contractaddress: '',
    saleEndTime: '',
    price: 0,
    increment: 0,
  };
  const defaultAuthInfo = {
    headImage: '',
    name: '',
    nickName: '',
  };
  const [authorInfo, setAuthorInfo] = useState<AuthInfoType>(defaultAuthInfo);
  const [markets, setMarkets] = useState<MarketsType>(defaultMarkets);
  const [bidsTops, setBidsTops] = useState([]);
  const [marketsLoading, setMarketsLoading] = useState(false);

  const [countdown, setTargetDate, formattedRes] = useCountDown();
  const { days, hours, minutes, seconds } = formattedRes;

  let windowSizeWidth = 1280;
  const windowSize = useWindowSize();
  if (windowSize.width > windowSizeWidth) {
    windowSizeWidth = windowSize.width;
  }

  useEffect(() => {
    setTargetDate(dayjs(markets.saleEndTime).valueOf());
  }, [markets.saleEndTime]);

  const checkImageInfo = (element: string) => {
    return new Promise<{ height: number; width: number }>((resolve) => {
      const img = new Image();
      img.src = element;
      img.onload = function () {
        resolve({ height: img.height, width: img.width });
      };
      img.onerror = function () {
        resolve({ height: img.height, width: img.width });
      };
    });
  };

  const fetchAuthor = async (element: string) => {
    try {
      if (element) {
        const result = await getAuthor(element);
        if (result?.data && result.data instanceof Object) {
          setAuthorInfo(result.data);
        }
      }
    } catch (error) {
      console.log('fetchAuthor', error);
    }
  };

  const fetchMarkets = async (element: string) => {
    setMarketsLoading(true);
    try {
      if (element) {
        const result = await getMarkets(element);
        if (result?.data && result.data instanceof Object) {
          const imageInfo = await checkImageInfo(result.data?.image);

          setMarkets({
            ...result.data,
            height: imageInfo?.height,
            width: imageInfo.width,
          });
        }
      }
    } catch (error) {
      console.log('fetchMarkets', error);
    }
    setMarketsLoading(false);
  };

  const fetchBidsTops = async (element: string) => {
    try {
      if (element) {
        const result = await getBidsTops({ productId: element });
        if (result?.data && result.data instanceof Array) {
          setBidsTops(result.data);
        }
      }
    } catch (error) {
      console.log('fetchAuthor', error);
    }
  };

  useEffect(() => {
    const authorId = sessionStorage.getItem('authorId');
    const productId = sessionStorage.getItem('productId');

    fetchAuthor(authorId || '');
    fetchMarkets(productId || '');
    fetchBidsTops(productId || '');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentLeft}>
        {marketsLoading ? (
          <Skeleton.Image
            style={{
              margin: '30px 0 0 30px',
              width: IMG_WIDTH_RATE * windowSizeWidth,
            }}
          />
        ) : (
          <>
            <div
              className={styles.imageShadow}
              style={{
                width: IMG_WIDTH_RATE * windowSizeWidth,
                height:
                  (markets.height * IMG_WIDTH_RATE * windowSizeWidth) /
                  markets.width,
              }}
            />
            <div className={styles.image}>
              <img
                src={markets.image}
                alt="marketsImage"
                width={IMG_WIDTH_RATE * windowSizeWidth}
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.contentCenter}>
        <div className={styles.auth}>
          <Avatar
            src={authorInfo.headImage}
            size={48}
            className={styles.authAvatar}
          />
          <div className={styles.authInfo}>
            <div className={styles.authName}>{authorInfo.name}</div>
            <div className={styles.authNickName}>{authorInfo.nickName}</div>
          </div>
        </div>
        <div className={styles.works}>
          <div className={styles.name}>{markets.name}</div>
          <div className={styles.info}>
            <div className={styles.codeAndCopies}>
              序列号 {markets.code} 发行量{markets.copies}份
            </div>
            <div className={styles.infoLink}>
              <div className={styles.link}>作品介绍</div>
              <div> / </div>
              <div className={styles.link}>用户购买权限说明</div>
            </div>
          </div>
          <div className={styles.address}>
            区块链：{markets.contractaddress}
          </div>
        </div>
        <div className={styles.countdown}>
          <div className={styles.tips}>距结束</div>
          <div className={styles.countdownTime}>
            {days}:{hours}:{minutes}:{seconds}
          </div>
        </div>
        <div className={styles.auction}>
          <div className={styles.price}>
            <div className={styles.startingPriceContent}>
              <div className={styles.tips}>起拍价</div>
              <div className={styles.startingPrice}>
                <NumberFormat
                  value={markets.price}
                  thousandSeparator={true}
                  fixedDecimalScale={true}
                  displayType={'text'}
                  prefix={'¥'}
                />
              </div>
            </div>
            <div className={styles.singleMarkup}>
              单次加价
              <NumberFormat
                value={markets.increment}
                thousandSeparator={true}
                fixedDecimalScale={true}
                displayType={'text'}
                prefix={'¥'}
              />
            </div>
          </div>
          <div className={styles.authTips}>
            拍卖首次出价需全款付清，如你中签，加价金额会在拍卖结束后5分钟内付清
          </div>
          <BidGraph bidList={bidsTops} copies={markets.copies} />
        </div>
      </div>
      <div className={styles.contentRight}>
        <div>
          <div className={styles.content}>
            <img src={TikTok} alt="TikTok" className={styles.img} />
            <div className={styles.tips}>
              <div>抖音</div>
              <div>直播间</div>
            </div>
          </div>
          <div className={styles.content}>
            <img src={WeChat} alt="WeChat" className={styles.img} />
            <div className={styles.tips}>
              <div>微信</div>
              <div>直播间</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;
