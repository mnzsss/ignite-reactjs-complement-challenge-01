import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviesContextData {
  genres: GenreResponseProps[];
  movies: MovieProps[];
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  handleSetSelectedGenreId(id: number): void;
}

const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData);

export const MoviesProvider: React.FC = ({ children }) => {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleSetSelectedGenreId(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MoviesContext.Provider
      value={{
        genres,
        handleSetSelectedGenreId,
        movies,
        selectedGenreId,
        selectedGenre,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export function useMovies(): MoviesContextData {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error("useMovies must be used whitin an MoviesProvider");
  }

  return context;
}
