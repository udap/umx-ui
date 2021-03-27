import { Avatar } from 'antd';

import styles from './AuthorAbout.less';
import { ShareButton } from '@/components';

const AuthorAbout = (props: { authorObj: API.AuthorObjType }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.leftAvatar}>
          {props.authorObj?.headImage ? (
            <Avatar src={props.authorObj?.headImage} size={82} />
          ) : (
            <Avatar size={82}>{props.authorObj?.address?.substr(-2)}</Avatar>
          )}
        </div>
        <div className={styles.leftRight}>
          <div className={styles.name}>{props.authorObj?.name}</div>
          <div className={styles.code}>{props.authorObj?.address}</div>
        </div>
      </div>
      <div className={styles.containerRight}>
        <div className={styles.rightDest}>
          <div>{props.authorObj?.myintro}</div>
        </div>

        <ShareButton />
      </div>
    </div>
  );
};

export default AuthorAbout;
