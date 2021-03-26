import styles from './Sell.less';

import {
  WorkSale,
  AuthorAbout,
  TransactionList,
  ShareBlock,
} from '@/components';

const Sell = () => {
  return (
    <div>
      <div className={styles.container}>
        <WorkSale sellingMethod="sell" />
        <TransactionList />
      </div>
      <div className={styles.profile}>
        <AuthorAbout />
      </div>
      <div className={styles.shareBlock}>
        <ShareBlock />
      </div>
    </div>
  );
};

export default Sell;
