import { Avatar } from 'antd';

import styles from './NoticeList.less';

type WorksType = {
  name: string;
  code: string;
  des: string;
  date: string;
  amount: string;
  img: string;
};

type NoticeDataType = {
  auth: {
    avatar: string;
    name: string;
    code: string;
    des: string;
  };
  works: WorksType[];
};

const NoticeList = (props: { data: NoticeDataType[] }) => {
  return (
    <>
      {props.data &&
        props.data.map((item, index) => {
          return (
            <div className={styles.noticeList} key={index}>
              {item.works &&
                item.works.map((itemWork, i) => {
                  return (
                    <div className={styles.noticeItem} key={i}>
                      <div className={styles.listLeft}>
                        <div className={styles.leftContent}>
                          <div className={styles.contentTitle}>
                            {itemWork.name}
                          </div>
                          <div>代码 {itemWork.code}</div>
                          <div className={styles.contentDes}>
                            {itemWork.des}
                          </div>
                          <div className={styles.contentDate}>
                            发行时间 {itemWork.date}
                          </div>
                          <div className={styles.contentAmount}>
                            预发行量{itemWork.amount}
                          </div>
                        </div>
                      </div>
                      <div className={styles.listRight}>
                        <img
                          className={styles.rightImg}
                          src={itemWork.img}
                          alt="img"
                        />
                      </div>
                    </div>
                  );
                })}
              {item.auth && (
                <div className={styles.noticeAuth}>
                  <Avatar src={item.auth?.avatar} size={100} />
                  <div className={styles.authName}>{item.auth?.name}</div>
                  <div className={styles.authKey}>{item.auth?.code}</div>
                  <div className={styles.authDes}>{item.auth?.des}</div>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default NoticeList;
