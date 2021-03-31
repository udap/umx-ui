import NumberFormat from 'react-number-format';
import QRCode from 'qrcode.react';
import { Modal } from 'antd';

import styles from './ThirdPayment.less';
import { PAYMENT_METHOD } from '@/utils/constants';

type ThirdPaymentType = {
  payment: 'WeChatPay' | 'AliPay';
  order: API.OrderType;
  visible: boolean;
  onCancel: () => void;
};

const ThirdPayment = (props: ThirdPaymentType) => {
  return (
    <Modal
      title=""
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
      width={948}
      destroyOnClose
      centered
    >
      <div className={styles.container}>
        <div className={styles.paymentTitle}>
          {PAYMENT_METHOD[props.payment]}
        </div>
        <div className={styles.payment}>
          支付金额{' '}
          <NumberFormat
            value={props.order?.charge}
            thousandSeparator={true}
            fixedDecimalScale={true}
            displayType={'text'}
            prefix={'¥'}
          />
        </div>
        <div className={styles.qrcode}>
          <QRCode
            id="qrcode"
            value={props.order?.info}
            renderAs={'svg'}
            size={240}
            level={'H'}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ThirdPayment;
