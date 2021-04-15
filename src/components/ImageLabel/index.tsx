import { FC } from 'react';
import styles from './index.less';

interface ImageLabelProps {
  image: string;
  label: string;
}

const ImageLabel: FC<ImageLabelProps> = (props) => {
  return (
    <div className={styles.imageLabel}>
      <img src={props.image} />
      <div className={styles.label}>{props.label}</div>
    </div>
  );
};

export default ImageLabel;
