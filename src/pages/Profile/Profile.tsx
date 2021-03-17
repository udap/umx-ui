import styles from './Profile.less';
import { NoticeList } from './components';
import { ProfileContent, FirstWork, MarketPlaceList } from '@/components';
import { laugh, avatarY } from '@/images';

const arr = [
  {
    date: '3月20日 星期五',
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
];

const obj = {
  title: '快乐图',
  des:
    '那时已经有一些艺术家开始做失落感觉的作品了,他们给我一些他们给我一些他们给我一些',
  code: 'A29387',
  circulation: 12,
  heightPrice: 21000,
  lowPrice: 20000,
  img: laugh,
  avatarImg: avatarY,
  avatarName: '岳敏君',
};

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

const Profile = () => {
  const data = [];
  for (let i = 0; i < 2; i++) {
    data.push(workObj);
  }

  const onLoadMore = () => {
    console.log('onLoadMore2');
  };

  const marketPlaceData = [];
  for (let i = 0; i < 4; i++) {
    marketPlaceData.push(obj);
  }

  const onMarketPlaceListLoadMore = () => {
    console.log('onMarketPlaceListLoadMore');
  };

  return (
    <>
      <ProfileContent />

      <div className={styles.notice}>
        <div className={styles.noticeTitle}>预告</div>
        {arr &&
          arr.map((item, index) => {
            return (
              <div key={index}>
                <div className={styles.noticeDate}>{item.date}</div>
                {item.works?.length > 0 &&
                  item.works?.map((worksItem, i) => {
                    return <NoticeList key={i} data={worksItem} />;
                  })}
              </div>
            );
          })}
      </div>

      <div className={styles.firstWorks}>
        <div className={styles.worksTitle}>首发在售作品</div>
        <FirstWork data={data} onLoadMore={onLoadMore} />
      </div>

      <div className={styles.marketPlace}>
        <div className={styles.marketPlaceTitle}>二级市场交易作品</div>
        <MarketPlaceList
          data={marketPlaceData}
          onLoadMore={onMarketPlaceListLoadMore}
          grid={{ gutter: 96, column: 4 }}
        />
      </div>
    </>
  );
};

export default Profile;
