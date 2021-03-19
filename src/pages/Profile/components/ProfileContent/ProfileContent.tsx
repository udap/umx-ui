import { Button } from 'antd';

import styles from './ProfileContent.less';
import { profileImg } from '@/images';
import { ShareButton } from '@/components';

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
        <ShareButton />
      </div>
      <div className={styles.profileRight}>
        <img src={profileImg} alt="profileImg" />
      </div>
    </div>
  );
};

export default ProfileContent;
