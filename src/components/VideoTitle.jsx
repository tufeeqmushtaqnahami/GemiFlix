import { Play, Info } from "lucide-react";

const VideoTitle = ({ title, overview }) => {
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
        via-black/70
        to-transparent
      "
    >
      <div
        className="
          w-full
          px-5
          sm:px-8
          md:px-12
          lg:px-16
          xl:px-20
          mt-20
          sm:mt-24
          md:mt-28
          lg:mt-0
        "
      >
        <div className="max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl">
          {/* Title */}
          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              xl:text-7xl
              font-extrabold
              leading-tight
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
              text-gray-200
              text-base
              lg:text-lg
              leading-relaxed
              max-w-xl
              drop-shadow-lg
            "
          >
            {overview}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              className="
                flex
                items-center
                gap-2
                bg-white
                text-black
                font-semibold
                px-5
                sm:px-6
                py-2.5
                sm:py-3
                rounded-md
                hover:bg-gray-200
                transition-all
                duration-300
              "
            >
              <Play size={20} fill="black" />
              Play
            </button>

            <button
              className="
                flex
                items-center
                gap-2
                bg-gray-700/80
                backdrop-blur-md
                text-white
                font-semibold
                px-5
                sm:px-6
                py-2.5
                sm:py-3
                rounded-md
                hover:bg-gray-600
                transition-all
                duration-300
              "
            >
              <Info size={20} />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;