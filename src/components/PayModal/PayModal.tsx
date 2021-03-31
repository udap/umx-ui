import { useState } from 'react';
import { Modal, Checkbox, message, Select } from 'antd';
import NumberFormat from 'react-number-format';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './PayModal.less';
import { getProductNumber } from '@/services';
import { Loading } from '@/components';

type PayModalType = {
  visible: boolean;
  hasPayOrder: boolean;
  onCancel: () => void;
  marketsProduct: API.ProductObjType;
  handlePayBtn: (element: {
    marketId: string;
    buyMessage: string;
    method: 'WeChatPay' | 'AliPay';
  }) => void;
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
  const [hasAgree, setHasAgree] = useState(false);

  const [buyMessage, setBuyMessage] = useState('');
  const [productNumberVisible, setProductNumberVisible] = useState(false);
  const [productList, setProductList] = useState<ProductListType[]>([]);
  const [marketId, setMarketId] = useState('');

  const handlePayBtn = async (method: 'WeChatPay' | 'AliPay') => {
    if (!hasAgree) {
      message.warn('请先阅读《用户购买协议说明》');
      return;
    }

    if (!marketId) {
      message.warn('请先选择购买作品的序号');
      return;
    }

    props.handlePayBtn({ marketId, buyMessage, method });
  };

  const onCancel = () => {
    setMarketId('');
    setBuyMessage('');

    props.onCancel();
  };

  const onSelectFocus = async () => {
    setProductNumberVisible(true);
    try {
      const result = await getProductNumber(props.marketsProduct?.id);
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

  const handleSelectChange = (element: string) => {
    setMarketId(element);
  };

  return (
    <>
      <Modal
        title=""
        visible={props.visible}
        onCancel={onCancel}
        footer={null}
        width={948}
        destroyOnClose
        centered
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
              notFoundContent={
                productNumberVisible && <Loading title="加载中..." />
              }
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
            {/* <button
              className={styles.btn}
              onClick={() => handlePayBtn('WeChatPay')}
            >
              微信支付 {props.hasPayOrder && <LoadingOutlined />}
            </button> */}
            <button
              className={styles.btn}
              onClick={() => handlePayBtn('AliPay')}
            >
              支付宝支付 {props.hasPayOrder && <LoadingOutlined />}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PayModal;
