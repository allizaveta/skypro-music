import styles from "./Filter.module.css";
import classNames from "classnames";

const Filter = () => {
  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <div
        className={classNames(
          styles.filterButton,
          styles.buttonAuthor,
          styles._btnText
        )}
      >
        исполнителю
      </div>
      <div className={styles.filterButton}>году выпуска</div>
      <div className={styles.filterButton}>жанру</div>
    </div>
  );
};

export default Filter;
