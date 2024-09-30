import styles from "../Filter.module.css";
import shared from "@/components/SharedButtons/SharedButtons.module.css";
import cn from "classnames";
import FilterList from "../FilterList/FilterList";

interface Props {
  title: string;
  filterList: string[];
  filterCounters: Record<string, number>;
  activeCounter: number;
  opened: boolean;
  openFilter: (filter: string) => void;
}

export default function FilterButton({
  title,
  filterList,
  filterCounters,
  activeCounter,
  opened,
  openFilter,
}: Props) {
  return (
    <div className={styles.filterButtonWrapper}>
      <div
        className={cn(styles.filterButton, shared.btnText, {
          [shared.active]: activeCounter,
        })}
        onClick={() => openFilter(title)}
      >
        {title}
      </div>

      {activeCounter > 0 && (
        <button type="button" className={styles.filterCounter}>
          {activeCounter}
        </button>
      )}

      {opened && (
        <FilterList
          title={title}
          filterOptions={filterList}
          filterCounters={filterCounters}
        />
      )}
    </div>
  );
}
