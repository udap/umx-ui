import { useState, useEffect } from 'react';
import { Carousel, List, Avatar } from 'antd';
import dayjs from 'dayjs';
import { history } from 'umi';

import styles from './Collections.less';
import { avatarY, laugh } from '@/images';
import { NoticeList } from './components';
import { LoadMore, FirstWork, FilterSelect } from '@/components';
import { getCarousels, getMarkets, initialOffering } from '@/services';
import { ZH_DAYS } from '@/utils/constants';

const workObj = {
  img: laugh,
  avatarImg: avatarY,
  avatarName: '岳敏君',
  title: '快乐图',
  des:
    '那时已经有一些艺术家开始做失落感觉的作品了,他们给我一些他们给我一些他们给我一些',
  code: 'A29387',
  circulation: 12,
  date: '3月20日',
  sold: 190,
  lowAuctionPrice: 20_000,
  countdown: '20:00',
};

const filterList = ['发行时间', '售价', '倒计时', '直卖', '拍卖'];

type CarouselArrType = {
  createdDate: number;
  displayUrl: string;
  effective: string;
  expiry: any;
  id: string;
  lastModifiedDate: number;
  linkUrl: string;
  new: boolean;
};

type NoticeListObjType = {
  date: string;
  list: API.NoticeListType[];
};

