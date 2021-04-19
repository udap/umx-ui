import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { useInterval } from 'ahooks';
import NumberFormat from 'react-number-format';
import { Avatar } from 'antd';

import styles from './Sell.less';
import {
  getAuthor,
  getTradeHistory,
  getMarketsProduct,
  getToBuy,
  getCheckOrder,
  getPayOrder,
} from '@/services';
import { checkHasLogin } from '@/utils/common';
import {
  ThirdPayment,
  SignQRCode,
  PayModal,
  WorkSale,
  ImageLabel,
  CountDown,
} from '@/components';
import { magnifier, TikTok, WeChat, weibo, avatarY } from '@/images';
import * as tsDefault from '@/utils/tsDefault';

export type PaymentType = {
  payment: 'WeChatPay' | 'AliPay';
};

interface QueryProps {
  workId: string;
  authorId: string;
}

const Sell: React.FC = () => {
  const defaultAuthor = {
    address: '',
    followers: 0,
    following: 0,
    headImage: '',
    id: '',
    myintro: '',
    name: '',
    nickName: '',
  };
  const defaultProduct = {
    increment: 0,
    code: '',
    contractaddress: '',
    copies: 0,
    id: '',
    image: '',
    name: '',
    price: 0,
    saleStartTime: 0,
    purchaseAgreement: '',
    saleEndTime: 0,
    soldAmount: 0,
    summary: '',
    saleStatus: '',
  };
  const defaultPay = 'WeChatPay';
  const defaultOrder = {
    id: '',
    info: '',
    orderId: '',
    charge: 0,
  };

  const [author, setAuthor] = useState<API.AuthorObjType>(defaultAuthor);
  const [markets, setMarketsProduct] = useState<API.MarketsType>(
    tsDefault.DEFAULT_MARKETS,
  );

  const [hasPayModal, setHasPayModal] = useState(false);
  const [hasPayOrder, setHasPayOrder] = useState(false);

  const [hasPayment, setHasPayment] = useState(false);
  const [payment, setPayment] = useState<'WeChatPay' | 'AliPay'>(defaultPay);

  const [order, setOrder] = useState<API.OrderType>(defaultOrder);

  const [hasSign, setHasSign] = useState(false);

  const [interval, setInterval] = useState<number | null>(null);

  const [hasSellBtnLoading, setHasSellBtnLoading] = useState(false);

  const handleSellBtnClick = async () => {
    const login = await checkHasLogin();

    if (!login) {
      history.push('/login');
      return;
    }

    setHasPayModal(true);
  };

  const handleCancel = () => {
    setHasPayModal(false);
  };

  const fetchData = () => {
    const { workId } = (history.location.query as unknown) as QueryProps;

    Promise.all([getMarketsProduct(workId)]).then((res) => {
      if (res[0].data) {
        setMarketsProduct(res[0].data);
      }
    });
  };

  const fetchAuthor = async () => {
    try {
      if (markets.userId) {
        const result = await getAuthor(markets.userId);
        if (result?.data && result.data instanceof Object) {
          setAuthor(result.data);
        }
      }
    } catch (error) {
      console.log('fetchAuthor', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchAuthor();
  }, [markets.userId]);

  const onCancel = () => {
    setHasPayment(false);
    setHasSign(false);

    setInterval(null);

    setHasSellBtnLoading(false);
  };

  const handleCheckOrder = async () => {
    try {
      const result = await getCheckOrder(order?.orderId);
      // 购买流程：待支付 => 已支付 => 已签字
      if (result?.data) {
        switch (result?.data) {
          // 待支付
          case 'pendingPayment':
            setHasPayment(true);
            break;

          // 已支付
          case 'payed':
            // 关闭支付二维码
            setHasPayment(false);

            // 打开签字二维码
            setHasSign(true);
            break;

          // 已签字
          case 'signed':
            onCancel();
            break;

          default:
            break;
        }
      }
    } catch (error) {}
  };

  useInterval(() => {
    handleCheckOrder();
  }, interval);

  const onThirdPaymentCancel = () => {
    setHasPayment(false);
    setInterval(null);

    setHasSellBtnLoading(false);
  };

  const fetchToBuy = async (marketId: string) => {
    const login = await checkHasLogin();

    const data = {
      marketId,
      userAddress: login.xSender,
    };

    try {
      const result = await getToBuy(data);
      if (result?.data && result.data instanceof Object) {
        return result?.data?.id;
      }
    } catch (error) {}
  };

  const handlePayBtn = async (element: {
    marketId: string;
    buyMessage: string;
    method: 'WeChatPay' | 'AliPay';
  }) => {
    setPayment(element.method);

    const orderId = await fetchToBuy(element.marketId);

    setHasPayOrder(true);
    try {
      const result = await getPayOrder({
        buyMessage: element.buyMessage,
        orderId,
      });

      if (result?.data && result.data instanceof Object) {
        setHasPayModal(false);

        setOrder(result.data);

        setInterval(1000);

        setHasSellBtnLoading(true);
      }
    } catch (error) {}
    setHasPayOrder(false);
  };

  const onSignQRCancel = () => {
    setHasSign(false);
    setInterval(null);

    setHasSellBtnLoading(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.workContainer}>
          <div className={styles.contentLeft}>
            <WorkSale>
              <img src={markets.image} alt="workImg" />
            </WorkSale>
            <div className={styles.magnifier}>
              <img src={magnifier} alt="magnifier" />
              <div>查看作品介绍详情</div>
            </div>
          </div>

          <div className={styles.contentRight}>
            <div className={styles.rightWork}>
              <div className={styles.thirdShare}>
                <ImageLabel image={TikTok} label="直播间" />
                <ImageLabel
                  image={weibo}
                  label="#La Rue Saint-Rustique à Montmartre#"
                />
                <ImageLabel image={WeChat} label="微信主题讨论群" />
              </div>
              <div className={styles.info}>
                <div className={styles.workName}>{markets.name}</div>
                <div className={styles.des}>
                  <div className={styles.codeCopies}>
                    序列号 {markets.code} 发行量{markets.copies}份
                  </div>
                  <div className={styles.permissionDes}>用户购买权限说明</div>
                </div>
                <div className={styles.address}>
                  区块链：{markets.contractaddress}
                </div>
                <CountDown
                  saleStartTime={markets.saleStartTime}
                  saleEndTime={markets.saleEndTime}
                />
                <div className={styles.priceBox}>
                  <div className={styles.saleBox}>
                    <div className={styles.saleMethod}>直卖</div>
                    <div className={styles.salePrice}>售价</div>
                  </div>
                  <div className={styles.price}>
                    <NumberFormat
                      value={markets.price}
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                      displayType={'text'}
                      prefix={'¥'}
                    />
                  </div>
                </div>
                <ImageLabel
                  image={WeChat}
                  label="微信参与购买"
                  width={41}
                  height={41}
                />
              </div>
            </div>
            <div className={styles.rightAvatar}>
              <div className={styles.worker}>
                <WorkSale>
                  <Avatar src={author.headImage} size={48} />
                </WorkSale>
                <div className={styles.authorName}>{author.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {hasPayModal && (
        <PayModal
          visible={hasPayModal}
          onCancel={handleCancel}
          marketsProduct={markets}
          handlePayBtn={handlePayBtn}
          hasPayOrder={hasPayOrder}
        />
      )}
      {hasPayment && (
        <ThirdPayment
          payment={payment}
          order={order}
          visible={hasPayment}
          onCancel={onThirdPaymentCancel}
        />
      )}
      {hasSign && (
        <SignQRCode visible={hasSign} onCancel={onSignQRCancel} order={order} />
      )}
    </>
  );
};

export default Sell;
