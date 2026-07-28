import { useMemo } from "react";
import MovieList from "./MovieList";
import useGenreMovies from "../hooks/useGenreMovies";

const GenresMovieList = ({ genreId, genreName }) => {
  const movies = useGenreMovies(genreId);

  const title = useMemo(
    () => `${genreName} Movies`,
    [genreName]
  );

  if (!movies) {
    return (
      <div className="py-10 text-center text-gray-400">
        Loading movies...
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="py-10 text-center text-gray-400">
        No movies found.
      </div>
    );
  }

  return (
    <MovieList
      title={title}
      movies={movies}
    />
  );
};

export default GenresMovieList;