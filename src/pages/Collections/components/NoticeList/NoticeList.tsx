import { Avatar } from 'antd';
import dayjs from 'dayjs';

import styles from './NoticeList.less';

const NoticeList = (props: { data: API.NoticeListType[] }) => {
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
                            {itemWork.summary}
                          </div>
                          <div className={styles.contentDate}>
                            发行时间{' '}
                            {dayjs(itemWork.publishDate).format(
                              'MM月DD日 HH:mm',
                            )}
                          </div>
                          <div className={styles.contentAmount}>
                            预发行量{itemWork.copies}
                          </div>
                        </div>
                      </div>
                      <div className={styles.listRight}>
                        <img
                          className={styles.rightImg}
                          src={itemWork.image}
                          alt="img"
                        />
                      </div>
                    </div>
                  );
                })}
              {item.auth && (
                <div className={styles.noticeAuth}>
                  {item.auth?.headImage ? (
                    <Avatar src={item.auth?.headImage} size={100} />
                  ) : (
                    <Avatar size={100}>{item.auth?.address?.substr(-2)}</Avatar>
                  )}
                  <div className={styles.authName}>{item.auth?.name}</div>
                  <div className={styles.authKey}>{item.auth?.address}</div>
                  {/* <div className={styles.authDes}>{item.auth?.desTips}</div> */}
                  <div className={styles.authDes}>{item.auth?.myintro}</div>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default NoticeList;
