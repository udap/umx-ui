import React, { useEffect, useState } from 'react';

import styles from './Sell.less';
import {
  getAuthor,
  getTradeHistory,
  getMarketsProduct,
  getToBuy,
} from '@/services';
import { PayModal } from './components';

import {
  WorkSale,
  AuthorAbout,
  TransactionList,
  // ShareBlock,
} from '@/components';

export type PaymentType = {
  payment: 'WeChatPay' | 'AliPay';
};

const Sell: React.FC = (props) => {
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
  const [author, setAuthor] = useState<API.AuthorObjType>(defaultAuthor);
  const [tradeHistory, setTradeHistory] = useState<any[]>([]);
  const [marketsProduct, setMarketsProduct] = useState(defaultProduct);
  const [orderId, setOrderId] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const authorsId = sessionStorage.getItem('authorsId');
    fetchAuthor(authorsId || '');

    const productId = sessionStorage.getItem('productId');
    fetchTradeHistory(productId || '');
    fetchMarketsProduct(productId || '');
  }, []);

  return (
    <>
      <div>
        <div className={styles.container}>
          <WorkSale
            sellingMethod="sell"
            marketsProduct={marketsProduct}
            authorObj={author}
            sellBtnClick={handleSellBtnClick}
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
      <PayModal
        visible={isModalVisible}
        handleCancel={handleCancel}
        marketsProduct={marketsProduct}
      />
    </>
  );
};

export default Sell;
