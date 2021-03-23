import styles from './ShareBlock.less';
import { like, watch, share } from '@/images';

const ShareBlock = () => {
  return (
    <div className={styles.container}>
      <div className={styles.like}>
        <img src={like} alt="like" />
        <div>2190</div>
      </div>
      <div className={styles.watch}>
        <img src={watch} alt="watch" />
        <div>9999+</div>
      </div>
      <div className={styles.share}>
        <img src={share} alt="share" />
        <div>Share</div>
      </div>
    </div>
  );
};

export default ShareBlock;
