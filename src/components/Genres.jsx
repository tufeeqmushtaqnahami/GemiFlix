import { useState } from "react";
import GenresMovieList from "./GenresMovieList";
import {
  Sword,
  Popcorn,
  Skull,
  Heart,
  Rocket,
  Palette,
} from "lucide-react";

const genres = [
  {
    id: 28,
    name: "Action",
    icon: Sword,
  },
  {
    id: 35,
    name: "Comedy",
    icon: Popcorn,
  },
  {
    id: 27,
    name: "Horror",
    icon: Skull,
  },
  {
    id: 10749,
    name: "Romance",
    icon: Heart,
  },
  {
    id: 878,
    name: "Sci-Fi",
    icon: Rocket,
  },
  {
    id: 16,
    name: "Animation",
    icon: Palette,
  },
];

const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);

  return (
    <section
      id="genres-section"
      className="
      pt-1
sm:pt-2
lg:pt-3

pb-1
sm:pb-2
lg:pb-3
      "
    >
      {/* Heading */}
      <div className="mb-8 lg:mb-10">
        <h2
          className="
            text-xl
            sm:text-2xl
            md:text-3xl
            lg:text-4xl
            font-bold
            text-white
          "
        >
          Browse by Genre
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Discover movies based on your favorite genres.
        </p>
      </div>

      {/* Genre Buttons */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-6
          gap-3
          sm:gap-4
          lg:gap-5
          mb-10
        "
      >
        {genres.map((genre) => {
          const Icon = genre.icon;

          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => setSelectedGenre(genre)}
              aria-pressed={selectedGenre.id === genre.id}
              className={`
                group
                rounded-xl
                border

                p-4
                sm:p-5
                lg:p-6

                transition-all
                duration-300

                hover:-translate-y-1

                ${
                  selectedGenre.id === genre.id
                    ? "bg-red-600 border-red-600 shadow-lg shadow-red-500/30"
                    : "bg-zinc-900 border-zinc-700 hover:border-red-500 hover:bg-zinc-800"
                }
              `}
            >
              <Icon
                className="
                  mx-auto
                  mb-3
                  sm:mb-4

                  w-8
                  h-8
                  sm:w-9
                  sm:h-9

                  text-white
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

              <p
                className="
                  text-white
                  font-semibold

                  text-sm
                  sm:text-base
                "
              >
                {genre.name}
              </p>
            </button>
          );
        })}
      </div>

      {/* Movies */}
      <GenresMovieList
        genreId={selectedGenre.id}
        genreName={selectedGenre.name}
      />
    </section>
  );
};

export default Genres;