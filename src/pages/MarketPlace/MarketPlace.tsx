import { useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import styles from './MarketPlace.less';
import { laugh, avatarY } from '@/images';
import { MarketPlaceList, FilterSelect } from '@/components';

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

const list = [
  { name: '作者姓名', id: '12' },
  { name: '作者姓名', id: '23' },
  { name: '作者姓名', id: '34' },
  { name: '作者姓名', id: '45' },
  { name: '作者姓名', id: '56' },
  { name: '作者姓名', id: '67' },
  { name: '作者姓名', id: '78' },
  { name: '作者姓名', id: '89' },
];

const filterList = ['时间', '售价', '价值率'];

const MarketPlace = () => {
  const [current, setCurrent] = useState('');
  const [curFilter, setCurFilter] = useState(0);

  const onLoadMore = () => {
    console.log('onLoadMore3');
  };

  const handleClick = (e: string) => {
    console.log('handleClick', e);
    if (e === current) {
      setCurrent('');
    } else {
      setCurrent(e);
    }
  };

  const filterClick = (e: number) => {
    console.log('filterClick');
    setCurFilter(e);
  };

  const data = [];
  for (let i = 0; i < 6; i++) {
    data.push(obj);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>二级市场</div>
        <div className={styles.headerDes}>
          在作品首发期结束后，消费者可以自行标价转卖作品
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.contentLeftTitle}>创作者：</div>
          <div className={styles.contentLeftList}>
            <ul>
              {list.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleClick(item.id)}
                  className={item.id === current ? styles.active : ''}
                >
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span className={styles.name}>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.contentRight}>
          <div className={styles.contentRightFilter}>
            <FilterSelect
              list={filterList}
              onClick={filterClick}
              current={curFilter}
            />
          </div>
          <div className={styles.contentRightContent}>
            <MarketPlaceList data={data} onLoadMore={onLoadMore} hasLoadMore />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
