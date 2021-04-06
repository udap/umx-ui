import NumberFormat from 'react-number-format';

import styles from './BidGraph.less';

interface BidGraphType {
  bidList: { id: string; price: number; bidder: { name: string } }[];
}

const BidGraph = (props: BidGraphType) => {
  const maxPrice = Math.max.apply(
    Math,
    props.bidList?.map((item) => {
      return item.price;
    }),
  );

  return (
    <div className={styles.container}>
      <ul>
        {props.bidList &&
          props.bidList.map((item, index) => {
            return (
              <li key={index}>
                <span className={styles.title}>{item.id}</span>
                <span
                  className={styles.content}
                  style={{ width: `${(item.price / maxPrice) * 100}%` }}
                >
                  <span className={styles.name}>{item.bidder?.name}</span>
                  <span className={styles.price}>
                    <NumberFormat
                      value={item.price}
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
