import { LoadingOutlined } from '@ant-design/icons';

import styles from './Loading.less';

interface LoadingType {
  title: string;
}

const Loading = (props: LoadingType) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoadingOutlined />
        <div className={styles.title}>{props.title}</div>
      </div>
    </div>
  );
};

export default Loading;
