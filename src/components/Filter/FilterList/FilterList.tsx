import styles from "../Filter.module.css";
import cn from "classnames";

interface Props {
  filterOptions: string[];
}

export default function FilterList({ filterOptions }: Props) {
  return (
    <div className={styles.filterListContainer}>
      <ul
        className={cn(styles.filterList, {
          [styles.filterListLong]: filterOptions.length > 5,
        })}
      >
        {filterOptions.map((filter) => (
          <li key={filter} className={styles.filterLine}>
            {filter}
          </li>
        ))}
      </ul>
    </div>
  );
}
