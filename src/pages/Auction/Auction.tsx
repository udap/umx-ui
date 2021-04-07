import { useEffect, useState } from 'react';
import { Skeleton, Avatar, Modal } from 'antd';
import NumberFormat from 'react-number-format';
import QRCode from 'qrcode.react';
var Stomp = require('stompjs');
import dayjs from 'dayjs';

import styles from './Auction.less';
import { getAuthor, getMarkets, getBidsTops } from '@/services/auction';
import { BidGraph } from '@/components';
import { WeChat, TikTok, ViewDetail } from '@/images';
import { IMG_WIDTH_RATE } from '@/utils/constants';
import { padLeft } from '@/utils/common';
import useWindowSize from '@/utils/useWindowSize';
import { CountDown } from './components';

interface AuthInfoType {
  headImage: string;
  name: string;
  nickName: string;
}

interface BidTopsType {
  bidder: {
    id: string;
    name: string;
  };
  createdDate: number;
  id: string;
  price: number;
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
    publishDate: 0,
  };
  const defaultAuthInfo = {
    headImage: '',
    name: '',
    nickName: '',
  };
  const defaultBidTops = [
    {
      bidder: {
        id: '',
        name: '',
      },
      createdDate: 0,
      id: '',
      price: 0,
    },
  ];
  const [authorInfo, setAuthorInfo] = useState<AuthInfoType>(defaultAuthInfo);
  const [markets, setMarkets] = useState<API.MarketsType>(defaultMarkets);
  const [bidsTops, setBidsTops] = useState<BidTopsType[]>(defaultBidTops);
  const [marketsLoading, setMarketsLoading] = useState(false);
  const [liveVisible, setLiveVisible] = useState(false);
  const [liveMethod, setLiveMethod] = useState('');

  let windowSizeWidth = 1280;
  const windowSize = useWindowSize();
  if (windowSize.width > windowSizeWidth) {
    windowSizeWidth = windowSize.width;
  }

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

    let url = 'wss://api.umx.art/message/ws';
    let stompClient = Stomp.client(url);
    stompClient.connect(
      {},
      (frame: string) => {
        // 连接成功
        // setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe(
          '/exchange/udap.sys.notice/auction.price',
          (greeting: { body: string }) => {
            // 订阅成功
            const greetingBody = JSON.parse(greeting.body);

            const hasBiderArr = bidsTops.filter(
              (item, index) =>
                item.bidder.id === greetingBody.content?.bidder.id,
            );

            let tempArr: any = [];
            if (hasBiderArr.length) {
              bidsTops.forEach((item, index) => {
                if (item.bidder.id === greetingBody.content?.bidder.id) {
                  tempArr.push(greetingBody.content);
                  return;
                }
                tempArr.push(item);
              });
            } else {
              tempArr = [...bidsTops, greetingBody.content];
            }
            setBidsTops(tempArr);
          },
          function (err: any) {
            // 订阅失败
            console.log('err', err);
          },
        );
      },
      (error: any) => {
        // 连接失败
        console.log('connectFail', error);
      },
    );
  }, []);

  const onLiveCancel = () => {
    setLiveVisible(false);
  };

  const onLiveClick = (e: string) => {
    setLiveMethod(e);
    setLiveVisible(true);
  };

  useEffect(() => {
    const compare = (property: string) => {
      return function (a: { [x: string]: any }, b: { [x: string]: any }) {
        const value1 = a[property];
        const value2 = b[property];
        return value2 - value1;
      };
    };

    const sortBidsTops = bidsTops.sort(compare('price'));
    setBidsTops(sortBidsTops);
  }, [bidsTops]);

  return (
    <>
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
            <div className={styles.leftTop}>
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
            </div>
          )}
          <div className={styles.view}>
            <img src={ViewDetail} alt="ViewDetail" />
          </div>
        </div>
        <div className={styles.contentCenter}>
          <div className={styles.centerTop}>
            <div className={styles.modalContent}>
              <div
                className={styles.content}
                onClick={() => onLiveClick('TikTok')}
              >
                <div className={styles.title}>直播间</div>
                <img src={TikTok} alt="TikTok" />
              </div>
              <div
                className={styles.content}
                onClick={() => onLiveClick('WeChat')}
              >
                <div className={styles.title}>微信参与拍卖</div>
                <img src={WeChat} alt="WeChat" />
              </div>
            </div>
            <div className={styles.works}>
              <div className={styles.name}>{markets.name}</div>
              <div className={styles.info}>
                <div className={styles.codeAndCopies}>
                  序列号 {markets.code} 发行量{markets.copies}份
                </div>
                <div className={styles.infoLink}>
                  <div className={styles.link}>用户购买权限说明</div>
                </div>
              </div>
              <div className={styles.address}>
                区块链：{markets.contractaddress}
              </div>
            </div>
            {(dayjs(new Date()).valueOf() < markets.publishDate ||
              dayjs(new Date()).valueOf() <
                dayjs(markets.saleEndTime).valueOf()) && (
              <CountDown markets={markets} />
            )}
            {dayjs(new Date()).valueOf() >
              dayjs(markets.saleEndTime).valueOf() && (
              <div className={styles.during}>
                {dayjs(markets.publishDate).format('MM月DD日 HH:mm')} -{' '}
                {dayjs(markets.saleEndTime).format('MM月DD日 HH:mm')}
              </div>
            )}
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
            </div>
          </div>
          {dayjs(new Date()).valueOf() >= markets.publishDate && (
            <>
              <div className={styles.authTips}>
                {dayjs(new Date()).valueOf() >
                dayjs(markets.saleEndTime).valueOf()
                  ? `拍卖结束，中签为下方001${
                      markets.copies !== 1
                        ? `-${padLeft(markets.copies, 3)}`
                        : ''
                    }用户，请在微信中支付加价的尾款`
                  : '拍卖首次出价需全款付清，如你中签，加价金额会在拍卖结束后5分钟内付清'}
              </div>
              <BidGraph bidList={bidsTops} copies={markets.copies} />
            </>
          )}
        </div>
        <div className={styles.contentRight}>
          <div>
            <div className={styles.auth}>
              <Avatar
                src={authorInfo.headImage}
                size={48}
                className={styles.authAvatar}
              />
              <div className={styles.authName}>{authorInfo.name}</div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title=""
        visible={liveVisible}
        onCancel={onLiveCancel}
        footer={null}
        width={368}
        destroyOnClose
        centered
        closable={false}
      >
        <QRCode
          id="qrcode"
          value={`UMedia://webSign?orderId=${liveMethod}`}
          renderAs={'svg'}
          size={320}
          level={'H'}
          imageSettings={{
            src: liveMethod === 'WeChat' ? WeChat : TikTok,
            height: 48,
            width: 48,
            excavate: true,
          }}
        />
      </Modal>
    </>
  );
};

export default Auction;
