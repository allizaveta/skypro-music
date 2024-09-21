import styles from "./page.module.css";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { getAllTracks } from "@/store/features/playlistSlice";
import Nav from "../components/Nav/Nav";
import Search from "../components/Search/Search";
import Sidebar from "../components/Sidebar/Sidebar";
import Bar from "../components/Bar/Bar";

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getAllTracks()).unwrap();
      } catch (error: unknown) {
        console.log(error);
      }
    };

    getData();
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />
            {children}
          </div>
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
