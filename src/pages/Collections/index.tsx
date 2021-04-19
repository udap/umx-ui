import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { history } from 'umi';
import { LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Avatar } from 'antd';

import styles from './index.less';
import { getInitialOffering } from '@/services';
import { WorkSale, ImageLabel } from '@/components';
import { TikTok, WeChat, weibo } from '@/images';
import { BidDots, CountDown } from './components';

const Collections = () => {
  const [worksArr, setWorksArr] = useState<any[]>([]);
  const [productLoading, setProductLoading] = useState(false);

  const fetchData = async () => {
    setProductLoading(true);
    try {
      const result = await getInitialOffering();
      if (result?.data) {
        setWorksArr(result.data);
        console.log(result.data);
      }
    } catch (error) {
      console.log('fetchData', error);
    }
    setProductLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = (elements: {
    authorId: string;
    workId: string;
    sellMethod: string;
  }) => {
    console.log(elements);
    sessionStorage.setItem('authorId', elements.authorId);
    sessionStorage.setItem('workId', elements.workId);
    switch (elements.sellMethod) {
      case 'DIRECT':
        history.push({
          pathname: '/sell',
          query: {
            workId: elements.workId,
            authorId: elements.authorId,
          },
        });
        break;
      case 'OPEN_AUCTION':
        history.push({
          pathname: '/auction',
          query: {
            workId: elements.workId,
            authorId: elements.authorId,
          },
        });
        break;

      default:
        break;
    }
  };

  return (
    <>
      {productLoading && (
        <div style={{ textAlign: 'center' }}>
          <LoadingOutlined style={{ fontSize: 40 }} />
        </div>
      )}
      <div className={styles.container}>
        {worksArr.map((item, index) => {
          return (
            <div key={index}>
              {item.products.map((workItem: any, workIndex: any) => {
                const isAuction = workItem.sellMethod.includes('AUCTION');
                return (
                  <div
                    className={styles.workContainer}
                    key={workIndex}
                    onClick={() =>
                      handleItemClick({
                        authorId: item.user.id,
                        workId: workItem.id,
                        sellMethod: workItem.sellMethod,
                      })
                    }
                  >
                    <div className={styles.contentLeft}>
                      <WorkSale>
                        <img src={workItem.image} alt="workImg" />
                      </WorkSale>
                    </div>

                    <div className={styles.contentRight}>
                      <div className={styles.rightWork}>
                        <div className={styles.thirdShare}>
                          <ImageLabel image={TikTok} label="直播间" />
                          <ImageLabel
                            image={weibo}
                            label="#La Rue Saint-Rust à Montmartre#"
                          />
                          <ImageLabel image={WeChat} label="微信主题讨论群" />
                        </div>
                        <div className={styles.info}>
                          <div className={styles.workName}>{workItem.name}</div>
                          <div className={styles.des}>
                            <div className={styles.codeCopies}>
                              代码 {workItem.code} 上限{workItem.copies}份
                            </div>
                          </div>
                          <div className={styles.priceBox}>
                            <div className={styles.saleBox}>
                              <div className={styles.saleTitle}>
                                {isAuction ? '拍卖低价' : '售价'}
                              </div>
                              <div className={styles.salePrice}>
                                <NumberFormat
                                  value={workItem.price}
                                  thousandSeparator={true}
                                  fixedDecimalScale={true}
                                  displayType={'text'}
                                  prefix={'¥'}
                                />
                              </div>
                            </div>
                            {isAuction && (
                              <div className={styles.makeupBox}>
                                <div className={styles.makeup}>
                                  单次加价幅度
                                  <NumberFormat
                                    value={workItem.increment}
                                    thousandSeparator={true}
                                    fixedDecimalScale={true}
                                    displayType={'text'}
                                    prefix={'¥'}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className={styles.dateContent}>
                            <div className={styles.auctionDate}>
                              <div className={styles.date}>
                                {`${dayjs(workItem.saleStartTime).format(
                                  'MM.DD HH:mm',
                                )} -
                                ${dayjs(workItem.saleEndTime).format(
                                  'MM.DD HH:mm',
                                )}`}
                              </div>
                            </div>
                            <CountDown time={workItem.saleEndTime} />
                          </div>
                          {isAuction && (
                            <BidDots bidderAmount={workItem.bidderAmount} />
                          )}
                        </div>
                      </div>
                      <div className={styles.rightAvatar}>
                        <div className={styles.worker}>
                          <WorkSale>
                            <Avatar src={item.user?.headImage} size={48} />
                          </WorkSale>
                          <div className={styles.authorName}>
                            {item.user?.name}
                          </div>
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
    </>
  );
};

export default Collections;
