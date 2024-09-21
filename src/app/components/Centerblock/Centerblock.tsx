import { useAppSelector } from "@/store/store";
import { getTracks } from "../api/tracks";
import Filter from "../Filter/Filter";
import Playlist from "../Playlist/Playlist";
import Search from "../Search/Search";
import styles from "./Centerblock.module.css";
import { TrackType } from "@/types/tracks";

type CenterblockProps = {
  tracks: TrackType[];
  title: string;
};

export async function Centerblock({ tracks, title }: CenterblockProps) {
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
      <h2 className={styles.centerblockH2}>{title}</h2>
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
