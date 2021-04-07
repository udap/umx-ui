import { useEffect, useState } from 'react';
import { useCountDown } from 'ahooks';
import dayjs from 'dayjs';

import styles from './CountDown.less';

interface CountDown {
  markets: API.MarketsType;
}

const CountDown = (props: CountDown) => {
  const [countdown, setTargetDate, formattedRes] = useCountDown();
  const { days, hours, minutes, seconds } = formattedRes;
  const [isPublishDate, setIsPublishDate] = useState(false);

  useEffect(() => {
    setIsPublishDate(dayjs(new Date()).valueOf() < props.markets.publishDate);
    setTargetDate(
      dayjs(
        isPublishDate ? props.markets.publishDate : props.markets.saleEndTime,
      ).valueOf(),
    );
  }, [props.markets.saleEndTime, props.markets.publishDate]);

  return (
    <div>
      <div className={styles.countdown}>
        <div className={styles.tips}>{isPublishDate ? '距开始' : '距结束'}</div>
        <div className={styles.countdownTime}>
          {days}:{hours}:{minutes}:{seconds}
        </div>
      </div>
    </div>
  );
};

export default CountDown;
