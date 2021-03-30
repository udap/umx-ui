import { useEffect, useState } from 'react';
import { Modal, Checkbox, message, Select } from 'antd';
import NumberFormat from 'react-number-format';
import { useInterval } from 'ahooks';

import styles from './PayModal.less';
import { ThirdPayment, SignQRCode } from '@/components';
import {
  getPayOrder,
  getCheckOrder,
  getProductNumber,
  getToBuy,
} from '@/services';

type PayModalType = {
  visible: boolean;
  handleCancel: () => void;
  marketsProduct: API.ProductObjType;
};

interface ProductNumberType {
  marketId: string;
  number: string;
  status: string;
}

type ProductListType = {
  label: string;
  value: string;
};

const PayModal = (props: PayModalType) => {
  const defaultPay = 'WeChatPay';
  const [payment, setPayment] = useState<'WeChatPay' | 'AliPay'>(defaultPay);
  const [hasPayment, setHasPayment] = useState(false);
  const [hasSign, setHasSign] = useState(false);
  const [hasAgree, setHasAgree] = useState(false);
  const [order, setOrder] = useState<API.OrderType>({
    id: '',
    info: '',
    orderId: '',
  });

  const [buyMessage, setBuyMessage] = useState('');
  const [productNumberVisible, setProductNumberVisible] = useState(false);
  const [productList, setProductList] = useState<ProductListType[]>([]);
  const [marketId, setMarketId] = useState('');

  const [interval, setInterval] = useState<number | null>(null);

  const fetchProductNumber = async (element: string) => {
    setProductNumberVisible(true);
    try {
      const result = await getProductNumber(element);
      if (result?.data) {
        const list: ProductListType[] = [];
        result?.data.forEach((item: ProductNumberType) => {
          if (item.status === 'ONRACK') {
            list.push({ label: item.number, value: item.marketId });
          }
        });
        setProductList(list);
      }
    } catch (error) {}
    setProductNumberVisible(false);
  };

  const handleCheckOrder = async () => {
    try {
      const result = await getCheckOrder(order.orderId);
      // 购买流程：待支付 => 已支付 => 已签字
      if (result?.data) {
        switch (result?.data) {
          // 待支付
          case 'pendingPayment':
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

  // const handleWeChatPay = () => {
  //   if (!hasAgree) {
  //     message.warn('请先阅读《用户购买协议说明》');
  //     return;
  //   }
  //   setPayment('WeChatPay');
  //   setHasPayment(true);
  // };

  const fetchToBuy = async () => {
    const loginObj = sessionStorage.getItem('login');
    let login;
    if (loginObj) {
      login = JSON.parse(loginObj);
    }

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

  const handleAliPay = async () => {
    if (!hasAgree) {
      message.warn('请先阅读《用户购买协议说明》');
      return;
    }

    if (!marketId) {
      message.warn('请先选择购买作品的序号');
      return;
    }

    setPayment('AliPay');

    const orderId = await fetchToBuy();

    const data = {
      buyMessage,
      orderId,
    };

    try {
      const result = await getPayOrder(data);
      if (result?.data && result.data instanceof Object) {
        setHasPayment(true);
        setOrder(result.data);

        setInterval(1000);
      }
    } catch (error) {}
  };

  const onCancel = () => {
    setHasPayment(false);
    setHasSign(false);

    setInterval(null);

    setMarketId('');

    props.handleCancel();
  };

  const onSelectFocus = () => {
    fetchProductNumber(props.marketsProduct?.id);
  };

  const handleSelectChange = (element: string) => {
    setMarketId(element);
  };

  return (
    <Modal
      title=""
      visible={props.visible}
      onCancel={onCancel}
      footer={null}
      width={948}
      destroyOnClose
    >
      <div className={styles.container}>
        <div className={styles.sellPay}>
          <div className={styles.sellPayTitle}>购买付款</div>
          <div className={styles.sellPayTitle}>
            支付金额{' '}
            <NumberFormat
              value={props.marketsProduct?.price}
              thousandSeparator={true}
              fixedDecimalScale={true}
              displayType={'text'}
              prefix={'¥'}
            />
          </div>
          <Checkbox
            onChange={(e) => {
              setHasAgree(e.target.checked);
            }}
          >
            付款前请务必阅读《用户购买协议说明》
          </Checkbox>
        </div>
        <div className={styles.sellSignature}>
          <div className={styles.signatureTop}>购买作品的序号</div>
          <Select
            className={styles.select}
            options={productList}
            onFocus={onSelectFocus}
            loading={productNumberVisible}
            onChange={handleSelectChange}
            value={marketId}
          />
          <div className={styles.signatureTop}>购买前可留言给签发人</div>
          <textarea
            className={styles.signatureInput}
            maxLength={150}
            value={buyMessage}
            onChange={(e) => setBuyMessage(e.target.value)}
          />
          <div className={styles.signatureTips}>
            确认金额和认同用户购买协议，即可选择付款方式付款，付款后需等待出售人签字，你才能收到作品
          </div>
        </div>
        <div className={styles.sellBtn}>
          {/* <button className={styles.btn} onClick={handleWeChatPay}>
            微信支付
          </button> */}
          <button className={styles.btn} onClick={handleAliPay}>
            支付宝支付
          </button>
        </div>
        {hasPayment && <ThirdPayment payment={payment} order={order} />}
        {hasSign && <SignQRCode order={order} />}
      </div>
    </Modal>
  );
};

export default PayModal;
