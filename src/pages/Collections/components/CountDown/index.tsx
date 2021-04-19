import { FC, useEffect } from 'react';
import { useCountDown } from 'ahooks';
import styles from './index.less';

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
            {days}:{hours}:{minutes}:{seconds}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CountDown;
