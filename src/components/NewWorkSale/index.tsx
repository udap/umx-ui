import { FC } from 'react';

import styles from './index.less';

interface WorkSaleProps {
  image: string;
}

const WorkSale: FC<WorkSaleProps> = (props) => {
  return (
    <div className={styles.worksImgBox}>
      <div className={styles.worksImg}>
        <img src={props.image} alt="workImg" />
      </div>
    </div>
  );
};

export default WorkSale;
