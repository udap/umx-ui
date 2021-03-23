import styles from './Auction.less';
import {
  WorkSale,
  AuthorAbout,
  TransactionList,
  ShareBlock,
} from '@/components';

const Auction = () => {
  return (
    <>
      <div className={styles.container}>
        <WorkSale sellingMethod="auction" />
        <TransactionList />
      </div>
      <div className={styles.profile}>
        <AuthorAbout />
      </div>
      <div className={styles.shareBlock}>
        <ShareBlock />
      </div>
    </>
  );
};

export default Auction;
