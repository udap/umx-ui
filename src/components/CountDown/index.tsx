import { FC, useEffect, useState } from 'react';
import { useCountDown } from 'ahooks';
import dayjs from 'dayjs';

import styles from './index.less';
import { padLeft } from '@/utils/common';

interface CountDownType {
  saleStartTime: number;
  saleEndTime: number;
}

const CountDown: FC<CountDownType> = (props) => {
  console.log(props);
  const [countdown, setTargetDate, formattedRes] = useCountDown();
  const { days, hours, minutes, seconds } = formattedRes;
  // 已开始？
  const [hasStart, setHasStart] = useState(false);
  // 已结束？
  const [hasEnd, setHasEnd] = useState(false);

  useEffect(() => {
    setHasStart(
      dayjs(new Date()).valueOf() > dayjs(props.saleStartTime).valueOf(),
    );
    setHasEnd(dayjs(new Date()).valueOf() > dayjs(props.saleEndTime).valueOf());
    setTargetDate(
      dayjs(
        hasStart
          ? dayjs(props.saleEndTime).valueOf()
          : dayjs(props.saleStartTime).valueOf(),
      ).valueOf(),
    );
  }, [props.saleEndTime, props.saleStartTime]);

  return (
    <div className={styles.countdown}>
      {hasEnd ? (
        <div className={styles.tips}>已结束</div>
      ) : (
        <>
          <div className={styles.tips}>{hasStart ? '距结束' : '距开始'}</div>
          <div className={styles.time}>
            {padLeft(days, 2)}:{padLeft(hours, 2)}:{padLeft(minutes, 2)}:
            {padLeft(seconds, 2)}
          </div>
        </>
      )}
    </div>
  );
};

export default CountDown;
