import { FC } from 'react';

import styles from './index.less';

interface WorkSaleProps {}

const WorkSale: FC<WorkSaleProps> = (props) => {
  return (
    <div className={styles.worksImgBox}>
      <div className={styles.worksImg}>{props.children}</div>
    </div>
  );
};

export default WorkSale;
