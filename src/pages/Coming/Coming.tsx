import styles from './Coming.less';
import { laugh, avatarY } from '@/images';

const Coming = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.content}>
        <div className={styles.date}>
          <div className={styles.dateTime}>3月30日 星期五 15:00</div>
          <div className={styles.dateCountdown}>限时3天</div>
        </div>
        <div className={styles.show}>
          <div>
            <img src={laugh} alt="laugh" />
          </div>
          <div className={styles.showAuthDes}>
            <div className={styles.auth}>
              <img src={avatarY} alt="auth" />
              <div>创作者</div>
            </div>
            <div className={styles.des}>
              <div className={styles.title}>
                La Rue Saint-Rustique à Montmartre
              </div>
              <div className={styles.codeAmount}>
                <div>代码 A29382</div>
                <div>发行量100份</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      即将发售
    </div>
  );
};

export default Coming;
