import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const MyListSection = () => {
  const myList = useSelector((store) => store.myList.movies);

  return (
    <section
      id="my-list-section"
      className="
       py-1
sm:py-2
lg:py-3
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
          ❤️ My List
        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-400">
          Your personal collection of saved movies.
        </p>
      </div>

      {myList.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900/70
            backdrop-blur-sm

            p-8
            sm:p-10
            lg:p-12

            text-center
          "
        >
          <div className="text-5xl mb-4">🎬</div>

          <h3
            className="
              text-xl
              sm:text-2xl
              font-semibold
              text-white
            "
          >
            Your My List is Empty
          </h3>

          <p
            className="
              mt-3
              max-w-lg
              mx-auto
              text-gray-400
              text-sm
              sm:text-base
            "
          >
            Save your favorite movies by clicking the bookmark icon on any movie card.
            They'll appear here for quick access.
          </p>
        </div>
      ) : (
        <MovieList
          title="Saved Movies"
          movies={myList}
        />
      )}
    </section>
  );
};

export default MyListSection;