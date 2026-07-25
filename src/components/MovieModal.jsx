import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Star, Clock, Calendar } from "lucide-react";
import { closeModal } from "../utils/modalSlice";
import useMovieDetails from "../hooks/useMovieDetails";
import useMovieTrailerModal from "../hooks/useMovieTrailerModal";
import { IMG_CDN_URL } from "../utils/Constants";

const MovieModal = () => {
  const dispatch = useDispatch();

  const { isOpen, movieId } = useSelector((store) => store.modal);

  const movie = useMovieDetails(movieId);
  const trailerKey = useMovieTrailerModal(movieId);

  if (!isOpen) return null;

  if (!movie) {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="text-white text-2xl font-bold animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => dispatch(closeModal())}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-4xl
          rounded-3xl
          bg-zinc-900
          shadow-2xl
          overflow-hidden
          animate-loginCard
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-zinc-950 border-b border-zinc-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-2xl">🎬</span>

            <h2 className="text-white text-xl md:text-2xl font-semibold truncate">
              {movie.title}
            </h2>
          </div>

          <button
            onClick={() => dispatch(closeModal())}
            className="
              w-10
              h-10
              flex
              items-center
              justify-center
              rounded-full
              bg-zinc-800
              hover:bg-red-600
              transition-all
              duration-300
              hover:scale-110
              flex-shrink-0
            "
          >
            <X className="text-white" size={22} />
          </button>
        </div>

        {/* Trailer */}
        <div className="relative h-[220px] md:h-[260px] lg:h-[300px] bg-black">
          {trailerKey ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={IMG_CDN_URL + movie.backdrop_path}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          {movie.tagline && (
            <p className="text-red-400 italic mb-4">
              {movie.tagline}
            </p>
          )}

          {/* Movie Info */}
          <div className="flex flex-wrap gap-5 text-gray-300 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" size={18} />
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
                    {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-white/10
                  border
                  border-white/20
                  text-white
                  text-xs
                "
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <h2 className="text-lg md:text-xl text-white font-semibold mt-4 mb-2">
            Overview
          </h2>

          <p className="text-gray-300 leading-6 text-sm md:text-base">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;