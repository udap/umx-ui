import styles from './Auction.less';
import { WorkSale, AuthorAbout, TransactionList } from '@/components';

const Auction = () => {
  return (
    <>
      <div className={styles.container}>
        <WorkSale />
        <TransactionList />
      </div>
      <div className={styles.profile}>
        <AuthorAbout />
      </div>
    </>
  );
};

export default Auction;
