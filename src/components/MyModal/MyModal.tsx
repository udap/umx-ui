import { Modal } from 'antd';

import styles from './MyModal.less';

interface MyModalType {
  visible: boolean;
  onCancel: () => void;
  onBtnClick: () => void;
}

const MyModal = (props: MyModalType) => {
  return (
    <Modal
      title=""
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
      width={360}
      destroyOnClose
      centered
    >
      <div className={styles.container}>
        <div className={styles.title}>退出登录</div>
        <div className={styles.message}>你确定要退出本次登录吗？</div>
        <button
          type="button"
          className={styles.button}
          onClick={props.onBtnClick}
        >
          <div className={styles.btnTitle}>立即退出</div>
        </button>
      </div>
    </Modal>
  );
};

export default MyModal;
