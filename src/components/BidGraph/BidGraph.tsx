import NumberFormat from 'react-number-format';

import styles from './BidGraph.less';
import { padLeft } from '@/utils/common';

interface BidGraphType {
  bidList?: { id: string; price: number; bidder: { name: string } }[];
  copies: number;
}

const BidGraph = (props: BidGraphType) => {
  const maxPrice = props.bidList
    ? Math.max.apply(
        Math,
        props.bidList?.map((item) => {
          return item.price;
        }),
      )
    : 0;
  console.log(props);

  return (
    <div className={styles.container}>
      <ul>
        {props.bidList &&
          props.bidList.map((item, index) => {
            return (
              <li key={index}>
                <span className={styles.title}>{padLeft(index + 1, 3)}</span>
                <span
                  className={styles.content}
                  style={{
                    width: `${(item.price / maxPrice) * 100}%`,
                    backgroundColor:
                      index + 1 > props.copies ? '#555' : '#d3d3d3',
                  }}
                >
                  <span className={styles.name}>{item.bidder?.name}</span>
                  <span className={styles.price}>
                    <NumberFormat
                      value={item.price / 100}
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                      displayType={'text'}
                      prefix={'¥'}
                    />
                  </span>
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default BidGraph;
