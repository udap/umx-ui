import styles from './FilterSelect.less';

type FilterSelectType = {
  list: string[];
  onClick: (e: number) => void;
  current: number;
};

const FilterSelect = (props: FilterSelectType) => {
  return (
    <div className={styles.container}>
      <ul>
        {props.list.map((item, index) => (
          <li
            key={index}
            onClick={() => props.onClick(index)}
            className={index === props.current ? styles.active : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSelect;
