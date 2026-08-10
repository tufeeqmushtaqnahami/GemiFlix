import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import Genres from "./Genres";
import MyListSection from "./MyListSection";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <section
      id="movies-section"
      className="
        relative
        z-20

        -mt-10
        sm:-mt-14
        md:-mt-20
        lg:-mt-24
        xl:-mt-28

        bg-black

        
      "
    >
      <div
        className="
    mx-auto

    w-full
    max-w-[2400px]

   px-4
sm:px-6
md:px-8
lg:px-6
xl:px-20
2xl:px-28


    space-y-10
    sm:space-y-12
    lg:space-y-16
    xl:space-y-20
  "
      >
        <MovieList title="Trending" movies={movies.trendingMovies} />

        <MovieList title="Bollywood Movies" movies={movies.bollywoodMovies} />

        <MovieList
          title="Now Playing Movies"
          movies={movies.nowPlayingMovies}
        />

        <MovieList title="Popular" movies={movies.popularMovies} />

        <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />

        <MovieList title="Top Rated" movies={movies.topRatedMovies} />

        <Genres />

        <MyListSection />
      </div>
    </section>
  );
};

export default SecondaryContainer;
