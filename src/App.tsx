import { MoviesProvider, useMovies } from "./hooks/useMovies";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";
import Header from "./components/Header";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";

export function App() {
  const { selectedGenre } = useMovies();

  return (
    <MoviesProvider>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />

        <div className="container">
          <Header />

          <Content />
        </div>
      </div>
    </MoviesProvider>
  );
}
