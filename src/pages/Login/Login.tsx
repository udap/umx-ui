import { ReactComponent as Qrcode } from '@/images/qrcode.svg';
import styles from './Login.less';

const Login = () => {
  return (
    <div className={styles.container}>
      <div>请用UMedia App扫码登录</div>
      <Qrcode width={280} height={280} />
    </div>
  );
};

export default Login;
