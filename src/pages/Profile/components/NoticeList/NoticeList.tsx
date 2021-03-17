import styles from './NoticeList.less';
import { laugh } from '@/images';

type WorksType = {
  name: string;
  code: string;
  des: string;
  date: string;
  amount: string;
  img: string;
};

const NoticeList = (props: { data: WorksType }) => {
  return (
    <div className={styles.noticeContent}>
      <div className={styles.contentLeft}>
        <img className={styles.leftImg} src={props.data?.img} alt="laugh" />
      </div>
      <div className={styles.contentRight}>
        <div className={styles.rightTitle}>{props.data?.name}</div>
        <div className={styles.rightCode}>代码 {props.data?.code}</div>
        <div className={styles.rightDes}>{props.data?.des}</div>
        <div className={styles.rightDate}>发行时间 {props.data?.date}</div>
        <div className={styles.rightAmount}>预发行量{props.data?.amount}</div>
      </div>
    </div>
  );
};

export default NoticeList;
