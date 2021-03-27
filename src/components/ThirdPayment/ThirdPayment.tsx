import NumberFormat from 'react-number-format';
import QRCode from 'qrcode.react';

import styles from './ThirdPayment.less';
import { PAYMENT_METHOD } from '@/utils/constants';
import { UMedia } from '@/images';

type ThirdPaymentType = {
  payment: 'WeChatPay' | 'AliPay';
};

const ThirdPayment = (props: ThirdPaymentType) => {
  return (
    <div className={styles.container}>
      <div className={styles.paymentTitle}>{PAYMENT_METHOD[props.payment]}</div>
      <div className={styles.payment}>
        支付金额{' '}
        <NumberFormat
          value={20_000}
          thousandSeparator={true}
          fixedDecimalScale={true}
          displayType={'text'}
          prefix={'¥'}
        />
      </div>
      <div className={styles.qrcode}>
        <QRCode
          id="qrcode"
          value={`UMedia://login?key=${'pay'}`}
          renderAs={'svg'}
          size={240}
          level={'H'}
          imageSettings={{
            src: UMedia,
            height: 56,
            width: 56,
            excavate: true,
          }}
        />
      </div>
    </div>
  );
};

export default ThirdPayment;
