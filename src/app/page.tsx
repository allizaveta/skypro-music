"use client";
import { CurrentTrackProvider } from "@/contexts/CurrentTrackProvider";

import { useAppSelector } from "@/store/store";
import { useFilteredTracks } from "@/hooks/useFilteredTracks";
import { Centerblock } from "./components/Centerblock/Centerblock";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import Bar from "./components/Bar/Bar";

export default function Home() {
  const { allTracks, error } = useAppSelector((state) => state.playlist);
  const filteredTracks = useFilteredTracks(allTracks);

  return (
    <div className="wrapper">
      <div className="container">
        <CurrentTrackProvider>
          <main className="main">
            <Nav />
            <Centerblock tracks={filteredTracks} title={"Все треки"} />
            <Sidebar />
          </main>
          <Bar />
        </CurrentTrackProvider>
        <footer className="footer" />
      </div>
    </div>
  );
}