const Collections = () => {
  const defaultPageSize = 6;
  const defaultPageIndex = 0;
  const defaultWorksFilterObj = { orderBy: 'publishDate', direction: 'DESC' };
  const [curFilter, setCurFilter] = useState(0);
  const [carouselArr, setCarouselArr] = useState<CarouselArrType[]>([]);
  const [noticeArr, setNoticeArr] = useState<NoticeListObjType[]>([]);
  const [noticeAmount, setNoticeAmount] = useState(0);
  const [worksArr, setWorksArr] = useState<API.FirstWorksType[]>([]);
  const [worksAmount, setWorksAmount] = useState(0);
  const [worksFilterObj, setWorksFilterObj] = useState<API.InitialOfferingType>(
    defaultWorksFilterObj,
  );

  console.log('worksArr', worksArr);

  const [page, setPage] = useState(defaultPageIndex);
  const [totalPages, setTotalPages] = useState(0);

  const filterClick = (element: number) => {
    setCurFilter(element);
    const filterObj: API.InitialOfferingType = {};
    switch (element) {
      case 0:
        filterObj.orderBy = 'publishDate';
        filterObj.direction = 'DESC';
        break;
      case 1:
        filterObj.orderBy = 'price';
        filterObj.direction = 'DESC';
        break;
      case 2:
        filterObj.orderBy = 'publishDate';
        filterObj.direction = 'DESC';
        break;
      case 3:
        filterObj.sellMethod = 'direct';
        filterObj.direction = 'DESC';
        break;
      case 4:
        filterObj.sellMethod = 'auction';
        filterObj.direction = 'DESC';
        break;

      default:
        break;
    }
    fetchInitialOffering({
      obj: { page: defaultPageIndex, ...filterObj },
      status: 'filter',
    });
    setWorksFilterObj({ ...filterObj });
  };

  const onLoadMore = () => {
    fetchInitialOffering({
      obj: { page: page + 1, ...worksFilterObj },
      status: 'more',
    });
  };

  const data = [];
  for (let i = 0; i < 6; i++) {
    data.push(workObj);
  }

  // 轮播图
  const fetchCarousels = async () => {
    try {
      const result = await getCarousels();
      if (result?.data && result.data instanceof Array) {
        setCarouselArr([...result.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 本周预告
  const fetchMarkets = async () => {
    try {
      const params = {
        startDate: '2020-01-01',
        endDate: '2021-09-09',
        q: 'advance',
      };
      const result = await getMarkets(params);

      if (result?.data && result.data instanceof Array) {
        const dateArr: number[] = [];

        result.data.forEach((item: any) => {
          dateArr.push(item.product.publishDate);
        });
        const newDateArr = [...new Set(dateArr)];

        const dataArr: { date: any; list: any }[] = [];

        // 同一时间多个列表（用户、产品）
        newDateArr.forEach((item) => {
          const tempArr = result.data.filter(
            (j: { product: { publishDate: number } }) =>
              j.product.publishDate === item,
          );

          const idArr: any[] = [];
          tempArr.forEach((k: any) => {
            idArr.push(k.user.id);
          });

          const newIdArr = [...new Set(idArr)];

          // 同一作者多个作品
          const listArr: { auth: any; works: any[] }[] = [];
          newIdArr.forEach((l) => {
            const tempIdArr = tempArr.filter((m: { user: { id: string } }) => {
              return m.user.id === l;
            });
            const worksArr: any[] = [];
            tempIdArr.forEach((n: { product: any }) => {
              worksArr.push(n.product);
            });

            listArr.push({
              auth: tempIdArr[0].user,
              works: worksArr,
            });
          });

          dataArr.push({
            date: item,
            list: listArr,
          });
        });
        setNoticeArr([...dataArr]);
        setNoticeAmount(result.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 首发作品
  const fetchInitialOffering = async (elements: {
    obj?: API.InitialOfferingType;
    status?: string;
  }) => {
    try {
      const params = {
        page: page,
        size: defaultPageSize,
        ...elements.obj,
      };
      const result = await initialOffering(params);
      if (result?.data && result.data instanceof Object) {
        let tempArr: API.FirstWorksType[] = [];
        switch (elements.status) {
          case 'filter':
            tempArr = [...result.data.content];
            break;
          case 'more':
          default:
            tempArr = [...worksArr, ...result.data.content];
            break;
        }
        setWorksArr(tempArr);
        setWorksAmount(result.data.total);
        setTotalPages(result.data.totalPages);
        setPage(result.data.page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarousels();
    fetchMarkets();
    fetchInitialOffering({ obj: { ...worksFilterObj } });
  }, []);

  const handleFirstWorkClick = (elements: API.FirstWorksType) => {
    if (elements) {
      sessionStorage.setItem('authorsId', elements.user?.id || '');
      sessionStorage.setItem('productId', elements.product?.id || '');
      history.push('/sell');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <Carousel>
          {carouselArr.map((item, index) => {
            return (
              <div key={index}>
                <img
                  className={styles.carouselItem}
                  src={item.displayUrl}
                  alt="swiper"
                  width="100%"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.titleText}>首发市场</div>
          <div className={styles.titleDes}>
            首发由创建者直接销售，你可以在它们发行7日内售罄之前在这里购买它们，或者从二级市场上的其他用户那里购买它们
          </div>
        </div>

        <div className={styles.notice}>
          <div className={styles.thisWeek}>本周预告 {noticeAmount}</div>
          {noticeArr &&
            noticeArr.map((item, index) => {
              return (
                <div key={index}>
                  <div className={styles.noticeDate}>
                    {dayjs(item.date).format('MM月DD日')} 星期
                    {ZH_DAYS[dayjs(item.date).day()]}
                  </div>
                  {item.list && <NoticeList data={item.list} />}
                </div>
              );
            })}
        </div>

        <div className={styles.firstWorks}>
          <div className={styles.worksTop}>
            <div className={styles.topTitle}>首发作品 {worksAmount}</div>
            <div className={styles.topFilter}>
              <FilterSelect
                list={filterList}
                onClick={filterClick}
                current={curFilter}
              />
            </div>
          </div>
          <FirstWork
            data={worksArr}
            onLoadMore={onLoadMore}
            hasLoadMore={totalPages - 1 > page}
            onItemClick={handleFirstWorkClick}
          />
        </div>

        <div className={styles.creator}>
          <div className={styles.creatorTitle}>合作的创作者 20</div>
          <div className={styles.creatorDes}>按照作品姓名排序</div>
          <div className={styles.creatorContent}>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item className={styles.listItem}>
                  <div className={styles.itemLeft}>
                    <Avatar src={avatarY} size={110} />
                  </div>
                  <div className={styles.itemRight}>
                    <div className={styles.rightName}>李四</div>
                    <div className={styles.rightDes}>
                      Independent artist "If you think that China is closely
                      related to the current situation and future of the…
                    </div>
                    <div className={styles.rightCount}>
                      总发行作品 20 购买率90%
                    </div>
                  </div>
                </List.Item>
              )}
              loadMore={<LoadMore onClick={onLoadMore} />}
            />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomTitle}>传承有序，价值永存</div>
        <div className={styles.bottomDes}>
          我们将数字创作者、加密本地人和收藏家聚集在一起，
        </div>
        <div className={styles.bottomDes}>推动文化向前发展。</div>
      </div>
    </div>
  );
};

export default Collections;
