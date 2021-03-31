import styles from './About.less';
import { aboutHeader } from '@/images';

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={aboutHeader} className={styles.headerImg}></img>
      </div>
      <div className={styles.content}>
        <div className={styles.aboutMe}>
          <div className={styles.title}>关于我们</div>
          <div className={styles.txt}>
            为当下的加密艺术展示更丰富的艺术表达形式
            <br />
            为艺术家们提供更好的收益
            <br />
            为平民艺术家提供机遇
            <br />
            为艺术创作开拓出更多的想象空间
            <br />
            为消费者提供3D数字画廊、数字布展、沉浸式欣赏艺术品
            <br />
            这种新颖的、革命式的艺术呈现也将给大众带来全新的视觉享受
            <br />
          </div>
        </div>
        <div className={styles.what}>
          <div className={styles.whatContent}>
            <div className={styles.whatTitle}>umx.art如何运作？</div>
            <div className={styles.whatTxt}>
              我们与<strong>顶级艺术家和品牌</strong>
              合作创建限量版、高质量的NFT收藏，这些收藏在我们的平台上
              <strong>独家提供。</strong>
              <small>
                <strong>
                  联系我们{' '}
                  <a href="mailto:umx@udap.io" className={styles.contact}>
                    umx@udap.io
                  </a>{' '}
                  <a href="mailto:umx@udap.io" className={styles.contact}>
                    info@udap.io
                  </a>{' '}
                </strong>
              </small>
            </div>
            <div className={styles.whatTxt}>
              我们<strong>每周大约有一次新的投放</strong>
              ，某个收藏的首发投放结束或者售罄后，您只能在
              <strong>二级市场</strong>上从该收藏中获取NFT。
              <br />
            </div>
            <div className={styles.whatTxt}>
              平台采用基于<strong>人名币交易</strong>，并且可以
              <strong>提取到外部钱包中或将NFT从外部钱包中存入您的收藏中</strong>
              。
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
