import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Star, Clock, Calendar } from "lucide-react";
import { closeModal } from "../utils/modalSlice";
import useMovieDetails from "../hooks/useMovieDetails";
import { IMG_CDN_URL } from "../utils/Constants";

const MovieModal = () => {
  const dispatch = useDispatch();

  const { isOpen, movieId } = useSelector((store) => store.modal);

  const movie = useMovieDetails(movieId);

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
          max-w-5xl
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          bg-zinc-900
          shadow-2xl
          animate-loginCard
        "
      >
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeModal())}
          className="
            absolute
            top-5
            right-5
            z-50
            rounded-full
            bg-black/70
            p-2
            backdrop-blur-md
            transition
            duration-300
            hover:bg-red-600
            hover:scale-110
          "
        >
          <X className="text-white" size={24} />
        </button>

        {/* Backdrop */}
        <div className="relative">
          <img
            src={IMG_CDN_URL + movie.backdrop_path}
            alt={movie.title}
            className="w-full h-[420px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {movie.title}
          </h1>

          {/* Tagline */}
          {movie.tagline && (
            <p className="text-red-400 italic mt-2 text-lg">
              {movie.tagline}
            </p>
          )}

          {/* Movie Info */}
          <div className="flex flex-wrap gap-6 mt-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Star
                className="text-yellow-400 fill-yellow-400"
                size={18}
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

          {/* Genres */}
          <div className="flex flex-wrap gap-3 mt-6">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-white/10
                  border
                  border-white/20
                  backdrop-blur-sm
                  text-white
                  text-sm
                "
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <h2 className="text-2xl text-white font-semibold mt-8 mb-3">
            Overview
          </h2>

          <p className="text-gray-300 leading-8">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;