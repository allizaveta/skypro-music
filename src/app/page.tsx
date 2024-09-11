import Sidebar from "./components/Sidebar/Sidebar";
import Bar from "./components/Bar/Bar";
import { Centerblock } from "./components/Centerblock/Centerblock";
import Nav from "./components/Nav/Nav";
import { CurrentTrackProvider } from "@/contexts/CurrentTrackProvider";

export default function Home() {

  return (
    <div className="wrapper">
      <div className="container">
      <CurrentTrackProvider>
        <main className="main">
          <Nav />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
        </CurrentTrackProvider>
        <footer className="footer" />
      </div>
    </div>
  );
}
