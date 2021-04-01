import { useEffect, useState } from 'react';

import styles from './Collections.less';
import { laugh, avatarY } from '@/images';
import { initialOffering } from '@/services';

const Collections = () => {
  const curWidth = 1180;
  const [worksArr, setWorksArr] = useState<any[]>([]);

  const getImageInfo = (element: any) => {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.src = element.image;
      img.onload = async function () {
        resolve({ ...element, height: img.height, width: img.width });
      };
    });
  };

  const fetchInitialOffering = async () => {
    try {
      const result = await initialOffering();
      if (result?.data && result.data instanceof Array) {
        const tempArr: any[] = [];
        for (let i = 0; i < result.data.length; i++) {
          const elementI = result.data[i];

          const productsArr: any[] = [];
          for (let j = 0; j < elementI.products.length; j++) {
            const elementsJ = elementI.products[j];
            await getImageInfo(elementsJ).then((results) => {
              productsArr.push(results);
            });
          }
          tempArr.push({ ...elementI, products: productsArr });
        }
        setWorksArr(tempArr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInitialOffering();
  }, []);

  const dotsAll = 999;
  const dotsBlack = 40;

  const dotsArr: number[] = [];
  for (let index = 0; index < dotsAll; index++) {
    dotsArr.push(0);
  }

  return (
    <div className={styles.container}>
      {worksArr.map((item, index) => {
        return (
          <div key={index}>
            {item.products?.map((element: any, i: number) => {
              const imgWidthRate =
                element.width > curWidth ? 1 : element.width / curWidth;
              const imgRate = element.width / element.height;
              return (
                <div className={styles.content} key={i}>
                  <div className={styles.contentLeft}>
                    <div
                      className={styles.imageShadow}
                      style={{
                        width: imgWidthRate * curWidth,
                        height: (imgWidthRate * curWidth) / imgRate,
                      }}
                    />
                    <div
                      className={styles.imageContent}
                      style={{
                        width: imgWidthRate * curWidth,
                        height: (imgWidthRate * curWidth) / imgRate,
                      }}
                    >
                      <img
                        src={element.image}
                        alt="image"
                        className={styles.image}
                      />
                    </div>
                  </div>

                  <div className={styles.contentRight}>
                    <div className={styles.auth}>
                      <div className={styles.authShadow} />
                      <div className={styles.authContent}>
                        <img
                          src={avatarY}
                          alt="auth"
                          className={styles.authImg}
                        />
                        <div className={styles.authName}>创作者</div>
                      </div>
                    </div>
                    <div className={styles.des}>
                      <div className={styles.title}>{element.name}</div>
                      <div className={styles.codeAmount}>
                        代码 A29382 发行量100份
                      </div>
                      <div className={styles.auctionTitle}>拍卖底价</div>
                      <div className={styles.auctionContent}>
                        <div className={styles.auctionPrice}>¥20,000</div>
                        <div className={styles.auctionTips}>
                          单次加价幅度¥200
                        </div>
                      </div>
                      <div className={styles.dateContent}>
                        <div className={styles.auctionDate}>
                          <div className={styles.date}>
                            3.30星期五 15:00 - 4.10星期五 15:00
                          </div>
                        </div>
                        <div className={styles.auctionTime}>
                          <div className={styles.countdown}>01:20:00</div>
                        </div>
                      </div>
                      <div className={styles.bid}>已有40份出价</div>
                      <div className={styles.dots}>
                        {dotsArr.map((_, index) => (
                          <div
                            className={styles.dot}
                            key={index}
                            style={{
                              backgroundColor:
                                index + 1 > dotsBlack ? 'white' : 'black',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Collections;
