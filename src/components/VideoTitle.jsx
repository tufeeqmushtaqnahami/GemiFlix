import { Play, Info } from "lucide-react";
import { useDispatch } from "react-redux";
import { openModal } from "../utils/modalSlice";

const VideoTitle = ({ id, title, overview }) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(
      openModal({
        movieId: id,
        modalType: "trailer",
      })
    );
  };

  const handleMoreInfo = () => {
    dispatch(
      openModal({
        movieId: id,
        modalType: "details",
      })
    );
  };

  return (
    <div
      className="
        absolute
        inset-0
        z-20
        flex
        items-center

        bg-gradient-to-r
        from-black
        via-black/75
        to-transparent
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1800px]

          px-5
          sm:px-8
          md:px-12
          lg:px-20
          xl:px-28
          2xl:px-36
        "
      >
        <div
          className="
            max-w-xs
            sm:max-w-md
            md:max-w-xl
            lg:max-w-3xl
            xl:max-w-4xl
          "
        >
          {/* Title */}
          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              xl:text-7xl
              2xl:text-8xl

              font-extrabold
              leading-tight
              tracking-tight

              text-white
              drop-shadow-2xl
            "
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="
              hidden
              md:block

              mt-6

              max-w-2xl
              xl:max-w-3xl

              text-gray-200

              text-base
              lg:text-lg
              xl:text-xl

              leading-relaxed

              drop-shadow-lg
            "
          >
            {overview}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4 lg:mt-10">
            <button
              onClick={handlePlay}
              className="
                flex
                items-center
                gap-3

                rounded-md

                bg-white
                text-black

                px-6
                py-3

                lg:px-8
                lg:py-4

                text-base
                lg:text-lg

                font-semibold

                transition-all
                duration-300

                hover:scale-105
                hover:bg-gray-200
              "
            >
              <Play size={22} fill="black" />
              Play
            </button>

            <button
              onClick={handleMoreInfo}
              className="
                flex
                items-center
                gap-3

                rounded-md

                bg-gray-700/80
                backdrop-blur-md

                text-white

                px-6
                py-3

                lg:px-8
                lg:py-4

                text-base
                lg:text-lg

                font-semibold

                transition-all
                duration-300

                hover:scale-105
                hover:bg-gray-600
              "
            >
              <Info size={22} />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;