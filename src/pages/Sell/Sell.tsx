import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { useInterval } from 'ahooks';

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
import { ThirdPayment, SignQRCode, PayModal } from '@/components';

import {
  WorkSale,
  AuthorAbout,
  TransactionList,
  // ShareBlock,
} from '@/components';

export type PaymentType = {
  payment: 'WeChatPay' | 'AliPay';
};

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
    code: '',
    contractaddress: '',
    copies: 0,
    id: '',
    image: '',
    name: '',
    price: 0,
    publishDate: 0,
    purchaseAgreement: '',
    saleEndTime: '',
    soldAmount: 0,
    summary: '',
  };
  const defaultPay = 'WeChatPay';
  const defaultOrder = {
    id: '',
    info: '',
    orderId: '',
    charge: 0,
  };

  const [author, setAuthor] = useState<API.AuthorObjType>(defaultAuthor);
  const [tradeHistory, setTradeHistory] = useState<any[]>([]);
  const [marketsProduct, setMarketsProduct] = useState(defaultProduct);

  const [hasPayModal, setHasPayModal] = useState(false);
  const [hasPayOrder, setHasPayOrder] = useState(false);

  const [hasPayment, setHasPayment] = useState(false);
  const [payment, setPayment] = useState<'WeChatPay' | 'AliPay'>(defaultPay);

  const [order, setOrder] = useState<API.OrderType>(defaultOrder);

  const [hasSign, setHasSign] = useState(false);

  const [interval, setInterval] = useState<number | null>(null);

  const [hasSellBtnLoading, setHasSellBtnLoading] = useState(false);

  const fetchAuthor = async (element: string) => {
    try {
      if (element) {
        const result = await getAuthor(element);
        if (result?.data && result.data instanceof Object) {
          setAuthor(result.data);
        }
      }
    } catch (error) {
      console.log('fetchAuthor', error);
    }
  };

  const fetchTradeHistory = async (element: string) => {
    try {
      if (element) {
        const params = {
          productId: element,
          q: 'summary',
        };
        const result = await getTradeHistory(params);
        if (result?.data && result.data instanceof Array) {
          setTradeHistory(result.data);
        }
      }
    } catch (error) {
      console.log('fetchTradeHistory', error);
    }
  };

  const fetchMarketsProduct = async (element: string) => {
    try {
      if (element) {
        const result = await getMarketsProduct(element);
        if (result?.data && result.data instanceof Object) {
          setMarketsProduct(result.data);
        }
      }
    } catch (error) {
      console.log('fetchMarketsProduct', error);
    }
  };

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

  useEffect(() => {
    const authorsId = sessionStorage.getItem('authorId');
    fetchAuthor(authorsId || '');

    const productId = sessionStorage.getItem('productId');
    fetchTradeHistory(productId || '');
    fetchMarketsProduct(productId || '');
  }, []);

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
      <div>
        <div className={styles.container}>
          <WorkSale
            sellingMethod="sell"
            marketsProduct={marketsProduct}
            authorObj={author}
            sellBtnClick={handleSellBtnClick}
            hasSellBtnLoading={hasSellBtnLoading}
          />
          <TransactionList tradeHistory={tradeHistory} />
        </div>
        <div className={styles.profile}>
          <AuthorAbout authorObj={author} />
        </div>
        {/* <div className={styles.shareBlock}>
          <ShareBlock />
        </div> */}
      </div>
      {hasPayModal && (
        <PayModal
          visible={hasPayModal}
          onCancel={handleCancel}
          marketsProduct={marketsProduct}
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
