import { Button } from 'antd';
import { FacebookFilled, TwitterOutlined } from '@ant-design/icons';

import styles from './ProfileContent.less';
import { profileImg } from '@/images';

const ProfileContent = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.profileLeft}>
        <div className={styles.leftName}>岳敏君</div>
        <div className={styles.leftCode}>
          0x 3f13 3816 f817 8b93 ac99 1a2c 3eed db8f 947a f0cb
        </div>
        <div className={styles.leftDes}>
          Independent artist "If you think that China is closely related to the
          current situation and future of the world, then this artist is the one
          who depicts China," Time magazine said of Yue Minjun.
        </div>
        <div className={styles.leftBtn}>
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
      </div>
      <div className={styles.profileRight}>
        <img src={profileImg} alt="profileImg" />
      </div>
    </div>
  );
};

export default ProfileContent;
