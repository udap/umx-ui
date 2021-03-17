import { Button } from 'antd';

import styles from './LoadMore.less';
import { loadMore } from '@/images';

const LoadMore = (props: { onClick: () => void }) => {
  return (
    <div className={styles.container}>
      <Button
        type="link"
        onClick={props.onClick}
        icon={<img src={loadMore} />}
      />
    </div>
  );
};

export default LoadMore;
