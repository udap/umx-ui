import { Avatar } from 'antd';

import styles from './AuthorAbout.less';
import { avatarY } from '@/images';
import { ShareButton } from '@/components';

const AuthorAbout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.leftAvatar}>
          <Avatar src={avatarY} size={82} />
        </div>
        <div className={styles.leftRight}>
          <div className={styles.name}>岳敏君</div>
          <div className={styles.code}>
            0x 3f13 3816 f817 8b93 ac99 1a2c 3eed db8f 947a f0cb
          </div>
        </div>
      </div>
      <div className={styles.containerRight}>
        <div className={styles.rightDest}>
          <div>Independent artist</div>
          <div>
            "If you think that China is closely related to the current situation
            and future of the world, then this artist is the one who depicts
            China," Time magazine said of Yue Minjun.
          </div>
        </div>

        <ShareButton />
      </div>
    </div>
  );
};

export default AuthorAbout;
