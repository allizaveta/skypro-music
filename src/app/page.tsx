import Sidebar from "./components/Sidebar/Sidebar";
import Bar from "./components/Bar/Bar";
import Centerblock from "./components/Centerblock/Centerblock";
import Nav from "./components/Nav/Nav";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Nav />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer" />
      </div>
    </div>
  );
}
