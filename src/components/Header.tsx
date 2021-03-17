import { useMovies } from "../hooks/useMovies";

function Header() {
  const { selectedGenre } = useMovies();

  return (
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>
  );
}

export default Header;
