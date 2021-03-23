import { Table } from 'antd';

import styles from './TransactionList.less';
import { ReactComponent as Issue } from '@/images/issue.svg';
import { ReactComponent as Buy } from '@/images/buy.svg';
import { ReactComponent as RateRise } from '@/images/rateRise.svg';

const { Column } = Table;
const data = [
  {
    key: 1,
    number: '001/100',
    purchaser: 'Trevor Jones',
    buyingPrice: '¥20,000',
    buyTime: '3/20 12:00',
    issue: '岳敏君',
    marketPrice: '¥20,000',
  },
  {
    key: 2,
    number: '001/100',
    purchaser: '王意义',
    buyingPrice: '¥20,000',
    buyTime: '3/20 12:00',
    issue: '岳敏君',
    marketPrice: '¥20,000',
  },
  {
    key: 3,
    number: '001/100',
    purchaser: '张三',
    buyingPrice: '¥21,000',
    buyTime: '3/20 12:00',
    issue: '岳敏君',
    marketPrice: '¥20,000',
  },
];

type ColumnType = {
  key: number;
  number: string;
  purchaser: string;
  buyingPrice: string;
  buyTime: string;
  issue: string;
  marketPrice: string;
};

const TransactionList = () => {
  return (
    <div className={styles.transactionList}>
      <div className={styles.title}>交易历史</div>
      <div className={styles.amount}>
        <div className={styles.amountText}>最后交易金额 ¥21,890</div>
        <RateRise width={24} height={20} />
      </div>
      <Table dataSource={data} pagination={false} size="small">
        <Column title="编号" dataIndex="number" key="number" />
        <Column title="购买人" dataIndex="purchaser" key="purchaser" />
        <Column title="买入价" dataIndex="buyingPrice" key="buyingPrice" />
        <Column
          title="买入时间"
          dataIndex="buyTime"
          key="buyTime"
          sorter={(a: ColumnType, b: ColumnType) => {
            return a.key - b.key;
          }}
        />
        <Column
          title="签发"
          dataIndex="issue"
          key="issue"
          render={(text) => {
            return (
              <div className={styles.columnContent}>
                <div className={styles.contentLeft}>{text}</div>
                <Issue width={12} height={12} />
              </div>
            );
          }}
        />
        <Column
          title="二级售价"
          dataIndex="marketPrice"
          key="marketPrice"
          render={(text) => (
            <div className={styles.columnContent}>
              <Buy className={styles.contentLeft} width={12} height={12} />
              <div>{text}</div>
            </div>
          )}
        />
      </Table>
    </div>
  );
};

export default TransactionList;
