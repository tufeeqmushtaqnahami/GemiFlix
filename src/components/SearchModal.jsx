import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, X } from "lucide-react";
import { openModal } from "../utils/modalSlice";
import { API_OPTIONS } from "../utils/Constants";
import {
  closeSearch,
  setLoading,
  setQuery,
  setResults,
} from "../utils/searchSlice";

const SearchModal = () => {
  const dispatch = useDispatch();

  const { isOpen, query, results, loading } = useSelector(
    (store) => store.search
  );

  useEffect(() => {
    if (!query.trim()) {
      dispatch(setResults([]));
      return;
    }

    const searchMovies = async () => {
      try {
        dispatch(setLoading(true));

        const data = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}`,
          API_OPTIONS
        );

        const json = await data.json();

        dispatch(setResults(json.results || []));
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    const timer = setTimeout(searchMovies, 500);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24">
      <div className="w-[90%] max-w-3xl rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-700">
          <h2 className="text-2xl font-bold text-white">
            Search Movies
          </h2>

          <button
            onClick={() => dispatch(closeSearch())}
            className="p-2 rounded-full hover:bg-zinc-700 transition"
          >
            <X className="text-white" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6">
          <div className="flex items-center gap-3 rounded-xl bg-zinc-800 px-4 py-3">
            <Search className="text-gray-400" />

            <input
              type="text"
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              placeholder="Search for movies..."
              className="w-full bg-transparent text-white outline-none"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="px-6 pb-4 text-center text-gray-400">
            Searching...
          </div>
        )}

        {/* No Results */}
        {!loading && query && results.length === 0 && (
          <div className="px-6 pb-4 text-center text-gray-400">
            No movies found.
          </div>
        )}

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto px-6 pb-6">
          {results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
  dispatch(
    openModal({
      movieId: movie.id,
      modalType: "details",
    })
  );

  dispatch(closeSearch());
}}
              className="flex items-center gap-4 p-3 mb-2 rounded-xl hover:bg-zinc-800 transition cursor-pointer"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/80x120?text=No+Image"
                }
                alt={movie.title}
                className="w-16 h-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">
                  {movie.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {movie.release_date || "Unknown Release Date"}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SearchModal;