import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, X, Star } from "lucide-react";
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

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const resultRefs = useRef([]);

  useEffect(() => {
    if (!query.trim()) {
      dispatch(setResults([]));
      setSelectedIndex(-1);
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
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    const timer = setTimeout(searchMovies, 500);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  // Auto-scroll selected result into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultRefs.current[selectedIndex]) {
      resultRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Close search
      if (e.key === "Escape") {
        dispatch(closeSearch());
        return;
      }

      if (!results.length) return;

      // Move down
      if (e.key === "ArrowDown") {
        e.preventDefault();

        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : 0
        );
      }

      // Move up
      if (e.key === "ArrowUp") {
        e.preventDefault();

        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : results.length - 1
        );
      }

      // Open selected movie
      if (e.key === "Enter" && selectedIndex >= 0) {
        const movie = results[selectedIndex];

        dispatch(
          openModal({
            movieId: movie.id,
            modalType: "details",
          })
        );

        dispatch(closeSearch());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, results, selectedIndex, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 pt-20 backdrop-blur-sm">
      <div
        className="
          w-full
          max-w-2xl
          overflow-hidden
          rounded-2xl
          border
          border-zinc-700
          bg-zinc-950
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Search Movies
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Find a movie to watch
            </p>
          </div>

          <button
            onClick={() => dispatch(closeSearch())}
            aria-label="Close search"
            className="
              rounded-full
              p-2
              text-gray-400
              transition
              hover:bg-zinc-800
              hover:text-white
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6">
          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-zinc-700
              bg-zinc-900
              px-4
              py-3
              transition
              focus-within:border-red-500
              focus-within:ring-2
              focus-within:ring-red-500/20
            "
          >
            <Search
              size={22}
              className="shrink-0 text-gray-400"
            />

            <input
              type="text"
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              placeholder="Enter movie title..."
              autoFocus
              className="
                w-full
                bg-transparent
                text-white
                outline-none
                placeholder:text-gray-500
              "
            />

            {query && (
              <button
                onClick={() => dispatch(setQuery(""))}
                aria-label="Clear search"
                className="
                  shrink-0
                  rounded-full
                  p-1
                  text-gray-500
                  transition
                  hover:bg-zinc-800
                  hover:text-white
                "
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="px-6 pb-4 text-center text-gray-400">
            Searching...
          </div>
        )}

        {/* No Results */}
        {!loading && query.trim() && results.length === 0 && (
          <div className="px-6 pb-6 text-center text-gray-400">
            No movies found.
          </div>
        )}

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto px-6 pb-6">
          {results.map((movie, index) => {
            const year = movie.release_date
              ? movie.release_date.slice(0, 4)
              : "Unknown";

            const rating = movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A";

            const isSelected = selectedIndex === index;

            return (
              <div
                key={movie.id}
                ref={(el) => {
                  resultRefs.current[index] = el;
                }}
                onClick={() => {
                  dispatch(
                    openModal({
                      movieId: movie.id,
                      modalType: "details",
                    })
                  );

                  dispatch(closeSearch());
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`
                  mb-2
                  flex
                  cursor-pointer
                  items-center
                  gap-4
                  rounded-xl
                  border
                  p-3
                  transition-all
                  duration-200

                  ${
                    isSelected
                      ? "border-red-500/50 bg-zinc-800"
                      : "border-transparent hover:bg-zinc-800"
                  }
                `}
              >
                {/* Poster */}
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "https://via.placeholder.com/80x120?text=No+Image"
                  }
                  alt={movie.title}
                  className="
                    h-24
                    w-16
                    shrink-0
                    rounded-lg
                    object-cover
                  "
                />

                {/* Movie Information */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                    {movie.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
                    <span>{year}</span>

                    <span className="text-zinc-600">•</span>

                    <span className="flex items-center gap-1">
                      <Star
                        size={15}
                        className="text-yellow-500"
                        fill="currentColor"
                      />
                      {rating}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Keyboard Hint */}
        {results.length > 0 && (
          <div
            className="
              hidden
              border-t
              border-zinc-800
              px-6
              py-3
              text-xs
              text-gray-500
              sm:block
            "
          >
            ↑ ↓ Navigate&nbsp;&nbsp; • &nbsp;&nbsp;Enter Open&nbsp;&nbsp; •
            &nbsp;&nbsp;Esc Close
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;