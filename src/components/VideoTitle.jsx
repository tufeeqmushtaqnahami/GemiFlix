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
      {/* Content */}
      <div
        className="
          w-full

          px-6
          sm:px-10
          md:px-12
          lg:px-10
          xl:px-20
          2xl:px-28
        "
      >
        {/* Title */}
        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-5xl
            xl:text-6xl
            2xl:text-7xl
            max-[1700px]:text-5xl
            font-bold
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

            mt-5
            lg:mt-6

           max-w-xl
            xl:max-w-2xl
            2xl:max-w-3xl
            max-[1700px]:max-w-2xl
     

            text-gray-200

            text-sm
            lg:text-base
            xl:text-base

            leading-relaxed

            drop-shadow-lg
          "
        >
          {overview}
        </p>

        {/* Buttons */}
        <div
          className="
            mt-6
            lg:mt-8
            flex
            flex-wrap
            items-center
            gap-3
            lg:gap-4
          "
        >
          <button
            onClick={handlePlay}
            className="
              flex
              items-center
              gap-2
              lg:gap-3

              rounded-md

              bg-white
              text-black

              px-5
              py-2.5
              lg:px-6
              lg:py-3

              text-sm
              lg:text-base

              font-semibold

              transition-all
              duration-300

              hover:scale-105
              hover:bg-gray-200
            "
          >
            <Play
              size={20}
              className="lg:w-[22px] lg:h-[22px]"
              fill="black"
            />
            Play
          </button>

          <button
            onClick={handleMoreInfo}
            className="
              flex
              items-center
              gap-2
              lg:gap-3

              rounded-md

              bg-gray-700/80
              backdrop-blur-md

              text-white

              px-5
              py-2.5
              lg:px-6
              lg:py-3

              text-sm
              lg:text-base

              font-semibold

              transition-all
              duration-300

              hover:scale-105
              hover:bg-gray-600
            "
          >
            <Info
              size={20}
              className="lg:w-[22px] lg:h-[22px]"
            />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;