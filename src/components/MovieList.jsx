import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const sliderRef = useRef(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateButtons = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    setShowLeft(slider.scrollLeft > 0);

    setShowRight(
      slider.scrollLeft <
        slider.scrollWidth - slider.clientWidth - 5
    );
  };

  useEffect(() => {
    updateButtons();

    window.addEventListener("resize", updateButtons);

    return () => {
      window.removeEventListener("resize", updateButtons);
    };
  }, [movies]);

  const scroll = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const amount = slider.clientWidth * 0.8;

    slider.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });

    setTimeout(updateButtons, 350);
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="group">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-red-500 to-pink-500"></div>

          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {title}
          </h2>
        </div>

        <button className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition">
          View All
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Slider */}
      <div className="relative">

        {/* Left Arrow */}
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="
              absolute
              left-0
              top-0
              bottom-0
              z-30
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-300
              flex
              items-center
              justify-center
              w-16
              hover:w-20
              bg-gradient-to-r
              from-black/90
              to-transparent
            "
          >
            <ChevronLeft
              size={42}
              className="
                text-white
                transition-transform
                duration-300
                hover:scale-125
              "
            />
          </button>
        )}

      {/* Left Fade */}
<div className="absolute left-0 inset-y-0 w-6 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10 pointer-events-none"></div>

{/* Right Fade */}
<div className="absolute right-0 inset-y-0 w-6 bg-gradient-to-l from-black/70 via-black/30 to-transparent z-10 pointer-events-none"></div>

        <div
          ref={sliderRef}
          onScroll={updateButtons}
          className="
            flex
            gap-5
            overflow-x-auto
            pb-4
            scroll-smooth
            no-scrollbar
          "
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>

                {/* Right Arrow */}
        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="
              absolute
              right-0
              top-0
              bottom-0
              z-30
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-300
              flex
              items-center
              justify-center
              w-16
              hover:w-20
              bg-gradient-to-l
              from-black/90
              to-transparent
            "
          >
            <ChevronRight
              size={42}
              className="
                text-white
                transition-transform
                duration-300
                hover:scale-125
              "
            />
          </button>
        )}
      </div>
    </section>
  );
};

export default MovieList;
