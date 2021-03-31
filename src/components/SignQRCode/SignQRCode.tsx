import QRCode from 'qrcode.react';
import { Modal } from 'antd';

import styles from './SignQRCode.less';
import { UMedia } from '@/images';

interface SignQRCodeType {
  order: API.OrderType;
  visible: boolean;
  onCancel: () => void;
}

const SignQRCode = (props: SignQRCodeType) => {
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
        <div className={styles.paymentTitle}>付款成功，请签字</div>
        <div>请用UMediaX扫码签字</div>
        <div>10分钟内不签字完成，订单自动取消，钱会原路返回</div>
        <div className={styles.qrcode}>
          <QRCode
            id="qrcode"
            value={`UMedia://webSign?orderId=${props.order?.orderId}`}
            renderAs={'svg'}
            size={200}
            level={'H'}
            imageSettings={{
              src: UMedia,
              height: 48,
              width: 48,
              excavate: true,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SignQRCode;
