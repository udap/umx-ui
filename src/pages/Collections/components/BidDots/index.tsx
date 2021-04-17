import { FC } from 'react';

import styles from './index.less';

interface BidDotsPros {
  bidderAmount: number;
}

const BidDots: FC<BidDotsPros> = (props) => {
  const dotsAll = 999;

  const dotsArr: number[] = [];
  for (let index = 0; index < dotsAll; index++) {
    dotsArr.push(0);
  }

  return (
    <>
      <div className={styles.bid}>已有{props.bidderAmount}份出价</div>
      <div className={styles.dots}>
        {dotsArr.map((_, index) => (
          <div
            className={styles.dot}
            key={index}
            style={{
              backgroundColor:
                index + 1 > props.bidderAmount ? 'white' : 'black',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BidDots;
