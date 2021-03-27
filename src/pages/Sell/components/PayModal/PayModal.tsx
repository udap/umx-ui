import { Modal, Checkbox, message } from 'antd';
import NumberFormat from 'react-number-format';

import styles from './PayModal.less';
import { ThirdPayment } from '@/components';
import { useState } from 'react';

type PayModalType = {
  visible: boolean;
  handleCancel: () => void;
  marketsProduct: API.ProductObjType;
};

const PayModal = (props: PayModalType) => {
  const defaultPay = 'WeChatPay';
  const [payment, setPayment] = useState<'WeChatPay' | 'AliPay'>(defaultPay);
  const [hasPayment, setHasPayment] = useState(false);
  const [hasAgree, setHasAgree] = useState(false);

  const handleWeChatPay = () => {
    if (!hasAgree) {
      message.warn('请先阅读《用户购买协议说明》');
      return;
    }
    setPayment('WeChatPay');
    setHasPayment(true);
  };

  const handleAliPay = () => {
    if (!hasAgree) {
      message.warn('请先阅读《用户购买协议说明》');
      return;
    }
    setPayment('AliPay');
    setHasPayment(true);
  };

  const onCancel = () => {
    setHasPayment(false);
    props.handleCancel();
  };

  console.log(hasAgree);

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
          <div className={styles.signatureTop}>购买前可留言给签发人</div>
          <textarea className={styles.signatureInput} maxLength={150} />
          <div className={styles.signatureTips}>
            确认金额和认同用户购买协议，即可选择付款方式付款，付款后需等待出售人签字，你才能收到作品
          </div>
        </div>
        <div className={styles.sellBtn}>
          <button className={styles.btn} onClick={handleWeChatPay}>
            微信支付
          </button>
          <button className={styles.btn} onClick={handleAliPay}>
            支付宝支付
          </button>
        </div>
        {hasPayment && <ThirdPayment payment={payment} />}
      </div>
    </Modal>
  );
};

export default PayModal;
