import { getTracks } from "../api/tracks";
import Filter from "../Filter/Filter";
import Playlist from "../Playlist/Playlist";
import Search from "../Search/Search";
import styles from "./Centerblock.module.css";
import { TrackType } from "@/types/tracks";

export async function Centerblock() {
  let tracks: TrackType[] = [];
  let error = "";
  try {
    tracks = await getTracks();
  } catch (err: unknown) {
    error =
      err instanceof Error
        ? "Ошибка при загрузке треков " + err.message
        : "Неизвестная ошибка";
  }
  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          <Filter tracks={tracks} />
          <Playlist tracks={tracks} />
        </>
      )}
    </div>
  );
}
