import Nav from "@/components/Nav/Nav";
import styles from "./Tracks.module.css";
import Searchbar from "@/components/Searchbar/Searchbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";

type RootLayoutType = Readonly<{ children: React.ReactNode }>;

export default function TracksLayout({ children }: RootLayoutType) {
  return (
    <div className="wrapper">
      <div className="container">
        <main className={styles.mainContainer}>
          <Nav />

          <div className={styles.main}>
            <Searchbar />

            {children}
          </div>

          <Sidebar />
        </main>

        <Bar />
        <footer className="footer" />
      </div>
    </div>
  );
}
