import { FC } from 'react';
import styles from './index.less';

interface ImageLabelProps {
  image: string;
  label: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

const ImageLabel: FC<ImageLabelProps> = (props) => {
  return (
    <div className={styles.imageLabel} onClick={props.onClick}>
      <img
        src={props.image}
        style={{ width: props.height, height: props.width }}
      />
      <div className={styles.label}>{props.label}</div>
    </div>
  );
};

export default ImageLabel;
