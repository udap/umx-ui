import { useState } from 'react';
import { Carousel, List, Avatar } from 'antd';

import styles from './Collections.less';
import { swiperImg, avatarY, laugh } from '@/images';
import { NoticeList } from './components';
import { LoadMore, FirstWork, FilterSelect } from '@/components';

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

const Collections = () => {
  const [curFilter, setCurFilter] = useState(0);
  const arr = [
    {
      date: '3月20日 星期五',
      list: [
        {
          auth: {
            avatar: avatarY,
            name: '岳敏君',
            code: '0x 3f13 3816 f817 8b93 ac99 1a2c 3eed db8f 947a f0cb',
            des:
              'Independent artist "If you think that China is closely related to the current situation and future of the world, then this artist is the one who depicts China," Time magazine said of Yue Minjun.',
          },
          works: [
            {
              name: '快乐图',
              code: 'A29387',
              des:
                '那时已经有一些艺术家开始做失落感觉的作品了,他们给我一些启发,我开始做一排排的人,一排排的我开始做一排排的人,一排排的',
              date: '3月20日 12:00',
              amount: '1000',
              img: laugh,
            },
            {
              name: '快乐图',
              code: 'A29387',
              des:
                '那时已经有一些艺术家开始做失落感觉的作品了,他们给我一些启发,我开始做一排排的人,一排排的我开始做一排排的人,一排排的',
              date: '3月20日 12:00',
              amount: '1000',
              img: laugh,
            },
          ],
        },
        {
          auth: {
            avatar: avatarY,
            name: '张三',
            code: '0x 3f13 3816 f817 8b93 ac99 1a2c 3eed db8f 947a f0cb',
            des:
              'Independent artist "If you think that China is closely related to the current situation and future of the world, then this artist is the one who depicts China," Time magazine said of Yue Minjun.',
          },
          works: [
            {
              name: '快乐图',
              code: 'A29387',
              des:
                '那时已经有一些艺术家开始做失落感觉的作品了,他们给我一些启发,我开始做一排排的人,一排排的我开始做一排排的人,一排排的',
              date: '3月20日 12:00',
              amount: '1000',
              img: laugh,
            },
          ],
        },
      ],
    },
    {
      date: '3月22日 星期日',
      list: [
        {
          auth: {
            avatar: avatarY,
            name: '李四',
            code: '0x 3f13 3816 f817 8b93 ac99 1a2c 3eed db8f 947a f0cb',
            des:
              'Independent artist "If you think that China is closely related to the current situation and future of the world, then this artist is the one who depicts China," Time magazine said of Yue Minjun.',
          },
          works: [
            {
              name: '快乐图',
              code: 'A29387',
              des:
                '那时已经有一些艺术家开始做失落感觉的作品了,他们给我一些启发,我开始做一排排的人,一排排的我开始做一排排的人,一排排的',
              date: '3月20日 12:00',
              amount: '1000',
              img: laugh,
            },
          ],
        },
      ],
    },
  ];

  const filterList = ['发行时间', '售价', '倒计时', '直卖', '拍卖'];

  const filterClick = (e: number) => {
    console.log('filterClick');
    setCurFilter(e);
  };

  const onLoadMore = () => {
    console.log('onLoadMore1');
  };

  const data = [];
  for (let i = 0; i < 6; i++) {
    data.push(workObj);
  }

  return (
    <div className={styles.container}>
      <Carousel>
        <div>
          <img
            className={styles.carouselItem}
            src={swiperImg}
            alt="swiper"
            width="100%"
          />
        </div>
        <div>
          <img
            className={styles.carouselItem}
            src={swiperImg}
            alt="swiper"
            width="100%"
          />
        </div>
        <div>
          <img
            className={styles.carouselItem}
            src={swiperImg}
            alt="swiper"
            width="100%"
          />
        </div>
        <div>
          <img
            className={styles.carouselItem}
            src={swiperImg}
            alt="swiper"
            width="100%"
          />
        </div>
      </Carousel>
      <div className={styles.title}>
        <div className={styles.titleText}>首发市场</div>
        <div className={styles.titleDes}>
          首发由创建者直接销售，你可以在它们发行7日内售罄之前在这里购买它们，或者从二级市场上的其他用户那里购买它们
        </div>
      </div>
      <div className={styles.notice}>
        <div className={styles.thisWeek}>本周预告 4</div>
        {arr &&
          arr.map((item, index) => {
            return (
              <div key={index}>
                <div className={styles.noticeDate}>{item.date}</div>
                {item.list && <NoticeList data={item.list} />}
              </div>
            );
          })}
      </div>

      <div className={styles.firstWorks}>
        <div className={styles.worksTop}>
          <div className={styles.topTitle}>首发作品 12</div>
          <div className={styles.topFilter}>
            <FilterSelect
              list={filterList}
              onClick={filterClick}
              current={curFilter}
            />
          </div>
        </div>
        <FirstWork data={data} onLoadMore={onLoadMore} hasLoadMore />
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
      <div className={styles.bottom}>
        <div className={styles.bottomTitle}>全新的创意商品的</div>
        <div className={styles.bottomTitle}>贸易社区。</div>
        <div className={styles.bottomDes}>
          我们将数字创作者、加密本地人和收藏家聚集在一起，
        </div>
        <div className={styles.bottomDes}>推动文化向前发展。</div>
      </div>
    </div>
  );
};

export default Collections;
