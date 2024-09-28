import styles from "../Filter.module.css";
import shared from "@/components/SharedButtons/SharedButtons.module.css";
import cn from "classnames";
import FilterList from "../FilterList/FilterList";

interface Props {
  title: string;
  opened: boolean;
  filterList: string[];
  openFilter: (filter: string) => void;
}

export default function FilterButton({
  title,
  opened,
  filterList,
  openFilter,
}: Props) {
  return (
    <div className={styles.filterButtonWrapper}>
      <div
        className={cn(styles.filterButton, shared.btnText)}
        onClick={() => openFilter(title)}
      >
        {title}
      </div>
      {opened && <FilterList filterOptions={filterList} />}
    </div>
  );
}
