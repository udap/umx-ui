import { FC, useEffect } from 'react';
import { useCountDown } from 'ahooks';

import styles from './index.less';
import { padLeft } from '@/utils/common';

interface CountDownProps {
  time: number;
}

const CountDown: FC<CountDownProps> = (props) => {
  const [countdown, setTargetDate, formattedRes] = useCountDown();
  const { days, hours, minutes, seconds } = formattedRes;

  useEffect(() => {
    setTargetDate(props.time);
  }, []);

  return (
    <>
      {days || hours || minutes || seconds ? (
        <div className={styles.auctionTime}>
          <div className={styles.countdown}>
            {padLeft(days, 2)}:{padLeft(hours, 2)}:{padLeft(minutes, 2)}:
            {padLeft(seconds, 2)}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CountDown;
