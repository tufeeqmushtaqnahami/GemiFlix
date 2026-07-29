import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Star, Clock, Calendar } from "lucide-react";

import { closeModal } from "../utils/modalSlice";
import useMovieDetails from "../hooks/useMovieDetails";
import useMovieTrailerModal from "../hooks/useMovieTrailerModal";
import { IMG_CDN_URL } from "../utils/Constants";
import noPoster from "../assets/noPoster.png";

const MovieModal = () => {
  const dispatch = useDispatch();
  const { isOpen, movieId, modalType } = useSelector(
  (store) => store.modal
);

  const movie = useMovieDetails(movieId);
  const trailerKey = useMovieTrailerModal(movieId);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") dispatch(closeModal());
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  if (!isOpen) return null;

  if (!movie) {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md">
        <div className="flex flex-col items-center gap-5">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
          <p className="text-lg font-medium text-white">Loading Movie...</p>
        </div>
      </div>
    );
  }

 return (
  <div
    onClick={() => dispatch(closeModal())}
    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl lg:rounded-3xl bg-zinc-900 shadow-2xl animate-loginCard"
    >
      {/* Header */}
      <div className="flex h-14 sm:h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 sm:px-6">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="text-xl sm:text-2xl">🎬</span>

          <h2 className="truncate text-lg sm:text-xl md:text-2xl font-semibold text-white">
            {movie.title}
          </h2>
        </div>

        <button
          aria-label="Close modal"
          onClick={() => dispatch(closeModal())}
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-zinc-800 transition-all duration-300 hover:scale-110 hover:bg-red-600"
        >
          <X className="text-white" size={22} />
        </button>
      </div>

      {/* Trailer */}
      <div className="relative h-52 sm:h-60 md:h-72 lg:h-80 xl:h-[420px] bg-black">
        {trailerKey ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
            title={movie.title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={
              movie.backdrop_path
                ? IMG_CDN_URL + movie.backdrop_path
                : noPoster
            }
            alt={movie.title}
            loading="lazy"
            decoding="async"
            draggable="false"
            onError={(e) => {
              e.currentTarget.src = noPoster;
            }}
            className="h-full w-full object-cover"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
      </div>

      {/* Movie Details */}
      {modalType === "details" && (
        <div className="p-5 sm:p-6 lg:p-7">
          {movie.tagline && (
            <p className="mb-5 text-sm italic text-red-400 sm:text-base">
              "{movie.tagline}"
            </p>
          )}

          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base text-gray-300">
            <div className="flex items-center gap-2">
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
              <span>{movie.vote_average?.toFixed(1)} IMDb</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{movie.runtime} min</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{movie.release_date}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs sm:px-4 sm:text-sm text-white"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <h2 className="mt-6 mb-3 text-lg font-semibold text-white sm:text-xl lg:text-2xl">
            Overview
          </h2>

          <p className="max-w-none text-sm leading-7 text-gray-300 sm:text-base">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  </div>
);



};

export default MovieModal;
