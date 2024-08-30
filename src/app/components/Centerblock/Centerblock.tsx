import Filter from "../Filter/Filter";
import Playlist from "../Playlist/Playlist";
import Search from "../Search/Search";
import styles from "./Centerblock.module.css";

const Centerblock = () => {
  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter />
      <Playlist />
    </div>
  );
};

export default Centerblock;
