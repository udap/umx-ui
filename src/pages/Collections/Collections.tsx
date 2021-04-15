import { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import NumberFormat from 'react-number-format';
import { history } from 'umi';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './Collections.less';
import { initialOffering } from '@/services';
import { IMG_WIDTH_RATE } from '@/utils/constants';
import useWindowSize from '@/utils/useWindowSize';

const Collections = () => {
  const [worksArr, setWorksArr] = useState<any[]>([]);
  const [productLoading, setProductLoading] = useState(false);
  const windowSize = useWindowSize();

  const getImageInfo = (element: any) => {
    return new Promise(function (resolve) {
      const img = new Image();
      img.src = element.image;
      img.onload = async function () {
        resolve({ ...element, height: img.height, width: img.width });
      };
    });
  };

  const fetchInitialOffering = async () => {
    setProductLoading(true);
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
    setProductLoading(false);
  };

  useEffect(() => {
    fetchInitialOffering();
  }, []);

  const handleItemClick = (elements: {
    authorId: string;
    productId: string;
    sellMethod: string;
  }) => {
    if (elements) {
      sessionStorage.setItem('authorId', elements.authorId);
      sessionStorage.setItem('productId', elements.productId);

      switch (elements.sellMethod) {
        case 'DIRECT':
          history.push({
            pathname: '/sell',
            query: {
              workId: elements.productId,
              authorId: elements.authorId,
            },
          });
          break;
        case 'OPEN_AUCTION':
          history.push({
            pathname: '/auction',
            query: {
              workId: elements.productId,
              authorId: elements.authorId,
            },
          });
          break;

        default:
          break;
      }
    }
  };

  return (
    <>
      {productLoading ? (
        <div>
          <LoadingOutlined style={{ fontSize: 40 }} />
        </div>
      ) : (
        <div className={styles.container}>
          {worksArr.map((item, index) => {
            return (
              <div key={index}>
                {item.products?.map((element: any, i: number) => {
                  const dotsAll = 999;

                  const dotsArr: number[] = [];
                  for (let index = 0; index < dotsAll; index++) {
                    dotsArr.push(0);
                  }
                  return (
                    <div
                      className={styles.content}
                      key={i}
                      onClick={() =>
                        handleItemClick({
                          authorId: item.user.id,
                          productId: element.id,
                          sellMethod: element.sellMethod,
                        })
                      }
                    >
                      <div className={styles.contentLeft}>
                        <div
                          className={styles.imageShadow}
                          style={{
                            width: IMG_WIDTH_RATE * windowSize.width,
                            height:
                              (element.height *
                                IMG_WIDTH_RATE *
                                windowSize.width) /
                              element.width,
                          }}
                        />
                        <div className={styles.image}>
                          <img
                            src={element.image}
                            alt="marketsImage"
                            width={IMG_WIDTH_RATE * windowSize.width}
                          />
                        </div>
                      </div>

                      <div className={styles.contentRight}>
                        <div className={styles.auth}>
                          <div className={styles.authShadow} />
                          <div className={styles.authContent}>
                            <Avatar
                              src={item.user?.headImage}
                              className={styles.authImg}
                            />
                            <div className={styles.authName}>
                              {item.user?.name}
                            </div>
                          </div>
                        </div>
                        <div className={styles.des}>
                          <div className={styles.title}>{element.name}</div>
                          <div className={styles.codeAmount}>
                            代码 {element.code} 发行量{element.copies}份
                          </div>
                          <div className={styles.auctionTitle}>拍卖底价</div>
                          <div className={styles.auctionContent}>
                            <div className={styles.auctionPrice}>
                              <NumberFormat
                                value={element.price}
                                thousandSeparator={true}
                                fixedDecimalScale={true}
                                displayType={'text'}
                                prefix={'¥'}
                              />
                            </div>
                            <div className={styles.auctionTips}>
                              单次加价幅度
                              <NumberFormat
                                value={element.increment}
                                thousandSeparator={true}
                                fixedDecimalScale={true}
                                displayType={'text'}
                                prefix={'¥'}
                              />
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
                          {element.sellMethod.includes('AUCTION') && (
                            <>
                              <div className={styles.bid}>
                                已有{element.bidderAmount}份出价
                              </div>
                              <div className={styles.dots}>
                                {dotsArr.map((_, index) => (
                                  <div
                                    className={styles.dot}
                                    key={index}
                                    style={{
                                      backgroundColor:
                                        index + 1 > element.bidderAmount
                                          ? 'white'
                                          : 'black',
                                    }}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Collections;
