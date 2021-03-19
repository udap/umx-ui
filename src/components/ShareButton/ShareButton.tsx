import { FacebookFilled, TwitterOutlined } from '@ant-design/icons';

import styles from './ShareButton.less';

const ShareButton = () => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.facebookBtn}
        style={{ backgroundColor: '#2e75f2' }}
      >
        <FacebookFilled />
        <div className={styles.btnTitle}>Share on Facebook</div>
      </button>
      <button
        type="button"
        className={styles.facebookBtn}
        style={{ backgroundColor: '#4ba0eb', marginLeft: '16px' }}
      >
        <TwitterOutlined />
        <div className={styles.btnTitle}>Share on Twitter</div>
      </button>
    </div>
  );
};

export default ShareButton;
