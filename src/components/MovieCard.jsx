import React from "react";
import { Play, Bookmark, BookmarkCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/Constants";
import { openModal } from "../utils/modalSlice";
import { addToMyList, removeFromMyList } from "../utils/myListSlice";
import noPoster from "../assets/noPoster.png";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  const myList = useSelector((store) => store.myList.movies);

  if (!movie) return null;

  const { id, poster_path } = movie;

  const isSaved = myList.some((item) => item.id === movie.id);

  const handleMovieClick = () => {
    dispatch(openModal(id));
  };

  const handleMyList = (e) => {
    e.stopPropagation();

    if (isSaved) {
      dispatch(removeFromMyList(movie.id));
    } else {
      dispatch(addToMyList(movie));
    }
  };

  return (
    <div
      onClick={handleMovieClick}
      className="
        relative
        flex-shrink-0
        w-36
        sm:w-40
        md:w-44
        lg:w-52
        xl:w-60
        overflow-hidden
        rounded-2xl
        cursor-pointer
        group
        transition-all
        duration-500
        hover:scale-105
        hover:-translate-y-2
        hover:shadow-[0_25px_50px_rgba(0,0,0,0.6)]
      "
    >
      {/* My List Button */}
      <button
        onClick={handleMyList}
        className="
          absolute
          top-3
          right-3
          z-30
          p-2
          rounded-full
          bg-black/70
          backdrop-blur-md
          text-white
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          hover:bg-red-600
          hover:scale-110
        "
      >
        {isSaved ? (
          <BookmarkCheck size={18} />
        ) : (
          <Bookmark size={18} />
        )}
      </button>

      {/* Poster */}
      <img
        src={poster_path ? IMG_CDN_URL + poster_path : noPoster}
        alt={movie.title}
        loading="lazy"
        className="
          w-full
          h-full
          object-cover
          rounded-2xl
          transition-transform
          duration-700
          group-hover:scale-110
        "
        onError={(e) => {
          e.target.src = noPoster;
        }}
      />

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/30
          to-transparent
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-500
        "
      />

      {/* Play Button */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          opacity-0
          scale-75
          group-hover:opacity-100
          group-hover:scale-100
          transition-all
          duration-500
        "
      >
        <div
          className="
            w-16
            h-16
            rounded-full
            bg-red-600
            flex
            items-center
            justify-center
            shadow-2xl
            shadow-red-600/50
          "
        >
          <Play
            size={28}
            fill="white"
            className="text-white ml-1"
          />
        </div>
      </div>

      {/* Premium Glow */}
      <div
        className="
          absolute
          inset-0
          rounded-2xl
          ring-0
          group-hover:ring-2
          ring-red-500/60
          transition-all
          duration-500
        "
      />

      {/* Bottom Gradient */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-28
          bg-gradient-to-t
          from-black/80
          to-transparent
        "
      />
    </div>
  );
};

export default MovieCard;