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

  const { isOpen, movieId } = useSelector(
    (store) => store.modal
  );

  const movie = useMovieDetails(movieId);
  const trailerKey = useMovieTrailerModal(movieId);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(closeModal());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [dispatch]);

  if (!isOpen) return null;

  if (!movie) {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md">
        <div className="flex flex-col items-center gap-5">
          <div className="h-12 w-12 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>

          <p className="text-white text-lg font-medium">
            Loading Movie...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => dispatch(closeModal())}
      className="
        fixed
        inset-0
        z-[999]

        flex
        items-center
        justify-center

        bg-black/80
        backdrop-blur-sm

        p-3
        sm:p-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative

          w-full
          max-w-5xl

          max-h-[90vh]
          overflow-y-auto

          rounded-2xl
          lg:rounded-3xl

          bg-zinc-900

          shadow-2xl

          animate-loginCard
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between

            h-14
            sm:h-16

            px-4
            sm:px-6

            bg-zinc-950

            border-b
            border-zinc-800
          "
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-xl sm:text-2xl">
              🎬
            </span>

            <h2
              className="
                text-lg
                sm:text-xl
                md:text-2xl

                font-semibold

                text-white

                truncate
              "
            >
              {movie.title}
            </h2>
          </div>

          <button
            aria-label="Close modal"
            onClick={() => dispatch(closeModal())}
            className="
              w-9
              h-9

              sm:w-10
              sm:h-10

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
            <X
              className="text-white"
              size={22}
            />
          </button>
        </div>

        {/* Trailer */}
        <div
          className="
            relative

            h-52
            sm:h-60
            md:h-72
            lg:h-80
            xl:h-[420px]

            bg-black
          "
        >
          {trailerKey ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
              title={movie.title}
              loading="lazy"
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
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
        </div>
                {/* Content */}
        <div className="p-5 sm:p-6 lg:p-7">
          {/* Tagline */}
          {movie.tagline && (
            <p
              className="
                text-red-400
                italic

                text-sm
                sm:text-base

                mb-5
              "
            >
              "{movie.tagline}"
            </p>
          )}

          {/* Movie Info */}
          <div
            className="
              flex
              flex-wrap
              gap-4
              sm:gap-6

              text-gray-300

              text-sm
              sm:text-base
            "
          >
            <div className="flex items-center gap-2">
              <Star
                size={18}
                className="text-yellow-400 fill-yellow-400"
              />

              <span>
                {movie.vote_average?.toFixed(1)} IMDb
              </span>
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
          <div className="flex flex-wrap gap-2 mt-5">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="
                  px-3
                  sm:px-4

                  py-1.5

                  rounded-full

                  bg-white/10

                  border
                  border-white/20

                  text-white

                  text-xs
                  sm:text-sm
                "
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <h2
            className="
              mt-6
              mb-3

              text-lg
              sm:text-xl
              lg:text-2xl

              font-semibold
              text-white
            "
          >
            Overview
          </h2>

          <p
            className="
              text-gray-300

              text-sm
              sm:text-base

              leading-7

              max-w-none
            "
          >
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;