import { memo } from "react";
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

  const { id, poster_path, title } = movie;

  const isSaved = myList.some((item) => item.id === id);

const handleMovieClick = () => {
  dispatch(
    openModal({
      movieId: id,
      modalType: "details",
    })
  );
};

  const handleMyList = (e) => {
    e.stopPropagation();

    if (isSaved) {
      dispatch(removeFromMyList(id));
    } else {
      dispatch(addToMyList(movie));
    }
  };

  return (
    <div
      onClick={handleMovieClick}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleMovieClick();
        }
      }}
      className="
        relative
        flex-shrink-0

        w-32
        sm:w-36
        md:w-44
        lg:w-52
        xl:w-60

        overflow-hidden
        rounded-xl
        lg:rounded-2xl

        cursor-pointer
        group

        transition-all
        duration-500
        hover:scale-105
        lg:hover:-translate-y-2
        hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)]
      "
    >
      {/* My List Button */}
      <button
        aria-label={
          isSaved ? "Remove from My List" : "Add to My List"
        }
        onClick={handleMyList}
        className="
          absolute
          top-2
          right-2
          sm:top-3
          sm:right-3
          z-30

          p-2

          rounded-full
          bg-black/70
          backdrop-blur-md
          text-white

          opacity-100
          md:opacity-0
          md:group-hover:opacity-100

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
        alt={title}
        loading="lazy"
        decoding="async"
        draggable="false"
        style={{ aspectRatio: "2 / 3" }}
        onError={(e) => {
          e.currentTarget.src = noPoster;
        }}
        className="
          w-full
          h-full
          object-cover

          rounded-xl
          lg:rounded-2xl

          transition-transform
          duration-700

          group-hover:scale-110
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
            w-12
            h-12
            sm:w-14
            sm:h-14
            lg:w-16
            lg:h-16

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
            className="text-white ml-0.5"
            size={22}
            fill="white"
          />
        </div>
      </div>

      {/* Premium Glow */}
      <div
        className="
          absolute
          inset-0

          rounded-xl
          lg:rounded-2xl

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

          h-20
          sm:h-24
          lg:h-28
        "
      />
    </div>
  );
};

export default memo(MovieCard);